import { GITHUB_REPO } from "@/lib/constants";
import { GradientButton, GradientText } from "@/components/shared/GlassComponents";
import { ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/components/shared/Icons";

export function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-bg-dark to-accent-purple/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-600/15 rounded-full blur-[100px]" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Ready to <GradientText>discover</GradientText> your infrastructure?
        </h2>
        <p className="text-lg text-text-secondary mb-8">
          Get started in minutes with Docker Compose. No cloud credentials needed
          for the sample data experience.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <GradientButton href="/docs">
            Get Started <ArrowRight className="w-4 h-4" />
          </GradientButton>
          <GradientButton href={GITHUB_REPO} variant="outline">
            <GitHubIcon className="w-4 h-4" /> Star on GitHub
          </GradientButton>
        </div>
      </div>
    </section>
  );
}
