---
title: "Cloudflare acquires Deno team, runtime support ends in one year"
summary: "Deno will receive security patches for twelve months before the team stops development. Deno Deploy shuts down in six months with paid migration support to Cloudflare Workers."
lang: en
story: cloudflare-acquires-deno-team-runtime-support-ends
publishedAt: 2026-10-10T12:51:55.998Z
sourceUrl: "https://deno.com/blog/cloudflare"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [cloudflare, deno, workers, runtime]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cloudflare acquired the entire Deno team on October 9, 2026. The runtime will receive monthly bugfix and security releases for one more year, after which the current team will stop development. Deno Deploy will operate for six months before shutting down. Paid customers will receive migration support to Cloudflare Workers. JSR will continue running and its infrastructure moves to Cloudflare. The team will maintain `rusty_v8` and work on integrating it into `workerd`, the open-source Workers runtime. A new project called `celld` builds on the Workers programming model to enable distributed applications with built-in scaling. Ryan Dahl invites anyone building agents at scale who want to run them on their own infrastructure to contact him at ry@cloudflare.com.

## What this means for your stack

If you run Deno in production, you have a hard deadline: twelve months of guaranteed patches, then zero. That is not a deprecation warning you can ignore. You need a migration target , Node.js, Bun, Cloudflare Workers, or another runtime , and a test plan that covers your standard library usage, your permission model, and any native addons compiled against `deno_core`.

If you are on Deno Deploy, the window is six months. Cloudflare says it will provide migration tooling and support for paying customers, but no details exist yet on SLA, cost parity, or feature gaps. Workers does not implement the Deno Deploy API surface one-to-one. You will rewrite deployment scripts, environment configuration, and any code that touches Deploy-specific globals.

JSR survives, but its governance shifts. The registry infrastructure moves under Cloudflare. Package publishing and resolution should keep working, but the long-term stewardship of the standard library and the CLI tooling that assumes a Deno runtime is now an open question. Community forks are possible; none are announced.

## The self-hosting angle

The strategic signal is `workerd` and `celld`. Cloudflare wants you to run their programming model , Workers, Durable Objects, the new `celld` primitives , on your own hardware. `rusty_v8` integration into `workerd` suggests they want V8 isolates without the Node.js compatibility layer overhead. If you have been waiting for a supported way to run the Workers runtime locally or in your data center, this acquisition is the clearest signal yet that it is coming.

What remains unknown: the exact start date of the one-year support window, the precise Deploy shutdown date, the `celld` release stage and roadmap, the `rusty_v8` integration timeline, whether commercial SLA coverage exists for the runtime maintenance period, and what happens to the Deno trademark and governance after the team stops.
