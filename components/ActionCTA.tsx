"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Terminal, Cpu, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ActionCTA() {
  return (
    <section className="relative w-full bg-[var(--color-islamabad-bg)] overflow-hidden">
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[var(--color-islamabad-accent)]/5 blur-[120px] rounded-full" />
      </div>
      
      {/* ── 1. Top Content Section (Sleek, Concise Heading) ── */}
      <div className="relative w-full pt-32 pb-16 z-10">
        <div className="max-w-[1400px] mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-islamabad-primary)] tracking-tight leading-[1.1] max-w-3xl mx-auto mb-6">
              Build the future.<br/>
              <span className="text-[var(--color-islamabad-secondary)] font-light">Without constraints.</span>
            </h2>
            <p className="text-lg text-[var(--color-islamabad-secondary)] leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
              Transforming complex technical challenges into flawless digital ecosystems. Secure, scalable, and engineered for absolute performance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── 2. Massive Video/Visual Window (Taller, immersive) ── */}
      <div className="max-w-[1400px] mx-auto px-6 mb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[55vh] min-h-[400px] md:h-[70vh] md:min-h-[500px] md:max-h-[800px] xl:h-[75vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-[#020617] border border-[var(--color-islamabad-border)] shadow-[0_40px_100px_-20px_rgba(15,23,42,0.15)] flex items-center justify-center group"
        >
          {/* Subtle grid pattern inside */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_80%)] pointer-events-none z-10" />

          {/* Local video - Tall, imposing, professional */}
          <video
            src="/team.mov"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          />

          {/* Luxury CTA overlapping the video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
            className="relative z-20 flex flex-col items-center"
          >
            <div className="absolute inset-0 bg-[var(--color-islamabad-accent)] blur-[80px] opacity-30 rounded-full scale-150 pointer-events-none" />
            <Link
              href="/contact"
              className="relative flex items-center gap-4 px-10 py-5 rounded-full bg-white text-[#0F172A] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] overflow-hidden group/btn hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-islamabad-accent)]/10 to-transparent -translate-x-[100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-out" />
              <span className="text-[15px] font-extrabold uppercase tracking-widest relative z-10">Start Your Project</span>
              <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center text-white relative z-10 group-hover/btn:bg-[var(--color-islamabad-accent)] transition-colors">
                 <ArrowUpRight size={16} />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── 3. High-End Bottom Section (Re-imagined as an Engineering Summary) ── */}
      <div className="relative w-full border-t border-[var(--color-islamabad-border)] bg-white/40">
        <div className="max-w-[1400px] mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Lead Metric / CTA Block */}
            <div className="lg:col-span-2 flex flex-col justify-between p-8 md:p-12 bg-white rounded-[2.5rem] border border-[var(--color-islamabad-border)] shadow-sm">
                <div>
                   <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-[family-name:var(--font-plus-jakarta)] text-[var(--color-islamabad-primary)] tracking-tight leading-[1.2] mb-6">
                     Redefining what&apos;s possible.
                   </h3>
                   <p className="text-[var(--color-islamabad-secondary)] text-lg leading-relaxed max-w-md font-[family-name:var(--font-inter)] mb-8">
                     Partner with an engineering team that understands business context as deeply as architecture. We deliver systems that perform at scale from day one.
                   </p>
                </div>
                
                <Link
                  href="/work"
                  className="group flex items-center justify-between px-8 py-5 rounded-full bg-[#0F172A] text-white w-full sm:w-auto shadow-lg hover:shadow-2xl hover:shadow-[#0F172A]/20 transition-all duration-300"
                >
                  <span className="text-sm font-bold uppercase tracking-widest">Explore Capabilities</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Performance Metric Box 1 */}
            <div className="flex flex-col justify-between p-8 md:p-10 bg-[var(--color-islamabad-bg)] rounded-[2.5rem] border border-[var(--color-islamabad-border)] group hover:border-[var(--color-islamabad-accent)]/50 transition-colors">
               <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[var(--color-islamabad-primary)] shadow-sm mb-8 border border-[var(--color-islamabad-border)]">
                  <ShieldCheck size={24} />
               </div>
               <div>
                  <p className="text-4xl md:text-5xl font-extrabold text-[var(--color-islamabad-primary)] font-[family-name:var(--font-plus-jakarta)] tracking-tight mb-2">
                    100<span className="text-[var(--color-islamabad-accent)]">%</span>
                  </p>
                  <p className="text-[11px] font-bold text-[var(--color-islamabad-secondary)] uppercase tracking-[0.15em] leading-relaxed">
                    Project Success &<br/>Delivery Rate
                  </p>
               </div>
            </div>

             {/* Performance Metric Box 2 */}
            <div className="flex flex-col justify-between p-8 md:p-10 bg-[#0F172A] rounded-[2.5rem] border border-slate-800 relative overflow-hidden group">
               {/* Decorative background glow */}
               <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--color-islamabad-accent)]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
               
               <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white mb-8 border border-slate-700 relative z-10">
                  <Cpu size={24} />
               </div>
               <div className="relative z-10">
                  <p className="text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-plus-jakarta)] tracking-tight mb-2">
                    24<span className="text-[var(--color-islamabad-accent)]">/</span>7
                  </p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] leading-relaxed">
                    Enterprise Uptime &<br/>Infrastructure
                  </p>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 4. Infinite Capability Ribbon (Cleaner, Technical) ── */}
      <div className="w-full bg-[var(--color-islamabad-primary)] py-5 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex items-center whitespace-nowrap"
        >
          {[...Array(2)].map((_, ri) => (
            <span key={ri} className="flex items-center">
              {[
                "AI Engineering",
                "Full-Stack Platforms",
                "LLM Fine-Tuning",
                "RAG Pipelines",
                "Workflow Automation",
                "Cloud Architecture",
                "ML Deployment",
                "Computer Vision",
                "Enterprise Architecture",
                "Performance Optimization",
              ].map((label, i) => (
                <span key={`${ri}-${i}`} className="flex items-center gap-8 px-8">
                  <span className="text-[11px] font-bold tracking-[0.15em] text-white/50 uppercase flex items-center gap-3">
                    <Terminal size={14} className="text-white/30" />
                    {label}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

    </section>
  );
}