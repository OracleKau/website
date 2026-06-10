// app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";

export default function Home() {
  const [showEventCard, setShowEventCard] = useState(true);

  // Professional academic and technical stats
  const stats = [
    { num: "70+", label: "Active Members" },
    { num: "10+", label: "Live Projects" },
    { num: "5+", label: "Workshops" },
  ];

  return (
    <>
      {/* ───────────────── BACKGROUND (Core / Orbit Theme) ───────────────── */}
      
      {/* DEEP DARK BASE */}
      <div
        className="fixed inset-0 z-0"
        style={{ background: "linear-gradient(160deg, #0a0505 0%, #150a0a 50%, #200c0c 100%)" }}
      />

      {/* RADIAL BURST LINES */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-80"
        style={{
          backgroundImage: `
            repeating-conic-gradient(
              from 0deg at 105% 110%,
              rgba(180, 20, 20, 0.03) 0deg,
              rgba(180, 20, 20, 0.03) 1.5deg,
              transparent 1.5deg,
              transparent 9deg
            )
          `,
        }}
      />

      {/* ORBITAL RINGS */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden flex items-center justify-center opacity-70">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60vw] h-[60vw] min-w-[600px] min-h-[600px] rounded-full border border-[#ff4b4b]/[0.05] border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute w-[85vw] h-[85vw] min-w-[900px] min-h-[900px] rounded-full border border-white/[0.03]"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
          className="absolute w-[110vw] h-[110vw] min-w-[1200px] min-h-[1200px] rounded-full border border-[#ff4b4b]/[0.02] border-dashed"
        />
      </div>

      {/* PULSING CORE GLOW */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed z-[1] pointer-events-none"
        style={{
          top: "10%", left: "-5%",
          width: "700px", height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,75,75,0.2) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
      />

      {/* SECONDARY AMBIENT GLOW */}
      <div
        className="fixed z-[1] pointer-events-none"
        style={{
          bottom: "-10%", right: "10%",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(160,22,22,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* VIGNETTE & NOISE */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      <Navbar />

      {/* ───────────────── HERO ───────────────── */}
      <main className="relative z-[3] flex min-h-screen items-center px-6 md:px-10 pt-[96px] pb-[160px]">
        <div className="mx-auto w-full max-w-[1400px]">

          {/* HERO CONTENT */}
          <div className="max-w-[780px]">

            {/* BADGE */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase select-none bg-[#ff4b4b]/10 border-[#ff4b4b]/20 text-[#ff4b4b]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff4b4b] animate-pulse" />
              Official Student Club &middot; KAU Jeddah
            </motion.div>

            {/* PROFESSIONAL HEADLINE */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-BANANA text-[64px] md:text-[96px] font-medium leading-[0.95] tracking-tight text-white mb-6"
            >
              Bridging Theory 
              and Practice.<br />
              Building <span className="text-[#ff4b4b]">Real Impact.</span>
            </motion.h1>

            {/* PROFESSIONAL BODY */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 mb-12 max-w-[580px] text-[15px] font-medium leading-[1.75] text-white/60 md:text-[17px]"
            >
              Oracle Student Club empowers King Abdulaziz University students to transform academic knowledge into real-world solutions. We collaborate to design, build, and deploy live platforms that serve our campus and community.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/join"
                  className="flex items-center gap-2 rounded-full bg-[#ff4b4b] px-8 py-4 text-[12px] font-bold tracking-wider uppercase text-white shadow-lg shadow-red-900/40 transition-colors hover:bg-white hover:text-black"
                >
                  Apply for Fall 2026 <span className="text-[14px]">&rarr;</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/projects"
                  className="rounded-full border px-8 py-4 text-[12px] font-bold tracking-wider uppercase text-white transition-all bg-white/[0.04] border-white/10 hover:border-white/30 hover:bg-white/[0.08]"
                >
                  View Our Projects
                </Link>
              </motion.div>
            </motion.div>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-16 flex flex-wrap gap-10 md:gap-16 pt-8 border-t border-white/10 max-w-[600px]"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.72 + i * 0.08 }}
                  className="flex flex-col gap-1"
                >
                  <div className="text-[38px] font-semibold leading-none tracking-tight text-white drop-shadow-md">
                    {stat.num}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff4b4b]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </main>

      {/* ───────────────── FLOATING EVENT CARD ───────────────── */}
      <AnimatePresence>
        {showEventCard && (
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ delay: 0.9, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="fixed bottom-8 right-8 z-40 w-[360px] rounded-[24px] border border-white/10 bg-[#151212]/90 p-7 backdrop-blur-2xl shadow-2xl shadow-black/50"
          >
            {/* subtle inner top glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[24px]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% -20%, rgba(255,75,75,0.15) 0%, transparent 65%)",
              }}
            />

            <div className="relative z-10">
              {/* header row */}
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 rounded-full border border-[#ff4b4b]/20 bg-[#ff4b4b]/10 px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] text-[#ff4b4b] uppercase">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff4b4b]" />
                  Upcoming Event
                </div>

                <motion.button
                  whileHover={{ rotate: 90, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowEventCard(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  &#10005;
                </motion.button>
              </div>

              {/* title */}
              <h3 className="mb-5 text-lg font-semibold leading-snug text-white">
                Intro to Oracle Cloud Infrastructure
              </h3>

              {/* date + location row */}
              <div className="mb-6 flex items-end justify-between">
                <div className="leading-none">
                  <span className="font-BANANA text-[48px] text-white">
                    15
                  </span>
                  <span className="ml-2 text-[13px] font-bold tracking-widest text-[#ff4b4b]">JUN</span>
                  <div className="mt-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">4:00 PM</div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-white/70">Building 31, Room 204</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#ff4b4b]">Workshop</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 pt-2">
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/join"
                    className="block rounded-xl py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:brightness-110 bg-[#ff4b4b] shadow-md shadow-red-900/30"
                  >
                    RSVP Free &rarr;
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/projects"
                    className="block rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    Details
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}