import type { Metadata } from "next";
import {
  Cloud,
  Container,
  Network,
  Sparkles,
  FileText,
  Puzzle,
  Terminal,
  Bot,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";
import { GlassCard, GradientText } from "@/components/shared/GlassComponents";
import { Section } from "@/components/shared/Section";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Knowledge Tree's features: multi-cloud discovery, Kubernetes-native mapping, knowledge graph, LLM enrichment, auto-documentation, plugin SDK, CLI, and MCP server.",
};

const iconMap: Record<string, React.ElementType> = {
  Cloud,
  Container,
  Network,
  Sparkles,
  FileText,
  Puzzle,
  Terminal,
  Bot,
};

const categories = [
  { name: "Discovery", items: [0, 1] },
  { name: "Intelligence", items: [2, 3] },
  { name: "Output", items: [4, 5] },
  { name: "Integration", items: [6, 7] },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Built for <GradientText>modern infrastructure</GradientText>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Every feature designed to give you complete visibility into your
            cloud, Kubernetes, and network infrastructure.
          </p>
        </div>
      </section>

      {/* Feature categories */}
      {categories.map((cat) => (
        <Section key={cat.name} className="!py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-8">
              {cat.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cat.items.map((idx) => {
                const feature = FEATURES[idx];
                const Icon = iconMap[feature.icon] || Cloud;
                return (
                  <GlassCard key={feature.title} className="p-8">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600/20 to-accent-purple/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-text-secondary leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </Section>
      ))}

      <CTASection />
    </>
  );
}
