# 06. Build Plan

## 1. Stack

| Choice | Why |
|--------|-----|
| **Next.js 15 (App Router) + TypeScript** | Same as fermor.in (it runs Next.js on Vercel). Shows I can work in their stack. Server components keep JS small. |
| **Tailwind CSS v4** | Tokens live in `@theme` (see 04), fast to build, easy for reviewers to read. |
| **next/font** | Self-hosted Inter, Space Grotesk, Instrument Serif. No layout shift. |
| **lucide-react** | One icon set, tree-shaken. |
| **No chart library** at first | Hand-built SVG for the mini bar, the donut and the forecast area chart. Under 2KB each, fully styleable. Fall back to Recharts only if time runs out. |
| **No animation library** at first | CSS transitions plus a 20-line `useInView` hook. Add `motion` only if needed. |
| **Vitest** | Unit tests for the finance math (SIP, EMI, tax). A wrong number would undo the whole brand promise. |
| **Vercel** | Zero-config deploy, preview URLs, same host as Fermor. |

## 2. Folder structure

```
fermorwee/
├─ app/
│  ├─ layout.tsx            # fonts, metadata, JSON-LD
│  ├─ page.tsx              # composes the sections
│  ├─ globals.css           # tokens (04 §1)
│  ├─ opengraph-image.tsx   # generated OG image
│  └─ api/waitlist/route.ts # mock POST, validates email
├─ components/
│  ├─ ui/                   # Button, Chip, Tabs, Slider, NumberField, Accordion, PreviewTag, Stat
│  ├─ calculator/           # CalculatorCard, SipPanel, EmiPanel, TaxPanel, ShowTheMath, MiniBar
│  ├─ charts/               # AreaChart, Donut (SVG)
│  ├─ mockups/              # PhoneFrame, AskMock, PortfolioMock, HealthMock, MarketMock
│  └─ sections/             # Nav, Hero, Decisions, ShowTheMath, SalaryTax, AppShowcase,
│                           # Forecast, Analysis, Waitlist, Faq, Footer
├─ lib/
│  ├─ finance.ts            # sip(), emi(), prepay(), incomeTax()  (pure functions)
│  ├─ format.ts             # inr(), inrCompact() → "₹22.40 L", pct()
│  └─ use-in-view.ts
├─ content/
│  ├─ decisions.ts          # 6 tiles with calculator links
│  ├─ articles.ts           # 4 real articles
│  ├─ faq.ts                # 6 Q&As
│  └─ nav.ts
├─ tests/finance.test.ts
├─ public/fermor-mark.svg
├─ docs/                    # these planning docs
└─ README.md
```

All copy sits in `content/`, so the sections stay presentational.

## 3. Finance functions (write and test these first)

```ts
// lib/finance.ts
// SIP: matches fermor.in. Effective monthly rate, payment at the start of the month.
export function sip(monthly: number, annualPct: number, years: number) {
  const i = Math.pow(1 + annualPct / 100, 1 / 12) - 1;
  const n = years * 12;
  const value = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const invested = monthly * n;
  return { value, invested, returns: value - invested };
}

export function emi(principal: number, annualPct: number, years: number) {
  const i = annualPct / 12 / 100;
  const n = years * 12;
  const e = (principal * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  return { emi: e, total: e * n, interest: e * n - principal };
}
```

**Test fixtures (verified against fermor.in and by hand):**

| Function | Input | Expected |
|----------|-------|----------|
| `sip` | 25,000 · 12% · 10y | value ≈ ₹56,00,897 (matches fermor.in SIP page) |
| `sip` | 10,000 · 12% · 10y | value ≈ ₹22,40,359, invested ₹12,00,000 |
| `emi` | 50,00,000 · 8.5% · 20y | EMI ≈ ₹43,391, interest ≈ ₹54,13,879 |
| `prepay` | same loan + ₹5,000/month | 187 months, interest ≈ ₹40,24,629 (saves ≈ ₹13.9 L) |
| `incomeTax` new | ₹12,00,000 salary | ₹0 (taxable ₹11.25 L, 87A rebate) |
| `incomeTax` old | ₹12,00,000, 80C ₹1.5 L | ₹1,17,000 (₹1,12,500 + 4% cess) |
| `incomeTax` new | ₹12,80,000 salary | ₹5,200 (taxable ₹12.05 L, marginal relief caps tax at ₹5,000, + 4% cess) |

Check the slab tables against Fermor's `/calculators/income-tax-calculator` and `/tax/income-tax-on-12-lakh-salary` before shipping.

## 4. Two-day schedule

### Day 1: foundation and the top half

| Time | Task | Done when |
|------|------|-----------|
| 1h | `create-next-app`, Tailwind v4, fonts, tokens, ESLint/Prettier, deploy an empty page to Vercel | Live URL exists from hour one |
| 1h | `lib/finance.ts`, `lib/format.ts` + Vitest tests | Every fixture above passes |
| 1h | UI primitives: Button, Chip, Tabs, Slider, NumberField, PreviewTag | Keyboard and focus work |
| 1h | Nav (desktop dropdowns + mobile sheet) | Esc closes it, focus is trapped in the sheet |
| 3h | **Hero + CalculatorCard** (SIP, EMI, Tax panels, Show the math, mini bar) | Numbers match the fixtures, works at 360px |
| 1h | Decisions grid | Links go to real fermor.in calculator URLs |

### Day 2: the bottom half, polish, ship

| Time | Task | Done when |
|------|------|-----------|
| 1h | Show the math section | Readable with JS off |
| 1h | Salary tax chips | Values come from `incomeTax()` |
| 2h | App showcase: 4 HTML mockups + tabs | "Preview" tag on each, mobile segmented control |
| 1h | Forecast chart (SVG) | Updates on input, has `aria-label` with the end value |
| 1h | Analysis list, Waitlist band + `/api/waitlist`, FAQ, Footer | Form has error and success states |
| 1.5h | Responsive pass at 360 / 390 / 768 / 1024 / 1280 / 1440 | No horizontal scroll |
| 1h | Accessibility + performance pass (checklist below) | Lighthouse mobile ≥ 90 perf, ≥ 95 a11y |
| 0.5h | Metadata, OG image, JSON-LD, favicon | Share preview looks right |
| 1h | README, screenshots, final deploy, push to GitHub | Submitted |

If behind schedule, cut in this order: Forecast (reuse SIP), calculator search, the Market mockup, the count-up animations.

## 5. QA checklist

**Content**
- [ ] Every number on the page is computed or sourced. Nothing invented.
- [ ] Every ₹ amount uses `en-IN` grouping and tabular figures.
- [ ] Every result has its assumption line.
- [ ] The disclosure is in the footer. "Not financial advice" sits near the calculators.
- [ ] No "no ads" claim. No live-looking "Invest now".
- [ ] All external links point to real fermor.in URLs. Placeholders are marked.
- [ ] Spell check (the current site has "nevver").

**Responsive**
- [ ] 360px: no horizontal scroll, tap targets ≥ 44px, H1 ≤ 3 lines.
- [ ] Calculator sliders are usable with a thumb.
- [ ] The mobile nav sheet works with VoiceOver/TalkBack.

**Accessibility**
- [ ] Keyboard-only run-through of the whole page.
- [ ] Contrast checked (no mint text on light).
- [ ] `aria-live` on calculator results. `aria-valuetext` on sliders.
- [ ] `prefers-reduced-motion` respected.
- [ ] One h1, ordered headings, landmarks.

**Performance**
- [ ] Sections are server components. Only the calculator, tabs, nav, forecast and form are client components.
- [ ] No images in the hero. Mockups are HTML/CSS.
- [ ] Fonts: 3 families, only the weights used.
- [ ] First-load JS under about 120KB.
- [ ] Section content is visible with JS disabled.

## 6. Deploy

1. Push to GitHub (`fermor-homepage` or this repo).
2. Import into Vercel. Framework is auto-detected. No env vars needed.
3. Set the production domain (for example `fermor-homepage.vercel.app`).
4. Run Lighthouse on the production URL and put the scores in the README.

## 7. README outline (for submission)

```md
# Fermor: Homepage Concept
Live: <vercel url> · Repo: <github url>

## Setup
npm install
npm run dev     # http://localhost:3000
npm test        # finance math tests

## What I built and why
- Who the homepage is for (returner / referred / evaluator)
- Lead with the live product: a working calculator in the hero
- Organised by decisions, not by 158 calculators
- Understand → Act → Grow narrative, taken from Fermor's own mission
- Honest treatment of the app (waitlist, "Preview" labels)

## Design decisions
- One visual system: ink + paper + mint, forest as a bridge to the inner pages
- Purple gradients dropped (off brand). Mint never used as text on light (1.3:1)
- Type: Space Grotesk + Inter (both already in Fermor's stack) + Instrument Serif accent
- No scroll-jacking. Every section works without JS animation

## Technical notes
- Finance math matches fermor.in's formulas (SIP uses an effective monthly rate)
- Unit-tested calculators, accessible sliders, aria-live results
- Waitlist endpoint is mocked (no storage)

## What I'd do next
- Connect the waitlist to a real store
- Calculator search across all 158
- Hindi version of the homepage

## Lighthouse
Perf __ · A11y __ · Best practices __ · SEO __
```

## 8. Risks

| Risk | Mitigation |
|------|------------|
| Tax math is wrong | Unit tests plus a check against fermor.in's tax pages. Show "indicative" labels. |
| The page looks templated | Follow 05 §6. Get one honest outside opinion on day 2. |
| Calculator hero too heavy on mobile | Collapse "Show the math" by default. Lazy-load the tax panel. |
| Scope creep | Follow the cut order in §4. |
