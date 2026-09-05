import type { LucideIcon } from "lucide-react";
import {
  Activity,
  FileCheck2,
  GaugeCircle,
  KeyRound,
  ShieldCheck,
  Users2,
} from "lucide-react";

export type Advantage = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
  /** A verifiable commitment, not an adjective. */
  proof: string;
};

export const advantages: Advantage[] = [
  {
    id: "shipped",
    title: "Shipped, not demoed",
    body: "Every engagement ends with software running on live volume in your environment. Pilots that never leave staging are a failure, and we treat them that way.",
    icon: GaugeCircle,
    proof: "94% of pilots reach production",
  },
  {
    id: "ownership",
    title: "You own the system",
    body: "Source code, prompts, evals and infrastructure are yours in your repositories from day one. No black boxes, no licence that holds your operations hostage.",
    icon: KeyRound,
    proof: "Full IP transfer on delivery",
  },
  {
    id: "measured",
    title: "Measured against a baseline",
    body: "We record how the work performs before we touch it, then report against that number every month. If a system does not beat its baseline, we say so first.",
    icon: Activity,
    proof: "Baseline recorded in week 1",
  },
  {
    id: "senior",
    title: "Senior people only",
    body: "The engineers in your kickoff are the engineers in your codebase. No account layer, no junior handoff after the contract is signed.",
    icon: Users2,
    proof: "9 yrs median experience",
  },
  {
    id: "governance",
    title: "Governance built in",
    body: "Audit logs, PII handling, human-in-the-loop thresholds and rollback paths are part of the architecture, not a later compliance retrofit.",
    icon: ShieldCheck,
    proof: "SOC 2 Type II · GDPR · HIPAA",
  },
  {
    id: "terms",
    title: "Terms that share the risk",
    body: "Fixed-scope discovery, capped build phases, and performance components on growth retainers. You always know the ceiling before you commit.",
    icon: FileCheck2,
    proof: "Fixed-price discovery, always",
  },
];
