"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

interface Member {
  id: string;
  name: string;
  role: string;
  department: string;
  initials: string;
  academic: string;
  quote?: string | null;
  linkedin?: string | null;
  github?: string | null;
  twitter?: string | null;
  email?: string | null;
  imageUrl?: string | null;
  order: number;
  isLeadership: boolean;
}

const cardClass =
  "bg-white/[0.04] backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex flex-col gap-4 transition-all";

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [activeDept, setActiveDept] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMembers(data);
      })
      .catch((err) => console.error("Error fetching members:", err));
  }, []);

  const presidents = members
    .filter((m) => m.isLeadership && m.department === "presidency")
    .sort((a, b) => a.order - b.order);

  const deptIds = ["media", "pr", "tech"] as const;
  const departments = deptIds.map((id) => {
    const deptMembers = members.filter((m) => m.department === id);
    const leaders = deptMembers
      .filter((m) => m.isLeadership)
      .sort((a, b) => a.order - b.order);

    const head = leaders[0] || null;
    const vice = leaders[1] || null;

    const regularMembers = deptMembers
      .filter((m) => !m.isLeadership)
      .sort((a, b) => a.order - b.order);

    return {
      id,
      label: id === "pr" ? "Public Relations" : id.charAt(0).toUpperCase() + id.slice(1),
      head,
      vice,
      members: regularMembers,
    };
  });

  const activeDepartment = departments.find((d) => d.id === activeDept) ?? null;

  return (
    <>
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0" style={{ background: "linear-gradient(160deg, #0a0505 0%, #150a0a 50%, #200c0c 100%)" }} />
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-80" style={{ backgroundImage: `repeating-conic-gradient(from 0deg at 105% 110%, rgba(180,20,20,0.03) 0deg, rgba(180,20,20,0.03) 1.5deg, transparent 1.5deg, transparent 9deg)` }} />
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="fixed z-[1] pointer-events-none" style={{ top: "10%", left: "-5%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,75,75,0.15) 0%, transparent 60%)", filter: "blur(90px)" }} />
      <div className="fixed z-[1] pointer-events-none" style={{ bottom: "-10%", right: "10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(160,22,22,0.12) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="fixed inset-0 z-[2] pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.85) 100%)" }} />
      <div className="fixed inset-0 z-[2] pointer-events-none" style={{ opacity: 0.05, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "200px 200px" }} />

      <Navbar />

      <main className="relative z-[3] pt-[140px] px-10 pb-40 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">

          {/* HERO */}
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative w-full h-[700px] rounded-[40px] overflow-hidden border border-white/10 mb-24 shadow-2xl bg-black">
            <img src="/members-hero.png" alt="Oracle Club Members" className="absolute inset-0 w-full h-full object-cover opacity-55 grayscale" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.15))" }} />
            <div className="absolute bottom-0 left-0 p-12 z-10 max-w-[760px]">
              <div className="text-[11px] tracking-[0.25em] text-[#ff4b4b] font-bold mb-6 uppercase">Oracle Club &middot; Team</div>
              <h1 className="text-[72px] leading-[0.95] tracking-tight font-semibold text-white">Meet the people<br />behind the club.</h1>
            </div>
          </motion.div>

          {/* LEADERSHIP TITLE */}
          <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-20">
            <div className="text-[11px] tracking-[0.35em] text-[#ff4b4b] font-bold mb-6 uppercase">Leadership</div>
            <h2 className="font-BANANA text-[56px] leading-[1.1] tracking-tight font-medium mb-5 text-white">The Founding Crew.</h2>
            <div className="w-16 h-[2px] bg-[#ff4b4b]/60 mx-auto mb-6" />
            <p className="text-white/60 font-medium text-sm max-w-[640px] mx-auto leading-relaxed">
              The student leaders who started the club from scratch and run its departments today.
            </p>
          </motion.div>

          {/* LEADERS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto mb-28">
            {presidents.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 45 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.015 }}
                className={cardClass}
                style={{ background: "linear-gradient(135deg, rgba(147,31,31,0.18), rgba(255,255,255,0.03))" }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-full bg-[#931f1f] text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-red-950/40">
                    {m.initials || m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.15em] text-[#ff4b4b] bg-[#ff4b4b]/10 px-3 py-1.5 rounded-full border border-[#ff4b4b]/20">
                    {m.role}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white">{m.name}</h3>
              </motion.div>
            ))}
          </div>

          <div className="my-28 border-t border-white/10" />

          {/* DEPARTMENTS SECTION */}
          <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-center">
            <div className="text-[11px] tracking-widest text-[#ff4b4b] font-bold mb-6 uppercase">Departments</div>
            <h2 className="font-BANANA text-[56px] leading-[1.1] tracking-tight max-w-[900px] mx-auto font-medium mb-4 text-white">Our Members.</h2>
            <p className="text-white/60 font-medium text-sm max-w-[600px] mx-auto mb-14 leading-relaxed">
              Select a department to meet the people behind it.
            </p>

            {/* DEPT TABS */}
            <div className="flex flex-wrap justify-center gap-4 mb-14">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(activeDept === dept.id ? null : dept.id)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 ${
                    activeDept === dept.id
                      ? "bg-[#ff4b4b] text-white border-[#ff4b4b] shadow-lg shadow-red-900/40"
                      : "bg-white/[0.04] text-white/70 border-white/10 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {dept.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeDepartment && (
                <motion.div
                  key={activeDepartment.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[1200px] mx-auto"
                >
                  {/* HEAD & VICE */}
                  <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
                    {[activeDepartment.head, activeDepartment.vice].filter(Boolean).map((m, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -6, scale: 1.015 }}
                        className={`${cardClass} w-full max-w-[340px]`}
                        style={{ background: "linear-gradient(135deg, rgba(147,31,31,0.18), rgba(255,255,255,0.03))" }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-11 h-11 rounded-full bg-[#931f1f] text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-red-950/40">
                            {m.initials || m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                          <span className="text-[9px] font-bold tracking-[0.15em] text-[#ff4b4b] bg-[#ff4b4b]/10 px-3 py-1.5 rounded-full border border-[#ff4b4b]/20">
                            {m.role}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-white">{m.name}</h3>
                      </motion.div>
                    ))}
                  </div>

                  {/* MEMBERS */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {activeDepartment.members.map((m, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="bg-white/[0.04] backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex items-center gap-4 transition-all"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#931f1f]/70 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md shadow-red-950/30">
                          {m.initials || m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <h3 className="text-sm font-semibold text-white leading-snug">{m.name}</h3>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!activeDept && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3 text-white/25 text-sm font-medium"
                >
                  <div className="w-5 h-[1px] bg-white/20" />
                  Click a department above to see its members
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>
    </>
  );
}