// =============================================================================
// src/components/sections/FirmIntro.tsx
// =============================================================================
// Zone 1 of the WaveSystem scroll driver.
// Appears on a cream background as the first wave layer peels away.
// Introduces the firm with a short positioning statement and four stat pills.
// =============================================================================

// No "use client" needed — this is a pure presentational Server Component.

interface StatItem {
  label: string;
  value: string;
}

const STATS: StatItem[] = [
  { label: "Established", value: "2019" },
  { label: "Location",    value: "Abu Dhabi" },
  { label: "Practice areas", value: "22" },
  { label: "Pillars",     value: "3" },
];

export function FirmIntro() {
  return (
    <div className="flex h-full flex-col justify-center px-[8vw] py-[10vh]">

      {/* Eyebrow */}
      <p className="mb-6 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-400">
        About the firm
      </p>

      {/* Heading */}
      <h2 className="mb-6 max-w-[18ch] font-heading text-display-lg leading-[1.05] text-wave-700">
        Depth that anchors every mandate.
      </h2>

      {/* Gold rule */}
      <div className="mb-8 h-px w-16 bg-brand-gold" aria-hidden="true" />

      {/* Positioning copy */}
      <p className="mb-4 max-w-[52ch] font-body text-body-lg leading-relaxed text-shadow-grey">
        Rooted in the UAE's legal and commercial landscape, Amara &amp; Partners
        brings institutional judgment to transactions, disputes, and regulatory
        questions that shape your outcomes.
      </p>
      <p className="mb-12 max-w-[52ch] font-body text-body-lg leading-relaxed text-shadow-grey">
        Based on Reem Island, Abu Dhabi, we work across the mainland, ADGM, and
        DIFC — advising businesses, investors, and institutions on their most
        consequential matters.
      </p>

      {/* Stat pills */}
      <dl className="flex flex-wrap gap-3">
        {STATS.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-0.5 rounded-card border border-wave-200/50 bg-wave-100/40 px-5 py-3"
          >
            <dt className="font-body text-body-xs font-medium uppercase tracking-[0.2em] text-wave-400/80">
              {label}
            </dt>
            <dd className="font-heading text-display-md leading-none text-wave-700">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
