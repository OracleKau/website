// app/about/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bits = ["0", "1"];

    let animId: number;
    const colWidth = 28;
    const fontSize = 20;

    type Drop = {
      x: number;
      y: number;
      speed: number;
      char: string;
      alpha: number;
    };

    let drops: Drop[] = [];

    function makeDrop(x: number): Drop {
      return {
        x,
        y: Math.random() * -300,
        speed: 0.35 + Math.random() * 0.30,   // moderate pace
        char: bits[Math.floor(Math.random() * bits.length)],
        alpha: 0.50 + Math.random() * 0.45,
      };
    }

    function init() {
      canvas!.width  = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      // Only populate the right 55% of the screen
      const startX = Math.floor(canvas!.width * 0.45);
      const cols   = Math.floor((canvas!.width - startX) / colWidth);
      drops = Array.from({ length: cols }, (_, i) => makeDrop(startX + i * colWidth));
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.font = `400 ${fontSize}px 'Banana', sans-serif`;

      // Fade mask: transparent on left edge of rain zone, opaque on right
      const fadeStart = canvas!.width * 0.45;
      const fadeEnd   = canvas!.width * 0.62;

      for (const d of drops) {
        // Calculate fade factor — 0 at fadeStart, 1 at fadeEnd
        const fade = Math.min(1, Math.max(0, (d.x - fadeStart) / (fadeEnd - fadeStart)));
        const fadedAlpha = d.alpha * fade * 0.55; // also reduce overall opacity
        ctx!.fillStyle = `rgba(80, 5, 5, ${fadedAlpha})`;
        ctx!.fillText(d.char, d.x, d.y);

        d.y += d.speed;

        if (d.y > canvas!.height + fontSize) {
          const fresh = makeDrop(d.x);
          d.y     = fresh.y;
          d.speed = fresh.speed;
          d.char  = fresh.char;
          d.alpha = fresh.alpha;
        }
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-[-5] pointer-events-none opacity-80"
      />

      <div className="design-background" />

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-10 py-6 text-[#191919] bg-[#FCF8F5]/40 backdrop-blur-md border-b border-[#931f1f]/5"
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.img
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              src="/logo.png"
              alt="Oracle Club Logo"
              className="w-8 h-8 object-contain rounded cursor-pointer"
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-none text-[#191919]">Oracle Club</span>
              <span className="text-[9px] text-[#931f1f] font-semibold tracking-widest uppercase mt-0.5">KAU · JEDDAH</span>
            </div>
          </Link>

          <div className="flex items-center gap-6 text-sm font-medium">
            <div className="bg-[#931f1f]/10 text-[#931f1f] text-[11px] px-3 py-1 rounded-full font-semibold border border-[#931f1f]/20 flex items-center gap-1.5 select-none">
              <span className="w-1 h-1 rounded-full bg-[#931f1f] animate-pulse"></span>
              Next event in 3 days
            </div>

            <Link href="/about"        className="relative nav-link-underline text-[#931f1f] font-bold">About</Link>
            <Link href="/projects"     className="relative nav-link-underline text-[#191919]">Projects</Link>
            <Link href="/members"      className="relative nav-link-underline text-[#191919]">Members</Link>
            <Link href="/events"       className="relative nav-link-underline text-[#191919]">Events</Link>
            <Link href="/sponsors"     className="relative nav-link-underline text-[#191919]">Sponsors</Link>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="bg-[#191919] text-white text-[11px] font-semibold px-4 py-2 rounded-full flex items-center gap-1 hover:bg-black transition-colors">
                Join us <span className="text-[9px] translate-y-[0.5px]">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* ── Main Layout ── */}
      <main className="relative min-h-screen pt-[80px] z-10 flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full px-10 py-16 grid grid-cols-[1fr_1px_0.6fr] gap-0 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="pr-16"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-7 h-[1.5px]" style={{ backgroundColor: "#2a0000" }} />
              <span className="font-banana text-[10px] font-normal tracking-[0.14em] uppercase" style={{ color: "#2a0000" }}>
                About / 01
              </span>
            </div>

            <h1
              className="font-banana text-[56px] sm:text-[72px] leading-[1.07] tracking-tight mb-7"
              style={{ color: "#0d0000" }}
            >
              More than a{" "}
              <em className="not-italic italic font-medium" style={{ color: "#1a0000" }}>
                study group
              </em>
              .<br />
              We{"'"}re an engineering team.
            </h1>

            <div
              className="space-y-5 max-w-[540px] font-banana text-[15px] leading-[1.80] font-normal"
              style={{ color: "#1e0202" }}
            >
              <p>
                Most CS students graduate having never shipped a real product. They{"'"}ve done
                assignments, taken exams, watched tutorials. Then they apply for jobs and realize
                the gap between school and industry.
              </p>
              <p>
                We exist to close that gap. Oracle Student Club operates like a real software
                company — sprints, pull requests, code reviews, deployed products with real users.
                Members leave with portfolios, certifications, and references that get them hired.
              </p>
              <p>
                Founded in 2026 at KAU Jeddah, we{"'"}re tech-forward, project-driven, and welcoming
                to anyone with curiosity — whether you{"'"}re a senior CS student or just learning
                your first language.
              </p>
            </div>
          </motion.div>

          {/* Vertical divider */}
          <div className="self-stretch" style={{ backgroundColor: "rgba(0,0,0,0.2)" }} />

          {/* RIGHT: stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="pl-16 flex flex-col justify-center"
          >
            {[
              { num: "50+", label: "Active\nMembers" },
              { num: "3",   label: "Live\nProjects" },
              { num: "4",   label: "Cross-Functional\nDepartments" },
            ].map(({ num, label }, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_auto] items-center py-6 px-4 rounded-xl transition-colors"
                style={{
                  borderTop: i === 0 ? "0.5px solid rgba(0,0,0,0.18)" : undefined,
                  borderBottom: "0.5px solid rgba(0,0,0,0.18)",
                }}
              >
                <span
                  className="font-banana text-[56px] leading-none tracking-tight"
                  style={{ color: "#0d0000" }}
                >
                  {num}
                </span>
                <span
                  className="font-banana text-[9px] font-semibold tracking-[0.13em] uppercase text-right leading-[1.6] whitespace-pre-line"
                  style={{ color: "#2a0000" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </main>
    </>
  );
}