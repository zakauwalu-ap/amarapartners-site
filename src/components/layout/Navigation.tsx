// =============================================================================
// src/components/layout/Navigation.tsx
// =============================================================================
// Main site navigation. Handles:
//   - Transparent-to-solid scroll transition
//   - Desktop: mega-menu dropdowns for Practice and Industries
//   - Desktop: simple links for Insights, Jurisdictions, About
//   - Desktop: Client Portal + Contact CTA on the right
//   - Mobile: hamburger button that opens the full-screen MobileMenu overlay
// =============================================================================

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "@/components/layout/nav/MegaMenu";
import { MobileMenu } from "@/components/layout/nav/MobileMenu";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

const LOGO_GREY = "/images/logo/A&P_logo_grey_primary_RGB.svg";
const LOGO_WHITE = "/images/logo/A&P_logo_white_primary_RGB.svg";

export function Navigation() {
  // -------------------------------------------------------------------------
  // SCROLL STATE
  // -------------------------------------------------------------------------
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);

    // Set initial state in case the page loads mid-scroll
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // iOS/WebKit: `mouseleave` on <header> can fire alongside synthetic mouse events
  // from touches and cause re-renders that swallow the menu button’s `click`.
  // Only use mouse-leave to close mega menus on devices that support real hover.
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setSupportsHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // -------------------------------------------------------------------------
  // DROPDOWN STATE
  // Which mega-menu is open: null | "practice" | "industries"
  // -------------------------------------------------------------------------
  const [openMenu, setOpenMenu] = useState<null | "practice" | "industries">(null);

  // We use a ref on the entire nav to detect mouse-leave from the whole bar
  const navRef = useRef<HTMLElement>(null);

  const handleMouseLeaveNav = () => {
    setOpenMenu(null);
  };

  // -------------------------------------------------------------------------
  // MOBILE MENU STATE
  // -------------------------------------------------------------------------
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // -------------------------------------------------------------------------
  // DERIVED STYLES
  // Text and border colours flip depending on scroll state
  // -------------------------------------------------------------------------
  const navBg = isScrolled
    ? "bg-wave-700 border-b border-wave-600 shadow-md"
    : "bg-transparent border-b border-transparent";

  // Links are wave-700 (dark) on transparent nav (over light Hero),
  // and cream/wave-200 on the solid dark nav
  const linkColor = isScrolled
    ? "text-wave-200 hover:text-cream"
    : "text-wave-700 hover:text-wave-500";

  const subtleLinkColor = isScrolled
    ? "text-wave-300 hover:text-wave-100"
    : "text-wave-500 hover:text-wave-400";

  // -------------------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------------------
  return (
    <>
      <header
        ref={navRef}
        onMouseLeave={supportsHover ? handleMouseLeaveNav : undefined}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 isolate",
          "transition-[background-color,border-color,box-shadow] duration-300 ease-out",
          navBg
        )}
      >
        <nav className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* ----------------------------------------------------------------
              LEFT: Logo
          ----------------------------------------------------------------- */}
          <Link
            href="/"
            onClick={() => setOpenMenu(null)}
            className="relative shrink-0"
          >
            <Image
              src={LOGO_GREY}
              alt="Amara & Partners Legal Consultants"
              width={252}
              height={144}
              priority
              className={cn(
                "h-10 lg:h-12 w-auto transition-opacity duration-300",
                isScrolled && "opacity-0"
              )}
            />
            <Image
              src={LOGO_WHITE}
              alt=""
              width={252}
              height={144}
              priority
              className={cn(
                "absolute top-0 left-0 h-10 lg:h-12 w-auto transition-opacity duration-300",
                isScrolled ? "opacity-100" : "opacity-0"
              )}
              aria-hidden="true"
            />
          </Link>

          {/* ----------------------------------------------------------------
              CENTRE: Desktop nav links (hidden on mobile)
          ----------------------------------------------------------------- */}
          <div className="hidden lg:flex items-center gap-1">

            {/* PRACTICE -- mega-menu trigger */}
            <NavTrigger
              label="Practice"
              isActive={openMenu === "practice"}
              isScrolled={isScrolled}
              onMouseEnter={() => setOpenMenu("practice")}
            />

            {/* INDUSTRIES -- mega-menu trigger */}
            <NavTrigger
              label="Industries"
              isActive={openMenu === "industries"}
              isScrolled={isScrolled}
              onMouseEnter={() => setOpenMenu("industries")}
            />

            {/* Simple links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setOpenMenu(null)}
                className={cn(
                  "px-4 py-2 font-body text-body-sm font-medium transition-colors duration-200",
                  linkColor
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ----------------------------------------------------------------
              RIGHT: Client Portal + Contact CTA (hidden on mobile)
          ----------------------------------------------------------------- */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Client Portal -- subtle text link */}
            <a
              href="https://portal.amarapartners.ae"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-body text-body-sm transition-colors duration-200",
                subtleLinkColor
              )}
            >
              Client Portal
            </a>

            {/*
              Language toggle placeholder -- hidden until Phase 2.
              Uncomment and wire up when Arabic is ready.
            */}
            {/* <button className="font-body text-body-sm ...">EN / AR</button> */}

            {/* Contact CTA */}
            <Button variant="primary" size="md" href="/contact">
              Contact
            </Button>
          </div>

          {/* ----------------------------------------------------------------
              MOBILE: Hamburger button (visible below lg breakpoint)
          ----------------------------------------------------------------- */}
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
            onPointerUp={(e) => {
              // Touch devices: open on pointer up; preventDefault avoids a duplicate
              // synthetic click that can race with React state on iOS.
              if (e.pointerType === "touch") {
                e.preventDefault();
                setMobileOpen(true);
              }
            }}
            className={cn(
              "lg:hidden absolute right-6 top-1/2 z-30 -translate-y-1/2",
              "flex h-11 w-11 cursor-pointer items-center justify-center p-2",
              "touch-manipulation [-webkit-tap-highlight-color:transparent]",
              "transition-colors duration-200",
              isScrolled ? "text-wave-200" : "text-wave-700"
            )}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
              className="pointer-events-none"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </nav>

        {/* ------------------------------------------------------------------
            MEGA MENU PANELS
            Rendered inside the <header> so they inherit its z-index and
            the mouse-leave handler on navRef closes them correctly.
        ------------------------------------------------------------------- */}
        <MegaMenu
          type="practice"
          isOpen={openMenu === "practice"}
          onClose={() => setOpenMenu(null)}
        />
        <MegaMenu
          type="industries"
          isOpen={openMenu === "industries"}
          onClose={() => setOpenMenu(null)}
        />

      </header>

      {/* --------------------------------------------------------------------
          MOBILE MENU OVERLAY
          Rendered outside <header> as a portal-like fixed overlay.
      --------------------------------------------------------------------- */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}


// =============================================================================
// NAV TRIGGER
// Desktop button that opens a mega-menu on hover. Has an animated chevron
// and an active underline state.
// =============================================================================

interface NavTriggerProps {
  label: string;
  isActive: boolean;
  isScrolled: boolean;
  onMouseEnter: () => void;
}

function NavTrigger({ label, isActive, isScrolled, onMouseEnter }: NavTriggerProps) {
  const activeColor = "text-brand-gold";
  const idleColor = isScrolled
    ? "text-wave-200 hover:text-cream"
    : "text-wave-700 hover:text-wave-500";

  return (
    <button
      onMouseEnter={onMouseEnter}
      className={cn(
        "flex items-center gap-1 px-4 py-2",
        "font-body text-body-sm font-medium",
        "transition-colors duration-200",
        isActive ? activeColor : idleColor
      )}
      aria-expanded={isActive}
      aria-haspopup="true"
    >
      {label}
      {/* Chevron -- rotates when menu is open */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={cn(
          "transition-transform duration-200",
          isActive && "rotate-180"
        )}
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}