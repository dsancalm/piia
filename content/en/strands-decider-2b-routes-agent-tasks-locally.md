---
title: "Strands Decider 2B routes agent tasks locally without an LLM"
summary: "The 2B-parameter open model picks from supplied choices and returns a calibrated confidence score, ranking third in its class on JevBench while running in ~115 ms on an RTX 3090."
lang: en
story: strands-decider-2b-routes-agent-tasks-locally
publishedAt: 2026-10-07T13:47:43.515Z
sourceUrl: "https://strandsagents.com/blog/introducing-strands-decider/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [open-source, agents, routing, qwen]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Strands Decider 2B is a 2-billion-parameter open-source decision model that routes tasks inside agent workflows without calling a large language model. It builds on the Qwen3.5-2B trunk. The authors removed the language-model head and attached a pointer head of roughly one million parameters, trained with a rank-16 LoRA adapter. The model selects from a supplied list of choices and returns a calibrated confidence score instead of generating free-form text.

On JevBench, a benchmark for decision accuracy and calibration, the model ranks third out of 33 in the 2B class and first out of 30 when slightly larger models are excluded. Latency averages 115 milliseconds on a local Nvidia RTX 3090 and 153 milliseconds on a MacBook M3 for small tasks, scaling roughly linearly with token count. The project claims suitability for local CPU or GPU inference, though CPU numbers are not published.

Installation is a single command:

```bash
pip install strands-decider
```

Usage via the CLI passes a state description and a comma-separated list of choices:

```bash
strands-decider ask StrandsAgents/strands-decider-2B-hobson-v19 \
  --state "Help! My payouts have been failing for 3 days! " \
  --choice "Which team should handle this?=billing,sales,retail"
```

The repository includes integration examples with Strands Agents. The decision model validates tool calls before execution, checking argument grounding and premature invocation. Weights, training data, and scripts are released on Hugging Face under the `strands-decider-2b` name (version v19/hobson-v19).

## What is not known

The exact license for the model weights and training data is not stated. Minimum RAM or CPU requirements for CPU-only inference are not provided. Details on the training dataset size, composition, and languages are absent beyond a general reference to "all the training data and scripts." The knowledge cutoff of the base Qwen3.5-2B model is not mentioned. There is no public roadmap indicating whether larger variants, such as 7B, are planned.
