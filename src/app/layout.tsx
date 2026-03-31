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
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";

// -----------------------------------------------------------
// FONT SETUP
// next/font downloads these from Google at build time and
// self-hosts them. No external network requests for fonts
// in production -- better privacy and performance.
//
// `variable` creates a CSS custom property (e.g. --font-heading)
// that our Tailwind config reads via font-heading / font-body.
// -----------------------------------------------------------

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-heading-var", // changed from --font-heading
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
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}