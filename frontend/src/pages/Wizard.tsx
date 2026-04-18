import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Palette,
  Cloud,
  Brain,
  Users,
  GraduationCap,
  Sparkles,
  Loader2,
  FileDown,
  MessageSquare,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { CursorFollower } from "@/components/CursorFollower";
import { generateCRDPdf, type QAPair } from "@/lib/generateCRD";


type Question = {
  _id: string;
  questionId: number;
  text: string;
  type: string;
  options: string[];
};

const Wizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("service");
  const [service, setService] = useState<string>("");
  const [qa, setQa] = useState<QAPair[]>([]);
  const [currentQ, setCurrentQ] = useState<{ question: string; options: string[] } | null>(null);
  const [customAnswer, setCustomAnswer] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [finalAnswers, setFinalAnswers] = useState<any[]>([]);
  const [aiResult, setAiResult] = useState<any>(null);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");

  type Step = "service" | "questions" | "decision" | "discussion" | "email" | "done";

  const WIZARD_START_URL = `${import.meta.env.VITE_BACKEND_URL}/api/ai/wizard/start`;
  const WIZARD_ANSWER_URL = `${import.meta.env.VITE_BACKEND_URL}/api/ai/wizard/answer`;
  const WIZARD_COMPLETE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/ai/wizard/complete`;
  const DISCUSS_START_URL = `${import.meta.env.VITE_BACKEND_URL}/api/ai/wizard/discuss/start`;
  const DISCUSS_MESSAGE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/ai/wizard/discuss/message`;

  useEffect(() => {
    const getFirstQuestion = async () => {
      try {
        const res = await fetch(WIZARD_START_URL); // your GET API
        const data = await res.json();

        setSessionId(data.sessionId);
        setQuestion(data.question);

        console.log(data);
      } catch (err) {
        console.error("Error fetching first question:", err);
      }
    };

    getFirstQuestion();
  }, []);

  const completeWizard = async () => {

    if (!sessionId) return;

    try {

      const res = await fetch(
        WIZARD_COMPLETE_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            sessionId: sessionId,
          }),
        }
      );

      const data = await res.json();

      console.log("Complete Response:", data);

      // Save answers
      setFinalAnswers(data.answers);

      // Save AI result
      setAiResult(data.aiResponse);

      // Move to decision step
      setStep("decision");

    } catch (err) {

      console.error("Error completing wizard:", err);

    }
  };

  const startDiscussion = async () => {

    if (!sessionId || !aiResult) return;

    try {

      setLoading(true);

      const res = await fetch(
        DISCUSS_START_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            sessionId: sessionId,
            initialAIResponse: aiResult,
          }),
        }
      );

      const data = await res.json();

      console.log("Discussion Started:", data);

      // Save first assistant message
      setMessages(data.messages);

      // Move to discussion UI
      setStep("discussion");

    } catch (err) {

      console.error("Error starting discussion:", err);

    } finally {

      setLoading(false);

    }

  };

  const sendMessage = async () => {

    if (!chatInput.trim() || !sessionId) return;

    const userMessage = {
      role: "user",
      content: chatInput,
    };

    // Show user message instantly
    setMessages((prev) => [...prev, userMessage]);

    setChatInput("");

    try {

      setLoading(true);

      const res = await fetch(
        DISCUSS_MESSAGE_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            sessionId: sessionId,
            message: userMessage.content,
          }),
        }
      );

      const data = await res.json();

      console.log("AI Response:", data);

      // Add assistant reply
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response, // <-- FIXED
        },
      ]);

    } catch (err) {

      console.error("Error sending message:", err);

    } finally {

      setLoading(false);

    }

  };

  const handleOptionClick = async (option: string) => {
    if (!question || !sessionId) {
      console.error("Missing sessionId or question");
      return;
    }

    try {
      setLoading(true);

      // Save answer locally
      setQa((prev) => [
        ...prev,
        {
          question: question.text,
          answer: option,
        },
      ]);

      const res = await fetch(WIZARD_ANSWER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // ✅ EXACT BODY FORMAT (as required)
        body: JSON.stringify({
          sessionId: sessionId,
          questionId: question.questionId,
          answer: option,
        }),
      });

      const data = await res.json();

      console.log("API Response:", data);

      // ✅ If more questions exist
      if (!data.completed) {

        setQuestion(data.nextQuestion);

        // Move to questions step if first answer
        if (step === "service") {
          setStep("questions");
        }

      }
      // ✅ If wizard completed
      else {

        console.log("All questions completed");

        // ✅ Call /complete API
        await completeWizard();

      }

    } catch (err) {
      console.error("Error sending answer:", err);
    } finally {
      setLoading(false);
    }
  };

  const submitEmail = () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    try {
      generateCRDPdf({ service, qa, summary, email: email.trim(), name: name.trim() || undefined });
      toast({ title: "CRD generated", description: "Your document has been downloaded." });
      setStep("done");
    } catch (e) {
      console.error(e);
      toast({ title: "Generation failed", description: "Could not create the PDF.", variant: "destructive" });
    }
  };

  const restart = () => {
    setStep("service");
    setService("");
    setQa([]);
    setCurrentQ(null);
    setSummary("");
    setEmail("");
    setName("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <CursorFollower />

      {/* Top nav */}
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

      {/* Progress dots */}
      <div className="max-w-3xl mx-auto px-6 pt-10">
        <div className="flex items-center gap-2 mb-2">
          {(["service", "questions", "decision", "discussion", "email", "done"] as Step[]).map((s, i) => {
            const order: Step[] =
              ["service", "questions", "decision", "discussion", "email", "done"];
            const currentIdx = order.indexOf(step);
            const active = i <= currentIdx;
            return (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${active ? "bg-primary" : "bg-muted"
                  }`}
              />
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Step {
            ["service", "questions", "decision", "discussion", "email", "done"]
              .indexOf(step) + 1
          } of 6
        </p>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-12 min-h-[60vh]">
        <AnimatePresence mode="wait">

          {(step === "service" || step === "questions") && question && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-bold mb-6">
                {question.text}
              </h1>

              <div className="grid gap-4">
                {question.options.map((option) => (
                  <motion.button
                    key={option}
                    disabled={loading}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionClick(option)}
                    className="p-4 rounded-lg border border-border hover:border-primary transition"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "decision" && aiResult && (

            <motion.div
              key="decision"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >

              {/* Title */}
              <h1 className="text-4xl font-bold mb-4">
                {aiResult.ui_sections.title}
              </h1>

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {aiResult.ui_sections.description}
              </p>

              {/* Services */}
              <div className="mb-6">
                <h2 className="font-semibold mb-2">
                  Recommended Services
                </h2>

                <ul className="list-disc pl-5 space-y-1">
                  {aiResult.services.map(
                    (service: string) => (
                      <li key={service}>
                        {service}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h2 className="font-semibold mb-2">
                  Key Highlights
                </h2>

                <ul className="list-disc pl-5 space-y-1">
                  {aiResult.ui_sections.highlights.map(
                    (item: string) => (
                      <li key={item}>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="flex gap-4 mt-8">

                {/* Discussion Button */}
                <Button
                  onClick={startDiscussion}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Do More Discussion
                </Button>

                {/* CRD Button (later) */}
                <Button
                  variant="outline"
                  onClick={() => setStep("email")}
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Generate CRD
                </Button>

              </div>

            </motion.div>
          )}

          {step === "discussion" && (

            <motion.div
              key="discussion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col h-[60vh]"
            >

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">

                {messages.map((msg, i) => (

                  <div
                    key={i}
                    className={`p-3 rounded-lg max-w-[80%]
            ${msg.role === "user"
                        ? "ml-auto bg-primary text-white"
                        : "bg-muted"
                      }`}
                  >

                    {msg.content}

                  </div>

                ))}

              </div>

              {/* Input */}
              <div className="flex gap-2">

                <Input
                  value={chatInput}
                  onChange={(e) =>
                    setChatInput(e.target.value)
                  }
                  placeholder="Ask something..."
                />

                <Button
                  onClick={sendMessage}
                  disabled={loading}
                >
                  Send
                </Button>

              </div>

            </motion.div>

          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Wizard;
