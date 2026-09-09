"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";

import { SectionGlow } from "@/components/fx/aurora-background";
import { Reveal } from "@/components/fx/reveal";
import { SectionHeading } from "@/components/fx/section-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { processSteps } from "@/lib/data/process";

export function Process() {
  const container = useRef<HTMLOListElement>(null);
  const beam = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const list = container.current;
    const rail = beam.current;
    if (!list || !rail) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      // The beam is the reader's position in the sequence — scrubbed, not timed.
      gsap.fromTo(
        rail,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 62%",
            end: "bottom 72%",
            scrub: 0.5,
          },
        },
      );

      list.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 68%",
          end: "bottom 45%",
          toggleClass: { targets: step, className: "is-active" },
        });
      });
    }, list);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="process" className="section-y relative">
      <SectionGlow className="left-1/4 top-10 size-[30rem]" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="How we work"
          title="Seven weeks, five stages, no surprises."
          lead="This is the standard shape of an engagement. You will know at every point what is being decided, what you are approving, and what happens if the numbers disappoint."
        />

        <ol ref={container} className="relative mt-16 lg:mt-20">
          {/* Rail: a dim track with a lit beam that fills as you read. */}
          <span
            aria-hidden
            className="absolute left-[1.1875rem] top-2 bottom-2 w-px bg-ice/[0.09] sm:left-[1.6875rem]"
          />
          <span
            ref={beam}
            aria-hidden
            className="absolute left-[1.1875rem] top-2 bottom-2 w-px origin-top bg-linear-to-b from-electric via-aqua to-aqua/0 sm:left-[1.6875rem]"
            style={{ transform: "scaleY(0)" }}
          />

          {processSteps.map((step, index) => (
            <li
              key={step.id}
              data-step
              className="process-step relative grid grid-cols-[2.5rem_1fr] gap-x-3.5 pb-9 last:pb-0 sm:grid-cols-[3.5rem_1fr] sm:gap-x-8 sm:pb-12 lg:grid-cols-[3.5rem_1fr_16rem]"
            >
              <div className="relative">
                <span className="process-node grid size-10 place-items-center rounded-xl sm:rounded-2xl border border-ice/[0.1] bg-ice/[0.03] font-mono text-xs text-mist sm:size-14 sm:text-[0.8125rem]">
                  {index === processSteps.length - 1 ? (
                    <Check className="size-4 sm:size-5" strokeWidth={1.8} />
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}
                </span>
              </div>

              <div className="pt-1.5">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-h3 text-ice sm:text-[1.5rem] sm:tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-aqua/80">
                    {step.duration}
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-mist">
                  {step.summary}
                </p>

                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 lg:hidden">
                  {step.outputs.map((output) => (
                    <li
                      key={output}
                      className="flex items-center gap-2 text-xs text-mist"
                    >
                      <span className="size-1 rounded-full bg-aqua/70" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>

              {/* On wide screens the deliverables get their own column, which
                  reads as a contract rather than a bullet list. */}
              <div className="hidden pt-2 lg:block">
                <p className="eyebrow text-[0.625rem]">You receive</p>
                <ul className="mt-3 space-y-2">
                  {step.outputs.map((output) => (
                    <li
                      key={output}
                      className="flex items-start gap-2.5 text-[0.8125rem] text-mist"
                    >
                      <span className="mt-[0.4rem] size-1 shrink-0 rounded-full bg-aqua/70" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-14">
          <p className="max-w-2xl text-sm leading-relaxed text-mist">
            <span className="text-ice">Week 7 is a real decision point.</span> If
            shadow-mode results do not beat the baseline we recorded in week one, we
            say so and you keep the architecture, the evaluation suite and the
            findings. Nobody is served by shipping a system that loses.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
