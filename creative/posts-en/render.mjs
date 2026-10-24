// Renders the 5 English "inform, teach, act" posts and the 3 Reel storyboards to PNG.
// Usage: node creative/posts-en/render.mjs   (needs `playwright`; set CHROMIUM=/path/to/chromium to use a local build)
import { chromium } from 'playwright'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const out = join(here, 'png')
mkdirSync(out, { recursive: true })

const asset = (f, type) => `data:image/${type};base64,` + readFileSync(join(here, 'assets', f)).toString('base64')
const logo = asset('logo.png', 'png')
// Real twainyplast.com screens, captured on a phone viewport on Oct 24, 2026
const shot = {
  home: asset('site-mobile.jpg', 'jpeg'),
  product: asset('product-top.jpg', 'jpeg'),
  buy: asset('product-buy.jpg', 'jpeg'),
  checkout: asset('checkout-1.jpg', 'jpeg'),
  pay: asset('checkout-pay.jpg', 'jpeg'),
}
const cdn = (file) => `https://cdn.shopify.com/s/files/1/0649/4679/8676/files/${file}&width=900`
const img = {
  tallNeck: cdn('ChatGPTImageMay6_2026_01_58_31PM.png?v=1778065160'),
  shortNeck: cdn('ChatGPTImageMay6_2026_01_41_32PM.png?v=1778064128'),
  kore: cdn('Brax_Kore_1100.png?v=1777892464'),
  round: cdn('ChatGPTImageApr11_2026_12_31_58PM.png?v=1775899954'),
  wave: cdn('ChatGPTImageApr11_2026_12_44_16PM_1d7cb501-656a-45d5-baee-e361c4f3ce4a.png?v=1775900849'),
}

const WA = '76 742 274'
const HANDLE = '@twainy_plast_'

const css = `
:root{--g:#1b4d2b;--leaf:#2e7d3a;--mist:#eef5f0;--red:#d63a14;--ink:#1a1f1c;--grey:#5b6770;--line:#cfe0d4;--sage:#a9cdb1}
*{box-sizing:border-box;margin:0;padding:0}
body{width:var(--w);height:var(--h);overflow:hidden;font-family:Cairo,sans-serif;color:var(--ink);background:#fff}
.post{position:relative;width:var(--w);height:var(--h);padding:72px;display:flex;flex-direction:column}
.dark{background:var(--g);color:#fff}
.mist{background:var(--mist)}
.top{display:flex;justify-content:space-between;align-items:center;height:96px}
.logo{background:#fff;border-radius:22px;padding:10px 18px;display:flex;align-items:center;gap:12px;box-shadow:0 6px 18px #0000001a}
.logo img{height:64px}
.logo span{font-weight:800;font-size:26px;color:var(--g);line-height:1.05}
.page{font-size:26px;font-weight:700;color:var(--grey)}
.dark .page{color:var(--sage)}
.kicker{font-size:28px;font-weight:800;letter-spacing:4px;color:var(--red);text-transform:uppercase}
.dark .kicker{color:#ff8a6a}
h1{font-size:92px;line-height:1.02;font-weight:900;color:var(--g);letter-spacing:-1px}
.dark h1{color:#fff}
h2{font-size:64px;line-height:1.08;font-weight:900;color:var(--g)}
.dark h2{color:#fff}
.lead{font-size:38px;line-height:1.35;font-weight:600;color:var(--ink)}
.dark .lead{color:#e3efe6}
.muted{color:var(--grey)}
.dark .muted{color:var(--sage)}
.pill{display:inline-flex;align-items:center;gap:12px;background:var(--red);color:#fff;font-weight:800;font-size:40px;border-radius:999px;padding:12px 38px}
.pill.ghost{background:#fff;color:var(--g);box-shadow:0 8px 24px #1b4d2b26}
.chip{display:inline-flex;align-items:center;gap:10px;background:#fff;color:var(--g);border:3px solid var(--line);font-weight:700;font-size:28px;border-radius:999px;padding:6px 24px}
.foot{position:absolute;left:72px;right:72px;bottom:52px;display:flex;justify-content:space-between;align-items:center;font-size:28px;font-weight:700;color:var(--g)}
.dark .foot{color:#cfe5d4}
.foot .wa{display:flex;align-items:center;gap:10px}
.foot svg{width:34px;height:34px}
.swipe{position:absolute;right:72px;bottom:112px;font-size:30px;font-weight:800;color:var(--red)}
.dark .swipe{color:#fff}
.tag{position:absolute;left:72px;bottom:112px;font-size:20px;color:var(--grey);font-weight:600}
.dark .tag{color:var(--sage)}
.card{background:#fff;border-radius:32px;box-shadow:0 10px 30px #1b4d2b1f}
.num{width:96px;height:96px;border-radius:50%;background:var(--red);color:#fff;font-size:56px;font-weight:900;display:grid;place-items:center;flex-shrink:0}
.phone{background:#111;border-radius:64px;padding:16px;box-shadow:0 30px 70px #0000004d;position:relative;flex-shrink:0}
.phone .screen{border-radius:50px;overflow:hidden;background:#fff;padding-top:44px;position:relative}
.phone .screen img.shot{display:block;width:100%}
.phone:before{content:'';position:absolute;top:32px;left:50%;transform:translateX(-50%);width:110px;height:26px;background:#111;border-radius:20px;z-index:3}
.tap{position:absolute;width:150px;height:80px;border-radius:40px;border:6px solid var(--red);box-shadow:0 0 0 8px #d63a1440;z-index:4}
.perk{display:flex;align-items:center;gap:22px;background:#fff;border-radius:26px;padding:16px 26px;box-shadow:0 8px 24px #1b4d2b1a}
.perk .ic{font-size:46px;width:60px;text-align:center}
.perk b{display:block;font-size:32px;color:var(--g);line-height:1.15}
.perk small{display:block;font-size:24px;color:var(--grey);font-weight:600;line-height:1.3}
.chat{background:#efe7dd;border-radius:36px;overflow:hidden;box-shadow:0 14px 40px #00000026}
.chat .head{background:#075e54;color:#fff;display:flex;align-items:center;gap:18px;padding:20px 28px}
.chat .head .av{width:62px;height:62px;border-radius:50%;background:#fff;display:grid;place-items:center}
.chat .head .av img{height:40px}
.chat .head b{font-size:30px;display:block;line-height:1.1}
.chat .head small{font-size:22px;color:#cfe9e4}
.chat .body{padding:26px;display:flex;flex-direction:column;gap:16px}
.b{max-width:78%;border-radius:22px;padding:14px 22px;font-size:29px;line-height:1.3;font-weight:600;box-shadow:0 2px 4px #0000001a}
.b.me{align-self:flex-end;background:#dcf8c6}
.b.them{align-self:flex-start;background:#fff}
.b small{display:block;text-align:right;font-size:18px;color:#7b8a83;font-weight:600;margin-top:4px}
.b img{display:block;width:100%;border-radius:14px;background:#fff;margin-bottom:8px}
`

const waIcon = `<svg viewBox="0 0 24 24" fill="#25D366"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>`
const wa = (px) => waIcon.replace('<svg', `<svg style="width:${px}px;height:${px}px;flex-shrink:0"`)

const top = (page) => `<div class="top"><div class="logo"><img src="${logo}" alt=""><span>Twainy Plast<br><small style="font-size:20px;font-weight:600;color:#5b6770">Sanitary · Qsarnaba</small></span></div>${page ? `<span class="page">${page}</span>` : ''}</div>`
const foot = () => `<div class="foot"><span>twainyplast.com</span><span class="wa">${waIcon}${WA}</span></div>`
const phone = (src, w, h, extra = '') => `<div class="phone" style="width:${w}px"><div class="screen" style="height:${h}px"><img class="shot" src="${src}" alt="">${extra}</div></div>`
const perk = (ic, t, s) => `<div class="perk"><span class="ic">${ic}</span><div><b>${t}</b>${s ? `<small>${s}</small>` : ''}</div></div>`
const chat = (bubbles) => `<div class="chat"><div class="head"><div class="av"><img src="${logo}" alt=""></div><div><b>Twainy Plast</b><small>Business account · usually replies fast</small></div></div><div class="body">${bubbles}</div></div>`

const S = []
const add = (name, w, h, html) => S.push({ name, w, h, html })

// ===== POST 1 · We're online (single) =====
add('p1-we-are-online', 1080, 1350, `
<div class="post mist">${top('')}
  <div style="display:flex;gap:40px;margin-top:40px">
    <div style="flex:1">
      <p class="kicker">Now online</p>
      <h1 style="margin-top:12px;font-size:74px">Your bathroom store, now at your door.</h1>
      <p class="lead" style="margin-top:26px">Order everything for your bathroom from home. We deliver all over Lebanon.</p>
    </div>
    ${phone(shot.home, 310, 560)}
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:28px">
    ${perk('🛁', '175+ products', 'Mixers, mirrors, WCs, basins, pumps')}
    ${perk('🚚', 'All over Lebanon', 'Delivered to your door')}
    ${perk('🎁', 'Free delivery', 'On orders over $30')}
    ${perk('💵', 'Cash on delivery', 'Pay when it arrives')}
  </div>
  <div style="margin-top:26px;display:flex;align-items:center;gap:24px"><span class="pill">Shop now → twainyplast.com</span></div>
  ${foot()}</div>`)

// ===== POST 2 · How to order (carousel, 6 slides) =====
add('p2-how-to-order-1', 1080, 1350, `
<div class="post dark">${top('1/6')}
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center">
    <p class="kicker">Step by step</p>
    <h1 style="font-size:116px;margin-top:16px">How to order in 4 easy steps</h1>
    <p class="lead" style="margin-top:30px">From your phone, in about 2 minutes. No card needed.</p>
    <div style="display:flex;gap:18px;margin-top:50px">${['1 Choose', '2 Add', '3 Details', '4 Pay on delivery'].map((t, i) => `<span class="chip" style="${i === 3 ? 'background:var(--red);color:#fff;border-color:var(--red)' : ''}">${t}</span>`).join('')}</div>
  </div>
  <span class="swipe">Swipe →</span>${foot()}</div>`)
const stepSlide = (page, n, title, text, src, tap, note = '') => `
<div class="post">${top(page)}
  <div style="display:flex;gap:46px;flex:1;margin-top:34px;margin-bottom:120px">
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:30px">
      <div class="num">${n}</div>
      <h2>${title}</h2>
      <p class="lead">${text}</p>
      ${note ? `<p style="font-size:28px;font-weight:700;color:var(--leaf)">${note}</p>` : ''}
    </div>
    ${phone(src, 420, 900, tap ? `<div class="tap" style="${tap}"></div>` : '')}
  </div>
  <span class="tag">Real screens from twainyplast.com</span><span class="swipe">→</span>${foot()}</div>`
add('p2-how-to-order-2', 1080, 1350, stepSlide('2/6', 1, 'Choose your product', 'Go to <b>twainyplast.com</b>, browse by category or search, and open the product you like.', shot.product, '', 'Price and stock are shown on every product.'))
add('p2-how-to-order-3', 1080, 1350, stepSlide('3/6', 2, 'Tap “Buy it now”', 'Or “Add to cart” to keep shopping and order several items together.', shot.buy, 'left:165px;top:355px'))
add('p2-how-to-order-4', 1080, 1350, stepSlide('4/6', 3, 'Add your details', 'Your name, address, city and phone number, so our driver can reach you.', shot.checkout, ''))
add('p2-how-to-order-5', 1080, 1350, stepSlide('5/6', 4, 'Pay on delivery', 'Cash on Delivery is selected. Tap <b>Complete order</b> and you’re done.', shot.pay, 'left:120px;top:730px;width:150px', 'You pay only when your order arrives.'))
add('p2-how-to-order-6', 1080, 1350, `
<div class="post mist">${top('6/6')}
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:26px">
    <h1>That’s it. We’ll take it from here.</h1>
    <div style="display:flex;flex-direction:column;gap:18px;margin-top:20px">
      ${perk('📦', 'We prepare and pack your order', '')}
      ${perk('🚚', 'We deliver all over Lebanon', 'Free on orders over $30 · $3 on orders up to $30')}
      ${perk('💵', 'You pay cash when it arrives', '')}
    </div>
    <div style="display:flex;align-items:center;gap:22px;margin-top:26px;flex-wrap:wrap"><span class="pill">Order now: twainyplast.com</span></div>
    <p style="font-size:30px;font-weight:700;color:var(--g);display:flex;align-items:center;gap:12px">${wa(40)} Prefer to chat? Send the product name to ${WA}</p>
  </div>${foot()}</div>`)

// ===== POST 3 · We help you choose (carousel, 4 slides) =====
add('p3-help-choose-1', 1080, 1350, `
<div class="post">${top('1/4')}
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center">
    <p class="kicker">Free advice</p>
    <h1 style="font-size:108px;margin-top:16px">Not sure what to buy?</h1>
    <h2 style="color:var(--leaf);margin-top:18px">We’ll help you choose.</h2>
    <p class="lead" style="margin-top:30px">Buying bathroom products online can feel risky. Will it fit? Is it the right one? Our team helps you before you order, for free.</p>
  </div>
  <span class="swipe">Swipe →</span>${foot()}</div>`)
add('p3-help-choose-2', 1080, 1350, `
<div class="post mist">${top('2/4')}
  <div style="display:flex;align-items:center;gap:26px;margin-top:30px"><div class="num">1</div><h2>Send us a photo</h2></div>
  <p class="lead" style="margin-top:20px">Of your sink, your space or the old part you want to replace, with the size if you know it.</p>
  <div style="margin-top:36px">${chat(`
    <div class="b me"><div style="height:250px;border-radius:14px;background:linear-gradient(135deg,#d9d4cc,#b9b2a8);display:grid;place-items:center;font-size:30px;color:#5b5550;margin-bottom:8px">📷 Photo of your sink</div>Hi! Which mixer fits this sink? It’s about 40 cm wide.<small>21:04 ✓✓</small></div>`)}
  </div>
  <span class="swipe">→</span>${foot()}</div>`)
add('p3-help-choose-3', 1080, 1350, `
<div class="post mist">${top('3/4')}
  <div style="display:flex;align-items:center;gap:26px;margin-top:30px"><div class="num">2</div><h2>We recommend the right options</h2></div>
  <p class="lead" style="margin-top:20px">With prices, availability and our honest advice.</p>
  <div style="margin-top:34px">${chat(`
    <div class="b them">For that sink, these two fit well 👇<small>21:06</small></div>
    <div class="b them" style="display:flex;gap:16px;max-width:92%"><div style="flex:1"><img src="${img.shortNeck}" style="height:190px;object-fit:contain" alt=""><b>Brax Short Neck · $25</b></div><div style="flex:1"><img src="${img.tallNeck}" style="height:190px;object-fit:contain" alt=""><b>Brax Tall Neck · $30</b></div></div>
    <div class="b them">Both in stock. Want a live video to see them? 🎥<small>21:07</small></div>`)}
  </div>
  <span class="tag">Example conversation · illustrative product images</span><span class="swipe">→</span>${foot()}</div>`)
add('p3-help-choose-4', 1080, 1350, `
<div class="post dark">${top('4/4')}
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:28px">
    <div style="display:flex;align-items:center;gap:26px"><div class="num">3</div><h2>You choose. We deliver.</h2></div>
    <p class="lead">Order on the website or right there in the chat. We deliver all over Lebanon and you pay on delivery.</p>
    <div style="background:#fff;border-radius:40px;padding:34px 40px;display:flex;align-items:center;gap:26px;margin-top:30px">
      ${wa(96)}<div><p style="font-size:30px;color:var(--grey);font-weight:700">Ask us before you order</p><b style="font-size:72px;color:var(--g);line-height:1.05">${WA}</b></div>
    </div>
    <p class="lead muted" style="font-size:32px">Or tap “Message” on our page.</p>
  </div>${foot()}</div>`)

// ===== POST 4 · See it live before you buy (carousel, 3 slides) =====
const videoCall = `
<div class="phone" style="width:440px"><div class="screen" style="height:900px;padding-top:0;background:#222">
  <img src="${img.round}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.92)" alt="">
  <div style="position:absolute;top:70px;left:0;right:0;text-align:center;color:#fff;text-shadow:0 2px 8px #000"><b style="font-size:32px">Twainy Plast</b><p style="font-size:22px">WhatsApp video · 01:24</p></div>
  <div style="position:absolute;top:150px;right:22px;width:120px;height:170px;border-radius:18px;background:linear-gradient(160deg,#cfd8d3,#9aa8a0);border:3px solid #fff;display:grid;place-items:center;font-size:20px;color:#333;font-weight:700">You</div>
  <div style="position:absolute;bottom:40px;left:0;right:0;display:flex;justify-content:center;gap:28px">${['#ffffff33', '#ffffff33', '#e53935'].map((c, i) => `<div style="width:84px;height:84px;border-radius:50%;background:${c};display:grid;place-items:center;font-size:36px">${['🎤', '🔄', '📞'][i]}</div>`).join('')}</div>
  <div style="position:absolute;left:24px;top:420px;background:#d63a14;color:#fff;font-weight:800;font-size:22px;border-radius:10px;padding:4px 14px">● LIVE</div>
</div></div>`
add('p4-see-it-live-1', 1080, 1350, `
<div class="post dark">${top('1/3')}
  <div style="display:flex;gap:44px;flex:1;margin-top:30px;margin-bottom:120px;align-items:center">
    <div style="flex:1">
      <p class="kicker">Shop with confidence</p>
      <h1 style="margin-top:16px">See it live before you buy.</h1>
      <p class="lead" style="margin-top:26px">Ask for a <b>live video call</b> from our store, or <b>real photos</b> of the exact product you’ll receive.</p>
    </div>
    ${videoCall}
  </div>
  <span class="tag">Illustrative product image</span><span class="swipe">Swipe →</span>${foot()}</div>`)
add('p4-see-it-live-2', 1080, 1350, `
<div class="post mist">${top('2/3')}
  <h2 style="margin-top:30px">How it works</h2>
  <div style="display:flex;flex-direction:column;gap:26px;margin-top:40px">
    ${[
      ['1', 'Message us on WhatsApp', 'Send “LIVE” and the product name, or a link from our website.'],
      ['2', 'We call you from the store', 'A team member shows you the real product on a video call.'],
      ['3', 'See every detail', 'Size, finish, colour and LED light. Ask anything, compare options.'],
      ['4', 'Or get real photos', 'Prefer photos? We send you pictures of the exact piece.'],
    ].map(([n, t, d]) => `<div class="card" style="display:flex;align-items:center;gap:30px;padding:28px 34px"><div class="num" style="width:84px;height:84px;font-size:46px">${n}</div><div><b style="font-size:38px;color:var(--g)">${t}</b><p style="font-size:29px;color:var(--grey);font-weight:600;line-height:1.3">${d}</p></div></div>`).join('')}
  </div>
  <span class="swipe">→</span>${foot()}</div>`)
add('p4-see-it-live-3', 1080, 1350, `
<div class="post">${top('3/3')}
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:30px">
    <h1>Want to see it first?</h1>
    <p class="lead">Message us the word <b style="color:var(--red)">LIVE</b> and the product you’re interested in.</p>
    <div style="margin-top:10px">${chat(`<div class="b me" style="font-size:34px">LIVE · 60×60 Round LED Mirror<small>18:30 ✓✓</small></div><div class="b them" style="font-size:34px">Sure! Calling you in 2 minutes 🎥<small>18:31</small></div>`)}</div>
    <div style="display:flex;align-items:center;gap:20px;margin-top:10px">${wa(70)}<b style="font-size:64px;color:var(--g)">${WA}</b></div>
    <p class="muted" style="font-size:26px">Live calls during store hours. Free, with no obligation to buy.</p>
  </div>${foot()}</div>`)

// ===== POST 5 · Why order from Twainy Plast (single) =====
add('p5-why-twainy', 1080, 1350, `
<div class="post mist">${top('')}
  <p class="kicker" style="margin-top:26px">Why order from us</p>
  <h1 style="font-size:72px;margin-top:10px">Buying online, with a real store behind you.</h1>
  <div style="display:flex;flex-direction:column;gap:12px;margin-top:26px">
    ${perk('🏪', 'A real family store in Qsarnaba', 'Not just a website. Visit us during opening hours.')}
    ${perk('🤝', 'Free help choosing', 'Send a photo and we recommend what fits.')}
    ${perk('🎥', 'Live video or real photos', 'See the exact product before you buy.')}
    ${perk('💵', 'Pay cash on delivery', 'You pay only when it arrives.')}
    ${perk('🚚', 'Delivery all over Lebanon', 'Free on orders over $30.')}
  </div>
  <div style="display:flex;gap:20px;margin-top:24px;align-items:center;flex-wrap:wrap">
    <span class="pill">Order: twainyplast.com</span>
    <span class="pill ghost">${wa(40)} ${WA}</span>
  </div>
  ${foot()}</div>`)

// ===== Reel storyboards (1920×1080 sheets for filming) =====
const frame = (f, i) => `
<div style="display:flex;flex-direction:column;gap:10px;min-width:0">
  <div style="height:400px;border-radius:22px;background:${['#1b4d2b', '#2e7d3a', '#eef5f0'][i % 3]};color:${i % 3 === 2 ? '#1b4d2b' : '#fff'};padding:16px;display:flex;flex-direction:column;justify-content:space-between;position:relative;border:3px solid #cfe0d4">
    <div style="display:flex;justify-content:space-between;font-size:20px;font-weight:800"><span>${f.t}</span><span style="background:#d63a14;color:#fff;border-radius:8px;padding:0 10px">${f.shot}</span></div>
    <div style="font-size:74px;text-align:center">${f.icon}</div>
    <div style="background:#000000aa;color:#fff;border-radius:12px;padding:8px 10px;font-size:21px;font-weight:800;text-align:center;line-height:1.2">${f.text}</div>
  </div>
  <p style="font-size:19px;line-height:1.3;font-weight:700;color:#1a1f1c">🎬 ${f.film}</p>
  <p style="font-size:18px;line-height:1.3;color:#5b6770;font-weight:600">🎙 ${f.vo}</p>
</div>`
const board = (r) => `
<div style="width:1920px;height:1080px;padding:50px 60px;background:#fff;display:flex;flex-direction:column;gap:26px">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:40px">
    <div><p style="font-size:24px;font-weight:800;letter-spacing:3px;color:#d63a14">${r.tag}</p><h1 style="font-size:64px">${r.title}</h1><p style="font-size:24px;line-height:1.35;color:#5b6770;font-weight:600;max-width:1200px;margin-top:6px">${r.idea}</p></div>
    <div class="logo" style="flex-shrink:0"><img src="${logo}" alt=""><span>Twainy Plast</span></div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(${r.frames.length},1fr);gap:22px;flex:1;min-height:0;align-content:start">${r.frames.map(frame).join('')}</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px">
    ${[['Length', r.length], ['Audio', r.audio], ['Caption CTA', r.cta], ['Filming tips', r.tips]].map(([k, v]) => `<div style="background:#eef5f0;border-radius:18px;padding:14px 18px"><b style="font-size:20px;color:#2e7d3a">${k}</b><p style="font-size:19px;line-height:1.3;font-weight:600">${v}</p></div>`).join('')}
  </div>
</div>`
const reels = [
  {
    file: 'reel-a-store-to-your-door', tag: 'Reel A · goes with Post 1', title: 'From our store to your door',
    idea: 'Show that a real store stands behind the website, and that orders really reach every part of Lebanon. Real people, real products, a real delivery.',
    length: '20–25 s · 9:16 · 6 shots', audio: 'Upbeat trending track from the Instagram library at low volume, plus your voice-over in English.', cta: 'Order from home at twainyplast.com · link in bio',
    tips: 'Film vertically in daylight, hold the phone steady (lean on a shelf), each shot 3–4 s, add subtitles in the Instagram editor.',
    frames: [
      { t: '0–2 s', shot: 'Close-up', icon: '🚪', text: 'We’re online now 🎉', film: 'Store door opening or the lights switching on in the morning.', vo: '“Twainy Plast is now online.”' },
      { t: '2–6 s', shot: 'Slow walk', icon: '🛁', text: '175+ bathroom products', film: 'Walk slowly down the aisle past mixers, LED mirrors and WCs.', vo: '“Everything for your bathroom…”' },
      { t: '6–10 s', shot: 'Over shoulder', icon: '📱', text: 'Order from home', film: 'Someone on the sofa scrolling twainyplast.com on their phone.', vo: '“…now you can order it from home.”' },
      { t: '10–15 s', shot: 'Hands', icon: '📦', text: 'We pack it with care', film: 'Hands wrapping a mixer box in bubble wrap, taping, writing the label.', vo: '“We pack it carefully…”' },
      { t: '15–20 s', shot: 'Wide', icon: '🚚', text: 'Delivered all over Lebanon', film: 'Loading the box into the car or van, then a short driving shot.', vo: '“…and deliver all over Lebanon.”' },
      { t: '20–25 s', shot: 'End card', icon: '💵', text: 'Free over $30 · Pay on delivery', film: 'Handing the box over at a door (with permission), then the logo and website.', vo: '“Free delivery over $30. Pay when it arrives.”' },
    ],
  },
  {
    file: 'reel-b-how-to-order', tag: 'Reel B · goes with Post 2', title: 'How to order in 20 seconds',
    idea: 'A fast, real screen recording that proves ordering is easy: product, buy, details, cash on delivery. Your face opens and closes the video to keep it human.',
    length: '20–30 s · 9:16 · selfie + screen recording', audio: 'Light tapping sounds from the screen recording, plus a trending beat. You talk at the start and end.', cta: 'Try it now: twainyplast.com',
    tips: 'Use your phone’s built-in screen recorder. Use test details, never a real customer’s. Zoom in during the edit so text is readable. Keep the video under 30 s.',
    frames: [
      { t: '0–2 s', shot: 'Selfie', icon: '🙋', text: 'Ordering from us takes 20 seconds', film: 'You in the store, holding the phone and looking at the camera.', vo: '“Ordering from Twainy Plast takes 20 seconds. Watch.”' },
      { t: '2–6 s', shot: 'Screen rec', icon: '🔎', text: '1. Choose a product', film: 'Open twainyplast.com, then tap a category and a product.', vo: '(tap sounds)' },
      { t: '6–10 s', shot: 'Screen rec', icon: '👆', text: '2. Tap “Buy it now”', film: 'Scroll to the price, then tap BUY IT NOW.', vo: '“Pick it, tap buy…”' },
      { t: '10–16 s', shot: 'Screen rec', icon: '📝', text: '3. Add your details', film: 'Fill in name, address and phone (test data), speeded up 2×.', vo: '“…add your address…”' },
      { t: '16–20 s', shot: 'Screen rec', icon: '💵', text: '4. Cash on delivery ✓', film: 'Show Cash on Delivery selected, then tap Complete order.', vo: '“…and pay when it arrives.”' },
      { t: '20–25 s', shot: 'Selfie', icon: '👍', text: 'Done! Delivered all over Lebanon', film: 'You again, smiling and pointing down to the caption.', vo: '“Done! We deliver all over Lebanon.”' },
    ],
  },
  {
    file: 'reel-c-see-it-live', tag: 'Reel C · goes with Posts 3 & 4', title: 'Not sure? We’ll show you live',
    idea: 'Tackle the biggest fear, “I can’t trust buying this online”, by showing a real WhatsApp video call from the store. The customer sees the exact mirror and asks questions.',
    length: '25–30 s · 9:16 · 6 shots', audio: 'A trending “problem → solution” sound or a calm track, with on-screen text doing most of the talking.', cta: 'Message “LIVE” to 76 742 274',
    tips: 'Film the call from behind the staff member’s shoulder so both phone and product are in frame. Switch the mirror LED colours on camera. Show a tape measure for size.',
    frames: [
      { t: '0–3 s', shot: 'POV', icon: '🤔', text: 'Scared to buy bathroom products online?', film: 'A person on the sofa looking doubtfully at a product on their phone.', vo: '(text only)' },
      { t: '3–7 s', shot: 'Screen rec', icon: '💬', text: 'Just ask us', film: 'Typing on WhatsApp: “LIVE · 60×60 Round LED Mirror”, then send.', vo: '(text only)' },
      { t: '7–13 s', shot: 'Over shoulder', icon: '🎥', text: 'We call you from the store', film: 'A staff member answers the video call and turns the camera to the real mirror.', vo: '“Hi! Here’s the mirror…”' },
      { t: '13–19 s', shot: 'Close-up', icon: '💡', text: 'See the real size & light', film: 'Switch the LED colours, then a tape measure across it showing 60 cm.', vo: '“…it’s 60 cm, three light colours.”' },
      { t: '19–24 s', shot: 'Screen rec', icon: '📸', text: 'Or get real photos', film: 'Real photos of the product arriving in the WhatsApp chat.', vo: '(text only)' },
      { t: '24–30 s', shot: 'End card', icon: '✅', text: 'Message “LIVE” to 76 742 274', film: 'Staff waves at the camera, then the logo, WhatsApp number and website.', vo: '“See it before you buy.”' },
    ],
  },
]
for (const r of reels) add(r.file, 1920, 1080, board(r))

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
  await tab.close()
}
await browser.close()
console.log(`rendered ${S.length} images`)
