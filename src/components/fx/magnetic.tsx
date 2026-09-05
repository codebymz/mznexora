"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type PointerEvent, type ReactNode, useCallback } from "react";

import { useIsTouch } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Pulls its child toward the pointer while hovered. Wrap interactive elements,
 * never text blocks — magnetism on a paragraph just makes it hard to read.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
  cap = 14,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of the pointer offset to follow. */
  strength?: number;
  /** Maximum displacement in px. */
  cap?: number;
}) {
  const isTouch = useIsTouch();
  const reducedMotion = useReducedMotion();
  const disabled = isTouch || reducedMotion;

  const config = { stiffness: 260, damping: 20, mass: 0.5 };
  const x = useSpring(useMotionValue(0), config);
  const y = useSpring(useMotionValue(0), config);

  const onMove = useCallback(
    (event: PointerEvent<HTMLSpanElement>) => {
      if (disabled) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);

      x.set(Math.max(-cap, Math.min(cap, dx * strength)));
      y.set(Math.max(-cap, Math.min(cap, dy * strength)));
    },
    [disabled, strength, cap, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (disabled) {
    return <span className={cn("inline-flex", className)}>{children}</span>;
  }

  return (
    <motion.span
      className={cn("inline-flex", className)}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      // Keyboard users never trigger pointer events; make sure focus resets too.
      onBlur={reset}
    >
      {children}
    </motion.span>
  );
}
