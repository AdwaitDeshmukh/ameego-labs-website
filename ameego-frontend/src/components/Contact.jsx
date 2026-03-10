import React, { useState } from "react";

// ─────────────────────────────────────────────
//  PLACEHOLDERS — swap these out whenever ready
// ─────────────────────────────────────────────
const ADDRESS_LINES = [
    { text: "Registered Office:", bold: true },
    { text: "Ward No. 23, Town Hall", bold: false },
    { text: "Ghazipur, Uttar Pradesh, India, 233001", bold: false },
    { text: "", bold: false }, // spacer
    { text: "Corporate Office:", bold: true },
    { text: "3/38, Vinamra Khand", bold: false },
    { text: "Gomti Nagar, Lucknow, Uttar Pradesh 226028", bold: false },
];

const GOOGLE_MAP_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7118.716862525527!2d81.025197!3d26.860351000000005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2bca9a1186b%3A0x6936145b34a852ca!2sAmeego%20Labs%20Pvt%20Ltd!5e0!3m2!1sen!2sus!4v1773159258641!5m2!1sen!2sus";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: wire up your form submission logic here
        setSubmitted(true);
    };

    return (
        <section id="contact" className="bg-[#F9FAFB] min-h-screen font-sans">
            {/* ── Page Header ── */}
            <div className="text-center pt-16 pb-10 px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] leading-tight">
                    Get in Touch
                </h1>
                <p className="mt-3 text-gray-500 text-base max-w-md mx-auto">
                    Have a project in mind? We'd love to hear from you. Send us a message
                    and we'll get back to you as soon as possible.
                </p>
            </div>

            {/* ── Stats bar (mirrors hero stats) ── */}
            <div className="flex justify-center gap-16 pb-12">
                {[
                    { value: "50+", label: "Projects Delivered" },
                    { value: "6", label: "Products Built" },
                    { value: "12+", label: "Happy Clients" },
                ].map(({ value, label }) => (
                    <div key={label} className="text-center">
                        <p className="text-2xl font-bold text-[#0f172a]">{value}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                    </div>
                ))}
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-5xl mx-auto px-4 pb-20 grid md:grid-cols-2 gap-10">
                {/* ── Left: Form ── */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-[#0f172a] mb-6">
                        Send us a Message
                    </h2>

                    {submitted ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                <svg
                                    className="w-7 h-7 text-blue-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <p className="text-[#0f172a] font-semibold text-lg">
                                Message Sent!
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                We'll reach out within 24 hours.
                            </p>
                            <button
                                onClick={() => {
                                    setSubmitted(false);
                                    setForm({ name: "", email: "", message: "" });
                                }}
                                className="mt-6 text-sm text-blue-500 hover:underline"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john@example.com"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell us about your project…"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-1">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
                                >
                                    Send Message
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setForm({ name: "", email: "", message: "" })}
                                    className="border border-gray-300 hover:border-gray-400 text-gray-600 text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* ── Right: Info + Map ── */}
                <div className="flex flex-col gap-6">
                    {/* Contact info cards */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
                        <h2 className="text-xl font-bold text-[#0f172a]">
                            Contact Information
                        </h2>

                        {/* Email */}
                        <InfoRow
                            icon={
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
                                />
                            }
                            label="Email"
                            value="hello@ameegolabs.com"
                        />

                        {/* Phone */}
                        <InfoRow
                            icon={
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                />
                            }
                            label="Phone"
                            value="+91 00000 00000"
                        />

                        {/* ── ADDRESS — add lines to ADDRESS_LINES at the top ── */}
                        <div className="flex gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                <svg
                                    className="w-5 h-5 text-blue-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                                    Address
                                </p>
                                {ADDRESS_LINES.map((line, i) =>
                                    line.text === "" ? (
                                        <div key={i} className="h-2" />
                                    ) : (
                                        <p
                                            key={i}
                                            className={`text-sm ${line.bold
                                                ? "font-semibold text-[#0f172a]"
                                                : "text-[#0f172a]"
                                                }`}
                                        >
                                            {line.text}
                                        </p>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── MAP — set GOOGLE_MAP_EMBED_URL at the top ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1 min-h-55">
                        {GOOGLE_MAP_EMBED_URL ? (
                            <iframe
                                title="Office Location"
                                src={GOOGLE_MAP_EMBED_URL}
                                width="100%"
                                height="100%"
                                style={{ minHeight: 220, border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        ) : (
                            /* Placeholder shown until the embed URL is set */
                            <div className="flex flex-col items-center justify-center h-full min-h-55 text-center px-6 py-10">
                                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                                    <svg
                                        className="w-6 h-6 text-blue-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.8}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold text-gray-400">
                                    Map coming soon
                                </p>
                                <p className="text-xs text-gray-300 mt-1">
                                    Set{" "}
                                    <code className="bg-gray-100 px-1 rounded">
                                        GOOGLE_MAP_EMBED_URL
                                    </code>{" "}
                                    at the top of this file
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ── Reusable info row ──
function InfoRow({ icon, label, value }) {
    return (
        <div className="flex gap-3 items-start">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                >
                    {icon}
                </svg>
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                    {label}
                </p>
                <p className="text-sm text-[#0f172a]">{value}</p>
            </div>
        </div>
    );
}
