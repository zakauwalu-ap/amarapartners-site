// =============================================================================
// src/components/sections/JurisdictionalReach.tsx
// =============================================================================
// Home — three legal frameworks (mainland, ADGM, DIFC).
// =============================================================================

interface JurisdictionItem {
  code: string;
  name: string;
  framework: string;
  description: string;
  keyPoints: string[];
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
      "ADGM Courts & Arbitration Centre",
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
    <div className="flex min-h-screen flex-col justify-center px-[8vw] py-[8vh]">

      <div className="mb-10">
        <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
          Jurisdictions
        </p>
        <h2 className="max-w-[28ch] font-heading text-display-md leading-[1.08] text-wave-100">
          One country, three legal systems.
        </h2>
        <p className="mt-5 max-w-[52ch] font-body text-body-lg leading-relaxed text-wave-200/75">
          Each with its own courts, regulators, and legislation. We practise across all of them.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px bg-wave-400/30 md:grid-cols-3">
        {JURISDICTIONS.map((j) => (
          <div
            key={j.code}
            className="flex flex-col gap-4 bg-wave-600 px-6 py-7 transition-colors duration-300 hover:bg-wave-500/60"
          >
            <span
              aria-hidden="true"
              className="font-heading text-display-lg leading-none text-wave-400/40"
            >
              {j.code}
            </span>

            <div>
              <h3 className="font-heading text-display-md leading-tight text-wave-100">
                {j.name}
              </h3>
              <p className="mt-1 font-body text-body-xs font-medium uppercase tracking-[0.18em] text-brand-gold/80">
                {j.framework}
              </p>
            </div>

            <div className="h-px w-10 bg-brand-gold/50" aria-hidden="true" />

            <p className="font-body text-body-sm leading-relaxed text-wave-100/70">
              {j.description}
            </p>

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
