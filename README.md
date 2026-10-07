# Fermor homepage (concept)

**Live:** [Fermor](https://fermorwee.vercel.app) · 
**Repo:** https://github.com/JojoAArtI/fermorwee

A new homepage for [Fermor](https://fermor.in), built as a two-day internship assignment. It's a concept, not the official site.

![Homepage at 1440px](docs/screenshots/homepage-1440.png)

## Setup

Node 20 or newer (I used Node 24).

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # finance + formatting tests
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed URL (see `.env.example`) for the canonical link, Open Graph image and sitemap.

## What I built and why

The page has three readers: returning calculator users, people sent a link, and evaluators checking whether Fermor is credible. All three need to know what Fermor does from the first screen, so the hero says it plainly and the page leads with what's live today, 158 free calculators. The app is treated honestly as a waitlist: every app screen is labelled "preview" or "soon", and nothing says "invest now".

The spine of the page flips CRED's line. CRED says "not everyone gets it". Fermor says clarity isn't a members-only club, so the closing headline is "now everyone gets it."

A working calculator sits mid-page because it proves "show the math" instead of claiming it. SIP, home loan and income tax all run live, each with a "show the math" panel that plugs your numbers into the formula.

## Design decisions

- **CRED's craft, Fermor's identity.** Dark canvas, editorial serif, a story told on scroll, but only Fermor's mark, mint, app screens and video.
- **One accent colour.** Mint is the only UI colour; other colour comes from Fermor's card images.
- **Type.** Fraunces for headlines (a free high-contrast serif), Poppins for UI and numbers (Fermor's heading font), Inter for body text.
- **Contrast.** No mint text on light backgrounds (1.3:1); light panels use a mint highlighter behind ink text. Text on dark never goes below white/50.

## Technical notes

- Next.js 15, React 19, TypeScript, Tailwind v4. Folds are Server Components; only interactive pieces run on the client.
- GSAP + ScrollTrigger drive the reveals, phone fan and curtain; Lenis adds smooth scroll. Both switch off under reduced motion, and Lenis is off on touch devices.
- `lib/finance.ts` matches fermor.in's formulas (SIP uses an effective monthly rate). 30 tests cover every fixture, including the 87A rebate and marginal relief.
- `/api/waitlist` is a mock that validates and stores nothing.
- The hero opens with a short intro (once per session): a loading bar, five tilted tiles sliding into a row, and the middle one growing into a full-bleed video loop while the nav words and the statement rise line by line. At the top the nav is just words; the pill bar slides in once you scroll. It is skipped under reduced motion, and without JavaScript the page renders in its finished state. The loop is a 16s 1080p AV1 file (2.7 MB) with an H.264 fallback. Fonts are self-hosted, with a width-matched fallback so headlines don't shift when they load.

## Accessibility and performance

Keyboard-only, reduced-motion and JavaScript-off runs all work, and text is readable at rest in each. There's a skip link, a heading per fold, a focus-trapped mobile menu, WAI-ARIA calculator tabs and 44px touch targets from 360px to 1920px.

Lighthouse, production build (mobile is the median of three runs):

| | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Mobile | 56–66 | 97 | 100 | 100 |
| Desktop | 83–92 | 97 | 100 | 100 |

CLS is 0. The hero intro is the main cost on mobile: Lighthouse loads a fresh session, so it always sees the full intro, and the headline (the LCP element) only appears once the intro finishes (simulated LCP 4.7–5.1s). Before the intro, mobile performance was 86. Accessibility is 97 only because the reveal words start dim before you scroll to them, which is the intended effect.

## Assets and credits

Logo and app images are Fermor's, from fermor.in. The hero loop is stock footage. AMC logos are for identification only. Fraunces, Poppins and Inter are under the SIL Open Font License. No CRED assets are used.

## What I'd do next

Real waitlist storage with double opt-in, search across all 158 calculators, a Hindi version, and a short financial health-check flow.
