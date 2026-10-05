# 07. The Goal: CRED-Level Craft, Fermor's Soul

**Direction change (supersedes parts of 03 to 06):** the brief does not require Fermor's design guidelines. The target quality bar is **CRED (cred.club)**, the best-crafted Indian fintech website: cinematic, dark, confident, editorial. We take CRED's *craft* and keep Fermor's *identity*: mint mark, real product, honest math.

Rule: **inspired by CRED, never a CRED clone.** If a screenshot of our page could be mistaken for cred.club, we went too far.

---

## 1. What CRED's homepage actually does (researched 5 Oct 2026)

Desktop page height is about 11,300px with 10 folds. Pure black throughout. Every fold is one idea, one headline and one visual.

| # | Fold | Headline | Visual | Technique |
|---|------|----------|--------|-----------|
| 1 | Hero | "crafted for the creditworthy" | Full-bleed looping video: a dark architectural corridor (8 s) | Autoplay muted video + poster + fallback image. Floating "download CRED" QR box at bottom right. Minimal nav: logo, menu button, one launch pill. |
| 2 | Manifesto | Eyebrow "NOT EVERYONE MAKES IT IN." | Text only: a 9-line paragraph in large light serif | **Word-by-word scroll reveal**: each word goes from 30% to 100% white as you scroll |
| 3 | Product | — | Video of a fan of 5 phones showing the app | Video starts when the fold enters view |
| 4 | Promise | "all that you deserve. and some more." | Text | Big serif, centred, short sub |
| 5 | Feature split | "do more with your credit cards" | Video on the right: a wheel of cards with neon green accents | Text left, video right, 1px hairlines top and bottom |
| 6 | Product rail | "upgrade your life. bit by bit." | Horizontal row of 5 tall cards (Scan & Pay, UPI on credit, Tap to pay, Send money, Garage), each a 3D render on a saturated neon glow (magenta, violet, green) | Horizontal scroll/drag, "KNOW MORE →" ghost buttons |
| 7 | Rewards | "feel the odds fall in your favor" | Full-bleed video of glass spheres dropping | Headline over video |
| 8 | Security | "YOUR DATA ISN'T OUR BUSINESS. KEEPING IT SAFE IS." | Shield icon + paragraph | **Spotlight text**: words light up from 15% white as you scroll |
| 9 | Proof | "the proof writes itself" + "trusted by 15M members" | 4.8/5 App Store, 4.8/5 Play Store with stars | Huge numerals (95px) with a small "/5" |
| 10 | Closing | "not everyone gets it" | A door opening onto warm light | Image left, copy + QR right |
| 11 | FAQ + footer | "FAQs ⌄" collapsed | — | Footer: uppercase tracked column headings, grey links at 30% white |

### Design DNA (measured from computed styles)

| Element | CRED value |
|---------|------------|
| Background | `#000000` everywhere. Panels `rgba(0,0,0,.3)` over video. |
| Text colours | White at 100 / 90 / 80 / 70 / 30 / 15% opacity. **No second colour in the UI.** Colour only arrives through video and renders. |
| Display font | **Denton** (high-contrast serif), 700, 90 to 114px, line-height about 0.9, tracking -0.4px, **all lowercase** |
| Manifesto font | Denton Light 300, 70px, line-height 100px |
| Body font | **Gilroy** (geometric sans), 500, 20 to 22px, line-height 34 to 40px, tracking +0.5px |
| Eyebrows | Gilroy 600 to 700, 13 to 27px, UPPERCASE, very wide tracking (3 to 6px) |
| Big numbers | Gilroy 700, 95px, tracking -3px, with a 45px "/5" |
| Buttons | Ghost: 1px white border, uppercase 15px, 3px tracking, arrow → |
| Lines | 1px hairlines at about 10% white between folds |
| Media | 4 videos on the homepage, 0.3 to 6 MB each, separate desktop and mobile files, each with a poster and a static fallback image |
| Copy voice | Lowercase, short, aspirational, a little exclusive. "not everyone gets it." |

### Why it feels premium (the things to copy)
1. **One idea per screen.** Huge type, lots of black, nothing competing.
2. **Contrast of type:** big expressive serif headlines against a quiet geometric sans and wide-tracked uppercase labels.
3. **Monochrome UI, colour only in the media.** That's why the videos glow.
4. **Motion tied to reading.** Words light up as you scroll, so the page reads *to* you.
5. **Real product renders**, not illustrations.
6. **Restraint in UI chrome.** Tiny nav, ghost buttons, hairlines. No shadows, no cards with borders everywhere.
7. **Confident, short copy.**

### What not to copy
- **Exclusivity.** CRED says "members-only, 750+ credit score". Fermor's whole point is the opposite: clarity for everyone. **We flip it.**
- **Fonts.** Denton and Gilroy are commercial licences. Use free equivalents (§3).
- **Their assets, layouts or lines, word for word.**
- **Content-free hero.** CRED can afford "crafted for the creditworthy" with no product info. Fermor is unknown, so our hero must still say what Fermor does.
- **Scroll-only content.** Their manifesto is unreadable (30% grey) until scrolled. We make sure text is readable at rest.

---

## 2. The Fermor version: positioning flip

CRED: **"not everyone gets it."** A club for the creditworthy.
Fermor: **"clarity isn't a members-only club."** Everyone gets the math.

That one contrast gives the page its spine and a point of view, and shows the reviewer product thinking rather than imitation. Fermor's own old tagline, **"Financial clarity. Real momentum."** (found on their logo lockup), fits it.

Copy register: CRED's lowercase, short, confident style, with Fermor's specifics (₹, lakh, regimes, the actual math). Example: "money, with the math shown." / "every rupee, explained."

---

## 3. Fermor x CRED design language

### Colour
| Token | Value | Role |
|-------|-------|------|
| `void` | `#050606` | Page background (near-black with a hint of green, warmer than CRED's pure black) |
| `ink` | `#101214` | Raised panels |
| `white` | `#FFFFFF` + opacity tiers 90 / 70 / 50 / 25 / 12 | All text (same system as CRED) |
| `mint` | `#75FB90` | **The only UI colour.** Logo, one word per headline at most, focus rings, chart lines, the live number |
| `mint-glow` | `radial-gradient(closest-side, rgba(117,251,144,.35), transparent)` | Glow behind product renders (Fermor's version of CRED's neon) |
| `paper` | `#FFFFFF` | Hero sheet only, to host the white-background phone video |

Product-rail cards get **one colour each** from Fermor's own app cards (`card-*.webp`): mint `#75FB90` (Income), blue `#4B5BFF` (Investments), red-black (Expenses), lilac (Assets), sky (Goals). These are colours that come with the media, just like CRED's.

### Type (free substitutes)
| Role | CRED | Fermor pick | Why |
|------|------|-------------|-----|
| Display serif | Denton 700 | **Fraunces** (variable, 600 to 700, `opsz` 144, `SOFT` 0) | High-contrast, chunky serif on Google Fonts. Closest free feel to Denton. |
| Manifesto | Denton Light | **Fraunces 300** | Same family |
| UI / eyebrows / numbers | Gilroy | **Poppins** 500 to 700 | Geometric like Gilroy, and **already Fermor's heading font**, so it keeps brand continuity |
| Long body | Gilroy 500 | **Inter** 400 to 500 | Fermor's body font. Better at 16px. |

Scale (desktop → mobile):
- Display: `clamp(48px, 8vw, 120px)`, Fraunces 700, lh 0.92, tracking -0.03em, lowercase.
- Manifesto: `clamp(30px, 4.6vw, 68px)`, Fraunces 300, lh 1.25.
- Eyebrow: Poppins 600, 13px, UPPERCASE, tracking 0.35em, white/70.
- Body: Inter 18 to 20px, lh 1.7, white/70.
- Big number: Poppins 700, `clamp(64px, 9vw, 120px)`, tracking -0.04em, tabular figures.

### Layout
- Full-bleed folds, each at least 80vh on desktop, content-height on mobile.
- Content column max 1200px. Manifesto column max 820px.
- 1px hairlines `rgba(255,255,255,.08)` between folds.
- No card shadows. Surfaces are separated by hairlines and tone.

---

## 4. Fold plan (Fermor's own assets)

| # | Fold | Copy | Visual / asset | Effect |
|---|------|------|----------------|--------|
| 1 | **Hero (white sheet on black)** | "money, with the *math* shown." / sub: "158 free calculators and an app that explains every rupee. built for india." / `explore calculators →` `join the waitlist` | `fermor-phone-hero.mp4` (white background, phone rises) | Video plays once on load and holds. The sheet has 28px radius inside the black frame. As you scroll, the sheet scales to 0.94 and the corners round further, a "lights off" handoff into black. |
| 2 | **Manifesto** | Eyebrow "NOT A MEMBERS-ONLY CLUB." Body: "most money decisions in india are made on a guess. a bank's number. a friend's tip. a spreadsheet nobody checks. we think you deserve the working, not just the answer. so fermor shows the math, every time, to everyone." | Text only | Word-by-word reveal from white/25 to white, **but at least white/50 at rest** so it's readable |
| 3 | **App fan** | "every rupee, explained." | `screen-goals`, `screen-stocks-v2`, `screen-mutualfunds`, `screen-etfs` in CSS phone frames, fanned in 3D | Phones spread from stacked to fanned on scroll (transform only) |
| 4 | **Live calculator** (Fermor's edge, which CRED doesn't have) | "run it before you sign it." | Dark panel: SIP / EMI / Tax tabs. Result in a huge Poppins number with a mint glow. "show the math ⌄". | Count-up on change. This is the working implementation the brief asks for. |
| 5 | **Know where you stand** | "your whole money life, on one screen." | Floating stack of `card-income`, `card-investments`, `card-expenses`, `card-assets`, `card-goals` | Cards drift in at different parallax speeds. Label "preview · app in waitlist". |
| 6 | **Product rail** | "start where you are." | Tall cards: **Calculators** (live), **Ask**, **Portfolio**, **Market**, **Forecast**, **For Kids** (soon). Each has its own glow colour and a screen/card image. | Horizontal drag/scroll-snap. `KNOW MORE →` ghost buttons. "LIVE" / "SOON" tag. |
| 7 | **Privacy** | Eyebrow "YOUR NUMBERS AREN'T OUR BUSINESS." Body: "every calculation runs in your browser. nothing you type is sent to us to get a result. no login wall. ads are always labelled." | Mark icon in a shield outline | Spotlight word reveal (CRED-style, readable at rest) |
| 8 | **Proof** | "the math checks out." | **158** calculators · **2,472** mutual funds tracked daily · **7** indian languages · **₹0** to use. AMC logo strip. | Numbers count up once |
| 9 | **Latest analysis** | "news, with the math done." | 3 real article rows (see 05 §7) | Hover: the row brightens from white/70 to white |
| 10 | **Closing** | "now everyone gets it." / "join the waitlist for the fermor app." + email field | `curtain-reveal-bg.png` (cream silk) as a light panel, the bookend to the white hero | Curtain panels slide apart to reveal the CTA |
| 11 | **FAQ** | "questions" | 6 Q&As (05 §3.9) | Collapsed accordion, CRED-style, single hairline rows |
| 12 | **Footer** | — | Uppercase tracked headings, links at white/50, full disclosure, giant "fermor" in Fraunces at 22vw, clipped | — |

Opening and closing on light panels (hero white, curtain cream) while the body is black gives the page a beginning and an end. CRED does the same with its warm door-light ending.

---

## 5. Quality bar checklist (how we know we hit "CRED-level")

- [ ] Every fold has one idea and one headline. You can name it in three words.
- [ ] Only one UI colour (mint) on the page. Other colour comes from imagery.
- [ ] Display type is at least 96px on desktop for the main folds.
- [ ] Eyebrows are uppercase with ≥0.3em tracking on every fold.
- [ ] No drop shadows, no bordered card grids, no gradients except glows behind media.
- [ ] Motion: 60fps, transform/opacity only, nothing janky on a mid-range Android.
- [ ] Text is readable with JS off and with reduced motion on.
- [ ] Lighthouse mobile performance ≥ 85 despite the video (posters, lazy media, 720p mobile encodes).
- [ ] Someone who's never heard of Fermor knows what it does after the first screen.
- [ ] It doesn't look like CRED with a logo swap: mint, Fermor screens, the inclusive message, the live calculator.
