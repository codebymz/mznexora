"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { mulberry32 } from "@/lib/random";

const COLOR_ELECTRIC = new THREE.Color("#2563eb");
const COLOR_AQUA = new THREE.Color("#14b8a6");
const COLOR_ICE = new THREE.Color("#f8fafc");

/* -------------------------------------------------------------------------- */
/* Shaders                                                                    */
/* -------------------------------------------------------------------------- */

const CORE_PULSE_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    
    // Gentle surface displacement wave
    float displacement = sin(position.x * 3.5 + uTime * 2.2) * 
                         cos(position.y * 3.5 + uTime * 2.2) * 
                         sin(position.z * 3.5 + uTime * 2.2) * 0.045;
    
    vec3 newPos = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const CORE_PULSE_FRAGMENT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColorElectric;
  uniform vec3 uColorAqua;
  uniform vec3 uColorIce;

  void main() {
    // Fresnel rim glow
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 2.2);
    
    // Dynamic color gradient flow
    float flow = sin(vPosition.y * 4.0 + uTime * 1.8) * 0.5 + 0.5;
    vec3 baseColor = mix(uColorElectric, uColorAqua, flow);
    
    // Core highlight pulse
    float pulse = 0.65 + 0.35 * sin(uTime * 3.0);
    vec3 finalColor = mix(baseColor, uColorIce, fresnel * 0.8 * pulse);
    
    float alpha = clamp(fresnel * 1.2 + 0.15, 0.0, 0.95);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const PARTICLE_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uTime;
  uniform float uScale;

  void main() {
    vColor = aColor;
    float pulse = 0.6 + 0.4 * sin(uTime * 2.0 + aPhase * 6.283);
    vAlpha = pulse;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uScale * pulse * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const PARTICLE_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float core = smoothstep(0.15, 0.0, dist);
    float glow = smoothstep(0.5, 0.05, dist) * 0.5;
    float alpha = (core + glow) * vAlpha;

    gl_FragColor = vec4(vColor + core * 0.6, alpha);
  }
`;

/* -------------------------------------------------------------------------- */
/* Sub-Components                                                             */
/* -------------------------------------------------------------------------- */

/** 1. Central Holographic Core with inner wireframe lattice */
function HolographicCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const coreShaderRef = useRef<THREE.ShaderMaterial>(null);

  const coreShader = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: CORE_PULSE_VERTEX,
      fragmentShader: CORE_PULSE_FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uColorElectric: { value: COLOR_ELECTRIC },
        uColorAqua: { value: COLOR_AQUA },
        uColorIce: { value: COLOR_ICE },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      wireframe: false,
    });
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (coreShaderRef.current?.uniforms.uTime) {
      coreShaderRef.current.uniforms.uTime.value = time;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = Math.sin(time * 0.4) * 0.15;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.35;
      wireRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group>
      {/* Outer translucent breathing core */}
      <mesh ref={meshRef} scale={1.15}>
        <icosahedronGeometry args={[1, 3]} />
        <primitive object={coreShader} ref={coreShaderRef} attach="material" />
      </mesh>

      {/* Inner geometric wireframe prism */}
      <lineSegments ref={wireRef} scale={0.92}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1, 1)]} />
        <lineBasicMaterial
          color={COLOR_AQUA}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Internal point energy source */}
      <pointLight color="#14b8a6" intensity={2.8} distance={6} />
      <pointLight color="#2563eb" intensity={2.2} distance={8} position={[1, 2, 2]} />
    </group>
  );
}

/** 2. Orbital Cyber Rings with Data Hash Segments */
function CyberRings() {
  const ring1 = useRef<THREE.Group>(null);
  const ring2 = useRef<THREE.Group>(null);
  const ring3 = useRef<THREE.Group>(null);

  // Data markers on ring
  const markerGeometry = useMemo(() => new THREE.BoxGeometry(0.04, 0.04, 0.12), []);
  const markerMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: COLOR_ICE,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const markerPositions = useMemo(() => {
    const count = 12;
    const radius = 2.05;
    const positions: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      positions.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (ring1.current) {
      ring1.current.rotation.z += delta * 0.35;
      ring1.current.rotation.x = Math.PI / 4 + Math.sin(delta * 0.5) * 0.05;
    }
    if (ring2.current) {
      ring2.current.rotation.y += delta * 0.28;
      ring2.current.rotation.z = -Math.PI / 6;
    }
    if (ring3.current) {
      ring3.current.rotation.x += delta * 0.22;
      ring3.current.rotation.y = Math.PI / 3;
    }
  });

  return (
    <group>
      {/* Primary Cyber Ring */}
      <group ref={ring1} rotation={[Math.PI / 3.8, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.05, 0.018, 16, 120]} />
          <meshBasicMaterial
            color={COLOR_AQUA}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Hash markers */}
        {markerPositions.map((pos, idx) => (
          <mesh
            key={idx}
            position={pos}
            geometry={markerGeometry}
            material={markerMaterial}
            scale={idx % 3 === 0 ? 1.6 : 1}
          />
        ))}
      </group>

      {/* Secondary Electric Orbit Ring */}
      <group ref={ring2} rotation={[0, Math.PI / 4, Math.PI / 5]}>
        <mesh>
          <torusGeometry args={[2.55, 0.015, 16, 120]} />
          <meshBasicMaterial
            color={COLOR_ELECTRIC}
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Tertiary Outer Gyro Ring */}
      <group ref={ring3} rotation={[-Math.PI / 5, -Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[3.05, 0.012, 16, 120]} />
          <meshBasicMaterial
            color={COLOR_AQUA}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

/** 3. Constellation of Interconnected Neural Nodes & Flowing Data Pulses */
function NeuralConstellation() {
  const group = useRef<THREE.Group>(null);
  const particleMatRef = useRef<THREE.ShaderMaterial>(null);

  const {
    nodePositions,
    nodeColors,
    nodeSizes,
    nodePhases,
    edgePositions,
    edgeColors,
  } = useMemo(() => {
    const rng = mulberry32(420918);
    const nodeCount = 38;
    const nodes: THREE.Vector3[] = [];

    // Generate node coordinates in spherical layer
    for (let i = 0; i < nodeCount; i++) {
      const radius = 1.6 + rng() * 2.1;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(rng() * 2 - 1);
      nodes.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ),
      );
    }

    const posArray = new Float32Array(nodeCount * 3);
    const colArray = new Float32Array(nodeCount * 3);
    const sizArray = new Float32Array(nodeCount);
    const phaArray = new Float32Array(nodeCount);

    const tempColor = new THREE.Color();

    nodes.forEach((node, idx) => {
      posArray.set([node.x, node.y, node.z], idx * 3);
      const isHot = idx % 5 === 0;
      tempColor
        .copy(isHot ? COLOR_ICE : COLOR_AQUA)
        .lerp(COLOR_ELECTRIC, (node.y + 2) / 4);

      colArray.set([tempColor.r, tempColor.g, tempColor.b], idx * 3);
      sizArray[idx] = isHot ? 28 : 14 + rng() * 8;
      phaArray[idx] = rng();
    });

    // Build interconnected edges for close pairs
    const edgesList: [THREE.Vector3, THREE.Vector3, THREE.Color][] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i]!.distanceTo(nodes[j]!);
        if (dist < 1.7) {
          const edgeCol = new THREE.Color().copy(COLOR_AQUA).lerp(COLOR_ELECTRIC, dist / 1.7);
          edgesList.push([nodes[i]!, nodes[j]!, edgeCol]);
        }
      }
    }

    const edgePos = new Float32Array(edgesList.length * 6);
    const edgeCol = new Float32Array(edgesList.length * 6);

    edgesList.forEach(([start, end, col], idx) => {
      edgePos.set([start.x, start.y, start.z, end.x, end.y, end.z], idx * 6);
      edgeCol.set([col.r, col.g, col.b, col.r * 0.7, col.g * 0.7, col.b * 0.7], idx * 6);
    });

    return {
      nodePositions: posArray,
      nodeColors: colArray,
      nodeSizes: sizArray,
      nodePhases: phaArray,
      edgePositions: edgePos,
      edgeColors: edgeCol,
    };
  }, []);

  const nodeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(nodeColors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(nodeSizes, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(nodePhases, 1));
    return geo;
  }, [nodePositions, nodeColors, nodeSizes, nodePhases]);

  const edgeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(edgeColors, 3));
    return geo;
  }, [edgePositions, edgeColors]);

  const particleShader = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERTEX,
      fragmentShader: PARTICLE_FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: 240 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state, delta) => {
    if (particleMatRef.current?.uniforms.uTime) {
      particleMatRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (group.current) {
      group.current.rotation.y -= delta * 0.08;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.06;
    }
  });

  return (
    <group ref={group}>
      <points geometry={nodeGeometry}>
        <primitive object={particleShader} ref={particleMatRef} attach="material" />
      </points>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Master 3D AI Cyber Core Container                                         */
/* -------------------------------------------------------------------------- */

export function AICyberCore({ interactive = true }: { interactive?: boolean }) {
  const rootGroup = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!rootGroup.current) return;

    // Ambient self-rotation
    rootGroup.current.rotation.y += delta * 0.06;
    rootGroup.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;

    if (interactive) {
      // Damped mouse tracking for 3D parallax depth
      const targetRotationY = state.pointer.x * 0.45;
      const targetRotationX = -state.pointer.y * 0.35;
      const targetPosX = state.pointer.x * 0.35;
      const targetPosY = state.pointer.y * 0.25;

      rootGroup.current.rotation.y +=
        (targetRotationY - rootGroup.current.rotation.y) * 0.05;
      rootGroup.current.rotation.x +=
        (targetRotationX - rootGroup.current.rotation.x) * 0.05;
      rootGroup.current.position.x +=
        (targetPosX - rootGroup.current.position.x) * 0.05;
      rootGroup.current.position.y +=
        (targetPosY - rootGroup.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={rootGroup} scale={1.12}>
      <HolographicCore />
      <CyberRings />
      <NeuralConstellation />
    </group>
  );
}
