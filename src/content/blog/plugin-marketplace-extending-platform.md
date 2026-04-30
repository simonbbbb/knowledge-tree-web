---
title: "The Plugin Marketplace: Extending Knowledge Tree with Community and Custom Plugins"
description: "Introducing the Knowledge Tree Plugin Marketplace — a growing ecosystem of community-built discovery plugins, custom integrations, and the SDK that makes it all possible."
date: 2026-04-26
author: "Knowledge Tree Team"
category: "Product"
readTime: "8 min read"
excerpt: "The Knowledge Tree Plugin Marketplace lets teams build and share custom discovery plugins. From MongoDB to Cloudflare to your custom internal tools."
tags: ["plugins", "marketplace", "sdk", "extensibility", "community"]
---

## The Platform Vision

No infrastructure discovery platform can know every tool, every service, and every custom system an enterprise runs. There will always be that internal service mesh, the homegrown CI/CD tool, the edge computing platform your team just adopted.

That's why we built the Knowledge Tree Plugin Marketplace. It's not just a collection of plugins — it's an extensibility platform that lets you model *anything* in your infrastructure.

## How the Plugin System Works

Knowledge Tree plugins are built using our open-source Plugin SDK, which provides a clean, type-safe interface for discovery. Plugins run as separate processes through HashiCorp's go-plugin system, giving you process isolation, independent lifecycle management, and the ability to write plugins in any language supported by gRPC.

### The Plugin Interface

Every plugin implements a simple contract:

```go
type DiscoveryPlugin interface {
    // Identify returns metadata about the plugin
    Identify() (*PluginInfo, error)

    // Discover performs the discovery and returns resources
    Discover(ctx context.Context, config map[string]interface{}) ([]*Resource, error)

    // Health returns the health status of the plugin connection
    Health(ctx context.Context) (*HealthStatus, error)
}
```

A resource is any infrastructure component with a unique ID, type, properties, and relationships to other resources:

```go
type Resource struct {
    ID            string
    Type          string
    Provider      string
    Properties    map[string]interface{}
    Relationships []Relationship
}
```

This simplicity is intentional. If you can call an API and return JSON, you can write a Knowledge Tree plugin.

## The Marketplace Catalog

The Plugin Marketplace launches with the following categories:

### Certified Plugins (Built by Knowledge Tree)

| Plugin | Description | Provider |
|--------|-------------|----------|
| AWS Discovery | Full AWS resource discovery (200+ types) | Knowledge Tree |
| Azure Discovery | Full Azure resource discovery (180+ types) | Knowledge Tree |
| GCP Discovery | Full GCP resource discovery (150+ types) | Knowledge Tree |
| Kubernetes | Deep K8s discovery (50+ resource types) | Knowledge Tree |
| DNS Discovery | DNS record discovery and zone enumeration | Knowledge Tree |
| Network Scan | Network mapping and port scanning | Knowledge Tree |
| Datadog Integration | Import Datadog monitors, dashboards, and hosts | Knowledge Tree |
| PagerDuty Integration | Import PagerDuty services, escalations, and incidents | Knowledge Tree |

### Community Plugins

| Plugin | Description | Author |
|--------|-------------|--------|
| MongoDB Discovery | Discover MongoDB clusters, databases, and collections | Community |
| PostgreSQL Discovery | Discover PostgreSQL instances, databases, and replication | Community |
| Redis Discovery | Discover Redis clusters and node topology | Community |
| Cloudflare Discovery | Discover Cloudflare zones, DNS records, and WAF rules | Community |
| Fastly Discovery | Discover Fastly services and CDN configurations | Community |
| Terraform State | Import resources from Terraform state files | Community |
| Ansible Inventory | Import hosts and groups from Ansible inventory | Community |
| Prometheus Discovery | Import Prometheus targets, alerts, and rules | Community |
| New Relic Integration | Import New Relic entities, dashboards, and alerts | Community |
| HashiCorp Vault | Discover Vault mount paths, policies, and secrets engines | Community |

## Building Your Own Plugin

The Plugin SDK makes it straightforward to build custom plugins. Here's a complete example that discovers Cloudflare zones:

```go
package main

import (
    "context"
    "github.com/knowledge-tree/sdk"
)

type CloudflarePlugin struct {
    client *cloudflare.API
}

func (p *CloudflarePlugin) Identify() (*sdk.PluginInfo, error) {
    return &sdk.PluginInfo{
        Name:        "cloudflare-discovery",
        Version:     "1.0.0",
        Description: "Discovers Cloudflare zones, DNS, and security rules",
    }, nil
}

func (p *CloudflarePlugin) Discover(ctx context.Context, config map[string]interface{}) ([]*sdk.Resource, error) {
    apiToken := config["api_token"].(string)
    p.client = cloudflare.NewWithAPIToken(apiToken)

    zones, _ := p.client.ListZones(ctx)
    var resources []*sdk.Resource

    for _, zone := range zones {
        zoneRes := &sdk.Resource{
            ID:       zone.ID,
            Type:     "cloudflare_zone",
            Provider: "cloudflare",
            Properties: map[string]interface{}{
                "name":    zone.Name,
                "status":  zone.Status,
                "plan":    zone.Plan.Name,
            },
        }

        // Discover DNS records for this zone
        records, _ := p.client.ListDNSRecords(ctx, zone.ID)
        for _, record := range records {
            recordRes := &sdk.Resource{
                ID:       record.ID,
                Type:     "dns_record",
                Provider: "cloudflare",
                Properties: map[string]interface{}{
                    "name":  record.Name,
                    "type":  record.Type,
                    "value": record.Content,
                    "ttl":   record.TTL,
                },
                Relationships: []sdk.Relationship{
                    {TargetID: zone.ID, Type: "belongs_to_zone"},
                },
            }
            resources = append(resources, recordRes)
        }

        resources = append(resources, zoneRes)
    }

    return resources, nil
}

func main() {
    sdk.Serve(&CloudflarePlugin{})
}
```

Build it, drop the binary into the plugins directory, and configure it:

```yaml
discovery:
  plugins:
    - name: cloudflare-discovery
      path: ./plugins/cloudflare-discovery
      config:
        api_token: "${CLOUDFLARE_API_TOKEN}"
        zones: ["example.com", "myapp.io"]
```

## The Certification Process

Community plugins can go through our certification process to become "Marketplace Certified":

1. **Submit** your plugin via GitHub pull request
2. **Review**: Our team reviews the code for security and correctness
3. **Test**: We run the plugin against a test environment
4. **Certify**: Certified plugins get a badge, prioritized support, and listing in the marketplace

## Enterprise Custom Plugins

Enterprise customers get access to the **Custom Plugin Workshop**, where our team helps you build plugins for your specific infrastructure:

- Custom internal platforms (Heroku-style PaaS)
- Proprietary service meshes and orchestrators
- Legacy mainframe discovery
- Custom monitoring and observability platforms
- Internal developer portals and service catalogs

We've seen enterprises with 15+ custom plugins that model their entire internal platform — something no off-the-shelf tool could ever provide.

## The Plugin Ecosystem Vision

Our goal is to make Knowledge Tree the universal discovery layer for all infrastructure. Every tool, every platform, every service — if it has an API, it should be discoverable in your knowledge graph.

The Plugin Marketplace is the engine that makes this possible. With community contributions, certified quality, and enterprise customization, any infrastructure component can be discovered, mapped, and documented.

---

*Have a plugin idea? [Join the community](https://github.com/knowledge-tree/knowledge-tree) and start building. Or [book a demo](/demo) to see the marketplace in action.*
