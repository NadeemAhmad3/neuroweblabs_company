"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Landmark,
  HeartPulse,
  ShoppingCart,
  Building2,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const industries = [
  {
    id: "fintech",
    title: "FinTech & Banking",
    description: "Secure payment gateways, trading platforms, and AI-powered fraud detection infrastructure.",
    icon: Landmark,
    metric: "$2B+",
    metricLabel: "Transactions",
    image: "/industry1.jpg",
  },
  {
    id: "healthcare",
    title: "Healthcare & MedTech",
    description: "HIPAA-compliant portals, AI diagnostic assistants, and telemedicine platforms.",
    icon: HeartPulse,
    metric: "50+",
    metricLabel: "Partners",
    image: "/industry2.jpg",
  },
  {
    id: "ecommerce",
    title: "E-Commerce & Retail",
    description: "High-conversion storefronts, AI recommendation engines, and omnichannel inventory management.",
    icon: ShoppingCart,
    metric: "300%",
    metricLabel: "Revenue Lift",
    image: "/industry3.jpg",
  },
  {
    id: "realestate",
    title: "Real Estate & PropTech",
    description: "Virtual property tours, AI valuation models, and automated tenant management systems.",
    icon: Building2,
    metric: "10K+",
    metricLabel: "Properties",
    image: "/industry4.jpg",
  },
];

export default function Industries() {
  const [activeId, setActiveId] = useState("fintech");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  const active = industries.find((i) => i.id === activeId) || industries[0];
  const ActiveIcon = active.icon;

  return (
    <section className="relative w-full bg-[var(--color-islamabad-bg)] overflow-hidden">
      <div className="w-full h-px bg-[var(--color-islamabad-border)]" />

      <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-28">
        {/* ── Centered Header ── */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-islamabad-accent)]" />
              <span className="text-[12px] font-bold tracking-[0.15em] text-[var(--color-islamabad-secondary)] uppercase">
                Industries We Serve
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-islamabad-accent)]" />
            </div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-[3.5rem] font-extrabold text-[var(--color-islamabad-primary)] tracking-tight leading-[1.1] max-w-3xl">
              Engineering solutions for{" "}
              <span className="text-[var(--color-islamabad-accent)]">
                every vertical.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* ── Main Layout: List + Image Preview ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Industry List */}
          <div className="w-full lg:w-[40%] flex flex-col gap-1">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              const isActive = activeId === ind.id;

              return (
                <motion.button
                  key={ind.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  onClick={() => setActiveId(ind.id)}
                  className={`group relative flex items-center gap-5 px-6 py-5 rounded-2xl text-left transition-all duration-500 ${
                    isActive
                      ? "bg-[var(--color-islamabad-primary)] text-white"
                      : "bg-transparent text-[var(--color-islamabad-primary)] hover:bg-[var(--color-islamabad-bg)]"
                  }`}
                >
                  {/* Active indicator line */}
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-full transition-all duration-500 ${
                      isActive
                        ? "bg-[var(--color-islamabad-accent)] opacity-100"
                        : "bg-transparent opacity-0"
                    }`}
                  />

                  <div
                    className={`p-2.5 rounded-xl transition-all duration-500 shrink-0 ${
                      isActive
                        ? "bg-[var(--color-islamabad-accent)] text-white"
                        : "bg-[var(--color-islamabad-bg)] text-[var(--color-islamabad-secondary)] group-hover:text-[var(--color-islamabad-primary)]"
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm lg:text-base font-bold font-[family-name:var(--font-plus-jakarta)] tracking-tight transition-colors duration-500 ${
                          isActive ? "text-white" : "text-[var(--color-islamabad-primary)]"
                        }`}
                      >
                        {ind.title}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className={`transition-all duration-500 ${
                          isActive
                            ? "text-[var(--color-islamabad-accent)] translate-x-0 opacity-100"
                            : "text-[var(--color-islamabad-border)] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[11px] font-medium transition-colors duration-500 ${
                        isActive ? "text-white/40" : "text-[var(--color-islamabad-secondary)]"
                      }`}
                    >
                      {ind.metric} {ind.metricLabel}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Image Preview Panel */}
          <div className="w-full lg:w-[60%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden group"
              >
                {/* Image */}
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-islamabad-primary)]/90 via-[var(--color-islamabad-primary)]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-islamabad-primary)]/60 to-transparent" />

                {/* Content overlay */}
                <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-between">
                  {/* Top: Icon + Metric */}
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white">
                      <ActiveIcon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="text-right">
                      <span className="block text-3xl lg:text-4xl font-extrabold font-[family-name:var(--font-plus-jakarta)] text-white tracking-tighter">
                        {active.metric}
                      </span>
                      <span className="text-[10px] text-white/50 uppercase tracking-[0.15em] font-medium">
                        {active.metricLabel}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Title + Description + CTA */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-2">
                        {active.title}
                      </h3>
                      <p className="text-sm text-white/70 font-light leading-relaxed max-w-md">
                        {active.description}
                      </p>
                    </div>

                    <Link
                      href={`/industries#${active.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold hover:bg-[var(--color-islamabad-accent)] hover:border-transparent transition-all duration-500 group/link"
                    >
                      <span>Explore Solutions</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}