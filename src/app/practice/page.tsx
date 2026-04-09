// =============================================================================
// src/app/practice/page.tsx
// =============================================================================
// Practice Areas overview page — /practice
//
// Structure:
//   1. PageHeader        — dark gradient, divider into wave-700 section
//   2. Pillars section   — wave-700 bg, intro copy + three clickable pillar cards
//   3. CTA section       — wave-500 bg, brief invite to get in touch
//
// Server Component. All navigation links use next/link for client-side
// prefetching. Entire pillar cards are wrapped in Link for maximum
// click target and accessibility.
// =============================================================================

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { pillarDetails, type PillarDetail } from "@/data/practiceAreas";

// --- Metadata ----------------------------------------------------------------

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Amara & Partners advises across 22 specialist practice areas organised " +
    "into three integrated pillars: Corporate & Transactions, Disputes, and " +
    "Regulatory & Compliance.",
};

// --- Pillar card -------------------------------------------------------------
// Each card is a full-column Link — the entire surface is the click target.

function PillarCard({ pillar }: { pillar: PillarDetail }) {
  return (
    <Link
      href={`/practice/${pillar.slug}`}
      className="group block h-full"
      aria-label={`Explore ${pillar.name} practice pillar`}
    >
      <article className="flex h-full flex-col rounded-card border border-wave-600 bg-wave-600/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/30 hover:bg-wave-600/50 hover:shadow-card-hover lg:p-10">

        {/* Decorative pillar number — very faint, purely visual */}
        <span
          className="select-none font-heading text-[5.5rem] leading-none text-brand-gold/8 tabular-nums"
          aria-hidden="true"
        >
          {pillar.number}
        </span>

        {/* Gold accent rule */}
        <div className="mb-6 mt-2 h-px w-10 bg-brand-gold" aria-hidden="true" />

        {/* Pillar name */}
        <h3 className="mb-4 font-heading text-display-md leading-tight text-wave-100 transition-colors duration-200 group-hover:text-cream">
          {pillar.name}
        </h3>

        {/* Short description */}
        <p className="mb-7 font-body text-body-md leading-relaxed text-wave-300/80">
          {pillar.description.split(".")[0]}.
        </p>

        {/* Practice area list — dot-separated, scannable at a glance */}
        <p
          className="mb-8 font-body text-body-xs leading-relaxed text-wave-400/60"
          aria-label={`Areas: ${pillar.areas.map((a) => a.name).join(", ")}`}
        >
          {pillar.areas.map((a) => a.name).join(" · ")}
        </p>

        {/* Explore CTA — pushes to bottom of card */}
        <div className="mt-auto flex items-center gap-2 font-body text-body-sm font-medium text-brand-gold/60 transition-all duration-200 group-hover:gap-3 group-hover:text-brand-gold">
          <span>Explore pillar</span>
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

export default function PracticeAreasPage() {
  return (
    <main>

      {/* PageHeader — the wave divider matches the dark section that follows */}
      <PageHeader
        title="Practice Areas"
        eyebrow="What We Do"
        subtitle="Three integrated pillars. 22 specialist areas. One cohesive team."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Practice Areas" },
        ]}
        dividerFill="fill-wave-700"
      />

      {/* =======================================================================
          PILLARS SECTION
          Dark (wave-700) background — the cards float against it with a glass
          surface treatment that lets depth bleed through.
      ======================================================================= */}
      <section className="bg-wave-700 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          {/* Section intro */}
          <AnimateIn>
            <div className="mb-16 max-w-[52ch]">
              <p className="mb-4 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
                Three pillars · 22 specialist areas
              </p>
              <h2 className="font-heading text-display-md leading-tight text-wave-100">
                A cohesive practice, deliberately organised.
              </h2>
              <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-300/80">
                Our practice areas are built around three structurally distinct pillars, each staffed by
                specialists who work exclusively in their domain: Corporate &amp; Transactions, Disputes,
                and Regulatory &amp; Compliance.
              </p>
            </div>
          </AnimateIn>

          {/* Pillar cards — staggered entrance via individual AnimateIn wrappers */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {pillarDetails.map((pillar, i) => (
              <AnimateIn key={pillar.slug} delay={i * 0.1}>
                <PillarCard pillar={pillar} />
              </AnimateIn>
            ))}
          </div>

        </div>
      </section>

      {/* =======================================================================
          CTA SECTION
          wave-500 background — softer than the pillar cards section above,
          which gives the page a natural visual landing point.
      ======================================================================= */}
      <section className="bg-wave-500 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          <AnimateIn>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">

              {/* Left: copy */}
              <div>
                <div className="mb-8 h-px w-16 bg-brand-gold" aria-hidden="true" />
                <h2 className="font-heading text-display-md leading-tight text-wave-100">
                  Not sure where your matter fits?
                </h2>
                <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-200/80">
                  Many of our mandates span more than one pillar. We&apos;ll
                  identify the right team and the right approach for your
                  specific circumstances.
                </p>
              </div>

              {/* Right: buttons */}
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href="/contact" arrow>
                  Get in touch
                </Button>
                <Button variant="secondary" size="lg" href="/about">
                  About the firm
                </Button>
              </div>

            </div>
          </AnimateIn>

        </div>
      </section>

    </main>
  );
}
