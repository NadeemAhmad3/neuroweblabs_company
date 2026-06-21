"use client";

import { useState, Suspense, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2, User, BookOpen, Briefcase, Paperclip } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function ApplicationContent() {
  const searchParams = useSearchParams();
  const trackName = searchParams.get("track") || "Internship Program";
  
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
      
      let totalSize = 0;
      const resume = formData.get("resume") as File;
      const photo = formData.get("photo") as File;
      
      if (resume && resume.size) totalSize += resume.size;
      if (photo && photo.size) totalSize += photo.size;
      
      if (totalSize > 3 * 1024 * 1024) {
        throw new Error("Total file size exceeds 3MB. Please compress your resume/photo before submitting.");
      }

      formData.append("trackName", trackName);

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
      <div className="w-full max-w-3xl mx-auto px-6 py-24 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-200/60">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-plus-jakarta)] mb-4 text-[var(--color-islamabad-primary)]">
            Application Submitted!
          </h2>
          <p className="text-lg text-[var(--color-islamabad-secondary)] mb-4 max-w-xl mx-auto">
            Thank you for applying to the <span className="font-semibold text-[var(--color-islamabad-primary)]">{trackName}</span> program.
            We have received your application and our team will review it shortly.
          </p>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl mb-10 max-w-xl mx-auto">
            <p className="text-sm text-amber-800 font-medium">
              We have sent a confirmation email containing your form details. <br />
              <strong className="text-amber-900">Please check your Spam or Junk folder if you do not see it in your inbox.</strong>
            </p>
          </div>
          <Link href="/internships" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-bold text-white bg-[var(--color-islamabad-primary)] hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Return to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col gap-10">
      
      {/* Header Section */}
      <div className="w-full text-center max-w-3xl mx-auto">
        <Link href="/internships" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-8 bg-white/50 px-4 py-2 rounded-full border border-slate-200/60 shadow-sm backdrop-blur-sm">
          <ArrowLeft size={16} /> Back to Programs
        </Link>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-[family-name:var(--font-plus-jakarta)] tracking-tight mb-4 text-[var(--color-islamabad-primary)]"
        >
          Apply for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">{trackName}</span>
        </motion.h1>
      </div>

      {/* Form Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full bg-white/90 backdrop-blur-2xl border border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-6 sm:p-10 md:p-14 relative overflow-hidden"
      >
        <div className="relative z-10">
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm flex items-center gap-3 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Section 1: Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
                  <User size={18} />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-plus-jakarta)] text-slate-900">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-bold text-slate-700">First Name <span className="text-rose-500">*</span></label>
                  <input type="text" id="firstName" name="firstName" required className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-bold text-slate-700">Last Name <span className="text-rose-500">*</span></label>
                  <input type="text" id="lastName" name="lastName" required className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300" placeholder="Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-slate-700">Email Address <span className="text-rose-500">*</span></label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold text-slate-700">Phone Number</label>
                  <input type="text" id="phone" name="phone" className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>

            {/* Section 2: Academic & Profiles */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                  <BookOpen size={18} />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-plus-jakarta)] text-slate-900">Academic & Profiles</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label htmlFor="university" className="text-sm font-bold text-slate-700">University / College <span className="text-rose-500">*</span></label>
                  <input type="text" id="university" name="university" required className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300" placeholder="e.g. NUST, FAST, LUMS" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="degree" className="text-sm font-bold text-slate-700">Degree & Major <span className="text-rose-500">*</span></label>
                  <input type="text" id="degree" name="degree" required className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300" placeholder="e.g. BS Computer Science" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="github" className="text-sm font-bold text-slate-700">GitHub Profile / Portfolio <span className="text-rose-500">*</span></label>
                  <input type="url" id="github" name="github" required className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300" placeholder="https://github.com/username" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="linkedin" className="text-sm font-bold text-slate-700">LinkedIn Profile</label>
                  <input type="url" id="linkedin" name="linkedin" className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300" placeholder="https://linkedin.com/in/username" />
                </div>
              </div>
            </div>

            {/* Section 3: Experience & Motivation */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                  <Briefcase size={18} />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-plus-jakarta)] text-slate-900">Experience & Motivation</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="experience" className="text-sm font-bold text-slate-700">Work Experience / Projects <span className="text-rose-500">*</span></label>
                  <textarea id="experience" name="experience" rows={4} required className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 resize-none" placeholder="Briefly describe your previous internships, relevant coursework, or major technical projects..."></textarea>
                </div>

                <div className="space-y-2">
                  <label htmlFor="motivation" className="text-sm font-bold text-slate-700">Why NeuroWebLabs? <span className="text-rose-500">*</span></label>
                  <textarea id="motivation" name="motivation" rows={3} required className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 resize-none" placeholder="What drives you to apply for this specific track? Tell us about your background and what you hope to learn."></textarea>
                </div>
              </div>
            </div>

            {/* Section 4: Attachments */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-500">
                  <Paperclip size={18} />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-plus-jakarta)] text-slate-900">Attachments</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2 p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <label htmlFor="resume" className="text-sm font-bold text-slate-700 block mb-2">Resume / CV (Max 2MB) <span className="text-rose-500">*</span></label>
                  <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required className="w-full file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-slate-900 file:text-white hover:file:bg-emerald-600 file:transition-colors file:cursor-pointer cursor-pointer text-sm text-slate-500" />
                </div>
                <div className="space-y-2 p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <label htmlFor="photo" className="text-sm font-bold text-slate-700 block mb-2">Photograph <span className="text-slate-400 font-normal">(Optional - You can skip this)</span></label>
                  <input type="file" id="photo" name="photo" accept="image/*" className="w-full file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-slate-200 file:text-slate-700 hover:file:bg-slate-300 file:transition-colors file:cursor-pointer cursor-pointer text-sm text-slate-500" />
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-200/60 mt-10">
              <p className="text-sm text-slate-500 font-medium">
                Please review your information before submitting.
              </p>
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full disabled:opacity-70 disabled:cursor-not-allowed sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-xl text-[15px] font-bold text-white bg-slate-900 hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Submitting Application...
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
  );
}

export default function InternshipApplicationPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-[var(--color-islamabad-bg)] text-slate-900 selection:bg-emerald-500/20">
      <Suspense fallback={
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
        </div>
      }>
        <ApplicationContent />
      </Suspense>
    </main>
  );
}
