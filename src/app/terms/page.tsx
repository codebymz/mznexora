import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale, Code, Layers, ShieldCheck, Clock, FileCode } from "lucide-react";
import { SectionGlow } from "@/components/fx/aurora-background";
import { GlassCard } from "@/components/fx/glass-card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service and client engagement agreements for ${site.name}.`,
};

export default function TermsPage() {
  const lastUpdated = "September 2026";

  const terms = [
    {
      icon: Scale,
      title: "1. Acceptance of Terms",
      content:
        `By commissioning project work, using our web applications, or contacting ${site.name}, you agree to comply with and be bound by these Terms of Service. If you disagree with any portion of these terms, please do not proceed with services.`,
    },
    {
      icon: Code,
      title: "2. Scope of Engineering & AI Services",
      content:
        "We provide software development, autonomous AI agent building, web application design, and custom n8n automation engineering. Specific deliverables, scope, milestones, and payment terms are detailed in client proposal agreements.",
    },
    {
      icon: Layers,
      title: "3. Intellectual Property Rights",
      content:
        "Upon final payment receipt, all custom codebase deliverables, unique workflow blueprints, and project-specific documentation generated for the client become the intellectual property of the client, unless otherwise agreed upon.",
    },
    {
      icon: ShieldCheck,
      title: "4. Confidentiality & Data Handling",
      content:
        "We maintain strict non-disclosure obligations. Both parties agree to protect proprietary technical data, credentials, and business processes shared during project execution.",
    },
    {
      icon: Clock,
      title: "5. Warranty & Project Handover",
      content:
        "All delivered software includes a standard warranty period post-launch for bug fixes and deployment support. Future features or modifications past the sign-off scope are handled via separate sprint agreements.",
    },
    {
      icon: FileCode,
      title: "6. Limitation of Liability",
      content:
        `${site.name} shall not be liable for indirect, incidental, or consequential damages resulting from third-party API downtime, external server outages, or client misconfiguration after project handover.`,
    },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24 sm:pt-40">
      <SectionGlow className="-top-20 right-1/2 size-[40rem] translate-x-1/2" tone="aqua" />

      <div className="shell relative max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mist hover:text-aqua transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        <header className="mb-12">
          <p className="eyebrow text-xs">Legal & Service Terms</p>
          <h1 className="mt-3 text-h1 text-ice sm:text-4xl font-display font-semibold tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-mist text-base max-w-2xl">
            These terms govern the engineering services, client collaboration standards, and digital product usage provided by {site.name}.
          </p>
          <p className="mt-2 font-mono text-xs text-mist/70">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <div className="space-y-6">
          {terms.map((term, idx) => {
            const Icon = term.icon;
            return (
              <GlassCard key={idx} className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl border border-aqua/30 bg-aqua/10 p-3 text-aqua shrink-0">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-ice font-display">{term.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{term.content}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <GlassCard className="mt-10 p-6 sm:p-8 border-electric/30 bg-electric/5">
          <h3 className="text-lg font-semibold text-ice font-display">Need Custom Legal / Enterprise Terms?</h3>
          <p className="mt-2 text-sm text-mist">
            For enterprise clients requiring custom MSA or NDA agreements prior to project kickoff, feel free to write to us at{" "}
            <a href={`mailto:${site.email}`} className="text-aqua underline hover:text-ice transition-colors">
              {site.email}
            </a>.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
