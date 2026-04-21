import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Demo",
  description:
    "Interactive demo of Knowledge Tree -- explore the knowledge graph, service inventory, auto-generated documentation, and change timeline with realistic infrastructure data.",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
