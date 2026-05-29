// app/achievements/page.tsx
import Link from "next/link";

export default function Achievements() {
  const benefits = [
    { id: "01", title: "Real Projects", text: "Public GitHub contributions, deployed products with real users, and portfolio pieces that recruiters can actually verify." },
    { id: "02", title: "Free Certifications", text: "Oracle Cloud Infrastructure Foundations, Generative AI Professional, GitHub Copilot Pro—all free for members." },
    { id: "03", title: "Industry Workflow", text: "Two-week sprints, code reviews, pull requests, deployed products. The same way working engineers work every day." },
    { id: "04", title: "Career Network", text: "Mentorship, referrals, LinkedIn shoutouts when projects ship, real certificates for every contribution." },
    { id: "05", title: "AI Tools Included", text: "Members get access to Cursor Pro+, ChatGPT Plus, and Google AI Pro through the club's subscription." },
    { id: "06", title: "All Skill Levels", text: "Just learned your first language? Senior developer? We pair members with mentors and projects that match where you are." }
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
            <Link href="/members" className="hover:text-black text-[#191919]">Members</Link>
            <Link href="/achievements" className="text-[#931f1f]">Achievements</Link>
            <Link href="/contact" className="hover:text-black text-[#191919]">Contact</Link>
            <Link href="/contact" className="bg-[#191919] text-white text-[11px] font-semibold px-4 py-2 rounded-full hover:bg-black transition-colors">Join us</Link>
          </div>
        </div>
      </nav>

      {/* CORE ADVANTAGE LAYOUT */}
      <main className="relative pt-[220px] px-10 pb-40 text-[#191919]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-[11px] font-mono tracking-widest text-[#931f1f] font-bold mb-6">WHY JOIN / 03</div>
          
          <h1 className="font-serif text-[64px] leading-[1.1] tracking-tight max-w-[900px] font-medium mb-16">
            Skills that get you hired.
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 max-w-[1200px]">
            {benefits.map((b, i) => (
              <div key={i} className="border-t border-gray-200 pt-6">
                <div className="text-xs font-mono font-bold text-[#931f1f] mb-3">{b.id}</div>
                <h3 className="text-lg font-serif font-medium text-gray-900 mb-2">{b.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">{b.text}</p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}