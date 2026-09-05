"use client";

import { useEffect, useRef } from "react";

/**
 * Writes the pointer position into `--mx` / `--my` (px, element-relative) on
 * the returned ref. CSS does the rendering, so the pointer path never triggers
 * a React render.
 */
export function usePointerGlow<T extends HTMLElement = HTMLDivElement>(
  enabled = true,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        node.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };

    const onEnter = () => node.style.setProperty("--glow-opacity", "1");
    const onLeave = () => node.style.setProperty("--glow-opacity", "0");

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerenter", onEnter);
    node.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerenter", onEnter);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  return ref;
}
