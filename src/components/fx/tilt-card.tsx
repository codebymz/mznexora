"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { type ReactNode, useCallback, type PointerEvent } from "react";

import { useIsTouch } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * 3D tilt on pointer. The glare layer tracks the same pointer position, so the
 * highlight moves like a reflection instead of a decal.
 */
export function TiltCard({
  children,
  className,
  intensity = 7,
  lift = 10,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  intensity?: number;
  /** Z translation on hover, px. */
  lift?: number;
  glare?: boolean;
}) {
  const isTouch = useIsTouch();
  const reducedMotion = useReducedMotion();
  const disabled = isTouch || reducedMotion;

  const spring = { stiffness: 220, damping: 26, mass: 0.6 };
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const z = useSpring(useMotionValue(0), spring);
  const glareX = useSpring(useMotionValue(50), { stiffness: 160, damping: 24 });
  const glareY = useSpring(useMotionValue(50), { stiffness: 160, damping: 24 });
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 120, damping: 22 });

  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(248,250,252,.14), transparent 62%)`;

  const onMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (disabled) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      rotateY.set((px - 0.5) * intensity * 2);
      rotateX.set(-(py - 0.5) * intensity * 2);
      glareX.set(px * 100);
      glareY.set(py * 100);
    },
    [disabled, intensity, rotateX, rotateY, glareX, glareY],
  );

  const onEnter = useCallback(() => {
    if (disabled) return;
    z.set(lift);
    glareOpacity.set(1);
  }, [disabled, lift, z, glareOpacity]);

  const onLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
    glareOpacity.set(0);
  }, [rotateX, rotateY, z, glareOpacity]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("tilt-scene", className)}>
      <motion.div
        className="tilt-layer relative size-full"
        style={{ rotateX, rotateY, translateZ: z }}
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
      >
        {children}
        {glare ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
            style={{ background: glareBackground, opacity: glareOpacity }}
          />
        ) : null}
      </motion.div>
    </div>
  );
}
