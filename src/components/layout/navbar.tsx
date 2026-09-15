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
        className="fixed inset-x-0 top-0 z-[100] flex justify-center px-3 pt-3 sm:px-6 sm:pt-5"
      >
        <nav
          aria-label="Main"
          className={cn(
            "relative flex w-full max-w-6xl items-center justify-between gap-2 sm:gap-4 rounded-pill glass glass-rim",
            "transition-[padding,background-color,border-color,box-shadow,backdrop-filter] duration-600 ease-glass",
            condensed
              ? "px-3 py-1.5 sm:px-4 sm:py-2 [--blur-glass:34px]"
              : "px-3.5 py-2 sm:px-5 sm:py-3.5",
          )}
        >
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              go("#hero");
            }}
            className="shrink-0 rounded-pill py-0.5 pl-0.5 pr-1.5"
            aria-label={`${site.name} — home`}
          >
            <Wordmark />
          </a>

          {/* Desktop links in center */}
          <ul className="hidden items-center gap-1 md:flex">
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
                      "relative block rounded-pill px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-colors duration-300",
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

          {/* Social icons & CTA on the right (matching reference image) */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden items-center gap-2.5 sm:flex">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="size-8 rounded-full flex items-center justify-center text-mist hover:text-ice hover:bg-ice/10 transition-colors"
                aria-label="GitHub"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="size-8 rounded-full flex items-center justify-center text-mist hover:text-ice hover:bg-ice/10 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92m1.37 9.74v-8.37H5.09v8.37h2.74z" />
                </svg>
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="size-8 rounded-full flex items-center justify-center text-mist hover:text-ice hover:bg-ice/10 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.33C9.35 7.33 9.06 7.4 8.81 7.67C8.56 7.94 7.86 8.59 7.86 9.93C7.86 11.27 8.84 12.56 8.97 12.74C9.11 12.92 10.9 15.68 13.64 16.86C14.29 17.14 14.8 17.31 15.19 17.44C15.84 17.65 16.44 17.62 16.91 17.55C17.43 17.47 18.52 16.89 18.75 16.24C18.98 15.6 18.98 15.05 18.91 14.93C18.84 14.82 18.66 14.75 18.39 14.61C18.11 14.47 16.78 13.82 16.53 13.73C16.28 13.64 16.1 13.59 15.91 13.87C15.73 14.15 15.22 14.75 15.06 14.93C14.91 15.12 14.75 15.14 14.48 15C14.2 14.87 13.33 14.58 12.29 13.66C11.48 12.94 10.94 12.05 10.78 11.78C10.63 11.5 10.76 11.36 10.9 11.22C11.03 11.09 11.18 10.89 11.32 10.73C11.46 10.57 11.51 10.45 11.6 10.27C11.69 10.09 11.65 9.93 11.58 9.79C11.51 9.65 10.96 8.31 10.73 7.76C10.51 7.23 10.29 7.3 10.13 7.3C9.97 7.3 9.79 7.33 9.53 7.33Z" />
                </svg>
              </a>
              <a
                href={site.pinterest}
                target="_blank"
                rel="noreferrer"
                className="size-8 rounded-full flex items-center justify-center text-mist hover:text-ice hover:bg-ice/10 transition-colors"
                aria-label="Pinterest"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.225-.175.271-.403.165-1.503-.699-2.443-2.894-2.443-4.656 0-3.791 2.754-7.275 7.944-7.275 4.17 0 7.411 2.972 7.411 6.943 0 4.143-2.612 7.478-6.238 7.478-1.218 0-2.364-.633-2.756-1.382l-.749 2.854c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12.004-5.373 12.004-11.999C24.018 5.367 18.644 0 12.017 0z" />
                </svg>
              </a>
            </div>

            <Magnetic className="hidden sm:inline-flex" cap={6} strength={0.18}>
              <Button
                variant="primary"
                size={condensed ? "sm" : "md"}
                onClick={() => go("#contact")}
                className="group/cta shadow-[0_0_18px_rgba(37,99,235,0.35)]"
              >
                Contact
                <ArrowUpRight className="transition-transform duration-400 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </Button>
            </Magnetic>

            <Button
              variant="glass"
              size="icon"
              className="md:hidden size-9 sm:size-11"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>

          {/* Reading progress, drawn on the pill's lower rim. */}
          <motion.span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r from-electric via-aqua to-electric rounded-full"
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
              className="absolute inset-x-4 top-20 max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-glass glass-raised glass-rim p-6 pb-7 sm:inset-x-6"
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
                      <span className="font-mono text-xs text-mist">
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
