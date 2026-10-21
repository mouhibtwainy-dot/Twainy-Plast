import { useState } from 'react'

type Inputs = {
  adSpend: number
  production: number
  sessions: number
  convRate: number
  waOrders: number
  aov: number
  margin: number
  orderCost: number
  repeat: number
}

const defaults: Inputs = {
  adSpend: 200,
  production: 0,
  sessions: 1000,
  convRate: 1,
  waOrders: 8,
  aov: 45,
  margin: 30,
  orderCost: 3,
  repeat: 1.5,
}

const fields: { key: keyof Inputs; label: string; step: number; hint: string }[] = [
  { key: 'adSpend', label: 'Ad spend ($)', step: 10, hint: 'Paid test budget' },
  { key: 'production', label: 'Production cost ($)', step: 10, hint: 'Props, printing, delivery of samples. Student time is tracked separately at $0.' },
  { key: 'sessions', label: 'Campaign sessions', step: 50, hint: 'Lebanon sessions from campaign links' },
  { key: 'convRate', label: 'Website conversion rate (%)', step: 0.1, hint: 'Test target, not a forecast' },
  { key: 'waOrders', label: 'WhatsApp-assisted orders', step: 1, hint: 'Logged once, by order number' },
  { key: 'aov', label: 'Average order value ($)', step: 1, hint: 'Hero products are $25–65' },
  { key: 'margin', label: 'Gross margin (%)', step: 1, hint: 'Owner to confirm' },
  { key: 'orderCost', label: 'Variable cost / order ($)', step: 0.5, hint: 'Delivery, packaging, payment fees' },
  { key: 'repeat', label: 'Orders per customer (12 months)', step: 0.1, hint: 'For lifetime value; plumbers re-order' },
]

const usd = (n: number) => (n < 0 ? '−$' : '$') + Math.abs(n).toLocaleString('en-US', { maximumFractionDigits: 0 })

export function RoiCalculator() {
  const [v, setV] = useState<Inputs>(defaults)

  const webOrders = Math.round((v.sessions * v.convRate) / 100)
  const orders = webOrders + v.waOrders
  const revenue = orders * v.aov
  const unitContribution = v.aov * (v.margin / 100) - v.orderCost
  const grossContribution = orders * unitContribution
  const campaignCost = v.adSpend + v.production
  const profit = grossContribution - campaignCost
  const cac = orders ? campaignCost / orders : 0
  const roas = v.adSpend ? revenue / v.adSpend : 0
  const breakEvenOrders = unitContribution > 0 ? Math.ceil(campaignCost / unitContribution) : Infinity
  const ltvProfit = orders * unitContribution * v.repeat - campaignCost

  const results = [
    { label: 'Orders (web + WhatsApp)', value: `${orders} (${webOrders} + ${v.waOrders})` },
    { label: 'Revenue', value: usd(revenue) },
    { label: 'CAC', value: orders ? usd(cac) : '—' },
    { label: 'ROAS', value: roas.toFixed(1) + '×' },
    { label: 'Campaign profit contribution', value: usd(profit), tone: profit >= 0 ? 'good' : 'bad' },
    { label: 'Break-even orders', value: Number.isFinite(breakEvenOrders) ? String(breakEvenOrders) : 'never (unit loss)' },
    { label: '12-month contribution (with repeat orders)', value: usd(ltvProfit), tone: ltvProfit >= 0 ? 'good' : 'bad' },
  ]

  return (
    <div className="roi">
      <form className="roi-inputs" onSubmit={(e) => e.preventDefault()}>
        {fields.map((f) => (
          <label key={f.key}>
            <span>{f.label}</span>
            <input
              type="number"
              min={0}
              step={f.step}
              value={v[f.key]}
              onChange={(e) => setV({ ...v, [f.key]: Number(e.target.value) })}
            />
            <small>{f.hint}</small>
          </label>
        ))}
        <button type="button" onClick={() => setV(defaults)}>
          Reset to planning scenario
        </button>
      </form>
      <div className="roi-results">
        {results.map((r) => (
          <div key={r.label} className={`roi-tile ${r.tone ?? ''}`}>
            <small>{r.label}</small>
            <b>
              {r.tone === 'bad' ? '▼ ' : r.tone === 'good' ? '▲ ' : ''}
              {r.value}
            </b>
          </div>
        ))}
        <p className="muted">
          CAC = acquisition spend ÷ new customers · ROAS = attributed revenue ÷ ad spend · Contribution = orders × (AOV ×
          margin − variable cost) − campaign costs. A high ROAS does not on its own mean the campaign is profitable.
        </p>
      </div>
    </div>
  )
}
