---
title: "Meta releases Muse Glimmer, a 30B Apache 2.0 model for agentic tasks"
summary: "The multimodal model runs locally on 32 GB of RAM, and Simon Willison tested it in LM Studio, using it to answer code questions and describe photos. Exact benchmark scores and training details are not disclosed."
lang: en
story: meta-releases-muse-glimmer-a-30b-apache
publishedAt: 2026-08-11T07:47:08.964Z
sourceUrl: "https://simonwillison.net/2026/Aug/10/introducing-muse-glimmer/#atom-everything"
sourceName: "Simon Willison"
priority: flash
tags: [meta, model, agentic, local]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Meta released Muse Glimmer, a 30B parameter model under the Apache 2.0 license. It is built for agentic tasks: end-to-end task completion, long-horizon reasoning, and broad function calling with precise schemas. The model also handles vision. Simon Willison ran it locally in LM Studio, where the version he used came in at 18.16 GB, and got it working with his `llm-coding-agent` plugin against a fresh Datasette checkout using the prompt `how does auth work?`.

The model is multimodal. Willison asked it to describe a photo of pelicans and received a detailed response. He also generated an image of a pelican with the same checkpoint. For local use, the recommendation is 32 GB of RAM or more. Willison's machine has 128 GB.

The command he used to test the vision side:

```
llm -m lmstudio/meta/muse-glimmer -a https://static.inaturalist.org/photos/714731804/large.jpg 'describe image'
```

He applied a patch to `llm-lmstudio` for compatibility with LLM 0.32 before running it. The model's strong benchmark results include DeepSearch QA, MCP-Atlas, τ-Bench, and SWE-Bench, though the source does not give exact scores.

## What matters for local development

A 30B Apache 2.0 model with agentic and vision capabilities changes what you can run on your own hardware. No API calls, no data leaving the machine. The function calling support is broad, and the model keeps coherent plans across long workflows, which is what you need for coding agents that chain multiple tool calls. The 32 GB RAM threshold is the practical constraint: if your machine meets it, you can test agentic pipelines locally before deciding whether to scale up.

## What is not known

The exact release date is not specified beyond August 10, 2026. Benchmark performance is described as strong but no numbers are given. Training cost and data are undisclosed. The model is confirmed on LM Studio and `llm-lmstudio`, but other platforms are not mentioned. The license is Apache 2.0, but the source does not clarify whether that covers the weights specifically.
