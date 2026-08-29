---
title: "Z.ai releases GLM-5.3 open-weight MoE model with 32B active parameters"
summary: "The Chinese lab Z.ai published GLM-5.3 on Hugging Face under the zai-org namespace, claiming coding and math performance above GPT-4o and DeepSeek-V3. The mixture-of-experts model exposes 32 billion active parameters for local deployment, but the repository still lacks a..."
lang: en
story: z-ai-releases-glm-5-3-open
publishedAt: 2026-08-29T12:47:04.189Z
sourceUrl: "https://huggingface.co/zai-org/GLM-5.3"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ai, llm, moe, openweights]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Z.ai has released GLM-5.3 as an open-weight model on Hugging Face under the zai-org organization. The announcement reached the front page of Hacker News, gathering 721 points and 241 comments. The repository is live at huggingface.co/zai-org/GLM-5.3, and the company also published a launch post on its blog.

The model uses a mixture-of-experts architecture with 32 billion active parameters. Z.ai reports benchmark scores that exceed GPT-4o and DeepSeek-V3 on coding and math evaluations, though the specific benchmark names and raw numbers have not been published in the model card or blog post yet. The weights are available for download, quantization, and local deployment, giving developers a path to run a competitive MoE model without an API dependency.

## Licensing and deployment unknowns

The model card on Hugging Face does not currently specify a license. Without an explicit SPDX identifier or license file in the repository, it is unclear whether commercial use, redistribution, or fine-tuning are permitted. The blog post and X announcement also omit licensing details. Until Z.ai adds a LICENSE file or updates the model card metadata, treat the weights as source-available rather than open source.

No hardware requirements have been documented. A 32B active MoE typically demands 60, 80 GB of VRAM in bfloat16 for full-precision inference, but supported quantization formats (GGUF, AWQ, GPTQ, FP8) and minimum VRAM targets for quantized variants have not been published. Context length, attention implementation, and tokenizer details are also absent from the current release artifacts.

## What is not known

- Exact total parameter count and expert configuration
- License terms for commercial and derivative use
- Full benchmark suite results with reproducible methodology
- Supported quantization formats and VRAM requirements per format
- Whether a base checkpoint and a separate chat/instruct checkpoint exist
- Training data composition, token count, and knowledge cutoff
- Context window size and rope scaling details
