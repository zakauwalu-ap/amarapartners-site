// =============================================================================
// src/components/layout/PageHeader.tsx
// =============================================================================
// Shared header for all inner pages. Sits directly below the fixed Navigation
// (pt-16 offsets the nav's 64px height). The gradient picks up from the nav's
// solid-scroll state (wave-700) so the two elements read as one visual unit.
//
// USAGE:
//   <PageHeader title="About the Firm" />
//
//   <PageHeader
//     title="Practice Areas"
//     eyebrow="What we do"
//     subtitle="Three integrated pillars. One cohesive team."
//     breadcrumb={[{ label: "Home", href: "/" }, { label: "Practice Areas" }]}
//   />
//
// NOTES:
//   - `breadcrumb` — last item should omit `href` (it is the current page)
//   - `dividerFill` — must be a complete Tailwind fill class (e.g. "fill-cream",
//     "fill-wave-700") matching the background of the first section below.
//     Defaults to "fill-cream" (the site's standard inner-page background).
// =============================================================================

import Link from "next/link";

// --- Types -------------------------------------------------------------------

interface BreadcrumbItem {
  /** Display text for this crumb */
  label: string;
  /** Internal href. Omit for the active/current page. */
  href?: string;
}

export interface PageHeaderProps {
  /** Main page heading — becomes the <h1> */
  title: string;
  /** Optional body text below the title */
  subtitle?: string;
  /** Small ALL-CAPS label above the title (gold, spaced) */
  eyebrow?: string;
  /** Breadcrumb trail rendered above the eyebrow */
  breadcrumb?: BreadcrumbItem[];
  /**
   * Tailwind fill class for the bottom wave divider.
   * Must match the background of the section that immediately follows.
   * e.g. "fill-cream" | "fill-wave-700"
   */
  dividerFill?: string;
}

// --- Component ---------------------------------------------------------------

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  breadcrumb,
  dividerFill = "fill-cream",
}: PageHeaderProps) {
  return (
    <section
      aria-label="Page header"
      className="relative overflow-hidden bg-linear-to-br from-wave-700 via-wave-600 to-wave-500 pt-16"
    >

      {/* -----------------------------------------------------------------------
          DECORATIVE BACKGROUND WAVE
          One wave path from the hero system, rendered at 4% opacity. Adds
          tactile depth to the gradient without competing with the content.
      ----------------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
      >
        <svg
          viewBox="0 0 1920 1080"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          {/* Wave layer 5 — mid-depth, sweeping horizontally */}
          <path
            d="M1.23,572.13l53.34-7.32c53.44-7.22,160.13-21.76,266.92-22.76,106.79-1,213.47,11.64,320.26,22.57,106.79,10.93,213.47,20.05,320.26,17.75,106.79-2.31,213.47-16.15,320.26-23.57,106.79-7.52,213.47-8.63,320.26-1.5,106.79,7.02,213.47,22.26,266.92,29.98l53.34,7.83V12.5H1.23v559.63Z"
            fill="white"
          />
        </svg>
      </div>

      {/* -----------------------------------------------------------------------
          MAIN CONTENT
          Max-width and horizontal padding mirror the Navigation and Footer.
      ----------------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto max-w-7xl px-[8vw] pb-24 pt-14 lg:pt-20">

        {/* Breadcrumb — rendered above everything else */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5">
              {breadcrumb.map((item, index) => (
                <li key={item.label} className="flex items-center gap-1.5">

                  {/* Separator › between items */}
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="font-body text-body-xs text-wave-500 select-none"
                    >
                      ›
                    </span>
                  )}

                  {item.href ? (
                    <Link
                      href={item.href}
                      className="font-body text-body-xs uppercase tracking-[0.2em] text-wave-300/70 transition-colors duration-200 hover:text-wave-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    // Current page — no link, aria-current for a11y
                    <span
                      aria-current="page"
                      className="font-body text-body-xs uppercase tracking-[0.2em] text-wave-200"
                    >
                      {item.label}
                    </span>
                  )}

                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Eyebrow label */}
        {eyebrow && (
          <p className="mb-5 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-brand-gold/80">
            {eyebrow}
          </p>
        )}

        {/* Page title */}
        <h1 className="mb-6 max-w-[22ch] font-heading text-display-lg leading-[1.05] text-cream">
          {title}
        </h1>

        {/* Gold accent rule */}
        <div className="mb-6 h-px w-16 bg-brand-gold" aria-hidden="true" />

        {/* Subtitle */}
        {subtitle && (
          <p className="max-w-[52ch] font-body text-body-lg leading-relaxed text-wave-200/80">
            {subtitle}
          </p>
        )}

      </div>

      {/* -----------------------------------------------------------------------
          WAVE BOTTOM DIVIDER
          An organic S-curve at the base of the header. The fill matches the
          background of whatever content section follows below, creating a
          seamless edge rather than a hard horizontal cut.
      ----------------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="relative z-10 -mb-px w-full overflow-hidden leading-0"
      >
        <svg
          viewBox="0 0 1440 64"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className={`h-16 w-full ${dividerFill}`}
        >
          <path d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z" />
        </svg>
      </div>

    </section>
  );
}
