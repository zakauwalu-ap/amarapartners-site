# Project Context -- Amara & Partners Website

This is a Next.js 15 (App Router, TypeScript) website for Amara & Partners
Legal Consultants, based in Abu Dhabi, UAE.

## Stack
- Next.js 15, App Router, TypeScript
- Tailwind CSS with custom wave color tokens
- GSAP + ScrollTrigger (scroll animations), Framer Motion (UI transitions)
- Fonts: Cormorant Garamond (headings), DM Sans (body) via next/font
- CMS: deferred -- use static placeholder data for now
- Deployment: Vercel

## Key Colors
wave-100: #B8CCDE | wave-400: #2B5F9E | wave-700: #091D3A
gold: #C9A84C | cream: #F5F0E8 | Brand Blue: #496BB3

## Component Structure
src/components/layout/   -- Navigation, Footer, PageHeader
src/components/sections/ -- Hero, FirmIntro, PillarCards, FeaturedInsights, CTA
src/components/ui/       -- Button, Card, Input, Badge
src/components/waves/    -- WaveSystem, WaveLayer

## Current Phase
Phase 1 -- Foundation (Tailwind config, fonts, base components)

## Full brief at: docs/MASTER_BRIEF.md
## Full rules at: .cursor/rules/project.mdc