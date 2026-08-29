---
title: "Lemmalog gives LLM agents a retractable memory for vulnerability research"
summary: "Standard LLM memory stores conversations but cannot retract conclusions when facts change. Lemmalog embeds a Datalog engine in the context window to derive facts incrementally, track provenance, and automatically invalidate conclusions when their justifications disappear."
lang: en
story: lemmalog-gives-llm-agents-a-retractable-memory
publishedAt: 2026-08-29T12:51:17.718Z
sourceUrl: "https://pwning.systems/posts/llm-memory-program-analysis/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [llm, datalog, security, memory]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Jordy Zomer hit a familiar wall while using LLM agents for vulnerability research. Long sessions caused the model to lose track of its own reasoning. It would repeat discarded approaches or rely on observations that were no longer true. Standard LLM memory systems store conversations and embeddings, then retrieve the most relevant chunks. They do not maintain a current knowledge state. They do not automatically retract conclusions when an underlying fact changes.

Zomer modeled the problem as program analysis: facts plus rules produce derived facts, reaching a fixed point with incremental updates when input facts change. He built Lemmalog, a Datalog engine designed to sit inside an LLM context window. The LLM extracts structured facts from natural language, source code, or debugger output. Lemmalog handles deterministic derivation, incremental invalidation, and provenance tracking for every derived fact.

The engine supports retractions with dependency tracking. A derived fact can have multiple justifications. It is only invalidated when every justification disappears. You can query the provenance of any conclusion with a "why" command, which returns the tree of observations and rules that support it. Facts can also carry temporal validity intervals, so you know whether a primitive is viable now and why it was believed viable before.

The fact format uses a Prolog-like syntax. Base facts look like this:

```
controls ( attacker , object_a ).
points_to ( object_a , object_b ).
kernel_object ( object_b ).
```

A rule derives a new fact:

```
controls_kernel_object ( Attacker ) :- controls ( Attacker , ObjectA ), points_to ( ObjectA , ObjectB ), kernel_object ( ObjectB ).
```

The engine then materializes the conclusion:

```
controls_kernel_object ( attacker ).
```

If `points_to(object_a, object_b)` is later retracted, the dependency tracker sees that `controls_kernel_object(attacker)` loses its only justification and retracts it automatically. The LLM never has to "remember" the chain. It queries the engine for the current state or the explanation.

The article is a 19-minute read published on 28 Aug 2026. It includes prompts and examples showing how to drive the extraction and querying loop.

## What is not known

The implementation details of the Datalog engine are not described: the incremental evaluation algorithm, the data structure for provenance, or the implementation language. The integration pattern between the LLM agent and Lemmalog is not specified (API, exchange format, sync frequency). No performance metrics are given: derivation latency, maximum fact base size, or memory overhead. There are no concrete case studies of vulnerabilities found using Lemmalog. The code availability, repository location, and license are not mentioned. The method for initial fact extraction by the LLM (prompts, few-shot, fine-tuning) and its error rate are not covered. Support for negation-as-failure or stratification in rules is not discussed. Scalability to millions of lines of code and thousands of simultaneous facts is not addressed.
