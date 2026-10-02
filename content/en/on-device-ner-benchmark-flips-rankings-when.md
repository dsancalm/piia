---
title: "On-device NER benchmark flips rankings when human labels replace LLM silver"
summary: "Nine local NER systems were tested on three datasets, including RSS-News where gold labels were missing. Authors built a silver set via an LLM judge panel, validated against full human re-annotation (strict F1 0.95)."
lang: en
story: on-device-ner-benchmark-flips-rankings-when
publishedAt: 2026-10-02T13:06:51.309Z
sourceUrl: "https://arxiv.org/abs/2610.00007"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [ner, benchmark, on-device, gliner]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A new arXiv study benchmarks nine on-device named-entity recognition systems across three paradigms: a classic tagger (spaCy), bidirectional encoders (GLiNER, 166 M, 460 M parameters), and local generative LLMs (Qwen3 0.6 B/1.7 B/4 B-Instruct, DeepSeek-R1 1.5 B/8 B). The authors evaluate on three datasets of different character, including RSS-News, which lacked gold labels. They construct a "silver gold" set for RSS-News using a cross-family LLM judge panel, then validate that silver against benchmark gold and a full human re-annotation of the corpus. The human, silver agreement reaches strict F1 0.95, an upper bound because the human annotators were seeded with the silver output.

The provenance of the gold labels flips the paradigm ranking. Moving from LLM-authored silver to human gold lifts every encoder and drops every generative model. In raw accuracy a 4 B instruct LLM is competitive , it leads on clean newswire , but the encoder wins on deployability: it matches or slightly beats the LLM at 1/9 to 1/24 the size, with millisecond-to-second latency and zero malformed outputs. The smaller generative models emit up to 27 % invalid outputs on long inputs; the failure disappears with scale, not with a larger output budget.

GLiNER's per-span confidence ranks correctness well (AUROC 0.76, 0.86) but is overconfident (ECE 0.24, 0.47). Temperature scaling cuts ECE roughly in half. Thresholding on calibrated confidence yields a small, honest out-of-sample F1 gain. A local small-to-large cascade gives a modest, corpus-dependent gain over random routing at equal cost. Confidence correlates with correctness but not with entity novelty.

All numbers are recomputed offline from per-span logs; code and logs reproduce everything offline.

**What we don't know**

The paper does not name the other two datasets or describe their properties. The cross-family LLM judge panel , models, count, aggregation method , is unspecified. The full human re-annotation protocol (annotator count, guidelines, inter-annotator agreement) is not detailed. Concrete per-model latency numbers and the hardware used are absent. The exact definition of "invalid output" and how it is measured are not given. Complete per-model, per-dataset accuracy tables (F1, precision, recall) are not in the seven-page preprint. The cascade configuration (models, thresholds, exact gain per corpus) is omitted. The definition and measurement of entity "novelty" for the confidence analysis are missing. The temperature-scaling setup that halves ECE is not described. The repository hosting code and per-span logs, and its license, are not indicated.
