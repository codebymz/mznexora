"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Wordmark } from "@/components/brand/wordmark";
import { Magnetic } from "@/components/fx/magnetic";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import { navLinks, sectionIds, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollTo, stop, start } = useSmoothScroll();
  const active = useActiveSection(sectionIds);
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setCondensed(value > 40);
  });

  const go = useCallback(
    (href: string) => {
      setMenuOpen(false);
      if (pathname !== "/") {
        router.push("/" + (href.startsWith("#") ? href : ""));
        return;
      }
      // Let the menu begin closing before the scroll starts.
      window.setTimeout(() => scrollTo(href), menuOpen ? 260 : 0);
    },
    [scrollTo, menuOpen, pathname, router],
  );

  useEffect(() => {
    if (menuOpen) stop();
    else start();
  }, [menuOpen, stop, start]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#about"
        onClick={(event) => {
          event.preventDefault();
          go("#about");
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[120] focus:rounded-pill focus:bg-ice focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-abyss"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4 sm:px-6 sm:pt-5"
      >
        <nav
          aria-label="Main"
          className={cn(
            "relative flex w-full max-w-6xl items-center justify-between gap-4 overflow-hidden rounded-pill glass glass-rim",
            "transition-[padding,background-color,border-color,box-shadow,backdrop-filter] duration-600 ease-glass",
            condensed
              ? "px-3 py-2 sm:px-4 sm:py-2 [--blur-glass:34px]"
              : "px-3 py-2.5 sm:px-5 sm:py-3.5",
          )}
        >
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              go("#hero");
            }}
            className="shrink-0 rounded-pill pl-1 pr-2"
            aria-label={`${site.name} — home`}
          >
            <Wordmark />
          </a>

          {/* Desktop links. The indicator is a shared layout element, so it
              slides between items instead of cross-fading. */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;

              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      go(link.href);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-pill px-4 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-ice" : "text-mist hover:text-ice",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-indicator"
                        aria-hidden
                        className="absolute inset-0 rounded-pill border border-ice/12 bg-ice/[0.07]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <Magnetic className="hidden sm:inline-flex" cap={6} strength={0.18}>
              <Button
                variant="primary"
                size={condensed ? "sm" : "md"}
                onClick={() => go("#contact")}
                className="group/cta"
              >
                Start a project
                <ArrowUpRight className="transition-transform duration-400 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </Button>
            </Magnetic>

            <Button
              variant="glass"
              size="icon"
              className="lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Reading progress, drawn on the pill's lower rim. */}
          <motion.span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r from-electric via-aqua to-electric"
            style={{ scaleX: scrollYProgress }}
          />
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="fixed inset-0 z-[95] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-abyss/80 backdrop-blur-2xl"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="absolute inset-x-4 top-24 overflow-hidden rounded-glass glass-raised glass-rim p-6 pb-7 sm:inset-x-6"
              initial={{ y: -18, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.05, duration: 0.4 }}
                    className="border-b border-ice/[0.07] last:border-0"
                  >
                    <a
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault();
                        go(link.href);
                      }}
                      className="flex items-baseline justify-between py-4 font-display text-2xl font-medium tracking-[-0.02em] text-ice"
                    >
                      {link.label}
                      <span className="font-mono text-[0.625rem] text-mist">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <Button
                variant="primary"
                size="lg"
                className="mt-6 w-full"
                onClick={() => go("#contact")}
              >
                Start a project
                <ArrowUpRight />
              </Button>

              <a
                href={`mailto:${site.email}`}
                className="mt-4 block text-center font-mono text-xs text-mist transition-colors hover:text-ice"
              >
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
