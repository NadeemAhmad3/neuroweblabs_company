"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings, LogOut, Menu, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Applications", href: "/admin/applications", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

function SidebarContent({ 
  pathname, 
  setMobileOpen 
}: { 
  pathname: string; 
  setMobileOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex flex-col h-full bg-[var(--color-islamabad-primary)] shadow-2xl">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-8 border-b border-white/10">
        <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 5L33 12.5V27.5L20 35L7 27.5V12.5L20 5Z" className="stroke-white/20" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M20 5L33 12.5L20 20L7 12.5L20 5Z" className="fill-white/10 stroke-white" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M20 20L33 12.5V27.5L20 35V20Z" className="fill-[var(--color-islamabad-secondary)]/10 stroke-[var(--color-islamabad-secondary)]" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M7 12.5L20 20V35L7 27.5V12.5Z" className="fill-[var(--color-islamabad-accent)]/20 stroke-[var(--color-islamabad-accent)]" strokeWidth="2" strokeLinejoin="round"/>
          <circle cx="20" cy="20" r="3.5" className="fill-[var(--color-islamabad-accent)] animate-pulse" />
        </svg>
        <span className="font-[family-name:var(--font-plus-jakarta)] font-bold text-xl text-white tracking-tight">
          Admin<span className="text-[var(--color-islamabad-accent)]">Portal</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          // Exact match for base /admin, otherwise startsWith for nested routes
          const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} onClick={() => setMobileOpen(false)}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "bg-[var(--color-islamabad-accent)] text-white shadow-lg shadow-[var(--color-islamabad-accent)]/20" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}>
                <Icon size={20} className={isActive ? "text-white" : ""} />
                <span className="font-semibold text-sm">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile/Logout Area */}
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-islamabad-accent)] to-[var(--color-islamabad-primary)] border border-white/20 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-bold text-white">Administrator</p>
          </div>
        </div>
        
        <button 
          onClick={async () => {
            await fetch('/api/admin/logout', { method: 'POST' });
            window.location.href = '/admin-login';
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-red-400 transition-colors duration-300"
        >
          <LogOut size={18} />
          <span className="font-semibold text-sm">Exit Admin</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 z-50">
        <SidebarContent pathname={pathname} setMobileOpen={setMobileOpen} />
      </aside>

      {/* Mobile Top Navbar & Trigger */}
      <div className="lg:hidden fixed top-0 w-full h-16 bg-[var(--color-islamabad-primary)] z-40 flex items-center justify-between px-6 shadow-md border-b border-white/10">
        <div className="flex items-center gap-2">
           <svg viewBox="0 0 40 40" className="w-6 h-6 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5L33 12.5V27.5L20 35L7 27.5V12.5L20 5Z" className="stroke-white/20" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M20 5L33 12.5L20 20L7 12.5L20 5Z" className="fill-white/10 stroke-white" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M20 20L33 12.5V27.5L20 35V20Z" className="fill-[var(--color-islamabad-secondary)]/10 stroke-[var(--color-islamabad-secondary)]" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M7 12.5L20 20V35L7 27.5V12.5Z" className="fill-[var(--color-islamabad-accent)]/20 stroke-[var(--color-islamabad-accent)]" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          <span className="font-bold text-white tracking-tight">AdminPortal</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white/80"><Bell size={20} /></button>
          <button onClick={() => setMobileOpen(true)} className="text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-[var(--color-islamabad-primary)]/40 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 z-50 bg-[var(--color-islamabad-primary)] shadow-2xl"
            >
              <button 
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white p-2"
              >
                <X size={24} />
              </button>
              <SidebarContent pathname={pathname} setMobileOpen={setMobileOpen} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}