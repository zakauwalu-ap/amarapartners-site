"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { waveSectionPanels } from "@/data/waveSections";
import { WAVE_PATHS } from "@/lib/wavePaths";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { WaveLayer } from "@/components/waves/WaveLayer";
import { WaveSectionPanel } from "@/components/waves/WaveSectionPanel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -----------------------------------------------------------------------------
// Scroll + mask behaviour (ported from wave-prototype-v3-opt.html)
// -----------------------------------------------------------------------------

const SECTION_COUNT = 7;
const WAVE_CY = [0.86, 0.8, 0.74, 0.68, 0.62, 0.56, 0.5] as const;
const BASE_SCALE = 5;
const HOVER_ADD = 30;
const RADIUS = 0.2;
const LERP_SPEED = 0.06;

const DIRECTION_PATTERN: readonly { dx: number; dy: number }[] = [
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
];

const BASE_LAYER_Y_OFFSETS = [260, 230, 200, 170, 145, 120, 95] as const;

const PANEL_WINDOWS: readonly {
  fadeIn: number;
  fullIn: number;
  fadeOut: number;
  fullOut: number;
}[] = [
  { fadeIn: 0.56, fullIn: 0.66, fadeOut: 0.92, fullOut: 1.0 },
  { fadeIn: 0.36, fullIn: 0.46, fadeOut: 0.62, fullOut: 0.72 },
  { fadeIn: 0.16, fullIn: 0.26, fadeOut: 0.42, fullOut: 0.52 },
  { fadeIn: 0.02, fullIn: 0.12, fadeOut: 0.24, fullOut: 0.36 },
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

const PANEL_ACCENTS: { num: string; bar: string }[] = [
  { num: "text-wave-500", bar: "bg-wave-500" },
  { num: "text-wave-400", bar: "bg-wave-400" },
  { num: "text-wave-300", bar: "bg-wave-300" },
  { num: "text-wave-200", bar: "bg-wave-200" },
];

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
  const panelRootRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const maskCache = useRef<string[]>([]);
  const prevLayerT = useRef<number[]>([]);
  const prevPanelO = useRef<number[]>([-1, -1, -1, -1]);
  const prevHeroO = useRef<number>(-1);
  const prevNavState = useRef<number>(-1);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const curScales = useRef<number[]>([]);
  const tgtScales = useRef<number[]>([]);

  const waveCount = WAVE_PATHS.length;
  const departures = useMemo(() => {
    return Array.from({ length: waveCount }, (_, i) => {
      const rev = waveCount - 1 - i;
      const start = 0.03 + rev * 0.095;
      const end = Math.min(start + 0.3, 0.98);
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

  const setLayerRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    layerRefs.current[i] = el;
  }, []);

  const setDispRef = useCallback(
    (i: number) => (el: SVGFEDisplacementMapElement | null) => {
      dispMapRefs.current[i] = el;
    },
    []
  );

  const setPanelRootRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      panelRootRefs.current[i] = el;
    },
    []
  );

  const setPanelInnerRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      panelInnerRefs.current[i] = el;
    },
    []
  );

  const setDotRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    dotRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const enableCustomCursor =
    !prefersReducedMotion && finePointer;

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
          if (qt === prevLayerT.current[i]) continue;
          prevLayerT.current[i] = qt;

          const layerEl = layerRefs.current[i];
          if (layerEl) {
            const offX = dep.dx * qt * 1.15 * vw;
            const baseY = BASE_LAYER_Y_OFFSETS[i] ?? 95;
            const offY = baseY + dep.dy * qt * 1.15 * vh;
            layerEl.style.transform = `translate3d(${offX | 0}px, ${offY | 0}px, 0)`;
            layerEl.style.opacity = String(1 - qt * 0.3);
            updateMask(i, dep.dx, dep.dy, raw, layerEl);
          }
        }

        for (let i = 0; i < 4; i++) {
          const pw = PANEL_WINDOWS[i];
          let o = 0;
          if (prog < pw.fadeIn) o = 0;
          else if (prog < pw.fullIn) o = (prog - pw.fadeIn) / (pw.fullIn - pw.fadeIn);
          else if (prog < pw.fadeOut) o = 1;
          else if (prog < pw.fullOut)
            o = 1 - (prog - pw.fadeOut) / (pw.fullOut - pw.fadeOut);
          else o = 0;

          const qo = (clamp(o, 0, 1) * 100) | 0;
          const qoNorm = qo / 100;
          if (qoNorm === prevPanelO.current[i]) continue;
          prevPanelO.current[i] = qoNorm;

          const root = panelRootRefs.current[i];
          const inner = panelInnerRefs.current[i];
          if (root) {
            root.style.opacity = String(qoNorm);
            root.style.pointerEvents = qoNorm > 0.05 ? "auto" : "none";
          }
          if (inner) {
            const slide = (1 - qoNorm) * 30;
            inner.style.transform = `translate3d(0, ${slide | 0}px, 0)`;
          }
        }

        const state = Math.round(prog * (SECTION_COUNT - 1));
        if (state !== prevNavState.current) {
          prevNavState.current = state;
          for (let idx = 0; idx < SECTION_COUNT; idx++) {
            dotRefs.current[idx]?.classList.toggle(
              "wave-nav-dot-active",
              idx === state
            );
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
    if (prefersReducedMotion) return;

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
          />
        ))}
        <div className="relative z-30 flex min-h-screen flex-col px-[8vw] pb-[9vh] pt-[7vh]">
          <div className="flex shrink-0 justify-center">
            <Image
              src={HERO_LOGO_SRC}
              alt="Amara & Partners Legal Consultants"
              width={252}
              height={144}
              priority
              className="h-auto w-[min(56vw,280px)] max-w-full"
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
      <div ref={driverRef} className="relative h-[700vh]" data-wave-scroll-driver>
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

          {waveSectionPanels.map((panel, i) => (
            <WaveSectionPanel
              key={panel.id}
              panel={panel}
              indexOneBased={i + 1}
              zIndex={i + 1}
              accentNumberClass={PANEL_ACCENTS[i].num}
              accentBarClass={PANEL_ACCENTS[i].bar}
              rootRef={setPanelRootRef(i)}
              innerRef={setPanelInnerRef(i)}
            />
          ))}

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
              animateTurbulence
            />
          ))}

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
                className="h-auto w-[min(56vw,280px)] max-w-full"
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

      <nav
        className="pointer-events-none fixed inset-e-[2.2vw] top-1/2 z-40 flex -translate-y-1/2 flex-col gap-[11px]"
        aria-hidden
      >
        {Array.from({ length: SECTION_COUNT }, (_, i) => (
          <div
            key={`dot-${i}`}
            ref={setDotRef(i)}
            className={cn(
              "wave-nav-dot h-[3px] w-[3px] rounded-full bg-wave-100/25 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              i === 0 && "wave-nav-dot-active"
            )}
          />
        ))}
      </nav>

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
