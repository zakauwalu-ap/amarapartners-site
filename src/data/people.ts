// =============================================================================
// src/data/people.ts
// =============================================================================
// Placeholder team data for /people and /people/[slug].
// The People section is built before launch but hidden from primary navigation;
// pages remain reachable by direct URL for staging and future activation.
// =============================================================================

export interface RelatedPracticeLink {
  name: string;
  href: string;
}

export interface PersonDetail {
  slug: string;
  name: string;
  role: string;
  initials: string;
  /** Shown on listing cards — keep to 2–3 short labels */
  specialisations: string[];
  /** Degrees, bar admissions, languages — listing page uses top items on bio optionally */
  qualifications: string[];
  bio: string[];
  relatedPractices: RelatedPracticeLink[];
  /** Shown on bio page; firm generic inbox is fine for placeholders */
  email: string;
}

export const people: PersonDetail[] = [
  {
    slug: "ahmed-al-amara",
    name: "Ahmed Al Amara",
    role: "Managing Partner",
    initials: "AA",
    specialisations: ["Corporate", "Cross-border M&A", "ADGM"],
    qualifications: [
      "LLB (Hons), UAE University",
      "Admitted to practise — Abu Dhabi",
      "English · Arabic",
    ],
    bio: [
      "Ahmed leads the firm’s Corporate & Transactions pillar and advises regional conglomerates, " +
        "sovereign-linked entities, and international investors on complex UAE mandates.",
      "His practice focuses on cross-border M&A, joint ventures, and governance matters spanning " +
        "mainland Abu Dhabi, the ADGM, and the DIFC. He is known for translating intricate " +
        "structuring questions into clear board-level recommendations.",
      "Before founding Amara & Partners in 2019, Ahmed practised with leading international firms " +
        "in the GCC. He remains closely involved in the firm’s most significant transactional matters.",
    ],
    relatedPractices: [
      { name: "Corporate Commercial", href: "/practice/corporate/corporate-commercial" },
      { name: "Cross-Border M&A", href: "/practice/corporate/cross-border-ma" },
      { name: "Free Zone Structuring", href: "/practice/corporate/free-zone-structuring" },
    ],
    email: "info@amarapartners.ae",
  },
  {
    slug: "sophia-mitchell",
    name: "Sophia Mitchell",
    role: "Senior Counsel",
    initials: "SM",
    specialisations: ["Banking & Finance", "Real Estate", "Islamic Finance"],
    qualifications: [
      "LLB, University of Melbourne",
      "Diploma in Legal Practice (England & Wales)",
      "English",
    ],
    bio: [
      "Sophia advises lenders and borrowers on conventional and Islamic financing structures, " +
        "with particular depth in real estate-backed facilities and syndicated lending in the UAE.",
      "She supports banks, corporates, and sponsors from term sheet through closing — including " +
        "security perfection across mainland and free zone registries.",
      "Sophia joined the firm from an international banking practice in Dubai and works seamlessly " +
        "with our disputes team when facilities require enforcement or restructuring advice.",
    ],
    relatedPractices: [
      { name: "Banking and Finance", href: "/practice/corporate/banking-finance" },
      { name: "Islamic Finance", href: "/practice/corporate/islamic-finance" },
      { name: "Real Estate", href: "/practice/corporate/real-estate" },
    ],
    email: "info@amarapartners.ae",
  },
  {
    slug: "khalid-al-mansoori",
    name: "Khalid Al Mansoori",
    role: "Partner",
    initials: "KM",
    specialisations: ["Regulatory", "Corporate Compliance", "Tax"],
    qualifications: [
      "LLM, London School of Economics",
      "Admitted to practise — Abu Dhabi",
      "English · Arabic",
    ],
    bio: [
      "Khalid heads the firm’s regulatory and compliance advisory work for clients navigating " +
        "the UAE’s evolving corporate, tax, and sector-specific obligations.",
      "He advises boards and general counsel on governance frameworks, FTA engagement, and " +
        "cross-border regulatory alignment — particularly where operating models span mainland " +
        "and international financial centre jurisdictions.",
      "Khalid regularly supports clients through regulatory inspections, voluntary disclosures, " +
        "and remediation programmes designed for sustainable compliance.",
    ],
    relatedPractices: [
      { name: "Corporate Compliance", href: "/practice/regulatory/corporate-compliance" },
      { name: "Tax Advisory / FTA", href: "/practice/regulatory/tax-advisory" },
      { name: "Data Protection (PDPL)", href: "/practice/regulatory/data-protection" },
    ],
    email: "info@amarapartners.ae",
  },
  {
    slug: "elena-volkov",
    name: "Elena Volkov",
    role: "Counsel",
    initials: "EV",
    specialisations: ["Arbitration", "Litigation", "Construction"],
    qualifications: [
      "Master of Laws (Dispute Resolution), Leiden University",
      "Admitted — New York (not practising)",
      "English · Russian",
    ],
    bio: [
      "Elena represents clients in high-value arbitrations under DIAC, ICC, and ad hoc rules, " +
        "with extensive experience in construction, energy, and shareholder disputes.",
      "She also advises on parallel court proceedings, interim relief, and award enforcement " +
        "before UAE onshore courts — ensuring a coherent strategy across forums.",
      "Elena’s written advocacy and hearing preparation are complemented by her early involvement " +
        "in dispute avoidance, including contract drafting and escalation protocol design.",
    ],
    relatedPractices: [
      { name: "Arbitration", href: "/practice/disputes/arbitration" },
      { name: "Litigation", href: "/practice/disputes/litigation" },
      { name: "Dispute Resolution", href: "/practice/disputes/dispute-resolution" },
    ],
    email: "info@amarapartners.ae",
  },
  {
    slug: "omar-hassan",
    name: "Omar Hassan",
    role: "Associate",
    initials: "OH",
    specialisations: ["Employment", "Data Protection"],
    qualifications: [
      "LLB, American University of Sharjah",
      "Admitted to practise — Abu Dhabi",
      "English · Arabic",
    ],
    bio: [
      "Omar advises employers and senior executives on UAE Labour Law, DIFC and ADGM employment " +
        "frameworks, and sensitive terminations, reorganisations, and incentive arrangements.",
      "He supports HR and legal teams on policy design, investigations, and settlement negotiations — " +
        "with a focus on practical documentation that withstands regulatory scrutiny.",
      "Omar’s data protection work includes PDPL gap analyses, privacy notices, and data processing " +
        "agreements for clients operating across the UAE and wider region.",
    ],
    relatedPractices: [
      { name: "Employment and Pension", href: "/practice/regulatory/employment-pension" },
      { name: "Data Protection (PDPL)", href: "/practice/regulatory/data-protection" },
      { name: "Corporate Commercial", href: "/practice/corporate/corporate-commercial" },
    ],
    email: "info@amarapartners.ae",
  },
];

export function getPersonBySlug(slug: string): PersonDetail | undefined {
  return people.find((p) => p.slug === slug);
}

export const PERSON_SLUGS = people.map((p) => p.slug);
