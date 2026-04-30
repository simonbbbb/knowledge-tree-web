import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeatureShowcase } from "@/components/home/FeatureShowcase";
import { StatsCounter } from "@/components/home/StatsCounter";
import { CTASection } from "@/components/home/CTASection";
import { LogoCloud } from "@/components/home/LogoCloud";
import { HowItWorks } from "@/components/home/HowItWorks";
import { EnterpriseFeatures } from "@/components/home/EnterpriseFeatures";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Infrastructure Discovery & Documentation Platform`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Infrastructure Discovery & Documentation Platform`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <FeatureShowcase />
      <EnterpriseFeatures />
      <HowItWorks />
      <LogoCloud />
      <CTASection />
    </>
  );
}
