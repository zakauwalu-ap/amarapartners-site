// =============================================================================
// src/data/insights.ts
// =============================================================================
// Placeholder insight articles for the FeaturedInsights home section,
// /insights listing page, and /insights/[slug] article pages (Phase 5).
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

/** Extended type with full article body — used on /insights/[slug] pages. */
export interface InsightFull extends Insight {
  author: string;
  authorTitle: string;
  /** Ordered array of paragraph strings — replace with MDX/CMS content in Phase 8 */
  body: string[];
}

// =============================================================================
// FULL ARTICLES — used by /insights/[slug] and the listing page
// =============================================================================

export const insightArticles: InsightFull[] = [
  // ---------------------------------------------------------------------------
  // ARTICLE 1: ADGM Fund Structures
  // ---------------------------------------------------------------------------
  {
    slug: "adgm-fund-structures-2025",
    title: "Structuring Investment Funds in ADGM: Key Considerations for 2025",
    excerpt:
      "Key structural options for ADGM fund managers in 2025, FSRA authorisation, and how corporate tax interacts with qualifying investment fund status.",
    date: "18 March 2025",
    readTime: "6 min read",
    category: "Corporate & Transactions",
    href: "/insights/adgm-fund-structures-2025",
    image: "/images/sora-pics/abstract-geometric-landscape-1.png",
    imageAlt: "Abstract geometric landscape in cool blue tones",
    author: "Amara & Partners",
    authorTitle: "Corporate & Transactions Team",
    body: [
      "The Abu Dhabi Global Market (ADGM) has consolidated its position as the premier fund domicile in the GCC, attracting regional family offices, sovereign-linked vehicles, and international asset managers seeking a credible, English-law jurisdiction with a sophisticated regulatory framework. The Financial Services Regulatory Authority (FSRA) has developed one of the most comprehensive fund regimes in the region, offering a range of structures suited to different investor profiles and investment mandates.",
      "For 2025, the key structural options available to fund managers considering an ADGM domicile are the Recognised Incorporated Limited Partnership (RILP), the Investment Company, and the Protected Cell Company (PCC). Each carries distinct implications for governance, liability allocation, and the nature of the regulatory authorisation required. The RILP has become the structure of choice for private equity and venture capital managers, combining the familiar limited partnership mechanics of common law jurisdictions with the credibility and regulatory oversight of an FSRA-supervised entity.",
      "The authorisation process requires the manager or general partner to hold a Financial Services Permission (FSP) from the FSRA, with the scope of permission calibrated to the activities being undertaken, whether managing a collective investment fund, operating a fund platform, or acting as trustee or administrator. The FSRA's approach to new applications is engagement-led. Managers who invest in early dialogue with the regulator tend to achieve more predictable outcomes on scope and conditions.",
      "From a commercial structuring perspective, the most significant consideration for 2025 is the interaction between ADGM fund structures and the UAE corporate tax regime, which came into full effect in 2023. Qualifying Investment Funds (QIFs) established in ADGM may benefit from specific treatment under the regime, but the conditions for QIF status require careful analysis, particularly for funds with a mixed investor base or a strategy that includes UAE-sited assets.",
      "Managers considering an ADGM fund launch in 2025 should begin the structuring process at least six months before the intended first close. The regulatory timeline, investor documentation requirements, and the substance considerations for FSRA purposes each require careful management. Our team advises on ADGM fund structuring as part of a broader transactional practice and is available to discuss specific fund mandates in detail.",
    ],
  },

  // ---------------------------------------------------------------------------
  // ARTICLE 2: UAE PDPL Compliance
  // ---------------------------------------------------------------------------
  {
    slug: "uae-pdpl-compliance-guide",
    title: "UAE Personal Data Protection Law: A Practical Compliance Roadmap",
    excerpt:
      "A phased approach to PDPL compliance: mapping and gap analysis, legal framework updates, implementation, and ongoing governance for UAE operations.",
    date: "4 February 2025",
    readTime: "8 min read",
    category: "Regulatory & Compliance",
    href: "/insights/uae-pdpl-compliance-guide",
    image: "/images/sora-pics/charcoal-and-blue-cubes.png",
    imageAlt: "Abstract charcoal and blue cubic forms",
    author: "Amara & Partners",
    authorTitle: "Regulatory & Compliance Team",
    body: [
      "Federal Decree-Law No. 45 of 2021, the UAE Personal Data Protection Law (PDPL), represents the most significant development in UAE data privacy law in a generation. The law applies to the processing of personal data of individuals located in the UAE, with extraterritorial reach for data processed abroad where that processing relates to UAE residents. For most businesses operating in the UAE, compliance is not optional and is not limited to digital businesses. Any organisation that collects, stores, or uses personal data about UAE-based individuals is subject to its provisions.",
      "The PDPL establishes a consent-based processing framework with a set of lawful bases for processing that map broadly onto the GDPR structure familiar to multinational businesses. However, the UAE implementation has meaningful local characteristics. The law grants the UAE Data Office (UAEDO) broad supervisory and enforcement powers, and the penalty regime (up to AED 20 million for certain violations) creates a material compliance imperative for organisations operating at scale.",
      "A practical compliance programme for PDPL purposes should proceed in four phases. The first is a data mapping and gap analysis exercise: identifying what personal data the organisation holds, where it is stored, how it flows across business units and jurisdictions, and what processing activities are currently conducted without an adequate lawful basis. Many organisations find this exercise reveals processing activities that were never formally documented and consent practices that were inherited from older operational systems.",
      "The second phase involves updating the organisation's legal framework: privacy notices, consent mechanisms, data processing agreements with vendors and sub-processors, and internal policies covering retention, access, and security. The PDPL's cross-border transfer provisions are particularly important for multinational organisations. Data transfers to countries without an adequacy determination require either binding contractual clauses approved by the UAEDO or another approved mechanism.",
      "The third and fourth phases, implementation and ongoing governance, are where many compliance programmes stall. Deploying a data subject rights response process, training staff on the new obligations, and building a culture of privacy-by-design requires sustained management attention. Businesses that have completed GDPR compliance programmes will find much of the infrastructure transferable, but the local regulatory context and the specific provisions of UAE law require a tailored approach. Our team advises on PDPL compliance as part of a broader regulatory practice and can support organisations at any stage of the compliance journey.",
    ],
  },

  // ---------------------------------------------------------------------------
  // ARTICLE 3: Cross-Border M&A Due Diligence
  // ---------------------------------------------------------------------------
  {
    slug: "cross-border-ma-due-diligence",
    title: "Cross-Border M&A in the GCC: Due Diligence Priorities",
    excerpt:
      "Corporate structure, regulatory approvals, employment, and tax diligence priorities for GCC cross-border transactions under UAE law.",
    date: "9 January 2025",
    readTime: "7 min read",
    category: "Corporate & Transactions",
    href: "/insights/cross-border-ma-due-diligence",
    image: "/images/sora-pics/geometric-precision-structure-1.png",
    imageAlt: "Geometric precision structure with layered angular forms",
    author: "Amara & Partners",
    authorTitle: "Corporate & Transactions Team",
    body: [
      "Cross-border M&A in the GCC presents a set of due diligence challenges distinct from those encountered in European or North American transactions. The coexistence of federal and emirate-level regulation in the UAE, the interaction of civil law and English-law common law frameworks across the region, and the prevalence of businesses structured for operational rather than transactional purposes combine to create a discovery environment where the standard legal due diligence checklist is insufficient.",
      "The first priority in any GCC cross-border transaction is corporate structure verification. Many businesses operating in the region were incorporated under legacy ownership rules that required a UAE national sponsor holding a 51% stake. While the Commercial Companies Law amendments of 2020 relaxed these requirements for many activities, the historical position must be carefully traced. Where a legacy sponsor arrangement exists, its nature (nominee, profit-share, or genuine equity participation) has material implications for the transaction structure and the representations the seller can give.",
      "Regulatory approvals present the second major due diligence stream. Depending on the sector, a GCC acquisition may require approval from competition authorities (the UAE recently enacted its first comprehensive competition law), sector regulators (particularly in financial services, healthcare, and telecommunications), and in some cases foreign investment review bodies. Identifying the approval map at the outset of a transaction, and building realistic timelines for clearance into the deal structure, is essential. Transactions agreed without this analysis frequently encounter delays at an advanced stage.",
      "Labour and employment due diligence is a third area often underweighted in GCC transactions. The UAE's Emiratisation requirements create ongoing obligations for businesses above certain size thresholds, and end-of-service gratuity liabilities for long-tenure employees can be materially larger than a buyer's initial estimate. In transactions involving businesses with a significant workforce, a targeted analysis of gratuity provisioning, Emiratisation compliance, and the status of key talent under UAE Labour Law is typically warranted.",
      "Finally, tax diligence in GCC transactions has become materially more complex following the introduction of UAE corporate tax. Businesses with UAE operations now carry potential corporate tax exposures, particularly where transfer pricing arrangements have not been reviewed in light of the new regime or where related-party transactions have not been structured with arm's length pricing. VAT compliance history and the adequacy of FTA filings are also standard due diligence items for any business that has been operating since 2018. Our team advises regularly on GCC M&A transactions and can provide targeted support on the UAE legal dimensions of cross-border deals.",
    ],
  },
];

// =============================================================================
// HELPERS
// =============================================================================

/** The same articles cast to the leaner Insight type — used by FeaturedInsights
 *  on the home page and the Card component. */
export const featuredInsights: Insight[] = insightArticles;

/** Look up an article by slug. Returns undefined if not found. */
export function getInsightBySlug(slug: string): InsightFull | undefined {
  return insightArticles.find((a) => a.slug === slug);
}

/** All valid article slugs — used by generateStaticParams. */
export const INSIGHT_SLUGS = insightArticles.map((a) => a.slug);
