---
title: "Proprietary LLM judge fails agreement test; self-hosted Qwen matches Claude Opus"
summary: "A production text-to-SQL pipeline's gpt-4o-mini judge scored Cohen's kappa of 0.04 against human annotators on a disagreement-enriched set and 0.42 on a random sample."
lang: en
story: proprietary-llm-judge-fails-agreement-test-self
publishedAt: 2026-09-28T14:20:04.735Z
sourceUrl: "https://arxiv.org/abs/2609.30290"
sourceName: "arXiv cs.CL"
priority: routine
tags: [llm, evaluation, text-to-sql, cost]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A production text-to-SQL pipeline used gpt-4o-mini as an LLM-as-judge to filter model outputs. No one had measured how well that judge agreed with human annotators. When the team finally ran the comparison, the results were stark. On a disagreement-enriched set, gpt-4o-mini scored a Cohen's kappa of 0.04 against a gold standard built by two of the paper's authors. On a uniform random spot-check it reached 0.42, still well below the threshold for reliable automation.

The judge was over-flagging 77.1% of the cases humans labeled FAITHFUL in the enriched set. The primary driver is a component the authors call GRADE-HALLUCINATION. The abstract names the mechanism but does not describe its internal logic, so the exact failure mode remains opaque from the outside.

Replacing the proprietary judge with a self-hosted Qwen3.6-27B changed the economics and the metrics simultaneously. Qwen achieved kappa = 0.72. Claude Opus 4.7, used as a proprietary benchmark, scored 0.71. The head-to-head comparison between the two models is underpowered at n = 96, so the near-parity should be treated as directional rather than conclusive. Qwen costs roughly 1/300th per call relative to the proprietary alternative.

Ensembling does not help for free. Pairing a weak judge with a strong one degraded agreement. The configuration that worked was three strong judges with a unanimity routing rule: all three must agree to auto-accept, otherwise the case routes to human review. That setup reached kappa = 0.79 with 89.7% auto-coverage, meaning only about one in ten items needed human attention.

The same audit recipe applied out-of-domain flagged 25.5% of expert gold SQLs from the BIRD-financial benchmark as candidate gold-SQL issues under their annotation protocol. That finding suggests the method can surface annotation errors in existing benchmarks, not just model errors.

Code and pre-registration are available at the source link.

### What is not known
- Exact technical details of the GRADE-HALLUCINATION mechanism.
- Full architecture of the production text-to-SQL pipeline upstream of the judge.
- Precise annotation protocol and FAITHFUL/UNFAITHFUL criteria.
- Hyperparameter settings (temperature, top-p, max tokens, system prompts) for any evaluated model.
- Latency and throughput of self-hosted Qwen3.6-27B versus proprietary APIs in their infrastructure.
- Why pairing a weak judge with a strong one degrades agreement (hypothesis not stated in the abstract).
- Decision logic and tie-breaking for the three-judge unanimity routing.
- Exact nature of the candidate gold-SQL issues detected in BIRD-financial (error types).
- Training data cut-off dates for the evaluated models.
- Whether robustness to prompt injection or adversarial attacks was evaluated.
