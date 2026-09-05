"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { gaussian, mulberry32 } from "@/lib/random";

/**
 * THE NEXUS
 *
 * Three clusters of nodes — one per practice — wired within themselves and
 * bridged to each other. It is the company's own diagram: separate disciplines,
 * connected, with work moving continuously along the connections.
 *
 * Three draw calls total: node sprites, edges, and the light pulses share the
 * edge geometry via a shader rather than spawning meshes per pulse.
 */

const CLUSTERS = [
  { centre: new THREE.Vector3(-1.85, 0.75, 0.1), count: 9, hue: 0 },
  { centre: new THREE.Vector3(1.75, -0.15, -0.7), count: 9, hue: 1 },
  { centre: new THREE.Vector3(-0.1, -1.55, 0.55), count: 8, hue: 0.5 },
] as const;

const COLOR_ELECTRIC = new THREE.Color("#2563eb");
const COLOR_AQUA = new THREE.Color("#14b8a6");
const COLOR_ICE = new THREE.Color("#f8fafc");

type Graph = {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  seeds: Float32Array;
  edgePositions: Float32Array;
  edgeT: Float32Array;
  edgeSeeds: Float32Array;
  edgeColors: Float32Array;
};

function buildGraph(): Graph {
  const rng = mulberry32(20260118);
  const nodes: { position: THREE.Vector3; cluster: number; hue: number }[] = [];

  CLUSTERS.forEach((cluster, clusterIndex) => {
    for (let i = 0; i < cluster.count; i += 1) {
      nodes.push({
        position: new THREE.Vector3(
          cluster.centre.x + gaussian(rng, 0.62),
          cluster.centre.y + gaussian(rng, 0.55),
          cluster.centre.z + gaussian(rng, 0.5),
        ),
        cluster: clusterIndex,
        hue: cluster.hue,
      });
    }
  });

  // --- Edges: nearest neighbours inside a cluster, plus explicit bridges ----
  const edges: [number, number][] = [];
  const seen = new Set<string>();

  const addEdge = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (a === b || seen.has(key)) return;
    seen.add(key);
    edges.push([a, b]);
  };

  nodes.forEach((node, index) => {
    const neighbours = nodes
      .map((other, otherIndex) => ({
        otherIndex,
        distance: node.position.distanceTo(other.position),
        sameCluster: other.cluster === node.cluster,
      }))
      .filter((entry) => entry.otherIndex !== index && entry.sameCluster)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2);

    neighbours.forEach((neighbour) => addEdge(index, neighbour.otherIndex));
  });

  // Bridges: the closest pair between each cluster combination, twice over,
  // so the three practices read as connected rather than adjacent.
  for (let a = 0; a < CLUSTERS.length; a += 1) {
    for (let b = a + 1; b < CLUSTERS.length; b += 1) {
      const pairs: { i: number; j: number; distance: number }[] = [];

      nodes.forEach((nodeI, i) => {
        if (nodeI.cluster !== a) return;
        nodes.forEach((nodeJ, j) => {
          if (nodeJ.cluster !== b) return;
          pairs.push({ i, j, distance: nodeI.position.distanceTo(nodeJ.position) });
        });
      });

      pairs
        .sort((left, right) => left.distance - right.distance)
        .slice(0, 2)
        .forEach((pair) => addEdge(pair.i, pair.j));
    }
  }

  // --- Flatten to typed arrays ---------------------------------------------
  const positions = new Float32Array(nodes.length * 3);
  const colors = new Float32Array(nodes.length * 3);
  const sizes = new Float32Array(nodes.length);
  const seeds = new Float32Array(nodes.length);
  const scratch = new THREE.Color();

  nodes.forEach((node, index) => {
    positions.set([node.position.x, node.position.y, node.position.z], index * 3);

    scratch.copy(COLOR_ELECTRIC).lerp(COLOR_AQUA, node.hue);
    // A few nodes read as "hot" — the ones doing work right now.
    if (index % 7 === 0) scratch.lerp(COLOR_ICE, 0.55);
    colors.set([scratch.r, scratch.g, scratch.b], index * 3);

    sizes[index] = index % 7 === 0 ? 26 : 15 + Math.round(rng() * 7);
    seeds[index] = rng();
  });

  const edgePositions = new Float32Array(edges.length * 6);
  const edgeT = new Float32Array(edges.length * 2);
  const edgeSeeds = new Float32Array(edges.length * 2);
  const edgeColors = new Float32Array(edges.length * 6);

  edges.forEach(([from, to], index) => {
    const start = nodes[from]!;
    const end = nodes[to]!;
    const seed = rng();

    edgePositions.set(
      [
        start.position.x,
        start.position.y,
        start.position.z,
        end.position.x,
        end.position.y,
        end.position.z,
      ],
      index * 6,
    );

    edgeT.set([0, 1], index * 2);
    edgeSeeds.set([seed, seed], index * 2);

    scratch.copy(COLOR_ELECTRIC).lerp(COLOR_AQUA, start.hue);
    edgeColors.set([scratch.r, scratch.g, scratch.b], index * 6);
    scratch.copy(COLOR_ELECTRIC).lerp(COLOR_AQUA, end.hue);
    edgeColors.set([scratch.r, scratch.g, scratch.b], index * 6 + 3);
  });

  return {
    positions,
    colors,
    sizes,
    seeds,
    edgePositions,
    edgeT,
    edgeSeeds,
    edgeColors,
  };
}

/* -------------------------------------------------------------------------- */
/* Shaders                                                                     */
/* -------------------------------------------------------------------------- */

const NODE_VERTEX = /* glsl */ `
  attribute float size;
  attribute float seed;
  varying vec3 vColor;
  varying float vPulse;
  uniform float uTime;
  uniform float uScale;

  void main() {
    vColor = color;

    // Each node breathes on its own clock so the graph never looks metronomic.
    vPulse = 0.72 + 0.28 * sin(uTime * (0.7 + seed * 1.1) + seed * 6.28318);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * uScale * vPulse * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const NODE_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vPulse;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    // Jewel construction: solid core, crisp rim, wide halo.
    float core = smoothstep(0.17, 0.07, d);
    float rim  = smoothstep(0.31, 0.27, d) - smoothstep(0.27, 0.21, d);
    float halo = smoothstep(0.5, 0.05, d) * 0.3;

    float alpha = (core + rim * 0.85 + halo) * vPulse;
    vec3 color = vColor + core * 0.55;

    gl_FragColor = vec4(color, alpha);
  }
`;

const EDGE_VERTEX = /* glsl */ `
  attribute float lineT;
  attribute float seed;
  varying float vT;
  varying float vSeed;
  varying vec3 vColor;

  void main() {
    vT = lineT;
    vSeed = seed;
    vColor = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const EDGE_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying float vT;
  varying float vSeed;
  varying vec3 vColor;

  void main() {
    // A packet of work travelling from one node to the next.
    float head = fract(uTime * (0.1 + vSeed * 0.16) + vSeed);
    float d = abs(vT - head);
    d = min(d, 1.0 - d);

    float pulse = smoothstep(0.13, 0.0, d);
    float base = 0.16 + 0.1 * sin(vT * 3.14159);

    gl_FragColor = vec4(vColor + pulse * 0.85, (base + pulse * 1.35) * uOpacity);
  }
`;

/* -------------------------------------------------------------------------- */

export function NexusGraph({ interactive = true }: { interactive?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const graph = useMemo(buildGraph, []);

  const { nodeGeometry, nodeMaterial, edgeGeometry, edgeMaterial } = useMemo(() => {
    const nodes = new THREE.BufferGeometry();
    nodes.setAttribute("position", new THREE.BufferAttribute(graph.positions, 3));
    nodes.setAttribute("color", new THREE.BufferAttribute(graph.colors, 3));
    nodes.setAttribute("size", new THREE.BufferAttribute(graph.sizes, 1));
    nodes.setAttribute("seed", new THREE.BufferAttribute(graph.seeds, 1));

    const nodeMat = new THREE.ShaderMaterial({
      vertexShader: NODE_VERTEX,
      fragmentShader: NODE_FRAGMENT,
      uniforms: { uTime: { value: 0 }, uScale: { value: 260 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const edges = new THREE.BufferGeometry();
    edges.setAttribute("position", new THREE.BufferAttribute(graph.edgePositions, 3));
    edges.setAttribute("color", new THREE.BufferAttribute(graph.edgeColors, 3));
    edges.setAttribute("lineT", new THREE.BufferAttribute(graph.edgeT, 1));
    edges.setAttribute("seed", new THREE.BufferAttribute(graph.edgeSeeds, 1));

    const edgeMat = new THREE.ShaderMaterial({
      vertexShader: EDGE_VERTEX,
      fragmentShader: EDGE_FRAGMENT,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 1 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    return {
      nodeGeometry: nodes,
      nodeMaterial: nodeMat,
      edgeGeometry: edges,
      edgeMaterial: edgeMat,
    };
  }, [graph]);

  useEffect(
    () => () => {
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      edgeGeometry.dispose();
      edgeMaterial.dispose();
    },
    [nodeGeometry, nodeMaterial, edgeGeometry, edgeMaterial],
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    nodeMaterial.uniforms.uTime!.value = time;
    edgeMaterial.uniforms.uTime!.value = time;

    if (!group.current) return;

    // Constant slow drift, plus a gentle lean toward the pointer.
    group.current.rotation.y += delta * 0.055;
    group.current.rotation.x = Math.sin(time * 0.16) * 0.09;

    if (interactive) {
      const targetY = state.pointer.x * 0.28;
      const targetX = -state.pointer.y * 0.2;
      group.current.rotation.z += (targetY * 0.35 - group.current.rotation.z) * 0.04;
      group.current.position.y += (targetX * 0.5 - group.current.position.y) * 0.04;
      group.current.position.x += (targetY * 0.5 - group.current.position.x) * 0.04;
    }
  });

  return (
    <group ref={group} scale={1.05}>
      <lineSegments geometry={edgeGeometry} material={edgeMaterial} />
      <points geometry={nodeGeometry} material={nodeMaterial} />
    </group>
  );
}
