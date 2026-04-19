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
            {SITE_NAME} is an open-source, self-hosted infrastructure discovery tool.
            We do not collect, store, or transmit any of your infrastructure data to
            third parties. All data processing happens within your own environment.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">2. Data Collection</h2>
          <p>
            When you run {SITE_NAME}, all discovered infrastructure data remains in your
            PostgreSQL database. No telemetry, analytics, or usage data is sent to us or
            any third party.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">3. Cloud Provider Credentials</h2>
          <p>
            Cloud provider credentials (AWS, Azure, GCP) are used solely for read-only
            discovery of your infrastructure. Credentials are stored locally in your
            configuration and never transmitted externally.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">4. LLM Integration</h2>
          <p>
            If you enable LLM-powered enrichment, infrastructure metadata may be sent to
            your configured LLM provider (e.g., OpenAI, Ollama). We recommend using
            local models (Ollama) for sensitive environments. You have full control over
            which LLM provider you use and what data is sent.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">5. Website</h2>
          <p>
            This website (knowledgetree.dev) may use standard web analytics to understand
            traffic patterns. No personal information is collected beyond what is
            standard for web server logs.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">6. Contact</h2>
          <p>
            For privacy-related questions, please open an issue on our{" "}
            <a
              href="https://github.com/knowledge-tree/knowledge-tree"
              className="text-primary-400 hover:text-primary-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
