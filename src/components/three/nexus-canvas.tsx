"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import { CyberWaves } from "@/components/three/cyber-waves";
import { DustField } from "@/components/three/dust-field";
import { useIsTouch } from "@/hooks/use-media-query";

/**
 * Renders the 3D Cyber Wave Mesh & particles, pausing the render loop
 * whenever it leaves the viewport to save CPU/GPU cycles.
 */
export function NexusCanvas() {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const isTouch = useIsTouch();

  useEffect(() => {
    const node = host.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(Boolean(entry?.isIntersecting)),
      { threshold: 0 },
    );

    observer.observe(node);

    const onVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={host} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, isTouch ? 1.25 : 1.5]}
        camera={{ position: [0, 0.4, 5.5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => gl.setClearAlpha(0)}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.8} />
        <CyberWaves interactive={!isTouch} />
        <DustField count={isTouch ? 200 : 450} />
      </Canvas>
    </div>
  );
}

