"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  Loader2, 
  CheckCircle2, 
  ShieldCheck
} from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate network request
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => {
        setFormState("idle");
        setFormData({ name: "", email: "", company: "", message: "" });
      }, 4000);
    }, 1500);
  };

  return (
    <section className="relative w-full bg-[var(--color-islamabad-bg)] py-20 lg:py-32 border-t border-[var(--color-islamabad-border)] overflow-hidden">
      
      {/* Subtle Background Elements to match ActionCTA styling */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-islamabad-accent)]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* LEFT COLUMN: Professional Copy & Context */}
        <div className="w-full lg:w-[45%] flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            
            
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-islamabad-primary)] tracking-tight leading-[1.2] mb-6">
              Have a system you need engineered?
            </h2>
            
            <p className="text-lg text-[var(--color-islamabad-secondary)] leading-relaxed max-w-md font-[family-name:var(--font-inter)]">
              We scope, architect, and deliver robust technical solutions. Send us a direct message with your project details, and our engineering team will review it within 24 hours.
            </p>
          </motion.div>

          {/* Middle Impact Content - Fills the empty space without expanding height */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col justify-center gap-6 py-10 lg:py-0"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-islamabad-accent)]/10 flex items-center justify-center text-[var(--color-islamabad-accent)] shrink-0 mt-0.5">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[var(--color-islamabad-primary)] text-[15px] mb-1 font-[family-name:var(--font-inter)]">Scalable Architecture</h4>
                <p className="text-[13px] text-[var(--color-islamabad-secondary)] font-[family-name:var(--font-inter)]">Every system we engineer is designed for high performance and limitless scale.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-islamabad-accent)]/10 flex items-center justify-center text-[var(--color-islamabad-accent)] shrink-0 mt-0.5">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[var(--color-islamabad-primary)] text-[15px] mb-1 font-[family-name:var(--font-inter)]">Reliable Delivery</h4>
                <p className="text-[13px] text-[var(--color-islamabad-secondary)] font-[family-name:var(--font-inter)]">We commit to transparent processes, precise timelines, and robust technical handoffs.</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[var(--color-islamabad-border)]"
          >
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-[1rem] bg-white border border-[var(--color-islamabad-border)] shadow-sm flex items-center justify-center text-[var(--color-islamabad-primary)]">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-islamabad-secondary)] mb-1">
                  Direct Email
                </p>
                <a href="mailto:hello@youragency.com" className="text-[15px] font-bold text-[var(--color-islamabad-primary)] hover:text-[var(--color-islamabad-accent)] transition-colors font-[family-name:var(--font-inter)]">
                  neuroweblabs@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-[1rem] bg-white border border-[var(--color-islamabad-border)] shadow-sm flex items-center justify-center text-[var(--color-islamabad-primary)]">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-islamabad-secondary)] mb-1">
                  Headquarters
                </p>
                <p className="text-[15px] font-bold text-[var(--color-islamabad-primary)] font-[family-name:var(--font-inter)]">
                Faislabad, Pakistan
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: The Professional Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[55%]"
        >
          <div className="w-full bg-white rounded-[2rem] border border-[var(--color-islamabad-border)] p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(15,23,42,0.05)]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="name" className="text-[13px] font-bold text-[var(--color-islamabad-primary)] font-[family-name:var(--font-inter)]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInput}
                    placeholder="John Doe"
                    className="w-full bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl px-4 py-3.5 text-[15px] text-[var(--color-islamabad-primary)] font-[family-name:var(--font-inter)] placeholder-[var(--color-islamabad-secondary)]/50 focus:outline-none focus:bg-white focus:border-[var(--color-islamabad-accent)] focus:ring-4 focus:ring-[var(--color-islamabad-accent)]/10 transition-all duration-300"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="email" className="text-[13px] font-bold text-[var(--color-islamabad-primary)] font-[family-name:var(--font-inter)]">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInput}
                    placeholder="john@company.com"
                    className="w-full bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl px-4 py-3.5 text-[15px] text-[var(--color-islamabad-primary)] font-[family-name:var(--font-inter)] placeholder-[var(--color-islamabad-secondary)]/50 focus:outline-none focus:bg-white focus:border-[var(--color-islamabad-accent)] focus:ring-4 focus:ring-[var(--color-islamabad-accent)]/10 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Company Input (Optional but highly professional for B2B) */}
              <div className="flex flex-col gap-2.5">
                <label htmlFor="company" className="text-[13px] font-bold text-[var(--color-islamabad-primary)] font-[family-name:var(--font-inter)] flex justify-between">
                  <span>Company Name</span>
                  <span className="text-[var(--color-islamabad-secondary)] font-normal text-xs">Optional</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInput}
                  placeholder="Acme Corp"
                  className="w-full bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl px-4 py-3.5 text-[15px] text-[var(--color-islamabad-primary)] font-[family-name:var(--font-inter)] placeholder-[var(--color-islamabad-secondary)]/50 focus:outline-none focus:bg-white focus:border-[var(--color-islamabad-accent)] focus:ring-4 focus:ring-[var(--color-islamabad-accent)]/10 transition-all duration-300"
                />
              </div>

              {/* Message Textarea */}
              <div className="flex flex-col gap-2.5">
                <label htmlFor="message" className="text-[13px] font-bold text-[var(--color-islamabad-primary)] font-[family-name:var(--font-inter)]">
                  Project Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInput}
                  placeholder="Tell us about the system you want to build, technical constraints, or scale requirements..."
                  className="w-full bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl px-4 py-3.5 text-[15px] text-[var(--color-islamabad-primary)] font-[family-name:var(--font-inter)] placeholder-[var(--color-islamabad-secondary)]/50 focus:outline-none focus:bg-white focus:border-[var(--color-islamabad-accent)] focus:ring-4 focus:ring-[var(--color-islamabad-accent)]/10 transition-all duration-300 resize-none"
                />
              </div>

              {/* Action Footer */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                
                <div className="flex items-center gap-2 text-[var(--color-islamabad-secondary)]">
                  <ShieldCheck size={16} />
                  <span className="text-xs font-semibold font-[family-name:var(--font-inter)]">Your information is secure.</span>
                </div>

                <button
                  type="submit"
                  disabled={formState !== "idle"}
                  className="w-full sm:w-auto relative overflow-hidden rounded-xl bg-[var(--color-islamabad-primary)] px-8 py-4 flex items-center justify-center transition-all duration-300 hover:bg-[#0F172A] disabled:opacity-90 disabled:cursor-not-allowed group"
                >
                  <AnimatePresence mode="wait">
                    {formState === "idle" && (
                      <motion.div 
                        key="idle" 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} 
                        className="flex items-center gap-2"
                      >
                        <span className="text-[14px] font-bold text-white font-[family-name:var(--font-inter)]">Send Message</span>
                        <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                    {formState === "submitting" && (
                      <motion.div 
                        key="submitting" 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} 
                        className="flex items-center gap-2 text-white"
                      >
                        <Loader2 size={16} className="animate-spin" />
                        <span className="text-[14px] font-bold font-[family-name:var(--font-inter)]">Sending...</span>
                      </motion.div>
                    )}
                    {formState === "success" && (
                      <motion.div 
                        key="success" 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} 
                        className="flex items-center gap-2 text-white"
                      >
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        <span className="text-[14px] font-bold font-[family-name:var(--font-inter)]">Message Sent</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}