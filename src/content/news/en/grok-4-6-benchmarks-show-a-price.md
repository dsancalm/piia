---
title: "Grok 4.6 benchmarks show a price play, not a clear winner"
summary: "Grok 4.6 matches GPT-5.6 Sol on the Intelligence Index at 61 and undercuts both rivals on token pricing, but it trails badly on terminal-bench and DeepSWE. The jump from Grok 4.5 is real, yet no single model takes every test."
lang: en
story: grok-4-6-benchmarks-show-a-price
publishedAt: 2026-08-13T08:10:36.583Z
sourceUrl: "https://x.ai/news/grok-4-6"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [grok, benchmarks, ai-models, pricing]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Grok 4.6 arrived on August 12, and the benchmark table settles most of the argument about where it sits. It scores 61 on the Artificial Analysis Intelligence Index, matching GPT-5.6 Sol and one point below Fable 5 Max. On CursorBench v3.2 it hits 69.9%, behind Fable 5 Max's 70.5% and GPT-5.6 Sol Max's 67.2%. DeepSWE v1.1 tells a different story: 65.9% for Grok 4.6, while GPT-5.6 Sol Max reaches 73% and Fable 5 Max hits 70%. The model is strongest on FrontierCode v1.1 Extended at 61.3%, where GPT-5.6 Sol Max manages 60.6% and Fable 5 Max 63.6%.

The pricing matters more than the rankings. Grok 4.6 starts at $2 per million input tokens and $6 per million output tokens. That undercuts GPT-5.6 Sol Max and Fable 5 Max, which sit higher on several benchmarks but cost more. For API users comparing alternatives, the gap between Grok 4.6 and Grok 4.5 is the real signal. Grok 4.5 scored 56 on the Intelligence Index. Grok 4.6 jumps to 61. On APEX-Agents, the new model moves from 47.1% to 57.5%. On Terminal-Bench v3.0 it climbs from 15.7% to 26%, though GPT-5.6 Sol Max and Fable 5 Max both clear 34% there.

The announcement positions Grok 4.6 for long-running agents and interactive visual work. It is available in Cursor and Grok Build, with double the included usage for the first week. The install path is a single command:

```bash
$ curl -fsSL https://x.ai/cli/install.sh | bash
```

The terminal-bench weakness is worth noting. Grok 4.6's 26% sits well below the 34.6% and 34.1% of its competitors. If your workflow depends on shell interaction, the model is not the top pick. On Harvey LAB (Vals), Grok 4.6 scores 15.8%, above Fable 5 Max's 11.3% and GPT-5.6 Sol Max's 2.5%. On GDPVal-AA v2, Grok 4.6 hits 1753, ahead of GPT-5.6 Sol Max's 1728 and Fable 5 Max's 1741.

The model is a genuine step forward from 4.5, and the price makes it a serious alternative to the more expensive options. But the benchmarks do not crown a single winner. Grok 4.6 leads on some tasks, loses on others, and the choice depends on what you actually run.

## What is not known

The release notes do not specify how Grok 4.6 handles context windows beyond the agentic workload claim. No information on fine-tuning availability or rate limits beyond the base token pricing. The gap between Grok 4.6's DeepSWE score and the competition is unexplained, and no ablation study shows what changed internally between 4.5 and 4.6.
