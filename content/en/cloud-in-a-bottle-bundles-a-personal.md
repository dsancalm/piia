---
title: "Cloud in a Bottle bundles a personal cloud stack into a single ISO"
summary: "The open-source platform installs a hardened Ubuntu base, control panel, and SSO layer on bare metal or a VM, removing the need to wire Docker Compose, reverse proxies, and identity providers yourself."
lang: en
story: cloud-in-a-bottle-bundles-a-personal
publishedAt: 2026-09-06T11:17:07.161Z
sourceUrl: "https://cloudinabottle.org/blog/launch-post"
sourceName: "Hacker News (portada)"
priority: routine
tags: [selfhosting, opensource, cloud, iso]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cloud in a Bottle is an open-source personal cloud platform. It bundles a hardened Ubuntu base, a web control panel, and a curated catalog of containerized applications behind a single sign-on layer.

The project began from frustration with the incentive misalignment of mainstream cloud services: advertising, tracking, and data resale. Instead of stitching together Docker Compose files, reverse proxies, and identity providers manually, you get an ISO that installs a complete stack , control plane, routing, SSO, and inter-app permission APIs , on bare metal or a VM in one shot.

The architecture runs rootless, hardened containers on a single Ubuntu machine. A built-in web server hosts the dashboard and terminates HTTPS, forwarding traffic to each application container. Optional platform features include automatic SSO across every installed app and a permission interface that lets apps request scoped access to each other's data and capabilities, similar to the permission model on Android or iOS. There is no telemetry, and the managed tier offered by the author's company, Imbue, runs the exact same codebase.

Three consumption paths exist today: a free managed instance with a $10 credit, self-hosting on a VPS, or installing the ISO on your own hardware. The application catalog is small but growing weekly, with a high UX bar for inclusion. The author has run a personal instance for over six months of private development and testing, migrating their entire digital life onto it. Source code lives on GitHub and the community coordinates on Matrix.

What is not known
- The exact open-source license (MIT, AGPL, Apache-2.0, etc.)
- Minimum hardware requirements (CPU, RAM, storage) for self-hosting
- Officially supported Linux distributions beyond the Ubuntu base
- Technical details of the SSO mechanism (OIDC, SAML, proxy auth, shared cookies)
- How HTTPS exposure is handled (integrated ACME/Let's Encrypt, Traefik, Caddy, manual certs)
- Granularity, revocation, and audit capabilities of the inter-app permission model
- Update policy: rolling, semantic versioning, stable/beta channels, data migrations
- Architecture support: amd64 only or arm64 as well (Raspberry Pi, etc.)
- What the Imbue managed tier includes beyond the credit (backups, monitoring, SLA, pricing after credit)
- Current number of apps in the curated catalog and formal inclusion criteria
- Existence of a CLI or API for automation (Terraform, Ansible, GitOps)
- Managed database services (PostgreSQL, MariaDB, Redis) as platform primitives
- Full-instance and per-app backup/restore mechanisms
- Exact public launch date (the text references "5 Sep 2026" but does not confirm if that is today)
