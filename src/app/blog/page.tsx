import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";
import { GradientText } from "@/components/shared/GlassComponents";
import { GlassCard } from "@/components/shared/GlassComponents";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Updates, technical deep-dives, and guides from the Knowledge Tree team on infrastructure discovery, knowledge graphs, and auto-documentation.",
  openGraph: {
    title: "Blog | Knowledge Tree",
    description:
      "Updates, technical deep-dives, and guides from the Knowledge Tree team.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();

  // Group posts by category
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <GradientText>Blog</GradientText>
          </h1>
          <p className="text-lg text-text-secondary">
            Updates, technical deep-dives, and guides from the team.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 && (
            <p className="text-text-secondary text-center py-12">
              No posts yet. Check back soon!
            </p>
          )}

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button className="text-xs px-3 py-1.5 rounded-full bg-primary-600/20 text-primary-400 border border-primary-600/30 font-medium">
              All Posts
            </button>
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-xs px-3 py-1.5 rounded-full bg-bg-card text-text-muted border border-border-subtle"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <GlassCard className="p-6 hover:border-border-glow transition-colors">
                  <div className="flex items-center gap-3 mb-2 text-xs text-text-muted">
                    <time>{post.date}</time>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                    <span>&middot;</span>
                    <span>{post.category}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-secondary mb-3">
                    {post.description}
                  </p>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-primary-600/10 text-primary-400 border border-primary-600/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
