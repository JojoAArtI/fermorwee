# Fermor Homepage: Planning Docs

These docs come before any code. They hold the research on Fermor, the brand and design system pulled from the live site, and the plan for the new homepage. Read them in order the first time. After that, use them as reference while building.

Research date: 5 October 2026. Source: the live site at https://fermor.in, scraped with Scrapling (`scrapling 0.4.15`) and screenshotted with Playwright at 1440px and 390px wide.

## Files

| # | File | What it answers |
|---|------|-----------------|
| 01 | [01-company-research.md](01-company-research.md) | What Fermor is, who it serves, what the site contains today, how it talks |
| 02 | [02-current-site-audit.md](02-current-site-audit.md) | Section-by-section teardown of the current homepage: what works, what doesn't |
| 03 | [03-brand-guidelines.md](03-brand-guidelines.md) | Logo, colour, type, voice, and the rules for using them |
| 04 | [04-design-system.md](04-design-system.md) | Tokens, type scale, spacing, grid, components, motion, accessibility |
| 05 | [05-homepage-blueprint.md](05-homepage-blueprint.md) | Product thinking, page narrative, every section with layout and copy |
| 06 | [06-build-plan.md](06-build-plan.md) | Stack, folder structure, two-day schedule, QA checklist, deploy, README outline |
| **07** | [07-goal-cred-benchmark.md](07-goal-cred-benchmark.md) | **The goal.** CRED-level craft with Fermor's identity: CRED teardown, the "clarity isn't a members-only club" flip, the fold plan |
| **08** | [08-build-plan-cred-style.md](08-build-plan-cred-style.md) | **The build.** GSAP + Lenis stack, effects recipes, media pipeline, two-day schedule |

### Direction: CRED-inspired (current)
The brief doesn't require Fermor's design guidelines, so the visual target is **CRED's homepage** (dark, cinematic, big serif type, scroll-driven reveals), with Fermor's own logo, video, app screens and mint accent. **Where 07/08 conflict with 03 to 06, 07/08 win.** Still valid from the earlier docs: the company research (01), the audit (02), voice and compliance (03 §5, 01 §7), the finance math and tests (06 §3), the QA list (06 §5), and section content and copy ideas (05).

Main overrides:
- Dark page (`#050606`) instead of light paper. Hero and closing sit on light panels.
- Fonts: Fraunces + Poppins + Inter (not Space Grotesk).
- Scroll-linked motion is now wanted, within the guardrails in 08 §7.

## Fermor assets

`../assets/fermor/`: logo (2026 SVG + older lockups), the 4K hero phone video, 10 app screen and card images, backgrounds, AMC logos. Inventory and usage notes: [assets/fermor/README.md](../assets/fermor/README.md).

## Reference material

- `reference/fermor-mark-2026.svg`: the current logo mark, taken from the live site.
- `reference/sitemap-urls.txt`: all 2,980 URLs in fermor.in's sitemap.
- `reference/current-site/*.jpg`: screenshots of the current homepage and key inner pages.

## The idea in one paragraph

Fermor's real asset today is not the app on the waitlist. It is 158 free calculators, a strict "show the full math" principle, and an honest, India-specific voice. The current homepage hides all of that behind a generic "Build your wealth" pitch with purple gradients and long empty scroll sections. The new homepage turns this around. It starts from the decision the visitor is facing, lets them run real numbers in the hero, and then shows how the coming app (Ask, Portfolio, Market, Forecast) carries the same clarity further. The structure follows the brief's own wording: **understand, act, grow**.
