---
title: "Removal-based method improves LLM explanation faithfulness without retraining"
summary: "Researchers filter inputs by stripping concepts the model did not explicitly credit in its explanation, then re-query the model. This exposes hidden influences and boosts faithfulness across datasets and model families without changing parameters."
lang: en
story: removal-based-method-improves-llm-explanation-faithfulness
publishedAt: 2026-09-07T13:00:53.960Z
sourceUrl: "https://arxiv.org/abs/2609.04343"
sourceName: "arXiv cs.AI"
priority: routine
tags: [llm, faithfulness, explanation, auditing]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A removal-based method improves LLM explanation faithfulness at test time without retraining. It targets incomplete explanations by removing uncredited concepts from the input and re-querying the model with the reduced prompt. The approach is model-agnostic and does not modify model parameters.

The method identifies concepts mentioned in the model's explanation, then subtracts those not explicitly credited from the input text. The model is prompted again with this filtered version. This forces the model to rely only on factors it has already declared relevant, exposing hidden influences that degrade explanation quality.

Evaluation covers two datasets, multiple model families, and two independent faithfulness metrics. The authors report improvements over standard prompting and prompts designed to encourage faithfulness, though exact quantitative gains are not specified in the available summary. The technique is positioned as a tool for auditing and compliance in high-stakes AI-assisted decisions.

Authors: Qinglan Luo, S M A Nahian, John Guttag, S. Mazdak Abulnaga, Katie Matton. Submitted to arXiv on 3 September 2026 (arXiv:2609.04343v1).

What is not known: the specific datasets used, the exact model families evaluated, the names of the two faithfulness metrics, the magnitude of improvement over baselines, the mechanism for extracting concepts from explanations, whether code or data is publicly available, and the exact wording of baseline prompts.
