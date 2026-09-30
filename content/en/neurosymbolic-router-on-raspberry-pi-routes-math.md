---
title: "Neurosymbolic router on Raspberry Pi routes math to exact solvers with 98.3% accuracy"
summary: "A learned DFA classifies prompts before generation, sending arithmetic, algebra, and logic to deterministic backends and only open-ended queries to a small language model."
lang: en
story: neurosymbolic-router-on-raspberry-pi-routes-math
publishedAt: 2026-09-30T12:58:43.584Z
sourceUrl: "https://arxiv.org/abs/2609.35833"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [edge, neurosymbolic, routing, dfa]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A neurosymbolic router decides whether a query needs a neural model or a deterministic solver before generation begins. The system was evaluated on a Raspberry Pi 4B with 8 GB of RAM and no GPU. It learns a deterministic finite automaton (DFA) using the L* grammatical inference algorithm. The small language model (SLM) acts as a membership oracle during learning, while labeled data serves as the equivalence oracle. Once trained, the router classifies incoming prompts and dispatches them to the cheapest appropriate backend: an arithmetic engine, an algebra system, a formal logic prover, or the SLM for open-ended problems.

On 100 unseen prompts drawn from DeepMind Mathematics, GSM8K, and RuleTaker, the learned router achieves 100% routing accuracy. With a 512-token reasoning budget, overall accuracy reaches 98.3% (93.3% on word problems). This outperforms a Program-of-Thought baseline at 72.0% and a tool-calling agent at 58.7%, both using the same solvers. Queries that match a formal format never reach the neural model; the router answers them in 1 to 11 milliseconds. In a 30-token configuration, the system runs 8.8 times faster and consumes 2.8 times less energy than Program-of-Thought on the same hardware.

The approach reframes the reliability problem on edge devices as a routing problem. Instead of asking a small model to reason through arithmetic or logic, where it frequently hallucinates, the router learns to recognize the structural signatures of deterministic tasks and hands them to provably correct solvers. The neural model only sees the genuinely ambiguous residue. This separation yields a step-change in the latency-accuracy-energy trade-off for offline inference.

What remains unknown: the specific SLM architecture and checkpoint used; the exact solver implementations and invocation mechanisms; absolute energy measurements in joules or watt-hours; the size of the learned DFA in states and transitions; the number of L* membership and equivalence queries required for convergence; the exact distribution of the 100 test prompts across the three benchmarks; standalone SLM latency and energy on the Pi; generalization beyond math and formal logic; and whether code, data, or weights will be released under an open license.
