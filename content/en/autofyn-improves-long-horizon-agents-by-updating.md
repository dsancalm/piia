---
title: "AutoFyn improves long-horizon agents by updating persistent state instead of weights"
summary: "A frozen base model iterates through rounds where an orchestrator explores with specialized agents and a verifier supplies a scalar reward that is distilled into durable files."
lang: en
story: autofyn-improves-long-horizon-agents-by-updating
publishedAt: 2026-09-09T12:21:13.672Z
sourceUrl: "https://arxiv.org/abs/2609.05446"
sourceName: "arXiv cs.AI"
priority: routine
tags: [agents, iteration, memory, verification]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
AutoFyn is a non-parametric expert iteration harness that improves long-horizon agents by updating persistent state instead of model weights. The base model stays frozen. Each round starts from a fresh session; durable information re-enters only through explicit interfaces , persistent memory files, reports, and repository state. Inside a round, an orchestrator explores, plans, and builds many alternatives with specialized agents, while a task-grounded verifier checks the work and supplies an objective reward signal. That reward is distilled back into the persistent state, updating the effective policy for the next round.

The method was tested across three domains. On six fresh International Mathematical Olympiad 2026 problems, every model with room to improve scored higher under AutoFyn than in its provider's native coding agent. On the Spider 2.0 dbt benchmark, AutoFyn produced the top-ranked agent. In cybersecurity, it generated 16 confirmed vulnerability advisories across MetaMask, pnpm, Warp, LiteLLM, Langflow, and Open WebUI.

The architecture separates exploration from verification. The orchestrator can spawn multiple specialized agents to propose solutions, backtrack, and restructure the repository. The verifier is anchored to the task specification , unit tests, formal proof checkers, or security property validators , and emits a scalar reward. No gradient flows through the model. The only learning signal writes to files that the next round reads.

This pattern sidesteps the usual fine-tuning loop: no GPU clusters for training, no catastrophic forgetting, no distribution shift between training and deployment. The model you evaluate is the model you ship. The persistent state is portable; you can inspect it, diff it, and version it like code.

## What is not known

The paper does not disclose which base models were evaluated on IMO 2026 or their absolute scores. The internal structure of the orchestrator and specialized agents is not described. The exact reward formulation per domain, the concrete schema of the persistent state, typical round counts, and stopping criteria are absent. The Spider 2.0 dbt score and the margin over the second-place entry are not reported. Vulnerability types (CWE IDs, CVSS severities) are not listed. Public availability and licensing of the AutoFyn codebase are not stated. Compute cost and wall-clock time per round are not provided. How verification works in domains without automatic ground truth is not explained.
