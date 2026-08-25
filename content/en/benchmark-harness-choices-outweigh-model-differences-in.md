---
title: "Benchmark harness choices outweigh model differences in new study"
summary: "A study of 12 open-weight models found that changing the evaluation harness , option order, prompt wording, and scoring method , swings accuracy scores by up to 58 percentage points. The scoring method drives most variance."
lang: en
story: benchmark-harness-choices-outweigh-model-differences-in
publishedAt: 2026-08-25T07:32:28.429Z
sourceUrl: "https://arxiv.org/abs/2608.21382"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [benchmarks, evaluation, llms, reproducibility]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Leaderboards report a single number per model. That number shifts when you change how the benchmark is administered. A new paper shows the harness , option order, prompt wording, scoring method , drives most of the variance, not the model weights.

Researchers evaluated 12 open-weight instruction-tuned models from four families on 3,679 items drawn from ARC, HellaSwag, MMLU, and TruthfulQA. They fixed greedy decoding and model weights and ran 26 harness configurations they call "equally defensible." The configurations vary option order, prompt phrasing, and, most importantly, whether the answer is extracted from generated text or from per-option likelihoods.

Gemma-4-31b scores anywhere from 31 percent to 89 percent accuracy depending on the harness. Four of the 12 models reach rank one under at least one configuration. On items where two adjacent models answer stably, the pair is effectively tied. The items that flip across configurations , termed config-fragile , explain 95.7 percent of the gap between adjacent models on average.

The scoring method is the primary axis of variability. Option order matters less. The paper introduces a "fragility grid" a leaderboard can run before publishing a ranking. The grid sweeps the harness configurations and reports the band of scores each model occupies. If the bands overlap, the data do not support the ranking.

Benchmark compression methods that select high-discrimination items make the problem worse. Item discrimination correlates with fragility at 0.28 (95 percent CI 0.25, 0.30). Compression retains fragile items instead of discarding them.

The authors release per-item logs and an analysis script that regenerates the full grid on CPU in seconds.

## What is not known

The exact 26 harness configurations are not listed in the abstract. The 12 specific models and their four families are not named. The precise definition of "config-fragile item" and "stable response" is not given. Per-benchmark breakdowns for ARC, HellaSwag, MMLU, and TruthfulQA are not provided. The four models that achieve rank one and the configurations that produce those ranks are not identified. The script's dependencies and runtime requirements beyond "CPU in seconds" are not specified. The correlation type , Pearson, Spearman, or other , is not stated. No comparison is made to variability across training seeds or model checkpoints.
