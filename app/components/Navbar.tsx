"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/members", label: "Members" },
  { href: "/achievements", label: "Achievements" },
  { href: "/sponsors", label: "Sponsors" },
] as const;

type NavbarProps = {
  cta?: { href: string; label: string };
  badge?: React.ReactNode;
};

export default function Navbar({ cta = { href: "/join", label: "Join us" }, badge }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isRegOpen = process.env.NEXT_PUBLIC_REGISTRATION_OPEN === "true";
  const showCta = cta.href !== "/join" || isRegOpen;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      setTimeout(() => setMenuOpen(false), 0);
    }
  }, [pathname, menuOpen]);

  const linkClass = (href: string) =>
    pathname === href
      ? "text-[#ff4b4b] font-semibold"
      : "text-white/75 hover:text-white transition-colors";

  const CtaEl = cta.href.startsWith("#") ? "a" : Link;

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 bg-[#110808] border-b border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-4 md:py-5 flex items-center justify-between">
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

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {badge}
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

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-5 py-4 flex flex-col gap-1">
          {badge && <div className="mb-2 flex justify-center">{badge}</div>}
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
  );
}
