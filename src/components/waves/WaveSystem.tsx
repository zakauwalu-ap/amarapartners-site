"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WAVE_PATHS } from "@/lib/wavePaths";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { WaveLayer } from "@/components/waves/WaveLayer";
import { FirmIntro } from "@/components/sections/FirmIntro";
import { PillarCards } from "@/components/sections/PillarCards";
import { FeaturedInsights } from "@/components/sections/FeaturedInsights";
import { JurisdictionalReach } from "@/components/sections/JurisdictionalReach";
import { CTAContact } from "@/components/sections/CTAContact";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -----------------------------------------------------------------------------
// Scroll + mask behaviour (ported from wave-prototype-v3-opt.html)
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Content panel constants
// 7 visual zones (hero + 5 sections + implied footer), 6 intervals.
// ZONE_STEP is the scroll-progress width of each zone.
// Panels enter from PANEL_ENTER_Y px below, exit PANEL_EXIT_Y px upward —
// the directional motion prevents the "slideshow" feel that pure crossfades create.
// -----------------------------------------------------------------------------
const PANEL_COUNT  = 5;
// Denominator 5.5 (not 6) shifts the CTA zone's "fully visible" point to ~87%
// of the driver, leaving only ~76vh of dead hold at 600vh instead of 140vh.
const ZONE_STEP    = 1 / 5.5;
const PANEL_ENTER_Y = 60; // px — panel rises up from this offset on entry
const PANEL_EXIT_Y  = -30; // px — panel continues upward by this amount on exit

const WAVE_CY = [0.86, 0.8, 0.74, 0.68, 0.62, 0.56, 0.5] as const;
const BASE_SCALE = 5;
const HOVER_ADD = 30;
const RADIUS = 0.2;
const LERP_SPEED = 0.06;
const ENABLE_WAVE_INTERACTION = false;
const ENABLE_WAVE_UNDULATION = false;
const WAVE_PATH_OFFSET_Y = 60;

const DIRECTION_PATTERN: readonly { dx: number; dy: number }[] = [
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
];



const TURBULENCE_CFG = [
  {
    seed: "3",
    keyframes:
      "0.003 0.002; 0.005 0.004; 0.004 0.003; 0.003 0.002",
    dur: 18,
  },
  {
    seed: "7",
    keyframes:
      "0.003 0.004; 0.005 0.006; 0.004 0.005; 0.003 0.004",
    dur: 14,
  },
  {
    seed: "13",
    keyframes:
      "0.004 0.003; 0.006 0.005; 0.005 0.004; 0.004 0.003",
    dur: 12,
  },
  {
    seed: "19",
    keyframes:
      "0.003 0.005; 0.005 0.007; 0.004 0.006; 0.003 0.005",
    dur: 16,
  },
  {
    seed: "23",
    keyframes:
      "0.003 0.003; 0.004 0.005; 0.003 0.004; 0.003 0.003",
    dur: 20,
  },
  {
    seed: "29",
    keyframes:
      "0.002 0.004; 0.004 0.006; 0.003 0.005; 0.002 0.004",
    dur: 15,
  },
  {
    seed: "31",
    keyframes:
      "0.002 0.003; 0.003 0.005; 0.002 0.004; 0.002 0.003",
    dur: 17,
  },
] as const;

const WAVE_FILLS = [
  "#091D3A",
  "#0D2E5C",
  "#1A4380",
  "#2B5F9E",
  "#4A7DB5",
  "#7BA3C9",
  "#B8CCDE",
] as const;
/** Primary grey lockup — viewBox 252×144 in source SVG. */
const HERO_LOGO_SRC = "/images/logo/A&P_logo_grey_primary_RGB.svg";

function ease(t: number): number {
  if (t < 0.5) {
    return 16 * t * t * t * t * t;
  }
  const p = -2 * t + 2;
  return 1 - (p * p * p * p * p) / 2;
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

export interface WaveSystemProps {
  eyebrow: string;
}

export const WaveSystem = ({ eyebrow }: WaveSystemProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  const driverRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);
  const dispLabelRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dispMapRefs = useRef<(SVGFEDisplacementMapElement | null)[]>([]);

  const maskCache = useRef<string[]>([]);
  const prevLayerT = useRef<number[]>([]);
  const prevHeroO = useRef<number>(-1);

  // One ref per content panel; tracks last-written opacity + translateY so we
  // skip DOM writes when quantised values haven't changed.
  const sectionPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevPanelState = useRef<{ opacity: number; translateY: number }[]>([]);

  const curScales = useRef<number[]>([]);
  const tgtScales = useRef<number[]>([]);

  const waveCount = WAVE_PATHS.length;
  const departures = useMemo(() => {
    return Array.from({ length: waveCount }, (_, i) => {
      const rev = waveCount - 1 - i;
      const start = 0.04 + rev * 0.105;
      const end = Math.min(start + 0.24, 0.99);
      return {
        start,
        end,
        dx: DIRECTION_PATTERN[i]?.dx ?? 0,
        dy: DIRECTION_PATTERN[i]?.dy ?? 1,
      };
    });
  }, [waveCount]);

  useEffect(() => {
    maskCache.current = Array.from({ length: waveCount }, () => "");
    prevLayerT.current = Array.from({ length: waveCount }, () => -1);
    curScales.current = Array.from({ length: waveCount }, () => BASE_SCALE);
    tgtScales.current = Array.from({ length: waveCount }, () => BASE_SCALE);
    prevPanelState.current = Array.from({ length: PANEL_COUNT }, () => ({
      opacity: -1,
      translateY: 0,
    }));
  }, [waveCount]);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const mouseNY = useRef(0);
  const mouseVisible = useRef(true);
  const cursorOnWave = useRef(false);

  const setLayerRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    layerRefs.current[i] = el;
  }, []);

  const setDispRef = useCallback(
    (i: number) => (el: SVGFEDisplacementMapElement | null) => {
      dispMapRefs.current[i] = el;
    },
    []
  );


  const setPanelRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    sectionPanelRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const enableCustomCursor =
    ENABLE_WAVE_INTERACTION && !prefersReducedMotion && finePointer;

  function updateMask(
    i: number,
    dx: number,
    dy: number,
    raw: number,
    el: HTMLDivElement | null
  ): void {
    if (!el) return;
    if (raw <= 0.001) {
      if (maskCache.current[i] !== "none") {
        maskCache.current[i] = "none";
        el.style.maskImage = "none";
        el.style.webkitMaskImage = "none";
      }
      return;
    }

    const fadeSize = 12 + raw * 40;
    const q = Math.round(fadeSize * 2) / 2;
    const key = `${dx},${dy},${q}`;
    if (maskCache.current[i] === key) return;
    maskCache.current[i] = key;

    const solid = (100 - q).toFixed(1);
    let dir: string;
    if (dy === -1) dir = "to bottom";
    else if (dy === 1) dir = "to top";
    else if (dx === 1) dir = "to left";
    else dir = "to right";

    const grad = `linear-gradient(${dir}, black 0%, black ${solid}%, transparent 100%)`;
    el.style.maskImage = grad;
    el.style.webkitMaskImage = grad;
  }

  useEffect(() => {
    if (prefersReducedMotion) return;

    const driver = driverRef.current;
    if (!driver) return;

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: driver,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const prog = clamp(self.progress, 0, 1);
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const heroO =
          Math.round(
            (1 - ease(clamp(prog / 0.07, 0, 1))) * 1000
          ) / 1000;
        if (heroO !== prevHeroO.current) {
          prevHeroO.current = heroO;
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = String(heroO);
          }
          if (scrollHintRef.current) {
            scrollHintRef.current.style.opacity = String(heroO);
          }
        }

        for (let i = 0; i < waveCount; i++) {
          const dep = departures[i];
          const raw = clamp((prog - dep.start) / (dep.end - dep.start), 0, 1);
          const t = ease(raw);
          const qt = ((t * 256) | 0) / 256;
          const layerEl = layerRefs.current[i];
          if (!layerEl) continue;

          // Always update mask even when transform quantization doesn't change,
          // otherwise stale mask gradients can leave a visible seam near nav.
          updateMask(i, dep.dx, dep.dy, raw, layerEl);

          if (qt !== prevLayerT.current[i]) {
            prevLayerT.current[i] = qt;
            const offX = dep.dx * qt * 1.15 * vw;
            const offY = dep.dy * qt * 1.15 * vh;
            layerEl.style.transform = `translate3d(${offX | 0}px, ${offY | 0}px, 0)`;
            layerEl.style.opacity = String(1 - qt * 0.3);
          }
        }

        // ── Section content panel opacity + slide-up motion ──────────────────
        // Each panel (j=0..4) maps to zone z=j+1.
        //
        // Transition shape per panel:
        //   fadeInStart → dwellStart : slides up from +60px while fading in
        //   dwellStart  → dwellEnd   : fully visible, no transform (~80vh hold)
        //   dwellEnd    → fadeOutEnd : continues upward –30px while fading out
        //
        // The directional motion (rise to enter, continue rising to exit) feels
        // like genuine scrolling through a layered space — not a slide click.
        // The last panel (CTA, j=4) never fades out; it stays through end of driver.
        for (let j = 0; j < PANEL_COUNT; j++) {
          const z = j + 1;
          const fadeInStart = (z - 0.65) * ZONE_STEP;
          const dwellStart  = (z - 0.2)  * ZONE_STEP;
          const dwellEnd    = (z + 0.2)  * ZONE_STEP;
          const fadeOutEnd  = (z + 0.65) * ZONE_STEP;

          const enterProg = clamp((prog - fadeInStart) / (dwellStart - fadeInStart), 0, 1);
          const exitProg  = j < PANEL_COUNT - 1
            ? clamp((prog - dwellEnd) / (fadeOutEnd - dwellEnd), 0, 1)
            : 0;

          const easedEnter = ease(enterProg);
          const easedExit  = ease(exitProg);

          const opacity    = Math.min(easedEnter, 1 - easedExit);
          const translateY = (1 - easedEnter) * PANEL_ENTER_Y + easedExit * PANEL_EXIT_Y;

          // Quantise to limit DOM writes: opacity to 1/256, translateY to 0.5px
          const qOpacity    = (Math.round(opacity    * 256) | 0) / 256;
          const qTranslateY = Math.round(translateY  * 2)   / 2;

          const el   = sectionPanelRefs.current[j];
          const prev = prevPanelState.current[j];
          if (el && prev && (qOpacity !== prev.opacity || qTranslateY !== prev.translateY)) {
            prev.opacity    = qOpacity;
            prev.translateY = qTranslateY;
            el.style.opacity       = String(qOpacity);
            el.style.transform     = `translateY(${qTranslateY}px)`;
            el.style.pointerEvents = qOpacity > 0.5 ? "auto" : "none";
          }
        }

      },
    });

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      scrollTriggerInstance.kill();
    };
  }, [departures, prefersReducedMotion, waveCount]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId = 0;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const vh = window.innerHeight;

      if (enableCustomCursor && cursorRef.current) {
        cursorRef.current.style.left = `${mouseX.current}px`;
        cursorRef.current.style.top = `${mouseY.current}px`;
        cursorRef.current.style.opacity = mouseVisible.current ? "1" : "0";
      }

      const inHero = window.scrollY < vh * 0.8;
      let maxProx = 0;

      for (let i = 0; i < waveCount; i++) {
        if (inHero && mouseVisible.current) {
          const waveY = WAVE_CY[i] ?? 0.5;
          const dist = Math.abs(mouseNY.current - waveY);
          const prox = Math.max(0, 1 - dist / RADIUS);
          tgtScales.current[i] = BASE_SCALE + prox * HOVER_ADD;
          if (prox > maxProx) maxProx = prox;
        } else {
          tgtScales.current[i] = BASE_SCALE;
        }
      }

      const shouldGlow = maxProx > 0.3;
      if (shouldGlow !== cursorOnWave.current) {
        cursorOnWave.current = shouldGlow;
        if (enableCustomCursor && cursorRef.current) {
          cursorRef.current.classList.toggle("wave-cursor-on-wave", shouldGlow);
        }
        dispLabelRef.current?.classList.toggle("wave-disp-visible", shouldGlow);
      }

      for (let i = 0; i < waveCount; i++) {
        curScales.current[i] +=
          (tgtScales.current[i] - curScales.current[i]) * LERP_SPEED;
        const node = dispMapRefs.current[i];
        if (node) {
          const rounded = (curScales.current[i] * 20) | 0;
          const q = rounded / 20;
          node.setAttribute("scale", String(q));
        }
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReducedMotion, enableCustomCursor, waveCount]);

  useEffect(() => {
    if (prefersReducedMotion || !ENABLE_WAVE_INTERACTION) return;

    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      mouseNY.current = e.clientY / window.innerHeight;
    };

    const onLeave = () => {
      mouseVisible.current = false;
      for (let i = 0; i < waveCount; i++) {
        tgtScales.current[i] = BASE_SCALE;
      }
    };

    const onEnter = () => {
      mouseVisible.current = true;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    document.addEventListener("mouseenter", onEnter, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [prefersReducedMotion, waveCount]);

    if (prefersReducedMotion) {
    return (
      <section
        className="relative min-h-screen overflow-hidden bg-wave-100"
        aria-label="Introduction"
      >
        <div className="pointer-events-none absolute inset-0 z-1">
          <svg
            className="block h-full w-full"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <rect width="1920" height="1080" fill="#B8CCDE" />
          </svg>
        </div>
        {WAVE_PATHS.map((pathD, i) => (
          <WaveLayer
            key={`static-wave-${WAVE_FILLS[i]}`}
            pathD={pathD}
            fillHex={WAVE_FILLS[i]}
            zIndex={i + 2}
            turbulenceSeed={TURBULENCE_CFG[i].seed}
            turbulenceKeyframes={TURBULENCE_CFG[i].keyframes}
            turbulenceDurationSec={TURBULENCE_CFG[i].dur}
            animateTurbulence={false}
            pathOffsetY={WAVE_PATH_OFFSET_Y}
          />
        ))}
        <div className="relative z-30 flex min-h-screen flex-col px-[8vw] pb-[9vh] pt-[7vh]">
          <div className="mb-3">
            <p className="font-body text-body-sm font-semibold uppercase tracking-[0.28em] text-wave-700/80">
              Hero
            </p>
          </div>
          <div className="flex shrink-0 justify-center">
            <Image
              src={HERO_LOGO_SRC}
              alt="Amara & Partners Legal Consultants"
              width={252}
              height={144}
              priority
              className="h-auto w-[min(72vw,420px)] max-w-full"
            />
          </div>
          <div className="flex min-h-0 flex-1 flex-col justify-end">
            <p className="font-body text-[clamp(0.6rem,1.1vw,0.75rem)] font-normal uppercase tracking-[0.42em] text-wave-700/70">
              {eyebrow}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <div ref={driverRef} className="relative h-[600vh]" data-wave-scroll-driver>
        <div
          className={cn(
            "sticky top-0 h-screen overflow-hidden",
            enableCustomCursor && "cursor-none"
          )}
        >
          {/* Base wash — wave-100 */}
          <div className="pointer-events-none absolute inset-0 z-1">
            <svg
              className="block h-full w-full"
              viewBox="0 0 1920 1080"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              <rect width="1920" height="1080" fill="#B8CCDE" />
            </svg>
          </div>

          {WAVE_PATHS.map((pathD, i) => (
            <WaveLayer
              key={`wave-layer-${WAVE_FILLS[i]}`}
              layerRef={setLayerRef(i)}
              displacementRef={setDispRef(i)}
              pathD={pathD}
              fillHex={WAVE_FILLS[i]}
              zIndex={i + 2}
              turbulenceSeed={TURBULENCE_CFG[i].seed}
              turbulenceKeyframes={TURBULENCE_CFG[i].keyframes}
              turbulenceDurationSec={TURBULENCE_CFG[i].dur}
              animateTurbulence={ENABLE_WAVE_UNDULATION}
              pathOffsetY={WAVE_PATH_OFFSET_Y}
            />
          ))}

          {/* ── Section content panels ───────────────────────────────────────
               Each panel sits at z-20, above all wave layers (z-2 to z-8) but
               below the hero logo (z-30). Initial inline styles set the GSAP
               start state (invisible, offset below) before the first scroll tick.
               The scroll handler drives opacity + translateY on every frame.    */}

          <div
            ref={setPanelRef(0)}
            style={{ opacity: 0, transform: `translateY(${PANEL_ENTER_Y}px)`, pointerEvents: "none" }}
            className="absolute inset-0 z-20 overflow-hidden bg-cream/80 backdrop-blur-xl"
          >
            <FirmIntro />
          </div>

          <div
            ref={setPanelRef(1)}
            style={{ opacity: 0, transform: `translateY(${PANEL_ENTER_Y}px)`, pointerEvents: "none" }}
            className="absolute inset-0 z-20 overflow-hidden bg-wave-700/80 backdrop-blur-lg"
          >
            <PillarCards />
          </div>

          <div
            ref={setPanelRef(2)}
            style={{ opacity: 0, transform: `translateY(${PANEL_ENTER_Y}px)`, pointerEvents: "none" }}
            className="absolute inset-0 z-20 overflow-hidden bg-wave-500/78 backdrop-blur-lg"
          >
            <FeaturedInsights />
          </div>

          <div
            ref={setPanelRef(3)}
            style={{ opacity: 0, transform: `translateY(${PANEL_ENTER_Y}px)`, pointerEvents: "none" }}
            className="absolute inset-0 z-20 overflow-hidden bg-wave-600/80 backdrop-blur-lg"
          >
            <JurisdictionalReach />
          </div>

          <div
            ref={setPanelRef(4)}
            style={{ opacity: 0, transform: `translateY(${PANEL_ENTER_Y}px)`, pointerEvents: "none" }}
            className="absolute inset-0 z-20 overflow-hidden bg-wave-700/80 backdrop-blur-lg"
          >
            <CTAContact />
          </div>

          {/* ── Hero content (logo + eyebrow) — fades out early in scroll ── */}
          <div
            ref={heroContentRef}
            className="pointer-events-none absolute inset-0 z-30 flex flex-col px-[8vw] pb-[9vh] pt-[7vh]"
          >
            <div className="flex shrink-0 justify-center">
              <Image
                src={HERO_LOGO_SRC}
                alt="Amara & Partners Legal Consultants"
                width={252}
                height={144}
                priority
                className="h-auto w-[min(72vw,420px)] max-w-full"
              />
            </div>
            <div className="flex min-h-0 flex-1 flex-col justify-end">
              <p className="font-body text-[clamp(0.6rem,1.1vw,0.75rem)] font-normal uppercase tracking-[0.42em] text-wave-700/70">
                {eyebrow}
              </p>
            </div>
          </div>

          <div
            ref={scrollHintRef}
            className="pointer-events-none absolute bottom-[5vh] inset-e-[6vw] z-30 flex items-center gap-3.5 opacity-0"
          >
            <div className="h-px w-12 origin-end bg-gold" aria-hidden />
            <span className="font-body text-[0.58rem] uppercase tracking-[0.45em] text-wave-700/45">
              Scroll
            </span>
          </div>

          <p
            ref={dispLabelRef}
            className="wave-disp-label pointer-events-none absolute bottom-[5vh] inset-s-[8vw] z-30 font-body text-[0.58rem] uppercase tracking-[0.4em] text-gold/0 transition-colors duration-600"
          >
            Field active
          </p>
        </div>
      </div>


      {enableCustomCursor ? (
        <div
          ref={cursorRef}
          className="wave-cursor pointer-events-none fixed left-0 top-0 z-45 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold mix-blend-screen transition-[transform,background-color] duration-100"
          aria-hidden
        />
      ) : null}
    </>
  );
};
