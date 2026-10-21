# Launch Baseline — twainyplast.com

> Source: Shopify Analytics (store `q7ueuf-pn.myshopify.com`), pulled **October 21, 2026**. Store time zone EEST, currency USD, plan: Basic.
> Save a screenshot of every report below on the same day. This is the "before" picture that the campaign is measured against.

## 1. Daily sessions and funnel (Oct 7–21)

| Day | Sessions | Visitors | Cart adds | Reached checkout | Orders |
|---|---:|---:|---:|---:|---:|
| Oct 7–13 (pre-launch, 7 days) | 18 | 12 | 0 | 0 | 0 |
| Oct 14 | 19 | 18 | 0 | 0 | 0 |
| Oct 15 | 15 | 11 | 0 | 0 | 0 |
| Oct 16 | 62 | 56 | 0 | 0 | 0 |
| Oct 17 | 58 | 49 | 2 | 1 | 0 |
| Oct 18 | 28 | 23 | 0 | 0 | 0 |
| Oct 19 | 38 | 30 | 0 | 0 | 0 |
| Oct 20 | 25 | 19 | 1 | 0 | 0 |
| Oct 21 (partial) | 7 | 7 | 0 | 0 | 0 |
| **Launch week total (Oct 14–21)** | **252** | — | **3** | **1** | **0** |

The figure of "about 150 visitors" quoted earlier was a partial count. The confirmed launch-week figure is **252 sessions**. Shopify calculates conversion rate per **session**, so this project reports sessions.

**Funnel rates (14 days, 270 sessions):** session → cart **1.1%** · cart → checkout **33%** (1 of 3) · checkout → order **0%** (0 of 1).
The drop-off happens **before** the cart. With one checkout attempt we cannot yet say whether checkout itself has a problem, so the mobile checkout test in the research toolkit is still required.

## 2. Where sessions come from

| Source | Sessions | Share |
|---|---:|---:|
| Direct (links shared on WhatsApp, typed URL) | 247 | 91% |
| Social: Facebook 9, Instagram 7 | 16 | 6% |
| Search | 6 | 2% |
| Email | 1 | <1% |

| Country | Sessions | | Device | Sessions |
|---|---:|---|---|---:|
| Lebanon | 120 (44%) | | Desktop | 140 (52%) |
| United States | 107 (40%) | | Mobile | 125 (46%) |
| Europe (DE, FR, NL, PL, …) | ~30 | | Tablet/other | 5 |

**Interpretation (to verify):** The US share and the high desktop share are unusual for a Lebanese retail store. They point to bots and crawlers, team testing or diaspora visits. **The campaign KPI baseline uses Lebanon sessions only (120).** Filter internal IPs in GA4 before launch.

## 3. Landing pages
218 of 256 sessions (85%) landed on the homepage. `/pages/offers` 7, Arabic homepage `/ar` 4, individual products 1–3 each. Product pages are almost never the entry point. Ads and posts should link **straight to product or collection pages** with UTM tags.

## 4. Catalogue observations (from the Shopify product list)
- **175 active products.** Deepest stock: complementary items (1,891 units), sprayers (944), mixers (691), mirrors (323), floor drains (218).
- **Campaign-ready hero products** (well stocked, clear prices):
  - Brax mixers: Tall Neck $30 (53 units), Short Neck $25 (51), Chrome Mixer $30 to $40 (37 to 48), Kore 25 cm $65 (31)
  - LED mirrors: 60×60 Round LED $40 to $45 (25 to 30), 120×60 Wave LED $60 (28), 70×50 LED $45 (30)
- **Avoid in ads:** WCs, vanities, basins and many pumps have **1 to 2 units** in stock. Advertising them risks stock-outs.
- **Trust and clarity issues:**
  - Most product images are generated renders (file names like `ChatGPT Image …`), not real photos.
  - Several products share identical titles (3 × "70×50cm LED Mirror – Designed Pattern", 2 × "Oscar White WC", 3 × "Brax Chrome Mixer").
  - Some product types are wrong (a vanity and a WC are filed under `MIXER`).
  - URL handles are numeric (`/products/1`, `/products/2-1`, `/products/11`), which is weak for SEO and for sharing.
- **Past orders:** 2 orders in the last 365 days, both $0 total sales (likely test orders). The real sales baseline is **$0**.

## 5. Baseline KPI snapshot (to beat)
| KPI | Baseline (launch week) |
|---|---|
| Lebanon sessions / week | ~120 (14 days; refine with GA4) |
| Social referral sessions / week | ~16 |
| Session → add-to-cart | 1.1% |
| Online orders | 0 |
| WhatsApp inquiries / week | [count from WhatsApp Business: to collect] |
| Instagram followers / Facebook likes | [to collect Oct 22] |
| Google Business Profile views / direction requests | [to collect] |
