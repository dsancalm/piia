---
title: "Google reveals Gemini 4 Argon with 1M token context and top coding scores"
summary: "Argon leads DeepSWE at 77.9% and powers Google's C++ to Rust migrations, including an 800,000-line kernel. It also found a critical healthcare bug missed by other models. Access stays limited to the Fairwind Program with no public launch date."
lang: en
story: google-reveals-gemini-4-argon-with-1m
publishedAt: 2026-10-01T13:41:40.502Z
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [google, gemini, coding, security]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google has released performance data for Gemini 4 Argon, a new frontier model designed for complex, long-horizon professional tasks. The headline feature is a 1 million token context window, the largest currently available, which allows the model to ingest and reason across massive codebases, legal corpora, or financial datasets in a single pass. It is currently rolling out to trusted cyber defenders via the Fairwind Program and is in heavy internal use at Google, but a public release date has not been announced.

The benchmarks target the workloads that justify that context length. Argon scores 77.9% on DeepSWE v1.1, a new state of the art for software engineering tasks. It leads the Vals Index, which measures economic impact across finance, coding, legal, and tax work, and tops AutomationBench at 51.3%. For long-form video understanding, it hits 91.7% on LVBench. On the security side, it ties for first on CWE-bench v1 at 68% and outperforms the specialized 3.8 Flash Cyber model on Wiz's internal black-box penetration testing benchmark. Wiz is already deploying Argon through its Scan for Good initiative, where the model uncovered a critical vulnerability in healthcare software that other frontier models missed.

The coding results are grounded in production migrations. Google is using Argon to migrate C/C++ codebases to Rust, including the re2 regex engine, the libgav1 AV1 decoder, and the 800,000-line Fuchsia Zircon kernel. On libgav1, Argon replaced 32,000 lines of hand-written SIMD code with a memory-safe Rust decoder that runs 2.7x faster than the previous Rust port. In infrastructure optimization, Argon agents identified memory savings freeing over 300 TiB immediately, with a projected total of 500 TiB to 1 PiB. It also delivered a 40% improvement over published baselines in quantum algorithmic optimization, solving problems in minutes.

Pricing for the introductory period is set at $2 per million input tokens and $10 per million output tokens. Cached input tokens receive a 95% discount, which effectively drops the input cost to $0.10 per million tokens for repeated context. That caching rate is critical for the 1M token window: you can load a large repository or document set once and query it repeatedly at a fraction of the base price. No public API endpoint or SDK updates have been published yet; access remains gated behind the Fairwind Program and a U.S. government voluntary testing process.

Safety work is proceeding in parallel. Google says it is hardening four areas: misuse defense, prompt injection defense, misalignment monitoring, and safety testing. Argon currently leads on Gray Swan's Indirect Prompt Injection benchmark. The model is designed to refuse harmful requests while preserving legitimate dual-use scientific research, though the specific guardrail implementations and red-team results have not been disclosed.

## What we don't know

- The public release date and general availability timeline.
- Full pricing structure beyond the introductory rates.
- Technical details on the architecture enabling the 1M token context.
- Complete list of external red teams and detailed adversarial testing results.
- Specific consumer-facing features or product integrations planned.
- Long-term roadmap for integration into Google Cloud Vertex AI or AI Studio.
