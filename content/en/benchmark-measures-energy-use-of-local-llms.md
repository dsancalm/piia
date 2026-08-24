---
title: "Benchmark measures energy use of local LLMs on consumer GPUs"
summary: "A new paper measured GPU power draw for nine open-source models on an RTX 4060Ti. The 1B models use 0.56 to 0.65 J/token, while 7B-Mistral burns 4.4 times more. The paper omits key details like model names and prompt sets, limiting replication."
lang: en
story: benchmark-measures-energy-use-of-local-llms
publishedAt: 2026-08-04T11:47:51.300Z
sourceUrl: "https://arxiv.org/abs/2608.00008"
sourceName: "arXiv cs.AI"
priority: routine
tags: [llm, energy, benchmark]
generatedBy: deepseek/deepseek-v4-flash-0731
---
A new arXiv paper offers one of the first hardware-level energy benchmarks for locally deployed LLMs on consumer GPUs. The authors ran nine open-source models, from 1B to 7B parameters, on a single RTX 4060Ti 16GB, sampling GPU power draw at 2Hz via nvidia-smi across a fixed prompt set.

The headline numbers are stark. `gemma3:1b` and `llama3.2:1b` lead on efficiency, consuming 0.56 J/token and 0.65 J/token respectively, while sustaining throughput above 170 tokens per second. The 7B-Mistral model, by contrast, burns up to 4.4 times more energy per token than the most efficient model. That gap is the difference between a laptop that runs cool and one that sounds like a jet engine.

One result deserves attention: `qwen3.5:2b` shows anomalously high per-prompt energy despite its modest size. The paper attributes this to extended internal reasoning, meaning the model spends extra inference time thinking before generating output. For developers, this is a reminder that parameter count alone does not predict energy cost. A smaller model that reasons longer can outspend a larger one.

The measurement method matters here. The authors sampled power draw via `nvidia-smi`, which is the standard tool but has known limitations: it reports average power over the sampling interval, not instantaneous peaks, and it adds its own overhead when called repeatedly. A 2Hz sampling rate captures sustained behavior but can miss short spikes during prompt processing. The paper is explicit about this being a preliminary benchmark, and the code is presented as reproducible.

```bash
nvidia-smi --query-gpu=power.draw --format=csv -l 2
```

That command samples power draw every two seconds, which is the core of the methodology. If you want to replicate the benchmark on your own hardware, that is the starting point.

For anyone running local models on consumer GPUs, the practical takeaway is direct: if energy cost matters, the 1B class models are the clear choice, and the 7B-Mistral is the one to avoid. The data also suggests that quantization choices, which the paper mentions but does not fully break down, will shift these numbers further.

## What is not known

The paper does not disclose the exact list of the nine models tested, the specific prompt set used, or the total Joules per prompt for each model. Peak power draw values are absent, as is a detailed description of how energy per token and throughput were calculated from the raw power samples. Without those details, replicating the exact results on different hardware will require some guesswork.
