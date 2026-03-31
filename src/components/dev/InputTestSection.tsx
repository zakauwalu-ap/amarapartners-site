// =============================================================================
// src/components/dev/InputTestSection.tsx
// Temporary dev-only component for testing form field components.
// Delete or gut this file when the real Contact page is built.
// =============================================================================

"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Input";

export function InputTestSection() {
  // Every controlled field needs its own piece of state.
  // Previously email and phone were locked to value="" -- fixed here.
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [area, setArea]       = useState("");
  const [message, setMessage] = useState("");

  const practiceAreas = [
    { value: "corporate",   label: "Corporate & Transactions" },
    { value: "disputes",    label: "Disputes" },
    { value: "regulatory",  label: "Regulatory & Compliance" },
  ];

  return (
    <section className="space-y-4 max-w-md">
      <p className="font-body text-body-sm text-wave-200 uppercase tracking-widest">
        Form Fields
      </p>

      <div className="bg-cream p-6 rounded-card space-y-5">

        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/*
          Email field: in the real Contact form this error prop will be
          conditional (only shown after failed validation).
          For now it is hardcoded so we can see the error style -- but
          the field is fully typeable.
        */}
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error="Please enter a valid email address"
        />

        <Input
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          hint="Optional"
        />

        <Select
          label="Area of Interest"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          options={practiceAreas}
        />

        <Textarea
          label="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

      </div>
    </section>
  );
}