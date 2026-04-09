// =============================================================================
// src/components/sections/FeaturedInsights.tsx
// =============================================================================
// Home — featured insight cards and editorial framing from site copy deck.
// =============================================================================

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { featuredInsights } from "@/data/insights";

export function FeaturedInsights() {
  return (
    <div className="flex min-h-screen flex-col justify-center px-[8vw] py-[8vh]">

      <div className="mb-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div>
          <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-100/60">
            Insights
          </p>
          <h2 className="max-w-[20ch] font-heading text-display-md leading-[1.08] text-wave-100">
            We publish what we practise.
          </h2>
        </div>

        <div className="flex max-w-md flex-col gap-4 lg:text-end">
          <p className="font-body text-body-md leading-relaxed text-wave-200/80">
            Practical analysis from the areas of law we work in every day, published as the regulatory
            and commercial landscape shifts.
          </p>
          <p className="font-body text-body-sm leading-relaxed text-wave-200/70">
            Our publications address the legal questions that shape commercial outcomes in the UAE.
          </p>
          <Link
            href="/insights"
            className="font-body text-body-sm font-medium text-wave-200/70 underline-offset-4 transition-colors duration-200 hover:text-wave-100 hover:underline lg:ms-auto"
          >
            View all insights →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredInsights.map((insight) => (
          <Card
            key={insight.slug}
            variant="insight"
            insight={{
              title: insight.title,
              excerpt: insight.excerpt,
              date: insight.date,
              readTime: insight.readTime,
              category: insight.category,
              href: insight.href,
              image: insight.image,
              imageAlt: insight.imageAlt,
            }}
          />
        ))}
      </div>

      <Link
        href="/insights"
        className="mt-6 font-body text-body-sm font-medium text-wave-200/70 transition-colors duration-200 hover:text-wave-100 lg:hidden"
      >
        View all insights →
      </Link>
    </div>
  );
}
