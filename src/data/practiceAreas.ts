// =============================================================================
// src/data/practiceAreas.ts
// =============================================================================
// Enriched practice area data for /practice, /practice/[pillar], and
// /practice/[pillar]/[area] pages.
// This file is the rich counterpart to the lean navigation data in
// navigation.ts. When a CMS is added (Phase 8), both files get replaced by
// API calls, but the exported types stay the same.
//
// Pillar slugs deliberately match those in navigation.ts:
//   corporate | disputes | regulatory
// =============================================================================

/** Service dimension card on the dedicated practice area page — mirrors industry keyMatters. */
export interface PracticeAreaHighlight {
  title: string;
  description: string;
}

export interface PracticeAreaDetail {
  name: string;
  slug: string;
  /** One to two sentences describing this specific area of practice. */
  description: string;
  /** Editorial paragraphs for /practice/[pillar]/[area] — placeholder-quality, CMS-ready later. */
  body: string[];
  /** Representative ways we support clients on the area detail page. */
  highlights: PracticeAreaHighlight[];
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
        body: [
          "Corporate commercial work sits at the centre of how businesses operate day to day in the UAE. " +
            "We advise on the structures, contracts, and governance arrangements that allow shareholders, " +
            "boards, and management to work together with clarity and enforceability.",
          "Whether you are establishing a new entity on the mainland, in ADGM, or in the DIFC, we align " +
            "your constitutional documents, commercial agreements, and regulatory filings with your " +
            "operating model and growth plans.",
          "Our team supports ongoing corporate housekeeping — resolutions, capital changes, related-party " +
            "transactions, and restructuring — so that your legal position keeps pace with the business.",
        ],
        highlights: [
          {
            title: "Incorporation and structuring",
            description:
              "Entity selection, constitutional documents, licensing, and shareholder arrangements for " +
              "UAE mainland, ADGM, and DIFC companies.",
          },
          {
            title: "Commercial contracting",
            description:
              "Supply, distribution, services, and partnership agreements tailored to UAE law and your " +
              "counterparty risk profile.",
          },
          {
            title: "Governance and board support",
            description:
              "Board mandates, delegated authorities, policies, and director duties across onshore and " +
              "free zone frameworks.",
          },
          {
            title: "Corporate restructuring",
            description:
              "Mergers, divisions, share transfers, and group reorganisations with a clear path through " +
              "regulatory and third-party consents.",
          },
        ],
      },
      {
        name: "Cross-Border M&A",
        slug: "cross-border-ma",
        description:
          "Due diligence, deal structuring, and transaction execution for acquisitions and disposals " +
          "involving GCC and international counterparties. We coordinate across legal systems to close " +
          "deals cleanly and on schedule.",
        body: [
          "Cross-border M&A in the UAE often involves multiple jurisdictions, free zones, and regulatory " +
            "regimes in a single transaction. We help buyers and sellers navigate that complexity with " +
            "disciplined project management and commercially focused legal analysis.",
          "We support private equity, strategic acquirers, and founder-led businesses from early " +
            "confidentiality through signing, closing, and post-completion integration — including " +
            "coordination with foreign counsel where assets or sellers sit outside the UAE.",
          "Our work spans share deals, asset deals, joint ventures, and minority investments, with " +
            "particular experience in regulated sectors and family-owned groups where governance and " +
            "succession considerations matter as much as price.",
        ],
        highlights: [
          {
            title: "Transaction structuring",
            description:
              "Deal architecture, consideration mechanics, and risk allocation for acquisitions and " +
              "disposals involving UAE targets or buyers.",
          },
          {
            title: "Legal due diligence",
            description:
              "Targeted due diligence on corporate, contractual, regulatory, and employment matters " +
              "with practical findings for your investment committee.",
          },
          {
            title: "Transaction documents",
            description:
              "Share purchase agreements, shareholders' agreements, disclosures, and ancillary " +
              "contracts aligned with UAE enforcement realities.",
          },
          {
            title: "Closing and filings",
            description:
              "Conditions precedent, regulatory filings, and escrow arrangements through to completion.",
          },
        ],
      },
      {
        name: "Free Zone Structuring",
        slug: "free-zone-structuring",
        description:
          "Establishment advisory, licensing, regulatory structuring, and ongoing corporate governance " +
          "for entities in Abu Dhabi's two leading international financial centres — the ADGM and the DIFC. " +
          "We advise on the optimal structure for each client's specific operational and commercial objectives.",
        body: [
          "ADGM and DIFC offer common-law courts, familiar corporate statutes, and regulatory frameworks " +
            "designed for international business. Choosing between them — and aligning your structure with " +
            "mainland operations — requires more than a checklist.",
          "We advise on entity type, permitted activities, licensing conditions, and the interaction " +
            "between free zone rules and UAE federal requirements where your business touches the wider " +
            "economy.",
          "Beyond setup, we support ongoing compliance, corporate changes, and regulatory engagement so " +
            "that your free zone vehicle remains fit for purpose as you scale.",
        ],
        highlights: [
          {
            title: "ADGM and DIFC establishment",
            description:
              "SPVs, holding companies, regulated entities, and operating businesses — from initial " +
              "application through licensing.",
          },
          {
            title: "Regulatory classification",
            description:
              "Activity mapping, controlled function approvals, and perimeter questions for financial " +
              "and professional services firms.",
          },
          {
            title: "Group alignment",
            description:
              "Structuring mainland and free zone subsidiaries, service agreements, and transfer pricing " +
              "considerations at legal level.",
          },
          {
            title: "Ongoing governance",
            description:
              "Board support, constitutional updates, and regulatory notifications as your business evolves.",
          },
        ],
      },
      {
        name: "Banking and Finance",
        slug: "banking-finance",
        description:
          "Loan documentation, security structuring, facility agreements, and project finance advisory " +
          "for lenders and borrowers across the UAE. We handle syndicated lending, bilateral facilities, " +
          "and security enforcement with equal familiarity.",
        body: [
          "UAE banking and finance mandates range from straightforward bilateral facilities to complex " +
            "syndicated and project finance structures. We represent banks, non-bank lenders, sponsors, " +
            "and corporates with equal attention to documentation and enforceability.",
          "Our work covers conventional and Islamic structures, cross-border security, and interactions " +
            "with mainland and free zone registries — ensuring that your security package and covenants " +
            "match the underlying assets and cash flows.",
          "When facilities move into distress, we advise on enforcement strategy, intercreditor issues, " +
            "and consensual workouts alongside our disputes colleagues where needed.",
        ],
        highlights: [
          {
            title: "Corporate and acquisition finance",
            description:
              "Senior, mezzanine, and working capital facilities for M&A, capex, and general corporate " +
              "purposes.",
          },
          {
            title: "Real estate and project finance",
            description:
              "Development finance, construction lending, and infrastructure-style security and covenant " +
              "packages.",
          },
          {
            title: "Islamic finance documentation",
            description:
              "Murabaha, ijara, wakala, and hybrid structures documented for UAE courts and registries.",
          },
          {
            title: "Security and perfection",
            description:
              "Share pledges, account charges, asset security, and registration across UAE jurisdictions.",
          },
        ],
      },
      {
        name: "Islamic Finance",
        slug: "islamic-finance",
        description:
          "Sharia-compliant financing structures including murabaha, ijara, sukuk, and musharaka — " +
          "from initial structuring through to documentation and execution. We work closely with " +
          "Sharia supervisory boards to deliver legally sound and commercially viable structures.",
        body: [
          "Islamic finance is integral to the UAE economy. We help institutions and corporates structure " +
            "transactions that satisfy Sharia principles while remaining robust under UAE law and " +
            "practical for day-to-day operations.",
          "Our team works on wholesale and retail products, treasury arrangements, and capital markets " +
            "issuances — always with an eye to Sharia board approvals, disclosure, and investor protection.",
          "We coordinate with scholars and internal Sharia functions to resolve structuring questions " +
            "without losing sight of commercial timelines.",
        ],
        highlights: [
          {
            title: "Corporate and retail products",
            description:
              "Structuring and documenting murabaha, ijara, diminishing musharaka, and similar " +
              "facilities for banks and finance companies.",
          },
          {
            title: "Sukuk and capital markets",
            description:
              "Issuance programmes, prospectus terms, and security arrangements for sukuk and structured " +
              "Islamic instruments.",
          },
          {
            title: "Treasury and liquidity",
            description:
              "Islamic interbank placements, commodity murabaha, and balance sheet management structures.",
          },
          {
            title: "Sharia governance",
            description:
              "Documentation aligned with fatwa requirements and ongoing Sharia audit expectations.",
          },
        ],
      },
      {
        name: "Real Estate",
        slug: "real-estate",
        description:
          "Acquisition, disposal, development structuring, and leasehold advisory for commercial and " +
          "residential real estate across the UAE. We advise developers, investors, and occupiers on " +
          "transactions in both freehold and leasehold markets.",
        body: [
          "The UAE real estate market combines high-value development activity with a patchwork of " +
            "ownership structures, escrow rules, and off-plan sale regimes. We help clients transact with " +
            "confidence whether they are acquiring a single asset or delivering a master development.",
          "We advise on sale and purchase agreements, development agreements, construction interfaces, and " +
            "leasing — bridging the gap between legal risk and project economics.",
          "Our work frequently intersects with financing, joint ventures, and dispute resolution, and we " +
            "deploy integrated teams when mandates require it.",
        ],
        highlights: [
          {
            title: "Acquisitions and disposals",
            description:
              "Asset and share deals for income-producing and development real estate across Abu Dhabi " +
              "and Dubai.",
          },
          {
            title: "Development and joint ventures",
            description:
              "JV agreements, development management, and contractor interfaces for master developers " +
              "and investors.",
          },
          {
            title: "Leasing",
            description:
              "Commercial, retail, and office leases for landlords and occupiers, including fit-out and " +
              "service charge mechanics.",
          },
          {
            title: "Off-plan and escrow",
            description:
              "Advisory on developer sale structures, Oqood/DLD processes, and RERA/ADREC requirements " +
              "as applicable.",
          },
        ],
      },
      {
        name: "Intellectual Property",
        slug: "intellectual-property",
        description:
          "Registration, protection, and enforcement of trade marks, patents, and copyright for " +
          "businesses operating in the UAE. We advise on IP strategy, licensing arrangements, " +
          "and enforcement proceedings in both onshore and free zone contexts.",
        body: [
          "Intellectual property is a core asset for brands, technology businesses, and creative " +
            "industries in the UAE. We help clients secure rights, commercialise them, and defend them " +
            "when challenged.",
          "Our advisory spans UAE Ministry of Economy trade mark and patent filings, copyright strategy, " +
            "and licensing arrangements that work across your group entities and distribution networks.",
          "When disputes arise, we coordinate enforcement strategy — from cease-and-desist through " +
            "civil proceedings and border measures — with our disputes team.",
        ],
        highlights: [
          {
            title: "Trade marks and branding",
            description:
              "Clearance, filing, opposition, and portfolio management for UAE and GCC markets.",
          },
          {
            title: "Patents and designs",
            description:
              "Filing strategy, employee invention assignments, and technology transfer documentation.",
          },
          {
            title: "Licensing and commercialisation",
            description:
              "Franchise, software, and know-how licences aligned with UAE civil law and free zone practice.",
          },
          {
            title: "Enforcement",
            description:
              "Infringement analysis, civil claims, and coordination with customs and platform takedowns.",
          },
        ],
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
        body: [
          "UAE onshore litigation requires procedural discipline and a clear-eyed view of how local " +
            "courts approach evidence, experts, and enforcement. We represent claimants and defendants " +
            "in high-stakes commercial disputes from pre-action through final judgment.",
          "Our team advises on jurisdiction, governing law, and forum selection — including the " +
            "interaction between arbitration clauses and court proceedings where those issues are contested.",
          "We handle interim applications, asset preservation, and judgment enforcement so that a " +
            "successful outcome in court translates into practical recovery.",
        ],
        highlights: [
          {
            title: "Commercial and contract disputes",
            description:
              "Breach of contract, sale of goods, distribution, and services disputes before UAE courts.",
          },
          {
            title: "Corporate and shareholder claims",
            description:
              "Director disputes, shareholder oppression-style claims, and post-M&A warranty litigation.",
          },
          {
            title: "Interim relief",
            description:
              "Attachment orders, precautionary measures, and urgent applications where assets or " +
              "evidence are at risk.",
          },
          {
            title: "Appeals and cassation",
            description:
              "Appeal strategy and drafting through the Court of Appeal and Court of Cassation stages.",
          },
        ],
      },
      {
        name: "Arbitration",
        slug: "arbitration",
        description:
          "Advisory and representation in DIAC, ICC, LCIA, and ad hoc arbitrations arising from " +
          "commercial contracts, construction disputes, and shareholder matters. We manage proceedings " +
          "from the notice of arbitration through to award enforcement.",
        body: [
          "Arbitration is the default dispute resolution path for many UAE-related contracts. We act for " +
            "claimants and respondents in institutional and ad hoc proceedings seated in the UAE and " +
            "abroad, with a focus on procedural strategy and evidentiary presentation.",
          "Our experience covers construction, energy, M&A, joint ventures, and financial services " +
            "disputes — aligning submissions with the expectations of leading arbitral tribunals.",
          "We advise on annulment proceedings before UAE courts, recognition of foreign awards, and " +
            "post-award settlement where commercial sense points that way.",
        ],
        highlights: [
          {
            title: "Commencing and responding",
            description:
              "Notices of arbitration, responses, constitution of tribunals, and preliminary objections.",
          },
          {
            title: "Written and oral advocacy",
            description:
              "Statements of claim and defence, witness statements, expert evidence, and hearing strategy.",
          },
          {
            title: "Emergency and interim relief",
            description:
              "Applications to tribunals and coordinating court support where the rules and seat allow.",
          },
          {
            title: "Awards and enforcement",
            description:
              "Setting aside, recognition, and execution of arbitral awards in the UAE.",
          },
        ],
      },
      {
        name: "Mediation",
        slug: "mediation",
        description:
          "Strategic advisory and representation in formal and informal mediation processes across UAE " +
          "and international forums. We approach mediation as a tool for achieving durable commercial " +
          "outcomes, not a procedural step before returning to litigation.",
        body: [
          "Mediation can resolve disputes faster and more privately than full proceedings — when the " +
            "process is prepared with the same rigour as a hearing. We help clients assess when mediation " +
            "serves their interests and how to enter it with a credible settlement mandate.",
          "Our lawyers represent parties in court-annexed mediation, institutional mediation, and " +
            "ad hoc facilitated negotiations, including multi-party and cross-border matters.",
          "We draft settlement agreements that capture commercial terms clearly and survive scrutiny if " +
            "performance later falters.",
        ],
        highlights: [
          {
            title: "Mediation strategy",
            description:
              "Position papers, opening sessions, and bracket negotiation tactics aligned with your " +
              "objectives.",
          },
          {
            title: "Multi-party disputes",
            description:
              "Coordinating aligned and divergent interests in construction, JV, and supply chain conflicts.",
          },
          {
            title: "Confidentiality and privilege",
            description:
              "Structuring mediation participation to protect sensitive information and settlement posture.",
          },
          {
            title: "Settlement documentation",
            description:
              "Binding settlement deeds, releases, and payment mechanics enforceable in the UAE.",
          },
        ],
      },
      {
        name: "Dispute Resolution",
        slug: "dispute-resolution",
        description:
          "Integrated advisory on the appropriate resolution forum and strategy for complex commercial " +
          "disputes. We assess the merits, evaluate procedural options, and advise on the most efficient " +
          "path to resolution — whether through courts, arbitration, or alternative mechanisms.",
        body: [
          "Not every dispute should follow the same path. Our dispute resolution advisory helps clients " +
            "map options — litigation, arbitration, mediation, or negotiated exit — against cost, speed, " +
            "confidentiality, and enforceability.",
          "We work with in-house teams from the first serious disagreement, shaping correspondence, " +
            "preservation of evidence, and escalation clauses before positions harden.",
          "When proceedings are unavoidable, we align strategy across workstreams so that your message " +
            "to counterparties, tribunals, and courts stays coherent.",
        ],
        highlights: [
          {
            title: "Early case assessment",
            description:
              "Merits review, damages modelling, and litigation risk analysis for board and insurer reporting.",
          },
          {
            title: "Forum and clause analysis",
            description:
              "Interpretation of dispute resolution clauses, asymmetric options, and multi-contract conflicts.",
          },
          {
            title: "Settlement negotiation",
            description:
              "Without-prejudice discussions, structured exits, and standstill arrangements.",
          },
          {
            title: "Parallel proceedings",
            description:
              "Coordinating court, arbitration, and regulatory angles where a single dispute spans forums.",
          },
        ],
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
        body: [
          "Corporate compliance in the UAE spans federal company law, sector regulators, and free zone " +
            "rulebooks — often simultaneously. We help organisations design proportionate programmes " +
            "that directors can oversee and auditors can test.",
          "Our advisory includes policies, training, internal investigations support, and engagement with " +
            "regulators where self-reporting or remediation is in play.",
          "We work alongside tax, data protection, and employment specialists when compliance issues cut " +
            "across disciplines.",
        ],
        highlights: [
          {
            title: "Governance frameworks",
            description:
              "Board charters, committee mandates, and management reporting lines for UAE entities.",
          },
          {
            title: "Regulatory filings and registers",
            description:
              "UBO, economic substance, and sector-specific reporting obligations — mapped to your group.",
          },
          {
            title: "Policies and procedures",
            description:
              "Code of conduct, gifts and hospitality, conflicts, and third-party due diligence playbooks.",
          },
          {
            title: "Investigations and remediation",
            description:
              "Internal reviews, regulator engagement, and corrective action plans following incidents.",
          },
        ],
      },
      {
        name: "Data Protection (PDPL)",
        slug: "data-protection",
        description:
          "Compliance advisory, gap analysis, and implementation support for Federal Decree-Law " +
          "No. 45 of 2021 — the UAE Personal Data Protection Law. We advise on data processing " +
          "obligations, cross-border data transfers, and enforcement readiness.",
        body: [
          "The UAE PDPL has reshaped how businesses collect, use, and transfer personal data. We help " +
            "controllers and processors interpret obligations in light of evolving guidance and sector " +
            "expectations.",
          "Our work includes privacy notices, DPIAs, data processing agreements, cross-border transfer " +
            "mechanisms, and breach response planning.",
          "For multinationals, we align UAE programmes with GDPR and other regimes so that global " +
            "templates work locally without over- or under-shooting.",
        ],
        highlights: [
          {
            title: "Gap analysis and remediation",
            description:
              "Maturity assessments, remediation roadmaps, and project support through implementation.",
          },
          {
            title: "Contracts and sharing",
            description:
              "DPAs, intra-group agreements, and processor and sub-processor chains for UAE operations.",
          },
          {
            title: "Cross-border transfers",
            description:
              "Transfer impact analysis, SCC-style clauses, and localisation questions under PDPL.",
          },
          {
            title: "Regulatory engagement",
            description:
              "Liaison with the UAE data office and sector regulators where notifications arise.",
          },
        ],
      },
      {
        name: "Export Control",
        slug: "export-control",
        description:
          "Compliance advisory for businesses subject to UAE, US, EU, and UK export control and " +
          "sanctions regimes. We advise on licensing requirements, restricted party screening, " +
          "and internal compliance programme design.",
        body: [
          "Export controls and sanctions affect defence, aerospace, energy, technology, and financial " +
            "services businesses operating through the UAE. We help clients understand which regimes " +
            "apply to their flows and how to document decisions defensibly.",
          "Our advisory covers classification, licensing, re-export risk, and dealings with restricted " +
            "parties — including ownership and control analysis where US primary sanctions concepts appear.",
          "We design and test compliance programmes suitable for board oversight and external audit.",
        ],
        highlights: [
          {
            title: "Classification and licensing",
            description:
              "Product and technology classification, licence applications, and end-use undertakings.",
          },
          {
            title: "Sanctions screening",
            description:
              "Ownership and control assessments, sectoral sanctions, and transaction structuring advice.",
          },
          {
            title: "Third-party due diligence",
            description:
              "Distributor and agent screening, red flags, and contractual compliance covenants.",
          },
          {
            title: "Programme design",
            description:
              "Policies, training, audits, and voluntary disclosures where breaches are identified.",
          },
        ],
      },
      {
        name: "Tax Advisory / FTA",
        slug: "tax-advisory",
        description:
          "Corporate tax compliance, VAT advisory, and engagement with the UAE Federal Tax Authority " +
          "for businesses of all sizes. We advise on corporate tax structuring, VAT registration and " +
          "compliance, and transfer pricing considerations.",
        body: [
          "UAE corporate tax and VAT have moved tax to the centre of board agendas. We advise on " +
            "classification, registration, filing obligations, and documentation that will withstand " +
            "FTA review.",
          "Our work spans group restructuring questions, free zone incentives, and the interaction " +
            "between accounting policies and tax positions.",
          "We support FTA audits, objections, and clarification requests — coordinating with accounting " +
            "firms where technical tax computation sits with them.",
        ],
        highlights: [
          {
            title: "Corporate tax readiness",
            description:
              "Entity classification, small business relief analysis, and transitional rule navigation.",
          },
          {
            title: "VAT compliance",
            description:
              "Registration, invoicing, reverse charge, and real estate and financial services nuances.",
          },
          {
            title: "Transfer pricing documentation",
            description:
              "Local file alignment and related-party policy design at legal documentation level.",
          },
          {
            title: "FTA engagement",
            description:
              "Audit defence, voluntary disclosures, and objections within statutory time limits.",
          },
        ],
      },
      {
        name: "Healthcare Regulatory",
        slug: "healthcare-regulatory",
        description:
          "Licensing, regulatory approvals, and compliance advisory for healthcare operators, " +
          "facilities, and life sciences businesses in the UAE. We advise across DHA, DOH, MOHAP, " +
          "and ADGM regulatory frameworks.",
        body: [
          "Healthcare is one of the UAE's most regulated sectors. We help operators obtain and maintain " +
            "licences, navigate emirate-level health authorities, and structure new facilities and services.",
          "Our advisory covers hospitals, clinics, diagnostics, telehealth, and life sciences distribution " +
            "— mapping which regulator governs each activity.",
          "We support M&A and management agreements where change-of-control and fit-and-proper " +
            "requirements are central to closing.",
        ],
        highlights: [
          {
            title: "Facility licensing",
            description:
              "Applications, renewals, and scope changes for DOH, DHA, MOHAP, and other competent bodies.",
          },
          {
            title: "Product registration",
            description:
              "Pharmaceutical and medical device pathways, import permits, and advertising rules.",
          },
          {
            title: "Operational compliance",
            description:
              "Policies, incident reporting, and inspections readiness for licensed providers.",
          },
          {
            title: "Digital health and ADGM",
            description:
              "HealthTech frameworks and cross-border service models involving UAE patients.",
          },
        ],
      },
      {
        name: "Employment and Pension",
        slug: "employment-pension",
        description:
          "UAE Labour Law compliance, employment contract structuring, DIFC and ADGM employment " +
          "framework advisory, and end-of-service gratuity matters. We advise employers and " +
          "employees on their rights and obligations across all UAE jurisdictions.",
        body: [
          "Employment law in the UAE is fragmented across onshore federal law, DIFC Employment Law, ADGM " +
            "Employment Regulations, and free zone-specific rules. We help employers design contracts, " +
            "policies, and termination processes that match the correct regime.",
          "Our work includes executive appointments, incentive plans, secondments, and mass redundancy " +
            "programmes where consultation and documentation must be handled carefully.",
          "We represent employers and senior employees in labour disputes and settlement negotiations.",
        ],
        highlights: [
          {
            title: "Contracts and handbooks",
            description:
              "Onshore, DIFC, and ADGM-compliant templates, probation, notice, and restrictive covenants.",
          },
          {
            title: "Termination and settlements",
            description:
              "Risk assessment, calculation of entitlements, and mutual release documentation.",
          },
          {
            title: "Workforce changes",
            description:
              "Redundancy programmes, TUPE-style transfers in acquisitions, and outsourcing moves.",
          },
          {
            title: "Pensions and savings",
            description:
              "End-of-service, DIFC/ADGM workplace savings, and GPSSA interactions at legal level.",
          },
        ],
      },
      {
        name: "Legislative Drafting",
        slug: "legislative-drafting",
        description:
          "Advisory and drafting support for government entities and regulators developing " +
          "legislation, regulations, and policy frameworks. We bring rigorous legal drafting " +
          "discipline to the public sector mandate.",
        body: [
          "Clear legislation reduces ambiguity for citizens, investors, and regulators alike. We support " +
            "public bodies in structuring laws and regulations that are internally consistent and " +
            "implementable.",
          "Our team assists with policy papers, exposure drafts, and final instruments — including " +
            "definitions, licensing regimes, sanctions, and appeals structures.",
          "We draw on comparative experience from common law and civil law systems while respecting " +
            "UAE legislative style and institutional conventions.",
        ],
        highlights: [
          {
            title: "Primary and secondary legislation",
            description:
              "Drafting federal and emirate-level laws, decrees, and cabinet resolutions.",
          },
          {
            title: "Regulatory rulebooks",
            description:
              "Sector-specific regulations, manuals, and licensing conditions for regulators.",
          },
          {
            title: "Consultation support",
            description:
              "Stakeholder analysis, response consolidation, and revision cycles following public comment.",
          },
          {
            title: "Implementation guidance",
            description:
              "Explanatory materials and transition provisions for regulated industries.",
          },
        ],
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

/** Pillar + area slug pair for `/practice/[slug]/[areaSlug]` static generation. */
export interface PracticeAreaRouteParams {
  slug: string;
  areaSlug: string;
}

/** Resolve a practice area within its pillar. Returns undefined if either slug is invalid. */
export function getPracticeAreaBySlugs(
  pillarSlug: string,
  areaSlug: string
): { pillar: PillarDetail; area: PracticeAreaDetail } | undefined {
  const pillar = getPillarBySlug(pillarSlug);
  if (!pillar) return undefined;
  const area = pillar.areas.find((a) => a.slug === areaSlug);
  if (!area) return undefined;
  return { pillar, area };
}

/** All `/practice/[slug]/[areaSlug]` combinations — used by generateStaticParams. */
export function getPracticeAreaStaticParams(): PracticeAreaRouteParams[] {
  return pillarDetails.flatMap((pillar) =>
    pillar.areas.map((area) => ({
      slug: pillar.slug,
      areaSlug: area.slug,
    }))
  );
}
