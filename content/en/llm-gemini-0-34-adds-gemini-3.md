---
title: "llm-gemini 0.34 adds Gemini 3.8 Flash with thinking tiers"
summary: "The plugin now supports gemini-3.8-flash and exposes low, medium, and high reasoning levels. A separate fix from Charlie Tonneslan ensures async completions log the exact model string used."
lang: en
story: llm-gemini-0-34-adds-gemini-3
publishedAt: 2026-09-03T11:53:57.737Z
sourceUrl: "https://simonwillison.net/2026/Sep/2/llm-gemini/"
sourceName: "Simon Willison"
priority: urgent
tags: [llm, gemini, cli, plugin]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
llm-gemini 0.34 adds native support for Gemini 3.8 Flash with thinking levels in Simon Willison's LLM CLI. You can now test the new model without writing boilerplate.

The plugin now recognizes `gemini-3.8-flash` as a valid model identifier and exposes three reasoning tiers: low, medium, and high. These map directly to Google's internal configuration for the Flash variant, letting you trade off depth against latency from the command line. The change is a single-line addition to the model registry, but it unlocks access to a model that is fast, cheap, and capable of generating working HTML and JavaScript on demand.

A separate fix addresses issue #146, where asynchronous responses failed to record the resolved model version. Charlie Tonneslan contributed the patch, which ensures every async completion logs the exact model string used. This matters if you run batch jobs and need to trace which model produced each output.

Simon Willison tested the model by asking it to "make me a cool thing in html". The result took 13 seconds to generate and cost 1.8 cents. He then used the model through his `llm-coding-agent` plugin to add HTML rendering to `markdown-svg-renderer`, wrapping output in a sandboxed iframe. The integration is live and functional.

Google has also released a "Cyber" variant of Gemini 3.8 Flash, restricted to trusted defenders. No general availability date is public. Performance differences between the three thinking levels are documented only through visual examples, such as pelican illustrations at varying levels of detail. Concrete benchmarks are not available.

The full changelog for version 0.34 is not published beyond the two fixes mentioned. Implementation details of the `llm-coding-agent` integration are not disclosed.
