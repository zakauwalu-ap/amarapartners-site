// src/lib/utils.ts
// ============================================================
// Utility helpers used across the whole project.
// `cn` merges Tailwind class strings together, filtering out
// any falsy values. Use it whenever you need conditional classes.
//
// Example:
//   cn("bg-wave-400", isActive && "opacity-100", !isActive && "opacity-50")
//   → "bg-wave-400 opacity-50"  (if isActive is false)
// ============================================================

export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
  }