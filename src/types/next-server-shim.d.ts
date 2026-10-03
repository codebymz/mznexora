/**
 * Type shim for `next/server.js` (resolved via tsconfig `paths`).
 *
 * Next.js 15's route typegen emits `import type { NextRequest } from 'next/server.js'`
 * (with the .js suffix). Since this package has no exports map, `moduleResolution:bundler`
 * cannot find declaration types for the .js-suffixed specifier.
 *
 * We redirect `next/server.js` here via `paths`, and re-export from the canonical
 * `next/server` entry which TypeScript resolves via the JS file + allowJs inference.
 */
export type { NextRequest, NextResponse, NextMiddleware, NextFetchEvent } from "next/server";
export { NextResponse, ImageResponse, userAgent, userAgentFromString, after, connection } from "next/server";
