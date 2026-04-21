"use client";

const integrations = [
  "AWS",
  "Azure",
  "GCP",
  "Kubernetes",
  "Terraform",
  "Confluence",
  "Jira",
  "Slack",
  "PagerDuty",
  "Datadog",
  "Prometheus",
  "Grafana",
];

export function LogoCloud() {
  return (
    <section className="py-16 border-y border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-text-muted mb-8">
          Integrates with your existing infrastructure stack
        </p>
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-dark to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-dark to-transparent z-10" />

          <div className="flex animate-[marquee_30s_linear_infinite]">
            {[...integrations, ...integrations].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex-shrink-0 mx-6 flex items-center justify-center"
              >
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-subtle bg-bg-card/50 text-text-secondary hover:text-text-primary hover:border-border-glow transition-colors">
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-primary-600/30 to-accent-purple/30 flex items-center justify-center text-[10px] font-bold text-primary-400">
                    {name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap">
                    {name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
