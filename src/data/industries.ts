// =============================================================================
// src/data/industries.ts
// =============================================================================
// Enriched industry sector data for the /industries and /industries/[slug]
// pages. Lean navigation data lives in navigation.ts; this file provides
// the full descriptions, related practice areas, and key matters content
// needed to build out the detail pages.
//
// When a CMS is added (Phase 8), this static file is replaced by an API
// call, but the exported types remain the same.
//
// Industry slugs match those in navigation.ts:
//   aviation-space | engineering-construction | oil-gas | tmt | healthcare-life-sciences
// =============================================================================

export interface RelatedPractice {
  name: string;
  /** Links to the pillar page — individual area pages deferred to post-launch */
  href: string;
}

export interface KeyMatter {
  /** Short headline for a type of matter the firm handles in this sector */
  title: string;
  description: string;
}

export interface IndustryDetail {
  name: string;
  slug: string;
  /** Short one-liner — used as the subtitle in PageHeader */
  tagline: string;
  /** Two to three sentence sector overview for the detail page intro */
  description: string;
  /** Longer body paragraph giving more context on the firm's role */
  bodyText: string;
  /** 3–4 representative matter types */
  keyMatters: KeyMatter[];
  /** Cross-linked practice areas relevant to this sector */
  relatedPractices: RelatedPractice[];
}

// =============================================================================
// INDUSTRY DATA
// =============================================================================

export const industryDetails: IndustryDetail[] = [
  // ---------------------------------------------------------------------------
  // AVIATION AND SPACE
  // ---------------------------------------------------------------------------
  {
    name: "Aviation and Space",
    slug: "aviation-space",
    tagline: "Regulatory, financing, and transactional advice for aviation and emerging space operators.",
    description:
      "The UAE occupies a unique position at the intersection of global aviation routes and the rapidly " +
      "expanding commercial space sector. Abu Dhabi and Dubai together host some of the world's most " +
      "ambitious aerospace programmes, and the regulatory environment is evolving at pace to match.",
    bodyText:
      "We advise airlines, MRO operators, aircraft lessors, and emerging space ventures on the full " +
      "spectrum of legal requirements for operating in and through the UAE. Our team combines deep " +
      "knowledge of the UAE General Civil Aviation Authority (GCAA) regulatory framework with " +
      "transaction expertise in aircraft financing and asset-backed lending. As the UAE's space sector " +
      "matures under the oversight of the UAE Space Agency, we help clients navigate licensing, " +
      "spectrum allocation, and cross-border contractual arrangements with the rigour that " +
      "capital-intensive ventures demand.",
    keyMatters: [
      {
        title: "Aircraft Financing",
        description:
          "Structuring and documenting aircraft acquisition financing, operating leases, and " +
          "sale-leaseback arrangements under Cape Town Convention and UAE law.",
      },
      {
        title: "Regulatory Approvals",
        description:
          "GCAA licensing, air operator certificate advisory, and foreign carrier permit applications " +
          "for airlines and charter operators establishing UAE operations.",
      },
      {
        title: "MRO and Ground Services",
        description:
          "Commercial contract structuring, free zone establishment, and regulatory compliance for " +
          "MRO facilities and ground handling operators at UAE airports.",
      },
      {
        title: "Space Venture Advisory",
        description:
          "Licensing, IP protection, and commercial structuring for UAE Space Agency-regulated " +
          "ventures across satellite operations and launch services.",
      },
    ],
    relatedPractices: [
      { name: "Banking and Finance", href: "/practice/corporate" },
      { name: "Free Zone Structuring", href: "/practice/corporate" },
      { name: "Corporate Compliance", href: "/practice/regulatory" },
      { name: "Intellectual Property", href: "/practice/corporate" },
    ],
  },

  // ---------------------------------------------------------------------------
  // ENGINEERING AND CONSTRUCTION
  // ---------------------------------------------------------------------------
  {
    name: "Engineering and Construction",
    slug: "engineering-construction",
    tagline: "Contract structuring, dispute resolution, and procurement advisory for major projects.",
    description:
      "The UAE's infrastructure and real estate development pipeline remains one of the most active in " +
      "the world. Major projects across Abu Dhabi, Dubai, and the Northern Emirates involve complex " +
      "multi-party contractual frameworks, significant financing arrangements, and an elevated risk " +
      "of disputes arising from scope, delay, and payment.",
    bodyText:
      "We advise developers, contractors, subcontractors, and consultants on the full lifecycle of " +
      "engineering and construction engagements — from early procurement strategy and contract " +
      "negotiation through to claims management and dispute resolution. Our team is experienced in " +
      "FIDIC, NEC, and bespoke UAE contract forms, and our disputes practice has handled some of the " +
      "region's most complex construction arbitrations. We understand that construction disputes " +
      "require a combination of technical comprehension and procedural discipline, and we bring both.",
    keyMatters: [
      {
        title: "Contract Structuring and Negotiation",
        description:
          "Drafting and negotiating EPC, design-build, and professional services contracts for " +
          "major infrastructure and real estate development projects.",
      },
      {
        title: "Claims and Disputes",
        description:
          "Extension of time claims, loss and expense assessments, and representation in " +
          "construction arbitration proceedings under DIAC, ICC, and ad hoc rules.",
      },
      {
        title: "Procurement Advisory",
        description:
          "Tendering process design, bid evaluation legal support, and procurement compliance " +
          "for government and semi-government developers.",
      },
      {
        title: "Subcontract Chains",
        description:
          "Structuring and reviewing multi-tier subcontract arrangements to ensure back-to-back " +
          "alignment and enforceable payment protection mechanisms.",
      },
    ],
    relatedPractices: [
      { name: "Arbitration", href: "/practice/disputes" },
      { name: "Litigation", href: "/practice/disputes" },
      { name: "Real Estate", href: "/practice/corporate" },
      { name: "Corporate Commercial", href: "/practice/corporate" },
    ],
  },

  // ---------------------------------------------------------------------------
  // OIL AND GAS
  // ---------------------------------------------------------------------------
  {
    name: "Oil and Gas",
    slug: "oil-gas",
    tagline: "Upstream, midstream, and downstream advisory across the GCC energy sector.",
    description:
      "Abu Dhabi is home to some of the world's largest hydrocarbon reserves and an energy sector " +
      "undergoing significant transformation — towards gas, renewables, and downstream value creation. " +
      "The legal landscape for energy projects spans concession agreements, joint venture structures, " +
      "and a complex web of regulatory approvals.",
    bodyText:
      "We advise international oil companies, national oil companies, and their service contractors on " +
      "the legal aspects of upstream exploration and production, midstream infrastructure, and " +
      "downstream processing. Our team is experienced in ADNOC-related frameworks and the broader GCC " +
      "energy regulatory environment. We combine transactional expertise — joint ventures, farm-ins, " +
      "offtake agreements — with the disputes capability to resolve the commercial conflicts that " +
      "large-scale energy projects inevitably produce.",
    keyMatters: [
      {
        title: "Joint Ventures and Concessions",
        description:
          "Structuring upstream joint ventures, reviewing and negotiating concession agreements, " +
          "and advising on the equity and governance arrangements for energy projects.",
      },
      {
        title: "Service Contracts",
        description:
          "Drafting and reviewing EPCC, ICV-compliant service contracts, and supply agreements " +
          "for contractors and subcontractors working in the UAE energy sector.",
      },
      {
        title: "LNG and Gas Advisory",
        description:
          "Offtake agreements, gas sale and purchase contracts, and regulatory advisory for " +
          "liquefaction, regasification, and gas distribution projects.",
      },
      {
        title: "Energy Disputes",
        description:
          "Representation in arbitration and expert determination proceedings arising from " +
          "concession disputes, contractor claims, and joint operating agreement conflicts.",
      },
    ],
    relatedPractices: [
      { name: "Cross-Border M&A", href: "/practice/corporate" },
      { name: "Arbitration", href: "/practice/disputes" },
      { name: "Banking and Finance", href: "/practice/corporate" },
      { name: "Export Control", href: "/practice/regulatory" },
    ],
  },

  // ---------------------------------------------------------------------------
  // TECHNOLOGY, MEDIA AND TELECOMMUNICATIONS
  // ---------------------------------------------------------------------------
  {
    name: "Technology, Media and Telecommunications",
    slug: "tmt",
    tagline: "Data, licensing, IP, and regulatory counsel for TMT businesses operating in the UAE.",
    description:
      "The UAE has established itself as the region's foremost technology and innovation hub, with " +
      "ADGM and DIFC both developing regulatory frameworks specifically designed to attract and retain " +
      "technology businesses. The pace of regulatory change — particularly in data protection, AI " +
      "governance, and fintech — demands advisers who can keep up.",
    bodyText:
      "We advise technology companies, media businesses, and telecommunications operators across the " +
      "spectrum of legal challenges that a digital-first regulatory environment presents. Our team " +
      "combines expertise in UAE data protection law (PDPL) with transactional capability across " +
      "technology licensing, IP commercialisation, and M&A in the technology sector. We also advise " +
      "on the ADGM and DIFC regulatory frameworks for fintech, digital asset businesses, and " +
      "regulated technology service providers — understanding both the opportunity and the compliance " +
      "obligations that these frameworks create.",
    keyMatters: [
      {
        title: "Data Protection Compliance",
        description:
          "PDPL gap analysis, privacy programme implementation, and data processing agreement " +
          "review for technology businesses processing UAE resident data.",
      },
      {
        title: "Technology Licensing and IP",
        description:
          "Software licensing, SaaS agreements, IP assignment and licensing structuring for " +
          "technology vendors and buyers operating in the UAE.",
      },
      {
        title: "Fintech and Digital Assets",
        description:
          "ADGM and DIFC regulatory framework advisory for fintech ventures, payment service " +
          "providers, and digital asset businesses seeking UAE licensing.",
      },
      {
        title: "Technology M&A",
        description:
          "Due diligence, structuring, and documentation for acquisitions and investments in " +
          "technology businesses with UAE operations or customers.",
      },
    ],
    relatedPractices: [
      { name: "Data Protection (PDPL)", href: "/practice/regulatory" },
      { name: "Intellectual Property", href: "/practice/corporate" },
      { name: "Corporate Compliance", href: "/practice/regulatory" },
      { name: "Cross-Border M&A", href: "/practice/corporate" },
    ],
  },

  // ---------------------------------------------------------------------------
  // HEALTHCARE AND LIFE SCIENCES
  // ---------------------------------------------------------------------------
  {
    name: "Healthcare and Life Sciences",
    slug: "healthcare-life-sciences",
    tagline: "Regulatory pathways, licensing, and commercial structuring for healthcare operators.",
    description:
      "Abu Dhabi's healthcare sector is one of the most heavily regulated in the region, overseen by " +
      "the Department of Health (DOH), the Health Authority Abu Dhabi (HAAD), and a range of federal " +
      "and emirate-level bodies. International healthcare operators and life sciences businesses " +
      "entering or expanding in the UAE face a complex matrix of approvals, licensing requirements, " +
      "and ongoing compliance obligations.",
    bodyText:
      "We advise hospitals, clinics, pharmaceutical companies, medical device distributors, and health " +
      "technology businesses on the legal dimensions of operating in the UAE healthcare market. Our " +
      "team combines regulatory expertise — DOH, MOHAP, and ADGM HealthTech framework advisory — " +
      "with transactional capability for M&A, joint ventures, and commercial contracts in the sector. " +
      "We also advise on the employment and governance frameworks that healthcare operators must " +
      "maintain, and on the data protection obligations that arise from processing patient data under " +
      "both the PDPL and sector-specific health data regulations.",
    keyMatters: [
      {
        title: "Facility Licensing",
        description:
          "DOH and MOHAP healthcare facility licensing applications, renewal advisory, and " +
          "regulatory compliance programmes for hospitals, day surgery centres, and polyclinics.",
      },
      {
        title: "Pharmaceutical and Device Registration",
        description:
          "Advisory on MOHAP product registration, import permit applications, and marketing " +
          "authorisation processes for pharmaceutical and medical device companies.",
      },
      {
        title: "Healthcare M&A",
        description:
          "Due diligence, structuring, and regulatory clearance advisory for acquisitions and " +
          "joint ventures involving licensed UAE healthcare facilities.",
      },
      {
        title: "Health Data and Privacy",
        description:
          "Advisory on the intersection of PDPL obligations and sector-specific health data " +
          "regulations, including patient consent frameworks and cross-border data transfer.",
      },
    ],
    relatedPractices: [
      { name: "Healthcare Regulatory", href: "/practice/regulatory" },
      { name: "Data Protection (PDPL)", href: "/practice/regulatory" },
      { name: "Employment and Pension", href: "/practice/regulatory" },
      { name: "Cross-Border M&A", href: "/practice/corporate" },
    ],
  },
];

// =============================================================================
// HELPERS
// =============================================================================

/** Look up an industry by its slug. Returns undefined if not found. */
export function getIndustryBySlug(slug: string): IndustryDetail | undefined {
  return industryDetails.find((i) => i.slug === slug);
}

/** All valid industry slugs — used by generateStaticParams. */
export const INDUSTRY_SLUGS = industryDetails.map((i) => i.slug);
