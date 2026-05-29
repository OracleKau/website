export default function Sponsors() {
  const currentSponsors = [
    { name: "Oracle Corporation", tier: "Founding Partner", description: "Providing infrastructure resources, curriculum alignment, and industry-recognized cloud platform training pathways." },
    { name: "KAU Deanship of Student Affairs", tier: "Institutional Support", description: "Empowering student initiatives through campus facility allocations, club governance, and project funding pipelines." }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-8 mb-12">
        <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-gray-900 mb-4">
          Club Partners
        </h1>
        <p className="text-gray-600 max-w-xl text-sm md:text-base">
          Our initiative is fueled by enterprise and institutional organizations dedicated to advancing student engineering talent in Saudi Arabia.
        </p>
      </div>

      {/* Sponsors Directory */}
      <div className="space-y-8 mb-16">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-gray-400">
          Current Collaborations / 02
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentSponsors.map((sponsor, idx) => (
            <div key={idx} className="bg-white border border-gray-200 p-8 rounded-2xl flex flex-col justify-between hover:border-black transition">
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Mock Corporate Logo Box */}
                  <div className="h-10 px-4 bg-gray-50 border border-gray-100 font-mono font-bold text-xs text-gray-700 flex items-center rounded-md tracking-wider uppercase">
                    {sponsor.name.split(" ")[0]} // LOGO
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-red-50 text-[#FF0000] px-3 py-1 rounded-full">
                    {sponsor.tier}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{sponsor.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{sponsor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action for Future Sponsors */}
      <div className="border border-dashed border-gray-300 rounded-2xl p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Partner with Oracle Club KAU</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Gain direct access to top-tier software engineering and computer science students. Support our technical hackathons, provide mentorship, or sponsor our flagship deployment operations.
          </p>
        </div>
        <a 
          href="mailto:oracle.club@kau.edu.sa" 
          className="bg-black text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-gray-800 transition whitespace-nowrap"
        >
          Get in touch →
        </a>
      </div>
    </div>
  );
}