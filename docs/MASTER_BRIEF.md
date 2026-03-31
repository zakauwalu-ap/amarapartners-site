# Amara & Partners -- Website Master Brief

## Firm Details
- Full name: Amara & Partners Legal Consultants
- Arabic name: عمارة ومشاركوه للاستشارات القانونية
- Location: Second Floor, Office 258, Wafra Square, Reem Island, Abu Dhabi, UAE
- Phone: 025500085
- Email: info@amarapartners.ae
- Domain: amarapartners.ae
- Founded: 2019

## Project Summary
Ground-up rebuild of amarapartners.ae, replacing an existing WordPress site.
The firm's layered wave brand artwork becomes the defining visual element,
with parallax scrolling and subtle SVG morphing creating a distinctive identity.

## Design Direction
- Inspired by: aoshearman.com (adapted for boutique firm positioning)
- Tone: Modern, approachable, premium, trustworthy. Not stuffy or old-fashioned.
- Key visual motif: Layered wave system in graduated blues -- parallax on scroll
- Wave transitions from light blue (top/hero) to near-black (footer)

## Brand Colors
| Name | Hex | Usage |
|------|-----|-------|
| wave-100 | #B8CCDE | Sky / lightest background |
| wave-200 | #7BA3C9 | Upper wave band |
| wave-300 | #4A7DB5 | Mid-upper wave |
| wave-400 | #2B5F9E | Primary interactive elements |
| wave-500 | #1A4380 | Deep wave |
| wave-600 | #0D2E5C | Deepest wave / footer |
| wave-700 | #091D3A | Near-black / text on light |
| gold | #C9A84C | Accent -- CTAs, highlights |
| cream | #F5F0E8 | Light background alternative |
| Brand Blue | #496BB3 | Logo blue |
| Brand Gold | #DBCDAE | Logo gold / warm accent |
| Charcoal | #1E242D | Dark text |
| Shadow Grey | #565E71 | Secondary text |
| Light Grey | #E2E3E4 | Borders, subtle backgrounds |

## Typography
| Role | Font | Weights |
|------|------|---------|
| Headings | Cormorant Garamond | 400, 500, 600 |
| Body | DM Sans | 400, 500, 700 |

## Logo Variants Available
- Primary (Arabic + English bilingual lockup) -- SVG + PNG
- Medium (English only: AMARA & PARTNERS / LEGAL CONSULTANTS) -- SVG + PNG
- Small (A&P icon mark) -- SVG + PNG
- All available in grey (on white) and white (on dark) variants

## Home Page Sections (scroll sequence through wave layers)
1. Hero -- full viewport, logo centred, positioning statement, wave-100/200 zone
2. Firm Introduction -- 2-3 sentences, wave-200/300 zone
3. Practice Pillars -- 3 cards (one per pillar), wave-300/400 zone
4. Featured Insights -- 2-3 editorial cards, wave-400/500 zone
5. Jurisdictional Reach -- Mainland UAE, ADGM, DIFC, wave-500 zone
6. CTA / Contact -- "Let's discuss your next move", wave-600 zone
7. Footer -- full footer, wave-700 zone

## Navigation
- Logo (links home)
- Practice (mega-dropdown -- 3 pillars, 22 areas)
- Industries (dropdown -- 5 sectors)
- Insights (direct link)
- Jurisdictions (direct link)
- About (direct link)
- Contact (styled as gold CTA button)
- Language toggle EN/AR (hidden until Phase 2)
- Client Portal (subtle text link, external URL)

## Practice Areas
### Pillar 1: Corporate & Transactions
Corporate Commercial, Cross-Border M&A, Free Zone Structuring (ADGM/DIFC),
Banking and Finance, Islamic Finance, Real Estate, Intellectual Property

### Pillar 2: Disputes
Litigation, Arbitration, Mediation, Dispute Resolution

### Pillar 3: Regulatory & Compliance
Corporate Compliance, Data Protection (PDPL), Export Control,
Tax Advisory / FTA, Healthcare Regulatory, Employment and Pension,
Legislative Drafting

## Industries
Aviation and Space, Engineering and Construction, Oil and Gas,
Technology Media and Telecommunications, Healthcare and Life Sciences

## Contact Page
- Address: Second Floor, Office 258, Wafra Square, Reem Island, Abu Dhabi, UAE
- Map: Google Maps embed
- Phone: 025500085
- Email: info@amarapartners.ae
- Form fields: Name, Email, Phone (optional), Area of Interest (dropdown), Message

## Development Phases
1. Foundation -- scaffold, Tailwind config, fonts, base components
2. Wave System + Home Page -- parallax, morphing, all home sections, mega-nav
3. Inner Pages -- all page templates with placeholder content
4. Polish -- animations, mobile, accessibility, newsletter, cookie consent
5. Content + Launch -- real content, DNS migration, Vercel production
6. Post-Launch -- Arabic content, People page activation

## Key Decisions Made
| Decision | Resolution |
|----------|------------|
| Framework | Next.js 15, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | GSAP + ScrollTrigger + Framer Motion |
| Fonts | Cormorant Garamond (headings) + DM Sans (body) |
| CMS | Deferred -- build frontend first |
| URL routing | Flat: /practice/[slug] |
| People page | Built but hidden from nav at launch |
| Deployment | Vercel (production) |
| i18n | English-first, Arabic-ready architecture from day one |
| Bilingual | RTL-ready with logical CSS properties throughout |

## Open Decisions
- CMS: Payload CMS vs Sanity.io (deferred)
- Email service: Mailchimp / Resend / Buttondown (deferred)
- Analytics: Plausible vs Vercel Analytics (post-launch)
- Wave SVG: Need original vector source to extract individual wave layers

## Important Notes
- People page: fully built in CMS + components, hidden from navigation at launch
- Arabic: no Arabic content at launch, but every text field and component must be RTL-ready
- Wave artwork: uploaded PNG is rasterised -- original Illustrator/Figma file needed for Phase 2
- Existing WordPress site at amarapartners.ae must remain live until production is ready