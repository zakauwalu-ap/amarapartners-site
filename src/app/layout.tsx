// src/app/layout.tsx
// =============================================================
// Root Layout -- Amara & Partners
// This file wraps every single page on the site.
// It is the right place to:
//   1. Load and inject fonts globally
//   2. Set the <html> and <body> defaults
//   3. Add global metadata (site title, description)
// =============================================================

import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";

// -----------------------------------------------------------
// FONT SETUP
// Heading: Amara Serif (brand) — WOFF2 files in /public/images/fonts/
// Body: DM Sans via next/font/google (build-time self-host, no runtime Google CSS).
//
// `variable` exposes --font-heading-var / --font-body-var for Tailwind
// (font-heading / font-body in @theme).
// -----------------------------------------------------------

const amaraSerif = localFont({
  src: [
    {
      path: "../../public/images/fonts/AmaraSerif-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/images/fonts/AmaraSerif-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/images/fonts/AmaraSerif-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-heading-var",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-var",    // changed from --font-body
  display: "swap",
});

// -----------------------------------------------------------
// SITE METADATA
// Next.js uses this to populate <head> tags automatically.
// Update this with real copy later -- placeholder for now.
// -----------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default: "Amara & Partners Legal Consultants",
    template: "%s | Amara & Partners", // e.g. "Contact | Amara & Partners"
  },
  description:
    "A modern legal consultancy based in Abu Dhabi, UAE. " +
    "Advising on corporate, disputes, and regulatory matters.",
  metadataBase: new URL("https://amarapartners.ae"),
};

// -----------------------------------------------------------
// ROOT LAYOUT COMPONENT
// The {children} prop is whatever page is currently being viewed.
// We attach both font variables to <html> so they are available
// everywhere on the site via CSS custom properties.
// -----------------------------------------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // Both CSS variable classes applied here so Tailwind
      // can use font-heading and font-body anywhere in the app
      className={`${amaraSerif.variable} ${dmSans.variable}`}
    >
      <body>
        <LenisProvider>
          <Navigation />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}