---
title: "Vendor agent harnesses show no overall advantage over DeepAgents in controlled study"
summary: "Paired tests on 256 private tasks found native SDKs from Anthropic and OpenAI performed statistically identically to DeepAgents overall. Results flipped by task type: the Claude Agent SDK fell behind on repository work but led on coding competitions, a post-hoc split the..."
lang: en
story: vendor-agent-harnesses-show-no-overall-advantage
publishedAt: 2026-09-14T13:28:47.204Z
sourceUrl: "https://arxiv.org/abs/2609.11987"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [agents, benchmarks, llm, evaluation]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
The paper tests a simple question: does the vendor's native agent harness actually help, or does it just add overhead? The authors built a private, contamination-controlled suite of 256 tasks drawn from repositories and coding competitions with knowledge cutoffs after the model training dates. They ran paired comparisons, swapping only the harness while holding the base model constant: Claude Opus 4.8 with the Claude Agent SDK versus DeepAgents, and GPT-5.5 with the OpenAI Codex SDK versus DeepAgents. Each cell received 80 tasks. An isolated oracle graded 792 of the 800 planned runs.

On aggregate, the native harness shows no reliable edge. With Opus 4.8, the Claude Agent SDK solved 48.8% of tasks against DeepAgents at 50.0%, a difference of -1.25 percentage points with a 95% bootstrap confidence interval of [-10.0, +7.5]. With GPT-5.5, the Codex SDK hit 55.6% versus DeepAgents at 54.4%, a +1.25 pp difference with a 95% CI of [-4.4, +6.9]. Neither interval excludes zero.

The picture changes when tasks are split by type. On 61 repository tasks, Opus 4.8 with the native harness trails DeepAgents by 9.0 pp. On 19 competition tasks, the native harness leads by 23.7 pp (p=0.003, label-permutation test). The authors flag that this partition was chosen after seeing the data and requires a pre-registered replication.

Cost tells a different story. Re-pricing from raw per-turn usage to frozen list prices, DeepAgents costs 1.3, 1.6x more per solved task on Opus 4.8 and 1.2x more on GPT-5.5. But 58 runs on the Anthropic account left no usage record. Allocating that missing spend to either cell moves the Opus cost ratio anywhere from 0.7 to 2.3, so the billed-cost ordering remains unresolved. This revision corrects an August manuscript that had misread its own telemetry semantics (Section 5.1).

Twenty-two of 81 runs cancelled for wall-clock limits had already produced a passing patch. The exact timeout threshold is not disclosed.

The authors release the orchestrator, the grading oracle, the re-analysis code, and derived aggregates. The 256 tasks stay private.

## What is not known

- The exact composition of the 256 private tasks.
- Whether the repository-versus-competition interaction holds in a pre-registered replication.
- The true billed cost on the Anthropic account, blocked by 58 runs with missing usage logs.
- Generalization to other models, harnesses, or public benchmarks.
- Details of the telemetry semantics defect beyond its effect on cost figures.
- Why Gemini 3.5 Flash and DeepSeek V3.2 were run only as side cells.
- The precise wall-clock limit that triggered 81 cancellations.
