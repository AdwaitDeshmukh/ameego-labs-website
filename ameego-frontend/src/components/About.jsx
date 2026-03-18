import { motion } from "framer-motion";
import awardImage from '../images/award1.jpg';
import CEOimage from '../images/1679996862114.jpg';

// ─── Animation Variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Top Skills ──────────────────────────────────────────────────
const SKILLS = [
  "AWS", "Azure", "GCP", "DevOps", "SaaS",
  "PHP", "Java", "Python", "Firebase", "SQL"
];

export default function AboutSection() {
  return (
    <section className="bg-white font-sans">

      {/* ── Hero Banner ── */}
      <div className="border-b border-gray-100 py-24 px-6 text-center">
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          About Us
        </motion.div>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4 max-w-2xl mx-auto"
        >
          Building Digital Solutions that Drive Real Results
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed"
        >
          Ameego Labs Pvt Ltd is an IT company based in Lucknow, Uttar Pradesh —
          offering web development, app development, UI/UX, digital marketing,
          branding, and enterprise software solutions. Founded in 2016.
        </motion.p>
      </div>

      {/* ── CEO Section ── */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-20">
        <motion.div
          className="bg-gray-50 rounded-2xl border border-gray-100 p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* CEO Image */}
            <div className="rounded-2xl overflow-hidden h-72">
              <img
                src={CEOimage}
                alt="Zakaul Haque - CEO"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 20%' }}
              />
            </div>

            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Leadership
              </div>
              <h3 className="text-2xl font-extrabold text-[#0f172a] mb-1">
                Zakaul Haque
              </h3>
              <p className="text-blue-500 text-sm font-semibold mb-1">
                CEO & Product Architect
              </p>
              <p className="text-slate-400 text-xs mb-4">
                Ex-Google (GlobalLogic) · AWS · Azure · GCP · 8+ Years Experience
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                Zakaul Haque leads Ameego Labs as CEO & Product Architect with 8+ years
                of experience in the IT industry. He drives innovation through cutting-edge
                IT solutions, AI-driven automation, and strategic digital transformation.
                Previously an Associate Analyst at GlobalLogic delivering insights for Google,
                he holds a B.Tech in Computer Science from United Institute of Technology.
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-medium text-slate-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── PM Award Section ── */}
      <div className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-blue-50 border border-blue-100 rounded-2xl p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* Text */}
              <div>
                <div className="inline-flex items-center gap-2 bg-white border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Recognition
                </div>
                <h3 className="text-2xl font-extrabold text-[#0f172a] mb-3">
                  Awarded by the Honourable Prime Minister of India
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Ameego Labs was recognized by the Honourable Prime Minister of India
                  for contributing a groundbreaking idea to the Digital India initiative —
                  a testament to our commitment to building a better, more connected India.
                </p>
              </div>

              {/* Award Image */}
              <div className="rounded-2xl overflow-hidden h-64">
                <img
                  src={awardImage}
                  alt="PM of India Award"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Why Clients Love Us ── */}
      <div className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-3">
              Why Clients Love Us
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              { icon: "🤝", title: "Transparency", desc: "Direct contact with the team throughout the project via Slack, Skype and more." },
              { icon: "🎧", title: "Instant Support", desc: "Support via chat, call, email, Skype, and TeamViewer." },
              { icon: "✅", title: "Maximal Satisfaction", desc: "We structure and organize information to make it readily understandable." },
              { icon: "🔒", title: "Non-Disclosure Agreement", desc: "Complete confidentiality for all your project details." },
              { icon: "💡", title: "Integrity & Reliability", desc: "Honest, reliable delivery at every step of the process." },
              { icon: "🔄", title: "Multiple Engagement Models", desc: "Flexible models to suit your budget and project needs." },
            ].map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6"
              >
                <span className="text-2xl mb-3 block">{icon}</span>
                <p className="text-sm font-extrabold text-[#0f172a] mb-1">{title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── How We Work ── */}
      <div className="px-6 pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How We Work
          </motion.h2>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {["Understand", "Consult", "Plan", "Implement", "Support"].map((step, i) => (
              <motion.div
                key={step}
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <div className="bg-blue-50 border border-blue-100 text-blue-600 font-extrabold text-sm px-5 py-2.5 rounded-full">
                  {step}
                </div>
                {i < 4 && (
                  <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}