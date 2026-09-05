"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import { DustField } from "@/components/three/dust-field";
import { NexusGraph } from "@/components/three/nexus-graph";
import { useIsTouch } from "@/hooks/use-media-query";

/**
 * Renders the graph and pauses the render loop whenever it leaves the viewport,
 * so scrolling past the hero costs nothing.
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
        // Capping DPR is the single biggest win here; 1.6 is visually
        // indistinguishable from 3 for additive point sprites.
        dpr={[1, isTouch ? 1.35 : 1.6]}
        camera={{ position: [0, 0, 6.6], fov: 42 }}
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
        <NexusGraph interactive={!isTouch} />
        <DustField count={isTouch ? 280 : 620} />
      </Canvas>
    </div>
  );
}
