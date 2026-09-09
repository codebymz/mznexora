import type { ReactNode } from "react";

import { Reveal } from "@/components/fx/reveal";
import { cn } from "@/lib/utils";

/**
 * Every section opens the same way: a mono label, a display heading, and at
 * most one paragraph of framing. Consistency here is what makes the varied
 * section layouts feel like one document.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  aside,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Optional right-hand slot, e.g. a CTA or a stat. Desktop only placement. */
  aside?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-wrap gap-8 lg:flex-nowrap lg:flex-row lg:items-end lg:justify-between",
        centered && "lg:flex-col lg:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "text-center")}>
        <Reveal blur={false} distance={14}>
          <span
            className={cn(
              "flex items-center gap-3",
              centered && "justify-center",
            )}
          >
            <span className="h-px w-8 bg-linear-to-r from-transparent to-aqua/70" />
            <span className="eyebrow">{eyebrow}</span>
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-5 text-h2 text-ice">{title}</h2>
        </Reveal>

        {lead ? (
          <Reveal delay={0.16} blur={false}>
            <p
              className={cn(
                "mt-5 text-lead text-dim",
                centered && "mx-auto max-w-xl",
              )}
            >
              {lead}
            </p>
          </Reveal>
        ) : null}
      </div>

      {aside ? (
        <Reveal delay={0.22} className="shrink-0">
          {aside}
        </Reveal>
      ) : null}
    </div>
  );
}
