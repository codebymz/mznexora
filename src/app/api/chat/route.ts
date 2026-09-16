import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/ai/knowledge-base";
import { generateBotResponse } from "@/lib/chatbot-engine";

export const runtime = "nodejs";

interface ChatPayload {
  message: string;
  history?: Array<{
    sender: "user" | "bot";
    text: string;
  }>;
}

/**
 * Calls Google Gemini REST API
 */
async function callGemini(apiKey: string, message: string, history: ChatPayload["history"]) {
  const contents = [
    {
      role: "user",
      parts: [{ text: `${SYSTEM_PROMPT}\n\nPlease acknowledge your role and respond only within these parameters.` }],
    },
    {
      role: "model",
      parts: [{ text: "Understood. I am Nexora AI, the official assistant for MZ Nexora and founder Muhammad Zain. I will strictly adhere to the guidelines and provide concise, accurate, and helpful responses." }],
    },
  ];

  if (history && history.length > 0) {
    for (const h of history.slice(-6)) {
      contents.push({
        role: h.sender === "user" ? "user" : "model",
        parts: [{ text: h.text }],
      });
    }
  }

  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 800,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Invalid response format from Gemini API");
  }
  return text;
}

/**
 * Calls OpenAI-compatible API (OpenAI or Groq)
 */
async function callOpenAICompatible(
  endpoint: string,
  apiKey: string,
  model: string,
  message: string,
  history: ChatPayload["history"]
) {
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  if (history && history.length > 0) {
    for (const h of history.slice(-6)) {
      messages.push({
        role: h.sender === "user" ? "user" : "assistant",
        content: h.text,
      });
    }
  }

  messages.push({ role: "user", content: message });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.3,
      max_tokens: 800,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("Invalid response structure from AI Provider");
  }
  return text;
}

/**
 * Parse smart dynamic action links and suggestions from the reply
 */
function extractActionLinksAndSuggestions(query: string, replyText: string) {
  const q = query.toLowerCase();
  const r = replyText.toLowerCase();

  let actionLink: { label: string; href: string; external?: boolean } | undefined;
  let suggestions: string[] = [
    "What services do you provide?",
    "Tell me about PaperGenAI",
    "How can I start a project?",
  ];

  // If user wants to build a site / contact Zain / asks pricing
  if (
    q.includes("web") ||
    q.includes("banani") ||
    q.includes("build") ||
    q.includes("hire") ||
    q.includes("contact") ||
    q.includes("number") ||
    q.includes("price") ||
    q.includes("cost") ||
    r.includes("whatsapp") ||
    r.includes("contact")
  ) {
    actionLink = {
      label: "Chat on WhatsApp (+92 326 9656457)",
      href: "https://wa.me/923269656457",
      external: true,
    };
    suggestions = [
      "Go to Contact Form",
      "What are your core services?",
      "Who is founder Muhammad Zain?",
    ];
  } else if (q.includes("papergen") || r.includes("paper-genai")) {
    actionLink = {
      label: "Open PaperGenAI Live",
      href: "https://paper-genai.vercel.app",
      external: true,
    };
    suggestions = [
      "How do n8n automations work?",
      "Tell me about Speed Lab",
      "How can I hire MZ Nexora?",
    ];
  } else if (q.includes("speed") || r.includes("speed-lab")) {
    actionLink = {
      label: "Open Speed Lab Live",
      href: "https://speed-lab.vercel.app",
      external: true,
    };
  } else if (q.includes("founder") || q.includes("zain") || q.includes("owner")) {
    actionLink = {
      label: "View Zain's Portfolio",
      href: "https://mzainulabdin.vercel.app",
      external: true,
    };
    suggestions = [
      "What products has Zain built?",
      "I want to build a project",
      "What is your tech stack?",
    ];
  }

  return { actionLink, suggestions };
}

export async function POST(request: Request) {
  try {
    const body: ChatPayload = await request.json();
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    let responseText = "";
    let providerUsed = "fallback";

    if (geminiKey && geminiKey.trim() !== "") {
      try {
        responseText = await callGemini(geminiKey, message, body.history);
        providerUsed = "gemini";
      } catch (err) {
        console.warn("Gemini call failed, checking next provider...", err);
      }
    }

    if (!responseText && groqKey && groqKey.trim() !== "") {
      try {
        responseText = await callOpenAICompatible(
          "https://api.groq.com/openai/v1/chat/completions",
          groqKey,
          "llama-3.3-70b-versatile",
          message,
          body.history
        );
        providerUsed = "groq";
      } catch (err) {
        console.warn("Groq call failed, checking next provider...", err);
      }
    }

    if (!responseText && openaiKey && openaiKey.trim() !== "") {
      try {
        responseText = await callOpenAICompatible(
          "https://api.openai.com/v1/chat/completions",
          openaiKey,
          "gpt-4o-mini",
          message,
          body.history
        );
        providerUsed = "openai";
      } catch (err) {
        console.warn("OpenAI call failed, falling back to local engine...", err);
      }
    }

    // If no provider key configured or all failed, use our smart studio knowledge fallback
    if (!responseText) {
      const fallback = generateBotResponse(message);
      responseText = fallback.text;
      providerUsed = "knowledge-engine";
    }

    const { actionLink, suggestions } = extractActionLinksAndSuggestions(
      message,
      responseText
    );

    return NextResponse.json({
      text: responseText,
      suggestions,
      actionLink,
      provider: providerUsed,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        fallback: generateBotResponse("help").text,
      },
      { status: 500 }
    );
  }
}
