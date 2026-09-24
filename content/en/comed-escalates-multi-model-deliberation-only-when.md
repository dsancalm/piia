---
title: "COMED escalates multi-model deliberation only when signals predict net gain"
summary: "Dense collaboration often corrupts correct answers. COMED uses three lightweight signals , anchor self-consistency, router margin, and a peer probe , to trigger full deliberation only when rescued errors exceed induced damage, improving MedQA by up to 10.7 points and..."
lang: en
story: comed-escalates-multi-model-deliberation-only-when
publishedAt: 2026-09-24T12:07:46.544Z
sourceUrl: "https://arxiv.org/abs/2609.26913"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [llm, deliberation, routing, efficiency]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
COMED (Controlled Model Escalation for Multi-LLM Deliberation) is a post-anchor controller that decides when a group of models should actually deliberate. Dense collaboration , where every model chats with every other model on every request , is not monotonically helpful. It can rescue failures that no single model solves alone, but it also corrupts answers that were already correct. COMED formalizes this as a rescue-harm trade-off: selective collaboration wins only when rescued errors exceed collaboration-induced damage.

The system uses three lightweight signals. Anchor self-consistency measures agreement across multiple samples from the anchor model. Router margin captures the confidence gap between the top two candidates in a routing policy. A peer probe runs a tiny, fixed-budget exchange between the anchor and one other model to estimate whether deeper deliberation will help. If the combined signal crosses a threshold, COMED escalates to full multi-model deliberation; otherwise it returns the anchor answer immediately.

Across 16 open-weight configurations, COMED improves over both fixed-anchor and routed baselines. On MedQA it gains up to 10.7 percentage points while invoking fewer models and decoding fewer tokens than dense collaboration. On HLE with frontier models, it lifts GPT-5.5 from 23.1% to 28.1%, beating dense collaboration and setting the best reported result. The work was accepted at AACL-IJCNLP 2026.

## What is not known

The paper does not disclose which specific open-weight models were used in the 16 configurations. The peer probe architecture , size, training objective, and its own latency footprint , is not detailed. Real-world overhead numbers for COMED versus pure routing (wall-clock latency, dollar cost) are absent. The exact definition and measurement of "router margin" in practice is not specified. No public code, data, or checkpoints are mentioned in the abstract. Benchmark details for the scientific and general-reasoning suites beyond MedQA and HLE are missing, as are experimental knobs such as temperature, number of self-consistency samples, and decoding parameters.
