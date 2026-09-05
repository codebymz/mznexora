"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Counts to `value` once, when scrolled into view. */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1600,
  decimals,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  const places = decimals ?? (Number.isInteger(value) ? 0 : 1);

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out cubic: fast commitment, soft landing.
      setDisplay(value * (1 - Math.pow(1 - progress, 3)));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reducedMotion]);

  return (
    <span ref={ref} data-numeric className={cn("inline-block", className)}>
      {prefix}
      {display.toFixed(places)}
      {suffix}
    </span>
  );
}
