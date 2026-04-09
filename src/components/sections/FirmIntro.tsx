// =============================================================================
// src/components/sections/FirmIntro.tsx
// =============================================================================
// Home — "The Firm" band after industries: founding positioning and stat pills.
// =============================================================================

interface StatItem {
  label: string;
  value: string;
}

const STATS: StatItem[] = [
  { label: "Established", value: "2019" },
  { label: "Practice areas", value: "22" },
  { label: "Pillars", value: "3" },
  { label: "Base", value: "Abu Dhabi" },
];

export function FirmIntro() {
  return (
    <div className="flex min-h-screen flex-col justify-center px-[8vw] py-[10vh]">

      <p className="mb-6 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-400">
        The Firm
      </p>

      <h2 className="mb-6 max-w-[22ch] font-heading text-display-lg leading-[1.05] text-wave-700">
        Founded in 2019. Rooted in Abu Dhabi.
      </h2>

      <div className="mb-8 h-px w-16 bg-brand-gold" aria-hidden="true" />

      <p className="mb-4 max-w-[52ch] font-body text-body-lg leading-relaxed text-shadow-grey">
        Amara &amp; Partners is a full-service legal consultancy advising clients across the corporate,
        disputes, and regulatory spectrum. We were founded on a conviction: the quality of legal counsel
        is determined by the people delivering it and the seriousness with which they treat each instruction.
      </p>
      <p className="mb-12 max-w-[52ch] font-body text-body-lg leading-relaxed text-shadow-grey">
        That conviction informs who we hire, how we work, and how we engage with every client relationship.
      </p>

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
