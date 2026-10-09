---
title: "Agent-controlled forgetting cuts prompt tokens in half for long-horizon runs"
summary: "A Python harness lets models compress selected tool outputs into short notes and archive the originals, reducing cumulative input tokens by roughly 50 percent in a debugging run."
lang: en
story: agent-controlled-forgetting-cuts-prompt-tokens-in
publishedAt: 2026-10-09T13:44:13.252Z
sourceUrl: "https://arxiv.org/abs/2610.10590"
sourceName: "arXiv cs.AI"
priority: routine
tags: [agents, context, compression, cost]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Agent-controlled forgetting lets the model decide which tool outputs to compress. It replaces selected results with a short note in place and stores the original in a recoverable archive. No task-specific training is needed. A Python harness exposes batch archiving and explicit retrieval while protecting user instructions and assistant messages.

In an OpenTelemetry debugging run followed by an unrelated implementation task, the method reported 231,951 prompt tokens against 912,492 with full history retained. That is roughly a 50 percent reduction in cumulative input tokens. Estimated API cost fell from about 4.38 USD to 1.28, 1.44 USD. Both arms passed the two-case behavioral oracle. Neither fully satisfied the follow-up evaluation. The method made more requests and ran 17 percent slower. A contrasting app-development pair showed no context or cost saving, and a prior continuation showed lower manual quality despite reduced context.

The pattern is reproducible for long-horizon agents that hit window overflow. Savings depend on workload. Noise-heavy tool traces compress well. Clean, dense traces may not. Latency and request count rise because archiving and recovery add round trips.

What is not known: the harness API and invocation details, the exact definition of the two-case behavioral oracle and the follow-up evaluation, the characteristics of the contrasting app pair and the prior continuation, the models and providers used, the structure of the short replacement note, the mechanism protecting user and assistant messages, and the availability or location of code and research artifacts.
