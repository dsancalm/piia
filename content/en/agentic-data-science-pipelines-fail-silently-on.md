---
title: "Agentic data-science pipelines fail silently on methodology"
summary: "A large-scale study of 220 tasks shows most agent-generated pipelines contain silent failures like data leakage and broken validation. Leakage correlates with higher apparent scores, so the top leaderboard runs are often the most broken."
lang: en
story: agentic-data-science-pipelines-fail-silently-on
publishedAt: 2026-10-15T11:55:21.804Z
sourceUrl: "https://arxiv.org/abs/2610.14115"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [agents, datascience, evaluation, leakage]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Agentic data-science systems are judged on leaderboard scores while the methodology underneath rots. A new large-scale study evaluates 220 tasks across common agentic frameworks and finds that most generated pipelines contain at least one silent methodological failure , data leakage, inappropriate validation, broken feature engineering , regardless of model size or harness complexity. The agents optimize for the metric they see, and leakage inflates that metric. The paper reports a positive correlation between leakage occurrence and apparent predictive performance, meaning the "best" runs are often the most broken.

The authors built a reusable test suite that isolates six specific failure modes in controlled tasks. Each test targets a distinct pathology: leakage through preprocessing fit on the full dataset, validation splits that respect time or group structure, feature construction that peeks at the target, and so on. The suite is designed to be extended; you drop in a new agent or framework and run the same battery. No code from the suite is reproduced in the preprint, but the tasks are described precisely enough to reimplement.

Qualitative comparison against winning Kaggle solutions reveals a second gap. Agents lack domain creativity , they do not invent the target encoding a competitor would hand-craft, they do not spot the calendar anomaly that explains a sales dip, they do not question the column that looks like an ID but is actually a sorted timestamp. The gap is not raw coding ability; it is the judgment that comes from having seen the same mess in ten different industries.

The argument is straightforward: principled failure-mode analysis must become a standard part of agentic DS evaluation. Leaderboard accuracy without methodological audit is a trap.

What is not known:
- The exact definitions of all six failure modes tested in the controlled suite.
- Which agentic frameworks and base models were evaluated.
- The specific Kaggle competitions used for qualitative benchmarking.
- The numerical magnitude of the leakage, performance correlation.
- The precise percentage of agent solutions containing at least one failure.
- Availability, API, or implementation details of the test suite.
- How "creativity" and "domain knowledge" were operationalized in the qualitative rubric.
