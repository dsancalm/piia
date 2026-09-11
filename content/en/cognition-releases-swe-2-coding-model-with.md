---
title: "Cognition releases SWE-2 coding model with 50% on FrontierCode at 64% lower cost"
summary: "Post-trained from Kimi K3, SWE-2 matches GPT-5.6 Sol and Fable 5.1 on FrontierCode 1.1 Main while costing roughly one quarter of GPT-6 Astra. A single RL run with linear cost penalties trains all reasoning levels at once, adding 5-6 points over the base model."
lang: en
story: cognition-releases-swe-2-coding-model-with
publishedAt: 2026-09-11T11:43:05.050Z
sourceUrl: "https://cognition.com/blog/swe-2"
sourceName: "Hacker News (portada)"
priority: flash
tags: [coding, rl, benchmark, cost]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cognition has released SWE-2, a coding model post-trained from the 2.8 trillion parameter Kimi K3 base. The headline result is 50.0% on FrontierCode 1.1 Main, placing it one point behind Fable 5.1 at 50.9% while being 64% cheaper. It matches GPT-5.6 Sol and Fable 5.1 on that benchmark at a fraction of their price and sits only a few points below GPT-6 Astra at roughly one quarter the cost. On DeepSWE 1.1, SWE-2 scores 73.0%, ahead of GPT-6 Astra at 74.1% and well above Kimi K3 at 68.5%.

The architectural lever is a single reinforcement learning run that trains all reasoning effort levels, medium, high, and max, simultaneously. The method applies a linear cost penalty per effort level (λₑ) tuned to the local slope of the base model's Pareto frontier. This replaces the previous approach of training separate specialist models or distilling from multiple teachers. The RL adds 5-6 points over the Kimi K3 baseline across many benchmarks and shifts the entire cost-performance frontier.

Behaviorally, SWE-2 medium averages 53 steps on FrontierCode 1.1 Main versus 127 for SWE-1.7, a 58% reduction. It makes its first real edit at a median of 18 steps compared to 48 for the predecessor. Average cost drops 81%. The model shows improved test coverage, constraint adherence, and verification discipline, re-deriving conclusions, checking hypotheses, and running artifacts. Higher effort levels plan and explore more on complex tasks rather than simply running longer.

Terminal-Bench results reveal a sharp capability cliff. SWE-2 scores 92.8% on Terminal-Bench 2.1, competitive with Fable 5.1 at 91.4% and GPT-6 Astra at 89.9%. On Terminal-Bench 4, however, it scores only 27.3% against Fable 5.1 at 55.8% and GPT-6 Astra at 57.9%. Kimi K3 sits at 21.5% on the same split. The gap suggests the RL procedure has not yet closed the distance on the hardest long-horizon tasks.

Training infrastructure changes include tripling RL environments, adding instruction-following overlays, and building a flywheel where previous SWE-2 checkpoints harden verifiers iteratively. They adopted NVFP4/FP8 kernels with quantization-aware training, reducing memory and achieving lower train-inference mismatch than SWE-1.7 at similar throughput despite the 3x parameter increase in the base model. An online draft model improves decoding throughput.

SWE-2 is available today in Devin Desktop and CLI, with a rollout underway for Devin Web and Fusion.

## What we don't know

Absolute pricing per token or per task for SWE-2, Fable 5.1, or GPT-6 Astra, only relative ratios are public. The exact composition of FrontierCode 1.1 Main, DeepSWE 1.1, and Terminal-Bench 2.1/4 (task design, metrics, cost accounting) is not disclosed. Whether GPT-5.6 Sol and GPT-6 Astra are shipping models or internal projections is unclear. The precise definition of "cost" in the reward function R = S - λₑC (inference dollars, rollout time, weights) and the numeric λₑ values per effort level are absent. Details of the length-weighted reward baseline proof, the online draft model architecture, NVFP4/FP8 kernel specifics, instruction-following overlays, and the verifier flywheel mechanism are not provided. General availability dates for Devin Web and Fusion are unspecified. Results on SWE-bench, HumanEval, and other standard benchmarks are missing. Production latency and throughput comparisons versus SWE-1.7 are not given. Whether SWE-2 will be offered via a standalone API or only inside Devin products remains unannounced.
