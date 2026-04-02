// =============================================================================
// src/app/insights/page.tsx
// =============================================================================
// Insights listing page — /insights
//
// Structure:
//   1. PageHeader       — dark gradient, divider into cream
//   2. Articles section — cream bg, 3-col card grid
//   3. CTA section      — wave-500 bg
//
// Server Component. Uses the existing Card variant="insight" component.
// Pagination is not needed with 3 articles — add it in Phase 7 when
// the article count grows.
// =============================================================================

import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { insightArticles } from "@/data/insights";

// --- Metadata ----------------------------------------------------------------

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Commentary, analysis, and legal updates from Amara & Partners on UAE " +
    "and GCC law — covering corporate transactions, regulatory developments, " +
    "and dispute resolution.",
};

// --- Page component ----------------------------------------------------------

export default function InsightsPage() {
  return (
    <main>

      <PageHeader
        title="Insights"
        eyebrow="Knowledge & Commentary"
        subtitle="Legal analysis and practical commentary on the issues that matter to businesses operating in the UAE and GCC."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Insights" },
        ]}
        dividerFill="fill-cream"
      />

      {/* =======================================================================
          ARTICLES GRID
          Cream background — the InsightCard component has its own border and
          hover treatment; the cream background keeps the page light and open.
      ======================================================================= */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          {/* Section header */}
          <AnimateIn>
            <div className="mb-14">
              <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-brand-gold/80">
                {insightArticles.length} articles
              </p>
              <h2 className="font-heading text-display-md leading-tight text-wave-700">
                Recent publications.
              </h2>
            </div>
          </AnimateIn>

          {/* Article cards — staggered entrance */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {insightArticles.map((article, i) => (
              <AnimateIn key={article.slug} delay={i * 0.1}>
                <Card variant="insight" insight={article} />
              </AnimateIn>
            ))}
          </div>

          {/* Future: pagination controls will live here (Phase 7) */}

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
                  A question raised by something you&apos;ve read?
                </h2>
                <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-200/80">
                  Our publications reflect the types of matters our team
                  advises on every day. If something resonates with your
                  situation, we&apos;d welcome the opportunity to discuss it.
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
