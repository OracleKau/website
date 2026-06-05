// app/members/page.tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { useState } from "react";

// ─── Social Platform Icons ────────────────────────────────────────────────────

const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const XIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ─── Social Links Component ───────────────────────────────────────────────────

type Social = {
  linkedin?: string;
  email?: string;
  github?: string;
  x?: string;
};

const SocialLinks = ({ social }: { social?: Social }) => {
  if (!social) return null;

  const links = [
    { key: "linkedin", href: social.linkedin,                                     icon: <LinkedInIcon />, label: "LinkedIn" },
    { key: "github",   href: social.github,                                       icon: <GitHubIcon />,  label: "GitHub"   },
    { key: "x",        href: social.x,                                            icon: <XIcon />,       label: "X"        },
    { key: "email",    href: social.email ? `mailto:${social.email}` : undefined, icon: <EmailIcon />,   label: "Email"    },
  ].filter((l): l is typeof l & { href: string } => Boolean(l.href));

  if (!links.length) return null;

  return (
    <div className="flex items-center gap-2 pt-3 border-t border-white/[0.08]">
      {links.map(({ key, href, icon, label }) => (
        <motion.a
          key={key}
          href={href}
          target={key !== "email" ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/35 hover:text-[#ff4b4b] hover:bg-[#ff4b4b]/10 hover:border-[#ff4b4b]/25 transition-colors duration-200"
        >
          {icon}
        </motion.a>
      ))}
    </div>
  );
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function Members() {
  const leadership = {
    presidents: [
      {
        initials: "AK",
        role: "PRESIDENT FOUNDER",
        name: "Ammar Koshak",
        academic: "Computer Science Senior",
        quote: "Started the club because we needed somewhere to actually build things instead of just learning about them.",
        social: {
          linkedin: "https://linkedin.com/in/ammarkoshak",
          email: "ammar.koshak@kau.edu.sa",
          github: "https://github.com/ammarkoshak",
          x: "https://x.com/ammarkoshak",
        },
      },
      {
        initials: "JA",
        role: "PRESIDENT FOUNDER",
        name: "Joud Alaskar",
        academic: "Computer Science Junior",
        quote: "If you cannot deploy it, it does not exist.",
        social: {
          linkedin: "https://linkedin.com/in/joudalaskar",
          email: "joud.alaskar@kau.edu.sa",
          github: "https://github.com/joudalaskar",
          x: "https://x.com/joudalaskar",
        },
      },
    ],
    heads: [
      // Tech
      {
        initials: "YS",
        role: "LEADER - TECH",
        name: "Yousef Al-Saud",
        academic: "Computer Science Senior",
        quote: "Code that ships beats code that is perfect.",
        social: {
          linkedin: "https://linkedin.com/in/yousefsaud",
          github: "https://github.com/yousefsaud",
          x: "https://x.com/yousef_saud",
        },
      },
      {
        initials: "AS",
        role: "VICE-LEADER - TECH",
        name: "Ali Al-Shahrani",
        academic: "Software Engineering Junior",
        quote: "Every bug is just a feature in disguise.",
        social: {
          linkedin: "https://linkedin.com/in/alishahrani",
          email: "ali.shahrani@kau.edu.sa",
          github: "https://github.com/alishahrani",
        },
      },
      // Media
      {
        initials: "SM",
        role: "LEADER - MEDIA",
        name: "Sara Mohammed",
        academic: "Design & Communications",
        quote: "Great work needs a great story behind it.",
        social: {
          linkedin: "https://linkedin.com/in/saramohammed",
          email: "sara.mohammed@kau.edu.sa",
          x: "https://x.com/sara_mohammed",
        },
      },
      {
        initials: "BZ",
        role: "VICE-LEADER - MEDIA",
        name: "Bader Al-Zahrani",
        academic: "Design Senior",
        quote: "Visuals speak before words ever do.",
        social: {
          linkedin: "https://linkedin.com/in/baderzahrani",
          x: "https://x.com/bader_zahrani",
        },
      },
      // Human Resources
      {
        initials: "FA",
        role: "LEADER - HR",
        name: "Fatima Al-Harbi",
        academic: "Business Administration",
        quote: "People first. Always.",
        social: {
          linkedin: "https://linkedin.com/in/fatimaharbi",
          email: "fatima.harbi@kau.edu.sa",
        },
      },
      {
        initials: "AA",
        role: "VICE-LEADER - HR",
        name: "Arwa Al-Assiri",
        academic: "Business Administration Junior",
        quote: "Culture is not built overnight, it is built every day.",
        social: {
          linkedin: "https://linkedin.com/in/arwaassiri",
          email: "arwa.assiri@kau.edu.sa",
          x: "https://x.com/arwa_assiri",
        },
      },
      // Public Relations
      {
        initials: "NQ",
        role: "LEADER - PR",
        name: "Noor Al-Qahtani",
        academic: "Marketing Junior",
        quote: "Every sponsor is a relationship, not a transaction.",
        social: {
          linkedin: "https://linkedin.com/in/noorqahtani",
          email: "noor.qahtani@kau.edu.sa",
          x: "https://x.com/noor_qahtani",
        },
      },
      {
        initials: "DA",
        role: "VICE-LEADER - PR",
        name: "Danah Al-Anazi",
        academic: "Communications Junior",
        quote: "Your brand is what people say when you are not in the room.",
        social: {
          linkedin: "https://linkedin.com/in/danahanazi",
          x: "https://x.com/danah_anazi",
        },
      },
    ],
  };

  const departments = [
    {
      id: "tech",
      label: "Tech",
      members: [
        {
          initials: "KM",
          name: "Khalid Mansour",
          academic: "Software Engineering Sophomore",
          social: { linkedin: "https://linkedin.com/in/khalidmansour", github: "https://github.com/khalidmansour" },
        },
        {
          initials: "RM",
          name: "Reem Al-Mutairi",
          academic: "Computer Science Junior",
          social: { linkedin: "https://linkedin.com/in/reemmutairi", github: "https://github.com/reemmutairi" },
        },
        {
          initials: "HB",
          name: "Hamad Al-Balawi",
          academic: "Information Systems Senior",
          social: {
            linkedin: "https://linkedin.com/in/hamadbalawi",
            github: "https://github.com/hamadbalawi",
            x: "https://x.com/hamad_balawi",
          },
        },
        {
          initials: "LO",
          name: "Lama Al-Otaibi",
          academic: "Computer Science Sophomore",
          social: { linkedin: "https://linkedin.com/in/lamaotaibi", github: "https://github.com/lamaotaibi" },
        },
      ],
    },
    {
      id: "pr",
      label: "Public Relations",
      members: [
        {
          initials: "FG",
          name: "Faisal Al-Ghamdi",
          academic: "Marketing Senior",
          social: { linkedin: "https://linkedin.com/in/faisalghamdi", email: "faisal.ghamdi@kau.edu.sa" },
        },
        {
          initials: "NA",
          name: "Nada Al-Ahmadi",
          academic: "Public Relations Sophomore",
          social: { linkedin: "https://linkedin.com/in/nadaahmadi", x: "https://x.com/nada_ahmadi" },
        },
        {
          initials: "WS",
          name: "Waleed Al-Subaie",
          academic: "Business Administration Junior",
          social: { linkedin: "https://linkedin.com/in/waleedsubaie", email: "waleed.subaie@kau.edu.sa" },
        },
      ],
    },
    {
      id: "media",
      label: "Media",
      members: [
        {
          initials: "SA",
          name: "Shahad Al-Aqeel",
          academic: "Visual Arts Junior",
          social: { linkedin: "https://linkedin.com/in/shahadaqeel", x: "https://x.com/shahad_aqeel" },
        },
        {
          initials: "MH",
          name: "Mona Al-Harbi",
          academic: "Graphic Design Sophomore",
          social: { linkedin: "https://linkedin.com/in/monaharbi", email: "mona.harbi@kau.edu.sa" },
        },
        {
          initials: "TK",
          name: "Tariq Al-Khaldi",
          academic: "Media Production Junior",
          social: { linkedin: "https://linkedin.com/in/tariqkhaldi", github: "https://github.com/tariqkhaldi" },
        },
        {
          initials: "RN",
          name: "Rana Al-Nasser",
          academic: "Design Senior",
          social: { linkedin: "https://linkedin.com/in/rananasser", x: "https://x.com/rana_nasser" },
        },
      ],
    },
    {
      id: "hr",
      label: "Human Resources",
      members: [
        {
          initials: "JM",
          name: "Joud Al-Malki",
          academic: "Human Resources Sophomore",
          social: { linkedin: "https://linkedin.com/in/joudmalki", email: "joud.malki@kau.edu.sa" },
        },
        {
          initials: "SK",
          name: "Saud Al-Kahtani",
          academic: "Management Senior",
          social: { linkedin: "https://linkedin.com/in/saudkahtani", x: "https://x.com/saud_kahtani" },
        },
        {
          initials: "HQ",
          name: "Hessa Al-Qahtani",
          academic: "Business Administration Junior",
          social: { linkedin: "https://linkedin.com/in/hessaqahtani", email: "hessa.qahtani@kau.edu.sa" },
        },
      ],
    },
  ];

  const [activeDept, setActiveDept] = useState<string | null>(null);
  const activeDepartment = departments.find((d) => d.id === activeDept);

  const cardClass =
    "bg-white/[0.04] backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex flex-col justify-between min-h-[240px] transition-all";

  const headPairs = [
    { dept: "Tech",  pair: [leadership.heads[0], leadership.heads[1]] },
    { dept: "Media", pair: [leadership.heads[2], leadership.heads[3]] },
    { dept: "HR",    pair: [leadership.heads[4], leadership.heads[5]] },
    { dept: "PR",    pair: [leadership.heads[6], leadership.heads[7]] },
  ];

  return (
    <>
      {/* ───────────────── ENHANCED DARK BACKGROUND ───────────────── */}
      <div
        className="fixed inset-0 z-0"
        style={{ background: "linear-gradient(160deg, #0a0505 0%, #150a0a 50%, #200c0c 100%)" }}
      />

      {/* RADIAL BURST LINES */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-80"
        style={{
          backgroundImage: `repeating-conic-gradient(from 0deg at 105% 110%, rgba(180, 20, 20, 0.03) 0deg, rgba(180, 20, 20, 0.03) 1.5deg, transparent 1.5deg, transparent 9deg)`,
        }}
      />

      {/* AMBIENT GLOWS */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed z-[1] pointer-events-none"
        style={{
          top: "10%", left: "-5%",
          width: "700px", height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,75,75,0.15) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
      />

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

      {/* ───────────────── MAIN CONTENT ───────────────── */}
      <main className="relative z-[3] pt-[140px] px-10 pb-40 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">

          {/* HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[700px] rounded-[40px] overflow-hidden border border-white/10 mb-24 shadow-2xl bg-black"
          >
            <img
              src="/members-hero.png"
              alt="Oracle Club Members"
              className="absolute inset-0 w-full h-full object-cover opacity-55 grayscale"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.15))" }}
            />
            <div className="absolute bottom-0 left-0 p-12 z-10 max-w-[760px]">
              <div className="text-[11px] tracking-[0.25em] text-[#ff4b4b] font-bold mb-6 uppercase">
                Oracle Club &middot; Team
              </div>
              <h1 className="text-[72px] leading-[0.95] tracking-tight font-semibold text-white">
                Meet the people
                <br />
                behind the club.
              </h1>
            </div>
          </motion.div>

          {/* LEADERSHIP SECTION TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <div className="text-[11px] tracking-[0.35em] text-[#ff4b4b] font-bold mb-6 uppercase">
              Leadership
            </div>

            <h2 className="font-BANANA text-[56px] leading-[1.1] tracking-tight font-medium mb-5 text-white">
              The Founding Crew.
            </h2>

            <div className="w-16 h-[2px] bg-[#ff4b4b]/60 mx-auto mb-6" />

            <p className="text-white/60 font-medium text-sm max-w-[640px] mx-auto leading-relaxed">
              The student leaders who started the club from scratch and run its four departments today.
            </p>
          </motion.div>

          {/* ORG CHART WRAPPER */}
          <div className="max-w-[1200px] mx-auto">

            {/* PRESIDENTS ROW */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-16">
              {leadership.presidents.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 45 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  className={`${cardClass} w-full max-w-[380px] border-white/20`}
                  style={{
                    background: "linear-gradient(135deg, rgba(147,31,31,0.18), rgba(255,255,255,0.03))",
                  }}
                >
                  {/* Top content */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="w-12 h-12 rounded-full bg-[#931f1f] text-white font-bold text-sm flex items-center justify-center select-none shadow-lg shadow-red-950/40"
                      >
                        {m.initials}
                      </motion.div>
                      <span className="text-[9px] font-bold tracking-[0.18em] text-[#ff4b4b] bg-[#ff4b4b]/10 px-3 py-1.5 rounded-full border border-[#ff4b4b]/20">
                        {m.role}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{m.name}</h3>
                    <div className="text-[11px] text-white/45 font-medium mb-5">{m.academic}</div>
                    <p className="text-sm text-white/70 italic leading-relaxed">
                      &quot;{m.quote}&quot;
                    </p>
                  </div>

                  {/* Social links — pushed to bottom by justify-between */}
                  <SocialLinks social={m.social} />
                </motion.div>
              ))}
            </div>

            {/* DEPT COLUMNS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {headPairs.map(({ dept, pair }, colIdx) => {
                const leader = pair[0];
                const vice = pair[1];
                return (
                  <div key={dept} className="flex flex-col gap-4">
                    {/* Dept Label */}
                    <div className="flex justify-center">
                      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/40 bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full">
                        {dept}
                      </span>
                    </div>

                    {/* Leader Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 45 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.16 + colIdx * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -8, scale: 1.015 }}
                      className={cardClass}
                      style={{ background: "linear-gradient(135deg, rgba(147,31,31,0.12), rgba(255,255,255,0.03))" }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <motion.div
                            whileHover={{ scale: 1.08 }}
                            className="w-11 h-11 rounded-full bg-[#931f1f] text-white font-bold text-xs flex items-center justify-center select-none shadow-lg shadow-red-950/40"
                          >
                            {leader.initials}
                          </motion.div>
                          <span className="text-[8px] font-bold tracking-[0.14em] px-2.5 py-1.5 rounded-full border text-[#ff4b4b] bg-[#ff4b4b]/10 border-[#ff4b4b]/20">
                            {leader.role}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-white mb-1">{leader.name}</h3>
                        <div className="text-[11px] text-white/45 font-medium mb-5">{leader.academic}</div>
                        <p className="text-sm text-white/70 italic leading-relaxed">
                          &quot;{leader.quote}&quot;
                        </p>
                      </div>
                      <SocialLinks social={leader.social} />
                    </motion.div>

                    {/* Vice Leader Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 45 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.21 + colIdx * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -8, scale: 1.015 }}
                      className={`${cardClass} border-white/[0.07] opacity-90`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <motion.div
                            whileHover={{ scale: 1.08 }}
                            className="w-11 h-11 rounded-full bg-[#931f1f] text-white font-bold text-xs flex items-center justify-center select-none shadow-lg shadow-red-950/40"
                          >
                            {vice.initials}
                          </motion.div>
                          <span className="text-[8px] font-bold tracking-[0.14em] px-2.5 py-1.5 rounded-full border text-white/50 bg-white/[0.06] border-white/10">
                            {vice.role}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-white mb-1">{vice.name}</h3>
                        <div className="text-[11px] text-white/45 font-medium mb-5">{vice.academic}</div>
                        <p className="text-sm text-white/70 italic leading-relaxed">
                          &quot;{vice.quote}&quot;
                        </p>
                      </div>
                      <SocialLinks social={vice.social} />
                    </motion.div>
                  </div>
                );
              })}
            </div>

          </div>

          <div className="my-28 border-t border-white/10" />

          {/* DEPARTMENTS SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div className="text-[11px] tracking-widest text-[#ff4b4b] font-bold mb-6 uppercase">
              Departments
            </div>
            <h2 className="font-BANANA text-[56px] leading-[1.1] tracking-tight max-w-[900px] mx-auto font-medium mb-4 text-white">
              Our Members.
            </h2>
            <p className="text-white/60 font-medium text-sm max-w-[600px] mx-auto mb-14 leading-relaxed">
              Select a department to meet the people behind it.
            </p>

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
                >
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1200px] mx-auto">
                    {activeDepartment.members.map((m, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="bg-white/[0.04] backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex flex-col gap-3 transition-all"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#931f1f]/70 text-white font-bold text-xs flex items-center justify-center select-none shadow-md shadow-red-950/30">
                          {m.initials}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white leading-snug">{m.name}</h3>
                          <div className="text-[11px] text-white/40 font-medium mt-1">{m.academic}</div>
                        </div>
                        {/* Social links for department members */}
                        <SocialLinks social={m.social} />
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