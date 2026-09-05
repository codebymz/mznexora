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
    <div className="absolute inset-0 grid place-items-center">
      <svg
        viewBox="0 0 400 400"
        className="size-full max-h-[36rem] max-w-[36rem] opacity-70"
        aria-hidden
      >
        <defs>
          <radialGradient id="nexus-node" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#2563EB" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="nexus-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {[
          [96, 118, 188, 92],
          [188, 92, 268, 148],
          [268, 148, 232, 246],
          [232, 246, 132, 268],
          [132, 268, 96, 118],
          [188, 92, 232, 246],
          [96, 118, 232, 246],
          [268, 148, 132, 268],
          [188, 92, 132, 268],
        ].map(([x1, y1, x2, y2], index) => (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#nexus-edge)"
            strokeWidth="1"
          />
        ))}

        {[
          [96, 118, 7],
          [188, 92, 10],
          [268, 148, 6],
          [232, 246, 8],
          [132, 268, 6],
        ].map(([cx, cy, r], index) => (
          <g key={index}>
            <circle cx={cx} cy={cy} r={Number(r) * 4} fill="url(#nexus-node)" opacity="0.5" />
            <circle cx={cx} cy={cy} r={r} fill="#0B1120" stroke="#14B8A6" strokeWidth="1.2" />
          </g>
        ))}
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
