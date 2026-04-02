// =============================================================================
// src/data/practiceAreas.ts
// =============================================================================
// Enriched practice area data for the /practice and /practice/[slug] pages.
// This file is the rich counterpart to the lean navigation data in
// navigation.ts. When a CMS is added (Phase 8), both files get replaced by
// API calls, but the exported types stay the same.
//
// Pillar slugs deliberately match those in navigation.ts:
//   corporate | disputes | regulatory
// =============================================================================

export interface PracticeAreaDetail {
  name: string;
  slug: string;
  /** One to two sentences describing this specific area of practice. */
  description: string;
}

export interface PillarDetail {
  /** Display number (01 / 02 / 03) */
  number: string;
  name: string;
  slug: string;
  /** Short one-liner — used as the subtitle in PageHeader */
  tagline: string;
  /** Two to three sentence description used on the pillar detail page */
  description: string;
  areas: PracticeAreaDetail[];
}

// =============================================================================
// PILLAR DATA
// =============================================================================

export const pillarDetails: PillarDetail[] = [
  // ---------------------------------------------------------------------------
  // PILLAR 1: CORPORATE & TRANSACTIONS
  // ---------------------------------------------------------------------------
  {
    number: "01",
    name: "Corporate & Transactions",
    slug: "corporate",
    tagline: "Structuring, financing, and executing complex transactions across the UAE and beyond.",
    description:
      "Our Corporate & Transactions pillar advises on the full lifecycle of commercial activity — from " +
      "incorporation and entity structuring through to complex cross-border deals and financing. We work " +
      "with regional conglomerates, international investors, financial institutions, and family offices " +
      "navigating the UAE's commercial, financial, and free zone landscape with the discipline and " +
      "judgement that demanding mandates require.",
    areas: [
      {
        name: "Corporate Commercial",
        slug: "corporate-commercial",
        description:
          "Formation, governance, and ongoing advisory for companies operating across the UAE mainland, " +
          "ADGM, and DIFC. We advise on shareholder arrangements, board matters, commercial contracts, " +
          "and the corporate lifecycle from incorporation through to restructuring.",
      },
      {
        name: "Cross-Border M&A",
        slug: "cross-border-ma",
        description:
          "Due diligence, deal structuring, and transaction execution for acquisitions and disposals " +
          "involving GCC and international counterparties. We coordinate across legal systems to close " +
          "deals cleanly and on schedule.",
      },
      {
        name: "Free Zone Structuring",
        slug: "free-zone-structuring",
        description:
          "Establishment advisory, licensing, regulatory structuring, and ongoing corporate governance " +
          "for entities in Abu Dhabi's two leading international financial centres — the ADGM and the DIFC. " +
          "We advise on the optimal structure for each client's specific operational and commercial objectives.",
      },
      {
        name: "Banking and Finance",
        slug: "banking-finance",
        description:
          "Loan documentation, security structuring, facility agreements, and project finance advisory " +
          "for lenders and borrowers across the UAE. We handle syndicated lending, bilateral facilities, " +
          "and security enforcement with equal familiarity.",
      },
      {
        name: "Islamic Finance",
        slug: "islamic-finance",
        description:
          "Sharia-compliant financing structures including murabaha, ijara, sukuk, and musharaka — " +
          "from initial structuring through to documentation and execution. We work closely with " +
          "Sharia supervisory boards to deliver legally sound and commercially viable structures.",
      },
      {
        name: "Real Estate",
        slug: "real-estate",
        description:
          "Acquisition, disposal, development structuring, and leasehold advisory for commercial and " +
          "residential real estate across the UAE. We advise developers, investors, and occupiers on " +
          "transactions in both freehold and leasehold markets.",
      },
      {
        name: "Intellectual Property",
        slug: "intellectual-property",
        description:
          "Registration, protection, and enforcement of trade marks, patents, and copyright for " +
          "businesses operating in the UAE. We advise on IP strategy, licensing arrangements, " +
          "and enforcement proceedings in both onshore and free zone contexts.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // PILLAR 2: DISPUTES
  // ---------------------------------------------------------------------------
  {
    number: "02",
    name: "Disputes",
    slug: "disputes",
    tagline: "Resolving complex commercial disputes through litigation, arbitration, and mediation.",
    description:
      "Our Disputes pillar handles complex commercial litigation and arbitration across the UAE's court " +
      "systems and leading arbitral institutions. We combine sharp procedural knowledge with commercial " +
      "judgment — understanding that how a dispute resolves shapes the relationship, reputation, and " +
      "commercial position that follows. We advise on strategy from the first warning sign, not just " +
      "once proceedings have been issued.",
    areas: [
      {
        name: "Litigation",
        slug: "litigation",
        description:
          "Representation before UAE onshore courts, including the Abu Dhabi Courts and the Abu Dhabi " +
          "Commercial Court, in complex commercial, contractual, and corporate disputes. We advise on " +
          "strategy, interim relief, enforcement, and appeal.",
      },
      {
        name: "Arbitration",
        slug: "arbitration",
        description:
          "Advisory and representation in DIAC, ICC, LCIA, and ad hoc arbitrations arising from " +
          "commercial contracts, construction disputes, and shareholder matters. We manage proceedings " +
          "from the notice of arbitration through to award enforcement.",
      },
      {
        name: "Mediation",
        slug: "mediation",
        description:
          "Strategic advisory and representation in formal and informal mediation processes across UAE " +
          "and international forums. We approach mediation as a tool for achieving durable commercial " +
          "outcomes, not a procedural step before returning to litigation.",
      },
      {
        name: "Dispute Resolution",
        slug: "dispute-resolution",
        description:
          "Integrated advisory on the appropriate resolution forum and strategy for complex commercial " +
          "disputes. We assess the merits, evaluate procedural options, and advise on the most efficient " +
          "path to resolution — whether through courts, arbitration, or alternative mechanisms.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // PILLAR 3: REGULATORY & COMPLIANCE
  // ---------------------------------------------------------------------------
  {
    number: "03",
    name: "Regulatory & Compliance",
    slug: "regulatory",
    tagline: "Navigating the UAE's evolving regulatory landscape with precision and practical clarity.",
    description:
      "Our Regulatory & Compliance pillar supports businesses operating in one of the world's most " +
      "active and rapidly evolving regulatory environments. From data protection and corporate tax to " +
      "sector-specific licensing and legislative frameworks, we translate regulatory complexity into " +
      "operational clarity. Our team has advised government entities, multinational corporations, and " +
      "regional businesses on the full spectrum of UAE regulatory requirements.",
    areas: [
      {
        name: "Corporate Compliance",
        slug: "corporate-compliance",
        description:
          "UAE commercial company law compliance, governance frameworks, and regulatory reporting for " +
          "onshore and free zone entities. We assist boards and management in maintaining robust " +
          "compliance postures as the regulatory environment continues to evolve.",
      },
      {
        name: "Data Protection (PDPL)",
        slug: "data-protection",
        description:
          "Compliance advisory, gap analysis, and implementation support for Federal Decree-Law " +
          "No. 45 of 2021 — the UAE Personal Data Protection Law. We advise on data processing " +
          "obligations, cross-border data transfers, and enforcement readiness.",
      },
      {
        name: "Export Control",
        slug: "export-control",
        description:
          "Compliance advisory for businesses subject to UAE, US, EU, and UK export control and " +
          "sanctions regimes. We advise on licensing requirements, restricted party screening, " +
          "and internal compliance programme design.",
      },
      {
        name: "Tax Advisory / FTA",
        slug: "tax-advisory",
        description:
          "Corporate tax compliance, VAT advisory, and engagement with the UAE Federal Tax Authority " +
          "for businesses of all sizes. We advise on corporate tax structuring, VAT registration and " +
          "compliance, and transfer pricing considerations.",
      },
      {
        name: "Healthcare Regulatory",
        slug: "healthcare-regulatory",
        description:
          "Licensing, regulatory approvals, and compliance advisory for healthcare operators, " +
          "facilities, and life sciences businesses in the UAE. We advise across DHA, DOH, MOHAP, " +
          "and ADGM regulatory frameworks.",
      },
      {
        name: "Employment and Pension",
        slug: "employment-pension",
        description:
          "UAE Labour Law compliance, employment contract structuring, DIFC and ADGM employment " +
          "framework advisory, and end-of-service gratuity matters. We advise employers and " +
          "employees on their rights and obligations across all UAE jurisdictions.",
      },
      {
        name: "Legislative Drafting",
        slug: "legislative-drafting",
        description:
          "Advisory and drafting support for government entities and regulators developing " +
          "legislation, regulations, and policy frameworks. We bring rigorous legal drafting " +
          "discipline to the public sector mandate.",
      },
    ],
  },
];

// =============================================================================
// HELPERS
// =============================================================================

/** Look up a pillar by its slug. Returns undefined if not found. */
export function getPillarBySlug(slug: string): PillarDetail | undefined {
  return pillarDetails.find((p) => p.slug === slug);
}

/** All valid pillar slugs — used by generateStaticParams. */
export const PILLAR_SLUGS = pillarDetails.map((p) => p.slug);
