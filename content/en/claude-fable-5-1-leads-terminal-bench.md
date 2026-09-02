---
title: "Claude Fable 5.1 leads Terminal-Bench-Science at 52.6%"
summary: "Anthropic's new model beats Opus 5 and GPT-5.6 Sol on scientific terminal tasks. Simon Willison tested five reasoning tiers on an SVG prompt; max tier cost $3.30 and produced the best pelican on a bicycle, which he then animated for $1.37 more."
lang: en
story: claude-fable-5-1-leads-terminal-bench
publishedAt: 2026-09-02T12:19:59.894Z
sourceUrl: "https://simonwillison.net/2026/Sep/1/claude-fable-5-1/"
sourceName: "Simon Willison"
priority: routine
tags: [anthropic, benchmark, reasoning, svg]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Anthropic released Claude Fable 5.1 on September 1, 2026. The model scores 52.6% on Terminal-Bench-Science 0.1, a substantial jump from Fable 5 at 24.7%, Opus 5 at 29.0%, and GPT-5.6 Sol at 22.4%. The benchmark measures the ability to use a Linux terminal for scientific tasks, so the delta suggests Fable 5.1 is significantly more capable at tool use and long-context reasoning.

Fable 5.1 ships with five reasoning tiers: low, medium, high, xhigh, and max. You cannot disable reasoning entirely. Simon Willison tested the prompt "Generate an SVG of a pelican riding a bicycle" across every tier to see how the knob affects cost, latency, and output quality.

Low and medium produced no visible reasoning traces. Low emitted 1,998 output tokens in 23.8 seconds at 10.017¢. Medium emitted 1,977 tokens in 23 seconds at 9.912¢. High showed summarized reasoning: 2,612 tokens, 29.6 seconds, 13.087¢. Xhigh jumped to 36,767 tokens over 7 minutes 51 seconds for $1.83. Max produced 65,927 tokens in 13 minutes 54 seconds at $3.30. The max-tier pelican was the best: it included a background, legs on both sides of the frame, feet on pedals, a wing on the handlebars, a blue cap, and a basket holding a fish.

Willison then animated the max-tier SVG by piping the conversation log back into Fable 5.1 at the high tier with the prompt "animate this". That pass consumed 6,121 input tokens and 26,201 output tokens for $1.37. The resulting MP4 shows the wheels spinning backward, an artifact of the SVG-to-video conversion; the original SVG rotates them correctly.

```bash
llm logs -cx | llm -m claude-fable-5.1 -s ' animate this '
```

During testing, Willison fixed a bug in `llm-anthropic` that prevented reasoning traces from being logged correctly. The fix ensures the full chain of thought is captured for later inspection or chaining.

## What we don't know

The full specification of Terminal-Bench-Science 0.1 is not public, so its representativeness for general coding tasks is unclear. We also don't know why low and medium tiers showed no reasoning traces despite the model lacking an "off" switch. No quantitative comparison exists against Gemini 3.7 Flash on the same prompt. The `llm-anthropic` bug may be environment-specific; its broader impact is unconfirmed.
