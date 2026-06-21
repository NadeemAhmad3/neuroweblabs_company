"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Cloud,
  Database,
  Server,
  Brain,
  Shield,
  Boxes,
  Workflow,
  GitBranch,
  Container,
  Layers,
  Cpu,
  Globe,
  Lock,
  Zap,
  Code2,
  Terminal,
  Monitor,
  Smartphone,
  Bot,
  Sparkles,
} from "lucide-react";

// ─── Technology Partners & Stack ──────────────────────────────────────────────
const partners = [
  { name: "Microsoft Azure", category: "Cloud" },
  { name: "AWS", category: "Cloud" },
  { name: "Google Cloud", category: "Cloud" },
  { name: "Oracle", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "Claude", category: "AI" },
  { name: "OpenAI", category: "AI" },
  { name: "LangChain", category: "AI" },
  { name: "Hugging Face", category: "AI" },
  { name: "TensorFlow", category: "AI" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "GitHub Actions", category: "DevOps" },
  { name: "Terraform", category: "DevOps" },
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Framework" },
  { name: "Node.js", category: "Framework" },
  { name: "TypeScript", category: "Framework" },
  { name: "Tailwind CSS", category: "Framework" },
  { name: "Figma", category: "Design" },
  { name: "Stripe", category: "Payments" },
  { name: "Vercel", category: "Platform" },
];

// Pre-computed lists sliced outside the component to prevent garbage collection and overhead on every render
const col1Partners = [...partners.slice(0, 12), ...partners.slice(0, 12)];
const col2Partners = [...partners.slice(12, 24), ...partners.slice(12, 24)];
const col3Partners = [...partners.slice(6, 18), ...partners.slice(6, 18)];

// ─── Realistic SVGs for Tech Brand Logos ─────────────────────────────────────────
const PARTNER_LOGOS: Record<string, React.ReactNode> = {
  "Microsoft Azure": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 18.736l8.802-12.04 5.92 5.093L24 3.736v15h-24z" fill="#0078d4" />
      <path d="M0 18.736l13.125-8.246 5.568 4.793 5.307-5.597v9.05z" fill="#50e6ff" />
    </svg>
  ),
  "AWS": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.02 21.03c4.15 0 7.82-1.91 9.84-4.83l-1.02-.75c-1.77 2.54-4.96 4.2-8.82 4.2-3.86 0-7.05-1.66-8.82-4.2l-1.02.75c2.02 2.92 5.69 4.83 9.84 4.83z" fill="#FF9900" />
      <path d="M10.84 10.97c-.36-.45-.63-.99-.63-1.68 0-1.26.85-2.29 2.47-2.29 1.63 0 2.47.99 2.47 2.29 0 .69-.27 1.23-.63 1.68l-3.68 4.35h4.35v1.31H9.86v-1.04l3.68-4.35H9.86v-1.31h.98zm8.68-2.18c-.46-.38-1.04-.57-1.74-.57-1.15 0-2.02.61-2.02 1.76 0 .97.64 1.49 1.74 1.78l.78.2c.79.2 1.13.48 1.13 1.01 0 .61-.59 1.01-1.42 1.01-.89 0-1.52-.38-1.92-.91l-.91.95c.61.85 1.66 1.31 2.83 1.31 1.76 0 2.87-.89 2.87-2.37 0-1.18-.75-1.8-2.06-2.13l-.78-.2c-.75-.19-1.01-.41-1.01-.81 0-.48.48-.77 1.17-.77.67 0 1.21.24 1.52.59l.86-.93z" fill="#FF9900" />
    </svg>
  ),
  "Google Cloud": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.39 7.61L12.75 3.7c-.46-.27-1.04-.27-1.5 0L4.61 7.61c-.46.27-.75.76-.75 1.29v7.8c0 .53.29 1.02.75 1.29l6.64 3.91c.46.27 1.04.27 1.5 0l6.64-3.91c.46-.27.75-.76.75-1.29V8.9c0-.53-.29-1.02-.75-1.29z" fill="#ECEFF1" />
      <path d="M12 12.75V22.2c.38 0 .75-.1 1.08-.29l6.64-3.91c.46-.27.75-.76.75-1.29V8.9L12 12.75z" fill="#4285F4" />
      <path d="M12 12.75L3.53 8.9v7.8c0 .53.29 1.02.75 1.29l6.64 3.91c.33.19.7.29 1.08.29V12.75z" fill="#34A853" />
      <path d="M12 12.75l8.47-3.85L13.83 5c-.46-.27-1.04-.27-1.5 0L3.53 8.9l8.47 3.85z" fill="#EA4335" />
    </svg>
  ),
  "Oracle": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#F80000" />
    </svg>
  ),
  "MongoDB": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1.5c-.3 0-.5.2-.6.4C10 5.5 8.2 9.8 8.2 13.5c0 4.2 2.1 6.5 3.8 7.3.3.1.5-.1.5-.4V1.8c0-.2-.2-.3-.5-.3z" fill="#13AA52" />
      <path d="M12 1.5c.3 0 .5.2.6.4 1.4 3.6 3.2 7.9 3.2 11.6 0 4.2-2.1 6.5-3.8 7.3-.3.1-.5-.1-.5-.4V1.8c0-.2.2-.3.5-.3z" fill="#499768" />
      <path d="M12 22.5c-.2 0-.3-.1-.3-.3v-1.7c0-.2.1-.3.3-.3s.3.1.3.3v1.7c0 .2-.1.3-.3.3z" fill="#13AA52" />
    </svg>
  ),
  "PostgreSQL": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.1 11.2c-.3-.9-.9-1.6-1.7-2.1-.2-.1-.5-.2-.7-.3.3-.8.4-1.6.4-2.5 0-2.4-1.9-4.3-4.3-4.3-1.6 0-3.1.9-3.8 2.3-.5.9-.6 2-.4 3-.9.3-1.7.8-2.3 1.5-.9 1-1.4 2.3-1.4 3.7 0 2 .9 3.8 2.4 4.9.4.3.9.5 1.4.6v3.2c0 .5.4.9.9.9h1.7c.5 0 .9-.4.9-.9v-1.7c1.3.3 2.7.3 4-.1v1.8c0 .5.4.9.9.9h1.7c.5 0 .9-.4.9-.9v-3.7c1-.7 1.8-1.7 2.1-2.9.1-.3.2-.6.2-.9V12c-.1-.3-.2-.5-.3-.8zM10.8 4.7c1.1 0 2.1.9 2.1 2.1s-.9 2.1-2.1 2.1-2.1-.9-2.1-2.1.9-2.1 2.1-2.1z" fill="#336791" />
    </svg>
  ),
  "Redis": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 6.5 12 11l10-4.5L12 2z" fill="#A41F13" />
      <path d="M2 11.5L12 16l10-4.5V9.5L12 14 2 9.5v2z" fill="#C92C1D" />
      <path d="M2 16.5L12 21l10-4.5v-2L12 19 2 14.5v2z" fill="#E5392A" />
    </svg>
  ),
  "Claude": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.57 2c-.41 0-.76.28-.85.68L8.3 18.91c-.08.38.16.76.54.85.39.08.77-.16.85-.54l1.39-6.3h4.84l1.39 6.3c.08.38.46.62.85.54.38-.08.62-.47.54-.85l-3.42-16.23a.874.874 0 00-.85-.68h-.83zm.67 4.15l1.63 7.37h-3.26l1.63-7.37z" fill="#E05B2B" />
    </svg>
  ),
  "OpenAI": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.743 12.316a4.298 4.298 0 00-.73-2.528l.192-.11a3.02 3.02 0 001.077-4.137 3.067 3.067 0 00-4.186-1.063l-.192.11a4.27 4.27 0 00-2.317-1.579A3.01 3.01 0 0011.66.862a3.067 3.067 0 00-2.312 3.864 4.3 4.3 0 00-1.587 2.312L7.57 6.928a3.02 3.02 0 00-4.137 1.077 3.067 3.067 0 001.063 4.186l.192.11A4.27 4.27 0 006.267 13.88a3.01 3.01 0 003.927 3.256 3.067 3.067 0 002.312-3.864 4.3 4.3 0 001.587-2.312l.192.11a3.02 3.02 0 004.137-1.077 3.067 3.067 0 00-1.063-4.186l-.192-.11a4.27 4.27 0 00-1.579-2.317zm-9.08 4.887a1.696 1.696 0 01-.637.126 1.7 1.7 0 01-1.688-1.503 2.76 2.76 0 011.5-2.617 2.765 2.765 0 012.617 1.5 1.705 1.705 0 01-1.792 2.494z" fill="#10A37F" />
    </svg>
  ),
  "LangChain": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#13B981" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12h6m-7 3a4 4 0 110-8h2m4 0a4 4 0 110 8h-2" />
    </svg>
  ),
  "Hugging Face": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#FFD214" />
      <circle cx="9" cy="10" r="1.2" fill="#000" />
      <circle cx="15" cy="10" r="1.2" fill="#000" />
      <path d="M8 14.5c1 1.5 2.5 2 4 2s3-.5 4-2" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  "TensorFlow": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.66 2.14L3.63 6.78v9.28l8.03 4.64 8.03-4.64V6.78l-8.03-4.64z" fill="#E53935" />
      <path d="M11.66 2.14v9.28L3.63 6.78l8.03-4.64z" fill="#FFB300" />
      <path d="M19.69 6.78l-8.03 4.64v9.28l8.03-4.64V6.78z" fill="#FF6F00" />
      <path d="M11.66 11.42L3.63 6.78v9.28l8.03 4.64V11.42z" fill="#FFA000" />
    </svg>
  ),
  "Docker": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.962 7.042h-2.18V9.22h2.18V7.042zm-2.766 0H9.016V9.22h2.18V7.042zm-2.766 0H6.25v9.22h2.18V7.042zm-2.766 0H3.484V9.22h2.18V7.042zm5.532-2.766h-2.18v2.18h2.18V4.276zm-2.766 0H9.016v2.18h2.18V4.276zm5.532 0h-2.18v2.18h2.18V4.276zm2.766 2.766h-2.18V9.22h2.18V7.042zm3.32-.577h-2.18v2.18h2.18V6.465z" fill="#2496ED" />
      <path d="M22.3 11.234c-.117-.065-.544-.22-1.155-.22-.387 0-.796.064-1.173.195-.494-.964-1.396-1.576-2.457-1.576-.566 0-1.1.18-1.54.498L15 10.66v4.613c0 2.21-1.79 4-4 4H4.5c-.83 0-1.5-.67-1.5-1.5 0-2.48 2.02-4.5 4.5-4.5h6.3l1.83-2.13c.27-.31.67-.49 1.1-.49.33 0 .66.11.93.31.57.43.7 1.24.28 1.82l-2.03 2.82c-.08.11-.08.27 0 .38l2.03 2.82c.2.27.3.59.3.92 0 .88-.72 1.6-1.6 1.6h-5.2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h7c3.31 0 6-2.69 6-6V12.18c0-.36-.18-.7-.49-.946z" fill="#2496ED" />
    </svg>
  ),
  "Kubernetes": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.66 2.14l-7.79 3.6c-.3.14-.52.44-.57.77l-1.39 8.6c-.05.32.07.64.31.86l6.63 5.8c.24.21.57.29.88.2l8.28-2.6c.32-.1.57-.36.65-.68l2.29-8.4c.09-.32-.01-.66-.25-.89l-7.14-6.8a1.002 1.002 0 00-1.9-.1zM12 5.5l5.22 4.97-1.68 6.13-6.04 1.9L4.85 14.7l1.02-6.28L12 5.5z" fill="#326CE5" />
    </svg>
  ),
  "GitHub Actions": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="#FFF" />
    </svg>
  ),
  "Terraform": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6V11L8.5 13.5V8.5L4 6Z" fill="#844FBA" />
      <path d="M9.5 3V8L14 10.5V5.5L9.5 3Z" fill="#844FBA" />
      <path d="M9.5 10.5V15.5L14 18V13L9.5 10.5Z" fill="#5F2B9D" />
      <path d="M15 6V11L19.5 13.5V8.5L15 6Z" fill="#844FBA" />
    </svg>
  ),
  "Next.js": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5l-4.5-6v6H11V8.5h1l4.5 6v-6H17.5v8h-1z" fill="#FFF" />
    </svg>
  ),
  "React": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(30 12 12)" stroke="#00D8FF" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(90 12 12)" stroke="#00D8FF" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(150 12 12)" stroke="#00D8FF" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill="#00D8FF" />
    </svg>
  ),
  "Node.js": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm-1 14.3v-8.6l-6 3.4 6 5.2zm8-5.2l-6-3.4v8.6l6-5.2z" fill="#68A063" />
    </svg>
  ),
  "TypeScript": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M12.9 16.85c-.45 0-.85-.06-1.2-.18-.35-.12-.65-.3-.9-.55-.25-.25-.44-.55-.57-.9l.95-.55c.18.45.45.8.8 1.05s.75.37 1.2.37c.38 0 .7-.08.95-.25s.38-.4.38-.7c0-.25-.1-.45-.3-.6s-.55-.3-.95-.45l-1.05-.35c-.5-.18-.9-.45-1.2-.8s-.45-.8-.45-1.35c0-.5.15-.95.45-1.3s.7-.6 1.2-.75c.5-.15 1-.22 1.5-.22.5 0 1 .07 1.45.2.45.13.8.35 1.05.65s.4.65.48 1.05l-.95.45c-.15-.4-.38-.7-.7-.9s-.7-.3-.13-.3c-.38 0-.7.08-.93.25s-.35.38-.35.65c0 .22.09.4.28.53s.47.25.85.37l1.05.35c.55.18.98.45 1.28.82s.45.82.45 1.4c0 .5-.15.95-.45 1.3s-.7.6-1.2.75c-.5.15-1.02.22-1.57.22zm-7.4-.15v-7.1H11v.95H8.75V16.7H7.75z" fill="#fff" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.9 2.29 1.62 1.18 1.18 2.54 2.56 5.51 2.56 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.9-2.29-1.62-1.18-1.18-2.54-2.56-5.51-2.56zm-6 6.4c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.9 2.29 1.62 1.18 1.18 2.54 2.56 5.51 2.56 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.9-2.29-1.62-1.18-1.18-2.54-2.56-5.51-2.56z" fill="#38BDF8" />
    </svg>
  ),
  "Figma": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2c-2.2 0-4 1.8-4 4s1.8 4 4 4h4V2H8z" fill="#F24E1E" />
      <path d="M8 10c-2.2 0-4 1.8-4 4s1.8 4 4 4h4v-8H8z" fill="#A259FF" />
      <path d="M8 18c-2.2 0-4 1.8-4 4s1.8 4 4 4c2.2 0 4-1.8 4-4v-4H8z" fill="#0ACF83" />
      <path d="M16 10c2.2 0 4-1.8 4-4s-1.8-4-4-4h-4v8h4z" fill="#FF7262" />
      <path d="M12 10h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4v-8z" fill="#1ABCFE" />
    </svg>
  ),
  "Stripe": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 9.24a4.13 4.13 0 00-3.64-2.15c-2.34 0-4.04 1.49-4.04 4.09 0 3.96 4.97 3.52 4.97 5.37 0 .74-.63 1.12-1.53 1.12a4.42 4.42 0 01-2.68-.97L11 19.34a7.18 7.18 0 004.28 1.41c2.47 0 4.67-1.47 4.67-4.2 0-4.22-5-3.64-5-5.46 0-.66.56-1.05 1.39-1.05a3.83 3.83 0 012.33.85L20 9.24zM5.5 8v12h2.8V8H5.5zm1.4-4.5a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2z" fill="#635BFF" />
    </svg>
  ),
  "Vercel": (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 22.5H0L12 1.5L24 22.5Z" fill="#FFF" />
    </svg>
  ),
};

// ─── Animated Background Icons ─────────────────────────────────────────────────
const floatingIcons = [
  { Icon: Cloud, x: "8%", y: "15%", delay: 0, duration: 6 },
  { Icon: Brain, x: "85%", y: "20%", delay: 1.2, duration: 7 },
  { Icon: Database, x: "15%", y: "75%", delay: 0.8, duration: 8 },
  { Icon: Server, x: "78%", y: "70%", delay: 2, duration: 6.5 },
  { Icon: Shield, x: "45%", y: "10%", delay: 0.5, duration: 7.5 },
  { Icon: Boxes, x: "92%", y: "45%", delay: 1.5, duration: 8 },
  { Icon: Workflow, x: "5%", y: "50%", delay: 2.5, duration: 7 },
  { Icon: GitBranch, x: "65%", y: "85%", delay: 0.3, duration: 6 },
  { Icon: Container, x: "30%", y: "90%", delay: 1.8, duration: 7.2 },
  { Icon: Layers, x: "55%", y: "5%", delay: 3, duration: 8.5 },
  { Icon: Cpu, x: "20%", y: "35%", delay: 0.9, duration: 6.8 },
  { Icon: Globe, x: "70%", y: "30%", delay: 2.2, duration: 7.8 },
  { Icon: Lock, x: "40%", y: "65%", delay: 1, duration: 6.2 },
  { Icon: Zap, x: "88%", y: "60%", delay: 2.8, duration: 7.5 },
  { Icon: Code2, x: "12%", y: "60%", delay: 0.6, duration: 8 },
  { Icon: Terminal, x: "60%", y: "55%", delay: 1.4, duration: 6.5 },
  { Icon: Monitor, x: "35%", y: "25%", delay: 2.6, duration: 7 },
  { Icon: Smartphone, x: "75%", y: "10%", delay: 0.2, duration: 8.2 },
  { Icon: Bot, x: "50%", y: "80%", delay: 1.6, duration: 6.8 },
  { Icon: Sparkles, x: "25%", y: "50%", delay: 3.2, duration: 7.5 },
];

export default function TechAlliance() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });

  return (
    <section className="relative w-full bg-[var(--color-islamabad-primary)] overflow-hidden">
      {/* ── Background Grid Pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Floating Tech Icons ── */}
      {floatingIcons.map(({ Icon, x, y, delay, duration }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: x, top: y }}
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: [0.02, 0.06, 0.02] } : {}}
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
            transition={{ duration: duration * 0.8, delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={28} className="text-white" strokeWidth={1} />
          </motion.div>
        </motion.div>
      ))}

      {/* ── Radial Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-islamabad-accent)]/5 blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 py-20 lg:py-28">
        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-islamabad-accent)]" />
              <span className="text-[12px] font-bold tracking-[0.15em] text-white/40 uppercase">
                Technology Alliance
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-islamabad-accent)]" />
            </div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.1] max-w-3xl mb-6">
              Powered by the{" "}
              <span className="text-[var(--color-islamabad-accent)]">
                best in class.
              </span>
            </h2>
            <p className="text-white/50 font-light max-w-xl text-lg">
              We partner with industry-leading platforms and integrate cutting-edge technologies to deliver enterprise-grade solutions.
            </p>
          </motion.div>
        </div>

        {/* ── Partner Marquee ── */}
        <div ref={gridRef} className="relative">
          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[var(--color-islamabad-primary)] to-transparent z-10 pointer-events-none" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--color-islamabad-primary)] to-transparent z-10 pointer-events-none" />

          {/* Column 1 - Scrolls Up */}
          <div className="flex gap-4 overflow-hidden h-[400px] lg:h-[500px] relative">
            <motion.div
              className="flex flex-col gap-4 w-1/2 lg:w-1/3"
              animate={gridInView ? { y: [0, -800] } : {}}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {col1Partners.map((partner, i) => (
                <PartnerBadge key={`col1-${i}`} partner={partner} index={i} />
              ))}
            </motion.div>

            {/* Column 2 - Scrolls Down */}
            <motion.div
              className="flex flex-col gap-4 w-1/2 lg:w-1/3"
              animate={gridInView ? { y: [-800, 0] } : {}}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {col2Partners.map((partner, i) => (
                <PartnerBadge key={`col2-${i}`} partner={partner} index={i + 12} />
              ))}
            </motion.div>

            {/* Column 3 - Scrolls Up (lg only) */}
            <motion.div
              className="hidden lg:flex flex-col gap-4 w-1/3"
              animate={gridInView ? { y: [0, -600] } : {}}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {col3Partners.map((partner, i) => (
                <PartnerBadge key={`col3-${i}`} partner={partner} index={i + 6} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 lg:mt-20 pt-12 border-t border-white/10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: "24+", label: "Technology Partners" },
              { value: "99.9%", label: "Platform Uptime" },
              { value: "50+", label: "Certified Engineers" },
              { value: "12", label: "Countries Deployed" },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <span className="block text-3xl lg:text-4xl font-extrabold font-[family-name:var(--font-plus-jakarta)] text-white tracking-tighter">
                  {stat.value}
                </span>
                <span className="text-xs text-white/40 uppercase tracking-[0.15em] font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PartnerBadge({ partner, index }: { partner: typeof partners[0]; index: number }) {
  const logo = PARTNER_LOGOS[partner.name] || (
    <div className="w-2 h-2 rounded-full shrink-0 bg-white/40" />
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 12) * 0.03 }}
      className="group relative flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] cursor-default text-white/80 hover:text-white"
    >
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10 flex items-center gap-3 w-full">
        {/* Realistic Logo */}
        <div className="flex items-center justify-center w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-110">
          {logo}
        </div>
        
        <span className="text-sm font-semibold tracking-tight truncate">
          {partner.name}
        </span>
        
        <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-white/30 group-hover:text-white/50 shrink-0">
          {partner.category}
        </span>
      </div>
    </motion.div>
  );
}