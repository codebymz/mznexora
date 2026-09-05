"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type ScrollApi = {
  /**
   * Scroll to an element, a selector, or an absolute offset in pixels —
   * accounting for the floating navbar.
   */
  scrollTo: (target: string | HTMLElement | number, offset?: number) => void;
  stop: () => void;
  start: () => void;
};

const ScrollContext = createContext<ScrollApi | null>(null);

/**
 * Lenis owns the scroll position; GSAP's ticker drives its RAF loop so the two
 * never fight over frames. ScrollTrigger is updated from Lenis events, which
 * keeps scroll-linked timelines in sync with the smoothed position rather than
 * the native one.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (reducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3.2),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      // GSAP drives the loop instead.
      autoRaf: false,
    });

    lenisRef.current = lenis;
    setReady(true);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const scrollTo = useCallback(
    (target: string | HTMLElement | number, offset = -96) => {
      const lenis = lenisRef.current;

      if (lenis) {
        lenis.scrollTo(target as string | HTMLElement, { offset, duration: 1.4 });
        return;
      }

      // Reduced motion, or Lenis not yet mounted: jump natively.
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "auto" });
        return;
      }
      const node =
        typeof target === "string" ? document.querySelector(target) : target;
      node?.scrollIntoView({ behavior: "auto", block: "start" });
    },
    [],
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
    document.documentElement.style.overflow = "";
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollTo, stop, start }}>
      {children}
    </ScrollContext.Provider>
  );
}

/** Safe outside the provider — falls back to native scrolling. */
export function useSmoothScroll(): ScrollApi {
  const context = useContext(ScrollContext);

  return (
    context ?? {
      scrollTo: (target) => {
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" });
          return;
        }
        const node =
          typeof target === "string" ? document.querySelector(target) : target;
        node?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
      stop: () => {},
      start: () => {},
    }
  );
}
