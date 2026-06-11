// app/about/page.tsx
// This page provides a description of the Oracle Student Club's core values, mission,
// and basic metrics, accompanied by a dynamic canvas-based red binary matrix rain background.

"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useEffect, useRef } from "react";

// Drop object signature describing coordinate parameters for drawing canvas columns
type Drop = {
  x: number;
  y: number;
  speed: number;
  char: string;
  alpha: number;
};

export default function About() {
  // Reference hook pointing directly to the HTML5 canvas element
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize and run the binary matrix rain animation loop on layout mount
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const context = canvasEl.getContext("2d");
    if (!context) return;

    const canvas = canvasEl;
    const ctx = context;

    // Characters array to pull randomly from for matrix raindrops
    const bits = ["0", "1"];

    let animId: number;

    // Width of columns and font size configurations for rendering raindrops
    const colWidth = 36;
    const fontSize = 32;

    let drops: Drop[] = [];

    // Helper builder generating customized coordinate attributes for a column drop
    function makeDrop(x: number): Drop {
      return {
        x,
        y: Math.random() * -500,
        speed: 1 + Math.random() * 0.9,
        char: bits[Math.floor(Math.random() * bits.length)],
        alpha: 0.75 + Math.random() * 0.25,
      };
    }

    // Set screen boundaries and map drops list starting positions
    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Start rendering raindrops from 42% width of screen to right border
      const startX = canvas.width * 0.42;
      const cols = Math.floor((canvas.width - startX) / colWidth);

      drops = Array.from({ length: cols }, (_, i) =>
        makeDrop(startX + i * colWidth)
      );
    }

    // Main drawing loop clearing the screen and applying translation vectors
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `500 ${fontSize}px monospace`;

      const fadeStart = canvas.width * 0.42;
      const fadeEnd = canvas.width * 0.65;

      // Iterate and render each column raindrop
      for (const d of drops) {
        // Calculate transparency fade relative to its screen position
        const fadeFactor = Math.min(
          1,
          Math.max(0, (d.x - fadeStart) / (fadeEnd - fadeStart))
        );

        const finalAlpha = d.alpha * fadeFactor * 0.22;

        ctx.fillStyle = `rgba(255, 45, 45, ${finalAlpha})`;
        ctx.fillText(d.char, d.x, d.y);

        // Advance drop downward by its speed vector
        d.y += d.speed;

        // Reset drop position back to top when it traverses past bottom border
        if (d.y > canvas.height + fontSize) {
          const fresh = makeDrop(d.x);
          d.y = fresh.y;
          d.speed = fresh.speed;
          d.char = fresh.char;
          d.alpha = fresh.alpha;
        }
      }

      // Schedule next redraw frame iteration
      animId = requestAnimationFrame(draw);
    }

    // Recalculate columns mapping upon screen dimension changes
    const handleResize = () => init();

    init();
    draw();

    window.addEventListener("resize", handleResize);

    // Remove event listeners and cancel request animation loops upon component unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* ───────────────── BACKGROUND VISUAL LAYERS ───────────────── */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0a0505 0%, #150a0a 50%, #200c0c 100%)" }}
      >
        {/* Noise Texture backdrop */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            opacity: 0.05,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />

        {/* Fading Grid coordinates line overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 60%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 60%, transparent 100%)",
          }}
        />

        {/* Ambient background glowing orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] top-[-10%] h-[900px] w-[900px] rounded-full bg-[#8b2323] blur-[160px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1], x: [0, -60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[20%] h-[700px] w-[700px] rounded-full bg-[#4d1616] blur-[140px]"
        />
      </div>

      {/* Canvas backdrop container capturing matrix rain loop output */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" />

      <Navbar />

      {/* ───────────────── MAIN ABOUT LAYOUT SECTION ───────────────── */}
      <main className="relative z-[3] min-h-screen pt-[120px] flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full px-6 py-16 md:px-10 flex flex-col lg:grid lg:grid-cols-[1fr_1px_0.6fr] gap-16 lg:gap-0 items-center">

          {/* LEFT SECTION: Context copy headings */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.75 }}
            className="w-full lg:pr-20"
          >
            <h1 className="font-black leading-[1.1] tracking-tight text-white mb-8">
              <span className="block text-[32px] sm:text-[56px] lg:text-[72px]">
                More than a <span className="text-[#ff4b4b]">Study Group</span>.
              </span>
              <span className="block text-[32px] sm:text-[56px] lg:text-[72px] mt-2 sm:mt-0">
                We Learn. We Build. We Lead.
              </span>
            </h1>

            <div className="space-y-6 text-white/70 text-[16px] sm:text-[17px] leading-[1.8] max-w-[580px] font-medium">
              <p className="hover:text-white transition-colors duration-300">
                Most students study tech without building real systems. This club changes that by focusing on rigorous, real-world engineering experience.
              </p>
              <p className="hover:text-white transition-colors duration-300">
                Members collaborate closely on projects, participate in fast-paced hackathons, and build complete products that simulate modern industry environments.
              </p>
              <p className="hover:text-white transition-colors duration-300">
                Founded at KAU Jeddah in 2026, we bring together ambitious students who want to push boundaries and grow far beyond traditional classroom learning.
              </p>
            </div>
          </motion.div>

          {/* Vertical divider line separating text from stats */}
          <div className="hidden lg:block self-stretch bg-gradient-to-b from-transparent via-white/10 to-transparent w-[1px]" />

          {/* RIGHT SECTION: Metric statistics layout counters */}
          <div className="w-full lg:pl-20 grid grid-cols-3 lg:grid-cols-1 gap-8 lg:gap-0">
            {[
              { num: "70+", label: "Active\nMembers" },
              { num: "3+",  label: "Live\nProjects" },
              { num: "4",   label: "Departments" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                className="lg:py-8 lg:border-b border-white/10 last:border-0 group cursor-default"
              >
                <div className="text-white text-[40px] sm:text-[56px] font-black leading-none group-hover:scale-105 group-hover:text-[#ffb3b3] transition-all origin-left">
                  {item.num}
                </div>
                <div className="text-[#f4dede]/60 text-[10px] font-bold uppercase tracking-[0.25em] whitespace-pre-line mt-3 group-hover:text-white transition-colors">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}