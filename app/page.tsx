// app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showEventCard, setShowEventCard] = useState(true);

  return (
    <>
      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 z-[-10] overflow-hidden">
        <img
          src="/bg-pattern.png"
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />

      </div>

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-10 py-6 backdrop-blur-md border-b"
        style={{
          backgroundColor: "rgba(80, 5, 5, 0.45)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">

          {/* Logo — white text so it pops on dark red */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.img
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              src="/logo.png"
              alt="Oracle Club Logo"
              className="w-8 h-8 object-contain rounded cursor-pointer"
              style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.3))" }}
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-none text-white">Oracle Club</span>
              <span className="text-[9px] font-semibold tracking-widest uppercase mt-0.5" style={{ color: "#ffaaaa" }}>KAU · JEDDAH</span>
            </div>
          </Link>

          <div className="flex items-center gap-6 text-sm font-medium">
            {/* Event pill */}
            <div
              className="text-[11px] px-3 py-1 rounded-full font-semibold border flex items-center gap-1.5 select-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.2)",
                color: "#ffd4d4",
              }}
            >
              <span className="w-1 h-1 rounded-full bg-red-300 animate-pulse"/>
              Next event in 3 days
            </div>

            <Link href="/about"        className="relative nav-link-underline text-white/90 hover:text-white transition-colors">About</Link>
            <Link href="/projects"     className="relative nav-link-underline text-white/90 hover:text-white transition-colors">Projects</Link>
            <Link href="/members"      className="relative nav-link-underline text-white/90 hover:text-white transition-colors">Members</Link>
            <Link href="/achievements" className="relative nav-link-underline text-white/90 hover:text-white transition-colors">Achievements</Link>
            <Link href="/contact"      className="relative nav-link-underline text-white/90 hover:text-white transition-colors">Contact</Link>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="text-[11px] font-semibold px-4 py-2 rounded-full flex items-center gap-1 transition-colors"
                style={{ backgroundColor: "#fff", color: "#5f0000" }}
              >
                Join us <span className="text-[9px] translate-y-[0.5px]">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <main className="relative pt-[220px] px-10 pb-40">
        <div className="max-w-[1400px] mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[10px] tracking-wider px-3 py-1 rounded-full font-bold border inline-flex items-center gap-1.5 mb-10 select-none"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.2)",
              color: "#ffd4d4",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-300"/>
            NOW RECRUITING — FALL 2026
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[72px] leading-[1.05] tracking-tight max-w-[950px] font-medium mb-10 text-white"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
          >
            Building{" "}
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="italic font-medium inline-block cursor-pointer"
              style={{ color: "#ffb3b3" }}
            >
              real things
            </motion.span>
            {" "}at King Abdulaziz University.
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm leading-relaxed max-w-[520px] font-medium mb-12"
            style={{ color: "rgba(255,220,220,0.85)" }}
          >
            Oracle Student Club is where KAU students ship actual software not classroom exercises. We build platforms used by hundreds of students, earn certifications, and graduate ready for real engineering teams.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="text-[12px] font-semibold px-6 py-3 rounded-full flex items-center gap-1.5 shadow-lg transition-colors"
                style={{ backgroundColor: "#fff", color: "#5f0000" }}
              >
                Join the club <span className="text-[10px] translate-y-[0.5px]">→</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/projects"
                className="text-[12px] font-semibold px-6 py-3 rounded-full border transition-all"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "#fff",
                }}
              >
                See our work
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </main>

      {/* ── FLOATING EVENT CARD ── */}
      <AnimatePresence>
        {showEventCard && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="fixed bottom-10 right-10 z-40 w-[380px] p-6 rounded-2xl border shadow-2xl"
            style={{
              backgroundColor: "#111",
              borderColor: "rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div
                className="text-[10px] px-3 py-1 rounded-full font-bold border flex items-center gap-1.5 select-none"
                style={{
                  backgroundColor: "rgba(147,31,31,0.2)",
                  borderColor: "rgba(147,31,31,0.3)",
                  color: "#fff",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#931f1f]"/>
                UPCOMING — 3 DAYS
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.2 }}
                onClick={() => setShowEventCard(false)}
                className="text-gray-400 hover:text-white transition-colors text-xs p-1"
              >
                ✕
              </motion.button>
            </div>

            <h3 className="text-lg font-medium leading-snug mb-2.5">
              Intro to Oracle Cloud Infrastructure
            </h3>

            <div className="flex items-end justify-between text-[11px] text-gray-400 leading-snug mb-8">
              <div>
                <span className="text-white text-3xl font-medium tracking-tighter">15</span>
                <span className="text-[13px] font-semibold"> JUN · SUN</span>
                <br/>
                <span className="text-[10px] text-gray-500">4:00 PM</span>
              </div>
              <div className="text-right text-gray-400">
                Building 31, Room 204
                <br/>
                <span className="text-[10px] text-gray-500">Workshop</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.div className="flex-grow" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="block text-center text-white text-[12px] font-semibold py-3 rounded-xl transition-colors"
                  style={{ backgroundColor: "#931f1f" }}
                >
                  RSVP free →
                </Link>
              </motion.div>
              <Link
                href="/projects"
                className="text-[12px] font-medium text-white px-5 py-3 rounded-xl border transition-all"
                style={{ borderColor: "rgba(255,255,255,0.2)" }}
              >
                Details
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}