/**
 * Single source of truth for brand facts, navigation and contact details.
 * Anything a marketing edit would touch lives here, not in a component.
 */

export const site = {
  name: "MZ Nexora",
  legalName: "MZ Nexora",
  tagline: "AI Studio, Autonomous Agents & n8n Automations",
  description:
    "MZ Nexora is a premier AI & automation studio founded by Muhammad Zain. We build autonomous AI agents, custom n8n workflows, web tools, and Next.js applications that automate business operations and drive exponential growth.",
  logo: {
    path: "/assets/logos/logo.jpg",
    icon: "/assets/logos/logo.jpg",
    alt: "MZ Nexora AI Studio Logo",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mznexora.vercel.app",
  locale: "en_US",
  founded: 2024,
  email: "mznexora@gmail.com",
  salesEmail: "mznexora@gmail.com",
  phone: "+92 326 9656457",
  phoneHref: "+923269656457",
  whatsapp: "https://wa.me/923269656457",
  whatsappHref: "https://wa.me/923269656457",
  github: "https://github.com/codebymz",
  linkedin: "https://linkedin.com/in/mznexora",
  address: {
    street: "Pakistan",
    city: "Pakistan",
    region: "",
    postalCode: "",
    country: "PK",
  },
  studios: ["Pakistan"],
} as const;

export const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Stack", href: "#stack", id: "stack" },
  { label: "FAQ", href: "#faq", id: "faq" },
] as const;

/** Sections observed for the navbar's active indicator, in document order. */
export const sectionIds = [
  "hero",
  "about",
  "services",
  "process",
  "work",
  "stack",
  "advantage",
  "voices",
  "faq",
  "contact",
] as const;

export const socials = [
  { label: "WhatsApp", href: "https://wa.me/923269656457" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mznexora" },
  { label: "GitHub", href: "https://github.com/codebymz" },
  { label: "Facebook", href: "https://facebook.com/mznexora" },
  { label: "Instagram", href: "https://instagram.com/mznexora" },
  { label: "X / Twitter", href: "https://x.com/mznexora" },
] as const;

/** Headline proof points — real projects shipped. */
export const metrics = [
  { value: 7, suffix: "+", label: "Products built" },
  { value: 3, suffix: "+", label: "n8n automations" },
  { value: 100, suffix: "%", label: "Solo-built & owned" },
  { value: 2024, suffix: "", label: "Started" },
] as const;

export type Metric = (typeof metrics)[number];
