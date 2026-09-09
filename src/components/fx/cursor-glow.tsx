"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouch } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * A stylish custom cursor featuring:
 * 1. A crisp glowing central dot.
 * 2. An outer cyan/electric trailing aura ring that expands on hovering buttons/links.
 * 3. Soft ambient background glow.
 */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isTouch = useIsTouch();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ambient = ambientRef.current;

    if (!dot || !ring || !ambient) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let ambientX = mouseX;
    let ambientY = mouseY;
    let animFrame = 0;
    let visible = false;

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        ambient.style.opacity = "1";
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest("a, button, input, select, textarea, [role='button'], .group"),
      );
      setIsHovered(isInteractive);
    };

    const onPointerLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      ambient.style.opacity = "0";
    };

    const loop = () => {
      // Immediate position for crisp dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Smooth lag for ring follower
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      // Soft lag for ambient light
      ambientX += (mouseX - ambientX) * 0.08;
      ambientY += (mouseY - ambientY) * 0.08;
      ambient.style.transform = `translate3d(${ambientX}px, ${ambientY}px, 0) translate(-50%, -50%)`;

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      {/* Ambient background glow */}
      <div
        ref={ambientRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-20 size-[32rem] rounded-full opacity-0 mix-blend-screen blur-[100px] transition-opacity duration-700 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,.15) 0%, rgba(20,184,166,.1) 40%, transparent 70%)",
        }}
      />

      {/* Trailing outer ring */}
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[120] rounded-full border border-aqua/60 opacity-0 transition-[width,height,border-color,background-color] duration-300 ease-glass will-change-transform ${
          isHovered
            ? "size-12 border-aqua/80 bg-aqua/10 shadow-[0_0_24px_rgba(20,184,166,0.4)]"
            : "size-8 shadow-[0_0_12px_rgba(37,99,235,0.3)]"
        }`}
      />

      {/* Center sharp dot */}
      <div
        ref={dotRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[125] size-2 rounded-full bg-ice opacity-0 transition-transform duration-200 shadow-[0_0_8px_#f8fafc] will-change-transform ${
          isHovered ? "scale-150 bg-aqua shadow-[0_0_12px_#14b8a6]" : "scale-100"
        }`}
      />
    </>
  );
}
