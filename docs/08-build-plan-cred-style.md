# 08. Build Plan: CRED-Style Fermor Homepage

This replaces 06 where they conflict. 06 still holds for the finance math, tests, QA and README outline. Goal and fold plan: [07](07-goal-cred-benchmark.md). Assets: [`assets/fermor/`](../assets/fermor/README.md).

## 1. Stack

| Choice | Why |
|--------|-----|
| Next.js 15 App Router + TypeScript | Same as fermor.in and cred.club (both run Next.js) |
| Tailwind CSS v4 | Tokens in `@theme` |
| **GSAP 3 + ScrollTrigger** (`gsap`, `@gsap/react`) | Scroll-linked word reveals, the phone fan, hero sheet scale, curtain. Free for this use. Industry standard for this style. |
| **Lenis** (`lenis`) | Smooth scroll that ScrollTrigger syncs to. Gives the CRED "weight". Turned off under reduced motion. |
| `next/font/google` | Fraunces (variable, with `opsz` axis), Poppins 500/600/700, Inter 400/500 |
| lucide-react | Icons |
| Vitest | Finance math tests (fixtures in 06 §3) |
| ffmpeg | Video encodes and posters (commands in `assets/fermor/README.md`) |

Skip Framer Motion: GSAP covers everything, and two animation engines bloat the bundle.

## 2. Tokens (`app/globals.css`)

```css
@import "tailwindcss";

@theme {
  --color-void: #050606;
  --color-ink: #101214;
  --color-mint: #75FB90;
  --color-paper: #FFFFFF;
  --color-cream: #F3EEE6;
  --color-line: rgb(255 255 255 / .08);

  --font-display: var(--font-fraunces), Georgia, serif;
  --font-ui: var(--font-poppins), system-ui, sans-serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;

  --ease-out-expo: cubic-bezier(.16, 1, .3, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
}

html { background: var(--color-void); color: #fff; }
.display { font-family: var(--font-display); font-weight: 700; font-variation-settings: "opsz" 144, "SOFT" 0;
           font-size: clamp(48px, 8vw, 120px); line-height: .92; letter-spacing: -.03em; text-transform: lowercase; }
.eyebrow { font-family: var(--font-ui); font-weight: 600; font-size: 13px; letter-spacing: .35em; text-transform: uppercase; color: rgb(255 255 255 / .7); }
.body-lg { font-family: var(--font-sans); font-size: clamp(17px, 1.4vw, 20px); line-height: 1.7; color: rgb(255 255 255 / .7); }
.num     { font-family: var(--font-ui); font-weight: 700; font-variant-numeric: tabular-nums; letter-spacing: -.04em; }
.t-90{color:rgb(255 255 255/.9)} .t-70{color:rgb(255 255 255/.7)} .t-50{color:rgb(255 255 255/.5)} .t-25{color:rgb(255 255 255/.25)}
.hairline { border-top: 1px solid var(--color-line); }
.glow-mint { background: radial-gradient(closest-side, rgb(117 251 144 / .35), transparent); filter: blur(40px); }
```

Contrast on void (measured): white/70 = 9.8:1, white/50 = 5.3:1 (AA), white/45 = 4.46:1 (fails, so never use it for text), white/25 is decorative only, never used for text at rest.

## 3. Folder structure

```
app/
  layout.tsx              fonts, metadata, <SmoothScroll> provider
  page.tsx                folds in order
  api/waitlist/route.ts   mock POST
components/
  motion/
    SmoothScroll.tsx      Lenis + ScrollTrigger sync, off under reduced motion
    WordReveal.tsx        splits text into <span>s, scrubs opacity per word
    CountUp.tsx           number tween on enter
    Parallax.tsx          y-offset by speed factor
  media/
    HeroVideo.tsx         plays once, holds the last frame, poster, mobile source
    PhoneFrame.tsx        CSS device frame around any screen image
  folds/
    Hero.tsx  Manifesto.tsx  AppFan.tsx  LiveCalculator.tsx  WhereYouStand.tsx
    ProductRail.tsx  Privacy.tsx  Proof.tsx  Analysis.tsx  Closing.tsx  Faq.tsx  Footer.tsx
  calculator/             SIP / EMI / Tax panels (from 06)
  ui/                     GhostButton, Eyebrow, Tag, Accordion, Nav
lib/finance.ts  lib/format.ts
content/*.ts              all copy, products, articles, faq
public/
  brand/fermor-mark.svg
  video/hero-1080.mp4  hero-1080.webm  hero-720.mp4  hero-poster.jpg
  img/screens/*.webp  img/cards/*.webp  img/bg/curtain.webp  img/amc/*.png
```

## 4. Key effects: how to build them

### 4.1 Word reveal (manifesto, privacy)
```tsx
// WordReveal.tsx (client)
useGSAP(() => {
  const words = ref.current!.querySelectorAll("span");
  gsap.fromTo(words, { opacity: 0.25 }, {
    opacity: 1, stagger: 0.05, ease: "none",
    scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 45%", scrub: true },
  });
}, { scope: ref });
```
- Server-render the text normally. Split into spans on the client only, so SEO and no-JS see plain text.
- At rest without JS, text is white/70. The 0.25 starting value only applies once JS runs and reduced motion is off.

### 4.2 Hero sheet "lights off"
- The hero is a white `rounded-[28px]` sheet holding the video, inset 12px in the void.
- ScrollTrigger scrub from `top top` to `bottom top`: `scale 1 → .94`, `borderRadius 28 → 48`, and the video `opacity 1 → .6`.
- Video: `autoPlay muted playsInline preload="auto"`, no loop. `onEnded` holds the last frame. Under reduced motion, show the poster only.

### 4.3 Phone fan (AppFan)
- 4 `PhoneFrame`s absolutely stacked. A pinned section (pin only 100vh, no longer) tweens each to `rotate(-18/-6/6/18deg)`, `x(-36/-12/12/36%)`, `y` arcs.
- On mobile: no pin. Phones sit in a static overlapping row, and the fan plays once on enter.

### 4.4 Product rail
- CSS `overflow-x: auto; scroll-snap-type: x mandatory`, cards `scroll-snap-align: start`, width `min(78vw, 360px)`, height 520px.
- Desktop: drag-to-scroll (pointer events) plus prev/next buttons. No auto-advance.
- Card: an image at the top over a colour glow, a title in Fraunces 36px lowercase, a "LIVE" or "SOON" tag, and a `KNOW MORE →` ghost button.

### 4.5 Live calculator fold
- Reuse the calculator from 06. Restyle it: ink panel, hairline dividers, white/70 labels, a huge `.num` result with a `.glow-mint` behind it, mint slider thumb, `CountUp` on change.
- "show the math ⌄" expands a monospace-style formula block.

### 4.6 Curtain closing
- Two halves of `curtain.webp` slide `xPercent: -100 / 100` on scroll to reveal the CTA panel (cream background, ink text, mint button with ink text).

### 4.7 Count-up (Proof)
- `gsap.to(obj, { val: 158, duration: 1.2, ease: "power2.out", onUpdate })`, formatted with `en-IN`. Triggered once.

## 5. Media pipeline

| Asset | Desktop | Mobile | Rules |
|-------|---------|--------|-------|
| Hero video | `hero-1080.webm` + `.mp4` (about 1.5 to 2.5 MB) | `hero-720.mp4` (about 0.6 MB) via `<source media="(max-width: 767px)">` | Poster always set. `preload="metadata"` on mobile. |
| Screens/cards | `.webp` as downloaded (17 to 57 KB) | same | `next/image`, `sizes` set, `priority` only for the hero poster |
| Curtain | `curtain-reveal-bg-tall.webp` (43 KB) | same | Use the webp, not the 1.1 MB PNG |
| AMC logos | PNG, greyscale with CSS `filter: grayscale(1) invert(1)`, white/50 | same | Labels, not endorsements |

Total page weight target: **under 3.5 MB desktop, under 1.5 MB mobile** on first load.

## 6. Two-day schedule

### Day 1
| Hours | Task |
|-------|------|
| 1 | Scaffold, fonts, tokens, deploy an empty page to Vercel. Copy assets into `public/`. Run the ffmpeg encodes. |
| 1 | `finance.ts` + tests (06 §3) |
| 1 | `SmoothScroll`, `WordReveal`, `CountUp` primitives with reduced-motion handling |
| 2 | Nav (tiny: mark, "calculators", menu, one pill) + **Hero** (white sheet, video, lights-off scrub) |
| 1 | Manifesto |
| 2 | **Live calculator fold** |

### Day 2
| Hours | Task |
|-------|------|
| 2 | App fan + Where you stand (cards parallax) |
| 1.5 | Product rail |
| 1 | Privacy + Proof |
| 1 | Analysis + Closing curtain + waitlist form |
| 0.5 | FAQ + Footer |
| 1.5 | Mobile pass (360 / 390 / 768), Android Chrome throttled test, reduced motion test |
| 1 | Lighthouse, metadata/OG, README with screenshots, ship |

**Cut order if late:** curtain animation (make it a static image) → app fan pin (make it static) → Lenis → analysis fold.

## 7. Performance and accessibility guardrails

- Animate only `transform` and `opacity`. Add `will-change` only while animating.
- `ScrollTrigger.matchMedia` / `gsap.matchMedia()`: simpler effects under 768px, none under `prefers-reduced-motion`.
- Never pin a section longer than 100vh of scroll. No content may require scrolling to become readable.
- Videos: muted, `playsInline`, pause when off screen (an `IntersectionObserver` calls `pause()`), with a play/pause control for the hero (WCAG 2.2.2).
- All text white/50 or brighter at rest. Focus ring is mint, 2px.
- Lowercase headlines: keep a normal-case `aria-label` only if screen readers read them oddly. Usually fine.
- First-load JS budget: about 160 KB (GSAP + ScrollTrigger ≈ 45 KB gz, Lenis ≈ 4 KB).

## 8. README additions (beyond 06 §7)

- "Benchmark: CRED's homepage for craft; Fermor's own product and assets for substance."
- "Positioning flip: CRED says 'not everyone gets it'. Fermor says clarity isn't a members-only club."
- "Assets: logo, hero video and app screens are Fermor's own, from fermor.in. No CRED assets used."
- Credit the fonts (Fraunces, Poppins, Inter: OFL).
