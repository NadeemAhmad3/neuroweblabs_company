"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, ArrowRight, Globe,
  Bot, Workflow, Database, Server, Smartphone, CloudCog,
  Building, Users, FileText, Mail
} from "lucide-react";

// Shared navigation data
const navData = {
  capabilities: {
    name: "Capabilities",
    href: "/capabilities",
    items: [
      { name: "AI Agent Systems", href: "/capabilities#ai", description: "Autonomous workflows replacing heavy manual operations.", icon: Bot },
      { name: "Automation Pipelines", href: "/capabilities#automation", description: "Connect fragmented enterprise APIs with custom automated logic.", icon: Workflow },
      { name: "Data & RAG Infrastructure", href: "/capabilities#data", description: "Proprietary LLM pipelines, fine-tuning, and vector database setups.", icon: Database },
      { name: "Full-Stack Architecture", href: "/capabilities#web", description: "Scalable, high-performance web systems for global markets.", icon: Server },
      { name: "Mobile App Engineering", href: "/capabilities#mobile", description: "High-conversion fluid native-like iOS and Android platforms.", icon: Smartphone },
      { name: "DevOps & QA Cycles", href: "/capabilities#devops", description: "Continuous testing, robust deployments, and strict security pipelines.", icon: CloudCog },
    ],
  },
  company: {
    name: "Company",
    href: "/company",
    items: [
      { name: "About Us", href: "/company#about", description: "Our philosophy, engineering standards, and leadership.", icon: Building },
      { name: "Careers", href: "/careers", description: "Join our high-performance engineering studio.", icon: Users },
      { name: "Case Studies", href: "/case-studies", description: "Explore our technical deliveries and systems architecture.", icon: FileText },
      { name: "Contact", href: "/contact", description: "Get in touch for a technical scoping session.", icon: Mail },
    ],
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"capabilities" | "company" | null>(null);
  const [hoveringNav, setHoveringNav] = useState(false);
  const [hoveringPanel, setHoveringPanel] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!hoveringNav && !hoveringPanel) {
      timeout = setTimeout(() => setActiveDropdown(null), 120);
    }
    return () => clearTimeout(timeout);
  }, [hoveringNav, hoveringPanel]);

  const navLinks = [
    { name: "Capabilities", href: "/capabilities", hasDropdown: true, key: "capabilities" as const },
    { name: "Internships", href: "/internships", hasDropdown: false },
    { name: "Case Studies", href: "/case-studies", hasDropdown: false },
    { name: "Company", href: "/company", hasDropdown: true, key: "company" as const },
  ];

  const mobileContainerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
  };

  return (
    <div className="fixed top-0 w-full z-50 flex flex-col items-center">
      {/* TIER 1: Enterprise Utility Bar */}
      <AnimatePresence initial={false}>
        {!scrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 40, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="hidden lg:flex w-full overflow-hidden bg-islamabad-primary text-islamabad-bg items-center justify-between px-8 2xl:px-16 text-[12px] font-medium tracking-wide shrink-0"
          >
            <div className="flex items-center gap-6 opacity-90">
              <span className="flex items-center gap-2"><Globe size={14} /> Global Operations</span>
              <span>contact@neuroweblabs.com</span>
            </div>
            <div className="flex items-center gap-6 opacity-90">
              <Link href="/client-portal" className="hover:text-islamabad-accent transition-colors">Client Portal</Link>
              <Link href="/careers" className="hover:text-islamabad-accent transition-colors">Careers</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TIER 2: Main Navigation */}
      <header className={`w-full transition-all duration-500 ease-in-out px-4 md:px-8 mt-3 lg:mt-4 ${scrolled ? "max-w-5xl" : "max-w-[1600px]"}`}>
        {/* Navbar is always visible using the light theme colors */}
        <div 
          className={`w-full flex items-center justify-between relative rounded-full transition-all duration-500 px-6 py-3.5 border text-islamabad-primary ${
            scrolled 
              ? "bg-islamabad-surface/90 border-islamabad-border/60 shadow-luxury backdrop-blur-xl" 
              : "bg-islamabad-surface/70 border-islamabad-border/30 backdrop-blur-lg shadow-md"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center z-50 gap-3">
            <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L33 12.5V27.5L20 35L7 27.5V12.5L20 5Z" className="stroke-current opacity-30" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M20 5L33 12.5L20 20L7 12.5L20 5Z" className="fill-current opacity-10 stroke-current" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M20 20L33 12.5V27.5L20 35V20Z" className="fill-current opacity-20 stroke-current" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M7 12.5L20 20V35L7 27.5V12.5Z" className="fill-islamabad-accent/20 stroke-islamabad-accent" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="20" cy="5" r="2" className="fill-current" />
              <circle cx="33" cy="12.5" r="2" className="fill-current" />
              <circle cx="33" cy="27.5" r="2" className="fill-current opacity-70" />
              <circle cx="20" cy="35" r="2" className="fill-current opacity-70" />
              <circle cx="7" cy="27.5" r="2" className="fill-islamabad-accent" />
              <circle cx="7" cy="12.5" r="2" className="fill-islamabad-accent" />
              <circle cx="20" cy="20" r="3" className="fill-current transition-colors duration-500 group-hover:fill-islamabad-accent" />
            </svg>
            <span className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-xl tracking-tighter">
              NeuroWeb<span className="font-medium opacity-80">Labs</span>
              <span className="text-islamabad-accent text-2xl leading-[0] relative top-0.5 transition-opacity duration-300 group-hover:animate-pulse">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  if (link.hasDropdown && link.key) {
                    setActiveDropdown(link.key);
                    setHoveringNav(true);
                  } else {
                    setHoveringNav(false);
                  }
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  if (link.hasDropdown) setHoveringNav(false);
                }}
                onFocus={() => {
                  if (link.hasDropdown && link.key) setActiveDropdown(link.key);
                  else setActiveDropdown(null);
                }}
                className="relative px-5 py-2 flex items-center gap-1.5 text-[14px] font-semibold text-islamabad-secondary hover:text-islamabad-primary transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-islamabad-accent"
              >
                <span className="relative z-10">{link.name}</span>
                {link.hasDropdown && (
                  <ChevronDown size={14} className="relative z-10 opacity-70 transition-transform duration-300" style={{ transform: activeDropdown === link.key ? "rotate(180deg)" : "rotate(0)" }} />
                )}
                {hoveredIndex === idx && (
                  <motion.span
                    layoutId="navbar-hover-pill"
                    className="absolute inset-0 bg-islamabad-grid-line rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Action Area */}
          <div className="hidden lg:flex items-center gap-6">
            <Link 
              href="/contact" 
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-bold bg-islamabad-primary text-islamabad-bg border-transparent hover:bg-islamabad-accent transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-islamabad-accent"
            >
              Start a Project
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden relative z-50 p-2 -mr-2 text-islamabad-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            {mobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
          </button>

          {/* Mega-Menu Panel Dropdowns */}
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onMouseEnter={() => setHoveringPanel(true)}
                onMouseLeave={() => setHoveringPanel(false)}
                className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[95vw] max-w-4xl bg-islamabad-surface border border-islamabad-border/60 rounded-3xl shadow-luxury p-8 z-50 overflow-hidden text-islamabad-primary"
              >
                {/* Content... using standard light colors */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {(activeDropdown === "capabilities" ? navData.capabilities.items : navData.company.items).map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.name} href={item.href} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-islamabad-grid-line transition-colors group">
                          <div className="p-2.5 rounded-xl bg-islamabad-bg text-islamabad-secondary group-hover:bg-islamabad-accent/10 group-hover:text-islamabad-accent transition-colors shrink-0">
                            <Icon size={18} />
                          </div>
                          <div>
                            <h4 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[14px] text-islamabad-primary mb-0.5">{item.name}</h4>
                            <p className="text-[12px] text-islamabad-secondary font-mono leading-normal">{item.description}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute top-0 left-0 w-full bg-islamabad-surface border-t border-islamabad-border overflow-y-auto flex flex-col z-40 pt-28 pb-12 px-6 text-islamabad-primary"
          >
            <motion.div variants={mobileContainerVariants} initial="hidden" animate="show" className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={mobileItemVariants} className="flex flex-col border-b border-islamabad-border/50 pb-4">
                  <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-lg font-[family-name:var(--font-plus-jakarta)] font-bold text-islamabad-primary">
                    {link.name}
                  </Link>

                  {link.hasDropdown && link.key && (
                    <div className="mt-3 pl-4 border-l border-islamabad-border flex flex-col gap-4">
                      {navData[link.key].items.map((subItem) => (
                        <Link key={subItem.name} href={subItem.href} onClick={() => setMobileMenuOpen(false)} className="flex flex-col group">
                          <span className="text-[14px] font-bold text-islamabad-primary group-hover:text-islamabad-accent transition-colors">{subItem.name}</span>
                          <span className="text-[11px] text-islamabad-secondary font-mono mt-0.5 leading-tight">{subItem.description}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              
              <motion.div variants={mobileItemVariants} className="pt-4">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="group w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-islamabad-bg bg-islamabad-primary hover:bg-islamabad-accent transition-all duration-300">
                  Start a Project <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}