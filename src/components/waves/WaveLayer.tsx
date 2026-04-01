"use client";

import type { Ref } from "react";
import { useId } from "react";
import { WAVE_VIEWBOX } from "@/lib/wavePaths";

export interface WaveLayerProps {
  pathD: string;
  /** Fill colour as hex (SVG fill attribute). */
  fillHex: string;
  zIndex: number;
  turbulenceSeed: string;
  /** Semicolon-separated keyframes for SMIL baseFrequency animation. */
  turbulenceKeyframes: string;
  turbulenceDurationSec: number;
  /** When false, turbulence stays at first keyframe (reduced motion). */
  animateTurbulence: boolean;
  /** Hook for pointer-driven displacement intensity (matches prototype). */
  displacementRef?: Ref<SVGFEDisplacementMapElement | null>;
  /** Outer wrapper (receives scroll-driven transform). */
  layerRef?: Ref<HTMLDivElement | null>;
  /** Static vertical offset for the SVG path, in viewBox units. */
  pathOffsetY?: number;
}

export const WaveLayer = ({
  pathD,
  fillHex,
  zIndex,
  turbulenceSeed,
  turbulenceKeyframes,
  turbulenceDurationSec,
  animateTurbulence,
  displacementRef,
  layerRef,
  pathOffsetY = 0,
}: WaveLayerProps) => {
  const rid = useId().replace(/:/g, "");
  const filterId = `wave-f-${rid}`;

  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-0 [contain:layout_style_paint] [backface-visibility:hidden] will-change-[transform,opacity]"
      style={{ zIndex }}
    >
      <svg
        className="block h-full w-full"
        viewBox={WAVE_VIEWBOX}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <filter
            id={filterId}
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.004 0.003"
              numOctaves="2"
              seed={turbulenceSeed}
              result="n"
            >
              {animateTurbulence ? (
                <animate
                  attributeName="baseFrequency"
                  values={turbulenceKeyframes}
                  dur={`${turbulenceDurationSec}s`}
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
                />
              ) : null}
            </feTurbulence>
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="n"
              scale={5}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <path
          filter={`url(#${filterId})`}
          fill={fillHex}
          d={pathD}
          transform={`translate(0 ${pathOffsetY})`}
        />
      </svg>
    </div>
  );
};
