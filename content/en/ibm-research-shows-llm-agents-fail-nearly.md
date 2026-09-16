---
title: "IBM Research shows LLM agents fail nearly half of repeated tasks even at zero"
summary: "A ReAct agent using GPT-4.1 scored 77.4% on average over five runs but passed every run only 53% of the time on AppWorld. IBM's Consistency Analyzer resamples each decision step to flag divergent behavior and writes natural-language guidelines that cut the consistency gap..."
lang: en
story: ibm-research-shows-llm-agents-fail-nearly
publishedAt: 2026-09-16T12:00:58.451Z
sourceUrl: "https://huggingface.co/blog/ibm-research/altk-evolve-consistency"
sourceName: "Hugging Face"
priority: urgent
tags: [llm, agents, consistency, ibm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
IBM Research published "Your Agent Aced the Task. Will It Do It Again?" on the Hugging Face blog on September 15, 2026. The paper introduces a methodology to measure and improve the consistency of LLM agents , the probability that an agent succeeds on every attempt when a task is repeated, not just on average.

On AppWorld test_normal, a ReAct agent powered by GPT-4.1 at temperature 0.0 achieved a Mean@5 of 77.4% but a Pass^5 of only 53.0%. The 24.4-percentage-point gap means the agent fails at least once in nearly half of the tasks it appears to solve reliably. On hard tasks the gap widens to roughly 30 points. Temperature is zero, so the variance does not come from ordinary sampling.

The authors propose a Consistency Analyzer that resamples each decision point from a single trajectory. For every step it requests k=5 completions , one call per step , without re-running the task end-to-end and without needing ground truth or logits. The analyzer flags steps where the agent's behavior diverges across completions. From those flags it generates natural-language consistency guidelines. Two examples from the paper:

> When counting checkbox-style markers in note content, use a line-anchored regex match rather than a plain substring count , note titles often repeat the marker symbol in a legend line.

> Always verify search results for note queries by checking for multiple matches and confirming the correct note before proceeding.

Applying the guidelines cut the consistency gap from 24.4 to 12.0 points: Pass^5 rose from 53.0% to 69.0% and Mean@5 from 77.4% to 81.0%. On medium tasks the absolute Pass^5 gain was +22.9 points (+44% relative); on hard tasks +14.3 points (+45% relative). The evaluation used 168 AppWorld test_normal tasks with five fresh runs per task to test the guidelines.

The full methodology and additional evaluations are described in a technical report on arXiv.

## What is not known

- The exact arXiv link for the technical report.
- Implementation details of the Consistency Analyzer: code, prompts, and exact parameters.
- How the easy/medium/hard categories are defined in AppWorld.
- Computational overhead of per-step resampling (latency, tokens, cost).
- Whether guidelines are generated fully automatically or require human review.
- Generalization to benchmarks beyond AppWorld or models beyond GPT-4.1.
- Storage and retrieval format for guidelines in ALTK-Evolve.
- Typical fraction of decision steps flagged per trajectory.
- Whether a configurable consistency-score threshold controls flagging.
