---
title: "Chain-of-thought prompting helps or hurts depending on task depth and model size"
summary: "An empirical study of Qwen-2.5 and Llama-3.1 models on five benchmarks finds CoT boosts accuracy by up to 68 points on deep serial tasks like GSM8K, does nothing on shallow ones, and can drop accuracy by 28.7 points on intermediate tasks with smaller models."
lang: en
story: chain-of-thought-prompting-helps-or-hurts
publishedAt: 2026-08-12T08:09:39.960Z
sourceUrl: "https://arxiv.org/abs/2608.09942"
sourceName: "arXiv cs.CL"
priority: routine
tags: [chain-of-thought, reasoning, llm, benchmark]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Chain-of-thought prompting does not universally improve LLM reasoning. A new empirical study from arXiv (cs.CL) shows that CoT acts as a bandwidth bypass: it helps on tasks that require deep serial computation, does nothing on shallow ones, and can actively hurt on intermediate tasks depending on model size.

The researchers frame their analysis using the serial-depth bottleneck concept H_dp (Chen et al., 2024). They tested Qwen-2.5-7B/32B and Llama-3.1-8B on five benchmarks: GSM8K, MATH, MMLU, ARC, and HumanEval. The results split cleanly by task depth.

On P-complete tasks with high serial depth (GSM8K, MATH), CoT delivers a recovery gap of +54 to +68 percentage points across all models. Accuracy without CoT degrades monotonically as per-item serial depth increases. With CoT, accuracy is roughly invariant to depth. This is the regime where CoT earns its keep.

On shallow TC^0 tasks (MMLU, ARC), CoT is structurally redundant. The delta ranges from 0.0 to +4.6 percentage points. No significant negative effect, but no reason to spend the tokens either. ARC's maximum accuracy without CoT hits 95%, so there is little headroom to gain.

The intermediate class L (HumanEval) is where the picture gets interesting. CoT's effect depends on model size: +23.2 pp on the 32B model, +9.1 pp on the 8B model, and -28.7 pp on the 7B model. The same technique that rescues a 32B model tanks a 7B one.

The correlation between task depth and CoT recovery is Spearman rho = 0.661 (p = 0.007, n = 15). Nine of 15 benchmark-level McNemar tests remain significant after Bonferroni correction. The study was pre-registered on OSF, which is rare for this kind of work.

What this means for you: before you slap CoT onto every prompt in your pipeline, measure the serial depth of the task. If the task is shallow and your model already performs well, CoT is wasted tokens. If the task is deep, CoT is essential. If the task sits in the middle, test it with your specific model size, because the direction of the effect is not predictable from first principles.

The study does not detail the exact context sizes used in the experiments. It does not specify which version of Llama-3.1-8B was used (base, instruct, or other). It does not say whether the results reproduce on models outside the three tested. It mentions ARC contamination could be high but does not quantify it.
