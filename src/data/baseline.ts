// Shopify Analytics snapshot pulled Oct 21, 2026 (see docs/03-launch-baseline.md)

export const funnel = [
  { step: 'Sessions', value: 270 },
  { step: 'Added to cart', value: 3 },
  { step: 'Reached checkout', value: 1 },
  { step: 'Completed order', value: 0 },
]

export const dailySessions = [
  { day: 'Oct 14', sessions: 19 },
  { day: 'Oct 15', sessions: 15 },
  { day: 'Oct 16', sessions: 62 },
  { day: 'Oct 17', sessions: 58 },
  { day: 'Oct 18', sessions: 28 },
  { day: 'Oct 19', sessions: 38 },
  { day: 'Oct 20', sessions: 25 },
  { day: 'Oct 21*', sessions: 7 },
]

export const sources = [
  { label: 'Direct', value: 247 },
  { label: 'Social (FB 9 · IG 7)', value: 16 },
  { label: 'Search', value: 6 },
  { label: 'Email', value: 1 },
]

export const countries = [
  { label: 'Lebanon', value: 120 },
  { label: 'United States', value: 107 },
  { label: 'Rest of world', value: 43 },
]

export const headline = [
  { value: '252', label: 'sessions in launch week (Oct 14–21)' },
  { value: '1.1%', label: 'of sessions add to cart' },
  { value: '0', label: 'completed orders' },
  { value: '91%', label: 'of traffic is direct, 6% social' },
]
