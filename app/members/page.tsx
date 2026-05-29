// app/members/page.tsx
import Link from "next/link";

export default function Members() {
  const leadership = [
    { initials: "AH", role: "PRESIDENT FOUNDER", name: "Ahmed Hassan", class: "Computer Science Senior Year", quote: "Started the club because we needed somewhere to actually build things instead of just learning about them." },
    { initials: "MA", role: "VICE PRESIDENT", name: "Mohammed Al-Nasser", class: "Software Engineering Junior", quote: "If you can't deploy it, it doesn't exist." },
    { initials: "YS", role: "HEAD OF TECH", name: "Yousef Al-Saud", class: "Computer Science Senior", quote: "Code that ships beats code that's perfect." },
    { initials: "SM", role: "HEAD OF MARKETING", name: "Sara Mohammed", class: "Design & Communications", quote: "Great work needs a great story behind it." },
    { initials: "FA", role: "HEAD OF HR", name: "Fatima Al-Harbi", class: "Business Administration", quote: "People first. Always." },
    { initials: "NQ", role: "HEAD OF PR", name: "Noor Al-Qahtani", class: "Marketing Junior", quote: "Every sponsor is a relationship, not a transaction." }
  ];

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
            <Link href="/members" className="text-[#931f1f]">Members</Link>
            <Link href="/achievements" className="hover:text-black text-[#191919]">Achievements</Link>
            <Link href="/contact" className="hover:text-black text-[#191919]">Contact</Link>
            <Link href="/contact" className="bg-[#191919] text-white text-[11px] font-semibold px-4 py-2 rounded-full hover:bg-black transition-colors">Join us</Link>
          </div>
        </div>
      </nav>

      {/* LEADERSHIP GRID */}
      <main className="relative pt-[220px] px-10 pb-40 text-[#191919]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-[11px] font-mono tracking-widest text-[#931f1f] font-bold mb-6">LEADERSHIP B1</div>
          
          <h1 className="font-serif text-[64px] leading-[1.1] tracking-tight max-w-[900px] font-medium mb-4">
            The founding crew.
          </h1>
          <p className="text-gray-500 font-medium text-sm max-w-[600px] mb-16">
            The student leaders who started the club from scratch and run its four departments today.
          </p>

          {/* PROFILES LAYOUT MAP */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px]">
            {leadership.map((m, idx) => (
              <div key={idx} className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-gray-200 flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#931f1f] text-white font-mono font-bold text-xs flex items-center justify-center select-none">
                      {m.initials}
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-wider text-[#931f1f] bg-[#931f1f]/5 px-2.5 py-1 rounded-md">{m.role}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{m.name}</h3>
                  <div className="text-[11px] text-gray-400 font-medium mb-4">{m.class}</div>
                  <p className="text-xs text-gray-600 font-medium italic leading-relaxed">
                    {`"${m.quote}"`}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}