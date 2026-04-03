// =============================================================================
// src/components/sections/FeaturedInsights.tsx
// =============================================================================
// Zone 3 of the WaveSystem scroll driver.
// Medium-deep blue (wave-500) background. Three insight cards.
// Card images are placeholders — replace in Phase 7 with real photography.
// =============================================================================

import { Card } from "@/components/ui/Card";
import { featuredInsights } from "@/data/insights";

export function FeaturedInsights() {
  return (
    <div className="flex min-h-screen flex-col justify-center px-[8vw] py-[8vh]">

      {/* Section header */}
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-100/60">
            Insights
          </p>
          <h2 className="max-w-[26ch] font-heading text-display-md leading-[1.08] text-wave-100">
            Perspectives on law and business in the UAE.
          </h2>
        </div>

        {/* Desktop "View all" link — hidden on mobile */}
        <a
          href="/insights"
          className="hidden shrink-0 font-body text-body-sm font-medium text-wave-200/70 underline-offset-4 hover:text-wave-100 hover:underline lg:block"
        >
          View all insights →
        </a>
      </div>

      {/* Insight card grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredInsights.map((insight) => (
          <Card
            key={insight.slug}
            variant="insight"
            insight={{
              title:    insight.title,
              excerpt:  insight.excerpt,
              date:     insight.date,
              readTime: insight.readTime,
              category: insight.category,
              href:     insight.href,
              image:    insight.image,
              imageAlt: insight.imageAlt,
            }}
          />
        ))}
      </div>

      {/* Mobile "View all" link */}
      <a
        href="/insights"
        className="mt-6 block font-body text-body-sm font-medium text-wave-200/70 hover:text-wave-100 lg:hidden"
      >
        View all insights →
      </a>
    </div>
  );
}
