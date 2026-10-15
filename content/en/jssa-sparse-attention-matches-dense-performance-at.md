---
title: "JSSA sparse attention matches dense performance at 700B scale without retraining"
summary: "A new token-level sparse attention method projects queries and keys into a shared subspace, achieving 99% of native dense sparse attention throughput on 700B models with no retraining."
lang: en
story: jssa-sparse-attention-matches-dense-performance-at
publishedAt: 2026-10-15T11:57:17.067Z
sourceUrl: "https://arxiv.org/abs/2610.19026"
sourceName: "arXiv cs.CL"
priority: routine
tags: [attention, sparse, llm, kernel]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Joint Subspace Sparse Attention (JSSA) introduces a token-level sparse attention mechanism that projects queries and keys into a shared low-dimensional subspace. The method learns this subspace by minimizing the error in preserving token attention scores. The original non-convex objective is bounded by a tractable marginal objective that admits a closed-form spectral solution. The authors report that directly refining the exact objective yields no measurable improvement in their experiments.

The approach is implemented as a gather-free indexed-attention kernel. This kernel supports distinct KV selections per head under the standard Grouped-Query Attention (GQA) layout without requiring custom memory layouts or gather operations. JSSA is evaluated as a drop-in replacement across standard GQA models, hybrid sliding-window/global architectures, and Multi-head Latent Attention (MLA) models.

On an NVIDIA B200 GPU, JSSA achieves up to 6.43× the decoding throughput of full-KV attention at a 128K token context length. At the 700B parameter scale, it reaches 96, 99% of the decoding throughput of the model's native Dense Sparse Attention (DSA) without requiring retraining. The method maintains reasoning accuracy comparable to native DSA while avoiding the generation length inflation and architecture-dependent failures observed in competing sparse attention methods.

## What is not known

- Specific model names and sizes used in experiments beyond the generic 700B parameter mention.
- The sparsity ratio or token selection budget used for each experiment.
- Implementation details of the indexed-attention kernel (language, libraries, open-source availability).
- Exact accuracy metrics (perplexity, specific reasoning benchmarks) compared to full-KV attention.
- Quantitative KV-cache memory consumption compared to baselines.
- Prefill latency and token selection overhead introduced by JSSA.
- Public availability of code and weights, including licensing terms.
