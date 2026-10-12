---
title: "DCOCO corrector speeds up diffusion-based speculative decoding by up to 6.6x"
summary: "A parallel corrector restores intra-block dependencies in diffusion drafters without sequential bottlenecks, beating all baselines across four verifiers and ten tasks."
lang: en
story: dcoco-corrector-speeds-up-diffusion-based-speculative
publishedAt: 2026-10-12T15:54:34.936Z
sourceUrl: "https://arxiv.org/abs/2610.12570"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [decoding, diffusion, speculative, inference]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Diffusion-based drafters such as DFlash predict several future tokens at once. This keeps the GPU busy but breaks the usual causal chain: each position in the block is generated without seeing the realized identities of its left neighbors. The paper introduces DCOCO, a lightweight contextual corrector that restores those intra-block dependencies without reverting to sequential processing. Instead of committing to a single token per position, the drafter keeps multiple candidates. DCOCO then evaluates the compatibility of adjacent candidates in parallel, scoring pairs to select a locally consistent path through the block. The corrected draft is handed to the verifier exactly as a standard speculative decoding step would be.

The authors benchmark across four verifier backbones and ten downstream tasks, covering greedy, stochastic, and extended-reasoning decoding modes. DCOCO delivers the highest average throughput in every configuration. Under concurrent load (four to thirty-two simultaneous requests) it outperforms the strongest competing corrector by six to twenty-three percent, while sequential correctors fall below the uncorrected DFlash baseline. Peak speedup over vanilla autoregressive decoding reaches 6.6×.

The method is attractive because it plugs into an existing speculative decoding pipeline. No verifier retraining, no changes to the diffusion drafter architecture, and no sequential bottleneck are introduced. The correction step runs in parallel across positions, so its latency scales with block depth rather than block length.

## What is not known

- The specific verifier backbones and benchmark names.
- DCOCO's parameter count, memory overhead, and exact latency profile.
- Hardware details (GPU type, VRAM, batch sizes) used in the experiments.
- Whether code and model weights will be released and under what license.
- The number of candidates retained per position and the precise scoring function.
- Per-benchmark and per-decoding-mode breakdowns.
