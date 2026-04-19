import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import { GradientText } from "@/components/shared/GlassComponents";
import { GlassCard } from "@/components/shared/GlassComponents";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Updates, technical deep-dives, and guides from the Knowledge Tree team.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

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
          <div className="space-y-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <GlassCard className="p-6 hover:border-border-glow transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <time className="text-xs text-text-muted">{post.date}</time>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-primary-600/10 text-primary-400 border border-primary-600/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-secondary">{post.description}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
