// =============================================================================
// src/components/sections/CTAContact.tsx
// =============================================================================
// Zone 5 of the WaveSystem scroll driver — the final content zone.
// Near-black (wave-700) background. Bold heading, gold primary CTA,
// secondary "explore practice areas" link, and firm contact details.
// This panel stays fully visible through to the end of the scroll driver.
// =============================================================================

import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ContactDetail {
  label: string;
  value: string;
  href?: string;
}

const CONTACT_DETAILS: ContactDetail[] = [
  {
    label: "Address",
    value: "Second Floor, Office 258, Wafra Square, Reem Island, Abu Dhabi, UAE",
  },
  {
    label: "Phone",
    value: "+971 2 550 0085",
    href: "tel:+97125500085",
  },
  {
    label: "Email",
    value: "info@amarapartners.ae",
    href: "mailto:info@amarapartners.ae",
  },
];

export function CTAContact() {
  return (
    <div className="flex h-full flex-col justify-center px-[8vw] py-[10vh]">

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

        {/* Left column — heading + CTAs */}
        <div className="flex flex-col justify-center">
          <p className="mb-5 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-brand-gold/70">
            Get in touch
          </p>

          <h2 className="mb-8 font-heading text-display-lg leading-[1.05] text-wave-100">
            Let&apos;s discuss your next move.
          </h2>

          <p className="mb-10 max-w-[44ch] font-body text-body-lg leading-relaxed text-wave-200/70">
            Whether you are structuring a transaction, navigating a dispute, or
            managing a regulatory challenge — we are ready to help.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" href="/contact" arrow>
              Discuss a mandate
            </Button>
            <Button variant="secondary" size="lg" href="/practice">
              Explore practice areas
            </Button>
          </div>
        </div>

        {/* Right column — contact details */}
        <div className="flex flex-col justify-center">
          <dl className="flex flex-col gap-7">
            {CONTACT_DETAILS.map(({ label, value, href }) => (
              <div key={label} className="border-b border-wave-600 pb-7 last:border-0 last:pb-0">
                <dt className="mb-1.5 font-body text-body-xs font-semibold uppercase tracking-[0.22em] text-wave-400/80">
                  {label}
                </dt>
                <dd className="font-body text-body-md leading-relaxed text-wave-100/80">
                  {href ? (
                    <Link
                      href={href}
                      className="transition-colors duration-200 hover:text-brand-gold"
                    >
                      {value}
                    </Link>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
