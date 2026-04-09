// =============================================================================
// src/app/industries/[slug]/page.tsx
// =============================================================================
// Industry sector detail page — /industries/[slug]
// Valid slugs: aviation-space | engineering-construction | oil-gas | tmt |
//              healthcare-life-sciences
//
// Structure:
//   1. PageHeader         — industry name, tagline, dark gradient
//   2. Overview section   — cream bg, description + body text
//   3. Key matters section — wave-700 bg, 4 representative matter-type cards
//   4. Related practices  — wave-600 bg, cross-links to practice pillar pages
//   5. CTA section        — wave-500 bg
//
// Next.js 15: params is a Promise — component is async and awaits it.
// dynamicParams = false + generateStaticParams pre-builds all 5 pages.
// =============================================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import {
  getIndustryBySlug,
  INDUSTRY_SLUGS,
  type IndustryDetail,
  type KeyMatter,
  type RelatedPractice,
} from "@/data/industries";

// --- Route configuration ----------------------------------------------------

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

// --- Metadata ----------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) return { title: "Industries" };

  return {
    title: industry.name,
    description: industry.tagline,
  };
}

// --- Key matter card ---------------------------------------------------------

function KeyMatterCard({
  matter,
  index,
}: {
  matter: KeyMatter;
  index: number;
}) {
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <div className="flex h-full flex-col gap-5 rounded-card border border-wave-600 bg-wave-600/40 p-8 backdrop-blur-sm">
      <span
        className="select-none font-heading text-display-md leading-none text-brand-gold/20 tabular-nums"
        aria-hidden="true"
      >
        {ordinal}
      </span>
      <div className="h-px w-10 bg-brand-gold/50" aria-hidden="true" />
      <h3 className="font-heading text-body-xl leading-tight text-wave-100">
        {matter.title}
      </h3>
      <p className="font-body text-body-sm leading-relaxed text-wave-300/80">
        {matter.description}
      </p>
    </div>
  );
}

// --- Related practice link pill ---------------------------------------------

function RelatedPracticePill({ practice }: { practice: RelatedPractice }) {
  return (
    <Link
      href={practice.href}
      className="group flex items-center gap-2 rounded-button border border-wave-500 bg-wave-500/30 px-5 py-3 font-body text-body-sm font-medium text-wave-200 transition-all duration-200 hover:border-brand-gold/40 hover:bg-wave-500/60 hover:text-cream"
    >
      <span>{practice.name}</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Link>
  );
}

// --- Overview section -------------------------------------------------------

function OverviewSection({ industry }: { industry: IndustryDetail }) {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-[8vw]">
        <AnimateIn>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr] lg:gap-20">

            {/* Left: descriptions */}
            <div>
              <p className="mb-5 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-brand-gold/80">
                Sector overview
              </p>
              <div className="mb-6 h-px w-16 bg-brand-gold" aria-hidden="true" />
              <p className="mb-6 font-body text-body-lg leading-relaxed text-shadow-grey">
                {industry.description}
              </p>
              <p className="font-body text-body-lg leading-relaxed text-shadow-grey">
                {industry.bodyText}
              </p>
            </div>

            {/* Right: key facts strip */}
            <div className="flex flex-col gap-4">
              <div className="rounded-card border border-wave-200/20 bg-wave-100/20 px-7 py-6">
                <p className="mb-1 font-body text-body-xs font-medium uppercase tracking-[0.2em] text-wave-400/70">
                  Key matters
                </p>
                <p className="font-heading text-display-lg leading-none text-wave-700">
                  {industry.keyMatters.length}
                </p>
                <p className="mt-1 font-body text-body-sm text-shadow-grey">
                  representative matter types
                </p>
              </div>

              <div className="rounded-card border border-wave-200/20 bg-wave-100/20 px-7 py-6">
                <p className="mb-1 font-body text-body-xs font-medium uppercase tracking-[0.2em] text-wave-400/70">
                  Related practice areas
                </p>
                <p className="font-heading text-display-lg leading-none text-wave-700">
                  {industry.relatedPractices.length}
                </p>
                <p className="mt-1 font-body text-body-sm text-shadow-grey">
                  spanning our three pillars
                </p>
              </div>
            </div>

          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

// --- Page component ----------------------------------------------------------

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) notFound();

  return (
    <main>

      <PageHeader
        title={industry.name}
        eyebrow="Industries"
        subtitle={industry.tagline}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.name },
        ]}
        dividerFill="fill-cream"
      />

      {/* Overview */}
      <OverviewSection industry={industry} />

      {/* =====================================================================
          KEY MATTERS SECTION
          Dark background — numbered cards showing representative matter types.
          This gives prospective clients a concrete sense of what "sector work"
          actually looks like in practice.
      ===================================================================== */}
      <section className="bg-wave-700 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          <AnimateIn>
            <div className="mb-16">
              <p className="mb-4 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
                What we handle
              </p>
              <h2 className="max-w-[28ch] font-heading text-display-md leading-tight text-wave-100">
                Representative matters in {industry.name.toLowerCase()}.
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {industry.keyMatters.map((matter, i) => (
              <AnimateIn key={matter.title} delay={(i % 2) * 0.1}>
                <KeyMatterCard matter={matter} index={i} />
              </AnimateIn>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================================
          RELATED PRACTICES SECTION
          Mid-dark background — slightly lighter than wave-700 to visually
          separate from the key matters section above.
          Pills link through to the relevant practice pillar pages.
      ===================================================================== */}
      <section className="bg-wave-600 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-[8vw]">

          <AnimateIn>
            <div className="mb-10">
              <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
                Practice areas
              </p>
              <h2 className="font-heading text-display-md leading-tight text-wave-100">
                Relevant expertise.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3" role="list">
              {industry.relatedPractices.map((practice) => (
                <div key={practice.name} role="listitem">
                  <RelatedPracticePill practice={practice} />
                </div>
              ))}
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* =====================================================================
          CTA SECTION
      ===================================================================== */}
      <section className="bg-wave-500 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          <AnimateIn>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">

              <div>
                <div className="mb-8 h-px w-16 bg-brand-gold" aria-hidden="true" />
                <h2 className="font-heading text-display-md leading-tight text-wave-100">
                  Advising on a {industry.name} matter?
                </h2>
                <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-200/80">
                  We&apos;re available to discuss your specific circumstances
                  and advise on the most effective approach. Initial
                  conversations are always without obligation.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href="/contact" arrow>
                  Get in touch
                </Button>
                <Button variant="secondary" size="lg" href="/industries">
                  All sectors
                </Button>
              </div>

            </div>
          </AnimateIn>

        </div>
      </section>

    </main>
  );
}
