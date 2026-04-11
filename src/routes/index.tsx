import { createFileRoute, Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import BlogPosts from '@/components/blog-posts'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-tagline">Stationery &amp; Study Blog</span>
          <h1>Where Paper Meets Purpose</h1>
          <p>
            A warm corner of the internet for stationery lovers, bullet journalers, and
            dedicated students. Honest reviews, practical tips, and slow living inspiration.
          </p>
          <Link to="/about" className="hero-btn">Meet the Author</Link>
        </div>
      </section>

      <BlogPosts title="Latest Posts" posts={allPosts} />
    </>
  )
}
