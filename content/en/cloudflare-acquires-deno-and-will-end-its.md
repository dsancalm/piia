---
title: "Cloudflare acquires Deno and will end its development in one year"
summary: "Cloudflare will maintain Deno for twelve more months before stopping development. Ryan Dahl says Deno fell into a Node-compatibility trap that offered no real advantage, while celld , a Durable Objects implementation using only object storage , points to a self-hosted..."
lang: en
story: cloudflare-acquires-deno-and-will-end-its
publishedAt: 2026-10-10T12:53:30.053Z
sourceUrl: "https://simonwillison.net/2026/Oct/9/deno-is-joining-cloudflare/"
sourceName: "Simon Willison"
priority: urgent
tags: [cloudflare, deno, runtime, workers]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cloudflare announced on October 9, 2026 that it is acquiring Deno.

In August 2026 the Deno team released celld, an open-source implementation of the Cloudflare Workers Durable Objects pattern. The stated goal is to use celld to make workerd self-hosting a first-class supported way to build and run applications with the Workers programming model.

Cloudflare will maintain the Deno runtime for one more year with monthly bug-fix and security releases, then end its development. Deno remains open source and others are invited to continue it.

Ryan Dahl, creator of Deno and Node.js, confirmed on Hacker News that this is a joint decision he agrees with. He no longer believes Deno is where he can do the most important work. Dahl argues Deno has been sucked into the "gravity well of node compatibility," forcing it to behave exactly like Node. Reimplementing Node makes no sense because Node already works, and the marginal advantages in performance, UX, or security are not enough.

Dahl says celld has worked remarkably well, depending only on object storage for coordination and persistence. He calls it a totally new model for server development, not just a different API. His favorite Deno feature remains the permission system, which allows allow-listing specific files, directories, and network hosts. Node.js added a similar permission model in v20.0.0 (April 2023) and marked it stable in v22.13.0 (January 2025), but it still does not support allow-listing specific network hosts. Network access is only globally on or off.

If you run Deno in production, you have one year to plan a migration or a community fork. The future of the Workers programming model, workerd plus celld, will be self-hosted and open source, decoupled from the Deno runtime.

What is not known:
- Financial terms of the acquisition
- Which Deno team members join Cloudflare
- Concrete roadmap for workerd self-hosting built on celld
- Whether an active community fork of Deno will emerge after official support ends
- Exact end-of-support date within the one-year window
- What "first-class supported way" entails for SLAs, documentation, and tooling
- Plans for the Deno package registry (JSR, deno.land/x)
- Impact on dependent projects such as Fresh and Deno Deploy
