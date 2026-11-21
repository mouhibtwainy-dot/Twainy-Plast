# Final deck: Strategic Digital Transformation Deck (MKT 843)

- `Twainy-Plast-Final-Deck.pptx`: the 26-slide deck (Steps 1–5, results, scorecard, ROI, learnings, recommendations).
- `results.json`: every number in the deck. Shopify figures were pulled on Nov 21, 2026. Social media, WhatsApp, ads, Google Business Profile, competitor and team values are `null` until filled; each `null` shows in the deck as an amber **[to add]** tag.
- `build-final.cjs`: rebuilds the deck from `results.json`.

## Rebuild
```bash
mkdir -p /tmp/deckdeps && (cd /tmp/deckdeps && npm i pptxgenjs@3.12.0 sharp@0.33 react@18 react-dom@18 react-icons@5)
NODE_PATH=/tmp/deckdeps/node_modules DECK_DEPS=/tmp/deckdeps node deck/build-final.cjs
```
Add `APPLY_THEME=<path to the pptx skill's apply_theme.js>` to write the green/red theme colours into the file's theme.

## Professional presentation (current)
- `Twainy-Plast-Presentation.pptx`: 21-slide presentation built by `build-pro.cjs` (same data file, same rebuild command with `build-pro.cjs`).
- Adds the client story (since 1987, 5+ brand agencies), the four brand agencies with logos, the social-media gap for sanitary ware, and the Shopify + AI website, then Steps 1–5 with dashboard-style results. Revenue amounts are not shown; growth is in percentages.
- Brand logos in `assets/brands/`: Haykal Plast (haykalplast.com), MiaTherm (Haykal Plast catalogue cover), PLIMAT (plimat.pt). Şenkron is shown as a name card until its official logo is supplied.
