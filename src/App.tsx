import { useEffect, useRef, useState, type ReactNode } from 'react'
import './App.css'
import { Bars, Columns } from './components/Bars'
import { PostCard } from './components/PostCard'
import { posts } from './components/Posts'
import { LinkInBio, ProfileMockup } from './components/ProfileMockup'
import { ReelBoard } from './components/ReelBoard'
import { RoiCalculator } from './components/RoiCalculator'
import { countries, dailySessions, funnel, headline, sources } from './data/baseline'
import { heroProducts, productUrl } from './data/products'
import {
  auditMetrics,
  barriers,
  brand,
  budget,
  calendarWeeks,
  channels,
  communityGuidelines,
  competitorSlots,
  deferredChannels,
  ethics,
  funnelStages,
  gbpChecklist,
  hashtagSets,
  kpis,
  personas,
  pillars,
  reels,
  seoKeywords,
  team,
  timeline,
  tracking,
  whatsapp,
} from './data/strategy'

type SlideDef = { id: string; step: string; title: string; body: ReactNode }

const slides: SlideDef[] = [
  {
    id: 'title',
    step: '',
    title: 'From Visitors to Customers',
    body: (
      <div className="cover">
        <span className="chip light">MKT 843 · Final Applied Consulting Project</span>
        <h1>From Visitors to Customers</h1>
        <p className="cover-sub">A Social Media and Digital Growth Strategy for Twainy Plast Sanitary</p>
        <p className="cover-ar" dir="rtl">اختار بثقة مع تويني بلاست</p>
        <p className="cover-meta">Dr. Kiray Khoury · LAU AKSOB MBA · Presentations: Nov 26 & Dec 3, 2026 · Team: [names]</p>
      </div>
    ),
  },
  {
    id: 'problem',
    step: 'Step 1 · Brief',
    title: 'The business problem',
    body: (
      <div className="two">
        <div>
          <p className="lead">
            Twainy Plast, a family-run Lebanese sanitary-ware and plumbing retailer, launched <b>twainyplast.com</b> in October
            2026 with 175 products. People are visiting, but nobody has bought yet.
          </p>
          <div className="callout">
            <small>Research question</small>
            <p>
              How can Twainy Plast use targeted social content, customer trust and an easier buying journey to turn
              website visitors into paying customers?
            </p>
          </div>
          <p className="muted">
            One launch week is an early baseline. It is too little evidence to say why people don’t buy, so the project
            investigates, tests and measures before claiming causes.
          </p>
        </div>
        <div className="stat-grid">
          {headline.map((h) => (
            <div className="stat" key={h.label}>
              <b>{h.value}</b>
              <span>{h.label}</span>
            </div>
          ))}
          <small className="muted span2">Source: Shopify Analytics, pulled Oct 21, 2026</small>
        </div>
      </div>
    ),
  },
  {
    id: 'baseline',
    step: 'Step 1 · Baseline',
    title: 'Launch baseline: the drop-off happens before the cart',
    body: (
      <div className="three">
        <div className="panel">
          <h3>Purchase funnel (sessions, Oct 7–21)</h3>
          <Bars rows={funnel.map((f) => ({ label: f.step, value: f.value }))} />
          <p className="muted">Session → cart 1.1% · 1 checkout · 0 orders</p>
        </div>
        <div className="panel">
          <h3>Daily sessions since launch</h3>
          <Columns rows={dailySessions.map((d) => ({ label: d.day, value: d.sessions }))} />
          <p className="muted">*Oct 21 is a partial day</p>
        </div>
        <div className="panel">
          <h3>Sessions by source</h3>
          <Bars rows={sources} />
          <h3>Sessions by country</h3>
          <Bars rows={countries} />
          <p className="muted">40% from the US suggests bots or testing, so KPIs use Lebanon only.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'barriers',
    step: 'Step 1 · Diagnosis',
    title: 'Possible barriers, the evidence and how we test them',
    body: (
      <table className="grid-table">
        <thead>
          <tr>
            <th>Possible barrier</th>
            <th>Evidence so far</th>
            <th>Status</th>
            <th>Improvement to test</th>
          </tr>
        </thead>
        <tbody>
          {barriers.map((b) => (
            <tr key={b.barrier}>
              <td><b>{b.barrier}</b></td>
              <td>{b.evidence}</td>
              <td><span className={`status ${b.status.startsWith('Supported') ? 'ok' : b.status.startsWith('Observed') ? 'mid' : 'open'}`}>{b.status}</span></td>
              <td>{b.test}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  {
    id: 'competitors',
    step: 'Step 2 · Competitive intelligence',
    title: 'Competitor social audit: 2 direct and 1 indirect',
    body: (
      <div className="two">
        <div>
          {competitorSlots.map((c) => (
            <div className="panel row" key={c.slot}>
              <span className="chip">{c.slot}</span>
              <div>
                <b>{c.type}</b>
                <p className="muted">{c.why}</p>
              </div>
            </div>
          ))}
          <p className="muted">
            Same-day collection over the last 30 days of public posts. Engagement rate = average interactions ÷ followers.
            Share of voice is computed across all four brands. We do not estimate competitors’ reach or sales. Full sheet:
            docs/04-research-toolkit.md
          </p>
        </div>
        <div className="panel">
          <h3>What we measure for each brand</h3>
          <ul className="checks">
            {auditMetrics.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <div className="callout">
            <small>Gap hypothesis to test</small>
            <p>Few local sellers show prices, delivery terms and fit guidance. Twainy can own "clear and honest".</p>
          </div>
        </div>
      </div>
    ),
  },
  ...personas.map(
    (p, i): SlideDef => ({
      id: `persona-${i + 1}`,
      step: 'Step 2 · Personas',
      title: `Persona ${i + 1}: ${p.role}`,
      body: (
        <div className="persona">
          <div className="persona-card">
            <div className="persona-avatar">{p.name[0]}</div>
            <h3>{p.name}</h3>
            <p>{p.role}</p>
            <span className="chip">Desired action: {p.goal}</span>
            <blockquote>{p.quote}</blockquote>
            <small className="muted">{p.validation}</small>
          </div>
          <div className="persona-cols">
            <div className="panel">
              <h3>Demographics & socioeconomics</h3>
              <ul>{p.demographics.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="panel">
              <h3>Psychographics & behaviours</h3>
              <ul>{p.psychographics.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="panel">
              <h3>Pain points</h3>
              <ul>{p.pains.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="panel">
              <h3>Social consumption</h3>
              <dl>
                {p.social.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      ),
    }),
  ),
  {
    id: 'brand',
    step: 'Step 3 · Brand identity matrix',
    title: 'Brand identity: clear, honest, neighbourly',
    body: (
      <div className="two">
        <div>
          <div className="callout">
            <small>Positioning</small>
            <p>{brand.positioning}</p>
          </div>
          <p>
            <b>Promise:</b> {brand.promise} · <b>Personality:</b> {brand.personality.join(' · ')}
          </p>
          <table className="grid-table compact">
            <thead>
              <tr><th>Context</th><th>Tone</th><th>Example</th></tr>
            </thead>
            <tbody>
              {brand.voice.map((v) => (
                <tr key={v.context}>
                  <td><b>{v.context}</b></td>
                  <td>{v.tone}</td>
                  <td dir="rtl">{v.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="dodont">
            <div><b>Do</b><ul>{brand.doSay.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div><b>Don’t</b><ul>{brand.dontSay.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </div>
        </div>
        <div>
          <h3>Colour palette</h3>
          <div className="swatches">
            {brand.colors.map((c) => (
              <div key={c.hex} className="swatch">
                <div style={{ background: c.hex }} />
                <b>{c.name}</b>
                <small>{c.hex} · {c.use}</small>
              </div>
            ))}
          </div>
          <h3>Typography</h3>
          <div className="type-specimen">
            <span className="type-head">Choose with confidence · اختار بثقة</span>
            <span>Cairo covers Arabic and Latin in one family, so bilingual posts stay consistent.</span>
          </div>
          <h3>Design assets</h3>
          <ul>{brand.assets.map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
      </div>
    ),
  },
  {
    id: 'community',
    step: 'Step 3 · Community guidelines',
    title: 'Community guidelines',
    body: (
      <div className="two">
        <ol className="big-list">
          {communityGuidelines.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ol>
        <div className="panel">
          <h3>Public house rules (pinned in the Story highlight)</h3>
          <p dir="rtl">أهلا فيكن بصفحة تويني بلاست! منحب أسئلتكن وآراءكن. منحذف بس التعليقات المسيئة أو السبام أو اللي فيها معلومات شخصية. للطلبات، راسلونا عالخاص أو عالواتساب.</p>
          <p>Welcome! Questions and honest opinions are always welcome. We only hide abusive comments, spam or personal data. For orders, message us privately or on WhatsApp.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'channels',
    step: 'Step 3 · Ecosystem architecture',
    title: 'Channel architecture: every channel has one job',
    body: (
      <div>
        <div className="flow">
          {[
            ['Discover', 'IG Reels · FB · Google Maps/Search'],
            ['Consider', 'Carousels · Highlights · Reviews · product pages'],
            ['Convert', 'Website checkout · WhatsApp "ask before ordering"'],
            ['Retain', 'WhatsApp broadcasts · review requests · plumber price list'],
          ].map(([h, d]) => (
            <div className="flow-step" key={h}>
              <b>{h}</b>
              <span>{d}</span>
            </div>
          ))}
        </div>
        <table className="grid-table compact">
          <thead>
            <tr><th>Channel</th><th>Role</th><th>Why (persona evidence)</th><th>Primary KPI</th></tr>
          </thead>
          <tbody>
            {channels.map((c) => (
              <tr key={c.name}>
                <td><b>{c.name}</b></td>
                <td>{c.role}</td>
                <td>{c.why}</td>
                <td>{c.kpi}</td>
              </tr>
            ))}
            {deferredChannels.map((c) => (
              <tr key={c.name} className="dim">
                <td><b>{c.name}</b></td>
                <td colSpan={3}>{c.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'profile',
    step: 'Step 3 · Mockup profile',
    title: 'Optimised Instagram profile and link-in-bio funnel',
    body: (
      <div className="mock-row">
        <ProfileMockup />
        <LinkInBio />
        <div className="panel">
          <h3>Set-up notes</h3>
          <ul>
            <li>Name field includes both the AR and EN brand names, which makes the profile searchable in both languages</li>
            <li>Category: Home improvement. Contact buttons: Message + WhatsApp</li>
            <li>Highlight covers use the water-drop icon on aqua, one per buyer question</li>
            <li>Location tag on every store post and Reel</li>
            <li>Instagram Shopping connected to the Shopify catalogue for product tags</li>
            <li>Facebook page mirrors the bio, with the same WhatsApp button and shop tab</li>
            <li>Link in bio is a Shopify page, not a third-party tool, so GA4 sees every click</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'local',
    step: 'Step 3 · Local, search & direct',
    title: 'Google Business Profile, local SEO and WhatsApp Business',
    body: (
      <div className="three">
        <div className="panel">
          <h3>Google Business Profile</h3>
          <ul className="checks">{gbpChecklist.map((g) => <li key={g}>{g}</li>)}</ul>
        </div>
        <div className="panel">
          <h3>Local SEO keywords</h3>
          <table className="grid-table compact">
            <tbody>
              {seoKeywords.map((k) => (
                <tr key={k.kw}>
                  <td dir="auto">{k.kw}</td>
                  <td><span className="chip">{k.intent}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted">Use these in product titles, collection descriptions and GBP posts. Replace numeric URLs such as /products/2-1.</p>
        </div>
        <div className="panel">
          <h3>WhatsApp Business</h3>
          <ul>{whatsapp.setup.map((s) => <li key={s}>{s}</li>)}</ul>
          <div className="wa-bubble" dir="rtl">{whatsapp.greeting}</div>
          <div className="wa-bubble" dir="rtl">{whatsapp.away}</div>
          {whatsapp.quickReplies.map((q) => (
            <p key={q.cmd} className="muted"><b>{q.cmd}</b> {q.text}</p>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'campaign',
    step: 'Step 4 · Campaign & funnel',
    title: 'Campaign: "Choose with Confidence: اختار بثقة"',
    body: (
      <div>
        <p className="lead">
          A 4-week campaign that moves Lebanese shoppers from trust to choice to purchase, built around a small set of
          well-stocked, clearly priced products.
        </p>
        <div className="stage-grid">
          {funnelStages.map((s) => (
            <div className="stage" key={s.stage}>
              <small>{s.weeks}</small>
              <b>{s.stage}</b>
              <p>{s.goal}</p>
              <dl>
                <dt>Content</dt><dd>{s.content}</dd>
                <dt>KPIs</dt><dd>{s.kpi}</dd>
                <dt>Paid</dt><dd>{s.paid}</dd>
              </dl>
            </div>
          ))}
        </div>
        <div className="hero-strip">
          {heroProducts.map((p) => (
            <a key={p.handle} href={productUrl(p.handle, 'cwc', 'deck')} target="_blank" rel="noreferrer" className="hero-item">
              <img src={p.image} alt={p.title} />
              <b>{p.title}</b>
              <small>${p.price} · {p.stock} in stock</small>
            </a>
          ))}
        </div>
        <p className="muted">Hero products were chosen from live Shopify stock. WCs, vanities and most pumps have only 1–2 units, so they stay out of ads.</p>
      </div>
    ),
  },
  {
    id: 'pillars',
    step: 'Step 4 · Content pillars',
    title: 'Four content pillars',
    body: (
      <div>
        <div className="pillars">
          {pillars.map((p) => (
            <div className="pillar" key={p.name}>
              <span className="pillar-share">{p.share}</span>
              <b>{p.name}</b>
              <span dir="rtl">{p.ar}</span>
              <p>{p.desc}</p>
              <small>{p.formats}</small>
            </div>
          ))}
        </div>
        <h3>Hashtag strategy</h3>
        <table className="grid-table compact">
          <tbody>
            {hashtagSets.map((h) => (
              <tr key={h.name}><td><b>{h.name}</b></td><td>{h.tags}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="muted">
          Posting frequency: 3 feed posts per week (IG + FB cross-post), 3 to 5 Story days per week, 1 WhatsApp broadcast per
          week, 1 GBP post per week. Starting windows of 13:00 and 21:00 for homeowners and 08:00 for plumbers are hypotheses,
          to be re-set after week 1 from Insights’ "most active times".
        </p>
      </div>
    ),
  },
  ...calendarWeeks.map(
    (w): SlideDef => ({
      id: `cal-${w.week.toLowerCase().replace(' ', '-')}`,
      step: 'Step 4 · 4-week calendar',
      title: `${w.week} (${w.dates}): ${w.theme}`,
      body: (
        <table className="grid-table">
          <thead>
            <tr><th>When</th><th>Platform</th><th>Format</th><th>Pillar</th><th>Content</th><th>CTA</th><th>Asset</th></tr>
          </thead>
          <tbody>
            {w.items.map((it) => (
              <tr key={it.day + it.title}>
                <td>{it.day}</td>
                <td>{it.platform}</td>
                <td>{it.format}</td>
                <td><span className="chip">{it.pillar}</span></td>
                <td>{it.title}</td>
                <td>{it.cta}</td>
                <td>{it.asset ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    }),
  ),
  ...reels.map(
    (r): SlideDef => ({
      id: r.id.toLowerCase().replace(' ', '-'),
      step: 'Step 4 · Short-form video',
      title: `${r.id} storyboard`,
      body: <ReelBoard reel={r} />,
    }),
  ),
  {
    id: 'posts-a',
    step: 'Step 4 · Static & carousel assets',
    title: 'Posts 1–3: education and how to order',
    body: (
      <div className="posts">
        {posts.slice(0, 3).map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    ),
  },
  {
    id: 'posts-b',
    step: 'Step 4 · Static & carousel assets',
    title: 'Posts 4–5: proof and offer',
    body: (
      <div className="posts">
        {posts.slice(3).map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
        <div className="panel">
          <h3>Production notes</h3>
          <ul>
            <li>Product images are currently generated renders. Shoot real photos of all 6 hero products before launch (phone, daylight, white sheet).</li>
            <li>Every price and offer term is confirmed in writing with the owner on the day it is posted.</li>
            <li>Arabic sits on the right and English on the left, and the price always goes in the copper pill.</li>
            <li>Exports: 1080×1350 (feed), 1080×1920 (Story), 1080×1080 (FB and GBP).</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'paid',
    step: 'Step 4 · Paid test',
    title: '$200 paid social test: learn first, then scale',
    body: (
      <div className="two">
        <div>
          <table className="grid-table">
            <thead>
              <tr><th>Phase</th><th>Objective & creative</th><th>Audience</th><th>Budget</th></tr>
            </thead>
            <tbody>
              {budget.lines.map((l) => (
                <tr key={l.phase}>
                  <td><b>{l.phase}</b></td>
                  <td>{l.objective}</td>
                  <td>{l.audience}</td>
                  <td className="num">${l.amount}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}><b>Total (paid by the business, subject to approval)</b></td>
                <td className="num"><b>${budget.total}</b></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="panel">
          <h3>Optimisation rules</h3>
          <ul>{budget.rules.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
      </div>
    ),
  },
  {
    id: 'kpis',
    step: 'Step 5 · KPI framework',
    title: 'KPI framework and 4-week test targets',
    body: (
      <div>
        <table className="grid-table compact">
          <thead>
            <tr><th>Layer</th><th>Metric</th><th>Formula</th><th>Tool</th><th>Target</th></tr>
          </thead>
          <tbody>
            {kpis.map((k) => (
              <tr key={k.metric}>
                <td><span className="chip">{k.layer}</span></td>
                <td><b>{k.metric}</b></td>
                <td>{k.formula}</td>
                <td>{k.tool}</td>
                <td className="num">{k.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted">Targets are test targets, not forecasts or industry benchmarks. They are revised after week 1 using real costs and margins.</p>
      </div>
    ),
  },
  {
    id: 'tracking',
    step: 'Step 5 · Analytics integration',
    title: 'Tracking stack: every order is counted exactly once',
    body: (
      <div className="two">
        <table className="grid-table">
          <tbody>
            {tracking.map((t) => (
              <tr key={t.tool}><td><b>{t.tool}</b></td><td>{t.role}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="panel">
          <h3>UTM convention</h3>
          <code className="code">{productUrl('brax-1')}</code>
          <h3>Weekly review (every Wednesday)</h3>
          <ol>
            <li>Pull Shopify funnel + GA4 source/medium report</li>
            <li>Compare creatives on cost per landing page view and add-to-cart rate</li>
            <li>Log the top 5 questions from comments and WhatsApp, and turn them into next week’s content</li>
            <li>Record each decision and its reason in the change log</li>
          </ol>
          <p className="muted">Results are reported as observed changes against the baseline. With 4 weeks and a small sample, we don’t claim proven causation.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'roi',
    step: 'Step 5 · Budget & ROI model',
    title: 'ROI model: is the campaign worth it?',
    body: <RoiCalculator />,
  },
  {
    id: 'ethics',
    step: 'Ethics & local impact',
    title: 'Ethical and social dimensions',
    body: (
      <div className="ethics">
        {ethics.map((e) => (
          <div className="panel" key={e.title}>
            <h3>{e.title}</h3>
            <p>{e.body}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'plan',
    step: 'Execution',
    title: 'Timeline, team ownership and next steps',
    body: (
      <div className="two">
        <div>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.date}><b>{t.date}</b><span>{t.item}</span></li>
            ))}
          </ol>
          <div className="callout">
            <small>Immediate priorities</small>
            <p>1) Submit the brief and consent (Oct 22) · 2) Screenshot the saved baseline · 3) Complete a mobile test order · 4) Finish the P1 store fixes before spending on ads</p>
          </div>
        </div>
        <table className="grid-table">
          <thead><tr><th>Role</th><th>Owns</th><th>Member</th></tr></thead>
          <tbody>
            {team.map((t) => (
              <tr key={t.role}><td><b>{t.role}</b></td><td>{t.owns}</td><td>[name]</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
]

function App() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { threshold: 0.5 },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return
      const next = ['ArrowRight', 'PageDown'].includes(e.key) ? 1 : ['ArrowLeft', 'PageUp'].includes(e.key) ? -1 : 0
      if (!next) return
      e.preventDefault()
      const target = Math.min(slides.length - 1, Math.max(0, active + next))
      refs.current[target]?.scrollIntoView({ behavior: 'smooth' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <>
      <nav className="toc" aria-label="Slides">
        {slides.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} className={i === active ? 'on' : ''} title={s.title}>
            {i + 1}
          </a>
        ))}
      </nav>
      <main>
        {slides.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            data-index={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            className={`slide ${i === 0 ? 'slide-cover' : ''}`}
          >
            {i > 0 && (
              <header className="slide-head">
                <span className="step">{s.step}</span>
                <h2>{s.title}</h2>
              </header>
            )}
            <div className="slide-body">{s.body}</div>
            <footer className="slide-foot">
              <span>Twainy Plast · Choose with Confidence</span>
              <span>{i + 1} / {slides.length}</span>
            </footer>
          </section>
        ))}
      </main>
    </>
  )
}

export default App
