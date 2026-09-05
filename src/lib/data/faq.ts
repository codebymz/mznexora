export type FaqItem = { id: string; question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    id: "timeline",
    question: "How quickly can a project be live?",
    answer:
      "It depends on scope. A simple automation or web tool can be live in one to three weeks. A full SaaS product or complex AI agent typically takes four to eight weeks. I give an honest timeline at the start, not a sales pitch — and I report against it.",
  },
  {
    id: "pricing",
    question: "How much does it cost?",
    answer:
      "Pricing depends on the project. I do not have fixed packages — every project is scoped individually. I am transparent about cost upfront, with no hidden fees. Message me with what you need and I will give you a straight quote.",
  },
  {
    id: "ownership",
    question: "Who owns the code and the work?",
    answer:
      "You do, completely. I work in your repositories or hand over everything on delivery. There is no MZ Nexora dependency baked in — you own the code, the configs and the documentation from day one.",
  },
  {
    id: "existing-stack",
    question: "Do I have to replace my current tools?",
    answer:
      "Almost never. Most of my work connects existing tools — your CRM, email, data sheets or APIs — so they talk to each other properly. I only recommend replacing something if the cost comparison clearly justifies it.",
  },
  {
    id: "reliability",
    question: "What if the AI or automation gets something wrong?",
    answer:
      "Every system I build has error handling, human review paths for edge cases, and structured logs. I test thoroughly before handover and include a review period after launch so any issues are caught and fixed quickly.",
  },
  {
    id: "team",
    question: "Who will I actually work with?",
    answer:
      "Me — Muhammad Zain. I am the only person at MZ Nexora. You get direct communication, no account managers in between. If I take on your project, I build it myself.",
  },
  {
    id: "after",
    question: "What happens after the project is done?",
    answer:
      "I include a handover with documentation and a short review period. If you need ongoing support or improvements, I offer that as a separate arrangement. I am reachable and do not disappear after delivery.",
  },
  {
    id: "fit",
    question: "What kinds of projects do you take on?",
    answer:
      "AI automations, n8n workflows, web tools, SaaS apps, and API integrations. I am most useful when you have a specific problem to solve or a product idea to build. I am not the right fit for very large team-based enterprise contracts — but for focused, high-quality solo work, that is exactly what I do.",
  },
];
