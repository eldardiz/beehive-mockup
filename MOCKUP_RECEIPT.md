# Beehive Software — Mockup Receipt

**Built:** 2026-06-02 · Speculative premium-redesign mockup (not a production build).

## Links
- **Production:** https://beehive-mockup.vercel.app
- **Repo:** https://github.com/eldardiz/beehive-mockup
- **Vercel project:** beehive-mockup (scope: eldardizs-projects)
- **Source of brief:** partner Slack note — "visuals feel a bit cheap & copy is a bit scattered… more motion/premium, like GetFurnace, with existing brand."

## What it is
A re-skin of our **GetFurnace mockup** motion engine (Next.js 16 + Tailwind v4 + Framer
Motion + Lenis), dressed in Beehive's real identity and tightened copy. A few premium
sections, motion-led.

## The direction (and why)
Beehive's *actual* brand assets are already **dark + honey + honeycomb** (their hero is a
near-black hexagon field; their logo is a honeycomb mark in gradient `#EEB910 → #EE8A0E`
with a white wordmark, built for dark backgrounds). Their current site reads cheap because
those premium dark assets sit on plain white WordPress/Elementor blocks. So we went
**warm-dark + honeycomb** with a **scroll-reactive theme switch**: the navbar and logo
recolor as the canvas flips between dark sections and the one light "spotlight" section.

## Sections (theme rhythm)
1. **Hero** `dark` — honeycomb field + honey orb, "Reimagining software development" (honey gradient), dual CTA.
2. **TrustRow** `dark` — 5 real Clutch 2026 award badges (hexagonal → on-theme).
3. **Swarm / How it works** `light` ← the theme-flip spotlight + animated centerpiece: brief → 100+ engineers in parallel → tested PRs (live counters, parallel-branch bars, commit pulse, merged-PR pops).
4. **Value bento** `dark` — 4 pillars: `1/3` unicorn-cost, `10×` parallel, `NDA` IP, `24/7` MVP.
5. **Closing CTA** `dark` — big honeycomb logo (parallax + blur reveal), "Two ways to build. Zero compromises.", Book a Demo.
6. **Footer** `dark`.

The reactive navbar (`app/components/Nav.tsx`) probes which `.theme-section` sits under it
on scroll and mirrors its theme; the inline logo (`BeehiveLogo.tsx`) follows via
`currentColor` while the honey icon stays constant.

## Brand fidelity
- **Accent:** `#EEB910 → #EE8A0E` (lifted straight from the logo gradient). ✅
- **Logo:** their real `logo.svg`, inlined as a currentColor-aware component. ✅
- **Clutch badges:** real, pulled from their site. ✅
- **Fonts:** headings = **Plus Jakarta Sans**, body = **Manrope** (both Google-hosted, both in
  their stack). Their primary heading font is **Gilroy**, which is licensed and not on Google
  Fonts. *To match exactly, drop Gilroy `.woff2` files in and swap the heading font in
  `app/layout.tsx`.*
- **Visuals:** hero honeycomb, honey orb, lifecycle rings are **recreated as live animated
  code**, not their raw `.webp` — so they move and feel premium.

## Copy
Tightened from their scattered current site (no em dashes, per house rule). Hero, how-it-works,
value pillars, and closing are rewritten for focus. The microtask/parallel-swarm story is built
straight from their real differentiator ("100+ engineers, parallel microtasks").

## Before sending to the lead — worth a second pass
- **Book a Demo** currently links to `beehivesoftware.com` as a placeholder → swap for the real
  demo-booking URL.
- **Nav anchors** `#industries` and `#about` have no matching section yet (mockup scope is a few
  sections). Either add stubs or trim those two links before sending.
- **Illustrative numbers** in the Swarm cards (147 engineers active, 3,842 features shipped, branch
  %s) are placeholders for visual effect → confirm real figures with the client or soften to
  non-specific.
- Mockup intentionally omits their full site (Services, Industries, FAQ, Blog, the
  Traditional-vs-Beehive comparison table). Easy to add the comparison table as a 6th section if
  they want it.
- Gilroy font substitution (see above).

## Reuse note
First mockup spun from the GetFurnace recipe for a **non-hospitality / SaaS** lead. The
scroll-reactive dark/light theme switch + inline currentColor logo is a new, reusable pattern
worth lifting into the archetype kit if more SaaS mockups follow.
