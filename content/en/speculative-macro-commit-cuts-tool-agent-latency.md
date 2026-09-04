---
title: "Speculative Macro Commit cuts tool-agent latency by up to 45 percent"
summary: "A new MLSP2026 paper introduces SMC, a multi-level speculative execution system that pre-runs action chains in an isolated snapshot. On τ²-Bench Telecom it matches sequential accuracy with 18.6 percent less latency; on AppWorld wall time falls 44.9 percent with a small..."
lang: en
story: speculative-macro-commit-cuts-tool-agent-latency
publishedAt: 2026-09-04T11:57:47.486Z
sourceUrl: "https://arxiv.org/abs/2609.03236"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [speculation, agents, latency, mlsp2026]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A new paper accepted at MLSP2026 introduces Speculative Macro Commit (SMC), a multi-level speculative execution mechanism for tool-using agents. The core problem is serial latency: an agent calls a tool, waits for the observation, reasons about the next step, calls another tool, and so on. SMC breaks this chain by running a fast drafter model ahead of the authoritative actor model inside an isolated environment snapshot.

The architecture uses two models. The actor , Qwen3.5-27B INT4 in the experiments , drives the official trajectory. The drafter , Qwen3.5-4B , predicts and pre-executes future action chains in the snapshot. Before runtime, the system mines recurring multi-action skeletons from training traces and stores them in a macro library. At inference time, the drafter matches its predicted chains against this library. When the actor's next tool call matches the first action of a drafted chain, SMC commits the remaining pre-executed steps and their observations to the official trajectory in one batch.

On the τ²-Bench Telecom subset, SMC matches the sequential agent's accuracy while cutting latency 10.23% versus the Speculative Actions baseline and 18.59% versus pure sequential execution. On AppWorld, wall time drops 7.7% over the baseline and 44.9% over sequential, with a small decline in task completion rate. The code is public; the paper includes a link to the repository.

## What is not known

- The exact task completion drop on AppWorld.
- Macro library details: size, mining algorithm, recurrence criteria.
- Memory and compute overhead of maintaining the isolated environment snapshot.
- Absolute latency numbers in milliseconds or seconds.
- Evaluation on benchmarks beyond τ²-Bench Telecom and AppWorld.
- The specific repository URL (only referenced as available in the paper).
- Actor INT4 quantization method and its quality impact.
- Average macro length or typical action chain length.
- Drafter first-action match rate.
- Comparison with multi-step speculation methods like Medusa or Eagle adapted for tool use.
