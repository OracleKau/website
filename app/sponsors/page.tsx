// app/sponsors/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useState } from "react";

/* ─────────────────── DATA ─────────────────── */

const heroStats = [
  { value: "70+", label: "Active Members", note: "CS, AI & Engineering" },
  { value: "5+", label: "Projects Shipped", note: "Real products, real users" },
  { value: "15+", label: "Events per Year", note: "Hackathons, talks, demos" },
];

const activities = [
  {
    tag: "Annual",
    name: "OracleHack",
    desc: "Our flagship hackathon. Teams of 2–4 build and pitch a project in 24 hours. Open to all KAU students, judged by industry mentors.",
  },
  {
    tag: "Monthly",
    name: "Tech Talk Series",
    desc: "Practitioners from local and regional companies come in to share real-world experience with our members.",
  },
  {
    tag: "Semester",
    name: "Career Fair",
    desc: "A focused recruitment event where companies meet, interview, and recruit directly from our member community.",
  },
  {
    tag: "Ongoing",
    name: "Workshops",
    desc: "Hands-on skill sessions on topics like AI, web development, cloud, and data — run by members or hosted by a partner company.",
  },
  {
    tag: "Ongoing",
    name: "Open Projects",
    desc: "Members work in small teams on self-directed technical projects, with guidance from faculty and alumni mentors.",
  },
  {
    tag: "Annual",
    name: "Demo Day",
    desc: "End-of-year showcase where project teams present finished work to students, faculty, and invited industry guests.",
  },
];

const ways = [
  {
    icon: "◈",
    title: "Sponsor an Event",
    desc: "Fund or co-brand one of our events — a hackathon, workshop, or career fair. Your logo, your name, your presence on the day.",
    examples: ["OracleHack sponsor", "Workshop co-host", "Demo Day partner"],
  },
  {
    icon: "◉",
    title: "Host a Workshop",
    desc: "Bring your engineers or product team to run a hands-on session with our members. You define the topic, we handle the room.",
    examples: ["Technical deep-dives", "Career panels", "Live Q&A sessions"],
  },
  {
    icon: "◇",
    title: "Offer Mentorship",
    desc: "Connect your team with our members one-on-one or in small groups. Useful for them, great visibility for your employer brand.",
    examples: ["Resume reviews", "Project feedback", "Career path advice"],
  },
  {
    icon: "△",
    title: "Donate Tools or Credits",
    desc: "Software licences, cloud credits, API access, or hardware go a long way for a student club. In-kind support is always welcome.",
    examples: ["Cloud credits", "SaaS licences", "Dev tools"],
  },
  {
    icon: "○",
    title: "Recruit with Us",
    desc: "Post internship or full-time openings to our community. Or attend our career fair and meet candidates directly.",
    examples: ["Job board access", "Career fair booth", "On-campus interviews"],
  },
  {
    icon: "□",
    title: "Media Partnership",
    desc: "Cross-promote our events to your audience, or feature Oracle Club in your company blog or newsletter. We'll do the same.",
    examples: ["Newsletter feature", "Social co-posts", "Blog collaboration"],
  },
];

// ── Add logo filenames here. Place the actual files in /public/logos/ ──
const currentSponsors = [
  { name: "COCOON TREE", tier: "Workshop Host", logo: "/logos/cocoon-tree.png" },
  { name: "WADI JEDDAH", tier: "Workshop Host", logo: "/logos/Wadi-Jeddah.png" },
  { name: "ALMAQAM CAFE", tier: "Event Host", logo: "/logos/almaqam-cafe.png" },
  { name: "Innovation Hub", tier: "Tools Partner", logo: "/logos/innovation-hub.png" },
];

/* ─────────────────── BACKGROUND ─────────────────── */

function Background() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "linear-gradient(160deg, #0a0505 0%, #150a0a 50%, #200c0c 100%)" }} />
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.8,
          backgroundImage: "repeating-conic-gradient(from 0deg at 105% 110%, rgba(180,20,20,0.03) 0deg, rgba(180,20,20,0.03) 1.5deg, transparent 1.5deg, transparent 9deg)",
        }}
      />
      <div className="fixed inset-0 z-[2] pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.85) 100%)" }} />
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          opacity: 0.05,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}

/* ─────────────────── SECTION LABEL ─────────────────── */

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="px-10 max-w-[1200px] mx-auto">
      <div className="border-t border-white/[0.06] flex items-center gap-4 py-3">
        <span className="text-[9px] text-white/20 tracking-[0.3em] uppercase font-medium">{index}</span>
        <span className="w-px h-3 bg-white/10" />
        <span className="text-[9px] text-white/20 tracking-[0.3em] uppercase font-medium">{label}</span>
      </div>
    </div>
  );
}

/* ─────────────────── SPONSOR LOGO ─────────────────── */

function SponsorLogo({ name, logo }: { name: string; logo: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="w-14 h-14 mx-auto bg-white/[0.05] group-hover:bg-white/[0.09] rounded-full mb-5 flex items-center justify-center text-white/40 text-sm font-semibold transition-all duration-300">
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <div className="w-14 h-14 mx-auto mb-5 relative flex items-center justify-center">
      <Image
        src={logo}
        alt={`${name} logo`}
        fill
        className="object-contain rounded-full"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function Sponsors() {
  const [form, setForm] = useState({ name: "", org: "", email: "", kind: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (!form.name.trim() || !form.email.trim()) return;
    setSent(true);
  }

  return (
    <>
      <Background />

      <Navbar cta={{ href: "#contact", label: "Partner with us" }} />

      <main className="relative z-[3] text-white">

        {/* ══ HERO ═══════════════════════════════════════════════════ */}
        <section className="min-h-screen flex flex-col justify-center px-10 pt-32 pb-24">
          <div className="max-w-[1200px] mx-auto w-full">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="block w-6 h-px" style={{ background: "#ff3d3d" }} />
              <span className="text-[10px] tracking-[0.3em] font-semibold uppercase" style={{ color: "#ff3d3d" }}>
                Partnerships · 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-semibold tracking-tight leading-[1] mb-8"
              style={{ fontSize: "clamp(52px, 8vw, 104px)", textShadow: "none" }}
            >
              Support the next
              <br />
              <span style={{ color: "#ff3d3d" }}>generation of</span>
              <br />
              builders.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14 }}
              className="text-white/50 text-lg leading-relaxed max-w-[500px] mb-12"
            >
              Oracle Club is KAU's technology student community. We run hackathons,
              workshops, and projects year-round. Partnering with us is flexible —
              there's no fixed price tag, just a conversation about what works for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="text-white text-sm font-semibold px-8 py-3.5 rounded-full transition-all duration-300"
                style={{ background: "#ff3d3d" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#e02d2d"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#ff3d3d"; }}
              >
                Get in touch →
              </a>
              <a
                href="/oracle-sponsorship-deck.pdf"
                className="border border-white/20 text-white/80 text-sm font-medium px-8 py-3.5 rounded-full hover:border-white/40 hover:text-white transition-all duration-300"
              >
                Download Booklet
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-24 pt-10 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-3 gap-10 text-center"
            >
              {heroStats.map((s, i) => (
                <div key={i}>
                  <div className="text-[40px] font-semibold tracking-tight leading-none mb-1">{s.value}</div>
                  <div className="text-sm text-white font-medium mb-0.5">{s.label}</div>
                  <div className="text-xs text-white/35">{s.note}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <SectionLabel index="01" label="What We Do" />

        {/* ══ ACTIVITIES ═════════════════════════════════════════════ */}
        <section className="px-10 py-24">
          <div className="max-w-[1200px] mx-auto">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="text-[44px] font-semibold tracking-tight leading-tight"
                style={{ textShadow: "none" }}
              >
                Our events
                <br />
                <span style={{ color: "#ff3d3d" }}>& initiatives.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/40 text-sm max-w-[280px] leading-relaxed md:text-right"
              >
                These are the spaces where your support shows up — in front of
                real students doing real work.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activities.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.07] hover:border-white/[0.13] rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base">{a.name}</h3>
                    <span className="text-[9px] uppercase tracking-widest text-white/30 border border-white/[0.1] px-2.5 py-1 rounded-full">
                      {a.tag}
                    </span>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed">{a.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionLabel index="02" label="Ways to Get Involved" />

        {/* ══ WAYS TO PARTNER ════════════════════════════════════════ */}
        <section className="px-10 py-24">
          <div className="max-w-[1200px] mx-auto">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="text-[44px] font-semibold tracking-tight leading-tight"
                style={{ textShadow: "none" }}
              >
                How you can
                <br />
                <span style={{ color: "#ff3d3d" }}>support us.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/40 text-sm max-w-[300px] leading-relaxed md:text-right"
              >
                Every partnership is shaped around what's actually useful for
                both sides. Tell us what you have in mind and we'll figure it out together.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ways.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.07] hover:border-white/[0.13] rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300"
                >
                  <div>
                    <div className="text-xl mb-4 font-light" style={{ color: "#ff3d3d" }}>{w.icon}</div>
                    <h3 className="font-semibold text-base mb-3">{w.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{w.desc}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {w.examples.map((ex, j) => (
                      <span
                        key={j}
                        className="text-[9px] uppercase tracking-widest text-white/30 border border-white/[0.09] px-2.5 py-1 rounded-full"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="text-xs font-medium transition-colors duration-200"
                    style={{ color: "rgba(255,61,61,0.7)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ff3d3d"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,61,61,0.7)"; }}
                  >
                    Let's talk →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionLabel index="03" label="Current Sponsors" />

        {/* ══ CURRENT SPONSORS ═══════════════════════════════════════ */}
        <section className="px-10 py-24">
          <div className="max-w-[1200px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-[44px] font-semibold tracking-tight leading-tight mb-14"
              style={{ textShadow: "none" }}
            >
              Companies that
              <br />
              <span style={{ color: "#ff3d3d" }}>already support us.</span>
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {currentSponsors.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.07 }}
                  className="bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/[0.14] rounded-2xl p-8 text-center transition-all duration-300 group"
                >
                  <SponsorLogo name={s.name} logo={s.logo} />
                  <div className="font-semibold text-sm mb-2">{s.name}</div>
                  <span
                    className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: "#ff3d3d", background: "rgba(255,61,61,0.1)" }}
                  >
                    {s.tier}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionLabel index="04" label="Get in Touch" />

        {/* ══ CONTACT ════════════════════════════════════════════════ */}
        <section id="contact" className="px-10 py-24 pb-40">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className="text-[44px] font-semibold tracking-tight leading-tight mb-6"
                style={{ textShadow: "none" }}
              >
                Let's talk
                <br />
                <span style={{ color: "#ff3d3d" }}>and figure it out.</span>
              </h2>
              <p className="text-white/45 text-sm leading-relaxed mb-10 max-w-[360px]">
                No fixed packages, no awkward price lists. Tell us who you are and
                what you'd like to do — we'll suggest a partnership that makes sense
                for both sides.
              </p>

              <div className="flex flex-col gap-5 mb-10">
                {[
                  { icon: "@", label: "Email", value: "sponsors@oracle-kau.sa", href: "mailto:sponsors@oracle-kau.sa" },
                  { icon: "✕", label: "Twitter / X", value: "@OracleKAU", href: "https://twitter.com/OracleKAU" },
                ].map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4"
                  >
                    <div
                      className="w-10 h-10 shrink-0 rounded-full border border-white/[0.1] flex items-center justify-center text-white/40 text-sm transition-all duration-300"
                      style={{ "--hover-color": "#ff3d3d" } as React.CSSProperties}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#ff3d3d"; (e.currentTarget as HTMLElement).style.color = "#ff3d3d"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5">{c.label}</div>
                      <div
                        className="text-sm transition-colors duration-300"
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ff3d3d"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ""; }}
                      >{c.value}</div>
                    </div>
                  </a>
                ))}

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full border border-white/[0.1] flex items-center justify-center text-white/40 text-sm">
                    ◎
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5">Location</div>
                    <div className="text-sm">King Abdulaziz University, Jeddah</div>
                  </div>
                </div>
              </div>

              <div className="border border-white/[0.08] rounded-2xl p-6 bg-white/[0.02] flex items-center justify-between gap-6">
                <div>
                  <div className="text-sm font-semibold mb-1">Partnership Booklet</div>
                  <div className="text-xs text-white/35 leading-snug">
                    A quick overview of who we are and what we do.
                  </div>
                </div>
                <a
                  href="/oracle-sponsorship-deck.pdf"
                  className="shrink-0 bg-white text-black text-[11px] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#ff3d3d"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#fff"; (e.currentTarget as HTMLElement).style.color = "#000"; }}
                >
                  Download PDF
                </a>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {sent ? (
                <div
                  className="rounded-3xl p-16 text-center flex flex-col items-center gap-4 min-h-[400px] justify-center"
                  style={{ border: "1px solid rgba(255,61,61,0.25)", background: "rgba(255,61,61,0.04)" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2"
                    style={{ border: "1px solid rgba(255,61,61,0.4)", color: "#ff3d3d" }}
                  >
                    ✓
                  </div>
                  <div className="font-semibold text-lg">Message sent!</div>
                  <div className="text-white/40 text-sm">We'll be in touch within 48 hours.</div>
                </div>
              ) : (
                <div className="bg-white/[0.025] border border-white/[0.07] rounded-3xl p-8 flex flex-col gap-5">

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                        Your Name <span style={{ color: "#ff3d3d" }}>*</span>
                      </label>
                      <input
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Ahmed Al-Rashid"
                        className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors duration-200"
                        style={{ "--focus-border": "rgba(255,61,61,0.4)" } as React.CSSProperties}
                        onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,61,61,0.4)"; }}
                        onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Organisation</label>
                      <input
                        value={form.org}
                        onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
                        placeholder="Company name"
                        className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors duration-200"
                        onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,61,61,0.4)"; }}
                        onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                      Email <span style={{ color: "#ff3d3d" }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@company.com"
                      className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors duration-200"
                      onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,61,61,0.4)"; }}
                      onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                      How would you like to help?
                    </label>
                    <div className="relative">
                      <select
                        value={form.kind}
                        onChange={e => setForm(f => ({ ...f, kind: e.target.value }))}
                        className="w-full appearance-none border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors duration-200 cursor-pointer"
                        style={{ background: "#1c0c0c" }}
                        onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,61,61,0.4)"; }}
                        onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                      >
                        <option value="">Select an option…</option>
                        <option value="event">Sponsor an event</option>
                        <option value="workshop">Host a workshop</option>
                        <option value="mentorship">Offer mentorship</option>
                        <option value="tools">Donate tools or credits</option>
                        <option value="recruitment">Recruit with us</option>
                        <option value="media">Media partnership</option>
                        <option value="other">Something else</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">▾</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us a bit about your company and what you have in mind…"
                      className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors duration-200 resize-none"
                      onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,61,61,0.4)"; }}
                      onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!form.name.trim() || !form.email.trim()}
                    className="text-white font-semibold text-sm py-3.5 rounded-full transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "#ff3d3d" }}
                    onMouseEnter={e => { if (!(e.currentTarget as HTMLButtonElement).disabled) (e.currentTarget as HTMLElement).style.background = "#e02d2d"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#ff3d3d"; }}
                  >
                    Send message →
                  </button>

                  <p className="text-center text-white/20 text-[10px]">
                    We respond within 48 hours. No spam, ever.
                  </p>
                </div>
              )}
            </motion.div>

          </div>
        </section>

      </main>
    </>
  );
}