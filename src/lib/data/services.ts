import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Boxes,
  LayoutTemplate,
  Mail,
  MessageSquare,
  Network,
  PenLine,
  Plug,
  Radar,
  Search,
  Share2,
  Sparkles,
  Target,
  Users,
  Video,
  Workflow,
} from "lucide-react";

/**
 * Practices, not a flat menu. Sixteen services presented as peers reads as a
 * price list; grouped into three practices it reads as a company.
 */
export const practices = [
  {
    id: "intelligence",
    name: "Applied Intelligence",
    summary:
      "Agents and automations that run your operations while your team sleeps.",
    accent: "electric",
  },
  {
    id: "product",
    name: "Product Engineering",
    summary: "The interfaces, platforms and APIs the intelligence lives inside.",
    accent: "aqua",
  },
  {
    id: "growth",
    name: "Demand & Growth",
    summary: "Pipeline systems that turn attention into qualified revenue.",
    accent: "electric",
  },
] as const;

export type PracticeId = (typeof practices)[number]["id"];

export type Service = {
  id: string;
  title: string;
  /** One line, plain language, what the client actually gets. */
  blurb: string;
  deliverables: [string, string, string];
  icon: LucideIcon;
  practice: PracticeId;
  /** Bento weighting — feature services claim more of the grid. */
  featured?: boolean;
};

export const services: Service[] = [
  // ---- Applied Intelligence ------------------------------------------------
  {
    id: "ai-automation",
    title: "AI Automation",
    blurb:
      "We map the work your team repeats, then hand it to a system that never forgets a step.",
    deliverables: ["Process audit", "Automation build", "Reliability SLAs"],
    icon: Workflow,
    practice: "intelligence",
    featured: true,
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    blurb:
      "Autonomous workers with tools, memory and guardrails — scoped to one job and measured on it.",
    deliverables: ["Tool + memory design", "Eval harness", "Human handoff rules"],
    icon: Bot,
    practice: "intelligence",
    featured: true,
  },
  {
    id: "chatbots",
    title: "Chatbots",
    blurb:
      "Support and sales assistants trained on your documents, wired to your CRM, answering in your voice.",
    deliverables: ["Knowledge pipeline", "Escalation logic", "Transcript analytics"],
    icon: MessageSquare,
    practice: "intelligence",
  },
  {
    id: "n8n-automation",
    title: "n8n Automation",
    blurb:
      "Self-hosted workflow infrastructure you own outright — no per-task tax, no vendor ceiling.",
    deliverables: ["Hosted instance", "Custom nodes", "Runbook + monitoring"],
    icon: Network,
    practice: "intelligence",
  },
  {
    id: "api-integration",
    title: "API Integration",
    blurb:
      "The unglamorous plumbing that makes twelve disconnected tools behave like one product.",
    deliverables: ["Integration layer", "Retry + queue design", "Schema contracts"],
    icon: Plug,
    practice: "intelligence",
  },

  // ---- Product Engineering -------------------------------------------------
  {
    id: "website-development",
    title: "Website Development",
    blurb:
      "Marketing sites engineered like products: fast, accessible, and editable without a developer.",
    deliverables: ["Design system", "Headless CMS", "Core Web Vitals budget"],
    icon: LayoutTemplate,
    practice: "product",
    featured: true,
  },
  {
    id: "ai-website-development",
    title: "AI Website Development",
    blurb:
      "Sites that adapt — personalised copy, on-page assistants, and search that understands intent.",
    deliverables: ["Intent routing", "Embedded assistant", "Content generation"],
    icon: Sparkles,
    practice: "product",
  },
  {
    id: "saas-development",
    title: "SaaS Development",
    blurb:
      "Multi-tenant platforms from schema to billing, built to survive their own success.",
    deliverables: ["Architecture", "Auth + billing", "Observability"],
    icon: Boxes,
    practice: "product",
  },

  // ---- Demand & Growth -----------------------------------------------------
  {
    id: "seo",
    title: "SEO",
    blurb:
      "Technical depth and topical authority, built for both search engines and answer engines.",
    deliverables: ["Technical fixes", "Topic clusters", "Entity coverage"],
    icon: Search,
    practice: "growth",
    featured: true,
  },
  {
    id: "meta-ads",
    title: "Meta Ads",
    blurb:
      "Creative testing at volume with clean attribution, so spend follows evidence.",
    deliverables: ["Creative sprints", "Signal setup", "Incrementality tests"],
    icon: Target,
    practice: "growth",
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    blurb:
      "A publishing engine with a point of view — planned quarterly, shipped daily.",
    deliverables: ["Editorial calendar", "Native creative", "Community ops"],
    icon: Share2,
    practice: "growth",
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    blurb:
      "Research-led writing that earns links and closes deals, not word-count filler.",
    deliverables: ["Narrative strategy", "Long-form assets", "Distribution"],
    icon: PenLine,
    practice: "growth",
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    blurb:
      "Lifecycle flows that behave like a good salesperson: timely, specific, easy to reply to.",
    deliverables: ["Lifecycle map", "Deliverability", "Revenue reporting"],
    icon: Mail,
    practice: "growth",
  },
  {
    id: "lead-generation",
    title: "Lead Generation",
    blurb:
      "Outbound and inbound feeding one enriched pipeline your sales team actually trusts.",
    deliverables: ["ICP research", "Enrichment stack", "Booked-meeting SLAs"],
    icon: Radar,
    practice: "growth",
  },
  {
    id: "video-marketing",
    title: "Video Marketing",
    blurb:
      "Short-form and brand film produced on a schedule, cut for every placement that matters.",
    deliverables: ["Concepting", "Production", "Platform edits"],
    icon: Video,
    practice: "growth",
  },
  {
    id: "influencer-marketing",
    title: "Influencer Marketing",
    blurb:
      "Creator partnerships chosen on audience overlap and held to performance terms.",
    deliverables: ["Creator vetting", "Deal structuring", "Usage rights"],
    icon: Users,
    practice: "growth",
  },
];

export const servicesByPractice = practices.map((practice) => ({
  ...practice,
  items: services.filter((service) => service.practice === practice.id),
}));
