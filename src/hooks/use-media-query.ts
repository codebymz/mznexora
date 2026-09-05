"use client";

import { useEffect, useState } from "react";

/** Subscribe to a media query. Defaults to false until mounted. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True on pointer-coarse devices, where hover effects should not run. */
export function useIsTouch() {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)");
}
