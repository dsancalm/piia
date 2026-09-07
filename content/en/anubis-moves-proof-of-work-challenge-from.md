---
title: "Anubis moves proof-of-work challenge from JavaScript to WebAssembly"
summary: "The year-long rewrite speeds up the client-side hash loop, cutting solve time for real browsers and lowering CPU load on edge verifiers. Maintainers plan to drop proof-of-work entirely in favor of fingerprinting and headless-browser detection, while a no-JavaScript fallback..."
lang: en
story: anubis-moves-proof-of-work-challenge-from
publishedAt: 2026-09-07T12:54:11.382Z
sourceUrl: "https://anubis.techaro.lol/blog/2026/anubis-wasm/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [anubis, webassembly, scrapers, proof-of-work]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Anubis is a Hashcash-style proof-of-work challenge that sits in front of public endpoints to slow aggressive AI scrapers. The project spent a year moving the client-side puzzle from JavaScript to WebAssembly. The version tag attached to the work is `v1.28.0-pre1.0.20260906214259-7564aa1d8a85`.

The motivation was straightforward: a WASM module executes the hash loop faster than JIT-compiled JavaScript, which reduces the time a legitimate browser spends solving the challenge and lowers the CPU cost on the edge nodes that verify solutions. Anubis currently requires modern JavaScript and breaks when extensions such as JShelter disable the features it relies on. The maintainers have stated that the long-term goal is to replace the proof-of-work entirely with fingerprinting and headless-browser detection , font rendering checks, canvas behavior, and similar signals. A no-JavaScript fallback is listed as work-in-progress.

The post does not disclose the size of the compiled module, the specific WASM target (wasm32-unknown-unknown, wasm32-wasi, etc.), or whether the same module runs on the server for verification. There are no benchmarks comparing solve latency or verification throughput between the old JS path and the new WASM path. The exact start and end dates of the year-long effort are not given, nor are any metrics on scraper deterrence before and after the switch.

## What is not known

- Module size, compilation flags, and the exact WebAssembly API surface used.
- Client-side solve time and server-side verification cost numbers for either implementation.
- Whether the WASM module is also executed on the edge for verification or only in the browser.
- Current status and timeline of the no-JavaScript fallback.
- Quantitative effectiveness data against scrapers pre- and post-migration.
