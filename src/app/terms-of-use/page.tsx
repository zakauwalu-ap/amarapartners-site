// =============================================================================
// src/app/terms-of-use/page.tsx
// =============================================================================
// Placeholder terms of use — replace with firm-approved text before launch.
// Linked from the global footer.
// =============================================================================

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the Amara & Partners website. Draft placeholder — not final legal advice.",
};

interface TermsSectionProps {
  title: string;
  children: ReactNode;
}

function TermsSection({ title, children }: TermsSectionProps) {
  return (
    <section className="mb-14 last:mb-0">
      <h2 className="mb-4 font-heading text-heading-md text-wave-700">{title}</h2>
      <div className="space-y-4 font-body text-body-base leading-relaxed text-shadow-grey">
        {children}
      </div>
    </section>
  );
}

export default function TermsOfUsePage() {
  return (
    <main>
      <PageHeader
        title="Terms of Use"
        eyebrow="Legal"
        subtitle="Rules for using this website. This page is a development placeholder and must be replaced with counsel-approved text before production launch."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Terms of Use" },
        ]}
        dividerFill="fill-cream"
      />

      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-[8vw]">
          <AnimateIn>
            <p className="mb-12 rounded-card border border-wave-200/40 bg-wave-100/30 p-6 font-body text-body-sm leading-relaxed text-wave-700">
              <strong className="font-semibold">Draft notice:</strong> These terms are illustrative
              only. They are not legal advice and may not reflect the firm&apos;s final risk position.
              Have qualified counsel review and adapt them for the live site and governing law.
            </p>

            <TermsSection title="1. Agreement">
              <p>
                By accessing or using the website of Amara &amp; Partners Legal Consultants
                (&quot;the firm&quot;, &quot;we&quot;, &quot;us&quot;), you agree to these terms. If
                you do not agree, please do not use the site.
              </p>
            </TermsSection>

            <TermsSection title="2. Not legal advice">
              <p>
                Content on this website is for general information only. It does not constitute legal
                advice, does not create a lawyer–client relationship, and must not be relied upon as a
                substitute for advice tailored to your specific circumstances. Contact the firm
                directly if you wish to instruct us.
              </p>
            </TermsSection>

            <TermsSection title="3. No solicitor–client relationship">
              <p>
                Sending an email or submitting a form through the website does not establish a
                solicitor–client (or equivalent) relationship unless and until we have agreed in
                writing to act for you and completed any required conflict and engagement procedures.
              </p>
            </TermsSection>

            <TermsSection title="4. Acceptable use">
              <p>
                You agree not to misuse the website — including by attempting to gain unauthorised
                access, introducing malware, scraping content in breach of these terms, or using the
                site in any way that violates applicable law or third-party rights.
              </p>
            </TermsSection>

            <TermsSection title="5. Intellectual property">
              <p>
                Unless otherwise stated, the firm or its licensors own the copyright, trade marks,
                and other rights in the website and its content. You may view and print pages for
                personal, non-commercial use. Any other use requires our prior written consent.
              </p>
            </TermsSection>

            <TermsSection title="6. Third-party links">
              <p>
                The website may contain links to third-party sites. We are not responsible for their
                content or practices. Following links is at your own risk.
              </p>
            </TermsSection>

            <TermsSection title="7. Disclaimer of warranties">
              <p>
                The website is provided &quot;as is&quot; and &quot;as available&quot;. To the
                fullest extent permitted by law, we disclaim warranties of any kind, whether express
                or implied, including as to accuracy, completeness, or fitness for a particular
                purpose.
              </p>
            </TermsSection>

            <TermsSection title="8. Limitation of liability">
              <p>
                To the fullest extent permitted by applicable law, the firm and its partners,
                consultants, and staff shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or for loss of profits, data, or goodwill, arising
                from your use of the website. Nothing in these terms excludes liability that cannot
                legally be excluded.
              </p>
            </TermsSection>

            <TermsSection title="9. Governing law and disputes">
              <p>
                These placeholder terms refer generally to the laws of the United Arab Emirates.
                Final terms should specify the emirate, forum, and dispute resolution mechanism
                approved by the firm&apos;s counsel.
              </p>
            </TermsSection>

            <TermsSection title="10. Changes">
              <p>
                We may update these terms from time to time. Continued use of the website after
                changes are posted constitutes acceptance of the revised terms, to the extent
                permitted by law.
              </p>
            </TermsSection>

            <TermsSection title="11. Contact">
              <p>
                Questions about these terms may be directed to{" "}
                <a
                  href="mailto:info@amarapartners.ae"
                  className="font-medium text-wave-500 underline-offset-2 hover:underline"
                >
                  info@amarapartners.ae
                </a>
                .
              </p>
            </TermsSection>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
