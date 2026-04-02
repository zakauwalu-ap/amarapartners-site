"use client";

// src/components/providers/LenisProvider.tsx
// =============================================================
// Lenis smooth scroll provider — wraps the entire app.
//
// Architecture:
//   - ReactLenis in `root` mode intercepts window scroll.
//   - autoRaf is disabled so GSAP's ticker owns the RAF loop.
//     This means Lenis and ScrollTrigger run on the exact same
//     animation frame — no jitter, no desync.
//   - LenisGsapSync (inner component, inside the Lenis context)
//     registers ScrollTrigger.update as a scroll listener and
//     drives Lenis via gsap.ticker.
//   - When prefers-reduced-motion is set the provider renders
//     children unwrapped — pure native scroll, no Lenis.
// =============================================================

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -----------------------------------------------------------------------------
// Inner sync component — must live inside <ReactLenis> to access its context.
// Registers ScrollTrigger.update on every Lenis scroll tick and adds Lenis
// to the GSAP ticker so both libraries share the same RAF heartbeat.
// -----------------------------------------------------------------------------
const LenisGsapSync = () => {
  // useLenis(callback) fires the callback on every scroll event AND
  // returns the Lenis instance — one call, two jobs.
  const lenis = useLenis(ScrollTrigger.update);

  useEffect(() => {
    if (!lenis) return;

    // Drive Lenis from GSAP's ticker. GSAP provides time in seconds;
    // lenis.raf expects milliseconds.
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);

    // Disable GSAP's lag-clamping so Lenis receives accurate timestamps
    // even after a tab switch or focus loss.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
    };
  }, [lenis]);

  return null;
};

// -----------------------------------------------------------------------------
// Lenis options tuned for a luxurious, magazine-style scroll feel.
// -----------------------------------------------------------------------------
const LENIS_OPTIONS = {
  // Lower lerp = more inertia / slower deceleration.
  // 0.05 gives a very silky, high-end editorial feel.
  lerp: 0.05,
  // Slight touch boost so mobile doesn't feel sluggish.
  touchMultiplier: 1.5,
  // Standard wheel feel.
  wheelMultiplier: 1.0,
  // GSAP ticker drives the RAF loop — no internal rAF in Lenis.
  autoRaf: false,
} as const;

// -----------------------------------------------------------------------------
// Public provider — drop into the root layout once.
// -----------------------------------------------------------------------------
interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Respect the user's motion preference: skip Lenis entirely and fall back
  // to the browser's native scroll. WaveSystem has its own static fallback.
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
};
