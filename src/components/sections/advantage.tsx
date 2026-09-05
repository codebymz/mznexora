"use client";

import { SectionGlow } from "@/components/fx/aurora-background";
import { Reveal, Stagger, StaggerItem } from "@/components/fx/reveal";
import { SectionHeading } from "@/components/fx/section-heading";
import { advantages } from "@/lib/data/advantages";

export function Advantage() {
  return (
    <section id="advantage" className="section-y relative">
      <SectionGlow className="-right-40 top-1/4 size-[34rem]" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Why us"
          title="Six commitments, each one checkable."
          lead="Everything below is either in the contract or visible in the first two weeks. We would rather be held to specifics than described as innovative."
        />

        {/* Deliberately not cards. A ruled list reads as a document you could
            sign, which is the register this section needs. */}
        <Stagger className="mt-14 lg:mt-16" gap={0.07}>
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;

            return (
              <StaggerItem key={advantage.id}>
                <div className="group grid grid-cols-1 items-start gap-x-8 gap-y-4 border-t border-ice/[0.08] py-8 transition-colors duration-500 hover:border-ice/20 last:border-b lg:grid-cols-[3rem_1fr_18rem] lg:py-9">
                  <div className="flex items-center gap-4 lg:block">
                    <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-mist transition-colors duration-500 group-hover:text-aqua">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="grid size-9 place-items-center rounded-lg border border-ice/[0.09] bg-ice/[0.03] text-mist transition-colors duration-500 group-hover:border-aqua/30 group-hover:text-ice lg:mt-4">
                      <Icon className="size-4" strokeWidth={1.6} />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-h3 text-ice sm:text-[1.375rem] sm:tracking-[-0.02em]">
                      {advantage.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-mist">
                      {advantage.body}
                    </p>
                  </div>

                  <div className="lg:pt-1.5 lg:text-right">
                    <p className="eyebrow text-[0.625rem]">Proof</p>
                    <p
                      data-numeric
                      className="mt-2 font-mono text-[0.8125rem] text-ice"
                    >
                      {advantage.proof}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-col gap-6 rounded-glass glass glass-rim px-7 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9">
            <p className="max-w-xl text-sm leading-relaxed text-mist">
              <span className="text-ice">A short list of what we do not do:</span>{" "}
              staff augmentation, unbounded time-and-materials contracts, and
              pilots with no agreed production criteria.
            </p>
            <p className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-aqua/80">
              Stated up front
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
