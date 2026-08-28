---
title: "TreeGraft merges multiple drafters to speed up speculative decoding"
summary: "A new framework lets small and large drafters build a shared draft tree together, removing the usual trade-off between proposal speed and acceptance rate."
lang: en
story: treegraft-merges-multiple-drafters-to-speed-up
publishedAt: 2026-08-28T18:59:00.382Z
sourceUrl: "https://arxiv.org/abs/2608.26112"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [speculative-decoding, llm, inference, optimization]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Speculative decoding usually forces a choice: a tiny drafter that proposes tokens quickly but accepts few, or a larger drafter that accepts more tokens but slows down each step. TreeGraft removes that trade-off by letting several drafters of different sizes build a single shared draft tree together.

The framework starts with a cheap drafter expanding the tree breadth-first. A stronger, more expensive drafter then re-scores the candidates, picks new graft positions, and recovers promising paths that the small model missed. Those expansions are merged non-destructively, so branches created by the fast drafter stay intact. A lightweight scheduler, distilled from an offline value system, decides at each step whether the extra compute of the strong drafter is worth it. The result is a dynamic allocation of draft budget that adapts to the difficulty of each token position.

The authors evaluated the method across 10 target-drafter model pairs and 6 benchmarks. On average TreeGraft beats the best fixed single-drafter baseline by 15.1%, with a peak improvement of 26.6%. The code is publicly available.

## What is not known
- Which specific model pairs and benchmarks were used
- Absolute latency or throughput numbers (only relative gains are reported)
- Architecture and size of the distilled scheduler
- Details of the offline value system used for distillation
- Memory overhead of running multiple drafters simultaneously
- Whether the released code includes scheduler training scripts or only inference
- The license of the published code
