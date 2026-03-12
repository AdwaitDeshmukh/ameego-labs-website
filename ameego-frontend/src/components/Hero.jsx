import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Fast.", "Modern.", "Scalable.", "Beautiful.", "Yours."];

function CyclingWord() {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2200);
        return () => clearInterval(t);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={index}
                initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center text-blue-500"
            >
                {WORDS[index]}
            </motion.span>
        </AnimatePresence>
    );
}

function FloatingCard({ children, className, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function DotGrid() {
    return (
        <div
            aria-hidden
            className="absolute inset-0 z-0"
            style={{
                backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
                opacity: 0.45,
            }}
        />
    );
}

function GlowBlob({ className }) {
    return (
        <div
            aria-hidden
            className={`absolute rounded-full pointer-events-none ${className}`}
            style={{ filter: "blur(80px)" }}
        />
    );
}

export default function HeroSection() {
    const scrollToContent = () =>
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

    const scrollToHome = () =>
        document.getElementById("homeStart")?.scrollIntoView({ behavior: "smooth" });

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap');
        .f-display { font-family: 'Syne', sans-serif; }
        .f-body    { font-family: 'DM Sans', sans-serif; }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(2deg); }
        }
        @keyframes float-med {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-10px) rotate(-1.5deg); }
        }
        .float-slow { animation: float-slow 7s ease-in-out infinite; }
        .float-med  { animation: float-med  5s ease-in-out infinite; }
      `}</style>

            <section className="relative min-h-screen bg-[#F9FAFB] flex flex-col overflow-hidden">

                {/* ── Ambient blobs ── */}
                <GlowBlob className="w-125 h-125 bg-blue-200/40 -top-32 -left-32" />
                <GlowBlob className="w-100 h-100 bg-sky-200/30 top-1/2 -right-48" />
                <GlowBlob className="w-75 h-75 bg-indigo-100/50 bottom-0 left-1/3" />

                <DotGrid />

                {/* ── Top accent line ── */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-0.75 z-20"
                    style={{ background: "linear-gradient(90deg, transparent, #3b82f6 40%, #6366f1 60%, transparent)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* ── Navbar ── */}
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-20 flex items-center justify-between px-6 md:px-14 pt-8"
                >
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-200">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="f-display text-[18px] font-bold text-[#0f172a] tracking-tight">Ameego Labs</span>
                    </div>
                    <motion.button
                        onClick={scrollToContent}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="f-body text-sm font-medium text-slate-500 hover:text-blue-500 transition-colors hidden sm:block"
                    >
                        Contact us →
                    </motion.button>
                </motion.nav>

                {/* ── Main Content ── */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-10 pb-4">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="f-body inline-flex items-center gap-2 bg-white border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-10 shadow-sm shadow-blue-100 tracking-wide"
                    >
                        <motion.span
                            className="w-2 h-2 rounded-full bg-blue-500"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        />
                        Now accepting new projects
                    </motion.div>

                    {/* Headline line 1 */}
                    <div className="overflow-hidden mb-1">
                        <motion.h1
                            className="f-display text-[clamp(2.8rem,8vw,5.5rem)] font-black text-[#0f172a] leading-none tracking-tight"
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.4, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        >
                            We Build Things
                        </motion.h1>
                    </div>

                    {/* Headline line 2 — cycling word */}
                    <div className="overflow-hidden mb-8">
                        <motion.div
                            className="f-display text-[clamp(2.8rem,8vw,5.5rem)] font-black leading-none tracking-tight"
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.55, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span
                                className="relative inline-block"
                                style={{ minWidth: "clamp(160px, 28vw, 340px)", height: "1.05em", verticalAlign: "bottom" }}
                            >
                                <CyclingWord />
                            </span>
                        </motion.div>
                    </div>

                    {/* Sub-copy */}
                    <motion.p
                        className="f-body text-base md:text-lg text-slate-500 max-w-120 mx-auto leading-relaxed mb-10"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.75, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Ameego Labs crafts high-performance web &amp; mobile products —
                        built for speed, designed to last, loved by users.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center gap-3 mb-14"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.button
                            onClick={scrollToHome}
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 32px rgba(59,130,246,0.32)" }}
                            whileTap={{ scale: 0.97 }}
                            className="f-body bg-[#0f172a] text-white text-sm font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-slate-900/10 transition-colors hover:bg-blue-600"
                        >
                            Start a Project
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="f-body bg-white border border-gray-200 hover:border-blue-200 text-[#0f172a] text-sm font-semibold px-8 py-3.5 rounded-xl transition-colors"
                        >
                            See Our Work
                        </motion.button>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {[
                            { n: "50+", label: "Projects Shipped" },
                            { n: "5 ★", label: "Client Rating" },
                            { n: "3 yr", label: "In Business" },
                        ].map(({ n, label }, i) => (
                            <motion.div
                                key={label}
                                whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(59,130,246,0.10)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="f-body flex flex-col items-center px-7 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm cursor-default"
                            >
                                <span className="f-display text-xl font-black text-[#0f172a]">{n}</span>
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">{label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Floating decorative cards ── */}
                <FloatingCard
                    delay={1.1}
                    className="float-slow absolute left-[4%] top-[28%] hidden lg:flex items-center gap-3 bg-white border border-gray-100 shadow-xl shadow-slate-100 rounded-2xl px-4 py-3 z-10"
                >
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <p className="f-display text-xs font-bold text-[#0f172a]">Project Delivered</p>
                        <p className="f-body text-[10px] text-slate-400">On time, every time</p>
                    </div>
                </FloatingCard>

                <FloatingCard
                    delay={1.2}
                    className="float-med absolute right-[4%] top-[32%] hidden lg:flex items-center gap-3 bg-white border border-gray-100 shadow-xl shadow-slate-100 rounded-2xl px-4 py-3 z-10"
                >
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                    <div>
                        <p className="f-display text-xs font-bold text-[#0f172a]">Clean Codebase</p>
                        <p className="f-body text-[10px] text-slate-400">Scalable architecture</p>
                    </div>
                </FloatingCard>

                <FloatingCard
                    delay={1.3}
                    className="float-slow absolute right-[6%] bottom-[22%] hidden lg:flex items-center gap-3 bg-white border border-gray-100 shadow-xl shadow-slate-100 rounded-2xl px-4 py-3 z-10"
                >
                    <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
                        <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                    </div>
                    <div>
                        <p className="f-display text-xs font-bold text-[#0f172a]">Pixel Perfect</p>
                        <p className="f-body text-[10px] text-slate-400">Design to the dot</p>
                    </div>
                </FloatingCard>

                {/* ── Scroll indicator ── */}
                <motion.div
                    className="relative z-10 flex justify-center pb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                >
                    <motion.button
                        onClick={scrollToContent}
                        className="flex flex-col items-center gap-1.5 group cursor-pointer"
                        animate={{ y: [0, 7, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <span className="f-body text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400 group-hover:text-blue-500 transition-colors">
                            Scroll
                        </span>
                        <div className="w-6 h-9 rounded-full border-2 border-slate-300 group-hover:border-blue-400 transition-colors flex items-start justify-center pt-1.5">
                            <motion.div
                                className="w-1 h-2 rounded-full bg-slate-400 group-hover:bg-blue-400 transition-colors"
                                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.button>
                </motion.div>

                {/* ── Wave into next section ── */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0">
                    <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: 56 }}>
                        <path d="M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z" fill="#F9FAFB" opacity="0.6" />
                    </svg>
                </div>
            </section>

            {/* Scroll target — place ContactSection below this */}
            <div id="main-content" />
        </>
    );
}