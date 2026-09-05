"use client";

import {
  forwardRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { usePointerGlow } from "@/hooks/use-pointer-glow";
import { useIsTouch } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** `raised` is for cards that sit on top of other glass. */
  tier?: "base" | "raised";
  /** Pointer-tracking radial light inside the card. */
  glow?: boolean;
  /** Specular streak that sweeps across on hover. */
  sheen?: boolean;
  glowColor?: string;
  /** Swap the element when semantics ask for it, e.g. `figure` or `article`. */
  as?: ElementType;
};

/**
 * The workhorse surface. Four stacked layers make the glass read as physical:
 * frosted fill, lit rim, pointer-tracked interior light, and a sweeping
 * specular highlight.
 *
 * The two light layers sit at a negative z-index inside an isolated stacking
 * context, so they float above the frosted fill but below content — which
 * means `children` stay direct children of the root and layout utilities
 * (`flex-1`, `mt-auto`, grid placement) behave exactly as written.
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard(
    {
      children,
      className,
      tier = "base",
      glow = true,
      sheen = true,
      glowColor = "rgba(37,99,235,.16)",
      as = "div",
      ...rest
    },
    forwardedRef,
  ) {
    const isTouch = useIsTouch();
    const glowRef = usePointerGlow<HTMLDivElement>(glow && !isTouch);
    // Cast so JSX resolves against a known intrinsic; the runtime tag is `as`.
    const Component = as as "div";

    return (
      <Component
        ref={forwardedRef}
        className={cn(
          "group relative isolate overflow-hidden rounded-glass",
          tier === "raised" ? "glass-raised" : "glass",
          "glass-rim transition-[transform,box-shadow,border-color] duration-500 ease-glass",
          className,
        )}
        {...rest}
      >
        {/* Pointer light. Positioned from CSS custom props written on rAF. */}
        {glow && !isTouch ? (
          <div
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[var(--glow-opacity,0)] transition-opacity duration-500"
            style={{
              background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), ${glowColor}, transparent 68%)`,
            }}
          />
        ) : null}

        {sheen ? <span aria-hidden className="glass-sheen -z-10" /> : null}

        {children}
      </Component>
    );
  },
);
