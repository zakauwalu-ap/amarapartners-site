// =============================================================================
// src/app/contact/page.tsx
// =============================================================================
// Contact page — /contact
//
// Structure:
//   1. PageHeader       — dark gradient with wave divider into cream
//   2. Main section     — cream bg, two-column layout:
//        Left  (3fr): eyebrow + heading + ContactForm (client component)
//        Right (2fr): eyebrow + heading + firm contact details + Google Maps
//
// Server Component. ContactForm is extracted as a separate client component
// so this page can remain server-rendered.
// =============================================================================

import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ContactForm } from "@/components/sections/ContactForm";

// --- Metadata ----------------------------------------------------------------

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Amara & Partners Legal Consultants. Our team is based " +
    "in Abu Dhabi and advises across the UAE and GCC. Discuss your matter with us.",
};

// --- Types + contact detail data --------------------------------------------

type IconType = "map-pin" | "phone" | "mail";

interface ContactItem {
  id: string;
  label: string;
  lines: string[];
  href: string;
  /** Open in new tab (true for the address link to Google Maps) */
  external?: boolean;
  icon: IconType;
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    id: "address",
    label: "Our Office",
    lines: ["Second Floor, Office 258", "Wafra Square, Reem Island", "Abu Dhabi, UAE"],
    href: "https://maps.google.com/?q=Wafra+Square,+Reem+Island,+Abu+Dhabi,+UAE",
    external: true,
    icon: "map-pin",
  },
  {
    id: "phone",
    label: "Telephone",
    lines: ["02 550 0085"],
    href: "tel:+97125500085",
    icon: "phone",
  },
  {
    id: "email",
    label: "Email",
    lines: ["info@amarapartners.ae"],
    href: "mailto:info@amarapartners.ae",
    icon: "mail",
  },
];

// --- Icon components ---------------------------------------------------------
// Inline SVGs keep this a zero-dependency server component.
// Lucide-style stroke icons at 18×18 viewport.

function ContactIcon({ type }: { type: IconType }) {
  const sharedProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "map-pin") {
    return (
      <svg {...sharedProps}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg {...sharedProps}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.36 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.48 5.48l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }

  // mail
  return (
    <svg {...sharedProps}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// --- Page component ----------------------------------------------------------

export default function ContactPage() {
  return (
    <main>

      {/* PageHeader — dark gradient flows into the cream section below */}
      <PageHeader
        title="Let's discuss your next move."
        eyebrow="Contact Us"
        subtitle="Our team is based in Abu Dhabi and advises across the UAE and GCC. Reach out to discuss how we can assist with your matter."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        dividerFill="fill-cream"
      />

      {/* =======================================================================
          MAIN SECTION
          Two-column layout: form on the left, firm details + map on the right.
          The 3fr/2fr split gives the form more room while keeping the details
          column comfortable at all sizes.
      ======================================================================= */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-[8vw]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[3fr_2fr] lg:gap-20 xl:gap-28">

            {/* ---------------------------------------------------------------
                LEFT: Contact form
            --------------------------------------------------------------- */}
            <AnimateIn>
              <div>
                <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-brand-gold/80">
                  Send a message
                </p>
                <h2 className="mb-2 font-heading text-display-md leading-tight text-wave-700">
                  We&apos;d like to hear from you.
                </h2>
                <div className="mb-8 h-px w-16 bg-brand-gold" aria-hidden="true" />
                <ContactForm />
              </div>
            </AnimateIn>

            {/* ---------------------------------------------------------------
                RIGHT: Firm details + map
            --------------------------------------------------------------- */}
            <AnimateIn delay={0.15}>
              <div>
                <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-brand-gold/80">
                  Find us
                </p>
                <h2 className="mb-2 font-heading text-display-md leading-tight text-wave-700">
                  Our office.
                </h2>
                <div className="mb-8 h-px w-16 bg-brand-gold" aria-hidden="true" />

                {/* Contact detail items */}
                <ul className="mb-10 flex flex-col gap-7" aria-label="Contact details">
                  {CONTACT_ITEMS.map((item) => (
                    <li key={item.id} className="flex items-start gap-4">

                      {/* Icon pill */}
                      <div
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wave-100 text-wave-500"
                        aria-hidden="true"
                      >
                        <ContactIcon type={item.icon} />
                      </div>

                      <div>
                        <p className="mb-1 font-body text-body-xs font-semibold uppercase tracking-[0.2em] text-wave-400/70">
                          {item.label}
                        </p>
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className="font-body text-body-md leading-relaxed text-wave-700 transition-colors duration-200 hover:text-wave-400"
                        >
                          {item.lines.map((line, i) => (
                            <span key={i} className="block">
                              {line}
                            </span>
                          ))}
                        </a>
                      </div>

                    </li>
                  ))}
                </ul>

                {/* Google Maps embed
                    -------------------------------------------------------
                    This uses the query-based embed format which does not
                    require an API key and works for development. For
                    production, generate a proper embed URL:
                      1. Search "Wafra Square, Reem Island, Abu Dhabi" on
                         maps.google.com
                      2. Share → Embed a map → copy the iframe src
                    ------------------------------------------------------- */}
                <div className="relative aspect-video overflow-hidden rounded-card border border-wave-200/20 shadow-card">
                  <iframe
                    src="https://maps.google.com/maps?q=Wafra+Square,+Reem+Island,+Abu+Dhabi,+UAE&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    title="Amara & Partners — Wafra Square, Reem Island, Abu Dhabi"
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

              </div>
            </AnimateIn>

          </div>
        </div>
      </section>

    </main>
  );
}
