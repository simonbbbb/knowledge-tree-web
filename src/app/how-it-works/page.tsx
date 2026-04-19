import type { Metadata } from "next";
import { HowItWorks } from "@/components/home/HowItWorks";
import { GradientText } from "@/components/shared/GlassComponents";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Knowledge Tree discovers, maps, and documents your infrastructure in three simple steps.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            How <GradientText>Knowledge Tree</GradientText> works
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            From discovery to documentation in three steps. No agents to install,
            no credentials to manage in multiple places.
          </p>
        </div>
      </section>

      <HowItWorks />

      {/* Technical details */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-border-subtle bg-bg-card/50">
              <div className="text-3xl font-bold text-primary-400 mb-2">5min</div>
              <div className="text-sm text-text-secondary">Average time to first discovery with Docker Compose</div>
            </div>
            <div className="p-6 rounded-xl border border-border-subtle bg-bg-card/50">
              <div className="text-3xl font-bold text-accent-purple mb-2">0</div>
              <div className="text-sm text-text-secondary">Agents required on your infrastructure</div>
            </div>
            <div className="p-6 rounded-xl border border-border-subtle bg-bg-card/50">
              <div className="text-3xl font-bold text-accent-orange mb-2">100%</div>
              <div className="text-sm text-text-secondary">Open source under Apache 2.0 license</div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
