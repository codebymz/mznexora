import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, Key, Server, Cpu, RefreshCw, Lock } from "lucide-react";
import { SectionGlow } from "@/components/fx/aurora-background";
import { GlassCard } from "@/components/fx/glass-card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security & Trust",
  description: `Security protocols, infrastructure safeguards, and data protection at ${site.name}.`,
};

export default function SecurityPage() {
  const lastUpdated = "September 2026";

  const securityPillars = [
    {
      icon: Lock,
      title: "1. End-to-End Encryption & Secret Management",
      content:
        "All sensitive credentials, API keys, database connection strings, and tokens are stored using encrypted environment secret managers (Vercel, Supabase Vault, AWS KMS). Environment variables are strictly isolated per deployment phase.",
    },
    {
      icon: Cpu,
      title: "2. Zero-Retention AI Agent Pipelines",
      content:
        "When integrating LLM and RAG pipelines (FastAPI / LangChain / LlamaIndex), we enforce Zero Data Retention policies where provider APIs do not train models on your proprietary business input or context vectors.",
    },
    {
      icon: Server,
      title: "3. Self-Hosted n8n Infrastructure",
      content:
        "Our n8n automation instances are self-hosted on isolated VPS instances protected by Docker containerization, firewall policies, SSL certificates, and IP restrictions, eliminating third-party task inspection.",
    },
    {
      icon: Key,
      title: "4. Strict Access Control & Authentication",
      content:
        "Client admin dashboards and LMS web portals use modern authentication standards (JWT, OAuth 2.0, Row-Level Security in PostgreSQL/Supabase) to ensure strict role-based authorization.",
    },
    {
      icon: RefreshCw,
      title: "5. Automated Backups & Disaster Recovery",
      content:
        "Database instances and production application states undergo automated daily snapshots and point-in-time recovery configurations to protect against unexpected data loss or hardware failures.",
    },
    {
      icon: ShieldAlert,
      title: "6. Responsible Vulnerability Disclosure",
      content:
        "We proactively monitor dependencies via automated security audits. If you discover a potential vulnerability in any of our web apps, please report it to our security lead for immediate remediation.",
    },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24 sm:pt-40">
      <SectionGlow className="-top-20 left-1/3 size-[42rem]" tone="electric" />

      <div className="shell relative max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mist hover:text-aqua transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        <header className="mb-12">
          <p className="eyebrow text-xs">Security & Trust</p>
          <h1 className="mt-3 text-h1 text-ice sm:text-4xl font-display font-semibold tracking-tight">
            Security Practices & Safeguards
          </h1>
          <p className="mt-4 text-mist text-base max-w-2xl">
            At {site.name}, security is engineered into every line of code, database schema, and AI automation pipeline we build.
          </p>
          <p className="mt-2 font-mono text-xs text-mist/70">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <div className="space-y-6">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <GlassCard key={idx} className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-400 shrink-0">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-ice font-display">{pillar.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{pillar.content}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <GlassCard className="mt-10 p-6 sm:p-8 border-emerald-500/30 bg-emerald-500/5">
          <h3 className="text-lg font-semibold text-ice font-display">Security Hotline & Inquiries</h3>
          <p className="mt-2 text-sm text-mist">
            To report a security concern or request detailed architecture security reviews for your project, contact us at{" "}
            <a href={`mailto:${site.salesEmail}`} className="text-emerald-400 underline hover:text-ice transition-colors">
              {site.salesEmail}
            </a>.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
