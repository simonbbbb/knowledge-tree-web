---
title: "Multi-Cloud Discovery in One Platform: AWS, Azure, and GCP Unified"
description: "Managing infrastructure across AWS, Azure, and GCP is the new normal. Learn how Knowledge Tree unifies multi-cloud discovery into a single knowledge graph with cross-provider dependency mapping."
date: 2026-04-25
author: "Knowledge Tree Team"
category: "Product"
readTime: "8 min read"
excerpt: "Multi-cloud is the reality for 87% of enterprises. Knowledge Tree unifies AWS, Azure, and GCP into a single graph with cross-provider dependency mapping."
tags: ["multi-cloud", "aws", "azure", "gcp", "discovery"]
---

## The Multi-Cloud Reality

Multi-cloud isn't a strategy anymore — it's the default state. According to the 2025 Flexera State of the Cloud Report, **87% of enterprises** have a multi-cloud strategy, and the average organization uses **4.9 different cloud services** across AWS, Azure, and GCP.

The reasons vary:

- **Acquisitions**: Your company acquired a startup that runs on GCP
- **Team preference**: The data team chose Azure, engineering chose AWS
- **Best-of-breed**: GCP for AI/ML, AWS for compute, Azure for enterprise identity
- **Lock-in avoidance**: Deliberate multi-cloud to avoid dependency on one provider

Whatever the reason, the result is the same: **no single pane of glass** for your infrastructure.

## The Multi-Cloud Visibility Gap

When your infrastructure spans multiple clouds, you lose the integrated view that makes each cloud provider's console useful. Questions that should be simple become impossible:

- "Is our AWS application dependent on any Azure services?"
- "What's the total cost of running this application across all clouds?"
- "Which cloud provider has the most orphaned resources?"
- "Can we fail over from AWS to GCP if needed?"

Without a unified discovery platform, answering these questions requires logging into 3 different consoles, exporting to spreadsheets, and manually correlating data. It's slow, error-prone, and rarely done.

## How Knowledge Tree Unifies Multi-Cloud Discovery

Knowledge Tree connects to each cloud provider through its native API, discovers resources, and maps them into a single knowledge graph. Here's what's discovered for each provider:

### AWS Discovery

Knowledge Tree discovers **200+ resource types** across AWS:

- **Compute**: EC2, Auto Scaling Groups, ECS, EKS, Lambda, Elastic Beanstalk
- **Storage**: S3, EBS, EFS, Glacier, Storage Gateway
- **Database**: RDS, DynamoDB, ElastiCache, Redshift, Neptune
- **Networking**: VPC, Subnets, Route53, CloudFront, ELB/ALB/NLB, Direct Connect
- **Security**: IAM, KMS, Secrets Manager, WAF, Shield, GuardDuty
- **Integration**: SQS, SNS, Step Functions, EventBridge, API Gateway
- **Management**: CloudTrail, CloudWatch, Config, Systems Manager

### Azure Discovery

Knowledge Tree discovers **180+ resource types** across Azure:

- **Compute**: VMs, VMSS, AKS, Container Instances, Azure Functions, App Services
- **Storage**: Blob, Disk, Files, Data Lake, Archive Storage
- **Database**: SQL Database, Cosmos DB, Azure Database for MySQL/PostgreSQL, Redis Cache
- **Networking**: VNet, NSG, Azure DNS, Application Gateway, Front Door, ExpressRoute
- **Security**: Entra ID (Azure AD), Key Vault, Security Center, Policy
- **Integration**: Service Bus, Event Grid, Logic Apps, API Management

### GCP Discovery

Knowledge Tree discovers **150+ resource types** across GCP:

- **Compute**: Compute Engine, GKE, Cloud Run, Cloud Functions, App Engine
- **Storage**: Cloud Storage, Persistent Disk, Filestore
- **Database**: Cloud SQL, Spanner, Bigtable, Firestore, Memorystore
- **Networking**: VPC, Cloud DNS, Cloud Load Balancing, Cloud CDN, Cloud Interconnect
- **Security**: IAM, Cloud KMS, Security Command Center, VPC Service Controls
- **Integration**: Pub/Sub, Cloud Tasks, Cloud Scheduler, API Gateway

## Cross-Provider Dependency Mapping

The real magic happens when Knowledge Tree maps relationships *across* cloud providers. Here's a real scenario:

### Scenario: Multi-Cloud Application Architecture

An application runs primarily on AWS but uses Azure for identity and GCP for AI/ML processing:

```
[Azure]
  Entra ID ──authenticates──┐
                             ▼
[AWS]                     [Azure]
  Route53 ──> ALB ──> ECS (app)
                        ├──> RDS (PostgreSQL)       [AWS]
                        ├──> ElastiCache (Redis)    [AWS]
                        └──> SQS ──> Lambda
                                      └──> API call ──> Cloud Run (ML inference) [GCP]
                                                          └──> Cloud SQL (training data) [GCP]
```

Knowledge Tree's cross-provider graph captures this:

```cypher
MATCH (app:ECS)-[:depends_on]->(service)
RETURN app.name, service.name, service.provider, service.type
```

Results:

| Application | Dependency | Provider | Type |
|------------|-----------|----------|------|
| app-backend | prod-postgres | AWS | RDS |
| app-backend | session-cache | AWS | ElastiCache |
| app-backend | ml-inference | GCP | Cloud Run |
| app-backend | auth | Azure | Entra ID |

**This is the multi-cloud view that no single provider can give you.**

## Unified Tagging and Classification

When resources come from different providers, they have different metadata models. AWS uses tags, Azure uses tags, GCP uses labels. Knowledge Tree normalizes all of them into a unified classification system.

```bash
$ kt-discover discover --tag "environment:production" --providers aws,azure,gcp

Discovered 8,342 resources tagged "environment:production":
  AWS:    5,201 resources across 3 accounts
  Azure:  2,118 resources across 2 subscriptions
  GCP:    1,023 resources across 1 project
```

This unified view lets you run provider-agnostic queries across your entire infrastructure.

## Cost Visibility Across Clouds

Knowledge Tree aggregates cost data from each provider and presents it in a unified view:

| Provider | Monthly Cost | Resources | Trends |
|----------|-------------|-----------|--------|
| AWS | $47,230 | 5,201 | +3.2% vs last month |
| Azure | $28,410 | 2,118 | -1.1% vs last month |
| GCP | $12,150 | 1,023 | +8.4% vs last month |
| **Total** | **$87,790** | **8,342** | **+2.8%** |

Drill down by service, team, environment, or project — across all providers.

## Getting Started with Multi-Cloud Discovery

Setting up multi-cloud discovery with Knowledge Tree takes about an hour:

1. **Create read-only credentials** in each cloud provider
2. **Add providers** to Knowledge Tree:
   ```yaml
   discovery:
     providers:
       - type: aws
         regions: [us-east-1, us-west-2, eu-west-1]
         accounts: ["123456789012", "234567890123"]
       - type: azure
         subscriptions: ["sub-a", "sub-b"]
         locations: [eastus, westeurope]
       - type: gcp
         projects: ["prod-project", "staging-project"]
         locations: [us-central1, europe-west1]
   ```
3. **Run discovery**: `kt-discover discover --all`
4. **Explore the graph** in the Knowledge Tree dashboard

Within 30 minutes, your entire multi-cloud infrastructure appears as a single, unified knowledge graph.

---

*Running multi-cloud? See everything in one place. [Book a demo](/demo) today.*
