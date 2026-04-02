"use client";

import type { Ref } from "react";
import type { WaveSectionContent } from "@/data/waveSections";
import { cn } from "@/lib/utils";

export interface WaveSectionPanelProps {
  panel: WaveSectionContent;
  /** 1-based index for display ("01", "02", …). */
  indexOneBased: number;
  zIndex: number;
  /** Large numeral (decorative) — use `text-wave-*`. */
  accentNumberClass: string;
  /** Vertical bar — use `bg-wave-*`. */
  accentBarClass: string;
  innerRef?: Ref<HTMLDivElement | null>;
  rootRef?: Ref<HTMLDivElement | null>;
}

export const WaveSectionPanel = ({
  panel,
  indexOneBased,
  zIndex,
  accentNumberClass,
  accentBarClass,
  innerRef,
  rootRef,
}: WaveSectionPanelProps) => {
  const num = String(indexOneBased).padStart(2, "0");

  return (
    <div
      ref={rootRef}
      className={cn(
        "wave-section-panel pointer-events-none absolute inset-0 flex items-center px-[8vw] py-[10vh] opacity-0 [contain:layout_style]",
        "transition-none"
      )}
      style={{ zIndex }}
      aria-hidden
    >
      <div
        className={cn(
          "font-heading text-[clamp(5rem,14vw,11rem)] font-medium leading-none select-none",
          "absolute top-[6vh] end-[6vw] opacity-[0.12]",
          accentNumberClass
        )}
      >
        {num}
      </div>

      <div
        className={cn("absolute top-[20vh] start-0 h-[15vh] w-[3px] opacity-60", accentBarClass)}
        aria-hidden
      />

      <div ref={innerRef} className="panel-inner max-w-[620px] will-change-transform">
        <p className="font-body text-[0.58rem] uppercase tracking-[0.48em] text-brand-gold opacity-55 mb-8">
          {panel.tag}
        </p>
        <h2 className="font-heading text-display-md font-medium leading-[1.08] text-wave-100">
          {panel.title}
          {panel.titleLineBreak ? (
            <>
              <br />
              {panel.titleLineBreak}
            </>
          ) : null}
        </h2>
        <p className="mt-9 max-w-[440px] font-body text-body-sm font-normal leading-[2] text-wave-100/45">
          {panel.body}
        </p>

        <div className="mt-10 grid max-w-[480px] grid-cols-2 gap-x-10 gap-y-6">
          {panel.details.map((d) => (
            <div key={`${panel.id}-${d.label}`} className="min-w-0">
              <p className="font-body text-[0.55rem] uppercase tracking-[0.35em] text-wave-100/30 mb-1">
                {d.label}
              </p>
              <p className="font-heading text-body-lg font-medium text-wave-100">{d.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
