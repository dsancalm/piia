---
title: "Simon Willison releases ttok 1.0 with new default tokenizer"
summary: "The update switches the default from GPT-4 to the GPT-5/GPT-6 family based on an experiment showing identical token counts across seven models. OpenAI has not confirmed the alignment, so the change is an inference."
lang: en
story: simon-willison-releases-ttok-1-0-with
publishedAt: 2026-10-09T13:42:10.756Z
sourceUrl: "https://simonwillison.net/2026/Oct/9/ttok/"
sourceName: "Simon Willison"
priority: routine
tags: [tokenizer, cli, openai]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison released ttok 1.0 on October 9, 2026. The tool counts and truncates text by tokens. This version switches the default tokenizer from GPT-4 to the GPT-5/GPT-6 family. If you use it to estimate API costs or trim context before a call, the new default matches the models you are likely targeting today.

The change rests on an experiment by William Liu, documented in a commit. Liu tested seven models across the GPT-5 and GPT-6 families: 5.5, 5.6 Sol/Terra/Luna, and 6 Astra/Sol/Luna. All seven reported an identical 44,794 tokens across 31 test fixtures. On that corpus, GPT-6 introduces no difference in input token counting compared to GPT-5.

OpenAI has not officially confirmed that GPT-6 shares the GPT-5 tokenizer. An open issue, described by Willison as an "angry issue," discusses that missing confirmation. The experiment suggests parity, but the absence of a public statement means the default in ttok 1.0 is an inference, not a guarantee.

To upgrade, run:

```bash
uv tool upgrade ttok
```

What is not known: whether OpenAI will formally confirm the tokenizer alignment, the exact commit hash or repository for Liu's experiment, what the internal codenames (Sol, Terra, Luna, Astra) map to in public model names, the precise tokenizer used in ttok 0.4, the release date of that prior version, or the composition of the 31 test fixtures.
