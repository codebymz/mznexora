/**
 * Deterministic pseudo-random source. The hero's graph must be identical on
 * every render and every reload — a layout that reshuffles reads as noise.
 */
export function mulberry32(seed: number) {
  let a = seed >>> 0;

  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Normally distributed sample via Box–Muller, for organic cluster spread. */
export function gaussian(rng: () => number, spread = 1) {
  const u = Math.max(rng(), 1e-6);
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * spread;
}
