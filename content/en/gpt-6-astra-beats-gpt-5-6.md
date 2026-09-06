---
title: "GPT-6 Astra beats GPT-5.6 in SVG pelican test"
summary: "Simon Willison compared GPT-6 Astra against GPT-5.6 models on a pelican SVG prompt. Astra at low reasoning outperformed all GPT-5.6 variants, costing 9.55 cents. Astra max reasoning produced the best output but struggles with leg placement below max."
lang: en
story: gpt-6-astra-beats-gpt-5-6
publishedAt: 2026-09-06T11:15:25.557Z
sourceUrl: "https://simonwillison.net/2026/Sep/4/astra-pelicans/"
sourceName: "Simon Willison"
priority: routine
tags: [svg, gpt-6, astra, reasoning]
generatedBy: dots-studio/dots-3-note-preview:free
---
Simon Willison accessed GPT-6 Astra on September 4, 2026. He ran a visual comparison that places the new model's reasoning levels next to the GPT-5.6 family. Each model received the same prompt: generate an SVG of a pelican riding a bicycle. Willison arranged the outputs in a grid.

The test covered Astra at low, medium, high, xhigh, and max reasoning. (Astra does not support reasoning=none.) It also covered GPT-5.6 Sol, Terra, and Luna at their respective levels.

Every Astra output from low through xhigh looks better than the best GPT-5.6 Sol result at xhigh. The Astra max pelican is described as genuinely good. Below max, Astra still struggles to place the pelican's legs reliably on both sides of the bicycle frame. Even the low-reasoning version beats any Sol variant at any level. That low-reasoning call cost 9.55 cents.

Token counts reveal a quiet difference. Astra and Luna each used 16 input tokens. Sol and Terra used 26. Pricing is public for the base tiers: Astra runs $10 per million input tokens and $50 per million output tokens; Sol runs $5 per million input and $30 per million output. Willison estimates Astra can cost roughly twice as much as Sol, though exact per-reasoning-level costs and output token counts for this test are not known.

The quality jump at the low tier changes the cost-quality calculation for SVG code generation. A developer can now get output that surpasses the previous generation's best for about a dime. Whether that holds for other coding tasks, what the latency looks like at each reasoning level, and when Astra will be generally available remain open questions.

What is not known:
- Exact cost per reasoning level for Astra and the GPT-5.6 models
- Output token counts for each model in this test
- Latency or generation time per reasoning level
- Whether the "roughly twice the price" estimate is officially confirmed
- Technical architecture details comparing Astra and Luna
- General availability date for GPT-6 Astra
- Results on tasks other than pelican SVG generation
