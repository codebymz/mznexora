import { cn } from "@/lib/utils";

/**
 * Page-wide atmosphere: three drifting light fields, a blueprint grid, and a
 * film grain. Fixed and non-interactive, so it costs one composited layer for
 * the whole document rather than one per section.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-abyss",
        className,
      )}
    >
      {/* Deep vertical wash — keeps the top of the page brighter than the base. */}
      <div className="absolute inset-0 bg-linear-to-b from-obsidian/80 via-abyss to-abyss" />

      <div className="absolute -left-[18%] -top-[22%] size-[62rem] rounded-full bg-electric/22 blur-[150px] animate-aurora" />
      <div
        className="absolute -right-[14%] top-[8%] size-[48rem] rounded-full bg-aqua/16 blur-[140px] animate-aurora"
        style={{ animationDelay: "-7s", animationDuration: "26s" }}
      />
      <div
        className="absolute bottom-[-20%] left-[28%] size-[54rem] rounded-full bg-electric/14 blur-[160px] animate-drift"
        style={{ animationDelay: "-11s" }}
      />

      <div className="grid-veil absolute inset-0 opacity-70 mask-fade-b" />

      {/* Vignette: pushes focus to the centre column. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 40%, rgba(11,17,32,.72) 100%)",
        }}
      />

      <div className="noise-veil absolute inset-0" />
    </div>
  );
}

/**
 * Section-scoped light. Use sparingly — one per section at most, positioned to
 * lead the eye toward that section's subject.
 */
export function SectionGlow({
  className,
  tone = "electric",
}: {
  className?: string;
  tone?: "electric" | "aqua";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-[130px]",
        tone === "electric" ? "bg-electric/14" : "bg-aqua/12",
        className,
      )}
    />
  );
}
