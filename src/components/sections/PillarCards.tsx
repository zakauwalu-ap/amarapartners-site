// =============================================================================
// src/components/sections/PillarCards.tsx
// =============================================================================
// Zone 2 of the WaveSystem scroll driver.
// Dark (wave-700) background so the cream practice cards have maximum contrast.
// Three pillar cards sourced from the navigation data file.
// =============================================================================

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { practicePillars } from "@/data/navigation";

export function PillarCards() {
  return (
    <div className="flex min-h-screen flex-col justify-center px-[8vw] py-[8vh]">

      {/* Section header */}
      <div className="mb-10">
        <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/70">
          The Practice
        </p>
        <h2 className="max-w-[26ch] font-heading text-display-md leading-[1.08] text-wave-100">
          Three pillars. Twenty-two areas of focus.
        </h2>
      </div>

      {/* Pillar card grid — single column on mobile, three columns on lg+ */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {practicePillars.map((pillar) => (
          <Card
            key={pillar.slug}
            variant="practice"
            pillar={{
              number:      pillar.number,
              name:        pillar.name,
              description: pillar.description,
              href:        `/practice/${pillar.slug}`,
            }}
          />
        ))}
      </div>

      {/* Subtle footer link */}
      <p className="mt-8 font-body text-body-sm text-wave-200/50">
        <Link href="/practice" className="transition-colors duration-200 hover:text-wave-100">
          View all practice areas →
        </Link>
      </p>
    </div>
  );
}
