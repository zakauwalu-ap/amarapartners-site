// =============================================================================
// src/app/people/[slug]/page.tsx
// =============================================================================
// Individual bio — /people/[slug]. Static generation from src/data/people.ts
// =============================================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { getPersonBySlug, PERSON_SLUGS } from "@/data/people";

export const dynamicParams = false;

export function generateStaticParams() {
  return PERSON_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = getPersonBySlug(slug);

  if (!person) return { title: "People" };

  return {
    title: person.name,
    description: `${person.role} — ${person.specialisations.slice(0, 2).join(", ")} at Amara & Partners.`,
  };
}

function PracticePill({ name, href }: { name: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 rounded-button border border-wave-500 bg-wave-500/30 px-5 py-3 font-body text-body-sm font-medium text-wave-200 transition-all duration-200 hover:border-brand-gold/40 hover:bg-wave-500/60 hover:text-cream"
    >
      <span>{name}</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Link>
  );
}

function PhotoPlaceholder({ name }: { name: string }) {
  return (
    <div
      className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-card bg-linear-to-br from-wave-600 to-wave-400"
      aria-label={`Portrait placeholder for ${name}`}
      role="img"
    >
      <svg
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full opacity-15"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M1.23,572.13l53.34-7.32c53.44-7.22,160.13-21.76,266.92-22.76,106.79-1,213.47,11.64,320.26,22.57,106.79,10.93,213.47,20.05,320.26,17.75,106.79-2.31,213.47-16.15,320.26-23.57,106.79-7.52,213.47-8.63,320.26-1.5,106.79,7.02,213.47,22.26,266.92,29.98l53.34,7.83V12.5H1.23v559.63Z"
          fill="white"
        />
      </svg>
      <div className="relative z-10 flex flex-col items-center gap-2 text-cream/90">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        <span className="font-body text-body-xs font-medium uppercase tracking-wider">
          Photography to follow
        </span>
      </div>
    </div>
  );
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);

  if (!person) notFound();

  return (
    <main>
      <PageHeader
        title={person.name}
        eyebrow="People"
        subtitle={person.role}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "People", href: "/people" },
          { label: person.name },
        ]}
        dividerFill="fill-cream"
      />

      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">
          <AnimateIn>
            <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
              <div>
                <p className="mb-5 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-brand-gold/80">
                  Profile
                </p>
                <div className="mb-6 h-px w-16 bg-brand-gold" aria-hidden="true" />
                {person.bio.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="mb-6 font-body text-body-lg leading-relaxed text-shadow-grey last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
                <p className="mt-8 font-body text-body-sm text-shadow-grey/80">
                  <span className="font-medium text-wave-700">Enquiries: </span>
                  <a
                    href={`mailto:${person.email}`}
                    className="text-wave-500 underline-offset-2 transition-colors hover:text-wave-700 hover:underline"
                  >
                    {person.email}
                  </a>
                </p>
              </div>
              <PhotoPlaceholder name={person.name} />
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="bg-wave-700 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">
          <AnimateIn>
            <div className="mb-10">
              <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
                Qualifications
              </p>
              <h2 className="font-heading text-display-md leading-tight text-wave-100">
                Background
              </h2>
            </div>
            <ul className="max-w-2xl space-y-4 border-s-2 border-brand-gold/40 ps-8">
              {person.qualifications.map((line) => (
                <li
                  key={line}
                  className="font-body text-body-lg leading-relaxed text-wave-200/90"
                >
                  {line}
                </li>
              ))}
            </ul>
          </AnimateIn>
        </div>
      </section>

      <section className="bg-wave-600 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-[8vw]">
          <AnimateIn>
            <div className="mb-10">
              <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-200/60">
                Practice focus
              </p>
              <h2 className="font-heading text-display-md leading-tight text-wave-100">
                Related areas
              </h2>
            </div>
            <div className="flex flex-wrap gap-3" role="list">
              {person.relatedPractices.map((p) => (
                <div key={p.href} role="listitem">
                  <PracticePill name={p.name} href={p.href} />
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="bg-wave-500 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">
          <AnimateIn>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
              <div>
                <div className="mb-8 h-px w-16 bg-brand-gold" aria-hidden="true" />
                <h2 className="font-heading text-display-md leading-tight text-wave-100">
                  Work with {person.name.split(" ")[0]}
                </h2>
                <p className="mt-5 font-body text-body-lg leading-relaxed text-wave-200/80">
                  Initial conversations are without obligation. Please reach out through the
                  firm&apos;s contact page or the email address above.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href="/contact" arrow>
                  Get in touch
                </Button>
                <Button variant="secondary" size="lg" href="/people">
                  All people
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
