---
title: "MERIT benchmark shows memory design shifts agent success by up to 60 points"
summary: "A new benchmark measures whether long-term memory changes tool-use decisions in LLM agents. Across 23,440 episodes costing $42.57, memory lifted success on dependent tasks from 0.00 to 1.00."
lang: en
story: merit-benchmark-shows-memory-design-shifts-agent
publishedAt: 2026-09-09T12:01:40.887Z
sourceUrl: "https://arxiv.org/abs/2609.05441"
sourceName: "arXiv cs.AI"
priority: routine
tags: [benchmark, memory, agents, evaluation]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
MERIT is the first benchmark that measures whether long-term memory actually changes tool-use decisions in LLM agents, rather than just testing conversational recall. The paper introduces a harness with explicit cost accounting across three episodic tool-use domains. Each task's dependence on facts from prior episodes is verified by an automated "leak check" to ensure the model cannot solve it without memory. A difficulty ladder culminates in updated-fact recall, controlled memory corruption, and full token and dollar measurement for every memory operation.

The main experiments comprise 23,440 scored episodes at a total cost of $42.57. A two-generation pilot ran on gpt-4.1-mini, followed by a preregistered grid of three models by three seeds (GPT-4.1, Claude Haiku 4.5; memory side fixed). Memory lifts success on dependent tasks from a verified leak-free floor of 0.00 to 0.55, 1.00. On updated facts, however, embedding retrieval collapses unpredictably: 0.30, 0.95 across models, with a maximum inter-seed gap of 0.45. Even when retrieval returns the correct value, agents act on it only 55% of the time.

Update-on-write stores , structured fact store and, notably, LLM summarization , hold at 0.70, 1.00; the hybrid approach is worse than the fact store alone. A spot-check with a latest-generation model (Claude Sonnet 5, gated on a clean full-replay control) reproduces the pattern. Swapping the memory implementation moves task success by up to 60 points. Full replay is never cost-effective: the best condition per domain delivers 2.7, 3.9x its marginal utility per dollar. The authors release the benchmark, harness, and all traces.

## What is not known

The exact three episodic domains are not specified. Details of the structured fact store architecture and the LLM summarization method are absent. The precise definition and calculation of "marginal utility per dollar" is not given. The exact model versions and cutoff dates for "GPT-4.1" and "Claude Haiku 4.5" are unclear. The leak check's false positive and negative rates are unknown. The spot-check configuration with Claude Sonnet 5 (sample size, seeds) is not detailed. The reason the hybrid approach underperforms the fact store alone is not explained. The meaning of "gated on a clean full-replay control" is not defined. The availability and license for the released code, data, and traces are not stated.
