---
title: "Meta ships Muse Code agent and cheap Muse Spark 1.2 tier that trains on your data"
summary: "The contributor model costs $0.10 per million input tokens, undercutting every comparable model, but the tradeoff is that Meta can use your data to improve their products. The full model runs $1.25/$4.25."
lang: en
story: meta-ships-muse-code-agent-and-cheap
publishedAt: 2026-08-06T09:23:00.370Z
sourceUrl: "https://simonwillison.net/2026/Aug/5/muse-code-and-muse-spark-12/#atom-everything"
sourceName: "Simon Willison"
priority: flash
tags: [meta, coding, ai]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Meta shipped its own coding agent, Muse Code, and a new model, Muse Spark 1.2, that it co-trained with the agent. The model is the second update to Muse Spark, and the company says it improved code generation, complex debugging, codebase understanding, and end-to-end developer workflows. The training scaled up compute on coding tasks and expanded the diversity of training environments, all aimed at long-horizon work: whole-repository generation, large end-to-end projects, and auto-research.

The release comes with two model IDs. The full model, `muse-spark-1.2`, is priced at $1.25 per million input tokens and $4.25 per million output tokens. The second, `muse-spark-1.2-contributor`, costs $0.10 and $0.20, but the tradeoff is direct: you let Meta use your data to improve their products. That is the whole deal. Simon Willison added both prices to llm-prices.com, which shows the contributor tier undercuts every comparable model. Gemini 3.6 Flash runs $1.50/$7.50, GPT-5.6 Luna runs $0.20/$1.20, and Gemini 3.1 Flash-Lite runs $0.25/$1.50.

The contributor model is the interesting decision. The price is an order of magnitude lower than the standard tier, and it is lower than everything else on the list. What you give up is data privacy, and the terms say Meta can use your data to improve their products. There is no detail on what that means in practice, what gets collected, how it gets used, or whether code you write with it becomes training data.

## The agent side

Muse Code is the harness that Muse Spark 1.2 was trained with. The model was co-trained with the agent so they work together, and the training included rejection sampled harness trajectories and recipe optimizations for goals, compaction, and subagents. The toolset integration is meant to maximize compatibility between model and harness.

## What is not known

The release does not quantify the training compute scale-up, name the exact new training environments, or break down the improvements in debugging and codebase understanding. There is no benchmark comparison against other models on coding tasks, and no release date for Muse Code. The data usage terms for the contributor model are not specified beyond the consent to let Meta use your data.
