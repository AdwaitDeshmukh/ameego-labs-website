import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Product Data ───────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "School ERP",
    category: "Web & Android",
    description:
      "A smart school management system that enhances communication between institute, staff, parents and students. Loaded with features to increase organizational productivity.",
    features: ["Attendance Management", "Fee Management", "Parent Portal", "Android App"],
    accent: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-600",
    icon: "🏫",
    link: "https://your-school-erp-link.com",
  },
  {
    id: 2,
    name: "Chidiya Udd",
    category: "Android Game",
    description:
      "A fun multiplayer game for all ages filled with excitement. Identify flying and non-flying objects faster than your opponents across 4 exciting game modes.",
    features: ["4 Game Modes", "Up to 5 Players", "Custom Word Sets", "Single & Multiplayer"],
    accent: "from-emerald-500 to-teal-500",
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-600",
    icon: "🎮",
    link: "https://play.google.com/store",
  },
  {
    id: 3,
    name: "Khabar Club",
    category: "News App",
    description:
      "Multilingual news app covering breaking news, politics, sports, business and entertainment from leading Indian newspapers in 12 languages.",
    features: ["12 Languages", "Breaking News", "Multiple Categories", "Daily Updates"],
    accent: "from-orange-500 to-amber-500",
    lightBg: "bg-orange-50",
    lightText: "text-orange-600",
    icon: "📰",
    link: "https://play.google.com/store/apps/details?id=com.ameegolabs.khabarclub",
  },
  {
    id: 4,
    name: "eCommerce Platform",
    category: "WordPress / Web",
    description:
      "A complete eCommerce solution. Manage orders, products, payments and more. Accept payments via Credit/Debit Card, PayPal, and Netbanking.",
    features: ["Order Management", "Product Variants", "Payment Gateway", "Admin Dashboard"],
    accent: "from-pink-500 to-rose-500",
    lightBg: "bg-pink-50",
    lightText: "text-pink-600",
    icon: "🛒",
    link: "http://www.theglam.in/",
  },
  {
    id: 5,
    name: "Inventory Control",
    category: "Web / Billing",
    description:
      "A complete stock and inventory management system. Track, manage, and account for all stock at any given time with an intuitive billing interface.",
    features: ["Stock Tracking", "Billing System", "Reports", "Multi-location"],
    accent: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
    lightText: "text-violet-600",
    icon: "📦",
    link: "https://stock.ameegolabs.com",
  },
  {
    id: 6,
    name: "Real Estate Platform",
    category: "Property Listing",
    description:
      "A property listing and management platform. Post, search and manage properties with location-based filtering and admin management tools.",
    features: ["Property Listing", "Location Search", "Admin Panel", "Property Photos"],
    accent: "from-cyan-500 to-sky-500",
    lightBg: "bg-cyan-50",
    lightText: "text-cyan-600",
    icon: "🏠",
    link: "https://nirmalaproperties.com",
  },
];

// ─── Animation Variants ─────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Single Product Card ─────────────────────────────────────────
function ProductCard({ product }) {
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
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.accent}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />

      <div className="p-7">
        {/* Icon + Category Badge */}
        <div className="flex items-start justify-between mb-5">
          <div className={`w-13 h-13 rounded-xl ${product.lightBg} flex items-center justify-center text-2xl`}>
            {product.icon}
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-widest ${product.lightText} ${product.lightBg} px-2.5 py-1 rounded-full`}>
            {product.category}
          </span>
        </div>

        {/* Name & Description */}
        <h3 className="font-extrabold text-[#0f172a] text-lg leading-snug mb-2 tracking-tight">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {product.features.map((feature) => (
            <span
              key={feature}
              className="text-[11px] font-medium text-slate-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* View Product Link */}
        {product.link && (
          <motion.a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-sm font-semibold ${product.lightText}`}
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.25 }}
          >
            View Product
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Products Section ───────────────────────────────────────
export default function ProductsSection() {
  return (
    <section className="bg-white py-24 px-6 font-sans">

      {/* Section Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          What We've Built
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.55 }}
        >
          Our Products
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          From school management to multiplayer games — here's what we've shipped into the real world.
        </motion.p>
      </div>

      {/* Products Grid */}
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>

    </section>
  );
}