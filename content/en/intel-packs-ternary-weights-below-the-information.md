---
title: "Intel packs ternary weights below the information-theoretic limit"
summary: "BITCOS stores a presence bitmap plus a sign vector, costing 2 minus the zero-density bits per weight. At 51.5% zeros it reaches 1.485 bits, beating the 1.585-bit floor and five-trit packing on 26 of 29 models."
lang: en
story: intel-packs-ternary-weights-below-the-information
publishedAt: 2026-09-17T12:00:06.180Z
sourceUrl: "https://arxiv.org/abs/2609.16338"
sourceName: "Hacker News (portada)"
priority: flash
tags: [quantization, compression, llm, intel]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Ternary LLMs compress weights to three symbols: -1, 0, +1. The information-theoretic floor is log2(3) ≈ 1.585 bits per weight. In practice, standard five-trit packing stores five weights per byte. That rounds up to 1.625 bits per weight because it treats the three symbols as equiprobable. That assumption is wrong.

Researchers at Intel measured the actual symbol distribution across 29 ternary LLM models. Zeros dominate, reaching 51.5% of all weights in the sparsest model. The average zero density across the set is high enough that equiprobable packing wastes space on every model.

BITCOS is a distribution-adaptive layout. It stores a dense presence bitmap marking non-zero positions, followed by a compacted sign vector for the remaining -1 and +1 values. The storage cost is 2 - z bits per weight, where z is the zero density. At 51.5% zeros, that drops to 1.485 bits per weight, breaking the 1.58-bit barrier. BITCOS beats five-trit packing on 26 of the 29 models tested.

The layout is designed for fast unpacking. The authors provide optimized sequences for AVX-512, AVX2, and Intel Xe2 GPUs. The bitmap loads as a mask; the sign vector expands directly into registers without branching. Measured against production ternary matrix-vector multiplication kernels, BITCOS delivers up to 1.28x speedup at real-world zero densities. End-to-end LLM inference on five platforms (client and server CPUs, integrated and discrete Xe2 GPUs) shows decode throughput gains of up to 1.18x on CPUs and 1.27x on GPUs.

The paper is available as arXiv:2609.16338.

What is not known: which specific 29 models were measured, their sizes or provenance; the exact zero-density distribution beyond the 51.5% maximum; the full unpacking instruction sequences for each ISA; the baseline matvec kernel implementations; the exact CPU and GPU models used for end-to-end tests; the model configurations for those benchmarks; whether BITCOS requires retraining or works on existing ternary checkpoints; the memory-bandwidth versus compute breakdown for the kernel speedup; comparisons to Huffman or arithmetic coding; bitmap overhead at low zero densities; impact on quantization-aware or post-training quantization pipelines; and whether an open-source implementation or framework integration (llama.cpp, vLLM) exists.
