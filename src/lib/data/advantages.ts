import type { LucideIcon } from "lucide-react";
import {
  Code2,
  FileCheck2,
  GitBranch,
  KeyRound,
  Server,
  UserCheck,
} from "lucide-react";

export type Advantage = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
  proof: string;
};

export const advantages: Advantage[] = [
  {
    id: "direct-engineer",
    title: "Direct Engineer, Zero Middlemen",
    body: "You collaborate directly with me (Muhammad Zain). No layers of non-technical project managers, sales agents, or junior handoffs after kickoff.",
    icon: UserCheck,
    proof: "1-on-1 Direct Collaboration",
  },
  {
    id: "clean-code",
    title: "Clean, Maintainable Architecture",
    body: "Every project is written in strict TypeScript, modular Next.js components, and structured database schemas that any seasoned engineer can easily maintain.",
    icon: Code2,
    proof: "100% Type-Safe TypeScript",
  },
  {
    id: "ownership",
    title: "Complete Code & IP Ownership",
    body: "Git repositories, cloud deployment accounts, environment keys, and database credentials belong 100% to you from day one.",
    icon: KeyRound,
    proof: "Full IP Transfer on Delivery",
  },
  {
    id: "proven-stack",
    title: "Production-Tested Cloud & Data",
    body: "Building with industry-standard foundations: PostgreSQL, Supabase, Neon, AWS, and Vercel. Reliable infrastructure built to handle real traffic.",
    icon: Server,
    proof: "AWS, Vercel & Postgres",
  },
  {
    id: "transparency",
    title: "Honest Feasibility & Transparent Sprints",
    body: "If a feature or automation is unnecessary or over-engineered, I tell you immediately. Clear weekly demo links so you always see working software.",
    icon: GitBranch,
    proof: "Weekly Working Demos",
  },
  {
    id: "launch-support",
    title: "Deployment & Post-Launch Support",
    body: "Launches do not end when code is pushed. I ensure SSL, custom domains, performance checks, and offer dedicated post-launch support.",
    icon: FileCheck2,
    proof: "Dedicated Launch Warranty",
  },
];
