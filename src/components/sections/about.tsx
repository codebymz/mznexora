"use client";

import { ArrowUpRight } from "lucide-react";

import { GlassCard } from "@/components/fx/glass-card";
import { Reveal, Stagger, StaggerItem } from "@/components/fx/reveal";
import { SectionGlow } from "@/components/fx/aurora-background";
import { SectionHeading } from "@/components/fx/section-heading";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/** Real facts about MZ Nexora — a one-person AI & automation startup. */
const FACTS = [
  { label: "Founded", value: String(site.founded) },
  { label: "Based in", value: "Pakistan" },
  { label: "Founder", value: "Solo — Muhammad Zain" },
  { label: "Type", value: "Indie Studio / Startup" },
  { label: "Email", value: site.email },
  { label: "Contact", value: site.phone },
];

export function About() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="about" className="section-y relative">
      <SectionGlow className="-left-40 top-20 size-[34rem]" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Who I am"
          title={
            <>
              A solo builder turning ideas into{" "}
              <span className="text-brand-gradient">real AI products</span> —
              one system at a time.
            </>
          }
          lead="MZ Nexora is me — one person, building real things. No big team, no corporate jargon. Just focused work: automations, AI agents, web tools, and workflows that actually run."
        />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Stagger className="space-y-6 text-lead text-dim">
              <StaggerItem as="p">
                I started MZ Nexora in {site.founded} because I saw a gap: businesses
                wanted AI and automation but could not afford big agencies, and
                freelancers rarely shipped complete, working systems. I do both —
                build and deliver — end to end, on my own.
              </StaggerItem>

              <StaggerItem as="p">
                I have built a personal portfolio site, a typing and internet speed
                checker called Speed Lab, a file conversion tool called Zapr, and
                an AI-powered exam paper generator called PaperGenAI for classes 9
                to 12. I also build n8n automations for real business workflows.
              </StaggerItem>

              <StaggerItem as="p">
                Every project I ship is something I built myself and believe in.
                If I take on your project, I am the one working on it — not a
                junior outsourced to someone else. Honest work, real results,
                clear communication.
              </StaggerItem>

              <StaggerItem>
                <Button
                  variant="ghost"
                  size="md"
                  className="group/link -ml-2 mt-2"
                  onClick={() => scrollTo("#work")}
                >
                  See what I have built
                  <ArrowUpRight className="transition-transform duration-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Button>
              </StaggerItem>
            </Stagger>
          </div>

          <Reveal
            direction="left"
            distance={32}
            delay={0.1}
            className="lg:col-span-5"
          >
            <GlassCard className="p-7 sm:p-8" glowColor="rgba(20,184,166,.14)">
              <p className="eyebrow">At a glance</p>

              <dl className="mt-6">
                {FACTS.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-6 border-b border-ice/[0.07] py-3.5 last:border-0 last:pb-0"
                  >
                    <dt className="text-[0.8125rem] text-mist">{fact.label}</dt>
                    <dd
                      data-numeric
                      className="text-right font-mono text-[0.8125rem] text-ice"
                    >
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="divider-glow mt-7" />

              <p className="mt-7 font-display text-[1.0625rem] leading-snug tracking-[-0.015em] text-ice/90">
                "I build things I would use myself. That is the only standard I
                work to."
              </p>
              <p className="mt-3 text-xs text-mist">
                Muhammad Zain · Founder, MZ Nexora
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
