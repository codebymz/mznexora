"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouch } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CustomCursor() {
  const isTouch = useIsTouch();
  const reducedMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let animFrameId: number;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        ringX = targetX;
        ringY = targetY;
      }

      // Check if target or any ancestor is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest(
          "a, button, input, textarea, select, [role='button'], [data-cursor='pointer']"
        );
        setIsHovered(Boolean(interactiveEl));
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const render = () => {
      // Lerp ring position for smooth "soft" physics lag
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isTouch, reducedMotion, isVisible]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-gradient-to-r from-aqua to-electric transition-opacity duration-300 will-change-transform ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "size-3 shadow-[0_0_12px_rgba(20,184,166,0.9)]" : "size-2 shadow-[0_0_8px_rgba(37,99,235,0.8)]"}`}
      />

      {/* Trailing Smooth Glass Ring */}
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-aqua/45 bg-aqua/[0.06] backdrop-blur-[1px] transition-all duration-300 ease-out will-change-transform ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isClicked
            ? "size-6 scale-90 border-electric/80 bg-electric/20"
            : isHovered
            ? "size-14 border-aqua/80 bg-aqua/15 shadow-[0_0_25px_rgba(20,184,166,0.35)]"
            : "size-9 border-mist/30 shadow-[0_0_15px_rgba(37,99,235,0.15)]"
        }`}
      />
    </>
  );
}
