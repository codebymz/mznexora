"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

import { mulberry32 } from "@/lib/random";

const VERTEX = /* glsl */ `
  attribute float size;
  attribute float seed;
  varying float vSeed;
  uniform float uTime;

  void main() {
    vSeed = seed;

    vec3 drifted = position;
    drifted.y += sin(uTime * 0.12 + seed * 6.2831) * 0.28;
    drifted.x += cos(uTime * 0.09 + seed * 4.1) * 0.22;

    vec4 mvPosition = modelViewMatrix * vec4(drifted, 1.0);
    gl_PointSize = size * (1.0 / -mvPosition.z) * 120.0;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT = /* glsl */ `
  varying float vSeed;
  uniform float uTime;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float twinkle = 0.35 + 0.65 * pow(abs(sin(uTime * 0.5 + vSeed * 9.42)), 3.0);
    float alpha = smoothstep(0.5, 0.0, d) * 0.5 * twinkle;

    gl_FragColor = vec4(0.86, 0.92, 1.0, alpha);
  }
`;

/**
 * Ambient dust. Reads as atmosphere and depth cue — the graph should feel
 * suspended in something, not floating on a flat plane.
 */
export function DustField({ count = 620 }: { count?: number }) {
  const { geometry, shader } = useMemo(() => {
    const rng = mulberry32(90210);
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      // Hollow-ish shell so particles do not pile up over the graph centre.
      const radius = 3.2 + rng() * 6.4;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.65;
      positions[i * 3 + 2] = radius * Math.cos(phi) * 0.5 - 1.5;

      sizes[i] = 0.6 + rng() * 1.9;
      seeds[i] = rng();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, shader: mat };
  }, [count]);

  useEffect(
    () => () => {
      geometry.dispose();
      shader.dispose();
    },
    [geometry, shader],
  );

  useFrame((state) => {
    shader.uniforms.uTime!.value = state.clock.elapsedTime;
  });

  return <points geometry={geometry} material={shader} />;
}
