---
title: "Announcing Knowledge Tree: Open-Source Infrastructure Discovery"
description: "Today we're announcing Knowledge Tree, an open-source tool that discovers your cloud and Kubernetes infrastructure, maps it in a knowledge graph, and auto-generates documentation."
date: 2026-04-15
author: "Knowledge Tree Team"
tags: ["announcement", "open-source", "infrastructure"]
---

We're excited to announce **Knowledge Tree** — an open-source infrastructure discovery and auto-documentation tool.

## The Problem

Modern infrastructure is complex. Teams juggle AWS, Azure, GCP, Kubernetes, DNS, and dozens of other services. Documentation is always out of date. No one knows exactly what's running or how it connects.

## The Solution

Knowledge Tree solves this by:

1. **Discovering** resources across all your clouds and clusters automatically
2. **Mapping** them into a knowledge graph (PostgreSQL + Apache AGE) that captures every relationship
3. **Documenting** your infrastructure with auto-generated Markdown, HTML, and Mermaid diagrams

## Key Features

- **Multi-cloud discovery**: AWS, Azure, GCP out of the box
- **Kubernetes native**: Deep discovery of deployments, services, pods, ingresses
- **Knowledge graph**: Cypher queries on your infrastructure topology
- **LLM enrichment**: AI-powered summaries and runbooks (Ollama or OpenAI)
- **Plugin SDK**: Write custom discovery plugins in Go
- **MCP server**: Let AI assistants query your infrastructure in natural language

## Get Started

```bash
git clone https://github.com/knowledge-tree/knowledge-tree
cd knowledge-tree
docker compose up
```

That's it. You'll have a running instance with sample K8s data in minutes.

## What's Next

We're just getting started. Check out our [GitHub repository](https://github.com/knowledge-tree/knowledge-tree) to contribute, report issues, or star the project.
