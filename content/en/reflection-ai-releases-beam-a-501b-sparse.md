---
title: "Reflection.ai releases Beam, a 501B sparse MoE model with 23B active params"
summary: "Beam matches larger open models on coding and reasoning benchmarks while using three to four times less inference compute than GLM-5.2. The model was trained on 23.8 trillion tokens and post-trained with asynchronous policy gradients on 10,500 GB300 GPUs."
lang: en
story: reflection-ai-releases-beam-a-501b-sparse
publishedAt: 2026-10-06T13:33:01.139Z
sourceUrl: "https://reflection.ai/blog/introducing-beam"
sourceName: "Hacker News (portada)"
priority: flash
tags: [model, moe, coding, rl]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Reflection.ai has released Beam, a sparse mixture-of-experts model with 501 billion total parameters and 23 billion active per forward pass. The architecture targets coding, reasoning, and agentic workloads while keeping inference compute low enough for modest hardware. Pretraining consumed 23.8 trillion tokens from web data and licensed proprietary datasets. Post-training ran asynchronous policy gradients on 10,500 NVIDIA GB300 GPUs for four weeks, producing more than 100 million rollouts across roughly 1.3 billion sandboxes and one million high-quality coding, agentic, and STEM environments. Maximum context during RL reached 256K tokens.

Benchmarks show Beam matching or exceeding open base models of comparable scale. On software engineering tasks it scores 80.9 on SWEBench Verified, 77.2 on SWE Bench Pro v2-Hard, 80.1 on Terminal Bench v2.1, and 78.0 on SWEBench Multilingual. Reasoning results include 97.8 on AIME 2026, 90.5 on GPQA Diamond, and 49.7 on SciCode. Tool-use evaluations report 78.7 on MCP Atlas, 77.4 on BrowseComp with context management, and 80.1 on DeepSearchQA with context management. The model is competitive with GLM-5.2 and approaches Qwen-3.8-Max on coding and agentic tasks while using three to four times less inference compute than GLM-5.2; the gap widens further against 2-trillion-parameter class models.

The RL pipeline introduced operational details that matter for reproducibility. Asynchronous policy gradients tolerated weight staleness of up to one day, equivalent to 107 weight versions in flight. A controllable length penalty first shortened responses to boost early performance, then allowed length to grow again for more demanding tasks. Generalization emerged without explicit browsing tasks in the RL mixture: the model learned to query other LLMs and call OCR APIs on its own.

Weights, a technical report, model card, and developer artifacts are slated for release later this month. Early access is available via sign-up.

## What is not known

- Exact release date for weights and artifacts beyond "later this month."
- License terms; open-weight does not guarantee open-source freedoms.
- Hardware requirements for practical inference, including VRAM needs and supported quantization schemes.
- API pricing or self-hosting cost estimates.
- MoE architecture specifics: expert count, top-k routing, shared experts.
- Tokenizer and vocabulary details.
- Pretraining data composition, language distribution, and knowledge cutoff.
- RL hyperparameters such as learning rate, batch size, and the exact algorithm variant.
- Benchmark results for entries marked "NR" in the published tables.
- Safety and alignment evaluations; red-teaming is ongoing.
- Fine-tuning, LoRA, or continued pretraining support.
- Availability on Hugging Face, Ollama, vLLM, SGLang, or other serving stacks.
- Commercial use policy and restrictions.
- Measured latency and throughput numbers in production serving, not just FLOP estimates.
