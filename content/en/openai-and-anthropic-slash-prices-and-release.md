---
title: "OpenAI and Anthropic slash prices and release new models on same day"
summary: "Both companies released updated models within an hour of each other. OpenAI's GPT-6 Luna costs $0.10 per million input tokens, half the price of its predecessor, while GPT-6 Sol drops to $2 per million input tokens."
lang: en
story: openai-and-anthropic-slash-prices-and-release
publishedAt: 2026-09-23T11:55:46.623Z
sourceUrl: "https://simonwillison.net/2026/Sep/22/opus-and-sol-and-luna/"
sourceName: "Simon Willison"
priority: flash
tags: [pricing, openai, anthropic, llm]
generatedBy: dots-studio/dots-3-note-preview:free
---
On 22 September 2026, Anthropic released Claude Opus 5.5. About an hour later, OpenAI announced GPT-6 Sol and GPT-6 Luna. The timing was not accidental. Both companies cut prices sharply, and the new tiers reshape which model makes sense for a given workload.

GPT-6 Luna lands at $0.10 per million input tokens, $0.01 for cached input, and $0.50 for output. That is half the cost of GPT-5.6 Luna ($0.20 / $0.02 / $1.20) and puts it among the cheapest models OpenAI has ever shipped, just above GPT-4.1 Nano ($0.10 / $0.40) and GPT-5 Nano ($0.05 / $0.40). GPT-6 Sol drops to $2 / $0.20 / $10, also a 50 percent reduction from GPT-5.6 Sol ($4 / $0.40 / $20). The price cut makes GPT-5.6 Terra, which sits at $2 / $0.20 / $12, immediately obsolete.

Claude Opus 5.5 is priced at $4 / $0.20 / $20. That represents a 20 percent discount on the previous Opus generation ($5 / $25) and a 60 percent drop in cache-read costs. At the high end, GPT-6 Astra and Claude Fable 5.1 both hold at $10 / $50. Grok 4.7 undercuts them at $2 / $6. Haiku 4.5 remains at $1 / $5, but GPT-6 Luna is ten times cheaper on input and output.

The author has already swapped defaults: GPT-6 Sol and Opus 5.5 in Codex and Claude Code, and GPT-6 Luna in the Datasette Agent demo. Anthropic says Sonnet 5.5 and Haiku 5.5 are coming soon; if Haiku 5.5 matches the current Haiku 4.5 price, it will still sit an order of magnitude above Luna.

Opus 5.5 carries a 128,000 token output limit. In one test, a "max" thinking attempt to generate an SVG of a pelican riding a bicycle failed after nearly twenty minutes and cost $2.56. The same prompt at lower thinking levels succeeded. GPT-6 Luna produced a passable SVG on the first try. No benchmark suite accompanies the releases, so quality comparisons remain anecdotal.

## What we don't know

No standardized benchmarks compare Opus 5.5, GPT-6 Sol, and GPT-6 Luna head to head. The communication-style improvements for Opus 5.5 are described only in passing. Sonnet 5.5 and Haiku 5.5 capabilities are undisclosed. The root cause of the Opus 5.5 "max" thinking failure is not explained. Long-term pricing trajectories for both vendors beyond the current announcements are unclear.
