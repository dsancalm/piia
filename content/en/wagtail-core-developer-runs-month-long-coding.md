---
title: "Wagtail core developer runs month-long coding experiment on GLM 5.3 Flash"
summary: "Thibaud Colas burned 2 billion tokens in September but providers hit capacity limits halfway through, forcing a switch to DeepSeek and Qwen models. A single overnight prototype consumed 450 million tokens and tripled the project's energy budget."
lang: en
story: wagtail-core-developer-runs-month-long-coding
publishedAt: 2026-10-03T11:54:01.454Z
sourceUrl: "https://wagtail.org/blog/one-month-on-glm-53-flash/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [wagtail, llm, coding, infrastructure]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Thibaud Colas, a Wagtail core team member, spent September 2026 using only GLM 5.3 Flash for daily coding tasks. The experiment consumed 2 billion tokens across the month. The first half ran entirely on the target model. The second half required switching to DeepSeek V4.1 Flash and Qwen 3.8 Flash after the chosen providers hit capacity limits. GLM 5.3 Flash offers a 1 million token context window, vision support, and deployment in European data centers through multiple vendors.

The Wagtail MCP server prototype was built through vibe coding in a single overnight session. It burned 450 million tokens, cost $150, and drew 5 kWh. That single prototype pushed the project total to roughly 35 kWh against an initial 10 kWh target. The intended model handled only 50 percent of the total token volume. Colas estimates that a more disciplined approach to the same prototype would have cost five times less.

Infrastructure availability proved to be the binding constraint. The selected providers are popular but lack the serving capacity of the major labs. When demand spiked, the endpoints throttled or queued requests, forcing the model swap. Colas plans to continue the challenge in October with continuous local measurement, fixed experimentation budgets, improved multi-agent techniques, and a focus on efficient flash-tier models.

What is not known: the exact token split among the replacement models in the second half, the methodology and results of the Wagtail benchmark referenced in the source, the scope and status of the agent skills and CLI prototype under development, the cost and energy figures for the alternative models, the precise definition separating production from R&D token accounting, and the exact date and format of Wagtail Space 2026.
