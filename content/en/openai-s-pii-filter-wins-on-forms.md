---
title: "OpenAI's PII filter wins on forms, collapses on prose and non-Latin scripts"
summary: "An independent arXiv study tested OpenAI's 1.5B-parameter OPF detector across 42 benchmarks. It beats Presidio and XLM-RoBERTa on structured data like emails and phone numbers, but scores F1=0.04 on Arabic and 0.03 on Cyrillic, losing to XLM-RoBERTa in all 13 non-Latin..."
lang: en
story: openai-s-pii-filter-wins-on-forms
publishedAt: 2026-08-05T09:25:02.627Z
sourceUrl: "https://arxiv.org/abs/2608.02616"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [pii, detection, evaluation, openai]
generatedBy: deepseek/deepseek-v4-flash-0731
---
OpenAI's Privacy Filter (OPF), a 1.5B parameter bidirectional PII detector, looks strong on paper. An independent evaluation across 42 synthetic benchmarks, 22 languages and 5 domains tells a more complicated story. The study, posted on arXiv, tests OPF in zero-shot mode against Presidio and XLM-RoBERTa, and finds that where it wins, it wins clearly, and where it loses, it collapses.

On benchmarks annotated with PII, OPF beats both baselines by a wide margin: F1=0.855 on AI4Privacy versus 0.431 for Presidio and 0.269 for XLM-RoBERTa. On SPY medical, OPF scores 0.464, again ahead of Presidio (0.273) and XLM-RoBERTa (0.111). For structurally regular PII like emails (0.78) and phone numbers (0.76), OPF is reliable. It also leads on synthetic structured PII (0.71 average) and customer support (0.60).

The problems start when the text stops looking like a form. OPF degrades sharply on narrative prose, scoring F1 between 0.04 and 0.57 across NER benchmarks. Culturally variable PII hurts too: person names score 0.40, addresses 0.49. The biggest failure is non-Latin scripts. Arabic drops to F1=0.04, Cyrillic to 0.03. XLM-RoBERTa beats OPF in all 13 Indic and non-Latin languages tested.

GPT-4o, evaluated on the same domains, leads on medical, legal and financial PII (SPY: 0.643 average, Gretel: 0.527). OPF's edge is narrow: it wins on structured and customer support data, not on the high-stakes domains where a missed PII token costs the most.

OPF also shows a systematic recall bias in customer support and medical/legal contexts, with precision between 0.31 and 0.54 and recall between 0.70 and 0.85. It over-flags. Global precision varies from 0.31 to 0.86 depending on the domain. If your pipeline sends every flagged token to a human reviewer, that bias costs you time. If it auto-redacts, it mangles legitimate text.

## What is not known

The paper does not list the 22 languages or the 5 domains concretely. It does not say which OPF version was evaluated or when it was deployed. The construction of the 42 synthetic benchmarks is not detailed, and there is no information on whether OPF was used strictly zero-shot across all of them or fine-tuned for some. Computational cost of running OPF is not mentioned. Treat the numbers as a snapshot of one model version under one evaluation setup, not as a property of OpenAI's API today.
