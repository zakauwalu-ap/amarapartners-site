// =============================================================================
// src/app/practice/[slug]/page.tsx
// =============================================================================
// Practice pillar detail page — /practice/[slug]
// Valid slugs: corporate | disputes | regulatory
// Each area card links to /practice/[slug]/[areaSlug] (22 static area pages).
//
// Structure:
//   1. PageHeader        — pillar name, tagline as subtitle, dark gradient
//   2. Overview section  — cream bg, full pillar description + area count stat
//   3. Areas section     — wave-700 bg, numbered grid of all practice area cards
//   4. CTA section       — wave-500 bg, invite to discuss a matter
//
// Next.js 15: params is a Promise — this component is async and awaits it.
// generateStaticParams pre-builds all three pillar pages at build time.
// dynamicParams = false ensures any unrecognised slug returns 404.
// =============================================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import {
  getPillarBySlug,
  PILLAR_SLUGS,
  type PillarDetail,
  type PracticeAreaDetail,
} from "@/data/practiceAreas";

// --- Route configuration ----------------------------------------------------

// Only the three known slugs are valid. Any other slug returns 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PILLAR_SLUGS.map((slug) => ({ slug }));
}

// --- Metadata ----------------------------------------------------------------
// generateMetadata is also async in Next.js 15 — params is a Promise.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);

  if (!pillar) {
    return { title: "Practice Areas" };
  }

  return {
    title: pillar.name,
    description: pillar.tagline,
  };
}

// --- Practice area card ------------------------------------------------------
// Numbered card on the dark (wave-700) background. Mirrors the values card
// style from the About page for visual consistency across inner pages.

function AreaCard({
  pillarSlug,
  area,
  index,
}: {
  pillarSlug: string;
  area: PracticeAreaDetail;
  index: number;
}) {
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/practice/${pillarSlug}/${area.slug}`}
      className="group block h-full"
      aria-label={`Read more about ${area.name}`}
    >
      <article className="flex h-full flex-col gap-5 rounded-card border border-wave-600 bg-wave-600/40 p-8 backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/30 hover:bg-wave-600/55 hover:shadow-card-hover">
        <span
          className="select-none font-heading text-display-md leading-none text-brand-gold/20 tabular-nums transition-colors duration-300 group-hover:text-brand-gold/30"
          aria-hidden="true"
        >
          {ordinal}
        </span>

        <div className="h-px w-10 bg-brand-gold/50 transition-all duration-300 group-hover:w-12" aria-hidden="true" />

        <h3 className="font-heading text-body-xl leading-tight text-wave-100 transition-colors duration-200 group-hover:text-cream">
          {area.name}
        </h3>

        <p className="font-body text-body-sm leading-relaxed text-wave-300/80">
          {area.description}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 font-body text-body-xs font-medium uppercase tracking-wider text-brand-gold/70 transition-all duration-200 group-hover:gap-3 group-hover:text-brand-gold">
          View area
          <svg
            width="12"
            height="12"
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
        </span>
      </article>
    </Link>
  );
}

// --- Pillar overview strip ---------------------------------------------------
// Two-column layout: full description on the left, key stat on the right.

function PillarOverview({ pillar }: { pillar: PillarDetail }) {
  return (
    <AnimateIn>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_1fr] lg:gap-20">

        {/* Left: full description */}
        <div>
          <p className="mb-5 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-brand-gold/80">
            Pillar {pillar.number}
          </p>
          <div className="mb-6 h-px w-16 bg-brand-gold" aria-hidden="true" />
          <p className="font-body text-body-lg leading-relaxed text-shadow-grey">
            {pillar.description}
          </p>
        </div>

        {/* Right: area count stat */}
        <div className="flex flex-col justify-center gap-2 rounded-card border border-wave-200/20 bg-wave-100/20 px-8 py-7">
          <p className="font-body text-body-xs font-medium uppercase tracking-[0.2em] text-wave-400/70">
            Specialist areas
          </p>
          <p className="font-heading text-display-lg leading-none text-wave-700">
            {pillar.areas.length}
          </p>
          <p className="font-body text-body-sm text-shadow-grey">
            within this pillar
          </p>
        </div>

      </div>
    </AnimateIn>
  );
}

// --- Page component ----------------------------------------------------------

export default async function PillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Next.js 15: params is a Promise
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);

  // Shouldn't happen given dynamicParams = false + generateStaticParams,
  // but TypeScript needs the guard and it's the right defensive pattern.
  if (!pillar) notFound();

  return (
    <main>

      {/* PageHeader — breadcrumb: Home › Practice Areas › [Pillar Name] */}
      <PageHeader
        title={pillar.name}
        eyebrow="Practice Areas"
        subtitle={pillar.tagline}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Practice Areas", href: "/practice" },
          { label: pillar.name },
        ]}
        dividerFill="fill-cream"
      />

      {/* =====================================================================
          OVERVIEW SECTION
          Cream background — warm, approachable. The pillar description and
          area count give the user enough context before diving into the grid.
      ===================================================================== */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">
          <PillarOverview pillar={pillar} />
        </div>
      </section>

      {/* =====================================================================
          PRACTICE AREAS GRID
          Dark (wave-700) background — numbered cards floated above it with
          the same glass-surface treatment as the About page values grid.
          3-col on large screens, 2-col on tablet, 1-col on mobile.
      ===================================================================== */}
      <section className="bg-wave-700 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          <AnimateIn>
            <div className="mb-16">
              <p className="mb-4 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
                {pillar.areas.length} practice areas
              </p>
              <h2 className="max-w-[24ch] font-heading text-display-md leading-tight text-wave-100">
                Specialist coverage across {pillar.name.toLowerCase()}.
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillar.areas.map((area, i) => (
              <AnimateIn key={area.slug} delay={(i % 3) * 0.08}>
                <AreaCard pillarSlug={pillar.slug} area={area} index={i} />
              </AnimateIn>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================================
          CTA SECTION
          wave-500 background — matches the tone of the overview page CTA,
          giving a consistent rhythm across all inner pages.
      ===================================================================== */}
      <section className="bg-wave-500 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          <AnimateIn>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">

              {/* Left: copy */}
              <div>
                <div className="mb-8 h-px w-16 bg-brand-gold" aria-hidden="true" />
                <h2 className="font-heading text-display-md leading-tight text-wave-100">
                  Discuss a {pillar.name} matter with us.
                </h2>
                <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-200/80">
                  Our team is available to assess your position and advise on
                  the most effective approach. Initial conversations are always
                  without obligation.
                </p>
              </div>

              {/* Right: buttons */}
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href="/contact" arrow>
                  Get in touch
                </Button>
                <Button variant="secondary" size="lg" href="/practice">
                  All practice areas
                </Button>
              </div>

            </div>
          </AnimateIn>

        </div>
      </section>

    </main>
  );
}
