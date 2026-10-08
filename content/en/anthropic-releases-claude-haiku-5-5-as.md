---
title: "Anthropic releases Claude Haiku 5.5 as cheapest and fastest small model"
summary: "The new Haiku 5.5 beats its predecessor on every benchmark, including a jump from 15.7% to 72.4% on OSWorld, while Anthropic says it costs 75% less to run."
lang: en
story: anthropic-releases-claude-haiku-5-5-as
publishedAt: 2026-10-08T13:54:11.493Z
sourceUrl: "https://www.anthropic.com/claude-haiku-5-5"
sourceName: "Hacker News (portada)"
priority: flash
tags: [anthropic, claude, haiku, benchmarks]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Anthropic has released Claude Haiku 5.5, positioning it as the cheapest, fastest, and most capable small model in its lineup. The company targets high-volume, cost-sensitive workloads such as summarization, database lookups, and classification. It also functions as a fast sub-agent alongside Opus 5.5 and Sonnet 5.5 for coding tasks, and its latency profile suits live customer support and browser automation.

The cost reduction is significant. Anthropic states Haiku 5.5 costs an average of 75 percent less to run than Haiku 4.5. Separately, cache read prices for Sonnet 5.5 have been cut in half, making that model roughly 20 percent cheaper on most agentic workflows. Subscribers on Max and Team plans now receive a monthly API credit to build agents on the Claude platform, though the credit amount has not been disclosed.

Haiku 5.5 introduces an effort setting, the first for the Haiku class, allowing developers to optimize for cost or intelligence. Technical details of the setting, including parameter names and available levels, have not been published.

Benchmark results show substantial gains over Haiku 4.5 across the board:

- GDPval-AA v2.1: 1620 vs 735 (Haiku 4.5), 1437 (GPT-6 Luna), 1840 (Sonnet 5.5)
- AA-Briefcase v1.1: 1578 vs 614, 1336, 1824
- OSWorld 2.1 offline subset: 72.4% vs 15.7%, 48.9%, 83.9%
- Humanity's Last Exam (no tools): 45.9% vs 10.2%, , 56.9%
- Humanity's Last Exam (with tools): 57.4% vs 18.7%, , 64.5%
- Terminal-Bench 4.0: 39.2% vs 0.0%, 16.4%, 70.6%
- FrontierCode 1.1: 46.4% vs , 42.4%, 52.1%
- Chartography (no tools): 46.4% vs 6.4%, 29.1%, 61.6%

Early customers report consistent improvements. Asana cites a greater than 30 percent latency reduction and up to 2.5x faster inference per agent turn.

The model identifier for API calls is `claude-haiku-5-5`.

## What we don't know

- Absolute per-million-token pricing for Haiku 5.5 input and output
- Exact cache read pricing for Sonnet 5.5 after the reduction
- Monthly API credit amount for Max and Team subscribers
- General availability date and supported regions
- Technical specification of the effort setting (parameters, tiers)
- GPT-6 Luna results for Humanity's Last Exam and FrontierCode (marked as unavailable in the data)
- Full evaluation methodology (referenced System Card not provided)
- Rate limits, context window size, and specific tool support for Haiku 5.5
