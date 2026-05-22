"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to Monal Lahore. I'm your AI concierge — ask about reservations, menu, events, or directions. اردو میں بھی پوچھ سکتے ہیں۔",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const bottomRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(`sess_${Date.now()}`);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          sessionId: sessionId.current,
          language,
          history: messages.slice(-8),
        }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I couldn't connect. Please try again or call us." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(520px,80vh)] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gold/20 glass shadow-2xl shadow-black/50"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-gold/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-gold" />
                <div>
                  <p className="font-display text-sm font-semibold text-gold">Monal AI</p>
                  <p className="text-[10px] text-muted-foreground">Reservation · Menu · FAQ</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                  className="rounded px-2 py-1 text-xs text-gold hover:bg-gold/10"
                >
                  {language === "en" ? "اردو" : "EN"}
                </button>
                <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "ml-auto bg-gold/20 text-foreground"
                      : "bg-white/5 text-muted-foreground"
                  )}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="text-xs text-gold animate-pulse">Thinking...</div>
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={sendMessage} className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === "ur" ? "اپنا سوال لکھیں..." : "Ask anything..."}
                className="flex-1 rounded-md bg-white/5 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-gold/50"
              />
              <Button type="submit" size="icon" disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-black shadow-lg shadow-gold/30"
        aria-label="Open AI assistant"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </>
  );
}
