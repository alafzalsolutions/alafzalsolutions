import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { marked } from 'marked'
import { allPosts } from 'content-collections'

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug)
    if (!post) throw new Error('Post not found')
    return post
  },
  component: PostPage,
})

const SAMPLE_COMMENTS = [
  {
    id: 1,
    name: 'Sophie H.',
    date: 'March 16, 2026',
    text: 'This is exactly the post I needed! I have been on the fence about the Leuchtturm1917 for ages — now I am ordering one.',
  },
  {
    id: 2,
    name: 'Tomás R.',
    date: 'March 18, 2026',
    text: 'Completely agree on Mildliners. The fluorescent highlighters from my schooldays were headache-inducing. Such a different experience with the pastels.',
  },
]

function CommentSection() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const encode = (data: Record<string, string>) =>
    Object.entries(data)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await fetch('/contact-form.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'comment', name: fields.name, email: fields.email, message: fields.message }),
    }).catch(() => {})
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section className="comments-section">
      <h2>Comments ({SAMPLE_COMMENTS.length})</h2>

      <div className="comment-list">
        {SAMPLE_COMMENTS.map((c) => (
          <div key={c.id} className="comment-item">
            <div className="comment-avatar">{c.name[0]}</div>
            <div className="comment-bubble">
              <div className="comment-bubble-header">
                <span className="comment-name">{c.name}</span>
                <span className="comment-date">{c.date}</span>
              </div>
              <p className="comment-text">{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <div className="comment-form">
          <h3>Leave a Comment</h3>
          {submitted ? (
            <p className="success-message">Thank you! Your comment has been received.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="comment" />
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="comment-name">Name *</label>
                  <input
                    id="comment-name"
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="comment-email">Email *</label>
                  <input
                    id="comment-email"
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="comment-message">Comment *</label>
                <textarea
                  id="comment-message"
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  required
                  placeholder="Share your thoughts..."
                />
              </div>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Posting…' : 'Post Comment'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function PostPage() {
  const post = Route.useLoaderData()
  const authorName = post.author ?? 'Emma Clarke'
  const authorBio = post.authorBio ?? 'A passionate stationery enthusiast and study blogger sharing honest reviews and practical tips for curious minds.'

  return (
    <article className="post-page">
      <header className="post-header">
        <div className="post-header-categories">
          {post.categories.map((cat) => (
            <Link key={cat} to="/category/$category" params={{ category: cat }} className="category-badge">
              {cat}
            </Link>
          ))}
        </div>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>{authorName}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{post.date}</span>
        </div>
        <p className="post-summary">{post.summary}</p>
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: marked(post.content) as string }}
      />

      <aside className="author-bio">
        <div className="author-avatar">{authorName[0]}</div>
        <div className="author-info">
          <h3>{authorName}</h3>
          <p>{authorBio}</p>
        </div>
      </aside>

      <CommentSection />
    </article>
  )
}
