/**
 * Grouped by the role each tool plays in a build, so the section answers
 * "how would you build mine?" rather than "which logos do you know?".
 */
export const techGroups = [
  {
    id: "reasoning",
    label: "Reasoning",
    items: [
      "Claude",
      "GPT",
      "Gemini",
      "Llama",
      "Mistral",
      "Whisper",
      "LangGraph",
      "Vercel AI SDK",
    ],
  },
  {
    id: "retrieval",
    label: "Retrieval & data",
    items: [
      "Postgres",
      "pgvector",
      "Pinecone",
      "Weaviate",
      "Redis",
      "Snowflake",
      "dbt",
      "Kafka",
    ],
  },
  {
    id: "orchestration",
    label: "Orchestration",
    items: [
      "n8n",
      "Temporal",
      "Airflow",
      "Zapier",
      "Make",
      "Celery",
      "Inngest",
      "Trigger.dev",
    ],
  },
  {
    id: "interface",
    label: "Interface",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "Three.js",
      "GSAP",
      "Figma",
    ],
  },
  {
    id: "platform",
    label: "Platform",
    items: [
      "AWS",
      "Vercel",
      "Cloudflare",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Supabase",
      "Stripe",
    ],
  },
  {
    id: "growth",
    label: "Growth",
    items: [
      "HubSpot",
      "Salesforce",
      "Klaviyo",
      "Segment",
      "GA4",
      "Ahrefs",
      "Meta Ads",
      "Google Ads",
    ],
  },
] as const;

/** Flat list for the marquee rails. */
export const allTech = techGroups.flatMap((group) => group.items);
