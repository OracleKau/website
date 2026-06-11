const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
  console.log("Cleaning database...");
  await db.member.deleteMany({});
  await db.project.deleteMany({});
  await db.achievement.deleteMany({});
  await db.sponsor.deleteMany({});
  await db.contactSubmission.deleteMany({});
  await db.event.deleteMany({});

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
  const presidents = [
    { name: "Ammar Essam Koshak",        role: "Club President"                  },
    { name: "Joud Yasser Alaskar",       role: "Club President"                  },
    { name: "Mohammed Ahmad Justanieah", role: "Club Vice President"             },
    { name: "Shahad Khalid Kadasa",      role: "Human Resources Officer"         },
    { name: "Faisal Majed Alharazi",     role: "Human Resources Vice Officer"    },
    { name: "Ali Saleh Alghamdi",        role: "Project Management Officer"      },
    { name: "Osama Mohammed Alhibshi",   role: "Project Management Vice Officer" },
  ];

  for (let i = 0; i < presidents.length; i++) {
    const p = presidents[i];
    const initials = p.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
    await db.member.create({
      data: {
        name: p.name,
        role: p.role,
        department: "presidency",
        initials,
        isLeadership: true,
        order: i + 1,
      }
    });
  }

  // Departments
  const departments = [
    {
      id: "media",
      head:  { name: "Lamis Faisal Alali",   role: "Media Department Leader"      },
      vice:  { name: "Rehab Anwar Alflah",    role: "Media Department Vice Leader" },
      members: [
        { name: "Jana Deyaa Tawfeek"           },
        { name: "Malak Khalid Alnahdi"         },
        { name: "Faisal Abdullah Almalki"      },
        { name: "Razan Ahmed Alsulami"         },
        { name: "Nouran Aly Mahmoud"           },
        { name: "Layan Abdullah Alamri"        },
        { name: "Rital Kazem Sultan"           },
        { name: "Eimaar Abdulbasit Shakir"     },
        { name: "Tuleen Mahmoud Taabani"       },
        { name: "Leen Hamed Almutairi"         },
        { name: "Joud Mawsil Alkuraythi"       },
        { name: "Samaher Abdullah Alzahrani"   },
        { name: "Shihanah Saleh Alyousef"      },
        { name: "Omar Abid Almushayikhi"       },
        { name: "Mohammed Abdulsalam Alshehre" },
        { name: "Maher Mohammed Bajaber"       },
        { name: "Lamar Bakur Baamer"           },
        { name: "Norah Abdulelah Sendi"        },
        { name: "Ohud Shallah Alsulami"        },
        { name: "Renad Yasser Binmahfouz"      },
        { name: "Aliyah Saeed Alghamdi"        },
        { name: "Aisha Taleb Aldris"           },
        { name: "Mayar Abdullah Alkhuraimi"    },
        { name: "Ruba Abdulrhman Alduraym"     },
        { name: "Hisham Abdullah Aljefri"      },
      ],
    },
    {
      id: "pr",
      head:  { name: "Sedra Faisal Alyamani", role: "Public Relations Department Leader"      },
      vice:  { name: "Leena Althanayan",       role: "Public Relations Department Vice Leader" },
      members: [
        { name: "Tala Faisal Alhaidari"           },
        { name: "Lamar Abdullah Abdulaziz Muneer" },
        { name: "Maryam Turki Kabbani"            },
        { name: "Fatimah Saleh Baothman"          },
        { name: "Amro Khaled Hussain"             },
        { name: "Lina Maher"                 },
        { name: "Saud Ahmed Mubarki"                   },
        { name: "Mohammed Rashid Alharbi"         },
        { name: "Rodaina Abdullah Kabouha"        },
        { name: "Nadeen Khaled Ali Aldahrah"      },
        { name: "Ahmed Mansour Alghmdi"           },
        { name: "Asma Abdulrahman Alattas"        },
        { name: "Retal Majed Ghaith"              },
        { name: "Wateen Khalid Albishri"          },
        { name: "Fatima Ali Alshaikh"             },
        { name: "Abdulaziz Salah Alqayn"          },
        { name: "Omar Fadi Srouji"                },
        { name: "Lana Ayman Aburukba"             },
        { name: "Deema Ali Alzahrani"             },
        { name: "Rafal Abdullah Suliman Riri"     },
        { name: "Omar Abdullah Ghazal"            },
        { name: "Fatima Mohammed Alamoudi"        },
        { name: "Sohaib Albar"                    },
        { name: "Mody Bandar Albugami"            },
      ],
    },
    {
      id: "tech",
      head:  { name: "Wihad Ahmed Alotaibi", role: "Tech Department Leader"      },
      vice:  { name: "Rayan Adel Alyasi",    role: "Tech Department Vice Leader" },
      members: [
        { name: "Khadijah Saleh Baotman"       },
        { name: "Remass Mohammed Ashmawi"      },
        { name: "Ibrahim Abdullah Albassam"    },
        { name: "Nawaf Othman Alghamdi"        },
        { name: "Anas Ibrahimi"                },
        { name: "Rania Lafi Almutairi"         },
        { name: "Sohaib Ahmed Aloudi"          },
        { name: "Refal Jameel Alahmadi"        },
        { name: "Abdulelah Abdullah Alshareef" },
        { name: "Jana Khalid Alshaikh"         },
        { name: "Madyan Mohammed Alammari"     },
        { name: "Joud Khaled Balkhair"         },
        { name: "Waleed Naeem Alsulami"        },
      ],
    },
  ];

  for (const dept of departments) {
    // Seed Leader (Head)
    await db.member.create({
      data: {
        name: dept.head.name,
        role: dept.head.role,
        department: dept.id,
        initials: dept.head.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase(),
        isLeadership: true,
        order: 1,
      }
    });

    // Seed Vice Leader (Vice)
    await db.member.create({
      data: {
        name: dept.vice.name,
        role: dept.vice.role,
        department: dept.id,
        initials: dept.vice.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase(),
        isLeadership: true,
        order: 2,
      }
    });

    // Seed Members
    for (let j = 0; j < dept.members.length; j++) {
      const m = dept.members[j];
      await db.member.create({
        data: {
          name: m.name,
          role: "MEMBER",
          department: dept.id,
          initials: m.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase(),
          isLeadership: false,
          order: 10 + j,
        }
      });
    }
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
      github: "https://github.com/OracleKau/website",
      year: "2026",
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

  console.log("Seeding events...");
  const defaultEvent = {
    title: "Intro to Oracle Cloud Infrastructure",
    description: "Join us for an immersive, hands-on workshop introducing the core concepts of Oracle Cloud Infrastructure (OCI). You will learn how to configure virtual cloud networks (VCNs), boot secure compute instances, manage cloud storage, and deploy web applications on free-tier cloud instances. Recommended for all CS and IT students.",
    date: new Date("2026-06-15T16:00:00Z"),
    location: "Building 31, Room 204",
    locationLink: "https://maps.google.com/?q=King+Abdulaziz+University+Jeddah",
    type: "Workshop",
    rsvpLink: "/join",
  };
  await db.event.create({ data: defaultEvent });

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
