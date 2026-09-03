---
title: "Short paper names Hydration Proxy pattern for LLM session state"
summary: "Joseph Axisa presented a three-page position paper at the SAO workshop of the first ACM Conference on AI and Agentic AI Systems in 2026. It introduces Hydration Proxy, a standalone service that sits between client and model endpoint, and the Context Stabilization Mandate, a..."
lang: en
story: short-paper-names-hydration-proxy-pattern-for
publishedAt: 2026-09-03T12:12:17.072Z
sourceUrl: "https://arxiv.org/abs/2609.01834"
sourceName: "arXiv cs.AI"
priority: routine
tags: [llm, architecture, caching, session]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
The paper runs three pages plus one table. It names a pattern , Hydration Proxy , and a mandate , Context Stabilization , then stops. No pseudocode, no latency numbers, no repo link. Joseph Axisa presented it at the SAO workshop of the first ACM Conference on AI and Agentic AI Systems in 2026.

The problem is familiar. Stateless LLM APIs force you to resend the full conversation on every turn. That kills KV‑cache reuse and pushes token counts up. The usual fix , stuffing history into Redis or a LangChain memory class , couples your session store to the prompt builder. When you swap providers or add a routing layer, the coupling leaks.

Hydration Proxy reframes the session store as a standalone service between the client and the model endpoint. The client sends a compact session token. The proxy hydrates that token into the exact message array the model expects, injects it upstream, then strips the response back to a token before returning it to the client. The reasoning engine never sees the storage layer. The storage layer never sees the model.

Context Stabilization Mandate is the rule that makes the proxy cache‑friendly. It requires the proxy to emit a stable prefix , system prompt, tool definitions, pinned few‑shots , on every request so the provider’s KV cache can be reused. Only the variable tail (recent user/assistant turns) changes. The mandate also defines eviction and pinning policies so the prefix stays within the provider’s cache window.

The table compares three architectures: monolithic prompt builder, client‑side history, and Hydration Proxy. The proxy row checks boxes for provider independence, KV‑cache reuse, and sovereign state. The other two miss at least one.

What is not known: implementation details of the Hydration Proxy pattern (architecture, components, data flows). Precise definition and algorithms of the Context Stabilization Mandate. Experimental results, benchmarks, or empirical evaluations. Comparison with existing alternatives (LangChain memory, Redis‑backed chat history, etc.). Security, latency, cost, or scalability considerations. Availability of open‑source code, repository, or reproducible artifacts.
