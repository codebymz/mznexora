"use client";

import Link from "next/link";
import { ArrowUp, Mail, Phone } from "lucide-react";

import { Wordmark } from "@/components/brand/wordmark";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { practices } from "@/lib/data/services";
import { navLinks, site, socials } from "@/lib/site";

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Security", href: "/security" },
] as const;

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ice/[0.07]">
      {/* One last wash of brand light, then silence. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[min(46rem,100vw)] -translate-x-1/2 rounded-full bg-electric/12 blur-[120px]"
      />

      <div className="shell relative pt-20 pb-10 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Wordmark />

            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-mist">
              {site.tagline}. Applied intelligence, product engineering and
              demand, run by the same senior team from diagnosis to handover.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-sm text-ice transition-colors duration-300 hover:text-aqua"
              >
                <Mail className="size-4" strokeWidth={1.6} />
                {site.email}
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="inline-flex items-center gap-2 text-sm text-mist transition-colors duration-300 hover:text-ice"
              >
                <Phone className="size-4" strokeWidth={1.6} />
                {site.phone}
              </a>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7"
          >
            <div>
              <p className="eyebrow text-[0.625rem]">Practices</p>
              <ul className="mt-5 space-y-3">
                {practices.map((practice) => (
                  <li key={practice.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo("#services")}
                      className="text-left text-sm text-mist transition-colors duration-300 hover:text-ice"
                    >
                      {practice.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-[0.625rem]">Company</p>
              <ul className="mt-5 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className="text-left text-sm text-mist transition-colors duration-300 hover:text-ice"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-[0.625rem]">Elsewhere</p>
              <ul className="mt-5 space-y-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-mist transition-colors duration-300 hover:text-ice"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="eyebrow mt-8 text-[0.625rem]">Based in</p>
              <p className="mt-4 text-sm leading-relaxed text-mist">
                Pakistan · Available worldwide
              </p>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-ice/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mist/80">
            © {year} {site.legalName} · Pakistan
          </p>

          <div className="flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mist/80 transition-colors duration-300 hover:text-ice"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => scrollTo("#hero")}
              className="group inline-flex items-center gap-2 rounded-pill glass glass-rim px-3.5 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-mist transition-colors duration-400 hover:text-ice"
            >
              Top
              <ArrowUp className="size-3 transition-transform duration-400 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Wordmark as texture: clipped by the footer, never fully seen. */}
      <span
        aria-hidden
        className="pointer-events-none block select-none bg-linear-to-b from-ice/[0.055] to-ice/0 bg-clip-text text-center font-display text-[clamp(4rem,15vw,13rem)] font-semibold leading-[0.78] tracking-[-0.05em] text-transparent"
      >
        MZ NEXORA
      </span>
    </footer>
  );
}
