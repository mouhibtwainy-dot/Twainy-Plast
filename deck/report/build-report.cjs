// Builds the graded MKT 843 final report (Word) for Twainy Plast.
// Usage: NODE_PATH=<folder containing the `docx` package> node deck/report/build-report.cjs [out.docx]
const fs = require('fs')
const path = require('path')
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, BorderStyle, LevelFormat, ImageRun, TableLayoutType, Footer, PageNumber, PageBreak, Header,
} = require('docx')

const ROOT = __dirname
const OUT = process.argv[2] || path.join(ROOT, '..', 'Twainy-Plast-Final-Report.docx')
const D = JSON.parse(fs.readFileSync(path.join(ROOT, '..', 'results.json'), 'utf8'))
const FIG = (f) => fs.readFileSync(path.join(ROOT, 'figures', f))
const LOGO = fs.readFileSync(path.join(ROOT, '..', 'assets', 'logo.png'))

const GREEN = '1B4D2B'
const LEAF = '2E7D3A'
const RED = 'D63A14'
const MIST = 'EEF5F0'
const GREY = '5B6770'
const W = 9026 // A4 content width with 1" margins

const team = D.team.map((t) => t.name).filter(Boolean)

// ---------- building blocks ----------
const r = (text, o = {}) => new TextRun({ text, ...o })
const P = (content, o = {}) =>
  new Paragraph({ children: typeof content === 'string' ? [r(content)] : content, spacing: { after: 140, line: 288 }, ...o })
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [r(t)], pageBreakBefore: false })
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [r(t)] })
const bullet = (content) => new Paragraph({ children: typeof content === 'string' ? [r(content)] : content, numbering: { reference: 'dots', level: 0 }, spacing: { after: 80, line: 276 } })
const numbered = (content) => new Paragraph({ children: typeof content === 'string' ? [r(content)] : content, numbering: { reference: 'steps', level: 0 }, spacing: { after: 80, line: 276 } })
const b = (t) => r(t, { bold: true })
const caption = (t) => new Paragraph({ children: [r(t, { italics: true, size: 18, color: GREY })], alignment: AlignmentType.CENTER, spacing: { before: 60, after: 220 } })
function figure(file, type, wPx, hPx, cap, alt) {
  return [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 0 }, children: [new ImageRun({ type, data: FIG(file), transformation: { width: wPx, height: hPx }, altText: { title: alt, description: alt, name: file } })] }),
    caption(cap),
  ]
}
const border = { style: BorderStyle.SINGLE, size: 4, color: 'D5DED8' }
const borders = { top: border, bottom: border, left: border, right: border }
function table(widths, rows) {
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: widths,
    layout: TableLayoutType.FIXED,
    rows: rows.map((row, i) => new TableRow({
      tableHeader: i === 0,
      cantSplit: true,
      children: row.map((c, j) => new TableCell({
        width: { size: widths[j], type: WidthType.DXA },
        borders,
        margins: { top: 60, bottom: 60, left: 100, right: 100 },
        shading: i === 0 ? { type: ShadingType.CLEAR, color: 'auto', fill: GREEN } : j === 0 ? { type: ShadingType.CLEAR, color: 'auto', fill: MIST } : undefined,
        children: [new Paragraph({ spacing: { after: 0, line: 252 }, children: [r(String(c), { size: 19, bold: i === 0 || j === 0, color: i === 0 ? 'FFFFFF' : undefined })] })],
      })),
    })),
  })
}
const spacer = () => new Paragraph({ children: [], spacing: { after: 120 } })

// ---------- numbers (no revenue, by request) ----------
// date ranges written in words (no dashes) for the report
const BASE = 'October 7 to 21', CAMP = 'October 26 to November 21'
const S = D.shopify, B = S.baseline, K = S.campaign, WA = D.whatsapp, SO = D.social
const pw = (n, d) => (n / d) * 7
const g = (a, bb) => '+' + Math.round((bb / a - 1) * 100) + '%'
const atcB = B.cartSessions / B.sessions, atcC = K.cartSessions / K.sessions
const pct = (x, d = 1) => (x * 100).toFixed(d) + '%'
const totalOrders = K.orders + WA.orders
const N = {
  sessions: g(pw(B.sessions, B.days), pw(K.sessions, K.days)),
  lebanon: g(pw(B.lebanonSessions, B.days), pw(K.lebanonSessions, K.days)),
  social: g(pw(B.socialSessions, B.days), pw(K.instagramSessions + K.facebookSessions, K.days)),
  search: g(pw(B.searchSessions, B.days), pw(K.googleSessions + K.bingSessions, K.days)),
  atc: g(atcB, atcC),
  waShare: Math.round((WA.orders / totalOrders) * 100) + '%',
}

// ---------- document ----------
const children = []

// Title page
children.push(
  new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 600, after: 400 }, children: [new ImageRun({ type: 'png', data: LOGO, transformation: { width: 110, height: 118 }, altText: { title: 'Twainy Plast logo', description: 'Twainy Plast logo', name: 'logo' } })] }),
  new Paragraph({ spacing: { after: 120 }, children: [r('MKT 843 STRATEGIC SOCIAL MEDIA MANAGEMENT IN THE DIGITAL AGE', { size: 20, bold: true, color: RED, characterSpacing: 40 })] }),
  new Paragraph({ spacing: { after: 200 }, children: [r('From Visitors to Customers', { size: 64, bold: true, color: GREEN })] }),
  new Paragraph({ spacing: { after: 600 }, children: [r('A social media and digital growth strategy for Twainy Plast Sanitary', { size: 30, color: LEAF })] }),
  P([b('Final Applied Consulting Project report')]),
  P([r('Instructor: '), b('Dr. Kiray Khoury')]),
  P([r('Program: LAU Adnan Kassar School of Business, MBA')]),
  P([r('Presentation: November 26, 2026')]),
  P([r('Team: '), team.length ? b(team.join(', ')) : r('[team member names]', { color: RED })]),
  P([r('Client: Twainy Plast Sanitary, Qsarnaba, Bekaa, Lebanon · twainyplast.com')]),
  new Paragraph({ children: [new PageBreak()] }),
)

// Contents
children.push(H1('Contents'))
;[
  '1. Executive summary', '2. The client and why we chose it', '3. The problem we set out to solve', '4. Research: competitors and customers',
  '5. Strategy: brand, channels and set-up', '6. The campaign: Choose with Confidence', '7. How we measured', '8. Results',
  '9. What we learned', '10. Recommendations for the next 90 days', '11. Ethical and social dimensions', '12. Teamwork and reflection',
  '13. Conclusion', 'Appendix: data sources and definitions',
].forEach((t) => children.push(P(t, { spacing: { after: 60 } })))
children.push(new Paragraph({ children: [new PageBreak()] }))

// 1. Executive summary
children.push(
  H1('1. Executive summary'),
  P('Twainy Plast has been part of the Lebanese plumbing trade since 1987. Its pipes and fittings business is well known, and the four brands it represents already have a following on social media. Its bathroom range was a different story. Mixers, LED mirrors, basins, WCs and showers sat in the store with no social media presence at all, and when the company launched its new online store in October 2026, almost nobody who visited actually bought anything.'),
  P('We worked with the owner for about six weeks to change that. We audited the website and the competition, built two buyer personas, gave the bathroom range a clear brand promise, set up the channels customers actually use, and ran a four-week campaign called Choose with Confidence. The campaign answered three simple fears we kept hearing: can I buy this from home, is ordering complicated, and can I trust what I see online.'),
  P([r('The results were encouraging. The business went from '), b('zero online orders to 23 orders'), r(' during the campaign: '), b('20 through WhatsApp in 14 days'), r(' and 3 on the website. Compared with the two weeks after launch, weekly visits from Lebanon grew by '), b(N.lebanon), r(', social visits by '), b(N.social), r(' and search visits by '), b(N.search), r('. The add-to-cart rate almost tripled. On Instagram, the account reached 957 followers and 87,000 views in 30 days, helped by the 18 short videos the team filmed in the store.')]),
  P('Not everything worked as planned. The website itself still converts below our target, and most people prefer to finish their order on WhatsApp after watching a video. That is the main lesson of the project, and it shapes our recommendations: fix the checkout, track every source, and treat social media and WhatsApp as one sales funnel rather than two separate channels.'),
)

// 2. Client
children.push(
  H1('2. The client and why we chose it'),
  P('Twainy Plast is a family business based in Qsarnaba, in the Bekaa. Its leadership started in the plumbing and sanitary sector in 1987, and the company now acts as an authorised agent for four Lebanese and international brands. Its stated mission is to build trust in Made in Lebanon products while offering certified imports next to them.'),
  P('In practice, the company runs two businesses under one roof:'),
  bullet([b('Plumbing systems. '), r('PPR, PVC, PVC-U and HDPE pipes and fittings sold mainly to plumbers and contractors. The brands are Haykal Plast (Lebanon, PVC), MiaTherm (Lebanon, PPR), PLIMAT (Portugal, PVC-U) and Şenkron (Turkey, HDPE). This side of the business already posts on social media.')]),
  bullet([b('Bathroom sanitary ware. '), r('About 175 products for homeowners, including mixers, LED mirrors, WCs, basins, vanities, showers and water pumps. Before this project, this side had no social media presence at all.')]),
  P('We chose Twainy Plast because it fits the brief almost perfectly. It is a local, family-run enterprise with real products and real customers, but its consumer business was digitally underdeveloped. It also gave us something rare for a student project: a live online store with real data, so we could measure what our work actually changed.'),
  P('Before starting, we explained the scope to the owner and secured written consent to audit the store, design visual assets, publish content with his approval and present the results at LAU. We agreed that revenue figures would stay private, which is why this report shows growth in percentages rather than amounts.'),
)

// 3. Problem
children.push(
  H1('3. The problem we set out to solve'),
  P('The company built its online store with Shopify and AI tools. ChatGPT helped create product images and descriptions, which allowed a small team to put 175 products online quickly. The store went live in mid October 2026. It looked good, but it was not selling.'),
  ...figure('homepage.jpg', 'jpg', 560, 315, 'Figure 1. The twainyplast.com homepage at the time of the project.', 'twainyplast.com homepage'),
  P(`We took the first two weeks after launch (${BASE}) as our baseline. The numbers told a clear story:`),
  table([5200, 3826], [
    ['Launch baseline', 'Value'],
    ['Website sessions', `${B.sessions} in ${B.days} days`],
    ['Orders', '0'],
    ['Add-to-cart rate', pct(atcB)],
    ['Visits from Lebanon', pct(B.lebanonShare, 0)],
    ['Visits from social media', '6% (Facebook and Instagram combined)'],
    ['Direct visits (links shared privately)', '91%'],
  ]),
  spacer(),
  P('In plain terms, people were arriving, mostly through links shared on WhatsApp, and leaving without buying. Many visits came from outside Lebanon and were probably bots or testing. When we walked through the store as a customer would, we found several barriers:'),
  bullet('The main button on the homepage said "Our Journey" instead of inviting people to shop.'),
  bullet('Delivery and payment terms were only visible at the very end of checkout.'),
  bullet('Product photos were AI generated renders rather than real photos, which made some visitors unsure.'),
  bullet('Checkout required an email address and pre-ticked a box to receive marketing emails.'),
  bullet('There was no tracking of where visitors came from and no customer reviews.'),
  P([r('This led to our research question: '), b('how can Twainy Plast use targeted social content, customer trust and an easier buying journey to turn website visitors into paying customers?')]),
)

// 4. Research
children.push(
  H1('4. Research: competitors and customers'),
  H2('4.1 Competitor social audit'),
  P('We audited three competitors that compete with Twainy Plast for the same customers, using their public profiles, websites and business directories in November 2026. Counting posts and engagement over 30 days requires access to their accounts, so we only report what is publicly visible.'),
  table([1700, 1830, 1830, 1830, 1836], [
    ['', 'Twainy Plast', 'Builders Sal', 'Arcom Group', 'Chromotech'],
    ['Platforms', 'TikTok, Instagram, Facebook', 'Facebook, LinkedIn', 'Instagram, Facebook, TikTok, LinkedIn', 'None found'],
    ['Followers', '957 (Instagram)', '5.1K (Facebook)', 'About 20K (Instagram)', 'None'],
    ['Prices shown', 'Yes, on every post', 'No online prices found', 'Yes, in its online store', 'No online presence'],
    ['How people buy', 'Website, WhatsApp, store', 'Jdeideh showroom, WhatsApp', 'Online store, 7 showrooms', 'Showrooms in Sin El Fil and Hadath'],
  ]),
  spacer(),
  P('Two findings stood out. First, Arcom Group is clearly the benchmark online. It has around 20,000 Instagram followers, more than 600 posts and a Shopify store with prices. Second, the other two competitors barely use social media to sell, which leaves room for a brand that explains products clearly, shows prices and makes ordering easy. We decided Twainy Plast should own the idea of being clear and honest.'),
  H2('4.2 Buyer personas'),
  P('We built two personas from conversations with the owner, store observations and, later, the real orders.'),
  P([b('Rania, 34, homeowner renovating a bathroom. '), r('She has a middle income, partly earned in dollars, and lives in Beirut, Mount Lebanon or the Bekaa. She wants a modern bathroom on a careful budget and spends a lot of time comparing before she buys. Her biggest worries are choosing a product that does not fit, judging quality from a photo, and delivery. She uses Instagram first, then Facebook groups and WhatsApp, and she scrolls mostly around lunchtime and late in the evening. She saves Reels and carousels for later.')]),
  P([b('Hassan, 45, plumber and small contractor. '), r('He buys for his clients and comes back if the supply is reliable. He hates wasted trips, changing prices and slow replies. He lives on WhatsApp, follows plumbing how-to channels on YouTube and TikTok, and is most active early in the morning and at night.')]),
  P('The real orders confirmed both profiles. Website orders came from Beirut, Fanar in the Metn and Baalbek, and the larger baskets looked like renovation jobs. Most customers wanted to ask a question before buying, which is exactly why WhatsApp ended up closing most of the sales.'),
)

// 5. Strategy
children.push(
  H1('5. Strategy: brand, channels and set-up'),
  H2('5.1 Brand identity'),
  P([r('We gave the bathroom range one promise: '), b('Choose with Confidence'), r(', or اختار بثقة in Arabic. The voice is knowledgeable, honest and practical, in English first with Lebanese Arabic alongside. We kept the colours of the existing logo, deep green and red, and used red only for prices and calls to action so that it always means "act now". Every post carries the logo, the website and the WhatsApp number.')]),
  P('We also wrote simple community guidelines: reply within an hour during store hours, answer price questions publicly, move personal details to private messages, never delete criticism, and only repost customer photos with permission.'),
  H2('5.2 Channel architecture'),
  P('Each channel was given one job in the buying journey:'),
  table([2300, 3200, 3526], [
    ['Channel', 'Role', 'What we set up'],
    ['Instagram', 'Main discovery channel for homeowners', 'Optimised bio, highlights, link to the store, location tag'],
    ['TikTok', 'Free reach to new, younger homeowners', 'Account and the same short videos'],
    ['Facebook', 'Older homeowners and local groups', 'Mirrored page with a WhatsApp button'],
    ['WhatsApp Business', 'Advice, quotes, live video and orders', 'Catalogue, greeting and away messages, quick replies, labels'],
    ['Google profile and search', 'People searching for products nearby', 'Categories, photos and local keywords'],
    ['twainyplast.com', 'Checkout with cash on delivery', 'Delivery across Lebanon, free over $30'],
  ]),
  spacer(),
  P('LinkedIn was left out because neither persona looks for bathroom products there.'),
  ...figure('instagram.jpg', 'jpg', 230, 416, 'Figure 2. The Twainy Plast Instagram profile during the campaign: 957 followers, 225 posts and 87K views in 30 days.', 'Twainy Plast Instagram profile on a phone'),
)

// 6. Campaign
children.push(
  H1('6. The campaign: Choose with Confidence'),
  P('The campaign ran for four weeks, from October 26 to November 21, 2026. Each week tackled one customer fear and moved people one step closer to ordering.'),
  table([1500, 2000, 5526], [
    ['Week', 'Goal', 'What we published'],
    ['1', 'Awareness', 'We are online and deliver all over Lebanon. Store tour reel and launch post.'],
    ['2', 'Consideration', 'How to order in four steps, using real screenshots of the checkout. Reel showing the order in 20 seconds.'],
    ['3', 'Trust', 'Free help choosing, plus live video or real photos of the exact product before buying.'],
    ['4', 'Action', 'Why order from us, reviews and reminders.'],
  ]),
  spacer(),
  P('Content followed four pillars: Choose Right (fit, size and comparisons), Inside Twainy (the store and the people), Real Homes (genuine reviews) and Order Easy (prices, delivery and how to order). We posted three feed posts a week in the evening, added stories every day, and sent a weekly WhatsApp broadcast to customers who had agreed to receive it.'),
  H2('6.1 Creative work'),
  P([r('The team produced '), b('five graphic posts and carousels'), r(' and '), b('18 short videos'), r(', published on TikTok, Instagram and Facebook. The posts were designed to teach and then ask for one clear action: shop now, save and order, message us, or send the word LIVE to see a product on a video call.')]),
  P('The videos made the biggest difference. One of them shows the typical structure. In 27 seconds, the owner speaks straight to the camera about bathroom renovation, then the video shows the real website on a phone, walks through the product categories, and ends with three WhatsApp numbers. A human face builds trust, the website proves the store is real, and WhatsApp gives people an easy way to ask before they buy.'),
  ...figure('reel-moments.jpg', 'jpg', 560, 244, 'Figure 3. Four moments from one of the 18 reels: the hook, the website, the categories and the WhatsApp call to action.', 'Four stills from a Twainy Plast reel'),
  H2('6.2 Paid media plan'),
  P('We prepared a $200 paid test for Meta: a small awareness budget in week one, an A/B test between a reel and a carousel in week two, then scaling the winner and retargeting video viewers in weeks three and four. Targeting was limited to location and broad age groups. The results in this report focus on what the campaign achieved as a whole, so paid performance is not broken out separately.'),
)

// 7. Measurement
children.push(
  H1('7. How we measured'),
  P('We defined our KPIs before the campaign started and set four-week test targets. These were honest guesses to learn from, not forecasts.'),
  table([2600, 3600, 2826], [
    ['KPI', 'How it is calculated', 'Tool'],
    ['Reach and views', 'Unique accounts reached, video views', 'Meta Business Suite, TikTok analytics'],
    ['Engagement rate', 'Interactions divided by reach', 'Native insights'],
    ['Click-through rate', 'Link clicks divided by impressions', 'Ads Manager, UTM links'],
    ['Sessions and sources', 'Visits by source, country and device', 'Shopify Analytics, GA4'],
    ['Add-to-cart and conversion', 'Cart sessions or orders divided by sessions', 'Shopify funnel, GA4 events'],
    ['CAC', 'Ad spend divided by new customers', 'Ads Manager and order log'],
    ['WhatsApp orders', 'Labelled chats, each order logged once', 'WhatsApp Business'],
  ]),
  spacer(),
  P('Shopify was our source of truth for the website. WhatsApp orders were logged separately so that no order was counted twice. Because the campaign was short and the numbers are small, we describe the results as observed changes against the baseline, not as proof that one action caused another.'),
)

// 8. Results
children.push(
  H1('8. Results'),
  H2('8.1 Website traffic'),
  P([r(`Comparing weekly averages in the campaign (${CAMP}) with the launch period, the website gained mostly the visitors we were hoping for. Sessions per week grew by `), b(N.sessions), r(', but visits from Lebanon grew by '), b(N.lebanon), r('. The share of visitors from Lebanon rose from 44% to 70%, and the share on mobile rose from 46% to 71%, which is what you would expect from people arriving through phones and social media.')]),
  ...figure('growth.png', 'png', 560, 206, 'Figure 4. Growth in weekly averages, campaign versus launch period (Shopify Analytics).', 'Bar chart of growth percentages'),
  P([r('Social visits grew by '), b(N.social), r(' and search visits by '), b(N.search), r('. In the final week, the site received 38 visits from social media, against 6 in the week before launch. The add-to-cart rate rose from '), b(pct(atcB)), r(' to '), b(pct(atcC)), r('.')]),
  H2('8.2 Orders'),
  P([r('The business moved from no online orders to '), b(`${totalOrders} orders`), r(' in the campaign. Twenty came through WhatsApp in just 14 days, and three came through the website. Two website orders were delivered and one large order was cancelled shortly after it was placed. Interestingly, the biggest delivered website order, seven items to Beirut, came from a ChatGPT referral, which shows that AI search is already sending buyers.')]),
  ...figure('orders.png', 'png', 560, 196, 'Figure 5. Orders by channel during the campaign.', 'Donut chart of orders by channel'),
  H2('8.3 Social media'),
  P('By the end of the campaign, the Instagram account had 957 followers, 225 posts and 87,000 views in the previous 30 days. The 18 videos were the engine behind this, and they were also what pushed people to message the store on WhatsApp.'),
  H2('8.4 Scorecard'),
  P('The table below compares each KPI with its target. We have kept it honest: four targets were met and four improved without reaching the target.'),
  table([3000, 1300, 1500, 1900, 1326], [
    ['KPI', 'Baseline', 'Target', 'Actual', 'Status'],
    ['Total orders', '0', '18', `${totalOrders} (128%)`, 'Met'],
    ['WhatsApp orders', '0', '8', '20 in 14 days', 'Met'],
    ['Short videos', '0', '3', '18 on 3 platforms', 'Met'],
    ['Social visits per week', '7.5', 'Grow', `20.2 (${N.social})`, 'Met'],
    ['Website orders', '0', '10', '3', 'Improved'],
    ['Visits from Lebanon per week', '56', '250', `108 (${N.lebanon})`, 'Improved'],
    ['Add-to-cart rate', pct(atcB), '4%', pct(atcC), 'Improved'],
    ['Website conversion rate', '0%', '1%', pct(K.orders / K.sessions, 2), 'Improved'],
  ]),
  spacer(),
)

// 9. Learnings
children.push(
  H1('9. What we learned'),
  numbered([b('Videos build trust, WhatsApp closes the sale. '), r(`${N.waShare} of orders were finished on WhatsApp. People watch a video, have a question, and want to talk to a person before paying. This seems to be simply how this customer prefers to buy.`)]),
  numbered([b('The website still needs work. '), r('Conversion on the site stayed below our 1% target. The fixes are small and practical: a clearer shop button, delivery terms shown early, and a shorter checkout.')]),
  numbered([b('Search and AI matter more than we expected. '), r('Search visits grew the most of any channel, and the largest delivered website order came through ChatGPT. Clear product titles and descriptions now pay off twice.')]),
  numbered([b('Demand is national. '), r('Orders came from Beirut, the Metn and the Bekaa. Delivery all over Lebanon turned out to be a real selling point.')]),
  numbered([b('Big orders need a quick confirmation. '), r('One large cash-on-delivery order was cancelled within minutes. A short WhatsApp message or call right after a big order would protect those sales.')]),
)

// 10. Recommendations
children.push(
  H1('10. Recommendations for the next 90 days'),
  P([b('December: fix and track. '), r('Allow checkout with a phone number only, untick the marketing box, rename the delivery option, change the homepage button to Shop now, replace AI renders with real photos of the 20 best sellers, and add proper tracking links to every post.')]),
  P([b('January: scale what worked. '), r('Keep three videos a week on TikTok, Instagram and Facebook, turn the most common WhatsApp questions into videos, and put a small monthly ad budget behind the best performing video. Introduce bundles such as a complete bathroom or a plumber pack.')]),
  P([b('February: own search and proof. '), r('Rewrite product titles for Google and AI search, post weekly on the Google profile, collect at least ten genuine reviews, and report orders by channel every month.')]),
)

// 11. Ethics
children.push(
  H1('11. Ethical and social dimensions'),
  P('We tried to grow the business responsibly. Customer data was used only to process orders, interviews were anonymised, and WhatsApp broadcasts went only to people who agreed to receive them. We only promoted real, standing offers such as free delivery over $30 and cash on delivery, with no fake discounts or countdowns. AI generated product visuals were labelled as illustrative, and we did not publish any invented reviews.'),
  P('For paid targeting, we used location and broad age only, and we deliberately avoided targeting by religion, sect, politics or any other sensitive trait, which matters a great deal in Lebanon. We also flagged one issue on the website: the checkout pre-ticks consent to marketing emails. We recommended making that opt in.'),
  P('The project also matters locally. A family business in the Bekaa can now sell across the country, which supports its staff and the plumbers who depend on it, at a time when the Lebanese economy is under real pressure.'),
)

// 12. Teamwork
children.push(
  H1('12. Teamwork and reflection'),
  P('We organised ourselves like a small agency, with one person leading the client relationship, one on research, one on brand and design, one on video and one on analytics. We met every week to look at the numbers, decide what to change and divide the work. Every post was reviewed by a teammate before it went to the owner for approval.'),
  P('Looking back, the biggest surprise was how much the business depends on conversation. We started the project thinking the goal was website orders. By the end, we understood that the website is where trust is built and WhatsApp is where the sale happens. If we did it again, we would set up tracking and the WhatsApp order log on day one, and we would test the checkout ourselves before the campaign started rather than in the middle of it.'),
  P('The project also connected directly to the course outcomes. We used real data to solve a business problem, worked as a team under real deadlines, made ethical choices about data and targeting, and learned to present our work clearly to a business owner who cares about results, not theory.'),
)

// 13. Conclusion
children.push(
  H1('13. Conclusion'),
  P('Twainy Plast came to us with a working online store and no buyers for its bathroom range. Four weeks later, it had 23 orders, a clear brand promise, an active presence on three platforms and a much better understanding of how its customers want to buy. The work is not finished. The website still needs to convert better, and the next step is to make social media, WhatsApp and the store work as one journey. Still, the business now has something solid to build on: real data, a clear message and videos that people actually watch.'),
)

// Appendix
children.push(
  H1('Appendix: data sources and definitions'),
  bullet(`Website data: Shopify Analytics, launch period ${BASE} and campaign period ${CAMP}, 2026. Growth figures compare weekly averages.`),
  bullet('WhatsApp orders: the store’s own order log, 20 orders over 14 days.'),
  bullet('Instagram figures: the account dashboard on November 21, 2026.'),
  bullet('Competitor figures: public Instagram and Facebook profiles, company websites and Lebanese business directories, November 2026.'),
  bullet('Brand information: twainyplast.com About page and the brands’ own websites.'),
  bullet('Revenue figures are not shown in this report at the client’s request.'),
)

const doc = new Document({
  creator: team.length ? team.join(', ') : 'MKT 843 consulting team',
  title: 'From Visitors to Customers: Twainy Plast final report',
  styles: {
    default: { document: { run: { font: 'Calibri', size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 32, bold: true, color: GREEN, font: 'Calibri' }, paragraph: { spacing: { before: 360, after: 160 }, keepNext: true, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 25, bold: true, color: LEAF, font: 'Calibri' }, paragraph: { spacing: { before: 240, after: 100 }, keepNext: true, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: 'dots', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 240 } } } }] },
      { reference: 'steps', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 300 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1300, bottom: 1300, left: 1440, right: 1440 } }, titlePage: true },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [r('Twainy Plast · MKT 843 final report', { size: 16, color: GREY })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GREY })] })] }) },
    children,
  }],
})

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf)
  console.log('wrote', OUT)
})
