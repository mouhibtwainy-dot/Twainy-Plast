export const barriers = [
  {
    barrier: 'Visitors have little purchase intent',
    evidence: '91% direct traffic and 40% from the US. The audience is mostly curious contacts and bots, not Lebanese shoppers.',
    status: 'Supported by analytics',
    test: 'Geo-targeted Lebanon content and ads linking to product pages',
  },
  {
    barrier: 'Shoppers need more confidence',
    evidence: 'Main images are generated renders, there are no reviews, and no store or people are shown.',
    status: 'Observed. Validate in interviews.',
    test: 'Real store footage, real product photos, genuine reviews',
  },
  {
    barrier: 'Product information is insufficient',
    evidence: 'Duplicate titles, no fit or size guidance on mixers.',
    status: 'Observed. Validate in usability test.',
    test: 'Fit guides, comparison carousels, clearer specs',
  },
  {
    barrier: 'Delivery or payment terms cause hesitation',
    evidence: 'Terms are not visible before checkout.',
    status: 'Hypothesis',
    test: 'Delivery and payment bar on product pages, FAQ post',
  },
  {
    barrier: 'Checkout is hard to complete',
    evidence: '1 checkout attempt and 0 orders. Too small a sample to judge.',
    status: 'Unknown. Run a test order.',
    test: 'End-to-end mobile test order, fix whatever breaks',
  },
  {
    barrier: 'Customers want advice before buying',
    evidence: 'Category norm: plumbers recommend products, people buy in person.',
    status: 'Hypothesis',
    test: 'Tracked "Ask before ordering" WhatsApp route',
  },
]

export const competitorSlots = [
  { slot: 'Direct #1', type: 'Lebanese sanitary-ware showroom with an active Instagram account', why: 'Same products, same buyers' },
  { slot: 'Direct #2', type: 'Online-first plumbing or sanitary seller (Instagram + WhatsApp orders)', why: 'Same digital buying journey' },
  { slot: 'Indirect', type: 'Home-improvement or hardware retailer', why: 'Competes for the same renovation budget' },
]

export const auditMetrics = [
  'Platforms and followers',
  'Posts / 30 days',
  'Format mix (Reels, carousels, images)',
  'Theme mix (product, education, offer, people)',
  'Engagement rate by followers',
  'Share of voice (posts and engagement)',
  'Top hashtags',
  'Prices / delivery shown?',
  'Purchase path and DM response time',
  'Comment sentiment (last 50)',
]

export type Persona = {
  name: string
  role: string
  goal: string
  quote: string
  demographics: string[]
  psychographics: string[]
  pains: string[]
  social: { label: string; value: string }[]
  validation: string
}

export const personas: Persona[] = [
  {
    name: 'Rania, 34',
    role: 'Homeowner renovating her bathroom',
    goal: 'Buy online with confidence',
    quote: '"I can see it’s pretty, but will it fit my sink, and will it actually arrive?"',
    demographics: [
      'Lives within ~30 km of the store (Greater Beirut / Mount Lebanon: confirm radius)',
      'Middle-income household, partly USD-earning (~$1,200–2,500 / month)',
      'Teacher, bank or NGO employee; married, 1–2 children',
    ],
    psychographics: [
      'Wants a modern home that looks good on a careful budget',
      'Researches a lot before spending; saves ideas',
      'Distrusts "too good to be true" prices; values honest sellers',
    ],
    pains: [
      'Can’t judge quality from a photo',
      'Unsure about sizes and connections',
      'Worried about delivery, damage and returns',
      'Plumber pushes his own supplier',
    ],
    social: [
      { label: 'Platforms', value: 'Instagram (primary), Facebook groups, Pinterest, WhatsApp' },
      { label: 'Active hours', value: '13:00–14:00 and 21:00–23:00' },
      { label: 'Formats', value: 'Reels, before/after carousels, saved guides' },
      { label: 'Follows', value: 'Lebanese home-décor and renovation micro-creators (10–50k), to be named from interviews' },
    ],
    validation: 'Hypothesis. Validate with 6–8 homeowner interviews, the survey and Instagram audience insights.',
  },
  {
    name: 'Hassan, 45',
    role: 'Plumber / small contractor',
    goal: 'Request a quote on WhatsApp',
    quote: '"Just tell me if you have it, the price today, and when I can pick it up."',
    demographics: [
      'Works in the store’s district and neighbouring areas',
      'Self-employed, variable income, 2–4 jobs per week',
      'Buys for clients; repeat buyer if the supply is reliable',
    ],
    psychographics: [
      'Values reliability, speed and a fair trade price',
      'Recommends brands he trusts; his reputation is on the line',
      'Practical; prefers short and technical over pretty',
    ],
    pains: [
      'Wasted trips to check stock',
      'Prices change with the exchange rate',
      'Needs exact specs (½", head, flow) fast',
      'Slow replies from suppliers',
    ],
    social: [
      { label: 'Platforms', value: 'WhatsApp (primary), Facebook, YouTube/TikTok how-tos' },
      { label: 'Active hours', value: '06:30–08:00 and 20:00–22:00' },
      { label: 'Formats', value: 'WhatsApp catalogue and price list, short demo clips, spec sheets' },
      { label: 'Follows', value: 'Plumbing how-to channels, supplier pages, trade groups (to collect)' },
    ],
    validation: 'Hypothesis. Validate with 4 plumber interviews and WhatsApp inquiry logs.',
  },
]

export const brand = {
  positioning:
    'Twainy Plast helps homeowners and professionals choose suitable bathroom and plumbing products through clear information, practical advice and dependable local service.',
  promise: 'Choose with confidence: اختار بثقة',
  personality: ['Knowledgeable', 'Honest', 'Neighbourly', 'Practical'],
  voice: [
    { context: 'Product education', tone: 'Clear, expert, step by step', example: 'قبل ما تشتري خلاط، قيس هالـ ٣ شغلات.' },
    { context: 'Offers', tone: 'Direct, with exact terms, no hype', example: 'توصيل مجاني لحد ٢٥ تشرين الثاني، عالخلاطات المختارة بس.' },
    { context: 'Complaints', tone: 'Calm, accountable, quick to move to DM', example: 'حقك علينا. بعتنالك رسالة لنحلّها اليوم.' },
    { context: 'Plumbers', tone: 'Short, technical, respectful', example: 'متوفر. ½ إنش، تركيب حائط. السعر $30.' },
  ],
  doSay: ['Exact prices and sizes', 'Real photos and people', '"Ask us before you order"', 'Lebanese Arabic + English product names'],
  dontSay: ['"Best in Lebanon" without proof', 'Fake urgency ("only today!")', 'Invented discounts or reviews', '"Made in Lebanon" unless verified'],
  colors: [
    { name: 'Deep Navy', hex: '#0B2545', use: 'Headlines, trust' },
    { name: 'Water Blue', hex: '#1B8EC9', use: 'Brand accent, links' },
    { name: 'Aqua Mist', hex: '#E6F4FB', use: 'Backgrounds' },
    { name: 'Chrome', hex: '#8D99AE', use: 'Lines, secondary text' },
    { name: 'Copper', hex: '#D9692B', use: 'CTAs and offers only' },
  ],
  type: [
    { role: 'Headlines (AR + EN)', family: 'Cairo Bold' },
    { role: 'Body (AR + EN)', family: 'Cairo / Inter Regular' },
  ],
  assets: [
    'Product on white or aqua with a soft blue shadow',
    'Water-drop line icon as a series marker',
    'Copper pill for prices and CTAs',
    'Existing Twainy Plast logo, unchanged (confirm files with the owner)',
  ],
}

export const communityGuidelines = [
  'Reply to comments and DMs within 1 hour during store hours, and by 10:00 the next day after hours.',
  'Answer price questions publicly with the exact price and a product link. Never "DM for price".',
  'Move order details, addresses and phone numbers to DM or WhatsApp. Never ask for them in public comments.',
  'Never delete negative comments. Hide only spam, insults or personal data, and log every hidden comment.',
  'Correct mistakes publicly and say what was fixed.',
  'Repost customer photos only with written permission, and credit them.',
]

export const channels = [
  { name: 'Instagram', role: 'Primary: discovery, demos, trust', why: 'Rania’s main platform; Reels reach non-followers; shoppable product tags', kpi: 'Reach, saves, link clicks' },
  { name: 'Facebook', role: 'Secondary: older homeowners, local groups', why: 'Same Meta ads account; FB already sends the most social sessions (9)', kpi: 'Reach, link clicks' },
  { name: 'WhatsApp Business', role: 'Advice, quotes, assisted orders', why: 'Hassan’s primary tool; Lebanon’s default messaging app', kpi: 'Inquiries, reply time, assisted orders' },
  { name: 'Google Business Profile', role: 'Local search, maps, reviews', why: '"Near me" searches with high intent; only 2% search traffic today', kpi: 'Views, calls, directions, reviews' },
  { name: 'twainyplast.com', role: 'Comparison and checkout', why: 'Owns the transaction and the data; GA4 + Pixel', kpi: 'Sessions, add to cart rate, orders' },
]

export const deferredChannels = [
  { name: 'TikTok', why: 'Deferred: limited team capacity, persona fit not yet validated. Repurpose the Reels in week 4 as a no-cost test.' },
  { name: 'LinkedIn', why: 'Excluded: neither persona looks for plumbing supplies there. Revisit for contractor B2B later.' },
]

export const seoKeywords = [
  { kw: 'أدوات صحية [المنطقة]', intent: 'Local' },
  { kw: 'خلاط مطبخ سعر لبنان', intent: 'Transactional' },
  { kw: 'مراية حمام LED', intent: 'Product' },
  { kw: 'sanitary ware Lebanon', intent: 'Category' },
  { kw: 'kitchen faucet price Lebanon', intent: 'Transactional' },
  { kw: 'LED bathroom mirror Lebanon', intent: 'Product' },
  { kw: 'water pump 1 hp price Lebanon', intent: 'Transactional' },
  { kw: 'plumbing supply store near me', intent: 'Local' },
]

export const gbpChecklist = [
  'Primary category: Bathroom supply store. Secondary: Plumbing supply store.',
  'Exact pin, hours, phone, WhatsApp, website with UTM (utm_source=google&utm_medium=organic&utm_campaign=gbp)',
  '20+ real photos: storefront, interior, aisles, team, hero products',
  'Products section: the 6 campaign hero items with prices and links',
  'Weekly Google post that mirrors the week’s campaign theme',
  'Seed Q&A with real FAQs (delivery, payment, warranty)',
  'Short review link sent on WhatsApp after every delivery',
]

export const whatsapp = {
  setup: [
    'Business profile: address, hours, website, category, catalogue',
    'Catalogue: the 6 hero products plus top sellers, each with a price and a website link',
    'Labels: New inquiry · Quote sent · Ordered · Plumber · Follow-up',
    'Broadcast lists, opt-in only: Homeowners (updates and offers) · Plumbers (weekly price and stock list)',
  ],
  greeting: 'أهلا فيك بتويني بلاست 👋 قلّنا شو عم تدوّر عليه (أو ابعتلنا صورة)، ومنردّ عليك بأسرع وقت. Hello! Tell us what you need, or send a photo.',
  away: 'هلق نحنا مسكّرين. منردّ عليك الصبح من الساعة ٨. فيك تطلب أونلاين: twainyplast.com',
  quickReplies: [
    { cmd: '/delivery', text: 'التوصيل لـ[المناطق] خلال [١–٣] أيام، كلفته $[x]. Delivery to [areas] in [1–3] days, $[x].' },
    { cmd: '/payment', text: 'الدفع كاش عند الاستلام أو [Whish / بطاقة]. Cash on delivery or [Whish / card].' },
    { cmd: '/size', text: 'ابعتلنا صورة للمغسلة وقياس الفتحة، ومنقلّك شو بيركب. Send a photo and the hole size and we’ll tell you what fits.' },
  ],
}

export const igProfile = {
  handle: 'twainyplast',
  name: 'Twainy Plast | تويني بلاست',
  category: 'Home improvement',
  bio: [
    'أدوات صحية • خلاطات • مرايا LED 🇱🇧',
    'Sanitary ware, mixers & LED mirrors',
    '🚚 Delivery to [areas] · 💬 Ask before you order',
    '⬇️ Shop & WhatsApp',
  ],
  location: '[Store address, Lebanon]',
  highlights: ['Mixers', 'Mirrors', 'How to order', 'Delivery', 'Reviews', 'Our store'],
  links: [
    { label: '🛒 Choose with Confidence picks', dest: '/collections/choose-with-confidence' },
    { label: '💬 Ask before you order (WhatsApp)', dest: 'wa.me/961XXXXXXXX?text=…' },
    { label: '📏 Mixer and mirror size guide', dest: '/pages/size-guide' },
    { label: '📍 Visit the store (Google Maps)', dest: 'GBP link' },
    { label: '⭐ Leave a review', dest: 'GBP review link' },
  ],
}

export const funnelStages = [
  { stage: 'Awareness', weeks: 'Week 1', goal: 'Show the real store and people', content: 'Reel 1 · store and team posts · GBP launch', kpi: 'Reach, 3-sec views, profile visits', paid: 'Video views, Lebanon, 25–55' },
  { stage: 'Consideration', weeks: 'Week 2', goal: 'Help shoppers choose', content: 'Reel 2 · comparison and size carousels · FAQ', kpi: 'Saves, shares, link CTR, WhatsApp inquiries', paid: 'Traffic A/B: Reel vs carousel' },
  { stage: 'Conversion', weeks: 'Week 3', goal: 'Make buying easy, with a clear offer', content: 'Reel 3 · offer post · product tags', kpi: 'Add to cart rate, checkouts, orders, CAC', paid: 'Winner creative + retargeting of video viewers and site visitors' },
  { stage: 'Retention & proof', weeks: 'Week 4', goal: 'Answer what is left, gather proof, improve', content: 'Customer story · Q&A · reviews', kpi: 'Reviews, repeat inquiries, broadcast opt-ins', paid: 'Retargeting only' },
]

export const pillars = [
  { name: 'Choose Right', ar: 'اختار صح', share: '35%', desc: 'Product education: fit, size, comparisons, care tips', formats: 'Carousels, Reels, Story quizzes' },
  { name: 'Inside Twainy', ar: 'من جوّا', share: '25%', desc: 'People, store and behind the scenes: packing, deliveries, the family story', formats: 'Reels, Stories' },
  { name: 'Real Homes', ar: 'بيوت حقيقية', share: '20%', desc: 'Customer proof: genuine reviews and installed projects (with permission)', formats: 'Carousels, Stories, Reels' },
  { name: 'Order Easy', ar: 'اطلب بسهولة', share: '20%', desc: 'Offers and direct response: prices, delivery, how to order', formats: 'Static, Stories with link, ads' },
]

export type CalendarItem = {
  day: string
  platform: string
  format: string
  pillar: string
  title: string
  cta: string
  asset?: string
}

export const calendarWeeks: { week: string; dates: string; theme: string; items: CalendarItem[] }[] = [
  {
    week: 'Week 1',
    dates: 'Oct 29 – Nov 4',
    theme: 'Establish trust',
    items: [
      { day: 'Thu 21:00', platform: 'IG + FB', format: 'Reel', pillar: 'Inside Twainy', title: 'Meet Twainy Plast: the people behind the store', cta: 'Follow + visit site', asset: 'Reel 1' },
      { day: 'Fri 13:00', platform: 'IG Stories', format: 'Story ×3', pillar: 'Inside Twainy', title: 'Morning at the store: poll "Renovating soon?"', cta: 'Poll / reply' },
      { day: 'Sat 21:00', platform: 'IG + FB', format: 'Carousel', pillar: 'Order Easy', title: 'How to order: website or WhatsApp in 3 steps', cta: 'Save + link in bio', asset: 'Post 3' },
      { day: 'Mon 08:00', platform: 'WhatsApp', format: 'Broadcast', pillar: 'Order Easy', title: 'Plumbers: weekly stock and price list (opt-in)', cta: 'Reply to order' },
      { day: 'Tue 21:00', platform: 'IG + FB', format: 'Single image', pillar: 'Inside Twainy', title: 'The storefront: where to find us (location tag)', cta: 'Get directions' },
      { day: 'Wed', platform: 'Google', format: 'GBP post', pillar: 'Inside Twainy', title: 'We’re online: shop twainyplast.com', cta: 'Visit website' },
    ],
  },
  {
    week: 'Week 2',
    dates: 'Nov 5 – Nov 11',
    theme: 'Help customers choose',
    items: [
      { day: 'Thu 21:00', platform: 'IG + FB', format: 'Reel', pillar: 'Choose Right', title: '3 things to check before buying a mixer', cta: 'Save + shop mixers', asset: 'Reel 2' },
      { day: 'Fri 13:00', platform: 'IG Stories', format: 'Quiz', pillar: 'Choose Right', title: 'Quiz: which mixer fits a vessel basin?', cta: 'Tap the link' },
      { day: 'Sat 21:00', platform: 'IG + FB', format: 'Carousel', pillar: 'Choose Right', title: 'Short Neck vs Tall Neck: which fits your sink?', cta: 'Shop Brax', asset: 'Post 1' },
      { day: 'Mon 08:00', platform: 'WhatsApp', format: 'Broadcast', pillar: 'Order Easy', title: 'Plumbers: Brax stock update and specs PDF', cta: 'Reply for a quote' },
      { day: 'Tue 21:00', platform: 'IG + FB', format: 'Carousel', pillar: 'Choose Right', title: 'Mirror size guide: 60×60, 70×50 or 120×60?', cta: 'Shop LED mirrors', asset: 'Post 2' },
      { day: 'Wed', platform: 'Google', format: 'GBP post', pillar: 'Choose Right', title: 'Mixer buying guide (link to site)', cta: 'Learn more' },
    ],
  },
  {
    week: 'Week 3',
    dates: 'Nov 12 – Nov 18',
    theme: 'Encourage purchases',
    items: [
      { day: 'Thu 21:00', platform: 'IG + FB', format: 'Static', pillar: 'Order Easy', title: 'Choose with Confidence: free delivery on campaign picks (terms)', cta: 'Shop now', asset: 'Post 5' },
      { day: 'Fri 21:00', platform: 'IG + FB', format: 'Reel', pillar: 'Order Easy', title: 'From click to your door: ordering an LED mirror', cta: 'Order online', asset: 'Reel 3' },
      { day: 'Sat 13:00', platform: 'IG Stories', format: 'Story + link', pillar: 'Order Easy', title: 'Offer countdown sticker (true end date)', cta: 'Link sticker' },
      { day: 'Mon 08:00', platform: 'WhatsApp', format: 'Broadcast', pillar: 'Order Easy', title: 'Homeowners list: offer with terms and product links', cta: 'Order / ask' },
      { day: 'Tue 21:00', platform: 'IG + FB', format: 'Carousel', pillar: 'Order Easy', title: 'Delivery and payment FAQ', cta: 'Ask on WhatsApp', asset: 'Post 3 (v2)' },
      { day: 'Wed', platform: 'Google', format: 'GBP offer', pillar: 'Order Easy', title: 'Offer post mirroring Instagram', cta: 'Order online' },
    ],
  },
  {
    week: 'Week 4',
    dates: 'Nov 19 – Nov 25',
    theme: 'Address hesitation and improve',
    items: [
      { day: 'Thu 21:00', platform: 'IG + FB', format: 'Carousel', pillar: 'Real Homes', title: 'A real bathroom, installed (customer story, with consent)', cta: 'Get the look', asset: 'Post 4' },
      { day: 'Fri 13:00', platform: 'IG Stories', format: 'Q&A box', pillar: 'Choose Right', title: 'Ask us anything: answers from the week’s top questions', cta: 'Reply' },
      { day: 'Sat 21:00', platform: 'IG + FB', format: 'Single image', pillar: 'Inside Twainy', title: 'Independence Day (Nov 22): thank you to local customers and plumbers', cta: 'None (community)' },
      { day: 'Sun 21:00', platform: 'TikTok', format: 'Repost ×3', pillar: 'All', title: 'Repurpose Reels 1–3 (organic test)', cta: 'Link in bio' },
      { day: 'Mon 08:00', platform: 'WhatsApp', format: 'Message', pillar: 'Real Homes', title: 'Review request to every buyer', cta: 'Leave a Google review' },
      { day: 'Tue 21:00', platform: 'IG + FB', format: 'Reel (remix)', pillar: 'Choose Right', title: 'Re-cut of the best-performing Reel with a new hook', cta: 'Shop' },
    ],
  },
]

export const hashtagSets = [
  { name: 'Core (every post)', tags: '#TwainyPlast #تويني_بلاست #اختار_بثقة #ChooseWithConfidence' },
  { name: 'Category', tags: '#خلاطات #مرايا_حمامات #أدوات_صحية #BathroomDesign #KitchenFaucet #LEDMirror' },
  { name: 'Local', tags: '#Lebanon #لبنان #Beirut #LebanonRenovation #ترميم #ديكور_لبناني' },
  { name: 'Rule', tags: '3–5 core and category tags plus 2 local tags. Review every week using reach-from-hashtags in Insights.' },
]

export type Shot = { t: string; visual: string; text: string; audio: string }
export type Reel = {
  id: string
  title: string
  week: string
  objective: string
  length: string
  hook: string
  hookAr: string
  audio: string
  shots: Shot[]
  caption: string
  cta: string
}

export const reels: Reel[] = [
  {
    id: 'Reel 1',
    title: 'Meet Twainy Plast',
    week: 'Week 1 · Awareness',
    objective: 'Trust: prove a real store with real people stands behind the website',
    length: '25–30 s, 9:16',
    hook: 'Before you buy a faucet online… meet who’s selling it.',
    hookAr: 'قبل ما تشتري خلاط أونلاين… تعرّف مين عم يبيعك.',
    audio: 'Original voice-over by the owner, plus a soft upbeat track from Instagram’s licensed library (choose a trending one that week at 10–20% volume).',
    shots: [
      { t: '0–2 s', visual: 'Close-up: a hand turns on a chrome mixer and water flows; quick cut to the owner facing the camera', text: 'قبل ما تشتري أونلاين…', audio: 'Hook line (VO)' },
      { t: '2–7 s', visual: 'Walk-in shot from the street to the storefront sign', text: 'Twainy Plast · since [year]', audio: '"We’ve been serving [area] since [year]…"' },
      { t: '7–14 s', visual: 'Fast cuts down the aisles: mixers, LED mirrors switching colour, pumps', text: '175+ products', audio: 'Music up' },
      { t: '14–20 s', visual: 'Team member answers a WhatsApp message, then packs an order in bubble wrap', text: 'Ask before you order 💬', audio: '"Not sure what fits? Ask us first."' },
      { t: '20–26 s', visual: 'Phone screen: twainyplast.com product page, then a delivery handover at a door', text: 'Order online · delivered to your door', audio: '"Order online or on WhatsApp."' },
      { t: '26–30 s', visual: 'End card: logo, website, WhatsApp icon', text: 'twainyplast.com', audio: 'Sonic tag (tap of water)' },
    ],
    caption: 'تعرّفوا علينا 👋 محل عائلي بـ[المنطقة]، وهلّق صرنا أونلاين. إسألونا قبل ما تطلبوا! Meet the family behind Twainy Plast. Now online, still here to advise.',
    cta: 'Follow + link in bio',
  },
  {
    id: 'Reel 2',
    title: '3 things to check before buying a mixer',
    week: 'Week 2 · Consideration',
    objective: 'Education: reduce fit anxiety and earn saves and shares',
    length: '20–25 s, 9:16',
    hook: 'This is why your new mixer doesn’t fit.',
    hookAr: 'هيدا ليش الخلاط الجديد ما ركب عندك.',
    audio: 'Team voice-over in Lebanese Arabic; "3-step countdown" trending audio format with burned-in subtitles.',
    shots: [
      { t: '0–2 s', visual: 'Mixer that is obviously too short over a vessel basin, with water splashing on the counter', text: '❌ غلط', audio: 'Hook (VO)' },
      { t: '2–8 s', visual: 'Tape measure on the ½" connection', text: '1 · Connection size (½")', audio: '"First: the connection, usually half an inch."' },
      { t: '8–14 s', visual: 'Split screen: wall-mounted vs deck-mounted', text: '2 · Wall or deck mount?', audio: '"Second: wall or counter?"' },
      { t: '14–20 s', visual: 'Brax Short Neck ($25) vs Brax Kore 25 cm ($65) next to a vessel basin', text: '3 · Spout height vs basin', audio: '"Third: tall basin, tall mixer."' },
      { t: '20–25 s', visual: 'Correct mixer, water lands in the centre; end card', text: 'Save this 📌 · Shop mixers', audio: '"Not sure? Send us a photo."' },
    ],
    caption: '٣ شغلات لازم تقيسها قبل ما تشتري خلاط 📏 احفظ البوست لوقت الترميم! Save this before your renovation. Sizes and prices at the link in bio.',
    cta: 'Save + shop mixers',
  },
  {
    id: 'Reel 3',
    title: 'From click to your door',
    week: 'Week 3 · Conversion',
    objective: 'Remove purchase friction: show ordering, payment and delivery are easy',
    length: '20–30 s, 9:16',
    hook: 'Ordering a mirror online in Lebanon? Watch this.',
    hookAr: 'بدك تطلب مراية أونلاين؟ شوف كيف بتوصلك.',
    audio: 'Screen-recording sounds (taps) with an upbeat trending instrumental and a short text-to-speech or VO line.',
    shots: [
      { t: '0–2 s', visual: '120×60 Wave LED mirror switching between 3 light colours', text: '$60 · 3 light colours', audio: 'Hook' },
      { t: '2–10 s', visual: 'Screen recording on a phone: product page, delivery bar, add to cart, checkout', text: '3 taps to order', audio: 'Tap sounds' },
      { t: '10–15 s', visual: 'Store: mirror wrapped in protective packaging, labelled', text: 'Packed with care', audio: '—' },
      { t: '15–22 s', visual: 'Delivery handover; customer pays cash on delivery (if offered)', text: 'Pay on delivery 💵', audio: 'VO: "Delivered in [1–3] days."' },
      { t: '22–30 s', visual: 'Mirror installed and lit in a real bathroom; end card with the offer and its terms', text: 'Free delivery on campaign picks until Nov 25*', audio: 'Music out' },
    ],
    caption: 'من الكبسة لباب البيت 🚚 اطلب أونلاين وادفع عند الاستلام. *Free delivery on selected mixers and LED mirrors to [areas] until Nov 25. Terms in the link.',
    cta: 'Order online',
  },
]

export const budget = {
  total: 200,
  lines: [
    { phase: 'Week 1: Awareness', objective: 'Video views (ThruPlay), Reel 1', amount: 30, audience: 'Lebanon, [radius] km around the store, 25–55, broad (no detailed targeting)' },
    { phase: 'Week 2: A/B test', objective: 'Traffic (landing page views), Reel 2 vs Carousel 1', amount: 70, audience: 'Same geo; split evenly, $35 per creative' },
    { phase: 'Weeks 3–4: Scale', objective: 'Traffic or Sales (once the Pixel has events), winning creative + Reel 3', amount: 70, audience: 'Same geo + Advantage+ audience' },
    { phase: 'Weeks 3–4: Retarget', objective: 'Traffic to the cart or product page, offer post', amount: 30, audience: 'Video viewers 50%+, IG/FB engagers, site visitors (30 days)' },
  ],
  rules: [
    'Decision rule after week 2: shift budget to the creative with the lower cost per landing page view and the higher add-to-cart rate. Don’t judge on likes.',
    'Pause any ad set with a frequency above 3 or a link CTR below 0.5% after $15 spent.',
    'All links tagged with UTMs: utm_source=meta&utm_medium=paid&utm_campaign=cwc&utm_content=[creative].',
  ],
}

export const kpis = [
  { layer: 'Reach', metric: 'Reach (Lebanon)', formula: 'Unique accounts reached', tool: 'Meta Business Suite', target: '25,000' },
  { layer: 'Engagement', metric: 'Engagement rate by reach (ERR)', formula: '(likes + comments + shares + saves) ÷ reach × 100', tool: 'IG/FB Insights', target: '≥ 3%' },
  { layer: 'Engagement', metric: 'Saves + shares', formula: 'Count per post', tool: 'IG Insights', target: '≥ 20 per education post' },
  { layer: 'Traffic', metric: 'Link CTR', formula: 'Link clicks ÷ impressions × 100', tool: 'Ads Manager', target: '≥ 1%' },
  { layer: 'Traffic', metric: 'Sessions from Lebanon', formula: 'GA4 sessions, country = LB', tool: 'GA4 + Shopify', target: '1,000 (baseline: 120 in 14 days)' },
  { layer: 'Conversion', metric: 'Add-to-cart rate', formula: 'Sessions with cart ÷ sessions', tool: 'Shopify / GA4 add_to_cart', target: '4% (baseline 1.1%)' },
  { layer: 'Conversion', metric: 'Conversion rate', formula: 'Orders ÷ sessions', tool: 'Shopify / GA4 purchase', target: '1%, about 10 orders' },
  { layer: 'Conversion', metric: 'WhatsApp inquiries and assisted orders', formula: 'Labelled chats; orders logged once', tool: 'WhatsApp Business labels + sheet', target: '40 inquiries · 8 orders' },
  { layer: 'Efficiency', metric: 'CAC', formula: 'Acquisition spend ÷ new customers', tool: 'Sheet (ads + orders)', target: '≤ $20' },
  { layer: 'Efficiency', metric: 'ROAS', formula: 'Attributed revenue ÷ ad spend', tool: 'Ads Manager + Shopify', target: '≥ 2.5 (test)' },
  { layer: 'Service', metric: 'Median reply time', formula: 'Median of first-response times', tool: 'Meta inbox + WhatsApp log', target: '< 1 hour' },
  { layer: 'Proof', metric: 'Google reviews', formula: 'New genuine reviews', tool: 'GBP', target: '10' },
]

export const tracking = [
  { tool: 'Shopify Analytics', role: 'Source of truth for sessions, funnel, orders and revenue' },
  { tool: 'GA4 (Google & YouTube app)', role: 'view_item → add_to_cart → begin_checkout → purchase; UTM source / medium / campaign reports; exclude internal traffic' },
  { tool: 'Meta Pixel + Conversions API (Facebook & Instagram app)', role: 'Ad attribution, retargeting audiences, optimising for events' },
  { tool: 'Meta Business Suite', role: 'Organic reach, ERR, saves, follower growth, inbox response time' },
  { tool: 'WhatsApp Business', role: 'Labels per chat; each assisted order logged in a sheet with its order number, so no order is counted twice' },
  { tool: 'Google Business Profile', role: 'Searches, views, calls, direction requests, reviews' },
]

export const ethics = [
  { title: 'Data privacy and consent', body: 'Turn on Shopify’s cookie consent banner so the Pixel and GA4 respect each shopper’s choice. Broadcast lists are opt-in only. Interview notes are anonymised. The plan follows Lebanon’s Law 81/2018 on e-transactions and personal data.' },
  { title: 'Honest offers', body: 'Real end dates, no fake "was" prices, no false scarcity. Every offer post states its terms (products, areas, dates).' },
  { title: 'Authentic proof', body: 'No fake or incentivised reviews. Customer photos are used only with written consent. Generated product renders are labelled "illustrative image" until real photos replace them.' },
  { title: 'Ethical ad targeting', body: 'Geographic and broad targeting only. No targeting by religion, sect, politics, health or other sensitive traits. Nothing aimed at under-18s.' },
  { title: 'Respectful community management', body: 'Never delete criticism. Resolve complaints in DM within 24 hours and post a public follow-up.' },
  { title: 'Local impact', body: 'Supports a family business, its employees and the local plumbers who rely on it, in a hard economy. "Made in Lebanon" is claimed only for products whose origin is verified, and Twainy is presented accurately as a retailer.' },
]

export const timeline = [
  { date: 'Oct 22', item: 'Brief + owner consent submitted' },
  { date: 'Oct 22–28', item: 'Week 0: competitor audit, interviews, mobile test, P1 store fixes, GA4/Pixel, content production' },
  { date: 'Oct 29 – Nov 25', item: '4-week campaign live, with weekly optimisation reviews every Wednesday' },
  { date: 'Nov 25', item: 'Data freeze, results analysis' },
  { date: 'Nov 26 / Dec 3', item: 'Executive presentation + Q&A' },
]

export const team = [
  { role: 'Engagement lead', owns: 'Client relationship, consent, timeline, final deck' },
  { role: 'Research & insights', owns: 'Competitor audit, interviews, personas, social listening' },
  { role: 'Brand & creative', owns: 'Identity, profile mockups, 5 posts and carousels' },
  { role: 'Video producer', owns: '3 Reels: storyboard, shoot, edit, subtitles' },
  { role: 'Media & analytics', owns: 'GA4, Pixel, UTMs, paid test, KPI dashboard, ROI model' },
]
