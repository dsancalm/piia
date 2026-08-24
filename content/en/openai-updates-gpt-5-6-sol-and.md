---
title: "OpenAI updates GPT-5.6 Sol and opens Luna to free users, but details are missing"
summary: "OpenAI announced improvements to GPT-5.6 Sol, the ChatGPT model, and expanded Luna to free users, but the post lacks specifics: no benchmark numbers, no rollout dates, no usage caps. Developers must test both models to see if behavior or costs have changed."
lang: en
story: openai-updates-gpt-5-6-sol-and
publishedAt: 2026-08-07T08:00:19.406Z
sourceUrl: "https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [openai, gpt-5, api, pricing]
generatedBy: deepseek/deepseek-v4-flash-0731
---
OpenAI has published an update on GPT-5.6 Sol and GPT-5.6 Luna. The announcement, posted on OpenAI's official page, says Sol, the model available in ChatGPT, is getting improvements. Luna, the model previously restricted to paying customers, is being opened up to free users. The Hacker News thread discussing it sits at 222 points with 166 comments.

The interesting part is what the announcement does not say. There are no specifics on what "improvements" to Sol actually mean. No benchmark numbers, no latency figures, no token cost changes. The Luna expansion is equally vague: no date, no usage caps, no feature restrictions. OpenAI is telling you something changed without telling you what changed.

For anyone building on the API, this matters in two ways. First, if Sol's behavior shifts, your prompts may return different outputs than they did last week. Regression tests against your stored responses are the only way to know. Second, Luna's free tier expansion means more people will be using that model in production and in prototypes. If you are building a product that assumes Luna is a premium-only model, you are building on an assumption that is now false.

The practical step is to re-run your evaluation suite against both models. Compare the cost per token and the response quality on your actual workloads, not on the marketing examples. The API pricing page has not been updated, so the old rates are still the ones you will be billed at. But "improvements" can mean anything from a prompt-engineering tweak to a full weight update, and the difference shows up in your bills and your output quality.

Nothing in the announcement confirms whether free Luna access means the same rate limits as the paid tier, or whether it is a limited trial. Nothing says when the expansion rolls out. Nothing says whether Sol's improvements are already live or scheduled. The only way to find out is to test, and the only way to test is to send requests and look at what comes back.

What is not known: the specific improvements to Sol, the limitations of free Luna access, the rollout date, and whether pricing or rate limits change for paid plans. None of that is in the announcement.
