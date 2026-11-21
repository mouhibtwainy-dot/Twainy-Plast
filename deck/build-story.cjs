// Six cinematic "story" slides (dark particle visuals + one strong statement each) for Twainy Plast.
// Visuals come from deck/visuals/render-visuals.mjs. Text stays editable in PowerPoint.
// Usage: NODE_PATH=<deps>/node_modules DECK_DEPS=<deps> [APPLY_THEME=<apply_theme.js>] node deck/build-story.cjs [out.pptx]
const fs = require('fs')
const path = require('path')
const DEPS = process.env.DECK_DEPS
const need = (m) => require(DEPS ? require.resolve(m, { paths: [DEPS] }) : m)
const pptxgen = need('pptxgenjs')

const ROOT = __dirname
const OUT = process.argv[2] || path.join(ROOT, 'Twainy-Plast-Story-Slides.pptx')
const D = JSON.parse(fs.readFileSync(path.join(ROOT, 'results.json'), 'utf8'))
const V = (f) => path.join(ROOT, 'visuals', 'png', f)

const S = D.shopify
const B = S.baseline
const K = S.campaign
const W = D.whatsapp
const perWeek = (n, days) => (n / days) * 7
const growth = (a, b) => '+' + Math.round((b / a - 1) * 100) + '%'
const totalOrders = K.orders + W.orders
const lebG = growth(perWeek(B.lebanonSessions, B.days), perWeek(K.lebanonSessions, K.days))
const socG = growth(perWeek(B.socialSessions, B.days), perWeek(K.instagramSessions + K.facebookSessions, K.days))
const seaG = growth(perWeek(B.searchSessions, B.days), perWeek(K.googleSessions + K.bingSessions, K.days))
const waShare = Math.round((W.orders / totalOrders) * 100) + '%'
const VIDEOS = D.social.videosPublished
const PLATFORMS = (D.social.platforms || []).length

const THEME = { name: 'Twainy Plast', headFontFace: 'Calibri', bodyFontFace: 'Calibri', colors: { dk1: '1A1F1C', lt1: 'FFFFFF', dk2: '1B4D2B', lt2: 'EEF5F0', accent1: '2E7D3A', accent2: 'D63A14', accent3: '8D99AE', accent4: 'A9CDB1', accent5: '5B6770', accent6: 'E8B04B', hlink: '2E7D3A', folHlink: '1B4D2B' } }
const WHITE = 'FFFFFF'
const MINT = '9FD6A9'
const GOLD = 'E8B04B'
const SOFT = 'C9DDCF'

const pres = new pptxgen()
pres.layout = 'LAYOUT_WIDE'
pres.title = 'Twainy Plast: story slides'
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace }
pres.defineSlideMaster({ title: 'STORY', background: { color: '07140C' }, objects: [] })

// a soft dark halo keeps text crisp over the particles
const halo = () => ({ type: 'outer', color: '000000', opacity: 0.85, blur: 10, offset: 0, angle: 0 })
const text = (s, t, o) => s.addText(t, { isTextBox: true, margin: 0, color: WHITE, valign: 'top', shadow: halo(), ...o })
function story(visual, alt) {
  const s = pres.addSlide({ masterName: 'STORY' })
  s.addImage({ path: V(visual), x: 0, y: 0, w: 13.333, h: 7.5, altText: alt })
  // the store's own nav-style header, like the reference sites
  text(s, 'TWAINY PLAST', { x: 0.7, y: 0.45, w: 4, h: 0.3, fontSize: 12, bold: true, charSpacing: 4, color: SOFT })
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 10.95, y: 0.38, w: 1.7, h: 0.42, rectRadius: 0.21, fill: { color: '2E7D3A' }, line: { color: '2E7D3A', width: 0 } })
  text(s, 'twainyplast.com', { x: 10.95, y: 0.38, w: 1.7, h: 0.42, fontSize: 10, bold: true, align: 'center', valign: 'middle' })
  return s
}

// 1 · Opener: sphere on the right, statement on the left
let s = story('sphere.jpg', 'Glowing sphere of green, red and gold particles')
text(s, 'MKT 843 · FINAL CONSULTING PROJECT', { x: 0.7, y: 2.0, w: 6, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: GOLD })
text(s, 'Making the invisible visible.', { x: 0.7, y: 2.4, w: 5.2, h: 2.4, fontSize: 54, bold: true })
text(s, 'How a family plumbing store took its bathroom range online, and turned attention into orders.', { x: 0.7, y: 4.95, w: 4.9, h: 1.0, fontSize: 18, color: SOFT })
s.addNotes('Opener. The sphere stands for the store’s products coming together online.')

// 2 · The problem: scattered particles, centred statement
s = story('scatter.jpg', 'Scattered particles in the dark')
text(s, 'This was the bathroom range in October.', { x: 1.2, y: 2.25, w: 10.9, h: 0.9, fontSize: 36, bold: true, align: 'center' })
text(s, '175 products. Zero social posts. Zero online sales.', { x: 1.2, y: 3.2, w: 10.9, h: 0.9, fontSize: 36, bold: true, align: 'center', color: MINT })
text(s, 'The plumbing brands were known on social media, but homeowners renovating a bathroom had no way to find, compare or order these products online.', { x: 2.2, y: 4.45, w: 8.9, h: 1.1, fontSize: 18, align: 'center', color: SOFT })

// 3 · The solution: water drop on the right
s = story('drop.jpg', 'Water drop made of particles')
text(s, 'THE SOLUTION', { x: 0.7, y: 2.0, w: 6, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: GOLD })
text(s, 'One store. Online. All of Lebanon.', { x: 0.7, y: 2.4, w: 6.0, h: 2.3, fontSize: 50, bold: true })
text(s, 'We built twainyplast.com with Shopify and AI tools: 175 products, cash on delivery, and WhatsApp built in.', { x: 0.7, y: 4.85, w: 5.6, h: 1.0, fontSize: 18, color: SOFT })

// 4 · The campaign: flowing wave, statement on top
s = story('wave.jpg', 'Flowing wave of particles')
text(s, 'THE CAMPAIGN', { x: 0.7, y: 1.15, w: 6, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: GOLD })
text(s, 'Choose with Confidence.', { x: 0.7, y: 1.5, w: 11, h: 1.0, fontSize: 56, bold: true })
text(s, `${VIDEOS} videos · ${PLATFORMS} platforms · 4 weeks · one promise`, { x: 0.7, y: 2.55, w: 11, h: 0.6, fontSize: 24, color: MINT })
text(s, 'Show the real store. Teach how to order. Help people choose. Let them see it live before they buy.', { x: 0.7, y: 3.15, w: 8.5, h: 0.8, fontSize: 17, color: SOFT })

// 5 · Results: particle field, big centred numbers
s = story('field.jpg', 'Soft field of particles')
text(s, 'FOUR WEEKS LATER', { x: 1.2, y: 1.55, w: 10.9, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: GOLD, align: 'center' })
text(s, `${totalOrders} orders from zero.`, { x: 1.2, y: 1.95, w: 10.9, h: 1.2, fontSize: 66, bold: true, align: 'center' })
const res = [[lebG, 'visits from Lebanon / week'], [socG, 'social visits / week'], [seaG, 'search visits / week'], [waShare, 'of orders on WhatsApp']]
res.forEach(([v, l], i) => {
  const x = 1.2 + i * 2.75
  text(s, v, { x, y: 3.65, w: 2.6, h: 0.8, fontSize: 40, bold: true, align: 'center', color: MINT })
  text(s, l, { x, y: 4.45, w: 2.6, h: 0.5, fontSize: 14, align: 'center', color: SOFT })
})
text(s, '87K Instagram views in the last 30 days · 957 followers', { x: 1.2, y: 5.4, w: 10.9, h: 0.4, fontSize: 15, align: 'center', color: SOFT })
s.addNotes('Growth is per week, campaign (Oct 26 – Nov 21) vs launch (Oct 7–21). Instagram figures from the account dashboard on Nov 21, 2026.')

// 6 · Close: sphere on the left, statement on the right
s = story('sphereLeft.jpg', 'Glowing sphere of particles')
text(s, 'WHAT’S NEXT', { x: 7.0, y: 2.0, w: 5.7, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: GOLD })
text(s, 'Where quality flows, now online.', { x: 7.0, y: 2.4, w: 5.8, h: 2.3, fontSize: 52, bold: true })
text(s, 'Fix checkout. Scale video. Own search. Turn every view into a conversation, and every conversation into an order.', { x: 7.0, y: 4.85, w: 5.6, h: 1.2, fontSize: 18, color: SOFT })

;(async () => {
  await pres.writeFile({ fileName: OUT })
  if (process.env.APPLY_THEME) await require(process.env.APPLY_THEME).applyTheme(OUT, THEME)
  console.log('wrote', OUT, `(${pres.slides.length} slides)`)
})()
