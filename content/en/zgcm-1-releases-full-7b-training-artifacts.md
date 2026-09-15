---
title: "ZGCM-1 releases full 7B training artifacts for reproducible math reasoning"
summary: "The open release includes every weight, checkpoint, code file, data recipe, and training log needed to reproduce a 7B model that matches far larger systems on math and agentic search."
lang: en
story: zgcm-1-releases-full-7b-training-artifacts
publishedAt: 2026-09-15T12:41:57.202Z
sourceUrl: "https://arxiv.org/abs/2609.13356"
sourceName: "arXiv cs.AI"
priority: routine
tags: [llm, open-source, math-reasoning, reproducibility]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
ZGCM-1 is a dense 7B-parameter foundation model trained from scratch. The release includes every artifact required for reproduction: pre-training, mid-training, and post-training weights; intermediate checkpoints; training code; stage-by-stage data recipes; and Weights & Biases logs. The paper positions the release as a reproducible baseline for mathematical reasoning and agentic search that does not rely on any closed API.

The architecture interleaves gated sliding-window attention with full attention layers. The optimizer is FP8 Muon, which the authors describe as stable across the run. Pre-training follows a curriculum that scales context length progressively: 16K, then 64K, then 256K tokens. At the mid-training stage, interaction traces are reformulated as Markov Decision Processes, a design choice intended to give the model a structured notion of multi-step reasoning before the final alignment phase.

The authors also describe an "AI-native R&D workflow" in which swarms of agents manage cluster operations, data curation, and rapid diagnostic evaluation. The paper distills eight empirical findings from that workflow, covering architectural scaling, quality pruning during supervised fine-tuning, long-context generalization, and agentic co-training dynamics.

On broad benchmarks the model is competitive within the 7B class. On mathematical reasoning and agentic search suites it remains competitive with frontier models orders of magnitude larger, explicitly naming Qwen3-235B-A22B and GLM-5.1. The pre-training design yields a roughly 4.2x improvement in time-to-loss at the 16K context stage.

## What is not known

- Total pre-training token count and exact dataset composition.
- Hardware cluster details: GPU count, model, and total training time in GPU-hours.
- Key hyperparameters: learning rate, batch size, weight decay, LR schedule, precision specifics beyond "FP8 Muon".
- Implementation details of the gated sliding-window attention (window size, interleaving pattern).
- Concrete benchmark scores (MATH, GSM8K, MMLU, SWE-bench, etc.) with exact numbers.
- Precise definition of the "agentic search suites" used for comparison with Qwen3-235B-A22B and GLM-5.1.
- What "competitive" means numerically: win rate, pass@1, exact match, or another metric.
- Details of the agent swarms: which models drive them, actual autonomy level, productivity metrics.
- Exact license for the released weights and code (Apache 2.0, MIT, custom?).
- Direct Hugging Face or GitHub links.
- Estimated economic cost of the full training run.
- The eight empirical findings beyond their high-level categories.
