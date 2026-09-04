---
title: "IFM releases K2 Horizon fleet of six open models up to 375B parameters"
summary: "The family spans 0.9B to 375B total parameters with two sparse architectures, including a 375B mixture-of-experts model activating 23B per token and a 36B model using a new Mixture-of-Value-Attention mechanism."
lang: en
story: ifm-releases-k2-horizon-fleet-of-six
publishedAt: 2026-09-04T11:52:12.475Z
sourceUrl: "https://ifm.ai/blog/k2/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [models, open-source, mixture-of-experts, edge]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
IFM has released K2 Horizon, a connected fleet of six open models ranging from 0.9B to 375B total parameters. The lineup includes two sparse architectures: a 375B-A23B mixture-of-experts model that activates roughly 23B parameters per token, and a 36B-A4B model that introduces Mixture-of-Value-Attention (MoVA), a sparse attention mechanism activating about 4B parameters per token. The remaining models (32B dense, 7B, 3.7B, and 0.9B) set new state-of-the-art results at their respective scales, with the 0.9B model scoring above 48 on AIME 2026. All six share a common base architecture, vocabulary (except the 0.9B variant, which uses a reduced vocabulary), training methodology, interfaces, evaluation suite, and deployment tooling. Code and weights ship under Apache 2.0; datasets remain under their original licenses such as ODC-BY, with construction recipes published when redistribution is not permitted.

The release covers the full lifecycle: data recipes, training code, configurations, intermediate checkpoints, fine-grained logs, evaluation results, and final weights. Quantization is supported across the fleet. The models are designed to run from edge devices (the 0.9B model targets watches and glasses) to enterprise infrastructure (the 375B-A23B MoE). This is the first open family to expose the complete agentic post-training process with checkpoints, data recipes, code, configs, and logs at every stage.

```bash
harbor analyze
reward_hacking
```

The `harbor analyze` and `reward_hacking` commands appear in the release tooling, suggesting built-in support for reward-model diagnostics and hacking detection during the agentic post-training loop.

What is not known: exact scores on SWE-bench, BrowseComp, SWE-Atlas-QnA, WildClawBench, Apex-Agents, GDPVal-AA, and TerminalBench for each model; full architectural details of MoVA beyond the sparse-attention-plus-MoE-feed-forward description; precise pretraining and post-training data mixtures; hardware and compute cost (FLOPs, GPU-hours, energy); concrete data-construction recipes for non-redistributable datasets; specific quantization configurations (bit widths, formats, calibration methods); the exact deployment tooling included (formats, runtimes, orchestration); how dynamic routing distributes workloads across the fleet sizes; actual availability of intermediate checkpoints and logs on Hugging Face, GitHub, or other repositories; and numerical comparisons against closed reference models such as GPT-5 or Claude.
