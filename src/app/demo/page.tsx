"use client";

import { Fragment, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Server,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  GitBranch,
  Shield,
  Globe,
  Network,
  Activity,
  FileText,
} from "lucide-react";
import {
  GlassCard,
  GradientText,
  GradientButton,
} from "@/components/shared/GlassComponents";

// ---------------------------------------------------------------------------
// Tab definitions
// ---------------------------------------------------------------------------

const TABS = [
  { id: "graph", label: "Knowledge Graph" },
  { id: "inventory", label: "Service Inventory" },
  { id: "docs", label: "Documentation" },
  { id: "timeline", label: "Change Timeline" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ---------------------------------------------------------------------------
// Knowledge Graph data
// ---------------------------------------------------------------------------

type NodeType = "aws" | "k8s" | "database" | "network";

interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  properties: Record<string, string>;
}

const NODE_COLORS: Record<NodeType, { fill: string; stroke: string; ring: string; label: string }> = {
  aws: { fill: "#F59E0B", stroke: "#D97706", ring: "rgba(245,158,11,0.15)", label: "AWS" },
  k8s: { fill: "#22C55E", stroke: "#16A34A", ring: "rgba(34,197,94,0.15)", label: "K8s" },
  database: { fill: "#3B82F6", stroke: "#2563EB", ring: "rgba(59,130,246,0.15)", label: "DB" },
  network: { fill: "#8B5CF6", stroke: "#7C3AED", ring: "rgba(139,92,246,0.15)", label: "Net" },
};

const GRAPH_NODES: GraphNode[] = [
  { id: "n1", label: "API Gateway", type: "aws", x: 480, y: 60, properties: { Provider: "AWS", Service: "API Gateway", Region: "us-east-1", Requests: "1.2M/day", Latency: "12ms p99", "Throttle Rate": "0.02%" } },

  { id: "n2", label: "ALB", type: "aws", x: 340, y: 140, properties: { Provider: "AWS", Service: "ALB", Region: "us-east-1", Targets: "6 instances", Health: "100%", Protocol: "HTTPS" } },
  { id: "n3", label: "EKS Cluster", type: "k8s", x: 620, y: 140, properties: { Provider: "AWS EKS", Version: "1.29", Nodes: "12", Namespaces: "8", Pods: "94" } },
  { id: "n4", label: "Order Service", type: "k8s", x: 180, y: 240, properties: { Namespace: "production", Replicas: "3", Image: "order-svc:v2.4.1", CPU: "340m", Memory: "512Mi" } },
  { id: "n5", label: "Payment Service", type: "k8s", x: 420, y: 240, properties: { Namespace: "production", Replicas: "2", Image: "payment-svc:v1.8.0", CPU: "210m", Memory: "256Mi" } },
  { id: "n6", label: "User Service", type: "k8s", x: 660, y: 240, properties: { Namespace: "production", Replicas: "3", Image: "user-svc:v3.1.2", CPU: "180m", Memory: "384Mi" } },
  { id: "n7", label: "Notification Svc", type: "k8s", x: 880, y: 240, properties: { Namespace: "production", Replicas: "2", Image: "notif-svc:v1.2.0", CPU: "90m", Memory: "128Mi" } },
  { id: "n8", label: "RDS Primary", type: "database", x: 240, y: 360, properties: { Engine: "PostgreSQL 16", Instance: "db.r6g.xlarge", Storage: "500 GB", IOPS: "12,000", Connections: "285" } },
  { id: "n9", label: "RDS Replica", type: "database", x: 80, y: 440, properties: { Engine: "PostgreSQL 16", Instance: "db.r6g.large", Replication: "Async", Lag: "< 1s", "Read QPS": "4,200" } },
  { id: "n10", label: "Redis Cluster", type: "database", x: 440, y: 360, properties: { Engine: "Redis 7.2", Nodes: "6 (3 primary + 3 replica)", Memory: "13.5 GB used", "Hit Rate": "99.2%", Evictions: "0" } },
  { id: "n11", label: "DynamoDB", type: "database", x: 640, y: 360, properties: { Table: "sessions", RCUs: "8,000", WCUs: "3,000", Items: "14.2M", TTL: "24h" } },
  { id: "n12", label: "S3 Data Lake", type: "aws", x: 860, y: 360, properties: { Bucket: "kt-datalake-prod", Objects: "2.8M", Size: "4.2 TB", Versioning: "Enabled", Encryption: "AES-256" } },
  { id: "n13", label: "VPC", type: "network", x: 140, y: 60, properties: { CIDR: "10.0.0.0/16", Subnets: "6 (3 public + 3 private)", AZs: "us-east-1a/1b/1c", NAT: "3 gateways" } },
  { id: "n14", label: "Route 53", type: "network", x: 780, y: 60, properties: { "Hosted Zone": "api.example.com", Records: "12", "Health Checks": "4", "Latency Based": "Yes" } },
  { id: "n15", label: "CloudFront", type: "network", x: 940, y: 140, properties: { Distributions: "2", "Edge Locations": "Global", "Cache Hit": "94%", Bandwidth: "8.5 TB/mo" } },
  { id: "n16", label: "SQS Queue", type: "aws", x: 660, y: 460, properties: { Queue: "order-events", Messages: "~12K/hr", DLQ: "order-events-dlq", Retention: "4 days" } },
  { id: "n17", label: "Lambda", type: "aws", x: 480, y: 480, properties: { Function: "event-processor", Runtime: "Go 1.22", Memory: "512 MB", Duration: "45ms avg", Invocations: "290K/day" } },
  { id: "n18", label: "Prometheus", type: "k8s", x: 860, y: 440, properties: { Namespace: "monitoring", Targets: "94", Series: "284K", Retention: "30 days", Storage: "200 GB" } },
  { id: "n19", label: "Vault", type: "k8s", x: 1000, y: 340, properties: { Namespace: "security", Version: "1.15", Secrets: "1,240", Seal: "AWS KMS", HA: "3 pods" } },
  { id: "n20", label: "Kafka", type: "k8s", x: 180, y: 520, properties: { Cluster: "event-bus", Brokers: "3", Topics: "24", Partitions: "72", Throughput: "15K msg/s" } },
];

const GRAPH_EDGES: [string, string][] = [
  ["n1", "n2"],
  ["n1", "n3"],
  ["n2", "n4"],
  ["n2", "n5"],
  ["n3", "n5"],
  ["n3", "n6"],
  ["n3", "n7"],
  ["n4", "n8"],
  ["n4", "n10"],
  ["n5", "n10"],
  ["n5", "n8"],
  ["n6", "n11"],
  ["n6", "n10"],
  ["n7", "n12"],
  ["n7", "n16"],
  ["n8", "n9"],
  ["n10", "n17"],
  ["n11", "n17"],
  ["n16", "n17"],
  ["n13", "n2"],
  ["n13", "n3"],
  ["n14", "n1"],
  ["n14", "n15"],
  ["n15", "n12"],
  ["n17", "n20"],
  ["n4", "n20"],
  ["n18", "n3"],
  ["n19", "n3"],
  ["n5", "n9"],
];

// ---------------------------------------------------------------------------
// Service Inventory data
// ---------------------------------------------------------------------------

type Status = "healthy" | "degraded" | "alerting";

interface InventoryRow {
  id: string;
  name: string;
  type: string;
  provider: string;
  region: string;
  status: Status;
  lastSeen: string;
  connections: string[];
}

const INVENTORY_DATA: InventoryRow[] = [
  { id: "inv1", name: "API Gateway (prod)", type: "API Gateway", provider: "AWS", region: "us-east-1", status: "healthy", lastSeen: "2 min ago", connections: ["ALB", "EKS Cluster", "Route 53", "CloudFront"] },
  { id: "inv2", name: "EKS Production", type: "Kubernetes Cluster", provider: "AWS EKS", region: "us-east-1", status: "healthy", lastSeen: "1 min ago", connections: ["Order Service", "Payment Service", "User Service", "Prometheus", "Vault"] },
  { id: "inv3", name: "Order Service", type: "Deployment", provider: "Kubernetes", region: "us-east-1a", status: "healthy", lastSeen: "30s ago", connections: ["RDS Primary", "Redis Cluster", "Kafka", "ALB"] },
  { id: "inv4", name: "Payment Service", type: "Deployment", provider: "Kubernetes", region: "us-east-1a", status: "degraded", lastSeen: "1 min ago", connections: ["RDS Primary", "Redis Cluster", "RDS Replica", "Stripe API"] },
  { id: "inv5", name: "RDS Primary (orders)", type: "RDS Instance", provider: "AWS RDS", region: "us-east-1a", status: "healthy", lastSeen: "15s ago", connections: ["RDS Replica", "Order Service", "Payment Service"] },
  { id: "inv6", name: "Redis Cluster", type: "ElastiCache", provider: "AWS", region: "us-east-1", status: "healthy", lastSeen: "45s ago", connections: ["Order Service", "Payment Service", "User Service", "Lambda"] },
  { id: "inv7", name: "DynamoDB Sessions", type: "DynamoDB Table", provider: "AWS", region: "us-east-1", status: "healthy", lastSeen: "10s ago", connections: ["User Service", "Lambda"] },
  { id: "inv8", name: "S3 Data Lake", type: "S3 Bucket", provider: "AWS S3", region: "us-east-1", status: "healthy", lastSeen: "3 min ago", connections: ["Notification Svc", "CloudFront", "Athena"] },
  { id: "inv9", name: "SQS Order Events", type: "SQS Queue", provider: "AWS", region: "us-east-1", status: "healthy", lastSeen: "5s ago", connections: ["Notification Svc", "Lambda", "DLQ"] },
  { id: "inv10", name: "CloudFront CDN", type: "CDN Distribution", provider: "AWS", region: "Global", status: "healthy", lastSeen: "1 min ago", connections: ["S3 Data Lake", "Route 53", "ALB"] },
  { id: "inv11", name: "Kafka Event Bus", type: "StatefulSet", provider: "Kubernetes", region: "us-east-1a", status: "alerting", lastSeen: "4 min ago", connections: ["Order Service", "Lambda", "Analytics Pipeline"] },
  { id: "inv12", name: "Vault Secrets", type: "StatefulSet", provider: "Kubernetes", region: "us-east-1b", status: "healthy", lastSeen: "2 min ago", connections: ["EKS Production", "AWS KMS", "All Services"] },
];

// ---------------------------------------------------------------------------
// Documentation data
// ---------------------------------------------------------------------------

interface DocSection {
  title: string;
  content: string;
}

const DOC_RESOURCES = [
  "Order Service",
  "Payment Service",
  "EKS Cluster",
  "RDS Primary",
  "API Gateway",
] as const;

type DocResource = (typeof DOC_RESOURCES)[number];

const DOCS_BY_RESOURCE: Record<DocResource, DocSection[]> = {
  "Order Service": [
    {
      title: "Overview",
      content: `The **Order Service** is a core microservice in the e-commerce platform responsible for managing the full lifecycle of customer orders. It handles order creation, validation, payment coordination, inventory reservation, and order status tracking.

**Owner:** Platform Team (platform@example.com)
**Repository:** github.com/example/orderservice
**Language:** Go 1.22 | **Framework:** Chi v5
**Deployment:** Kubernetes Deployment (production namespace)
**SLA:** 99.95% uptime, < 200ms p99 latency`,
    },
    {
      title: "Dependencies",
      content: `**Upstream (consumes from):**
- ALB (HTTPS, port 443) -- receives API traffic
- Kafka (topic: inventory-events) -- inventory confirmations
- Vault -- secrets and database credentials

**Downstream (provides to):**
- Payment Service -- order creation events via Redis pub/sub
- Notification Service -- order status updates via SQS
- Analytics Pipeline -- order events via Kafka

**Data stores:**
- RDS Primary (PostgreSQL 16) -- order records, line items
- Redis Cluster -- session cache, rate limiting, distributed locks
- DynamoDB -- idempotency keys`,
    },
    {
      title: "Network Topology",
      content: `\`\`\`
Internet --> Route 53 --> CloudFront --> ALB --> [Order Service Pods x3]
                                              |
                    +---------+---------------+---------------+
                    |         |               |               |
                RDS Primary  Redis       SQS Queue      Kafka
                    |     (read-only)
                RDS Replica
\`\`\`

**Inbound ports:** 8080/TCP (health), 8081/TCP (metrics)
**Outbound:** PostgreSQL 5432, Redis 6379, SQS HTTPS, Kafka 9092
**Network Policy:** Allow ingress from ALB only; egress to data stores.`,
    },
    {
      title: "Runbook",
      content: `**High Error Rate (> 1%)**
1. Check Pod health: \`kubectl get pods -n production -l app=order-service\`
2. Review logs: \`kubectl logs -n deployment/order-service --tail=500\`
3. Check RDS connections: query \`pg_stat_activity\` for connection count
4. Verify Redis: \`redis-cli info clients\` and check eviction policy
5. Scale horizontally: \`kubectl scale deployment order-service --replicas=5\`

**Pod CrashLoopBackOff**
1. Check events: \`kubectl describe pod <pod-name> -n production\`
2. Review OOMKills -- increase memory limit if needed
3. Verify Vault sidecar is healthy and secrets are mounted

**Database Connection Exhaustion**
1. Check connection pool metrics in Prometheus
2. Reduce \`DB_MAX_CONNECTIONS\` if exceeding RDS limit
3. Enable PgBouncer if sustained high traffic`,
    },
    {
      title: "Change History",
      content: `| Date | Change | Author |
|------|--------|--------|
| 2026-04-19 | Upgraded to Go 1.22, reduced p99 by 34ms | @sarah |
| 2026-04-17 | Added idempotency keys via DynamoDB | @mike |
| 2026-04-14 | Scaled replicas 2 -> 3 for traffic growth | @platform-bot |
| 2026-04-10 | Migrated Redis client to v9, fixed connection leak | @james |
| 2026-04-06 | Added SQS DLQ for failed notification events | @sarah |
| 2026-04-02 | Deployed v2.4.0 -- new order validation rules | @mike |`,
    },
  ],

  "Payment Service": [
    {
      title: "Overview",
      content: `The **Payment Service** handles all payment processing, including credit card charges, refunds, chargebacks, and payment method tokenization. PCI-DSS Level 1 compliant with tokenization via Stripe and fallback to Adyen.

**Owner:** Billing Team (billing@example.com)
**Repository:** github.com/example/paymentservice
**Language:** Kotlin 1.9 | **Framework:** Spring Boot 3.2
**Deployment:** Kubernetes Deployment (production namespace, isolated PCI zone)
**SLA:** 99.99% uptime, < 500ms p99 latency
**Compliance:** PCI-DSS Level 1, SOC 2 Type II`,
    },
    {
      title: "Dependencies",
      content: `**Upstream (consumes from):**
- Order Service -- order creation events via Redis pub/sub
- Vault -- API keys for Stripe, Adyen, and internal signing keys

**Downstream (provides to):**
- Stripe API (HTTPS) -- primary payment processor
- Adyen API (HTTPS) -- fallback processor
- Notification Service -- payment confirmation events
- Fraud Service -- transaction risk scoring

**Data stores:**
- RDS Primary (PostgreSQL 16) -- transaction records (encrypted at rest)
- RDS Replica -- read-only reporting queries
- Redis Cluster -- idempotency keys, rate limiting`,
    },
    {
      title: "Network Topology",
      content: `\`\`\`
Order Service --> [Payment Service Pods x2] --> Stripe API
                        |                    -> Adyen API (fallback)
          +-------------+-------------+
          |             |             |
     RDS Primary    Redis        Vault (secrets)
          |
     RDS Replica (reporting)
\`\`\`

**Inbound ports:** 8443/TCP (mTLS only from Order Service)
**Outbound:** PostgreSQL 5432, Redis 6379, Stripe/Adyen HTTPS 443
**Network Policy:** mTLS required; egress restricted to approved payment processor CIDRs.`,
    },
    {
      title: "Runbook",
      content: `**Elevated 5xx Rate (> 0.5%)**
1. Check upstream processor health: \`curl https://status.stripe.com/api/v2/status.json\`
2. Review recent deploys: \`kubectl rollout history deployment/payment-service -n production\`
3. Check fallback activation: query Prometheus \`payment_fallback_active\`
4. If Stripe degraded, confirm Adyen fallback engaged automatically
5. Escalate to billing on-call if both processors affected

**Transaction Stuck in Pending**
1. Check \`payment_pending_duration_seconds\` metric for outliers
2. Query transactions: \`SELECT * FROM payments WHERE status='pending' AND created_at < NOW() - INTERVAL '10 minutes'\`
3. Reconcile against Stripe dashboard -- manual intervention may be required
4. Never retry automatically without idempotency key confirmation

**PCI Audit Trigger**
1. Do NOT access production logs directly -- use SIEM (Splunk)
2. Notify compliance@ immediately for any data exposure concern`,
    },
    {
      title: "Change History",
      content: `| Date | Change | Author |
|------|--------|--------|
| 2026-04-20 | Rolled back v1.9.0 (malformed JSON from upstream) | @mike |
| 2026-04-18 | Added Adyen fallback with circuit breaker | @james |
| 2026-04-12 | Rotated Stripe API keys via Vault | @platform-bot |
| 2026-04-08 | Upgraded Spring Boot 3.1 -> 3.2 | @sarah |
| 2026-04-01 | PCI-DSS annual audit passed | @compliance |`,
    },
  ],

  "EKS Cluster": [
    {
      title: "Overview",
      content: `The **EKS Production Cluster** is the primary Kubernetes environment hosting all production workloads. Multi-AZ deployment across us-east-1a/1b/1c with managed node groups and Karpenter-based autoscaling.

**Owner:** Platform Team (platform@example.com)
**Terraform:** github.com/example/infra-tf (modules/eks-prod)
**Version:** EKS 1.29 | **CNI:** VPC CNI 1.18 + Cilium
**Nodes:** 12 (8 on-demand m6i.xlarge, 4 spot m6i.2xlarge)
**SLA:** 99.95% control plane uptime (AWS managed)`,
    },
    {
      title: "Dependencies",
      content: `**Control plane:**
- AWS EKS managed control plane (us-east-1)
- IRSA (IAM Roles for Service Accounts) for pod-level AWS access
- AWS KMS -- envelope encryption for secrets

**Cluster add-ons:**
- Karpenter -- node autoscaling
- External DNS -- Route 53 record management
- Cert-Manager -- Let's Encrypt TLS certs
- AWS Load Balancer Controller -- ALB/NLB provisioning
- Prometheus + Grafana -- observability stack
- Vault Agent Injector -- secrets injection

**Workloads (namespaces):**
- production (12 deployments, 8 statefulsets)
- monitoring (Prometheus, Grafana, Loki)
- security (Vault, Falco, Trivy Operator)
- system (CoreDNS, Cilium, Karpenter)`,
    },
    {
      title: "Network Topology",
      content: `\`\`\`
VPC 10.0.0.0/16
   |
   +-- Public subnets  (3x /24) -- ALBs, NAT Gateways
   +-- Private subnets (3x /22) -- EKS nodes, pods (Cilium native routing)
   +-- Database subnets (3x /24) -- RDS, ElastiCache (isolated)

Pod CIDR: 100.64.0.0/16 (Cilium-managed, decoupled from VPC)
Service CIDR: 172.20.0.0/16
\`\`\`

**Ingress:** ALB Controller -> Ingress resources -> Services -> Pods
**Egress:** NAT Gateway per AZ; VPC Endpoints for S3, ECR, DynamoDB, STS
**NetworkPolicies:** Default deny; explicit allow via Cilium L7 policies`,
    },
    {
      title: "Runbook",
      content: `**Node NotReady**
1. \`kubectl get nodes\` -- identify affected node
2. Check CloudWatch EC2 status for instance
3. \`kubectl describe node <name>\` -- review conditions (MemoryPressure, DiskPressure)
4. If stuck: cordon + drain, Karpenter will replace within 2-3 min
5. For systemic issues, check Karpenter logs: \`kubectl logs -n karpenter -l app=karpenter\`

**Control Plane API Slow**
1. Check CloudWatch metric \`APIServerRequestLatency\`
2. Review audit logs for hot clients: \`kubectl top\` flooding is common
3. Escalate to AWS support if p99 > 1s sustained

**Certificate Expiry**
1. Cert-manager auto-renews 30 days before expiry
2. Check cert status: \`kubectl get certificates -A\`
3. Force renewal: \`kubectl cert-manager renew <cert> -n <ns>\``,
    },
    {
      title: "Change History",
      content: `| Date | Change | Author |
|------|--------|--------|
| 2026-04-21 | Auto-scaled 4 -> 6 instances (CPU > 80%) | auto-scaler |
| 2026-04-18 | Upgraded Cilium 1.14 -> 1.15 | @james |
| 2026-04-15 | EKS 1.28 -> 1.29 upgrade completed | @platform-bot |
| 2026-04-10 | Enabled Karpenter consolidation (20% cost reduction) | @sarah |
| 2026-04-03 | Migrated to IPv6 dual-stack for pod networking | @james |`,
    },
  ],

  "RDS Primary": [
    {
      title: "Overview",
      content: `The **RDS Primary** is the authoritative OLTP database for orders, payments, and user data. Multi-AZ deployment with automated failover, continuous backups to S3, and a cross-region read replica in us-west-2 for DR.

**Owner:** Data Platform Team (data-platform@example.com)
**Engine:** PostgreSQL 16.4 (engine version auto-minor-upgrade enabled)
**Instance:** db.r6g.xlarge (4 vCPU, 32 GiB RAM)
**Storage:** 500 GB gp3, 12,000 IOPS provisioned
**Backups:** 7-day PITR, daily snapshots to S3 (90-day retention)
**SLA:** 99.95% (Multi-AZ), RTO 60s, RPO 5s`,
    },
    {
      title: "Dependencies",
      content: `**Clients (primary writes):**
- Order Service -- orders, line_items tables
- Payment Service -- transactions, refunds tables (encrypted)
- User Service -- accounts, auth_sessions tables

**Replicas:**
- RDS Replica (us-east-1c) -- async, lag < 1s, 4,200 read QPS
- Cross-region replica (us-west-2) -- DR only, no production reads

**Integrations:**
- KMS -- storage encryption (customer-managed key)
- CloudWatch -- Enhanced Monitoring, Performance Insights
- Secrets Manager -- credential rotation every 30 days
- S3 -- automated snapshots and WAL archives`,
    },
    {
      title: "Network Topology",
      content: `\`\`\`
                    [Primary db.r6g.xlarge]
                      | us-east-1a
                      |
        +-------------+-------------+
        |                           |
  [Read Replica]           [Cross-Region Replica]
   us-east-1c                  us-west-2 (DR)
   async < 1s                async 30-60s
\`\`\`

**Subnet group:** db-subnets-prod (3x private /24, no internet egress)
**Security groups:** Ingress 5432 from EKS worker nodes only
**Parameter group:** pg16-prod (max_connections=500, shared_buffers=8GB)
**TLS:** Required (rds-ca-rsa2048-g1), certificate pinning in clients`,
    },
    {
      title: "Runbook",
      content: `**Connection Exhaustion**
1. Check active connections: \`SELECT count(*) FROM pg_stat_activity;\`
2. Identify top clients: \`SELECT client_addr, count(*) FROM pg_stat_activity GROUP BY 1 ORDER BY 2 DESC;\`
3. Kill long-running queries: \`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state='idle in transaction' AND state_change < NOW() - INTERVAL '5 min';\`
4. Scale up connection pool (PgBouncer) before scaling instance

**Replication Lag Spike**
1. Check CloudWatch \`ReplicaLag\` metric
2. Query on replica: \`SELECT EXTRACT(EPOCH FROM now() - pg_last_xact_replay_timestamp());\`
3. Look for long-running transactions on primary blocking WAL replay
4. If lag > 30s, page data-platform on-call

**Failover Drill (quarterly)**
1. Trigger: \`aws rds reboot-db-instance --db-instance-identifier prod-primary --force-failover\`
2. Verify clients reconnect within 90s (target RTO)
3. Validate no write loss via application checksums`,
    },
    {
      title: "Change History",
      content: `| Date | Change | Author |
|------|--------|--------|
| 2026-04-20 | PostgreSQL 16.2 -> 16.4 (zero-downtime failover) | @platform-bot |
| 2026-04-14 | Increased IOPS 10K -> 12K (peak season prep) | @sarah |
| 2026-04-09 | Enabled Performance Insights long-term retention | @james |
| 2026-04-02 | Rotated master credentials via Secrets Manager | @platform-bot |
| 2026-03-28 | Added cross-region replica in us-west-2 for DR | @sarah |`,
    },
  ],

  "API Gateway": [
    {
      title: "Overview",
      content: `The **API Gateway** is the public entry point for all external API traffic. Handles authentication, rate limiting, request validation, and routing to internal services. Fronted by CloudFront for edge caching and DDoS protection.

**Owner:** Platform Team (platform@example.com)
**Type:** AWS API Gateway (REST, regional) + CloudFront distribution
**Region:** us-east-1 (primary), with Route 53 latency-based routing
**Throughput:** 1.2M requests/day avg, 4.5K RPS peak
**Latency:** 12ms p99 (gateway only, excludes backend)
**Throttle:** 10K RPS account-level, 500 RPS per-key burst`,
    },
    {
      title: "Dependencies",
      content: `**Upstream (clients):**
- CloudFront CDN (94% cache hit rate)
- Direct clients (mobile apps, partner integrations via API keys)

**Downstream (routes to):**
- ALB -> Order Service, User Service, Notification Service
- Lambda (event-processor) -- async webhook ingestion
- S3 (via VPC endpoint) -- direct presigned URL uploads

**Auth & security:**
- Cognito User Pools -- JWT validation for consumer APIs
- Lambda Authorizer -- custom API key validation for partner tier
- WAF Web ACL -- OWASP Top 10, rate-based rules, geo-blocking`,
    },
    {
      title: "Network Topology",
      content: `\`\`\`
Client -> Route 53 (latency) -> CloudFront (edge) -> WAF -> API Gateway
                                                              |
                         +------------------------+-----------+
                         |                        |           |
                      ALB (REST)            Lambda (async)   S3 (direct)
                         |
                  [Internal Services]
\`\`\`

**Custom domain:** api.example.com (ACM cert, TLS 1.2+)
**Usage plans:** free (100 RPS), pro (1K RPS), enterprise (10K RPS)
**Stages:** prod (live), staging (pre-prod tests), canary (5% traffic)`,
    },
    {
      title: "Runbook",
      content: `**High 4xx Rate**
1. Check WAF dashboard for blocked requests surge (bot activity common)
2. Review Cognito auth failures: CloudWatch Logs Insights on \`/aws/apigateway/prod\`
3. Verify client SDK version -- older versions may use deprecated endpoints
4. If legitimate clients blocked by WAF, adjust rate-based rule threshold

**Latency Spike (p99 > 50ms)**
1. Check backend health first (likely ALB or downstream service)
2. Review CloudFront cache hit rate -- drop below 85% usually indicates cache purge
3. Check Lambda cold starts for authorizer: \`AWS/Lambda Duration\` metric
4. Consider enabling API Gateway caching for idempotent GETs

**API Key Compromise**
1. Revoke key immediately: \`aws apigateway update-api-key --api-key <id> --patch-operations op=replace,path=/enabled,value=false\`
2. Rotate for affected customer via partner portal
3. Audit CloudTrail for usage patterns in past 30 days
4. File security incident per IR-03 runbook`,
    },
    {
      title: "Change History",
      content: `| Date | Change | Author |
|------|--------|--------|
| 2026-04-19 | Added weighted routing api-v2 (90/10 split) | @sarah |
| 2026-04-16 | Enabled WAF managed rule group (OWASP Top 10 v2) | @james |
| 2026-04-11 | Lowered free-tier rate limit 200 -> 100 RPS | @platform-bot |
| 2026-04-05 | Migrated custom authorizer to ARM64 (15% cheaper) | @mike |
| 2026-03-30 | Added /v2/orders canary stage with 5% traffic | @sarah |`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Change Timeline data
// ---------------------------------------------------------------------------

type Severity = "info" | "warning" | "critical" | "success";

interface TimelineEntry {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  severity: Severity;
  service: string;
  author: string;
}

const TIMELINE_DATA: TimelineEntry[] = [
  { id: "t1", timestamp: "2026-04-21 09:42 AM", title: "EC2 instance scaled up", description: "Auto-scaling group prod-asg increased desired capacity from 4 to 6 instances due to CPU threshold breach (>80% for 5 min).", severity: "info", service: "EKS Cluster", author: "auto-scaler" },
  { id: "t2", timestamp: "2026-04-21 08:15 AM", title: "New S3 bucket created", description: "Bucket kt-logs-archive-prod created with versioning enabled and AES-256 encryption. Lifecycle policy set to Glacier after 90 days.", severity: "success", service: "S3", author: "@sarah" },
  { id: "t3", timestamp: "2026-04-20 11:30 PM", title: "Deployment rolled back", description: "Payment Service v1.9.0 rolled back to v1.8.0 after elevated 5xx rate detected (2.3% vs baseline 0.1%). Root cause: malformed JSON in upstream API response.", severity: "critical", service: "Payment Service", author: "@mike" },
  { id: "t4", timestamp: "2026-04-20 06:00 PM", title: "Security group rule modified", description: "Inbound rule added to sg-prod-web: TCP/8443 from 10.0.0.0/16. Change approved via PR #4821.", severity: "warning", service: "VPC", author: "@james" },
  { id: "t5", timestamp: "2026-04-20 02:45 PM", title: "RDS minor version upgrade", description: "PostgreSQL 16.2 patched to 16.4 during maintenance window. Zero-downtime with multi-AZ failover.", severity: "success", service: "RDS Primary", author: "@platform-bot" },
  { id: "t6", timestamp: "2026-04-19 10:20 AM", title: "Kafka consumer lag spike", description: "Event Bus consumer group order-processor experienced lag spike to 45K messages. Auto-resolved after consumer rebalancing (3m 22s).", severity: "warning", service: "Kafka", author: "monitoring" },
  { id: "t7", timestamp: "2026-04-19 08:00 AM", title: "New DNS record added", description: "A record api-v2.example.com -> 10.0.3.45 added to hosted zone. Weighted routing: 90% v1, 10% v2.", severity: "info", service: "Route 53", author: "@sarah" },
  { id: "t8", timestamp: "2026-04-18 04:00 PM", title: "Redis cluster node replaced", description: "Node redis-0003 replaced due to degraded performance. Cluster resharded automatically. No data loss.", severity: "success", service: "Redis Cluster", author: "@platform-bot" },
];

// ---------------------------------------------------------------------------
// Status badge helper
// ---------------------------------------------------------------------------

const STATUS_STYLES: Record<Status, { dot: string; bg: string; text: string; label: string }> = {
  healthy: { dot: "bg-green-400", bg: "bg-green-400/10", text: "text-green-400", label: "Healthy" },
  degraded: { dot: "bg-yellow-400", bg: "bg-yellow-400/10", text: "text-yellow-400", label: "Degraded" },
  alerting: { dot: "bg-red-400", bg: "bg-red-400/10", text: "text-red-400", label: "Alerting" },
};

const SEVERITY_STYLES: Record<Severity, { border: string; bg: string; icon: string }> = {
  info: { border: "border-primary-500/30", bg: "bg-primary-500/5", icon: "text-primary-400" },
  warning: { border: "border-yellow-500/30", bg: "bg-yellow-500/5", icon: "text-yellow-400" },
  critical: { border: "border-red-500/30", bg: "bg-red-500/5", icon: "text-red-400" },
  success: { border: "border-green-500/30", bg: "bg-green-500/5", icon: "text-green-400" },
};

const SEVERITY_ICONS: Record<Severity, React.ElementType> = {
  info: Activity,
  warning: AlertTriangle,
  critical: XCircle,
  success: CheckCircle2,
};

// ---------------------------------------------------------------------------
// Markdown-like renderer (simple)
// ---------------------------------------------------------------------------

function RenderedContent({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-2 text-sm text-text-secondary leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;
        if (trimmed.startsWith("|")) {
          return (
            <pre key={i} className="text-xs font-mono text-text-muted overflow-x-auto">
              {trimmed}
            </pre>
          );
        }
        if (trimmed.startsWith("```")) return null;
        if (trimmed.startsWith("```")) return null;
        if (line.startsWith("    ") || (lines[i - 1]?.trim().startsWith("```") && !trimmed.startsWith("```"))) {
          return (
            <pre key={i} className="text-xs font-mono text-text-muted bg-bg-dark/50 rounded-lg p-3 overflow-x-auto">
              {trimmed}
            </pre>
          );
        }
        // Bold inline
        const rendered = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>');
        // Code inline
        const withCode = rendered.replace(/`([^`]+)`/g, '<code class="text-xs font-mono bg-primary-900/30 text-primary-300 px-1.5 py-0.5 rounded">$1</code>');
        return <p key={i} dangerouslySetInnerHTML={{ __html: withCode }} />;
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Demo Page
// ---------------------------------------------------------------------------

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<TabId>("graph");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedDocResource, setSelectedDocResource] = useState<DocResource>("Order Service");
  const docSections = DOCS_BY_RESOURCE[selectedDocResource];

  const selectedNode = useMemo(
    () => GRAPH_NODES.find((n) => n.id === selectedNodeId) ?? null,
    [selectedNodeId],
  );

  const filteredNodes = useMemo(() => {
    if (!searchQuery) return GRAPH_NODES;
    const q = searchQuery.toLowerCase();
    return GRAPH_NODES.filter(
      (n) =>
        n.label.toLowerCase().includes(q) ||
        n.type.toLowerCase().includes(q) ||
        Object.values(n.properties).some((v) => v.toLowerCase().includes(q)),
    );
  }, [searchQuery]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const relevantEdges = useMemo(
    () =>
      GRAPH_EDGES.filter(
        ([a, b]) => filteredNodeIds.has(a) && filteredNodeIds.has(b),
      ),
    [filteredNodeIds],
  );

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <GradientText>Interactive Demo</GradientText>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Explore how Knowledge Tree discovers, maps, and documents your
            infrastructure -- powered by real data patterns from production
            environments.
          </p>
        </div>
      </section>

      {/* Tab navigation */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 p-1 rounded-xl bg-bg-card/50 border border-border-subtle overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 min-w-fit whitespace-nowrap px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-accent-purple/80 rounded-lg"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {/* ---------------------------------------------------------------- */}
            {/* Knowledge Graph Tab                                              */}
            {/* ---------------------------------------------------------------- */}
            {activeTab === "graph" && (
              <motion.div
                key="graph"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {/* Search */}
                <div className="relative mb-6 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search nodes by name, type, or property..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-bg-card border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* SVG Graph */}
                  <div className="flex-1 min-w-0 overflow-hidden rounded-xl border border-border-subtle bg-bg-card/30">
                    <svg
                      viewBox="0 0 1100 580"
                      className="w-full h-auto"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {/* Background grid */}
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        </pattern>
                        {Object.entries(NODE_COLORS).map(([type, colors]) => (
                          <radialGradient key={type} id={`glow-${type}`}>
                            <stop offset="0%" stopColor={colors.fill} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={colors.fill} stopOpacity="0" />
                          </radialGradient>
                        ))}
                      </defs>
                      <rect width="1100" height="580" fill="url(#grid)" />

                      {/* Edges */}
                      {relevantEdges.map(([fromId, toId], i) => {
                        const from = GRAPH_NODES.find((n) => n.id === fromId)!;
                        const to = GRAPH_NODES.find((n) => n.id === toId)!;
                        const isHighlighted =
                          selectedNodeId === fromId || selectedNodeId === toId;
                        return (
                          <motion.line
                            key={`edge-${i}`}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke={
                              isHighlighted
                                ? "rgba(99,102,241,0.6)"
                                : "rgba(255,255,255,0.08)"
                            }
                            strokeWidth={isHighlighted ? 2 : 1}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: i * 0.02 }}
                          />
                        );
                      })}

                      {/* Nodes */}
                      {filteredNodes.map((node) => {
                        const colors = NODE_COLORS[node.type];
                        const isSelected = selectedNodeId === node.id;
                        return (
                          <g
                            key={node.id}
                            onClick={() =>
                              setSelectedNodeId(isSelected ? null : node.id)
                            }
                            className="cursor-pointer"
                          >
                            {/* Glow ring */}
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={isSelected ? 32 : 24}
                              fill={`url(#glow-${node.type})`}
                              opacity={isSelected ? 1 : 0.5}
                            />
                            {/* Main circle */}
                            <motion.circle
                              cx={node.x}
                              cy={node.y}
                              r={isSelected ? 20 : 16}
                              fill={colors.fill}
                              stroke={colors.stroke}
                              strokeWidth={isSelected ? 3 : 2}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.4, type: "spring" }}
                              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                            />
                            {/* Label */}
                            <text
                              x={node.x}
                              y={node.y + 30}
                              textAnchor="middle"
                              className="fill-text-secondary text-[11px] font-medium"
                              style={{ pointerEvents: "none" }}
                            >
                              {node.label}
                            </text>
                            {/* Type badge */}
                            <text
                              x={node.x}
                              y={node.y + 4}
                              textAnchor="middle"
                              className="fill-white text-[9px] font-bold"
                              style={{ pointerEvents: "none" }}
                            >
                              {colors.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-3 sm:gap-6 px-4 sm:px-6 py-3 border-t border-border-subtle">
                      {Object.entries(NODE_COLORS).map(([type, colors]) => (
                        <div key={type} className="flex items-center gap-2 text-xs text-text-muted">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors.fill }}
                          />
                          {type === "aws" ? "AWS" : type === "k8s" ? "Kubernetes" : type === "database" ? "Database" : "Network"}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detail panel */}
                  <motion.div
                    className="w-full lg:w-80 lg:flex-shrink-0"
                    initial={false}
                    animate={{ opacity: 1 }}
                  >
                    <GlassCard className="h-full">
                      {selectedNode ? (
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: NODE_COLORS[selectedNode.type].ring }}
                            >
                              <span
                                className="text-sm font-bold"
                                style={{ color: NODE_COLORS[selectedNode.type].fill }}
                              >
                                {NODE_COLORS[selectedNode.type].label}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-text-primary">
                                {selectedNode.label}
                              </h3>
                              <span className="text-xs text-text-muted capitalize">
                                {selectedNode.type === "k8s"
                                  ? "Kubernetes"
                                  : selectedNode.type}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-0">
                            {Object.entries(selectedNode.properties).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="flex justify-between py-2 border-b border-border-subtle last:border-0"
                                >
                                  <span className="text-xs text-text-muted">
                                    {key}
                                  </span>
                                  <span className="text-xs text-text-primary font-medium text-right max-w-[50%] truncate">
                                    {value}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>

                          {/* Connected nodes */}
                          <div className="mt-4 pt-4 border-t border-border-subtle">
                            <h4 className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wider">
                              Connections
                            </h4>
                            <div className="space-y-1">
                              {relevantEdges
                                .filter(
                                  ([a, b]) =>
                                    a === selectedNode.id ||
                                    b === selectedNode.id,
                                )
                                .map(([a, b]) => {
                                  const peerId = a === selectedNode.id ? b : a;
                                  const peer = GRAPH_NODES.find(
                                    (n) => n.id === peerId,
                                  )!;
                                  return (
                                    <button
                                      key={peerId}
                                      onClick={() => setSelectedNodeId(peerId)}
                                      className="flex items-center gap-2 w-full px-2 py-1.5 rounded text-xs text-text-secondary hover:bg-bg-card-hover hover:text-text-primary transition-colors cursor-pointer"
                                    >
                                      <span
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{
                                          backgroundColor:
                                            NODE_COLORS[peer.type].fill,
                                        }}
                                      />
                                      {peer.label}
                                    </button>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                          <Globe className="w-10 h-10 text-text-muted mb-3" />
                          <p className="text-sm text-text-muted">
                            Click a node to view its properties and connections
                          </p>
                        </div>
                      )}
                    </GlassCard>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Service Inventory Tab                                            */}
            {/* ---------------------------------------------------------------- */}
            {activeTab === "inventory" && (
              <motion.div
                key="inventory"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="overflow-hidden p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border-subtle bg-bg-card/80">
                          <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Name
                          </th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Type
                          </th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Provider
                          </th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Region
                          </th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Status
                          </th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Last Seen
                          </th>
                          <th className="w-10 px-4" />
                        </tr>
                      </thead>
                      <tbody>
                        {INVENTORY_DATA.map((row) => {
                          const status = STATUS_STYLES[row.status];
                          const isExpanded = expandedRow === row.id;
                          return (
                            <Fragment key={row.id}>
                              <tr
                                onClick={() =>
                                  setExpandedRow(isExpanded ? null : row.id)
                                }
                                className="border-b border-border-subtle hover:bg-bg-card-hover/50 cursor-pointer transition-colors"
                              >
                                <td className="px-4 sm:px-6 py-4 font-medium text-text-primary whitespace-nowrap">
                                  {row.name}
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-text-secondary whitespace-nowrap">
                                  {row.type}
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-text-secondary whitespace-nowrap">
                                  {row.provider}
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-text-secondary whitespace-nowrap">
                                  {row.region}
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                  <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
                                  >
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                                    />
                                    {status.label}
                                  </span>
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-text-muted whitespace-nowrap">
                                  {row.lastSeen}
                                </td>
                                <td className="px-4">
                                  <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <ChevronDown className="w-4 h-4 text-text-muted" />
                                  </motion.div>
                                </td>
                              </tr>
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <td
                                      colSpan={7}
                                      className="px-4 sm:px-6 py-4 bg-bg-dark/40"
                                    >
                                      <div>
                                        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                                          Connected Resources
                                        </span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                          {row.connections.map((conn) => (
                                            <span
                                              key={conn}
                                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card border border-border-subtle text-xs text-text-secondary"
                                            >
                                              <ChevronRight className="w-3 h-3 text-primary-400" />
                                              {conn}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </td>
                                  </motion.tr>
                                )}
                              </AnimatePresence>
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Documentation Tab                                                */}
            {/* ---------------------------------------------------------------- */}
            {activeTab === "docs" && (
              <motion.div
                key="docs"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {/* Resource selector */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                  {DOC_RESOURCES.map(
                    (name) => (
                      <button
                        key={name}
                        onClick={() => setSelectedDocResource(name)}
                        className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          selectedDocResource === name
                            ? "bg-primary-600/20 text-primary-300 border border-primary-500/30"
                            : "bg-bg-card border border-border-subtle text-text-muted hover:text-text-secondary hover:border-border-glow"
                        }`}
                      >
                        {name}
                      </button>
                    ),
                  )}
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Sidebar nav */}
                  <div className="w-full lg:w-48 lg:flex-shrink-0">
                    <nav className="flex lg:flex-col lg:space-y-1 gap-1 overflow-x-auto lg:sticky lg:top-24 pb-2 lg:pb-0">
                      {docSections.map((section, i) => {
                        const icons = [
                          Globe,
                          GitBranch,
                          Network,
                          Shield,
                          Clock,
                        ];
                        const Icon = icons[i] || FileText;
                        return (
                          <a
                            key={section.title}
                            href={`#doc-${i}`}
                            className="flex-shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-text-muted hover:text-text-secondary hover:bg-bg-card/50 transition-colors whitespace-nowrap"
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            {section.title}
                          </a>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Document content */}
                  <GlassCard className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-subtle">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600/20 to-accent-purple/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-text-primary">
                          {selectedDocResource}
                        </h2>
                        <p className="text-xs text-text-muted">
                          Auto-generated documentation -- Last updated 2 hours ago
                        </p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {docSections.map((section, i) => (
                        <div key={section.title} id={`doc-${i}`}>
                          <h3 className="text-base font-semibold text-text-primary mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-primary-600/10 text-primary-400 text-xs flex items-center justify-center font-bold">
                              {i + 1}
                            </span>
                            {section.title}
                          </h3>
                          <RenderedContent content={section.content} />
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Change Timeline Tab                                              */}
            {/* ---------------------------------------------------------------- */}
            {activeTab === "timeline" && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative max-w-3xl mx-auto">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-border-subtle" />

                  <div className="space-y-6">
                    {TIMELINE_DATA.map((entry, i) => {
                      const severity = SEVERITY_STYLES[entry.severity];
                      const SeverityIcon = SEVERITY_ICONS[entry.severity];
                      return (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                          className="relative pl-12 sm:pl-16"
                        >
                          {/* Timeline dot */}
                          <div
                            className={`absolute left-4 top-5 w-5 h-5 rounded-full border-2 border-bg-dark flex items-center justify-center ${severity.bg}`}
                          >
                            <SeverityIcon
                              className={`w-2.5 h-2.5 ${severity.icon}`}
                            />
                          </div>

                          {/* Content card */}
                          <GlassCard
                            className={`${severity.border} ${severity.bg}`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-2">
                              <h3 className="text-sm font-semibold text-text-primary">
                                {entry.title}
                              </h3>
                              <span className="flex-shrink-0 text-xs text-text-muted whitespace-nowrap">
                                {entry.timestamp}
                              </span>
                            </div>
                            <p className="text-sm text-text-secondary leading-relaxed mb-3">
                              {entry.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-text-muted">
                              <span className="flex items-center gap-1">
                                <Server className="w-3 h-3" />
                                {entry.service}
                              </span>
                              <span className="flex items-center gap-1">
                                <Activity className="w-3 h-3" />
                                {entry.author}
                              </span>
                            </div>
                          </GlassCard>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-bg-dark to-accent-purple/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-600/15 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            See this with <GradientText>YOUR infrastructure</GradientText>
          </h2>
          <p className="text-lg text-text-secondary mb-3">
            Connect your cloud accounts and Kubernetes clusters. Knowledge Tree
            will auto-discover every resource, map every dependency, and
            generate always-current documentation.
          </p>
          <p className="text-sm text-text-muted mb-8">
            14-day free trial. No credit card required. Deploy in under 30
            minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GradientButton href="/contact?kind=trial">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </GradientButton>
            <GradientButton
              href="/contact?kind=demo"
              variant="outline"
            >
              <Calendar className="w-4 h-4" /> Book a Demo
            </GradientButton>
          </div>
          <div className="mt-12 pt-8 border-t border-border-subtle">
            <p className="text-sm text-text-muted mb-4">
              Want to explore the full interactive UI first?
            </p>
            <GradientButton
              href="https://demo.knowledgetree.dev/dashboard"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Live Demo Dashboard <ArrowRight className="w-4 h-4" />
            </GradientButton>
          </div>
        </div>
      </section>
    </>
  );
}
