---
title: "ESQ-Bench exposes the gap between academic NL2SQL scores and production Oracle"
summary: "Frontier models that clear 89 percent on Spider and BIRD drop to 68-87 percent execution accuracy on ESQ-Bench's six identical enterprise schemas spanning Oracle, Postgres, MySQL and SQL Server."
lang: en
story: esq-bench-exposes-the-gap-between-academic
publishedAt: 2026-08-26T07:30:38.130Z
sourceUrl: "https://arxiv.org/abs/2608.23569"
sourceName: "arXiv cs.AI"
priority: routine
tags: [nl2sql, benchmark, oracle, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Academic NL2SQL benchmarks such as Spider and BIRD report execution accuracy above 89 percent for frontier models. ESQ-Bench shows what happens when those models meet a production Oracle estate. The benchmark ships six identical, populated schemas across Oracle, PostgreSQL, MySQL and SQL Server. Each schema contains 465 tables, 164,682 rows and zero empty tables. On top of that sit 550 gold-validated question-query pairs split into three tiers of schema complexity: Tier-1 with 95 pairs, Tier-2 with 228 and Tier-3 with 227.

Evaluation uses four metrics. Exact Match (EM) checks string equality. Execution Match (EX) verifies that the predicted query returns the same result set as the gold query. Schema Relevance (SR) measures whether the predicted query touches the correct tables and columns. Silent Divergence (SD) flags cases where EX passes but the result semantics are wrong.

GPT-4o with schema-linked prompting degrades monotonically across tiers on executed-query EX: 79.8 percent on Tier-1, 60.3 percent on Tier-2, 57.2 percent on Tier-3. EM stays below 7 percent everywhere. Among the queries that do pass EX, operational silent divergence ranges from 73 to 99 percent. Failure analysis indicates that wrong result semantics dominate in the higher tiers.

Claude Sonnet 4.6 with the same schema-linked prompts outperforms GPT-4o on every tier: 87.4 percent, 74.9 percent and 68.7 percent EX on executed queries. GPT-4o zero-shot behaves differently. Its EX on executed queries is 78.7 percent, 73.5 percent and 77.8 percent across T1-T3, inverting the schema-linked trend on Tier-2 and Tier-3 because of lower execution rates and survivorship bias.

Llama 3.2 running locally with schema-linked prompting reaches only 13.3 percent EX bank-wide, solving 73 of 550 questions. The gap between closed-API models and open-weight models on enterprise Oracle schemas is stark.

An earlier pilot of 142 questions gave GPT-4o schema-linked EX scores of 75.6 percent, 80.4 percent and 95.8 percent on T1-T3. The final benchmark reverses that ordering. The paper does not explain the discrepancy.

What is not known
- Exact definitions of the SR and SD metrics beyond their names.
- Construction details of the six schemas: domains, foreign keys, Oracle-specific data types.
- Composition of the schema-linked prompt: DDL, samples, comments, context budget.
- Gold-validation criteria for the 550 pairs.
- Temperature, top-p, max-tokens and exact model versions used.
- Root cause of the pilot-vs-benchmark divergence for GPT-4o.
- Breakdown of semantic error types from the failure analysis.
- Availability and license for code, data and evaluation harness.
- Results on PostgreSQL, MySQL and SQL Server; the paper is Oracle-first.
- Inference cost and latency per model and tier.
