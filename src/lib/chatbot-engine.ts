import { site } from "@/lib/site";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: number;
  suggestions?: string[];
  actionLink?: { label: string; href: string; external?: boolean };
}

export const INITIAL_GREETING: ChatMessage = {
  id: "init-welcome",
  sender: "bot",
  text: `Hello! I am the **MZ Nexora AI Studio Assistant**. 

I am strictly dedicated to answering questions about **MZ Nexora** and our founder, **Muhammad Zain**. How can I help you explore our AI solutions or discuss a project?`,
  timestamp: Date.now(),
  suggestions: [
    "What services do you provide?",
    "Who is the founder Muhammad Zain?",
    "What projects have you built?",
    "I want to build a website/app",
    "How can I hire or contact you?",
  ],
};

const OUT_OF_SCOPE_RESPONSES: string[] = [
  `I am specifically trained **only to answer questions about MZ Nexora and its founder, Muhammad Zain**.

I cannot write arbitrary programming code, solve general homework, or discuss non-company topics. 

If you are looking to build a custom AI agent, web application, or automation workflow for your business, I would love to connect you with our founder!`,
  `Maaf kijiye, main sirf **MZ Nexora** company aur founder **Muhammad Zain** ke mutaliq sawalat ka jawab de sakta hoon. 

Main aam coding exercises ya ghair-mutaliqa (out of scope) topics par baat nahi kar sakta. Agar aap koi website, automation ya AI project build karwana chahte hain, to zaroor batayein!`,
];

/**
 * Checks whether the prompt is an attempt to ask for general programming code,
 * general trivia, or off-topic queries.
 */
function isOutOfScope(lower: string): boolean {
  const codePatterns = [
    /\b(write|create|give|generate|make)\s+(a\s+)?(code|program|script|function|class|algorithm|html|css|javascript|python|java|c\+\+|php|sql|regex)\b/i,
    /\b(binary\s*search|bubble\s*sort|fibonacci|factorial|palindrome|leetcode|hackerrank)\b/i,
    /\b(solve|calculate|math|equation|integral|derivative)\b/i,
    /\b(essay|poem|song|story|joke|riddle|recipe|cook|baking)\b/i,
    /\b(weather|climate\s+change|capital\s+of|president\s+of|who\s+won|football|cricket\s+score)\b/i,
    /\b(ignore\s+(all\s+)?previous|system\s+prompt|jailbreak|dan\s+mode|pretend\s+you\s+are)\b/i,
  ];

  for (const pattern of codePatterns) {
    if (pattern.test(lower)) {
      const allowedCompanyContext =
        lower.includes("you build") ||
        lower.includes("nexora") ||
        lower.includes("zain") ||
        lower.includes("service") ||
        lower.includes("pricing") ||
        lower.includes("offer") ||
        lower.includes("banwani") ||
        lower.includes("banani") ||
        lower.includes("bnani") ||
        lower.includes("hire") ||
        lower.includes("cost") ||
        lower.includes("contact");

      if (!allowedCompanyContext) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Intelligent domain-specific knowledge responder for MZ Nexora
 */
export function generateBotResponse(userInput: string): {
  text: string;
  suggestions?: string[];
  actionLink?: { label: string; href: string; external?: boolean };
} {
  const query = userInput.trim().toLowerCase();

  // 1. Check for out-of-scope queries
  if (isOutOfScope(query)) {
    return {
      text: OUT_OF_SCOPE_RESPONSES[0] ?? "I can only answer questions regarding MZ Nexora and Muhammad Zain.",
      suggestions: [
        "What services does MZ Nexora offer?",
        "Tell me about founder Muhammad Zain",
        "I want to build a website/project",
      ],
      actionLink: {
        label: "Contact Studio",
        href: "#contact",
      },
    };
  }

  // 2. Project Inquiry / "Mujhe web banwani he" / Hiring Intent
  if (
    query.includes("banwani") ||
    query.includes("banani") ||
    query.includes("bnani") ||
    query.includes("web bnani") ||
    query.includes("website banani") ||
    query.includes("app banani") ||
    query.includes("project banwana") ||
    query.includes("build a website") ||
    query.includes("build an app") ||
    query.includes("hire you") ||
    query.includes("hire zain") ||
    query.includes("want a project") ||
    query.includes("start a project")
  ) {
    return {
      text: `Zabardast! Agar aap koi **Website**, **Web Application**, **AI Agent**, ya **n8n Automation** build karwana chahte hain to founder **Muhammad Zain** aapke project ko directly handle karenge:

### 🚀 Agle Steps:
1. 💬 **WhatsApp Direct:** Aap seedha **${site.phone}** par message kar sakte hain.
2. 📝 **Contact Form:** Neeche diye gaye button par click karke form fill kar dein.
3. ⚡ **Turnaround:** 24 ghante ke andar project scope aur timeline discuss kar li jayegi.`,
      suggestions: [
        "Chat on WhatsApp",
        "Open Contact Form",
        "What are your core services?",
        "View past projects",
      ],
      actionLink: {
        label: "Chat on WhatsApp (+92 326 9656457)",
        href: site.whatsapp,
        external: true,
      },
    };
  }

  // 3. Greetings / Salutations
  if (
    /^(hi|hello|hey|salam|assalam|aoa|hola|greetings|kia hal|kya haal)/i.test(
      query,
    )
  ) {
    return {
      text: `Hello! Welcome to **MZ Nexora**. 

We are a premier AI studio & automation practice founded by **Muhammad Zain**. We engineer autonomous AI agents, enterprise n8n workflows, and full-stack Next.js applications.

How can I assist you with your business requirements today?`,
      suggestions: [
        "Explore services",
        "View past projects",
        "Who is Muhammad Zain?",
        "I want to build a website",
      ],
      actionLink: {
        label: "View Services",
        href: "#services",
      },
    };
  }

  // 4. Founder / Owner Information (Muhammad Zain)
  if (
    query.includes("founder") ||
    query.includes("owner") ||
    query.includes("zain") ||
    query.includes("muhammad zain") ||
    query.includes("who made") ||
    query.includes("who built") ||
    query.includes("creator") ||
    query.includes("malik") ||
    query.includes("kis ne banaya") ||
    query.includes("who is behind")
  ) {
    return {
      text: `**Muhammad Zain** is the Founder & Lead AI Engineer of MZ Nexora.

Key Facts about the Founder:
• **Role:** Solo builder, Full-Stack & AI Automation Engineer based in Pakistan.
• **Philosophy:** *"I build things I would use myself. That is the only standard I work to."*
• **Experience:** 100% solo-built & owned production systems, autonomous n8n workflows, AI agents, and web applications.
• **Personal Portfolio:** [mzainulabdin.vercel.app](${site.portfolio})
• **Direct Contact:** [WhatsApp](${site.whatsapp}) or [Email](mailto:${site.email})`,
      suggestions: [
        "What projects has Zain built?",
        "What services does MZ Nexora offer?",
        "How to contact Muhammad Zain directly?",
      ],
      actionLink: {
        label: "Founder Portfolio",
        href: site.portfolio,
        external: true,
      },
    };
  }

  // 5. Company Overview / What is MZ Nexora?
  if (
    query.includes("what is mz nexora") ||
    query.includes("about company") ||
    query.includes("about nexora") ||
    query.includes("tell me about mz nexora") ||
    query.includes("agency") ||
    query.includes("company") ||
    query.includes("studio") ||
    query.includes("who are you") ||
    query.includes("about you")
  ) {
    return {
      text: `**MZ Nexora** is a premier AI Studio & Automation Practice founded in 2024 by Muhammad Zain.

**What We Do:**
• **Autonomous AI Agents:** Custom multi-agent systems with tools, memory, and strict guardrails.
• **n8n Workflow Automations:** Enterprise self-hosted workflow systems with zero recurring vendor tax.
• **Full-Stack AI Web Apps:** High-performance Next.js 15, TypeScript, and Tailwind web applications.
• **Custom AI Chatbots:** RAG-powered knowledge assistants integrated into CRM, WhatsApp, or websites.

We build production-ready systems from start to finish with direct engineering communication.`,
      suggestions: [
        "View practice areas & services",
        "How much does a project cost?",
        "See portfolio projects",
        "Contact the studio",
      ],
      actionLink: {
        label: "Read About Section",
        href: "#about",
      },
    };
  }

  // 6. Services & Capabilities
  if (
    query.includes("service") ||
    query.includes("offer") ||
    query.includes("what do you do") ||
    query.includes("kya karte ho") ||
    query.includes("capabilities") ||
    query.includes("practice") ||
    query.includes("product engineering") ||
    query.includes("applied intelligence")
  ) {
    return {
      text: `MZ Nexora operates across **three main engineering practices**:

1. 🧠 **Applied Intelligence:**
   • Autonomous AI Agents & Multi-Agent systems
   • Custom n8n Workflow Automation
   • Intelligent Chatbots & Document Assistants
   • Process Audits & Reliability SLAs

2. ⚡ **Product Engineering:**
   • Modern Next.js 15 & React Web Platforms
   • Interactive 3D interfaces (Three.js / WebGL)
   • Secure REST / GraphQL API Integrations
   • Scalable PostgreSQL & Vector Database Architecture

3. 📈 **Demand & Growth:**
   • Automated Outbound & Inbound Lead Pipelines
   • SEO, Meta Ads & Social Media Marketing`,
      suggestions: [
        "Tell me about n8n automation",
        "Tell me about AI Agents",
        "View past projects",
        "Get a project quote",
      ],
      actionLink: {
        label: "Explore All Services",
        href: "#services",
      },
    };
  }

  // 7. n8n Automation Specifics
  if (
    query.includes("n8n") ||
    query.includes("automation") ||
    query.includes("workflow") ||
    query.includes("zapier") ||
    query.includes("make.com")
  ) {
    return {
      text: `**n8n Workflow Automation at MZ Nexora:**

We build and deploy robust, self-hosted n8n instances and enterprise pipelines:
• **No Per-Task Tax:** Unlike Zapier or Make, you own the infrastructure outright with unlimited workflow executions.
• **Custom Nodes & Integrations:** Connect your CRMs, databases, AI models, Telegram, WhatsApp, Gmail, Stripe, and spreadsheets.
• **Reliability:** Built with retry logic, error alerting, and human-in-the-loop validation fallbacks.`,
      suggestions: [
        "Book an automation diagnosis",
        "How long does setup take?",
        "Contact on WhatsApp",
      ],
      actionLink: {
        label: "Book Automation Diagnosis",
        href: "#contact",
      },
    };
  }

  // 8. Portfolio & Past Projects
  if (
    query.includes("project") ||
    query.includes("portfolio") ||
    query.includes("work") ||
    query.includes("case study") ||
    query.includes("papergenai") ||
    query.includes("speed lab") ||
    query.includes("zapr") ||
    query.includes("lms") ||
    query.includes("kya banaya he")
  ) {
    return {
      text: `Here are the key products shipped by Muhammad Zain & MZ Nexora:

1. 📄 **PaperGenAI (Live):**
   • AI exam paper & test generator for Classes 9-12 (Punjab Boards) with Python FastAPI & RAG chatbot ([Live Site](https://paper-genai.vercel.app)).

2. ⚡ **Speed Lab (Live):**
   • 2-in-1 browser utility for network bandwidth and typing speed (WPM + accuracy) ([Live Site](https://speed-lab.vercel.app)).

3. 🔄 **Zapr (Coming Soon):**
   • High-speed in-browser file converter handling documents, PDF to Excel, and media formats.

4. 🏫 **School LMS (Enterprise):**
   • Academic management system built for Hassan Bin Sabit High School.

5. 🤖 **n8n Automations:**
   • Automated lead enrichment, CRM syncing, and operational workflows.`,
      suggestions: [
        "View Portfolio Section",
        "Who built these projects?",
        "I want to build a website",
      ],
      actionLink: {
        label: "View Portfolio",
        href: "#work",
      },
    };
  }

  // 9. Tech Stack & Technologies
  if (
    query.includes("stack") ||
    query.includes("tech") ||
    query.includes("technology") ||
    query.includes("language") ||
    query.includes("framework") ||
    query.includes("tools")
  ) {
    return {
      text: `**MZ Nexora's Core Technology Stack:**

• **Frontend & UI:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Three.js / React Three Fiber.
• **Backend & AI:** Python (FastAPI), Node.js, Google Gemini, OpenAI, Anthropic Claude, LangChain, n8n, Vector DBs.
• **Databases & DevOps:** PostgreSQL, Supabase, Redis, Vercel, Docker, Git.`,
      suggestions: [
        "What services do you offer with this stack?",
        "Check client case studies",
        "Contact for a build",
      ],
      actionLink: {
        label: "View Stack",
        href: "#stack",
      },
    };
  }

  // 10. Pricing, Diagnosis & Timelines
  if (
    query.includes("price") ||
    query.includes("cost") ||
    query.includes("rate") ||
    query.includes("fee") ||
    query.includes("kitna kharcha") ||
    query.includes("timeline") ||
    query.includes("time") ||
    query.includes("how long") ||
    query.includes("process")
  ) {
    return {
      text: `**Pricing & Engagement Model:**

• **Transparent Scoping:** We don't do hidden fees or confusing retainer tiers. Every project is scoped based on deliverables, complexity, and target ROI.
• **Typical Delivery Timelines:**
  - Automated Workflows & n8n Setups: 1 to 2 weeks.
  - Custom AI Agents & Web Apps: 2 to 4 weeks.
• **Step 1 — Diagnosis:** Send us the manual process or product idea you have. We will evaluate feasibility and give you clear pricing!`,
      suggestions: [
        "Book a diagnosis",
        "Contact via WhatsApp",
        "Send an inquiry email",
      ],
      actionLink: {
        label: "Book a Diagnosis",
        href: "#contact",
      },
    };
  }

  // 11. Contact, WhatsApp, Email, Location
  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("phone") ||
    query.includes("whatsapp") ||
    query.includes("call") ||
    query.includes("hire") ||
    query.includes("reach") ||
    query.includes("rabta") ||
    query.includes("location") ||
    query.includes("address") ||
    query.includes("number")
  ) {
    return {
      text: `**Contact MZ Nexora & Muhammad Zain Directly:**

• 💬 **WhatsApp:** [${site.phone}](${site.whatsapp})
• 📧 **Email:** [${site.email}](mailto:${site.email})
• 📍 **Location:** Pakistan (Serving international clients)
• 🌐 **Founder Portfolio:** [mzainulabdin.vercel.app](${site.portfolio})
• 🐙 **GitHub:** [github.com/codebymz](${site.github})
• 💼 **LinkedIn:** [linkedin.com/in/mznexora](${site.linkedin})

You can also send a direct message using the contact form below!`,
      suggestions: [
        "Open Contact Form",
        "Message on WhatsApp",
        "What is the process to start?",
      ],
      actionLink: {
        label: "Chat on WhatsApp (+92 326 9656457)",
        href: site.whatsapp,
        external: true,
      },
    };
  }

  // Fallback for general company questions
  return {
    text: `MZ Nexora is an AI Studio focused on building autonomous agents, n8n automations, and custom Next.js applications, founded by Muhammad Zain.

If you have a specific inquiry regarding our services, projects, or founder, please select one of the topics below or reach out directly!`,
    suggestions: [
      "Our Services & Automations",
      "About Muhammad Zain (Founder)",
      "Our Projects (PaperGenAI, SpeedLab, Zapr)",
      "I want to build a website/project",
    ],
    actionLink: {
      label: "Contact Studio",
      href: "#contact",
    },
  };
}
