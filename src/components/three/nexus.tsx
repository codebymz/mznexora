"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Static stand-in for the WebGL graph: same composition, no render loop.
 * Shown during the chunk load, when motion is reduced, and when WebGL is
 * unavailable — so the hero is never an empty column.
 */
function StaticNexus() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        className="w-full h-full opacity-60"
        aria-hidden
      >
        <defs>
          <linearGradient id="wave-grad-static" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#2563eb" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        {Array.from({ length: 18 }).map((_, i) => {
          const yOffset = 180 + i * 11;
          const amp = 35 + i * 2;
          return (
            <path
              key={i}
              d={`M0,${yOffset} Q250,${yOffset - amp} 500,${yOffset + amp * 0.5} T1000,${yOffset - amp * 0.8}`}
              fill="none"
              stroke="url(#wave-grad-static)"
              strokeWidth="1.2"
              opacity={0.3 + (i / 18) * 0.6}
            />
          );
        })}
      </svg>
    </div>
  );
}

const NexusCanvas = dynamic(
  () => import("@/components/three/nexus-canvas").then((mod) => mod.NexusCanvas),
  { ssr: false, loading: () => <StaticNexus /> },
);

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ?? canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

export function Nexus() {
  const reducedMotion = useReducedMotion();
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(hasWebGL());
  }, []);

  if (reducedMotion || supported === false) return <StaticNexus />;
  if (supported === null) return <StaticNexus />;

  return <NexusCanvas />;
}
