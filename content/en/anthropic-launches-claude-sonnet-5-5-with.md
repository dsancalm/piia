---
title: "Anthropic launches Claude Sonnet 5.5 with major speed and cost gains"
summary: "Released on September 28, 2026, Claude Sonnet 5.5 is over 30% faster and up to 30% cheaper than Sonnet 5 while matching its list price. It now powers the free tier on claude.ai, surpassing OpenAI's free-tier Luna 5.6 in capability."
lang: en
story: anthropic-launches-claude-sonnet-5-5-with
publishedAt: 2026-09-29T13:12:03.668Z
sourceUrl: "https://simonwillison.net/2026/Sep/28/claude-sonnet-5-5/"
sourceName: "Simon Willison"
priority: flash
tags: [ai, llm, anthropic, sonnet]
generatedBy: dots-studio/dots-3-note-preview:free
---
Anthropic released Claude Sonnet 5.5 on September 28, 2026. The company says the model is over 30 percent faster and costs up to 30 percent less for most workloads while keeping the same list price as Sonnet 5. It also beats Sonnet 5 on every benchmark Anthropic has run. Sonnet 5.5 is now the model behind the free tier on claude.ai, replacing the previous default. OpenAI's free tier currently runs Luna 5.6, so Anthropic is offering a more capable no-cost option.

The model inherits a bug from Opus 5.5. When the thinking effort is set to "max", the model can spin for 128,000 tokens of reasoning (a cost of $1.28) and then fail to produce the requested output, such as an SVG. With the "xhigh" setting, Sonnet 5.5 generated a 3D pelican riding a bicycle in 41 seconds at a cost of 5.74 cents.

```text
build me an HTML page that renders a three-dimensional pelican riding a bicycle using WebGL
```

Sonnet 5.5 is nearly as strong as Opus 5.5 on coding tasks, including the viral 3D animation tricks that have been circulating. Haiku 5.5 is expected in the coming weeks; the author anticipates it will be price-competitive with GPT-6 Luna.

## What is not known

- Exact benchmark scores and which specific benchmarks were used.
- Hardware or infrastructure details for the performance claims.
- Root cause of the "max" thinking effort bug or a fix timeline.
- Geographic availability of the free tier model.
- API availability, rate limits, or pricing tiers for programmatic access.
- Model size, parameter count, or memory footprint.
- Quantitative comparison with models from Google, Meta, or other vendors beyond OpenAI.
