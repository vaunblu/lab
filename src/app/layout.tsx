import type {Metadata} from "next";
import {GeistSans} from "geist/font/sans";
import {GeistMono} from "geist/font/mono";
import {
  Chivo_Mono,
  EB_Garamond,
  Dancing_Script,
  JetBrains_Mono,
} from "next/font/google";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lab | Vaun Blu",
};

const EBGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const Mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const DancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});

const examples = [
  "affirmations",
  "album",
  "bird",
  "carousel",
  "cd",
  "checkout",
  "create-new",
  "explore",
  "happy-cards",
  "love-this",
  "magic-button",
  "neu",
  "northern-lights",
  "phone-glow",
  "podcasts",
  "popcorn",
  "slingshot",
  "thunder-airdrop",
  "thunder-speed",
  "timer",
  "toast",
  "ui-course-form",
  "vinyl",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${DancingScript.variable} ${Mono.variable} ${GeistSans.variable} ${GeistMono.variable} ${EBGaramond.variable} font-sans antialiased`}
      >
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-gray-100 overflow-y-auto">
            <nav className="p-4">
              <ul>
                {examples.map((example) => (
                  <li key={example} className="mb-2">
                    <Link href={`/${example}`} className="text-blue-600 hover:underline">
                      {example}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* Main content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}