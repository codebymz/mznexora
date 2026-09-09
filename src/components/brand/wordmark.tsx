import Image from "next/image";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The mark is a three-segment graph: two rails and a diagonal, with a node at
 * each junction. It reads as a "Z" and as a workflow — which is the business.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-full", className)}
    >
      <defs>
        <linearGradient id="mzn-mark" x1="4" y1="4" x2="28" y2="28">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="45%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
      </defs>

      <path
        d="M8 8.5h16L8 23.5h16"
        stroke="url(#mzn-mark)"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {[
        [8, 8.5],
        [24, 8.5],
        [8, 23.5],
        [24, 23.5],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="2.6"
          fill="#0B1120"
          stroke="url(#mzn-mark)"
          strokeWidth="1.6"
        />
      ))}
    </svg>
  );
}

export function Wordmark({
  className,
  showMark = true,
  useCustomLogo = true,
}: {
  className?: string;
  showMark?: boolean;
  useCustomLogo?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      {showMark ? (
        <span className="relative grid size-9 shrink-0 place-items-center rounded-xl glass glass-rim overflow-hidden p-0.5">
          {useCustomLogo && site.logo?.path ? (
            <Image
              src={site.logo.path}
              alt={site.logo.alt}
              width={36}
              height={36}
              className="size-full object-cover rounded-lg"
              priority
            />
          ) : (
            <Monogram className="size-5" />
          )}
        </span>
      ) : null}
      <span className="font-display text-[0.98rem] font-semibold tracking-[-0.01em] text-ice">
        MZ&nbsp;Nexora
      </span>
    </span>
  );
}

