---
title: "Open-source package reloads 50M-token KV cache from NVMe in seconds"
summary: "galahad-kv stores encrypted KV blocks on local NVMe and reloads them into GPU memory without a forward pass. On one H100, block reloads ran 2.8x to 4.3x faster than recompute and cut GPU energy 8.8x to 12.3x."
lang: en
story: open-source-package-reloads-50m-token-kv
publishedAt: 2026-10-09T13:37:31.914Z
sourceUrl: "https://arxiv.org/abs/2610.10845"
sourceName: "arXiv cs.CL"
priority: flash
tags: [inference, kv-cache, nvme, vllm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A new open-source package, galahad-kv, keeps a 50-million-token context alive across requests by saving the model's key-value (KV) cache to local NVMe storage instead of recomputing it every time. The system splits the KV state into blocks of roughly 16,000 tokens, encrypts them, and writes them to disk. When a later request needs that context, the exact bytes reload into GPU memory without running the model forward pass again.

The benchmark ran on a single NVIDIA H100 using vLLM and two Gemma 4 models: 12B and 31B parameters. It served 50 million real public tokens and tested 100 block reloads at depths ranging from zero to 50 million tokens. Reloading a block was 2.8x to 4.3x faster than recomputing it from scratch and used 8.8x to 12.3x less GPU energy. GPU memory stayed flat during the entire 50-million-token flow.

Accuracy was tested by planting facts millions of tokens back and asking the models to retrieve them. Gemma 4 12B answered 82 out of 100 correctly. Gemma 4 31B answered 98 out of 100. Neither model produced a hallucinated response in those 100 questions. The method does not expand the attention window; it reuses stored state, so output quality still depends on the base model's ability to attend to the loaded block.

The write cost is one-time. The storage footprint is large, requiring terabytes of local NVMe. The test protocol resists common tricks in long-context benchmarks, and a single-GPU reproduction is available under a free license.

What remains unknown includes absolute reload latency in milliseconds, sustained throughput, CPU and RAM overhead during encrypted read/write cycles, exact storage size in terabytes for 50 million tokens under both models, the specific license terms, performance on non-H100 GPUs or other model families like Llama or Qwen, cold-start latency after a reload, KV state integrity after many write/read cycles, and the dollar cost of the required NVMe storage.
