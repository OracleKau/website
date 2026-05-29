// app/projects/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";

const CLUSTERS = [
  // TOP edge
  { x: 3,   y: 1,   p: [[0,0],[1,0],[2,0],[1,1]] },
  { x: 10,  y: 0.5, p: [[0,0],[1,0],[0,1],[0,2]] },
  { x: 18,  y: 1,   p: [[0,0],[1,0]] },
  { x: 25,  y: 0.5, p: [[0,0]] },
  { x: 32,  y: 1,   p: [[0,0],[1,0],[2,0],[0,1]] },
  { x: 42,  y: 0.5, p: [[0,0],[0,1]] },
  { x: 50,  y: 1,   p: [[0,0],[1,0],[2,0]] },
  { x: 58,  y: 0.5, p: [[0,0],[0,1],[0,2]] },
  { x: 65,  y: 1,   p: [[0,0],[1,0]] },
  { x: 72,  y: 0.5, p: [[0,0],[1,0],[2,0],[1,1],[2,1]] },
  { x: 80,  y: 1,   p: [[0,0],[0,1]] },
  { x: 87,  y: 0.5, p: [[0,0],[1,0],[2,0]] },
  { x: 93,  y: 1,   p: [[0,0],[0,1],[0,2],[0,3]] },
  // BOTTOM edge
  { x: 2,   y: 95,  p: [[0,0],[1,0],[2,0]] },
  { x: 10,  y: 94,  p: [[0,0],[0,1]] },
  { x: 18,  y: 95,  p: [[0,0],[1,0],[1,1]] },
  { x: 26,  y: 94,  p: [[0,0]] },
  { x: 33,  y: 95,  p: [[0,0],[1,0],[2,0],[0,1]] },
  { x: 42,  y: 94,  p: [[0,0],[0,1],[0,2]] },
  { x: 50,  y: 95,  p: [[0,0],[1,0]] },
  { x: 58,  y: 94,  p: [[0,0],[1,0],[2,0],[1,1]] },
  { x: 66,  y: 95,  p: [[0,0],[0,1]] },
  { x: 73,  y: 94,  p: [[0,0],[1,0],[2,0]] },
  { x: 81,  y: 95,  p: [[0,0],[0,1],[0,2]] },
  { x: 88,  y: 94,  p: [[0,0],[1,0]] },
  { x: 94,  y: 95,  p: [[0,0]] },
  // LEFT edge
  { x: 0.4, y: 12,  p: [[0,0],[0,1],[0,2]] },
  { x: 0.4, y: 20,  p: [[0,0],[1,0]] },
  { x: 0.4, y: 27,  p: [[0,0]] },
  { x: 0.4, y: 33,  p: [[0,0],[0,1],[0,2],[0,3]] },
  { x: 0.4, y: 42,  p: [[0,0],[1,0],[0,1]] },
  { x: 0.4, y: 50,  p: [[0,0],[0,1]] },
  { x: 0.4, y: 57,  p: [[0,0],[1,0],[2,0]] },
  { x: 0.4, y: 63,  p: [[0,0],[0,1],[0,2]] },
  { x: 0.4, y: 71,  p: [[0,0],[1,0]] },
  { x: 0.4, y: 77,  p: [[0,0],[0,1],[0,2],[0,3]] },
  { x: 0.4, y: 85,  p: [[0,0],[1,0],[0,1]] },
  // RIGHT edge
  { x: 97,  y: 12,  p: [[0,0],[0,1],[0,2],[0,3]] },
  { x: 97,  y: 20,  p: [[0,0],[1,0]] },
  { x: 97,  y: 27,  p: [[0,0],[0,1]] },
  { x: 97,  y: 33,  p: [[0,0],[1,0],[2,0]] },
  { x: 97,  y: 40,  p: [[0,0]] },
  { x: 97,  y: 47,  p: [[0,0],[0,1],[0,2]] },
  { x: 97,  y: 54,  p: [[0,0],[1,0],[0,1]] },
  { x: 97,  y: 61,  p: [[0,0],[0,1]] },
  { x: 97,  y: 68,  p: [[0,0],[1,0],[2,0],[0,1]] },
  { x: 97,  y: 75,  p: [[0,0],[0,1],[0,2]] },
  { x: 97,  y: 83,  p: [[0,0],[1,0]] },
];

const SP = 12;

export default function Projects() {
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Create a container appended directly to body so nothing can cover it
    const container = document.createElement("div");
    container.style.cssText =
      "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;";
    document.body.appendChild(container);

    function spawnCluster(idx: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const c = CLUSTERS[idx];
      const baseSize = 4 + (idx % 4) * 2;
      const dots: HTMLElement[] = [];

      c.p.forEach(([col, row]: number[], di: number) => {
        const size = Math.max(3.5, baseSize - di * 0.6);
        const dot = document.createElement("div");
        dot.style.cssText = `
          position:absolute;
          left:${(c.x / 100) * w + col * SP}px;
          top:${(c.y / 100) * h + row * SP}px;
          width:${size}px;
          height:${size}px;
          border-radius:50%;
          background:#8b1414;
          opacity:0;
          transition:opacity 0.5s ease;
        `;
        container.appendChild(dot);
        dots.push(dot);

        const t = setTimeout(() => {
          requestAnimationFrame(() => { dot.style.opacity = "0.85"; });
        }, di * 90);
        timers.push(t);
      });

      const hold = 1500 + Math.random() * 1000;
      const t2 = setTimeout(() => {
        dots.forEach(d => { d.style.opacity = "0"; });
        const t3 = setTimeout(() => dots.forEach(d => d.remove()), 550);
        timers.push(t3);
      }, hold);
      timers.push(t2);
    }

    CLUSTERS.forEach((_, idx) => {
      function loop() {
        spawnCluster(idx);
        const t = setTimeout(loop, 2200 + Math.random() * 1200);
        timers.push(t);
      }
      const t = setTimeout(loop, idx * 130 + Math.random() * 200);
      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
      container.remove();
    };
  }, []);

  const projects = [
    {
      num: "/01", status: "PUBLIC LIVE", name: "Oracle Club Website",
      desc: "The site you're on. Built by our web team in 4 weeks.",
      stack: ["Web", "CMS", "SEO"],
    },
    {
      num: "/02", status: "INTERNAL TOOL", name: "Club Operations Hub",
      desc: "Email sender, certificate maker, and AI-powered analytics all in one internal platform.",
      stack: ["React", "Python", "AI"],
    },
    {
      num: "/03", status: "FLAGSHIP", name: "KAU Event Platform",
      desc: "A free event management platform for every KAU club. QR check-ins, auto certificates, real-time analytics.",
      stack: ["Next.js", "Oracle DB", "QR"],
    },
  ];

  return (
    <>
      <style>{`body, html { background-color: #262525; }`}</style>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 w-full z-50 px-10 py-6"
        style={{
          background: "rgba(38,37,37,0.60)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(147,31,31,0.12)",
        }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain rounded" />
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-none text-white">Oracle Club</span>
              <span className="text-[9px] text-[#931f1f] font-semibold tracking-widest uppercase mt-0.5">KAU · JEDDAH</span>
            </div>
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/about"        className="text-white/70 hover:text-white nav-link-underline">About</Link>
            <Link href="/projects"     className="text-[#c85050] font-bold">Projects</Link>
            <Link href="/members"      className="text-white/70 hover:text-white nav-link-underline">Members</Link>
            <Link href="/achievements" className="text-white/70 hover:text-white nav-link-underline">Achievements</Link>
            <Link href="/contact"      className="text-white/70 hover:text-white nav-link-underline">Contact</Link>
            <Link href="/contact" className="bg-white text-[#191919] text-[11px] font-semibold px-4 py-2 rounded-full hover:bg-white/90 transition-colors">
              Join us
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Main */}
      <main
        className="relative pt-[220px] px-10 pb-40"
        style={{ backgroundColor: "#262525", minHeight: "100vh", zIndex: 10 }}
      >
        <div className="max-w-[1400px] mx-auto">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] font-mono tracking-widest text-[#931f1f] font-bold mb-6"
          >
            PROJECTS / 02
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-[64px] leading-[1.1] tracking-tight max-w-[900px] font-medium mb-4 text-white"
          >
            Three projects.<br />One semester.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 font-medium text-sm max-w-[550px] mb-16"
          >
            Real products built by our members, deployed to real users. Every line of code public on GitHub.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 max-w-[1300px]">
            {projects.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="backdrop-blur-md p-8 rounded-2xl flex flex-col justify-between min-h-[300px] cursor-pointer transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(147,31,31,0.35)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-white/30 mb-6">
                    <span>{p.num}</span>
                    <span
                      className="text-[10px] tracking-wide px-2 py-0.5 rounded-md"
                      style={{ color: "#c85050", background: "rgba(147,31,31,0.12)" }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-white mb-3">{p.name}</h3>
                  <p className="text-xs text-white/50 leading-relaxed font-medium">{p.desc}</p>
                </div>
                <div
                  className="flex gap-1.5 mt-8 pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {p.stack.map((s, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono font-bold px-2.5 py-1 rounded"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}