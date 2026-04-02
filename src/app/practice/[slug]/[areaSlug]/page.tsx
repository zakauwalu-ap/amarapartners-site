// =============================================================================
// src/app/practice/[slug]/[areaSlug]/page.tsx
// =============================================================================
// Individual practice area page — /practice/[pillarSlug]/[areaSlug]
//
// Valid combinations are derived from pillarDetails (22 static pages).
// MegaMenu and MobileMenu already link here; this route completes the IA.
//
// Structure mirrors /industries/[slug]: PageHeader, overview, highlight cards,
// sibling links within the pillar, CTA.
//
// Next.js 15: params is a Promise — async page + generateMetadata.
// =============================================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import {
  getPracticeAreaBySlugs,
  getPracticeAreaStaticParams,
  type PillarDetail,
  type PracticeAreaDetail,
  type PracticeAreaHighlight,
} from "@/data/practiceAreas";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPracticeAreaStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; areaSlug: string }>;
}): Promise<Metadata> {
  const { slug, areaSlug } = await params;
  const resolved = getPracticeAreaBySlugs(slug, areaSlug);

  if (!resolved) return { title: "Practice Areas" };

  return {
    title: `${resolved.area.name} | ${resolved.pillar.name}`,
    description: resolved.area.description,
  };
}

function HighlightCard({
  item,
  index,
}: {
  item: PracticeAreaHighlight;
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
        {item.title}
      </h3>
      <p className="font-body text-body-sm leading-relaxed text-wave-300/80">
        {item.description}
      </p>
    </div>
  );
}

function SiblingPill({
  pillarSlug,
  area,
}: {
  pillarSlug: string;
  area: PracticeAreaDetail;
}) {
  return (
    <Link
      href={`/practice/${pillarSlug}/${area.slug}`}
      className="group flex items-center gap-2 rounded-button border border-wave-500 bg-wave-500/30 px-5 py-3 font-body text-body-sm font-medium text-wave-200 transition-all duration-200 hover:border-brand-gold/40 hover:bg-wave-500/60 hover:text-cream"
    >
      <span>{area.name}</span>
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

function OverviewSection({
  pillar,
  area,
}: {
  pillar: PillarDetail;
  area: PracticeAreaDetail;
}) {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-[8vw]">
        <AnimateIn>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr] lg:gap-20">
            <div>
              <p className="mb-5 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-brand-gold/80">
                {pillar.name}
              </p>
              <div className="mb-6 h-px w-16 bg-brand-gold" aria-hidden="true" />
              <p className="mb-6 font-body text-body-lg leading-relaxed text-shadow-grey">
                {area.description}
              </p>
              {area.body.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="mb-6 font-body text-body-lg leading-relaxed text-shadow-grey last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-card border border-wave-200/20 bg-wave-100/20 px-7 py-6">
                <p className="mb-1 font-body text-body-xs font-medium uppercase tracking-[0.2em] text-wave-400/70">
                  Service dimensions
                </p>
                <p className="font-heading text-display-lg leading-none text-wave-700">
                  {area.highlights.length}
                </p>
                <p className="mt-1 font-body text-body-sm text-shadow-grey">
                  representative focus areas
                </p>
              </div>

              <div className="rounded-card border border-wave-200/20 bg-wave-100/20 px-7 py-6">
                <p className="mb-1 font-body text-body-xs font-medium uppercase tracking-[0.2em] text-wave-400/70">
                  Pillar
                </p>
                <p className="font-heading text-body-xl leading-snug text-wave-700">
                  {pillar.number} — {pillar.name}
                </p>
                <Link
                  href={`/practice/${pillar.slug}`}
                  className="mt-3 inline-flex font-body text-body-sm font-medium text-wave-500 underline-offset-4 transition-colors hover:text-wave-700 hover:underline"
                >
                  View all areas in this pillar
                </Link>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ slug: string; areaSlug: string }>;
}) {
  const { slug, areaSlug } = await params;
  const resolved = getPracticeAreaBySlugs(slug, areaSlug);

  if (!resolved) notFound();

  const { pillar, area } = resolved;
  const siblingAreas = pillar.areas.filter((a) => a.slug !== area.slug);

  const headerSubtitle = (() => {
    const dotSpace = area.description.indexOf(". ");
    if (dotSpace === -1) return area.description;
    return area.description.slice(0, dotSpace + 1);
  })();

  return (
    <main>
      <PageHeader
        title={area.name}
        eyebrow={pillar.name}
        subtitle={headerSubtitle}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Practice Areas", href: "/practice" },
          { label: pillar.name, href: `/practice/${pillar.slug}` },
          { label: area.name },
        ]}
        dividerFill="fill-cream"
      />

      <OverviewSection pillar={pillar} area={area} />

      <section className="bg-wave-700 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">
          <AnimateIn>
            <div className="mb-16">
              <p className="mb-4 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
                How we help
              </p>
              <h2 className="max-w-[28ch] font-heading text-display-md leading-tight text-wave-100">
                Representative work in {area.name.toLowerCase()}.
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {area.highlights.map((item, i) => (
              <AnimateIn key={item.title} delay={(i % 2) * 0.1}>
                <HighlightCard item={item} index={i} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {siblingAreas.length > 0 ? (
        <section className="bg-wave-600 py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-[8vw]">
            <AnimateIn>
              <div className="mb-10">
                <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
                  Same pillar
                </p>
                <h2 className="font-heading text-display-md leading-tight text-wave-100">
                  Other areas in {pillar.name}.
                </h2>
              </div>

              <div className="flex flex-wrap gap-3" role="list">
                {siblingAreas.map((a) => (
                  <div key={a.slug} role="listitem">
                    <SiblingPill pillarSlug={pillar.slug} area={a} />
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>
      ) : null}

      <section className="bg-wave-500 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">
          <AnimateIn>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
              <div>
                <div className="mb-8 h-px w-16 bg-brand-gold" aria-hidden="true" />
                <h2 className="font-heading text-display-md leading-tight text-wave-100">
                  Discuss a {area.name.toLowerCase()} matter with us.
                </h2>
                <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-200/80">
                  We&apos;re available to assess your position and advise on the
                  most effective approach. Initial conversations are always
                  without obligation.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href="/contact" arrow>
                  Get in touch
                </Button>
                <Button variant="secondary" size="lg" href={`/practice/${pillar.slug}`}>
                  Back to {pillar.name}
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
