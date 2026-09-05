"use client";

import { SectionGlow } from "@/components/fx/aurora-background";
import { GlassCard } from "@/components/fx/glass-card";
import { Reveal, Stagger, StaggerItem } from "@/components/fx/reveal";
import { testimonials, type Testimonial } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

function Attribution({
  person,
  className,
}: {
  person: Testimonial;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center rounded-full border border-ice/[0.12] bg-linear-to-br from-ice/[0.14] to-ice/[0.02] font-mono text-[0.6875rem] tracking-[0.06em] text-ice/85"
      >
        {person.initials}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm text-ice">{person.name}</p>
        <p className="truncate text-xs text-mist">
          {person.role}, {person.company}
        </p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section id="voices" className="section-y relative">
      <SectionGlow className="left-1/3 top-1/3 size-[38rem]" tone="aqua" />

      <div className="shell relative">
        <Reveal blur={false} distance={14}>
          <span className="flex items-center gap-3">
            <span className="h-px w-8 bg-linear-to-r from-transparent to-aqua/70" />
            <span className="eyebrow">In their words</span>
          </span>
        </Reveal>

        {/* The strongest line is set as an editorial statement, not stacked into
            a grid of equal cards. One voice leads; the rest corroborate. */}
        {lead ? (
          <figure className="mt-10 max-w-4xl">
            <Reveal delay={0.06}>
              <blockquote className="font-display text-[1.5rem] leading-[1.32] tracking-[-0.028em] text-ice sm:text-[2rem] sm:leading-[1.28] lg:text-[2.5rem] lg:tracking-[-0.035em]">
                <span aria-hidden className="text-aqua/60">
                  “
                </span>
                {lead.quote}
                <span aria-hidden className="text-aqua/60">
                  ”
                </span>
              </blockquote>
            </Reveal>

            <Reveal delay={0.16} blur={false}>
              <figcaption className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Attribution person={lead} />
                {lead.metric ? (
                  <span className="flex items-center gap-2.5 rounded-pill border border-aqua/25 bg-aqua/[0.07] px-3.5 py-1.5">
                    <span className="size-1.5 rounded-full bg-aqua" />
                    <span
                      data-numeric
                      className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ice/90"
                    >
                      {lead.metric}
                    </span>
                  </span>
                ) : null}
              </figcaption>
            </Reveal>
          </figure>
        ) : null}

        <Stagger
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
          gap={0.07}
        >
          {rest.map((person) => (
            <StaggerItem key={person.id} className="h-full">
              <GlassCard
                as="figure"
                className="flex h-full flex-col p-6 hover:border-ice/[0.16]"
                glow={false}
              >
                <blockquote className="relative flex-1 text-[0.9375rem] leading-relaxed text-ice/85">
                  {person.quote}
                </blockquote>

                <figcaption className="relative mt-7 border-t border-ice/[0.07] pt-5">
                  <Attribution person={person} />
                  {person.metric ? (
                    <p
                      data-numeric
                      className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-aqua/85"
                    >
                      {person.metric}
                    </p>
                  ) : null}
                </figcaption>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
