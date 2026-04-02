// =============================================================================
// src/components/sections/ContactForm.tsx
// =============================================================================
// Client-side contact form component for the /contact page.
//
// Manages all form state, field-level validation, and the submission
// lifecycle (idle → submitting → success | error).
//
// The handleSubmit body currently simulates a 1.2s async operation and
// resolves to success. Replace it with a real API call (e.g. a Next.js
// Route Handler + Resend) in Phase 7.
//
// The form is a controlled component: every field value is tracked in
// React state and passed down to the relevant Input/Textarea/Select
// component as `value` + `onChange`.
// =============================================================================

"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// --- Types -------------------------------------------------------------------

interface FormFields {
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

// --- Constants ---------------------------------------------------------------

const EMPTY_FORM: FormFields = {
  name: "",
  email: "",
  phone: "",
  area: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Area of interest options: pillar-level + each industry + general enquiry.
// Ordered general-first, then practices, then industries.
const AREA_OPTIONS: { value: string; label: string }[] = [
  { value: "general",                  label: "General Enquiry" },
  { value: "corporate",                label: "Corporate & Transactions" },
  { value: "disputes",                 label: "Disputes" },
  { value: "regulatory",               label: "Regulatory & Compliance" },
  { value: "aviation-space",           label: "Aviation and Space" },
  { value: "engineering-construction", label: "Engineering and Construction" },
  { value: "oil-gas",                  label: "Oil and Gas" },
  { value: "tmt",                      label: "Technology, Media & Telecommunications" },
  { value: "healthcare",               label: "Healthcare and Life Sciences" },
];

// --- Success card ------------------------------------------------------------
// Displayed in place of the form after a successful submission.

interface SuccessCardProps {
  onReset: () => void;
}

function SuccessCard({ onReset }: SuccessCardProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="rounded-card border border-wave-200/30 bg-wave-100/20 px-8 py-14 text-center"
    >
      {/* Checkmark circle */}
      <div
        className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-wave-500 text-cream"
        aria-hidden="true"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h3 className="mb-3 font-heading text-display-md text-wave-700">
        Message received.
      </h3>

      <p className="mb-8 font-body text-body-lg leading-relaxed text-shadow-grey">
        Thank you for reaching out. A member of our team will be in touch
        within one business day.
      </p>

      <Button variant="ghost" onClick={onReset}>
        Send another message
      </Button>
    </div>
  );
}

// --- Main component ----------------------------------------------------------

export function ContactForm() {
  const [fields, setFields] = useState<FormFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // Update a single field and immediately clear its error on change.
  const handleChange = (field: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Returns true when all required fields pass validation.
  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!fields.name.trim()) {
      next.name = "Full name is required.";
    }

    if (!fields.email.trim()) {
      next.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(fields.email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (!fields.area) {
      next.area = "Please select an area of interest.";
    }

    if (!fields.message.trim()) {
      next.message = "A message is required.";
    } else if (fields.message.trim().length < 10) {
      next.message = "Please provide a little more detail (at least 10 characters).";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      // Simulated async — replace with a real API call in Phase 7.
      // e.g. await fetch("/api/contact", { method: "POST", body: JSON.stringify(fields) })
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setFields(EMPTY_FORM);
    setErrors({});
    setStatus("idle");
  };

  // --- Success state ---------------------------------------------------------

  if (status === "success") {
    return <SuccessCard onReset={handleReset} />;
  }

  // --- Form -----------------------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
    >
      <div className="flex flex-col gap-6">

        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            label="Full Name"
            value={fields.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
            autoComplete="name"
          />
          <Input
            label="Email Address"
            type="email"
            value={fields.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
            autoComplete="email"
          />
        </div>

        {/* Row 2: Phone (optional) + Area of Interest */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            label="Phone Number"
            type="tel"
            value={fields.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            hint="Optional"
            autoComplete="tel"
          />
          <Select
            label="Area of Interest"
            value={fields.area}
            onChange={(e) => handleChange("area", e.target.value)}
            error={errors.area}
            options={AREA_OPTIONS}
          />
        </div>

        {/* Row 3: Message */}
        <Textarea
          label="Your Message"
          value={fields.message}
          onChange={(e) => handleChange("message", e.target.value)}
          error={errors.message}
          rows={6}
        />

        {/* Global network error (shown only when the API call itself fails) */}
        {status === "error" && (
          <p
            role="alert"
            className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 font-body text-body-sm text-red-700"
          >
            Something went wrong. Please try again, or email us directly at{" "}
            <a
              href="mailto:info@amarapartners.ae"
              className="underline transition-colors duration-200 hover:text-red-900"
            >
              info@amarapartners.ae
            </a>
            .
          </p>
        )}

        {/* Submit button */}
        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={status === "submitting"}
            arrow={status !== "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Send Message"}
          </Button>
        </div>

      </div>
    </form>
  );
}
