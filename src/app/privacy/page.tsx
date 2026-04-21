import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${SITE_NAME} privacy policy.`,
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary">
          <p className="text-text-secondary/80">Last updated: April 2026</p>

          <h2 className="text-xl font-semibold text-text-primary">1. Introduction</h2>
          <p>
            {SITE_NAME} is an enterprise infrastructure discovery and documentation platform.
            We take data privacy seriously. Your infrastructure data is processed within your
            environment and is never shared with third parties without your explicit consent.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">2. Data Collection</h2>
          <p>
            All discovered infrastructure data remains in your PostgreSQL database under your
            control. We do not access, store, or transmit your infrastructure data. Optional
            telemetry is anonymized and can be disabled entirely.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">3. Cloud Provider Credentials</h2>
          <p>
            Cloud provider credentials (AWS, Azure, GCP) are used solely for read-only
            discovery of your infrastructure. Credentials are encrypted at rest and never
            transmitted externally.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">4. LLM Integration</h2>
          <p>
            AI-powered enrichment sends only metadata (not secrets or credentials) to your
            configured LLM provider. We recommend using private models for sensitive
            environments. You have full control over which LLM provider you use.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">5. Website & Service</h2>
          <p>
            Our website and service may use standard web analytics. For SaaS deployments,
            we process account information (email, name, organization) solely for service
            delivery and billing. We never sell personal data.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">6. Compliance</h2>
          <p>
            {SITE_NAME} is SOC 2 Type II compliant. We maintain strict data handling
            procedures and undergo regular security audits.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">7. Contact</h2>
          <p>
            For privacy-related questions, contact us at{" "}
            <a
              href="mailto:privacy@knowledgetree.dev"
              className="text-primary-400 hover:text-primary-300 underline"
            >
              privacy@knowledgetree.dev
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
