import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `${SITE_NAME} terms of service and subscription agreement.`,
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary">
          <p className="text-text-secondary/80">Last updated: April 2026</p>

          <h2 className="text-xl font-semibold text-text-primary">1. Acceptance</h2>
          <p>
            By accessing or using {SITE_NAME}, you agree to be bound by these Terms of Service.
            If you are using {SITE_NAME} on behalf of an organization, you represent that you
            have authority to bind that organization to these terms.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">2. Subscription</h2>
          <p>
            {SITE_NAME} is offered under paid subscription plans (Team, Business, Enterprise).
            Subscriptions are billed annually. All plans include a 14-day free trial. You may
            cancel at any time during the trial period without charge.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">3. Service Level</h2>
          <p>
            Enterprise plan subscribers receive a 99.9% uptime SLA with dedicated support.
            Business plan subscribers receive priority support with a 4-hour response SLA.
            All plans include access to our documentation and knowledge base.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">4. Data & Security</h2>
          <p>
            You retain full ownership of all infrastructure data discovered by {SITE_NAME}.
            Cloud provider credentials are encrypted at rest and used solely for read-only
            discovery. We do not access, share, or sell your infrastructure data.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">5. Use</h2>
          <p>
            You are responsible for ensuring that your use of {SITE_NAME} complies with
            your organization&apos;s policies and applicable regulations. You are responsible
            for the security of your cloud provider credentials and API keys.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">6. Termination</h2>
          <p>
            Either party may terminate with 30 days written notice. Upon termination, your
            data will be available for export for 30 days, after which it will be permanently
            deleted from our systems.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">7. Limitation of Liability</h2>
          <p>
            {SITE_NAME} IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND. IN NO EVENT SHALL
            THE COMPANY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL
            DAMAGES ARISING OUT OF OR IN CONNECTION WITH THE SERVICE.
          </p>

          <h2 className="text-xl font-semibold text-text-primary">8. Contact</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a
              href="mailto:legal@knowledgetree.dev"
              className="text-primary-400 hover:text-primary-300 underline"
            >
              legal@knowledgetree.dev
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
