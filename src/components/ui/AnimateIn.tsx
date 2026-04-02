"use client";

// src/components/ui/AnimateIn.tsx
// =============================================================
// Reusable scroll-triggered entrance animation wrapper.
//
// Wraps any content in a div that fades up into view when it
// enters the viewport. Built on GSAP + ScrollTrigger so it
// stays in perfect sync with Lenis smooth scroll.
//
// Usage:
//   <AnimateIn>
//     <SomeSection />
//   </AnimateIn>
//
// Props:
//   delay     – seconds before animation starts (default 0)
//   duration  – animation duration in seconds (default 1.1)
//   yOffset   – starting vertical offset in px (default 48)
//   className – forwarded to the wrapper div
//
// Accessibility: animations are skipped entirely when
// prefers-reduced-motion is set.
// =============================================================

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  /** Seconds before animation starts after trigger fires. */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Starting translateY offset in px. */
  yOffset?: number;
}

export const AnimateIn = ({
  children,
  className,
  delay = 0,
  duration = 1.1,
  yOffset = 48,
}: AnimateInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the user prefers reduced motion, ensure the element is
    // fully visible and return without adding any animation.
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    // Start hidden and offset — will be revealed by ScrollTrigger.
    gsap.set(el, { opacity: 0, y: yOffset });

    const trigger = ScrollTrigger.create({
      trigger: el,
      // Fire when the top edge of the element reaches 80% down
      // the viewport — gives the animation room to breathe before
      // the content hits the centre of the screen.
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [prefersReducedMotion, delay, duration, yOffset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
