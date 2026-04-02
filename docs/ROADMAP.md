# Amara & Partners Website - Project Roadmap

> **Last updated:** 2 April 2026 (Phase 4 complete + scroll polish + section transition redesign)
> **Project:** Ground-up rebuild of amarapartners.ae
> **Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + GSAP + Framer Motion
> **Deployment:** Vercel (production), Dokploy (staging)

---

## About This Document

This is the single guide for the Amara & Partners website build. It tracks what has been completed, what comes next, and the order in which tasks should be tackled. Use it to orient yourself at the start of every work session.

---

## Project Summary

Amara & Partners Legal Consultants is a boutique firm based on Reem Island, Abu Dhabi. The website replaces an existing WordPress site with a custom Next.js build that uses the firm's layered wave artwork as the defining visual motif. The design tone is modern, approachable, premium, and trustworthy.

**Key facts:**
- 22 practice areas across 3 pillars, plus 5 industry sectors
- Bilingual architecture (English first, Arabic-ready from day one)
- CMS deferred; frontend built with static placeholder data
- People page built but hidden from navigation at launch
- Contact: info@amarapartners.ae | 025500085 | Wafra Square, Reem Island

---

## What Is Done

### Phase 1: Foundation (Complete)

- [x] Next.js 15 scaffolded with App Router and TypeScript
- [x] Tailwind CSS v4 configured via `@theme` directive in `globals.css`
- [x] PostCSS configured with `@tailwindcss/postcss`
- [x] Full wave colour system defined (wave-100 through wave-700 + gold, cream, brand colours)
- [x] Font setup: Cormorant Garamond (headings) + DM Sans (body) via `next/font/google`
- [x] CSS variable naming resolved (`--font-heading-var` / `--font-body-var` to avoid Tailwind collisions)
- [x] `cn()` utility helper in `src/lib/utils.ts`
- [x] Project rules file at `.cursor/rules/project.mdc`
- [x] Master brief at `docs/MASTER_BRIEF.md`
- [x] Context bridge file at `CONTEXT.md`
- [x] Logo SVG files organized in `public/images/logo/` (grey + white variants, primary + medium + small)
- [x] Dark mode overrides removed from `globals.css`
- [x] Base styles applied (body font, colour, background, heading defaults)

### Phase 2: UI Component Library (Complete)

- [x] **Button** - 3 variants (primary/secondary/ghost), 2 sizes (md/lg), arrow prop, href prop
- [x] **Card** - Single file with variant prop router (practice/insight/person)
- [x] **Badge** - wave and dark variants
- [x] **Input** - Single file with 3 named exports (Input, Textarea, Select); floating labels, error/hint states
- [x] **Navigation** - Transparent-to-solid scroll transition at 80px; desktop mega-menus for Practice and Industries; full-screen mobile overlay with Framer Motion; accordion expand/collapse on mobile; nav data in `src/data/navigation.ts`
- [x] Dev test component for form fields (`src/components/dev/InputTestSection.tsx`)

### Phase 3: Hero / Wave System (Complete)

- [x] Seven SVG wave layers with feTurbulence filters
- [x] GSAP ScrollTrigger driving a 780vh scroll driver with sticky viewport
- [x] Waves peel away in alternating directions on scroll (up/down/left/right)
- [x] Trailing-edge mask gradients for smooth layer departure
- [x] Hero content (logo + eyebrow) fades out as scroll begins
- [x] Section label badge updates on scroll ("Hero", "Firm Introduction", "Practice Pillars", etc.)
- [x] Navigation dot indicator on right edge
- [x] `prefers-reduced-motion` fallback (static wave stack, no scroll driver)
- [x] Primary grey logo SVG rendering in hero
- [x] Wave path data and viewBox constants extracted to `src/lib/wavePaths.ts`
- [x] Wave section narrative panel data structure in `src/data/waveSections.ts`
- [x] `WaveLayer`, `WaveSectionPanel`, `WaveSystem` component split

### Bugs Resolved

- [x] `cn()` rejecting array arguments - flattened to separate string arguments
- [x] JSX parse error from incomplete opening tags - fixed in Cursor
- [x] Non-functional hamburger menu (z-index/pointer-events conflict) - fixed with `relative z-50`
- [x] iOS/WebKit synthetic mouse events closing mega menus on touch - conditional `mouseleave` via `(hover: hover)` media query

---

## Current State Assessment

Based on the video recording of the site as of 1 April 2026, here is what is working and what needs attention:

**Working well:**
- The wave system looks striking. The layered blue gradient with scroll-driven departure is the hero moment the brand needs.
- Navigation is polished: transparent-to-solid transition, mega-menus, mobile overlay all functional.
- The bilingual primary logo renders cleanly in the hero.
- Section label badge updates correctly as the user scrolls through zones.
- Dot navigation on the right edge tracks scroll position.

**Issues to address:**
- ~~The wave sections (Firm Introduction through Footer) are empty.~~ **Resolved in Phase 4.**
- ~~The page ends abruptly after the scroll driver. There is no footer, no CTA section.~~ **Resolved in Phase 4.**
- ~~The section label badge feels like debug UI.~~ **Resolved — badge removed in Phase 4.**
- ~~Section content panels had zero dwell time — each panel reached peak opacity and immediately faded out.~~ **Resolved — flat-top dwell curve added (2 Apr 2026).**
- ~~Scroll was native/abrupt with no inertia.~~ **Resolved — Lenis smooth scroll integrated (2 Apr 2026).**
- The nav still uses "Amara & Partners" as plain text rather than the SVG logo (noted as placeholder in code comments).
- The wave turbulence animation (`ENABLE_WAVE_UNDULATION`) and pointer interaction (`ENABLE_WAVE_INTERACTION`) are both disabled. This is fine for now but is a polish item.
- No inner pages exist yet. Every nav link other than Home leads nowhere.

---

## What Comes Next

The remaining work is organized into phases. Each phase is broken into numbered tasks. Within a task, individual steps are listed in the order you should tackle them. Finish one phase before starting the next.

---

### Phase 4: Home Page Content Sections ✓ Complete

Each scroll zone in the 780vh driver now has a solid-background content panel. Panels fade in and out via GSAP scroll progress directly manipulating ref opacity and pointer-events. The footer lives in normal document flow below the driver and is rendered globally from the root layout.

**Architecture decision recorded:** Content panels sit inside the sticky viewport at `z-20`, above all wave layers (`z-2` to `z-8`) but below the hero logo (`z-30`). Each panel has a solid background colour that echoes the wave-palette depth for that zone. Crossfade transitions briefly expose the wave layers beneath, providing visual continuity between sections.

**4.1 - Firm Introduction Section**
- [x] Design the layout: heading, 2-3 sentences of positioning copy, stat pills
- [x] Build the `FirmIntro` component (`src/components/sections/FirmIntro.tsx`)
- [x] Wire it into WaveSystem at z-20, zone 1 (cream background)
- [x] Placeholder copy written

**4.2 - Practice Pillars Section**
- [x] Design the layout: three `Card variant="practice"` in a responsive grid
- [x] Build the `PillarCards` section component (`src/components/sections/PillarCards.tsx`)
- [x] Wire into scroll driver at zone 2 (wave-700 background)
- Note: staggered card entrance animation deferred to Phase 6 polish

**4.3 - Featured Insights Section**
- [x] Design the layout: 3× `Card variant="insight"`
- [x] Build the `FeaturedInsights` section component (`src/components/sections/FeaturedInsights.tsx`)
- [x] Created placeholder insight data in `src/data/insights.ts`
- [x] Wire into scroll driver at zone 3 (wave-500 background)

**4.4 - Jurisdictional Reach Section**
- [x] Design the layout: 3-column grid — Mainland UAE / ADGM / DIFC
- [x] Build the `JurisdictionalReach` section component (`src/components/sections/JurisdictionalReach.tsx`)
- [x] Wire into scroll driver at zone 4 (wave-600 background)

**4.5 - CTA / Contact Section**
- [x] Design the layout: two-column — heading + CTAs / contact details
- [x] Build the `CTAContact` section component (`src/components/sections/CTAContact.tsx`)
- [x] Wire into scroll driver at zone 5 (wave-700 background); stays visible through end of driver

**4.6 - Footer**
- [x] Design: white logo, address/phone/email, practice + industry + company link columns, copyright bar
- [x] Build the `Footer` component (`src/components/layout/Footer.tsx`)
- [x] Added to root layout (`src/app/layout.tsx`) — appears on every page

**4.7 - Section Label Refinement**
- [x] Decision: removed. Content panels identify each section contextually.
- [x] Badge state (`activeSectionIndex`) and DOM element cleaned up from WaveSystem

**4.8 - Wave Section Narrative Panels (Optional / Deferred)**
- [ ] `WaveSectionPanel` component and `waveSections.ts` data remain unused. Deferred indefinitely — the named section components fulfil this role.

---

### Scroll Polish + Architecture Refactor (Complete — 2 April 2026)

Addressed between Phase 4 and Phase 5 as a standalone improvement session.

**Architecture decisions recorded:**
- Lenis v1.3.21 chosen over GSAP ScrollSmoother (free, open-source, industry standard for Next.js; ScrollSmoother requires a paid Club GSAP licence).
- `autoRaf: false` on the Lenis instance — GSAP's ticker drives Lenis RAF instead of Lenis running its own loop. This keeps Lenis and ScrollTrigger on the exact same animation frame, eliminating jitter.
- `LenisProvider` (`src/components/providers/LenisProvider.tsx`) wraps the root layout. An inner `LenisGsapSync` component (inside the ReactLenis context) wires `ScrollTrigger.update` as a scroll listener and adds `lenis.raf` to `gsap.ticker`. `gsap.ticker.lagSmoothing(0)` prevents timestamp clamping after tab switches.
- `prefers-reduced-motion` respected: Lenis is skipped entirely and children render with native scroll.

**Smooth scroll (Lenis):**
- [x] Install `lenis` (v1.3.21)
- [x] Build `LenisProvider` at `src/components/providers/LenisProvider.tsx` — `root` mode, `lerp: 0.05` (luxurious inertia), `autoRaf: false`, GSAP ticker sync, reduced-motion fallback
- [x] Wrap root layout body with `LenisProvider`

**Home page architecture refactor (Path B — Wave hero + normal scroll):**

The full-viewport sticky panel system (Phase 4) was replaced. The site was behaving like a slideshow — full-screen opacity fades are structurally identical to slide transitions regardless of timing. The fix is architectural.

- [x] `WaveSystem` stripped to a pure wave-hero component. Scroll driver reduced from `1200vh` to `700vh` — covers only the wave peel sequence. Content panels and dot navigation removed entirely.
- [x] `src/components/ui/AnimateIn.tsx` created — reusable GSAP ScrollTrigger fade-up wrapper. Triggers at `top 80%`, `power3.out` easing, respects `prefers-reduced-motion`. Reusable for all Phase 5 inner pages.
- [x] `src/app/page.tsx` rebuilt — five content sections now live in normal document flow below the wave driver, each wrapped in `<AnimateIn>` with their own background colour.
- [x] Five section components updated — `h-full` → `min-h-screen` so each section sizes correctly in normal document flow.
- [x] Section backgrounds preserved: cream (FirmIntro), wave-700 (Pillars), wave-500 (Insights), wave-600 (Jurisdictions), wave-700 (CTA).
- [x] `AnimateIn` component (`src/components/ui/AnimateIn.tsx`) created as a permanent, reusable asset — GSAP ScrollTrigger fade-up wrapper for Phase 5 inner pages.

**Path B reverted — sections re-integrated into the wave driver (2 April 2026):**

Path B (sections in normal flow below the driver) required scrolling through the entire 700vh wave sequence before seeing any content. User feedback: "incorporate the sections into the waves."

Architecture decision: sections restored inside the sticky viewport, but the transition mechanism was redesigned to eliminate the slideshow feel.

- Old transitions (Phase 4): pure opacity crossfade (0→1→0). Structurally identical to a slideshow.
- New transitions: **combined translateY + opacity** — each panel slides up from +60px on entry, holds fully visible for ~80vh, then exits by continuing upward –30px. The directional motion gives the user a physical sense of scrolling through layered space rather than clicking Next.
- Content begins appearing at ~60vh from the top of the driver (10% in) — users see information within the first screen of scrolling.
- Driver height: `700vh` → `1000vh` to accommodate the hold windows and full wave peel sequence.
- `page.tsx` reverted to `<Hero />` only; section components reverted to `h-full`.
- `PANEL_ENTER_Y = 60px`, `PANEL_EXIT_Y = -30px`, flat-top dwell curve retained from earlier work.

---

### Phase 5: Inner Pages

Each page uses a shared `PageHeader` component at the top, then page-specific content below. All pages end with the `Footer`.

**5.1 - Shared Page Layout**
- [ ] Build the `PageHeader` component: page title, optional subtitle/breadcrumb, wave-gradient background strip
- [ ] Create a reusable inner-page layout wrapper that includes PageHeader + Footer

**5.2 - About Page (`/about`)**
- [ ] Layout: firm story, values, founding context, team culture
- [ ] Placeholder copy and a placeholder image area
- [ ] Timeline or milestones section (optional)

**5.3 - Practice Areas**
- [ ] `/practice` overview page: three pillar cards linking to pillar detail pages
- [ ] `/practice/[slug]` pillar detail page: pillar description, list of sub-areas with descriptions
- [ ] `/practice/[pillar]/[slug]` individual practice area page (optional at launch; can redirect to pillar page)

**5.4 - Industries**
- [ ] `/industries` overview page: five industry cards
- [ ] `/industries/[slug]` individual industry page: description, related practice areas, key contacts placeholder

**5.5 - Insights / Blog**
- [ ] `/insights` listing page: grid of `Card variant="insight"`, category filter, pagination placeholder
- [ ] `/insights/[slug]` article page: full-width header image, article body with typographic styling, related posts sidebar or bottom section
- [ ] Create 3-5 placeholder articles in `src/data/insights.ts`

**5.6 - Jurisdictions Page (`/jurisdictions`)**
- [ ] Layout: overview of Mainland UAE, ADGM, and DIFC legal frameworks
- [ ] Brief explainer for each jurisdiction, what the firm offers in each
- [ ] Consider a comparative table or visual differentiator

**5.7 - Contact Page (`/contact`)**
- [ ] Layout: contact form on the left, firm details + Google Maps embed on the right
- [ ] Use the Input, Textarea, and Select components already built
- [ ] Form fields: Name, Email, Phone (optional), Area of Interest (dropdown), Message
- [ ] Form submission handler (initially just a frontend success state; backend integration deferred)
- [ ] Display: address, phone, email, map

**5.8 - People Page (`/people`) - Built but Hidden**
- [ ] `/people` listing page: grid of `Card variant="person"`
- [ ] `/people/[slug]` individual bio page: photo placeholder, qualifications, practice areas, contact
- [ ] Create 3-5 placeholder team members
- [ ] Keep hidden from navigation (no link in nav or footer); accessible only via direct URL

**5.9 - Legal Pages**
- [ ] `/privacy-policy` - placeholder privacy policy text
- [ ] `/terms-of-use` - placeholder terms text

---

### Phase 6: Polish and Accessibility

**6.1 - Animation Polish**
- [ ] Enable and tune wave turbulence (`ENABLE_WAVE_UNDULATION = true`) with appropriate performance gating
- [ ] Consider enabling pointer interaction (`ENABLE_WAVE_INTERACTION`) for desktop users with fine pointers
- [ ] Add scroll-triggered entrance animations (fade-up, stagger) to all inner page sections using GSAP ScrollTrigger
- [ ] Verify all animations respect `prefers-reduced-motion`

**6.2 - Navigation Logo Swap**
- [ ] Replace "Amara & Partners" text with the actual SVG logo in the nav
- [ ] Use grey variant on transparent nav, white variant on solid dark nav
- [ ] Test at all breakpoints

**6.3 - Mobile Responsiveness Audit**
- [ ] Test every page at 320px, 375px, 414px, 768px, 1024px, 1440px
- [ ] Fix any overflow, text-clipping, or touch-target issues
- [ ] Ensure the wave hero performs acceptably on mobile (consider reducing wave count or disabling turbulence on small screens)

**6.4 - Accessibility (a11y)**
- [ ] Add proper ARIA landmarks to all sections
- [ ] Ensure all interactive elements are keyboard-navigable
- [ ] Test with screen reader (VoiceOver or NVDA)
- [ ] Verify colour contrast meets WCAG AA for all text/background combinations
- [ ] Add skip-to-content link
- [ ] Ensure all images have meaningful alt text

**6.5 - SEO and Metadata**
- [ ] Add page-specific metadata to every route using Next.js Metadata API
- [ ] Add Open Graph and Twitter card meta tags
- [ ] Create a `sitemap.xml` (can use `next-sitemap` or manual)
- [ ] Create `robots.txt`
- [ ] Add structured data (JSON-LD) for the firm: Organization, LocalBusiness

**6.6 - Performance**
- [ ] Run Lighthouse audit; target 90+ on all categories
- [ ] Optimize images (use `next/image` with proper sizing and formats)
- [ ] Lazy-load below-the-fold sections
- [ ] Verify no layout shift (CLS) from font loading or image loading
- [ ] Consider code-splitting for GSAP (only load on pages that need it)

**6.7 - Cookie Consent and Newsletter**
- [ ] Add cookie consent banner (simple, GDPR-friendly)
- [ ] Add newsletter signup placeholder in footer (email input + CTA)
- [ ] Email service integration deferred (Mailchimp / Resend / Buttondown TBD)

---

### Phase 7: Real Content and Launch Preparation

**7.1 - Content Replacement**
- [ ] Replace all placeholder copy with real firm copy
- [ ] Replace placeholder images with real photography or branded illustrations
- [ ] Replace placeholder team bios with real attorney information
- [ ] Write and finalize practice area descriptions
- [ ] Write and finalize industry descriptions
- [ ] Write or source 3-5 real insight articles

**7.2 - Domain and Hosting**
- [ ] Set up Vercel project and connect to the `amarapartners.ae` domain
- [ ] Configure DNS (keep existing WordPress site live until cutover)
- [ ] Set up staging environment on Dokploy for pre-launch review
- [ ] Configure SSL/TLS

**7.3 - Analytics**
- [ ] Choose analytics provider (Plausible vs Vercel Analytics)
- [ ] Install and configure
- [ ] Set up basic event tracking (contact form submissions, CTA clicks)

**7.4 - Pre-Launch Checklist**
- [ ] Cross-browser testing: Chrome, Firefox, Safari, Edge
- [ ] Test on real iOS and Android devices
- [ ] Verify all links work (no 404s)
- [ ] Verify all forms work (at least the frontend validation)
- [ ] Final Lighthouse audit
- [ ] Client sign-off on all content and design

**7.5 - Go Live**
- [ ] Point `amarapartners.ae` DNS to Vercel
- [ ] Verify site loads correctly on the production domain
- [ ] Set up redirects from any old WordPress URLs if needed
- [ ] Monitor for errors in the first 48 hours

---

### Phase 8: Post-Launch

**8.1 - Arabic / RTL Content**
- [ ] Add Arabic translations for all pages
- [ ] Implement language toggle in navigation
- [ ] Test RTL layout across all pages (logical CSS properties are already in place)
- [ ] Verify Arabic typography renders correctly

**8.2 - People Page Activation**
- [ ] Add real attorney photos and bios
- [ ] Unhide the People link in navigation and footer
- [ ] Test the full People flow (listing + individual bios)

**8.3 - CMS Integration**
- [ ] Choose CMS (Payload CMS vs Sanity.io)
- [ ] Set up CMS and define content models
- [ ] Migrate static data to CMS
- [ ] Connect frontend to CMS API
- [ ] Set up preview/draft mode for content editors

**8.4 - Ongoing**
- [ ] Publish new insights/articles regularly
- [ ] Monitor analytics and adjust
- [ ] Iterate on design based on user feedback

---

## Open Decisions

These are choices that have not been finalized. They do not block current work but will need resolution before their respective phases.

| Decision | Options | Needed By |
|----------|---------|-----------|
| CMS | Payload CMS vs Sanity.io | Phase 8 |
| Email/newsletter service | Mailchimp, Resend, or Buttondown | Phase 6 |
| Analytics | Plausible vs Vercel Analytics | Phase 7 |
| Wave interaction | Enable pointer-driven displacement or keep disabled | Phase 6 |
| Wave undulation | Enable SMIL turbulence animation or keep static | Phase 6 |
| Section label badge | Keep as persistent UI or remove once content fills sections | Phase 4 |
| Practice area page depth | Individual pages for each of 22 areas, or just pillar-level pages at launch | Phase 5 |

---

## Project Structure Reference

```
src/
  app/                     Pages (App Router)
    page.tsx               Home page
    layout.tsx             Root layout (fonts, nav, metadata)
    globals.css            Tailwind v4 theme tokens + base styles
  components/
    layout/                Navigation, Footer, PageHeader
      nav/                 MegaMenu, MobileMenu
    sections/              Hero, FirmIntro, PillarCards, etc.
    ui/                    Button, Card, Input, Badge
    waves/                 WaveSystem, WaveLayer, WaveSectionPanel
    dev/                   Dev-only test components (delete before launch)
  data/                    Static data files (navigation, insights, practice areas)
  hooks/                   Custom React hooks
  lib/                     Utilities (cn, wavePaths)
  types/                   TypeScript type definitions
public/
  images/logo/             All logo SVG/PNG variants
docs/
  MASTER_BRIEF.md          Original project brief
.cursor/rules/project.mdc  Cursor AI rules
CONTEXT.md                 Memory bridge between Claude.ai and Cursor
```

---

## Key Contacts and Details

- **Firm:** Amara & Partners Legal Consultants
- **Arabic:** عمارة ومشاركوه للاستشارات القانونية
- **Address:** Second Floor, Office 258, Wafra Square, Reem Island, Abu Dhabi, UAE
- **Phone:** 025500085
- **Email:** info@amarapartners.ae
- **Domain:** amarapartners.ae
- **Founded:** 2019

---

## Workflow Reminder

- **Claude.ai** handles strategy, planning, design decisions, and brand context
- **Cursor IDE** handles file editing and implementation (Claude built-in)
- **CONTEXT.md** is the manual memory bridge between the two
- Always confirm design intent before writing code
- Always deliver complete, heavily-commented files with clear file-path instructions
- Always explain *why* something broke, not just provide the fix
