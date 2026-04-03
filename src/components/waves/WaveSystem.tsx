"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WAVE_PATHS } from "@/lib/wavePaths";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Button } from "@/components/ui/Button";
import { WaveLayer } from "@/components/waves/WaveLayer";
import { FirmIntro } from "@/components/sections/FirmIntro";
import { PillarCards } from "@/components/sections/PillarCards";
import { FeaturedInsights } from "@/components/sections/FeaturedInsights";
import { JurisdictionalReach } from "@/components/sections/JurisdictionalReach";
import { CTAContact } from "@/components/sections/CTAContact";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// Wave behaviour constants (ported from wave-prototype-v3-opt.html)
// ---------------------------------------------------------------------------

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

const HERO_IMAGE_SRC = "/images/sora-pics/golden-waves-blue-serenity.png";

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

  const contentRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);
  const dispLabelRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dispMapRefs = useRef<(SVGFEDisplacementMapElement | null)[]>([]);

  const maskCache = useRef<string[]>([]);
  const prevLayerT = useRef<number[]>([]);
  const prevHeroO = useRef<number>(-1);

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
  }, [waveCount]);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const mouseNY = useRef(0);
  const mouseVisible = useRef(true);
  const cursorOnWave = useRef(false);

  const setLayerRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      layerRefs.current[i] = el;
    },
    []
  );

  const setDispRef = useCallback(
    (i: number) => (el: SVGFEDisplacementMapElement | null) => {
      dispMapRefs.current[i] = el;
    },
    []
  );

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

  // ── Wave departure + hero fade — driven by total page scroll progress ────
  useEffect(() => {
    if (prefersReducedMotion) return;

    const content = contentRef.current;
    if (!content) return;

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: content,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const prog = clamp(self.progress, 0, 1);
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Hero content fades in the first ~12% of total scroll (~60vh)
        const heroO =
          Math.round(
            (1 - ease(clamp(prog / 0.12, 0, 1))) * 1000
          ) / 1000;
        if (heroO !== prevHeroO.current) {
          prevHeroO.current = heroO;
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = String(heroO);
            heroContentRef.current.style.pointerEvents = heroO < 0.1 ? "none" : "";
          }
          if (scrollHintRef.current) {
            scrollHintRef.current.style.opacity = String(heroO);
          }
        }

        // Wave layer departures — timing unchanged from the original driver
        for (let i = 0; i < waveCount; i++) {
          const dep = departures[i];
          const raw = clamp(
            (prog - dep.start) / (dep.end - dep.start),
            0,
            1
          );
          const t = ease(raw);
          const qt = ((t * 256) | 0) / 256;
          const layerEl = layerRefs.current[i];
          if (!layerEl) continue;

          updateMask(i, dep.dx, dep.dy, raw, layerEl);

          if (qt !== prevLayerT.current[i]) {
            prevLayerT.current[i] = qt;
            const offX = dep.dx * qt * 1.15 * vw;
            const offY = dep.dy * qt * 1.15 * vh;
            layerEl.style.transform = `translate3d(${offX | 0}px, ${offY | 0}px, 0)`;
            layerEl.style.opacity = String(1 - qt * 0.3);
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

  // ── Displacement map + custom cursor RAF loop ────────────────────────────
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

  // ── Mouse tracking (pointer interaction when enabled) ────────────────────
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

  // ── Reduced motion fallback — static wave stack + normal-flow sections ───
  if (prefersReducedMotion) {
    return (
      <>
        <section
          className="relative min-h-screen overflow-hidden bg-wave-100"
          aria-label="Hero"
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
          <div className="relative z-30 flex min-h-screen items-center px-6 pt-24 pb-16 lg:px-[8vw] lg:pt-32 lg:pb-20">
            <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row lg:items-center lg:gap-16">
              <div className="order-2 mt-10 lg:order-1 lg:mt-0 lg:w-[42%]">
                <div className="relative aspect-4/5 max-h-[calc(100vh-12rem)] w-full overflow-hidden">
                  <Image
                    src={HERO_IMAGE_SRC}
                    alt="Golden light over serene blue waves"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2 lg:w-[54%]">
                <p className="font-body text-body-xs font-medium uppercase tracking-[0.3em] text-wave-500">
                  {eyebrow}
                </p>
                <h1 className="mt-5 font-heading text-display-lg font-medium leading-[1.05] text-brand-gold">
                  Strategic Legal Counsel for a Dynamic Region
                </h1>
                <p className="mt-6 max-w-xl font-body text-body-lg leading-relaxed text-wave-600">
                  Amara & Partners delivers focused legal solutions across
                  corporate transactions, disputes, and regulatory compliance
                  — from the heart of Abu Dhabi to markets worldwide.
                </p>
                <div className="mt-8">
                  <Button variant="primary" size="lg" href="/practice" arrow>
                    Explore Our Practice
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream">
          <FirmIntro />
        </section>
        <section className="bg-wave-700">
          <PillarCards />
        </section>
        <section className="bg-wave-500">
          <FeaturedInsights />
        </section>
        <section className="bg-wave-600">
          <JurisdictionalReach />
        </section>
        <section className="bg-wave-700">
          <CTAContact />
        </section>
      </>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────
  // Architecture: waves are a FIXED background layer (z-0). Content sections
  // sit in normal document flow inside a z-10 wrapper and scroll naturally
  // over the waves. Semi-transparent section backgrounds + backdrop-blur let
  // the wave animation remain subtly visible through each section. This
  // replaces the old sticky-viewport / panel-crossfade approach that felt
  // like a slideshow.
  return (
    <>
      {/* ── Fixed wave background — always visible behind all content ──── */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-0 overflow-hidden",
          enableCustomCursor && "cursor-none"
        )}
        aria-hidden="true"
      >
        <svg
          className="block h-full w-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="1920" height="1080" fill="#B8CCDE" />
        </svg>

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
      </div>

      {/* ── Normal-flow content — scrolls naturally over the wave bg ───── */}
      <div ref={contentRef} className="relative z-10">

        {/* Hero — A&O Shearman–style split: image left, text right */}
        <section className="relative min-h-screen overflow-hidden" aria-label="Hero">
          <div
            ref={heroContentRef}
            className="flex min-h-screen items-center px-6 pt-24 pb-16 lg:px-[8vw] lg:pt-32 lg:pb-20"
          >
            <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row lg:items-center lg:gap-16">
              <div className="order-2 mt-10 lg:order-1 lg:mt-0 lg:w-[42%]">
                <div className="relative aspect-4/5 max-h-[calc(100vh-12rem)] w-full overflow-hidden">
                  <Image
                    src={HERO_IMAGE_SRC}
                    alt="Golden light over serene blue waves"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2 lg:w-[54%]">
                <p className="font-body text-body-xs font-medium uppercase tracking-[0.3em] text-wave-500">
                  {eyebrow}
                </p>
                <h1 className="mt-5 font-heading text-display-lg font-medium leading-[1.05] text-brand-gold">
                  Strategic Legal Counsel for a Dynamic Region
                </h1>
                <p className="mt-6 max-w-xl font-body text-body-lg leading-relaxed text-wave-600">
                  Amara & Partners delivers focused legal solutions across
                  corporate transactions, disputes, and regulatory compliance
                  — from the heart of Abu Dhabi to markets worldwide.
                </p>
                <div className="mt-8">
                  <Button variant="primary" size="lg" href="/practice" arrow>
                    Explore Our Practice
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={scrollHintRef}
            className="pointer-events-none absolute bottom-[5vh] inset-e-[6vw] flex items-center gap-3.5 opacity-0"
          >
            <div className="h-px w-12 origin-end bg-brand-gold" aria-hidden />
            <span className="font-body text-[0.58rem] uppercase tracking-[0.45em] text-wave-700/45">
              Scroll
            </span>
          </div>

          <p
            ref={dispLabelRef}
            className="wave-disp-label pointer-events-none absolute bottom-[5vh] inset-s-[8vw] font-body text-[0.58rem] uppercase tracking-[0.4em] text-brand-gold/0 transition-colors duration-600"
          >
            Field active
          </p>
        </section>

        {/* Content sections — split into background layer + content layer.
            The background div carries the tinted backdrop + mask-fade-y
            (vertical gradient mask that fades to transparent at top/bottom
            edges). This reveals the wave animation between sections and
            lets it bleed through within sections, while keeping text
            readable via the content div sitting on top at full opacity. */}
        <section className="relative">
          <div className="absolute inset-0 mask-fade-y bg-cream/60 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative">
            <FirmIntro />
          </div>
        </section>

        <section className="relative">
          <div className="absolute inset-0 mask-fade-y bg-wave-700/60 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative">
            <PillarCards />
          </div>
        </section>

        <section className="relative">
          <div className="absolute inset-0 mask-fade-y bg-wave-500/55 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative">
            <FeaturedInsights />
          </div>
        </section>

        <section className="relative">
          <div className="absolute inset-0 mask-fade-y bg-wave-600/60 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative">
            <JurisdictionalReach />
          </div>
        </section>

        <section className="relative">
          <div className="absolute inset-0 mask-fade-y bg-wave-700/65 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative">
            <CTAContact />
          </div>
        </section>
      </div>

      {/* Custom cursor (only when wave interaction is enabled) */}
      {enableCustomCursor ? (
        <div
          ref={cursorRef}
          className="wave-cursor pointer-events-none fixed left-0 top-0 z-45 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold mix-blend-screen transition-[transform,background-color] duration-100"
          aria-hidden
        />
      ) : null}
    </>
  );
};
