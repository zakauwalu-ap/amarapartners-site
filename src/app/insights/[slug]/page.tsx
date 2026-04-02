// =============================================================================
// src/app/insights/[slug]/page.tsx
// =============================================================================
// Insight article page — /insights/[slug]
//
// Structure:
//   1. Article header   — dark gradient (custom, not PageHeader), article title
//                         + meta (category, date, read time, author)
//   2. Article body     — cream bg, narrow centered column, typographic styling
//   3. Related articles — cream bg, the other two articles as cards
//   4. CTA section      — wave-500 bg
//
// Next.js 15: params is a Promise — component is async and awaits it.
// dynamicParams = false + generateStaticParams pre-builds all article pages.
// =============================================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  getInsightBySlug,
  insightArticles,
  INSIGHT_SLUGS,
  type InsightFull,
} from "@/data/insights";

// --- Route configuration ----------------------------------------------------

export const dynamicParams = false;

export function generateStaticParams() {
  return INSIGHT_SLUGS.map((slug) => ({ slug }));
}

// --- Metadata ----------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) return { title: "Insights" };

  return {
    title: article.title,
    description: article.excerpt,
  };
}

// --- Article header ----------------------------------------------------------
// A custom header with more editorial weight than the standard PageHeader.
// The dark gradient, large title, and meta strip give it a publication feel.

function ArticleHeader({ article }: { article: InsightFull }) {
  return (
    <section
      aria-label="Article header"
      className="relative overflow-hidden bg-linear-to-br from-wave-700 via-wave-600 to-wave-500 pt-16"
    >
      {/* Decorative background wave (same as PageHeader) */}
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
          <path
            d="M1.23,572.13l53.34-7.32c53.44-7.22,160.13-21.76,266.92-22.76,106.79-1,213.47,11.64,320.26,22.57,106.79,10.93,213.47,20.05,320.26,17.75,106.79-2.31,213.47-16.15,320.26-23.57,106.79-7.52,213.47-8.63,320.26-1.5,106.79,7.02,213.47,22.26,266.92,29.98l53.34,7.83V12.5H1.23v559.63Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-[8vw] pb-20 pt-14 lg:pt-20">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5">
            {[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: article.title },
            ].map((item, index) => (
              <li key={item.label} className="flex items-center gap-1.5">
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
                  <span
                    aria-current="page"
                    className="line-clamp-1 font-body text-body-xs uppercase tracking-[0.2em] text-wave-200"
                  >
                    {article.title}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Category + meta row */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="rounded-sm bg-brand-gold/20 px-3 py-1 font-body text-body-xs font-medium uppercase tracking-wider text-brand-gold">
            {article.category}
          </span>
          <span className="font-body text-body-xs text-wave-300/70">
            {article.date} · {article.readTime}
          </span>
        </div>

        {/* Article title */}
        <h1 className="mb-6 font-heading text-display-lg leading-[1.05] text-cream">
          {article.title}
        </h1>

        <div className="mb-6 h-px w-16 bg-brand-gold" aria-hidden="true" />

        {/* Author */}
        <p className="font-body text-body-sm text-wave-200/70">
          By{" "}
          <span className="font-medium text-wave-200">
            {article.author}
          </span>
          {" · "}
          <span>{article.authorTitle}</span>
        </p>

      </div>

      {/* Wave bottom divider into cream */}
      <div
        aria-hidden="true"
        className="relative z-10 -mb-px w-full overflow-hidden leading-0"
      >
        <svg
          viewBox="0 0 1440 64"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="h-16 w-full fill-cream"
        >
          <path d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z" />
        </svg>
      </div>
    </section>
  );
}

// --- Page component ----------------------------------------------------------

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) notFound();

  // The other articles — used in the "More insights" section below the body
  const relatedArticles = insightArticles.filter((a) => a.slug !== slug);

  return (
    <main>

      <ArticleHeader article={article} />

      {/* =====================================================================
          ARTICLE BODY
          Narrow centered column (max-w-3xl) with generous line height and
          paragraph spacing — optimised for comfortable long-form reading.
          Each paragraph is rendered as its own <p> from the body array.
      ===================================================================== */}
      <section className="bg-cream py-16 lg:py-24">
        <AnimateIn>
          <div className="mx-auto max-w-3xl px-[8vw]">

            {/* Lead paragraph — slightly larger */}
            <p className="mb-8 font-body text-body-xl leading-relaxed text-wave-700">
              {article.body[0]}
            </p>

            {/* Remaining paragraphs */}
            {article.body.slice(1).map((paragraph, i) => (
              <p
                key={i}
                className="mb-6 font-body text-body-lg leading-relaxed text-shadow-grey"
              >
                {paragraph}
              </p>
            ))}

          </div>
        </AnimateIn>
      </section>

      {/* =====================================================================
          MORE INSIGHTS
          The other two articles — keeps users engaged and surfaces related
          content without requiring a recommendation engine.
      ===================================================================== */}
      {relatedArticles.length > 0 && (
        <section className="bg-cream pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-[8vw]">

            <AnimateIn>
              <div className="mb-10 border-t border-wave-200/30 pt-16">
                <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-brand-gold/80">
                  Continue reading
                </p>
                <h2 className="font-heading text-display-md leading-tight text-wave-700">
                  More from our insights.
                </h2>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {relatedArticles.map((related, i) => (
                <AnimateIn key={related.slug} delay={i * 0.1}>
                  <Card variant="insight" insight={related} />
                </AnimateIn>
              ))}
            </div>

          </div>
        </section>
      )}

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
                  Questions about what you&apos;ve read?
                </h2>
                <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-200/80">
                  Our publications are an introduction to the issues we advise
                  on every day. If this article is relevant to your situation,
                  we&apos;d welcome a conversation.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href="/contact" arrow>
                  Get in touch
                </Button>
                <Button variant="secondary" size="lg" href="/insights">
                  All insights
                </Button>
              </div>

            </div>
          </AnimateIn>

        </div>
      </section>

    </main>
  );
}
