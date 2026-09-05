"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { Preloader } from "@/components/layout/preloader";

/**
 * `introDone` gates the hero's entrance so it plays *after* the curtain lifts
 * rather than behind it. Every other section reveals on scroll and ignores this.
 */
const IntroContext = createContext<boolean>(true);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);

  return (
    <IntroContext.Provider value={done}>
      <Preloader onDone={() => setDone(true)} />
      {children}
    </IntroContext.Provider>
  );
}

export function useIntroDone() {
  return useContext(IntroContext);
}
