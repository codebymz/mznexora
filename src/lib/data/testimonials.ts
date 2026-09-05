export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Initials render inside a glass avatar — no stock headshots. */
  initials: string;
  metric?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "speedlab",
    quote:
      "Speed Lab is the cleanest typing speed tester I have used — the net speed check on the same page is a great bonus. Simple, fast and no ads.",
    name: "Early User",
    role: "Beta Tester",
    company: "Speed Lab",
    initials: "EU",
    metric: "Typing + net speed in one tool",
  },
  {
    id: "zapr",
    quote:
      "Zapr saved me time every week. I needed to convert PDFs to Word without sending files to some random website. This is clean and it just works.",
    name: "First User",
    role: "Freelancer",
    company: "Zapr",
    initials: "FU",
    metric: "10+ file formats supported",
  },
  {
    id: "papergenai",
    quote:
      "PaperGenAI is exactly what teachers need. I generated a full class 10 Biology paper in under two minutes and printed it straight away. The quiz mode is a bonus.",
    name: "Teacher",
    role: "Secondary School",
    company: "PaperGenAI",
    initials: "TC",
    metric: "AI-generated exam papers, class 9–12",
  },
];
