"use client";

import { ArrowUpRight } from "lucide-react";

import { GlassCard } from "@/components/fx/glass-card";
import { Reveal, Stagger, StaggerItem } from "@/components/fx/reveal";
import { SectionGlow } from "@/components/fx/aurora-background";
import { SectionHeading } from "@/components/fx/section-heading";
import { TiltCard } from "@/components/fx/tilt-card";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { Button } from "@/components/ui/button";
import { services, servicesByPractice, type Service } from "@/lib/data/services";
import { cn } from "@/lib/utils";

function ServiceCard({ service, featured }: { service: Service; featured: boolean }) {
  const Icon = service.icon;

  return (
    <TiltCard
      className={cn("h-full", featured && "sm:col-span-2")}
      intensity={featured ? 5 : 7}
      lift={8}
    >
      <GlassCard
        className="flex h-full flex-col p-6 hover:border-ice/20 sm:p-7"
        glowColor={
          service.practice === "product"
            ? "rgba(20,184,166,.16)"
            : "rgba(37,99,235,.17)"
        }
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-xl border text-ice transition-colors duration-500",
              service.practice === "product"
                ? "border-aqua/25 bg-aqua/10 group-hover:border-aqua/45"
                : "border-electric/25 bg-electric/10 group-hover:border-electric/45",
            )}
          >
            <Icon className="size-5" strokeWidth={1.6} />
          </span>

          <ArrowUpRight className="size-4 shrink-0 text-mist opacity-0 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </div>

        <h3
          className={cn(
            "mt-6 text-h3 text-ice",
            featured && "sm:text-[1.5rem] sm:tracking-[-0.02em]",
          )}
        >
          {service.title}
        </h3>

        <p
          className={cn(
            "mt-3 flex-1 text-sm leading-relaxed text-mist",
            featured && "sm:max-w-lg sm:text-[0.9375rem]",
          )}
        >
          {service.blurb}
        </p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {service.deliverables.map((item) => (
            <li
              key={item}
              className="rounded-pill border border-ice/[0.08] bg-ice/[0.03] px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-mist"
            >
              {item}
            </li>
          ))}
        </ul>
      </GlassCard>
    </TiltCard>
  );
}

export function Services() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="services" className="section-y relative overflow-hidden">
      <SectionGlow className="-right-32 top-1/3 size-[38rem]" tone="aqua" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Sixteen services, three practices, one accountable&nbsp;team.
            </>
          }
          lead="Engagements usually start in one practice and pull in another once the first system is live. Nothing here is sold as a standalone package that ignores what happens next."
          aside={
            <div className="flex items-baseline gap-3 rounded-pill glass px-5 py-3">
              <span
                data-numeric
                className="font-display text-2xl font-semibold text-ice"
              >
                {services.length}
              </span>
              <span className="max-w-[7rem] text-xs leading-tight text-mist">
                capabilities under one contract
              </span>
            </div>
          }
        />

        <div className="mt-16 space-y-14 lg:mt-20 lg:space-y-20">
          {servicesByPractice.map((practice, practiceIndex) => (
            <div key={practice.id}>
              {/* Practice header: the structural device that turns a price list
                  into an organisation chart. */}
              <Reveal blur={false} distance={16}>
                <div className="flex flex-col gap-4 border-b border-ice/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-mist">
                      {String(practiceIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-h3 text-ice sm:text-[1.5rem] sm:tracking-[-0.02em]">
                      {practice.name}
                    </h3>
                  </div>

                  <p className="max-w-md text-sm text-mist sm:text-right">
                    {practice.summary}
                  </p>
                </div>
              </Reveal>

              <Stagger
                className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                gap={0.06}
              >
                {practice.items.map((service) => (
                  <StaggerItem key={service.id} className="h-full">
                    <ServiceCard
                      service={service}
                      featured={Boolean(service.featured)}
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 sm:mt-16">
          <div className="relative overflow-hidden rounded-glass glass-raised glass-rim px-5 py-6 sm:px-10 sm:py-9">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h3 className="text-h3 text-ice sm:text-[1.375rem]">
                  Not sure which of these you need?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  Send us the process that is costing you the most time. We will
                  tell you whether it is worth automating — and say so plainly
                  when it is not.
                </p>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="shrink-0 w-full sm:w-auto"
                onClick={() => scrollTo("#contact")}
              >
                Book a diagnosis
                <ArrowUpRight />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
