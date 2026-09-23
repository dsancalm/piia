---
title: "Rust training run logs silent framework bugs in Bangla model"
summary: "A 0.4B-parameter Bangla model trained in Rust on rented H100s exposed eight silent defects across the Candle and Burn frameworks that standard loss curves missed."
lang: en
story: rust-training-run-logs-silent-framework-bugs
publishedAt: 2026-09-23T12:00:33.416Z
sourceUrl: "https://arxiv.org/abs/2609.25008"
sourceName: "arXiv cs.CL"
priority: flash
tags: [rust, ml, training, bugs]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Arif Adito spent $164 on rented H100 time and 54.6 hours training a 0.4B-parameter Bangla-first language model entirely in Rust. No PyTorch, no Python in the training path. The run processed roughly 2 billion tokens and produced a per-token negative log-likelihood of 0.93 on Bangla versus 12.60 for a randomly initialized twin, confirming the model learned. On English commonsense multiple-choice it scored at chance, which is expected for a deliberately small, Bangla-weighted budget.

The paper's value is the measured failure taxonomy it documents across the two Rust ML frameworks the author tried: Candle and Burn. Five defects in Candle and three in Burn passed ordinary loss-curve inspection and announced themselves in no other way. Candle's fused kernels silently produced no gradient. Burn's backward pass ran at roughly 3% of theoretical GPU throughput, and a kernel-fusion path segfaulted mid-training at multi-billion-parameter scale.

The verification discipline that caught six of these silent failures is a gradient-flow arbiter: a test that runs one forward/backward pass and asserts every trainable parameter receives a finite, nonzero gradient. This test is framework-agnostic and cheap to run. The author argues it should be a mandatory gate in any training pipeline.

A tokenizer-fertility trap in Bengali script nearly inverted the corpus language balance. Naive byte-level tokenization collapsed Bangla to roughly 1.4 characters per token against English's 3.9. Fixing the tokenizer reached roughly 4.1 characters per token for Bangla, restoring the intended weighting.

After this run the author moved training to PyTorch and kept Rust for on-device serving. The conclusion is direct: Rust is not yet a competitive place to train a language model, though it may be a good place to serve one.

## What is not known

The paper does not specify the exact model architecture, hyperparameters such as learning rate or batch size, the precise H100 configuration, or the composition of the 2-billion-token dataset beyond its Bangla weighting. The specific versions of Candle and Burn used are not mentioned. The gradient-flow arbiter is described functionally but not in full technical detail. No broader ecosystem implications or direct performance comparisons to PyTorch are provided beyond the author's decision to switch.
