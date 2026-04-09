// =============================================================================
// src/app/industries/page.tsx
// =============================================================================
// Industries overview page — /industries
//
// Structure:
//   1. PageHeader        — dark gradient, divider into wave-700 section
//   2. Industries section — wave-700 bg, intro copy + five clickable cards
//   3. CTA section       — wave-500 bg
//
// Server Component. Entire industry cards are wrapped in next/link for
// full-surface click target and prefetching.
// =============================================================================

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { industryDetails, type IndustryDetail } from "@/data/industries";

// --- Metadata ----------------------------------------------------------------

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Amara & Partners advises across five key industry sectors: Aviation and Space, " +
    "Engineering and Construction, Oil and Gas, Technology, Media and Telecommunications, " +
    "and Healthcare and Life Sciences.",
};

// --- Industry card -----------------------------------------------------------

function IndustryCard({ industry }: { industry: IndustryDetail }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group block h-full"
      aria-label={`Explore ${industry.name} sector`}
    >
      <article className="flex h-full flex-col rounded-card border border-wave-600 bg-wave-600/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/30 hover:bg-wave-600/50 hover:shadow-card-hover lg:p-10">

        {/* Gold accent rule — top of card */}
        <div className="mb-6 h-px w-10 bg-brand-gold" aria-hidden="true" />

        {/* Industry name */}
        <h3 className="mb-4 font-heading text-display-md leading-tight text-wave-100 transition-colors duration-200 group-hover:text-cream">
          {industry.name}
        </h3>

        {/* Tagline */}
        <p className="mb-auto font-body text-body-md leading-relaxed text-wave-300/80">
          {industry.tagline}
        </p>

        {/* Explore CTA — always at the bottom */}
        <div className="mt-8 flex items-center gap-2 font-body text-body-sm font-medium text-brand-gold/60 transition-all duration-200 group-hover:gap-3 group-hover:text-brand-gold">
          <span>Explore sector</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>

      </article>
    </Link>
  );
}

// --- Page component ----------------------------------------------------------

export default function IndustriesPage() {
  return (
    <main>

      <PageHeader
        title="Industries"
        eyebrow="Sectors We Serve"
        subtitle="Deep sector knowledge applied to complex legal mandates across five industries."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Industries" },
        ]}
        dividerFill="fill-wave-700"
      />

      {/* =======================================================================
          INDUSTRIES SECTION
          Five cards in a responsive grid. 3-col on xl, 2-col on lg, 1-col on
          mobile. The 5-card count leaves a natural gap on the last row at 3-col
          (3+2) which is fine for editorial-style content layouts.
      ======================================================================= */}
      <section className="bg-wave-700 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          {/* Section intro */}
          <AnimateIn>
            <div className="mb-16 max-w-[52ch]">
              <p className="mb-4 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
                Five sectors · deep expertise
              </p>
              <h2 className="font-heading text-display-md leading-tight text-wave-100">
                Legal expertise shaped by sector understanding.
              </h2>
              <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-300/80">
                We bring the depth of specialists who have worked in the
                industries they advise. Our sector knowledge is not incidental —
                it is how we understand the commercial pressure behind every
                legal question.
              </p>
            </div>
          </AnimateIn>

          {/* Industry cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {industryDetails.map((industry, i) => (
              <AnimateIn key={industry.slug} delay={(i % 3) * 0.1}>
                <IndustryCard industry={industry} />
              </AnimateIn>
            ))}
          </div>

        </div>
      </section>

      {/* =======================================================================
          CTA SECTION
      ======================================================================= */}
      <section className="bg-wave-500 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          <AnimateIn>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">

              <div>
                <div className="mb-8 h-px w-16 bg-brand-gold" aria-hidden="true" />
                <h2 className="font-heading text-display-md leading-tight text-wave-100">
                  Your sector is not one of these?
                </h2>
                <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-200/80">
                  Our practice areas extend across all commercial sectors. If
                  you don&apos;t see your industry listed, get in touch. We
                  very likely advise in your space.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href="/contact" arrow>
                  Get in touch
                </Button>
                <Button variant="secondary" size="lg" href="/practice">
                  Practice areas
                </Button>
              </div>

            </div>
          </AnimateIn>

        </div>
      </section>

    </main>
  );
}
