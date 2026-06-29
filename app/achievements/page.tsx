"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

interface Achievement {
  id: string;
  year: string;
  title: string;
  text: string;
  imageUrl: string;
  image?: string;
}

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [statsData, setStatsData] = useState({ memberCount: 70, projectCount: 3, departmentCount: 3, eventCount: 5 });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setStatsData({
            memberCount: data.memberCount ?? 70,
            projectCount: data.projectCount ?? 3,
            departmentCount: data.departmentCount ?? 3,
            eventCount: data.eventCount ?? 3,
          });
        }
      })
      .catch((err) => console.error("Error fetching stats:", err));

    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAchievements(
            data.map((item) => ({
              ...item,
              image: item.imageUrl,
            }))
          );
        }
      })
      .catch((err) => console.error("Error fetching achievements:", err));
  }, []);

  return (
    <>
      {/* ─────────────────── BACKGROUND ─────────────────── */}

      <div
        className="fixed inset-0 z-0"
        style={{ background: "linear-gradient(160deg, #110808 0%, #1c0d0d 50%, #2a1010 100%)" }}
      />

      {/* FLOATING GEOMETRIC SHAPES */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">

        {/* LARGE WIREFRAME CUBE — top right */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute"
          style={{ top: "-80px", right: "-60px", width: "420px", height: "420px" }}
        >
          <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="80" y="80" width="200" height="200" stroke="rgba(180,30,30,0.22)" strokeWidth="1.2" />
            <rect x="140" y="140" width="200" height="200" stroke="rgba(180,30,30,0.14)" strokeWidth="1" />
            <line x1="80" y1="80" x2="140" y2="140" stroke="rgba(180,30,30,0.18)" strokeWidth="1" />
            <line x1="280" y1="80" x2="340" y2="140" stroke="rgba(180,30,30,0.18)" strokeWidth="1" />
            <line x1="80" y1="280" x2="140" y2="340" stroke="rgba(180,30,30,0.18)" strokeWidth="1" />
            <line x1="280" y1="280" x2="340" y2="340" stroke="rgba(180,30,30,0.18)" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* MEDIUM WIREFRAME CUBE — bottom left */}
        <motion.div
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute"
          style={{ bottom: "-40px", left: "-30px", width: "280px", height: "280px" }}
        >
          <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="50" width="140" height="140" stroke="rgba(160,25,25,0.20)" strokeWidth="1.2" />
            <rect x="90" y="90" width="140" height="140" stroke="rgba(160,25,25,0.12)" strokeWidth="1" />
            <line x1="50" y1="50" x2="90" y2="90" stroke="rgba(160,25,25,0.16)" strokeWidth="1" />
            <line x1="190" y1="50" x2="230" y2="90" stroke="rgba(160,25,25,0.16)" strokeWidth="1" />
            <line x1="50" y1="190" x2="90" y2="230" stroke="rgba(160,25,25,0.16)" strokeWidth="1" />
            <line x1="190" y1="190" x2="230" y2="230" stroke="rgba(160,25,25,0.16)" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* FLOATING OCTAHEDRON — center-right */}
        <motion.div
          animate={{ rotate: [0, 360], y: [0, -18, 0] }}
          transition={{ rotate: { duration: 35, repeat: Infinity, ease: "linear" }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute"
          style={{ top: "28%", right: "12%", width: "160px", height: "160px" }}
        >
          <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="80,10 150,80 80,150 10,80" stroke="rgba(200,35,35,0.30)" strokeWidth="1.3" fill="none" />
            <line x1="80" y1="10" x2="80" y2="150" stroke="rgba(200,35,35,0.15)" strokeWidth="1" />
            <line x1="10" y1="80" x2="150" y2="80" stroke="rgba(200,35,35,0.15)" strokeWidth="1" />
            <polygon points="80,35 125,80 80,125 35,80" stroke="rgba(200,35,35,0.20)" strokeWidth="1" fill="none" />
          </svg>
        </motion.div>

        {/* TRIANGLE — upper-left */}
        <motion.div
          animate={{ rotate: [0, -360], y: [0, 22, 0] }}
          transition={{ rotate: { duration: 50, repeat: Infinity, ease: "linear" }, y: { duration: 9, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute"
          style={{ top: "8%", left: "8%", width: "200px", height: "200px" }}
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="100,15 185,165 15,165" stroke="rgba(170,28,28,0.22)" strokeWidth="1.2" fill="none" />
            <polygon points="100,45 160,155 40,155" stroke="rgba(170,28,28,0.13)" strokeWidth="1" fill="none" />
            <line x1="100" y1="15" x2="100" y2="165" stroke="rgba(170,28,28,0.10)" strokeWidth="1" />
            <line x1="15" y1="165" x2="100" y2="90" stroke="rgba(170,28,28,0.10)" strokeWidth="1" />
            <line x1="185" y1="165" x2="100" y2="90" stroke="rgba(170,28,28,0.10)" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* SMALL WIREFRAME CUBE — mid-left */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute"
          style={{ top: "55%", left: "5%", width: "100px", height: "100px" }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="15" width="50" height="50" stroke="rgba(210,40,40,0.28)" strokeWidth="1.3" />
            <rect x="35" y="35" width="50" height="50" stroke="rgba(210,40,40,0.16)" strokeWidth="1" />
            <line x1="15" y1="15" x2="35" y2="35" stroke="rgba(210,40,40,0.22)" strokeWidth="1" />
            <line x1="65" y1="15" x2="85" y2="35" stroke="rgba(210,40,40,0.22)" strokeWidth="1" />
            <line x1="15" y1="65" x2="35" y2="85" stroke="rgba(210,40,40,0.22)" strokeWidth="1" />
            <line x1="65" y1="65" x2="85" y2="85" stroke="rgba(210,40,40,0.22)" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* HEXAGON — far right mid */}
        <motion.div
          animate={{ rotate: [0, 180], x: [0, 10, 0] }}
          transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, x: { duration: 11, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute"
          style={{ top: "60%", right: "5%", width: "140px", height: "140px" }}
        >
          <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="70,8 126,39 126,101 70,132 14,101 14,39" stroke="rgba(185,30,30,0.22)" strokeWidth="1.2" fill="none" />
            <polygon points="70,26 108,47 108,93 70,114 32,93 32,47" stroke="rgba(185,30,30,0.12)" strokeWidth="1" fill="none" />
            {[0, 1, 2, 3, 4, 5].map(i => {
              const a = (i * 60 - 90) * Math.PI / 180;
              return <line key={i} x1="70" y1="70" x2={70 + 62 * Math.cos(a)} y2={70 + 62 * Math.sin(a)} stroke="rgba(185,30,30,0.09)" strokeWidth="1" />;
            })}
          </svg>
        </motion.div>

        {/* TINY DIAMOND — bottom center */}
        <motion.div
          animate={{ rotate: [0, 360], y: [0, -12, 0] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute"
          style={{ bottom: "15%", left: "42%", width: "60px", height: "60px" }}
        >
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,4 56,30 30,56 4,30" stroke="rgba(220,45,45,0.40)" strokeWidth="1.5" fill="none" />
          </svg>
        </motion.div>

        {/* LARGE RING — background center */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "700px", height: "700px" }}
        >
          <svg viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="350" cy="350" r="320" stroke="rgba(150,20,20,0.07)" strokeWidth="1" strokeDasharray="8 16" />
            <circle cx="350" cy="350" r="260" stroke="rgba(150,20,20,0.05)" strokeWidth="1" strokeDasharray="4 20" />
          </svg>
        </motion.div>
      </div>

      {/* WARM RED GLOW */}
      <div
        className="fixed z-[1] pointer-events-none"
        style={{
          top: "20%", right: "10%",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(160,22,22,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* VIGNETTE */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)" }}
      />

      {/* NOISE GRAIN */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ─────────────────── HERO IMAGE ─────────────────── */}
      <div className="relative z-[2] w-full h-[520px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src="/hero-achievements.jpg"
          alt="Achievements Banner"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[11px] tracking-[0.28em] text-[#ff4b4b] font-bold mb-6">
              ACHIEVEMENTS / 03
            </div>
            <h1 className="text-white text-[78px] leading-[0.98] font-semibold tracking-tight">
              Building more
              <br />
              than projects.
            </h1>
            <p className="text-white/65 text-sm mt-7 max-w-[680px] mx-auto leading-relaxed">
              Every milestone represents students learning, building, collaborating, and{" "}
              <span className="text-[#ff4b4b] font-bold">creating real impact.</span>
            </p>
          </motion.div>
        </div>
      </div>

      <Navbar />

      {/* ─────────────────── MAIN CONTENT ─────────────────── */}
      <main className="relative z-[3] px-10 py-32">
        <div className="max-w-[1400px] mx-auto">

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-28"
          >
            {[
              { num: `${statsData.memberCount}+`, label: "Members" },
              { num: `${statsData.projectCount}+`, label: "Projects" },
              { num: `${statsData.eventCount}+`, label: "Workshops" },
              { num: `${statsData.departmentCount}`, label: "Departments" },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="border border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 text-center"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translate3d(0,0,0)" }}
              >
                <div className="text-[52px] font-semibold text-white mb-3">{s.num}</div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-[#ff4b4b]">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* SECTION TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div className="text-[11px] tracking-[0.25em] uppercase text-[#ff4b4b] font-bold mb-5">
              OUR MILESTONES
            </div>
            <h2 className="text-white text-[58px] leading-none font-semibold tracking-tight">
              Real impact.
              <br />
              Real experiences.
            </h2>
          </motion.div>

          {/* ACHIEVEMENTS GRID */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
            {achievements.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10 }}
                className="group bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[30px] overflow-hidden"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translate3d(0,0,0)" }}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6 }}
                    src={a.image}
                    alt={a.title}
                    className="w-full h-[250px] object-cover brightness-[0.82]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <div className="text-[11px] tracking-[0.2em] text-[#ff4b4b] font-bold">{a.year}</div>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-[28px] text-white font-semibold mb-4 leading-tight">{a.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{a.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}