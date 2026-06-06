"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{ background: "linear-gradient(160deg, #0a0505 0%, #150a0a 50%, #200c0c 100%)" }}
      />
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-80"
        style={{
          backgroundImage: `repeating-conic-gradient(from 0deg at 105% 110%, rgba(180, 20, 20, 0.03) 0deg, rgba(180, 20, 20, 0.03) 1.5deg, transparent 1.5deg, transparent 9deg)`,
        }}
      />
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <div className="relative z-[3] min-h-screen flex items-center justify-center p-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[420px] bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="text-[10px] tracking-[0.3em] text-[#ff4b4b] font-bold mb-2 uppercase">
              Oracle Club
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">Admin Portal</h1>
            <p className="text-white/40 text-xs mt-2">
              Sign in with your leadership credentials
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/25 rounded-2xl p-4 mb-6 text-red-500 text-xs leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="leader@oracle-kau.sa"
                className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-colors duration-200 focus:border-[#ff4b4b]/40"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-colors duration-200 focus:border-[#ff4b4b]/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full text-white font-semibold text-sm py-3.5 rounded-full transition-all duration-300 bg-[#ff3d3d] hover:bg-[#e02d2d] disabled:opacity-40 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Verifying..." : "Sign In →"}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
