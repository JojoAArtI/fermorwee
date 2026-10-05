# 02. Current Homepage Audit (fermor.in, 5 Oct 2026)

Screenshots are in `reference/current-site/`. The page is about 15,400px tall at 1440px wide. That is a lot of scroll for the amount of content.

## Section by section

| # | Section | What it does | What works | What doesn't |
|---|---------|--------------|------------|--------------|
| 0 | **Nav** (floating glass pill) | Logo, Products ▾, For Kids, Resources ▾, Get Started (mint), Login | Compact, clear primary CTA | Products dropdown hides the live product (calculators sit under "Resources"). "Get Started" and "Waiting list" compete as two CTAs for the same thing. |
| 1 | **Hero**: "Build your wealth with Fermor" | Dotted globe background, email waitlist field, phone mockup | Mint "Fermor" highlight is on brand. The phone UI shows real ₹ formatting. | The headline could belong to any fintech. Nothing says India, calculators or clarity. The globe suggests global investing, which Fermor isn't. The email-first CTA asks for commitment before giving value. |
| 2 | **Ask anything** (dark) | Serif italic heading, sparkle icon, a fake chat input that types prompts | Good teaser for the AI feature | Georgia italic plus a purple sparkle is a third visual language. The input isn't real, and it doesn't say it's a preview. |
| 3 | **Understand your money better / Stay ahead every day** | Two purple-blue gradient cards with dashboard mockups | The mockups are detailed and believable (cash flow, health score 78/100) | The purple/blue gradient is off brand: the logo is mint green. Typo: "nevver". |
| 4 | **"so, what are you looking to invest in?"** | Hand holding a phone, scroll-driven tabs: stocks, mutual fund, ETF | Nice tactile product shot | Lowercase headline breaks the voice. Shows "Invest Now" for a product that isn't live. Long blank scroll area while pinned. |
| 5 | **Forecast your future** | Wealth projection chart, ₹53L to ₹1.64Cr | The most "Fermor" idea on the page: projecting with math | Buried mid-page, and not interactive. |
| 6 | **Bring it all together**: Analyze / Plan / Invest | Giant mint text, scroll animation | — | On static capture it's about 3,000px of near-empty dark screen. The message is vague. |
| 7 | **News that impacts your wallet** | 3D card carousel of real articles | Real, timely content | The carousel hides content. Cards fade to unreadable grey. Articles include a cricket match report, which is off topic for a finance homepage. |
| 8 | **Get a free financial health check** | Bright mint band, App Store and Play badges | Strong colour moment | The badges link to `#`. The CTA promises a health check, but no health check exists on the site. Shown twice in the markup. |
| 9 | **FAQ** | 5 questions, accordion | **Best copy on the page.** Honest, specific, explains the product. | Too far down. Most visitors never reach it. |
| 10 | **Footer** (blue-purple gradient, huge "Fermor" wordmark) | Links, badges, socials, disclosure | Disclosure is present. The giant wordmark is a nice closing beat. | Gradient again off brand. The disclosure is set at about 9px, white on gradient, hard to read. |

## Problems across the whole page

1. **The live product is invisible.** 158 calculators, 2,472 funds and the tax pages don't appear on the homepage at all, except in the footer. A visitor can't tell Fermor already does something useful today.
2. **Three visual systems compete.**
   - Homepage: near-black + mint `#75FB90` + purple/blue gradients + Georgia italic + Poppins.
   - Inner pages (About, SIP calculator, Mutual Funds): deep forest `#1A3530` + lime `#C8F135` + teal `#0C6B62`, with an older lime "F" logo.
   - Blogs: Georgia-style serif headlines on bright blue cards.
   The brand has no single look yet. This is the biggest design opportunity.
3. **Fonts loaded vs used.** Inter, Poppins, DM Sans and Space Grotesk are all loaded (4 families, about 35 weight files), plus Georgia. That is a performance cost and makes the type feel inconsistent.
4. **Scroll-jacked dead space.** Several pinned sections render as empty screens if the animation doesn't fire (screenshots, slow phones, reduced motion). That fails "Mobile-first: most Indians are on phones".
5. **Promise vs reality.** "Invest Now", app badges, "health check", and a "no ads" meta description next to AdSense. For a brand built on honesty, this is risky.
6. **Hierarchy.** Many labels sit at 8 to 11px. Body copy is light grey on light backgrounds (`#8A8F86` on white is 3.3:1, which fails WCAG AA for body text).
7. **No India signal above the fold** except the ₹ in the phone mockup.
8. **No social proof or trust layer.** No usage numbers, no methodology, no "how we make money". The About page has all of it.

## What to keep

- Mint `#75FB90` and the two-stripe logo mark. They are distinctive.
- Near-black `#101214` sections with mint. That pairing is strong.
- Real Indian number formatting in mockups.
- The rounded "sheet" layout (sections are rounded panels on a dark frame). It reads as app-like and premium. Keep it, but use it with restraint.
- The FAQ copy, word for word.
- The health score idea and the forecast idea.
- The giant wordmark in the footer.

## What to drop

- Purple/blue gradients and the purple sparkle.
- The globe hero.
- Scroll-pinned empty sections.
- Lowercase chatty headings.
- The 3D carousel for articles.
- Off-topic articles (sports) on the homepage.
- "Invest Now" buttons and dead app-store links.

## So what the new homepage must do

| Problem | Fix |
|---------|-----|
| Live product invisible | Put a working calculator in the hero. Add a "pick your decision" grid linking real calculators. |
| Three visual systems | One system: ink + paper + mint, with forest green as the bridge to the inner pages (see 03). |
| Generic headline | Lead with the decision and the math, and say India. |
| Dead scroll | No scroll-jacking. Every section has content at rest. Motion is a bonus, not a requirement. |
| Promise vs reality | Label the app as "coming soon / waitlist". Label mockups "Preview". |
| Trust missing | A principles section using the About page's own five rules, plus real counts. |
| FAQ buried | Keep it, shorter page above it. |
