"use client";

import { useEffect, useRef } from "react";

import { useIsTouch } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * A single soft light that trails the cursor across the whole page, lagging
 * slightly so the glass appears to catch it. Screen-blended so it only ever
 * adds light — it can never dim content underneath.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const node = ref.current;
    if (!node) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;
    let visible = false;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        visible = true;
        node.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      node.style.opacity = "0";
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      node.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 size-[36rem] rounded-full opacity-0 mix-blend-screen blur-[90px] transition-opacity duration-700 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(37,99,235,.14) 0%, rgba(20,184,166,.08) 42%, transparent 70%)",
      }}
    />
  );
}
