type Row = { label: string; value: number }

// Single-series horizontal bars; the slide title names the series, so no legend
export function Bars({ rows, unit = '' }: { rows: Row[]; unit?: string }) {
  const max = Math.max(...rows.map((r) => r.value), 1)
  return (
    <table className="bars">
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} title={`${r.label}: ${r.value}${unit}`}>
            <th scope="row">{r.label}</th>
            <td>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(r.value / max) * 100}%` }} />
              </div>
            </td>
            <td className="bar-value">
              {r.value}
              {unit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function Columns({ rows }: { rows: { label: string; value: number }[] }) {
  const max = Math.max(...rows.map((r) => r.value), 1)
  return (
    <div className="columns" role="img" aria-label={rows.map((r) => `${r.label} ${r.value}`).join(', ')}>
      {rows.map((r) => (
        <div className="col" key={r.label} title={`${r.label}: ${r.value} sessions`}>
          <span className="col-value">{r.value}</span>
          <div className="col-fill" style={{ height: `${(r.value / max) * 100}%` }} />
          <span className="col-label">{r.label}</span>
        </div>
      ))}
    </div>
  )
}
