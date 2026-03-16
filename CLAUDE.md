# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev      # Start Next.js dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run Next.js linting
```

## Architecture

Single-page Next.js 16 (App Router) landing site built with React 19 and TypeScript (strict mode).

**Layout:** `app/layout.tsx` wraps everything in `ThemeContext` provider. `app/page.tsx` composes all section components sequentially.

**Components** (`/components/`): Each section is a self-contained component (HeroSection, ServicesSection, CaseStudiesSection, etc.). Two background effects — `GlobalCanvas.tsx` (particle network) and `AuroraBackground.tsx` (gradient blobs) — render only on desktop.

**Theme system** (`/context/ThemeContext.tsx`): Dark/light mode via CSS custom properties defined in `app/globals.css`, toggled by `ThemeToggle.tsx`, persisted to localStorage key `autometa-theme`.

**Animation stack**: GSAP + ScrollTrigger for scroll-driven animations and complex sequences; Framer Motion for component transitions; Lax.js for parallax. Custom hooks in `/hooks/useAnimations.ts` provide reusable GSAP patterns (split-text reveal, stagger, magnetic buttons, 3D tilt cards). `/hooks/useIsMobile.ts` gates expensive animations to desktop only (768px breakpoint).

**Styling**: Tailwind CSS 4 with custom theme extensions in `tailwind.config.ts` (navy/electric/neon colors, custom animations). CSS variables in `globals.css` handle theme-dependent colors. Mix of Tailwind utilities and inline styles.

**Path alias**: `@/*` maps to project root (tsconfig.json).
