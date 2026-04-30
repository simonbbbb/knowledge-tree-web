---
title: "Why We Built a Knowledge Graph for Infrastructure"
description: "How Apache AGE and PostgreSQL give Knowledge Tree a relational understanding of your infrastructure that flat inventories can't match."
date: 2026-04-18
author: "Knowledge Tree Team"
category: "Engineering"
readTime: "5 min read"
excerpt: "How Apache AGE and PostgreSQL give Knowledge Tree a relational understanding of your infrastructure that flat inventories can't match."
tags: ["architecture", "knowledge-graph", "technical"]
---

Infrastructure tools usually give you a flat list of resources. Knowledge Tree gives you a graph.

## Flat Lists Aren't Enough

A typical cloud inventory tells you: "You have 47 EC2 instances, 12 RDS databases, 3 VPCs." That's useful, but it doesn't tell you:

- Which EC2 instance connects to which RDS database
- Which VPC your Kubernetes cluster runs in
- What happens if you delete that security group

## The Knowledge Graph

Knowledge Tree uses **Apache AGE** — a PostgreSQL extension that adds graph database capabilities. Every resource is a node. Every relationship is an edge.

This means you can ask questions like:

```cypher
MATCH (ec2:EC2 {environment: 'production'})-[:CONNECTS_TO]->(rds:RDS)
RETURN ec2.name, rds.name
```

And get back meaningful answers about your infrastructure topology.

## Why PostgreSQL?

We didn't want to add another database to your stack. By building on PostgreSQL with AGE and pgvector, you get:

- **Graph queries** (Cypher) for relationship traversal
- **Vector search** (pgvector) for semantic similarity
- **Relational queries** (SQL) for traditional filtering
- **One database** to manage, backup, and scale

## What This Enables

The knowledge graph is what makes our auto-documentation actually useful. When we generate a Mermaid diagram of your infrastructure, it's not just a list — it shows the actual connections between resources.

Combined with LLM enrichment, you get natural-language explanations of your architecture that are always up-to-date.
