---
title: "Subagents beat skills for long LLM tasks by isolating context"
summary: "An arXiv study finds that loading many reusable skills into one context window degrades reasoning as tasks grow longer. Spinning up subagents with fresh contexts preserves quality despite extra coordination tokens."
lang: en
story: subagents-beat-skills-for-long-llm-tasks
publishedAt: 2026-09-11T12:04:40.623Z
sourceUrl: "https://arxiv.org/abs/2609.09233"
sourceName: "arXiv cs.AI"
priority: routine
tags: [llm-agents, context-window, subagents, arxiv]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A new arXiv paper compares two patterns for reusing knowledge in long-horizon LLM agents: agent skills and subagents. Agent skills load instructions, scripts, and resources into the main context window as multi-file packages. Subagents spin up fresh context windows for each subtask, communicating with the primary agent through defined input-output contracts.

The authors find that as the task horizon grows, the skill-based approach becomes fragile. Reasoning quality degrades when the main context accumulates more instructions, few-shot examples, and intermediate state. Subagents outperform skills when their packages expose clear contracts and encode the procedural knowledge to satisfy them. The tradeoff is communication overhead: extra tokens are required to coordinate between the primary agent and each subagent.

The paper argues that the benefit of reusable knowledge depends on both its content and how it is organized and invoked. A skill that works in isolation may hurt performance when loaded alongside ten others in a single context. A subagent that isolates that same skill can preserve reasoning fidelity at the cost of latency and token spend.

The study was submitted September 7, 2026 by Wasu Top Piriyakulkij, Rachel Lawrence, Alicia Curth, Sushrut Karmalkar, and Niranjani Prasad. The v1 PDF is 164 KB.

## What is not known

- Which benchmarks or concrete tasks were used for evaluation (e.g., ALFWorld, WebShop, SWE-bench).
- How many tokens of overhead subagent coordination introduces in absolute or percentage terms.
- Which base models were tested (GPT-4, Claude, Llama, etc.) and their temperature or max-token settings.
- A formal definition of "clear input-output contracts" and how contract clarity is measured.
- Whether open-source code is available (GitHub repo, pip package) and where.
- Numerical results: accuracy, success rate, latency, cost per task for each approach.
- Whether the paper proposes a hybrid architecture or decision criteria for choosing between patterns.
