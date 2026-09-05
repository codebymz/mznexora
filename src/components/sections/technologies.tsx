"use client";

import { SectionGlow } from "@/components/fx/aurora-background";
import { Marquee } from "@/components/fx/marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/fx/reveal";
import { SectionHeading } from "@/components/fx/section-heading";
import { allTech, techGroups } from "@/lib/data/technologies";

/** Ghosted outline type — texture, deliberately low contrast, aria-hidden. */
function TechBand({ items, reverse }: { items: readonly string[]; reverse?: boolean }) {
  return (
    <Marquee reverse={reverse} duration={reverse ? 58 : 66}>
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="flex select-none items-center gap-10 whitespace-nowrap px-5 font-display text-[1.75rem] font-semibold tracking-[-0.02em] text-ice/[0.09] sm:text-[2.25rem]"
        >
          {item}
          <span className="size-1 rounded-full bg-aqua/25" />
        </span>
      ))}
    </Marquee>
  );
}

export function Technologies() {
  const half = Math.ceil(allTech.length / 2);

  return (
    <section id="stack" className="section-y relative overflow-hidden">
      <SectionGlow className="right-1/4 top-0 size-[32rem]" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="The stack"
          title="Chosen for the job, not for the logo wall."
          lead="We are deliberately unromantic about tools. Every choice below has a reason we can defend in a review, and we will happily argue for the boring option when it wins."
        />
      </div>

      {/* Full-bleed texture band — the only element allowed outside the shell. */}
      <div
        aria-hidden
        className="relative mt-14 space-y-2 lg:mt-16"
      >
        <TechBand items={allTech.slice(0, half)} />
        <TechBand items={allTech.slice(half)} reverse />
      </div>

      <div className="shell relative mt-14 lg:mt-16">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {techGroups.map((group) => (
            <StaggerItem key={group.id} className="h-full">
              <div className="h-full rounded-glass glass glass-rim p-6">
                <div className="flex items-baseline justify-between">
                  <p className="eyebrow">{group.label}</p>
                  <span data-numeric className="font-mono text-[0.625rem] text-mist/70">
                    {group.items.length}
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-pill border border-ice/[0.08] bg-ice/[0.035] px-3 py-1.5 text-[0.8125rem] text-ice/80 transition-colors duration-400 hover:border-aqua/30 hover:text-ice"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10">
          <p className="max-w-2xl text-sm leading-relaxed text-mist">
            <span className="text-ice">Model-agnostic by design.</span> Providers
            are configuration, not architecture — swapping the reasoning layer
            should be a routing change and an eval run, never a rewrite.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
