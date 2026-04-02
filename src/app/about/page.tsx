// =============================================================================
// src/app/about/page.tsx
// =============================================================================
// About the Firm page.
//
// Structure:
//   1. PageHeader       — dark gradient, wave divider transitioning to cream
//   2. Founding Story   — cream bg, 2-col layout with image placeholder
//   3. Our Values       — wave-700 dark bg, 4 value cards
//   4. Firm Ethos       — wave-500 medium bg, pullquote + CTA
//
// Server Component — AnimateIn wrappers handle all client-side animation.
// =============================================================================

import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";

// --- Metadata ----------------------------------------------------------------

export const metadata: Metadata = {
  title: "About the Firm",
  description:
    "Amara & Partners Legal Consultants was founded in 2019 in Abu Dhabi. " +
    "A boutique firm combining institutional-quality counsel with regional " +
    "mastery across UAE mainland, ADGM, and DIFC.",
};

// --- Static data -------------------------------------------------------------

interface ValueItem {
  title: string;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    title: "Institutional Judgment",
    description:
      "We bring the discipline and rigour of top-tier international practice to every matter — regardless of scale.",
  },
  {
    title: "Regional Mastery",
    description:
      "Deep roots in the UAE's legal landscape, with active practices across mainland, ADGM, and DIFC.",
  },
  {
    title: "Commercial Clarity",
    description:
      "Legal advice grounded in commercial reality. We understand the business context before we speak to the legal one.",
  },
  {
    title: "Client Partnership",
    description:
      "We work as an extension of your team, not as an external resource. Your outcomes are our outcomes.",
  },
];

const KEY_FACTS = [
  { label: "Established", value: "2019" },
  { label: "Practice areas", value: "22" },
  { label: "Pillars", value: "3" },
  { label: "Base", value: "Abu Dhabi" },
] as const;

// --- Page component ----------------------------------------------------------

export default function AboutPage() {
  return (
    <main>

      {/* PageHeader sits at the top of every inner page, below the fixed nav.
          dividerFill="fill-cream" matches the founding story section below.    */}
      <PageHeader
        title="About the Firm"
        eyebrow="Our Story"
        subtitle="A boutique legal consultancy built on institutional judgment, regional depth, and a direct commitment to every client mandate."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
        dividerFill="fill-cream"
      />

      {/* =======================================================================
          SECTION 1: FOUNDING STORY
          Cream background — warm and approachable. Two columns on large screens:
          body copy on the left, an image placeholder on the right.
      ======================================================================= */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          <AnimateIn>
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">

              {/* Left: copy ----------------------------------------------- */}
              <div>
                <p className="mb-5 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-gold/80">
                  Founded · Abu Dhabi · 2019
                </p>

                <h2 className="mb-6 max-w-[20ch] font-heading text-display-md leading-[1.05] text-wave-700">
                  Counsel forged in the heart of the UAE.
                </h2>

                <div className="mb-8 h-px w-16 bg-gold" aria-hidden="true" />

                <p className="mb-6 font-body text-body-lg leading-relaxed text-shadow-grey">
                  Amara &amp; Partners was founded to fill a gap in the Abu Dhabi
                  market: a boutique firm that delivers the depth of international
                  practice disciplines through the attention and intimacy of a
                  specialist team. Where large firms offer breadth at scale, we
                  offer depth at pace.
                </p>

                <p className="mb-6 font-body text-body-lg leading-relaxed text-shadow-grey">
                  Based on Reem Island, we work where our clients work — across
                  mainland UAE, the ADGM, and the DIFC. Our practice spans 22
                  specialist areas organised across three integrated pillars:
                  Corporate &amp; Transactions, Disputes, and Regulatory &amp;
                  Compliance.
                </p>

                <p className="font-body text-body-lg leading-relaxed text-shadow-grey">
                  We hold a simple belief: institutional-quality legal counsel
                  should not require a global firm's structure. Our clients deserve
                  advisers close enough to understand the nuance of their commercial
                  reality, and experienced enough to navigate its complexity.
                </p>
              </div>

              {/* Right: image placeholder ---------------------------------- */}
              {/*
                Replace this placeholder with a <next/image> component once
                photography is provided. Target aspect ratio: 4/3.
              */}
              <div
                className="relative aspect-4/3 overflow-hidden rounded-card bg-linear-to-br from-wave-600 to-wave-400"
                aria-label="Firm photography — placeholder"
                role="img"
              >
                {/* Faint decorative wave */}
                <svg
                  viewBox="0 0 400 300"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 h-full w-full opacity-10"
                  aria-hidden="true"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <path
                    d="M0,150 C66,120 134,180 200,150 C266,120 334,180 400,150 L400,300 L0,300 Z"
                    fill="white"
                  />
                </svg>

                {/* Placeholder label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    className="text-wave-200/40"
                    aria-hidden="true"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <p className="font-body text-body-xs uppercase tracking-[0.3em] text-wave-200/40">
                    Photography placeholder
                  </p>
                </div>
              </div>

            </div>
          </AnimateIn>

          {/* Key facts strip */}
          <AnimateIn delay={0.15}>
            <dl className="mt-20 grid grid-cols-2 overflow-hidden rounded-card border border-wave-200/30 lg:grid-cols-4">
              {KEY_FACTS.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1.5 border-e border-wave-200/30 bg-wave-100/30 px-8 py-7 last:border-e-0"
                >
                  <dt className="font-body text-body-xs font-medium uppercase tracking-[0.2em] text-wave-400/70">
                    {label}
                  </dt>
                  <dd className="font-heading text-display-md leading-none text-wave-700">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </AnimateIn>

        </div>
      </section>

      {/* =======================================================================
          SECTION 2: OUR VALUES
          Dark (wave-700) background — value cards float above it with a subtle
          glass-like surface. Four columns on large screens, 2×2 grid otherwise.
      ======================================================================= */}
      <section className="bg-wave-700 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          <AnimateIn>
            <div className="mb-16">
              <p className="mb-4 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
                What we stand for
              </p>
              <h2 className="max-w-[22ch] font-heading text-display-md leading-[1.05] text-wave-100">
                Principles that shape every mandate.
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <AnimateIn key={value.title} delay={i * 0.1}>
                <div className="flex h-full flex-col gap-5 rounded-card border border-wave-600 bg-wave-600/40 p-8 backdrop-blur-sm">

                  {/* Ordinal number — decorative, low-contrast */}
                  <span
                    className="font-heading text-display-md leading-none text-gold/20 select-none tabular-nums"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>

                  <div className="h-px w-10 bg-gold/50" aria-hidden="true" />

                  <h3 className="font-heading text-body-xl leading-tight text-wave-100">
                    {value.title}
                  </h3>

                  <p className="font-body text-body-sm leading-relaxed text-wave-300/80">
                    {value.description}
                  </p>

                </div>
              </AnimateIn>
            ))}
          </div>

        </div>
      </section>

      {/* =======================================================================
          SECTION 3: FIRM ETHOS
          Medium-dark (wave-500) background. Bold italic pullquote on the left,
          explanatory copy and CTAs on the right.
      ======================================================================= */}
      <section className="bg-wave-500 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">

          <AnimateIn>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">

              {/* Left: pullquote */}
              <div>
                <div className="mb-8 h-px w-16 bg-gold" aria-hidden="true" />
                <blockquote className="font-heading text-display-md italic leading-[1.15] text-wave-100">
                  "A team that values depth over volume. We take fewer matters
                  than a larger firm might, and we do each one fully."
                </blockquote>
              </div>

              {/* Right: copy + CTAs */}
              <div>
                <p className="mb-5 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/70">
                  Our culture
                </p>

                <p className="mb-6 font-body text-body-lg leading-relaxed text-wave-200/80">
                  That focus is not a constraint — it is our competitive
                  advantage. By limiting the number of matters we take on, each
                  client receives the undivided attention of an experienced team,
                  not delegation to a junior bench.
                </p>

                <p className="mb-10 font-body text-body-lg leading-relaxed text-wave-200/80">
                  We are practitioners who have worked in the markets we advise
                  on. We understand the commercial pressures that shape your
                  decisions, and we engage with them directly.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" size="lg" href="/contact" arrow>
                    Get in touch
                  </Button>
                  <Button variant="secondary" size="lg" href="/practice">
                    Our practice areas
                  </Button>
                </div>

              </div>

            </div>
          </AnimateIn>

        </div>
      </section>

    </main>
  );
}
