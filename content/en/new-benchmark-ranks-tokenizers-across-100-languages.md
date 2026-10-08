---
title: "New benchmark ranks tokenizers across 100 languages and 20 programming languages"
summary: "Tokka-Bench evaluates seven major BPE tokenizers using five metrics and finds that deliberate vocabulary allocation beats raw size for multilingual text, while code tokenization efficiency has largely converged across recent models."
lang: en
story: new-benchmark-ranks-tokenizers-across-100-languages
publishedAt: 2026-10-08T13:58:16.489Z
sourceUrl: "https://arxiv.org/abs/2610.08794"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [tokenization, benchmark, multilingual, code]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Tokka-Bench is a new open-source framework that evaluates subword tokenizers across 100 natural languages spanning more than 30 scripts and 20 programming languages. The project compares seven BPE tokenizers: GPT-2, GPT-4, gpt-oss, Llama 3.1, Gemma 3, Qwen3, and Kimi K2. Instead of relying on a single figure of merit, it applies five complementary metrics: bytes per token, unique token coverage, subword fertility, word split rate, and vocabulary composition.

The headline finding is that vocabulary allocation strategy outweighs raw vocabulary size. A tokenizer that distributes capacity across languages deliberately can outperform a larger one that wastes space on high-resource scripts. For programming languages, the gap has largely closed. Recent tokenizers show converged efficiency on code despite divergent profiles on natural languages. This means if your workload is code-heavy, the choice among current-generation tokenizers matters less than it does for multilingual text, where low-resource language handling still varies widely.

The framework, evaluation data, and an interactive dashboard are published publicly. The paper is five pages with five figures. The authors note that the "language-aware" segmentation adapted to each writing system is a key component of the evaluation pipeline, but the precise definitions of the five metrics and the per-tokenizer, per-language numeric results are not included in the summary. The repository URLs appear as placeholders in the text, and the license for the released code and data is not specified.
