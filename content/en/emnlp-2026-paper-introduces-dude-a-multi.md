---
title: "EMNLP 2026 paper introduces Dude, a multi-agent system that detects paper-code"
summary: "Dude maps paper claims and code fragments to a shared abstraction level before comparing them, then filters out low-signal matches. On real-world datasets it raises recall and precision by up to 22.8 percent and F1 by up to 18.7 percent over baselines."
lang: en
story: emnlp-2026-paper-introduces-dude-a-multi
publishedAt: 2026-09-05T11:13:26.222Z
sourceUrl: "https://arxiv.org/abs/2609.03416"
sourceName: "arXiv cs.AI"
priority: routine
tags: [reproducibility, multi-agent, emnlp, code-review]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A paper accepted at EMNLP 2026 introduces Dude, an open-source multi-agent system that detects discrepancies between research papers and their accompanying code repositories. The authors , Weijie Liu, Running Zhao, Wenhao Yuan, Jinfeng Xu, Zhanfeng Xu, Xiaoxi Zhang, and Edith Cheuk-Han Ngai , frame the problem as a granularity mismatch. Papers describe methods in high-level natural language. Code implements them in low-level syntax. Existing multi-agent detectors tend to over-interpret the paper or over-report from the code, producing false positives that drown out real mismatches in results, hyperparameters, or architecture.

Dude addresses this with two mechanisms. A granularity-aligned negotiation forces agents to map paper claims and code fragments to a common level of abstraction before comparing them. A two-stage salience filter then discards low-signal matches, keeping only discrepancies that affect the reported outcomes. On real-world paper-code discrepancy datasets, the system improves recall and precision by up to 22.8 percent and F1 by up to 18.7 percent over baseline methods.

For maintainers of research repositories or reviewers checking reproducibility, the promise is a tool that can run in continuous integration and flag inconsistencies before they reach a camera-ready version or a production pipeline. The paper positions Dude as a step toward automating part of the reproducibility review that currently relies on manual inspection.

## What is not known

- Which specific datasets were used and their sizes
- The exact baseline methods used for comparison
- Architectural details of the agents: underlying LLMs, prompts, and role definitions
- Formal definitions and measurement methods for "granularity" and "salience"
- Whether Dude's code and data are publicly released
- Latency and computational cost of the multi-agent pipeline
- Breakdown of results by discrepancy type (logic, hyperparameters, architecture, etc.)
