// =============================================================================
// src/components/ui/Card.tsx
// =============================================================================
// A single, flexible Card component used across the site in three variants:
//   - "practice"  -> Practice area pillar cards (dark wave sections)
//   - "insight"   -> Blog / editorial cards (light sections)
//   - "person"    -> Attorney bio cards (People page, hidden at launch)
//
// Usage examples:
//   <Card variant="practice" pillar={{ number: "01", name: "Corporate & Transactions", description: "...", href: "/practice/corporate" }} />
//   <Card variant="insight"  insight={{ title: "...", excerpt: "...", date: "...", readTime: "5 min", category: "Corporate", href: "/insights/slug", image: "/images/..." }} />
//   <Card variant="person"   person={{ name: "...", role: "...", initials: "SM", specialisations: ["Corporate"], href: "/people/slug" }} />
// =============================================================================

import Link from "next/link";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPE DEFINITIONS
// Each variant has its own data shape. Import these from @/types if you prefer.
// =============================================================================

export interface PracticeCardData {
  number: string;          // e.g. "01", "02", "03"
  name: string;            // e.g. "Corporate & Transactions"
  description: string;     // One or two sentences
  href: string;            // e.g. "/practice/corporate"
}

export interface InsightCardData {
  title: string;
  excerpt: string;         // 2-3 sentence summary
  date: string;            // e.g. "12 June 2025"
  readTime: string;        // e.g. "5 min read"
  category: string;        // e.g. "Corporate", "Regulatory"
  href: string;
  image: string;           // URL to cover image
  imageAlt?: string;       // Alt text for the image (accessibility)
}

export interface PersonCardData {
  name: string;
  role: string;            // e.g. "Managing Partner"
  initials: string;        // e.g. "SM" -- shown in the avatar circle
  specialisations: string[]; // Max 2-3 shown as Badge-like pills
  href: string;            // e.g. "/people/sarah-al-maktoum" — full card is a link
}

// =============================================================================
// VARIANT PROP UNION
// The Card component accepts exactly one of these three variant/data combos.
// =============================================================================

type CardProps =
  | { variant: "practice"; pillar: PracticeCardData; className?: string }
  | { variant: "insight";  insight: InsightCardData;  className?: string }
  | { variant: "person";   person: PersonCardData;    className?: string };


// =============================================================================
// SHARED BASE CLASSES
// These apply to all three variants.
// =============================================================================

const baseCard = cn(
  "relative bg-cream rounded-card overflow-hidden",
  "transition-all duration-300 ease-out",
  "hover:-translate-y-1 hover:shadow-lg",
  "flex flex-col"   // all cards stack content vertically
);


// =============================================================================
// PRACTICE CARD
// Used in: Home PillarCards section, Practice Areas page
// Background: cream, sitting inside a wave-400/500 dark section
// =============================================================================

function PracticeCard({ pillar, className }: { pillar: PracticeCardData; className?: string }) {
  return (
    <Link
      href={pillar.href}
      className={cn(baseCard, "group p-8 min-h-[280px] border border-wave-100/60", className)}
    >
      {/* Gold top-border accent -- the visual anchor for the card */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-gold" aria-hidden="true" />

      {/* Pillar number -- subtle, top-right */}
      <span
        aria-hidden="true"
        className="absolute top-6 right-6 font-body text-body-sm text-shadow-grey/50 tabular-nums"
      >
        {pillar.number}
      </span>

      {/* Pillar name */}
      <h3 className="font-heading text-heading-md text-wave-700 leading-tight mt-4 mb-3 pr-10">
        {pillar.name}
      </h3>

      {/* Thin gold divider */}
      <div className="w-8 h-px bg-brand-gold mb-4" aria-hidden="true" />

      {/* Description */}
      <p className="font-body text-body-base text-shadow-grey leading-relaxed flex-1">
        {pillar.description}
      </p>

      {/* CTA -- animates right on group hover */}
      <div className="mt-6 flex items-center gap-2 font-body text-body-sm text-wave-400 font-medium">
        <span>Explore practice area</span>
        {/* Arrow icon -- slides right on hover */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}


// =============================================================================
// INSIGHT CARD
// Used in: Home FeaturedInsights section, Blog listing page
// Has a cover image, category badge, heading, excerpt, and meta info
// =============================================================================

function InsightCard({ insight, className }: { insight: InsightCardData; className?: string }) {
  return (
    <Link
      href={insight.href}
      className={cn(baseCard, "group border border-light-grey", className)}
    >
      {/* --- Cover image area --- */}
      <div className="relative aspect-[16/9] overflow-hidden bg-wave-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={insight.image}
          alt={insight.imageAlt ?? insight.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category badge -- overlaid on image, bottom-left */}
        <span className="
          absolute bottom-3 left-3
          font-body text-[11px] font-medium uppercase tracking-wider
          bg-wave-700/90 text-wave-100
          px-2.5 py-1 rounded-sm
        ">
          {insight.category}
        </span>
      </div>

      {/* --- Card body --- */}
      <div className="flex flex-col flex-1 p-6">

        {/* Meta: date + read time */}
        <p className="font-body text-body-xs text-shadow-grey/70 mb-3">
          {insight.date} &middot; {insight.readTime}
        </p>

        {/* Heading -- clamp to 2 lines */}
        <h3 className="
          font-heading text-heading-sm text-wave-700 leading-snug mb-3
          line-clamp-2
          group-hover:text-wave-500 transition-colors duration-200
        ">
          {insight.title}
        </h3>

        {/* Excerpt -- clamp to 3 lines */}
        <p className="font-body text-body-sm text-shadow-grey leading-relaxed line-clamp-3 flex-1">
          {insight.excerpt}
        </p>

        {/* CTA */}
        <div className="mt-5 flex items-center gap-2 font-body text-body-sm text-wave-400 font-medium">
          <span>Read more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}


// =============================================================================
// PERSON CARD
// Used in: Attorney bios page (hidden from nav at launch)
// Uses initials avatar -- photo slot to be added in Phase 6
// =============================================================================

function PersonCard({ person, className }: { person: PersonCardData; className?: string }) {
  return (
    <Link
      href={person.href}
      className={cn(baseCard, "group p-6 border border-light-grey items-center text-center", className)}
      aria-label={`View profile: ${person.name}`}
    >

      {/* --- Monogram avatar --- */}
      {/*
        Circle with wave-400 background and white initials.
        Cormorant Garamond for the initials -- feels premium, consistent with the brand.
        Replace this div with an <Image> component in Phase 6 when photos are available.
      */}
      <div
        className="
          w-20 h-20 rounded-full
          bg-wave-400 text-cream
          flex items-center justify-center
          font-heading text-2xl font-medium
          mb-5 ring-4 ring-wave-100
          transition-all duration-300
          group-hover:bg-wave-500 group-hover:ring-wave-200
        "
        aria-hidden="true"
      >
        {person.initials}
      </div>

      {/* Name */}
      <h3 className="font-heading text-heading-sm text-wave-700 leading-tight mb-1 transition-colors duration-200 group-hover:text-wave-500">
        {person.name}
      </h3>

      {/* Role / title -- gold accent */}
      <p className="font-body text-body-sm text-brand-gold font-medium mb-4">
        {person.role}
      </p>

      {/* Specialisation pills -- inline Badge-style, no Badge component dependency yet */}
      {person.specialisations.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {person.specialisations.map((spec) => (
            <span
              key={spec}
              className="
                font-body text-[11px] font-medium uppercase tracking-wide
                bg-wave-100 text-wave-500
                px-2.5 py-1 rounded-sm
              "
            >
              {spec}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center justify-center gap-2 font-body text-body-sm text-wave-400 font-medium">
        <span>View profile</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}


// =============================================================================
// MAIN EXPORT -- ROUTER
// Reads the variant prop and renders the right sub-component.
// =============================================================================

export function Card(props: CardProps) {
  switch (props.variant) {
    case "practice":
      return <PracticeCard pillar={props.pillar} className={props.className} />;
    case "insight":
      return <InsightCard insight={props.insight} className={props.className} />;
    case "person":
      return <PersonCard person={props.person} className={props.className} />;
  }
}