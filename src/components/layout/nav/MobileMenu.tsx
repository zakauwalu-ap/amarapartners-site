// =============================================================================
// src/components/layout/nav/MobileMenu.tsx
// =============================================================================
// Full-screen overlay menu for mobile viewports.
//
// Structure:
//   - Covers the full screen with wave-700 background
//   - Logo + close button at top
//   - Practice and Industries expand/collapse inline (accordion style)
//   - Simple links below
//   - Contact CTA button at the bottom
// =============================================================================

"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { practicePillars, industries, navLinks } from "@/data/navigation";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Track which accordion is open: null | "practice" | "industries"
  const [openSection, setOpenSection] = useState<null | "practice" | "industries">(null);

  const toggleSection = (section: "practice" | "industries") => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          // Full screen overlay -- fixed so it covers everything including scroll
          className="fixed inset-0 z-[60] bg-wave-700 overflow-y-auto"
        >
          {/* Inner scroll container */}
          <div className="min-h-full flex flex-col px-6 py-6">

            {/* Top bar: logo placeholder + close button */}
            <div className="flex items-center justify-between mb-10">
              <Link
                href="/"
                onClick={onClose}
                className="font-heading text-xl text-cream tracking-wide"
              >
                Amara & Partners
              </Link>

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="text-wave-200 hover:text-cream transition-colors p-1 touch-manipulation"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="pointer-events-none"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col flex-1 gap-1">

              {/* PRACTICE -- accordion */}
              <MobileAccordion
                label="Practice"
                isOpen={openSection === "practice"}
                onToggle={() => toggleSection("practice")}
              >
                {practicePillars.map((pillar) => (
                  <div key={pillar.slug} className="mb-5">
                    {/* Pillar heading */}
                    <Link
                      href={`/practice/${pillar.slug}`}
                      onClick={onClose}
                      className="font-heading text-body-base text-gold block mb-2"
                    >
                      {pillar.name}
                    </Link>
                    {/* Sub-areas */}
                    <ul className="space-y-2 pl-3 border-l border-wave-600">
                      {pillar.areas.map((area) => (
                        <li key={area.slug}>
                          <Link
                            href={`/practice/${pillar.slug}/${area.slug}`}
                            onClick={onClose}
                            className="font-body text-body-sm text-wave-200 hover:text-cream transition-colors"
                          >
                            {area.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </MobileAccordion>

              {/* INDUSTRIES -- accordion */}
              <MobileAccordion
                label="Industries"
                isOpen={openSection === "industries"}
                onToggle={() => toggleSection("industries")}
              >
                <ul className="space-y-3">
                  {industries.map((industry) => (
                    <li key={industry.slug}>
                      <Link
                        href={`/industries/${industry.slug}`}
                        onClick={onClose}
                        className="font-body text-body-base text-wave-200 hover:text-cream transition-colors"
                      >
                        {industry.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </MobileAccordion>

              {/* Simple nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="
                    font-body text-body-lg text-wave-100
                    py-4 border-b border-wave-600
                    hover:text-cream transition-colors
                  "
                >
                  {link.label}
                </Link>
              ))}

              {/* Client portal -- subtle */}
              <a
                href="https://portal.amarapartners.ae"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="font-body text-body-sm text-wave-300 py-4 hover:text-wave-100 transition-colors"
              >
                Client Portal
              </a>
            </nav>

            {/* Bottom CTA */}
            <div className="pt-8 pb-4">
              <Button variant="primary" size="lg" href="/contact" arrow className="w-full justify-center">
                Get in Touch
              </Button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// ACCORDION SUB-COMPONENT
// Reusable expand/collapse for Practice and Industries in mobile menu
// ---------------------------------------------------------------------------

interface MobileAccordionProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function MobileAccordion({ label, isOpen, onToggle, children }: MobileAccordionProps) {
  return (
    <div className="border-b border-wave-600">
      {/* Trigger row */}
      <button
        onClick={onToggle}
        className="
          w-full flex items-center justify-between
          py-4 font-body text-body-lg text-wave-100
          hover:text-cream transition-colors
        "
        aria-expanded={isOpen}
      >
        {label}
        {/* Chevron rotates when open */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Accordion body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}