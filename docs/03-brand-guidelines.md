# 03. Brand Guidelines

Fermor has no public brand book. These guidelines are put together from the live site's CSS, inline styles and assets, then tidied into one coherent system. Where the current site is inconsistent, I state which way I'm going and why.

## 1. Brand idea

**Fermor shows you the math.**

Everything the brand does should feel like a good calculator: exact, calm, honest about its assumptions, and quick. The personality is a sharp friend who works in finance and will explain it on a napkin. It is not a bank, a trading app or a hype-driven startup.

Three words: **Clear. Exact. Honest.**

## 2. Logo

### Mark
File: `reference/fermor-mark-2026.svg` (served on the live site as `/fermor-mark-2026.svg`).

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1.04 -0.79 2.08 1.58" fill="#75FB90" role="img" aria-label="Fermor">
  <path d="M0.9526 -0.7447 L0.7342 -0.4684 L0.1684 -0.4684 L-0.2895 0.1132 L-1 0.1132 L-0.7868 -0.1579 L-0.4342 -0.1579 L0.0289 -0.7447 Z"/>
  <path d="M-0.9526 0.7447 L-0.7342 0.4684 L-0.1684 0.4684 L0.2895 -0.1132 L1 -0.1132 L0.7868 0.1579 L0.4342 0.1579 L-0.0289 0.7447 Z"/>
</svg>
```

Two identical stepped stripes, one rotated 180° against the other. They read as an "F", as two lines on a rising chart, and as a balance between two sides of a ledger. Aspect ratio is about 1.32 : 1.

### Wordmark
"Fermor" in a geometric sans, semibold (600) to bold (700), tight tracking (-0.02em), in ink `#101214` on light or white on dark. The mark sits to the left of the wordmark. The gap equals about 0.35× the mark height.

### Rules
- Mark colour: mint `#75FB90` on dark, and on light backgrounds as well (the live site does this). On white, the mark is decorative and the wordmark carries legibility, so that's acceptable.
- One-colour versions: all-ink `#101214` on mint or light; all-white on photos.
- Minimum size: mark 20px wide on screen; lockup 88px wide.
- Clear space: the height of one stripe on all sides.
- Don't recolour the mark purple, blue or lime. Don't add gradients, shadows or outlines. Don't stretch it.
- Retire the older lime "F" logo seen on inner pages (About, SIP calculator). Use the 2026 mark everywhere.

## 3. Colour

### Core palette

| Token | Hex | Role | Source on live site |
|-------|-----|------|---------------------|
| `ink` | `#101214` | Primary text, dark sections, primary buttons on light | Homepage headings, dark panels |
| `ink-soft` | `#1B1D1F` | Dark section surfaces (one step up from ink) | Dark homepage panels |
| `paper` | `#F4F5F1` | Default page background (warm off-white) | Close to `#F2F3F4` / `#EDEFED` on the site |
| `white` | `#FFFFFF` | Cards on paper | — |
| `line` | `#E5E5E5` | Borders, dividers on light | 29 uses on the homepage |
| `mint` | `#75FB90` | **Brand accent.** Logo, primary CTA fill, highlights on dark, chart "returns" series | Logo, "Get Started", "Fermor" highlight |
| `mint-soft` | `#B9EFCF` | Mint tint for chips and backgrounds on dark | Homepage |
| `mint-wash` | `#E4F6E8` | Mint tint on light (selected states, success backgrounds) | Homepage |
| `forest` | `#1A3530` | Deep green. Secondary dark surface, text-safe "brand green" on light | Inner pages, About CTA, SIP donut |
| `forest-deep` | `#0C1A10` | Darkest green, for gradient stops and the footer | Homepage |
| `muted` | `#5A6660` | Secondary text on light | Homepage |
| `subtle` | `#8A8F86` | Tertiary text on **dark only**, captions on dark | Homepage |

### Semantic colours (finance data)

| Token | Hex | Use | Contrast on white |
|-------|-----|-----|-------------------|
| `gain` | `#157A3A` | Positive change text (+1.56%) | 5.42 : 1 ✅ |
| `gain-bright` | `#22B455` | Gain on dark, chart lines, icons | 2.72 : 1 (graphics only on light) |
| `loss` | `#B43C3C` | Negative change text (-1.06%) | 5.75 : 1 ✅ |
| `loss-bright` | `#D45151` | Loss on dark, chart lines | 4.12 : 1 (large text / graphics) |

Always pair colour with a sign (+/−) or an arrow (▲/▼). Colour is never the only signal.

### Contrast rules (measured)

| Pair | Ratio | Verdict |
|------|-------|---------|
| ink on paper | 17.1 : 1 | All text |
| ink on mint | 14.3 : 1 | **Button text on mint is always ink, never white** |
| mint on ink | 14.3 : 1 | Highlights and large text on dark ✅ |
| forest on white | 13.2 : 1 | Use forest when you want "green text" on light |
| muted on white | 6.0 : 1 | Secondary body text ✅ |
| muted on paper | 5.5 : 1 | ✅ |
| subtle on ink | 5.7 : 1 | Captions on dark ✅ |
| subtle on white | 3.3 : 1 | ❌ Not for text on light. The current site does this. |
| **mint on white** | **1.3 : 1** | ❌ **Never use mint for text or thin lines on light backgrounds** |

### Proportions
Aim for roughly **60% paper/white, 30% ink/forest, 10% mint.** Mint is a highlighter, not a wall paint. The one exception is a single full-mint CTA band near the bottom of the page.

### Retire
- Purple `#9E79FF`, `#6C3AE8` and the blue-violet gradients. They are off brand and the most "AI template" thing on the current site.
- Lime `#C8F135` as a second accent. It fights with mint. Use mint everywhere; lime can stay only inside legacy inner pages until they're redesigned.
- Teal `#0C6B62` family. Replaced by forest.

## 4. Typography

The live site loads four families (Inter, Poppins, DM Sans, Space Grotesk) plus Georgia. Cut this to three roles. Two of the three fonts are already in Fermor's stack.

| Role | Font | Why |
|------|------|-----|
| **Display** (H1 to H3, big numbers) | **Space Grotesk** 500/600/700 | Already loaded on fermor.in. Its numerals have character (the ₹ amounts look engineered, which fits "show the math"), and it is less generic than Poppins. |
| **Text and UI** | **Inter** 400/500/600 | Already the most-used font on the site (94 inline uses). Excellent at small sizes. Has tabular figures (`font-feature-settings: "tnum"`). |
| **Editorial accent** (one or two words per section, max) | **Instrument Serif** Italic | Replaces the current Georgia italic ("*Ask anything*"). Keeps the editorial flourish Fermor already uses, but intentionally and sparingly. |

Load all three with `next/font/google` (self-hosted, no layout shift). Subset to Latin. The ₹ sign (U+20B9) is in Inter and Space Grotesk.

### Numbers are the hero
- Always use tabular figures for amounts that update: `font-variant-numeric: tabular-nums`.
- Indian grouping, always: `₹12,48,230`, not `₹1,248,230`. Use `Intl.NumberFormat('en-IN')`.
- Short forms: `₹30.00 L`, `₹1.64 Cr`. Put a space before L and Cr. Never use "lakhs" as a unit suffix in compact UI.
- Percent: `12%`, `+1.56%`, `−1.06%` (true minus sign U+2212 in display).
- Don't round silently. If a number is rounded, say "about".

## 5. Voice and tone

### Principles
1. **Numbers over adjectives.** "₹26.01 L in returns on ₹30 L invested" beats "grow your wealth massively".
2. **Say the assumption.** Every output names its inputs ("at 12% a year, for 10 years").
3. **Calm, not hype.** No "skyrocket", "unlock", "supercharge", "revolutionize", "seamless", "empower".
4. **Short sentences. Indian English.** "Lakh", "crore", "CTC", "in-hand", "EMI", "regime". Explain jargon once, in a few words.
5. **Honest about limits.** "Fermor is educational and is not a SEBI-registered adviser" is a feature, not fine print.
6. **Sentence case** for every heading and button. No lowercase-only headings, no Title Case.

### Do / Don't

| Don't | Do |
|-------|----|
| Build your wealth with Fermor | Know the number before you make the move |
| Unlock your financial future | See what a ₹5,000 SIP becomes in 15 years |
| AI-powered insights | Ask a question. Get the math behind the answer. |
| so, what are you looking to invest in? | What are you deciding this month? |
| Seamless, all-in-one platform | Calculators, analysis and your money, in one place |
| Invest Now | Run the numbers |
| Get started for free! | Open a calculator (no login) |

### Microcopy patterns
- CTA verbs: **Run, Compare, Check, See, Ask, Join**.
- Assumption line under results: "Assumes 12% a year, compounded monthly. Results are indicative."
- Empty states: say what to do next, plainly.
- Errors: say what's wrong and the allowed range ("Enter an amount between ₹500 and ₹10,00,000").

## 6. Imagery and illustration

- **Product UI is the main imagery.** Phone and card mockups with real-looking Indian data. Every mockup carries a small "Preview" tag while the app is in waitlist.
- **No stock photos** of smiling people with laptops. No 3D coins, piggy banks, rockets or globes.
- **Charts as illustration.** Clean line and area charts, donut splits, amortization bars. Mint for growth or returns, forest or ink for principal or invested, loss-red only for real negatives.
- **Texture:** optional faint grid (1px lines at 4% opacity) on dark sections. It echoes graph paper and the "math" idea. The About page header already uses a grid.
- **Icons:** one set only: Lucide, 1.5px stroke, 20/24px. No emoji in UI.

## 7. Shape and depth

- Radius scale: 8 / 12 / 18 / 28 px, plus pill (999px). Big section "sheets" use 28px top corners. Cards use 18px. Inputs and buttons use 12px or pill.
- Shadows are soft and rare: `0 1px 2px rgba(16,18,20,.06), 0 8px 24px rgba(16,18,20,.06)`. Dark sections use no shadows, only 1px borders at `rgba(255,255,255,.08)`.
- No glassmorphism, except the floating nav (a light blur is fine there).

## 8. Brand checklist (run on every screen)

- [ ] Is there an exact number on screen, with its assumption?
- [ ] Is mint used for at most one main thing in this viewport?
- [ ] Is every text colour pair at least 4.5 : 1 (or 3 : 1 for 24px+)?
- [ ] Is it in sentence case, plain Indian English, with no hype words?
- [ ] Is anything implying a live feature that isn't live?
- [ ] Do ₹ amounts use Indian grouping and tabular figures?
