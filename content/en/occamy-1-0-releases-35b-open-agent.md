---
title: "Occamy-1.0 releases 35B open agent model with limited evaluation details"
summary: "The Occamy-1.0 model targets multi-step agent workflows and offers open weights derived from a Qwen3.6-35B-A3B checkpoint. The paper omits benchmark names, pricing formulas, dataset composition, training phases, hardware requirements, license terms, and head-to-head..."
lang: en
story: occamy-1-0-releases-35b-open-agent
publishedAt: 2026-09-14T13:16:34.443Z
sourceUrl: "https://arxiv.org/abs/2609.11977"
sourceName: "arXiv cs.AI"
priority: flash
tags: [models, agents, open-weights, evaluation]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A new 35B parameter model called Occamy-1.0 targets co-work agents: long-horizon workflows that mix information retrieval, tool use, coding, and file manipulation. The weights and a subset of the training data are released for research, giving teams an open alternative to closed APIs for multi-step pipelines that run on their own infrastructure.

The model starts from a post-trained checkpoint labeled Qwen3.6-35B-A3B. The authors apply a staged post-training recipe on what they call "execution-grounded" data. They capture replayable, long-horizon trajectories across multiple harnesses, then train through successive phases. The paper does not disclose the exact composition of that data, the harnesses used, the phase objectives, or the compute budget.

Under the paper's stated evaluation protocol and pricing assumptions, the aggregate score across four representative benchmarks places Occamy-1.0 at the low-cost knee of the observed cost-performance Pareto frontier. The four benchmarks are not named, nor are the individual metrics, the pricing formula, or the hardware assumptions behind it. The authors report that the model consistently ranks among the strongest of comparable size and competes with substantially larger frontier systems on several tasks, but they do not identify those systems or publish the head-to-head numbers.

Evaluations on function calling, coding, and instruction following indicate the specialization preserves broad agent capability. Concrete scores against baselines are absent. Hardware requirements for practical inference , VRAM, supported quantization formats, throughput , are not specified. The release location (Hugging Face, GitHub, or elsewhere) and the license terms are also not stated in the abstract.

What is not known
- The four benchmarks and their individual metrics.
- The pricing protocol: token costs, infrastructure assumptions, hardware baseline.
- The exact architecture behind "Qwen3.6-35B-A3B" (MoE variant, base checkpoint).
- Composition, size, and sources of the execution-grounded dataset.
- Harnesses used for long-horizon trajectory collection.
- Staged post-training phases, objectives, and compute.
- Numeric results on tool calling, coding, and instruction following versus baselines.
- Release platform and license for weights and data.
- Inference hardware requirements and supported quantization.
- Named frontier systems and head-to-head numbers.
