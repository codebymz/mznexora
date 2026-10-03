/**
 * Ambient module shim for `next/server.js`.
 *
 * Next.js's route-type generator emits:
 *   import type { NextRequest } from 'next/server.js'
 *
 * With `moduleResolution: "bundler"` TypeScript cannot resolve the `.js`-
 * suffixed specifier because `next/package.json` does not expose a
 * `next/server.js` exports entry.
 *
 * `export *` does not re-export type-only declarations, so we use
 * `export type *` (TypeScript ≥ 5.0) plus a value wildcard to cover both.
 *
 * See: https://github.com/vercel/next.js/issues/57936
 */
declare module "next/server.js" {
  // Re-export all types (covers NextRequest, NextResponse type, etc.)
  export type * from "next/server";
  // Re-export all values (covers NextResponse class, userAgent fn, etc.)
  export * from "next/server";
}
