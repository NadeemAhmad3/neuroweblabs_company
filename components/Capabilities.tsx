"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  MonitorSmartphone,
  Smartphone,
  BrainCircuit,
  Workflow,
  CloudCog,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const capabilities = [
  {
    id: "web",
    eyebrow: "01",
    title: "Full-Stack Web Engineering",
    description:
      "Scalable, high-performance web platforms. From Next.js frontends to Node.js backends, built for absolute scale.",
    icon: MonitorSmartphone,
    metric: "99.9% Uptime",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    id: "mobile",
    eyebrow: "02",
    title: "Mobile App Development",
    description:
      "Native-like experiences for iOS and Android. Optimized for performance, security, and seamless UX.",
    icon: Smartphone,
    metric: "4.9★ Rating",
    tags: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    id: "ai",
    eyebrow: "03",
    title: "Custom LLMs & Data Engineering",
    description:
      "Proprietary AI with RAG, model fine-tuning, and secure LLM infrastructure deployment.",
    icon: BrainCircuit,
    metric: "94% Accuracy",
    tags: ["RAG", "Fine-tuning", "OpenAI", "Vector DB"],
  },
  {
    id: "automation",
    eyebrow: "04",
    title: "AI Agents & Workflow Automation",
    description:
      "Autonomous AI agents and enterprise workflow automation. Replace manual operations at scale.",
    icon: Workflow,
    metric: "412K Tasks",
    tags: ["n8n", "Zapier", "APIs", "Scripts"],
  },
  {
    id: "devops",
    eyebrow: "05",
    title: "DevOps, Cloud & QA",
    description:
      "End-to-end CI/CD, cloud infrastructure, and rigorous security testing pipelines.",
    icon: CloudCog,
    metric: "0.4s Rollback",
    tags: ["AWS", "Docker", "K8s", "CI/CD"],
  },
];

export default function Capabilities() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector("[data-card]");
    if (!card) return;
    const gap = 24;
    const scrollAmount = (card as HTMLElement).offsetWidth + gap;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("right");
        }
      }
    }, 4000); // scrolls every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative w-full bg-[var(--color-islamabad-bg)] overflow-hidden">
      <div className="w-full h-px bg-[var(--color-islamabad-border)]" />

      <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-28">
        
        {/* Centered Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center gap-6 mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl flex flex-col items-center"
          >
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[var(--color-islamabad-primary)] tracking-tight leading-[1.1]">
              Engineering excellence across{" "}
              <span className="text-[var(--color-islamabad-accent)]">every layer.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 shrink-0"
          >
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full border border-[var(--color-islamabad-border)] flex items-center justify-center text-[var(--color-islamabad-secondary)] hover:bg-[var(--color-islamabad-primary)] hover:text-white hover:border-transparent transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full border border-[var(--color-islamabad-border)] flex items-center justify-center text-[var(--color-islamabad-secondary)] hover:bg-[var(--color-islamabad-primary)] hover:text-white hover:border-transparent transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>

        {/* Horizontal Auto-Scroll Cards */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            const isHovered = hoveredCard === cap.id;

            return (
              <motion.div
                key={cap.id}
                data-card
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                onMouseEnter={() => setHoveredCard(cap.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative flex-shrink-0 w-[320px] md:w-[380px] snap-start"
              >
                <div
                  className={`relative h-full rounded-3xl border transition-all duration-500 overflow-hidden ${
                    isHovered
                      ? "border-[var(--color-islamabad-accent)]/30 bg-[var(--color-islamabad-primary)] shadow-luxury"
                      : "border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-xl"
                  }`}
                >
                  {/* Subtle Top Gradient Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background: "linear-gradient(90deg, transparent, var(--color-islamabad-accent), transparent)",
                    }}
                  />

                  <div className="relative p-8 lg:p-10 flex flex-col h-full z-10">
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-8">
                      <div
                        className={`p-3.5 rounded-2xl transition-all duration-500 ${
                          isHovered
                            ? "bg-[var(--color-islamabad-accent)] text-white shadow-md"
                            : "bg-[var(--color-islamabad-accent)]/10 text-[var(--color-islamabad-accent)]"
                        }`}
                      >
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <span
                        className={`text-[11px] font-mono tracking-[0.15em] transition-colors duration-500 ${
                          isHovered ? "text-white/40" : "text-[var(--color-islamabad-accent)]/60"
                        }`}
                      >
                        {cap.eyebrow}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-[family-name:var(--font-plus-jakarta)] text-xl lg:text-2xl font-extrabold tracking-tight leading-[1.15] mb-4 transition-colors duration-500 ${
                        isHovered ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {cap.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed font-light mb-8 flex-1 transition-colors duration-500 ${
                        isHovered ? "text-white/60" : "text-slate-600"
                      }`}
                    >
                      {cap.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {cap.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider transition-all duration-500 ${
                            isHovered
                              ? "bg-white/10 text-white/60 border border-white/10"
                              : "bg-slate-50 text-slate-600 border border-slate-200/60"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between pt-6 border-t border-dashed transition-colors duration-500"
                      style={{ borderColor: isHovered ? "rgba(255,255,255,0.1)" : "rgba(226,232,240,0.8)" }}
                    >
                      <div>
                        <span
                          className={`block text-lg font-extrabold font-[family-name:var(--font-plus-jakarta)] transition-colors duration-500 ${
                            isHovered ? "text-white" : "text-[var(--color-islamabad-accent)]"
                          }`}
                        >
                          {cap.metric.split(" ")[0]}
                        </span>
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors duration-500 ${
                            isHovered ? "text-white/40" : "text-slate-500"
                          }`}
                        >
                          {cap.metric.split(" ").slice(1).join(" ")}
                        </span>
                      </div>

                      <Link
                        href={`/services#${cap.id}`}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                          isHovered
                            ? "bg-[var(--color-islamabad-accent)] text-white shadow-md"
                            : "bg-slate-50 text-slate-500 hover:bg-[var(--color-islamabad-accent)]/10 hover:text-[var(--color-islamabad-accent)]"
                        }`}
                      >
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
}