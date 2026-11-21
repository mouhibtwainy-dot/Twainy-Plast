// Professional ~20-slide final deck (MKT 843) for Twainy Plast, built from deck/results.json.
// Usage: NODE_PATH=<deps>/node_modules DECK_DEPS=<deps> [APPLY_THEME=<apply_theme.js>] node deck/build-pro.cjs [out.pptx]
const fs = require('fs')
const path = require('path')
const DEPS = process.env.DECK_DEPS
const need = (m) => require(DEPS ? require.resolve(m, { paths: [DEPS] }) : m)
const pptxgen = need('pptxgenjs')
const sharp = need('sharp')
const React = need('react')
const { renderToStaticMarkup } = need('react-dom/server')
const fa = need('react-icons/fa')

const ROOT = __dirname
const OUT = process.argv[2] || path.join(ROOT, 'Twainy-Plast-Presentation.pptx')
const D = JSON.parse(fs.readFileSync(path.join(ROOT, 'results.json'), 'utf8'))
const A = (f) => path.join(ROOT, 'assets', f)
const MEDIA = (f) => path.join(ROOT, 'media', f)

const HEX = { ink: '1A1F1C', green: '1B4D2B', leaf: '2E7D3A', mist: 'EEF5F0', page: 'F4F7F5', red: 'D63A14', chrome: '8D99AE', slate: '5B6770', grid: 'E3E8E5', sage: 'A9CDB1', amber: 'B26A00', white: 'FFFFFF' }
const THEME = { name: 'Twainy Plast', headFontFace: 'Calibri', bodyFontFace: 'Calibri', colors: { dk1: HEX.ink, lt1: HEX.white, dk2: HEX.green, lt2: HEX.mist, accent1: HEX.leaf, accent2: HEX.red, accent3: HEX.chrome, accent4: HEX.sage, accent5: HEX.slate, accent6: 'C9A227', hlink: HEX.leaf, folHlink: HEX.green } }

// ---------- data ----------
const S = D.shopify
const B = S.baseline
const K = S.campaign
const W = D.whatsapp
const SO = D.social
const has = (x) => x !== null && x !== undefined && x !== ''
const pct = (x, d = 1) => (x * 100).toFixed(d) + '%'
const perWeek = (n, days) => (n / days) * 7
const growth = (a, b) => (b >= a ? '+' : '−') + Math.abs(Math.round((b / a - 1) * 100)) + '%'
const atcB = B.cartSessions / B.sessions
const atcC = K.cartSessions / K.sessions
const crC = K.orders / K.sessions
const socB = perWeek(B.socialSessions, B.days)
const socC = perWeek(K.instagramSessions + K.facebookSessions, K.days)
const seaB = perWeek(B.searchSessions, B.days)
const seaC = perWeek(K.googleSessions + K.bingSessions, K.days)
const sesB = perWeek(B.sessions, B.days)
const sesC = perWeek(K.sessions, K.days)
const lebB = perWeek(B.lebanonSessions, B.days)
const lebC = perWeek(K.lebanonSessions, K.days)
const delivered = S.orders.filter((o) => o.status === 'Delivered')
const basketX = Math.round(delivered.reduce((s, o) => s + o.total, 0) / delivered.length / 45) + '×'
const totalOrders = K.orders + W.orders
const waShare = W.orders / totalOrders
const VIDEOS = SO.videosPublished
const PLATFORMS = SO.platforms || []
const TBD = '[to add]'

// ---------- deck ----------
const pres = new pptxgen()
pres.layout = 'LAYOUT_WIDE' // 13.333 × 7.5
pres.title = 'Twainy Plast: From Visitors to Customers'
pres.author = 'MKT 843 Consulting Team'
pres.company = 'LAU AKSOB MBA'
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace }
const C = pres.SchemeColor

const ONLY = process.env.ONLY // e.g. ONLY=title or ONLY=client
const scratch = new pptxgen()
scratch.layout = 'LAYOUT_WIDE'
const deckFor = (id) => (!ONLY || ONLY === id ? pres : scratch)
const addSection = (o) => { if (!ONLY) pres.addSection(o) }
const masters = (p) => {
p.defineSlideMaster({ title: 'BLANK_DARK', background: { color: HEX.green }, objects: [] })
const contentMaster = (title, bg) =>
  p.defineSlideMaster({
    title,
    background: { color: bg },
    objects: [
      { placeholder: { options: { name: 'kicker', type: 'body', x: 0.6, y: 0.32, w: 9, h: 0.28, fontSize: 11, bold: true, color: C.accent2, align: 'left', margin: 0, charSpacing: 3 }, text: '' } },
      { placeholder: { options: { name: 'title', type: 'title', x: 0.6, y: 0.6, w: 12.1, h: 0.7, fontSize: 28, bold: true, color: C.text2, valign: 'middle', align: 'left', margin: 0 }, text: '' } },
      { text: { text: 'Twainy Plast · MKT 843 Final Consulting Project', options: { x: 0.6, y: 7.02, w: 7, h: 0.28, fontSize: 9, color: HEX.slate, margin: 0 } } },
    ],
    slideNumber: { x: 12.3, y: 7.02, w: 0.5, h: 0.28, fontSize: 9, color: HEX.slate },
  })
contentMaster('CONTENT', HEX.white)
contentMaster('DASHBOARD', HEX.page)
}
masters(pres)
masters(scratch)

// ---------- helpers ----------
async function icon(Comp, hex) {
  const svg = renderToStaticMarkup(React.createElement(Comp, { color: '#' + hex, size: 256 }))
  return 'image/png;base64,' + (await sharp(Buffer.from(svg)).png().toBuffer()).toString('base64')
}
async function fit(s, file, x, y, maxW, maxH, o = {}) {
  const m = await sharp(file).metadata()
  const r = Math.min(maxW / m.width, maxH / m.height)
  const w = m.width * r
  const h = m.height * r
  const ox = o.align === 'left' ? x : x + (maxW - w) / 2
  const oy = o.valign === 'top' ? y : y + (maxH - h) / 2
  s.addImage({ path: file, x: ox, y: oy, w, h, altText: o.alt || '' })
  return { x: ox, y: oy, w, h }
}
const shadow = () => ({ type: 'outer', color: '000000', opacity: 0.08, blur: 8, offset: 2, angle: 90 })
const card = (s, x, y, w, h, fill = C.background1, sh = true) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: fill, width: 0 }, shadow: sh ? shadow() : undefined })
const text = (s, t, o) => s.addText(t, { isTextBox: true, margin: 0, fontSize: 13, color: C.text1, valign: 'top', ...o })
async function badge(s, Comp, x, y, d = 0.55, fill = C.accent1) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 } })
  const p = d * 0.26
  s.addImage({ data: await icon(Comp, HEX.white), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p })
}
// Dashboard KPI card: small label, big number, optional delta chip and footnote
function kpi(s, x, y, w, h, label, value, o = {}) {
  card(s, x, y, w, h, o.fill || C.background1)
  const dark = !!o.fill
  text(s, label.toUpperCase(), { x: x + 0.2, y: y + 0.16, w: w - (h < 1.5 && o.delta ? 1.5 : 0.4), h: 0.3, fontSize: 9, bold: true, charSpacing: 1, color: dark ? C.accent4 : C.accent5 })
  const missing = value === TBD
  const compact = h < 1.5
  const valH = o.note || (o.delta && !compact) ? Math.min(h * 0.42, h - 0.9) : h * 0.5
  text(s, value, { x: x + 0.2, y: y + 0.42, w: w - 0.4, h: valH, fontSize: o.size || 30, bold: true, color: missing ? HEX.amber : dark ? C.background1 : C.text2, valign: 'middle' })
  // compact cards put the delta chip top-right so it never touches the value
  const chipX = compact ? x + w - 1.25 : x + 0.2
  const chipY = compact ? y + 0.12 : y + h - 0.48
  if (o.delta) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: chipX, y: chipY, w: 1.05, h: 0.3, rectRadius: 0.15, fill: { color: dark ? C.background1 : 'E3F1E6' }, line: { color: dark ? C.background1 : 'E3F1E6', width: 0 } })
    text(s, '▲ ' + o.delta, { x: chipX, y: chipY, w: 1.05, h: 0.3, fontSize: 10, bold: true, color: C.accent1, align: 'center', valign: 'middle' })
  }
  const noteShift = o.delta && !compact
  if (o.note) text(s, o.note, { x: x + (noteShift ? 1.35 : 0.2), y: y + h - 0.46, w: w - (noteShift ? 1.55 : 0.4), h: 0.34, fontSize: 9, color: dark ? C.accent4 : C.accent5, valign: 'middle' })
}
const chart = {
  catAxisLabelColor: HEX.slate, valAxisLabelColor: HEX.slate, catAxisLabelFontSize: 10, valAxisLabelFontSize: 9,
  catAxisLabelFontFace: '+mn-lt', valAxisLabelFontFace: '+mn-lt', dataLabelFontFace: '+mn-lt', titleFontFace: '+mn-lt', legendFontFace: '+mn-lt',
  dataLabelFontSize: 10, dataLabelColor: HEX.ink, showValue: true, showTitle: true, titleFontSize: 12, titleColor: HEX.green, titleAlign: 'left',
  valGridLine: { color: HEX.grid, size: 0.5 }, catGridLine: { style: 'none' }, valAxisHidden: true, showLegend: false, catAxisLineColor: HEX.grid,
}
const hdr = (cells) => cells.map((t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 } } }))
const tbl = (x, y, w, colW, extra = {}) => ({ x, y, w, colW, fontSize: 11, color: HEX.ink, border: { type: 'solid', pt: 0.5, color: HEX.grid }, valign: 'middle', margin: [0.04, 0.08, 0.04, 0.08], fill: { color: HEX.white }, ...extra })
const tbd = (x, f) => (has(x) ? (f ? f(x) : String(x)) : { text: TBD, options: { color: HEX.amber, italic: true } })
const bullets = (arr, o = {}) => arr.map((t, i) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: i < arr.length - 1, ...o } }))

const SLIDE_IDS = { 'THE CLIENT': 'client', 'OUR BRAND AGENCIES': 'brands', 'EXECUTIVE SUMMARY': 'summary', 'THE OPPORTUNITY': 'opportunity', 'THE SOLUTION': 'solution', 'STEP 2 · COMPETITOR SOCIAL AUDIT': 'competitors', 'STEP 4 · REEL IN ACTION': 'reel' }
function slide(master, section, kicker, title) {
  const id = SLIDE_IDS[kicker] || kicker.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const s = deckFor(id).addSlide(ONLY ? { masterName: master } : { masterName: master, sectionTitle: section })
  s.addText(kicker, { placeholder: 'kicker' })
  s.addText(title, { placeholder: 'title' })
  return s
}

;(async () => {
  // ================= 1. TITLE =================
  addSection({ title: 'Introduction' })
  let s = deckFor('title').addSlide(ONLY ? { masterName: 'BLANK_DARK' } : { masterName: 'BLANK_DARK', sectionTitle: 'Introduction' })
  // Full-bleed homepage screenshot with the title written on top (no split panel)
  s.addImage({ path: A('site-home-wide.jpg'), x: 0, y: 0, w: 13.333, h: 7.5, sizing: { type: 'cover', w: 13.333, h: 7.5 }, altText: 'twainyplast.com homepage' })
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: '0F2A18', transparency: 78 }, line: { color: '0F2A18', width: 0 } })
  // darker band across the lower part of the screenshot carries the title, below the site's own banner
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.05, w: 13.333, h: 2.45, fill: { color: '0F2A18', transparency: 22 }, line: { color: '0F2A18', width: 0 } })
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.05, w: 13.333, h: 0.06, fill: { color: C.accent2 }, line: { color: C.accent2, width: 0 } })
  text(s, 'MKT 843 · FINAL CONSULTING PROJECT · LAU AKSOB MBA', { x: 0.7, y: 5.3, w: 9, h: 0.3, fontSize: 12, bold: true, charSpacing: 3, color: 'A9CDB1' })
  text(s, 'From Visitors to Customers', { x: 0.7, y: 5.6, w: 8.6, h: 0.95, fontSize: 48, bold: true, color: C.background1 })
  text(s, 'Social media & digital growth strategy for Twainy Plast Sanitary', { x: 0.7, y: 6.55, w: 8.6, h: 0.45, fontSize: 18, color: 'E3EFE6' })
  const names = D.team.map((t) => t.name).filter(has)
  text(s, [
    { text: 'Dr. Kiray Khoury', options: { bold: true, breakLine: true } },
    { text: 'November 26, 2026', options: { breakLine: true } },
    names.length ? { text: names.join(' · ') } : { text: 'Team: [names]', options: { color: 'F2B66B' } },
  ], { x: 9.5, y: 5.75, w: 3.2, h: 1.2, fontSize: 13, color: 'E3EFE6', align: 'right' })
  s.addNotes('Introduce Twainy Plast and the question we tackled: how to turn a brand-new website into real orders through social media.')

  // ================= 2. EXECUTIVE DASHBOARD =================
  s = slide('DASHBOARD', 'Introduction', 'EXECUTIVE SUMMARY', 'Four weeks: from zero online sales to a working sales engine')
  kpi(s, 0.6, 1.55, 2.9, 1.65, 'Total orders', String(totalOrders), { fill: C.accent2, size: 38, note: `${W.orders} WhatsApp · ${K.orders} website · from 0` })
  kpi(s, 3.7, 1.55, 2.9, 1.65, 'Visits from Lebanon / week', growth(lebB, lebC), { delta: 'vs launch', note: `${lebB.toFixed(0)} → ${lebC.toFixed(0)}` })
  kpi(s, 6.8, 1.55, 2.9, 1.65, 'Social visits / week', growth(socB, socC), { delta: 'vs launch', note: `${socB.toFixed(1)} → ${socC.toFixed(1)}` })
  kpi(s, 9.9, 1.55, 2.8, 1.65, 'Search visits / week', growth(seaB, seaC), { delta: 'vs launch', note: 'Google + Bing' })
  kpi(s, 0.6, 3.4, 2.9, 1.65, 'Add-to-cart rate', growth(atcB, atcC), { delta: 'vs launch', note: `${pct(atcB)} → ${pct(atcC)}` })
  kpi(s, 3.7, 3.4, 2.9, 1.65, 'Orders via WhatsApp', pct(waShare, 0), { note: `${W.orders} orders in ${W.periodDays} days` })
  kpi(s, 6.8, 3.4, 2.9, 1.65, 'Short videos published', String(VIDEOS), { note: PLATFORMS.join(' · ') })
  kpi(s, 9.9, 3.4, 2.8, 1.65, 'Basket vs plan', basketX, { note: 'delivered website orders' })
  card(s, 0.6, 5.3, 12.1, 1.45, C.text2)
  text(s, [
    { text: 'The story in one line: ', options: { bold: true, color: C.accent4 } },
    { text: 'Twainy Plast’s plumbing brands were known on social media, but its bathroom range was invisible. We built the online store, gave it a brand and a 4-week content engine, and turned attention into orders, mostly closed on WhatsApp.', options: { color: C.background1 } },
  ], { x: 0.9, y: 5.45, w: 11.5, h: 1.15, fontSize: 15, valign: 'middle' })
  s.addNotes('Headline numbers. Growth is per week, campaign (Oct 26 – Nov 21) vs launch (Oct 7–21). Revenue is not shown at the client’s request.')

  // ================= 3. WHO IS TWAINY PLAST =================
  s = slide('DASHBOARD', 'Introduction', 'THE CLIENT', 'Twainy Plast: engineering-led plumbing and sanitary supply since 1987')
  // fact band: four big facts on one dark strip
  card(s, 0.6, 1.5, 12.1, 1.55, C.text2)
  const facts = [
    [fa.FaHistory, '1987', 'almost four decades in plumbing & sanitary supply'],
    [fa.FaHandshake, '4+', 'authorised Lebanese & international brand agencies'],
    [fa.FaFlag, 'Made in Lebanon', 'core mission, alongside certified imports'],
    [fa.FaMapMarkerAlt, 'Qsarnaba', 'Bekaa · family store & warehouse, delivering all over Lebanon'],
  ]
  for (let i = 0; i < facts.length; i++) {
    const [ic, v, l] = facts[i]
    const x = 0.6 + i * 3.025
    if (i) s.addShape(pres.shapes.LINE, { x, y: 1.8, w: 0, h: 0.95, line: { color: '3E6B4C', width: 1 } })
    await badge(s, ic, x + 0.3, 1.72, 0.48, i === 2 ? C.accent2 : C.accent1)
    text(s, v, { x: x + 0.9, y: 1.66, w: 2.1, h: 0.62, fontSize: v.length > 10 ? 18 : v.length > 6 ? 24 : 34, bold: true, color: C.background1, valign: 'middle' })
    text(s, l, { x: x + 0.3, y: 2.38, w: 2.6, h: 0.55, fontSize: 10.5, color: C.accent4 })
  }
  text(s, 'TWO BUSINESSES UNDER ONE ROOF', { x: 0.6, y: 3.3, w: 8, h: 0.3, fontSize: 11, bold: true, charSpacing: 2, color: C.accent5 })
  const businesses = [
    {
      x: 0.6, tag: 'B2B · PROFESSIONALS', tagColor: C.accent1, icon: fa.FaTools, iconFill: C.text2, title: 'Plumbing systems',
      body: 'PPR, PVC, PVC-U and HDPE pipes and fittings for plumbers and contractors.',
      photos: ['brands/haykal-pvc.jpg', 'brands/miatherm-ppr.jpg', 'brands/plimat-fittings.jpg', 'brands/senkron-hdpe.jpg'],
      chips: ['Haykal Plast', 'MiaTherm', 'PLIMAT', 'Şenkron'],
    },
    {
      x: 6.75, tag: 'B2C · HOMEOWNERS', tagColor: C.accent2, icon: fa.FaBath, iconFill: C.accent2, title: 'Bathroom sanitary ware',
      body: 'Mixers, LED mirrors, WCs, basins, vanities, showers and pumps for homeowners.',
      photos: ['products/mixer.jpg', 'products/mirror.jpg', 'products/basin.jpg', 'products/wc.jpg'],
      chips: ['175 products', 'twainyplast.com', 'Cash on delivery'],
    },
  ]
  for (const b of businesses) {
    card(s, b.x, 3.7, 5.95, 3.05)
    b.photos.forEach((ph, j) => {
      const px = b.x + 0.22 + j * 1.39
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px, y: 3.9, w: 1.29, h: 1.29, rectRadius: 0.08, fill: { color: 'F4F7F5' }, line: { color: HEX.grid, width: 0.5 } })
      s.addImage({ path: A(ph), x: px + 0.06, y: 3.96, w: 1.17, h: 1.17, sizing: { type: 'contain', w: 1.17, h: 1.17 }, altText: b.title + ' product' })
    })
    await badge(s, b.icon, b.x + 0.22, 5.38, 0.5, b.iconFill)
    text(s, b.tag, { x: b.x + 0.85, y: 5.36, w: 3.5, h: 0.24, fontSize: 9, bold: true, charSpacing: 1, color: b.tagColor })
    text(s, b.title, { x: b.x + 0.85, y: 5.58, w: 4.9, h: 0.38, fontSize: 17, bold: true, color: C.text2 })
    text(s, b.body, { x: b.x + 0.22, y: 6.0, w: 5.5, h: 0.32, fontSize: 11, color: C.accent5 })
    let cx = b.x + 0.22
    for (const c of b.chips) {
      const w = 0.16 + c.length * 0.075
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 6.37, w, h: 0.26, rectRadius: 0.13, fill: { color: C.background2 }, line: { color: C.background2, width: 0 } })
      text(s, c, { x: cx, y: 6.37, w, h: 0.26, fontSize: 9, bold: true, color: C.text2, align: 'center', valign: 'middle' })
      cx += w + 0.08
    }
  }
  // the gap, stated right on the cards
  text(s, '● Active on social media', { x: 4.0, y: 5.4, w: 2.4, h: 0.24, fontSize: 9, bold: true, color: C.accent1, align: 'right' })
  text(s, '● 0 social presence before', { x: 10.1, y: 5.4, w: 2.45, h: 0.24, fontSize: 9, bold: true, color: C.accent2, align: 'right' })
  s.addNotes('Source: twainyplast.com About page. Plumbing products shown are from the four brand agencies; bathroom products are from the Shopify catalogue (illustrative product images).')

  // ================= 4. OUR FOUR BRANDS =================
  s = slide('DASHBOARD', 'Introduction', 'OUR BRAND AGENCIES', 'Four authorised brands, already promoted on social media')
  const brands = [
    { logo: 'brands/haykal-plast.png', name: 'Haykal Plast', origin: 'Lebanon', what: 'PVC pipes & fittings', spec: 'EN 1329 · EN 1401 · SN2 / SN4', photo: 'brands/haykal-pvc.jpg' },
    { logo: 'brands/miatherm.png', name: 'MiaTherm', origin: 'Lebanon', what: 'PPR hot & cold water systems', spec: 'ISO 15874 · up to 20 bar', photo: 'brands/miatherm-ppr.jpg' },
    { logo: 'brands/plimat.png', name: 'PLIMAT', origin: 'Portugal', what: 'PVC-U pressure pipes & fittings', spec: 'EN 1452-3 · 16 bar', photo: 'brands/plimat-fittings.jpg' },
    { logo: null, name: 'ŞENKRON', origin: 'Turkey', what: 'HDPE pipe systems', spec: 'TSE-compliant HDPE', photo: 'brands/senkron-hdpe.jpg' },
  ]
  for (let i = 0; i < brands.length; i++) {
    const b = brands[i]
    const x = 0.6 + i * 3.05
    card(s, x, 1.55, 2.85, 5.2)
    if (b.logo) await fit(s, A(b.logo), x + 0.25, 1.75, 2.35, 0.8, { alt: b.name + ' logo' })
    else text(s, b.name, { x: x + 0.25, y: 1.75, w: 2.35, h: 0.8, fontSize: 26, bold: true, color: '1F3A6E', align: 'center', valign: 'middle', charSpacing: 2 })
    s.addShape(pres.shapes.LINE, { x: x + 0.25, y: 2.75, w: 2.35, h: 0, line: { color: HEX.grid, width: 0.75 } })
    s.addImage({ path: A(b.photo), x: x + 0.25, y: 2.95, w: 2.35, h: 1.9, sizing: { type: 'cover', w: 2.35, h: 1.9 }, altText: b.what })
    text(s, b.name, { x: x + 0.25, y: 5.0, w: 2.35, h: 0.35, fontSize: 15, bold: true, color: C.text2 })
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 1.6, y: 5.03, w: 1.0, h: 0.28, rectRadius: 0.14, fill: { color: C.background2 }, line: { color: C.background2, width: 0 } })
    text(s, b.origin, { x: x + 1.6, y: 5.03, w: 1.0, h: 0.28, fontSize: 9, bold: true, color: C.accent1, align: 'center', valign: 'middle' })
    text(s, b.what, { x: x + 0.25, y: 5.4, w: 2.35, h: 0.55, fontSize: 12 })
    text(s, b.spec, { x: x + 0.25, y: 6.0, w: 2.35, h: 0.55, fontSize: 10, color: C.accent5 })
  }
  s.addNotes('Brand descriptions from twainyplast.com; logos from haykalplast.com (Haykal Plast, MiaTherm catalogue) and plimat.pt. Şenkron shown as a name card until the official logo file is supplied.')

  // ================= 5. THE GAP =================
  s = slide('CONTENT', 'Introduction', 'THE OPPORTUNITY', 'Plumbing was visible on social media. The bathroom range was not.')
  card(s, 0.6, 1.6, 5.4, 4.0, C.background2, false)
  await badge(s, fa.FaInstagram, 0.9, 1.9, 0.65, C.text2)
  text(s, 'Plumbing brands', { x: 1.75, y: 1.95, w: 4, h: 0.55, fontSize: 20, bold: true, color: C.text2, valign: 'middle' })
  text(s, bullets(['Haykal Plast, MiaTherm, PLIMAT and Şenkron posted regularly', 'Audience: plumbers and contractors', 'Sold by phone, in store and through dealers']), { x: 0.9, y: 2.8, w: 4.85, h: 2.6, fontSize: 14, paraSpaceAfter: 10 })
  s.addShape(pres.shapes.RIGHT_ARROW, { x: 6.25, y: 3.2, w: 0.85, h: 0.8, fill: { color: C.accent2 }, line: { color: C.accent2, width: 0 } })
  card(s, 7.35, 1.6, 5.35, 4.0, 'FBE9E4', false)
  await badge(s, fa.FaBath, 7.65, 1.9, 0.65, C.accent2)
  text(s, 'Bathroom sanitary ware', { x: 8.5, y: 1.95, w: 4, h: 0.55, fontSize: 20, bold: true, color: C.accent2, valign: 'middle' })
  const zeros = [['0', 'social posts'], ['0', 'online sales'], ['0', 'online store until Oct 2026']]
  zeros.forEach(([v, l], i) => {
    text(s, v, { x: 7.65 + i * 1.6, y: 2.85, w: 1.5, h: 0.9, fontSize: 44, bold: true, color: C.accent2, align: 'center' })
    text(s, l, { x: 7.65 + i * 1.6, y: 3.75, w: 1.5, h: 0.6, fontSize: 11, color: C.accent5, align: 'center' })
  })
  text(s, 'Homeowners renovating a bathroom had no way to find, compare or order these products online.', { x: 7.65, y: 4.55, w: 4.8, h: 0.8, fontSize: 13, italic: true })
  card(s, 0.6, 5.85, 12.1, 0.9, C.text2, false)
  text(s, [{ text: 'Research question: ', options: { bold: true, color: C.accent4 } }, { text: 'How can Twainy Plast use social content, customer trust and an easier buying journey to turn website visitors into paying customers?', options: { color: C.background1 } }], { x: 0.9, y: 5.9, w: 11.5, h: 0.8, fontSize: 14, valign: 'middle' })

  // ================= 6. THE SOLUTION: WEBSITE =================
  s = slide('CONTENT', 'Introduction', 'THE SOLUTION', 'We built twainyplast.com with Shopify and AI tools')
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.6, w: 7.2, h: 4.7, rectRadius: 0.08, fill: { color: 'DDE3DF' }, line: { color: 'DDE3DF', width: 0 }, shadow: shadow() })
  ;['E57373', 'F2C14E', '7CC47F'].forEach((c, i) => s.addShape(pres.shapes.OVAL, { x: 0.8 + i * 0.22, y: 1.72, w: 0.13, h: 0.13, fill: { color: c }, line: { color: c, width: 0 } }))
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.6, y: 1.69, w: 4.5, h: 0.2, rectRadius: 0.1, fill: { color: HEX.white }, line: { color: HEX.white, width: 0 } })
  text(s, 'twainyplast.com', { x: 1.7, y: 1.69, w: 4.3, h: 0.2, fontSize: 9, color: C.accent5, valign: 'middle' })
  s.addImage({ path: A('site-desktop.jpg'), x: 0.68, y: 2.0, w: 7.04, h: 4.22, sizing: { type: 'cover', w: 7.04, h: 4.22 }, altText: 'twainyplast.com homepage' })
  const sol = [
    [fa.FaShopify, 'Shopify store', '175 products in 10+ categories, English and Arabic'],
    [fa.FaRobot, 'Built with AI tools', 'Product visuals and descriptions created with AI (ChatGPT), labelled as illustrative'],
    [fa.FaMoneyBillWave, 'Cash on delivery', 'No card needed; delivery all over Lebanon, free over $30'],
    [fa.FaWhatsapp, 'WhatsApp built in', 'Floating chat button for advice and orders'],
  ]
  for (let i = 0; i < sol.length; i++) {
    const [ic, h, d] = sol[i]
    const y = 1.6 + i * 1.18
    await badge(s, ic, 8.2, y + 0.05, 0.6, i === 1 ? C.accent2 : C.accent1)
    text(s, h, { x: 9.0, y, w: 3.7, h: 0.38, fontSize: 15, bold: true, color: C.text2 })
    text(s, d, { x: 9.0, y: y + 0.38, w: 3.7, h: 0.7, fontSize: 12, color: C.accent5 })
  }
  text(s, 'Launched mid-October 2026. The social media strategy that follows drives traffic to this store.', { x: 0.6, y: 6.45, w: 12, h: 0.35, fontSize: 12, italic: true, color: C.accent5 })

  // ================= 7. LAUNCH BASELINE =================
  addSection({ title: 'Diagnose & research' })
  s = slide('DASHBOARD', 'Diagnose & research', 'STEP 1 · LAUNCH BASELINE', `The first two weeks online (${S.baselinePeriod}): visitors, but no buyers`)
  kpi(s, 0.6, 1.55, 2.9, 1.5, 'Sessions', String(B.sessions), { note: `${B.days} days after launch` })
  kpi(s, 0.6, 3.2, 2.9, 1.5, 'Orders', '0', { fill: C.accent2 })
  kpi(s, 0.6, 4.85, 2.9, 1.5, 'Add-to-cart rate', pct(atcB), { note: `${B.cartSessions} of ${B.sessions} sessions` })
  card(s, 3.7, 1.55, 4.6, 4.8)
  s.addChart(pres.charts.BAR, [{ name: 'Funnel', labels: ['Sessions', 'Added to cart', 'Reached checkout', 'Orders'], values: [B.sessions, B.cartSessions, B.checkoutSessions, 0] }], { ...chart, x: 3.85, y: 1.7, w: 4.3, h: 2.6, barDir: 'bar', title: 'Launch funnel', chartColors: [HEX.leaf], catAxisOrientation: 'maxMin', dataLabelPosition: 'outEnd', barGapWidthPct: 55 })
  s.addChart(pres.charts.BAR, [{ name: 'Source', labels: ['Direct', 'Social', 'Search'], values: [B.directSessions, B.socialSessions, B.searchSessions] }], { ...chart, x: 3.85, y: 4.25, w: 4.3, h: 2.0, barDir: 'bar', title: 'Sessions by source', chartColors: [HEX.chrome], catAxisOrientation: 'maxMin', dataLabelPosition: 'outEnd', barGapWidthPct: 55 })
  card(s, 8.5, 1.55, 4.2, 4.8)
  text(s, 'Barriers we found', { x: 8.75, y: 1.75, w: 3.7, h: 0.35, fontSize: 15, bold: true, color: C.text2 })
  text(s, bullets(['Only 6% of visits from social media', 'Only 44% of visits from Lebanon', 'Delivery and payment terms hidden until checkout', 'Home button says “Our Journey”, not “Shop”', 'No tracking, no reviews, no real product photos', 'Checkout asks for email and pre-ticks marketing consent']), { x: 8.75, y: 2.2, w: 3.75, h: 4.0, fontSize: 12, paraSpaceAfter: 8 })

  // ================= 8. ETHICS & CONSENT =================
  s = slide('CONTENT', 'Diagnose & research', 'STEP 1 · ETHICAL AUDIT & CONSENT', 'Consent and ethical guardrails agreed with the owner')
  const eth = [
    [fa.FaFileSignature, 'Owner consent', 'Written authorisation for audits, creative work and presenting results; every post and dollar approved first.'],
    [fa.FaUserShield, 'Data privacy', 'Order data only; anonymised interviews; opt-in WhatsApp lists; Lebanon’s Law 81/2018.'],
    [fa.FaTags, 'Honest offers', 'Only real, standing terms (free delivery over $30, COD). No fake discounts or countdowns.'],
    [fa.FaStar, 'Authentic proof', 'No invented reviews; AI product visuals labelled “illustrative”.'],
    [fa.FaBullseye, 'Ethical targeting', 'Location-based ads only; no religion, sect, politics or other sensitive traits.'],
    [fa.FaExclamationTriangle, 'Issue we flagged', 'Checkout pre-ticks “email me offers”: we recommended opt-in consent.'],
  ]
  for (let i = 0; i < eth.length; i++) {
    const [ic, h, d] = eth[i]
    const x = 0.6 + (i % 3) * 4.1
    const y = 1.6 + Math.floor(i / 3) * 2.6
    card(s, x, y, 3.85, 2.35, i === 5 ? 'FBE9E4' : C.background2, false)
    await badge(s, ic, x + 0.25, y + 0.25, 0.55, i === 5 ? C.accent2 : C.accent1)
    text(s, h, { x: x + 0.95, y: y + 0.27, w: 2.8, h: 0.5, fontSize: 16, bold: true, color: C.text2, valign: 'middle' })
    text(s, d, { x: x + 0.25, y: y + 1.0, w: 3.4, h: 1.25, fontSize: 12 })
  }

  // ================= 9. COMPETITORS =================
  s = slide('CONTENT', 'Diagnose & research', 'STEP 2 · COMPETITOR SOCIAL AUDIT', 'Competitors show products, but rarely prices, delivery or fit')
  const comp = D.competitors
  const muted = (t) => (/^(Not public|n\/a|0$|None found)/.test(t) ? { text: t, options: { color: C.accent5, italic: true } } : t)
  s.addTable([
    hdr(['Social audit · Nov 2026', 'Twainy Plast', ...comp.map((c) => `${c.name} · ${c.type}`)]),
    ['Platforms', (SO.platforms || []).join(', '), ...comp.map((c) => muted(c.platforms))],
    ['Followers', `${SO.igFollowersEnd.toLocaleString('en-US')} (Instagram)`, ...comp.map((c) => muted(c.followers))],
    ['Posts / 30 days', `${VIDEOS} videos + 5 posts`, ...comp.map((c) => muted(c.posts30))],
    ['Reach / engagement', `${Math.round(SO.igViews30d / 1000)}K views in 30 days`, ...comp.map((c) => muted(c.engagement))],
    ['Prices shown?', 'Yes, every post', ...comp.map((c) => muted(c.prices))],
    ['Purchase path', 'Website · WhatsApp · store', ...comp.map((c) => muted(c.path))],
  ], { ...tbl(0.6, 1.55, 12.1, [2.4, 2.8, 2.3, 2.3, 2.3]), rowH: 0.46 })
  card(s, 0.6, 5.0, 5.9, 1.75, C.background2, false)
  text(s, [{ text: 'Method', options: { bold: true, color: C.text2, breakLine: true } }, { text: 'Public profiles, websites and directories checked in November 2026. 30-day post counts and engagement need account access, so they are marked “not public”. Twainy figures come from its own Instagram dashboard.' }], { x: 0.85, y: 5.15, w: 5.4, h: 1.5, fontSize: 12 })
  card(s, 6.8, 5.0, 5.9, 1.75, C.text2, false)
  text(s, [{ text: 'Our opening', options: { bold: true, color: C.accent4, breakLine: true } }, { text: 'Own “clear and honest”: prices on every post, how-to-order guides, free help choosing and live video before buying. Arcom is the benchmark to beat online.', options: { color: C.background1 } }], { x: 7.05, y: 5.15, w: 5.4, h: 1.5, fontSize: 13 })
  s.addNotes('Sources: facebook.com/builderssal (5.1K followers), builderslebanon.com; instagram.com/arcomgroup (~20K followers, 644 posts), arcomgroup.com (Shopify store with prices); Chromotech listed with no social media in the Index of Lebanon directory. Twainy: 957 Instagram followers, 225 posts, 87K views in 30 days.')

  // ================= 10. PERSONAS =================
  s = slide('CONTENT', 'Diagnose & research', 'STEP 2 · BUYER PERSONAS', 'Two personas, validated by who actually ordered')
  const per = [
    [fa.FaHome, 'Rania, 34', 'Homeowner renovating', 'Buy online with confidence', [['Profile', 'Middle income, partly USD-earning; Beirut, Mount Lebanon, Bekaa'], ['Pains', 'Wrong fit, poor quality, delivery risk'], ['Social', 'Instagram, TikTok, FB groups · 13:00 and 21:00 · Reels, carousels'], ['Follows', 'Lebanese home-décor micro-creators (10–50k)']]],
    [fa.FaTools, 'Hassan, 45', 'Plumber / contractor', 'Quick quote on WhatsApp', [['Profile', 'Self-employed, buys for clients, repeat buyer'], ['Pains', 'Wasted trips, changing prices, slow replies'], ['Social', 'WhatsApp, Facebook, YouTube/TikTok how-tos · 07:00 and 21:00'], ['Follows', 'Plumbing how-to channels, supplier pages']]],
  ]
  for (let i = 0; i < 2; i++) {
    const [ic, nm, role, goal, rows] = per[i]
    const x = 0.6 + i * 4.15
    card(s, x, 1.55, 3.95, 5.2, C.background2, false)
    await badge(s, ic, x + 0.25, 1.75, 0.75, C.text2)
    text(s, nm, { x: x + 1.15, y: 1.75, w: 2.6, h: 0.4, fontSize: 18, bold: true, color: C.text2 })
    text(s, role, { x: x + 1.15, y: 2.15, w: 2.6, h: 0.35, fontSize: 12, color: C.accent5 })
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.25, y: 2.75, w: 3.45, h: 0.38, rectRadius: 0.19, fill: { color: C.accent1 }, line: { color: C.accent1, width: 0 } })
    text(s, 'Goal: ' + goal, { x: x + 0.25, y: 2.75, w: 3.45, h: 0.38, fontSize: 12, bold: true, color: C.background1, align: 'center', valign: 'middle' })
    rows.forEach(([k, v], j) => {
      text(s, k, { x: x + 0.25, y: 3.35 + j * 0.82, w: 0.9, h: 0.75, fontSize: 11, bold: true, color: C.accent1 })
      text(s, v, { x: x + 1.15, y: 3.35 + j * 0.82, w: 2.6, h: 0.75, fontSize: 11 })
    })
  }
  card(s, 9.0, 1.55, 3.7, 5.2, C.text2, false)
  text(s, 'Validation', { x: 9.25, y: 1.75, w: 3.2, h: 0.4, fontSize: 16, bold: true, color: C.accent4 })
  text(s, [
    ...S.orders.flatMap((o) => [{ text: o.city, options: { bold: true, color: C.background1, breakLine: true } }, { text: `${o.items} items · ${o.status.toLowerCase()}`, options: { color: C.accent4, breakLine: true } }]),
    { text: ' ', options: { breakLine: true } },
    { text: `+ ${W.orders} WhatsApp orders in ${W.periodDays} days. Demand is nationwide; multi-item baskets match renovators and plumbers.`, options: { color: C.background1 } },
  ], { x: 9.25, y: 2.25, w: 3.25, h: 4.3, fontSize: 12, paraSpaceAfter: 2 })

  // ================= 11. BRAND IDENTITY =================
  addSection({ title: 'Strategy & creative' })
  s = slide('CONTENT', 'Strategy & creative', 'STEP 3 · BRAND IDENTITY MATRIX', 'One promise: Choose with Confidence · اختار بثقة')
  const pal = [['Twainy Green', HEX.green], ['Leaf Green', HEX.leaf], ['Mist', HEX.mist], ['Chrome', HEX.chrome], ['Twainy Red', HEX.red]]
  pal.forEach(([nm, hx], i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6 + i * 1.2, y: 1.6, w: 1.05, h: 1.05, rectRadius: 0.1, fill: { color: hx }, line: { color: HEX.grid, width: 0.75 } })
    text(s, nm, { x: 0.55 + i * 1.2, y: 2.72, w: 1.15, h: 0.28, fontSize: 10, bold: true, align: 'center' })
    text(s, '#' + hx, { x: 0.55 + i * 1.2, y: 2.98, w: 1.15, h: 0.25, fontSize: 9, color: C.accent5, align: 'center' })
  })
  text(s, 'Colours from the existing logo; red only for prices and calls to action. Typeface: Cairo (Arabic + Latin).', { x: 0.6, y: 3.35, w: 5.9, h: 0.6, fontSize: 12, color: C.accent5 })
  s.addTable([
    hdr(['Context', 'Tone', 'Example']),
    ['Education', 'Clear, step by step', '“3 things to check before buying a mixer.”'],
    ['Offers', 'Exact terms, no hype', '“Free delivery over $30, all over Lebanon.”'],
    ['Complaints', 'Calm, accountable', '“We’re sorry. We’ve messaged you to fix it today.”'],
    ['Plumbers', 'Short, technical', '“In stock. ½″, wall-mounted.”'],
  ], { ...tbl(0.6, 4.05, 5.9, [1.3, 1.6, 3.0]), rowH: 0.42 })
  await fit(s, A('p1-we-are-online.png'), 6.9, 1.6, 2.8, 3.5, { alt: 'Post 1' })
  await fit(s, A('p4-see-it-live-1.png'), 9.9, 1.6, 2.8, 3.5, { alt: 'Post 4' })
  card(s, 6.9, 5.35, 5.8, 1.4, C.background2, false)
  text(s, [{ text: 'Community guidelines: ', options: { bold: true, color: C.text2 } }, { text: 'reply within 1 hour · answer prices publicly · personal details only in DM · never delete criticism · repost photos only with permission.' }], { x: 7.1, y: 5.45, w: 5.4, h: 1.2, fontSize: 12, valign: 'middle' })

  // ================= 12. CHANNEL ECOSYSTEM =================
  s = slide('CONTENT', 'Strategy & creative', 'STEP 3 · CHANNEL ARCHITECTURE', 'Every channel has one job, from first video to delivered order')
  const flow = [['Discover', 'TikTok · Instagram · Facebook · Google'], ['Consider', 'Carousels · highlights · product pages'], ['Convert', 'Website checkout · WhatsApp “LIVE” video'], ['Retain', 'WhatsApp broadcasts · reviews · price lists']]
  flow.forEach(([h, d], i) => {
    const x = 0.6 + i * 2.25
    s.addShape(pres.shapes.CHEVRON, { x, y: 1.6, w: 2.2, h: 0.75, fill: { color: i === 2 ? C.accent2 : C.text2 }, line: { color: HEX.white, width: 0 } })
    text(s, h, { x: x + 0.35, y: 1.6, w: 1.5, h: 0.75, fontSize: 15, bold: true, color: C.background1, align: 'center', valign: 'middle' })
    text(s, d, { x, y: 2.45, w: 2.15, h: 0.6, fontSize: 11, align: 'center', color: C.accent5 })
  })
  s.addTable([
    hdr(['Channel', 'Role', 'Set-up']),
    ['Instagram', 'Primary: Rania discovers and saves', 'Bio, highlights, link-in-bio, location tag'],
    ['TikTok', 'Reach new homeowners for free', `${VIDEOS} short videos`],
    ['Facebook', 'Older homeowners and groups', 'Mirrored page, WhatsApp button'],
    ['WhatsApp Business', 'Advice, quotes, “LIVE” video, orders', 'Catalogue, auto-replies, /live, labels'],
    ['Google profile + SEO', 'High-intent local searches', 'Categories, photos, keywords'],
  ], { ...tbl(0.6, 3.25, 8.9, [2.2, 3.4, 3.3]), rowH: 0.5 })
  await fit(s, A('ig-profile.png'), 9.85, 1.5, 2.85, 5.3, { alt: 'Instagram profile mockup' })

  // ================= 13. CAMPAIGN & PILLARS =================
  s = slide('CONTENT', 'Strategy & creative', 'STEP 4 · CAMPAIGN & CONTENT PILLARS', '“Choose with Confidence”: four weeks, three customer fears')
  const st = [['Week 1', 'Awareness', 'We’re online, delivering all over Lebanon'], ['Week 2', 'Consideration', 'How to order in 4 steps, no card needed'], ['Week 3', 'Trust', 'Free help choosing + live video before buying'], ['Week 4', 'Action', 'Why order from us · reviews · retargeting']]
  st.forEach(([w, h, d], i) => {
    const x = 0.6 + i * 3.05
    card(s, x, 1.6, 2.85, 2.1, i === 2 ? C.accent2 : C.text2, false)
    text(s, w, { x: x + 0.22, y: 1.75, w: 2.4, h: 0.28, fontSize: 11, color: C.accent4 })
    text(s, h, { x: x + 0.22, y: 2.03, w: 2.4, h: 0.45, fontSize: 19, bold: true, color: C.background1 })
    text(s, d, { x: x + 0.22, y: 2.55, w: 2.45, h: 1.0, fontSize: 12, color: C.background1 })
  })
  const pil = [['35%', 'Choose Right', 'fit, size, comparisons'], ['25%', 'Inside Twainy', 'store, team, packing'], ['20%', 'Real Homes', 'genuine reviews'], ['20%', 'Order Easy', 'prices, delivery, how to order']]
  pil.forEach(([p, h, d], i) => {
    const x = 0.6 + i * 3.05
    card(s, x, 3.95, 2.85, 1.25, C.background2, false)
    text(s, p, { x: x + 0.2, y: 4.05, w: 1.05, h: 0.6, fontSize: 26, bold: true, color: C.accent1, valign: 'middle' })
    text(s, h, { x: x + 1.25, y: 4.07, w: 1.55, h: 0.55, fontSize: 14, bold: true, color: C.text2, valign: 'middle' })
    text(s, d, { x: x + 0.2, y: 4.68, w: 2.5, h: 0.4, fontSize: 11, color: C.accent5 })
  })
  card(s, 0.6, 5.45, 12.1, 1.3, C.background1)
  text(s, [
    { text: 'Rhythm: ', options: { bold: true } }, { text: '3 feed posts / week at 21:00 · daily stories · weekly WhatsApp broadcast (plumbers 07:00) · weekly Google post.', options: { breakLine: true } },
    { text: 'Hashtags: ', options: { bold: true } }, { text: '#TwainyPlast #ChooseWithConfidence #ShopOnlineLebanon #BathroomRenovation + 2 local tags.', options: { breakLine: true } },
    { text: 'CTA ladder: ', options: { bold: true } }, { text: 'Shop now → Save & order → Message “LIVE” → Order today.' },
  ], { x: 0.85, y: 5.55, w: 11.6, h: 1.1, fontSize: 12, paraSpaceAfter: 3 })

  // ================= 14. POSTS =================
  s = slide('DASHBOARD', 'Strategy & creative', 'STEP 4 · STATIC & CAROUSEL ASSETS', 'Five posts that inform, teach and ask for action')
  const posts = [['p1-we-are-online.png', 'We’re online', 'Shop now'], ['p2-how-to-order-1.png', 'How to order · 6 slides', 'Save + order'], ['p3-help-choose-1.png', 'We help you choose · 4', 'Message us'], ['p4-see-it-live-1.png', 'See it live · 3', 'Message “LIVE”'], ['p5-why-twainy.png', 'Why order from us', 'Order now']]
  for (let i = 0; i < posts.length; i++) {
    const x = 0.6 + i * 2.45
    card(s, x, 1.55, 2.3, 4.15)
    await fit(s, A(posts[i][0]), x + 0.1, 1.65, 2.1, 2.62, { valign: 'top', alt: posts[i][1] })
    text(s, posts[i][1], { x: x + 0.15, y: 4.4, w: 2.0, h: 0.5, fontSize: 12, bold: true, color: C.text2 })
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.15, y: 5.05, w: 2.0, h: 0.38, rectRadius: 0.19, fill: { color: C.accent2 }, line: { color: C.accent2, width: 0 } })
    text(s, posts[i][2], { x: x + 0.15, y: 5.05, w: 2.0, h: 0.38, fontSize: 11, bold: true, color: C.background1, align: 'center', valign: 'middle' })
  }
  card(s, 0.6, 5.95, 12.1, 0.8, C.background1)
  text(s, 'One headline · one benefit list · one red call to action · logo, website and WhatsApp on every post · real checkout screenshots · captions in English and Arabic.', { x: 0.85, y: 6.0, w: 11.6, h: 0.7, fontSize: 12, valign: 'middle', color: C.accent5 })

  // ================= 15. VIDEOS =================
  s = slide('DASHBOARD', 'Strategy & creative', 'STEP 4 · SHORT-FORM VIDEO ENGINE', `${VIDEOS} short videos on ${PLATFORMS.length} platforms, filmed in store`)
  kpi(s, 0.6, 1.55, 2.9, 1.5, 'Videos published', String(VIDEOS), { fill: C.accent2, size: 34 })
  kpi(s, 0.6, 3.2, 2.9, 1.5, 'Platforms', String(PLATFORMS.length), { note: PLATFORMS.join(' · ') })
  kpi(s, 0.6, 4.85, 2.9, 1.5, 'Social visits, final week', `${S.weekly[S.weekly.length - 1].social}`, { delta: growth(S.weekly.find((w) => w.week === 'Oct 19').social, S.weekly[S.weekly.length - 1].social), note: 'vs week before launch' })
  const rl = [['reel-a-store-to-your-door.png', 'From our store to your door', '“We’re online now 🎉”'], ['reel-b-how-to-order.png', 'How to order in 20 seconds', '“Watch: 20 seconds to order”'], ['reel-c-see-it-live.png', 'Not sure? We’ll show you live', '“Scared to buy online?”']]
  for (let i = 0; i < rl.length; i++) {
    const y = 1.55 + i * 1.65
    card(s, 3.7, y, 9.0, 1.5)
    s.addImage({ path: A(rl[i][0]), x: 3.8, y: y + 0.1, w: 2.33, h: 1.3, sizing: { type: 'cover', w: 2.33, h: 1.3 }, altText: rl[i][1] })
    text(s, `Hero Reel ${'ABC'[i]}`, { x: 6.35, y: y + 0.15, w: 2.5, h: 0.28, fontSize: 10, bold: true, color: C.accent2 })
    text(s, rl[i][1], { x: 6.35, y: y + 0.42, w: 6.1, h: 0.4, fontSize: 15, bold: true, color: C.text2 })
    text(s, `Hook: ${rl[i][2]} · 9:16 · 20–30 s · 6 shots · owner voice-over · trending audio · subtitles`, { x: 6.35, y: y + 0.85, w: 6.2, h: 0.5, fontSize: 11, color: C.accent5 })
  }

  // ================= 15b. REEL IN ACTION (embedded video) =================
  s = slide('DASHBOARD', 'Strategy & creative', 'STEP 4 · REEL IN ACTION', `One of our ${VIDEOS} reels: store, website, WhatsApp in 27 seconds`)
  // phone frame with the real reel embedded, so it plays offline from inside PowerPoint
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y: 1.45, w: 3.04, h: 5.22, rectRadius: 0.33, fill: { color: '15171A' }, line: { color: '3A3D42', width: 1.5 }, shadow: shadow() })
  const poster = 'image/jpeg;base64,' + fs.readFileSync(MEDIA('twainy-reel-poster.jpg')).toString('base64')
  s.addMedia({ type: 'video', path: MEDIA('twainy-reel.mp4'), x: 0.92, y: 1.57, w: 2.8, h: 4.98, cover: poster })
  text(s, '▶ Click to play · 27 s', { x: 0.8, y: 6.72, w: 3.04, h: 0.24, fontSize: 9, color: C.accent5, align: 'center' })
  const moments = [
    ['0:01', 'reel-frame-1.jpg', 'Hook', 'The owner speaks straight to camera about bathroom renovation'],
    ['0:11', 'reel-frame-11.jpg', 'Proof', 'Shows the real twainyplast.com store on a phone'],
    ['0:16', 'reel-frame-16.jpg', 'Choice', 'Walks through categories: basins, mirrors, mixers, pumps'],
    ['0:21', 'reel-frame-21.jpg', 'Action', 'Ends with three WhatsApp numbers to order'],
  ]
  moments.forEach(([t, img, h, d], i) => {
    const x = 4.3 + i * 2.13
    card(s, x, 1.5, 1.98, 3.45)
    s.addImage({ path: MEDIA(img), x: x + 0.1, y: 1.6, w: 1.78, h: 2.05, sizing: { type: 'cover', w: 1.78, h: 2.05 }, altText: `${h} moment at ${t}` })
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.16, y: 1.68, w: 0.55, h: 0.26, rectRadius: 0.13, fill: { color: C.accent2 }, line: { color: C.accent2, width: 0 } })
    text(s, t, { x: x + 0.16, y: 1.68, w: 0.55, h: 0.26, fontSize: 9, bold: true, color: C.background1, align: 'center', valign: 'middle' })
    text(s, h, { x: x + 0.12, y: 3.75, w: 1.75, h: 0.3, fontSize: 13, bold: true, color: C.text2 })
    text(s, d, { x: x + 0.12, y: 4.05, w: 1.78, h: 0.8, fontSize: 10, color: C.accent5 })
  })
  kpi(s, 4.3, 5.2, 2.0, 1.55, 'Videos published', String(VIDEOS), { fill: C.accent2, size: 30 })
  kpi(s, 6.43, 5.2, 2.0, 1.55, 'Platforms', String(PLATFORMS.length), { size: 30, note: PLATFORMS.join(' · ') })
  kpi(s, 8.56, 5.2, 2.0, 1.55, 'Instagram views', `${Math.round(SO.igViews30d / 1000)}K`, { size: 30, note: 'last 30 days' })
  card(s, 10.69, 5.2, 2.01, 1.55, C.text2)
  text(s, [{ text: 'Formula', options: { bold: true, color: C.accent4, breakLine: true } }, { text: 'Face-to-camera hook → real website → clear WhatsApp call to action', options: { color: C.background1 } }], { x: 10.85, y: 5.32, w: 1.75, h: 1.35, fontSize: 10.5 })
  s.addNotes('Play the reel (27 s). It follows the campaign formula: a human hook, proof that the online store is real, then a direct WhatsApp call to action.')

  // ================= 16. KPI FRAMEWORK & TRACKING =================
  addSection({ title: 'Results' })
  s = slide('CONTENT', 'Results', 'STEP 5 · KPI FRAMEWORK & ANALYTICS', 'What we measured, how, and with which tool')
  s.addTable([
    hdr(['KPI', 'Formula', 'Tool']),
    ['Reach', 'Unique accounts reached', 'Meta Business Suite · TikTok analytics'],
    ['Engagement rate (ERR)', 'Interactions ÷ reach', 'Native insights'],
    ['Click-through rate', 'Link clicks ÷ impressions', 'Ads Manager · UTM links'],
    ['Sessions & sources', 'By referrer, country, device', 'Shopify Analytics · GA4'],
    ['Add-to-cart & conversion', 'Cart sessions ÷ sessions; orders ÷ sessions', 'Shopify funnel · GA4 events'],
    ['CAC', 'Ad spend ÷ new customers', 'Ads Manager + orders log'],
    ['WhatsApp orders', 'Labelled chats, each order logged once', 'WhatsApp Business'],
  ], { ...tbl(0.6, 1.55, 7.7, [2.3, 3.1, 2.3]), rowH: 0.52 })
  card(s, 8.6, 1.55, 4.1, 2.45, C.text2, false)
  text(s, [{ text: 'Paid test plan · $200', options: { bold: true, color: C.accent4, breakLine: true } }, ...bullets(['Wk 1 awareness $30', 'Wk 2 A/B Reel vs carousel $70', 'Wks 3–4 scale winner $70', 'Wks 3–4 retarget $30'], { color: C.background1 })], { x: 8.85, y: 1.7, w: 3.7, h: 2.2, fontSize: 12, paraSpaceAfter: 4 })
  card(s, 8.6, 4.2, 4.1, 2.55, C.background2, false)
  text(s, [{ text: 'Attribution rules', options: { bold: true, color: C.text2, breakLine: true } }, ...bullets(['Shopify = source of truth for web', 'UTM tags on every link', 'WhatsApp orders logged separately', 'Observed change vs baseline, not proven causation'])], { x: 8.85, y: 4.35, w: 3.7, h: 2.3, fontSize: 12, paraSpaceAfter: 4 })

  // ================= 17. TRAFFIC DASHBOARD =================
  s = slide('DASHBOARD', 'Results', `RESULTS · WEBSITE TRAFFIC · ${S.campaignPeriod.toUpperCase()}`, 'More of the right visitors: Lebanese, on mobile, from social and search')
  kpi(s, 0.6, 1.5, 2.9, 1.35, 'Sessions / week', growth(sesB, sesC), { delta: 'vs launch', size: 26 })
  kpi(s, 3.7, 1.5, 2.9, 1.35, 'From Lebanon / week', growth(lebB, lebC), { delta: 'vs launch', size: 26 })
  kpi(s, 6.8, 1.5, 2.9, 1.35, 'Visitors from Lebanon', `${pct(B.lebanonShare, 0)} → ${pct(K.lebanonShare, 0)}`, { size: 24, note: 'share of sessions' })
  kpi(s, 9.9, 1.5, 2.8, 1.35, 'Visitors on mobile', `${pct(B.mobileShare, 0)} → ${pct(K.mobileShare, 0)}`, { size: 24, note: 'share of sessions' })
  card(s, 0.6, 3.05, 6.0, 3.7)
  const wk = S.weekly
  s.addChart(pres.charts.BAR, [
    { name: 'Launch', labels: wk.map((w) => w.week), values: wk.map((w) => (w.phase === 'launch' ? w.lebanon : 0)) },
    { name: 'Campaign', labels: wk.map((w) => w.week), values: wk.map((w) => (w.phase === 'campaign' ? w.lebanon : 0)) },
  ], { ...chart, x: 0.75, y: 3.15, w: 5.7, h: 3.5, barDir: 'col', barGrouping: 'stacked', title: 'Sessions from Lebanon per week', chartColors: [HEX.sage, HEX.leaf], dataLabelPosition: 'inEnd', dataLabelColor: HEX.white, dataLabelFormatCode: '0;;;', showLegend: true, legendPos: 'b', legendFontSize: 10, legendColor: HEX.slate, barGapWidthPct: 45 })
  card(s, 6.8, 3.05, 5.9, 3.7)
  const src = ['Instagram + Facebook', 'Google + Bing', 'Direct']
  s.addChart(pres.charts.BAR, [
    { name: 'Launch', labels: src, values: [socB, seaB, perWeek(B.directSessions, B.days)].map((x) => +x.toFixed(1)) },
    { name: 'Campaign', labels: src, values: [socC, seaC, perWeek(K.directSessions, K.days)].map((x) => +x.toFixed(1)) },
  ], { ...chart, x: 6.95, y: 3.15, w: 5.6, h: 3.5, barDir: 'bar', barGrouping: 'clustered', title: `Sessions per week by source · social ${growth(socB, socC)} · search ${growth(seaB, seaC)}`, chartColors: [HEX.sage, HEX.leaf], dataLabelPosition: 'outEnd', dataLabelFormatCode: '0', showLegend: true, legendPos: 'b', legendFontSize: 10, legendColor: HEX.slate, catAxisOrientation: 'maxMin', barGapWidthPct: 35 })

  // ================= 18. ORDERS DASHBOARD =================
  s = slide('DASHBOARD', 'Results', 'RESULTS · ORDERS', `${totalOrders} orders from zero: videos build trust, WhatsApp closes the sale`)
  kpi(s, 0.6, 1.5, 2.9, 1.35, 'Total orders', String(totalOrders), { fill: C.accent2, size: 30, note: 'campaign, from 0' })
  kpi(s, 3.7, 1.5, 2.9, 1.35, 'WhatsApp orders', String(W.orders), { size: 30, note: `in ${W.periodDays} days` })
  kpi(s, 6.8, 1.5, 2.9, 1.35, 'Website orders', String(K.orders), { size: 30, note: `${K.deliveredOrders} delivered · 1 cancelled` })
  kpi(s, 9.9, 1.5, 2.8, 1.35, 'Add-to-cart rate', pct(atcC), { delta: growth(atcB, atcC), note: `from ${pct(atcB)}`, size: 26 })
  card(s, 0.6, 3.05, 4.0, 3.7)
  s.addChart(pres.charts.DOUGHNUT, [{ name: 'Orders', labels: ['WhatsApp', 'Website'], values: [W.orders, K.orders] }], { x: 0.75, y: 3.15, w: 3.7, h: 3.5, holeSize: 62, showTitle: true, title: `Orders by channel · ${pct(waShare, 0)} WhatsApp`, titleFontSize: 12, titleColor: HEX.green, titleFontFace: '+mn-lt', titleAlign: 'left', chartColors: [HEX.leaf, HEX.red], showValue: true, showPercent: false, showLegend: true, legendPos: 'b', legendFontSize: 10, legendFontFace: '+mn-lt', legendColor: HEX.slate, dataLabelColor: HEX.white, dataLabelFontSize: 13, dataLabelFontFace: '+mn-lt' })
  card(s, 4.8, 3.05, 4.0, 3.7)
  s.addChart(pres.charts.BAR, [{ name: 'Funnel', labels: ['Sessions', 'Added to cart', 'Checkout', 'Orders', 'Delivered'], values: [K.sessions, K.cartSessions, K.checkoutSessions, K.orders, K.deliveredOrders] }], { ...chart, x: 4.95, y: 3.15, w: 3.7, h: 3.5, barDir: 'bar', title: 'Website funnel', chartColors: [HEX.leaf], catAxisOrientation: 'maxMin', dataLabelPosition: 'outEnd', barGapWidthPct: 50 })
  card(s, 9.0, 3.05, 3.7, 3.7)
  text(s, 'What drove the orders', { x: 9.25, y: 3.2, w: 3.2, h: 0.35, fontSize: 13, bold: true, color: C.text2 })
  text(s, bullets([`~${perWeek(W.orders, W.periodDays).toFixed(0)} WhatsApp orders / week vs ${perWeek(K.orders, K.days).toFixed(1)} on the website`, 'Largest website order (7 items) came from a ChatGPT referral', `Website baskets ${basketX} our planning assumption`, 'Orders from Beirut, Metn and Bekaa; every web order paid cash on delivery']), { x: 9.25, y: 3.6, w: 3.25, h: 3.0, fontSize: 11, paraSpaceAfter: 8 })

  // ================= 19. SCORECARD =================
  s = slide('CONTENT', 'Results', 'RESULTS · KPI SCORECARD', 'Target vs actual: honest results after four weeks')
  const st2 = (ok, partial) => ({ text: ok ? '● Met' : partial ? '◐ Improved' : '○ Not met', options: { bold: true, color: ok ? HEX.leaf : partial ? HEX.amber : HEX.red } })
  const of = (a, t) => ` (${Math.round((a / t) * 100)}%)`
  s.addTable([
    hdr(['KPI', 'Baseline', 'Target', 'Actual', 'Status']),
    ['Total orders (WhatsApp + website)', '0', '18', String(totalOrders) + of(totalOrders, 18), st2(totalOrders >= 18)],
    ['WhatsApp orders', '0', '8', `${W.orders} in ${W.periodDays} days` + of(W.orders, 8), st2(W.orders >= 8)],
    ['Short videos', '0', '3 Reels', `${VIDEOS} on ${PLATFORMS.length} platforms`, st2(VIDEOS >= 3)],
    ['Social visits / week', socB.toFixed(1), 'grow', `${socC.toFixed(1)} (${growth(socB, socC)})`, st2(true)],
    ['Website orders', '0', '10', `${K.orders} (${K.deliveredOrders} delivered)`, st2(false, true)],
    ['Visits from Lebanon / week', lebB.toFixed(0), '250', `${lebC.toFixed(0)} (${growth(lebB, lebC)})`, st2(false, true)],
    ['Add-to-cart rate', pct(atcB), '4%', `${pct(atcC)} (${growth(atcB, atcC)})`, st2(atcC >= 0.04, atcC > atcB)],
    ['Website conversion rate', '0%', '1%', pct(crC, 2), st2(crC >= 0.01, crC > 0)],
  ], { ...tbl(0.6, 1.55, 8.3, [3.0, 1.15, 1.15, 1.95, 1.05]), rowH: 0.5, fontSize: 11 })
  kpi(s, 9.2, 1.55, 3.5, 1.45, 'KPIs met', '4 of 8', { fill: C.text2, size: 30, note: 'orders, WhatsApp, videos, social' })
  kpi(s, 9.2, 3.15, 3.5, 1.45, 'KPIs improved', '4 of 8', { size: 30, note: 'all website metrics up, below target' })
  card(s, 9.2, 4.75, 3.5, 2.0, C.background2, false)
  text(s, 'Targets were 4-week test targets set before launch. The website converts below target: that is the next thing to fix.', { x: 9.4, y: 4.85, w: 3.1, h: 1.8, fontSize: 12, valign: 'middle' })

  // ================= 20. LEARNINGS & NEXT 90 DAYS =================
  addSection({ title: 'Recommendations' })
  s = slide('CONTENT', 'Recommendations', 'LEARNINGS & RECOMMENDATIONS', 'What we learned, and the next 90 days')
  const lrn = [
    [fa.FaComments, 'Video → WhatsApp → sale', `${pct(waShare, 0)} of orders closed on WhatsApp`],
    [fa.FaSearch, 'Search & AI sell', `search visits ${growth(seaB, seaC)}; top order via ChatGPT`],
    [fa.FaMobileAlt, 'Mobile is the store', `${pct(K.mobileShare, 0)} of visits on phones`],
    [fa.FaShoppingBasket, 'Baskets are big', `${basketX} the planned basket: sell bundles`],
  ]
  for (let i = 0; i < lrn.length; i++) {
    const [ic, h, d] = lrn[i]
    const y = 1.6 + i * 1.3
    card(s, 0.6, y, 4.6, 1.15, C.background2, false)
    await badge(s, ic, 0.8, y + 0.28, 0.6)
    text(s, h, { x: 1.6, y: y + 0.18, w: 3.5, h: 0.4, fontSize: 14, bold: true, color: C.text2 })
    text(s, d, { x: 1.6, y: y + 0.58, w: 3.5, h: 0.45, fontSize: 11, color: C.accent5 })
  }
  const rec = [
    ['December', 'Fix & track', ['Phone-only checkout, untick marketing, rename “<50$”', '“Shop now” hero; real photos of top 20 products', 'UTMs, GA4 + Pixel; confirm big COD orders']],
    ['January', 'Scale what worked', ['3 videos / week on TikTok, Instagram, Facebook', '$200/month ads on the best video + retargeting', 'Bundles: complete bathroom, plumber packs']],
    ['February', 'Own search & proof', ['Descriptive titles and URLs for Google and AI search', 'Google profile posts and 10+ genuine reviews', 'Monthly report: orders by channel, CAC']],
  ]
  rec.forEach(([when, h, items], i) => {
    const x = 5.5 + i * 2.43
    card(s, x, 1.6, 2.3, 5.15, i === 0 ? C.text2 : C.background1)
    const dark = i === 0
    text(s, when.toUpperCase(), { x: x + 0.18, y: 1.78, w: 2.0, h: 0.28, fontSize: 10, bold: true, charSpacing: 1, color: dark ? C.accent4 : C.accent1 })
    text(s, h, { x: x + 0.18, y: 2.08, w: 2.0, h: 0.65, fontSize: 16, bold: true, color: dark ? C.background1 : C.text2 })
    text(s, bullets(items, { color: dark ? C.background1 : C.text1 }), { x: x + 0.18, y: 2.85, w: 2.0, h: 3.8, fontSize: 11, paraSpaceAfter: 10 })
  })

  // ================= 21. CLOSE =================
  s = deckFor('close').addSlide(ONLY ? { masterName: 'BLANK_DARK' } : { masterName: 'BLANK_DARK', sectionTitle: 'Recommendations' })
  card(s, 0.7, 0.7, 1.55, 1.1, C.background1, false)
  await fit(s, A('logo.png'), 0.8, 0.76, 1.35, 0.98, { alt: 'Twainy Plast logo' })
  text(s, 'Thank you', { x: 0.7, y: 2.6, w: 6, h: 1.1, fontSize: 50, bold: true, color: C.background1 })
  text(s, 'Questions & discussion', { x: 0.7, y: 3.7, w: 6, h: 0.6, fontSize: 20, color: C.accent4 })
  text(s, 'twainyplast.com · WhatsApp 76 742 274 · @twainy_plast_', { x: 0.7, y: 6.2, w: 7, h: 0.4, fontSize: 14, color: C.accent4 })
  const cl = [[String(totalOrders), 'orders, from 0'], [growth(lebB, lebC), 'visits from Lebanon / week'], [growth(socB, socC), 'social visits / week'], [String(VIDEOS), `videos on ${PLATFORMS.length} platforms`]]
  cl.forEach(([v, l], i) => kpi(s, 7.6 + (i % 2) * 2.6, 1.6 + Math.floor(i / 2) * 2.25, 2.4, 2.0, l, v, { fill: i === 0 ? C.accent2 : C.accent1, size: 34 }))

  await pres.writeFile({ fileName: OUT })
  if (process.env.APPLY_THEME) await require(process.env.APPLY_THEME).applyTheme(OUT, THEME)
  console.log('wrote', OUT, `(${pres.slides.length} slides)`)
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
