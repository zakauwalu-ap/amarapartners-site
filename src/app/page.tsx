// src/app/page.tsx
// Home page — the WaveSystem component contains the full scroll experience:
// the cinematic wave sequence and all five content sections as scroll-driven
// panels. Nothing else is needed here at the page level.

import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
