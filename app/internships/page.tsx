"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Code, Database, BrainCircuit, LineChart,Bot, Terminal, CloudCog, MonitorSmartphone, CheckCircle2, ScanEye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const programs = [
  {
  title: "Data Science & Analytics",
  icon: <LineChart size={24} className="text-[var(--color-islamabad-accent)]" />, 
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  description: "Master exploratory data analysis, apply statistical techniques, and build predictive machine learning models to extract actionable insights from complex datasets.",
  tags: ["Python", "Machine Learning", "SQL"],
  type: "Remote / Hybrid",
  duration: "3-6 Months"
},
  {
    title: "Generative AI",
    icon: <Bot size={24} className="text-[var(--color-islamabad-accent)]" />,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    description: "Build custom text and image diffusion models, fine-tune open-source LLMs, and architect advanced RAG pipelines. Master cutting-edge transformer architectures.",
    tags: ["LLM Fine-Tuning", "RAG Pipelines", "Transformers"],
    type: "Remote / Hybrid",
    duration: "3-6 Months"
  },
  {
    title: "Full-Stack AI Development",
    icon: <Code size={24} className="text-[var(--color-islamabad-accent)]" />,
    image: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?auto=format&fit=crop&q=80&w=800",
    description: "Merge AI with modern web architecture. Build full-stack solutions with Redux state management, secure firewalls, and deeply integrated AI inferences.",
    tags: ["React/Next.js", "Node.js/Python", "AI Integrations"],
    type: "Remote / Hybrid",
    duration: "3-6 Months"
  }
  
];

const perks = [
  "Mentorship from Senior Architects",
  "Work on Live Client Projects",
  "Completion Certificate & Recommendation",
  "Pre-placement Offer (PPO) Opportunity",
  "Modern Tech Stack Exposure",
  "Flexible Remote/Hybrid Options"
];

export default function InternshipsPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-[var(--color-islamabad-bg)] text-[var(--color-islamabad-primary)]">
      <Navbar />

      {/* Internship Tracks - Direct Start */}
      <section id="programs" className="w-full pt-36 md:pt-48 pb-24 border-b border-[var(--color-islamabad-border)]">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8 2xl:px-16">
          <div className="flex flex-col mb-16 text-center md:text-left md:items-start items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-[family-name:var(--font-plus-jakarta)] tracking-tight mb-4 text-[var(--color-islamabad-primary)]">
              Open Programs
            </h1>
            <p className="text-lg text-[var(--color-islamabad-secondary)] max-w-2xl font-light">
              Don&apos;t just spectate, build. Choose a track, roll up your sleeves, and gain hands-on experience by directly contributing to real-world enterprise applications.
            </p>
            <div className="h-1.5 w-24 bg-[var(--color-islamabad-accent)] mt-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <motion.div 
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[var(--color-islamabad-border)] shadow-sm hover:shadow-xl hover:border-[var(--color-islamabad-accent)]/30 transition-all duration-500"
              >
                {/* Visual Header with Image */}
                <div className="relative h-48 w-full overflow-hidden bg-[var(--color-islamabad-primary)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:via-black/20 transition-colors duration-500 z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  
                  {/* Absolute Badges */}
                  <div className="absolute top-5 left-5 z-20 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[var(--color-islamabad-primary)] text-xs font-extrabold tracking-wide uppercase rounded-md shadow-sm">
                      {program.duration}
                    </span>
                    <span className="px-3 py-1 bg-[var(--color-islamabad-primary)]/90 backdrop-blur-md text-white text-xs font-extrabold tracking-wide uppercase rounded-md shadow-sm">
                      {program.type}
                    </span>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="flex flex-col p-6 pt-6">
                  {/* Title and Icon paired together */}
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-plus-jakarta)] text-[var(--color-islamabad-primary)] leading-tight">
                      {program.title}
                    </h3>
                    <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-islamabad-bg)] rounded-xl border border-[var(--color-islamabad-border)] flex items-center justify-center group-hover:bg-[var(--color-islamabad-primary)] group-hover:text-white transition-colors duration-300">
                      <div className="scale-90 group-hover:text-white">
                        {program.icon}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[var(--color-islamabad-secondary)] text-sm leading-relaxed mb-6 line-clamp-3">
                    {program.description}
                  </p>

                  {/* Tools/Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {program.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] text-[var(--color-islamabad-secondary)] text-xs font-bold rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Primary Call to Action */}
                  <div className="mt-auto pt-2 border-t border-[var(--color-islamabad-border)]/50">
                    <Link 
                      href={`/internships/apply?track=${encodeURIComponent(program.title)}`}
                      className="w-full flex items-center justify-center gap-2 py-3.5 mt-4 rounded-lg text-[15px] font-bold text-white bg-[var(--color-islamabad-primary)] group-hover:bg-[var(--color-islamabad-accent)] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[var(--color-islamabad-accent)]/20 hover:-translate-y-0.5"
                    >
                      Apply Now
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us / Perks */}
      <section className="w-full py-24">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8 2xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-plus-jakarta)] mb-6">
              Why intern at NeuroWebLabs?
            </h2>
            <p className="text-lg text-[var(--color-islamabad-secondary)] mb-8 font-light">
              We don &apos;t believe in fetching coffee. From day one, you will be writing production code, designing real interfaces, and building models that go live.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[var(--color-islamabad-accent)] shrink-0 mt-0.5" />
                  <span className="font-medium text-[var(--color-islamabad-primary)]">{perk}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-[var(--color-islamabad-primary)] p-12 flex flex-col justify-center border border-[var(--color-islamabad-border)] shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="relative z-10 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">&apos;The best way to learn is to build.&apos;</h3>
              <p className="text-white/70 italic text-lg">- Engineering Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 mb-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-plus-jakarta)] mb-6">
            Ready to jump in?
          </h2>
          <p className="text-[var(--color-islamabad-secondary)] text-lg mb-10">
            Submit your resume, portfolio, or GitHub profile. Let&apos;s see what you can do.
          </p>
          <Link 
            href="#programs" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold text-white bg-[var(--color-islamabad-primary)] transition-all duration-300 hover:bg-[var(--color-islamabad-accent)] hover:shadow-xl hover:shadow-[var(--color-islamabad-accent)]/20 hover:-translate-y-1"
          >
            Apply Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
