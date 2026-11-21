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
