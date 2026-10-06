---
title: "Dust matches backpropagation for pretraining transformers using zero-order search"
summary: "Dust perturbs activations per token to create a virtual population evaluated in one forward pass. At scale it approximates backpropagation and can outperform it, costing 1,000 to 10,000 times less than weight-space methods from 1M tokens onward."
lang: en
story: dust-matches-backpropagation-for-pretraining-transformers-us
publishedAt: 2026-10-06T13:35:03.710Z
sourceUrl: "https://qlabs.sh/research/dust"
sourceName: "Hacker News (portada)"
priority: flash
tags: [transformers, optimization, backpropagation, scaling]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Dust is the first zero-order method that competes with backpropagation for pretraining language transformers. It perturbs activations independently per token, turning every token into a member of a virtual population. One forward pass evaluates all of them in parallel. With large populations, Dust approximates backpropagation closely and sometimes outperforms it. It is orders of magnitude more efficient than weight-space methods like EGGROLL. From 1M tokens onward, Dust is $10^3$ to $10^4$ times cheaper. Larger models benefit more: a 243M model beats one 120 times smaller. Gradient estimates from Dust align better with backpropagation as the population grows, and this alignment holds up to 1B tokens.

Dust avoids materializing each population member by perturbing activations instead of weights. Gaussian noise is added to the output of every linear layer, independently per token. Each noise sample is rewarded by the change in loss on that token. The average of rewarded noises estimates the error at that layer output. The outer product of that error with the layer input gives the weight gradient. Attention internals use a variant of the same scheme. Different reward functions are assigned per layer type within a transformer block. The algorithm prevents interference between perturbed modules.

The authors do not claim Dust is compute-efficient for replacing backpropagation today. It does not train networks with external programs or transformers with many steps. The goal is to establish a credit-assignment algorithm based on search. The virtual population removes the cost of materializing and evaluating each member. Dust operates in activation space, not weight space. Searching in activations could turn training into latent reasoning search. The method is generic and does not require differentiability or first-order gradients. The philosophy reflects the bitter lesson: general methods that scale with compute win. AlphaGo Zero is cited as a scalable method that beat bootstrapping. Non-differentiability may limit Dust in low-compute regimes. Dust explores the loss landscape more flexibly than gradient-based methods. Gradient alignment suggests Dust scales favorably. Future work includes compute efficiency and new network types.

What is not known: the exact population size used, the specific model sizes trained, the dataset, training time or GPU hours, how rewards are computed per layer type, behavior on non-transformer architectures, comparisons beyond EGGROLL, impact of different noise distributions, stability across random seeds, and open-source code availability.
