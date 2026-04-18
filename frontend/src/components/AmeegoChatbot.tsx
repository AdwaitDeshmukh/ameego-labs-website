import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "@/hooks/use-toast";

type Msg = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_BACKEND_URL}/api/ai/chatbot`;

export function AmeegoChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm **AmeegoBot**. Ask me anything about Ameego Labs — our products like *eSchool*, *Chidya Udd*, *Khabar Club*, our services, or how to get in touch!",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto Scroll */
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  /* Auto Focus Input */
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [open]);

  /* SEND MESSAGE */
  const send = async () => {
    const text = input.trim();

    if (!text || isLoading) return;

    const userMsg: Msg = {
      role: "user",
      content: text,
    };

    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("API failed");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error("Backend returned error");
      }

      const assistantMsg: Msg = {
        role: "assistant",
        content: data.response,
      };

      /* Small delay for natural feel */
      setTimeout(() => {
        setMessages((prev) => [...prev, assistantMsg]);
      }, 400);

    } catch (error) {
      console.error(error);

      toast({
        title: "Chat Error",
        description: "Failed to get response from server.",
        variant: "destructive",
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.5,
          type: "spring",
          stiffness: 200,
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[60] h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 90 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: -90 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-[60] w-[calc(100vw-3rem)] sm:w-[380px] h-[520px] rounded-2xl border bg-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}

            <div className="px-4 py-3 border-b flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>

              <div>
                <div className="font-semibold text-sm">
                  AmeegoBot
                </div>

                <div className="text-xs text-muted-foreground">
                  🟢 Online
                </div>
              </div>
            </div>

            {/* Messages */}

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user"
                    ? "justify-end"
                    : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                      }`}
                  >
                    <ReactMarkdown>
                      {m.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl px-3.5 py-3 flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce delay-150" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce delay-300" />
                  </div>
                </div>
              )}

            </div>

            {/* Input */}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="border-t p-3 flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Ask about Ameego Labs..."
                disabled={isLoading}
                className="flex-1 h-10 rounded-full bg-muted px-4 text-sm outline-none"
              />

              <button
                type="submit"
                disabled={
                  !input.trim() || isLoading
                }
                className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>

            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}