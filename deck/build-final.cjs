// Builds the final Strategic Digital Transformation Deck (MKT 843) from deck/results.json.
// Usage: DECK_DEPS=<folder containing node_modules with pptxgenjs, sharp, react@18, react-dom@18, react-icons>
//        [APPLY_THEME=<pptx skill apply_theme.js>] node deck/build-final.cjs [out.pptx]
const fs = require('fs')
const path = require('path')
// Load every library from one folder (DECK_DEPS) so React versions can't mix with the website's
const DEPS = process.env.DECK_DEPS
const need = (m) => require(DEPS ? require.resolve(m, { paths: [DEPS] }) : m)
const pptxgen = need('pptxgenjs')
const sharp = need('sharp')
const React = need('react')
const { renderToStaticMarkup } = need('react-dom/server')
const fa = need('react-icons/fa')

const ROOT = __dirname
const OUT = process.argv[2] || path.join(ROOT, 'Twainy-Plast-Final-Deck.pptx')
const D = JSON.parse(fs.readFileSync(path.join(ROOT, 'results.json'), 'utf8'))
const A = (f) => path.join(ROOT, 'assets', f)
const THEME_SCRIPT = process.env.APPLY_THEME

const HEX = { ink: '1A1F1C', green: '1B4D2B', leaf: '2E7D3A', mist: 'EEF5F0', red: 'D63A14', chrome: '8D99AE', slate: '5B6770', grid: 'E3E8E5', sage: 'A9CDB1', amber: 'B26A00', amberBg: 'FFF3D6', white: 'FFFFFF' }
const THEME = {
  name: 'Twainy Plast',
  headFontFace: 'Calibri',
  bodyFontFace: 'Calibri',
  colors: { dk1: HEX.ink, lt1: HEX.white, dk2: HEX.green, lt2: HEX.mist, accent1: HEX.leaf, accent2: HEX.red, accent3: HEX.chrome, accent4: HEX.sage, accent5: HEX.slate, accent6: 'C9A227', hlink: HEX.leaf, folHlink: HEX.green },
}

const pres = new pptxgen()
pres.layout = 'LAYOUT_WIDE'
pres.title = 'Twainy Plast: Strategic Digital Transformation Deck'
pres.author = 'MKT 843 Consulting Team'
pres.company = 'LAU AKSOB MBA'
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace }
const C = pres.SchemeColor

// ---------- data helpers ----------
const S = D.shopify
const B = S.baseline
const K = S.campaign
const pct = (x, d = 1) => (x * 100).toFixed(d) + '%'
const money = (x) => '$' + Math.round(x).toLocaleString('en-US')
const has = (x) => x !== null && x !== undefined && x !== ''
const TBD = '[to add]'
const show = (x, f = (y) => String(y)) => (has(x) ? f(x) : TBD)
const perWeek = (n, days) => (n / days) * 7
const delivered = S.orders.filter((o) => o.status === 'Delivered')
const deliveredRevenue = delivered.reduce((s, o) => s + o.total, 0)
const atcBase = B.cartSessions / B.sessions
const atcCamp = K.cartSessions / K.sessions
const crCamp = K.orders / K.sessions
const socialBaseWk = perWeek(B.socialSessions, B.days)
const socialCampWk = perWeek(K.instagramSessions + K.facebookSessions, K.days)
const searchBaseWk = perWeek(B.searchSessions, B.days)
const searchCampWk = perWeek(K.googleSessions + K.bingSessions, K.days)
const W = D.whatsapp
const SO = D.social
const AD = D.ads
const totalOrders = K.deliveredOrders + (has(W.orders) ? W.orders : 0)
const totalRevenue = deliveredRevenue + (has(W.revenue) ? W.revenue : 0)

// ---------- layouts ----------
const footerObjs = (dark) => [
  { text: { text: 'Twainy Plast · MKT 843 Final Consulting Project', options: { x: 0.6, y: 7.0, w: 7, h: 0.3, fontSize: 10, color: dark ? HEX.sage : HEX.slate, margin: 0 } } },
]
pres.defineSlideMaster({
  title: 'TITLE_DARK',
  background: { color: HEX.green },
  objects: [
    { placeholder: { options: { name: 'title', type: 'title', x: 0.6, y: 2.0, w: 7.4, h: 1.9, fontSize: 48, bold: true, color: C.background1, valign: 'top', align: 'left', margin: 0 }, text: '' } },
    { placeholder: { options: { name: 'body', type: 'body', x: 0.6, y: 4.0, w: 7.4, h: 1.0, fontSize: 20, color: C.accent4, valign: 'top', align: 'left', margin: 0 }, text: '' } },
  ],
})
pres.defineSlideMaster({
  title: 'CONTENT',
  background: { color: HEX.white },
  objects: [
    { placeholder: { options: { name: 'step', type: 'body', x: 0.6, y: 0.28, w: 9, h: 0.3, fontSize: 12, bold: true, color: C.accent2, align: 'left', margin: 0, charSpacing: 2 }, text: '' } },
    { placeholder: { options: { name: 'title', type: 'title', x: 0.6, y: 0.58, w: 12.1, h: 0.75, fontSize: 30, bold: true, color: C.text2, valign: 'middle', align: 'left', margin: 0 }, text: '' } },
    ...footerObjs(false),
  ],
  slideNumber: { x: 12.3, y: 7.0, w: 0.5, h: 0.3, fontSize: 10, color: HEX.slate },
})

// ---------- drawing helpers ----------
async function icon(Comp, hex) {
  const svg = renderToStaticMarkup(React.createElement(Comp, { color: '#' + hex, size: 256 }))
  return 'image/png;base64,' + (await sharp(Buffer.from(svg)).png().toBuffer()).toString('base64')
}
async function fit(slide, file, x, y, maxW, maxH, o = {}) {
  const m = await sharp(file).metadata()
  const r = Math.min(maxW / m.width, maxH / m.height)
  const w = m.width * r
  const h = m.height * r
  const ox = o.align === 'left' ? x : x + (maxW - w) / 2
  const oy = o.valign === 'top' ? y : y + (maxH - h) / 2
  slide.addImage({ path: file, x: ox, y: oy, w, h, altText: o.alt || '' })
  return { x: ox, y: oy, w, h }
}
const card = (s, x, y, w, h, fill = C.background2) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { color: fill, width: 0 } })
const text = (s, t, o) => s.addText(t, { isTextBox: true, margin: 0, fontSize: 14, color: C.text1, valign: 'top', ...o })
async function dot(s, Comp, x, y, d = 0.6, fill = C.accent1) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 } })
  const p = d * 0.25
  s.addImage({ data: await icon(Comp, HEX.white), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p })
}
// A value run: amber [to add] when missing
const val = (x, f, o = {}) => (has(x) ? { text: f ? f(x) : String(x), options: o } : { text: TBD, options: { ...o, color: HEX.amber, highlight: HEX.amberBg } })
function stat(s, x, y, w, h, big, label, o = {}) {
  card(s, x, y, w, h, o.fill || C.text2)
  const missing = big === TBD
  text(s, big, { x: x + 0.22, y: y + 0.18, w: w - 0.44, h: h * 0.5, fontSize: o.size || 36, bold: true, color: missing ? HEX.amber : o.fg || C.background1, valign: 'middle', highlight: missing ? HEX.amberBg : undefined })
  text(s, label, { x: x + 0.22, y: y + h * 0.58, w: w - 0.44, h: h * 0.38, fontSize: 12, color: o.fg || C.background1 })
}
const chartBase = {
  catAxisLabelColor: HEX.slate, valAxisLabelColor: HEX.slate, catAxisLabelFontSize: 11, valAxisLabelFontSize: 10,
  catAxisLabelFontFace: '+mn-lt', valAxisLabelFontFace: '+mn-lt', dataLabelFontFace: '+mn-lt', titleFontFace: '+mn-lt', legendFontFace: '+mn-lt',
  dataLabelFontSize: 11, dataLabelColor: HEX.ink, showValue: true, showTitle: true, titleFontSize: 13, titleColor: HEX.green,
  valGridLine: { color: HEX.grid, size: 0.5 }, catGridLine: { style: 'none' }, valAxisHidden: true, showLegend: false,
}
const hdrRow = (cells) => cells.map((t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 } } }))
const tableOpts = (x, y, w, colW) => ({ x, y, w, colW, fontSize: 12, color: HEX.ink, border: { type: 'solid', pt: 0.5, color: HEX.grid }, valign: 'middle', margin: [0.03, 0.08, 0.03, 0.08] })
const cell = (x, f) => (has(x) ? (f ? f(x) : String(x)) : { text: TBD, options: { color: HEX.amber, italic: true } })

let n = 0
function slide(step, title, section) {
  const s = pres.addSlide({ masterName: 'CONTENT', sectionTitle: section })
  s.addText(step, { placeholder: 'step' })
  s.addText(title, { placeholder: 'title' })
  n++
  return s
}

;(async () => {
  // ===== 1. Title =====
  pres.addSection({ title: 'Opening' })
  let s = pres.addSlide({ masterName: 'TITLE_DARK', sectionTitle: 'Opening' })
  s.addText('From Visitors to Customers', { placeholder: 'title' })
  s.addText('Strategic Digital Transformation Deck · Twainy Plast Sanitary', { placeholder: 'body' })
  card(s, 0.6, 0.6, 1.4, 1.0, C.background1)
  await fit(s, A('logo.png'), 0.7, 0.66, 1.2, 0.88, { alt: 'Twainy Plast logo' })
  text(s, 'Choose with Confidence · اختار بثقة', { x: 0.6, y: 5.05, w: 7.4, h: 0.5, fontSize: 22, bold: true, color: C.accent2 })
  const names = D.team.map((t) => t.name).filter(has)
  text(s, [
    { text: 'MKT 843 Strategic Social Media Management · Dr. Kiray Khoury · LAU AKSOB MBA', options: { breakLine: true } },
    { text: 'Final presentation · November 26, 2026 · Team: ' },
    names.length ? { text: names.join(', ') } : { text: '[team names]', options: { color: HEX.amber } },
  ], { x: 0.6, y: 5.8, w: 7.6, h: 0.8, fontSize: 14, color: C.accent4 })
  const hero = await fit(s, A('site-desktop.jpg'), 8.4, 1.6, 4.4, 4.0, { alt: 'twainyplast.com homepage' })
  text(s, 'twainyplast.com · Qsarnaba, Lebanon', { x: 8.4, y: hero.y + hero.h + 0.1, w: 4.4, h: 0.3, fontSize: 11, color: C.accent4, align: 'right' })
  s.addNotes('Open with the client and the question: a family sanitary-ware store launched a website and nobody was buying. Over 4 weeks we tested how social content, trust and an easier buying journey could change that.')

  // ===== 2. Executive summary =====
  s = slide('EXECUTIVE SUMMARY', 'Four weeks, first real sales, and a clear path to scale', 'Opening')
  text(s, [
    { text: 'The problem: ', options: { bold: true, color: C.text2 } },
    { text: `Twainy Plast launched twainyplast.com in October with 175 products. In the launch period (${S.baselinePeriod}) it had ${B.sessions} sessions and 0 orders.`, options: { breakLine: true } },
    { text: 'What we did: ', options: { bold: true, color: C.text2 } },
    { text: 'Audited the store and competitors, built two personas, a green-and-red brand system and a channel ecosystem, then ran the 4-week "Choose with Confidence" campaign: trust, how to order, free help choosing, live video before buying.', options: { breakLine: true } },
    { text: 'What happened: ', options: { bold: true, color: C.text2 } },
    { text: `${K.orders} online orders (${K.deliveredOrders} delivered, ${money(deliveredRevenue)}), a delivered average order of ${money(deliveredRevenue / K.deliveredOrders)}, social visits ×${(socialCampWk / socialBaseWk).toFixed(1)} and search visits ×${(searchCampWk / searchBaseWk).toFixed(1)} per week, and 70% of traffic now from Lebanon.` },
  ], { x: 0.6, y: 1.55, w: 6.6, h: 4.3, fontSize: 15, paraSpaceAfter: 10 })
  const tiles = [
    [String(K.orders), `online orders (${K.deliveredOrders} delivered)`, C.text2],
    [money(deliveredRevenue), 'delivered online revenue', C.text2],
    [show(W.orders), 'WhatsApp-assisted orders', C.accent2],
    [`×${(socialCampWk / socialBaseWk).toFixed(1)}`, 'social visits per week vs launch', C.text2],
    [pct(atcCamp), `add-to-cart rate (launch ${pct(atcBase)})`, C.text2],
    [show(SO.reach, (x) => x.toLocaleString('en-US')), 'social reach (Lebanon)', C.text2],
  ]
  tiles.forEach(([b, l, f], i) => stat(s, 7.5 + (i % 2) * 2.65, 1.5 + Math.floor(i / 2) * 1.45, 2.45, 1.3, b, l, { fill: f, size: 28 }))
  card(s, 0.6, 6.05, 12.1, 0.75, C.background2)
  text(s, [{ text: 'Bottom line: ', options: { bold: true, color: C.accent2 } }, { text: 'demand is real and nationwide, and baskets are large. The next lever is conversion: fix checkout friction, track every source, and turn social attention into WhatsApp and website orders.' }], { x: 0.85, y: 6.1, w: 11.6, h: 0.65, fontSize: 14, valign: 'middle' })

  // ===== 3. Client & problem =====
  pres.addSection({ title: 'Step 1 · Diagnose' })
  s = slide('STEP 1 · BUSINESS SELECTION & AUDIT', 'The client and the problem: visitors, but no buyers', 'Step 1 · Diagnose')
  text(s, [
    { text: 'Twainy Plast Sanitary', options: { bold: true } },
    { text: ' is a family-run sanitary-ware and plumbing retailer in Qsarnaba. It sells mixers, LED mirrors, WCs, basins, showers and pumps, mostly between $5 and $250, to homeowners and plumbers.' },
  ], { x: 0.6, y: 1.55, w: 6.2, h: 1.1, fontSize: 15 })
  text(s, 'Core value proposition: we help homeowners and professionals choose the right bathroom and plumbing products, with clear information, practical advice and dependable delivery across Lebanon.', { x: 0.6, y: 2.75, w: 6.2, h: 1.0, fontSize: 14, italic: true, color: C.text2 })
  const base = [[String(B.sessions), `sessions (${S.baselinePeriod})`], ['0', 'orders'], [pct(atcBase), 'add-to-cart rate'], [pct(B.lebanonShare, 0), 'traffic from Lebanon']]
  base.forEach(([b, l], i) => stat(s, 0.6 + i * 1.57, 3.95, 1.45, 1.35, b, l, { fill: i === 1 ? C.accent2 : C.text2, size: 26 }))
  text(s, 'Digital gaps found: no active social presence (6% of traffic), product renders instead of photos, delivery terms hidden until checkout, no tracking, numeric product URLs, a hero button reading "Our Journey" instead of "Shop".', { x: 0.6, y: 5.5, w: 6.2, h: 1.2, fontSize: 13, color: C.accent5 })
  await fit(s, A('site-desktop.jpg'), 7.2, 1.55, 5.5, 3.6, { alt: 'Website homepage' })
  text(s, 'twainyplast.com at launch. Source: Shopify Analytics.', { x: 7.2, y: 5.25, w: 5.5, h: 0.3, fontSize: 11, color: C.accent5, align: 'right' })

  // ===== 4. Ethics & consent =====
  s = slide('STEP 1 · ETHICAL AUDIT & CONSENT', 'Client consent and ethical guardrails, agreed up front', 'Step 1 · Diagnose')
  const eth = [
    [fa.FaFileSignature, 'Owner consent', 'Signed authorisation for audits, creative work and presenting results. No post published and no budget spent without the owner’s approval.'],
    [fa.FaUserShield, 'Data privacy', 'Customer data used only for orders. Interview notes anonymised. Opt-in WhatsApp lists. Follows Lebanon’s Law 81/2018.'],
    [fa.FaTags, 'Honest offers', 'Only real, standing terms (free delivery over $30, cash on delivery). No fake discounts or countdowns.'],
    [fa.FaStar, 'Authentic proof', 'No invented reviews. Generated product renders labelled “illustrative” until replaced by real photos.'],
    [fa.FaBullseye, 'Ethical targeting', 'Location-based ads only. No targeting by religion, sect, politics or other sensitive traits.'],
    [fa.FaExclamationTriangle, 'Issue we flagged', 'Checkout pre-ticks “email me news and offers”. We recommended making marketing consent opt-in.'],
  ]
  for (let i = 0; i < eth.length; i++) {
    const [ic, h, d] = eth[i]
    const x = 0.6 + (i % 3) * 4.1
    const y = 1.6 + Math.floor(i / 3) * 2.6
    card(s, x, y, 3.85, 2.35, i === 5 ? 'FBE9E4' : C.background2)
    await dot(s, ic, x + 0.25, y + 0.25, 0.6, i === 5 ? C.accent2 : C.accent1)
    text(s, h, { x: x + 1.0, y: y + 0.3, w: 2.7, h: 0.5, fontSize: 17, bold: true, color: C.text2, valign: 'middle' })
    text(s, d, { x: x + 0.25, y: y + 1.0, w: 3.4, h: 1.25, fontSize: 13 })
  }

  // ===== 5. Competitors =====
  pres.addSection({ title: 'Step 2 · Research' })
  s = slide('STEP 2 · COMPETITIVE SOCIAL LANDSCAPE', 'Competitor social audit: few local sellers explain or show prices', 'Step 2 · Research')
  const comp = D.competitors
  const rows = [
    hdrRow(['Metric (last 30 days)', 'Twainy Plast', ...comp.map((c) => `${c.name} (${c.type})`)]),
    ['Followers (IG + FB)', cell(has(SO.igFollowersEnd) && has(SO.fbFollowersEnd) ? SO.igFollowersEnd + SO.fbFollowersEnd : null, (x) => x.toLocaleString('en-US')), ...comp.map((c) => cell(c.followers, (x) => x.toLocaleString('en-US')))],
    ['Posts per 30 days', cell(SO.postsPublished), ...comp.map((c) => cell(c.postsPer30d))],
    ['Engagement rate (by followers)', cell(null), ...comp.map((c) => cell(c.engagementRate, (x) => pct(x)))],
    ['Prices shown in posts?', 'Yes, on every post', ...comp.map((c) => cell(c.pricesShown))],
    ['Purchase path', 'Website + WhatsApp + store', ...comp.map((c) => cell(c.notes))],
  ]
  s.addTable(rows, { ...tableOpts(0.6, 1.55, 12.1, [3.2, 2.5, 2.15, 2.15, 2.1]), rowH: 0.5 })
  card(s, 0.6, 4.8, 5.9, 1.95, C.background2)
  text(s, [{ text: 'Method', options: { bold: true, color: C.text2, breakLine: true } }, { text: 'Same-day count of public posts over 30 days. Engagement rate = average interactions ÷ followers. Share of voice = brand posts ÷ all four brands’ posts. We did not estimate competitors’ reach or sales.' }], { x: 0.85, y: 4.95, w: 5.4, h: 1.7, fontSize: 12 })
  card(s, 6.8, 4.8, 5.9, 1.95, C.text2)
  text(s, [{ text: 'Opportunity', options: { bold: true, color: C.accent4, breakLine: true } }, { text: 'Competitors show products but rarely explain fit, delivery or price. Twainy can own “clear and honest”: prices on every post, how-to-order guides, and live video before buying.', options: { color: C.background1 } }], { x: 7.05, y: 4.95, w: 5.4, h: 1.7, fontSize: 13 })

  // ===== 6. Personas =====
  s = slide('STEP 2 · DATA-DRIVEN BUYER PERSONAS', 'Two personas, validated by who actually ordered', 'Step 2 · Research')
  const personas = [
    [fa.FaHome, 'Rania, 34 · Homeowner renovating', 'Goal: buy online with confidence', [['Demographics', 'Middle income, partly USD-earning; Beirut, Mount Lebanon and Bekaa'], ['Values & pains', 'Good looks on a budget; fears wrong fit, poor quality and delivery risk'], ['Social habits', 'Instagram first, FB groups, WhatsApp · 13:00–14:00 and 21:00–23:00 · Reels, carousels, saved guides'], ['Influencers', 'Lebanese home-décor micro-creators (10–50k)']]],
    [fa.FaTools, 'Hassan, 45 · Plumber / contractor', 'Goal: quick quote on WhatsApp', [['Demographics', 'Self-employed, variable income; serves his district and nearby areas'], ['Values & pains', 'Reliability and fair trade price; wasted trips, changing prices, slow replies'], ['Social habits', 'WhatsApp first, Facebook, YouTube/TikTok how-tos · 06:30–08:00 and 20:00–22:00 · price lists, short demos'], ['Influencers', 'Plumbing how-to channels and supplier pages']]],
  ]
  for (let i = 0; i < 2; i++) {
    const [ic, nme, goal, facts] = personas[i]
    const x = 0.6 + i * 4.2
    card(s, x, 1.55, 4.0, 5.2, C.background2)
    await dot(s, ic, x + 0.25, 1.75, 0.75, C.text2)
    text(s, nme, { x: x + 1.15, y: 1.75, w: 2.75, h: 0.75, fontSize: 16, bold: true, color: C.text2, valign: 'middle' })
    text(s, goal, { x: x + 0.25, y: 2.65, w: 3.5, h: 0.35, fontSize: 13, bold: true, color: C.accent1 })
    text(s, facts.flatMap(([k, v], j) => [{ text: k + ': ', options: { bold: true } }, { text: v, options: { breakLine: j < facts.length - 1 } }]), { x: x + 0.25, y: 3.1, w: 3.5, h: 3.5, fontSize: 12, paraSpaceAfter: 8 })
  }
  card(s, 9.1, 1.55, 3.6, 5.2, C.text2)
  text(s, 'Validation from real orders', { x: 9.35, y: 1.75, w: 3.1, h: 0.4, fontSize: 15, bold: true, color: C.accent4 })
  text(s, [
    ...S.orders.flatMap((o) => [{ text: `${o.city}: `, options: { bold: true, color: C.background1 } }, { text: `${money(o.total)}, ${o.items} items (${o.status.toLowerCase()})`, options: { color: C.background1, breakLine: true } }]),
    { text: ' ', options: { breakLine: true } },
    { text: 'Orders came from Beirut, Metn and Bekaa, so demand is nationwide, not local. Multi-item baskets match renovators and plumbers buying for a whole job.', options: { color: C.accent4 } },
  ], { x: 9.35, y: 2.25, w: 3.15, h: 4.3, fontSize: 12, paraSpaceAfter: 4 })

  // ===== 7. Brand identity =====
  pres.addSection({ title: 'Step 3 · Position' })
  s = slide('STEP 3 · BRAND IDENTITY MATRIX', 'Brand identity: clear, honest, neighbourly', 'Step 3 · Position')
  text(s, [{ text: 'Promise: ', options: { bold: true } }, { text: 'Choose with Confidence · اختار بثقة', options: { breakLine: true } }, { text: 'Voice: ', options: { bold: true } }, { text: 'knowledgeable, honest, practical. English first, Lebanese Arabic second.' }], { x: 0.6, y: 1.55, w: 6.2, h: 0.9, fontSize: 14, paraSpaceAfter: 4 })
  s.addTable([
    hdrRow(['Context', 'Tone', 'Example']),
    ['Education', 'Clear, step by step', '“3 things to check before buying a mixer.”'],
    ['Offers', 'Exact terms, no hype', '“Free delivery over $30, all over Lebanon.”'],
    ['Complaints', 'Calm, accountable', '“We’re sorry. We’ve messaged you to fix it today.”'],
    ['Plumbers', 'Short, technical', '“In stock. ½″, wall-mounted, $30.”'],
  ], { ...tableOpts(0.6, 2.55, 6.2, [1.4, 1.7, 3.1]), rowH: 0.42 })
  text(s, 'Community guidelines: reply within 1 hour in store hours · answer price questions publicly · move personal details to DM · never delete criticism, only spam or abuse · repost customer photos only with permission.', { x: 0.6, y: 4.85, w: 6.2, h: 1.2, fontSize: 12, color: C.accent5 })
  const pal = [['Twainy Green', HEX.green], ['Leaf Green', HEX.leaf], ['Mist', HEX.mist], ['Chrome', HEX.chrome], ['Twainy Red', HEX.red]]
  pal.forEach(([nm, hx], i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.2 + i * 1.1, y: 1.6, w: 0.95, h: 0.95, rectRadius: 0.1, fill: { color: hx }, line: { color: HEX.grid, width: 0.75 } })
    text(s, nm, { x: 7.15 + i * 1.1, y: 2.6, w: 1.05, h: 0.3, fontSize: 10, bold: true, align: 'center' })
    text(s, '#' + hx, { x: 7.15 + i * 1.1, y: 2.85, w: 1.05, h: 0.25, fontSize: 9, color: C.accent5, align: 'center' })
  })
  text(s, 'Colours are taken from the existing logo. Red is reserved for prices and calls to action. Typeface: Cairo (Arabic + Latin in one family).', { x: 7.2, y: 3.25, w: 5.5, h: 0.7, fontSize: 12, color: C.accent5 })
  await fit(s, A('p5-why-twainy.png'), 7.2, 4.0, 2.6, 2.8, { alt: 'Post example' })
  await fit(s, A('p4-see-it-live-1.png'), 9.95, 4.0, 2.6, 2.8, { alt: 'Post example' })

  // ===== 8. Channel ecosystem =====
  s = slide('STEP 3 · SOCIAL & DIGITAL ECOSYSTEM', 'Every channel has one job in the buying journey', 'Step 3 · Position')
  const flow = [['Discover', 'Instagram Reels · Facebook · Google search & Maps'], ['Consider', 'Carousels · Story highlights · product pages'], ['Convert', 'Website checkout (COD) · WhatsApp “ask before ordering”'], ['Retain', 'WhatsApp broadcasts · review requests · plumber price list']]
  flow.forEach(([h, d], i) => {
    const x = 0.6 + i * 3.05
    s.addShape(pres.shapes.CHEVRON, { x, y: 1.55, w: 2.95, h: 0.8, fill: { color: i === 2 ? C.accent2 : C.text2 }, line: { color: HEX.white, width: 0 } })
    text(s, h, { x: x + 0.45, y: 1.55, w: 2.0, h: 0.8, fontSize: 18, bold: true, color: C.background1, align: 'center', valign: 'middle' })
    text(s, d, { x, y: 2.45, w: 2.9, h: 0.7, fontSize: 12, align: 'center', color: C.accent5 })
  })
  s.addTable([
    hdrRow(['Channel', 'Why (persona evidence)', 'Set-up delivered']),
    ['Instagram (primary)', 'Rania’s main platform; Reels reach non-followers', 'Bio, highlights, link-in-bio page, location tag, 5 posts + 3 Reels'],
    ['Facebook', 'Older homeowners and local groups; same ads account', 'Mirrored page, WhatsApp button, shop tab'],
    ['WhatsApp Business', 'Hassan’s tool; advice, quotes and “LIVE” video requests', 'Catalogue, greeting and away messages, /live quick reply, labels'],
    ['Google Business Profile + SEO', 'High-intent “near me” and product searches', 'Categories, photos, products, keywords such as “sanitary ware Lebanon”'],
    ['TikTok · LinkedIn', 'Not yet validated · not where buyers are', 'Deferred · excluded'],
  ], { ...tableOpts(0.6, 3.3, 12.1, [2.8, 4.4, 4.9]), rowH: 0.5 })

  // ===== 9. Profile mockups =====
  s = slide('STEP 3 · MOCKUP PROFILE SET-UP', 'Optimised Instagram profile and link-in-bio funnel', 'Step 3 · Position')
  await fit(s, A('ig-profile.png'), 0.6, 1.5, 3.4, 5.35, { alt: 'Instagram profile mockup' })
  await fit(s, A('link-in-bio.png'), 4.2, 1.5, 3.0, 5.35, { alt: 'Link-in-bio mockup' })
  card(s, 7.5, 1.55, 5.2, 5.2, C.background2)
  text(s, [
    'Handle @twainy_plast_; name field carries both English and Arabic for search',
    'Category: Home improvement · buttons: Message and WhatsApp',
    'Highlights answer buyer questions: Mixers, Mirrors, How to order, Delivery, Reviews, Store',
    'Location tag (Qsarnaba) on every post and Reel',
    'Link in bio is a Shopify page, so every click is tracked',
    'Instagram Shopping connected for product tags',
  ].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1 } })), { x: 7.75, y: 1.8, w: 4.7, h: 4.8, fontSize: 14, paraSpaceAfter: 10 })

  // ===== 10. Campaign & funnel =====
  pres.addSection({ title: 'Step 4 · Create' })
  s = slide('STEP 4 · CAMPAIGN CONCEPT & FUNNEL', '“Choose with Confidence”: a 4-stage, 4-week campaign', 'Step 4 · Create')
  const stages = [
    ['Week 1', 'Awareness', 'We’re online: order from home, delivered all over Lebanon', 'Post 1 · Reel A'],
    ['Week 2', 'Consideration', 'How to order in 4 easy steps, on real checkout screens', 'Post 2 · Reel B'],
    ['Week 3', 'Trust & conversion', 'Free help choosing, plus live video or real photos before buying', 'Posts 3–4 · Reel C'],
    ['Week 4', 'Action & proof', 'Why order from us, reviews, retargeting', 'Post 5 · stories'],
  ]
  stages.forEach(([w, h, d, a], i) => {
    const x = 0.6 + i * 3.05
    card(s, x, 1.55, 2.85, 3.0, i === 2 ? C.accent2 : C.text2)
    text(s, w, { x: x + 0.22, y: 1.7, w: 2.4, h: 0.3, fontSize: 12, color: C.accent4 })
    text(s, h, { x: x + 0.22, y: 2.0, w: 2.4, h: 0.5, fontSize: 19, bold: true, color: C.background1 })
    text(s, d, { x: x + 0.22, y: 2.55, w: 2.4, h: 1.3, fontSize: 13, color: C.background1 })
    text(s, a, { x: x + 0.22, y: 3.95, w: 2.4, h: 0.4, fontSize: 12, bold: true, color: C.accent4 })
  })
  text(s, 'The three customer fears behind the funnel, from the store audit and customer feedback:', { x: 0.6, y: 4.8, w: 12.1, h: 0.35, fontSize: 14, bold: true, color: C.text2 })
  const fears = [['“Can I buy this from home?”', 'Yes: we’re online and deliver all over Lebanon'], ['“Is ordering complicated?”', 'No: 4 steps, no card, pay on delivery'], ['“Can I trust it online?”', 'Free help choosing, live video or real photos first']]
  fears.forEach(([q, a], i) => {
    const x = 0.6 + i * 4.1
    card(s, x, 5.25, 3.85, 1.45, C.background2)
    text(s, q, { x: x + 0.22, y: 5.35, w: 3.4, h: 0.45, fontSize: 15, bold: true, color: C.accent2 })
    text(s, a, { x: x + 0.22, y: 5.82, w: 3.4, h: 0.8, fontSize: 13 })
  })

  // ===== 11. Pillars & calendar =====
  s = slide('STEP 4 · CONTENT PILLARS & 4-WEEK CALENDAR', 'Four pillars, a fixed rhythm, and posting windows from Insights', 'Step 4 · Create')
  const pillars = [['35%', 'Choose Right', 'Fit, size, comparisons'], ['25%', 'Inside Twainy', 'Store, team, packing, delivery'], ['20%', 'Real Homes', 'Genuine reviews, installed projects'], ['20%', 'Order Easy', 'Prices, delivery, how to order']]
  pillars.forEach(([p, h, d], i) => {
    const x = 0.6 + i * 3.05
    card(s, x, 1.55, 2.85, 1.35, C.background2)
    text(s, p, { x: x + 0.2, y: 1.65, w: 1.1, h: 0.6, fontSize: 28, bold: true, color: C.accent1 })
    text(s, h, { x: x + 1.25, y: 1.7, w: 1.55, h: 0.5, fontSize: 15, bold: true, color: C.text2, valign: 'middle' })
    text(s, d, { x: x + 0.2, y: 2.3, w: 2.5, h: 0.5, fontSize: 12 })
  })
  s.addTable([
    hdrRow(['Week', 'Feed (IG + FB, 21:00)', 'Reels', 'Stories & WhatsApp', 'CTA']),
    ['1 · Oct 26 – Nov 1', 'Post 1 “We’re online” (pinned)', 'Reel A: store to your door', 'Launch story + link sticker · WhatsApp Status', 'Shop now'],
    ['2 · Nov 2 – 8', 'Post 2 “How to order” (6 slides)', 'Reel B: order in 20 s', 'How-to highlight · plumber price list (08:00)', 'Save + order'],
    ['3 · Nov 9 – 15', 'Post 3 “We help you choose” · Post 4 “See it live”', 'Reel C: we show you live', 'Q&A box · “LIVE” replies', 'Message “LIVE”'],
    ['4 · Nov 16 – 22', 'Post 5 “Why order from us”', 'Best Reel re-cut', 'Review requests after delivery', 'Order now'],
  ], { ...tableOpts(0.6, 3.15, 12.1, [1.9, 3.3, 2.3, 3.2, 1.4]), rowH: 0.5 })
  text(s, [
    { text: 'Published: ', options: { bold: true } }, val(SO.postsPublished, (x) => `${x} feed posts`), { text: ' · ' }, val(SO.reelsPublished, (x) => `${x} Reels`),
    { text: ' · Hashtags: #TwainyPlast #ChooseWithConfidence #ShopOnlineLebanon #BathroomRenovation + 2 local tags · Posting times reset from Insights after week 1.' },
  ], { x: 0.6, y: 6.15, w: 12.1, h: 0.6, fontSize: 12, color: C.accent5 })

  // ===== 12. Static & carousel assets =====
  s = slide('STEP 4 · STATIC & CAROUSEL ASSETS', 'Five posts that inform, teach and ask for action', 'Step 4 · Create')
  const posts = [['p1-we-are-online.png', '1 · We’re online'], ['p2-how-to-order-1.png', '2 · How to order (6 slides)'], ['p3-help-choose-1.png', '3 · We help you choose (4)'], ['p4-see-it-live-1.png', '4 · See it live (3)'], ['p5-why-twainy.png', '5 · Why order from us']]
  for (let i = 0; i < posts.length; i++) {
    const x = 0.6 + i * 2.45
    const r = await fit(s, A(posts[i][0]), x, 1.55, 2.3, 2.9, { valign: 'top', alt: posts[i][1] })
    text(s, posts[i][1], { x, y: r.y + r.h + 0.08, w: 2.3, h: 0.35, fontSize: 12, bold: true, color: C.text2, align: 'center' })
  }
  card(s, 0.6, 5.0, 12.1, 1.75, C.background2)
  text(s, [
    { text: 'Visual hierarchy: ', options: { bold: true } }, { text: 'one headline, one benefit list, one red call to action, with logo, website and WhatsApp on every post.', options: { breakLine: true } },
    { text: 'Proof: ', options: { bold: true } }, { text: 'Post 2 uses real screenshots of the live checkout. Product renders are labelled “illustrative”.', options: { breakLine: true } },
    { text: 'Captions & hashtags: ', options: { bold: true } }, { text: 'English first with Arabic versions; every link carries UTM tags (creative/posts-en/CAPTIONS.md).' },
  ], { x: 0.85, y: 5.12, w: 11.6, h: 1.55, fontSize: 13, paraSpaceAfter: 4 })

  // ===== 13. Reels =====
  s = slide('STEP 4 · SHORT-FORM VIDEO ENGINE', 'Three Reels, storyboarded frame by frame and filmed in store', 'Step 4 · Create')
  const reels = [['reel-a-store-to-your-door.png', 'Reel A · From our store to your door', 'Hook: “We’re online now 🎉”'], ['reel-b-how-to-order.png', 'Reel B · How to order in 20 seconds', 'Hook: “Ordering from us takes 20 seconds. Watch.”'], ['reel-c-see-it-live.png', 'Reel C · Not sure? We’ll show you live', 'Hook: “Scared to buy bathroom products online?”']]
  for (let i = 0; i < reels.length; i++) {
    const x = 0.6 + i * 4.1
    const r = await fit(s, A(reels[i][0]), x, 1.6, 3.9, 2.3, { valign: 'top', alt: reels[i][1] })
    text(s, reels[i][1], { x, y: r.y + r.h + 0.1, w: 3.9, h: 0.35, fontSize: 14, bold: true, color: C.text2 })
    text(s, reels[i][2], { x, y: r.y + r.h + 0.45, w: 3.9, h: 0.5, fontSize: 12, italic: true })
  }
  card(s, 0.6, 5.3, 12.1, 1.45, C.background2)
  text(s, [
    { text: 'Production: ', options: { bold: true } }, { text: '9:16, 20–30 s, 6 shots each; original English voice-over by the owner; trending audio from the Instagram library at low volume; burned-in subtitles.', options: { breakLine: true } },
    { text: 'Performance: ', options: { bold: true } }, val(SO.reelViews, (x) => `${x.toLocaleString('en-US')} Reel views in total`), { text: ' · social visits to the site rose to 38 in the final week (vs 6 in the week before launch).' },
  ], { x: 0.85, y: 5.42, w: 11.6, h: 1.25, fontSize: 13, paraSpaceAfter: 4 })

  // ===== 14. Paid strategy =====
  s = slide('STEP 4 · PAID SOCIAL STRATEGY & BUDGET', '$200 test budget: learn first, then scale the winner', 'Step 4 · Create')
  s.addChart(pres.charts.DOUGHNUT, [{ name: 'Plan', labels: ['Week 1 awareness', 'Week 2 A/B test', 'Weeks 3–4 scale', 'Weeks 3–4 retarget'], values: [30, 70, 70, 30] }], {
    x: 0.6, y: 1.5, w: 4.6, h: 4.6, holeSize: 58, showTitle: true, title: 'Planned budget ($200)', titleFontSize: 13, titleColor: HEX.green, titleFontFace: '+mn-lt',
    chartColors: [HEX.sage, HEX.leaf, HEX.green, HEX.red], showValue: true, showPercent: false, dataLabelFormatCode: '$#,##0', showLegend: true, legendPos: 'b', legendFontSize: 11, legendFontFace: '+mn-lt', legendColor: HEX.slate, dataLabelColor: HEX.white, dataLabelFontSize: 12, dataLabelFontFace: '+mn-lt',
  })
  s.addTable([
    hdrRow(['', 'Plan', 'Actual']),
    ['Ad spend', '$200', cell(AD.spend, money)],
    ['Reach', '25,000 (Lebanon)', cell(AD.reach, (x) => x.toLocaleString('en-US'))],
    ['Link clicks', '—', cell(AD.linkClicks, (x) => x.toLocaleString('en-US'))],
    ['Link CTR', '≥ 1%', cell(AD.ctr, (x) => pct(x))],
  ], { ...tableOpts(5.6, 1.6, 7.1, [2.3, 2.4, 2.4]), rowH: 0.5 })
  card(s, 5.6, 4.35, 7.1, 2.4, C.background2)
  text(s, [
    { text: 'Targeting: ', options: { bold: true } }, { text: 'Lebanon, 25–55, broad, location-based only (no sensitive interests).', options: { breakLine: true } },
    { text: 'Decision rule: ', options: { bold: true } }, { text: 'after week 2, shift budget to the creative with the lower cost per landing-page view and the higher add-to-cart rate, not the most likes.', options: { breakLine: true } },
    { text: 'Guardrails: ', options: { bold: true } }, { text: 'pause any ad set with frequency above 3 or CTR below 0.5% after $15.' },
  ], { x: 5.85, y: 4.5, w: 6.6, h: 2.15, fontSize: 13, paraSpaceAfter: 6 })

  // ===== 15. KPI framework =====
  pres.addSection({ title: 'Step 5 · Measure' })
  s = slide('STEP 5 · KPI FRAMEWORK & ANALYTICS', 'What we measured, how, and with which tool', 'Step 5 · Measure')
  s.addTable([
    hdrRow(['KPI', 'Formula', 'Tool']),
    ['Reach', 'Unique accounts reached (Lebanon)', 'Meta Business Suite'],
    ['Engagement rate (ERR)', '(likes + comments + shares + saves) ÷ reach', 'IG / FB Insights'],
    ['Click-through rate', 'Link clicks ÷ impressions', 'Ads Manager · UTM links'],
    ['Sessions & sources', 'Sessions by referrer, country, device', 'Shopify Analytics · GA4'],
    ['Add-to-cart & conversion', 'Cart sessions ÷ sessions · orders ÷ sessions', 'Shopify funnel · GA4 events'],
    ['CAC', 'Acquisition spend ÷ new customers', 'Ads Manager + orders sheet'],
    ['WhatsApp orders', 'Labelled chats; each order logged once by number', 'WhatsApp Business labels'],
  ], { ...tableOpts(0.6, 1.55, 7.6, [2.3, 3.2, 2.1]), rowH: 0.52 })
  card(s, 8.5, 1.55, 4.2, 5.2, C.text2)
  text(s, 'Attribution rules', { x: 8.75, y: 1.75, w: 3.7, h: 0.4, fontSize: 16, bold: true, color: C.accent4 })
  text(s, [
    'Shopify is the source of truth for sessions, funnel and orders',
    'Every post, story and bio link carries UTM tags',
    'WhatsApp orders logged separately, never double-counted',
    'Results reported as observed change against the launch baseline, not as proven causation (4 weeks, small sample)',
  ].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, color: C.background1 } })), { x: 8.75, y: 2.25, w: 3.75, h: 4.3, fontSize: 13, paraSpaceAfter: 10 })

  // ===== 16. Results: traffic =====
  s = slide('STEP 5 · RESULTS · WEBSITE TRAFFIC', 'More of the right visitors: Lebanese and on mobile', 'Step 5 · Measure')
  const wk = S.weekly
  s.addChart(pres.charts.BAR, [
    { name: 'Launch weeks', labels: wk.map((w) => w.week), values: wk.map((w) => (w.phase === 'launch' ? w.lebanon : 0)) },
    { name: 'Campaign weeks', labels: wk.map((w) => w.week), values: wk.map((w) => (w.phase === 'campaign' ? w.lebanon : 0)) },
  ], { ...chartBase, x: 0.6, y: 1.5, w: 7.4, h: 4.1, barDir: 'col', barGrouping: 'stacked', title: 'Sessions from Lebanon per week', chartColors: [HEX.sage, HEX.leaf], dataLabelPosition: 'inEnd', dataLabelColor: HEX.white, showLegend: true, legendPos: 'b', legendFontSize: 11, legendColor: HEX.slate, barGapWidthPct: 50, dataLabelFormatCode: '0;;;' })
  const tr = [[pct(B.lebanonShare, 0) + ' → ' + pct(K.lebanonShare, 0), 'share of sessions from Lebanon'], [pct(B.mobileShare, 0) + ' → ' + pct(K.mobileShare, 0), 'share of sessions on mobile'], [String(K.sessions), `sessions in the campaign (${S.campaignPeriod})`]]
  tr.forEach(([b, l], i) => stat(s, 8.4, 1.55 + i * 1.4, 4.3, 1.25, b, l, { size: 26 }))
  card(s, 0.6, 5.8, 12.1, 0.95, C.background2)
  text(s, [{ text: 'Read-out: ', options: { bold: true, color: C.text2 } }, { text: 'total traffic held steady, but its quality changed: fewer foreign bot visits, more Lebanese visitors on phones. Weeks 2–3 dipped while posting slowed, and week 4 recovered once Reels went live.' }], { x: 0.85, y: 5.85, w: 11.6, h: 0.85, fontSize: 13, valign: 'middle' })

  // ===== 17. Results: sources =====
  s = slide('STEP 5 · RESULTS · WHERE VISITS CAME FROM', 'Social and search visits grew about 3–6 times', 'Step 5 · Measure')
  s.addChart(pres.charts.BAR, [
    { name: `Launch (${S.baselinePeriod})`, labels: ['Instagram + Facebook', 'Google + Bing search', 'Direct'], values: [socialBaseWk, searchBaseWk, perWeek(B.directSessions, B.days)].map((x) => +x.toFixed(1)) },
    { name: `Campaign (${S.campaignPeriod})`, labels: ['Instagram + Facebook', 'Google + Bing search', 'Direct'], values: [socialCampWk, searchCampWk, perWeek(K.directSessions, K.days)].map((x) => +x.toFixed(1)) },
  ], { ...chartBase, x: 0.6, y: 1.5, w: 6.6, h: 4.2, barDir: 'bar', barGrouping: 'clustered', title: 'Average sessions per week, by source', chartColors: [HEX.sage, HEX.leaf], dataLabelPosition: 'outEnd', showLegend: true, legendPos: 'b', legendFontSize: 11, legendColor: HEX.slate, catAxisOrientation: 'maxMin', barGapWidthPct: 40, dataLabelFormatCode: '0' })
  s.addChart(pres.charts.LINE, [{ name: 'Social sessions', labels: wk.map((w) => w.week), values: wk.map((w) => w.social) }], { ...chartBase, x: 7.5, y: 1.5, w: 5.2, h: 2.9, title: 'Social sessions per week', chartColors: [HEX.red], lineSize: 2.5, lineDataSymbol: 'circle', lineDataSymbolSize: 8, dataLabelPosition: 't' })
  card(s, 7.5, 4.55, 5.2, 1.15, C.background2)
  text(s, `Instagram ${K.instagramSessions} · Facebook ${K.facebookSessions} · Google ${K.googleSessions} · Bing ${K.bingSessions} sessions during the campaign.`, { x: 7.7, y: 4.62, w: 4.8, h: 1.0, fontSize: 12, valign: 'middle' })
  card(s, 0.6, 5.9, 12.1, 0.85, C.text2)
  text(s, [{ text: 'Caveat: ', options: { bold: true, color: C.accent4 } }, { text: 'direct traffic stayed at ~116 per week. Much of it is likely links shared on WhatsApp and bio taps without UTM tags, so social’s true effect is understated.', options: { color: C.background1 } }], { x: 0.85, y: 5.95, w: 11.6, h: 0.75, fontSize: 13, valign: 'middle' })

  // ===== 18. Results: funnel & orders =====
  s = slide('STEP 5 · RESULTS · FUNNEL & ORDERS', 'From 0 to the first real orders, with large baskets', 'Step 5 · Measure')
  s.addChart(pres.charts.BAR, [{ name: 'Campaign funnel', labels: ['Sessions', 'Added to cart', 'Reached checkout', 'Orders placed', 'Delivered'], values: [K.sessions, K.cartSessions, K.checkoutSessions, K.orders, K.deliveredOrders] }], { ...chartBase, x: 0.6, y: 1.5, w: 5.4, h: 3.6, barDir: 'bar', title: `Purchase funnel (${S.campaignPeriod})`, chartColors: [HEX.leaf], catAxisOrientation: 'maxMin', dataLabelPosition: 'outEnd', barGapWidthPct: 50 })
  s.addTable([
    hdrRow(['Order', 'Date', 'City', 'Basket', 'Total', 'Status']),
    ...S.orders.map((o) => [o.id, o.date, o.city, `${o.items} items`, money(o.total), { text: o.status, options: { color: o.status === 'Delivered' ? HEX.leaf : HEX.red, bold: true } }]),
  ], { ...tableOpts(6.3, 1.55, 6.4, [0.8, 0.85, 1.4, 1.05, 0.95, 1.35]), rowH: 0.45 })
  stat(s, 6.3, 3.6, 2.0, 1.4, money(deliveredRevenue / K.deliveredOrders), 'average delivered order (plan: $45)', { size: 24 })
  stat(s, 8.5, 3.6, 2.0, 1.4, pct(atcCamp), `add-to-cart (launch ${pct(atcBase)})`, { size: 24 })
  stat(s, 10.7, 3.6, 2.0, 1.4, pct(crCamp, 2), 'conversion rate (target 1%)', { size: 24, fill: C.accent2 })
  card(s, 0.6, 5.3, 12.1, 1.45, C.background2)
  text(s, [
    { text: 'Insights: ', options: { bold: true, color: C.text2 } },
    { text: 'the $215 Beirut order came from a ChatGPT referral, so AI and search discovery already sell. The $524 Baalbek order was cancelled within 25 minutes, which shows the need for a confirmation call. Every order used Cash on Delivery, which confirms it matters as a trust signal.' },
  ], { x: 0.85, y: 5.4, w: 11.6, h: 1.25, fontSize: 13 })

  // ===== 19. Results: social & WhatsApp =====
  s = slide('STEP 5 · RESULTS · SOCIAL MEDIA & WHATSAPP', 'Social builds trust; WhatsApp closes the sale', 'Step 5 · Measure')
  const followerGrowth = has(SO.igFollowersStart) && has(SO.igFollowersEnd) ? `+${SO.igFollowersEnd - SO.igFollowersStart}` : TBD
  const err = has(SO.engagements) && has(SO.reach) ? pct(SO.engagements / SO.reach) : TBD
  const soc = [[show(SO.reach, (x) => x.toLocaleString('en-US')), 'reach (Lebanon)'], [err, 'engagement rate by reach'], [followerGrowth, 'Instagram followers'], [show(SO.linkClicks, (x) => x.toLocaleString('en-US')), 'link clicks'], [show(SO.reelViews, (x) => x.toLocaleString('en-US')), 'Reel views'], [String(K.instagramSessions + K.facebookSessions), 'social sessions on the site (Shopify)']]
  text(s, 'Instagram & Facebook', { x: 0.6, y: 1.5, w: 6, h: 0.4, fontSize: 16, bold: true, color: C.text2 })
  soc.forEach(([b, l], i) => stat(s, 0.6 + (i % 3) * 2.05, 1.95 + Math.floor(i / 3) * 1.45, 1.9, 1.3, b, l, { size: 22 }))
  text(s, 'WhatsApp Business', { x: 6.9, y: 1.5, w: 6, h: 0.4, fontSize: 16, bold: true, color: C.text2 })
  const wa = [[show(W.inquiries), 'inquiries'], [show(W.liveVideoRequests), '“LIVE” video requests'], [show(W.orders), 'WhatsApp orders'], [show(W.revenue, money), 'WhatsApp revenue'], [show(W.medianReplyMinutes, (x) => `${x} min`), 'median reply time'], [show(W.cities), 'cities served']]
  wa.forEach(([b, l], i) => stat(s, 6.9 + (i % 3) * 1.95, 1.95 + Math.floor(i / 3) * 1.45, 1.8, 1.3, b, l, { size: 20, fill: i === 2 || i === 3 ? C.accent2 : C.text2 }))
  card(s, 0.6, 5.0, 12.1, 1.75, C.background2)
  text(s, [
    { text: 'Top posts: ', options: { bold: true, color: C.text2 } },
    ...SO.topPosts.flatMap((p, i) => [val(p.name), { text: ' · reach ' }, val(p.reach, (x) => x.toLocaleString('en-US')), { text: ' · engagements ' }, val(p.engagements, (x) => x.toLocaleString('en-US')), { text: i < SO.topPosts.length - 1 ? '   |   ' : '' }]),
    { text: '', options: { breakLine: true } },
    { text: 'Read-out: ', options: { bold: true, color: C.text2 } },
    { text: 'Instagram sent 65 visits and 3 carts but no direct web order, while buyers asked questions on WhatsApp first. Social builds trust and WhatsApp converts, so both must be measured together.' },
  ], { x: 0.85, y: 5.12, w: 11.6, h: 1.55, fontSize: 12, paraSpaceAfter: 6 })

  // ===== 20. Scorecard =====
  s = slide('STEP 5 · KPI SCORECARD', 'Target vs actual: honest results after four weeks', 'Step 5 · Measure')
  const status = (ok, partial) => ({ text: ok ? '● Met' : partial ? '◐ Improved' : '○ Not met', options: { bold: true, color: ok ? HEX.leaf : partial ? HEX.amber : HEX.red } })
  const pending = { text: '… Add data', options: { color: HEX.amber, italic: true } }
  const cacVal = has(AD.spend) && totalOrders > 0 ? AD.spend / totalOrders : null
  s.addTable([
    hdrRow(['KPI', 'Launch baseline', '4-week target', 'Actual', 'Status']),
    ['Online orders', '0', '10', `${K.orders} (${K.deliveredOrders} delivered)`, status(false, true)],
    ['WhatsApp-assisted orders', '—', '8', cell(W.orders), has(W.orders) ? status(W.orders >= 8, W.orders > 0) : pending],
    ['Sessions from Lebanon', `${B.lebanonSessions} / 15 days`, '1,000', String(K.lebanonSessions), status(false, true)],
    ['Add-to-cart rate', pct(atcBase), '4%', pct(atcCamp), status(atcCamp >= 0.04, atcCamp > atcBase)],
    ['Conversion rate', '0%', '1%', pct(crCamp, 2), status(crCamp >= 0.01, crCamp > 0)],
    ['Social visits per week', socialBaseWk.toFixed(1), '—', socialCampWk.toFixed(1), status(true)],
    ['Reach (Lebanon)', '—', '25,000', cell(SO.reach, (x) => x.toLocaleString('en-US')), has(SO.reach) ? status(SO.reach >= 25000, SO.reach > 0) : pending],
    ['Engagement rate (ERR)', '—', '≥ 3%', err === TBD ? cell(null) : err, has(SO.engagements) && has(SO.reach) ? status(SO.engagements / SO.reach >= 0.03, true) : pending],
    ['CAC', '—', '≤ $20', cacVal === null ? cell(null) : money(cacVal), cacVal === null ? pending : status(cacVal <= 20, false)],
    ['Google reviews', '0', '10', cell(D.gbp.reviews), has(D.gbp.reviews) ? status(D.gbp.reviews >= 10, D.gbp.reviews > 0) : pending],
  ], { ...tableOpts(0.6, 1.5, 12.1, [3.0, 2.2, 1.9, 2.9, 2.1]), rowH: 0.42, fontSize: 12 })
  text(s, 'Targets were set as 4-week test targets before launch, not forecasts. Orders and traffic missed target; quality (Lebanon, mobile, search, social) and basket size beat expectations.', { x: 0.6, y: 6.35, w: 12.1, h: 0.45, fontSize: 12, color: C.accent5 })

  // ===== 21. ROI =====
  s = slide('STEP 5 · BUDGET, ROI & FEASIBILITY', 'Unit economics: large baskets make the model work', 'Step 5 · Measure')
  const m = D.assumptions.grossMargin
  const gp = totalRevenue * m
  const spend = has(AD.spend) ? AD.spend : null
  const roas = spend ? totalRevenue / spend : null
  const contrib = spend !== null ? gp - spend : null
  const aov = deliveredRevenue / K.deliveredOrders
  const breakeven = spend ? Math.ceil(spend / (aov * m)) : null
  s.addTable([
    hdrRow(['Line', 'Value', 'How it is calculated']),
    ['Delivered online revenue', money(deliveredRevenue), `${K.deliveredOrders} delivered orders (Shopify)`],
    ['WhatsApp revenue', cell(W.revenue, money), 'Logged WhatsApp orders'],
    ['Total campaign revenue', has(W.revenue) ? money(totalRevenue) : { text: `${money(deliveredRevenue)} + WhatsApp`, options: { color: HEX.amber } }, 'Online + WhatsApp, each order counted once'],
    [`Gross profit at ${pct(m, 0)} margin`, money(gp), `Revenue × margin (${D.assumptions.marginNote})`],
    ['Ad spend', cell(spend, money), 'Ads Manager'],
    ['ROAS', roas ? roas.toFixed(1) + '×' : cell(null), 'Revenue ÷ ad spend'],
    ['CAC', cacVal !== null ? money(cacVal) : cell(null), 'Ad spend ÷ new customers'],
    ['Campaign contribution', contrib !== null ? money(contrib) : cell(null), 'Gross profit − ad spend (student work costed at $0)'],
  ], { ...tableOpts(0.6, 1.5, 7.6, [2.6, 1.7, 3.3]), rowH: 0.46 })
  stat(s, 8.5, 1.55, 4.2, 1.35, money(aov), 'average delivered order: 3× the $45 planning assumption')
  stat(s, 8.5, 3.05, 4.2, 1.35, breakeven ? `${breakeven} orders` : `${Math.ceil(200 / (aov * m))} orders`, breakeven ? 'to break even on the actual ad spend' : 'to break even on a $200 budget at this basket size', { fill: C.accent2 })
  card(s, 8.5, 4.55, 4.2, 2.2, C.background2)
  text(s, [{ text: 'Feasibility: ', options: { bold: true, color: C.text2 } }, { text: 'running costs stay near zero (Shopify Basic, organic content filmed in store, WhatsApp). At an average order of ~$134, a $200 monthly ad budget breaks even with about 5 orders a month, which is realistic given the first 4 weeks.' }], { x: 8.7, y: 4.65, w: 3.8, h: 2.0, fontSize: 12 })

  // ===== 22. Learnings =====
  pres.addSection({ title: 'Recommendations' })
  s = slide('PERFORMANCE OPTIMISATION', 'What we learned in four weeks', 'Recommendations')
  const learn = [
    [fa.FaShoppingBasket, 'Baskets are big', `Average delivered order ${money(aov)}, 3× plan. Buyers renovate whole rooms: promote bundles and plumber packs.`],
    [fa.FaMapMarkedAlt, 'Demand is nationwide', 'Orders from Beirut, Metn and Bekaa. Delivery all over Lebanon is a real selling point, not a slogan.'],
    [fa.FaSearch, 'Search & AI sell', 'Search visits about 6× per week, and the biggest delivered order came via ChatGPT. Product titles and URLs now matter.'],
    [fa.FaComments, 'Social → WhatsApp → sale', 'Instagram drove visits and questions, not direct checkouts. Measure social and WhatsApp as one funnel.'],
    [fa.FaMobileAlt, 'Mobile is the store', '71% of visits on mobile. Checkout friction (required email, pre-ticked marketing box, “<50$” label) costs sales.'],
    [fa.FaPhoneAlt, 'Confirm every order', 'A $524 order was cancelled within 25 minutes. A quick confirmation call or WhatsApp message protects big COD orders.'],
  ]
  for (let i = 0; i < learn.length; i++) {
    const [ic, h, d] = learn[i]
    const x = 0.6 + (i % 3) * 4.1
    const y = 1.55 + Math.floor(i / 3) * 2.65
    card(s, x, y, 3.85, 2.4, C.background2)
    await dot(s, ic, x + 0.25, y + 0.25, 0.6)
    text(s, h, { x: x + 1.0, y: y + 0.3, w: 2.7, h: 0.5, fontSize: 17, bold: true, color: C.text2, valign: 'middle' })
    text(s, d, { x: x + 0.25, y: y + 1.0, w: 3.4, h: 1.3, fontSize: 13 })
  }

  // ===== 23. Recommendations & roadmap =====
  s = slide('RECOMMENDATIONS', 'Next 90 days: convert the attention we built', 'Recommendations')
  const recs = [
    ['Now · Dec', 'Fix & track', ['Checkout: phone-only contact, untick marketing, rename delivery to “Standard delivery”', 'Hero button “Shop now”; real photos of top 20 products', 'UTM on every link; GA4 + Meta Pixel events; confirmation call for orders over $100']],
    ['Jan', 'Scale what worked', ['Weekly Reel (fit guides, live demos); answer top WhatsApp questions as posts', '$200/month Meta ads to the best creative, retarget site visitors', 'Bundles: “complete bathroom” and plumber packs']],
    ['Feb', 'Own search & proof', ['Descriptive product titles and URLs for Google and AI search', 'Google profile: weekly posts, 10+ genuine reviews', 'Monthly report: orders by channel, CAC, ROAS, repeat buyers']],
  ]
  recs.forEach(([when, h, items], i) => {
    const x = 0.6 + i * 4.1
    s.addShape(pres.shapes.OVAL, { x: x + 1.55, y: 1.5, w: 0.75, h: 0.75, fill: { color: i === 0 ? C.accent2 : C.text2 }, line: { color: HEX.white, width: 0 } })
    text(s, String(i + 1), { x: x + 1.55, y: 1.5, w: 0.75, h: 0.75, fontSize: 24, bold: true, color: C.background1, align: 'center', valign: 'middle' })
    if (i < 2) s.addShape(pres.shapes.LINE, { x: x + 2.4, y: 1.88, w: 3.25, h: 0, line: { color: HEX.sage, width: 2, endArrowType: 'triangle' } })
    card(s, x, 2.45, 3.85, 4.3, C.background2)
    text(s, when, { x: x + 0.25, y: 2.6, w: 3.4, h: 0.3, fontSize: 12, bold: true, color: C.accent1 })
    text(s, h, { x: x + 0.25, y: 2.92, w: 3.4, h: 0.45, fontSize: 19, bold: true, color: C.text2 })
    text(s, items.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < items.length - 1 } })), { x: x + 0.25, y: 3.45, w: 3.45, h: 3.2, fontSize: 13, paraSpaceAfter: 8 })
  })

  // ===== 24. Ethics & local impact =====
  s = slide('ETHICAL & SOCIAL DIMENSIONS', 'Responsible growth for a local family business', 'Recommendations')
  const imp = [
    [fa.FaStore, 'Local economic impact', 'A Bekaa family store now sells nationwide, supporting its staff and the plumbers who rely on it, in a hard economy.'],
    [fa.FaUserLock, 'Consumer rights & privacy', 'Opt-in marketing, minimal data at checkout, anonymised research, clear delivery and payment terms before purchase.'],
    [fa.FaHandshake, 'Honest community management', 'Real prices, genuine reviews only, criticism answered publicly, live video so buyers see exactly what they get.'],
    [fa.FaBullhorn, 'Ethical ad targeting', 'Location and broad audiences only. No sensitive categories, no under-18s, no false scarcity.'],
  ]
  for (let i = 0; i < imp.length; i++) {
    const [ic, h, d] = imp[i]
    const x = 0.6 + (i % 2) * 6.15
    const y = 1.55 + Math.floor(i / 2) * 2.65
    card(s, x, y, 5.95, 2.4, C.background2)
    await dot(s, ic, x + 0.3, y + 0.3, 0.7)
    text(s, h, { x: x + 1.2, y: y + 0.35, w: 4.5, h: 0.55, fontSize: 18, bold: true, color: C.text2, valign: 'middle' })
    text(s, d, { x: x + 0.3, y: y + 1.15, w: 5.4, h: 1.1, fontSize: 14 })
  }

  // ===== 25. Team =====
  s = slide('TEAM COLLABORATION & WORKFLOW', 'How we worked as a consulting agency', 'Recommendations')
  s.addTable([
    hdrRow(['Role', 'Member', 'Owned']),
    ...D.team.map((t) => [t.role, cell(t.name), t.owns]),
  ], { ...tableOpts(0.6, 1.55, 7.6, [2.2, 2.0, 3.4]), rowH: 0.55 })
  card(s, 8.5, 1.55, 4.2, 5.2, C.text2)
  text(s, 'Agency workflow', { x: 8.75, y: 1.75, w: 3.7, h: 0.4, fontSize: 16, bold: true, color: C.accent4 })
  text(s, [
    'Weekly sprint every Wednesday: review data, decide, assign',
    'Peer review of every post before owner approval',
    'Shared content calendar and caption library',
    'One decision log for budget and creative changes',
    'Owner signs off on each post and every dollar spent',
  ].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, color: C.background1 } })), { x: 8.75, y: 2.25, w: 3.75, h: 4.3, fontSize: 13, paraSpaceAfter: 10 })

  // ===== 26. Close =====
  s = pres.addSlide({ masterName: 'TITLE_DARK', sectionTitle: 'Recommendations' })
  s.addText('Thank you', { placeholder: 'title' })
  s.addText('Questions & discussion', { placeholder: 'body' })
  const close = [[String(K.orders), 'online orders, from 0'], [money(aov), 'average delivered order'], [`×${(socialCampWk / socialBaseWk).toFixed(1)}`, 'social visits per week'], [`×${(searchCampWk / searchBaseWk).toFixed(1)}`, 'search visits per week']]
  close.forEach(([b, l], i) => stat(s, 8.2 + (i % 2) * 2.3, 1.2 + Math.floor(i / 2) * 1.9, 2.1, 1.7, b, l, { fill: i === 0 ? C.accent2 : C.accent1, size: 32 }))
  text(s, 'twainyplast.com · WhatsApp 76 742 274 · @twainy_plast_', { x: 0.6, y: 6.2, w: 7.4, h: 0.4, fontSize: 16, color: C.accent4 })

  await pres.writeFile({ fileName: OUT })
  if (THEME_SCRIPT) await require(THEME_SCRIPT).applyTheme(OUT, THEME)
  console.log('wrote', OUT, `(${pres.slides.length} slides)`)
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
