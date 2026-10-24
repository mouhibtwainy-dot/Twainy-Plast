// Renders the first 8 Instagram/Facebook posts to PNG.
// Usage: node creative/posts/render-posts.mjs   (needs the `playwright` package and a Chromium build)
import { chromium } from 'playwright'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const out = join(here, 'png')
mkdirSync(out, { recursive: true })

const logo = 'data:image/png;base64,' + readFileSync(join(here, 'assets/logo.png')).toString('base64')
const cdn = (file) => `https://cdn.shopify.com/s/files/1/0649/4679/8676/files/${file}&width=900`

// Products and prices from the Shopify catalogue (checked Oct 24, 2026)
const P = {
  shortNeck: { name: 'Brax Short Neck', price: 25, img: cdn('ChatGPTImageMay6_2026_01_41_32PM.png?v=1778064128') },
  tallNeck: { name: 'Brax Tall Neck', price: 30, img: cdn('ChatGPTImageMay6_2026_01_58_31PM.png?v=1778065160') },
  kore: { name: 'Brax Kore 25 cm', price: 65, img: cdn('Brax_Kore_1100.png?v=1777892464') },
  round: { name: '60×60 Round LED Mirror', price: 40, img: cdn('ChatGPTImageApr11_2026_12_31_58PM.png?v=1775899954') },
  rect: { name: '70×50 LED Mirror', price: 45, img: cdn('ChatGPTImageApr11_2026_12_12_45PM.png?v=1775898997') },
  wave: { name: '120×60 Wave LED Mirror', price: 60, img: cdn('ChatGPTImageApr11_2026_12_44_16PM_1d7cb501-656a-45d5-baee-e361c4f3ce4a.png?v=1775900849') },
  wc: { name: 'WCs', img: cdn('2_b3aa33be-2773-448e-9f3f-574635270a31.png?v=1777719849') },
  basin: { name: 'Basins', img: cdn('ChatGPT_Image_May_2_2026_12_09_47_PM.png?v=1777713028') },
  pump: { name: 'Water pumps', img: cdn('ChatGPTImageFeb22_2026_01_02_12AM_9f0c03dd-fde7-405a-ba92-0ef7534f527c.png?v=1771889784') },
  shower: { name: 'Hand showers', img: cdn('ChatGPTImageMay18_2026_11_51_03AM.png?v=1779094439') },
}

const WA = '76 742 274'
const HANDLE = '@twainy_plast_'

const css = `
:root{--g:#1b4d2b;--leaf:#2e7d3a;--mist:#eef5f0;--red:#d63a14;--ink:#1a1f1c;--grey:#5b6770;--line:#cfe0d4}
*{box-sizing:border-box;margin:0;padding:0}
body{width:var(--w);height:var(--h);overflow:hidden;font-family:Cairo,sans-serif;color:var(--ink);background:#fff}
.post{position:relative;width:var(--w);height:var(--h);padding:72px;display:flex;flex-direction:column}
.dark{background:var(--g);color:#fff}
.mist{background:var(--mist)}
.top{display:flex;justify-content:space-between;align-items:center;height:96px}
.logo{background:#fff;border-radius:22px;padding:10px 16px;display:flex;align-items:center;gap:12px;box-shadow:0 6px 18px #0000001a}
.logo img{height:64px}
.logo span{font-weight:800;font-size:26px;color:var(--g);line-height:1}
.page{font-size:26px;font-weight:700;color:var(--grey)}
.dark .page{color:#a9cdb1}
.ar{direction:rtl;text-align:right;font-weight:800}
h1{font-size:96px;line-height:1.12;font-weight:900;color:var(--g)}
.dark h1{color:#fff}
h2{font-size:64px;line-height:1.15;font-weight:800;color:var(--g)}
.dark h2{color:#fff}
.en{font-size:40px;font-weight:600;color:var(--leaf);line-height:1.25}
.dark .en{color:#a9cdb1}
p.body{font-size:36px;line-height:1.4;color:var(--ink)}
.dark p.body{color:#e3efe6}
.pill{display:inline-flex;align-items:center;gap:10px;background:var(--red);color:#fff;font-weight:800;font-size:44px;border-radius:999px;padding:6px 30px}
.pill.small{font-size:32px;padding:4px 22px}
.chip{display:inline-block;background:#fff;color:var(--g);border:3px solid var(--line);font-weight:700;font-size:28px;border-radius:999px;padding:4px 22px}
.foot{position:absolute;left:72px;right:72px;bottom:56px;display:flex;justify-content:space-between;align-items:center;font-size:28px;font-weight:700;color:var(--g)}
.dark .foot{color:#cfe5d4}
.foot .wa{display:flex;align-items:center;gap:10px}
.foot svg{width:34px;height:34px}
.swipe{position:absolute;right:72px;bottom:118px;font-size:30px;font-weight:800;color:var(--red)}
.card{background:#fff;border-radius:36px;box-shadow:0 10px 30px #1b4d2b1f;overflow:hidden;display:flex;flex-direction:column}
.card img{width:100%;object-fit:contain;background:#fff}
.tag{position:absolute;font-size:20px;color:var(--grey);font-weight:600}
.dark .tag{color:#a9cdb1}
.num{width:92px;height:92px;border-radius:50%;background:var(--g);color:#fff;font-size:54px;font-weight:900;display:grid;place-items:center;flex-shrink:0}
.row{display:flex;gap:36px;align-items:center}
.drop{width:120px;height:120px}
`

const waIcon = `<svg viewBox="0 0 24 24" fill="#25D366"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>`

const top = (page) => `<div class="top"><div class="logo"><img src="${logo}" alt=""><span>Twainy Plast<br><small style="font-size:20px;font-weight:600;color:#5b6770">تويني بلاست</small></span></div>${page ? `<span class="page">${page}</span>` : ''}</div>`
const foot = (extra = '') => `<div class="foot"><span>twainyplast.com</span>${extra}<span class="wa">${waIcon}${WA}</span></div>`
const illustrative = (pos = 'left:72px;bottom:112px') => `<span class="tag" style="${pos}">صورة توضيحية · Illustrative product image</span>`

// Each slide: [fileName, width, height, html]
const S = []
const add = (name, w, h, html) => S.push({ name, w, h, html })

// ---------- 1. Reel 1 cover (9:16, key content inside the 3:4 grid crop) ----------
add('01-reel1-cover', 1080, 1920, `
<div class="post dark" style="justify-content:center;padding:240px 72px">
  <div style="position:absolute;top:96px;left:72px">${top('')}</div>
  <div style="align-self:flex-end;background:#fff;border-radius:50%;width:260px;height:260px;display:grid;place-items:center;margin-bottom:50px;box-shadow:0 10px 40px #0000004d"><img src="${logo}" style="width:170px" alt=""></div>
  <h1 class="ar" style="font-size:130px">تعرّفوا علينا</h1>
  <p class="en" style="font-size:58px;margin-top:10px">Meet Twainy Plast</p>
  <div style="height:6px;width:180px;background:var(--red);border-radius:6px;margin:56px 0 56px auto"></div>
  <p class="body ar" style="font-size:46px;font-weight:600">محل عائلي بقصرنبا… وهلّق صرنا أونلاين</p>
  <p class="body" style="font-size:38px;margin-top:14px">A family store in Qsarnaba, now online. Ask us before you order.</p>
  <div style="position:absolute;bottom:300px;left:72px;right:72px;display:flex;justify-content:space-between;font-size:34px;font-weight:700;color:#cfe5d4"><span>twainyplast.com</span><span>${HANDLE}</span></div>
</div>`)

// ---------- 2. How to order (carousel, 5 slides) ----------
add('02-how-to-order-1', 1080, 1350, `
<div class="post mist">${top('1/5')}
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center">
    <h1 class="ar">كيف بتطلب؟</h1>
    <p class="en" style="font-size:56px">How to order: 3 easy ways</p>
    <div class="row" style="margin-top:70px;gap:28px">
      ${['🛒 Online', '💬 WhatsApp', '📍 In store'].map((t) => `<span class="chip" style="font-size:34px;padding:10px 30px">${t}</span>`).join('')}
    </div>
  </div>
  <span class="swipe">اسحب ← Swipe</span>${foot()}</div>`)
const waySlide = (n, page, ar, en, big, body, bodyEn, extra = '') => `
<div class="post">${top(page)}
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:34px">
    <div class="row"><div class="num">${n}</div><div><h2 class="ar" style="text-align:left;direction:rtl">${ar}</h2><p class="en">${en}</p></div></div>
    <div style="background:var(--mist);border-radius:36px;padding:48px 52px">
      <p style="font-size:68px;font-weight:900;color:var(--g);line-height:1.1">${big}</p>
      <p class="body ar" style="margin-top:26px;font-weight:600">${body}</p>
      <p class="body" style="margin-top:10px;color:var(--grey)">${bodyEn}</p>
    </div>
    ${extra}
  </div>
  <span class="swipe">←</span>${foot()}</div>`
add('02-how-to-order-2', 1080, 1350, waySlide(1, '2/5', 'أونلاين', 'Order online', 'twainyplast.com', 'اختار القطعة، زيدها عالسلة، واطلب بدقيقة.', 'Pick your product, add it to the cart and check out in a minute.', `<div style="display:flex;gap:20px;align-items:center">${['اختار · Pick', 'زيد عالسلة · Add to cart', 'اطلب · Order'].map((t, i) => `<span class="chip" style="font-size:28px;${i === 2 ? 'background:var(--red);color:#fff;border-color:var(--red)' : ''}">${t}</span>${i < 2 ? '<b style="font-size:36px;color:var(--leaf)">→</b>' : ''}`).join('')}</div>`))
add('02-how-to-order-3', 1080, 1350, waySlide(2, '3/5', 'عالواتساب', 'Order on WhatsApp', `<span style="display:inline-flex;align-items:center;gap:18px">${waIcon.replace('<svg', '<svg style="width:70px;height:70px"')}${WA}</span>`, 'ابعتلنا صورة أو اسم القطعة، ومنردّ عليك بالسعر والتوفّر.', 'Send a photo or the product name. We reply with the price and availability.', `<div style="background:#e5ddd5;border-radius:36px;padding:30px;display:flex;flex-direction:column;gap:16px"><div class="ar" style="align-self:flex-end;background:#dcf8c6;border-radius:22px;padding:14px 24px;font-size:30px;font-weight:600">مرحبا، عندكن خلاط مطبخ؟</div><div class="ar" style="align-self:flex-start;background:#fff;border-radius:22px;padding:14px 24px;font-size:30px;font-weight:600">أكيد! Brax Tall Neck بـ <bdi>$30</bdi>، متوفّر 👍</div></div>`))
add('02-how-to-order-4', 1080, 1350, waySlide(3, '4/5', 'زورنا بالمحل', 'Visit the store', 'Qsarnaba · قصرنبا', 'شوف القطعة بعينك قبل ما تشتري، ونحنا منساعدك تختار.', 'See the product before you buy. We help you choose.', `<div style="display:flex;align-items:center;gap:30px;background:var(--g);border-radius:36px;padding:30px 44px;color:#fff"><svg viewBox="0 0 24 24" style="width:90px;height:90px" fill="#d63a14"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg><div><b style="font-size:44px">Twainy Plast Sanitary</b><p style="font-size:30px;color:#cfe5d4">Qsarnaba, Lebanon · Google Maps</p></div></div>`))
add('02-how-to-order-5', 1080, 1350, `
<div class="post dark">${top('5/5')}
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:30px">
    <h2 class="ar">التوصيل والدفع</h2><p class="en" style="margin-top:-18px">Delivery & payment</p>
    ${[
      ['🚚', 'توصيل لكل لبنان', 'Delivery all over Lebanon'],
      ['🎁', 'مجاني للطلبات فوق <bdi>$30</bdi>، و<bdi>$3</bdi> للأصغر', 'Free on orders over $30 · $3 up to $30'],
      ['💵', 'الدفع عند الاستلام', 'Cash on delivery'],
      ['📦', 'قطع كبيرة؟ منأكّدلك كلفة التوصيل', 'Large items: we confirm the delivery cost first'],
    ].map(([i, a, e]) => `<div style="display:flex;gap:28px;align-items:center;background:#ffffff14;border-radius:28px;padding:24px 32px"><span style="font-size:54px">${i}</span><div style="flex:1"><p class="ar" style="font-size:38px;color:#fff">${a}</p><p style="font-size:30px;color:#a9cdb1;text-align:right">${e}</p></div></div>`).join('')}
  </div>${foot()}</div>`)

// ---------- 3. Everything for your bathroom (single) ----------
const cats = [
  ['خلاطات', 'Mixers', P.shortNeck.img],
  ['مرايات', 'LED mirrors', P.round.img],
  ['مراحيض', 'WCs', P.wc.img],
  ['مغاسل', 'Basins', P.basin.img],
  ['مضخّات', 'Pumps', P.pump.img],
  ['دوشات', 'Showers', P.shower.img],
]
add('03-everything-for-your-bathroom', 1080, 1350, `
<div class="post mist">${top('')}
  <h2 class="ar" style="margin-top:28px">كل شي للحمّام… بمحل واحد</h2>
  <p class="en" style="text-align:right">Everything for your bathroom, under one roof</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:40px">
    ${cats.map(([a, e, img]) => `<div class="card" style="height:330px"><img src="${img}" style="height:262px;padding:14px" alt=""><div style="padding:0 18px 12px;display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font-size:27px;color:var(--g);white-space:nowrap">${e}</b><span class="ar" style="font-size:25px;color:var(--leaf);white-space:nowrap">${a}</span></div></div>`).join('')}
  </div>
  <div style="margin-top:38px;display:flex;justify-content:space-between;align-items:center"><span class="pill small">175+ products</span><span style="font-size:30px;font-weight:700;color:var(--g)">Prices on twainyplast.com</span></div>
  ${illustrative('left:72px;bottom:112px')}${foot()}</div>`)

// ---------- 4. Reel 2 cover ----------
add('04-reel2-cover', 1080, 1920, `
<div class="post" style="background:#fff;padding:240px 72px;justify-content:center">
  <div style="position:absolute;top:96px;left:72px">${top('')}</div>
  <span class="chip" style="align-self:flex-end">▶ Reel · اختار صح</span>
  <div style="display:flex;align-items:center;gap:30px;margin-top:40px">
    <img src="${P.kore.img}" style="width:420px;height:560px;object-fit:contain" alt="">
    <div style="flex:1">
      <p style="font-size:220px;font-weight:900;color:var(--red);line-height:.9;text-align:right">٣</p>
      <h2 class="ar" style="font-size:72px">شغلات لازم تعرفها قبل ما تشتري خلاط</h2>
    </div>
  </div>
  <p class="en" style="font-size:52px;margin-top:40px">3 things to check before buying a mixer</p>
  <div style="position:absolute;bottom:300px;left:72px;right:72px;display:flex;justify-content:space-between;font-size:30px;font-weight:700;color:var(--grey)"><span>صورة توضيحية · Illustrative</span><span>${HANDLE}</span></div>
</div>`)

// ---------- 5. Short vs Tall neck (carousel, 5 slides) ----------
add('05-short-vs-tall-1', 1080, 1350, `
<div class="post dark">${top('1/5')}
  <h1 class="ar" style="margin-top:20px">قصير ولا طويل؟</h1>
  <p class="en" style="text-align:right;font-size:46px">Short neck or tall neck?</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:44px;flex:1;margin-bottom:150px">
    ${[P.shortNeck, P.tallNeck].map((p) => `<div class="card" style="position:relative"><img src="${p.img}" style="flex:1;min-height:0;padding:24px" alt=""><div style="padding:0 28px 26px;display:flex;justify-content:space-between;align-items:center"><b style="font-size:34px;color:var(--g)">${p.name.replace('Brax ', '')}</b><span class="pill small">$${p.price}</span></div></div>`).join('')}
  </div>
  <span class="swipe" style="color:#fff">اسحب ← Swipe</span>${illustrative('left:72px;bottom:112px')}${foot()}</div>`)
const productSlide = (page, p, ar, en, body, bodyEn) => `
<div class="post">${top(page)}
  <div class="card" style="margin-top:30px;height:640px"><img src="${p.img}" style="height:640px;padding:40px" alt=""></div>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:36px"><span class="pill">$${p.price}</span><h2 class="ar" style="font-size:58px">${ar}</h2></div>
  <p class="en" style="text-align:right">${en}</p>
  <p class="body ar" style="margin-top:18px;font-weight:600">${body}</p>
  <p class="body" style="color:var(--grey);font-size:32px">${bodyEn}</p>
  ${illustrative('left:72px;bottom:112px')}<span class="swipe">←</span>${foot()}</div>`
add('05-short-vs-tall-2', 1080, 1350, productSlide('2/5', P.shortNeck, 'الرقبة القصيرة', 'Brax Short Neck', 'للمغسلة العادية بالحمّام.', 'For a standard bathroom basin.'))
add('05-short-vs-tall-3', 1080, 1350, productSlide('3/5', P.tallNeck, 'الرقبة الطويلة', 'Brax Tall Neck', 'لمجلى المطبخ والأحواض العميقة.', 'For kitchen sinks and deep basins.'))
add('05-short-vs-tall-4', 1080, 1350, productSlide('4/5', P.kore, 'مغسلة فوق الرخامة؟', 'Vessel basin? Brax Kore 25 cm', 'خلاط عالي بيد وحدة، بيوصل فوق المغسلة.', 'A tall single-lever mixer that reaches over a countertop basin.'))
add('05-short-vs-tall-5', 1080, 1350, `
<div class="post mist">${top('5/5')}
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:28px">
    <h1 class="ar">مش متأكد؟</h1>
    <p class="en" style="text-align:right;font-size:52px">Not sure which one fits?</p>
    <p class="body ar" style="font-size:44px;font-weight:600;margin-top:20px">صوّر المغسلة وابعتلنا ياها عالواتساب، ومنقلّك شو بيركب.</p>
    <p class="body" style="color:var(--grey)">Send us a photo of your sink on WhatsApp and we’ll tell you what fits.</p>
    <div style="display:flex;align-items:center;gap:22px;background:#fff;border-radius:999px;padding:18px 40px;align-self:flex-start;margin-top:30px;box-shadow:0 10px 30px #1b4d2b1f">${waIcon.replace('<svg', '<svg style="width:70px;height:70px"')}<b style="font-size:58px;color:var(--g)">${WA}</b></div>
  </div>${foot()}</div>`)

// ---------- 6. LED mirror size guide (carousel, 4 slides) ----------
// 1 cm = 4.2 px so the three mirrors are drawn to true relative scale
const s = 4.2
const mirror = (w, h, r, label) => `<div style="width:${w * s}px;height:${h * s}px;border-radius:${r};border:8px solid #fff;box-shadow:0 0 40px #bfe9c9, inset 0 0 26px #bfe9c9;display:grid;place-items:center;text-align:center;color:#fff;font-weight:800;font-size:34px;line-height:1.2">${label}</div>`
add('06-mirror-guide-1', 1080, 1350, `
<div class="post dark">${top('1/4')}
  <h1 class="ar" style="font-size:86px;margin-top:20px">أي مراية بتناسب حمّامك؟</h1>
  <p class="en" style="text-align:right;font-size:46px">Which LED mirror fits your bathroom?</p>
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px;padding-bottom:120px">
    <div style="display:flex;align-items:flex-end;gap:50px">${mirror(60, 60, '50%', '60×60')}${mirror(50, 70, '18px', '70×50')}</div>
    ${mirror(120, 60, '60px 16px 60px 16px', '120×60')}
  </div>
  <p style="position:absolute;left:72px;bottom:118px;font-size:26px;color:#a9cdb1">Drawn to scale · مرسومة عالقياس</p>
  <span class="swipe" style="color:#fff">←</span>${foot()}</div>`)
add('06-mirror-guide-2', 1080, 1350, `
<div class="post mist">${top('2/4')}
  <h2 class="ar" style="margin-top:30px">قاعدة بسيطة</h2><p class="en" style="text-align:right">One simple rule</p>
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0">
    <div style="width:420px;height:300px;border-radius:24px;border:8px solid var(--leaf);background:#fff;box-shadow:0 0 30px #a9cdb1"></div>
    <div style="width:3px;height:70px;background:var(--grey)"></div>
    <div style="width:520px;height:120px;border-radius:20px 20px 60px 60px;background:#fff;border:6px solid var(--line);display:grid;place-items:center;font-size:30px;font-weight:700;color:var(--grey)">المغسلة · Basin</div>
    <div style="width:520px;margin-top:18px;height:4px;background:var(--red);position:relative"><span style="position:absolute;left:-4px;top:-14px;width:4px;height:32px;background:var(--red)"></span><span style="position:absolute;right:-4px;top:-14px;width:4px;height:32px;background:var(--red)"></span></div>
    <p class="ar" style="margin-top:22px;font-size:32px;color:var(--red);text-align:center">نفس العرض أو أصغر شوي</p><p style="font-size:28px;font-weight:700;color:var(--red)">same width or a bit narrower</p>
  </div>
  <p class="body ar" style="font-weight:600">اختار مراية بعرض المغسلة أو أصغر شوي، وعلّقها على مستوى النظر.</p>
  <p class="body" style="color:var(--grey);font-size:32px;margin-bottom:110px">Pick a mirror about as wide as your basin, or a little narrower, and hang it at eye level.</p>
  <span class="swipe">←</span>${foot()}</div>`)
add('06-mirror-guide-3', 1080, 1350, `
<div class="post">${top('3/4')}
  <h2 class="ar" style="margin-top:20px">٣ قياسات · ٣ ألوان إضاءة</h2><p class="en" style="text-align:right">3 sizes · 3 light colours each</p>
  <div style="display:flex;flex-direction:column;gap:24px;margin-top:34px">
    ${[[P.round, '60×60 Round', 'مدوّرة'], [P.rect, '70×50 Rectangle', 'مستطيلة'], [P.wave, '120×60 Wave', 'موجة · عريضة']].map(([p, n, a]) => `<div class="card" style="flex-direction:row;align-items:center;height:250px"><img src="${p.img}" style="width:300px;height:250px;padding:16px" alt=""><div style="flex:1;padding:0 30px"><b style="font-size:42px;color:var(--g);white-space:nowrap">${n}</b><p class="ar" style="font-size:30px;color:var(--leaf);text-align:left">${a}</p><p style="font-size:26px;color:var(--grey)">LED · 3 light colours</p></div><span class="pill" style="margin-right:36px">$${p.price}</span></div>`).join('')}
  </div>
  ${illustrative('left:72px;bottom:112px')}<span class="swipe">←</span>${foot()}</div>`)
add('06-mirror-guide-4', 1080, 1350, `
<div class="post dark">${top('4/4')}
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:28px">
    <h1 class="ar" style="font-size:88px">احفظ البوست لوقت الترميم 📌</h1>
    <p class="en" style="text-align:right;font-size:46px">Save this for your renovation</p>
    <p class="body ar" style="margin-top:30px;font-weight:600">كل المرايات وأسعارها عالموقع، أو اسألنا عالواتساب.</p>
    <p class="body" style="color:#a9cdb1">All mirrors and prices are at twainyplast.com, or ask us on WhatsApp.</p>
    <span class="pill" style="align-self:flex-end;margin-top:30px">twainyplast.com</span>
  </div>${foot()}</div>`)

// ---------- 7. Free delivery (single, standing policy, no deadline) ----------
add('07-free-delivery', 1080, 1350, `
<div class="post" style="background:linear-gradient(160deg,#eef5f0,#cfe8d5)">${top('')}
  <span class="chip" style="align-self:flex-end;margin-top:30px">اختار بثقة · Choose with Confidence</span>
  <h1 class="ar" style="font-size:112px;margin-top:24px">توصيل مجاني</h1>
  <p class="ar" style="font-size:52px;color:var(--leaf)">لكل لبنان، للطلبات فوق <bdi>$30</bdi></p>
  <p class="en" style="text-align:right;margin-top:6px">Free delivery all over Lebanon on orders over $30</p>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:22px;margin-top:46px">
    ${[P.kore, P.wave, P.rect].map((p) => `<div class="card" style="height:330px"><img src="${p.img}" style="height:250px;padding:14px" alt=""><div style="padding:0 16px 14px;display:flex;justify-content:space-between;align-items:center"><b style="font-size:24px;color:var(--g)">${p.name.replace(' LED Mirror', '')}</b><span class="pill small" style="font-size:26px">$${p.price}</span></div></div>`).join('')}
  </div>
  <div style="display:flex;gap:20px;margin-top:36px;justify-content:flex-end"><span class="chip">💵 الدفع عند الاستلام · Cash on delivery</span></div>
  <p style="font-size:24px;color:var(--grey);margin-top:20px;text-align:right">Orders up to $30: $3 delivery. Large items: delivery cost confirmed before dispatch.</p>
  ${illustrative('left:72px;bottom:112px')}${foot()}</div>`)

// ---------- 8. Reel 3 cover ----------
add('08-reel3-cover', 1080, 1920, `
<div class="post dark" style="padding:240px 72px;justify-content:center">
  <div style="position:absolute;top:96px;left:72px">${top('')}</div>
  <span class="chip" style="align-self:flex-end">▶ Reel · اطلب بسهولة</span>
  <div class="card" style="margin-top:40px;height:520px"><img src="${P.wave.img}" style="height:520px;padding:30px" alt=""></div>
  <h1 class="ar" style="font-size:104px;margin-top:50px">من الكبسة لباب البيت</h1>
  <p class="en" style="font-size:54px">From click to your door 🚚</p>
  <div style="position:absolute;bottom:300px;left:72px;right:72px;display:flex;justify-content:space-between;font-size:30px;font-weight:700;color:#a9cdb1"><span>صورة توضيحية · Illustrative</span><span>${HANDLE}</span></div>
</div>`)

const page = (w, h, body) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>:root{--w:${w}px;--h:${h}px}${css}</style></head><body>${body}</body></html>`

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {})
const ctx = await browser.newContext({ deviceScaleFactor: 1 })
for (const sl of S) {
  const tab = await ctx.newPage()
  await tab.setViewportSize({ width: sl.w, height: sl.h })
  await tab.setContent(page(sl.w, sl.h, sl.html), { waitUntil: 'networkidle' })
  await tab.evaluate(() => document.fonts.ready)
  await tab.screenshot({ path: join(out, `${sl.name}.png`) })
  if (process.env.DUMP_HTML) writeFileSync(join(out, `${sl.name}.html`), page(sl.w, sl.h, sl.html))
  await tab.close()
  console.log('rendered', sl.name)
}
await browser.close()
