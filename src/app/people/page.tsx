// =============================================================================
// src/app/people/page.tsx
// =============================================================================
// Team listing — /people
// Hidden from primary navigation at launch; reachable by direct URL.
// =============================================================================

import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { people } from "@/data/people";

export const metadata: Metadata = {
  title: "People",
  description:
    "The Amara & Partners team — experienced UAE counsel across corporate, disputes, and regulatory practice.",
};

export default function PeoplePage() {
  return (
    <main>
      <PageHeader
        title="Our People"
        eyebrow="The Team"
        subtitle="Experienced practitioners across our three pillars — Corporate & Transactions, Disputes, and Regulatory & Compliance."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "People" },
        ]}
        dividerFill="fill-wave-700"
      />

      <section className="bg-wave-700 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">
          <AnimateIn>
            <div className="mb-14 max-w-[52ch]">
              <p className="mb-4 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
                Boutique by design
              </p>
              <h2 className="font-heading text-display-md leading-tight text-wave-100">
                A focused team, deliberately senior.
              </h2>
              <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-300/85">
                Biographies below are representative placeholders for website development. Final
                profiles, photography, and contact routing will be confirmed before public launch.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((person, i) => (
              <AnimateIn key={person.slug} delay={(i % 3) * 0.08}>
                <Card
                  variant="person"
                  person={{
                    name: person.name,
                    role: person.role,
                    initials: person.initials,
                    specialisations: person.specialisations,
                    href: `/people/${person.slug}`,
                  }}
                />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-wave-500 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">
          <AnimateIn>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
              <div>
                <div className="mb-8 h-px w-16 bg-brand-gold" aria-hidden="true" />
                <h2 className="font-heading text-display-md leading-tight text-wave-100">
                  Instructing the firm
                </h2>
                <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-200/80">
                  For new matters and general enquiries, please contact us through the firm&apos;s
                  main channels. Individual email routing will be published when profiles go live.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href="/contact" arrow>
                  Contact the firm
                </Button>
                <Button variant="secondary" size="lg" href="/practice">
                  Practice areas
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
