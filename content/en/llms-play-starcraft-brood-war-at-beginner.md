---
title: "LLMs play StarCraft Brood War at beginner level in new benchmark"
summary: "Codex Astra won all 18 games using early worker rushes, but every model tested still plays like a novice. The benchmark reveals unsolved gaps in macro management, fragile sub-agent coordination, and costs that vary 100-fold without tracking win rate."
lang: en
story: llms-play-starcraft-brood-war-at-beginner
publishedAt: 2026-09-20T11:51:57.221Z
sourceUrl: "https://bw.swerdlow.dev/report"
sourceName: "Hacker News (portada)"
priority: routine
tags: [starcraft, llm, benchmark, rl]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A new benchmark called Brood War Bench pits large language models against the original StarCraft: Brood War through an agent harness. The environment is deterministic, open source, and built for reproducible reinforcement-learning evaluation. Every model tested plays at a beginner level at best.

Codex Astra on its "xhigh" configuration won all 18 of its games, a 100 percent win rate with 12.6 actions per minute and a cost of $10.54 per game. The same model on "medium" finished 16-2 (88.9 percent) at 17.2 APM and $15.11 per game. Claude Fable took third at 15-3 (83.3 percent), 12.6 APM, $12.24 per game. At the bottom, Grok 4.6 on "xhigh" managed only 2 wins in 17 games (11.1 percent), while Grok 4.6 "medium" and "low" and Claude Haiku each went 0-16.

The winning agents rely on "cheese" strategies: early worker or probe rushes instead of standard macro play. Codex spawns separate sub-agents for economy, production, and army control. These sub-agents barely communicate and send units into battle one by one. In game G009, a Codex 5.6 Terra / medium agent moved its last Command Center to a map corner and survived six extra minutes after losing its main base and army.

The benchmark exposes three gaps for anyone building long-horizon autonomous agents. First, macro management , continuous resource balancing, tech progression, and army composition , remains unsolved. Second, multi-agent coordination inside a single model invocation is fragile; the sub-agents act as silos. Third, cost per game varies by two orders of magnitude (Codex 5.6 Luna / xhigh at $0.16 versus Codex Astra / low at $21.07) without a clear correlation to win rate.

What is not known: the exact model versions behind the Codex 5.6 Sol, Luna, Terra, and Codex Astra labels; what the xhigh, medium, and low knobs control (sampling parameters, tool budgets, compute); the map pool and race matchups; the sub-agent prompts, tool schemas, and memory architecture; why Grok 4.6 fails so badly; total experiment spend; whether the benchmark accepts new submissions; and the source code for the agent-only Brood War client and the evaluation harness.
