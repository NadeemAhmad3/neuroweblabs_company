"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useSpring, useMotionValue, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// ─── Slide Data ───────────────────────────────────────────────────────────────
// company1.png: Exterior — "The Islamabad Tech Tower"
// company2.png: Interior — "The Innovation Floor"
interface Slide {
  id: number;
  image: string;
  eyebrow: string;
  headline: string[];
  description: string;
  metrics: { value: string; label: string }[];
}

const slides: Slide[] = [
  {
    id: 0,
    image: "/company1.png",
    eyebrow: "Web Architecture",
    headline: ["Scalable", "digital", "products", "built", "to", "last."],
    description:
      "From high-performance Next.js frontends to robust Node.js backends, we engineer web experiences that scale with your ambition.",
    metrics: [
      { value: "50+", label: "Projects Delivered" },
      { value: "99%", label: "Client Retention" },
      { value: "3x", label: "Faster Time-to-Market" },
    ],
  },
  {
    id: 1,
    image: "/company2.png",
    eyebrow: "Artificial Intelligence",
    headline: ["Intelligence", "that", "works", "for", "you."],
    description:
      "We integrate custom AI agents, LLM pipelines, and intelligent automation into your workflows — turning data into competitive advantage.",
    metrics: [
      { value: "40+", label: "AI Models Deployed" },
      { value: "12", label: "Industries Served" },
      { value: "24/7", label: "Intelligent Ops" },
    ],
  },
];

// ─── Slide Duration ───────────────────────────────────────────────────────────
const AUTOPLAY_DURATION = 6000; // ms

export default function Hero() {
  // ── State ─────────────────────────────────────────────────────────────────
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slide = slides[currentSlide];

  // ── Autoplay ──────────────────────────────────────────────────────────────
  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrentSlide((prev) => {
        if (index >= slides.length) return 0;
        if (index < 0) return slides.length - 1;
        return index;
      });
    },
    []
  );

  const next = useCallback(() => goTo(currentSlide + 1, 1), [currentSlide, goTo]);
  const prev = useCallback(() => goTo(currentSlide - 1, -1), [currentSlide, goTo]);

  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setInterval(next, AUTOPLAY_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, next]);

  // ── Mouse Tracking (Orb) ──────────────────────────────────────────────────
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    cursorX.set(clientX - window.innerWidth / 2);
    cursorY.set(clientY - window.innerHeight / 2);
  };

  // ── Magnetic Button ───────────────────────────────────────────────────────
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setMagneticPos({
      x: (e.clientX - centerX) * 0.2,
      y: (e.clientY - centerY) * 0.2,
    });
  };
  const resetMagnetic = () => setMagneticPos({ x: 0, y: 0 });

  // ── Animation Variants ────────────────────────────────────────────────────
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(8px)",
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  const imageVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.8, ease: "easeInOut" },
    }),
  };

  const overlayVariants: Variants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center overflow-hidden bg-[var(--color-islamabad-primary)] pt-36 md:pt-40 pb-24 md:pb-32"
    >
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  BACKGROUND IMAGE CAROUSEL                                     */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={slide.id}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.eyebrow}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Dark Overlay for Text Readability ────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`overlay-${slide.id}`}
            variants={overlayVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                135deg,
                rgba(15, 23, 42, 0.88) 0%,
                rgba(15, 23, 42, 0.65) 40%,
                rgba(15, 23, 42, 0.45) 70%,
                rgba(15, 23, 42, 0.75) 100%
              )`,
            }}
          />
        </AnimatePresence>

        {/* ── Vignette Edge Darkening ──────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 150px 60px rgba(15, 23, 42, 0.6)",
          }}
        />

        {/* ── Accent Glow Orb (follows mouse) ──────────────────────── */}
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[120px] pointer-events-none z-[1] -translate-x-1/2 -translate-y-1/2 opacity-30"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--color-islamabad-accent) 0%, transparent 65%)",
            }}
          />
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  CONTENT                                                       */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col items-center text-center -mt-16 md:-mt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${slide.id}`}
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col items-center"
          >
            {/* ── Eyebrow ──────────────────────────────────────────── */}
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[var(--color-islamabad-accent)] text-xs font-semibold tracking-[0.15em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-islamabad-accent)] animate-pulse" />
                {slide.eyebrow}
              </span>
            </motion.div>

            {/* ── Headline ───────────────────────────────────────────── */}
            <motion.h1
              variants={container}
              initial="hidden"
              animate="show"
              className="font-[family-name:var(--font-plus-jakarta)] text-[10vw] md:text-[5vw] leading-[1.05] font-extrabold text-white tracking-tight max-w-5xl"
            >
              {slide.headline.map((word, i) => (
                <motion.span
                  key={`${slide.id}-${i}`}
                  variants={item}
                  className={`inline-block mr-3 ${
                    i === slide.headline.length - 1
                      ? "text-[var(--color-islamabad-accent)]"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* ── Description ────────────────────────────────────────── */}
            <motion.p
              variants={item}
              className="mt-8 text-lg md:text-xl text-white/70 font-[family-name:var(--font-inter)] max-w-2xl font-light leading-relaxed"
            >
              {slide.description}
            </motion.p>

            {/* ── Metrics ────────────────────────────────────────────── */}
            <motion.div
              variants={item}
              className="mt-12 flex items-center gap-8 md:gap-14"
            >
              {slide.metrics.map((m) => (
                <div key={m.label} className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-plus-jakarta)] text-white">
                    {m.value}
                  </span>
                  <span className="mt-1 text-xs md:text-sm font-medium text-white/50 tracking-wide uppercase">
                    {m.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* ── CTAs ───────────────────────────────────────────────── */}
            <motion.div
              variants={item}
              className="mt-14 flex flex-col sm:flex-row items-center gap-6"
            >
              {/* Magnetic Primary */}
              <motion.div
                animate={{ x: magneticPos.x, y: magneticPos.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
              >
                <Link
                  href="/contact"
                  ref={buttonRef}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={resetMagnetic}
                  className="group relative flex items-center gap-3 px-9 py-4 rounded-full bg-[var(--color-islamabad-accent)] text-white text-[15px] font-semibold overflow-hidden transition-shadow hover:shadow-2xl hover:shadow-[var(--color-islamabad-accent)]/40"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                  <span className="relative z-10">Start a Project</span>
                  <ArrowRight
                    size={18}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              <Link
                href="/services"
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white text-[15px] font-semibold transition-all hover:bg-white/20 border border-white/10"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  NAVIGATION CONTROLS                                           */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > currentSlide ? 1 : -1)}
            className="group relative h-2 rounded-full transition-all duration-500"
            style={{ width: i === currentSlide ? 32 : 8 }}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                i === currentSlide
                  ? "bg-[var(--color-islamabad-accent)]"
                  : "bg-white/30 group-hover:bg-white/50"
              }`}
            />
            {i === currentSlide && !isHovered && (
              <motion.span
                className="absolute inset-0 rounded-full bg-white/30 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: AUTOPLAY_DURATION / 1000,
                  ease: "linear",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-6 md:right-10 z-20 text-white/40 text-sm font-mono tracking-wider">
        <span className="text-white font-bold">{String(currentSlide + 1).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}