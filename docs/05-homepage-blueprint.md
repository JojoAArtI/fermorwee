# 05. Homepage Blueprint

## 1. Product thinking

### Who lands on the homepage
Most Fermor traffic lands on inner pages from Google: a calculator, a tax-by-salary page, an article. The homepage visitor is usually one of these:

1. **The returner.** Used one calculator, liked it, typed fermor.in to see what else is here. *Needs:* "What is this whole thing, and what else can it do for me?"
2. **The referred.** A friend or a post said "use Fermor". *Needs:* proof in 10 seconds that it's useful and not another sales funnel.
3. **The evaluator.** A CA, a journalist, an investor, or this internship's reviewer. *Needs:* what Fermor is, who it's for, and why it's different.

### The job of the homepage
In order of priority:
1. **Prove usefulness in the first screen.** Let them run a real number.
2. **Route them to their decision.** 158 calculators is too many to browse, so organise by life decision.
3. **Explain why to trust Fermor.** The math is shown, it runs in the browser, there's no login wall, and the money model is honest.
4. **Show where it's going.** The app (Ask, Portfolio, Market, Forecast) as the next step, with a waitlist.
5. **Keep them coming back.** Timely analysis that affects their wallet.

### The narrative: understand → act → grow
The brief describes Fermor as helping people "understand, act and grow financially". The page follows those three verbs, so the structure itself states the mission:

| Beat | Visitor's question | Sections |
|------|--------------------|----------|
| **Understand** | "What does this number mean for me?" | Hero calculator, decision grid, show-the-math principles |
| **Act** | "What should I do now?" | Tax-by-salary quick check, the app: Ask + Portfolio + Market |
| **Grow** | "Where does this take me?" | Forecast, analysis feed, waitlist |

### Primary and secondary conversions
- **Primary:** open a calculator (engagement, SEO, ad revenue today).
- **Secondary:** join the app waitlist (the future product).
- Don't ask for an email before giving value. The waitlist comes after the visitor has used something.

## 2. Page map

```
┌───────────────────────────────────────────────────────────┐
│ 0  NAV (floating pill)                                    │
├───────────────────────────────────────────────────────────┤
│ 1  HERO: headline + live calculator          [paper]      │  UNDERSTAND
│    trust strip: 158 calculators · runs in browser · ...   │
├───────────────────────────────────────────────────────────┤
│ 2  WHAT ARE YOU DECIDING? 6 decision tiles   [paper]      │
├───────────────────────────────────────────────────────────┤
│ 3  SHOW THE MATH: principles + worked example [ink sheet] │
├───────────────────────────────────────────────────────────┤
│ 4  YOUR SALARY, YOUR TAX: quick lookup       [white]      │  ACT
├───────────────────────────────────────────────────────────┤
│ 5  THE FERMOR APP: Ask / Portfolio / Market  [ink sheet]  │
│    (tabbed showcase, "Preview" labels)                    │
├───────────────────────────────────────────────────────────┤
│ 6  FORECAST: interactive projection          [forest]     │  GROW
├───────────────────────────────────────────────────────────┤
│ 7  ANALYSIS THAT AFFECTS YOUR WALLET         [paper]      │
├───────────────────────────────────────────────────────────┤
│ 8  WAITLIST BAND                             [mint]       │
├───────────────────────────────────────────────────────────┤
│ 9  FAQ                                       [paper]      │
├───────────────────────────────────────────────────────────┤
│ 10 FOOTER + disclosure + giant wordmark      [ink]        │
└───────────────────────────────────────────────────────────┘
```

Target height at 1440px: about 7,000 to 8,000px (the current page is about 15,400px). Every section has meaningful content without animations running.

Background rhythm: light, light, **dark**, light, **dark**, **forest**, light, **mint**, light, **dark**. That alternation gives the page pace without gradients.

---

## 3. Sections in detail

### 0. Nav

```
[≡F Fermor]   Calculators   Products ▾   Learn ▾   For CAs        [Log in] [Join waitlist]
```

- **Products ▾** (2-column menu with one-line descriptions):
  - Ask: "Questions about your money, answered with your numbers." `Soon`
  - Portfolio: "Investments, spending and savings in one view." `Soon`
  - Market: "Stocks, mutual funds and ETFs, explained." `Soon`
  - Forecast: "See where your money could be in 5, 10, 20 years." `Soon`
  - For Kids: "Money basics for the next generation." `Soon`
- **Learn ▾:** Articles · Income tax by salary · Mutual funds (2,472) · All calculators (158)
- The calculators link sits first and outside a dropdown, because it is the live product.

### 1. Hero: understand

**Layout (desktop):** 12-column grid. Left 6 columns: copy. Right 6 columns: the calculator card. **Mobile:** copy first, then the card full width, then the trust strip.

**Copy:**
- Eyebrow: `PERSONAL FINANCE, FOR INDIA`
- H1: **Know the number before you make the *move*.** (*move* in Instrument Serif italic)
  - Alternatives: "Money decisions, with the math shown." / "Run the numbers. Then decide."
- Lead: "Fermor turns loans, SIPs, tax and salary into clear numbers you can trust. 158 free calculators, built for India. No login, no sales pitch."
- Primary CTA: `Explore 158 calculators →` (dark button)
- Secondary CTA: `Join the app waitlist` (link style)

**Calculator card** (the signature component, see 04):
- Tabs: `SIP` · `Home loan EMI` · `Income tax`
- SIP defaults: ₹10,000 a month · 12% a year · 10 years
  - Result: **₹22,40,359**
  - Rows: Invested ₹12,00,000 · Est. returns ₹10,40,359 · Wealth multiplier 1.87×
  - Mini stacked bar: invested (forest) vs returns (mint)
  - Year chips: 5Y · 10Y · 15Y · 20Y
- EMI defaults: ₹50,00,000 · 8.5% · 20 years. Result: **₹43,391 / month**. Total interest ₹54,13,879. A bonus insight line: "Paying ₹5,000 more each month saves about ₹13.9 L in interest and closes the loan 4 years 5 months early."
- Tax defaults: annual salary ₹12,00,000, salaried, FY 2026-27. Result: **New regime ₹0** vs **Old regime ₹1,17,000** (with ₹1.5 L under 80C). A line: "The new regime saves you ₹1,17,000 at this salary."
- Footer of card: `Show the math ▾` · `Open full SIP calculator →`
- Assumption line: "Assumes returns compound monthly. Results are indicative, not advice."

**Trust strip** (under the hero, a single row of 4 stats with dividers):
| 158 | ₹0 | 0 | 7 |
|---|---|---|---|
| free calculators | to use, no login wall | numbers sent to our servers to calculate | Indian languages in our guides |

**Visual:** paper background, faint graph-paper grid fading out at the bottom. No phone mockup in the hero: the calculator *is* the hero image.

> **Math note:** Fermor's own SIP calculator uses an effective monthly rate `i = (1 + r)^(1/12) − 1` with payments at the start of each month (annuity due). That is how ₹25,000 × 12% × 10y gives ₹56,00,897 on their site. Use the same formula so the homepage matches the inner pages. EMI uses the standard `E = P·i·(1+i)^n / ((1+i)^n − 1)` with `i = r/12`. Verify the tax numbers against Fermor's `/calculators/income-tax-calculator` before shipping.

### 2. What are you deciding? (understand)

**Purpose:** turn 158 calculators into 6 doors.

- Eyebrow: `START WITH THE DECISION`
- H2: **What are you deciding this month?**
- Sub: "Pick the question in front of you. We'll show you the calculators that answer it."

**Six tiles** (3×2 desktop, 2×3 tablet, horizontal scroll-snap on mobile or a stacked list):

| Icon | Title | Question | Calculator chips (real URLs) |
|------|-------|----------|------------------------------|
| `home` | Buying a home | Can I afford this home, and what will it really cost? | Home Loan EMI · Home Loan Eligibility · Rent vs Buy · Stamp Duty |
| `trending-up` | Starting to invest | What does ₹5,000 a month become? | SIP · Step-up SIP · Lumpsum · SIP vs Lumpsum |
| `receipt` | Saving tax | Old regime or new? How much can I save? | Old vs New Regime · Income Tax · 80C · HRA |
| `briefcase` | Changing jobs | What's my in-hand on this offer? | CTC · In-Hand Salary · Salary Hike · Gratuity |
| `credit-card` | Clearing debt | Prepay the loan or invest the money? | Loan Prepayment · Debt Avalanche · Credit Card EMI · Balance Transfer |
| `sunset` | Retiring well | Is my corpus on track? | Retirement Corpus · NPS · EPF · FIRE |

Under the grid: a link `See all 158 calculators →` plus a search field ("Search calculators, e.g. HRA") that filters a list client-side. Optional. Build it if time allows.

### 3. Show the math (understand → trust)

**Ink sheet.** This is the brand's core idea, so it gets the first dark section.

- Eyebrow: `HOW FERMOR WORKS`
- H2: **We show the math, *not just* the answer.**
- Two columns:
  - **Left: a worked example** in a monospace-feel card (still Inter with tabular figures). Each line reveals on scroll (with no animation it's fully visible):
    ```
    Home loan        ₹50,00,000
    Rate             8.5% a year  →  0.7083% a month
    Tenure           20 years     →  240 months
    EMI              ₹43,391
    You pay back     ₹1,04,13,879
    Of which interest ₹54,13,879  (108% of the loan)
    ```
    Caption: "Every calculator shows its formula and its assumptions. If a bank's number doesn't match ours, you'll know why."
  - **Right: principles** (from Fermor's About page, tightened):
    1. **The full math, every time.** Formula, inputs and assumptions on every tool.
    2. **No login wall.** An account only saves your results.
    3. **Your numbers stay on your device.** Calculations run in your browser.
    4. **Honest about money.** Fermor is free because of clearly labelled ads and partner links, never disguised as advice.
    5. **Built for phones.** Because that's where most of India does its money.
- Footnote: "Fermor is an education platform, not a SEBI-registered adviser."

### 4. Your salary, your tax (act)

**White section.** A fast, India-specific hook that links to Fermor's 45 tax pages.

- H2: **Earning ₹12 lakh? You may owe *zero* tax.**
- Sub: "Under the new regime for FY 2026-27, salaried income up to ₹12.75 lakh can be tax-free. See your exact number."
- A row of salary chips: `₹6 L` `₹8 L` `₹10 L` `₹12 L` `₹15 L` `₹20 L` `₹25 L` `₹30 L` `₹50 L`. Selecting a chip updates a result panel inline: "New regime: ₹X · Old regime: ₹Y · You save ₹Z with [regime]". Each chip also links to `/tax/income-tax-on-{n}-lakh-salary`.
- Secondary link: "Check tax by city →" (`/tax/by-city`)
- **Implementation:** precompute values for the chip salaries in a small JSON (new-regime slabs, ₹75,000 standard deduction, 87A rebate with marginal relief; old regime with the ₹50,000 standard deduction and ₹1.5 L 80C). Write the function once and unit-test it against Fermor's tax pages.

### 5. The Fermor app (act)

**Ink sheet.** The waitlist product, presented honestly.

- Eyebrow: `COMING TO THE FERMOR APP`
- H2: **The same clarity, *with your own* money.**
- Sub: "Connect your accounts and Fermor does the math on your actual life: spending, investments, goals."
- **Tabbed showcase**: tabs on the left on desktop (vertical) and a top segmented control on mobile. Each tab swaps a phone or card mockup on the right. All mockups are built in HTML/CSS (not images), so they're crisp and responsive, and each one carries a `Preview` tag.

| Tab | Headline | Body | Mockup content |
|-----|----------|------|----------------|
| **Ask** | Ask anything about your money | "Where did my money go this month?" Get an answer grounded in your own numbers, with the working shown. | Chat: user asks "How can I save ₹5,000 more a month?" The answer lists 3 categories with ₹ amounts and a "Show the math" chip. |
| **Portfolio** | See everything in one place | Investments, spending and savings, finally on one screen. | Monthly cash flow ₹82,000. Spending split: Food ₹12,480 (26%), Shopping ₹8,320 (17%), Transport ₹6,900 (14%), Others ₹20,620 (43%). |
| **Health score** | Know where you stand | A score out of 100 across emergency fund, savings rate, debt and diversification, with the two fixes that move it most. | 78/100 ring. Emergency fund 82%, Savings rate 76%, Debt health 91%, Diversification 64%. |
| **Market** | Invest with context | Stocks, mutual funds and ETFs explained in plain words before you buy. | HDFC Bank ₹1,612.50 ▲ 1.56%, SBI ₹785.40 ▲ 0.82%, Maruti ₹11,248.30 ▼ 1.06%. Label: "Illustrative prices". |

- CTA under the showcase: `Join the waitlist` (primary mint) + "We'll email you once. No spam."
- Note: the mockup data comes from the current homepage, so it's on brand. Prices are dated and illustrative. Say so.

### 6. Forecast (grow)

**Forest sheet** (`#1A3530`, mint accents). Interactive and short.

- H2: **Where could your money be in *ten years*?**
- Left: three inputs (Wealth today ₹5,00,000 · Monthly investment ₹15,000 · Expected return 10%) plus horizon chips `5Y 10Y 15Y 20Y`.
- Right: an area chart (SVG, hand-built or Recharts) with two series, "invested" (white at 20%) and "growth" (mint), and a big end number.
- Caption: "A projection, not a promise. Markets move; this assumes a steady return."
- Link: `Try the goal planner →` (`/calculators/goal-planning-calculator`)
- If time is short, this section can reuse the SIP math and drop to two inputs.

### 7. Analysis that affects your wallet (grow / retention)

**Paper section.** Real Fermor articles, as a list, not a carousel.

- Eyebrow: `LATEST ANALYSIS`
- H2: **News, with the math done for you.**
- Layout: one featured article (left, larger) plus three rows (right). Mobile: stacked.
- Use finance-only articles (skip sports):
  1. **Featured**: "Sensex Nifty Crash September 2026: 7 Straight Weekly Losses, Why Market Is Down". Stock Market · Sep 29, 2026 · 13 min
  2. "UPI Charges Above Rs 2,000: New MDR Rule Explained". Regulation · Sep 22, 2026 · 13 min
  3. "Bank Strike September 28-30, 2026: 5 Days Banks Closed, What Works". Regulation · Sep 25, 2026 · 12 min
  4. "Income Tax Rebate Under Section 87A: Limits and Marginal Relief". Income Tax · Jul 30, 2026 · 11 min
- Each links to `https://fermor.in/blogs/{slug}`. Store them in `content/articles.ts`.
- Footer line: "Guides also in हिन्दी, मराठी, తెలుగు, ਪੰਜਾਬੀ, বাংলা" (a small, real signal of reach).

### 8. Waitlist band

**Full mint band**, ink text. The one loud moment on the page.

- H2: **Get your free financial health check.**
- Sub: "Join the waitlist for the Fermor app. Be first to see your score out of 100."
- Inline form: email input + `Join waitlist` (dark button). Client-side validation. On submit, show a success state: "You're on the list. We'll write once when it's ready." Mock the endpoint with a Next.js route handler (`/api/waitlist`) that validates and returns 200. No real storage needed for the assignment; say so in the README.
- Below: store badges, greyed, labelled "Coming soon on iOS and Android".

### 9. FAQ

Two columns on desktop: the heading on the left, the accordion on the right. Keep Fermor's five questions and answers **verbatim** (see 01 §8). Add one:

- **"Is the app live?"** "Not yet. The calculators and guides are live and free today. The app (Ask, Portfolio, Market and the health check) is in a waitlist. Join it and we'll email you once when it opens."

### 10. Footer

- Ink background, no gradient.
- Columns: **Calculators** (SIP, EMI, Home Loan, Income Tax, PPF, FD, All 158) · **Learn** (Articles, Tax by salary, Tax by city, Mutual funds) · **Company** (About, Contact, For CAs) · **Legal** (Privacy, Terms, Disclosures).
- Socials: X (`https://twitter.com/fermor_in`), LinkedIn, YouTube, Threads (placeholders).
- Disclosure at 13px, readable (see 01 §7).
- Giant "Fermor" wordmark, clipped at the bottom, ink on ink-soft or mint at 8% opacity.
- Bottom line: "© 2026 Fermor Technologies Pvt. Ltd. · Made in India · Results are indicative. Not financial advice."

---

## 4. Mobile plan (390px)

| Section | Mobile behaviour |
|---------|------------------|
| Nav | Logo + menu button. The sheet menu has large rows and a pinned CTA. |
| Hero | H1 at about 40px, three lines max. Lead, then one full-width CTA. The calculator card is full width, tabs become a segmented control, sliders are full width with 44px touch area. The trust strip becomes a 2×2 grid. |
| Decisions | A stacked list of 6 rows (icon, title, chevron) is better than tiny cards. Tap opens the main calculator. |
| Show the math | Worked example first, principles as a numbered list below. |
| Tax | Chips scroll horizontally with snap. The result panel sits below. |
| App | Segmented control (Ask / Portfolio / Score / Market). Mockup below the copy. |
| Forecast | Chart first, inputs below. |
| Analysis | Featured card, then compact rows. |
| Waitlist | Input and button stacked. |
| FAQ | Heading above the accordion. |
| Footer | 2-column links, wordmark at 24vw. |

Test at 360px. Nothing may scroll horizontally except the intended chip rows.

## 5. SEO and meta

- `<title>`: "Fermor: Free financial calculators and clear money decisions for India"
- Description: "Run the numbers before you decide. 158 free calculators for SIP, EMI, income tax, salary and retirement, built for India. No login, math shown."
- `lang="en-IN"`, Open Graph image (1200×630: ink background, mint mark, H1, and one calculator result).
- JSON-LD: `Organization` (name, url, logo, sameAs: X) + `FAQPage` for the FAQ section + `WebSite`.
- One `<h1>`. Sections use `<h2>`. Landmarks: header, main, footer.

## 6. What makes this not look AI-generated

- **Real data and real URLs** from fermor.in, not lorem ipsum or invented stats.
- **A specific point of view**: lead with the live product (calculators) and treat the app honestly as waitlist. Most template homepages lead with an app mockup.
- **India-specific details everywhere**: lakh/crore grouping, regimes, CTC vs in-hand, the regional-language line.
- **No purple gradients, no glass cards, no sparkle icons, no "Unlock/Empower/Seamless" copy.**
- **Asymmetric layouts** (6/6 hero with a working tool, featured + list analysis, 5/7 FAQ), not centred stacks of three cards.
- **One type accent used rarely** (the serif italic word), not five font styles.
- **Interactions that do real work** (calculators, tax chips, forecast) instead of decorative animation.
- **Copy written in Fermor's voice** (see 03 §5) and read aloud once before shipping.
