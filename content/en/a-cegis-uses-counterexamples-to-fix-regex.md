---
title: "A-CEGIS uses counterexamples to fix regex synthesis"
summary: "A lightweight loop feeds a language model minimal strings that expose false positives or negatives. On the NL-RX-Turk benchmark, zero-shot accuracy rises from 17 percent to 90 percent within four turns, with 77 percent of final patterns surviving adversarial probing."
lang: en
story: a-cegis-uses-counterexamples-to-fix-regex
publishedAt: 2026-09-04T12:04:07.838Z
sourceUrl: "https://arxiv.org/abs/2609.02892"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [regex, synthesis, verification, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A-CEGIS adds a lightweight loop to natural-language-to-regex synthesis. An agent proposes a pattern. A deterministic oracle checks it under full-match semantics. Compact counterexamples , minimal strings that expose false positives or false negatives , become the only feedback returned to the agent. No retraining, no reward model, no human in the loop. The oracle is a classic automata difference check. The witness it returns is a single string the agent can read and reason about.

On the 30-task NL-RX-Turk benchmark, zero-shot generation solves 17 percent of tasks. Generic self-correction , essentially "try again" , reaches 27 percent. Feeding the agent only an error message without a witness lifts that to 23 percent. Diagnostic counterexample feedback clears 90 percent within a four-turn ablation budget. Mean time-to-success is 2.7 turns. In a full diagnostic run with hardening, every task in the hidden set is solved by the final turn. Targeted probing afterward shows 77 percent robust success.

## Why the oracle changes the dynamic

Most self-correction loops rely on the model to diagnose its own mistakes. That fails when the model cannot see the mistake. A counterexample is external, verifiable, and unambiguous. The agent receives a concrete string , say, `"abbb"` , that should match but does not, or `"aaa"` that should not match but does. The next prompt simply includes that string and the expected outcome. The agent then edits the regex. Because the oracle is deterministic, the feedback is never hallucinated and never contradictory.

The framework measures two things: how many turns until first success (efficiency) and whether the solution survives adversarial probing (robustness). The 77 percent robust success rate means nearly a quarter of "correct" patterns still break on inputs the held-out set never contained. That gap is the practical signal for anyone shipping generated regexes to production.

## Integration profile

A-CEGIS is domain-agnostic wherever a deterministic oracle exists: SQL with a test database, code with a type checker or unit suite, configuration languages with a validator. The counterexample contract is small , one string, one expected label , so the context overhead per turn is negligible. The paper reports no per-turn latency, token counts, or API costs. The exact agent model (architecture, size, checkpoint) is not disclosed. The hardening and targeted probing procedures are also not defined precisely enough to replicate.

What is not known: the agent model used, oracle implementation details and witness generation method, precise definitions of hardening and targeted probing, hidden set composition and overlap with NL-RX-Turk, per-turn latency and cost metrics, per-task variance, results outside regex synthesis, and availability of code, data, or prompts.
