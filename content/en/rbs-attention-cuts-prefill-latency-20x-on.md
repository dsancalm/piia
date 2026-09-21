---
title: "RBS-Attention cuts prefill latency 20x on 128K context with no retraining"
summary: "A training-free, block-sparse method combines centroid-based selection with a prompt-conditioned rescue branch to preserve accuracy while matching sparse FlashAttention kernels. On Qwen3-32B at 128K tokens, RULER drops only 0.87 points versus dense attention."
lang: en
story: rbs-attention-cuts-prefill-latency-20x-on
publishedAt: 2026-09-21T13:14:43.231Z
sourceUrl: "https://arxiv.org/abs/2609.20971"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [attention, inference, sparsity, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
RBS-Attention addresses the prefill bottleneck in long-context LLMs with a training-free, block-sparse method. It uses a two-branch selection mechanism. A centroid-based branch captures average relevance across a block. A rescue branch uses the maximum key radius per block, conditioned on prompt, layer, and head. The masks are combined through independent thresholding, which preserves the block-regular execution pattern that sparse FlashAttention requires.

The method was evaluated on H100 GPUs using Qwen3-30B-A3B-Instruct-2507-FP8 (MoE) and Qwen3-32B (dense). On the dense model at 128K context, RBS-Attention scores 88.65 on RULER, while dense attention scores 89.52. Other benchmarks include LongBench-v2, InfiniteBench, and Video-MME, but detailed scores for those are not reported.

Speedups are substantial: 20.65x in standalone prefill attention, 11.92x in vLLM, and 5.97x end-to-end time-to-first-token. All measurements used H100 with 128K context and the MoE model. Support experiments analyze real retention, compare selectors at equal density, and characterize behavior across block size, threshold, and memory.

The approach works with existing sparse FlashAttention kernels and needs no model retraining, so it is practical for inference engines like vLLM.

What is not known: the exact threshold values and whether they are fixed or adaptive; the block size used in the main experiments; memory and latency overhead of the rescue branch; detailed numeric results on LongBench-v2, InfiniteBench, and Video-MME; performance beyond 128K context; open-source availability and license; impact on the decoding phase; direct comparison with other sparse prefill methods such as Quest, InfLLM, or MInference; and the exact nature of the prompt-, layer-, and head-dependent radius distribution.
