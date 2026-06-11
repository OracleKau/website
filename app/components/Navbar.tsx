"use client";

// app/components/Navbar.tsx
// This component implements the main responsive navigation bar at the top of the pages.
// It supports active link styling, standard layout links, mobile dropdown menu toggles, 
// and an optional badge container (which is passed down from the parent layout/page).
// If no badge is provided from the parent component, it dynamically fetches the upcoming
// event and displays the countdown button on all pages automatically.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import EventDetailsModal from "./EventDetailsModal";

// List of links displayed in the center of the navigation bar
const LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/members", label: "Members" },
  { href: "/achievements", label: "Achievements" },
  { href: "/sponsors", label: "Sponsors" },
] as const;

// Next.js Event object structure matching database schema
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

// Interface for navigation parameters, permitting custom action buttons (CTA)
type NavbarProps = {
  cta?: { href: string; label: string };
};

export default function Navbar({ cta = { href: "/join", label: "Join us" } }: NavbarProps) {
  const pathname = usePathname();
  
  // State tracking whether the mobile slide-down menu is toggled open
  const [menuOpen, setMenuOpen] = useState(false);

  // Dynamic states for event badge and modal
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Fetch the upcoming event dynamically to show the countdown badge on all pages
  useEffect(() => {
    fetch("/api/events/upcoming")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          setUpcomingEvent(data);
        }
      })
      .catch((err) => console.error("Error fetching event in Navbar:", err));
  }, []);

  // Compute countdown remaining days relative to the current local date
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

  // Read the environment variable to determine if registrations are active
  const isRegOpen = process.env.NEXT_PUBLIC_REGISTRATION_OPEN === "true";
  
  // Hide CTA link on the registration screen unless registration window is explicitly set to open
  const showCta = cta.href !== "/join" || isRegOpen;

  // React hook preventing viewport scroll when mobile navbar drawer is expanded
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Clean-up side-effect automatically closing mobile navigation panel when pathname changes
  useEffect(() => {
    if (menuOpen) {
      setTimeout(() => setMenuOpen(false), 0);
    }
  }, [pathname, menuOpen]);

  // Class builder highlights the link text if the route matches the current active pathname
  const linkClass = (href: string) =>
    pathname === href
      ? "text-[#ff4b4b] font-semibold"
      : "text-white/75 hover:text-white transition-colors";

  // Use simple HTML anchor element for inline page anchors, otherwise Next.js Link component wrapper
  const CtaEl = cta.href.startsWith("#") ? "a" : Link;

  // Global event countdown badge button component
  const activeBadge = upcomingEvent && (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setDetailsOpen(true)}
      className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] uppercase bg-[#ff4b4b]/10 border-[#ff4b4b]/20 hover:border-[#ff4b4b]/40 hover:bg-[#ff4b4b]/20 text-[#ff4b4b] transition duration-200 cursor-pointer select-none mr-2 font-mono"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff4b4b] animate-pulse" />
      {getDaysLeftText(upcomingEvent.date)}
    </motion.button>
  );

  return (
    <>
      {/* Fixed container animated into place from top of screen on page load */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 bg-[#110808] border-b border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-4 md:py-5 flex items-center justify-between">
          
          {/* Brand Logo & Name linking back to home directory */}
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setMenuOpen(false)}>
            <motion.img
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              src="/logo.png"
              alt="Logo"
              className="w-8 h-8 object-contain rounded"
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-none text-white">Oracle Club</span>
              <span className="text-[9px] text-[#ff4b4b] font-semibold tracking-widest uppercase mt-0.5">
                KAU · JEDDAH
              </span>
            </div>
          </Link>

          {/* Desktop links block (hidden on mobile layouts) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {/* Optional notification badge slot */}
            {activeBadge}
            {LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
            {showCta && (
              <CtaEl
                href={cta.href}
                className="bg-white text-black text-[11px] font-semibold px-4 py-2 rounded-full hover:bg-[#ff4b4b] hover:text-white transition-all duration-300"
              >
                {cta.label}
              </CtaEl>
            )}
          </div>

          {/* Mobile menu hamburger toggle button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                // X icon when menu is open
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                // Hamburger menu icon when menu is closed
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drop-down link elements drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 px-5 py-4 flex flex-col gap-1">
            {activeBadge && <div className="mb-2 flex justify-center">{activeBadge}</div>}
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-3 rounded-lg text-sm font-medium ${linkClass(href)}`}
              >
                {label}
              </Link>
            ))}
            {showCta && (
              <CtaEl
                href={cta.href}
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-center bg-white text-black text-[11px] font-semibold px-4 py-3 rounded-full hover:bg-[#ff4b4b] hover:text-white transition-all duration-300"
              >
                {cta.label}
              </CtaEl>
            )}
          </div>
        )}
      </motion.nav>

      {/* Global details modal rendered natively within Navbar layout */}
      <EventDetailsModal
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        event={upcomingEvent}
      />
    </>
  );
}

