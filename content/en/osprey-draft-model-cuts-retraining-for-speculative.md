---
title: "Osprey draft model cuts retraining for speculative decoding across LLMs"
summary: "A single pre-trained draft backbone adapts to new targets with lightweight alignment instead of full retraining, lifting mean acceptance length 16, 23% on Qwen3-8B, Llama-3.3-70B, and MiniMax-M2.5."
lang: en
story: osprey-draft-model-cuts-retraining-for-speculative
publishedAt: 2026-09-10T11:38:31.686Z
sourceUrl: "https://arxiv.org/abs/2609.09338"
sourceName: "arXiv cs.CL"
priority: routine
tags: [speculative-decoding, draft-model, llm, emnlp2026]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Speculative decoding speeds up large language models by having a small draft model propose tokens that the target model verifies in parallel. The draft's acceptance rate determines the speedup. Today's drafts are trained against a single target distribution, so their acceptance rate collapses when the workload shifts to a new domain, language, or target model. Osprey, a paper accepted at EMNLP 2026, introduces a target-agnostic pre-training recipe that produces one reusable draft backbone. You adapt it to any target with a lightweight alignment step instead of retraining from scratch.

The method starts from an off-the-shelf small language model. Two problems appear: the small LM is deeper than a latency-bound draft can afford, and its pre-trained computation must stay intact while the draft learns to ingest the target's hidden states and emit tokens in the target's vocabulary. Osprey solves both by pruning the small LM to a shallow backbone, restoring its language modeling ability with target-agnostic next-token pre-training, then adapting per target through vocabulary alignment, zero-initialized QKV expansion, and distillation of the target's output distribution.

A single pre-trained Osprey backbone transfers across targets. The paper reports mean acceptance length improvements of 16.1% for Qwen3-8B, 21.2% for Llama-3.3-70B-Instruct, and 22.7% for MiniMax-M2.5 (229B), with the latter also gaining 17.5% more tokens per second. Gains are largest on out-of-domain and multilingual data, confirming the robustness claim. The submission date is 8 Sep 2026 (arXiv:2609.09338v1), 21 pages, 4 figures, 10 authors. Code is linked from the paper page.

## What is not known

The paper does not disclose the exact backbone architecture after pruning (layer count, hidden size, total parameters), the identity or size of the starting small LM, or the dataset, compute, steps, and learning rate for the target-agnostic next-token pre-training. Adaptation details are also missing: how vocabulary alignment maps tokens, the dimensions of the zero-initialized QKV expansion, and the distillation loss, temperature, steps, and data. Latency of the Osprey draft in ms/token and the hardware used for the tokens-per-second measurement are not reported. The paper cites mean acceptance length but not acceptance rate or end-to-end wall-clock speedup per target. No standard benchmark scores (MT-Bench, AlpacaEval, MMLU) are provided for generation quality. It is unclear whether the released code includes pre-trained backbone checkpoints and adaptation scripts. Comparisons with strong baselines such as Medusa, Eagle, Lookahead, and SpecInfer on the same targets and hardware are absent, as are ablations isolating the contribution of pruning, next-token pre-training, QKV zero-init, vocabulary alignment, and distillation.
