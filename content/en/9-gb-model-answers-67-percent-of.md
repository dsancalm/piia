---
title: "9 GB model answers 67 percent of Jeopardy clues since 1984"
summary: "Qwen2.5-14B quantized to 4-bit scores 67 percent on 530,000 clues without external retrieval or specialized hardware. On post-cutoff episodes it reaches 65 percent versus 95 percent for Claude Opus 4.8."
lang: en
story: 9-gb-model-answers-67-percent-of
publishedAt: 2026-09-01T12:29:57.704Z
sourceUrl: "https://arxiv.org/abs/2608.27459"
sourceName: "arXiv cs.AI"
priority: routine
tags: [llm, benchmark, jeopardy, quantization]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A 9 GB file running on a laptop now answers 67 percent of every Jeopardy! clue aired since 1984. The paper evaluates Qwen2.5-14B quantized to 4-bit against the full open dataset of 529,939 clues across 41 seasons. Under a forced-response protocol with exact and fuzzy matching, the model clears 85 percent on factoids , categories that map cleanly to discrete facts. On clues aired after the model's training cutoff, it still scores 65 percent. Claude Opus 4.8 reaches 95 percent on those same held-out clues. Watson, the 2011 system built for the televised match, scores zero by construction: its curated corpus of one billion documents was frozen before those episodes existed.

Watson required a POWER7 cluster and a knowledge base assembled specifically to contain Jeopardy! answers, then tuned on past clues. The authors treat training-data exposure as a shared condition rather than an LLM-specific flaw. The modern model compresses that preparation into a single portable weight file. No external retrieval, no curated corpus, no specialized hardware. The 9 GB artifact generalizes to knowledge it never saw during training, a property the paper frames as a "time capsule of testable human knowledge."

What is not known: the exact training cutoff date for Qwen2.5-14B, the precise forced-response and fuzzy-matching criteria, per-category or per-decade breakdowns, inference hardware and wall-clock time for the full 530k evaluation, whether the Jeopardy! dataset is publicly redistributable and under what license, how other open models (Llama, Mistral) compare on the same benchmark, and whether the model's confidence scores correlate with correctness.
