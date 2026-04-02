// =============================================================================
// src/components/layout/Footer.tsx
// =============================================================================
// Global site footer. Added to the root layout so it appears on every page.
// Wave-700 (near-black) background — echoes the deepest wave layer colour.
//
// Structure:
//   - Top row:   Logo + firm description
//   - Middle row: Three link columns (Practice Areas, Industries, Company)
//   - Bottom bar: Copyright, Privacy Policy, Terms of Use
// =============================================================================

import Image from "next/image";
import Link from "next/link";
import { practicePillars, industries } from "@/data/navigation";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

const COMPANY_LINKS: FooterColumn = {
  heading: "Company",
  links: [
    { label: "About",         href: "/about" },
    { label: "Insights",      href: "/insights" },
    { label: "Jurisdictions", href: "/jurisdictions" },
    { label: "Contact",       href: "/contact" },
    { label: "Client Portal", href: "#" },
  ],
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FooterLinkColumn({ column }: { column: FooterColumn }) {
  return (
    <div>
      <p className="mb-4 font-body text-body-xs font-semibold uppercase tracking-[0.26em] text-wave-400">
        {column.heading}
      </p>
      <ul className="flex flex-col gap-2.5">
        {column.links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="font-body text-body-sm text-wave-200/55 transition-colors duration-200 hover:text-wave-100"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function Footer() {
  const currentYear = new Date().getFullYear();

  const practiceColumn: FooterColumn = {
    heading: "Practice Areas",
    links: practicePillars.map((p) => ({
      label: p.name,
      href:  `/practice/${p.slug}`,
    })),
  };

  const industriesColumn: FooterColumn = {
    heading: "Industries",
    links: industries.map((i) => ({
      label: i.name,
      href:  `/industries/${i.slug}`,
    })),
  };

  return (
    <footer className="bg-wave-700" aria-label="Site footer">
        <div className="mx-auto max-w-(--width-wide) px-[8vw]">

        {/* ── Top section: logo + strapline ─────────────────────────── */}
        <div className="border-b border-wave-600 py-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

            {/* Logo + description */}
            <div className="max-w-sm">
              <Link href="/" aria-label="Amara & Partners — Home">
                <Image
                  src="/images/logo/A&P_logo_white_primary_RGB.svg"
                  alt="Amara & Partners Legal Consultants"
                  width={200}
                  height={114}
                  className="mb-5 h-auto w-[clamp(140px,18vw,200px)]"
                />
              </Link>
              <p className="font-body text-body-sm leading-relaxed text-wave-200/55">
                A boutique legal consultancy based on Reem Island, Abu Dhabi.
                Advising businesses, investors, and institutions across the UAE
                and beyond.
              </p>
            </div>

            {/* Contact quick-links */}
            <div className="flex flex-col gap-2">
              <a
                href="tel:+97125500085"
                className="font-body text-body-sm text-wave-200/55 transition-colors duration-200 hover:text-wave-100"
              >
                +971 2 550 0085
              </a>
              <a
                href="mailto:info@amarapartners.ae"
                className="font-body text-body-sm text-wave-200/55 transition-colors duration-200 hover:text-wave-100"
              >
                info@amarapartners.ae
              </a>
              <p className="mt-1 font-body text-body-xs leading-relaxed text-wave-400/70">
                Wafra Square, Reem Island<br />Abu Dhabi, UAE
              </p>
            </div>
          </div>
        </div>

        {/* ── Middle section: link columns ──────────────────────────── */}
        <div className="border-b border-wave-600 py-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-3">
            <FooterLinkColumn column={practiceColumn} />
            <FooterLinkColumn column={industriesColumn} />
            <FooterLinkColumn column={COMPANY_LINKS} />
          </div>
        </div>

        {/* ── Bottom bar: copyright + legal ─────────────────────────── */}
        <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-body-xs text-wave-500">
            &copy; {currentYear} Amara &amp; Partners Legal Consultants.
            All rights reserved.
          </p>

          <nav aria-label="Legal links" className="flex gap-5">
            <Link
              href="/privacy-policy"
              className="font-body text-body-xs text-wave-500 transition-colors duration-200 hover:text-wave-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="font-body text-body-xs text-wave-500 transition-colors duration-200 hover:text-wave-200"
            >
              Terms of Use
            </Link>
          </nav>
        </div>

      </div>
    </footer>
  );
}
