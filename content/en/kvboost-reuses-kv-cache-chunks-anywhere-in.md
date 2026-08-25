---
title: "KVBoost reuses KV cache chunks anywhere in the prompt"
summary: "KVBoost adds dual hashing and drift repair so decoder models can recycle cached chunks that appear mid-prompt or with minor edits. On Qwen2.5-3B it cuts time-to-first-token 4.5× versus no caching and 16% versus standard prefix caching while keeping accuracy flat."
lang: en
story: kvboost-reuses-kv-cache-chunks-anywhere-in
publishedAt: 2026-08-25T07:25:46.444Z
sourceUrl: "https://arxiv.org/abs/2608.21362"
sourceName: "arXiv cs.AI"
priority: flash
tags: [inference, caching, llm, optimization]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
KVBoost is a chunk-level KV cache reuse system for HuggingFace-compatible decoder models that works even when shared context does not sit at the start of the prompt. Standard prefix caching can only reuse a contiguous initial prefix. KVBoost removes that restriction by hashing each chunk twice: a prefix hash captures positional identity and a content hash captures semantic identity. The dual-hash index supports both exact and approximate matches, so a chunk that appears later in the prompt or with minor edits can still be retrieved.

When an approximate match is found, attention boundaries between the cached chunk and the surrounding tokens may drift. KVBoost repairs this drift with two strategies. SelectiveRecompute re-encodes only the boundary regions. CacheBlendRecompute runs a lightweight probe pass, measures per-token deviation, and re-computes only the tokens whose deviation exceeds a threshold. The paper does not disclose the chunk size, the adaptive splitting criterion, the deviation threshold, the memory overhead of the hash tables, the latency added by the probe pass, or the exact importance-weighted eviction policy.

The system also applies asymmetric KV quantization (int8/int4) to shrink the cache footprint under a fixed memory budget. No architectural changes are required; models using RoPE work out of the box.

Evaluation on Qwen/Qwen2.5-3B with 1,000 bug-localization samples shows a 4.49× reduction in time-to-first-token: 142.4 ms versus a 639.1 ms baseline. Accuracy stays flat at 99.2% versus 99.1%. KVBoost also beats prefix caching by 16% on the same metric.

What is not known: chunk size and adaptive splitting details; hash-table memory overhead; probe-pass latency and deviation threshold; exact eviction policy; results on larger models (7B, 70B) and tasks beyond bug localization; comparison with vLLM prefix caching, SGLang, or KV cache offloading; throughput impact beyond TTFT; open-source availability and license.
