"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface BlogMarkdownProps {
  content: string;
}

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1 className="text-2xl md:text-3xl font-bold text-text-primary mt-10 mb-4 tracking-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-xl md:text-2xl font-semibold text-text-primary mt-10 mb-4 tracking-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-lg md:text-xl font-semibold text-text-primary mt-8 mb-3" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-base font-semibold text-text-primary mt-6 mb-2" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="text-sm font-semibold text-text-primary mt-6 mb-2" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="text-xs font-semibold text-text-primary mt-6 mb-2 uppercase tracking-wider" {...props}>
      {children}
    </h6>
  ),
  p: ({ children, ...props }) => (
    <p className="text-text-secondary leading-relaxed my-4" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-primary-400 hover:text-primary-300 underline decoration-primary-600/30 hover:decoration-primary-400/60 transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-text-primary" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-text-secondary" {...props}>
      {children}
    </em>
  ),
  code: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"code">) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="text-primary-300 bg-bg-card px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="bg-bg-card border border-border-subtle rounded-lg p-4 my-6 overflow-x-auto text-sm font-mono"
      {...props}
    >
      {children}
    </pre>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside text-text-secondary leading-relaxed my-4 space-y-1.5" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside text-text-secondary leading-relaxed my-4 space-y-1.5" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-text-secondary" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-primary-600/40 bg-primary-600/5 rounded-r-lg px-6 py-4 my-6 italic text-text-secondary"
      {...props}
    >
      {children}
    </blockquote>
  ),
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt ?? ""}
      className="rounded-lg border border-border-subtle my-6 max-w-full h-auto"
      loading="lazy"
      {...props}
    />
  ),
  hr: (props) => <hr className="border-border-subtle my-8" {...props} />,
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-border-subtle text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-bg-card" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="border-b border-border-subtle" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-2 text-left font-semibold text-text-primary" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-2 text-text-secondary" {...props}>
      {children}
    </td>
  ),
};

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
