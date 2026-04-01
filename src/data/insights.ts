// =============================================================================
// src/data/insights.ts
// =============================================================================
// Placeholder insight articles for the FeaturedInsights home section
// and the /insights listing page (Phase 5).
// Replace with real articles before launch (Phase 7).
// =============================================================================

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  href: string;
  image: string;
  imageAlt: string;
}

export const featuredInsights: Insight[] = [
  {
    slug: "adgm-fund-structures-2025",
    title: "Structuring Investment Funds in ADGM: Key Considerations for 2025",
    excerpt:
      "The Abu Dhabi Global Market has emerged as the preferred domicile for regional fund managers. We examine the regulatory framework, fund structures available, and the practical steps for establishing a compliant vehicle.",
    date: "18 March 2025",
    readTime: "6 min read",
    category: "Corporate & Transactions",
    href: "/insights/adgm-fund-structures-2025",
    image: "/images/insights/adgm-fund-structures.jpg",
    imageAlt: "Abu Dhabi Global Market skyline",
  },
  {
    slug: "uae-pdpl-compliance-guide",
    title: "UAE Personal Data Protection Law: A Practical Compliance Roadmap",
    excerpt:
      "Federal Decree-Law No. 45 of 2021 imposes significant obligations on businesses operating in the UAE. This guide outlines the key requirements, timelines, and the steps organisations should take to achieve compliance.",
    date: "4 February 2025",
    readTime: "8 min read",
    category: "Regulatory & Compliance",
    href: "/insights/uae-pdpl-compliance-guide",
    image: "/images/insights/data-protection.jpg",
    imageAlt: "Abstract digital privacy concept",
  },
  {
    slug: "cross-border-ma-due-diligence",
    title: "Cross-Border M&A in the GCC: Due Diligence Priorities",
    excerpt:
      "Acquiring a business across GCC borders introduces layers of regulatory, structural, and contractual complexity. We outline the due diligence priorities that determine whether a deal closes cleanly or unravels at the final stage.",
    date: "9 January 2025",
    readTime: "7 min read",
    category: "Corporate & Transactions",
    href: "/insights/cross-border-ma-due-diligence",
    image: "/images/insights/cross-border-ma.jpg",
    imageAlt: "Business professionals in discussion",
  },
];
