import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

import { SectionGlow } from "@/components/fx/aurora-background";
import { GlassCard } from "@/components/fx/glass-card";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist or has been relocated.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-[75vh] flex items-center justify-center pt-32 pb-24">
      <SectionGlow className="-top-20 left-1/2 size-[36rem] -translate-x-1/2" tone="electric" />
      <div className="shell relative max-w-xl text-center">
        <GlassCard className="p-8 sm:p-12">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-electric/30 bg-electric/10 text-electric">
            <Compass className="size-7" />
          </div>
          <p className="eyebrow mt-6 text-xs text-aqua">404 — Page Not Found</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-display font-semibold text-ice">
            Lost in the Nexus
          </h1>
          <p className="mt-4 text-mist text-sm sm:text-base leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been relocated.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-electric/40 bg-electric/20 px-6 py-3 font-mono text-xs uppercase tracking-wider text-ice hover:bg-electric/30 transition-all hover:scale-[1.02]"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
