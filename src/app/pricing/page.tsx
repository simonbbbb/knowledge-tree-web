import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PRICING_TIERS } from "@/lib/constants";
import { GradientButton, GradientText } from "@/components/shared/GlassComponents";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Knowledge Tree is open source and free. Explore Pro and Enterprise plans for teams and organizations.",
};

export default function PricingPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Simple, <GradientText>transparent</GradientText> pricing
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Start free with the open-source edition. Scale to Pro or Enterprise
            when your team needs more.
          </p>
        </div>
      </section>

      <section className="pb-24">
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
                  {tier.period !== "forever" && (
                    <span className="text-text-secondary ml-2 text-sm">
                      /{tier.period}
                    </span>
                  )}
                  {tier.period === "forever" && (
                    <span className="text-text-secondary ml-2 text-sm">
                      {tier.period}
                    </span>
                  )}
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
    </>
  );
}
