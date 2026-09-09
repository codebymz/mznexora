"use client";

import { ArrowUpRight } from "lucide-react";

import { SectionGlow } from "@/components/fx/aurora-background";
import { GlassCard } from "@/components/fx/glass-card";
import { Reveal, Stagger, StaggerItem } from "@/components/fx/reveal";
import { SectionHeading } from "@/components/fx/section-heading";
import { TiltCard } from "@/components/fx/tilt-card";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { Button } from "@/components/ui/button";
import { caseStudies, type CaseStudy } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";

function CaseCard({ study, featured }: { study: CaseStudy; featured: boolean }) {
  return (
    <TiltCard className="h-full" intensity={featured ? 4 : 6} lift={featured ? 6 : 9}>
      <GlassCard
        className={cn(
          "flex h-full flex-col overflow-hidden p-6 hover:border-ice/20 sm:p-8",
          featured && "lg:p-10",
        )}
        glowColor="rgba(37,99,235,.16)"
      >
        {/* Ambient wash keyed to the case — the only per-card colour variance. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-linear-to-br blur-3xl transition-opacity duration-700 group-hover:opacity-100",
            study.wash,
            "opacity-60",
          )}
        />

        <div className="relative flex flex-wrap items-center justify-between gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mist">
          <div className="flex items-center gap-2.5">
            <span className="text-ice/70">{study.client}</span>
            <span className="h-px w-3 bg-ice/20" />
            <span>{study.sector}</span>
          </div>
          <div className="flex items-center gap-2.5">
            {study.status && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.6rem] font-medium tracking-wider",
                  study.status === "Live" &&
                    "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
                  study.status === "Coming Soon" &&
                    "border border-amber-500/30 bg-amber-500/10 text-amber-300",
                  study.status === "Private Project" &&
                    "border border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
                )}
              >
                {study.status === "Live" && (
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
                {study.status}
              </span>
            )}
            <span>{study.year}</span>
          </div>
        </div>

        <h3
          className={cn(
            "relative mt-6 text-h3 text-ice",
            featured
              ? "sm:text-[1.875rem] sm:leading-[1.15] sm:tracking-[-0.028em]"
              : "sm:text-[1.375rem] sm:tracking-[-0.02em]"
          )}
        >
          {study.link ? (
            <a
              href={study.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 transition-colors hover:text-aqua"
            >
              <span>{study.title}</span>
              <ArrowUpRight className="size-5 shrink-0 opacity-70 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:opacity-100" />
            </a>
          ) : (
            study.title
          )}
        </h3>

        <p
          className={cn(
            "relative mt-3.5 flex-1 text-sm leading-relaxed text-mist",
            featured && "sm:max-w-xl sm:text-[0.9375rem]",
          )}
        >
          {study.challenge}
        </p>

        {/* Outcome block: one number large, two supporting. */}
        <div
          className={cn(
            "relative mt-6 sm:mt-8 flex flex-wrap items-end gap-x-6 sm:gap-x-10 gap-y-4 sm:gap-y-5",
            featured && "sm:gap-x-14",
          )}
        >
          <div>
            <p
              data-numeric
              className={cn(
                "font-display font-semibold tracking-[-0.04em] text-ice",
                featured ? "text-[2.125rem] sm:text-[3.5rem]" : "text-[1.85rem] sm:text-[2.25rem]",
              )}
            >
              {study.headline.value}
            </p>
            <p className="mt-0.5 text-xs sm:text-[0.8125rem] text-mist">
              {study.headline.label}
            </p>
          </div>

          {study.supporting.map((item) => (
            <div key={item.label}>
              <p
                data-numeric
                className="font-display text-lg font-semibold tracking-[-0.02em] text-ice/80"
              >
                {item.value}
              </p>
              <p className="mt-0.5 text-xs text-mist">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ice/[0.07] pt-6">
          <ul className="flex flex-wrap gap-1.5">
            {study.services.map((service) => (
              <li
                key={service}
                className="rounded-pill border border-ice/[0.08] bg-ice/[0.03] px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-mist"
              >
                {service}
              </li>
            ))}
          </ul>

          {study.link && (
            <a
              href={study.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-aqua/30 bg-aqua/10 px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-aqua transition-all hover:border-aqua/60 hover:bg-aqua/20 shadow-xs"
            >
              Visit Project
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
      </GlassCard>
    </TiltCard>
  );
}

export function Portfolio() {
  const { scrollTo } = useSmoothScroll();
  const [featured, ...rest] = caseStudies;

  return (
    <section id="work" className="section-y relative overflow-hidden">
      <SectionGlow className="-left-24 bottom-1/4 size-[36rem]" tone="aqua" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="What I have built"
          title="Real projects, shipped solo."
          lead="These are the actual products I have designed and built — from AI-powered tools to web apps and automation workflows. No fake clients, no inflated numbers."
          aside={
            <Button variant="glass" size="lg" onClick={() => scrollTo("#contact")}>
              Start a project with me
              <ArrowUpRight />
            </Button>
          }
        />

        <div className="mt-16 grid gap-4 lg:mt-20 lg:grid-cols-2">
          {featured ? (
            <Reveal className="lg:col-span-2">
              <CaseCard study={featured} featured />
            </Reveal>
          ) : null}

          <Stagger className="lg:col-span-2 grid gap-4 lg:grid-cols-2" gap={0.08}>
            {rest.map((study) => (
              <StaggerItem key={study.id} className="h-full">
                <CaseCard study={study} featured={false} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
