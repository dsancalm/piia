---
title: "LoRA rank 4 beats higher ranks on CIFAR-10 diffusion fine-tuning"
summary: "A controlled study finds rank 4 achieves the best FID of 124.1380 on CIFAR-10 using a DDPM U-Net, outperforming ranks up to 32. Higher ranks increase parameter count and compute linearly without matching quality gains, suggesting low ranks are practical defaults for..."
lang: en
story: lora-rank-4-beats-higher-ranks-on
publishedAt: 2026-09-12T11:18:13.775Z
sourceUrl: "https://arxiv.org/abs/2609.10656"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [lora, diffusion, cifar10, fine-tuning]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A controlled study on CIFAR-10 tests LoRA rank values {2, 4, 8, 16, 32} on a DDPM U-Net backbone using a fixed optimization setup and a reproducible local-folder `pytorch-fid` protocol. The paper reports FID, trainable parameter counts, runtime, and GPU memory for each rank. Extended validation runs (20 epochs, ranks 4/8/16) and a Tiny DiT backbone (10 epochs, ranks 4/8/16) confirm the main trend.

Rank 4 achieves the best FID in the primary DDPM experiment at 124.1380. Rank 8 follows closely at 124.2136. Higher ranks show limited quality improvement despite a linear increase in adaptation cost. The results suggest that low ranks are practical defaults for diffusion fine-tuning, delivering better quality per parameter and compute unit while avoiding unnecessary over-parameterization.

The paper is accepted at CSCE 2026 and spans 13 pages with five figures and three tables.

## What is not known

Exact FID values for ranks 2, 16, and 32 in the main study. Concrete trainable parameter counts per rank. Runtime and GPU memory figures per configuration. The specific optimizer configuration (learning rate, batch size, scheduler). Exact U-Net and Tiny DiT architectures (layers, channels, attention). Random seeds and number of runs per configuration. Details of the local-folder `pytorch-fid` protocol (sample count, splits). Numerical FID results for the extended DDPM and Tiny DiT validation runs.
