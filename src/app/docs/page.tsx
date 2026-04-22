import type { Metadata } from "next";
import { ArrowRight, Book, Terminal, Container, Cloud, Bot, Puzzle } from "lucide-react";
import { GradientButton, GradientText, GlassCard } from "@/components/shared/GlassComponents";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Get started with Knowledge Tree. Documentation, quickstart guides, API references, and integration setup.",
};

const DOCS = "https://docs.knowledgetree.dev";
const APIDOCS = "https://apidocs.knowledgetree.dev";

const guides = [
  {
    icon: Terminal,
    title: "Quickstart",
    description: "Deploy Knowledge Tree in under 30 minutes with Docker or Kubernetes.",
    href: `${DOCS}/getting-started/`,
  },
  {
    icon: Cloud,
    title: "Cloud Providers",
    description: "Configure AWS, Azure, and GCP discovery with read-only credentials.",
    href: `${DOCS}/discovery/aws/`,
  },
  {
    icon: Container,
    title: "Kubernetes",
    description: "Deep discovery for K8s clusters, pods, services, and ingresses.",
    href: `${DOCS}/discovery/kubernetes/`,
  },
  {
    icon: Bot,
    title: "MCP Server",
    description: "Connect AI assistants to query your infrastructure in natural language.",
    href: `${DOCS}/ai/mcp/`,
  },
  {
    icon: Puzzle,
    title: "Integrations",
    description: "Connect with Confluence, Jira, Slack, and PagerDuty.",
    href: `${DOCS}/integrations/confluence/`,
  },
  {
    icon: Book,
    title: "API Reference",
    description: "REST API endpoints, authentication, webhooks, and SDK documentation.",
    href: APIDOCS,
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
            Everything you need to deploy, configure, and get value from
            Knowledge Tree. Full product docs live at{" "}
            <a
              href="https://docs.knowledgetree.dev"
              className="text-primary-400 hover:text-primary-300"
            >
              docs.knowledgetree.dev
            </a>
            ; the REST API reference lives at{" "}
            <a
              href="https://apidocs.knowledgetree.dev"
              className="text-primary-400 hover:text-primary-300"
            >
              apidocs.knowledgetree.dev
            </a>
            .
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <GradientButton href="https://docs.knowledgetree.dev">
              Open documentation <ArrowRight className="w-4 h-4" />
            </GradientButton>
            <GradientButton href="https://apidocs.knowledgetree.dev" variant="outline">
              API reference
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
                  target="_blank"
                  rel="noopener noreferrer"
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
