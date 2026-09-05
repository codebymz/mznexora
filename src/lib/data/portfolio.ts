export type CaseStudy = {
  id: string;
  client: string;
  sector: string;
  title: string;
  challenge: string;
  /** The single number the client cares about. */
  headline: { value: string; label: string };
  supporting: { value: string; label: string }[];
  services: string[];
  year: string;
  /** Tailwind gradient stops used for the card's ambient wash. */
  wash: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "portfolio",
    client: "Muhammad Zain",
    sector: "Personal Branding",
    title: "Personal portfolio — built to impress at first scroll",
    challenge:
      "Needed a professional online presence that showcases AI and web projects with a premium, modern design that stands out.",
    headline: { value: "100%", label: "custom-built, no templates" },
    supporting: [
      { value: "Next.js", label: "framework" },
      { value: "Animated", label: "glass UI" },
    ],
    services: ["Website Development", "UI Design", "AI Integration"],
    year: "2024",
    wash: "from-electric/25 via-electric/5 to-transparent",
  },
  {
    id: "speedlab",
    client: "MZ Nexora",
    sector: "Web Tool",
    title: "Speed Lab — typing speed & internet speed checker",
    challenge:
      "Wanted a clean, fast tool to test both typing speed (WPM) and internet speed (ping, download, upload) in one place.",
    headline: { value: "2-in-1", label: "speed testing tool" },
    supporting: [
      { value: "WPM", label: "typing test" },
      { value: "Live", label: "net speed check" },
    ],
    services: ["SaaS Development", "UI Design", "Web Tool"],
    year: "2024",
    wash: "from-aqua/25 via-aqua/5 to-transparent",
  },
  {
    id: "zapr",
    client: "MZ Nexora",
    sector: "File Conversion",
    title: "Zapr — convert any file to any format, instantly",
    challenge:
      "Users needed a single, privacy-friendly web app to convert files — PDF to Word, Excel to PDF, images, and more — without uploading to random third-party sites.",
    headline: { value: "10+", label: "file formats supported" },
    supporting: [
      { value: "Fast", label: "browser-side conversion" },
      { value: "Free", label: "no signup needed" },
    ],
    services: ["SaaS Development", "AI Integration", "UI Design"],
    year: "2025",
    wash: "from-electric/25 via-aqua/8 to-transparent",
  },
  {
    id: "papergenai",
    client: "MZ Nexora",
    sector: "EdTech / AI",
    title: "PaperGenAI — AI exam paper generator for classes 9–12",
    challenge:
      "Teachers and students needed a way to generate custom exam papers and quizzes for Pakistani school curriculum (9th–12th grade) — and save or print them.",
    headline: { value: "AI", label: "paper generation" },
    supporting: [
      { value: "9–12", label: "class range" },
      { value: "Quiz", label: "& paper mode" },
    ],
    services: ["AI Agents", "SaaS Development", "EdTech"],
    year: "2025",
    wash: "from-aqua/22 via-electric/8 to-transparent",
  },
  {
    id: "n8n-automations",
    client: "MZ Nexora",
    sector: "Automation",
    title: "n8n workflows — business automations that actually run",
    challenge:
      "Businesses needed self-hosted, repeatable automations for tasks like lead capture, notifications, data sync, and AI triggers — without per-task pricing.",
    headline: { value: "3+", label: "automations shipped" },
    supporting: [
      { value: "Self-hosted", label: "n8n instance" },
      { value: "0 limits", label: "on task runs" },
    ],
    services: ["n8n Automation", "API Integration", "AI Automation"],
    year: "2025",
    wash: "from-electric/22 via-electric/5 to-transparent",
  },
];
