import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Blog
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <time className="text-sm text-text-muted">{post.date}</time>
            <span className="text-sm text-text-muted">by {post.author}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>
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
        </div>

        <article className="prose prose-invert max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-xl font-semibold text-text-primary mt-8 mb-4"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("```")) {
              const lines = paragraph.split("\n");
              const code = lines.slice(1, -1).join("\n");
              return (
                <pre
                  key={i}
                  className="bg-bg-card border border-border-subtle rounded-lg p-4 my-6 overflow-x-auto text-sm"
                >
                  <code className="text-text-secondary font-mono">{code}</code>
                </pre>
              );
            }
            if (paragraph.startsWith("1. ") || paragraph.startsWith("- ")) {
              return (
                <div
                  key={i}
                  className="text-text-secondary leading-relaxed my-4 space-y-2"
                  dangerouslySetInnerHTML={{
                    __html: paragraph
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary">$1</strong>')
                      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary-400 hover:text-primary-300 underline">$1</a>')
                      .replace(/`([^`]+)`/g, '<code class="text-primary-300 bg-bg-card px-1.5 py-0.5 rounded text-sm">$1</code>')
                      .split("\n")
                      .map((line: string) => `<p>${line}</p>`)
                      .join(""),
                  }}
                />
              );
            }
            return (
              <p
                key={i}
                className="text-text-secondary leading-relaxed my-4"
                dangerouslySetInnerHTML={{
                  __html: paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary">$1</strong>')
                    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary-400 hover:text-primary-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
                    .replace(/`([^`]+)`/g, '<code class="text-primary-300 bg-bg-card px-1.5 py-0.5 rounded text-sm">$1</code>'),
                }}
              />
            );
          })}
        </article>
      </div>
    </section>
  );
}
