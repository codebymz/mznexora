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
  /** Direct project URL if available */
  link?: string;
  /** Project availability status */
  status?: "Live" | "Coming Soon" | "Private Project";
};

export const caseStudies: CaseStudy[] = [
  {
    id: "papergenai",
    client: "MZ Nexora",
    sector: "EdTech / AI",
    title: "PaperGenAI — AI Exam Paper Generator & Chatbot",
    challenge:
      "Automated exam paper and quiz generator for 9th–12th class students across all Punjab, Pakistan boards. Built with React / Next.js frontend and Python FastAPI backend featuring RAG & AI Chatbot.",
    headline: { value: "9th–12th", label: "Punjab Board Exams" },
    supporting: [
      { value: "FastAPI + RAG", label: "AI Backend" },
      { value: "Next.js", label: "Frontend Stack" },
    ],
    services: ["AI Agents", "Python FastAPI", "RAG Pipeline", "Next.js", "EdTech"],
    year: "2025",
    wash: "from-aqua/25 via-electric/10 to-transparent",
    link: "https://paper-genai.vercel.app",
    status: "Live",
  },
  {
    id: "portfolio",
    client: "Muhammad Zain",
    sector: "Personal Branding",
    title: "Personal Portfolio — High-Performance Developer Showcase",
    challenge:
      "Custom high-performance personal branding website showcasing full-stack development, AI capabilities, and interactive web projects with glassmorphic design.",
    headline: { value: "100%", label: "Custom Architecture" },
    supporting: [
      { value: "Next.js", label: "Framework" },
      { value: "Glass UI", label: "Design System" },
    ],
    services: ["Website Development", "UI/UX Design", "Personal Portfolio"],
    year: "2024",
    wash: "from-electric/25 via-electric/5 to-transparent",
    link: "https://mzainulabdin.vercel.app",
    status: "Live",
  },
  {
    id: "speedlab",
    client: "MZ Nexora",
    sector: "Web Tool",
    title: "Speed Lab — Internet & Typing Speed Tester",
    challenge:
      "A 2-in-1 browser utility to test both network speed (ping, download, upload bandwidth) and typing speed (WPM + accuracy) in a clean, modern interface.",
    headline: { value: "2-in-1", label: "Network & WPM Test" },
    supporting: [
      { value: "React / Next", label: "Frontend Stack" },
      { value: "Live Test", label: "Bandwidth & WPM" },
    ],
    services: ["React", "Next.js", "Web Tool", "UI Design"],
    year: "2024",
    wash: "from-aqua/25 via-aqua/5 to-transparent",
    link: "https://speed-lab.vercel.app",
    status: "Live",
  },
  {
    id: "zapr",
    client: "MZ Nexora",
    sector: "File Conversion",
    title: "Zapr — Universal Multi-Format File Converter",
    challenge:
      "All-in-one file converter web application under development. Enables seamless conversion between formats such as PDF to Excel, Excel to PDF, document formats, and images in one app.",
    headline: { value: "Multi-Format", label: "Document & Media Converter" },
    supporting: [
      { value: "PDF & Excel", label: "Format Support" },
      { value: "Browser-Based", label: "Fast Conversion" },
    ],
    services: ["Next.js", "File Processing", "SaaS Tool", "UI Design"],
    year: "2025",
    wash: "from-electric/25 via-aqua/8 to-transparent",
    status: "Coming Soon",
  },
  {
    id: "hbs-lms",
    client: "Hassan Bin Sabit High School",
    sector: "EdTech / Enterprise",
    title: "School LMS — Academic & Campus Management System",
    challenge:
      "Private Learning Management System (LMS) custom built for Hassan Bin Sabit High School to manage student academics, course materials, attendance, and school administrative operations.",
    headline: { value: "School LMS", label: "Custom Enterprise Portal" },
    supporting: [
      { value: "Student/Teacher", label: "Portals" },
      { value: "Admin", label: "Campus Control" },
    ],
    services: ["LMS Development", "Full-Stack Web App", "Database System"],
    year: "2025",
    wash: "from-electric/20 via-aqua/10 to-transparent",
    status: "Private Project",
  },
  {
    id: "restaurant-qr",
    client: "Private Restaurant Client",
    sector: "Hospitality Tech",
    title: "Restaurant QR Menu & Instant Billing System",
    challenge:
      "Private web application for restaurants featuring a mobile QR code menu scanner, instant order selection, and integrated bill payment directly from table side.",
    headline: { value: "QR + Billing", label: "Instant Menu & Checkout" },
    supporting: [
      { value: "QR Menu", label: "Mobile Scanner" },
      { value: "Direct Pay", label: "Bill Payment" },
    ],
    services: ["Mobile Web App", "Payment Gateway", "QR Technology"],
    year: "2025",
    wash: "from-aqua/20 via-electric/10 to-transparent",
    status: "Private Project",
  },
  {
    id: "n8n-automations",
    client: "MZ Nexora",
    sector: "Automation",
    title: "n8n Business & AI Workflow Automations",
    challenge:
      "Custom n8n automated workflows connecting CRM, email notifications, data transformations, and AI agent triggers without ongoing SaaS task limits.",
    headline: { value: "Automated", label: "No-Limit Workflows" },
    supporting: [
      { value: "n8n", label: "Self-Hosted Engine" },
      { value: "AI + API", label: "Integrations" },
    ],
    services: ["n8n Automation", "API Integration", "AI Workflows"],
    year: "2025",
    wash: "from-electric/22 via-electric/5 to-transparent",
    status: "Live",
  },
];

