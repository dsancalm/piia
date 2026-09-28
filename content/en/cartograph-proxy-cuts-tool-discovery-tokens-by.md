---
title: "Cartograph proxy cuts tool-discovery tokens by 99 percent"
summary: "A federated MCP proxy replaces full catalog exposure with three progressive-disclosure tools. In a 374-tool deployment, top-5 discovery fell from 42,450 tokens to 475 while adding 5 ms latency."
lang: en
story: cartograph-proxy-cuts-tool-discovery-tokens-by
publishedAt: 2026-09-28T14:23:03.982Z
sourceUrl: "https://arxiv.org/abs/2609.30293"
sourceName: "arXiv cs.CL"
priority: routine
tags: [mcp, proxy, tool-discovery, retrieval]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cartograph is a federated MCP proxy that changes how agents discover tools. Instead of presenting an agent with every tool definition in a catalog , an O(n) problem that balloons context windows , it exposes three proxy tools that progressively disclose capabilities. In a 22-server, 374-tool deployment, the proxy surfaces only those three entry points. A measured top-5 discovery exchange consumes 475 tokens versus the 42,450 tokens a full-catalog accounting would require. Gateway measurements across ten runs add 5 ms of mean latency, a 0.8 percent overhead over direct stdio MCP calls.

The system rests on three mechanisms. First, operator-attested capability cards: Ed25519-signed descriptions generated under the control of the operator who deploys each server. Second, Rift, a three-layer analysis that maps confusable clusters through density clustering, query-margin analysis, and token diagnostics. Rift identified 49 confusable clusters, including four HIGH-risk clusters in bootstrap-generated cards. Third, a two-stage retriever that ranks servers before tools.

A 49-query benchmark built by the authors yields Recall@5 of 0.816 for Cartograph against 0.592 for a Jaccard keyword baseline. An exploratory comparison of 119 LLM-generated descriptions removes the zero-distance cluster observed in bootstrap cards, but mixing card-generation regimes degrades R@5. The authors do not explain why.

Cartograph is complementary to code-execution approaches: it governs which tool descriptions are exposed and logs the provenance of every description used for ranking in each query.

## What is not known

- Implementation details of the federated MCP proxy (code, configuration, deployment)
- Precise definition of "operator-attested capability cards" and the Ed25519 generation/signing process
- Concrete algorithms for Rift's three layers (density clustering, query-margin analysis, token diagnostics)
- Details of the two-stage retrieval: how servers are ranked, then tools
- Construction of the 49-query benchmark: queries, relevance criteria, ground truth
- Token measurement methodology: what counts as a token, measurement context
- Definition of "bootstrap-generated cards" and their generation process
- Details of the 119 LLM-generated descriptions: model, prompt, parameters
- Why mixing card-generation regimes reduces R@5
- Gateway architecture and latency measurement points
- Availability of code, data, or reproducible artifacts
- Comparison with other federated tool-discovery approaches beyond the Jaccard baseline
