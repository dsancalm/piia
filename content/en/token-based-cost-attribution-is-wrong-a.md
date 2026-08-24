---
title: "Token-based cost attribution is wrong. A new framework measures how wrong."
summary: "A new arXiv paper shows token-proportional attribution deviates from exact Shapley values by up to 0.458 L1 error in batched LLM serving. JouleShare, an offline harness plus a calibration model, cuts that error to 0.116. You can measure the distortion on your own workloads."
lang: en
story: token-based-cost-attribution-is-wrong-a
publishedAt: 2026-08-04T12:15:04.400Z
sourceUrl: "https://arxiv.org/abs/2608.00026"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [cost-allocation, llm-serving, shapley, batching]
generatedBy: deepseek/deepseek-v4-flash-0731
---
If you bill energy per request in a batched LLM serving system, your current attribution is probably wrong. A new paper from arXiv quantifies exactly how wrong: token-proportional attribution deviates from an exact Shapley value by 0.440 L1 normalized error under static batching, and 0.458 under continuous batching, averaged over 16 model/workload runs on three datacenter GPUs. That gap is not noise. It reproduces across hardware.

The paper introduces JouleShare, a framework with two parts. An offline harness establishes ground truth by replaying subsets of requests under vLLM, pulling GPU power telemetry, and computing the exact Shapley value per request. A lightweight calibration model, JCalib, learns to predict those Shapley shares from cheap request features at serving time. JCalib cuts the error to 0.116 under static batching and 0.177 under continuous batching.

The practical takeaway: token counting is a rough heuristic, not a fair cost allocation. If you run a multi-tenant inference service and charge per request, the difference matters. A request that shares a batch with a long generation is systematically undercharged by token attribution; one that runs alone is overcharged. JouleShare's offline harness gives you a way to measure that distortion on your own workloads, then calibrate a cheap online predictor.

For larger groups, the paper extends the measured reference with sampled Shapley, and the gap persists. One offline calibration remains the most accurate deployable rule.

## What is not known

The paper does not specify which LLMs or workloads fill those 16 runs, so you cannot assume the error numbers transfer exactly to your traffic mix. It also does not detail which request features JCalib consumes, nor the computational cost of the offline harness or how long exact Shapley computation takes. Absolute GPU energy consumption and units are absent from the measurements.
