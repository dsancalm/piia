---
title: "Wirewiki serves 240M domain suggestions in single frame"
summary: "A single European server delivers autocomplete results within an 8 ms render budget at p50, but transatlantic latency pushes global p99 past the 121 ms target. The index splits a hot Tranco trie from a cold CZDS tail on SSD."
lang: en
story: wirewiki-serves-240m-domain-suggestions-in-single
publishedAt: 2026-08-31T14:22:20.744Z
sourceUrl: "https://ruurtjan.com/articles/p99-0ms-autocomplete-for-240-million-domain-names"
sourceName: "Hacker News (portada)"
priority: flash
tags: [autocomplete, latency, dns, performance]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Wirewiki serves autocomplete suggestions for 240 million domain names with a p99 latency the author marks as 0 ms*. The asterisk matters: it measures only from keyUp to results ready for rendering, not the full network round-trip. The full budget, measured by typing 100 domains quickly, is 121 ms p99 for keyPress1Duration + gap + keyPress2Duration. At 60 Hz a frame is 16.7 ms, leaving roughly 8 ms of headroom at p50. The goal is next-frame rendering.

The client uses a prefetch strategy. On keyDown it requests suggestions for the typed character plus the next likely character. On keyUp it renders whatever has arrived. The API returns up to eight suggestions per prefix plus a `next` object containing suggestions for every valid following character (38 possibilities: a-z, 0-9, -, .). Maximum response size is ~5 kB uncompressed, ~2.5 kB compressed.

The index splits into a hot head and a cold tail. The head uses the Tranco top 1M list stored as an in-memory trie with the best eight suggestions precomputed at every node. Lookup is O(length of typed prefix). The tail covers the remaining gTLD domains from CZDS. It uses 256-name blocks, delta-compressed, with a 27 MB in-memory directory mapped via mmap on SSD. Lookup is O(length * log(number of domains)). The full 240 million names occupy ~2.5 GB on disk; hot pages stay cached by the OS.

The request path is Browser Cloudflare (edge cache) nginx API. Network latency dominates. Load testing with 720k simulated queries at a fixed open-loop rate showed the API alone responds p99 < 2 ms. Adding nginx yields p99 15 ms at 1.6k req/s. End-to-end through Cloudflare stays inside the 121 ms budget even with 1,000 concurrent users.

The bottleneck is geography. The single server sits in Europe. Traffic from the US adds 100-200 ms, blowing the p99 budget. The theoretical fix is multiple servers with geo load balancing, which the author considers overkill for a niche project. Nielsen's 100 ms instant threshold is met on cached hot paths via Cloudflare, but not globally at p99.

## What is not known

- Real-world p99 latency for global users in production (only synthetic tests and theoretical budgets are published).
- The query split between Tranco head and CZDS tail in actual traffic.
- Cloudflare cache hit rate on hot paths and its precise impact on global p99.
- Implementation details of the head trie (language, library, memory footprint).
- Exact delta-compression format and block structure for the tail index.
- Cost and architecture for multi-region deployment with geo load balancing.
- Whether Certificate Transparency logs or Archive.org have been added as data sources.
- Actual concurrent user count and geographic distribution.
