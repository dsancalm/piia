---
title: "Databricks cuts AI coding costs 30% with smart routing"
summary: "A Databricks post on managing AI coding costs, based on its own experience and talks with Stripe, Coinbase, Uber and Ramp, finds cheaper models often match expensive ones. Its Smart Router sends each task to the cheapest capable model, cutting average cost by over 30%."
lang: en
story: databricks-cuts-ai-coding-costs-30-with
publishedAt: 2026-08-08T07:35:24.209Z
sourceUrl: "https://www.databricks.com/blog/managing-ai-coding-costs-scale"
sourceName: "Hacker News (portada)"
priority: routine
tags: [ai-costs, coding, routing, databricks]
generatedBy: deepseek/deepseek-v4-flash-0731
---
The most expensive model is not always the best model, and the most expensive coding assistant is not always the best assistant. That is the practical finding from a new post on managing AI coding costs at scale, based on experience at Databricks and conversations with Stripe, Coinbase, Uber, and Ramp.

At Databricks, agentic coding has measurably improved every velocity metric the company tracks, and in some teams it has driven order-of-magnitude gains in output. But the gains come with a cost problem. Newer models often cost more without doing better work. Stripe found that Opus 4.7 did not meaningfully improve quality over Opus 4.6, while increasing cost, and declined to make it available internally. Databricks saw similar cost regressions comparing Opus 5.0 to 4.8.

The response is not to pick one model and stick with it. Databricks built a Smart Router in its AI Gateway that sends each task to the cheapest model that can handle it. The router consistently reduces average task cost by more than 30%, while roughly matching the quality of the most expensive model in the working set.

## What you can use

Databricks has open sourced or made freely available the key infrastructure components: an end user meta-harness called Omnigent and the Unity AI Gateway. A meta-harness is a layer that sits between the developer and the underlying coding agents, letting you swap models and tools without rewriting your workflow.

The post does not include code samples, so there is nothing to copy and run. The value is in the architecture. A meta-harness lets you route, cache, and enforce budgets centrally instead of hardcoding a model name into every developer's config.

Hard budgets, where usage is entirely cut off at a specific spend threshold, are used only as a last resort at every company spoken with. They stop work mid-task and frustrate developers. The preferred approach is soft controls: routing, caching, and per-user cost envelopes that slow down or degrade gracefully before hitting a wall.

## What is not known

The exact cost savings percentages for each technique in the summary table are not given. The specific details of the automated evaluations companies built to size up new models are not described. The exact number of companies surveyed and the full list of who uses each technique are not provided. The post does not state the cost envelope per user that companies aim for. The implementation details of meta-harnesses built by other companies are not shared.
