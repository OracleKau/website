// app/layout.tsx
// Core root layout configuration for the Next.js application.
// This file sets up fonts, SEO metadata, icons, and wrapping elements for every page.

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Configure standard Inter Google Font for sans-serif utility usage throughout the project
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Configure Playfair Display Google Font for elegant serif text / heading styles
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// Define SEO metadata, including basic tags, site title, descriptive info, custom site icons, and OpenGraph configs for sharing links.
export const metadata: Metadata = {
  title: "Oracle Club KAU",
  description: "The official web platform for Oracle Student Club at King Abdulaziz University, Jeddah. Bridging theory and practice, building real-world student-led solutions.",

  icons: {
    icon: [
      {
        url: "/icon.png?v=5",
        type: "image/png",
        sizes: "32x32",
      },
    ],

    apple: [
      {
        url: "/icon.png?v=5",
      },
    ],
  },

  openGraph: {
    title: "Oracle Club KAU",
    description: "The official web platform for Oracle Student Club at King Abdulaziz University, Jeddah. Bridging theory and practice, building real-world student-led solutions.",

    type: "website",

    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Oracle Club KAU Logo",
      },
    ],
  },
};

// Root layout element rendering the global HTML wrapper, document head, and base dark-theme body styling
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        {/* Declare basic favicon files and apple touch icon pointers */}
        <link
          rel="icon"
          type="image/png"
          href="/icon.png?v=5"
          sizes="32x32"
        />

        <link
          rel="apple-touch-icon"
          href="/icon.png?v=5"
        />
      </head>

      {/* Initialize global theme style attributes (such as the default background, white text, smooth anti-aliasing, and responsive boundaries) */}
      <body className="bg-[#0a0505] text-white antialiased min-h-screen relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}