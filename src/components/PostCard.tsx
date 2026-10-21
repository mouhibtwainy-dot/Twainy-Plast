import { splitBilingual } from './bilingual'
import type { PostSpec } from './Posts'

export function PostCard({ post }: { post: PostSpec }) {
  return (
    <article className="post-card">
      {post.art}
      <div className="post-meta">
        <div className="post-meta-head">
          <b>{post.id}: {post.title}</b>
          <span className="chip">{post.pillar}</span>
        </div>
        <small className="muted">{post.format}</small>
        {post.slides && (
          <ol className="slide-list">
            {post.slides.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        )}
        {splitBilingual(post.caption).map((line) => (
          <p className="caption" dir="auto" key={line}>
            {line}
          </p>
        ))}
        <p className="hashtags">{post.hashtags}</p>
      </div>
    </article>
  )
}
