# Fermor Assets

Downloaded from https://fermor.in on 5 October 2026. These are Fermor's own brand and product assets, used here for the homepage assignment. Copy what you need into `public/` once the Next.js app exists.

## Logo (`logo/`)

| File | Size | What it is | Use |
|------|------|-----------|-----|
| `fermor-mark-2026.svg` | 404 B | **Current mark.** Two stepped stripes, mint `#75FB90`. Vector. | Nav, footer, favicon source. **Main logo.** |
| `fermor-mark-clean.png` | 449×289 | Older lime-green "F" mark, transparent | Inner pages still use it. Don't use it on the new homepage. |
| `fermor-mark.png` | 597×497 | Older lime "F" + "Fermor" wordmark + tagline **"FINANCIAL CLARITY. REAL MOMENTUM."** | Reference only. The tagline is worth reusing in copy. |
| `fermor-logo.png` | 1254×1254 | Same older lockup, square, transparent | Reference only |
| `icon.png` | 449×449 | Older lime "F" icon | Reference only |
| `favicon.ico` | — | Site favicon | Replace with one generated from the 2026 SVG |

Fermor has two logo generations. The **2026 mint stripes** are the live homepage mark. Use them everywhere. The lime "F" is the older system.

## Video (`video/`)

| File | Specs | Content |
|------|-------|---------|
| `fermor-phone-hero.mp4` | 3840×2160, 30 fps, 10.0 s, 3.8 MB, **pure white `#FFFFFF` background** | An iPhone rises from lying flat to upright. Its screen shows the Fermor app home: "₹12,48,230", a net worth chart, an "Invest with clarity" card, quick actions. |

**Using it:**
- The background is white, so place it on a white section, or inside a white rounded sheet on the black page. Don't put it on black: the white box will show.
- Make web versions before shipping (4K is too heavy for phones):
  ```bash
  ffmpeg -i fermor-phone-hero.mp4 -vf scale=1920:-2 -c:v libx264 -crf 24 -preset slow -an -movflags +faststart hero-1080.mp4
  ffmpeg -i fermor-phone-hero.mp4 -vf scale=720:-2 -c:v libx264 -crf 26 -preset slow -an -movflags +faststart hero-720.mp4
  ffmpeg -i fermor-phone-hero.mp4 -vf scale=1920:-2 -c:v libvpx-vp9 -crf 34 -b:v 0 -an hero-1080.webm
  ffmpeg -ss 9.9 -i fermor-phone-hero.mp4 -frames:v 1 -vf scale=1920:-2 hero-poster.jpg
  ```
- Markup: `<video autoplay muted playsinline preload="metadata" poster="/video/hero-poster.jpg">`. It plays once and holds on the last frame (the phone upright), so **don't loop it**.

## Images (`images/`)

### `app-screens/`: real Fermor app UI

| File | Size | Shows |
|------|------|-------|
| `screen-stocks-v2.webp` | 715×1600 | Full phone screen: Stocks tab, Nifty 22,374.65, popular stocks |
| `screen-mutualfunds.webp` | 735×1600 | Mutual funds tab: trending funds, categories, SIP |
| `screen-etfs.webp` | 735×1600 | ETFs tab |
| `screen-goals.webp` | 720×1556 | Home: "Good morning, Shreyas", financial health, goals (home, education, car) |
| `card-income.webp` | 774×481 | Mint card: Income ₹1,25,000, ▲12% |
| `card-investments.webp` | 787×496 | Blue card: Investments ₹8,42,300, chart |
| `card-expenses.webp` | 900×843 | Dark card: Monthly expenses ₹48,320, budget ring |
| `card-assets.webp` | 700×1207 | Lilac card: Assets ₹1,12,50,000 (property, vehicles, gold) |
| `card-goals.webp` | 734×485 | Light blue card: Goals, "Buy a Home 60%" |
| `hand-phone-cutout.webp` | 833×998 | Two hands holding a phone with a blank screen, transparent background. Put any `screen-*.webp` inside it. |

The full screens have no device frame. Wrap them in a CSS phone frame (rounded 44px, 10px black bezel, notch) or put them inside `hand-phone-cutout.webp`.

### `backgrounds/`

| File | Size | Notes |
|------|------|-------|
| `curtain-reveal-bg.png` / `-tall.webp` | 1721×914 / 1721×3656 | Soft white, cream and gold silk folds. Light and premium. |
| `purple-gradient-bg.png` | 1645×956 | Blue-violet glow from the current footer. **Off brand. Don't use it.** |

### `amc-logos/`
Axis, HDFC, ICICI Prudential, Invesco, Motilal Oswal, SBI, Tata, UTI (PNG). Use them for a "2,472 funds from every AMC" strip. These are third-party marks: show them only as data labels, not as endorsements.

## Not on the site (make these yourself)
- A white or black version of the 2026 mark: change the SVG `fill`.
- A wordmark SVG: set "Fermor" in the display font and convert it to outlines.
- An OG image: generate it with `next/og`.
