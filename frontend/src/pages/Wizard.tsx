import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Sparkles,
  Loader2,
  FileDown,
  MessageSquare,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CursorFollower } from "@/components/CursorFollower";
import { type QAPair } from "@/lib/generateCRD";

type Step = "service" | "questions" | "decision" | "discussion" | "email" | "done";

type Question = {
  _id: string;
  questionId: number;
  text: string;
  type: string;
  options: string[];
};

// ─── Full-screen loading overlay ───────────────────────────────────────────────
const LoadingOverlay = ({ message }: { message: string }) => (
  <motion.div
    key="overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
  >
    <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
    <p className="text-sm font-medium text-muted-foreground">{message}</p>
  </motion.div>
);

// ─── Inline skeleton used between questions ────────────────────────────────────
const QuestionSkeleton = () => (
  <motion.div
    key="skeleton"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-4"
  >
    {/* question title */}
    <div className="h-8 rounded-lg bg-muted animate-pulse w-3/4" />
    {/* option skeletons */}
    {[1, 2, 3].map((n) => (
      <div key={n} className="h-14 rounded-lg bg-muted animate-pulse" style={{ opacity: 1 - n * 0.15 }} />
    ))}
  </motion.div>
);

const STEPS: Step[] = ["service", "questions", "decision", "discussion", "email", "done"];

const Wizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("service");
  const [qa, setQa] = useState<QAPair[]>([]);
  const [loading, setLoading] = useState(false);
  // Separate flag: true only while fetching the NEXT question (shows inline skeleton)
  const [questionLoading, setQuestionLoading] = useState(false);
  // Separate flag: true while completing / analysing after last question
  const [analysing, setAnalysing] = useState(false);
  // Separate flag: true while generating + sending the CRD email
  const [sendingEmail, setSendingEmail] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [aiResult, setAiResult] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const BASE = import.meta.env.VITE_BACKEND_URL;
  const WIZARD_START_URL    = `${BASE}/api/ai/wizard/start`;
  const WIZARD_ANSWER_URL   = `${BASE}/api/ai/wizard/answer`;
  const WIZARD_COMPLETE_URL = `${BASE}/api/ai/wizard/complete`;
  const DISCUSS_START_URL   = `${BASE}/api/ai/wizard/discuss/start`;
  const DISCUSS_MESSAGE_URL = `${BASE}/api/ai/wizard/discuss/message`;
  const SEND_CRD_URL        = `${BASE}/api/ai/wizard/send-crd`;
  const GENERATE_CRD_URL    = `${BASE}/api/ai/wizard/generate-crd`;

  // ── Boot: fetch first question ────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      setQuestionLoading(true);
      try {
        const res  = await fetch(WIZARD_START_URL);
        const data = await res.json();
        setSessionId(data.sessionId);
        setQuestion(data.question);
      } catch (err) {
        console.error("Error fetching first question:", err);
      } finally {
        setQuestionLoading(false);
      }
    };
    init();
  }, []);

  // ── Auto-scroll chat ──────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Complete wizard + AI analysis ─────────────────────────────────────────
  const completeWizard = async () => {
    if (!sessionId) return;
    setAnalysing(true);
    try {
      const res  = await fetch(WIZARD_COMPLETE_URL, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      setAiResult(data.aiResponse);
      setStep("decision");
    } catch (err) {
      console.error("Error completing wizard:", err);
    } finally {
      setAnalysing(false);
    }
  };

  // ── Start discussion ───────────────────────────────────────────────────────
  const startDiscussion = async () => {
    if (!sessionId || !aiResult) return;
    setLoading(true);
    try {
      const res  = await fetch(DISCUSS_START_URL, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ sessionId, initialAIResponse: aiResult }),
      });
      const data = await res.json();
      setMessages(data.messages);
      setStep("discussion");
    } catch (err) {
      console.error("Error starting discussion:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Send chat message ─────────────────────────────────────────────────────
  const sendMessage = async () => {
    if (!chatInput.trim() || !sessionId) return;
    const userMsg = { role: "user", content: chatInput };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setLoading(true);
    try {
      const res  = await fetch(DISCUSS_MESSAGE_URL, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ sessionId, message: userMsg.content }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Handle option click ───────────────────────────────────────────────────
  const handleOptionClick = async (option: string) => {
    if (!question || !sessionId) return;

    setQa((prev) => [...prev, { question: question.text, answer: option }]);
    setQuestionLoading(true);

    try {
      const res  = await fetch(WIZARD_ANSWER_URL, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ sessionId, questionId: question.questionId, answer: option }),
      });
      const data = await res.json();

      if (!data.completed) {
        setQuestion(data.nextQuestion);
        if (step === "service") setStep("questions");
        setQuestionLoading(false);
      } else {
        // Questions done — now analyse (different loading state)
        setQuestionLoading(false);
        await completeWizard();
      }
    } catch (err) {
      console.error("Error sending answer:", err);
      setQuestionLoading(false);
    }
  };

  // ── Submit email → generate + send CRD ───────────────────────────────────
  const submitEmail = async () => {
    if (!email.trim()) return;
    setSendingEmail(true);
    try {
      // 1. Generate CRD
      await fetch(GENERATE_CRD_URL, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ sessionId }),
      });

      // 2. Send email
      const res  = await fetch(SEND_CRD_URL, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ sessionId, userEmail: email.trim() }),
      });
      const data = await res.json();
      if (data.success) setStep("done");
    } catch (err) {
      console.error("Email error:", err);
    } finally {
      setSendingEmail(false);
    }
  };

  const restart = () => {
    setStep("service");
    setQa([]);
    setEmail("");
    setName("");
    setAiResult(null);
    setMessages([]);
  };

  const currentIdx = STEPS.indexOf(step);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <CursorFollower />

      {/* ── Full-screen overlays ──────────────────────────────────────────── */}
      <AnimatePresence>
        {analysing && (
          <LoadingOverlay message="Analysing your answers and generating recommendations…" />
        )}
        {sendingEmail && (
          <LoadingOverlay message="Generating your CRD and sending it to your email…" />
        )}
      </AnimatePresence>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-primary" />
            Service Wizard
          </div>
        </div>
      </header>

      {/* ── Progress bar ─────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 pt-10">
        <div className="flex items-center gap-2 mb-2">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= currentIdx ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Step {currentIdx + 1} of {STEPS.length}
        </p>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-6 py-12 min-h-[60vh]">
        <AnimatePresence mode="wait">

          {/* ── Questions / Service step ─────────────────────────────────── */}
          {(step === "service" || step === "questions") && (
            <motion.div
              key="questions-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <AnimatePresence mode="wait">
                {questionLoading ? (
                  <QuestionSkeleton key="skeleton" />
                ) : question ? (
                  <motion.div
                    key={question.questionId}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h1 className="text-3xl font-bold mb-6">{question.text}</h1>
                    <div className="grid gap-4">
                      {question.options.map((option) => (
                        <motion.button
                          key={option}
                          whileHover={{ y: -4, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleOptionClick(option)}
                          className="p-4 rounded-lg border border-border hover:border-primary transition text-left"
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Decision / AI result ─────────────────────────────────────── */}
          {step === "decision" && aiResult && (
            <motion.div
              key="decision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl font-bold mb-4">{aiResult.ui_sections.title}</h1>
              <p className="text-muted-foreground mb-6">{aiResult.ui_sections.description}</p>

              <div className="mb-6">
                <h2 className="font-semibold mb-2">Recommended Services</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {aiResult.services.map((s: string) => <li key={s}>{s}</li>)}
                </ul>
              </div>

              <div className="mb-6">
                <h2 className="font-semibold mb-2">Key Highlights</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {aiResult.ui_sections.highlights.map((item: string) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div className="flex gap-4 mt-8">
                <Button onClick={startDiscussion} disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <MessageSquare className="h-4 w-4 mr-2" />
                  )}
                  Do More Discussion
                </Button>
                <Button variant="outline" onClick={() => setStep("email")}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Generate CRD
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Discussion / Chat ─────────────────────────────────────────── */}
          {step === "discussion" && (
            <motion.div
              key="discussion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-[60vh]"
            >
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg max-w-[80%] ${
                      msg.role === "user"
                        ? "ml-auto bg-primary text-white"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div className="bg-muted p-3 rounded-lg max-w-[80px] flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Ask something…"
                  disabled={loading}
                />
                <Button onClick={sendMessage} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
                </Button>
                <Button variant="outline" onClick={() => setStep("email")}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Generate CRD
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Email step ───────────────────────────────────────────────── */}
          {step === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto"
            >
              <div className="text-center mb-8">
                <div className="inline-flex h-14 w-14 rounded-full bg-primary/10 items-center justify-center mb-4">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Almost there</h2>
                <p className="text-muted-foreground">
                  Where should we send a copy of your CRD? We'll also download it now.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Your name (optional)</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    disabled={sendingEmail}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitEmail()}
                    placeholder="you@company.com"
                    autoFocus
                    disabled={sendingEmail}
                  />
                </div>

                <Button
                  onClick={submitEmail}
                  className="w-full"
                  size="lg"
                  disabled={sendingEmail || !email.trim()}
                >
                  {sendingEmail ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating & Sending…
                    </>
                  ) : (
                    "Generate & Download CRD"
                  )}
                </Button>

                <button
                  onClick={() => setStep("decision")}
                  disabled={sendingEmail}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
                >
                  ← Back
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Done ─────────────────────────────────────────────────────── */}
          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center max-w-md mx-auto"
            >
              <div className="inline-flex h-16 w-16 rounded-full bg-green-100 items-center justify-center mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Thank You!</h1>
              <p className="text-muted-foreground mb-6">
                Your CRD has been successfully generated and sent to your email.
                Please check your inbox (and spam folder just in case).
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Our team will reach out to you shortly if needed.
              </p>
              <div className="flex flex-col gap-3">
                <Button onClick={restart}>Start New Project</Button>
                <Button variant="outline" onClick={() => navigate("/")}>Go to Home</Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
};

export default Wizard;