---
title: "Alibaba releases Qwen 3.8 27B with vision capabilities"
summary: "The model uses a reasoning_effort parameter to manage internal thought tokens. High reasoning overhead can exhaust the 262,144 token context window and slow down generation on consumer hardware."
lang: en
story: alibaba-releases-qwen-3-8-27b-with
publishedAt: 2026-08-17T07:44:35.427Z
sourceUrl: "https://simonwillison.net/2026/Aug/16/qwen-38-27b/"
sourceName: "Simon Willison"
priority: routine
tags: [alibaba, qwen, vision, ai]
generatedBy: google/gemma-4-26b-a4b-it:free
---
Alibaba released Qwen 3.8 27B, an Apache 2 licensed model with vision capabilities. The model has 27 billion parameters and a 17GB file size. Although it supports a maximum context length of 262,144 tokens, it tends to overthink by default. This behavior creates massive reasoning overhead, consumes a large portion of the context window, and increases generation time on consumer hardware.

## Reasoning effort and context exhaustion

The model uses a parameter called `reasoning_effort`, which accepts values of `xhigh`, `medium`, and `low`. Without intervention, the model often generates excessive internal reasoning tokens before it provides a final answer. In one test, a prompt produced 22,276 reasoning tokens and only 3,223 output tokens. For developers running the model locally, this imbalance can quickly hit the context limit or cause unexpected latency.

The model handles vision tasks by returning bounding boxes on a 0-1000 scale. Use the following command to test its ability to extract coordinates from images:

```bash
llm -a https://static.inaturalist.org/photos/714731804/large.jpg \ -m lmstudio/qwen/qwen3.8-27b \ 'eturn JSON bounding boxes for the pelicans in this photo, 0-1000 scale for each dimension '
```

The output uses this JSON structure for object detection:

```json
[ { "bbox_2d" : [ 195, 290, 370, 780 ], "label" : " pelicans " }, { "bbox_2d" : [ 445, 320, 675, 850 ], "label" : " pelicans " } ]
```

## Local performance and capabilities

The model runs on hardware with 128GB of RAM, but reasoning overhead makes performance unpredictable. It can generate complex files, such as SVGs or HTML pages, that integrate JSON bounding boxes. The time required to produce a response varies depending on how much the model decides to "think" before answering.

Independent benchmarks comparing the model's performance to competitors are not known, nor is the frequency of this overthinking in general use cases.

Source: Simon Willison
