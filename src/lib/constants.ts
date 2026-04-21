export const SITE_NAME = "Knowledge Tree";
export const SITE_URL = "https://knowledgetree.dev";
export const SITE_DESCRIPTION =
  "Enterprise infrastructure discovery and auto-documentation platform. Automatically discover, map, and document your cloud, Kubernetes, and network infrastructure.";
export const GITHUB_REPO = "https://github.com/knowledge-tree/knowledge-tree";

export const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Demo", href: "/demo" },
  { label: "Customers", href: "/customers" },
  { label: "Blog", href: "/blog" },
] as const;

export const FEATURES = [
  {
    icon: "Cloud",
    title: "Multi-Cloud Discovery",
    description:
      "Automatic discovery across AWS, Azure, GCP, and Kubernetes. One platform to map your entire infrastructure — no manual inventory required.",
  },
  {
    icon: "Container",
    title: "Kubernetes Native",
    description:
      "Deep K8s discovery: deployments, services, pods, ingresses, config maps, and all relationships. Understand your cluster topology at a glance.",
  },
  {
    icon: "Network",
    title: "Knowledge Graph",
    description:
      "Apache AGE graph database maps every relationship between resources. Query dependencies with Cypher, visualize with interactive topology views.",
  },
  {
    icon: "Sparkles",
    title: "AI-Powered Documentation",
    description:
      "LLM-generated summaries, runbooks, and documentation that stays current automatically. Reduces documentation effort by 90%.",
  },
  {
    icon: "FileText",
    title: "Compliance-Ready Reports",
    description:
      "Auto-generate documentation that satisfies SOC 2, PCI-DSS, and HIPAA audit requirements. Always current, always complete.",
  },
  {
    icon: "Puzzle",
    title: "Enterprise Integrations",
    description:
      "Connects with Confluence, Jira, Slack, and PagerDuty. Push documentation where your teams already work.",
  },
  {
    icon: "Terminal",
    title: "Change Detection",
    description:
      "Track infrastructure drift in real-time. Know when resources are created, modified, or decommissioned — before it becomes an incident.",
  },
  {
    icon: "Bot",
    title: "AI Assistant (MCP)",
    description:
      "Model Context Protocol server lets your AI assistants query infrastructure in natural language. Ask questions, get answers.",
  },
] as const;

export const STATS = [
  { label: "Resources Mapped", value: "200K+" },
  { label: "Enterprise Customers", value: "200+" },
  { label: "Uptime SLA", value: "99.9%" },
  { label: "Avg. Time to Value", value: "<30 min" },
] as const;

export const STEPS = [
  {
    step: 1,
    title: "Connect",
    description:
      "Connect your cloud accounts and Kubernetes clusters in minutes. Read-only access means zero risk to your infrastructure. AWS, Azure, GCP, and more.",
    icon: "Link",
  },
  {
    step: 2,
    title: "Discover",
    description:
      "Automatic discovery maps every resource, every relationship, every dependency. No manual input needed. See your complete infrastructure for the first time.",
    icon: "Search",
  },
  {
    step: 3,
    title: "Document",
    description:
      "Auto-generated documentation that stays current. Compliance-ready reports, runbooks, topology maps, and dependency graphs — all updated in real-time.",
    icon: "FileText",
  },
] as const;

export const PRICING_TIERS = [
  {
    name: "Team",
    price: "$99",
    period: "per seat/month",
    description: "For infrastructure teams getting started with automated discovery.",
    features: [
      "Up to 3 cloud providers",
      "Knowledge graph with Cypher queries",
      "Auto-documentation (Markdown, HTML)",
      "REST API & CLI access",
      "Change detection & alerts",
      "Email support",
      "10 discovery scopes",
    ],
    cta: "Start Free Trial",
    ctaHref: "/pricing",
    highlighted: false,
  },
  {
    name: "Business",
    price: "$499",
    period: "per seat/month",
    description: "For growing engineering organizations that need collaboration and integrations.",
    features: [
      "Everything in Team",
      "Unlimited cloud providers",
      "SSO / SAML authentication",
      "Team collaboration & RBAC",
      "Confluence & Jira integration",
      "Priority support with 4h SLA",
      "Advanced change detection",
      "50 discovery scopes",
      "Audit logs",
    ],
    cta: "Start Free Trial",
    ctaHref: "/pricing",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual contract",
    description: "For large organizations with advanced security, compliance, and scale requirements.",
    features: [
      "Everything in Business",
      "Unlimited users & scopes",
      "Dedicated infrastructure option",
      "99.9% uptime SLA",
      "On-premise deployment",
      "Custom integrations & plugins",
      "Dedicated Customer Success Manager",
      "SOC 2 Type II report",
      "SCIM user provisioning",
      "24/7 support with 1h response",
    ],
    cta: "Contact Sales",
    ctaHref: "mailto:sales@knowledgetree.dev",
    highlighted: false,
  },
] as const;
