---
title: "Execution-based step labels beat LLM judges for code preference optimization"
summary: "A new framework called STEP-KTODER labels each function in a program by running generated unit tests, then feeds those binary signals into a KTO objective."
lang: en
story: execution-based-step-labels-beat-llm-judges
publishedAt: 2026-08-26T07:28:39.201Z
sourceUrl: "https://arxiv.org/abs/2608.23632"
sourceName: "arXiv cs.AI"
priority: routine
tags: [code, rlhf, preference-optimization, evaluation]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A paper accepted at EMNLP 2026 Findings introduces STEP-KTODER, a preference-optimization framework that treats every module-level function in a multi-function program as a distinct step. Each step receives a binary correctness label derived from automatically generated unit tests, and those labels are combined with an outcome-level signal on the full program. The authors evaluate on HumanEval(+), MBPP(+), BigCodeBench, and LiveCodeBench, reporting consistent gains over outcome-only KTO and DPO.

The central finding is not the architecture but the label source. When the researchers replaced execution-based labels with LLM-as-a-judge annotations, the judge systematically over-predicted function failures. That noise corrupted positive step labels and degraded the subsequent preference optimization. In other words, a cheap executable check produces cleaner supervision than a strong language model asked to simulate the same check.

The method decomposes a candidate program into its top-level functions, synthesizes a unit test suite for each function, runs the tests, and records pass or fail. Those per-function bits feed a Kahneman-Tversky optimization (KTO) objective alongside the usual program-level pass/fail bit. No process reward model is trained; the binary execution trace is the supervision.

The paper spans 20 pages, 8 figures, and 14 tables from seven authors. The code is public, though the pre-print points to a placeholder URL.

What is not known
- Exact Pass@1 numbers or relative gains per benchmark.
- Base model family, size, or checkpoint.
- Training hyperparameters (learning rate, batch size, epochs, hardware).
- Prompt or model used to generate the unit tests, and their coverage criteria.
- Precise definition of "module-level function" and the decomposition algorithm.
- Comparisons against process-reward models or step-level DPO variants.
- Compute cost and wall-clock time versus baselines.
- Ablation results isolating process-only, outcome-only, and combined signals.
- Resolved repository URL.
- Whether results transfer beyond Python.
