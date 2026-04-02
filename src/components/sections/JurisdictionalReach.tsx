// =============================================================================
// src/components/sections/JurisdictionalReach.tsx
// =============================================================================
// Zone 4 of the WaveSystem scroll driver.
// Deep navy (wave-600) background. Three-column jurisdiction layout.
// Explains the firm's coverage across Mainland UAE, ADGM, and DIFC.
// =============================================================================

interface JurisdictionItem {
  code: string;         // Short identifier shown large
  name: string;         // Full name
  framework: string;    // Legal framework descriptor
  description: string;  // One-sentence explainer
  keyPoints: string[];  // 3 short bullet points
}

const JURISDICTIONS: JurisdictionItem[] = [
  {
    code: "UAE",
    name: "Mainland UAE",
    framework: "Federal & Emirate law",
    description:
      "Onshore commercial, civil, and regulatory matters governed by federal legislation and local emirate decrees.",
    keyPoints: [
      "Federal civil and commercial code",
      "Abu Dhabi & Dubai local courts",
      "Free zone licensing & structuring",
    ],
  },
  {
    code: "ADGM",
    name: "Abu Dhabi Global Market",
    framework: "English common law",
    description:
      "An independent financial free zone on Al Maryah Island, operating under English common law with its own courts and regulatory authority.",
    keyPoints: [
      "FSRA-regulated entities",
      "ADGM Courts & ADGM Arbitration Centre",
      "Fund, SPV & holding structures",
    ],
  },
  {
    code: "DIFC",
    name: "Dubai International Financial Centre",
    framework: "English law principles",
    description:
      "A leading global financial hub with an independent legal system modelled on English law, housing the DIFC Courts and DIAC.",
    keyPoints: [
      "DFSA-regulated businesses",
      "DIFC Courts & DIAC arbitration",
      "Cross-border finance & investment",
    ],
  },
];

export function JurisdictionalReach() {
  return (
    <div className="flex h-full flex-col justify-center px-[8vw] py-[8vh]">

      {/* Section header */}
      <div className="mb-10">
        <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
          Where we work
        </p>
        <h2 className="max-w-[28ch] font-heading text-display-md leading-[1.08] text-wave-100">
          One team. Three legal frameworks.
        </h2>
      </div>

      {/* Jurisdiction columns */}
      <div className="grid grid-cols-1 gap-px bg-wave-400/30 md:grid-cols-3">
        {JURISDICTIONS.map((j) => (
          <div
            key={j.code}
            className="flex flex-col gap-4 bg-wave-600 px-6 py-7 transition-colors duration-300 hover:bg-wave-500/60"
          >
            {/* Code — large, decorative */}
            <span
              aria-hidden="true"
              className="font-heading text-display-lg leading-none text-wave-400/40"
            >
              {j.code}
            </span>

            {/* Name + framework */}
            <div>
              <h3 className="font-heading text-display-md leading-tight text-wave-100">
                {j.name}
              </h3>
              <p className="mt-1 font-body text-body-xs font-medium uppercase tracking-[0.18em] text-brand-gold/80">
                {j.framework}
              </p>
            </div>

            {/* Gold rule */}
            <div className="h-px w-10 bg-brand-gold/50" aria-hidden="true" />

            {/* Description */}
            <p className="font-body text-body-sm leading-relaxed text-wave-100/70">
              {j.description}
            </p>

            {/* Key points */}
            <ul className="mt-auto flex flex-col gap-2" aria-label={`${j.name} key points`}>
              {j.keyPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 font-body text-body-xs text-wave-200/60"
                >
                  <span aria-hidden="true" className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-brand-gold/60" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
