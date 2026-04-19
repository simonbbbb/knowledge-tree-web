export const SITE_NAME = "Knowledge Tree";
export const SITE_URL = "https://knowledgetree.dev";
export const SITE_DESCRIPTION =
  "Open-source infrastructure discovery and auto-documentation. Discover, map, and document your cloud, Kubernetes, and network infrastructure automatically.";
export const GITHUB_REPO = "https://github.com/knowledge-tree/knowledge-tree";

export const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
] as const;

export const FEATURES = [
  {
    icon: "Cloud",
    title: "Multi-Cloud Discovery",
    description:
      "Automatic discovery across AWS, Azure, GCP, and Kubernetes. One tool to map your entire infrastructure.",
  },
  {
    icon: "Container",
    title: "Kubernetes Native",
    description:
      "Deep K8s discovery: deployments, services, pods, ingresses, config maps, and all relationships between them.",
  },
  {
    icon: "Network",
    title: "Knowledge Graph",
    description:
      "Apache AGE graph database maps every relationship between resources. Query with Cypher, visualize with interactive topology.",
  },
  {
    icon: "Sparkles",
    title: "LLM-Powered Enrichment",
    description:
      "AI-generated summaries, runbooks, and documentation. Works with Ollama (local) or OpenAI-compatible APIs.",
  },
  {
    icon: "FileText",
    title: "Auto-Documentation",
    description:
      "Generate living Markdown, HTML, and Mermaid documentation that updates when your infrastructure changes.",
  },
  {
    icon: "Puzzle",
    title: "Plugin SDK",
    description:
      "Write custom discovery plugins in Go. Full gRPC-based plugin system with versioned interfaces.",
  },
  {
    icon: "Terminal",
    title: "Interactive CLI",
    description:
      "Powerful command-line tools for discovery, querying, and documentation generation. Scriptable and automatable.",
  },
  {
    icon: "Bot",
    title: "MCP Server",
    description:
      "Model Context Protocol server lets AI assistants like Claude query your infrastructure in natural language.",
  },
] as const;

export const STATS = [
  { label: "Cloud Providers", value: "7+" },
  { label: "Resource Types", value: "200+" },
  { label: "License", value: "Apache 2.0" },
  { label: "Language", value: "Go" },
] as const;

export const STEPS = [
  {
    step: 1,
    title: "Discover",
    description:
      "Point Knowledge Tree at your clouds, clusters, and networks. Configure scopes for AWS, Azure, GCP, Kubernetes, DNS, and custom endpoints.",
    icon: "Search",
  },
  {
    step: 2,
    title: "Map",
    description:
      "Resources and their relationships are stored in a knowledge graph powered by PostgreSQL with Apache AGE and pgvector embeddings.",
    icon: "GitBranch",
  },
  {
    step: 3,
    title: "Document",
    description:
      "Auto-generate Markdown, HTML, and Mermaid documentation. AI-powered summaries and runbooks that stay up-to-date automatically.",
    icon: "FileText",
  },
] as const;

export const PRICING_TIERS = [
  {
    name: "Open Source",
    price: "Free",
    period: "forever",
    description: "Everything you need to discover and document your infrastructure.",
    features: [
      "All discovery plugins (AWS, Azure, GCP, K8s, DNS)",
      "Knowledge graph (self-hosted PostgreSQL)",
      "CLI and REST API",
      "Auto-documentation",
      "Plugin SDK",
      "MCP server for AI integration",
      "Community support",
    ],
    cta: "Get Started on GitHub",
    ctaHref: GITHUB_REPO,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "per user/month",
    description: "For teams that need managed hosting and collaboration.",
    features: [
      "Everything in Open Source",
      "Managed cloud hosting",
      "Team collaboration",
      "Custom plugins",
      "SSO / SAML",
      "Priority support",
      "Advanced analytics",
    ],
    cta: "Start Free Trial",
    ctaHref: "/docs",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For organizations with advanced security and compliance needs.",
    features: [
      "Everything in Pro",
      "Unlimited users",
      "Dedicated infrastructure",
      "SLA guarantees",
      "Custom integrations",
      "On-premise deployment",
      "Dedicated support engineer",
    ],
    cta: "Contact Sales",
    ctaHref: "mailto:hello@knowledgetree.dev",
    highlighted: false,
  },
] as const;
