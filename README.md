# Velar AI — Intelligent Data Automation Platform

> Built for **Frontend Battle 3.0** — WebnD, IIT Bhubaneswar · June 26, 2026

**Live Demo:** [velar-ai.vercel.app](https://velar-ai.vercel.app)

---

## Overview

Velar AI is a premium, high-converting SaaS landing page for an AI-driven data automation platform. Built under a 4-hour speed run constraint, the project demonstrates architectural integrity, motion choreography, and SEO hygiene under real competition pressure.

---

## Tech Stack

- **React** + **Vite**
- **Tailwind CSS** — utility styling only, no component libraries
- **JetBrains Mono** — headings, pricing numbers, code accents
- **Inter** — body text, navigation, UI labels
- **Native CSS Transitions / WAAPI** — all animations hand-rolled, zero animation libraries

---

## Features

### Feature 1 — Matrix-Driven Pricing & Currency Switcher
- Pricing computed from a multi-dimensional JS configuration matrix
- Base rates: Starter $29 / Pro $79 / Enterprise $199 (monthly USD)
- Annual billing applies a 20% discount multiplier (× 0.80)
- Currency conversion: USD × 1.0 / INR × 83.5 / EUR × 0.92
- Billing toggle and currency switcher update **only targeted text nodes** via direct DOM mutation — zero parent re-renders, zero global state reflow

### Feature 2 — Bento-to-Accordion with Context Transfer
- Desktop (≥768px): asymmetric CSS Grid bento layout with hover state tracking
- Mobile (<768px): fluid touch-optimised accordion list
- Active bento hover index transfers to the corresponding accordion panel on viewport resize via `ResizeObserver` — and back on return to desktop

### Motion & Performance
- Micro-interactions: 150ms ease-out
- Layout transitions: 300ms ease-in-out
- Entry animation sequence completes under 500ms
- Hardware-accelerated: `transform` and `opacity` only

### SEO & Accessibility
- Full semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- Single `<h1>` in hero
- Meta description, canonical URL, robots tag
- Open Graph tags: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`
- Twitter card meta
- `aria-hidden` on decorative SVGs, `aria-label` on interactive elements

---

## Color Palette

| Name | Hex | Role |
|---|---|---|
| Nocturnal Expedition | `#114C5A` | Primary background |
| Oceanic Noir | `#172B36` | Dark surface, cards |
| Forsythia | `#FFC801` | Primary accent, CTAs |
| Deep Saffron | `#FF9932` | Secondary accent, gradients |
| Arctic Powder | `#F1F6F4` | Primary text |
| Mystic Mint | `#D9E8E2` | Muted text, secondary surfaces |

---

## SVG Assets

All 14 provided SVGs are visibly integrated across the UI:

`cube-16-solid` · `arrow-trending-up` · `chart-pie` · `cog-8-tooth` · `arrow-path` · `link` · `link-solid` · `search` · `chevron-down` · `chevron-up` · `chevron-up-solid` · `chevron-left` · `chevron-right` · `x-mark`

---

## Running Locally

```bash
git clone https://github.com/rishipr-ui/Velar-AI.git
cd Velar-AI
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Deployment

Deployed on **Vercel** — [velar-ai.vercel.app](https://velar-ai.vercel.app)

```bash
npx vercel --prod
```

---

*Frontend Battle 3.0 · Round 1 · WebnD Society, IIT Bhubaneswar*
