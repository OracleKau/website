"use client";

// app/components/EventDetailsModal.tsx
// This component displays a modal overlay with comprehensive details of a selected event,
// including date, time, location maps, a descriptive summary, and an RSVP link.
// It is designed to work both on the homepage and within the global navbar.

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Local types matching database schema
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

type EventDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
};

export default function EventDetailsModal({ isOpen, onClose, event }: EventDetailsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-[500px] rounded-[32px] border border-white/10 bg-[#151212]/95 p-8 shadow-2xl overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle inner top glow overlay */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[32px]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% -20%, rgba(255,75,75,0.18) 0%, transparent 65%)",
              }}
            />

            <div className="relative z-10 flex flex-col gap-6">
              {/* Header Row containing title pill and close trigger */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 rounded-full border border-[#ff4b4b]/20 bg-[#ff4b4b]/10 px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] text-[#ff4b4b] uppercase">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff4b4b]" />
                  {event.type} Details
                </div>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold text-white/40 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  &#10005;
                </motion.button>
              </div>

              {/* Event Title */}
              <div>
                <h3 className="text-xl font-semibold leading-snug text-white">
                  {event.title}
                </h3>
              </div>

              {/* Date, Time, and Location grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date & Time block */}
                <div className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <div className="p-2 bg-[#ff4b4b]/10 text-[#ff4b4b] rounded-lg shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/45">Date & Time</div>
                    <div className="text-xs font-semibold text-white mt-1">
                      {new Date(event.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </div>
                    <div className="text-[11px] text-white/50 mt-0.5">
                      {new Date(event.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                    </div>
                  </div>
                </div>

                {/* Location block */}
                <div className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <div className="p-2 bg-[#ff4b4b]/10 text-[#ff4b4b] rounded-lg shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/45">Location</div>
                    <div className="text-xs font-semibold text-white mt-1">{event.location}</div>
                    {event.locationLink && (
                      <a
                        href={event.locationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-[11px] text-[#ff4b4b] hover:text-[#ff3d3d] hover:underline font-semibold mt-1 transition-colors"
                      >
                        View Map
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Event Description */}
              {event.description && (
                <div className="flex flex-col gap-2">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/45">Event Details</div>
                  <p className="text-xs text-white/70 leading-relaxed whitespace-pre-wrap max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                    {event.description}
                  </p>
                </div>
              )}

              {/* Footer Buttons triggers RSVP and close actions */}
              <div className="flex items-center gap-3 border-t border-white/10 pt-4 mt-2">
                {event && new Date(event.date) < new Date() ? (
                  <div className="flex-[2] rounded-xl py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-white/40 bg-white/[0.04] border border-white/10 cursor-default select-none">
                    Event Ended
                  </div>
                ) : (
                  <motion.div
                    className="flex-[2]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      href={event.rsvpLink || "/join"}
                      onClick={onClose}
                      className="block rounded-xl py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:brightness-110 bg-[#ff4b4b] shadow-md shadow-red-900/30"
                    >
                      RSVP Free &rarr;
                    </Link>
                  </motion.div>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
