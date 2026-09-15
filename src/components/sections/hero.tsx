"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";

import { CountUp } from "@/components/fx/count-up";
import { Magnetic } from "@/components/fx/magnetic";
import { useIntroDone } from "@/components/providers/intro";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { Nexus } from "@/components/three/nexus";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { metrics, site } from "@/lib/site";

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
      className="relative isolate flex min-h-svh flex-col justify-between overflow-hidden pb-10 pt-32 sm:pb-12 lg:pt-36"
    >
      {/* 3D Parametric Cyber Wave Mesh Canvas — Full-bleed dynamic backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Ambient Neon Backlights */}
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-radial from-electric/20 via-aqua/10 to-transparent blur-3xl" />
        <div className="absolute bottom-[-10%] left-1/4 size-[480px] rounded-full bg-radial from-[#d946ef]/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-[-10%] right-1/4 size-[520px] rounded-full bg-radial from-aqua/20 via-transparent to-transparent blur-3xl" />

        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={introDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.8, delay: 0.2, ease: EASE }}
        >
          <Nexus />
        </motion.div>
      </div>

      {/* Main Centered Hero Content (Matching reference screenshot) */}
      <div className="shell relative z-10 mx-auto flex flex-1 flex-col items-center justify-center text-center max-w-4xl pt-6 sm:pt-10">
        <motion.div {...cue(0.05)} className="flex justify-center">
          <Badge tone="live">Autonomous AI & Next-Gen Systems</Badge>
        </motion.div>

        {/* Dual-tone Headline matching reference image */}
        <h1 className="mt-6 sm:mt-8 text-display text-ice tracking-tight">
          <motion.span
            className="block bg-gradient-to-r from-[#d946ef] via-[#38bdf8] to-[#06b6d4] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]"
            {...cue(0.18)}
          >
            Building Autonomous AI.
          </motion.span>
          <motion.span
            className="block text-white mt-1.5 sm:mt-3"
            {...cue(0.32)}
          >
            Scalable Systems.
          </motion.span>
        </h1>

        {/* Centered Descriptive Lead */}
        <motion.p
          {...cue(0.5)}
          className="mt-6 sm:mt-8 max-w-2xl text-lead text-dim/90 font-normal leading-relaxed"
        >
          Our technology powers next-generation AI agents, autonomous n8n workflows,
          and high-velocity web engines designed to eliminate friction and scale operations effortlessly.
        </motion.p>

        {/* Centered Dual Action Buttons (matching the reference image's pill styles) */}
        <motion.div
          {...cue(0.68)}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic cap={8}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollTo("#contact")}
              className="group/cta px-8 py-3.5 rounded-pill bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-medium shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(37,99,235,0.65)] hover:scale-[1.02] transition-all duration-300"
            >
              Get started
              <ArrowUpRight className="transition-transform duration-400 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Button>
          </Magnetic>

          <Magnetic cap={8}>
            <Button
              variant="glass"
              size="lg"
              onClick={() => scrollTo("#work")}
              className="px-8 py-3.5 rounded-pill border border-purple-500/30 bg-purple-950/20 text-ice/90 backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-cyan-400/50 hover:bg-cyan-950/30 hover:text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:scale-[1.02] transition-all duration-300"
            >
              <Play className="size-3.5 fill-current text-cyan-400" />
              Ecosystems
            </Button>
          </Magnetic>
        </motion.div>

        {/* Featured Tags / Project Pills */}
        <motion.div {...cue(0.82)} className="mt-10 sm:mt-14 flex flex-col items-center">
          <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {PROJECTS.map((project) => (
              <li
                key={project}
                className="rounded-pill border border-ice/10 bg-ice/[0.03] px-3.5 py-1 font-display text-xs font-medium text-ice/75 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-ice hover:shadow-[0_0_12px_rgba(6,182,212,0.2)]"
              >
                {project}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Metrics rail and scroll indicator */}
      <motion.div {...cue(0.95)} className="shell relative z-10 mt-12 sm:mt-16">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-glass glass glass-rim bg-abyss/85 backdrop-blur-2xl">
          <dl className="grid grid-cols-2 divide-x divide-y divide-ice/[0.08] sm:divide-y-0 md:grid-cols-4 md:divide-x">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="px-4 py-4 sm:px-6 sm:py-5 border-b sm:border-b-0 border-ice/[0.07] text-center"
              >
                <dd className="font-display text-[1.5rem] sm:text-[1.75rem] font-semibold tracking-[-0.03em] text-ice">
                  <CountUp value={metric.value} suffix={metric.suffix} />
                </dd>
                <dt className="mt-1 text-xs text-mist">{metric.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <button
          type="button"
          onClick={() => scrollTo("#about")}
          className="group mx-auto mt-6 flex items-center gap-2.5 rounded-pill border border-ice/15 bg-ice/[0.04] px-4 py-1.5 text-xs font-medium text-mist backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-ice shadow-xs focus-visible:outline-2 focus-visible:outline-aqua"
          aria-label="Scroll down to About section"
        >
          <span>Scroll</span>
          <span className="relative h-5 w-px overflow-hidden bg-ice/20">
            <span className="absolute inset-x-0 top-0 h-2 animate-[float_2.4s_ease-in-out_infinite] bg-gradient-to-b from-cyan-400 to-transparent" />
          </span>
          <ArrowDown className="size-3.5 transition-transform duration-400 group-hover:translate-y-0.5" />
        </button>
      </motion.div>

      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
