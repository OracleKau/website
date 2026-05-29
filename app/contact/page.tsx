// app/contact/page.tsx
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <div className="design-background" />
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 px-10 py-6 text-[#191919]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain rounded" />
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-none">Oracle Club</span>
              <span className="text-[9px] text-[#931f1f] font-semibold tracking-widest uppercase mt-0.5">KAU · JEDDAH</span>
            </div>
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/about" className="hover:text-black text-[#191919]">About</Link>
            <Link href="/projects" className="hover:text-black text-[#191919]">Projects</Link>
            <Link href="/members" className="hover:text-black text-[#191919]">Members</Link>
            <Link href="/achievements" className="hover:text-black text-[#191919]">Achievements</Link>
            <Link href="/contact" className="text-[#931f1f]">Contact</Link>
            <Link href="/contact" className="bg-[#191919] text-white text-[11px] font-semibold px-4 py-2 rounded-full hover:bg-black transition-colors">Join us</Link>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="relative pt-[220px] px-10 pb-40 text-[#191919]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-[11px] font-mono tracking-widest text-[#931f1f] font-bold mb-6">NOW RECRUITING</div>
          
          <h1 className="font-serif text-[64px] leading-[1.1] tracking-tight max-w-[900px] font-medium mb-6">
            Ready to ship <br />real things?
          </h1>
          <p className="text-sm leading-relaxed max-w-[550px] text-gray-600 font-medium mb-10">
            Applications for Fall 2026 are open. Every department is recruiting. Whether you code, design, market, or organize—there is a seat for you.
          </p>

          <div className="flex gap-4 mb-28">
            <button className="bg-[#931f1f] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-[#781717] transition-all">
              Apply now
            </button>
            <button className="bg-transparent border border-gray-300 text-gray-900 text-xs font-semibold px-6 py-3 rounded-full hover:border-black transition-all">
              Talk to a member
            </button>
          </div>

          {/* FOOTER BLOCK SPEC */}
          <div className="grid md:grid-cols-4 gap-8 border-t border-gray-200 pt-12 max-w-[1100px] text-xs">
            <div className="space-y-4">
              <div className="font-bold text-sm text-gray-900">Oracle Club</div>
              <p className="text-gray-500 leading-relaxed font-medium">
                A student-run engineering club at King Abdulaziz University, Jeddah. Building real software, shipping real products, training real engineers.
              </p>
            </div>
            <div className="space-y-3 font-medium text-gray-500 flex flex-col">
              <span className="font-bold uppercase tracking-wider text-gray-400 text-[10px]">Explore</span>
              <Link href="/about" className="hover:text-[#931f1f]">About</Link>
              <Link href="/projects" className="hover:text-[#931f1f]">Projects</Link>
              <Link href="/members" className="hover:text-[#931f1f]">Members</Link>
            </div>
            <div className="space-y-3 font-medium text-gray-500 flex flex-col">
              <span className="font-bold uppercase tracking-wider text-gray-400 text-[10px]">Get Involved</span>
              <Link href="/contact" className="hover:text-[#931f1f]">Join the club</Link>
              <Link href="/contact" className="hover:text-[#931f1f]">Sponsor us</Link>
              <Link href="/contact" className="hover:text-[#931f1f]">Volunteer</Link>
            </div>
            <div className="space-y-3 font-medium text-gray-500 flex flex-col">
              <span className="font-bold uppercase tracking-wider text-gray-400 text-[10px]">Connect</span>
              <a href="#" className="hover:text-[#931f1f]">X / Twitter</a>
              <a href="#" className="hover:text-[#931f1f]">LinkedIn</a>
              <a href="#" className="hover:text-[#931f1f]">Instagram</a>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}