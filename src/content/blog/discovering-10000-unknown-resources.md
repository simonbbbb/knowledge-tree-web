---
title: "We Discovered 10,000 Resources Nobody Knew Existed"
description: "A fictional but realistic account of deploying Knowledge Tree at a large enterprise — and the shocking discoveries that followed."
date: "2026-04-14"
author: "Knowledge Tree Team"
category: "Case Study"
readTime: "9 min read"
excerpt: "Shadow IT, forgotten dev environments, and orphaned resources — what we found when we turned on discovery."
tags: ["discovery", "shadow-IT", "case-study"]
---

## Day 1: The Deployment

The email from the CTO was blunt: "We need to know what we own. All of it. By end of quarter."

The infrastructure team at a 3,000-person SaaS company was about to discover just how little they actually knew about their own infrastructure. They deployed Knowledge Tree on a Tuesday morning. By Tuesday afternoon, everything changed.

The setup took 45 minutes. They connected AWS (23 accounts), Azure (4 subscriptions), and 6 Kubernetes clusters. Read-only credentials — no risk, no modifications.

Then they clicked "Discover."

## Day 1: The First Shock

Within an hour, the dashboard showed **47,000 resources**. The team's best estimate had been 30,000. They were off by **17,000 resources**.

Where were the extra ones?

- **12 Development environments** that no one remembered creating. Total cost: $43,000/month.
- **847 S3 buckets** — 312 of which hadn't been accessed in over 6 months
- **156 EC2 instances** running in regions the team didn't know they had enabled
- **23 RDS databases** with no corresponding application or owner tag

## Week 1: The Deep Dive

Over the next week, the team used Knowledge Tree's knowledge graph to trace relationships and ownership. The discoveries kept coming:

### Shadow IT
A marketing team had spun up their own CloudFormation stack — complete with a production-grade RDS database, ECS cluster, and CloudFront distribution. Total monthly cost: $12,000. No one in engineering knew it existed.

### The Forgotten Migration
Two years ago, the company migrated from us-east-1 to us-west-2. Except they didn't finish. 340 resources were still running in the old region, connected to nothing, serving no traffic. Monthly cost: $28,000.

### Security Gaps
The graph view revealed 23 security groups with port 22 (SSH) open to 0.0.0.0/0. Three of those were attached to databases containing customer data. The security team was notified within minutes.

## Week 2: The Cleanup

Armed with complete visibility, the team began the cleanup:

1. **Decommissioned** 4,200 orphaned resources — saving **$180,000/year**
2. **Consolidated** 23 AWS accounts down to 15
3. **Remediated** all 23 overly-permissive security groups
4. **Tagged** every remaining resource with owner, team, and cost center

The knowledge graph made this safe: before decommissioning anything, the team could see exactly what depended on it. Zero production incidents from the cleanup.

## Month 1: The Cultural Shift

Something unexpected happened. The team stopped guessing and started knowing.

- **Standup conversations changed** from "does anyone know what this does?" to "the graph shows it connects to these 3 services"
- **Incident response accelerated** because blast radius analysis took seconds instead of hours
- **Architecture reviews** started with the topology map instead of a blank whiteboard
- **New hire onboarding** went from 3 months to 3 weeks — the graph teaches new engineers the system

## The Numbers

After 30 days with Knowledge Tree:

| Metric | Before | After |
|--------|--------|-------|
| Known resources | ~30K | 47K (100% coverage) |
| Monthly waste | Unknown | $180K/year recovered |
| Security gaps | Unknown | 23 critical findings remediated |
| Incident MTTR | 4.2 hours | 1.7 hours |
| Onboarding time | 3 months | 3 weeks |

## The Lesson

You can't manage what you can't see. And at scale, **you're always seeing less than you think**. The gap between what you believe you have and what you actually have grows by ~10% every quarter.

Knowledge Tree closes that gap. Not once, but continuously — because discovery isn't a one-time event, it's an ongoing practice.

---

*What don't you know about your infrastructure? [Start a free trial](/pricing) and find out in 30 minutes.*
