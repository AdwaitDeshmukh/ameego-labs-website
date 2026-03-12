import React, { useState } from "react";
import { motion } from "framer-motion";

const SERVICES = [
    {
        title: "Web Development",
        description:
            "We create customized web-based applications enriched with UI/UX. Our designs encourage customers to interact and engage with your brand.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
        ),
        accent: "from-blue-500 to-blue-600",
        lightBg: "bg-blue-50",
        lightText: "text-blue-500",
        tag: "Full Stack",
    },
    {
        title: "App Development",
        description:
            "Utilizing the problems and needs of clients, we create frameworks that incorporate components and workflows providing maximum feedback to users.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
        ),
        accent: "from-violet-500 to-violet-600",
        lightBg: "bg-violet-50",
        lightText: "text-violet-500",
        tag: "iOS & Android",
    },
    {
        title: "Mobile & Web UI/UX",
        description:
            "For better ROI, we offer awesome design with effective usability and solution-driven content — wireframes, interaction design, visuals, and typography.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
        ),
        accent: "from-pink-500 to-rose-500",
        lightBg: "bg-pink-50",
        lightText: "text-pink-500",
        tag: "Design",
    },
    {
        title: "Workshop, Training & Internship",
        description:
            "We love to make this world a better place. Join us for hands-on training, internships, and placement programs designed to shape the next generation of tech talent.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
        ),
        accent: "from-emerald-500 to-teal-500",
        lightBg: "bg-emerald-50",
        lightText: "text-emerald-500",
        tag: "Education",
    },
    {
        title: "SEO & Digital Marketing",
        description:
            "We build frameworks that incorporate proven strategies and data-driven campaigns to grow your online presence and deliver measurable business results.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
        ),
        accent: "from-orange-500 to-amber-500",
        lightBg: "bg-orange-50",
        lightText: "text-orange-500",
        tag: "Marketing",
    },
    {
        title: "Graphics, Logo & Branding",
        description:
            "For better ROI, we craft awesome visuals with effective usability and solution-driven content — from logo design to complete brand identity systems.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
        ),
        accent: "from-cyan-500 to-sky-500",
        lightBg: "bg-cyan-50",
        lightText: "text-cyan-500",
        tag: "Branding",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

function ServiceCard({ service, index }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            variants={cardVariants}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            className="relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-default group"
        >
            {/* Animated top border on hover */}
            <motion.div
                className={`absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r ${service.accent}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
            />

            <div className="p-7">
                {/* Icon + tag row */}
                <div className="flex items-start justify-between mb-5">
                    <motion.div
                        className={`w-13 h-13 rounded-xl ${service.lightBg} ${service.lightText} flex items-center justify-center p-3`}
                        animate={{ rotate: hovered ? [0, -8, 8, 0] : 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {service.icon}
                    </motion.div>
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${service.lightText} ${service.lightBg} px-2.5 py-1 rounded-full`}>
                        {service.tag}
                    </span>
                </div>

                {/* Text */}
                <h3 className="font-extrabold text-[#0f172a] text-lg leading-snug mb-3 tracking-tight">
                    {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                    {service.description}
                </p>

                {/* Learn more link */}
                <motion.div
                    className={`flex items-center gap-1.5 mt-5 text-sm font-semibold ${service.lightText}`}
                    animate={{ x: hovered ? 4 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    Learn more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </motion.div>
            </div>

            {/* Subtle bg gradient on hover */}
            <motion.div
                className={`absolute inset-0 bg-linear-to-br ${service.accent} opacity-0 pointer-events-none`}
                animate={{ opacity: hovered ? 0.03 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}

export default function ServicesSection() {
    return (
        <section className="bg-[#F9FAFB] py-24 px-6 font-sans">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap'); .syne{font-family:'Syne',sans-serif;} .dm{font-family:'DM Sans',sans-serif;}`}</style>

            {/* ── Section header ── */}
            <div className="max-w-5xl mx-auto text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 dm tracking-wide"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    What We Do
                </motion.div>

                <motion.h2
                    className="syne text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    Our Services
                </motion.h2>

                <motion.p
                    className="dm text-slate-500 text-base max-w-xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    We offer IT-enabled business solutions along with a complete range of
                    services — built to scale with your ambitions.
                </motion.p>

                {/* Decorative divider */}
                <motion.div
                    className="flex items-center justify-center gap-2 mt-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="h-px w-12 bg-gray-200" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <div className="h-px w-12 bg-gray-200" />
                </motion.div>
            </div>

            {/* ── Cards grid ── */}
            <motion.div
                className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {SERVICES.map((service, i) => (
                    <ServiceCard key={service.title} service={service} index={i} />
                ))}
            </motion.div>

            {/* ── Bottom CTA ── */}
            <motion.div
                className="text-center mt-14"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <p className="dm text-slate-400 text-sm mb-4">
                    Not sure what you need? Let's figure it out together.
                </p>
                <motion.button
                    className="dm bg-[#0f172a] hover:bg-blue-600 text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-sm"
                    whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(59,130,246,0.25)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                    Talk to Us →
                </motion.button>
            </motion.div>
        </section>
    );
}