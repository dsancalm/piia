---
title: "Qwen releases 125B MoE preview model that runs on workstation hardware"
summary: "Qwen3.8-Flash-Next activates only 6B of its 125B parameters per pass, letting it run on a single DGX Spark. Simon Willison prefers the 78.9 GB UD-Q2_K_XL quantization with high reasoning effort, though benchmarks, license, and full specs remain undisclosed."
lang: en
story: qwen-releases-125b-moe-preview-model-that
publishedAt: 2026-08-27T17:46:02.133Z
sourceUrl: "https://simonwillison.net/2026/Aug/26/qwen38-flash-next/"
sourceName: "Simon Willison"
priority: flash
tags: [qwen, moe, llm, quantization]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Qwen3.8-Flash-Next is an open-weights multimodal Mixture of Experts (MoE) model from Qwen. It has 125 billion total parameters but activates only 6 billion per forward pass. The model is an early preview of the architecture that will power Qwen4. Simon Willison tested it on a DGX Spark using quantized versions produced by Unsloth. He evaluated two variants: UD-IQ1_S at 72.5 GB and UD-Q2_K_XL at 78.9 GB. His current favorite is UD-Q2_K_XL running with "xhigh reasoning effort" enabled.

The MoE design decouples capacity from compute cost. You get the representational power of a 125B model while paying for only 6B active parameters. That makes it feasible to run on workstation-class hardware instead of requiring a datacenter GPU farm. The Unsloth quantizations push it further: the UD-IQ1_S variant fits in 72.5 GB, which is manageable on a single high-memory system. The UD-Q2_K_XL variant uses a slightly milder quantization scheme at 78.9 GB, and Willison reports better output quality from it, especially when reasoning effort is set to xhigh.

The exact performance against standard benchmarks such as MMLU or GPQA is unknown. No comparative numbers have been published. The license is also unclear; it could fall under Apache 2.0, the Qwen License, or something else. The knowledge cutoff date, context length, and the full list of supported modalities (image, audio, video) have not been disclosed. Minimum hardware requirements beyond the DGX Spark are not specified. It is also unknown whether the weights are available on Hugging Face or ModelScope, and what the "xhigh reasoning effort" flag translates to in terms of inference parameters like temperature, max tokens, or thinking budget.

For developers who want to experiment with efficient MoE architectures or test Qwen4-class reasoning on consumer-grade hardware, this model is currently the most accessible entry point.
