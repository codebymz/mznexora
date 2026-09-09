import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import { SectionGlow } from "@/components/fx/aurora-background";
import { GlassCard } from "@/components/fx/glass-card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy and data practices for ${site.name}.`,
};

export default function PrivacyPage() {
  const lastUpdated = "September 2026";

  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content:
        "We collect minimal personal information necessary to deliver our AI engineering, software development, and automation services. This includes your name, email address, phone number, and project briefs submitted via our contact forms.",
    },
    {
      icon: Shield,
      title: "2. How We Use Your Information",
      content:
        "Your data is strictly used to evaluate project inquiries, communicate updates regarding deliverables, provide client support, and fulfill contractual agreements. We do not sell, rent, or trade client data to third parties.",
    },
    {
      icon: Lock,
      title: "3. Data Security & Storage",
      content:
        "We implement enterprise-grade security controls including encrypted storage, TLS/SSL in transit, and strict access controls. Client project datasets and API keys are stored in isolated environment configurations and never exposed publicly.",
    },
    {
      icon: FileText,
      title: "4. Third-Party Services & Integrations",
      content:
        "When building autonomous agents or n8n workflows, we interact with third-party APIs (e.g. OpenAI, Anthropic, Vercel, Supabase). All API integrations adhere strictly to provider data privacy standards and zero data retention policies where applicable.",
    },
    {
      icon: CheckCircle2,
      title: "5. Your Data Rights",
      content:
        "You have the right to request access to your personal data, request correction or complete erasure of your information from our systems, and opt out of direct communication at any time by contacting us directly.",
    },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24 sm:pt-40">
      <SectionGlow className="-top-20 left-1/2 size-[40rem] -translate-x-1/2" tone="electric" />

      <div className="shell relative max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mist hover:text-aqua transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        <header className="mb-12">
          <p className="eyebrow text-xs">Legal & Compliance</p>
          <h1 className="mt-3 text-h1 text-ice sm:text-4xl font-display font-semibold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-mist text-base max-w-2xl">
            Transparency is central to how we operate at {site.name}. This document outlines how your data is handled when working with us or using our web applications.
          </p>
          <p className="mt-2 font-mono text-xs text-mist/70">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <div className="space-y-6">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <GlassCard key={idx} className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl border border-electric/30 bg-electric/10 p-3 text-electric shrink-0">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-ice font-display">{sec.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{sec.content}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <GlassCard className="mt-10 p-6 sm:p-8 border-aqua/30 bg-aqua/5">
          <h3 className="text-lg font-semibold text-ice font-display">Have Questions Regarding Privacy?</h3>
          <p className="mt-2 text-sm text-mist">
            If you have questions about this Privacy Policy or your data, reach out directly at{" "}
            <a href={`mailto:${site.email}`} className="text-aqua underline hover:text-ice transition-colors">
              {site.email}
            </a>.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
