import type { Metadata } from "next";
import { GradientText, GradientButton, GlassCard } from "@/components/shared/GlassComponents";
import { Section } from "@/components/shared/Section";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import {
  MessageCircle,
  Route,
  Tag,
  Headphones,
  Users,
  Cloud,
  Container,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Design Partners",
  description:
    "Knowledge Tree is in early access. Partner with us to shape the future of infrastructure discovery and auto-documentation.",
};

const benefits = [
  {
    icon: MessageCircle,
    title: "Direct line to the founders",
    description:
      "Weekly check-ins, a shared Slack channel, and zero support tiers between you and the people building the product.",
  },
  {
    icon: Route,
    title: "Shape the roadmap",
    description:
      "Your use cases drive what we build next. We prioritize design-partner requests above everything else for the first year.",
  },
  {
    icon: Tag,
    title: "Founding-customer pricing",
    description:
      "Locked-in rates for the lifetime of your contract, well below our eventual list pricing. No seat minimums while we iterate.",
  },
  {
    icon: Headphones,
    title: "White-glove onboarding",
    description:
      "We install, configure, and tune Knowledge Tree to your environment ourselves. Hands-on help until it is genuinely useful to your team.",
  },
];

const idealPartner = [
  {
    icon: Users,
    title: "Platform, SRE, or infra team of 5+",
    description:
      "You feel the pain of undocumented infrastructure every week and have authority to pilot new tools.",
  },
  {
    icon: Cloud,
    title: "Non-trivial cloud footprint",
    description:
      "At least one major cloud (AWS / Azure / GCP) with hundreds of resources, or a production Kubernetes environment.",
  },
  {
    icon: Container,
    title: "Willing to actually use it",
    description:
      "Able to dedicate a few hours per week for the first month to onboard, give feedback, and let us watch you work.",
  },
  {
    icon: FileCheck,
    title: "Open to a reference story later",
    description:
      "If it works, we would love to write about it together once you are comfortable. Not a requirement to join.",
  },
];

const whatWereBuilding = [
  {
    label: "Multi-cloud discovery",
    description: "AWS, Azure, GCP, Kubernetes in one graph — live today.",
  },
  {
    label: "Knowledge graph",
    description: "Apache AGE backed, queryable with Cypher and MCP.",
  },
  {
    label: "Auto-documentation",
    description: "LLM-generated service docs, runbooks, and topology maps.",
  },
  {
    label: "Change timeline",
    description: "Real-time drift detection with audit-ready history.",
  },
];

export default function CustomersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary-600/10 text-primary-400 border border-primary-600/20">
            Early access · Design partner program
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Build Knowledge Tree with us as a{" "}
            <GradientText>design partner</GradientText>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            We are pre-launch. Instead of pretending otherwise, we are inviting
            a small number of infrastructure teams to shape the product in
            exchange for founding-customer pricing and direct access to the
            team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GradientButton href="mailto:hello@knowledgetree.dev?subject=Design%20partner%20application">
              Apply to join
            </GradientButton>
            <GradientButton href="/demo" variant="outline">
              See the product
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Honesty section */}
      <Section className="!py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <GlassCard className="p-8">
              <h2 className="text-xl font-semibold text-text-primary mb-3">
                Where we are, honestly
              </h2>
              <p className="text-text-secondary leading-relaxed mb-3">
                Knowledge Tree is a working product, not a marketing site with
                nothing behind it. Discovery, the knowledge graph, and
                auto-documentation all run in production-grade environments
                today.
              </p>
              <p className="text-text-secondary leading-relaxed">
                What we do not have yet are hundreds of paying enterprise
                customers. We would rather build the first ten with people who
                care than invent them. If that sounds like you, read on.
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </Section>

      {/* What design partners get */}
      <Section className="!py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-3">
                What you get
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Design partners trade a little patience for a lot of influence
                and a price that will never come back.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <ScrollReveal key={b.title} delay={i * 0.05}>
                  <GlassCard className="p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-1">
                          {b.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Ideal partner */}
      <Section className="!py-16 border-t border-border-subtle">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-3">
                Who we are looking for
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                We can only properly support a handful of partners at once, so
                we are picky on purpose.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {idealPartner.map((p, i) => {
              const Icon = p.icon;
              return (
                <ScrollReveal key={p.title} delay={i * 0.05}>
                  <GlassCard className="p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-1">
                          {p.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* What's live */}
      <Section className="!py-16 border-t border-border-subtle">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-text-primary mb-3">
                What is running today
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Not a slideware pitch. These are the capabilities you can see
                on the demo page right now.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {whatWereBuilding.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-5 rounded-xl border border-border-subtle bg-bg-card/40">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary-400 flex-shrink-0" />
                  <div>
                    <div className="text-text-primary font-semibold mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {item.description}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-20 border-t border-border-subtle">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Think you fit? Let us talk.
          </h2>
          <p className="text-text-secondary mb-8">
            Send us a note with a short description of your infrastructure and
            what you would want Knowledge Tree to solve. We respond to every
            application personally.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GradientButton href="mailto:hello@knowledgetree.dev?subject=Design%20partner%20application">
              Apply to join
            </GradientButton>
            <GradientButton href="/demo" variant="outline">
              Explore the demo
            </GradientButton>
          </div>
        </div>
      </section>
    </>
  );
}
