"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import {
  generateBotResponse,
  type ChatMessage,
} from "@/lib/chatbot-engine";
import { cn } from "@/lib/utils";

const QUICK_STARTERS = [
  "What services do you offer?",
  "Show me your latest projects",
  "How can I hire or contact Zain?",
];

export function NexoraChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadNotification, setUnreadNotification] = useState(true);
  const [providerTag, setProviderTag] = useState<string>("Nexora AI");

  const { scrollTo } = useSmoothScroll();
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Smooth scroll container to bottom whenever messages or typing state update
  useEffect(() => {
    if (isOpen && chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setUnreadNotification(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const historyPayload = messages.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.text || "I am here to help you with MZ Nexora.",
          timestamp: Date.now(),
          suggestions: data.suggestions,
          actionLink: data.actionLink,
        };

        if (data.provider === "gemini") {
          setProviderTag("Gemini AI");
        } else if (data.provider === "groq") {
          setProviderTag("Groq AI");
        } else if (data.provider === "openai") {
          setProviderTag("OpenAI");
        } else {
          setProviderTag("Nexora AI");
        }

        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("Chat route non-200");
      }
    } catch (err) {
      console.warn("API request failed, using local engine...", err);
      const fallback = generateBotResponse(text);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: fallback.text,
        timestamp: Date.now(),
        suggestions: fallback.suggestions,
        actionLink: fallback.actionLink,
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([]);
    setProviderTag("Nexora AI");
  };

  const handleActionClick = (link: {
    label: string;
    href: string;
    external?: boolean;
  }) => {
    if (link.external) {
      window.open(link.href, "_blank", "noopener,noreferrer");
    } else if (link.href.startsWith("#")) {
      setIsOpen(false);
      scrollTo(link.href);
    } else {
      window.location.href = link.href;
    }
  };

  /**
   * Helper to format markdown headers, bullets, bold, and links safely
   */
  const renderMessageContent = (text: string) => {
    const lines = text.split("\n");
    return (
      <div className="space-y-1.5 text-xs sm:text-[0.8125rem] leading-relaxed">
        {lines.map((rawLine, idx) => {
          let line = rawLine;
          if (!line.trim()) return <div key={idx} className="h-1" />;

          const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
          const isHeader = line.trim().startsWith("### ") || line.trim().startsWith("## ");

          if (isBullet) {
            line = line.trim().replace(/^[-*]\s+/, "");
          } else if (isHeader) {
            line = line.trim().replace(/^#{2,3}\s+/, "");
          }

          const parts = line.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

          return (
            <div
              key={idx}
              className={cn(
                "break-words",
                isBullet && "flex items-start gap-1.5 pl-1.5",
                isHeader && "font-semibold text-ice mt-1 text-[0.875rem]"
              )}
            >
              {isBullet && (
                <span className="text-aqua mt-1 text-[8px] select-none">◆</span>
              )}
              <p className="flex-1">
                {parts.map((part, pIdx) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <strong key={pIdx} className="font-semibold text-ice">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  if (part.startsWith("`") && part.endsWith("`")) {
                    return (
                      <code
                        key={pIdx}
                        className="rounded bg-white/10 px-1 py-0.5 font-mono text-[11px] text-aqua"
                      >
                        {part.slice(1, -1)}
                      </code>
                    );
                  }
                  const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
                  if (linkMatch) {
                    return (
                      <a
                        key={pIdx}
                        href={linkMatch[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-aqua underline underline-offset-2 hover:text-ice transition-colors inline-flex items-center gap-0.5"
                      >
                        {linkMatch[1]}
                        <ExternalLink className="size-2.5 inline opacity-70" />
                      </a>
                    );
                  }
                  return part;
                })}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className={cn(
            "relative group flex items-center justify-center size-13 sm:size-14 rounded-full shadow-2xl transition-all duration-300",
            "bg-gradient-to-br from-electric via-blue-600 to-aqua text-white",
            "border border-white/20 hover:border-white/40",
            "shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(20,184,166,0.6)]",
          )}
          aria-label={
            isOpen ? "Close AI Assistant" : "Open MZ Nexora AI Assistant"
          }
        >
          {/* Animated Glow Ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-electric to-aqua opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />

          <span className="relative z-10 flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  <X className="size-6 text-white" />
                </motion.span>
              ) : (
                <motion.span
                  key="bot-icon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  <Bot className="size-6 text-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>

          {/* Unread notification badge */}
          {unreadNotification && !isOpen && (
            <span className="absolute -top-1 -right-1 flex size-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aqua opacity-75" />
              <span className="relative inline-flex rounded-full size-4 bg-aqua border-2 border-abyss" />
            </span>
          )}

          {/* Floating Hover Tooltip */}
          {!isOpen && (
            <span className="pointer-events-none absolute right-16 hidden rounded-lg border border-ice/10 bg-obsidian/95 px-3 py-1.5 text-xs font-medium text-ice opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:opacity-100 sm:block whitespace-nowrap">
              Ask MZ Nexora AI
            </span>
          )}
        </motion.button>
      </div>

      {/* Expandable Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="nexora-chat-modal"
            initial={{
              opacity: 0,
              scale: 0.85,
              y: 24,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                damping: 26,
                stiffness: 300,
                mass: 0.75,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.88,
              y: 18,
              filter: "blur(6px)",
              transition: {
                duration: 0.22,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            style={{ transformOrigin: "bottom right" }}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className={cn(
              "fixed z-50 flex flex-col overflow-hidden",
              "bottom-20 right-4 sm:bottom-24 sm:right-6",
              "w-[calc(100vw-2rem)] sm:w-[400px] max-w-[420px]",
              "h-[500px] sm:h-[550px] max-h-[82vh]",
              "rounded-2xl border border-ice/15 bg-obsidian/95 shadow-2xl backdrop-blur-2xl",
              "glass-rim overscroll-contain",
            )}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between px-4 py-3 border-b border-ice/10 bg-abyss/80">
              <div className="flex items-center gap-2.5">
                <div className="relative flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-electric/25 to-aqua/20 border border-ice/15 text-aqua">
                  <Bot className="size-4.5 text-aqua" />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 border-2 border-abyss" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display text-sm font-semibold text-ice leading-none">
                      Nexora AI
                    </h4>
                    <span className="rounded-full bg-aqua/10 px-1.5 py-0.2 font-mono text-[9.5px] text-aqua border border-aqua/20">
                      {providerTag}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[10.5px] text-mist flex items-center gap-1">
                    <CheckCircle2 className="size-2.5 text-emerald-400" />
                    Online • AI Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    title="Clear chat"
                    className="rounded-lg p-1.5 text-mist hover:bg-ice/10 hover:text-ice transition-colors"
                    aria-label="Clear chat"
                  >
                    <RotateCcw className="size-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="rounded-lg p-1.5 text-mist hover:bg-ice/10 hover:text-ice transition-colors"
                  aria-label="Close chat"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div
              ref={chatBodyRef}
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-3.5 chat-scroll touch-pan-y select-text"
            >
              {/* Clean Minimalist Empty State */}
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.05 }}
                  className="flex h-full flex-col items-center justify-center text-center p-4 my-auto select-none"
                >
                  <div className="relative mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-electric/20 via-aqua/15 to-transparent border border-ice/15 shadow-inner">
                    <Bot className="size-6 text-aqua" />
                    <span className="absolute -inset-1 rounded-2xl bg-aqua/20 blur-sm -z-10" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-ice">
                    Nexora AI Assistant
                  </h3>
                  <p className="mt-1 max-w-[240px] text-xs text-mist leading-relaxed">
                    Ask anything about MZ Nexora, our services, or discuss your project.
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-2 w-full max-w-[270px]">
                    {QUICK_STARTERS.map((starter, sIdx) => (
                      <motion.button
                        key={sIdx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 + sIdx * 0.05 }}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => handleSend(starter)}
                        className="flex items-center gap-2 rounded-xl border border-ice/10 bg-ice/[0.03] px-3 py-2 text-left text-xs text-ice/80 hover:border-aqua/40 hover:bg-aqua/10 hover:text-white transition-all duration-200 group cursor-pointer"
                      >
                        <Sparkles className="size-3 text-aqua shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">{starter}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col gap-1 max-w-[88%]",
                      msg.sender === "user" ? "ml-auto items-end" : "items-start",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-1.5 text-[10.5px] font-mono text-mist",
                        msg.sender === "user" ? "flex-row-reverse" : "flex-row",
                      )}
                    >
                      {msg.sender === "user" ? (
                        <>
                          <User className="size-3 text-electric" />
                          <span>You</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-3 text-aqua" />
                          <span>Nexora AI</span>
                        </>
                      )}
                    </div>

                    <div
                      className={cn(
                        "rounded-2xl p-3 shadow-md",
                        msg.sender === "user"
                          ? "bg-gradient-to-br from-electric/90 to-blue-700 text-white rounded-br-xs"
                          : "bg-abyss/80 border border-ice/10 text-ice/90 rounded-bl-xs backdrop-blur-md",
                      )}
                    >
                      {renderMessageContent(msg.text)}

                      {/* Action Link Button if provided */}
                      {msg.actionLink && (
                        <div className="mt-2.5 pt-2 border-t border-ice/10">
                          <button
                            type="button"
                            onClick={() => handleActionClick(msg.actionLink!)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-aqua/15 px-3 py-1.5 text-xs font-semibold text-aqua hover:bg-aqua/25 transition-colors border border-aqua/30 shadow-xs"
                          >
                            <span>{msg.actionLink.label}</span>
                            {msg.actionLink.external ? (
                              <ExternalLink className="size-3" />
                            ) : (
                              <ArrowUpRight className="size-3" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Suggestion Chips */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {msg.suggestions.map((suggestion, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => handleSend(suggestion)}
                            className="rounded-full border border-ice/15 bg-ice/[0.04] px-2.5 py-1 text-[11px] font-medium text-mist hover:border-aqua/40 hover:bg-aqua/10 hover:text-ice transition-colors duration-200 text-left"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 max-w-[80%]">
                  <div className="rounded-2xl rounded-bl-xs bg-abyss/80 border border-ice/10 px-3.5 py-2 text-mist text-xs flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-aqua animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-1.5 rounded-full bg-aqua animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-1.5 rounded-full bg-aqua animate-bounce" />
                    <span className="text-[11px] text-mist/80 ml-1 font-mono">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-ice/10 bg-abyss/90 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about MZ Nexora, services, Zain..."
                    disabled={isTyping}
                    className="w-full rounded-xl border border-ice/15 bg-obsidian/90 px-3.5 py-2.5 text-xs text-ice placeholder:text-mist/60 focus:border-aqua/50 focus:outline-hidden focus:ring-1 focus:ring-aqua/40 transition-all disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-xl transition-all",
                    input.trim() && !isTyping
                      ? "bg-electric text-white hover:bg-electric/90 shadow-md shadow-electric/25 cursor-pointer"
                      : "bg-ice/5 text-mist/40 cursor-not-allowed border border-ice/5",
                  )}
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
