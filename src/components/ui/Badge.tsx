// =============================================================================
// src/components/ui/Badge.tsx
// =============================================================================
// A small label component used for categories, tags, and specialisation pills.
//
// Variants:
//   "wave"  -- wave-100 bg, wave-500 text -- for use on cream/white surfaces
//   "dark"  -- wave-700 bg, wave-100 text -- for use over images (Insight card)
//
// Usage:
//   <Badge>Corporate</Badge>
//   <Badge variant="dark">Disputes</Badge>
// =============================================================================

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "wave" | "dark";
  className?: string;
}

export function Badge({ children, variant = "wave", className }: BadgeProps) {
  return (
    <span
      className={cn(
        // Base styles shared by all variants
        "inline-block font-body text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-sm",

        // Variant styles
        variant === "wave" && "bg-wave-100 text-wave-500",
        variant === "dark" && "bg-wave-700/90 text-wave-100",

        className
      )}
    >
      {children}
    </span>
  );
}