# 04. Design System

This is the implementation layer of the brand guidelines (03). It assumes **Next.js (App Router) + Tailwind CSS v4**. The tokens work as plain CSS variables too.

## 1. Tokens

### `app/globals.css`

```css
@import "tailwindcss";

@theme {
  /* Colour */
  --color-ink: #101214;
  --color-ink-soft: #1B1D1F;
  --color-paper: #F4F5F1;
  --color-white: #FFFFFF;
  --color-line: #E5E5E5;
  --color-line-dark: rgb(255 255 255 / 0.08);

  --color-mint: #75FB90;
  --color-mint-soft: #B9EFCF;
  --color-mint-wash: #E4F6E8;
  --color-forest: #1A3530;
  --color-forest-deep: #0C1A10;

  --color-muted: #5A6660;     /* secondary text on light */
  --color-subtle: #8A8F86;    /* captions on dark only */

  --color-gain: #157A3A;
  --color-gain-bright: #22B455;
  --color-loss: #B43C3C;
  --color-loss-bright: #D45151;

  /* Type */
  --font-display: var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-instrument-serif), Georgia, serif;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 28px;

  /* Shadow */
  --shadow-card: 0 1px 2px rgb(16 18 20 / .06), 0 8px 24px rgb(16 18 20 / .06);
  --shadow-pop: 0 2px 4px rgb(16 18 20 / .06), 0 24px 48px rgb(16 18 20 / .12);

  /* Motion */
  --ease-out: cubic-bezier(.2, .82, .2, 1);   /* lifted from the live site */
  --dur-fast: 150ms;
  --dur-base: 240ms;
  --dur-slow: 600ms;
}

html { background: var(--color-ink); }          /* dark frame around rounded sheets */
body { font-family: var(--font-sans); color: var(--color-ink); -webkit-font-smoothing: antialiased; }
.num { font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1; }
:focus-visible { outline: 2px solid var(--color-mint); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

On light surfaces, change the focus ring to `forest`, since mint on white is invisible.

### Fonts (`app/layout.tsx`)

```tsx
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500","600","700"], variable: "--font-space-grotesk", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--font-instrument-serif", display: "swap" });
// <html lang="en-IN" className={`${inter.variable} ${grotesk.variable} ${serif.variable}`}>
```

## 2. Type scale

Fluid sizes with `clamp()`. Mobile is 360 to 390px wide, desktop 1440px.

| Token | Font | Size (mobile → desktop) | Line height | Tracking | Weight | Use |
|-------|------|-------------------------|-------------|----------|--------|-----|
| `display` | Space Grotesk | `clamp(40px, 7vw, 88px)` | 0.98 | -0.035em | 600 | Hero H1 only |
| `h2` | Space Grotesk | `clamp(30px, 4.2vw, 56px)` | 1.05 | -0.03em | 600 | Section titles |
| `h3` | Space Grotesk | `clamp(20px, 2vw, 26px)` | 1.2 | -0.02em | 600 | Card titles |
| `num-xl` | Space Grotesk | `clamp(36px, 5vw, 64px)` | 1 | -0.03em | 600 | Hero calculator result |
| `num-lg` | Space Grotesk | 28px | 1.1 | -0.02em | 600 | Stat values |
| `lead` | Inter | `clamp(17px, 1.4vw, 20px)` | 1.5 | -0.01em | 400 | Intro paragraphs |
| `body` | Inter | 16px | 1.6 | 0 | 400 | Default text |
| `small` | Inter | 14px | 1.5 | 0 | 400/500 | UI, captions |
| `eyebrow` | Inter | 12px | 1.2 | +0.08em, UPPERCASE | 600 | Section labels |
| `accent` | Instrument Serif Italic | same as the heading it sits in | — | -0.01em | 400 | One to three words inside a heading |

Rules:
- Body text never goes below 14px. Labels never below 12px. (The live site goes down to 8px.)
- Measure: 60 to 70 characters for paragraphs (`max-w-[62ch]`).
- At most one `accent` serif phrase per section.

## 3. Spacing and layout

- **Base unit 4px.** Use the Tailwind default scale.
- **Section padding:** `py-20` mobile → `py-32` desktop (80 → 128px).
- **Container:** `max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8`. The 16px gutter on mobile is mandatory.
- **Grid:** 12 columns, 24px gutter on desktop. 4 columns, 16px gutter on mobile.
- **Sheets:** each major section is a rounded panel (`rounded-t-[28px]` or `rounded-[28px]`) on the ink frame, with a 12px inset from the viewport edges on desktop (`mx-3`). On mobile, use 8px insets and 20px radius. This keeps the current site's best structural idea.
- **Breakpoints (Tailwind defaults):** `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Design at 390 and 1440. Check at 360, 768, 1024 and 1280.

## 4. Components

Each component lists anatomy, variants and states. Build only these. The homepage shouldn't need more.

### Button
- Variants: `primary` (mint fill, ink text), `dark` (ink fill, white text), `ghost` (transparent, 1px line border), `link` (underline on hover, arrow →).
- Sizes: `md` 44px tall (minimum touch target), `lg` 52px.
- Shape: pill. Padding: `px-5` / `px-6`. Font: Inter 15px/600.
- States: hover darkens the fill 6% (mint → `#5FEA7C`); active scales to 0.98; focus-visible gets a ring; disabled is 40% opacity with `cursor-not-allowed`.

### Nav
- Floating pill, `top-3`, `max-w-[1120px]`, `bg-white/80 backdrop-blur-md`, 1px line border, height 60px.
- Left: logo lockup. Center: Calculators, Products ▾ (Ask, Portfolio, Market, Forecast, For Kids · "soon" tags), Learn ▾ (Articles, Tax by salary, Mutual funds), For CAs. Right: "Log in" (ghost) and "Join waitlist" (primary).
- Mobile: logo + menu button. The menu opens a full-height sheet with large tap rows and the CTA pinned to the bottom.
- Gets a slight shadow once scrolled more than 8px.
- Accessible: `<nav aria-label="Main">`. Dropdowns are buttons with `aria-expanded` and close on Esc and outside click.

### Calculator card (the signature component)
- Anatomy: tab row (SIP · EMI · Tax), input rows (label, value field, slider, min/max hint), result block (big number, breakdown rows, mini chart), assumption line, "Show the math" disclosure, and a link to the full calculator.
- Input row: the label (14px muted) and an editable value field (right-aligned, tabular) sit on one line. The slider sits below on a 4px track: filled part ink, thumb 20px white with a 2px ink border. The keyboard works on both the field and the slider.
- Result: `num-xl`, with a count-up animation over 400ms on change (skip under reduced motion). Wrap in `aria-live="polite"`.
- "Show the math" expands the formula with the user's own numbers substituted in. Example: `FV = P × ((1 + i)^n − 1) / i × (1 + i)`, where P = ₹25,000, i = 1% a month, n = 120.
- States: invalid input shows a red-bordered field and a helper text with the range. The result keeps its last valid value.

### Decision tile
- White card on paper, 18px radius, 24px padding. Lucide icon in a 40px mint-wash circle, title (h3), one-line question ("Can I afford this home?"), and 2 or 3 calculator chips. The whole card is clickable to the main calculator.
- Hover: lifts 2px, shadow-card → shadow-pop, the arrow nudges 4px.

### Stat
- Value (`num-lg`), label (small, muted), optional source line. Group in a row with 1px dividers.

### Preview frame
- Wraps any app mockup. It adds a small top-left tag "Preview · app in waitlist" (12px, ink on mint-soft).

### Article row
- Category eyebrow · date · read time, title (h3, 2-line clamp), 2-line summary, "Read" link. A list layout, not a carousel. Hover underlines the title.

### Accordion (FAQ)
- Use native `<details>`/`<summary>` for zero-JS accessibility, styled. Plus/minus icon that rotates. One open by default.

### Chip
- 32px tall, pill, `bg-white` with a line border on light, or `bg-white/5` on dark. Used for salary shortcuts and sample prompts.

### Footer
- Ink background (no gradient). Four link columns, socials, store badges marked "Coming soon", the full disclosure at 13px in `subtle` on ink (5.7 : 1), and the giant "Fermor" wordmark in Space Grotesk at 20vw, clipped at the bottom edge.

## 5. Motion

Motion explains change. It never gates content.

| Pattern | Spec |
|---------|------|
| Section reveal | Fade + 16px rise, 600ms `--ease-out`, triggered once at 15% visibility. Content is **visible by default** without JS: add the hidden starting state only when JS has loaded and reduced motion is off. |
| Number change | Count-up 400ms on calculator results. Tabular figures stop jitter. |
| Chart draw | Area/line chart draws left to right, 800ms, on first view only. |
| Hover | 150ms colour/shadow, 240ms transform. |
| Tabs | Underline indicator slides 240ms. |
| Banned | Scroll-jacking, pinned sections taller than one screen, parallax on text, auto-advancing carousels, typing animations that block reading. |

Use CSS transitions plus a small `IntersectionObserver` hook. Add Framer Motion only if the chart or tab animations need it (it costs about 30KB+). The `motion` package with `LazyMotion` is fine if used.

## 6. Accessibility baseline

- Colour pairs follow the contrast table in 03. No mint text on light.
- All interactive elements are at least 44×44px on touch.
- Visible focus everywhere. Logical tab order. A skip link to `#main`.
- Sliders are native `<input type="range">` with `aria-valuetext="₹25,000 per month"`.
- Calculator results use `aria-live="polite"`.
- Gains and losses use a sign plus colour, never colour alone.
- Images have alt text. Decorative SVGs get `aria-hidden`.
- Respect `prefers-reduced-motion`.
- Lighthouse targets: Accessibility ≥ 95, Performance ≥ 90 on mobile.
