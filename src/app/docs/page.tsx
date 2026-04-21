import type { Metadata } from "next";
import { ArrowRight, Book, Terminal, Container, Cloud, Bot, Puzzle } from "lucide-react";
import { GradientButton, GradientText, GlassCard } from "@/components/shared/GlassComponents";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Get started with Knowledge Tree. Documentation, quickstart guides, API references, and integration setup.",
};

const guides = [
  {
    icon: Terminal,
    title: "Quickstart",
    description: "Deploy Knowledge Tree in under 30 minutes with Docker or Kubernetes.",
    href: "/demo",
  },
  {
    icon: Cloud,
    title: "Cloud Providers",
    description: "Configure AWS, Azure, and GCP discovery with read-only credentials.",
    href: "/demo",
  },
  {
    icon: Container,
    title: "Kubernetes",
    description: "Deep discovery for K8s clusters, pods, services, and ingresses.",
    href: "/demo",
  },
  {
    icon: Bot,
    title: "MCP Server",
    description: "Connect AI assistants to query your infrastructure in natural language.",
    href: "/demo",
  },
  {
    icon: Puzzle,
    title: "Integrations",
    description: "Connect with Confluence, Jira, Slack, and PagerDuty.",
    href: "/demo",
  },
  {
    icon: Book,
    title: "API Reference",
    description: "REST API endpoints, authentication, webhooks, and SDK documentation.",
    href: "/demo",
  },
];

export default function DocsPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <GradientText>Documentation</GradientText>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Everything you need to deploy, configure, and get value from Knowledge Tree.
          </p>
          <div className="inline-block">
            <GradientButton href="/demo">
              See the Demo <ArrowRight className="w-4 h-4" />
            </GradientButton>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <a
                  key={guide.title}
                  href={guide.href}
                  className="group"
                >
                  <GlassCard className="h-full p-6 group-hover:border-border-glow transition-colors">
                    <Icon className="w-8 h-8 text-primary-400 mb-4" />
                    <h3 className="text-base font-semibold text-text-primary mb-2 group-hover:text-primary-400 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{guide.description}</p>
                  </GlassCard>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
