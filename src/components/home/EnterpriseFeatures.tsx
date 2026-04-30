import {
  Puzzle,
  BrainCircuit,
  Cloud,
  Clock,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { GlassCard } from "@/components/shared/GlassComponents";
import { Section, SectionHeading } from "@/components/shared/Section";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GradientButton } from "@/components/shared/GlassComponents";
import { ArrowRight } from "lucide-react";

const enterpriseFeatures = [
  {
    icon: Puzzle,
    title: "Plugin Marketplace",
    description:
      "Extend discovery to any service with our open Plugin SDK. Browse community plugins for MongoDB, Cloudflare, Terraform, and more — or build your own in minutes.",
    href: "/blog/plugin-marketplace-extending-platform",
  },
  {
    icon: BrainCircuit,
    title: "AI Incident Response",
    description:
      "Machine learning models detect infrastructure anomalies in real-time, correlate changes with incident patterns, and predict outages before they impact users.",
    href: "/blog/ai-powered-incident-response",
  },
  {
    icon: Cloud,
    title: "Unified Multi-Cloud View",
    description:
      "AWS, Azure, and GCP resources in a single knowledge graph. Track cross-provider dependencies, normalize tagging, and see your entire infrastructure in one pane of glass.",
    href: "/blog/multi-cloud-discovery-one-platform",
  },
  {
    icon: Clock,
    title: "Infrastructure Time Machine",
    description:
      "Rewind to any point in your infrastructure history. The temporal graph captures every change with full versioning — perfect for post-incident analysis and root cause investigation.",
    href: "/blog/infrastructure-time-machine",
  },
  {
    icon: BarChart3,
    title: "Executive Health Score",
    description:
      "A single 0-100 metric that tells leadership exactly how healthy your infrastructure is. Persona-based dashboards for CTOs, CISOs, CFOs, and the board.",
    href: "/blog/executive-health-score",
  },
  {
    icon: ShieldCheck,
    title: "SOC 2 Automation",
    description:
      "Continuous compliance evidence collection with real-time gap analysis. Generate audit-ready reports on demand — no more documentation sprints before every audit.",
    href: "/blog/soc2-compliance-infrastructure",
  },
];

export function EnterpriseFeatures() {
  return (
    <Section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Enterprise Platform"
          title="New capabilities for modern infrastructure teams"
          description="From AI-powered anomaly detection to multi-cloud discovery, Knowledge Tree gives your team the tools to understand and manage infrastructure at scale."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enterpriseFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.05}>
                <a href={feature.href} className="block h-full group">
                  <GlassCard className="h-full p-6 hover:border-border-glow transition-all duration-300">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-accent-purple/20 to-primary-600/20 mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <h3 className="text-base font-semibold text-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </GlassCard>
                </a>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <GradientButton href="/features">
            View All Features <ArrowRight className="w-4 h-4" />
          </GradientButton>
        </div>
      </div>
    </Section>
  );
}
