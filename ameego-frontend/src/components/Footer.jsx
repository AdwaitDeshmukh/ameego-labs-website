import React from "react";
import { motion } from "framer-motion";

// ── Data ──
const FOOTER_LINKS = {
    Company: [
        { label: "About Us", href: "#about" },
        { label: "Careers", href: "#careers" },
        { label: "Blog", href: "#blog" },
        { label: "Press", href: "#press" },
    ],
    Services: [
        { label: "Web Development", href: "#web" },
        { label: "Mobile Apps", href: "#mobile" },
        { label: "UI/UX Design", href: "#design" },
        { label: "Consulting", href: "#consulting" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Cookie Policy", href: "#cookies" },
    ],
};

const SOCIAL_LINKS = [
    {
        label: "LinkedIn",
        href: "#",
        icon: (
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" />
        ),
    },
    {
        label: "Twitter / X",
        href: "#",
        icon: (
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        ),
    },
    {
        label: "GitHub",
        href: "#",
        icon: (
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
        ),
    },
    {
        label: "Instagram",
        href: "#",
        icon: (
            <>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </>
        ),
        stroke: true,
    },
];

// ── Animation variants ──
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#0f172a] text-white font-sans">
            {/* ── Top wave divider ── */}
            <div className="w-full overflow-hidden leading-none">
                <svg
                    viewBox="0 0 1440 48"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full block"
                    preserveAspectRatio="none"
                    style={{ height: 48 }}
                >
                    <path
                        d="M0,48 C360,0 1080,0 1440,48 L1440,0 L0,0 Z"
                        fill="#F9FAFB"
                    />
                </svg>
            </div>

            <motion.div
                className="max-w-5xl mx-auto px-6 pt-12 pb-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* ── Top row: brand + links ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
                    {/* Brand */}
                    <motion.div className="col-span-2 md:col-span-1" variants={itemVariants}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-lg font-extrabold tracking-tight">Ameego Labs</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-50">
                            Building digital products that move fast and last long.
                        </p>

                        {/* Social icons */}
                        <div className="flex gap-3 mt-5">
                            {SOCIAL_LINKS.map(({ label, href, icon, stroke }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-500 flex items-center justify-center transition-colors"
                                    whileHover={{ scale: 1.15, rotate: -4 }}
                                    whileTap={{ scale: 0.92 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                                >
                                    <svg
                                        className="w-4 h-4 text-slate-300"
                                        viewBox="0 0 24 24"
                                        fill={stroke ? "none" : "currentColor"}
                                        stroke={stroke ? "currentColor" : "none"}
                                        strokeWidth={stroke ? 1.8 : 0}
                                        strokeLinecap={stroke ? "round" : undefined}
                                        strokeLinejoin={stroke ? "round" : undefined}
                                    >
                                        {icon}
                                    </svg>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Link columns */}
                    {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
                        <motion.div key={heading} variants={itemVariants}>
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                                {heading}
                            </p>
                            <ul className="space-y-2.5">
                                {links.map(({ label, href }) => (
                                    <li key={label}>
                                        <motion.a
                                            href={href}
                                            className="text-sm text-slate-400 hover:text-white transition-colors inline-block"
                                            whileHover={{ x: 4 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                        >
                                            {label}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* ── Bottom row ── */}
                <motion.div
                    className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500"
                    variants={itemVariants}
                >
                    <p>© {year} Ameego Labs Pvt Ltd. All rights reserved.</p>
                    <div className="flex items-center gap-1.5">
                        <span>Made with</span>
                        <motion.span
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                            className="text-red-400"
                        >
                            ♥
                        </motion.span>
                        <span>in India</span>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}