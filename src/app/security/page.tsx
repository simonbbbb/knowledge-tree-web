import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { Shield, Lock, Eye, Server, CheckCircle } from "lucide-react";
import { GlassCard, GradientText, GradientButton } from "@/components/shared/GlassComponents";
import { Section } from "@/components/shared/Section";

export const metadata: Metadata = {
  title: "Security",
  description: `${SITE_NAME} security practices, compliance, and data protection.`,
};

export default function SecurityPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Security is <GradientText>non-negotiable</GradientText>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Your infrastructure data never leaves your control. Built from the ground up
            for enterprises that take security seriously.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard className="p-8">
              <Shield className="w-8 h-8 text-primary-400 mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">SOC 2 Type II</h3>
              <p className="text-sm text-text-secondary">
                Annually audited controls for security, availability, and confidentiality.
              </p>
            </GlassCard>
            <GlassCard className="p-8">
              <Lock className="w-8 h-8 text-primary-400 mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">Encrypted at Rest</h3>
              <p className="text-sm text-text-secondary">
                All credentials and sensitive data encrypted with AES-256. Keys managed
                through your preferred vault integration.
              </p>
            </GlassCard>
            <GlassCard className="p-8">
              <Eye className="w-8 h-8 text-primary-400 mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">Read-Only Access</h3>
              <p className="text-sm text-text-secondary">
                Discovery uses read-only credentials. We never modify, create, or delete
                any of your infrastructure resources.
              </p>
            </GlassCard>
            <GlassCard className="p-8">
              <Server className="w-8 h-8 text-primary-400 mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">On-Premise Option</h3>
              <p className="text-sm text-text-secondary">
                Enterprise plan includes on-premise deployment. Your data never leaves
                your network perimeter.
              </p>
            </GlassCard>
            <GlassCard className="p-8">
              <CheckCircle className="w-8 h-8 text-primary-400 mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">SSO & RBAC</h3>
              <p className="text-sm text-text-secondary">
                SAML 2.0 SSO with fine-grained role-based access control. Audit logs for
                every action.
              </p>
            </GlassCard>
            <GlassCard className="p-8">
              <Shield className="w-8 h-8 text-primary-400 mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">Vulnerability Scanning</h3>
              <p className="text-sm text-text-secondary">
                Container images scanned with Trivy on every build. Dependencies monitored
                for CVEs with automated patching.
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      <section className="py-16 border-t border-border-subtle">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Have security questions?
          </h2>
          <p className="text-text-secondary mb-6">
            We're happy to share our full security documentation, complete a security review,
            or sign your NDA.
          </p>
          <GradientButton href="mailto:security@knowledgetree.dev" variant="outline">
            Contact Our Security Team
          </GradientButton>
        </div>
      </section>
    </>
  );
}
