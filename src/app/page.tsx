import { Hero } from "@/components/home/Hero";
import { FeatureShowcase } from "@/components/home/FeatureShowcase";
import { StatsCounter } from "@/components/home/StatsCounter";
import { CTASection } from "@/components/home/CTASection";
import { LogoCloud } from "@/components/home/LogoCloud";
import { HowItWorks } from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <FeatureShowcase />
      <HowItWorks />
      <LogoCloud />
      <CTASection />
    </>
  );
}
