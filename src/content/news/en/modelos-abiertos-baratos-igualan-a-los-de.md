---
title: "Cheap open models match frontier ones at grading math proofs"
summary: "An arXiv study pitted three cheap open models against Claude Opus and Gemini as judges of International Mathematical Olympiad proofs. Their agreement with human grades was statistically indistinguishable, at up to 100 times lower cost."
lang: en
story: modelos-abiertos-baratos-igualan-a-los-de
publishedAt: 2026-08-04T11:44:29.616Z
sourceUrl: "https://arxiv.org/abs/2608.00004"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [arxiv, evaluación, modelos, matemáticas]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Grading natural-language math proofs with large models is expensive. A recent arXiv study suggests three cheap open models do just as well as frontier ones when acting as judges, and that a unanimity rule makes the decision more stable.

The work uses IMO-GradingBench, a 1000-instance benchmark. They validated first on 200 of them. They compared three cheap judges (GPT-OSS 120B, DeepSeek-V4 Flash and Gemma-4 31B) against Claude Opus 4.7 and Gemini 3.1 Pro. Agreement with human pass/fail decisions was statistically indistinguishable between the two groups. The cheap ones cost up to 100 times less.

They then extended the analysis to the full 1000 instances. There they tried several aggregation rules. Unanimity, where a problem passes only if every judge passes it, gave the highest agreement with the human criterion and the lowest variability across runs, measured over four replicates.

There is no code in the paper you can run directly. The contribution is methodological: you can build an evaluation pipeline with these open models and a simple voting rule, and expect results comparable to paid API models at a fraction of the cost.

What is not known:

- The exact per-instance cost of each cheap judge and of the frontier models. The 100x factor is an aggregate estimate, not a per-call breakdown.
- The precise definition of “statistically indistinguishable”. The paper does not spell out the confidence intervals or the statistical tests behind that claim.
- Whether these judges do as well on other datasets or in other areas of mathematics. IMO-GradingBench is a specific domain.
- The unanimity rule was identified after seeing the results (post-hoc). It needs independent replication on other benchmarks and with other models before treating it as a general law.
- The details of the human rubric used for the reference grades. Without that, it is hard to tell what kind of errors the unanimity rule penalizes.
