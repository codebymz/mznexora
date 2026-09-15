"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface CyberWavesProps {
  interactive?: boolean;
}

/**
 * High-performance 3D parametric wireframe wave mesh and ribbon lines.
 * Recreates the neon multi-line topographic wireframe wave from the reference image.
 */
export function CyberWaves({ interactive = true }: CyberWavesProps) {
  const meshRef = useRef<THREE.LineSegments>(null);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Generate 3D grid line geometry with parametric wave topology
  const { geometry } = useMemo(() => {
    const linesCount = 38; // Number of wave rib lines
    const pointsPerLine = 110; // Resolution along the X axis
    const positions: number[] = [];
    const lineColors: number[] = [];

    // Colors matching reference: Magenta (#d946ef) -> Electric Blue (#2563eb) -> Neon Cyan (#06b6d4 / #00f2fe)
    const colorLeft = new THREE.Color("#d946ef");
    const colorMid = new THREE.Color("#2563eb");
    const colorRight = new THREE.Color("#06b6d4");

    for (let i = 0; i < linesCount; i++) {
      const t = i / (linesCount - 1);
      const zOffset = -t * 9 - 0.5;
      const yBase = -2.2 + t * 1.5;

      for (let j = 0; j < pointsPerLine - 1; j++) {
        const u1 = j / (pointsPerLine - 1);
        const u2 = (j + 1) / (pointsPerLine - 1);

        const x1 = (u1 - 0.5) * 24;
        const x2 = (u2 - 0.5) * 24;

        positions.push(x1, yBase, zOffset);
        positions.push(x2, yBase, zOffset);

        // Interpolate color based on X position and depth
        const getPointColor = (u: number, tRow: number) => {
          const col = new THREE.Color();
          if (u < 0.42) {
            col.lerpColors(colorLeft, colorMid, u / 0.42);
          } else {
            col.lerpColors(colorMid, colorRight, (u - 0.42) / 0.58);
          }
          // Dim distant lines slightly for 3D aerial perspective
          col.multiplyScalar(0.45 + (1 - tRow) * 0.55);
          return col;
        };

        const c1 = getPointColor(u1, t);
        const c2 = getPointColor(u2, t);

        lineColors.push(c1.r, c1.g, c1.b);
        lineColors.push(c2.r, c2.g, c2.b);
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));

    return { geometry: geom };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionAttr = meshRef.current.geometry.attributes.position;
    if (!positionAttr) return;
    const array = positionAttr.array as Float32Array;

    // Smooth pointer lerp
    if (interactive) {
      pointerRef.current.targetX = state.pointer.x * 1.2;
      pointerRef.current.targetY = state.pointer.y * 0.8;
    }
    pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.04;
    pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.04;

    const px = pointerRef.current.x;
    const py = pointerRef.current.y;

    const linesCount = 38;
    const pointsPerLine = 110;
    let idx = 0;

    for (let i = 0; i < linesCount; i++) {
      const t = i / (linesCount - 1);
      const zOffset = -t * 9 - 0.5;
      const yBase = -2.2 + t * 1.5;

      for (let j = 0; j < pointsPerLine - 1; j++) {
        const u1 = j / (pointsPerLine - 1);
        const u2 = (j + 1) / (pointsPerLine - 1);

        const x1 = (u1 - 0.5) * 24;
        const x2 = (u2 - 0.5) * 24;

        // Calculate dynamic wave height with harmonic frequencies
        const calcY = (x: number, uVal: number) => {
          // Sweeping waves mimicking parametric ribbon in reference image
          const wave1 = Math.sin(x * 0.32 + time * 0.75 + t * 2.8) * 0.7;
          const wave2 = Math.cos(x * 0.65 - time * 0.5 + t * 1.8) * 0.38;
          // Dual crest contour like reference
          const crest = Math.sin(uVal * Math.PI * 2.2 - 0.5) * 1.25;
          // Interactive cursor reaction
          const distToMouse = Math.hypot(x - px * 6, -1.2 - py * 2);
          const mouseLift = Math.max(0, 1 - distToMouse / 6.5) * 0.7;

          return yBase + (wave1 + wave2 + crest) * (0.85 + (1 - t) * 0.4) + mouseLift;
        };

        const y1 = calcY(x1, u1);
        const y2 = calcY(x2, u2);

        // Update vertex 1
        array[idx * 6] = x1;
        array[idx * 6 + 1] = y1;
        array[idx * 6 + 2] = zOffset;

        // Update vertex 2
        array[idx * 6 + 3] = x2;
        array[idx * 6 + 4] = y2;
        array[idx * 6 + 5] = zOffset;

        idx++;
      }
    }

    positionAttr.needsUpdate = true;

    // Gentle 3D perspective angle
    meshRef.current.rotation.x = 0.32 + py * 0.04;
    meshRef.current.rotation.y = -0.12 + px * 0.06;
  });

  return (
    <group position={[0, -0.7, 0]}>
      <lineSegments ref={meshRef} geometry={geometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          linewidth={1.2}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
