// =============================================================================
// src/app/privacy-policy/page.tsx
// =============================================================================
// Placeholder privacy policy — replace with firm-approved text before launch.
// Linked from the global footer.
// =============================================================================

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Amara & Partners Legal Consultants handles personal data in connection with this website. Draft placeholder — not final legal advice.",
};

interface PolicySectionProps {
  title: string;
  children: ReactNode;
}

function PolicySection({ title, children }: PolicySectionProps) {
  return (
    <section className="mb-14 last:mb-0">
      <h2 className="mb-4 font-heading text-heading-md text-wave-700">{title}</h2>
      <div className="space-y-4 font-body text-body-base leading-relaxed text-shadow-grey">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHeader
        title="Privacy Policy"
        eyebrow="Legal"
        subtitle="How we handle information in connection with amarapartners.ae. This page is a development placeholder and must be replaced with counsel-approved text before production launch."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
        dividerFill="fill-cream"
      />

      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-[8vw]">
          <AnimateIn>
            <p className="mb-12 rounded-card border border-wave-200/40 bg-wave-100/30 p-6 font-body text-body-sm leading-relaxed text-wave-700">
              <strong className="font-semibold">Draft notice:</strong> The following sections are
              illustrative only. They do not constitute legal advice and are not tailored to the
              firm&apos;s final data processing activities. Engage qualified counsel to finalise this
              policy and any cookie or marketing consents.
            </p>

            <PolicySection title="1. Who we are">
              <p>
                Amara &amp; Partners Legal Consultants (&quot;we&quot;, &quot;us&quot;, or
                &quot;the firm&quot;) is a legal consultancy based in Abu Dhabi, United Arab Emirates.
                This policy describes how we may process personal data when you use our website or
                contact us through the channels it provides.
              </p>
            </PolicySection>

            <PolicySection title="2. Information we may collect">
              <p>
                Depending on how you interact with us, we may collect identifiers and contact details
                (such as name, email address, and telephone number), professional information, and
                technical data relating to your visit (such as IP address, browser type, and pages
                viewed). We may also receive information you include in enquiry forms or when you
                email us directly.
              </p>
            </PolicySection>

            <PolicySection title="3. How we use information">
              <p>
                We use personal data to respond to enquiries, provide legal services where you become
                a client, operate and improve our website, comply with legal and regulatory
                obligations, and protect our legitimate interests (such as network security and
                fraud prevention), where permitted by applicable law.
              </p>
            </PolicySection>

            <PolicySection title="4. Legal bases and retention">
              <p>
                Where the UAE Personal Data Protection Law or other regimes apply, we process data
                based on grounds such as consent, contract performance, legal obligation, or legitimate
                interest. Retention periods depend on the purpose of processing and applicable
                professional and regulatory requirements.
              </p>
            </PolicySection>

            <PolicySection title="5. Sharing and international transfers">
              <p>
                We may share data with service providers who assist us (for example hosting,
                analytics, or email delivery), subject to appropriate safeguards. If data is
                transferred outside the UAE, we do so in line with applicable transfer mechanisms
                and contractual protections as required by law.
              </p>
            </PolicySection>

            <PolicySection title="6. Your rights">
              <p>
                Depending on applicable law, you may have rights to access, correct, delete, or
                restrict processing of your personal data, or to object to certain processing. You
                may also have the right to lodge a complaint with a supervisory authority where one
                exists. To exercise rights, contact us using the details below.
              </p>
            </PolicySection>

            <PolicySection title="7. Cookies and similar technologies">
              <p>
                Our website may use cookies or similar technologies to remember preferences, measure
                traffic, or support security. A separate cookie notice or consent tool may be
                implemented before launch to meet applicable requirements.
              </p>
            </PolicySection>

            <PolicySection title="8. Security">
              <p>
                We implement appropriate technical and organisational measures designed to protect
                personal data. No method of transmission over the internet is completely secure; we
                cannot guarantee absolute security.
              </p>
            </PolicySection>

            <PolicySection title="9. Changes">
              <p>
                We may update this policy from time to time. The revised version will be posted on
                this page with an updated effective date once final content is approved.
              </p>
            </PolicySection>

            <PolicySection title="10. Contact">
              <p>
                For privacy-related questions, contact the firm at{" "}
                <a
                  href="mailto:info@amarapartners.ae"
                  className="font-medium text-wave-500 underline-offset-2 hover:underline"
                >
                  info@amarapartners.ae
                </a>{" "}
                or write to: Second Floor, Office 258, Wafra Square, Reem Island, Abu Dhabi, UAE.
              </p>
            </PolicySection>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
