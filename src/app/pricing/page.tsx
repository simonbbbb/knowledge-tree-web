import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { PRICING_TIERS } from "@/lib/constants";
import { GradientButton, GradientText, GlassCard } from "@/components/shared/GlassComponents";
import { Section } from "@/components/shared/Section";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Enterprise pricing for Knowledge Tree. Team, Business, and Enterprise plans with 14-day free trial.",
};

const featureComparison = [
  { feature: "Cloud providers", team: "3", business: "Unlimited", enterprise: "Unlimited" },
  { feature: "Discovery scopes", team: "10", business: "50", enterprise: "Unlimited" },
  { feature: "Knowledge graph", team: true, business: true, enterprise: true },
  { feature: "Auto-documentation", team: true, business: true, enterprise: true },
  { feature: "REST API & CLI", team: true, business: true, enterprise: true },
  { feature: "Change detection", team: true, business: true, enterprise: true },
  { feature: "MCP server", team: true, business: true, enterprise: true },
  { feature: "Team collaboration", team: false, business: true, enterprise: true },
  { feature: "SSO / SAML", team: false, business: true, enterprise: true },
  { feature: "RBAC", team: false, business: true, enterprise: true },
  { feature: "Confluence & Jira", team: false, business: true, enterprise: true },
  { feature: "Audit logs", team: false, business: true, enterprise: true },
  { feature: "On-premise deployment", team: false, business: false, enterprise: true },
  { feature: "Custom integrations", team: false, business: false, enterprise: true },
  { feature: "Dedicated CSM", team: false, business: false, enterprise: true },
  { feature: "99.9% SLA", team: false, business: false, enterprise: true },
  { feature: "SOC 2 report", team: false, business: false, enterprise: true },
  { feature: "SCIM provisioning", team: false, business: false, enterprise: true },
  { feature: "Support SLA", team: "Email (48h)", business: "Priority (4h)", enterprise: "24/7 (1h)" },
];

const faqs = [
  {
    q: "How long does deployment take?",
    a: "Under 30 minutes with Docker or Kubernetes. Connect your cloud accounts with read-only credentials and you're running.",
  },
  {
    q: "Does it work with our existing tools?",
    a: "Yes. Knowledge Tree integrates with Confluence, Jira, Slack, and PagerDuty. Documentation pushes directly to where your teams work.",
  },
  {
    q: "Is my data secure?",
    a: "SOC 2 Type II certified. All data encrypted at rest and in transit. Discovery uses read-only credentials. No data leaves your environment.",
  },
  {
    q: "Can we run it on-premise?",
    a: "Yes, the Enterprise plan includes on-premise deployment for organizations with strict data residency requirements.",
  },
  {
    q: "What's the minimum commitment?",
    a: "Annual commitment with monthly invoicing available. 14-day free trial to evaluate before committing.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — 14 days, no credit card required. Full access to all features in your chosen plan tier.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Invest in <GradientText>visibility</GradientText>, not firefighting
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            14-day free trial on all plans. No credit card required. Deploy in under 30 minutes.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  tier.highlighted
                    ? "border-2 border-primary-500 bg-bg-card shadow-xl shadow-primary-600/10"
                    : "border border-border-subtle bg-bg-card/50"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-primary-600 to-accent-purple text-white">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-text-secondary">{tier.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-text-primary">
                    {tier.price}
                  </span>
                  <span className="text-text-secondary ml-2 text-sm">
                    {tier.period}
                  </span>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <GradientButton
                  href={tier.ctaHref}
                  variant={tier.highlighted ? "primary" : "outline"}
                >
                  {tier.cta}
                </GradientButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <Section className="border-y border-border-subtle">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              The math is <GradientText>simple</GradientText>
            </h2>
            <p className="text-text-secondary">
              Knowledge Tree pays for itself within the first month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard className="p-8 border border-red-500/20">
              <h3 className="text-lg font-semibold text-red-400 mb-6">Without Knowledge Tree</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Documentation maintenance</span>
                  <span className="text-text-primary font-medium">$36,000/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Extended incident response</span>
                  <span className="text-text-primary font-medium">$35,000/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Audit preparation</span>
                  <span className="text-text-primary font-medium">$15,000/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Orphaned resource waste</span>
                  <span className="text-text-primary font-medium">$15,000/mo</span>
                </div>
                <div className="pt-4 border-t border-border-subtle flex justify-between">
                  <span className="text-text-primary font-semibold">Total monthly cost</span>
                  <span className="text-red-400 font-bold text-xl">$101,000/mo</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border border-green-500/20">
              <h3 className="text-lg font-semibold text-green-400 mb-6">With Knowledge Tree</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Documentation maintenance</span>
                  <span className="text-text-primary font-medium">$1,500/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Extended incident response</span>
                  <span className="text-text-primary font-medium">$14,000/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Audit preparation</span>
                  <span className="text-text-primary font-medium">$2,250/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Orphaned resource waste</span>
                  <span className="text-text-primary font-medium">$0/mo</span>
                </div>
                <div className="pt-4 border-t border-border-subtle flex justify-between">
                  <span className="text-text-primary font-semibold">Total monthly cost</span>
                  <span className="text-green-400 font-bold text-xl">$17,750/mo</span>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="text-center mt-8">
            <p className="text-2xl font-bold text-text-primary">
              Net savings: <GradientText>$83,250/month</GradientText> ($999,000/year)
            </p>
          </div>
        </div>
      </Section>

      {/* Feature comparison */}
      <Section>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
            Feature comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Feature</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-text-secondary">Team</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-primary-400">Business</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-text-secondary">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row) => (
                  <tr key={row.feature} className="border-b border-border-subtle/50">
                    <td className="py-3 px-4 text-sm text-text-secondary">{row.feature}</td>
                    {(["team", "business", "enterprise"] as const).map((plan) => {
                      const val = row[plan];
                      return (
                        <td key={plan} className="text-center py-3 px-4">
                          {val === true ? (
                            <Check className="w-4 h-4 text-primary-400 mx-auto" />
                          ) : val === false ? (
                            <X className="w-4 h-4 text-text-muted mx-auto" />
                          ) : (
                            <span className="text-sm text-text-primary">{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-border-subtle">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-base font-semibold text-text-primary mb-2">{faq.q}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
