// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

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

      <body className="bg-[#0a0505] text-white antialiased min-h-screen relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}