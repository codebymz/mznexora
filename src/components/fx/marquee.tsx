import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Infinite horizontal rail. The track is duplicated once and translated -50%,
 * which lands the copy exactly on the seam at every loop.
 */
export function Marquee({
  children,
  reverse = false,
  duration = 42,
  className,
  pauseOnHover = true,
}: {
  children: ReactNode;
  reverse?: boolean;
  /** Seconds for one full pass. Slower reads as more expensive. */
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("group/marquee mask-fade-x overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
