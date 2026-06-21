import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[var(--color-islamabad-bg)] border-t border-[var(--color-islamabad-border)] pt-20 pb-8 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-islamabad-accent)]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <span className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-extrabold text-[var(--color-islamabad-primary)] tracking-tight">
                NeuroWebLabs<span className="text-[var(--color-islamabad-accent)]">.</span>
              </span>
            </Link>
            <p className="text-[15px] text-[var(--color-islamabad-secondary)] leading-relaxed max-w-sm font-[family-name:var(--font-inter)]">
              We scope, architect, and deliver robust technical solutions. Engineering scalable systems for high performance and limitless scale.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://github." target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[var(--color-islamabad-border)] flex items-center justify-center text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-accent)] hover:border-[var(--color-islamabad-accent)] hover:bg-[var(--color-islamabad-accent)]/5 transition-all duration-300">
                <Github size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[var(--color-islamabad-border)] flex items-center justify-center text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-accent)] hover:border-[var(--color-islamabad-accent)] hover:bg-[var(--color-islamabad-accent)]/5 transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[var(--color-islamabad-border)] flex items-center justify-center text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-accent)] hover:border-[var(--color-islamabad-accent)] hover:bg-[var(--color-islamabad-accent)]/5 transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2 lg:col-start-7 flex flex-col gap-4">
            <h4 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] text-[var(--color-islamabad-primary)] tracking-wide mb-2">
              Capabilities
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#architecture" className="text-[14px] text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-accent)] transition-colors font-[family-name:var(--font-inter)]">
                  System Architecture
                </Link>
              </li>
              <li>
                <Link href="#engineering" className="text-[14px] text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-accent)] transition-colors font-[family-name:var(--font-inter)]">
                  Software Engineering
                </Link>
              </li>
              <li>
                <Link href="#cloud" className="text-[14px] text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-accent)] transition-colors font-[family-name:var(--font-inter)]">
                  Cloud Infrastructure
                </Link>
              </li>
              <li>
                <Link href="#ai" className="text-[14px] text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-accent)] transition-colors font-[family-name:var(--font-inter)]">
                  AI Integration
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] text-[var(--color-islamabad-primary)] tracking-wide mb-2">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#about" className="text-[14px] text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-accent)] transition-colors font-[family-name:var(--font-inter)]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#impact" className="text-[14px] text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-accent)] transition-colors font-[family-name:var(--font-inter)]">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link href="#careers" className="text-[14px] text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-accent)] transition-colors font-[family-name:var(--font-inter)]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-[14px] text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-accent)] transition-colors font-[family-name:var(--font-inter)]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] text-[var(--color-islamabad-primary)] tracking-wide mb-2">
              Connect
            </h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:neuroweblabs@gmail.com" className="group flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-islamabad-accent)]/10 flex items-center justify-center text-[var(--color-islamabad-accent)] group-hover:bg-[var(--color-islamabad-accent)] group-hover:text-white transition-colors duration-300">
                  <Mail size={14} />
                </div>
                <span className="text-[14px] text-[var(--color-islamabad-secondary)] group-hover:text-[var(--color-islamabad-primary)] transition-colors font-[family-name:var(--font-inter)]">
                  neuroweblabs@gmail.com
                </span>
              </a>
              <Link href="#contact" className="group flex items-center gap-2 text-[14px] font-bold text-[var(--color-islamabad-primary)] mt-2">
                Start a project
                <ArrowRight size={16} className="text-[var(--color-islamabad-accent)] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-islamabad-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[var(--color-islamabad-secondary)] font-[family-name:var(--font-inter)]">
            &copy; {currentYear} NeuroWebLabs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[13px] text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-primary)] transition-colors font-[family-name:var(--font-inter)]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[13px] text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-primary)] transition-colors font-[family-name:var(--font-inter)]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}