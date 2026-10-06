---
title: "Proxy Confidence catches agent tool-call errors the frontier model misses"
summary: "Frontier chat APIs hide token probabilities, making stated confidence unreliable. Proxy Confidence runs a low-cost open-weight surrogate in parallel to score tool calls using four readouts: teacher forcing, request-PMI, discriminative verdict, and tool-choice competition."
lang: en
story: proxy-confidence-catches-agent-tool-call-errors
publishedAt: 2026-10-06T13:40:07.251Z
sourceUrl: "https://arxiv.org/abs/2610.03894"
sourceName: "arXiv cs.AI"
priority: routine
tags: [agentsafety, tooluse, calibration, surrogatemodel]
generatedBy: dots-studio/dots-3-note-preview:free
---
Frontier chat APIs hide token probabilities, so you cannot trust the confidence an agent states when it calls a tool. The paper shows that stated confidence barely beats chance on critical mistakes. Resampling does not help because frontier models are highly repetitive, reproducing the same call across samples.

Proxy Confidence solves this by running a low-cost open-weight surrogate in parallel. The surrogate reads the same context, schema, and proposed action as the agent. It scores the call using its own log-probabilities through four readouts: teacher forcing, request-PMI, discriminative verdict, and tool-choice competition.

Teacher forcing and request-PMI weigh the likelihood of each argument value. A discriminative verdict judges the call as a whole. Tool-choice competition tests the function against its siblings.

A principle determines which readout to trust: generative likelihood localizes wrong argument values, while the verdict catches holistically wrong calls. When the error type is unknown, an ensemble is the low-regret default. The readout is training-free and requires no access to the agent's internals. It costs one prefill pass alongside the tool call.

On difficult coding tasks, it reaches AUROC 0.825 where the actor's stated confidence is near chance (0.598). Generative readouts beat the actor's confidence by +0.07 to +0.28 across three further actors. Against self-consistency, it gains +0.14 to +0.19 on near-deterministic actors at 1/K the cost.

The signal drives two deployment modes: a real-time gate escalating the least-trustworthy calls for review, and confidence feedback returning the tool result with the score. The real-time gate improves accepted-action accuracy by +0.05 to +0.30 at 50% coverage. Confidence feedback lifts task success on live-execution benchmarks by +0.119 and +0.137 (p <= 1e-4). It beats a random-value control where step errors are silent by +0.078 (p = 0.003).

The paper has 20 pages, 6 figures, and 12 tables. Subjects include Artificial Intelligence (cs.AI), Computation and Language (cs.CL), and Machine Learning (cs.LG).

What is not known: the specific open-weight surrogate model, its architecture or training details, the exact implementation of the ensemble, the benchmarks used for coding tasks, the computational cost or latency of running the surrogate, potential failure modes or edge cases, how the surrogate handles different tool schemas or function signatures, whether it works across different LLM architectures, how it handles dynamic or evolving tool sets, and its generalizability beyond coding tasks.
