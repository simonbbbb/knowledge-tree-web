import {
  Cloud, Container, Network, Sparkles, FileText, Puzzle, Terminal, Bot,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";
import { GlassCard } from "@/components/shared/GlassComponents";
import { Section, SectionHeading } from "@/components/shared/Section";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const iconMap: Record<string, React.ElementType> = {
  Cloud, Container, Network, Sparkles, FileText, Puzzle, Terminal, Bot,
};

export function FeatureShowcase() {
  return (
    <Section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Features"
          title="Everything you need to know your infrastructure"
          description="From multi-cloud discovery to AI-powered documentation, Knowledge Tree gives you complete visibility."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Cloud;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.05}>
                <GlassCard className="h-full">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600/20 to-accent-purple/20 mb-4">
                    <Icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
