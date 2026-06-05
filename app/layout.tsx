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

  // CHANGED THIS
  description: "Banana",

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

    // CHANGED THIS TOO
    description: "Banana",

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
        <script src="https://cdn.tailwindcss.com"></script>

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

      <body className="bg-transparent text-[#191919] antialiased min-h-screen relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}