// src/app/page.tsx -- Component visual test page
// Replace this with the real Home page in Phase 3.
// For now it exists purely to preview components as we build them.

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { InputTestSection } from "@/components/dev/InputTestSection";

// ---------------------------------------------------------------------------
// MOCK DATA -- placeholders until src/data/ files are built
// ---------------------------------------------------------------------------

const mockPillar = {
  number: "01",
  name: "Corporate & Transactions",
  description:
    "Advising on the full spectrum of corporate matters, from cross-border M&A and free zone structuring to banking, finance, and real estate transactions across the UAE.",
  href: "/practice/corporate",
};

const mockInsight = {
  title: "ADGM's New Arbitration Framework: What it Means for Regional Disputes",
  excerpt:
    "The Abu Dhabi Global Market has introduced significant amendments to its arbitration regulations. We break down the key changes and their practical implications for businesses operating in the region.",
  date: "12 June 2025",
  readTime: "5 min read",
  category: "Disputes",
  href: "/insights/adgm-arbitration-2025",
  image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
  imageAlt: "Abstract legal document background",
};

const mockPerson = {
  name: "Sarah Al Maktoum",
  role: "Senior Associate",
  initials: "SM",
  specialisations: ["Corporate", "M&A", "Free Zones"],
};

// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-wave-500 space-y-16">
      {/* SECTION: Button tests (preserved from Phase 1) */}
      <section className="space-y-4">
        <p className="font-body text-body-sm text-wave-200 uppercase tracking-widest">Buttons</p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="lg" arrow>
            Get in Touch
          </Button>
          <Button variant="secondary" arrow>
            Learn More
          </Button>
          <Button variant="ghost" arrow>
            Read our latest insights
          </Button>
        </div>
      </section>

      {/* SECTION: Card tests */}
      <section className="space-y-4">
        <p className="font-body text-body-sm text-wave-200 uppercase tracking-widest">Cards</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          <Card variant="practice" pillar={mockPillar} />
          <Card variant="insight" insight={mockInsight} />
          <Card variant="person" person={mockPerson} />
        </div>
      </section>

      {/* SECTION: Badge tests */}
      <section className="space-y-3">
        <p className="font-body text-body-sm text-wave-200 uppercase tracking-widest">Badges</p>
        <div className="flex flex-wrap gap-3">
          <Badge>Corporate</Badge>
          <Badge>Disputes</Badge>
          <Badge variant="dark">Regulatory</Badge>
          <Badge variant="dark">Aviation</Badge>
        </div>
      </section>

      {/* SECTION: Input tests (client island — stateful) */}
      <InputTestSection />
    </main>
  );
}
