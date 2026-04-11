import { createFileRoute } from '@tanstack/react-router'

import { allPosts } from 'content-collections'

import BlogPosts from '@/components/blog-posts'

export const Route = createFileRoute('/category/$category')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const category = params.category
    const posts = allPosts.filter((post) => post.categories.includes(category))
    return { category, posts }
  },
})

function RouteComponent() {
  const { category, posts } = Route.useLoaderData()
  return (
    <div className="category-page">
      <h1 className="section-title">{category}</h1>
      <p className="subtitle">{posts.length} post{posts.length !== 1 ? 's' : ''} in this category</p>
      <BlogPosts title="" posts={posts} />
    </div>
  )
}
