// =============================================================================
// src/app/jurisdictions/page.tsx
// =============================================================================
// Jurisdictions page — /jurisdictions
//
// Structure:
//   1. PageHeader       — dark gradient, divider into cream
//   2. Intro section    — cream bg, positioning statement
//   3. Three jurisdiction panels — each on its own alternating background
//        UAE Mainland  — cream
//        ADGM          — wave-100/20 (very light tinted)
//        DIFC          — cream
//   4. Comparison strip — wave-700 bg, side-by-side key attributes table
//   5. CTA section      — wave-500 bg
//
// Server Component — no interactivity needed on this page.
// =============================================================================

import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";

// --- Metadata ----------------------------------------------------------------

export const metadata: Metadata = {
  title: "Jurisdictions",
  description:
    "Amara & Partners advises across UAE mainland, ADGM, and DIFC. We explain " +
    "the differences between each legal framework and what they mean for your " +
    "business.",
};

// --- Static data -------------------------------------------------------------

interface JurisdictionData {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  tagline: string;
  description: string;
  bodyText: string;
  keyPoints: string[];
}

const JURISDICTIONS: JurisdictionData[] = [
  {
    id: "mainland",
    name: "UAE Mainland",
    shortName: "Mainland",
    badge: "Onshore",
    tagline: "The UAE's federal legal framework, governing most commercial activity in the country.",
    description:
      "UAE mainland law is the primary legal framework for businesses incorporated under the UAE Commercial " +
      "Companies Law. Onshore companies are subject to federal legislation administered through the Ministry " +
      "of Economy and the relevant emirate-level authorities, with Abu Dhabi's Department of Economic " +
      "Development (DED) overseeing most commercial registrations in the emirate.",
    bodyText:
      "The UAE Civil Code and Commercial Transactions Law form the foundation of the mainland legal system, " +
      "with specialised legislation covering corporate, employment, real estate, banking, and regulatory " +
      "matters. Disputes are resolved through the UAE courts (the Abu Dhabi Courts, Dubai Courts, or other " +
      "emirate courts as relevant), with the option of arbitration under DIAC or other arbitral institutions " +
      "for commercial disputes where the parties have agreed to it. The 2020 amendments to the Commercial " +
      "Companies Law significantly liberalised foreign ownership requirements, allowing 100% foreign " +
      "ownership in most sectors without the need for a UAE national partner.",
    keyPoints: [
      "100% foreign ownership now available in most sectors",
      "Civil and commercial law framework (Arabic language courts)",
      "Access to UAE courts and national arbitration centres",
      "Emiratisation requirements apply above certain workforce thresholds",
      "Real estate freehold areas available for foreign ownership",
    ],
  },
  {
    id: "adgm",
    name: "Abu Dhabi Global Market",
    shortName: "ADGM",
    badge: "International Financial Centre",
    tagline: "Abu Dhabi's international financial centre: English common law, English-language courts.",
    description:
      "The Abu Dhabi Global Market (ADGM) is an international financial centre established on Al Maryah " +
      "Island, operating under English common law. As a federal financial free zone, ADGM has its own " +
      "regulatory authority (the Financial Services Regulatory Authority, FSRA), court system (the ADGM " +
      "Courts), and company registry.",
    bodyText:
      "ADGM applies English common law as its foundational legal framework, supplemented by ADGM-specific " +
      "legislation covering financial services, companies, employment, and arbitration. The ADGM Courts " +
      "(which include a Court of First Instance and a Court of Appeal) are presided over by senior " +
      "English judiciary and apply English common law principles. This makes ADGM an attractive domicile " +
      "for international businesses, investment funds, and financial services firms that require the " +
      "predictability of a common law framework. The ADGM Arbitration Centre (ADGMAC) " +
      "provides a dedicated arbitration venue, and ADGM judgements benefit from reciprocal enforcement " +
      "arrangements within the UAE and with a growing number of foreign jurisdictions.",
    keyPoints: [
      "English common law applies in full",
      "ADGM Courts staffed by senior English and common law judges",
      "FSRA regulation for financial services businesses",
      "Preferred domicile for investment funds and asset management",
      "ADGMAC arbitration centre on-island",
    ],
  },
  {
    id: "difc",
    name: "Dubai International Financial Centre",
    shortName: "DIFC",
    badge: "International Financial Centre",
    tagline: "Dubai's international financial centre: established English-law framework, large professional community.",
    description:
      "The Dubai International Financial Centre (DIFC) is the region's longest-established international " +
      "financial centre, operating on a separate legal and regulatory framework from Dubai mainland. Like " +
      "ADGM, DIFC applies English common law, has its own courts (the DIFC Courts), and is regulated by " +
      "the Dubai Financial Services Authority (DFSA).",
    bodyText:
      "DIFC has been operating since 2004 and has developed a substantial professional community, a deep " +
      "arbitration practice, and an extensive body of DIFC Court judgements that provide meaningful " +
      "precedent. The DIFC Courts have developed an expansive jurisdiction over the years, including " +
      "through the opt-in mechanism that allows parties with no connection to DIFC to elect DIFC Court " +
      "jurisdiction for their disputes. The DIFC-LCIA Arbitration Centre (now operating as the DIFC " +
      "Arbitration Institute) has handled a significant volume of high-value commercial arbitrations. " +
      "For businesses choosing between ADGM and DIFC, the decision typically turns on the specific " +
      "regulatory framework required, the geography of the business's client base, and the sector.",
    keyPoints: [
      "English common law applies in full",
      "DIFC Courts with extensive precedent (operating since 2004)",
      "DFSA regulation for financial services businesses",
      "Opt-in jurisdiction available for non-DIFC parties",
      "Strong arbitration tradition, DIFC Arbitration Institute",
    ],
  },
];

interface ComparisonRow {
  attribute: string;
  mainland: string;
  adgm: string;
  difc: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    attribute: "Legal system",
    mainland: "UAE Civil Law",
    adgm: "English Common Law",
    difc: "English Common Law",
  },
  {
    attribute: "Court language",
    mainland: "Arabic",
    adgm: "English",
    difc: "English",
  },
  {
    attribute: "Foreign ownership",
    mainland: "100% in most sectors",
    adgm: "100%",
    difc: "100%",
  },
  {
    attribute: "Regulatory body",
    mainland: "DED / Federal",
    adgm: "FSRA",
    difc: "DFSA",
  },
  {
    attribute: "Arbitration centre",
    mainland: "DIAC",
    adgm: "ADGMAC",
    difc: "DIFC Arbitration Institute",
  },
];

// --- Jurisdiction panel -----------------------------------------------------

function JurisdictionPanel({
  jurisdiction,
  background,
}: {
  jurisdiction: JurisdictionData;
  background: string;
}) {
  return (
    <section className={`${background} py-20 lg:py-28`} id={jurisdiction.id}>
      <div className="mx-auto max-w-7xl px-[8vw]">
        <AnimateIn>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr] lg:gap-20">

            {/* Left: content */}
            <div>
              {/* Badge */}
              <span className="mb-5 inline-block rounded-sm bg-wave-400/10 px-3 py-1 font-body text-body-xs font-medium uppercase tracking-wider text-wave-400">
                {jurisdiction.badge}
              </span>

              <h2 className="mb-2 font-heading text-display-md leading-tight text-wave-700">
                {jurisdiction.name}
              </h2>

              <div className="mb-6 h-px w-16 bg-brand-gold" aria-hidden="true" />

              <p className="mb-6 font-body text-body-lg leading-relaxed text-shadow-grey">
                {jurisdiction.description}
              </p>

              <p className="font-body text-body-lg leading-relaxed text-shadow-grey">
                {jurisdiction.bodyText}
              </p>
            </div>

            {/* Right: key points */}
            <div className="flex flex-col justify-start">
              <p className="mb-5 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-400/70">
                Key features
              </p>
              <ul className="flex flex-col gap-3" aria-label={`Key features of ${jurisdiction.name}`}>
                {jurisdiction.keyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    {/* Gold dot bullet */}
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold"
                      aria-hidden="true"
                    />
                    <span className="font-body text-body-md leading-relaxed text-shadow-grey">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

// --- Page component ----------------------------------------------------------

export default function JurisdictionsPage() {
  return (
    <main>

      <PageHeader
        title="Jurisdictions"
        eyebrow="Where We Practise"
        subtitle="We advise across all three of the UAE's principal legal frameworks: mainland, ADGM, and DIFC."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Jurisdictions" },
        ]}
        dividerFill="fill-cream"
      />

      {/* =======================================================================
          INTRO SECTION
      ======================================================================= */}
      <section className="bg-cream py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-[8vw]">
          <AnimateIn>
            <div className="max-w-[60ch]">
              <p className="mb-5 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-brand-gold/80">
                Three frameworks
              </p>
              <h2 className="mb-6 font-heading text-display-md leading-tight text-wave-700">
                The UAE operates three distinct legal systems.
              </h2>
              <div className="mb-6 h-px w-16 bg-brand-gold" aria-hidden="true" />
              <p className="mb-5 font-body text-body-lg leading-relaxed text-shadow-grey">
                The UAE mainland, the Abu Dhabi Global Market (ADGM), and the Dubai International
                Financial Centre (DIFC) each operate under separate legal frameworks. Different governing
                law, different courts, different regulatory authorities. Understanding which framework applies
                to your business is not just a technical question; it shapes how contracts are enforced, how
                disputes are resolved, and what regulatory obligations apply.
              </p>
              <p className="font-body text-body-lg leading-relaxed text-shadow-grey">
                Amara &amp; Partners practises across all three. Our team advises
                clients on the right structure for their specific circumstances and
                represents them in proceedings in UAE onshore courts, the ADGM
                Courts, and arbitral tribunals applying any of the three frameworks.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* =======================================================================
          THREE JURISDICTION PANELS
          Alternating light backgrounds to visually separate each jurisdiction
          without heavy borders or dark section breaks.
      ======================================================================= */}
      <JurisdictionPanel jurisdiction={JURISDICTIONS[0]} background="bg-wave-100/30" />
      <JurisdictionPanel jurisdiction={JURISDICTIONS[1]} background="bg-cream" />
      <JurisdictionPanel jurisdiction={JURISDICTIONS[2]} background="bg-wave-100/30" />

      {/* =======================================================================
          COMPARISON STRIP
          Dark background, structured table comparing the three frameworks
          side-by-side. Allows quick scanning for key attributes.
      ======================================================================= */}
      <section className="bg-wave-700 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          <AnimateIn>
            <div className="mb-12">
              <h2 className="font-heading text-display-md leading-tight text-wave-100">
                At a glance
              </h2>
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto rounded-card border border-wave-600">
              <table className="w-full min-w-[600px]" aria-label="Jurisdiction comparison">
                <thead>
                  <tr className="border-b border-wave-600">
                    <th
                      scope="col"
                      className="px-6 py-4 text-start font-body text-body-xs font-semibold uppercase tracking-[0.2em] text-wave-300/60"
                    >
                      Attribute
                    </th>
                    {JURISDICTIONS.map((j) => (
                      <th
                        key={j.id}
                        scope="col"
                        className="px-6 py-4 text-start font-heading text-body-xl text-wave-100"
                      >
                        {j.shortName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr
                      key={row.attribute}
                      className={i % 2 === 0 ? "bg-wave-600/20" : ""}
                    >
                      <td className="px-6 py-4 font-body text-body-sm font-medium uppercase tracking-widest text-wave-300/60">
                        {row.attribute}
                      </td>
                      <td className="px-6 py-4 font-body text-body-md text-wave-200">
                        {row.mainland}
                      </td>
                      <td className="px-6 py-4 font-body text-body-md text-wave-200">
                        {row.adgm}
                      </td>
                      <td className="px-6 py-4 font-body text-body-md text-wave-200">
                        {row.difc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimateIn>

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
                  Not sure which framework applies?
                </h2>
                <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-200/80">
                  The right jurisdiction for your business depends on your
                  sector, client base, and operational structure. We&apos;ll
                  help you work through the decision.
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
