import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Boxes,
  Code2,
  Cpu,
  Database,
  MessageSquare,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

export const practices = [
  {
    id: "product",
    name: "Software & Web Engineering",
    summary: "Production-grade web applications, SaaS platforms, and backend systems built with modern engineering standards.",
    accent: "aqua",
  },
  {
    id: "intelligence",
    name: "AI & Intelligent Systems",
    summary: "Custom AI agents, LLM integrations, and smart assistants that automate real business operations.",
    accent: "electric",
  },
  {
    id: "growth",
    name: "Growth & Traffic",
    summary: "Targeted advertising and technical SEO designed to bring real users and customers to your software.",
    accent: "aqua",
  },
] as const;

export type PracticeId = (typeof practices)[number]["id"];

export type Service = {
  id: string;
  title: string;
  blurb: string;
  deliverables: [string, string, string];
  icon: LucideIcon;
  practice: PracticeId;
  featured?: boolean;
};

export const services: Service[] = [
  // ---- Software & Web Engineering (Product Engineering) -------------------
  {
    id: "fullstack-development",
    title: "Full-Stack Web Development",
    blurb:
      "Modern, responsive web applications built with Next.js, React, and TypeScript. Engineered for fast load times, accessibility, and rock-solid code.",
    deliverables: ["Next.js & TypeScript", "Component Architecture", "Performance & Core Vitals"],
    icon: Code2,
    practice: "product",
    featured: true,
  },
  {
    id: "saas-engineering",
    title: "Custom SaaS Platform Engineering",
    blurb:
      "End-to-end SaaS products with multi-tenant architecture, user authentication, role management, and database models that scale.",
    deliverables: ["Auth & Role Management", "Database Schema & ORM", "Admin & User Dashboards"],
    icon: Boxes,
    practice: "product",
    featured: true,
  },
  {
    id: "cloud-systems",
    title: "Database & Cloud Infrastructure",
    blurb:
      "Scalable database design and cloud deployments using PostgreSQL, Supabase, Neon, and AWS/Vercel pipelines.",
    deliverables: ["Postgres & Supabase Setup", "Schema Migrations", "AWS & Vercel Deployment"],
    icon: Database,
    practice: "product",
  },

  // ---- AI & Intelligent Systems -------------------------------------------
  {
    id: "ai-agents",
    title: "Custom AI Agents & LLM Systems",
    blurb:
      "Autonomous agents equipped with OpenAI Agent SDK, function calling, and domain guardrails scoped to handle specific tasks accurately.",
    deliverables: ["Tool Calling & Logic", "Guardrails & Memory", "Prompt Architecture"],
    icon: Bot,
    practice: "intelligence",
    featured: true,
  },
  {
    id: "chatbots",
    title: "Smart Chatbots & Knowledge Bases",
    blurb:
      "Domain-specific assistants integrated into your website, connected to your custom documentation or company knowledge.",
    deliverables: ["Document Retrieval", "Contextual Answering", "Web Interface Integration"],
    icon: MessageSquare,
    practice: "intelligence",
  },
  {
    id: "smart-automation",
    title: "Intelligent Process Automation",
    blurb:
      "Streamlining repetitive tasks and manual business steps with custom automated logic and AI-driven data processing.",
    deliverables: ["Workflow Architecture", "Automated Triggers", "Failure Recovery Logic"],
    icon: Cpu,
    practice: "intelligence",
  },

  // ---- Growth & Traffic ---------------------------------------------------
  {
    id: "meta-ads",
    title: "Meta Ads (Facebook & Instagram)",
    blurb:
      "High-intent ad campaigns on Meta platforms configured to drive targeted traffic, leads, and paying users to your software.",
    deliverables: ["Campaign Strategy", "Audience Targeting", "Conversion & Pixel Setup"],
    icon: Target,
    practice: "growth",
    featured: true,
  },
  {
    id: "google-ads",
    title: "Google Search & Display Ads",
    blurb:
      "Search-intent advertising that connects your product with active buyers searching for your exact software or service.",
    deliverables: ["Keyword Research", "Ad Copy & Structuring", "Conversion Tracking"],
    icon: Sparkles,
    practice: "growth",
  },
  {
    id: "technical-seo",
    title: "Technical SEO & Discoverability",
    blurb:
      "Clean metadata, OpenGraph cards, structured schema, and blazing-fast site architecture for top search indexing.",
    deliverables: ["Structured Data (Schema)", "Metadata Optimization", "Core Web Vitals Boost"],
    icon: Search,
    practice: "growth",
  },
];

export const servicesByPractice = practices.map((practice) => ({
  ...practice,
  items: services.filter((service) => service.practice === practice.id),
}));
