"use client";

import { motion, type Variants } from "framer-motion";
import React, { type ElementType, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, margin: "-10% 0px -12% 0px" } as const;

type Direction = "up" | "down" | "left" | "right" | "none";

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: Direction;
  /** Adds a focus-pull. Skip on text-heavy blocks where it costs clarity. */
  blur?: boolean;
  as?: ElementType;
};

/** Single element that rises into place the first time it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  distance = 26,
  direction = "up",
  blur = true,
  as = "div",
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const Component = (motion[as as keyof typeof motion] ??
    motion.create(as as ElementType)) as typeof motion.div;

  if (reducedMotion) {
    const Static = as as React.ComponentType<
      React.PropsWithChildren<{ className?: string }>
    >;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{
        opacity: 0,
        ...offset(direction, distance),
        ...(blur ? { filter: "blur(10px)" } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(blur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

/**
 * Parent for a set of items that should cascade. Children must be
 * `<StaggerItem>` (or any `motion` element using the `hidden`/`show` names).
 */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.09,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
  as?: ElementType;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const Static = Component as React.ComponentType<
      React.PropsWithChildren<{ className?: string }>
    >;
    return <Static className={className}>{children}</Static>;
  }

  const Motion = (motion[Component as keyof typeof motion] ??
    motion.create(Component as ElementType)) as typeof motion.div;

  return (
    <Motion
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Motion>
  );
}

export function StaggerItem({
  children,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const Static = Component as React.ComponentType<
      React.PropsWithChildren<{ className?: string }>
    >;
    return <Static className={className}>{children}</Static>;
  }

  const Motion = (motion[Component as keyof typeof motion] ??
    motion.create(Component as ElementType)) as typeof motion.div;

  return (
    <Motion className={className} variants={itemVariants}>
      {children}
    </Motion>
  );
}

export { containerVariants, itemVariants, EASE, VIEWPORT };

/**
 * Headline reveal. Lines are supplied explicitly rather than measured, so the
 * break points are a typographic decision instead of a layout accident.
 */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  play = true,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  play?: boolean;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <span className={cn("block", className)}>
      {lines.map((line, index) => (
        <span
          key={index}
          // Extra bottom padding keeps descenders out of the clip.
          className="block overflow-hidden pb-[0.12em]"
        >
          {reducedMotion ? (
            <span className={cn("block", lineClassName)}>{line}</span>
          ) : (
            <motion.span
              className={cn("block", lineClassName)}
              initial={{ y: "108%", opacity: 0 }}
              animate={play ? { y: "0%", opacity: 1 } : undefined}
              transition={{
                duration: 1.05,
                delay: delay + index * 0.12,
                ease: EASE,
              }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}
