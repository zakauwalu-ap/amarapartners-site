// =============================================================================
// src/components/layout/nav/MegaMenu.tsx
// =============================================================================
// The dropdown panel shared by both "Practice" and "Industries" nav items.
//
// For Practice: renders three columns (one per pillar) with sub-areas listed.
// For Industries: renders a single wider column with industry cards.
//
// Props:
//   type      -- "practice" | "industries"
//   isOpen    -- controls visibility (animated in/out with Framer Motion)
//   onClose   -- called when a link inside the menu is clicked
// =============================================================================

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { practicePillars, industries } from "@/data/navigation";

interface MegaMenuProps {
  type: "practice" | "industries";
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ type, isOpen, onClose }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // Animate: fade in + slide down from -8px
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          // Full-width panel pinned below the nav bar
          className="absolute top-full left-0 right-0 bg-wave-700 border-t border-wave-600"
        >
          <div className="max-w-7xl mx-auto px-6 py-10">
            {type === "practice" ? (
              <PracticeColumns onClose={onClose} />
            ) : (
              <IndustriesColumns onClose={onClose} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// PRACTICE: three pillar columns
// ---------------------------------------------------------------------------

function PracticeColumns({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {practicePillars.map((pillar) => (
        <div key={pillar.slug}>

          {/* Pillar heading -- links to the pillar overview page */}
          <Link
            href={`/practice/${pillar.slug}`}
            onClick={onClose}
            className="group block mb-4"
          >
            {/* Pillar number */}
            <span className="font-body text-[11px] text-wave-300 uppercase tracking-widest">
              {pillar.number}
            </span>
            {/* Pillar name */}
            <h3 className="font-heading text-heading-sm text-cream leading-tight mt-0.5 group-hover:text-gold transition-colors duration-200">
              {pillar.name}
            </h3>
          </Link>

          {/* Gold divider */}
          <div className="w-6 h-px bg-gold mb-4" aria-hidden="true" />

          {/* Sub-area links */}
          <ul className="space-y-2">
            {pillar.areas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/practice/${pillar.slug}/${area.slug}`}
                  onClick={onClose}
                  className="
                    font-body text-body-sm text-wave-200
                    hover:text-cream hover:pl-1
                    transition-all duration-150
                    flex items-center gap-1.5
                  "
                >
                  {/* Subtle dot indicator */}
                  <span className="w-1 h-1 rounded-full bg-wave-400 flex-shrink-0" aria-hidden="true" />
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// INDUSTRIES: single wide column with description cards
// ---------------------------------------------------------------------------

function IndustriesColumns({ onClose }: { onClose: () => void }) {
  return (
    // Two-column grid: industry cards on left, wide spacing on right
    // We use a 3-column grid and span the cards 2 cols to keep visual width
    // consistent with the Practice mega menu
    <div className="grid grid-cols-2 gap-4 max-w-3xl">
      {industries.map((industry) => (
        <Link
          key={industry.slug}
          href={`/industries/${industry.slug}`}
          onClick={onClose}
          className="
            group flex flex-col gap-1
            p-4 rounded-sm
            border border-wave-600
            hover:border-wave-400 hover:bg-wave-600
            transition-all duration-200
          "
        >
          <span className="font-heading text-body-base text-cream group-hover:text-gold transition-colors duration-200">
            {industry.name}
          </span>
          <span className="font-body text-body-xs text-wave-300 leading-relaxed line-clamp-2">
            {industry.description}
          </span>
        </Link>
      ))}
    </div>
  );
}