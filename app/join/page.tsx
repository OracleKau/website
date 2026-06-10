// app/join/page.tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { useState } from "react";

/* ─────────────────── DATA ─────────────────── */

const APPLICATIONS_OPEN = false; // flip to true when cycle opens

const openRoles = [
  {
    dept: "Engineering",
    color: "#ff4b4b",
    roles: [
      { title: "Frontend Developer", spots: 3, skills: ["React", "TypeScript", "Tailwind"] },
      { title: "Backend Developer",  spots: 2, skills: ["Node.js", "PostgreSQL", "REST APIs"] },
      { title: "AI / ML Engineer",   spots: 2, skills: ["Python", "PyTorch", "LLMs"] },
    ],
  },
  {
    dept: "Design",
    color: "#ff8c4b",
    roles: [
      { title: "UI/UX Designer",       spots: 2, skills: ["Figma", "Prototyping", "Design Systems"] },
      { title: "Motion Designer",      spots: 1, skills: ["After Effects", "Lottie", "SVG Animation"] },
    ],
  },
  {
    dept: "Operations",
    color: "#ffcf4b",
    roles: [
      { title: "Events Coordinator",   spots: 2, skills: ["Planning", "Logistics", "Communication"] },
      { title: "Marketing & Content",  spots: 2, skills: ["Copywriting", "Social Media", "Photography"] },
      { title: "Sponsorship Lead",     spots: 1, skills: ["Sales", "Partnerships", "Outreach"] },
    ],
  },
];

const members = [
  { name: "Ammar Essam Koshak",        role: "Club President",              dept: "Leadership",   avatar: "A", calendly: "#", email: "ammar.koshak@kau.edu.sa" },
  { name: "Joud Yasser Alaskar",       role: "Club President",              dept: "Leadership",   avatar: "J", calendly: "#", email: "joud.alaskar@kau.edu.sa" },
  { name: "Mohammed Ahmad Justanieah", role: "Club Vice President",         dept: "Leadership",   avatar: "M", calendly: "#", email: "mohammed.justanieah@kau.edu.sa" },
  { name: "Shahad Khalid Kadasa",      role: "Human Resources Officer",     dept: "Operations",   avatar: "S", calendly: "#", email: "shahad.kadasa@kau.edu.sa" },
  { name: "Wihad Ahmed Alotaibi",      role: "Tech Department Leader",      dept: "Engineering",  avatar: "W", calendly: "#", email: "wihad.otaibi@kau.edu.sa" },
  { name: "Sedra Faisal Alyamani",     role: "Public Relations Leader",     dept: "Operations",   avatar: "S", calendly: "#", email: "sedra.yamani@kau.edu.sa" },
];

const deptColors: Record<string, string> = {
  Leadership:  "#ff4b4b",
  Engineering: "#4b8fff",
  Design:      "#ff8c4b",
  Operations:  "#4bffb5",
};

/* ─────────────────── BACKGROUND ─────────────────── */

function Background() {
  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "linear-gradient(160deg, #0a0505 0%, #150a0a 50%, #200c0c 100%)" }} />
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.8,
          backgroundImage:
            "repeating-conic-gradient(from 0deg at 105% 110%, rgba(180,20,20,0.03) 0deg, rgba(180,20,20,0.03) 1.5deg, transparent 1.5deg, transparent 9deg)",
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

/* ─────────────────── NOTIFY FORM ─────────────────── */

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit() {
    if (!email.trim()) return;
    // wire to your mailing list (Resend, Mailchimp, etc.)
    setDone(true);
  }

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 text-sm"
        >
          <div className="w-7 h-7 rounded-full border border-[#ff4b4b]/50 flex items-center justify-center text-[#ff4b4b] text-xs">✓</div>
          <span className="text-white/60">You're on the list — we'll email you when applications open.</span>
        </motion.div>
      ) : (
        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 flex-wrap">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            onKeyDown={e => e.key === "Enter" && submit()}
            className="bg-white/[0.06] border border-white/[0.1] focus:border-[#ff4b4b]/50 rounded-full px-5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors duration-200 w-64"
          />
          <button
            onClick={submit}
            disabled={!email.trim()}
            className="bg-[#ff4b4b] hover:bg-[#d93a3a] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300"
          >
            Notify me →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────── MEMBER CARD ─────────────────── */

function MemberCard({ m }: { m: typeof members[0] }) {
  const [open, setOpen] = useState(false);
  const color = deptColors[m.dept] ?? "#ff4b4b";

  return (
    <motion.div
      layout
      className="bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/[0.13]"
    >
      {/* Header */}
      <div className="p-6 flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold shrink-0"
          style={{ background: `${color}18`, color }}
        >
          {m.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{m.name}</div>
          <div className="text-xs text-white/40 mt-0.5">{m.role}</div>
        </div>
        <span
          className="text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0"
          style={{ color, background: `${color}15` }}
        >
          {m.dept}
        </span>
      </div>

      {/* Actions */}
      <div className="px-6 pb-5 flex gap-3">
        <a
          href={`mailto:${m.email}`}
          className="flex-1 text-center text-[11px] font-medium border border-white/[0.1] hover:border-white/25 text-white/50 hover:text-white rounded-xl py-2.5 transition-all duration-200"
        >
          Message
        </a>
        <button
          onClick={() => setOpen(o => !o)}
          className="flex-1 text-center text-[11px] font-medium rounded-xl py-2.5 transition-all duration-200"
          style={{ background: open ? `${color}22` : "rgba(255,255,255,0.04)", color: open ? color : "rgba(255,255,255,0.5)", border: `1px solid ${open ? color + "44" : "rgba(255,255,255,0.1)"}` }}
        >
          {open ? "Hide details" : "Book 1-on-1"}
        </button>
      </div>

      {/* Expanded booking */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 border-t border-white/[0.06]">
              <p className="text-xs text-white/40 leading-relaxed mb-4 mt-4">
                Book a short 1-on-1 with {m.name.split(" ")[0]} to ask questions about Oracle Club,
                get advice on applying, or just have a quick chat about the team.
              </p>
              <a
                href={m.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs font-semibold py-2.5 rounded-xl transition-all duration-200"
                style={{ background: `${color}22`, color, border: `1px solid ${color}33` }}
              >
                Open scheduling link →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function JoinUs() {
  const [activeDept, setActiveDept] = useState<string | null>(null);

  const filteredGroups = activeDept
    ? openRoles.filter(g => g.dept === activeDept)
    : openRoles;

  return (
    <>
      <Background />

      <Navbar />

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
              <span className="block w-6 h-px bg-[#ff4b4b]" />
              <span className="text-[10px] tracking-[0.3em] text-[#ff4b4b] font-semibold uppercase">
                Membership · 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-semibold tracking-tight leading-[0.92] mb-8"
              style={{ fontSize: "clamp(52px, 8vw, 104px)" }}
            >
              Build something
              <br />
              <span className="text-[#ff4b4b]">that matters,</span>
              <br />
              with us.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14 }}
              className="text-white/50 text-lg leading-relaxed max-w-[500px] mb-12"
            >
              Oracle Club is KAU's home for builders, designers, and problem solvers.
              We ship real products, run real events, and learn from each other every week.
            </motion.p>

            {/* Application status banner */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {APPLICATIONS_OPEN ? (
                <div className="inline-flex items-center gap-3 bg-[#ff4b4b]/10 border border-[#ff4b4b]/30 rounded-2xl px-6 py-4 mb-10">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4b4b] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff4b4b]" />
                  </span>
                  <span className="text-sm font-semibold text-[#ff4b4b]">Applications are open</span>
                  <span className="text-white/40 text-sm">·</span>
                  <a href="#apply" className="text-sm text-white/70 hover:text-white transition-colors duration-200">Apply now →</a>
                </div>
              ) : (
                <div className="inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.1] rounded-2xl px-6 py-4 mb-10">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white/30" />
                  </span>
                  <span className="text-sm text-white/50">Applications are currently closed</span>
                  <span className="text-white/20 text-sm">·</span>
                  <a href="#notify" className="text-sm text-white/60 hover:text-white transition-colors duration-200">Get notified →</a>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#roles"
                className="bg-[#ff4b4b] text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#d93a3a] transition-all duration-300"
              >
                See open roles →
              </a>
              <a
                href="#team"
                className="border border-white/20 text-white/80 text-sm font-medium px-8 py-3.5 rounded-full hover:border-white/40 hover:text-white transition-all duration-300"
              >
                Meet the team
              </a>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-24 pt-10 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-10"
            >
              {[
                { value: "700+", label: "Active Members",    note: "CS, AI & Engineering" },
                { value: "3",    label: "Departments",       note: "Engineering, Design, Ops" },
                { value: "15+",  label: "Open Roles",        note: "Across all departments" },
                { value: "48h",  label: "Response Time",     note: "After applying" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-[40px] font-semibold tracking-tight leading-none mb-1">{s.value}</div>
                  <div className="text-sm text-white font-medium mb-0.5">{s.label}</div>
                  <div className="text-xs text-white/35">{s.note}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <SectionLabel index="01" label="Get Notified" />

        {/* ══ NOTIFY ═════════════════════════════════════════════════ */}
        <section id="notify" className="px-10 py-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-[44px] font-semibold tracking-tight leading-tight mb-5">
                  Don't miss
                  <br />
                  <span className="text-[#ff4b4b]">the next cycle.</span>
                </h2>
                <p className="text-white/45 text-sm leading-relaxed max-w-[380px] mb-8">
                  We open applications once or twice a year. Leave your email and we'll send
                  you a heads-up the moment the next cycle opens — no spam, ever.
                </p>
                <NotifyForm />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/[0.025] border border-white/[0.07] rounded-3xl p-8 flex flex-col gap-6"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">
                  What happens after you apply
                </div>
                {[
                  { step: "01", title: "Application review",    desc: "We read every application carefully. Usually takes 3–5 days." },
                  { step: "02", title: "Short interview",        desc: "A 20-minute call with one of our leads — no prep needed, just a conversation." },
                  { step: "03", title: "Decision & onboarding", desc: "You'll hear back within 48 hours of the interview. If it's a yes, we get you set up right away." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <span className="text-[11px] text-[#ff4b4b] font-semibold tabular-nums mt-0.5 shrink-0">{item.step}</span>
                    <div>
                      <div className="text-sm font-semibold mb-1">{item.title}</div>
                      <div className="text-xs text-white/40 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <SectionLabel index="02" label="Open Roles" />

        {/* ══ OPEN ROLES ═════════════════════════════════════════════ */}
        <section id="roles" className="px-10 py-24">
          <div className="max-w-[1200px] mx-auto">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="text-[44px] font-semibold tracking-tight leading-tight"
              >
                Positions we're
                <br />
                <span className="text-[#ff4b4b]">looking to fill.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/40 text-sm max-w-[280px] leading-relaxed md:text-right"
              >
                These roles will be available when the next application cycle opens.
                Notify me above so you don't miss it.
              </motion.p>
            </div>

            {/* Dept filter */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {[null, ...openRoles.map(g => g.dept)].map((dept, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDept(dept)}
                  className="text-[10px] uppercase tracking-widest font-medium px-4 py-2 rounded-full border transition-all duration-200"
                  style={
                    activeDept === dept
                      ? { background: "#ff4b4b", color: "#fff", border: "1px solid #ff4b4b" }
                      : { background: "transparent", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)" }
                  }
                >
                  {dept ?? "All"}
                </button>
              ))}
            </motion.div>

            <div className="flex flex-col gap-8">
              {filteredGroups.map((group, gi) => (
                <motion.div
                  key={group.dept}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: gi * 0.07 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[9px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full"
                      style={{ color: group.color, background: `${group.color}18` }}
                    >
                      {group.dept}
                    </span>
                    <span className="h-px flex-1 bg-white/[0.06]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.roles.map((role, ri) => (
                      <div
                        key={ri}
                        className="group bg-white/[0.025] hover:bg-white/[0.045] border border-white/[0.07] hover:border-white/[0.14] rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold text-sm leading-snug">{role.title}</h3>
                          <span
                            className="text-[9px] font-semibold shrink-0 px-2.5 py-1 rounded-full"
                            style={{ color: group.color, background: `${group.color}18` }}
                          >
                            {role.spots} spot{role.spots !== 1 ? "s" : ""}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {role.skills.map((sk, si) => (
                            <span
                              key={si}
                              className="text-[9px] uppercase tracking-widest text-white/35 border border-white/[0.09] px-2.5 py-1 rounded-full"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>

                        {APPLICATIONS_OPEN ? (
                          <a
                            href="#apply"
                            className="mt-auto text-xs font-semibold text-center py-2.5 rounded-xl transition-all duration-200"
                            style={{ background: `${group.color}18`, color: group.color, border: `1px solid ${group.color}33` }}
                          >
                            Apply for this role →
                          </a>
                        ) : (
                          <a
                            href="#notify"
                            className="mt-auto text-xs text-white/30 hover:text-white/60 font-medium transition-colors duration-200"
                          >
                            Notify me when open →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Closed state callout */}
            {!APPLICATIONS_OPEN && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div>
                  <div className="font-semibold text-sm mb-1">Applications are closed right now.</div>
                  <div className="text-xs text-white/40 leading-relaxed">
                    These roles will open in the next recruitment cycle. Add your email to get notified first.
                  </div>
                </div>
                <a
                  href="#notify"
                  className="shrink-0 bg-white text-black text-[11px] font-semibold px-6 py-3 rounded-full hover:bg-[#ff4b4b] hover:text-white transition-all duration-300 whitespace-nowrap"
                >
                  Notify me →
                </a>
              </motion.div>
            )}
          </div>
        </section>

        <SectionLabel index="03" label="Talk to the Team" />

        {/* ══ CONTACT A MEMBER ═══════════════════════════════════════ */}
        <section id="team" className="px-10 py-24 pb-40">
          <div className="max-w-[1200px] mx-auto">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="text-[44px] font-semibold tracking-tight leading-tight"
              >
                Have questions?
                <br />
                <span className="text-[#ff4b4b]">Talk to us directly.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/40 text-sm max-w-[280px] leading-relaxed md:text-right"
              >
                Message any of our leads directly, or book a short 1-on-1 call — 
                no formality, just a conversation.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {members.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MemberCard m={m} />
                </motion.div>
              ))}
            </div>

            {/* General contact fallback */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div>
                <div className="font-semibold text-sm mb-1">Not sure who to reach out to?</div>
                <div className="text-xs text-white/40">
                  Drop us a general email and the right person will get back to you.
                </div>
              </div>
              <a
                href="mailto:hello@oracle-kau.sa"
                className="shrink-0 border border-white/20 text-white/80 text-[11px] font-semibold px-6 py-3 rounded-full hover:border-white/40 hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                hello@oracle-kau.sa →
              </a>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}