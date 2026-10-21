import { igProfile } from '../data/strategy'

export function ProfileMockup() {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="ig-top">
        <span className="ig-handle">{igProfile.handle} ✓</span>
        <span>☰</span>
      </div>
      <div className="ig-head">
        <div className="ig-avatar">
          <span>TP</span>
        </div>
        <div className="ig-stats">
          <div><b>12</b><span>posts</span></div>
          <div><b>—</b><span>followers</span></div>
          <div><b>—</b><span>following</span></div>
        </div>
      </div>
      <div className="ig-bio">
        <b>{igProfile.name}</b>
        <span className="ig-cat">{igProfile.category}</span>
        {igProfile.bio.map((line) => (
          <span key={line}>{line}</span>
        ))}
        <span className="ig-link">🔗 twainyplast.com/pages/links</span>
        <span className="ig-loc">📍 {igProfile.location}</span>
      </div>
      <div className="ig-buttons">
        <span>Follow</span>
        <span>Message</span>
        <span>WhatsApp</span>
      </div>
      <div className="ig-highlights">
        {igProfile.highlights.map((h) => (
          <div key={h} className="ig-hl">
            <div className="ig-hl-circle">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3c3 4.5 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 3-6.5 6-11z" />
              </svg>
            </div>
            <span>{h}</span>
          </div>
        ))}
      </div>
      <div className="ig-grid">
        {['Reel 1', 'Post 3', 'Reel 2', 'Post 1', 'Post 2', 'Reel 3'].map((t, i) => (
          <div key={t} className={`ig-tile tone-${i % 3}`}>
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}

export function LinkInBio() {
  return (
    <div className="phone small">
      <div className="phone-notch" />
      <div className="lib">
        <div className="ig-avatar">
          <span>TP</span>
        </div>
        <b>Twainy Plast</b>
        <span className="muted">اختار بثقة · Choose with confidence</span>
        {igProfile.links.map((l) => (
          <div className="lib-btn" key={l.label}>
            {l.label}
            <small>{l.dest}</small>
          </div>
        ))}
        <small className="muted">Hosted as a Shopify page, so every click is tracked in GA4</small>
      </div>
    </div>
  )
}
