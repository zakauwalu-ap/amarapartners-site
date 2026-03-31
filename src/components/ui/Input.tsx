// =============================================================================
// src/components/ui/Input.tsx
// =============================================================================
// Three named exports for all form field types used on the Contact page:
//
//   <Input />    -- text, email, tel, etc.
//   <Textarea /> -- multi-line message field
//   <Select />   -- dropdown (Area of Interest)
//
// All three share:
//   - Floating label (animates up on focus or when field has a value)
//   - Error state (red border + message below)
//   - Disabled state
//   - Consistent sizing and brand styling
//
// These are CONTROLLED components -- always pass value + onChange from the
// parent form. Example:
//
//   const [name, setName] = useState("");
//   <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
// =============================================================================

"use client"; // Floating label needs useState/useId -- requires client component

import { useState, useId } from "react";
import { cn } from "@/lib/utils";


// =============================================================================
// SHARED TYPES
// =============================================================================

interface BaseFieldProps {
  label: string;            // The floating label text
  error?: string;           // If set, shows red border + this message below
  disabled?: boolean;
  className?: string;       // Applied to the outer wrapper div
  hint?: string;            // Optional helper text below the field (e.g. "Optional")
}


// =============================================================================
// SHARED STYLE HELPERS
// =============================================================================

// The visible field box -- border, background, focus ring
const fieldBox = cn(
  "w-full rounded-sm border bg-cream/60",
  "font-body text-body-base text-wave-700",
  "transition-all duration-200 ease-out",
  "outline-none",
  // Normal border
  "border-light-grey",
  // Focus ring -- gold bottom border effect via ring
  "focus:border-gold focus:ring-0",
  // Disabled
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-light-grey/30"
);

// The floating label element
const floatingLabel = (isFloated: boolean, hasError: boolean) =>
  cn(
    "absolute left-3 font-body pointer-events-none select-none",
    "transition-all duration-200 ease-out",
    // FLOATED STATE: small, sits on the top border
    isFloated && "top-0 -translate-y-1/2",
    isFloated && "text-[11px] font-medium uppercase tracking-wider px-1",
    isFloated && "bg-cream",
    isFloated && (hasError ? "text-red-500" : "text-gold"),
    // IDLE STATE: sits inside the field like placeholder text
    !isFloated && "top-1/2 -translate-y-1/2",
    !isFloated && "text-body-base text-shadow-grey/70"
  );


// =============================================================================
// INPUT COMPONENT
// For: Name, Email, Phone fields
// =============================================================================

interface InputProps
  extends BaseFieldProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "id"> {
  label: string;
}

export function Input({
  label,
  error,
  disabled,
  className,
  hint,
  value,
  onChange,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);

  // Label floats if the field is focused OR has a value
  const isFloated = isFocused || (value !== undefined && value !== "");

  return (
    <div className={cn("relative flex flex-col gap-1", className)}>
      <div className="relative">
        {/* The label floats over the top border of the input */}
        <label htmlFor={id} className={floatingLabel(isFloated, !!error)}>
          {label}
        </label>

        <input
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            fieldBox,
            "h-14 px-3 pt-3",   // pt-3 nudges text down so it doesn't overlap the floated label
            error && "border-red-400 focus:border-red-400"
          )}
          {...rest}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="font-body text-body-xs text-red-500 px-1">{error}</p>
      )}

      {/* Hint text (e.g. "Optional") */}
      {!error && hint && (
        <p className="font-body text-body-xs text-shadow-grey/60 px-1">{hint}</p>
      )}
    </div>
  );
}


// =============================================================================
// TEXTAREA COMPONENT
// For: Message field
// =============================================================================

interface TextareaProps
  extends BaseFieldProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "id"> {
  label: string;
  rows?: number;
}

export function Textarea({
  label,
  error,
  disabled,
  className,
  hint,
  value,
  onChange,
  onFocus,
  onBlur,
  rows = 5,
  ...rest
}: TextareaProps) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);

  const isFloated = isFocused || (value !== undefined && value !== "");

  // For textarea the label always floats from the top-left,
  // not vertically centered (since the field has variable height)
  const textareaLabel = cn(
    "absolute left-3 font-body pointer-events-none select-none",
    "transition-all duration-200 ease-out",
    isFloated && "top-0 -translate-y-1/2",
    isFloated && "text-[11px] font-medium uppercase tracking-wider px-1",
    isFloated && "bg-cream",
    isFloated && (error ? "text-red-500" : "text-gold"),
    !isFloated && "top-4",
    !isFloated && "text-body-base text-shadow-grey/70"
  );

  return (
    <div className={cn("relative flex flex-col gap-1", className)}>
      <div className="relative">
        <label htmlFor={id} className={textareaLabel}>
          {label}
        </label>

        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            fieldBox,
            "px-3 pt-5 resize-none", // pt-5 keeps typed text below the floated label
            error && "border-red-400 focus:border-red-400"
          )}
          {...rest}
        />
      </div>

      {error && (
        <p className="font-body text-body-xs text-red-500 px-1">{error}</p>
      )}
      {!error && hint && (
        <p className="font-body text-body-xs text-shadow-grey/60 px-1">{hint}</p>
      )}
    </div>
  );
}


// =============================================================================
// SELECT COMPONENT
// For: Area of Interest dropdown
// Requires a placeholder option as the first child (value="")
// =============================================================================

interface SelectProps
  extends BaseFieldProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className" | "id"> {
  label: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  disabled,
  className,
  hint,
  value,
  onChange,
  onFocus,
  onBlur,
  options,
  ...rest
}: SelectProps) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);

  // For Select: floated if focused OR a real value is selected (not the empty placeholder)
  const isFloated = isFocused || (value !== undefined && value !== "");

  return (
    <div className={cn("relative flex flex-col gap-1", className)}>
      <div className="relative">
        <label htmlFor={id} className={floatingLabel(isFloated, !!error)}>
          {label}
        </label>

        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            fieldBox,
            "h-14 px-3 pt-3",
            // Hide default browser arrow -- we use a custom one below
            "appearance-none cursor-pointer",
            // When no value selected yet, make the text muted
            value === "" && "text-shadow-grey/70",
            error && "border-red-400 focus:border-red-400"
          )}
          {...rest}
        >
          {/* Hidden placeholder option -- keeps the select in "empty" state until chosen */}
          <option value="" disabled hidden />

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-shadow-grey"
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {error && (
        <p className="font-body text-body-xs text-red-500 px-1">{error}</p>
      )}
      {!error && hint && (
        <p className="font-body text-body-xs text-shadow-grey/60 px-1">{hint}</p>
      )}
    </div>
  );
}