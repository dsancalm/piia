---
title: "SchemaRouter cuts tokens and latency in agentic RAG with a schema graph"
summary: "A lightweight routing layer replaces prompt stuffing by mapping tools and data sources into a graph. A small LLM extracts intent, then deterministic field selection builds an executable plan."
lang: en
story: schemarouter-cuts-tokens-and-latency-in-agentic
publishedAt: 2026-08-25T07:30:37.389Z
sourceUrl: "https://arxiv.org/abs/2608.21375"
sourceName: "arXiv cs.AI"
priority: flash
tags: [rag, routing, schema, benchmark]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
SchemaRouter adds a lightweight routing layer for heterogeneous agentic RAG systems that orchestrate external APIs, internal databases, vector stores, and graph stores. Instead of stuffing every tool description into the prompt or relying on blind vector similarity, it represents tools, endpoints, parameters, response fields, domain concepts, units, provenance, and licensing policies as a schema graph. Given a query, the system emits an executable tool plan that specifies which tools to call and which fields to retrieve.

A small LLM extracts intent, concepts, and source constraints from the query. Field selection then runs deterministically on the graph through intent-group projection and concept-to-field matching with an alias layer. This separation keeps the non-deterministic component small and the retrieval logic auditable.

On a 110-query materials-science benchmark, SchemaRouter reaches 0.71 answer accuracy, matching fetch-everything within overlapping confidence intervals and edging out prompt-all at 0.66. It uses 227 retrieved context tokens versus 2,066 for fetch-everything and achieves 2.7× lower end-to-end latency than prompt-all. Tool-exact rate hits 0.93 and parameter validity reaches 1.0. Provenance and licensing information is grounded in 62 percent of answers, compared with roughly zero for all baselines.

Aggressively minimizing the number of selected fields backfires: accuracy drops to 0.56 with negligible token savings, while recall-preserving projection restores peak accuracy.

The paper is 13 pages with four figures and six tables, submitted 3 July 2026. Code, benchmark, and fixtures are available at the associated repository link.

What is not known: the exact schema-graph formalism (node and edge types), how the alias layer is built and maintained, the architecture and size of the small LLM used for intent extraction, the composition of the materials-science benchmark (dataset, exact metrics, example queries), comparisons with ToolLLM, API-Bank, or pure embedding-based routers, the computational overhead of graph construction and deterministic projection, handling of new tools or dynamically changing schemas, the executable plan format and sandbox, results on domains outside materials science, and the exact source-code license (the paper's URL placeholder does not resolve).
