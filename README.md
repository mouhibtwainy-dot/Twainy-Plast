# Twainy Plast: From Visitors to Customers

MKT 843 *Strategic Social Media Management in the Digital Age* (LAU AKSOB MBA, Dr. Kiray Khoury). This is the Final Applied Consulting Project for **Twainy Plast Sanitary** ([twainyplast.com](https://twainyplast.com)).

> **Research question:** How can Twainy Plast use targeted social content, customer trust and an easier buying journey to turn website visitors into paying customers?

## What's in this repo

| Path | What it is | Project step |
|---|---|---|
| `docs/01-project-brief.md` | **One-page brief, due Oct 22** | Step 1 |
| `docs/02-owner-consent-form.md` | Owner consent and authorisation (EN + AR) | Step 1 |
| `docs/03-launch-baseline.md` | Shopify launch baseline (real data, Oct 7–21, 2026) | Steps 1 & 5 |
| `docs/04-research-toolkit.md` | Competitor audit sheet, interview script, mobile test, survey, social listening | Steps 2 & 5 |
| `docs/05-store-fix-list.md` | Evidence-based store fixes to make before spending on ads | Steps 3 & 5 |
| `src/` | **Strategic Digital Transformation Deck**: an interactive web deck covering Steps 1–5 | All |

### Deck contents (29 slides)
Business problem → launch baseline → barrier diagnosis → competitor audit framework → 2 personas → brand identity matrix → community guidelines → channel architecture → Instagram profile and link-in-bio mockups → GBP, local SEO and WhatsApp Business → campaign funnel → content pillars and hashtags → 4-week calendar → 3 Reel storyboards → 5 posts/carousels → $200 paid test → KPI framework → tracking stack → interactive ROI/CAC/ROAS model → ethics and local impact → timeline and team roles.

Content lives in `src/data/` (`baseline.ts`, `products.ts`, `strategy.ts`). Edit those files to update the deck without touching the layout.

## Run the deck

```bash
npm install
npm run dev        # local preview
npm run build      # production build in dist/
```

- **Navigate:** ← / → or PageUp / PageDown, or use the slide numbers on the right.
- **Export to PDF for submission:** open the deck in Chrome, choose Print, set Landscape with background graphics on, and save as PDF. Each slide prints as one A4 landscape page.

## Before presenting: things to fill in or verify
- `[names]`, store address, delivery areas and fees, payment methods, gross margin, and the founding year
- Competitor names and audit figures (see the research toolkit). No competitor numbers are estimated.
- Personas are **hypotheses** until the interviews and survey are done; update `src/data/strategy.ts`
- Offer terms (free delivery, dates, areas) **must be approved by the owner**
- Replace the generated product renders with real photos for the 6 hero products
- After the campaign, add a results slide comparing against the baseline in `docs/03-launch-baseline.md`
