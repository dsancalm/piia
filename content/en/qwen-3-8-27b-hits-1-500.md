---
title: "Qwen 3.8 27B hits 1,500 tokens per second on Cerebras public API"
summary: "The unpruned 27B model runs on wafer-scale hardware with a 128k context window on the paid tier, eliminating the need for dedicated GPU clusters in many agent and RAG workloads. Pricing, rate limits, and benchmarks remain undisclosed."
lang: en
story: qwen-3-8-27b-hits-1-500
publishedAt: 2026-09-04T11:47:30.501Z
sourceUrl: "https://inference-docs.cerebras.ai/models/overview"
sourceName: "Hacker News (portada)"
priority: flash
tags: [cerebras, qwen, inference, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Qwen 3.8 27B is now live on Cerebras public endpoints at roughly 1,500 tokens per second. The model identifier is `qwen-3.8-27b`. It carries a 64k token context window on the free tier and 128k on the paid tier. At 27 billion parameters, it sits in a size class that usually forces a choice between self-hosted GPUs and slower API providers.

Cerebras does not host pruned models on its production API. Every model served is the original, unpruned release. The company applies selective quantization only to weights during storage , a mix of 16-bit, 8-bit, and 4-bit , while keeping activations, attention, and the KV cache in full precision. They also commit to not changing a model architecture without notice.

Pruned variants created with REAP exist on Hugging Face under the Cerebras REAP Collection, but those are marked for research only and do not run on the production API.

For reference, the same infrastructure serves `gpt-oss-120b` at around 3,000 tokens per second, showing the wafer-scale engine scales across model sizes.

### What this changes for production

A 27B model at 1,500 tokens/s with 128k context in a serverless endpoint removes the need to provision dedicated GPUs for many agent and RAG workloads. The latency profile makes multi-step reasoning, tool use, and long-context retrieval practical without the operational overhead of managing vLLM or TGI clusters. The cost-per-million-tokens on the pay-as-you-go tier is not public yet, but the speed alone shifts the break-even point against self-hosted A100s or H100s for bursty or variable traffic.

### What is not known

- Exact price per million tokens on the pay-as-you-go tier for `qwen-3.8-27b`.
- Concrete rate limits for free and paid tiers.
- General availability date or API version.
- Quality benchmarks (MMLU, HumanEval, etc.) of this model served on Cerebras versus other platforms.
- Layer-level detail of the selective weight quantization: which layers sit at 4-bit, 8-bit, or 16-bit.
- Measured time-to-first-token and sustained throughput at the full 128k context length.
