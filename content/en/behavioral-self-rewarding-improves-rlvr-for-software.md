---
title: "Behavioral Self-Rewarding improves RLVR for software agents"
summary: "A new method, BSR, uses the current policy to rank passing trajectories by their debugging behaviors, creating richer reward signals without extra environment steps. Evaluated on SWE-bench, it boosted performance for Qwen3-14B and Qwen3-32B over standard RLVR."
lang: en
story: behavioral-self-rewarding-improves-rlvr-for-software
publishedAt: 2026-10-12T15:58:14.469Z
sourceUrl: "https://arxiv.org/abs/2610.12598"
sourceName: "arXiv cs.AI"
priority: routine
tags: [rlvr, software-engineering, swe-bench, reinforcement-learning]
generatedBy: dots-studio/dots-3-note-preview:free
---
Binary verifiable rewards treat every passing trajectory the same. A minimal fix that barely scrapes the test suite earns the same scalar as a clean, well-tested solution. That flat signal limits what reinforcement learning with verifiable rewards (RLVR) can teach a software-engineering agent. The new paper introduces Behavioral Self-Rewarding (BSR), a method that reuses the current policy to compare observable debugging behaviors between trajectories that share the same verifier outcome on the same task.

The core idea is pairwise preference over existing rollouts. For a given issue, the system collects multiple trajectories that all pass (or all fail) the verifier. The policy itself examines the debugging actions , edits, test runs, search queries, tool calls , and ranks the trajectories against each other. Those pairwise judgments are aggregated into per-task local scores, then converted into bounded auxiliary rewards. The original pass/fail order from the verifier is preserved; BSR only adds contrast inside each equivalence class.

Because the comparisons run on trajectories already gathered, no extra environment steps are required. The method was evaluated on SWE-bench Verified and SWE-bench Live using Qwen3-14B and Qwen3-32B checkpoints. Both model sizes showed consistent gains over the base RLVR setup.

What is not known
- Exact magnitude of the improvements (pass rate, issue resolution) for each model and benchmark.
- Technical details of the pairwise preference computation and local score aggregation (algorithm, hyperparameters).
- Additional compute cost of BSR versus vanilla RLVR training.
- Whether BSR operates during training (offline or online) or at inference time.
- Architecture and training recipe of the base policy under RLVR.
- Ablation results or comparisons against external reward-model baselines.
- Knowledge cutoff date for the SWE-bench Live tasks used.
