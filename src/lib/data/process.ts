/**
 * A genuine sequence — the numbering carries information the reader needs,
 * so the ordinals stay.
 */
export type ProcessStep = {
  id: string;
  title: string;
  duration: string;
  summary: string;
  outputs: string[];
};

export const processSteps: ProcessStep[] = [
  {
    id: "diagnose",
    title: "Diagnose",
    duration: "Week 1",
    summary:
      "We sit with the people doing the work and time the tasks that hurt. No workshop theatre — we watch the process run and write down where it leaks.",
    outputs: ["Opportunity map", "Baseline metrics", "Effort/impact ranking"],
  },
  {
    id: "architect",
    title: "Architect",
    duration: "Week 2",
    summary:
      "One page that names the system, its boundaries, and how it fails safely. You approve the shape before anyone writes code.",
    outputs: ["System design", "Data + model choices", "Risk register"],
  },
  {
    id: "build",
    title: "Build",
    duration: "Weeks 3–6",
    summary:
      "Weekly working software in your environment. Every increment is something you can click, break, and give notes on.",
    outputs: ["Working increments", "Eval suite", "Staging environment"],
  },
  {
    id: "prove",
    title: "Prove",
    duration: "Week 7",
    summary:
      "We run the new system beside the old one on live volume and compare results. It ships when the numbers say it should.",
    outputs: ["Shadow-mode results", "Accuracy report", "Go / no-go call"],
  },
  {
    id: "scale",
    title: "Scale",
    duration: "Ongoing",
    summary:
      "Monitoring, cost controls and a monthly improvement cycle. Your team gets the runbook and the keys.",
    outputs: ["Dashboards + alerts", "Team handover", "Quarterly roadmap"],
  },
];
