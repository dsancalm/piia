---
title: "DeepSeek V4 Pro hits Hacker News front page, live on OpenRouter"
summary: "The model is available now via the OpenRouter API, but the announcement lacks specs, pricing, and benchmark data. Early Hacker News reports are anecdotal; check Artificial Analysis for measured performance before production use."
lang: en
story: deepseek-v4-pro-hits-hacker-news-front
publishedAt: 2026-08-13T08:01:51.850Z
sourceUrl: "https://openrouter.ai/deepseek/deepseek-v4-pro-0813"
sourceName: "Hacker News (portada)"
priority: flash
tags: [deepseek, ai, llm, api]
generatedBy: deepseek/deepseek-v4-flash-0731
---
DeepSeek V4 Pro 0813 is on the front page of Hacker News this morning, with 887 points and 358 comments. The model is already live on OpenRouter, so you can call it through the same API endpoint you probably use for other models. The official DeepSeek API docs are at https://api-docs.deepseek.com/, and Artificial Analysis has a page up for it at https://artificialanalysis.ai/models/deepseek-v4-pro.

The Hacker News thread does not tell you anything about the model itself. No parameter count, no context window, no benchmark numbers beyond what Artificial Analysis has already measured, no pricing, no release date. The announcement is thin on technical detail, which is unusual for a model that is supposed to be a "Pro" tier release.

What you can do right now is hit the OpenRouter endpoint and see for yourself. The model identifier is `deepseek/deepseek-v4-pro`, and a basic call looks like this:

```bash
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek/deepseek-v4-pro",
    "messages": [{"role": "user", "content": "Write a quick sort in Rust."}]
  }'
```

The practical question for production use is price versus performance. DeepSeek models have historically undercut the major providers on cost, and the Artificial Analysis page will give you tokens-per-second and latency figures measured on real hardware. If you are deciding whether to swap this into a pipeline that currently runs on GPT-4o or Claude, those numbers matter more than the Hacker News hype.

The discussion thread is mostly speculation, which is what happens when a model appears without specs. Some commenters are running their own benchmarks already, so the thread is worth scanning for early reports. But treat those as anecdotal until Artificial Analysis publishes its full run.

What is not known: the technical specifications, the API pricing, the specific improvements over the previous V4 release, the exact launch date, and the hardware requirements. None of that is in the announcement, and the Hacker News thread does not resolve it. Check the official docs and the Artificial Analysis page before you commit anything to production.
