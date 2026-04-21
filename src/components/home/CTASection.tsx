import { GradientButton, GradientText } from "@/components/shared/GlassComponents";
import { ArrowRight, Calendar } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-bg-dark to-accent-purple/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-600/15 rounded-full blur-[100px]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Stop guessing. <GradientText>Start knowing.</GradientText>
        </h2>
        <p className="text-lg text-text-secondary mb-4">
          Every undocumented resource is a ticking time bomb. Every stale
          runbook is a liability. Knowledge Tree eliminates documentation debt
          and gives your team complete infrastructure visibility.
        </p>
        <p className="text-sm text-text-muted mb-8">
          14-day free trial. No credit card required. Deploy in under 30 minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <GradientButton href="/demo">
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </GradientButton>
          <GradientButton href="mailto:sales@knowledgetree.dev" variant="outline">
            <Calendar className="w-4 h-4" /> Schedule a Demo
          </GradientButton>
        </div>
      </div>
    </section>
  );
}
