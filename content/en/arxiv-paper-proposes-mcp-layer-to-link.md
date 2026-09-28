---
title: "ArXiv paper proposes MCP layer to link LLM agents with Data Spaces"
summary: "A September 24 preprint introduces the Eunomia Agent, a mediation layer that translates Data Space catalogs and services into Model Context Protocol tools an LLM can call at runtime."
lang: en
story: arxiv-paper-proposes-mcp-layer-to-link
publishedAt: 2026-09-28T14:27:01.004Z
sourceUrl: "https://arxiv.org/abs/2609.30341"
sourceName: "arXiv cs.AI"
priority: routine
tags: [mcp, data-spaces, llm-agents, governance]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A paper submitted to arXiv on September 24 proposes an architectural mediation layer built on the Model Context Protocol (MCP) to connect LLM agents with Data Spaces. The reference implementation, called the Eunomia Agent, translates Data Space capabilities , catalog queries, metadata retrieval, service invocation , into schema-guided tools that an agent can discover and call at runtime. The prototype demonstrates end-to-end interaction without modifying existing Data Space components.

The mediation layer sits between the agent and the Data Space connector. It exposes the Data Space's governed interfaces as MCP tools, each described by a JSON schema that the LLM can reason over. This preserves the Data Space's governance constraints: access policies, usage contracts, and audit trails remain enforced by the Data Space itself. The agent never calls proprietary APIs directly; it only invokes the mediated tools. The authors frame this as a separation of concerns: the agent handles reasoning and planning, while the Data Space handles data sovereignty, compliance, and interoperability.

The paper does not release the Eunomia Agent code, nor does it specify the exact MCP tool schemas, method names, or payload structures used in the prototype. It does not report latency, success rates, or mediation overhead. The specific Data Space components , connector implementation, catalog provider, policy engine , are not named. There is no comparison with native function calling, LangChain plugins, or direct REST integration.

What is not known: the concrete MCP tool definitions, quantitative validation results, the Data Space stack used in the prototype, whether the Eunomia Agent code will be published and under what license, the full governance policy model applied, and how this approach performs against alternative integration patterns.
