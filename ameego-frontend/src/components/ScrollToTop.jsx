import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(total > 0 ? scrolled / total : 0);
            setVisible(scrolled > 300);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - scrollProgress);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="fixed bottom-8 right-8 z-50 group"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                >
                    {/* Progress ring */}
                    <svg width="48" height="48" className="-rotate-90">
                        {/* Track */}
                        <circle
                            cx="24"
                            cy="24"
                            r={radius}
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="2.5"
                        />
                        {/* Progress */}
                        <motion.circle
                            cx="24"
                            cy="24"
                            r={radius}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            style={{ transition: "stroke-dashoffset 0.1s linear" }}
                        />
                    </svg>

                    {/* Center button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-200">
                            <motion.svg
                                className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors duration-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                animate={{ y: [0, -2, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </motion.svg>
                        </div>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}