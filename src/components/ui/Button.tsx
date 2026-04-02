// src/components/ui/Button.tsx
// ============================================================
// Reusable Button component for Amara & Partners.
//
// VARIANTS:
//   primary   -- gold bg, dark text. Main CTAs on dark backgrounds.
//   secondary -- transparent with border. Supporting actions.
//   ghost     -- text only with animated underline. Inline links.
//
// SIZES:
//   md -- default, used in nav, cards, forms
//   lg -- used in hero and major CTA sections
//
// USAGE EXAMPLES:
//   <Button variant="primary" size="lg">Get in Touch</Button>
//   <Button variant="secondary" arrow>Learn More</Button>
//   <Button variant="ghost">Read the full story</Button>
//   <Button variant="primary" href="/contact">Contact Us</Button>
// ============================================================

import { cn } from "@/lib/utils";

// --- Type Definitions ---
// These define exactly what props (options) the Button accepts.
type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;       // Visual style (default: "primary")
  size?: ButtonSize;             // Size (default: "md")
  arrow?: boolean;               // Show animated arrow icon
  href?: string;                 // If provided, renders as <a> tag
  className?: string;            // Extra classes from parent
  children: React.ReactNode;     // Button label text
  onClick?: () => void;          // Click handler
  disabled?: boolean;            // Disabled state
  type?: "button" | "submit" | "reset"; // HTML button type
}

// --- Style Maps ---
// All variant and size styles defined in one place.
// If you ever need to tweak a style, change it here.

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    // Brand-gold background, dark text
    "bg-brand-gold text-wave-700",
    // Hover: deepen to gold, subtle lift
    "hover:bg-gold hover:shadow-gold-glow",
    // Border matches background so it sits flush
    "border border-brand-gold hover:border-gold"
  ),

  secondary: cn(
    // Transparent background, wave-colored border
    "bg-transparent text-wave-100 border border-wave-200",
    // Hover: slightly fill the background
    "hover:bg-wave-600 hover:border-wave-100"
  ),

  ghost: cn(
    // No background or border -- just styled text
    "bg-transparent border-0 text-wave-400",
    // Hover: shift to brand-gold
    "hover:text-brand-gold",
    // Underline that slides in from left on hover
    "relative after:absolute after:bottom-0 after:left-0",
    "after:h-px after:w-0 after:bg-current",
    "after:transition-all after:duration-300",
    "hover:after:w-full"
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-body-sm",
  lg: "px-8 py-4 text-body-md",
};

// --- Arrow Icon ---
// A simple SVG arrow that nudges right on hover.
// The parent button's `group` class enables the group-hover.
function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      // group-hover nudges the arrow 4px to the right
      className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// --- Main Component ---
export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  href,
  className,
  children,
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) {

  // Base styles shared by all variants and sizes
  const baseStyles = cn(
    "group",                          // Enables group-hover on children
    "inline-flex items-center",       // Horizontal layout for text + arrow
    "font-body font-medium",          // DM Sans, medium weight
    "tracking-wide",                  // Slight letter spacing, reads premium
    "rounded-button",                 // From our tailwind token (6px)
    "transition-all duration-200",    // Smooth transitions on all properties
    "cursor-pointer",
    "select-none",
    // Disabled state
    disabled && "opacity-50 cursor-not-allowed pointer-events-none"
  );

  const allStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  // If `href` is provided, render as an anchor tag for navigation
  if (href) {
    return (
      <a href={href} className={allStyles}>
        {children}
        {arrow && <ArrowIcon />}
      </a>
    );
  }

  // Otherwise render as a standard button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={allStyles}
    >
      {children}
      {arrow && <ArrowIcon />}
    </button>
  );
}