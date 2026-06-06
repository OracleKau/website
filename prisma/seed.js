const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
  console.log("Cleaning database...");
  await db.member.deleteMany({});
  await db.project.deleteMany({});
  await db.achievement.deleteMany({});
  await db.sponsor.deleteMany({});
  await db.contactSubmission.deleteMany({});

  console.log("Seeding achievements...");
  const achievements = [
    {
      imageUrl: "/achievements/engineering-day.jpg",
      year: "2026",
      title: "Engineering Day Participation",
      text: "Participated in Engineering Day through an interactive booth that introduced students and visitors to Oracle Club's vision, activities, and community impact.",
    },
    {
      imageUrl: "/achievements/workshop.jpg",
      year: "2026",
      title: "Oracle 'My Future' Initiative",
      text: "A professional development and career growth initiative by Oracle that empowers participants to strengthen technical skills and earn industry-recognized qualifications.",
    },
    {
      imageUrl: "/achievements/techhub.jpg",
      year: "2026",
      title: "TechHub Participation",
      text: "Participated in TechHub at King Abdulaziz University, engaging with workshops, tech sessions, and innovation activities that strengthen digital skills and industry readiness.",
    },
    {
      imageUrl: "/achievements/cloud-workshop.jpg",
      year: "2026",
      title: "Cloud Computing Workshop",
      text: "A hands-on workshop led by Rayan AlYasi introducing core cloud computing concepts and practical applications in modern development.",
    },
    {
      imageUrl: "/achievements/certifications.jpg",
      year: "2026",
      title: "The Unseen Forces of Interaction",
      text: "An insightful technical session delivered by Joud AlRimi exploring interaction systems and the hidden mechanisms behind user experience design.",
    },
  ];

  for (const a of achievements) {
    await db.achievement.create({ data: a });
  }

  console.log("Seeding sponsors...");
  const sponsors = [
    { name: "COCOON TREE", tier: "Workshop Host", logoUrl: "/logos/cocoon-tree.png" },
    { name: "WADI JEDDAH", tier: "Workshop Host", logoUrl: "/logos/Wadi-Jeddah.png" },
    { name: "ALMAQAM CAFE", tier: "Event Host", logoUrl: "/logos/almaqam-cafe.png" },
    { name: "Innovation Hub", tier: "Tools Partner", logoUrl: "/logos/innovation-hub.png" },
  ];

  for (const s of sponsors) {
    await db.sponsor.create({ data: s });
  }

  console.log("Seeding members...");
  // Presidents
  await db.member.create({
    data: {
      name: "Ammar Koshak",
      role: "PRESIDENT FOUNDER",
      department: "presidency",
      initials: "AK",
      academic: "Computer Science Senior",
      quote: "Started the club because we needed somewhere to actually build things instead of just learning about them.",
      imageUrl: "",
      linkedin: "https://linkedin.com/in/ammarkoshak",
      github: "https://github.com/ammarkoshak",
      twitter: "https://x.com/ammarkoshak",
      email: "ammar.koshak@kau.edu.sa",
      isLeadership: true,
      order: 1,
    }
  });

  await db.member.create({
    data: {
      name: "Joud Alaskar",
      role: "PRESIDENT FOUNDER",
      department: "presidency",
      initials: "JA",
      academic: "Computer Science Junior",
      quote: "If you cannot deploy it, it does not exist.",
      imageUrl: "",
      linkedin: "https://linkedin.com/in/joudalaskar",
      github: "https://github.com/joudalaskar",
      twitter: "https://x.com/joudalaskar",
      email: "joud.alaskar@kau.edu.sa",
      isLeadership: true,
      order: 2,
    }
  });

  // Heads and Vice Heads
  const heads = [
    { name: "Yousef Al-Saud", role: "LEADER - TECH", dept: "tech", initials: "YS", acad: "Computer Science Senior", quote: "Code that ships beats code that is perfect.", order: 1, linkedin: "https://linkedin.com/in/yousefsaud", github: "https://github.com/yousefsaud", twitter: "https://x.com/yousef_saud" },
    { name: "Ali Al-Shahrani", role: "VICE-LEADER - TECH", dept: "tech", initials: "AS", acad: "Software Engineering Junior", quote: "Every bug is just a feature in disguise.", order: 2, linkedin: "https://linkedin.com/in/alishahrani", github: "https://github.com/alishahrani", email: "ali.shahrani@kau.edu.sa" },
    { name: "Sara Mohammed", role: "LEADER - MEDIA", dept: "media", initials: "SM", acad: "Design & Communications", quote: "Great work needs a great story behind it.", order: 3, linkedin: "https://linkedin.com/in/saramohammed", email: "sara.mohammed@kau.edu.sa", twitter: "https://x.com/sara_mohammed" },
    { name: "Bader Al-Zahrani", role: "VICE-LEADER - MEDIA", dept: "media", initials: "BZ", acad: "Design Senior", quote: "Visuals speak before words ever do.", order: 4, linkedin: "https://linkedin.com/in/baderzahrani", twitter: "https://x.com/bader_zahrani" },
    { name: "Fatima Al-Harbi", role: "LEADER - HR", dept: "hr", initials: "FA", acad: "Business Administration", quote: "People first. Always.", order: 5, linkedin: "https://linkedin.com/in/fatimaharbi", email: "fatima.harbi@kau.edu.sa" },
    { name: "Arwa Al-Assiri", role: "VICE-LEADER - HR", dept: "hr", initials: "AA", acad: "Business Administration Junior", quote: "Culture is not built overnight, it is built every day.", order: 6, linkedin: "https://linkedin.com/in/arwaassiri", email: "arwa.assiri@kau.edu.sa", twitter: "https://x.com/arwa_assiri" },
    { name: "Noor Al-Qahtani", role: "LEADER - PR", dept: "pr", initials: "NQ", acad: "Marketing Junior", quote: "Every sponsor is a relationship, not a transaction.", order: 7, linkedin: "https://linkedin.com/in/noorqahtani", email: "noor.qahtani@kau.edu.sa", twitter: "https://x.com/noor_qahtani" },
    { name: "Danah Al-Anazi", role: "VICE-LEADER - PR", dept: "pr", initials: "DA", acad: "Communications Junior", quote: "Your brand is what people say when you are not in the room.", order: 8, linkedin: "https://linkedin.com/in/danahanazi", twitter: "https://x.com/danah_anazi" },
  ];

  for (const h of heads) {
    await db.member.create({
      data: {
        name: h.name,
        role: h.role,
        department: h.dept,
        initials: h.initials,
        academic: h.acad,
        quote: h.quote,
        imageUrl: "",
        linkedin: h.linkedin || null,
        github: h.github || null,
        twitter: h.twitter || null,
        email: h.email || null,
        isLeadership: true,
        order: h.order,
      }
    });
  }

  // Department General Members
  const deptMembers = [
    // Tech
    { name: "Khalid Mansour", dept: "tech", initials: "KM", acad: "Software Engineering Sophomore", linkedin: "https://linkedin.com/in/khalidmansour", github: "https://github.com/khalidmansour", order: 10 },
    { name: "Reem Al-Mutairi", dept: "tech", initials: "RM", acad: "Computer Science Junior", linkedin: "https://linkedin.com/in/reemmutairi", github: "https://github.com/reemmutairi", order: 11 },
    { name: "Hamad Al-Balawi", dept: "tech", initials: "HB", acad: "Information Systems Senior", linkedin: "https://linkedin.com/in/hamadbalawi", github: "https://github.com/hamadbalawi", twitter: "https://x.com/hamad_balawi", order: 12 },
    { name: "Lama Al-Otaibi", dept: "tech", initials: "LO", acad: "Computer Science Sophomore", linkedin: "https://linkedin.com/in/lamaotaibi", github: "https://github.com/lamaotaibi", order: 13 },
    // PR
    { name: "Faisal Al-Ghamdi", dept: "pr", initials: "FG", acad: "Marketing Senior", linkedin: "https://linkedin.com/in/faisalghamdi", email: "faisal.ghamdi@kau.edu.sa", order: 10 },
    { name: "Nada Al-Ahmadi", dept: "pr", initials: "NA", acad: "Public Relations Sophomore", linkedin: "https://linkedin.com/in/nadaahmadi", twitter: "https://x.com/nada_ahmadi", order: 11 },
    { name: "Waleed Al-Subaie", dept: "pr", initials: "WS", acad: "Business Administration Junior", linkedin: "https://linkedin.com/in/waleedsubaie", email: "waleed.subaie@kau.edu.sa", order: 12 },
    // Media
    { name: "Shahad Al-Aqeel", dept: "media", initials: "SA", acad: "Visual Arts Junior", linkedin: "https://linkedin.com/in/shahadaqeel", twitter: "https://x.com/shahad_aqeel", order: 10 },
    { name: "Mona Al-Harbi", dept: "media", initials: "MH", acad: "Graphic Design Sophomore", linkedin: "https://linkedin.com/in/monaharbi", email: "mona.harbi@kau.edu.sa", order: 11 },
    { name: "Tariq Al-Khaldi", dept: "media", initials: "TK", acad: "Media Production Junior", linkedin: "https://linkedin.com/in/tariqkhaldi", github: "https://github.com/tariqkhaldi", order: 12 },
    { name: "Rana Al-Nasser", dept: "media", initials: "RN", acad: "Design Senior", linkedin: "https://linkedin.com/in/rananasser", twitter: "https://x.com/rana_nasser", order: 13 },
    // HR
    { name: "Joud Al-Malki", dept: "hr", initials: "JM", acad: "Human Resources Sophomore", linkedin: "https://linkedin.com/in/joudmalki", email: "joud.malki@kau.edu.sa", order: 10 },
    { name: "Saud Al-Kahtani", dept: "hr", initials: "SK", acad: "Management Senior", linkedin: "https://linkedin.com/in/saudkahtani", twitter: "https://x.com/saud_kahtani", order: 11 },
    { name: "Hessa Al-Qahtani", dept: "hr", initials: "HQ", acad: "Business Administration Junior", linkedin: "https://linkedin.com/in/hessaqahtani", email: "hessa.qahtani@kau.edu.sa", order: 12 },
  ];

  for (const m of deptMembers) {
    await db.member.create({
      data: {
        name: m.name,
        role: "MEMBER",
        department: m.dept,
        initials: m.initials,
        academic: m.acad,
        quote: null,
        imageUrl: "",
        linkedin: m.linkedin || null,
        github: m.github || null,
        twitter: m.twitter || null,
        email: m.email || null,
        isLeadership: false,
        order: m.order,
      }
    });
  }

  console.log("Seeding projects...");
  const projects = [
    {
      num: "01",
      category: "Web Platform",
      status: "PUBLIC LIVE",
      name: "Oracle Club Website",
      desc: "The official web platform for Oracle Club. Designed to showcase our student achievements, facilitate department operations, manage upcoming events, and provide a convincing pitch to attract club sponsors and partners.",
      capabilities: JSON.stringify([
        { title: "Student Showcases", desc: "Highlight members, achievements, and club history." },
        { title: "Sponsor Pitch Deck", desc: "A clean, premium presentation to pitch partners and sponsors." },
        { title: "Seamless Navigation", desc: "Smooth fade-in transitions across all routes." },
        { title: "Event Feeds", desc: "A clean interface for upcoming club activities." },
      ]),
      technologies: JSON.stringify(["Next.js", "React", "TypeScript", "TailwindCSS"]),
      team: JSON.stringify([
        { initials: "IA", name: "Ibrahim Albassam (PM)", role: "" },
        { initials: "RA", name: "Refal Alhamdi", role: "" },
        { initials: "RA", name: "Rania Almutairi", role: "" },
        { initials: "RA", name: "Remass Ashmawi", role: "" },
      ]),
      github: "https://github.com/daniaalshehri1/oracle-club-website",
      year: "2024",
      order: 1,
    },
    {
      num: "02",
      category: "Internal Tool",
      status: "INTERNAL TOOL",
      name: "Club Operations Hub",
      desc: "Email sender, certificate generator, and AI-powered analytics — all in one internal platform built for our operations team.",
      capabilities: JSON.stringify([
        { title: "Bulk Email", desc: "Send club communications from one place." },
        { title: "Certificate Generator", desc: "Produce certificates for events and workshops." },
        { title: "AI Analytics", desc: "Surface patterns in club activity data." },
        { title: "Unified Dashboard", desc: "Operations workflows in a single internal tool." },
      ]),
      technologies: JSON.stringify(["React", "Python", "FastAPI", "AI"]),
      team: JSON.stringify([
        { initials: "AI", name: "Anas Ibrahimi (PM)", role: "" },
        { initials: "SA", name: "Sohaib Aloudi", role: "" },
        { initials: "KB", name: "Khadijah Baothman", role: "" },
        { initials: "AA", name: "Abdulelah Alshareef", role: "" },
      ]),
      github: "",
      year: "2026",
      order: 2,
    },
    {
      num: "03",
      category: "Campus Platform",
      status: "FLAGSHIP",
      name: "KAU Event Platform",
      desc: "A free event management platform for every KAU club. QR check-ins, auto-generated certificates, real-time analytics.",
      capabilities: JSON.stringify([
        { title: "Event Management", desc: "Create and manage club events end to end." },
        { title: "QR Check-ins", desc: "Fast attendee verification at the door." },
        { title: "Auto Certificates", desc: "Certificates generated on completion." },
        { title: "Live Analytics", desc: "Real-time attendance and engagement data." },
      ]),
      technologies: JSON.stringify(["Next.js", "Oracle DB", "QR", "WebSockets"]),
      team: JSON.stringify([
        { initials: "JA", name: "Jana Alshaikh (PM)", role: "" },
        { initials: "WA", name: "Waleed Alsolami", role: "" },
        { initials: "NA", name: "Nawaf Alghamdi", role: "" },
        { initials: "JB", name: "Joud Balkhair", role: "" },
      ]),
      github: "https://github.com/OracleKau/kau-events",
      year: "2026",
      order: 3,
    },
  ];

  for (const p of projects) {
    await db.project.create({ data: p });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
