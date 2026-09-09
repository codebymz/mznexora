"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";

import { CountUp } from "@/components/fx/count-up";
import { Magnetic } from "@/components/fx/magnetic";
import { MaskedLines } from "@/components/fx/reveal";
import { useIntroDone } from "@/components/providers/intro";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { Nexus } from "@/components/three/nexus";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { metrics, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const PROJECTS = [
  "Personal Portfolio",
  "Speed Lab",
  "Zapr",
  "PaperGenAI",
  "n8n Automations",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const introDone = useIntroDone();
  const { scrollTo } = useSmoothScroll();

  // The whole entrance is one orchestrated sequence keyed off the curtain.
  const cue = (delay: number) => ({
    initial: { opacity: 0, y: 22, filter: "blur(8px)" },
    animate: introDone
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 22, filter: "blur(8px)" },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-svh flex-col justify-between overflow-hidden pb-8 pt-32 sm:pb-10 lg:pt-36"
    >
      {/* The graph bleeds off the right edge on desktop and sits behind the
          copy on mobile, dimmed so text contrast never drops. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "opacity-45 sm:opacity-60 lg:opacity-100",
          "lg:left-auto lg:right-[-8%] lg:w-[62%]",
        )}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={introDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
          transition={{ duration: 2, delay: 0.25, ease: EASE }}
        >
          <Nexus />
        </motion.div>
      </div>

      <div className="shell relative grid flex-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-6">
          <motion.div {...cue(0.05)}>
            <Badge tone="live">Open to freelance projects</Badge>
          </motion.div>

          <h1 className="mt-7 text-display text-ice">
            <MaskedLines
              play={introDone}
              delay={0.18}
              lines={[
                <>Building the</>,
                <>
                  <span className="text-brand-gradient">Future</span> with AI
                </>,
              ]}
            />
          </h1>

          <motion.p {...cue(0.6)} className="mt-8 max-w-xl text-lead text-dim">
            I build AI automations, web tools, and n8n workflows — solo,
            end-to-end, and shipped for real. Speed Lab, Zapr, PaperGenAI,
            and more.
          </motion.p>

          <motion.div {...cue(0.72)} className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3">
            <Magnetic cap={9} className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollTo("#contact")}
                className="group/cta w-full sm:w-auto"
              >
                Start a project
                <ArrowUpRight className="transition-transform duration-400 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </Button>
            </Magnetic>

            <Magnetic cap={7} className="w-full sm:w-auto">
              <Button variant="glass" size="lg" onClick={() => scrollTo("#work")} className="w-full sm:w-auto">
                <Play />
                See the work
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div {...cue(0.86)} className="mt-14">
            <p className="eyebrow">Projects I&apos;ve built</p>
            <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              {PROJECTS.map((project) => (
                <li
                  key={project}
                  className="font-display text-sm font-medium text-ice/45 transition-colors duration-500 hover:text-ice/80"
                >
                  {project}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Floating readout. A specific, mundane detail from the product does
            more for credibility than another abstract 3D shape. */}
        <motion.div
          {...cue(1)}
          className="pointer-events-none hidden lg:col-span-5 lg:block xl:col-span-6"
        >
          <div className="ml-auto w-full max-w-[19rem] animate-float-slow">
            <div className="relative overflow-hidden rounded-2xl glass glass-rim p-5">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[0.625rem]">Live agent</span>
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 rounded-full bg-aqua animate-ping" />
                  <span className="relative size-1.5 rounded-full bg-aqua" />
                </span>
              </div>

              <p className="mt-3 font-mono text-[0.8125rem] text-ice">
                mz-nexora-studio
              </p>

              <dl className="mt-5 space-y-3">
                {[
                  { label: "Projects shipped", value: "5+" },
                  { label: "n8n automations", value: "3+" },
                  { label: "Solo-built", value: "100%" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-ice/[0.06] pb-2 last:border-0 last:pb-0"
                  >
                    <dt className="text-xs text-mist">{row.label}</dt>
                    <dd data-numeric className="font-mono text-xs text-ice">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div
              className="mt-4 ml-10 inline-flex items-center gap-2 rounded-pill glass px-3.5 py-2 animate-float"
              style={{ animationDelay: "-3s" }}
            >
              <span className="size-1.5 rounded-full bg-electric" />
              <span className="font-mono text-[0.6875rem] text-mist">
                Open for new projects
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Metrics rail — the hero's own footer, and the page's first glass slab. */}
      <motion.div {...cue(1.1)} className="shell relative mt-16">
        <div className="overflow-hidden rounded-glass glass glass-rim">
          <dl className="grid grid-cols-2 divide-ice/[0.07] md:grid-cols-4 md:divide-x">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-b border-ice/[0.07] px-6 py-6 md:border-b-0 lg:px-8"
              >
                <dd className="font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-ice lg:text-[2rem]">
                  <CountUp value={metric.value} suffix={metric.suffix} />
                </dd>
                <dt className="mt-1.5 text-[0.8125rem] text-mist">{metric.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <button
          type="button"
          onClick={() => scrollTo("#about")}
          className="group mx-auto mt-8 flex items-center gap-3 rounded-pill px-2 py-1 text-mist transition-colors duration-400 hover:text-ice"
        >
          <span className="eyebrow">Scroll</span>
          <span className="relative h-8 w-px overflow-hidden bg-ice/15">
            <span className="absolute inset-x-0 top-0 h-3 animate-[float_2.4s_ease-in-out_infinite] bg-linear-to-b from-aqua to-transparent" />
          </span>
          <ArrowDown className="size-3.5 transition-transform duration-400 group-hover:translate-y-0.5" />
        </button>
      </motion.div>

      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
