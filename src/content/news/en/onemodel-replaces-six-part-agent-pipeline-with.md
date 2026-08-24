---
title: "OneModel replaces six-part agent pipeline with single forward pass in production"
summary: "ACL 2026 Industry Track paper shows a 35-author team collapsing Router, Retriever, Planner, Executor, Responder, and Reviewer into one model. Live in a global financial deployment, the system cuts latency from 18.7 to 8.0 seconds and lifts resolution rate from 64.3% to..."
lang: en
story: onemodel-replaces-six-part-agent-pipeline-with
publishedAt: 2026-08-24T09:43:09.922Z
sourceUrl: "https://arxiv.org/abs/2608.20350"
sourceName: "arXiv cs.CL"
priority: routine
tags: [acl2026, agentic, production, finance]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A paper accepted at the ACL 2026 Industry Track describes OneModel, a paradigm that folds complex business logic and standard operating procedures directly into a single model's weights. The approach replaces a six-component pipeline , Router, Retriever, Planner, Executor, Responder, and Reviewer , with one forward pass. The system is live in a global financial services deployment.

The training recipe combines Continual Pre-training (CPT) with what the authors call logic-compilation SFT. CPT injects domain knowledge into the model's parametric memory. The SFT stage then compiles fragmented business rules and SOPs into coherent reasoning traces inside a unified attention space. The goal is to turn explicit, modular orchestration into implicit, intuitive inference.

Online A/B testing reports an end-to-end latency drop from 18.7 seconds to 8.0 seconds, a reduction greater than 50 percent. The Intelligent Resolution Rate (IRR) rose from 64.3 percent to 83.3 percent. The author list spans 35 researchers led by Chang Liu.

The modular pipeline it replaces is the standard industrial pattern for agentic systems: a router classifies intent, a retriever fetches context, a planner decomposes the task, an executor calls tools, a responder drafts the answer, and a reviewer checks compliance. Each hop adds latency and a failure mode. Errors cascade; a misrouted intent or a hallucinated plan derails the whole request. OneModel collapses this chain.

The paper frames the shift as moving from "engineering prompts and pipelines" to "internalizing knowledge." In a modular stack, every SOP change touches prompt templates, retrieval indices, and routing logic. In OneModel, the knowledge lives in weights. Updating it becomes a training problem, not a configuration problem.

## What is not known

- The base model architecture, size, or family (encoder-decoder vs. decoder-only).
- CPT dataset composition: volume, sources, ratio of business to general data.
- Logic-compilation SFT mechanics: how SOPs are translated into training examples, example count, format.
- Offline evaluation benchmarks or test sets used before production deployment.
- Inference configuration: hardware, batch sizing, KV cache settings, quantization, decoding strategy.
- Precise definition of IRR and its measurement methodology in production.
- Failure analysis comparing OneModel regressions against the prior modular system.
- Training compute (GPU-hours, cost) and per-request inference cost.
- Continuous update strategy when SOPs change (re-CPT, LoRA, distillation).
- Whether code, weights, or data will be released; the "Code, Data, Media" links list platforms but confirm no release.
