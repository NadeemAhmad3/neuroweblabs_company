"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ShieldCheck, Mail, Lock } from "lucide-react";

export default function AdminLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
        router.refresh(); // Force refresh to trigger middleware & cache invalidation
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An unexpected error occurred. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-islamabad-primary)] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[var(--color-islamabad-secondary)]/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] bg-[var(--color-islamabad-accent)]/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10"
      >
        <div>
          <div className="mx-auto w-16 h-16 bg-[var(--color-islamabad-accent)]/20 text-[var(--color-islamabad-accent)] rounded-2xl flex items-center justify-center shadow-inner border border-white/10 mb-6">
            <ShieldCheck size={36} />
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white mb-2 font-[family-name:var(--font-plus-jakarta)]">
            Admin Portal
          </h2>
          <p className="text-center text-sm text-white/60">
            Sign in with your administrator credentials
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Username or Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[var(--color-islamabad-accent)] focus:border-transparent text-white placeholder-white/30 transition-all font-medium"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[var(--color-islamabad-accent)] focus:border-transparent text-white placeholder-white/30 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-400 text-sm font-medium text-center bg-red-400/10 py-2 px-4 rounded-lg border border-red-400/20"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-[var(--color-islamabad-primary)] bg-[var(--color-islamabad-secondary)] hover:bg-[var(--color-islamabad-accent)] hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Secure Login"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
