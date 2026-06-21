"use client";

import { useState, Suspense, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Circle, Sparkles, Bot, Zap, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

function ApplicationContent() {
  const searchParams = useSearchParams();
  const trackName = searchParams.get("track") || "Internship Program";
  
  const [selectedTier, setSelectedTier] = useState<"free" | "premium">("premium");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      // Client-side file size validation (max 3MB total for Vercel Payload limits)
      let totalSize = 0;
      const resume = formData.get("resume") as File;
      const photo = formData.get("photo") as File;
      
      if (resume && resume.size) totalSize += resume.size;
      if (photo && photo.size) totalSize += photo.size;
      
      if (totalSize > 3 * 1024 * 1024) {
        throw new Error("Total file size exceeds 3MB. Please compress your resume/photo before submitting.");
      }

      formData.append("trackName", trackName);
      formData.append("selectedTier", selectedTier);

      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 413) {
          throw new Error("The uploaded files are too large. Please ensure files are under 4MB.");
        }
        
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          throw new Error((await response.json()).error || "Failed to submit application");
        } else {
          throw new Error("Failed to submit application. Please try again or with smaller files.");
        }
      }

      setSubmitted(true);
      form.reset();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-[1400px] mx-auto px-6 py-24 text-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl shadow-black/[0.03] max-w-2xl mx-auto border border-[var(--color-islamabad-border)]">
          <CheckCircle2 size={64} className="mx-auto text-[var(--color-islamabad-accent)] mb-6" />
          <h2 className="text-3xl font-bold font-[family-name:var(--font-plus-jakarta)] mb-4 text-[var(--color-islamabad-primary)]">
            Application Submitted!
          </h2>
          <p className="text-[var(--color-islamabad-secondary)] mb-6">
            Thank you for applying to the {trackName} ({selectedTier === "premium" ? "Pro" : "Standard"} Tier).
            We have received your application and will be in touch soon.
          </p>

          {selectedTier === "premium" && (
            <div className="bg-[var(--color-islamabad-accent)]/10 border border-[var(--color-islamabad-accent)]/30 rounded-xl p-4 mb-8 text-left text-sm text-[var(--color-islamabad-primary)] flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <Sparkles size={20} className="text-[var(--color-islamabad-accent)]" />
              </div>
              <div>
                <strong className="block mb-1 text-[var(--color-islamabad-accent)]">Pro Tier Next Steps</strong>
                If your application is accepted, your selection email will include payment details. You will have <strong>3 days</strong> to submit your payment screenshot to secure your spot.
              </div>
            </div>
          )}

          <Link href="/internships" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-bold text-white bg-[var(--color-islamabad-primary)] hover:bg-[var(--color-islamabad-accent)] transition-all">
            Return to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8 2xl:px-16 flex flex-col lg:flex-row gap-12 lg:gap-16">
      
      {/* Left Sidebar - Insights & Pricing */}
      <div className="w-full lg:w-5/12 xl:w-1/3 flex flex-col gap-8">
        <div>
          <Link href="/internships" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-primary)] transition-colors mb-6">
            <ArrowLeft size={16} /> Back to Programs
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-plus-jakarta)] tracking-tight mb-2 text-[var(--color-islamabad-primary)]">
            Apply for <br className="hidden lg:block"/> {trackName}
          </h1>
          <p className="text-[var(--color-islamabad-secondary)] font-light">
            Kickstart your career with hands-on enterprise experience. Select your preferred track model below.
          </p>
        </div>

        {/* Tiers / Options */}
        <div className="flex flex-col gap-4 mt-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-islamabad-secondary)]">
            Select Your Experience
          </h3>

          {/* Premium Tier */}
          <div 
            onClick={() => setSelectedTier("premium")}
            className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${selectedTier === 'premium' ? 'border-[var(--color-islamabad-accent)] bg-opacity-10 bg-[var(--color-islamabad-accent)]/5 shadow-lg shadow-[var(--color-islamabad-accent)]/10' : 'border-[var(--color-islamabad-border)] bg-white hover:border-[var(--color-islamabad-accent)]/50'}`}
          >
            {selectedTier === 'premium' && (
              <div className="absolute -top-3 right-4 px-3 py-1 bg-[var(--color-islamabad-accent)] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                Recommended
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${selectedTier === 'premium' ? 'bg-[var(--color-islamabad-accent)] text-white' : 'bg-[var(--color-islamabad-bg)] text-[var(--color-islamabad-primary)]'}`}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-islamabad-primary)] text-lg">Pro Experience</h4>
                  <p className="font-bold text-[var(--color-islamabad-accent)]">Rs. 500 <span className="text-xs font-normal text-[var(--color-islamabad-secondary)]">/ track</span></p>
                </div>
              </div>
              {selectedTier === 'premium' ? (
                <CheckCircle2 className="text-[var(--color-islamabad-accent)]" size={24} />
              ) : (
                <Circle className="text-[var(--color-islamabad-border)]" size={24} />
              )}
            </div>
            
            <ul className="space-y-3 mt-4 text-sm text-[var(--color-islamabad-secondary)]">
              <li className="flex items-start gap-2"><Bot size={16} className="mt-0.5 shrink-0 text-[var(--color-islamabad-accent)]"/> Dedicated AI Chatbot Assistance</li>
              <li className="flex items-start gap-2"><Zap size={16} className="mt-0.5 shrink-0 text-[var(--color-islamabad-accent)]"/> Live 1-on-1 Mentorship Sessions</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--color-islamabad-accent)]"/> Priority Code Reviews & Help</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--color-islamabad-accent)]"/> Direct Placement Referral Program</li>
            </ul>
          </div>

          {/* Free Tier */}
          <div 
            onClick={() => setSelectedTier("free")}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${selectedTier === 'free' ? 'border-[var(--color-islamabad-primary)] bg-opacity-10 bg-[var(--color-islamabad-primary)]/5 shadow-lg' : 'border-[var(--color-islamabad-border)] bg-white hover:border-[var(--color-islamabad-border)]/80'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${selectedTier === 'free' ? 'bg-[var(--color-islamabad-primary)] text-white' : 'bg-[var(--color-islamabad-bg)] text-[var(--color-islamabad-primary)]'}`}>
                  <Circle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-islamabad-primary)] text-lg">Standard</h4>
                  <p className="font-bold text-[var(--color-islamabad-primary)]">Free</p>
                </div>
              </div>
              {selectedTier === 'free' ? (
                <CheckCircle2 className="text-[var(--color-islamabad-primary)]" size={24} />
              ) : (
                <Circle className="text-[var(--color-islamabad-border)]" size={24} />
              )}
            </div>
            <ul className="space-y-3 mt-4 text-sm text-[var(--color-islamabad-secondary)]">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--color-islamabad-primary)]"/> Core Internship Experience</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--color-islamabad-primary)]"/> Self-paced project building</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--color-islamabad-primary)]"/> Community Discord Access</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Content - Application Form */}
      <div className="w-full lg:w-7/12 xl:w-2/3 flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-[var(--color-islamabad-border)] shadow-xl shadow-black/[0.03] rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Subtle patterned background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-plus-jakarta)] mb-8 text-[var(--color-islamabad-primary)]">
              Candidate Information
            </h2>
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-[var(--color-islamabad-primary)]">First Name *</label>
                  <input type="text" id="firstName" name="firstName" required className="w-full px-4 py-3 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-[var(--color-islamabad-primary)]">Last Name *</label>
                  <input type="text" id="lastName" name="lastName" required className="w-full px-4 py-3 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] transition-colors" placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-[var(--color-islamabad-primary)]">Email Address *</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-[var(--color-islamabad-primary)]">Phone Number</label>
                  <input type="text" id="phone" name="phone" className="w-full px-4 py-3 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] transition-colors" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="github" className="text-sm font-semibold text-[var(--color-islamabad-primary)]">GitHub Profile / Portfolio *</label>
                  <input type="url" id="github" name="github" required className="w-full px-4 py-3 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] transition-colors" placeholder="https://github.com/username" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="linkedin" className="text-sm font-semibold text-[var(--color-islamabad-primary)]">LinkedIn Profile</label>
                  <input type="url" id="linkedin" name="linkedin" className="w-full px-4 py-3 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] transition-colors" placeholder="https://linkedin.com/in/username" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="university" className="text-sm font-semibold text-[var(--color-islamabad-primary)]">University / College *</label>
                  <input type="text" id="university" name="university" required className="w-full px-4 py-3 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] transition-colors" placeholder="e.g. NUST, FAST, LUMS" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="degree" className="text-sm font-semibold text-[var(--color-islamabad-primary)]">Degree & Major *</label>
                  <input type="text" id="degree" name="degree" required className="w-full px-4 py-3 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] transition-colors" placeholder="e.g. BS Computer Science" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="resume" className="text-sm font-semibold text-[var(--color-islamabad-primary)]">Resume / CV (Max 2MB) *</label>
                  <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required className="w-full px-4 py-3 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[var(--color-islamabad-primary)] file:text-white hover:file:bg-[var(--color-islamabad-accent)] file:cursor-pointer cursor-pointer text-sm text-[var(--color-islamabad-secondary)]" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="photo" className="text-sm font-semibold text-[var(--color-islamabad-primary)]">Photograph (Max 1MB)</label>
                  <input type="file" id="photo" name="photo" accept="image/*" className="w-full px-4 py-3 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[var(--color-islamabad-primary)] file:text-white hover:file:bg-[var(--color-islamabad-accent)] file:cursor-pointer cursor-pointer text-sm text-[var(--color-islamabad-secondary)]" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="experience" className="text-sm font-semibold text-[var(--color-islamabad-primary)]">Work Experience  *</label>
                <textarea id="experience" name="experience" rows={4} required className="w-full px-4 py-3 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] transition-colors resize-none" placeholder="Briefly describe your previous internships, relevant coursework, or major technical projects..."></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="motivation" className="text-sm font-semibold text-[var(--color-islamabad-primary)]">Why do you want to join NeuroWebLabs? *</label>
                <textarea id="motivation" name="motivation" rows={3} required className="w-full px-4 py-3 bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] transition-colors resize-none" placeholder="What drives you to apply for this specific track? Tell us about your background and what you hope to learn."></textarea>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[var(--color-islamabad-border)]/50 mt-8">
                <p className="text-sm text-[var(--color-islamabad-secondary)]">
                  Selected plan: <strong className="text-[var(--color-islamabad-primary)]">{selectedTier === 'premium' ? 'Pro Experience (Rs. 500)' : 'Standard (Free)'}</strong>
                </p>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full disabled:opacity-70 disabled:cursor-not-allowed sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[15px] font-bold text-white bg-[var(--color-islamabad-primary)] hover:bg-[var(--color-islamabad-accent)] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      
    </div>
  );
}

export default function InternshipApplicationPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-[var(--color-islamabad-bg)] text-[var(--color-islamabad-primary)]">
      <Navbar />

      <section className="w-full pt-32 pb-24 md:pt-40 flex-grow">
        <Suspense fallback={<div className="w-full h-96 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-[var(--color-islamabad-accent)] border-t-transparent animate-spin"></div></div>}>
          <ApplicationContent />
        </Suspense>
      </section>

      <Footer />
    </main>
  );
}
