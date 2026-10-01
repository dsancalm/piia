---
title: "Netlify cuts edge latency in half with Firecracker MicroVMs"
summary: "Netlify moved its Edge Functions from V8 isolates to dedicated Firecracker MicroVMs, serving one billion daily invocations. Median warm latency dropped from 25-40 ms to 5-6 ms, p99 improved 47 percent, and cold starts average 9 ms at 1.2 percent frequency."
lang: en
story: netlify-cuts-edge-latency-in-half-with
publishedAt: 2026-10-01T13:45:24.100Z
sourceUrl: "https://www.netlify.com/blog/edge-functions-firecracker-microvms/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [netlify, firecracker, unikraft, edge]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Netlify has moved its Edge Functions runtime from V8 isolates to Firecracker MicroVMs running on dedicated compute nodes inside its edge network. The platform serves roughly one billion invocations per day. The warm invocation path now sits at 5, 6 ms at the median, down from 25, 40 ms on the previous isolate infrastructure. The p99 latency improved by 47.4 percent. Availability is reported at 99.998 percent. Log delivery is five times faster.

Cold starts occur in approximately 1.2 percent of invocations and average 9 ms. Each function runs in its own MicroVM. VM creation takes less than 1 ms; boot reaches ~2 ms at p99. The system uses memory-mapped snapshots to restore MicroVMs and scale to zero when traffic stops. Compute nodes are built from a Unikraft base image and are separate from the edge nodes that handle routing.

Routing to a compute node uses rendezvous hashing for affinity, keeping a function warm on the same node to preserve cache state. The affinity relaxes past a threshold to prevent hot spots. Runtime, platform, and function images are mounted as uncompressed EROFS and memory-mapped so the kernel reads only the pages actually needed. The VM lifecycle , boot, snapshot, restore, scale-to-zero , comes from the Unikraft collaboration.

The developer experience does not change. URL imports, npm packages, Node built-ins, `netlify.toml` configuration, and local development continue to work as before.

## What is not known

- Concrete CPU, memory, and connection limits configured per service.
- The exact threshold at which rendezvous hashing relaxes affinity.
- Details of the Unikraft base image and packages installed on compute nodes.
- Memory overhead metrics per MicroVM.
- Comparative infrastructure cost before and after the migration.
- Node.js and V8 versions used in the runtime.
- Snapshot retention policy and typical snapshot size.
- Circuit breaker details and conditions for rerouting or decommissioning nodes.
