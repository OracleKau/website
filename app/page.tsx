// app/page.tsx
// This is the core landing page (home) component for the Oracle Student Club website.
// It features a dynamic orbital theme, ambient glows, hero section, metrics counters, 
// a floating upcoming event card, and an interactive details modal overlay.

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import EventDetailsModal from "./components/EventDetailsModal";

// Local type signature defining upcoming events structure fetched from DB
type Event = {
  id: string;
  title: string;
  description?: string | null;
  date: string;
  location: string;
  locationLink?: string | null;
  type: string;
  rsvpLink?: string | null;
};

export default function Home() {
  // Local states managing floating calendar card visibility, upcoming events data, and detail modal open toggles
  const [showEventCard, setShowEventCard] = useState(true);
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statsData, setStatsData] = useState({ memberCount: 70, projectCount: 3, eventCount: 3 });

  // Read runtime environment variable flags to verify if join registrations are active
  const isRegOpen = process.env.NEXT_PUBLIC_REGISTRATION_OPEN === "true";

  // Fetch stats and the current upcoming scheduled event from API endpoint on mount
  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setStatsData({
            memberCount: data.memberCount ?? 70,
            projectCount: data.projectCount ?? 3,
            eventCount: data.eventCount ?? 3,
          });
        }
      })
      .catch((err) => console.error("Error fetching stats:", err));

    fetch("/api/events/upcoming")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          setUpcomingEvent(data);
        } else {
          setUpcomingEvent(null);
        }
      })
      .catch((err) => console.error("Error fetching upcoming event:", err));
  }, []);

  // Professional academic and technical stats counters list


  // Helper utility function calculating day offsets to display localized calendar text
  const getDaysLeftText = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    const d1 = Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    const d2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const diffMs = d1 - d2;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Next event today";
    if (diffDays === 1) return "Next event tomorrow";
    if (diffDays > 1) return `Next event in ${diffDays} days`;
    return "Event ongoing";
  };

  return (
    <>
      {/* ───────────────── BACKGROUND VISUAL LAYERS (Orbital Theme) ───────────────── */}

      {/* Deep baseline background gradient overlay */}
      <div
        className="fixed inset-0 z-0"
        style={{ background: "linear-gradient(160deg, #0a0505 0%, #150a0a 50%, #200c0c 100%)" }}
      />

      {/* Repeating fine radial lines burst effect simulating rays */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-80"
        style={{
          backgroundImage: `
            repeating-conic-gradient(
              from 0deg at 105% 110%,
              rgba(180, 20, 20, 0.03) 0deg,
              rgba(180, 20, 20, 0.03) 1.5deg,
              transparent 1.5deg,
              transparent 9deg
            )
          `,
        }}
      />

      {/* Dynamic orbital lines overlay, rotating infinitely using Framer Motion loops */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden flex items-center justify-center opacity-70">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60vw] h-[60vw] min-w-[600px] min-h-[600px] rounded-full border border-[#ff4b4b]/[0.05] border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute w-[85vw] h-[85vw] min-w-[900px] min-h-[900px] rounded-full border border-white/[0.03]"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
          className="absolute w-[110vw] h-[110vw] min-w-[1200px] min-h-[1200px] rounded-full border border-[#ff4b4b]/[0.02] border-dashed"
        />
      </div>

      {/* Primary pulsing radial glow overlay on the left border */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed z-[1] pointer-events-none"
        style={{
          top: "10%", left: "-5%",
          width: "700px", height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,75,75,0.2) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
      />

      {/* Secondary atmospheric background glow in the bottom-right region */}
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

      {/* Ambient vignette framing and noise texture block */}
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

      {/* Global Navbar element rendering the navigation bar */}
      <Navbar />

      {/* ───────────────── HERO SECTION ───────────────── */}
      <main className="relative z-[3] flex min-h-screen items-center px-6 md:px-10 pt-[96px] pb-[160px]">
        <div className="mx-auto w-full max-w-[1400px]">

          {/* Grid column wrapping hero copy */}
          <div className="max-w-[780px]">

            {/* Club authentication status pill badge with animated pulse dot */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase select-none bg-[#ff4b4b]/10 border-[#ff4b4b]/20 text-[#ff4b4b]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff4b4b] animate-pulse" />
              Official Student Club &middot; KAU Jeddah
            </motion.div>

            {/* Bold brand headline (uses custom BANANA typography font class) */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-BANANA text-[64px] md:text-[96px] font-medium leading-[0.95] tracking-tight text-white mb-6"
            >
              Bridging Theory
              and Practice.<br />
              Building <span className="text-[#ff4b4b]">Real Impact.</span>
            </motion.h1>

            {/* Professional introductory paragraph description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 mb-12 max-w-[580px] text-[15px] font-medium leading-[1.75] text-white/60 md:text-[17px]"
            >
              Oracle Student Club empowers King Abdulaziz University students to transform academic knowledge into real-world solutions. We collaborate to design, build, and deploy live platforms that serve our campus and community.
            </motion.p>

            {/* Call to action navigation redirect triggers */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              {isRegOpen && (
                <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/join"
                    className="flex items-center gap-2 rounded-full bg-[#ff4b4b] px-8 py-4 text-[12px] font-bold tracking-wider uppercase text-white shadow-lg shadow-red-900/40 transition-colors hover:bg-white hover:text-black"
                  >
                    Apply Now <span className="text-[14px]">&rarr;</span>
                  </Link>
                </motion.div>
              )}

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/projects"
                  className="rounded-full border px-8 py-4 text-[12px] font-bold tracking-wider uppercase text-white transition-all bg-white/[0.04] border-white/10 hover:border-white/30 hover:bg-white/[0.08]"
                >
                  View Our Projects
                </Link>
              </motion.div>
            </motion.div>


          </div>

        </div>
      </main>

      {/* ───────────────── FLOATING EVENT CARD (Bottom Right Panel) ───────────────── */}
      <AnimatePresence>
        {showEventCard && upcomingEvent && (
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ delay: 0.9, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="fixed bottom-8 right-8 z-40 w-[360px] rounded-[24px] border border-white/10 bg-[#151212]/90 p-7 backdrop-blur-2xl shadow-2xl shadow-black/50"
          >
            {/* Subtle inner top glow overlay */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[24px]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% -20%, rgba(255,75,75,0.15) 0%, transparent 65%)",
              }}
            />

            <div className="relative z-10">
              {/* Header section with blinking status dot and close button */}
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 rounded-full border border-[#ff4b4b]/20 bg-[#ff4b4b]/10 px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] text-[#ff4b4b] uppercase">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff4b4b]" />
                  Upcoming Event
                </div>

                <motion.button
                  whileHover={{ rotate: 90, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowEventCard(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  &#10005;
                </motion.button>
              </div>

              {/* Event headline title text */}
              <h3 className="mb-5 text-lg font-semibold leading-snug text-white">
                {upcomingEvent.title}
              </h3>

              {/* Calendar details and location indicators row */}
              <div className="mb-6 flex items-end justify-between">
                <div className="leading-none">
                  {/* Large date display (BANANA font style) */}
                  <span className="font-BANANA text-[48px] text-white">
                    {new Date(upcomingEvent.date).getDate()}
                  </span>
                  <span className="ml-2 text-[13px] font-bold tracking-widest text-[#ff4b4b]">
                    {new Date(upcomingEvent.date).toLocaleDateString("en-US", { month: "short" }).toUpperCase()}
                  </span>
                  <div className="mt-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                    {new Date(upcomingEvent.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                  </div>
                </div>

                {/* Location text or interactive map link */}
                <div className="text-right">
                  {upcomingEvent.locationLink ? (
                    <a
                      href={upcomingEvent.locationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#ff4b4b] hover:text-[#ff3d3d] hover:underline flex items-center gap-1 justify-end transition-colors cursor-pointer"
                    >
                      <svg className="w-3 h-3 text-[#ff4b4b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {upcomingEvent.location}
                    </a>
                  ) : (
                    <div className="text-xs font-semibold text-white/70">{upcomingEvent.location}</div>
                  )}
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#ff4b4b]">{upcomingEvent.type}</div>
                </div>
              </div>

              {/* Action trigger buttons */}
              <div className="flex items-center gap-3 pt-2">
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href={upcomingEvent.rsvpLink || "/join"}
                    className="block rounded-xl py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:brightness-110 bg-[#ff4b4b] shadow-md shadow-red-900/30"
                  >
                    RSVP Free &rarr;
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <button
                    onClick={() => setDetailsOpen(true)}
                    className="block rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    Details
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────────── EVENT DETAILS MODAL ───────────────── */}
      <EventDetailsModal
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        event={upcomingEvent}
      />
    </>
  );
}