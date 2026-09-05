import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors",
  {
    variants: {
      tone: {
        neutral: "border-ice/12 bg-ice/[0.04] text-mist",
        electric: "border-electric/30 bg-electric/12 text-ice",
        aqua: "border-aqua/30 bg-aqua/12 text-ice",
        /** For a live signal — pair with a pulsing dot. */
        live: "border-aqua/35 bg-aqua/10 text-ice",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {tone === "live" ? (
        <span aria-hidden className="relative flex size-1.5">
          <span className="absolute inset-0 rounded-full bg-aqua animate-ping" />
          <span className="relative size-1.5 rounded-full bg-aqua" />
        </span>
      ) : null}
      {children}
    </span>
  );
}
