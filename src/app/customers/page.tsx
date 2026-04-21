import type { Metadata } from "next";
import { GradientText, GradientButton, GlassCard } from "@/components/shared/GlassComponents";
import { Section } from "@/components/shared/Section";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Quote, TrendingDown, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Customers",
  description: "See how enterprise teams use Knowledge Tree to discover, map, and document their infrastructure.",
};

const caseStudies = [
  {
    company: "Meridian Financial",
    industry: "Financial Technology",
    size: "2,000 employees",
    icon: ShieldCheck,
    challenge: "Regulatory compliance (SOC 2, PCI-DSS) with 15,000+ cloud resources across AWS and Azure. Audit preparation consumed 3 months per year.",
    solution: "Automated discovery with compliance-ready documentation that updates in real-time as infrastructure changes.",
    results: [
      { metric: "85%", label: "Reduction in audit prep time" },
      { metric: "3,200", label: "Orphaned resources discovered" },
      { metric: "$240K", label: "Annual savings from cleanup" },
    ],
    quote: "We went from dreading audits to completing them in days instead of months.",
    person: "Sarah Chen",
    title: "VP of Platform Engineering",
  },
  {
    company: "NovaTech",
    industry: "SaaS Platform",
    size: "800 employees",
    icon: Clock,
    challenge: "Kubernetes sprawl across 12 clusters with no way to map service dependencies. Incidents took hours to diagnose.",
    solution: "Knowledge graph automatically mapped all service-to-service dependencies, enabling instant blast radius analysis.",
    results: [
      { metric: "60%", label: "Faster incident response" },
      { metric: "3 weeks", label: "New engineer onboarding (was 3 months)" },
      { metric: "12", label: "Clusters fully mapped in 1 hour" },
    ],
    quote: "During our last incident, we identified the blast radius in 30 seconds instead of 2 hours.",
    person: "Marcus Williams",
    title: "Director of SRE",
  },
  {
    company: "Atlas Logistics",
    industry: "Supply Chain & Logistics",
    size: "5,000 employees",
    icon: TrendingDown,
    challenge: "Multi-cloud infrastructure (AWS + GCP + Azure) inherited through three acquisitions. No unified view of what they owned.",
    solution: "Single platform discovering across all three clouds with automatic relationship mapping and cost optimization insights.",
    results: [
      { metric: "47→12", label: "AWS accounts consolidated" },
      { metric: "$1.2M", label: "Annual savings from decommissioning" },
      { metric: "100%", label: "Infrastructure visibility achieved" },
    ],
    quote: "We finally have a complete picture of what we own and how it connects.",
    person: "Dr. Priya Patel",
    title: "Chief Technology Officer",
  },
  {
    company: "Cipher Security",
    industry: "Cybersecurity",
    size: "400 employees",
    icon: ShieldCheck,
    challenge: "Security audits required complete infrastructure documentation they couldn't maintain manually between audit cycles.",
    solution: "Auto-generated documentation with change tracking ensures audit-ready docs are always current.",
    results: [
      { metric: "0", label: "Documentation findings in last audit" },
      { metric: "Record", label: "Fastest SOC 2 Type II renewal" },
      { metric: "90%", label: "Less time on doc maintenance" },
    ],
    quote: "Our auditors were impressed. They'd never seen infrastructure docs this current.",
    person: "James Rodriguez",
    title: "Chief Information Security Officer",
  },
];

export default function CustomersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Trusted by teams that{" "}
            <GradientText>can&apos;t afford to guess</GradientText>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            From fintech to logistics, engineering teams rely on Knowledge Tree
            to know their infrastructure inside and out.
          </p>
        </div>
      </section>

      {/* Aggregate metrics */}
      <section className="py-12 border-y border-border-subtle bg-bg-dark-blue/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: "200+", label: "Enterprise customers" },
              { metric: "200K+", label: "Resources mapped daily" },
              { metric: "$4.2M", label: "Saved in unused resources" },
              { metric: "85%", label: "Faster audit preparation" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary-400">{stat.metric}</div>
                <div className="text-sm text-text-secondary mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      {caseStudies.map((cs, i) => {
        const Icon = cs.icon;
        const isEven = i % 2 === 0;
        return (
          <Section key={cs.company} className="!py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-start`}>
                  {/* Text content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600/20 to-accent-purple/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-primary">{cs.company}</h3>
                        <p className="text-sm text-text-muted">{cs.industry} · {cs.size}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div>
                        <h4 className="text-sm font-semibold text-accent-orange uppercase tracking-wider mb-1">Challenge</h4>
                        <p className="text-text-secondary">{cs.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-1">Solution</h4>
                        <p className="text-text-secondary">{cs.solution}</p>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="relative pl-6 border-l-2 border-primary-600/30">
                      <Quote className="absolute -left-3 -top-1 w-6 h-6 text-primary-600/50" />
                      <p className="text-text-primary italic mb-2">&ldquo;{cs.quote}&rdquo;</p>
                      <p className="text-sm text-text-muted">
                        <span className="text-text-secondary font-medium">{cs.person}</span>, {cs.title}
                      </p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="lg:w-80 flex-shrink-0">
                    <GlassCard className="p-6">
                      <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-6">Results</h4>
                      <div className="space-y-6">
                        {cs.results.map((r) => (
                          <div key={r.label}>
                            <div className="text-3xl font-bold text-primary-400">{r.metric}</div>
                            <div className="text-sm text-text-secondary">{r.label}</div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </Section>
        );
      })}

      {/* CTA */}
      <section className="py-20 border-t border-border-subtle">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Join 200+ infrastructure teams
          </h2>
          <p className="text-text-secondary mb-8">
            Start your 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GradientButton href="/pricing">
              Start Free Trial
            </GradientButton>
            <GradientButton href="mailto:sales@knowledgetree.dev" variant="outline">
              Contact Sales
            </GradientButton>
          </div>
        </div>
      </section>
    </>
  );
}
