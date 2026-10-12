---
title: "SWE-Duel benchmark pits agents against each other in live coding tournament"
summary: "A new benchmark called SWE-Duel replaces static tests with a mirrored tournament where agents alternate writing features with hidden defects and reviewing pull requests blind."
lang: en
story: swe-duel-benchmark-pits-agents-against-each
publishedAt: 2026-10-12T15:52:42.960Z
sourceUrl: "https://arxiv.org/abs/2610.12569"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [benchmark, agents, evaluation, software]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
SWE-Duel replaces the static benchmark with a living tournament. Two agents face off in mirrored Red-Blue turns across real repositories. In each turn the Red agent designs a new feature, writes tests for it, then injects a subtle defect guarded by sealed tests that trigger only that defect. The pull request is accepted only if the feature tests and the existing repository suite pass while exactly the sealed tests fail, and a fresh, context-isolated session of the same agent can repair the defect blind. The Blue agent reviews the PR without knowing a defect exists; it wins the turn only if its review passes all three suites. Roles swap after every turn.

The arena ran 1,500 turns across 15 repositories in five languages with 11 model-harness pairs. GPT-5.5 paired with Codex CLI emerged as the strongest solver, repairing 98.3 percent of the defects it reviewed. Claude Opus 4.8 paired with mini-swe-agent led as the strongest task author, achieving a 27.3 percent Red win rate. Within the same model family, tasks authored by a newer version defeated a fixed reference solver 42.9 percent of the time, while tasks from an older version managed only 4.0 percent. The paper is under review for ICLR 2027.

The mechanism sidesteps saturation and data leakage because difficulty is produced at evaluation time by the agents themselves. A stronger model naturally writes harder tasks, so the benchmark scales with the field instead of freezing at a fixed ceiling. The mirrored structure also forces agents to demonstrate both sides of the software lifecycle: creating verifiable work and validating work created by an adversary.

What is not known:
- The full list of 11 model-harness participants beyond the two leaders.
- The identities of the 15 repositories and the five languages.
- Harness architectures for Codex CLI, mini-swe-agent, and the other nine entries.
- Precise operational definitions of "Red win rate" and "solver win rate."
- How "subtle bug" is defined and validated.
- Implementation details of the context-isolated repair sessions.
- Total compute cost and wall-clock time of the tournament.
- Whether code, data, or artifacts are publicly released.
- Statistical significance measures such as confidence intervals or p-values.
- Direct quantitative comparison against static benchmarks like SWE-bench.
