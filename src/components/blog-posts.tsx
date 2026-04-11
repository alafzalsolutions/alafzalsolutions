import { Link } from '@tanstack/react-router'
import { type Post } from 'content-collections'

function BookmarkIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export default function BlogPosts({ title, posts }: { title: string; posts: Post[] }) {
  return (
    <section className="blog-grid-section">
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">Stories, reviews, and ideas for curious minds</p>
      <div className="blog-grid">
        {posts.map((post) => (
          <Link to="/posts/$slug" params={{ slug: post.slug }} key={post._meta.path} className="blog-card">
            <div className="blog-card-image-placeholder">
              <BookmarkIcon />
            </div>
            <div className="blog-card-body">
              <div className="blog-card-categories">
                {post.categories.map((cat) => (
                  <span key={cat} className="category-badge">{cat}</span>
                ))}
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-summary">{post.summary}</p>
              <div className="blog-card-meta">
                <span>{post.author ?? 'Emma Clarke'}</span>
                <span className="dot" />
                <span>{post.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
