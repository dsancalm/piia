---
title: "New MoE fine-tuning method TEXAS boosts accuracy without freezing experts"
summary: "TEXAS weights loss on tokens from failed examples by comparing which experts fire on correct versus incorrect outputs. It beats baselines in 17 of 18 configurations across three MoE models and six benchmarks, gaining 1.3 to 1.5 points on average."
lang: en
story: new-moe-fine-tuning-method-texas-boosts
publishedAt: 2026-08-10T08:19:12.989Z
sourceUrl: "https://arxiv.org/abs/2608.06396"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [fine-tuning, mixture-of-experts, loss-weighting, arxiv]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Fine-tuning a mixture-of-experts model for a downstream task usually means either fine-tuning everything, which is expensive, or freezing most of the model and hoping the router sends the right tokens to the right experts. A new paper from arXiv proposes TEXAS, a supervision strategy that watches which experts actually fire on examples the base model gets right, then uses that signal to weight tokens on examples it gets wrong.

The core idea is to compare expert activations between successful and failed instances. For each task, TEXAS identifies experts that are more active when the base model produces a correct answer. During fine-tuning, when the model processes a token from a failed instance, TEXAS increases its loss weight if that token activates one of those task-relevant experts. The method does not freeze a fixed subset of experts and does not force a target routing distribution. It works with the existing routing behavior, just amplifies the gradient signal on the tokens that matter.

The reported results are strong: across three MoE models and six benchmarks, TEXAS achieves the best or tied-best performance in 17 of 18 configurations, improving over the strongest baseline by 1.3 to 1.5 points on average.

The practical appeal is that TEXAS is a training-time change, not an architecture change. If you already have a fine-tuning pipeline for an MoE model, this is a loss-weighting scheme, not a new model. That makes it cheap to test on your own setup: take a handful of examples, compare expert activations between correct and incorrect outputs, and adjust the loss weights accordingly.

What the paper does not say, based on the abstract and available details:

- Which three MoE models were used.
- Which six benchmarks were used.
- What the strongest baseline was.
- What hyperparameters were used for fine-tuning.
- What exact metrics are reported (accuracy, F1, etc.).
- Whether TEXAS requires any change to the model architecture or only to the training loop.
- What the computational overhead is compared to baseline fine-tuning.

If you want to replicate or adapt this, you will need the full paper for the experimental setup. The method itself is described clearly enough to implement, but the missing numbers matter for judging whether the 1.3 to 1.5 point gain would transfer to your task.
