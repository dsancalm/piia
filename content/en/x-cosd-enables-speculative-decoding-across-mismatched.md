---
title: "X-CoSD enables speculative decoding across mismatched vocabularies"
summary: "Existing collaborative speculative decoding requires identical tokenizers or sends full distributions, saturating uplinks. X-CoSD splits resampling: the device handles the shared vocabulary locally while the server keeps its exclusive tokens."
lang: en
story: x-cosd-enables-speculative-decoding-across-mismatched
publishedAt: 2026-09-10T11:36:45.748Z
sourceUrl: "https://arxiv.org/abs/2609.09166"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [speculative-decoding, tokenizer-mismatch, communication-efficiency, on-device-llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Collaborative speculative decoding (CoSD) has required a shared vocabulary between the small on-device model and the large server model. When vocabularies differ, existing methods exchange full token distributions for residual resampling. That saturates the uplink and kills the latency benefit.

X-CoSD removes that bottleneck by splitting the resampling work. The overlapping vocabulary region is handled locally on the device. The server-only region stays on the server. Only the common-region distributions travel over the network.

The framework introduces Hybrid Resampling (HR). The server sends the top-k tokens from its exclusive vocabulary plus the full distribution for the intersection. The device samples from the intersection locally, merges the server's exclusive candidates, and produces the final token without ever transmitting the server's full distribution.

A second variant, X-CoSD-E, switches to Server Resampling with Device Verification (SR-DV). The server proposes replacement candidates and their probabilities. The device verifies them against its own draft distribution. Both variants are proven lossless. They preserve the exact server LLM distribution.

This matters because real deployments rarely share tokenizers. A mobile SLM fine-tuned on a 32k vocabulary and a cloud LLM on a 128k vocabulary can now run CoSD without padding or projection layers. The communication reduction is structural. Uplink payload scales with the intersection size, not the server vocabulary size.

## What is not known

The paper does not disclose the specific SLM and LLM architectures, parameter counts, or tokenizers used in experiments. Evaluation datasets, quality metrics (perplexity, reasoning benchmarks), exact bandwidth savings in bytes per token, measured speedups in tokens per second, and hardware specifications for device and server are absent. Implementation details such as intersection size, verification overhead, and public code availability with license are also not provided.
