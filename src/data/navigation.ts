// =============================================================================
// src/data/navigation.ts
// =============================================================================
// Single source of truth for all navigation link data.
// When the CMS is added in a later phase, this static data gets replaced
// by a fetch -- but the shape of the types stays the same.
// =============================================================================

// -- PRACTICE AREAS -----------------------------------------------------------

export interface PracticeArea {
    name: string;
    slug: string;
  }
  
  export interface PracticePillar {
    number: string;
    name: string;
    slug: string;
    description: string;
    areas: PracticeArea[];
  }
  
  export const practicePillars: PracticePillar[] = [
    {
      number: "01",
      name: "Corporate & Transactions",
      slug: "corporate",
      description: "Structuring, financing, and executing complex transactions across the UAE and beyond.",
      areas: [
        { name: "Corporate Commercial",          slug: "corporate-commercial" },
        { name: "Cross-Border M&A",              slug: "cross-border-ma" },
        { name: "Free Zone Structuring",         slug: "free-zone-structuring" },
        { name: "Banking and Finance",           slug: "banking-finance" },
        { name: "Islamic Finance",               slug: "islamic-finance" },
        { name: "Real Estate",                   slug: "real-estate" },
        { name: "Intellectual Property",         slug: "intellectual-property" },
      ],
    },
    {
      number: "02",
      name: "Disputes",
      slug: "disputes",
      description: "Resolving complex commercial disputes through litigation, arbitration, and mediation.",
      areas: [
        { name: "Litigation",                    slug: "litigation" },
        { name: "Arbitration",                   slug: "arbitration" },
        { name: "Mediation",                     slug: "mediation" },
        { name: "Dispute Resolution",            slug: "dispute-resolution" },
      ],
    },
    {
      number: "03",
      name: "Regulatory & Compliance",
      slug: "regulatory",
      description:
        "Navigating the UAE's evolving regulatory landscape with precision and practical clarity.",
      areas: [
        { name: "Corporate Compliance",          slug: "corporate-compliance" },
        { name: "Data Protection (PDPL)",        slug: "data-protection" },
        { name: "Export Control",                slug: "export-control" },
        { name: "Tax Advisory / FTA",            slug: "tax-advisory" },
        { name: "Healthcare Regulatory",         slug: "healthcare-regulatory" },
        { name: "Employment and Pension",        slug: "employment-pension" },
        { name: "Legislative Drafting",          slug: "legislative-drafting" },
      ],
    },
  ];
  
  // -- INDUSTRIES ---------------------------------------------------------------
  
  export interface Industry {
    name: string;
    slug: string;
    description: string;
  }
  
  // Industries uses the same MegaMenu component but rendered as a single-column
  // list rather than three pillar columns.
  export const industries: Industry[] = [
    {
      name: "Aviation and Space",
      slug: "aviation-space",
      description: "Regulatory, financing, and transactional advice for aviation and emerging space operators.",
    },
    {
      name: "Engineering and Construction",
      slug: "engineering-construction",
      description: "Contract structuring, dispute resolution, and procurement for major projects.",
    },
    {
      name: "Oil and Gas",
      slug: "oil-gas",
      description: "Upstream, midstream, and downstream advisory across the GCC energy sector.",
    },
    {
      name: "Technology, Media and Telecommunications",
      slug: "tmt",
      description: "Data, licensing, IP, and regulatory counsel for TMT businesses operating in the UAE.",
    },
    {
      name: "Healthcare and Life Sciences",
      slug: "healthcare-life-sciences",
      description: "Regulatory pathways, licensing, and commercial structuring for healthcare operators.",
    },
  ];
  
  // -- TOP-LEVEL NAV LINKS ------------------------------------------------------
  
  // These are the simple direct links (no dropdown)
  export const navLinks = [
    { label: "Insights",      href: "/insights" },
    { label: "Jurisdictions", href: "/jurisdictions" },
    { label: "About",         href: "/about" },
  ];