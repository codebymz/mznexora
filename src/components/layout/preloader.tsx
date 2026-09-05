"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Monogram } from "@/components/brand/wordmark";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { site } from "@/lib/site";

const SESSION_KEY = "mzn.intro-seen";

/**
 * Premium loading curtain. Progress tracks real readiness (fonts + window
 * load) with a floor animation so it never stalls at an arbitrary number, and
 * it only runs once per session — a returning visitor should not be made to
 * wait for choreography twice.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reducedMotion = useReducedMotion();
  const { stop, start } = useSmoothScroll();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const finished = useRef(false);

  useEffect(() => {
    const alreadySeen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(SESSION_KEY) === "1";

    if (alreadySeen || reducedMotion) {
      setVisible(false);
      onDone();
      return;
    }

    stop();

    let frame = 0;
    let loaded = false;
    let cancelled = false;

    const readiness = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) =>
            window.addEventListener("load", () => resolve(), { once: true }),
          ),
    ]);

    // Never hold the page hostage to a slow asset.
    const safety = window.setTimeout(() => {
      loaded = true;
    }, 3200);

    void readiness.then(() => {
      loaded = true;
    });

    let value = 0;
    const tick = () => {
      if (cancelled) return;

      const target = loaded ? 100 : 88;
      value += (target - value) * 0.06 + 0.55;

      if (value >= 99.6) {
        value = 100;
        setProgress(100);
        finished.current = true;
        window.setTimeout(() => {
          if (!cancelled) setVisible(false);
        }, 420);
        return;
      }

      setProgress(value);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(safety);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const handleExitComplete = () => {
    window.sessionStorage.setItem(SESSION_KEY, "1");
    start();
    onDone();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-abyss"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
          }}
          aria-live="polite"
          aria-busy="true"
        >
          {/* Ambient light so the curtain is a lit room, not a black screen. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[130px]"
            style={{
              background:
                "radial-gradient(circle at 38% 40%, rgba(37,99,235,.42), transparent 62%), radial-gradient(circle at 66% 62%, rgba(20,184,166,.32), transparent 60%)",
            }}
          />

          <motion.div
            className="relative flex flex-col items-center gap-8"
            exit={{ y: -26, opacity: 0, transition: { duration: 0.4 } }}
          >
            <div className="relative grid size-20 place-items-center rounded-2xl glass glass-rim">
              <Monogram className="size-10" />
              <span
                aria-hidden
                className="absolute inset-0 rounded-2xl border border-aqua/25 animate-pulse-ring"
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <p className="font-display text-sm font-semibold tracking-[0.42em] text-ice/90">
                MZ NEXORA
              </p>
              <p className="eyebrow text-[0.625rem]">{site.tagline}</p>
            </div>

            <div className="flex w-56 items-center gap-4">
              <div className="relative h-px flex-1 overflow-hidden bg-ice/12">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-linear-to-r from-electric to-aqua"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span
                data-numeric
                className="w-9 font-mono text-[0.6875rem] text-mist"
              >
                {Math.round(progress)}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
