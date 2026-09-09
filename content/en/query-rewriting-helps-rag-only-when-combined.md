---
title: "Query rewriting helps RAG only when combined and routed"
summary: "A study finds rewriting alone matches strong baselines but adds little. Merging four methods lifts enterprise retrieval 12.5 points by covering different failures, not by adding budget."
lang: en
story: query-rewriting-helps-rag-only-when-combined
publishedAt: 2026-09-09T11:53:11.310Z
sourceUrl: "https://arxiv.org/abs/2609.05637"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [rag, retrieval, query-rewriting, emnlp]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
The paper evaluates query rewriting on top of a strong RAG pipeline: BGE dense retrieval, cross-encoder reranking, and MMR diversification. It compares four rewriting strategies (S1, S4) against two strong LLM baselines, HyDE and Query2Doc, across HotpotQA, AmbigNQ, and EnterpriseRAG-Bench (512K documents). Experiments run over three seeds with paired-bootstrap significance tests.

The main finding: rewriting alone is at best competitive. The real gain comes from combining methods because they fail on different questions. A post-hoc union of four methods (S1+S3+S4+HyDE) lifts HIT@10 on EnterpriseRAG-Bench from 39.22 to 51.70 (+12.5 points). A five-method union reaches 52.98 (+13.8). Matched-budget controls capture only ~40% of that gain, confirming complementarity , not extra retrieval budget , drives the improvement.

On HotpotQA the union adds +1.6 to +1.8 points (p<0.001), saturating the oracle. On AmbigNQ the same fusion hurts by -2.4 points below the best single method (p<0.001). The authors analyze when and why.

They simulate a confidence-gated router: rewrite only when the baseline top-1 score is low. The router captures roughly half the full-merge gain on enterprise (+4.3 HIT@10) while paying rewrite cost on <40% of queries, and it automatically declines to rewrite on AmbigNQ. Downstream answer quality improves F1 by +1.92 (p<0.01) at ~40% of full-expansion cost.

The conclusion: treat query rewriting as a complementary coverage source with cost-aware routing, not as a standalone replacement for a strong baseline. Accepted at EMNLP 2026 Industry Track.

## What we don't know

The abstract does not define strategies S1, S4. The exact confidence threshold and calibration for the router are not given. The reason the union harms AmbigNQ is summarized as "analyzed" but the finding is not stated. Baseline specifics , which BGE model, which cross-encoder, MMR parameters , are omitted. EnterpriseRAG-Bench domain, query types, and metrics beyond HIT@10 are not described. Absolute compute cost (latency, tokens, dollars) for rewriting versus retrieval is absent. Results on nDCG, MRR, or other ranking metrics are not reported. Router evaluation on HotpotQA and AmbigNQ is not mentioned. Downstream evaluation details , generator LLM, prompt, exact F1 definition , are missing. Public availability of code and data is referenced but not confirmed.
