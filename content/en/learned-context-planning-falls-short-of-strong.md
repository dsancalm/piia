---
title: "Learned context planning falls short of strong retrieval in long-context QA"
summary: "A controlled study accepted at Insights 2026 shows that a planner trained via supervised fine-tuning on 140 questions does not beat anchored hybrid retrieval or BM25 on LongBench-v2."
lang: en
story: learned-context-planning-falls-short-of-strong
publishedAt: 2026-09-24T12:10:05.657Z
sourceUrl: "https://arxiv.org/abs/2609.26976"
sourceName: "arXiv cs.CL"
priority: routine
tags: [rag, retrieval, planning, long-context]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A controlled study accepted at the Insights 2026 workshop finds that learned context planning does not outperform strong retrieval baselines in long-context multiple-choice QA. The authors, Yingrui Li and Han Chen, evaluated a planner trained via supervised fine-tuning on outcome-selected traces from 140 training and 28 development questions, then tested it on the full 503-question LongBench-v2 set using Qwen2.5-7B-Instruct. Because the evaluation set includes the training and development questions, the primary analysis is partly transductive.

At an 18k-character budget, anchored hybrid retrieval reaches 36.18% accuracy and BM25 reaches 35.98%. The best direct planner-guided method reaches only 34.19%. On the untouched 152-question test split, the gap widens: anchored hybrid scores 42.11% versus 36.84% for the planner-guided approach. Leakage-safe routers cannot convert a large oracle gap into practical gains.

Under tight budgets, the advantage evaporates. The best planner leads by just 0.40 points at 6k characters and loses at 9k. Planner-guided reranking shows a +1.79-point estimate at 6k, but the paired confidence interval crosses zero, and it ties the control at 9k. Packing-order and score-flatness analyses did not identify a stable mechanism to explain when planning helps.

The conclusion is direct: learned planning acts as a weak relevance signal rather than a replacement for strong retrieval. For teams building RAG systems, this suggests that investment in retrieval quality and reranking yields more reliable returns than adding a learned planner on top.

## What is not known

- The exact architecture or hyperparameters of the Qwen2.5-7B-Instruct model used.
- Details of the retrieval algorithms beyond BM25 and anchored hybrid.
- The specific composition of the "strong retrieval, routing, budgeted-selector, and reranking controls."
- How "outcome-selected traces" are generated or validated.
- The definition or implementation of "leakage-safe routers."
- The SFT training procedure or loss function for the planner.
- Statistical significance tests applied to the reported accuracy differences.
- Computational cost or runtime of the different methods.
- How the 18k-character budget is enforced or measured.
- Why packing-order and score-flatness analyses failed to identify a stable mechanism.
- Whether results are reproducible or if code is available.
