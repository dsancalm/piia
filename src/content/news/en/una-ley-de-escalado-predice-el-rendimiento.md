---
title: "A scaling law predicts a VLM's performance from its base LLM"
summary: "A team trained more than 150 VLMs on 34 LLMs and found the backbone's text capability predicts multimodal accuracy. Base models beat instruction-tuned ones, and some text benchmarks correlate negatively because of benchmark-gaming."
lang: en
story: una-ley-de-escalado-predice-el-rendimiento
publishedAt: 2026-08-04T11:45:51.182Z
sourceUrl: "https://arxiv.org/abs/2608.00013"
sourceName: "arXiv cs.CL"
priority: routine
tags: [vlm, scaling-law, llm, multimodal]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Picking the backbone for a VLM used to be a bet. A team would train dozens of variants, measure them on multimodal benchmarks and keep the best one. A recent arXiv paper proposes making that choice with a scaling law that predicts multimodal performance from observable text metrics of the base LLM.

The authors trained more than 150 VLMs on 34 LLMs from 7 model families, using a strictly controlled recipe. They evaluated on more than 200 text benchmarks and 50 multimodal ones. With that data they built the Capability-Driven Multimodal Scaling Law, the first framework that predicts VLM benchmark accuracy from text capability across model families. The law extrapolates the transfer rate from models of up to 8B parameters to backbones at the 72B scale.

One practical result: base LLMs beat their instruction-tuned counterparts as VLM backbones. The reason is twofold: higher absorption rates and lower data-scaling decay. Instruction fine-tuning optimizes the model for chat tasks, but costs it capacity to absorb new visual information.

Another, less expected finding: certain text benchmarks correlate negatively with multimodal performance. The paper puts this down to benchmark-gaming behavior. An LLM that scores high on a particular text benchmark may be exploiting dataset artifacts, and that skill does not transfer to the visual domain.

Code and data are available at the URL given in the paper. That lets anyone reproduce the scaling laws and apply them to their own case.

## What is not known

The paper does not specify which text benchmarks correlate negatively with multimodal performance. Nor does it detail which model families were used or which were held out. It gives no total compute cost for training the 150 VLMs, and does not publish the exact formula of the scaling law with the transfer and absorption rate values. Without those numbers, applying the law to a new backbone means re-estimating the parameters with your own data.
