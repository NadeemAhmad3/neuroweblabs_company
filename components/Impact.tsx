"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Activity,
  Database,
  Network,
  ShieldCheck,
  Cpu,
  Server,
  Terminal,
  Layers,
  CheckCircle2,
  Workflow,
  BrainCircuit,
  ExternalLink,
  Zap,
  Bot,
  Mail,
  Github
} from "lucide-react";
import Link from "next/link";

// ─── Project Data (Honest, real startup-level work) ───────────────────────────
const featuredProjects = [
  {
    id: "talentsmith",
    client: "TalentSmith AI",
    role: "GenAI SaaS · Full-Stack",
    title: "AI career co-pilot that automates resume optimization using NLP agents.",
    description:
      "Built an end-to-end SaaS that analyzes resumes against job descriptions, generates ATS-optimized rewrites via LangChain + Gemini, and ships a one-click portfolio deployment. Deployed on Vercel with Supabase auth.",
    metrics: [
      { label: "Tech Stack", value: "Next.js" },
      { label: "AI Layer", value: "Gemini" },
      { label: "Infra", value: "Vercel" },
    ],
    tags: ["Next.js 14", "LangChain", "Gemini API", "Tailwind CSS", "Node.js"],
    liveUrl: "https://talent-smith-ai.vercel.app/",
    githubUrl: "#",
  },
  {
    id: "mira",
    client: "Mira – Empathetic AI Chatbot",
    role: "Custom Transformer · ML Engineering",
    title: "Seq2Seq Transformer built from scratch that detects sentiment and replies with empathy.",
    description:
      "Designed and trained a custom Seq2Seq model in PyTorch (no APIs) with Multi-Head Attention for Joy/Anxiety sentiment detection. Generates context-aware empathetic responses. Deployed via Streamlit with a clean conversational UI.",
    metrics: [
      { label: "Framework", value: "PyTorch" },
      { label: "Architecture", value: "Seq2Seq" },
      { label: "Interface", value: "Streamlit" },
    ],
    tags: ["PyTorch", "Python", "Streamlit", "NumPy", "Transformers"],
    liveUrl: "https://mira-2379.streamlit.app/",
    githubUrl: "https://github.com/NadeemAhmad3/Conversational_Chatbot",
  },
  {
    id: "umelgenai",
    client: "UMeLGenAI – Automated UML",
    role: "Multi-LLM Architecture · Full-Stack",
    title: "Converts plain-text use cases into production-grade UML diagrams using multi-LLM consensus.",
    description:
      "A generative AI tool that parses software requirements and outputs Class, Sequence, and Domain diagrams. Uses a multi-LLM consensus pipeline with LangChain for accuracy, containerized with Docker, and deployed on Vercel.",
    metrics: [
      { label: "Diagram Types", value: "3 UML" },
      { label: "LLM Pipeline", value: "Multi-LLM" },
      { label: "Deploy", value: "Docker" },
    ],
    tags: ["Next.js", "LangChain", "Docker", "Python", "OpenAI"],
    liveUrl: "https://umelgenai.vercel.app/",
    githubUrl: "#",
  },
];



// ─── Main Section ──────────────────────────────────────────────────────────────
export default function Impact() {
  return (
    <section className="relative w-full bg-[var(--color-islamabad-bg)] py-20 lg:py-32 border-t border-[var(--color-islamabad-border)]">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-islamabad-accent)]" />
            <span className="text-[12px] font-bold tracking-[0.15em] text-[var(--color-islamabad-secondary)] uppercase">
              Our Work
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-islamabad-primary)] tracking-tight leading-[1.2]">
            Real projects. Real solutions. Built from the ground up.
          </h2>
          <p className="mt-6 text-lg text-[var(--color-islamabad-secondary)] font-[family-name:var(--font-inter)] max-w-2xl leading-relaxed">
            Every project listed here is live-deployed work — AI tools, full-stack platforms, and ML systems engineered by our team with production-grade code.
          </p>
        </div>

        {/* Featured Cards Stack */}
        <div className="relative flex flex-col gap-8 md:gap-0 pb-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* ── Professional CTA Footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left: Navigate to full work */}
          <Link
            href="/work"
            className="group relative overflow-hidden rounded-[2rem] bg-[var(--color-islamabad-primary)] p-10 flex flex-col justify-between min-h-[220px] hover:shadow-[0_20px_60px_-10px_rgba(15,23,42,0.3)] transition-shadow duration-500"
          >
            {/* Subtle animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-white/5 blur-3xl -mr-16 -mb-16 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <span className="text-[11px] font-bold tracking-[0.15em] text-white/40 uppercase">
                Our Work
              </span>
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                <ArrowUpRight size={16} className="text-white group-hover:text-[var(--color-islamabad-primary)] transition-colors duration-300" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-[1.2] mb-3">
                Explore our full portfolio of delivered solutions.
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                AI systems, full-stack platforms, and ML models — browse every engagement in detail.
              </p>
            </div>
          </Link>

          {/* Right: Start a project */}
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-[2rem] bg-white border border-[var(--color-islamabad-border)] p-10 flex flex-col justify-between min-h-[220px] hover:border-[var(--color-islamabad-primary)] hover:shadow-[0_20px_60px_-10px_rgba(15,23,42,0.08)] transition-all duration-500"
          >
            <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[var(--color-islamabad-bg)] blur-3xl -mr-16 -mb-16 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <span className="text-[11px] font-bold tracking-[0.15em] text-[var(--color-islamabad-secondary)] uppercase">
                Start a Project
              </span>
              <div className="w-9 h-9 rounded-full bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] flex items-center justify-center group-hover:bg-[var(--color-islamabad-primary)] group-hover:border-[var(--color-islamabad-primary)] transition-all duration-300">
                <Mail size={15} className="text-[var(--color-islamabad-secondary)] group-hover:text-white transition-colors duration-300" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-extrabold text-[var(--color-islamabad-primary)] tracking-tight leading-[1.2] mb-3">
                Have a system you need engineered?
              </h3>
              <p className="text-sm text-[var(--color-islamabad-secondary)] leading-relaxed">
                We scope, architect, and deliver. Let&apos;s talk about what you&apos;re building.
              </p>
            </div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

/* ─── Large Stacking Project Card ─────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  const topOffset = `calc(8rem + ${index * 2.5}rem)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="md:sticky w-full h-auto md:min-h-[480px] rounded-[2rem] bg-[#0F172A] border border-slate-800 shadow-[0_-10px_40px_-10px_rgba(15,23,42,0.4)] overflow-hidden flex flex-col md:flex-row mb-6 md:mb-0"
      style={{ top: topOffset, zIndex: index + 1 }}
    >
      {/* LEFT: Info */}
      <div className="w-full md:w-[45%] p-6 md:p-8 flex flex-col justify-start relative z-10 border-b md:border-b-0 md:border-r border-slate-800">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                {project.client}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                {project.role}
              </span>
            </div>
          </div>

          <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-white tracking-tight leading-[1.2]">
            {project.title}
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-lg font-black text-white mb-0.5">{m.value}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-[11px] font-semibold text-slate-100 bg-slate-800/80 border border-slate-600 shadow-sm px-3 py-1.5 rounded-lg transition-colors hover:bg-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Visual */}
      <div className="hidden md:flex w-[55%] bg-[#020617] relative z-10 p-6 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        {project.id === "talentsmith" && <TalentSmithVisual />}
        {project.id === "mira" && <MiraVisual />}
        {project.id === "umelgenai" && <UMLVisual />}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VISUALIZATIONS
   ═══════════════════════════════════════════════════════════════ */

// TalentSmith: Resume analyzer pipeline visualization
function TalentSmithVisual() {
  const steps = [
    { label: "Resume PDF", sub: "Input Layer", icon: <Terminal size={12} />, color: "emerald" },
    { label: "NLP Parse", sub: "LangChain Agent", icon: <BrainCircuit size={12} />, color: "blue" },
    { label: "ATS Score", sub: "Gemini Analysis", icon: <Activity size={12} />, color: "violet" },
    { label: "Optimized CV", sub: "Output", icon: <CheckCircle2 size={12} />, color: "emerald" },
  ];

  return (
    <div className="w-full h-full max-w-md flex flex-col gap-4 relative z-10">
      {/* Pipeline visualization */}
      <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col relative overflow-hidden backdrop-blur-md">
        <div className="flex justify-between items-center mb-5 border-b border-slate-800 pb-3">
          <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-2">
            <Zap size={11} /> TalentSmith Pipeline
          </span>
          <span className="text-[8px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">VERCEL DEPLOYED</span>
        </div>

        {/* Pipeline Steps */}
        <div className="flex-1 flex flex-col justify-center gap-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                  step.color === "emerald"
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                    : step.color === "blue"
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                    : "bg-violet-500/20 border-violet-500/40 text-violet-400"
                }`}
              >
                {step.icon}
              </motion.div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono font-bold text-white">{step.label}</span>
                  <span className="text-[8px] font-mono text-slate-500">{step.sub}</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "linear" }}
                    className={`h-full w-16 blur-[2px] ${
                      step.color === "emerald" ? "bg-emerald-500/60" : step.color === "blue" ? "bg-blue-500/60" : "bg-violet-500/60"
                    }`}
                  />
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute left-[22px] mt-14 w-[1px] h-3 bg-slate-700" style={{ marginTop: `${i * 52 + 52}px`, position: "absolute" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ATS Score card */}
      <div className="h-28 bg-[#0A0F1C] border border-slate-800 rounded-2xl p-4 flex items-center gap-5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-emerald-500/8 to-transparent pointer-events-none" />
        <div className="relative w-16 h-16 shrink-0">
          <svg viewBox="0 0 60 60" className="w-16 h-16 -rotate-90">
            <circle cx="30" cy="30" r="24" fill="none" stroke="#1e293b" strokeWidth="5" />
            <motion.circle
              cx="30" cy="30" r="24"
              fill="none" stroke="#10b981" strokeWidth="5"
              strokeDasharray="150.8"
              initial={{ strokeDashoffset: 150.8 }}
              animate={{ strokeDashoffset: 150.8 * 0.18 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-white">82</span>
        </div>
        <div>
          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">ATS Compatibility Score</p>
          <p className="text-white font-bold text-sm leading-tight">Optimized from 34 → 82</p>
          <p className="text-[9px] font-mono text-emerald-500 mt-1">+48 pts via LLM rewrite</p>
        </div>
      </div>
    </div>
  );
}

// Mira: Transformer attention visualization
function MiraVisual() {
  const emotions = [
    { label: "Joy", value: 0.12, color: "#f59e0b" },
    { label: "Anxiety", value: 0.67, color: "#ef4444" },
    { label: "Sadness", value: 0.21, color: "#6366f1" },
  ];

  return (
    <div className="w-full h-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col relative z-10 overflow-hidden backdrop-blur-md">
      <div className="h-10 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4">
        <span className="text-[9px] font-mono text-violet-400 font-bold uppercase tracking-widest flex items-center gap-2">
          <BrainCircuit size={11} /> Mira · Seq2Seq Transformer
        </span>
        <span className="text-[8px] font-mono text-slate-500">PyTorch · From Scratch</span>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        {/* Chat bubble */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-end">
            <div className="bg-slate-800 text-white text-[10px] font-mono px-3 py-2 rounded-xl rounded-tr-sm max-w-[70%]">
              &apos;I&apos;m really nervous about my exam tomorrow…&apos;
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-violet-500/20 border border-violet-500/30 text-violet-200 text-[10px] font-mono px-3 py-2 rounded-xl rounded-tl-sm max-w-[75%]">
              &apos;That&apos;s completely understandable. Let&apos;s work through this together — what part feels most uncertain?&apos;
            </div>
          </div>
        </div>

        {/* Sentiment detection */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-3">
            Multi-Head Attention · Sentiment Detection
          </p>
          {emotions.map((e) => (
            <div key={e.label} className="flex items-center gap-3 mb-2">
              <span className="text-[9px] font-mono text-slate-400 w-12">{e.label}</span>
              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${e.value * 100}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: e.color }}
                />
              </div>
              <span className="text-[9px] font-mono font-bold" style={{ color: e.color }}>
                {(e.value * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>

        {/* Model stats */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "Attention Heads", value: "8" },
            { label: "Embed Dim", value: "512" },
            { label: "Encoder Layers", value: "6" },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-950/50 border border-slate-800 rounded-lg p-2 text-center">
              <p className="text-sm font-black text-white">{stat.value}</p>
              <p className="text-[7px] font-bold text-slate-500 uppercase mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// UMLGenAI: Multi-LLM consensus diagram generation
function UMLVisual() {
  const llms = [
    { name: "GPT-4o", vote: "Class Diagram", conf: "0.91", color: "#10b981" },
    { name: "Gemini Pro", vote: "Class Diagram", conf: "0.88", color: "#3b82f6" },
    { name: "Claude 3", vote: "Class Diagram", conf: "0.95", color: "#8b5cf6" },
  ];

  return (
    <div className="w-full h-full max-w-md flex flex-col gap-4 relative z-10">
      {/* Multi-LLM Consensus Panel */}
      <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col relative overflow-hidden backdrop-blur-md">
        <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
          <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest flex items-center gap-2">
            <Network size={11} /> Multi-LLM Consensus Pipeline
          </span>
          <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            AGREEMENT REACHED
          </span>
        </div>

        {/* LLM votes */}
        <div className="space-y-3 mb-4">
          {llms.map((llm, i) => (
            <motion.div
              key={llm.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center justify-between bg-slate-950/50 border border-slate-800 rounded-lg p-2.5"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: llm.color }} />
                <span className="text-[10px] font-mono font-bold text-white">{llm.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-slate-400">{llm.vote}</span>
                <span className="text-[9px] font-mono font-bold" style={{ color: llm.color }}>
                  {llm.conf}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input text sample */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
          <p className="text-[8px] font-bold text-slate-500 uppercase mb-2">Use Case Input</p>
          <p className="text-[9px] font-mono text-slate-300 leading-relaxed">
            &apos;User registers → System validates email → Profile created → Dashboard shown&apos;
          </p>
          <div className="mt-2 flex items-center gap-2">
            <motion.div
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="h-0.5 bg-indigo-500/40 rounded-full"
              style={{ width: "60%" }}
            />
            <span className="text-[7px] font-mono text-indigo-400">Parsing…</span>
          </div>
        </div>
      </div>

      {/* Output types */}
      <div className="h-24 bg-[#0A0F1C] border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
        {["Class", "Sequence", "Domain"].map((type, i) => (
          <div key={type} className="flex-1 flex flex-col items-center gap-1.5">
            <motion.div
              animate={{ borderColor: ["#334155", "#6366f1", "#334155"] }}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center"
            >
              <Layers size={14} className="text-indigo-400" />
            </motion.div>
            <span className="text-[8px] font-mono text-slate-500 uppercase">{type}</span>
          </div>
        ))}
        <div className="w-px h-10 bg-slate-800 mx-1" />
        <div className="flex flex-col items-center gap-1">
          <CheckCircle2 size={18} className="text-emerald-500" />
          <span className="text-[8px] font-mono text-emerald-500 font-bold">Docker</span>
        </div>
      </div>
    </div>
  );
}