"use client";

import { ArrowUpRight, Mail } from "lucide-react";

import { SectionGlow } from "@/components/fx/aurora-background";
import { Reveal, Stagger, StaggerItem } from "@/components/fx/reveal";
import { SectionHeading } from "@/components/fx/section-heading";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/data/faq";
import { site } from "@/lib/site";

export function Faq() {
  const { scrollTo } = useSmoothScroll();
  const first = faqs[0];

  return (
    <section id="faq" className="section-y relative">
      <SectionGlow className="-left-32 top-1/4 size-[32rem]" />

      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          {/* Sticky so the framing stays with the reader through nine answers. */}
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Straight answers"
              title="The nine questions we get asked before every contract."
              lead="Including the money and the parts that occasionally go wrong. If something you need is missing, ask and we will answer it just as plainly."
            />

            <Reveal delay={0.24} className="mt-10">
              <div className="rounded-glass glass glass-rim p-6">
                <p className="text-sm leading-relaxed text-ice">
                  Rather ask a person?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  Send one paragraph about what you are trying to fix. You will
                  get a reply from an engineer, usually inside a day.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button size="sm" onClick={() => scrollTo("#contact")}>
                    Start a conversation
                    <ArrowUpRight />
                  </Button>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 rounded-pill px-2 py-1 text-[0.8125rem] text-mist transition-colors duration-300 hover:text-ice"
                  >
                    <Mail className="size-3.5" />
                    {site.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          {/* Radix tracks items through context, so the stagger wrapper between
              root and items is free — no structural constraint broken. */}
          <Accordion type="single" collapsible defaultValue={first?.id}>
            <Stagger className="grid gap-3" gap={0.05}>
              {faqs.map((faq) => (
                <StaggerItem key={faq.id}>
                  <AccordionItem value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </Stagger>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
