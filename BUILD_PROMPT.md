# Build Prompt: Fermor Homepage (CRED-inspired)

> Paste everything below the line into an AI coding agent (Claude Code, Cursor, etc.) opened at the root of this repo (`fermorwee/`). It is self-contained. The `docs/` folder holds the research behind every decision, and the agent is told when to read it.

---

## 0. Your role and the job

You are a senior frontend engineer and interaction designer. You are building a **new homepage for Fermor**, an Indian personal-finance company, as a two-day internship assignment. The result must be:

- a **working, production-quality Next.js site** (not a static mock),
- **polished at CRED level**: the quality bar is cred.club (dark, cinematic, big serif type, scroll-driven reveals),
- **clearly Fermor**, not a CRED clone: Fermor's logo, mint colour, real app screens, real product, honest voice,
- **fully responsive** (360px to 1920px), accessible, and fast,
- **not looking AI-generated**: no purple gradients, no glassmorphism card grids, no generic "unlock your financial future" copy, no emoji icons, no lorem ipsum.

The reviewers judge: product thinking, visual quality, frontend skill, responsiveness, attention to detail, and how well decisions are made and explained.

### Read these first (in this order) before writing code
1. `docs/07-goal-cred-benchmark.md`: **the goal.** CRED teardown, positioning flip, fold plan.
2. `docs/08-build-plan-cred-style.md`: **the build.** Stack, tokens, effect recipes, media pipeline, guardrails.
3. `assets/fermor/README.md`: every asset you may use, with sizes and usage rules.
4. `docs/01-company-research.md`: what Fermor is, audience, facts, compliance (§7).
5. `docs/06-build-plan.md` §3: finance formulas and test fixtures.
6. Skim `docs/02`, `03`, `05` for context. **Where they conflict with 07/08, 07/08 win.**

If anything in this prompt conflicts with the docs, **this prompt wins**.

---

## 1. Who Fermor is (short version)

- **Fermor Technologies Pvt. Ltd.**, India. Site: fermor.in. X: @fermor_in.
- **Live today:** 158 free financial calculators (SIP, EMI, income tax, salary, retirement…), 2,472 mutual funds tracked daily from AMFI, tax-by-salary pages, long-form guides in 7 Indian languages. Calculations run in the browser. No login wall. Funded by clearly labelled ads and affiliate links.
- **Coming (waitlist):** the Fermor app: **Ask** (AI answers grounded in your own numbers), **Portfolio** (all money in one view), **Market** (stocks, mutual funds, ETFs explained), **Forecast** (projections), **Financial health score**, **For Kids**.
- **Principles (theirs):** show the full math, not just the answer. No login wall. Ads always labelled. Transparent methodology. Mobile-first.
- **Audience:** salaried urban Indians aged 22 to 40, making decisions like starting a SIP, buying a home, choosing a tax regime, or changing jobs.
- **Not SEBI-registered.** Everything is educational. This must be visible (see §11).

**The positioning flip (the spine of the page):** CRED says *"not everyone gets it"* (a members-only club for the creditworthy). Fermor says ***clarity isn't a members-only club.*** Everyone gets the math. The closing headline is **"now everyone gets it."**

---

## 2. Tech stack (use exactly this)

- **Next.js 15** (App Router), **TypeScript** (strict), **React 19**
- **Tailwind CSS v4** (tokens in `@theme`, see §4)
- **GSAP 3 + ScrollTrigger** via `gsap` and `@gsap/react` (`useGSAP`)
- **Lenis** (`lenis`) for smooth scroll, synced to ScrollTrigger
- **next/font/google**: Fraunces (variable, include the `opsz` axis), Poppins (500, 600, 700), Inter (400, 500)
- **lucide-react** for icons
- **Vitest** for unit tests of the finance math
- No Framer Motion, no UI kits (shadcn, MUI, Chakra), no chart libraries. Charts are hand-written SVG.
- Package manager: npm.

### Setup steps
1. Scaffold in the repo root without deleting `docs/`, `assets/`, `BUILD_PROMPT.md` or `.gitignore`:
   `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm` (if it refuses because the folder isn't empty, scaffold into a temp folder and move the files in).
2. `npm i gsap @gsap/react lenis lucide-react` and `npm i -D vitest`.
3. Add `"test": "vitest run"` to `package.json` scripts.
4. Copy assets into `public/` (copy, don't move; keep `assets/fermor/` intact):

| From `assets/fermor/` | To `public/` |
|---|---|
| `logo/fermor-mark-2026.svg` | `brand/fermor-mark.svg` |
| `video/fermor-phone-hero.mp4` | see step 5 |
| `images/app-screens/screen-*.webp` | `img/screens/` |
| `images/app-screens/card-*.webp` | `img/cards/` |
| `images/app-screens/hand-phone-cutout.webp` | `img/hand-phone.webp` |
| `images/backgrounds/curtain-reveal-bg-tall.webp` | `img/curtain.webp` |
| `images/amc-logos/*.png` | `img/amc/` |

5. **Hero video:** the source is 4K, 3.8 MB, with a white background. If `ffmpeg` is available, create:
   - `public/video/hero-1080.mp4`: `ffmpeg -i assets/fermor/video/fermor-phone-hero.mp4 -vf scale=1920:-2 -c:v libx264 -crf 24 -preset slow -an -movflags +faststart public/video/hero-1080.mp4`
   - `public/video/hero-720.mp4`: same with `scale=720:-2 -crf 26`
   - `public/video/hero-poster.jpg`: `ffmpeg -ss 9.9 -i assets/fermor/video/fermor-phone-hero.mp4 -frames:v 1 -vf scale=1920:-2 public/video/hero-poster.jpg`
   If `ffmpeg` is **not** available, copy the original to `public/video/hero-1080.mp4`, extract the poster with Python + OpenCV if possible, and **tell the user** to run the ffmpeg commands later. Don't silently skip this.
6. **Never use any CRED asset.** `docs/reference/cred/` is git-ignored study material. Don't import, copy or reference anything from it.

---

## 3. File structure

```
app/
  layout.tsx              # fonts, <html lang="en-IN">, metadata, JSON-LD, <SmoothScroll>
  page.tsx                # renders the folds in order
  globals.css             # tokens + base styles (§4)
  opengraph-image.tsx     # next/og image (§12)
  icon.svg                # the mint mark (favicon)
  api/waitlist/route.ts   # mock POST endpoint (§7.10)
components/
  motion/  SmoothScroll.tsx  WordReveal.tsx  CountUp.tsx  Parallax.tsx  useReducedMotion.ts
  media/   HeroVideo.tsx  PhoneFrame.tsx
  ui/      Nav.tsx  MobileMenu.tsx  GhostButton.tsx  Button.tsx  Eyebrow.tsx  Tag.tsx  Accordion.tsx  Slider.tsx  NumberField.tsx
  calculator/  Calculator.tsx  SipPanel.tsx  EmiPanel.tsx  TaxPanel.tsx  ShowTheMath.tsx  SplitBar.tsx
  folds/   Hero.tsx  Manifesto.tsx  AppFan.tsx  LiveCalculator.tsx  WhereYouStand.tsx  ProductRail.tsx
           Privacy.tsx  Proof.tsx  Analysis.tsx  Closing.tsx  Faq.tsx  Footer.tsx
lib/       finance.ts  format.ts
content/   nav.ts  products.ts  articles.ts  faq.ts  stats.ts  footer.ts
tests/     finance.test.ts  format.test.ts
```

Rules:
- **All copy lives in `content/*.ts`**, typed. Folds are presentational.
- Folds are **Server Components** by default. Only these are client components: `SmoothScroll`, `WordReveal`, `CountUp`, `Parallax`, `HeroVideo`, `Nav`/`MobileMenu`, `Calculator` and its panels, `AppFan`, `ProductRail` (drag), `Closing` (form + curtain), `Accordion` (only if native `<details>` isn't enough).
- Keep components small and readable. Comments only where the logic isn't obvious.

---

## 4. Design tokens and base styles

`app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-void: #050606;          /* page background */
  --color-ink: #101214;           /* raised panels, text on light */
  --color-panel: #0B0D0E;         /* calculator panel */
  --color-mint: #75FB90;          /* the ONLY UI accent */
  --color-mint-deep: #1A3530;     /* green text on light (13:1 on white) */
  --color-paper: #FFFFFF;
  --color-cream: #F3EEE6;
  --color-line: rgb(255 255 255 / .08);
  --color-line-light: #E5E5E5;
  --color-gain: #22B455;          /* on dark */
  --color-loss: #D45151;          /* on dark */

  --font-display: var(--font-fraunces), Georgia, serif;
  --font-ui: var(--font-poppins), system-ui, sans-serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;

  --ease-out-expo: cubic-bezier(.16, 1, .3, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
}

html { background: var(--color-void); color: #fff; }
body { font-family: var(--font-sans); -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
::selection { background: var(--color-mint); color: var(--color-ink); }
:focus-visible { outline: 2px solid var(--color-mint); outline-offset: 3px; border-radius: 4px; }
.on-light :focus-visible { outline-color: var(--color-mint-deep); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

Utility classes (define with `@utility` or plain classes):

| Class | Spec |
|---|---|
| `display` | Fraunces 700, `font-variation-settings: "opsz" 144, "SOFT" 0`, `clamp(48px, 8vw, 120px)`, line-height .92, tracking -.03em, lowercase |
| `display-md` | same family, `clamp(36px, 5.5vw, 84px)`, lh .95 |
| `manifesto` | Fraunces 300, `clamp(28px, 4.4vw, 64px)`, lh 1.25, tracking -.01em, lowercase |
| `eyebrow` | Poppins 600, 12 to 13px, uppercase, tracking .35em, white/70 |
| `body-lg` | Inter 400, `clamp(17px, 1.4vw, 20px)`, lh 1.7, white/70 |
| `num` | Poppins 700, `font-variant-numeric: tabular-nums`, tracking -.04em |
| `t-90 / t-70 / t-50 / t-25` | white at 90/70/50/25% opacity |
| `hairline` | `border-top: 1px solid var(--color-line)` |
| `glow-mint` | `background: radial-gradient(closest-side, rgb(117 251 144 / .35), transparent); filter: blur(40px)` |

### Hard visual rules
- **Mint `#75FB90` is the only UI colour.** Any other colour comes from images (the app cards).
- **Never put mint text on white or light backgrounds** (1.3:1 contrast). On light panels, highlight with a mint *background marker* behind ink text, or use `mint-deep`.
- **Text on the dark background is at least white/50** (5.3:1). white/45 fails AA. white/25 is only for the pre-reveal state of animated words and decorative numerals.
- No drop shadows on dark. Separate surfaces with hairlines and tone.
- No gradients except: `glow-mint` behind media and numbers, coloured glows behind product rail images, and the video/curtain imagery.
- Radii: 28px for big sheets (20px on mobile), 20px for cards, 12px for inputs, pills for buttons.
- Headlines are lowercase (CRED register). Body copy is normal sentence case. The brand name is written "Fermor" in body text and "fermor" inside lowercase headlines.
- Indian number formatting everywhere (§6.3).

---

## 5. Motion system

### 5.1 `SmoothScroll` (client, in `layout.tsx`)
- Create Lenis (`lerp: 0.1`, `smoothWheel: true`). Drive it from `gsap.ticker`, call `ScrollTrigger.update` on Lenis scroll, and set `gsap.ticker.lagSmoothing(0)`.
- **Disable Lenis entirely** when `prefers-reduced-motion: reduce`, and on touch devices (`(pointer: coarse)`), where native scrolling feels better.
- Register `ScrollTrigger` once.

### 5.2 `WordReveal` (client)
- Props: `text: string`, `as?: "p" | "h2"`, `className`, `from?: number` (default .25), `restOpacity?: number` (default .7).
- **Server-render the full text.** On mount (client only, when motion is allowed), split it into `<span class="inline-block">` per word, keeping spaces. Then tween `opacity` from `from` to 1 with `stagger: 0.05`, `scrub: true`, `start: "top 75%"`, `end: "bottom 45%"`.
- With JS off or reduced motion: the text shows at `restOpacity`, fully readable. Never ship a state where text is unreadable at rest.
- Add `aria-label={text}` on the wrapper and `aria-hidden` on the spans, so screen readers read the sentence once.

### 5.3 `CountUp` (client)
- Tweens a number from 0 to the target over 1.2s, `power2.out`, once, when 60% visible. Formats with `Intl.NumberFormat('en-IN')`. Optional prefix (₹) and suffix.
- Reduced motion: render the final value immediately.
- Server-render the final value, so no-JS users and crawlers see the real number.

### 5.4 `Parallax` (client)
- Wraps children. Moves `y` by `speed * 100px` across the viewport pass (scrub). Disabled under 768px and under reduced motion.

### 5.5 Global motion rules
- Animate only `transform` and `opacity`. Clean up all ScrollTriggers on unmount (`useGSAP` does this when scoped).
- Use `gsap.matchMedia()` for desktop-only effects (`(min-width: 768px) and (prefers-reduced-motion: no-preference)`).
- **Never pin a section for more than 100vh of scroll.** No scroll-jacking that hides content.
- Section entrance (for anything without its own effect): fade + 24px rise, 0.9s, `--ease-out-expo`, once.

---

## 6. Finance logic (`lib/`) and tests: do this before the UI

### 6.1 `lib/finance.ts`
Pure, typed functions. No UI imports.

```ts
// SIP: matches fermor.in (effective monthly rate, payment at start of month)
export function sip(monthly: number, annualPct: number, years: number) {
  const i = Math.pow(1 + annualPct / 100, 1 / 12) - 1;
  const n = Math.round(years * 12);
  const value = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const invested = monthly * n;
  return { value, invested, returns: value - invested, multiplier: value / invested, monthlyRate: i, months: n };
}

export function emi(principal: number, annualPct: number, years: number) {
  const i = annualPct / 12 / 100;
  const n = Math.round(years * 12);
  const e = (principal * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  return { emi: e, total: e * n, interest: e * n - principal, monthlyRate: i, months: n };
}

// Month-by-month simulation with an extra monthly payment
export function prepay(principal: number, annualPct: number, years: number, extraMonthly: number) {
  /* returns { months, interest, interestSaved, monthsSaved } */
}

// Indian income tax, salaried individual below 60, FY 2026-27
export function incomeTax(grossSalary: number, opts: { regime: "new" | "old"; deductions80C?: number }) {
  /* returns { taxable, slabTax, rebate, cess, total } */
}

// Wealth projection used by the forecast/sparkline: yearly points for SIP + starting corpus
export function projection(start: number, monthly: number, annualPct: number, years: number) {
  /* returns Array<{ year, invested, value }> */
}
```

**Tax rules to implement:**
- **New regime:** standard deduction ₹75,000. Slabs on taxable income: 0 to 4L 0%, 4 to 8L 5%, 8 to 12L 10%, 12 to 16L 15%, 16 to 20L 20%, 20 to 24L 25%, above 24L 30%. **87A rebate:** if taxable ≤ ₹12,00,000, tax = 0. **Marginal relief:** if taxable > ₹12,00,000, tax = min(slabTax, taxable − 12,00,000). Then add 4% cess.
- **Old regime:** standard deduction ₹50,000. Subtract 80C (capped at ₹1,50,000). Slabs: 0 to 2.5L 0%, 2.5 to 5L 5%, 5 to 10L 20%, above 10L 30%. **87A:** if taxable ≤ ₹5,00,000, tax = 0. Add 4% cess.
- Ignore surcharge (the inputs stay ≤ ₹50L). Clamp the salary input to ₹50,00,000 and note it in the UI hint.
- Round the final tax to the nearest rupee.

### 6.2 Test fixtures (`tests/finance.test.ts`). All must pass.

| Call | Expected |
|---|---|
| `sip(25000, 12, 10).value` | ≈ 56,00,897 (±1). Matches fermor.in's own SIP calculator. |
| `sip(10000, 12, 10)` | value ≈ 22,40,359, invested 12,00,000, multiplier ≈ 1.87 |
| `emi(5000000, 8.5, 20)` | emi ≈ 43,391, interest ≈ 54,13,879 |
| `prepay(5000000, 8.5, 20, 5000)` | months = 187, interest ≈ 40,24,629, interestSaved ≈ 13,89,250, monthsSaved = 53 |
| `incomeTax(1200000, {regime:"new"}).total` | 0 |
| `incomeTax(1280000, {regime:"new"}).total` | 5,200 |
| `incomeTax(1500000, {regime:"new"}).total` | 97,500 |
| `incomeTax(1200000, {regime:"old", deductions80C:150000}).total` | 1,17,000 |
| `incomeTax(1500000, {regime:"old", deductions80C:150000}).total` | 2,10,600 |

Use `toBeCloseTo` with a ±1 rupee tolerance for floating results. If a fixture fails, **fix the function, not the fixture**. These numbers were checked by hand and against fermor.in.

### 6.3 `lib/format.ts`
- `inr(n)` → `₹22,40,359` (`Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })`, prefix ₹)
- `inrCompact(n)` → `₹22.40 L`, `₹1.04 Cr`, `₹43,391` (below ₹1 lakh, show full). Two decimals. Space before L/Cr.
- `pct(n, digits=1)` → `12%` / `+1.6%`. Use a true minus sign `−` (U+2212) for negatives.
- `duration(months)` → `4 years 5 months`.
- Test these too.

---

## 7. The page, fold by fold

Global layout: `<header>` (nav) → `<main id="main">` (folds) → `<footer>`. A "Skip to content" link comes first. Each fold is a `<section>` with an `aria-labelledby` heading. Content max width 1200px (`mx-auto px-4 sm:px-6 lg:px-8`). Folds are separated by `hairline`s. Desktop vertical padding is about `py-32` to `py-40`; mobile `py-20`.

### 7.0 Nav
- **Desktop:** fixed, top 16px, centred, max-width 1120px, height 56px, `bg-black/40 backdrop-blur-md`, 1px `line` border, pill radius.
  - Left: mint mark (24px tall) + "Fermor" in Poppins 600, 18px.
  - Centre links (Poppins 500, 14px, white/70 → white on hover): **calculators** (→ `https://fermor.in/calculators`), **products** (scrolls to `#products`), **learn** (→ `https://fermor.in/blogs`), **for CAs** (→ `https://fermor.in/calculators` with a `title`, since there's no public CA URL).
  - Right: ghost "log in" (→ `https://fermor.in/sign-in`) + mint pill "join waitlist" (ink text, scrolls to `#waitlist`).
- **Behaviour:** over the white hero sheet, the nav switches to a light variant (`bg-white/70`, ink text) using an IntersectionObserver on the hero. It switches back to dark after the hero.
- **Mobile (< 768px):** mark + "Fermor" + a 44px menu button. The menu is a full-screen void sheet with large Fraunces links (36px lowercase), staggered in. "join waitlist" is pinned at the bottom. Focus is trapped inside, Esc closes, body scroll is locked, and `aria-expanded` is set on the button.

### 7.1 Hero: white sheet with the phone video
- **Structure:** a white sheet (`bg-paper text-ink on-light`, radius 28px desktop / 20px mobile, margin 12px from the viewport edges, height `min(100svh − 24px, 980px)` on desktop, auto on mobile) inside the void page.
- **Copy (left, or top on mobile):**
  - Eyebrow (ink/60): `PERSONAL FINANCE, FOR INDIA`
  - H1 (`display`, ink): **money, with the <mark>math</mark> shown.** The word "math" gets a mint marker: `background: linear-gradient(transparent 58%, #75FB90 58%, #75FB90 90%, transparent 90%)`. The text stays ink.
  - Lead (Inter 18 to 20px, ink/70, max 46ch): "Fermor turns SIPs, loans, tax and salary into clear numbers. 158 free calculators today, an app that explains every rupee tomorrow. Built for India. No login, no sales pitch."
  - CTAs: dark pill "explore calculators →" (ink bg, white text, → `https://fermor.in/calculators`) + text link "join the app waitlist" (ink, underline on hover, → `#waitlist`).
  - Micro trust line (13px, ink/60): `158 calculators · runs in your browser · ₹0 to use`
- **Video (right, or below on mobile):** `HeroVideo`:
  - `<video autoPlay muted playsInline preload="auto" poster="/video/hero-poster.jpg">` with `<source src="/video/hero-720.mp4" media="(max-width: 767px)">` and `<source src="/video/hero-1080.mp4">`. **No loop.** It plays once and holds the last frame (phone upright).
  - Small round pause/play button at bottom right of the video (ink/10 bg, 36px), `aria-label` toggles. Required by WCAG 2.2.2.
  - Reduced motion: don't autoplay. Show the poster, and show the play button.
  - The video background is pure white, so it blends into the sheet. Don't add borders.
- **Scroll effect ("lights off"):** desktop + motion allowed. Scrub from `top top` to `bottom top`: the sheet goes `scale 1 → 0.94`, `borderRadius 28 → 48px`, `opacity 1 → .85`. The void shows around it as it shrinks.
- **Floating card (desktop only):** at bottom left of the video, a small ink card (radius 16px) with eyebrow "NET WORTH", value `₹12,48,230` (`num`, white; the same figure as the app screen in the video), a tiny mint sparkline, and a "preview" tag. Don't add a % change figure. Nothing on the page is invented. It enters with a 0.6s delay and a gentle `Parallax` (speed 0.15).

### 7.2 Manifesto
- Void background. Centred column, max 820px.
- Eyebrow: `NOT A MEMBERS-ONLY CLUB.`
- `WordReveal` text (`manifesto` class): "most money decisions in india are made on a guess. a bank's number. a friend's tip. a spreadsheet nobody checks. we think you deserve the working, not just the answer. so fermor shows the math. every time, to everyone."
- Below, after 48px: a small signature line in Poppins 500, 14px, white/50: `— financial clarity. real momentum.`

### 7.3 App fan: "every rupee, explained."
- `id="products"` sits on this section.
- Eyebrow `THE FERMOR APP · COMING SOON` + `display-md` heading **every rupee, explained.** + `body-lg` sub: "Your accounts, your spending, your investments, with the reasoning shown. Join the waitlist to get it first."
- Visual: 4 `PhoneFrame`s (CSS device: 44px outer radius, 10px `#0B0B0C` bezel, 1px `#2A2A2A` outer ring, dynamic-island pill, inner screen radius 34px, aspect ratio 9/19.5, width `clamp(180px, 18vw, 260px)`) containing `screen-goals`, `screen-stocks-v2`, `screen-mutualfunds`, `screen-etfs` (use `next/image`, `sizes` set, alt text describing each screen).
- Behind them: one large `glow-mint` (60% opacity).
- **Effect (desktop):** the section pins for 100vh. The phones start stacked (centre, slight offsets) and fan out to `x: -36%, -12%, 12%, 36%`, `rotate: -14, -5, 5, 14deg`, `y: 40, 0, 0, 40px`, `scrub`. The middle two sit on top (z-index).
- **Mobile:** no pin. The phones sit in a horizontally scrollable, snap-aligned row with a slight overlap. The fan tween plays once on enter.
- Each phone has a tiny caption under it (12px, white/50): "home", "stocks", "mutual funds", "ETFs".
- Corner tag on the section: `preview · app in waitlist`.

### 7.4 Live calculator: "run it before you sign it."
This is the working core of the page. It must be flawless.

- Eyebrow `TRY IT · NO LOGIN` + `display-md` **run it before you sign it.** + sub "Real numbers, real formulas, the same math as Fermor's 158 calculators."
- **Panel:** `bg-panel`, 1px `line` border, radius 28px, padding 24 to 40px. Two columns on desktop (inputs 5/12, result 7/12). Stacked on mobile.
- **Tabs** (`role="tablist"`, arrow-key navigation, Poppins 500 15px, mint underline indicator that slides 240ms): `SIP` · `home loan` · `income tax`.
- **Input row:** label (Inter 14px, white/70) and an editable value field on one line. The field is right-aligned `num`, 18px, transparent with a bottom hairline that turns mint on focus. It accepts typed input with Indian formatting and parses back to a number. A native `<input type="range">` sits below: 4px track, filled part mint (CSS gradient driven by a `--fill` custom property), 22px white thumb, 44px touch area, `aria-valuetext` like "₹10,000 per month". Min/max hint below (12px, white/50).
- **SIP tab:** monthly amount ₹500 to ₹2,00,000 (step 500, default 10,000). Expected return 1 to 30% (step 0.5, default 12). Period 1 to 40 years (default 10), plus year chips `5Y 10Y 15Y 20Y 25Y`.
  - Result: eyebrow `IN 10 YEARS` (dynamic), big `num` value `₹22,40,359` at `clamp(44px, 6vw, 88px)` with `glow-mint` behind it, `CountUp`-style tween on change (300ms, no tween under reduced motion).
  - Rows (hairline-separated, label white/70, value white `num`): Invested `₹12,00,000` · Est. returns `₹10,40,359` (gain green) · Wealth multiplier `1.87×`.
  - `SplitBar`: an 8px bar, invested part white/25, returns part mint, with a legend.
  - Sparkline: an SVG area chart of yearly `projection()` values, 120px tall, mint stroke 2px, mint fill at 15%, white/25 dashed invested line. It draws on first view.
- **Home loan tab:** amount ₹1,00,000 to ₹5,00,00,000 (default 50,00,000). Rate 6 to 15% (step 0.05, default 8.5). Tenure 1 to 30 years (default 20). Plus a "prepay extra each month" field, ₹0 to ₹1,00,000 (default 0).
  - Result: `₹43,391 / month`. Rows: Total interest `₹54,13,879` · Total paid `₹1,04,13,879` · Interest as % of loan `108%`.
  - If prepay > 0, show an insight card (mint left border 2px, white/90): "Paying ₹5,000 more each month saves about **₹13.89 L** in interest and closes the loan **4 years 5 months** early."
- **Income tax tab:** gross annual salary ₹0 to ₹50,00,000 (default 12,00,000). 80C investments ₹0 to ₹1,50,000 (default 1,50,000, used for the old regime only).
  - Result: two columns, **New regime `₹0`** and **Old regime `₹1,17,000`**. The cheaper one gets a mint `BETTER` tag. The verdict line: "The new regime saves you ₹1,17,000 at this salary."
  - Hint: "FY 2026-27, salaried, below 60. Surcharge not included."
- **"show the math" disclosure** (`<details>`, below the result, Poppins 500 14px with a chevron):
  - SIP: `FV = P × [((1 + i)ⁿ − 1) / i] × (1 + i)`, then the same line with the user's numbers substituted (`P = ₹10,000, i = 0.949% a month (12% a year, compounded monthly), n = 120 months`), then the result. Use a monospace-feel layout (Inter with tabular figures, generous line-height).
  - EMI: `EMI = P × i × (1 + i)ⁿ / ((1 + i)ⁿ − 1)` with substitutions.
  - Tax: a slab-by-slab table for the selected regime (slab, rate, tax in that slab), then rebate/marginal relief, cess, total.
- **Footer of panel:** the assumption line (12px, white/50): "Results are indicative and for education only. Not financial advice." plus a link "open the full SIP calculator →" (per tab: `https://fermor.in/calculators/sip-calculator`, `/home-loan-calculator`, `/income-tax-calculator`).
- **Validation:** typed values outside the range clamp on blur. While invalid, the field shows a loss-red bottom border and a helper "Enter between ₹500 and ₹2,00,000". The result keeps its last valid value. Never show `NaN`, `Infinity` or negative money.
- The result container has `aria-live="polite"` (debounced 300ms, so it doesn't spam screen readers while dragging).

### 7.5 Where you stand: "your whole money life, on one screen."
- Two columns on desktop. Left: eyebrow `PORTFOLIO · PREVIEW`, `display-md` **your whole money life, on one screen.**, `body-lg`: "Income, investments, spending, assets and goals, connected. Fermor does the math on your actual life, and tells you the two changes that matter most."
  Then a list of 3 points (Inter 16px, white/70, mint 6px dot): "A financial health score out of 100, explained" · "Where your money went this month, by category" · "Goals that update when your numbers do".
- Right: a loose stack of 5 cards: `card-income`, `card-investments`, `card-expenses`, `card-assets`, `card-goals` (`next/image`, radius 20px). They're positioned as an overlapping collage with different rotations (−4° to 5°). Each is wrapped in `Parallax` with a different speed (0.1 to 0.35), so they drift at different rates.
- Mobile: a 2-column grid of the 4 landscape cards, then `card-assets` full width. No parallax.
- `Tag` "preview" at top right of the collage.

### 7.6 Product rail: "start where you are."
- Eyebrow `WHAT FERMOR DOES` + `display-md` **start where you are.**
- A horizontal rail of 6 tall cards (`min(78vw, 340px)` wide, 500px tall, radius 24px, bg `#0B0D0E`, 1px `line` border, overflow hidden). Each card:
  - Top 55%: an image on a coloured radial glow (`radial-gradient(60% 60% at 50% 40%, <glow> 0%, transparent 70%)`).
  - A tag at top left: `LIVE` (mint bg, ink text) or `SOON` (white/10 bg, white/70 text).
  - Title: Fraunces 600, 32px, lowercase. One-line description: Inter 15px, white/70.
  - Ghost button `KNOW MORE →` (1px white/30 border, Poppins 600 12px, tracking .25em).

| Card | Tag | Image | Glow | Description | Link |
|---|---|---|---|---|---|
| calculators | LIVE | `card-income.webp` | `rgb(117 251 144 / .45)` | 158 free tools for SIP, EMI, tax, salary and retirement. | fermor.in/calculators |
| tax by salary | LIVE | `card-goals.webp` | `rgb(140 200 255 / .35)` | Your exact tax at every salary, old regime vs new. | fermor.in/tax/income-tax-on-12-lakh-salary |
| ask | SOON | `screen-goals.webp` (in a mini PhoneFrame) | `rgb(117 251 144 / .30)` | Ask about your money. Get answers with the working shown. | #waitlist |
| portfolio | SOON | `card-investments.webp` | `rgb(75 91 255 / .45)` | Every account and investment in one view. | #waitlist |
| market | SOON | `screen-stocks-v2.webp` (mini PhoneFrame) | `rgb(255 255 255 / .18)` | Stocks, funds and ETFs, explained before you buy. | #waitlist |
| health score | SOON | `card-expenses.webp` | `rgb(212 81 81 / .40)` | Know where you stand, out of 100. | #waitlist |

- **Interaction:** native horizontal scroll with `scroll-snap-type: x mandatory`. On desktop, also pointer drag-to-scroll (with momentum off, `cursor: grab/grabbing`), plus prev/next round buttons (44px, ghost) at the top right of the section that disable at the ends. Hide the scrollbar visually but keep it keyboard reachable (the rail is focusable, `tabindex=0`, `aria-label="Fermor products"`). Cards lift 6px and their glow intensifies on hover.

### 7.7 Privacy: "your numbers aren't our business."
- Centred. A 56px outline shield icon (lucide `ShieldCheck`, 1.25px stroke, white/90) with the mint mark small inside or beside it.
- Eyebrow `YOUR NUMBERS AREN'T OUR BUSINESS.`
- `WordReveal` in Poppins 500, `clamp(24px, 3.2vw, 44px)`, lh 1.35, from .15 to 1, rest .7: "every calculation runs in your browser. nothing you type is sent to us to get a result. no login wall. ads and partner links are always labelled."
- Below: 3 inline facts (Inter 14px, white/70, lucide icons 16px): `Lock` "Runs on your device" · `UserX` "No account needed" · `Tag` "Ads always labelled".

### 7.8 Proof: "the math checks out."
- A band with top/bottom hairlines and a subtle vertical gradient `#0B0D0E → #050606`.
- Left: eyebrow `FERMOR TODAY` + `display-md` **the math checks out.**
- Right: a 2×2 grid of stats. Each stat: a big `num` at `clamp(56px, 7vw, 104px)` with `CountUp`, a small suffix in Poppins 600 at 40% of the size, and a label (eyebrow style, white/70):
  - **158** "FREE CALCULATORS"
  - **2,472** "MUTUAL FUNDS TRACKED DAILY"
  - **7** "INDIAN LANGUAGES"
  - **₹0** "TO USE. NO LOGIN WALL." (no count-up for this one)
- Below the stats: an AMC logo strip (axis, hdfc, icici-prudential, invesco, motilal-oswal, sbi, tata, uti). Logos are 28px tall with `filter: grayscale(1) brightness(1.6)` at 50% opacity, going to full opacity on hover, and they marquee slowly (40s loop, paused on hover and under reduced motion). Caption: "Funds from every AMC in India. Logos are for identification only."

### 7.9 Analysis: "news, with the math done."
- Eyebrow `LATEST ANALYSIS` + `display-md` **news, with the math done.** + link "all articles →" (fermor.in/blogs).
- Layout: a featured article on the left (7/12), 3 compact rows on the right (5/12). Stacked on mobile.
- Featured: a large card with a mint-glow top area containing the category in eyebrow style. The title is Fraunces 600 at `clamp(26px, 2.6vw, 38px)`, lowercase not required (keep the article's case). Then the meta line (Inter 13px, white/50: `Stock Market · Sep 29, 2026 · 13 min read`), a 3-line summary at white/70, and "read the analysis →".
- Rows: hairline-separated. Category · date in eyebrow style, title in Poppins 600 18px, an arrow that slides 4px on hover, and the whole row brightens.
- Content (`content/articles.ts`), real articles:
  1. **Featured:** "Sensex Nifty Crash September 2026: 7 Straight Weekly Losses, Why Market Is Down". Stock Market · Sep 29, 2026 · 13 min. Summary: "The Nifty logged its seventh straight weekly fall, matching its longest losing streak since 2020. What's driving it, and what could turn flows positive again." Slug `sensex-nifty-crash-september-2026`.
  2. "UPI Charges Above Rs 2,000: New MDR Rule Explained". Regulation · Sep 22, 2026 · 13 min. Slug `upi-charges-above-2000`.
  3. "Bank Strike September 28-30, 2026: 5 Days Banks Closed, What Works". Regulation · Sep 25, 2026 · 12 min. Slug `bank-strike-september-2026`.
  4. "Income Tax Rebate Under Section 87A: Limits and Marginal Relief". Income Tax · Jul 30, 2026 · 11 min. Slug `section-87a-rebate`.
  - Links go to `https://fermor.in/blogs/{slug}` (`target="_blank" rel="noopener"`).
- Footer line (14px, white/50): "Guides also in हिन्दी · मराठी · తెలుగు · ਪੰਜਾਬੀ · বাংলা".

### 7.10 Closing: "now everyone gets it." (`id="waitlist"`)
- A cream panel (`bg-cream text-ink on-light`, radius 28px, 12px inset), about 90vh on desktop.
- **Curtain effect (desktop + motion):** two absolutely positioned halves of `curtain.webp` (`object-fit: cover`) cover the panel. On scroll (scrub, `top 70%` → `top 10%`) they slide `xPercent: -100` and `100`, revealing the content. Mobile and reduced motion: no curtain. The silk image shows as a soft background at 35% opacity behind the content.
- **Content** (centred, max 640px):
  - Mint mark 40px.
  - `display` (ink): **now everyone gets it.**
  - Sub (Inter 18px, ink/70): "Clarity isn't a members-only club. Join the waitlist for the Fermor app and be first to get your free financial health check."
  - **Form:** email input (56px tall, white bg, 1px ink/15 border, radius pill, Inter 16px, `autocomplete="email"`, a real `<label>`, visually hidden if needed) + submit button "join waitlist" (ink bg, white text, pill). Side by side on desktop, stacked on mobile.
  - States: idle → submitting (button shows a spinner, disabled) → success (form replaced by "you're on the list. we'll write once, when it's ready." with a mint check) → error (inline message under the input, `role="alert"`, e.g. "That email doesn't look right." or "Something went wrong. Try again.").
  - Client validation with a sensible regex plus `type="email"`. Server validation too.
  - Under the form (12px, ink/60): "One email when the app opens. No spam. No sharing."
  - App store row: two outline badges "App Store · coming soon" and "Google Play · coming soon" (built in HTML, not copied images), `aria-disabled`.
- **`app/api/waitlist/route.ts`:** `POST` with a JSON `{ email }` body. Validate (≤ 254 chars, valid shape). Return `400 { error }` or `200 { ok: true }`. Don't store anything. Add a code comment saying it's a mock and where real storage would go. Add a 600ms artificial delay only in development.

### 7.11 FAQ
- A two-column grid on desktop (heading 4/12, list 8/12). Eyebrow `QUESTIONS` + `display-md` **asked, answered.**
- Native `<details name="faq">` elements (exclusive accordion), each a hairline row. Summary: Poppins 500, 20px, white/90, with a plus icon that rotates 45° when open. Answer: Inter 17px, white/70, max 62ch, with a height+opacity transition (use `interpolate-size: allow-keywords` where supported, with a graceful fallback).
- The first item is open by default. Content (`content/faq.ts`, use these exactly):
  1. **What does Fermor actually do?** Fermor runs the math behind everyday money decisions. Calculators for loans, savings and tax, plus plain analysis of what the numbers mean, so you can compare options before you commit to one.
  2. **How should I use the calculators?** Start with the numbers you already know, then move one input at a time and watch what it does to the result. Seeing how sensitive an outcome is to a single change is usually more useful than any one figure.
  3. **Do the tools give financial advice?** No. Fermor is educational and is not a SEBI-registered adviser. The tools show you the arithmetic and the trade-offs; the decision, and any advice you want on it, stays with you and your adviser.
  4. **What happens to the numbers I enter?** Calculations run in your browser. Your inputs stay on your device unless you choose to save a result to an account, and you can clear a saved calculation whenever you want.
  5. **Is the app live?** Not yet. The calculators and guides are live and free today. The app, with Ask, Portfolio, Market and the health check, is in a waitlist. Join it and we'll email you once when it opens.
  6. **How do I get started?** Pick the calculator closest to the decision in front of you and run it once with real numbers. Everything on Fermor is free to use, and you only need an account if you want your results kept between visits.
- Add `FAQPage` JSON-LD built from the same content.

### 7.12 Footer
- Void background, top hairline, `py-20`.
- Row 1: mint mark + "Fermor" on the left. On the right, four columns with uppercase tracked headings (Poppins 600, 12px, tracking .3em, white/90) and links (Inter 15px, white/50 → white on hover):
  - **CALCULATORS:** SIP, EMI, Home loan, Income tax, PPF, FD, All 158 →
  - **LEARN:** Articles, Tax by salary (`/tax/by-city` for city), Mutual funds
  - **COMPANY:** About, Contact (`mailto:fermor.in.contact@gmail.com`), For CAs
  - **LEGAL:** Privacy, Terms
  - All point to real `https://fermor.in/...` URLs from `docs/reference/sitemap-urls.txt`.
- Row 2: social icons (X → `https://twitter.com/fermor_in`; LinkedIn, YouTube and Threads as `#` with a `// TODO: real URL` comment in `content/footer.ts`). 40px round ghost buttons with `aria-label`s.
- Row 3: **the full disclosure** at 13px, white/50, max 90ch: "Fermor Technologies Pvt. Ltd. is registered in India and operates fermor.in, a financial calculator and education platform for Indian users. Fermor is not a SEBI-registered investment adviser and does not provide personalized financial, investment, or tax advice. All calculators, content, and tools on this platform are provided for educational and informational purposes only; individual results may vary."
- Row 4: `© 2026 Fermor Technologies Pvt. Ltd. · Made in India` + "Concept homepage by [your name] · not the official site" (this matters: it's an assignment, so don't impersonate).
- **Giant wordmark:** "fermor" in Fraunces 700 lowercase at `22vw`, line-height .8, `color: rgb(255 255 255 / .06)`, clipped at the bottom of the footer (`overflow: hidden`, translated 20% down), `aria-hidden`. A thin mint line, 2px × 80px, sits above it, centred.

---

## 8. Responsive requirements

Design for **390px** and **1440px**. Verify at 360, 390, 768, 1024, 1280, 1440 and 1920.

- No horizontal page scroll at any width (only the intended rails scroll).
- Touch targets ≥ 44×44px. Slider thumbs have a 44px hit area.
- The hero H1 wraps to at most 3 lines at 360px.
- Pins, parallax, curtain and the hero scale are desktop-only (`min-width: 768px`). Mobile gets simple fade-ins.
- Use `svh`/`dvh` for full-height sections, never `vh` alone, because of mobile browser bars.
- Images use `next/image` with correct `sizes`. Only the hero poster gets `priority`.
- Test the mobile menu, calculator, rail and form with touch emulation.

---

## 9. Accessibility (must pass)

- One `<h1>` (hero). Each fold has an `<h2>`. Logical order.
- Landmarks: `header`, `nav[aria-label="Main"]`, `main#main`, `footer`. Skip link first.
- Every interactive element is keyboard reachable with a visible mint focus ring (`mint-deep` on light panels).
- Tabs follow the WAI-ARIA tabs pattern. The accordion is native `<details>`. The menu traps focus and closes on Esc.
- Calculator: labels tied to inputs, `aria-valuetext` on sliders, debounced `aria-live` results.
- Video: muted, pausable control, no autoplay under reduced motion.
- Colour: no mint text on light. Text on dark ≥ white/50. Gain/loss always carry a sign or arrow (▲/▼, +/−), never colour alone.
- `prefers-reduced-motion`: no Lenis, no scrub effects, no marquee, no count-up. Content is fully visible.
- All images have meaningful `alt` (decorative ones `alt=""`).
- `lang="en-IN"`. Devanagari/Telugu/etc. snippets get `lang` attributes (`hi`, `mr`, `te`, `pa`, `bn`).

---

## 10. Performance budget

- Lighthouse (mobile, production build): **Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.**
- First-load JS ≤ 180 KB gzip for `/`.
- LCP element is the hero H1 or the poster, under 2.5s on simulated 4G.
- CLS < 0.05. Reserve space for every image and video (width/height or aspect-ratio).
- Videos: `preload="metadata"` on mobile, mobile source ≤ 1 MB. Pause off-screen videos with IntersectionObserver.
- Fonts: only the weights listed in §2, `display: "swap"`, Latin subset.
- Import GSAP plugins once. Dynamically import anything heavy that sits below the fold if needed.

---

## 11. Content and compliance rules

- Every number is either computed by `lib/finance.ts` or comes from Fermor's real data listed here. **Don't invent statistics, testimonials, ratings, user counts or press logos.**
- Every app mockup or app feature carries a "preview" / "soon" / "waitlist" label. Nothing suggests the app is live. No "invest now" buttons.
- Show "Results are indicative and for education only. Not financial advice." near the calculator.
- Don't claim "no ads" (fermor.in runs ads). "No paywall" and "no login wall" are fine.
- The footer disclosure appears exactly as given.
- Voice: short, calm, specific. Banned words: unlock, empower, seamless, revolutionize, supercharge, skyrocket, game-changer, cutting-edge, leverage, elevate, journey.
- Headlines lowercase, body sentence case, Indian English (lakh, crore, CTC, in-hand, regime).

---

## 12. SEO and metadata

- `title`: "Fermor: money, with the math shown"
- `description`: "158 free calculators for SIP, EMI, income tax and salary, built for India. Run the numbers before you decide. No login, the math is always shown."
- Open Graph + Twitter (`summary_large_image`, site `@fermor_in`).
- `app/opengraph-image.tsx` with `next/og`, 1200×630: void background, mint mark top left, "money, with the math shown." in a serif (load Fraunces for the OG route), and a bottom line "₹10,000/month for 10 years → ₹22,40,359".
- JSON-LD: `Organization` (name Fermor, url https://fermor.in, logo, sameAs X), `WebSite`, `FAQPage`.
- `app/icon.svg` = the mint mark. A `theme-color` meta of `#050606`.
- `robots` allow. Canonical points to the deployed URL (read it from `NEXT_PUBLIC_SITE_URL`, falling back to `http://localhost:3000`).

---

## 13. Working process (follow it, and report after each phase)

Work in phases. **After each phase, run `npm run lint`, `npx tsc --noEmit` and `npm test`, fix everything, then report what's done and what's next.** Commit after each phase with a conventional message (`feat: ...`, `chore: ...`) if the user approves commits.

1. **Phase 1: Foundation.** Scaffold, dependencies, assets into `public/`, video encodes, fonts, tokens, `globals.css`, empty `page.tsx` with fold placeholders, `SmoothScroll`.
2. **Phase 2: Logic.** `lib/finance.ts`, `lib/format.ts`, all tests green.
3. **Phase 3: Primitives.** Nav + mobile menu, buttons, eyebrow, tag, slider, number field, tabs, `WordReveal`, `CountUp`, `Parallax`, `PhoneFrame`, `HeroVideo`.
4. **Phase 4: Top half.** Hero, Manifesto, App fan, **Live calculator** (the most important fold; spend the most care here).
5. **Phase 5: Bottom half.** Where you stand, Product rail, Privacy, Proof, Analysis, Closing + API route, FAQ, Footer.
6. **Phase 6: Responsive pass.** Check every breakpoint in §8 in the browser and fix.
7. **Phase 7: Quality pass.** Accessibility (§9), keyboard-only run, reduced-motion run, JS-disabled run (content must be readable), Lighthouse on `npm run build && npm start` (§10). Fix until the budgets pass.
8. **Phase 8: Ship prep.** Metadata, OG image, JSON-LD, `README.md` (§14), and a final full-page screenshot at 1440 and 390 saved to `docs/screenshots/`. If the Vercel CLI is installed and logged in, ask the user before deploying. Otherwise, give them the exact deploy steps.

Use the browser preview to **look at the page** after each visual phase. Compare against `docs/07` §5 (the quality checklist), and iterate on spacing, type sizes and alignment until it feels intentional. Don't stop at "it renders".

**If you're running out of time, cut in this order:** curtain animation (static image instead) → app fan pin (static fan) → Lenis → AMC marquee (static row) → analysis fold. **Never cut** the calculator, responsiveness, accessibility or the disclosure.

---

## 14. README.md (write it in Phase 8)

Write it in plain, first-person English, as the candidate. Under 600 words. Include:

1. **Title + live URL + repo URL** (placeholders if not deployed yet).
2. **Setup:** `npm install`, `npm run dev`, `npm test`, `npm run build`. Node version.
3. **What I built and why** (product thinking):
   - Who the homepage is for (returning calculator users, referred visitors, evaluators).
   - Lead with what's live (calculators) and treat the app honestly as a waitlist.
   - The positioning flip: CRED says "not everyone gets it"; Fermor says clarity isn't a members-only club.
   - Why a working calculator sits on the homepage: it proves "show the math" instead of claiming it.
4. **Design decisions:** CRED as the craft benchmark (dark, editorial serif, scroll-told story) with Fermor's own mark, mint, screens and video. One accent colour. Fraunces + Poppins + Inter and why. The contrast rules (no mint on light, white/50 minimum).
5. **Technical notes:** the stack, why GSAP + Lenis, server vs client components, finance math matching fermor.in's formulas (SIP uses an effective monthly rate), unit tests, the mock waitlist endpoint, the media pipeline.
6. **Accessibility and performance:** what was done, plus the Lighthouse scores.
7. **Assets and credits:** logo, video and app images are Fermor's, from fermor.in. Fonts are OFL. No CRED assets used. This is a concept, not the official site.
8. **What I'd do next:** real waitlist storage, calculator search across all 158, a Hindi version, a health-check flow.

---

## 15. Definition of done

- [ ] `npm run build` succeeds with zero type errors and zero ESLint errors. `npm test` is all green.
- [ ] All 12 folds are implemented with the copy above, and look intentional at 360, 390, 768, 1024, 1440 and 1920.
- [ ] The calculator matches every fixture in §6.2 in the UI as well as in tests (spot-check the defaults).
- [ ] Keyboard-only, reduced-motion and JS-disabled runs all work. Text is readable at rest everywhere.
- [ ] Lighthouse budgets from §10 are met on a production build. Record the scores in the README.
- [ ] No CRED assets, no invented stats, no lorem ipsum, no console errors, no hydration warnings.
- [ ] The disclosure, the "not financial advice" line and the preview labels are present.
- [ ] README written. Screenshots saved to `docs/screenshots/`.
- [ ] Final report to the user: what was built, what was cut (if anything), known issues, and the deploy steps.
