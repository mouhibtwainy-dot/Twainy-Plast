import type { CSSProperties } from 'react'
import type { Reel } from '../data/strategy'
import { splitBilingual } from './bilingual'

export function ReelBoard({ reel }: { reel: Reel }) {
  return (
    <div className="reel">
      <div className="reel-head">
        <div>
          <span className="chip">{reel.week}</span>
          <h3>
            {reel.id}: {reel.title}
          </h3>
          <p className="muted">
            {reel.objective} · {reel.length}
          </p>
        </div>
        <div className="reel-hook">
          <small>Hook (0–2 s)</small>
          <b dir="rtl">{reel.hookAr}</b>
          <span>{reel.hook}</span>
        </div>
      </div>
      <div className="frames" style={{ '--n': reel.shots.length } as CSSProperties}>
        {reel.shots.map((s, i) => (
          <div className="frame" key={s.t}>
            <div className={`frame-screen tone-${i % 3}`}>
              <span className="frame-time">{s.t}</span>
              <span className="frame-text">{s.text}</span>
            </div>
            <p className="frame-visual">{s.visual}</p>
            <p className="frame-audio">🔊 {s.audio}</p>
          </div>
        ))}
      </div>
      <div className="reel-foot">
        <p>
          <b>Audio:</b> {reel.audio}
        </p>
        <b>Caption:</b>
        {splitBilingual(reel.caption).map((line) => (
          <p dir="auto" key={line}>
            {line}
          </p>
        ))}
        <p>
          <b>CTA:</b> {reel.cta} · subtitles burned in (AR + EN)
        </p>
      </div>
    </div>
  )
}
