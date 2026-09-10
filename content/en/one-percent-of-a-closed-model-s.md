---
title: "One percent of a closed model's reasoning lifts Qwen 18 points on open benchmarks"
summary: "Prepending the first slice of GPT-5.5 Pro's chain-of-thought to four open models raised Qwen3.8 A95B's recall score from 16.79 to 34.97 percent across 45 tasks. Kimi K3 improved modestly while DeepSeek V4 Flash and Inkling barely changed."
lang: en
story: one-percent-of-a-closed-model-s
publishedAt: 2026-09-10T11:41:10.037Z
sourceUrl: "https://gist.github.com/wsxiaoys/e0286dc6bb624ff5fdf49e7f4c528ba3"
sourceName: "Hacker News (portada)"
priority: routine
tags: [llm, distillation, reasoning, benchmarks]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A new Hacker News experiment tests whether a tiny slice of reasoning from a strong closed model can steer open-weight models toward better answers. The author took the first one percent of the chain-of-thought produced by something called GPT-5.5 Pro and prepended it as a prefill to four open models across 45 problems split evenly between STEM, non-STEM, and synthetic puzzles. The metric is the average unigram, bigram, and trigram recall of the teacher's visible answer inside the first 100 tokens of the target model's response.

Qwen3.8 A95B jumps from 16.79 percent to 34.97 percent, a gain of 18.18 percentage points. Kimi K3 starts higher at 31.11 percent and reaches 35.65 percent. DeepSeek V4 Flash drops slightly from 27.30 to 26.13 percent. Inkling barely moves, 19.99 to 20.45 percent. Broken down by category, Qwen gains 26.99 points on STEM, 12.80 on non-STEM, and 14.75 on puzzles.

The prefill is minimal: roughly the first one percent of the teacher's reasoning trace. The evaluation window is the first 100 tokens of the model's visible answer. The author speculates that Qwen may have been trained on GPT-5.5 Pro outputs or a nearby GPT variant, not on Opus.

### What is not known

- What GPT-5.5 Pro actually is; it is not a public OpenAI release.
- Architecture and training data for Qwen3.8 A95B.
- Exact prompts, prefill formatting, and evaluation code.
- The nature of the private synthetic puzzles.
- Full teacher response generation methodology.
- Statistical significance or confidence intervals for the deltas.
- Whether results replicate across seeds or sampling settings.
