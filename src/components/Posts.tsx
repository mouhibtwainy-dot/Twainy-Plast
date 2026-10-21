import type { ReactNode } from 'react'
import { heroProducts } from '../data/products'
import { Logo } from './Logo'

const [tallNeck, shortNeck, kore, , wave, round] = heroProducts

export type PostSpec = {
  id: string
  title: string
  format: string
  pillar: string
  slides?: string[]
  caption: string
  hashtags: string
  art: ReactNode
}

export const posts: PostSpec[] = [
  {
    id: 'Post 1',
    title: 'Short Neck vs Tall Neck',
    format: 'Carousel · 5 slides · 4:5',
    pillar: 'Choose Right',
    slides: ['Cover: the question', 'Short Neck ($25): standard basins', 'Tall Neck ($30): deep sinks and kitchens', 'Measure: basin height + 10 cm rule', 'CTA: send us a photo on WhatsApp'],
    caption: 'قصير ولا طويل؟ 🤔 الجواب بيتوقف على المغسلة. اسحب لتعرف أيّا بيناسبك 👉 Short or tall? It depends on your basin. Swipe to find out.',
    hashtags: '#TwainyPlast #اختار_بثقة #خلاطات #KitchenFaucet #Lebanon',
    art: (
      <div className="post post-45 navy">
        <Logo />
        <h4 dir="rtl">قصير ولا طويل؟</h4>
        <p className="post-sub">Short neck or tall neck?</p>
        <div className="post-duo">
          {[shortNeck, tallNeck].map((p) => (
            <figure key={p.handle}>
              <img src={p.image} alt={p.title} />
              <figcaption>
                {p.title.replace('Brax ', '')}
                <span className="pill">${p.price}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <span className="post-swipe">اسحب ← Swipe</span>
      </div>
    ),
  },
  {
    id: 'Post 2',
    title: 'LED mirror size guide',
    format: 'Carousel · 4 slides · 4:5',
    pillar: 'Choose Right',
    slides: ['Cover: the 3 sizes drawn to scale', 'Which wall width suits which size', '3 light colours explained', 'CTA: shop LED mirrors'],
    caption: 'شو القياس المناسب لحمّامك؟ 📏 ٣ قياسات، ٣ ألوان إضاءة. Which size fits your bathroom? Three sizes, three light colours.',
    hashtags: '#TwainyPlast #مرايا_حمامات #LEDMirror #BathroomDesign #لبنان',
    art: (
      <div className="post post-45 mist">
        <Logo />
        <h4>Which mirror fits?</h4>
        <p className="post-sub" dir="rtl">أي قياس بيناسب حمّامك؟</p>
        <div className="mirror-scale">
          <div className="m m-60r"><span>60×60<br />$40</span></div>
          <div className="m m-7050"><span>70×50<br />$45</span></div>
          <div className="m m-12060"><span>120×60<br />$60</span></div>
        </div>
        <p className="post-foot">Drawn to scale · 3 light colours</p>
      </div>
    ),
  },
  {
    id: 'Post 3',
    title: 'How to order + delivery & payment FAQ',
    format: 'Carousel · 5 slides · 4:5',
    pillar: 'Order Easy',
    slides: ['Cover: 3 ways to order', 'Delivery areas, time, fee', 'Payment options', 'Returns and warranty (owner to confirm)', 'CTA: still unsure? WhatsApp'],
    caption: 'كيف تطلب؟ 🛒 أونلاين، واتساب، أو زورنا. كل شي عن التوصيل والدفع بهالبوست. How to order, plus delivery and payment, in one post. Save it.',
    hashtags: '#TwainyPlast #اختار_بثقة #أدوات_صحية #Lebanon',
    art: (
      <div className="post post-45 white">
        <Logo />
        <h4 dir="rtl">اطلب بـ٣ طرق</h4>
        <ol className="post-steps">
          <li><b>1</b> twainyplast.com <small>Order online</small></li>
          <li><b>2</b> WhatsApp <small>Ask, then order</small></li>
          <li><b>3</b> Visit the store <small>[address]</small></li>
        </ol>
        <div className="post-faq">
          <span>🚚 [1–3] days · [areas]</span>
          <span>💵 Cash on delivery*</span>
        </div>
        <p className="post-foot">*Confirm terms with the owner before publishing</p>
      </div>
    ),
  },
  {
    id: 'Post 4',
    title: 'Real Homes: customer story',
    format: 'Carousel · 3 slides · 4:5',
    pillar: 'Real Homes',
    slides: ['Customer’s installed bathroom (their photo, with consent)', 'What they bought + why (their words)', 'CTA: get the look'],
    caption: '"[Genuine customer quote, verbatim]" Thank you [first name, with permission] for sharing your new bathroom 🙏 Products: [list + links].',
    hashtags: '#TwainyPlast #بيوت_حقيقية #RealHomes #BathroomDesign',
    art: (
      <div className="post post-45 navy">
        <Logo />
        <span className="post-tag">Real Homes · بيوت حقيقية</span>
        <div className="post-photo-slot">
          [Customer’s own photo,
          <br />
          used with written consent]
        </div>
        <blockquote>"[Genuine quote, never invented]"</blockquote>
        <p className="post-foot">Template: publish only with a real customer</p>
      </div>
    ),
  },
  {
    id: 'Post 5',
    title: 'Campaign offer',
    format: 'Static · 1:1 (+ 9:16 story version)',
    pillar: 'Order Easy',
    caption: 'اختار بثقة 💙 توصيل مجاني عالخلاطات ومرايا الـLED المختارة لـ[المناطق] لحد ٢٥ تشرين الثاني. Free delivery on selected mixers and LED mirrors to [areas] until Nov 25. Full terms at the link.',
    hashtags: '#TwainyPlast #اختار_بثقة #ChooseWithConfidence #Lebanon',
    art: (
      <div className="post post-11 aqua">
        <Logo />
        <div className="offer-grid">
          <div>
            <span className="post-tag">Choose with Confidence</span>
            <h4 dir="rtl">توصيل مجاني</h4>
            <p className="post-sub">Free delivery on campaign picks</p>
            <span className="pill big">From ${shortNeck.price}</span>
            <p className="post-terms">Selected mixers and LED mirrors · [areas] · until Nov 25, 2026</p>
          </div>
          <div className="offer-imgs">
            <img src={kore.image} alt={kore.title} />
            <img src={wave.image} alt={wave.title} />
            <img src={round.image} alt={round.title} />
          </div>
        </div>
      </div>
    ),
  },
]
