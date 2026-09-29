import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist or has been relocated.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-24">
      <div className="shell relative max-w-xl text-center">
        <p className="eyebrow text-xs text-aqua">404 — Page Not Found</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-display font-semibold text-ice">
          Lost in the Nexus
        </h1>
        <p className="mt-4 text-mist text-base">
          The page you are looking for doesn&apos;t exist or has been relocated.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-electric/40 bg-electric/20 px-6 py-3 font-mono text-sm text-ice hover:bg-electric/30 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
