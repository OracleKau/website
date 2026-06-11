// app/projects/page.tsx
// This page displays a technical portfolio of student-led projects. It features
// a split view: a list selector on the left, and a detailed specifications panel on the right.
// Project data is fetched dynamically and field strings are parsed safely as JSON.

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// Local structures defining team members, capabilities, and detailed project items
type TeamMember = {
  initials: string;
  name: string;
  role: string;
};

type Capability = {
  title: string;
  desc: string;
};

type Project = {
  id: string;
  num: string;
  category: string;
  status: string;
  name: string;
  desc: string;
  capabilities: Capability[];
  technologies: string[];
  team: TeamMember[];
  github?: string;
  year: string;
};

// Transition configuration variables for the right details panel animations
const panelVariants = {
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(4px)" },
};

// SVG component rendering the GitHub brand logo
const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Projects() {
  // Local state tracking fetched projects array and currently active project index identifier
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Fetch project records from API route on mount, parsing database fields safely
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const parsed = data.map((p) => {
            try {
              // Parse stringified database columns into local arrays/objects safely
              return {
                ...p,
                capabilities: typeof p.capabilities === "string" ? JSON.parse(p.capabilities) : p.capabilities,
                technologies: typeof p.technologies === "string" ? JSON.parse(p.technologies) : p.technologies,
                team: typeof p.team === "string" ? JSON.parse(p.team) : p.team,
              };
            } catch (err) {
              console.error("Error parsing project fields for " + p.name, err);
              return p;
            }
          });
          setProjects(parsed);
          if (parsed.length > 0) {
            setActiveId(parsed[0].id);
          }
        }
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Compute reference to the currently active project
  const active = projects.find((p) => p.id === activeId) ?? projects[0];

  return (
    <>
      {/* ─────────────────── BACKGROUND LAYERS (Pipeline Theme) ─────────────────── */}
      <div
        className="fixed inset-0 z-0"
        style={{ background: "linear-gradient(160deg, #110808 0%, #1c0d0d 50%, #2a1010 100%)" }}
      />
      {/* Light linear lines repeating diagonal pattern overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 20px)",
        }}
      />

      {/* Floating decorative code symbols (brackets and braces) animated by Framer Motion */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden font-mono text-white/[0.03] select-none">
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] text-6xl"
        >
          {"</>"}
        </motion.div>
        <motion.div
          animate={{ y: [0, 40, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[25%] right-[15%] text-7xl"
        >
          {"{ }"}
        </motion.div>
        <motion.div
          animate={{ x: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[60%] left-[8%] text-8xl font-thin"
        >
          {"[ ]"}
        </motion.div>
      </div>

      {/* Ambient background glow shapes */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed z-[1] pointer-events-none"
        style={{
          top: "-10%", left: "-10%",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(160,22,22,0.15) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{ scale: [1.2, 1.2, 1.2], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="fixed z-[1] pointer-events-none"
        style={{
          bottom: "-20%", right: "0%",
          width: "800px", height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(220,30,30,0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)" }}
      />
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ─────────────────── HERO IMAGE SECTION ─────────────────── */}
      <div className="relative z-[2] w-full h-[520px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src="/hero-projects.jpg"
          alt="Projects Banner"
          className="w-full h-full object-cover grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[11px] tracking-[0.28em] text-[#ff4b4b] font-bold mb-6">PROJECTS / 2026</div>
            <h1 className="text-white text-[78px] leading-[0.98] font-semibold tracking-tight">
              Building products.
              <br />
              Solving problems.
            </h1>
            <p className="text-white/55 text-sm mt-7 max-w-[560px] mx-auto leading-relaxed">
              A technical portfolio of systems designed, built, and maintained by Oracle Club members.
            </p>
          </motion.div>
        </div>
      </div>

      <Navbar />

      {/* ─────────────────── MAIN CONTENT ─────────────────── */}
      <main className="relative z-[3] px-10 py-32">
        <div className="max-w-[1400px] mx-auto">

          {/* PORTFOLIO SECTION TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 text-center"
          >
            <div className="text-[11px] tracking-[0.25em] uppercase text-[#ff4b4b] font-bold mb-5">
              Technical Portfolio
            </div>
            <h2 className="text-white text-[58px] leading-none font-semibold tracking-tight mx-auto">
              Real code.
              <br />
              Real users.
            </h2>
            <p className="text-white/50 text-sm mt-6 max-w-[520px] mx-auto leading-relaxed">
              Select a project to explore its architecture, capabilities, and the team behind it.
            </p>
            <div className="w-16 h-[2px] bg-[#ff4b4b]/60 mx-auto mt-6" />
          </motion.div>

          {/* PROJECT SELECTOR + INTERACTIVE SPLIT VIEWER DETAIL */}
          <div className="grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-12 items-start">

            {/* LEFT SELECTOR: Vertical list of project tabs */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3 lg:sticky lg:top-32"
            >
              <div className="text-[10px] tracking-[0.22em] uppercase text-white/30 font-bold mb-1 px-1">
                Select Project
              </div>

              {projects.map((project) => {
                const isActive = project.id === activeId;
                return (
                  <motion.button
                    key={project.id}
                    onClick={() => setActiveId(project.id)}
                    whileHover={{ x: isActive ? 0 : 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={[
                      "relative w-full text-left rounded-2xl p-5 transition-all duration-300 border overflow-hidden",
                      isActive
                        ? "bg-white/[0.07] border-[#ff4b4b]/40 shadow-[0_0_30px_rgba(255,75,75,0.08)]"
                        : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20",
                    ].join(" ")}
                  >
                    {/* Visual sliding active indicator bar using Framer Motion layoutId */}
                    {isActive && (
                      <motion.div
                        layoutId="project-active-bar"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#ff4b4b] rounded-r-full"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}

                    {/* Project Category Tag & Number */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span
                        className={[
                          "text-[9px] tracking-[0.18em] font-bold uppercase px-2.5 py-1 rounded-full border",
                          isActive
                            ? "text-[#ff4b4b] bg-[#ff4b4b]/12 border-[#ff4b4b]/25"
                            : "text-white/40 bg-white/[0.04] border-white/10",
                        ].join(" ")}
                      >
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-white/20">{project.num}</span>
                    </div>

                    <h3
                      className={[
                        "text-[17px] font-semibold leading-snug mb-2 transition-colors",
                        isActive ? "text-white" : "text-white/70",
                      ].join(" ")}
                    >
                      {project.name}
                    </h3>

                    {/* Status & Build Year */}
                    <div className="flex items-center justify-between">
                      <span
                        className={[
                          "text-[9px] tracking-[0.16em] font-bold uppercase",
                          isActive ? "text-[#ff4b4b]/80" : "text-white/30",
                        ].join(" ")}
                      >
                        {project.status}
                      </span>
                      <span className="text-[10px] text-white/25 font-mono">{project.year}</span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* RIGHT DETAIL PANEL: Renders the active selected project specifications */}
            <div className="min-h-[640px]">
              {active ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    variants={panelVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden"
                  >
                    {/* Active Project header card metadata information */}
                    <div
                      className="relative px-10 pt-10 pb-8 border-b border-white/[0.06]"
                      style={{ background: "linear-gradient(135deg, rgba(147,31,31,0.14), rgba(0,0,0,0.2))" }}
                    >
                      {/* Background decorative index number */}
                      <div className="absolute -bottom-4 -right-2 text-[140px] font-bold text-white/[0.025] leading-none select-none pointer-events-none">
                        {active.num}
                      </div>

                      <div className="relative z-10 flex flex-wrap items-center gap-3 mb-6">
                        <span className="text-[9px] tracking-[0.2em] text-[#ff4b4b] font-bold uppercase bg-[#ff4b4b]/10 px-3 py-1.5 rounded-full border border-[#ff4b4b]/20">
                          {active.category}
                        </span>
                        <span className="text-[9px] tracking-[0.2em] text-white/45 font-bold uppercase bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/10">
                          {active.status}
                        </span>
                        <div className="flex items-center gap-4 ml-auto">
                          <span className="text-[10px] text-white/25 font-mono">{active.year}</span>
                          {/* GitHub link button wrapper details */}
                          {active.github && (
                            <motion.a
                              href={active.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-xl border border-[#ff4b4b]/30 text-[#ff4b4b] bg-[#ff4b4b]/5 hover:bg-[#ff4b4b]/10 hover:border-[#ff4b4b]/50 transition-colors"
                            >
                              <GitHubIcon />
                              GitHub
                            </motion.a>
                          )}
                        </div>
                      </div>

                      <h3 className="relative z-10 text-[42px] text-white font-semibold tracking-tight leading-[1.05] mb-4">
                        {active.name}
                      </h3>
                      <p className="relative z-10 text-[15px] text-white/60 leading-relaxed max-w-[680px]">
                        {active.desc}
                      </p>
                    </div>

                    <div className="px-10 py-10 space-y-12">

                      {/* Capabilities section detailing features built into the project */}
                      <section>
                        <div className="flex items-center gap-4 mb-7">
                          <h4 className="text-[10px] tracking-[0.24em] uppercase text-[#ff4b4b] font-bold">
                            Capabilities
                          </h4>
                          <div className="flex-1 h-px bg-white/[0.06]" />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {active.capabilities && active.capabilities.map((cap, i) => (
                            <motion.div
                              key={cap.title}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              whileHover={{ y: -4, borderColor: "rgba(255,75,75,0.25)" }}
                              className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors duration-300"
                            >
                              <div className="flex items-start gap-3.5">
                                <div className="mt-0.5 w-6 h-6 rounded-lg bg-[#ff4b4b]/10 border border-[#ff4b4b]/20 flex items-center justify-center text-[10px] font-mono font-bold text-[#ff4b4b] shrink-0 group-hover:bg-[#ff4b4b]/20 transition-colors">
                                  {String(i + 1).padStart(2, "0")}
                                </div>
                                <div>
                                  <h5 className="text-sm font-semibold text-white mb-1.5">{cap.title}</h5>
                                  <p className="text-[13px] text-white/45 leading-relaxed">{cap.desc}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </section>

                      {/* Technologies tags list detailing stacks used in building */}
                      <section>
                        <div className="flex items-center gap-4 mb-7">
                          <h4 className="text-[10px] tracking-[0.24em] uppercase text-[#ff4b4b] font-bold">
                            Technologies
                          </h4>
                          <div className="flex-1 h-px bg-white/[0.06]" />
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                          {active.technologies && active.technologies.map((tech, i) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.92 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.04, duration: 0.3 }}
                              whileHover={{ scale: 1.04, borderColor: "rgba(255,75,75,0.35)", color: "rgba(255,255,255,0.85)" }}
                              className="text-[11px] tracking-[0.12em] uppercase font-semibold px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-white/55 transition-colors duration-200 cursor-default"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </section>

                      {/* Team grid row mapping the student authors */}
                      <section>
                        <div className="flex items-center gap-4 mb-7">
                          <h4 className="text-[10px] tracking-[0.24em] uppercase text-[#ff4b4b] font-bold">
                            Team
                          </h4>
                          <div className="flex-1 h-px bg-white/[0.06]" />
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {active.team && active.team.map((member, i) => {
                            const isPm = member.name.includes("(PM)");
                            const displayName = member.name.replace(" (PM)", "");
                            return (
                              <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                                whileHover={{ 
                                  scale: 1.03, 
                                  backgroundColor: "rgba(255,255,255,0.05)",
                                  borderColor: "rgba(255,75,75,0.25)",
                                  boxShadow: "0 4px 20px -5px rgba(255,75,75,0.08)"
                                }}
                                className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.015] pl-2.5 pr-4 py-2 transition-all duration-300 cursor-default"
                              >
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff4b4b]/15 to-[#ff4b4b]/5 border border-[#ff4b4b]/20 text-[#ff4b4b] text-[10px] font-bold flex items-center justify-center shrink-0 shadow-inner">
                                  {member.initials}
                                </div>
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-xs font-semibold text-white/90 truncate leading-none">
                                    {displayName}
                                  </span>
                                  {isPm && (
                                    <span className="text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded-md bg-[#ff4b4b]/12 border border-[#ff4b4b]/25 text-[#ff4b4b] uppercase tracking-widest leading-none scale-[0.9]">
                                      PM
                                    </span>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </section>

                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex items-center justify-center h-[400px] border border-white/10 rounded-[32px] bg-white/[0.02] text-white/40 text-sm">
                  Loading project portfolio...
                </div>
              )}
            </div>
          </div>

          {/* Footer strip details */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 pt-8 border-t border-white/10 flex items-center justify-between text-xs font-medium text-white/30"
          >
            <p className="tracking-wider uppercase">Oracle Club · KAU · Jeddah</p>
            <Link
              href="/members"
              className="text-[#ff4b4b] font-bold tracking-wider uppercase hover:text-white transition-colors"
            >
              Meet the team →
            </Link>
          </motion.div>

        </div>
      </main>
    </>
  );
}

