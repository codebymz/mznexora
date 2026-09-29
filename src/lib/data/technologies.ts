/**
 * Realistic software engineering technology stack verified and actively used in production.
 */
export const techGroups = [
  {
    id: "reasoning",
    label: "AI & Models",
    items: [
      "Claude",
      "GPT",
      "Gemini",
      "Llama",
      "OpenAI Agent SDK",
    ],
  },
  {
    id: "data",
    label: "Databases & Storage",
    items: [
      "Postgres",
      "Supabase",
      "Neon",
    ],
  },
  {
    id: "orchestration",
    label: "Automation & Workflows",
    items: [
      "n8n",
    ],
  },
  {
    id: "interface",
    label: "Frontend & Interface",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "GSAP",
      "Figma",
    ],
  },
  {
    id: "platform",
    label: "Cloud & Deployment",
    items: [
      "AWS",
      "Vercel",
      "Supabase",
      "Neon",
    ],
  },
  {
    id: "growth",
    label: "Growth & Marketing",
    items: [
      "Meta Ads",
      "Google Ads",
    ],
  },
] as const;

/** Flat list for the marquee rails. */
export const allTech = techGroups.flatMap((group) => group.items);
