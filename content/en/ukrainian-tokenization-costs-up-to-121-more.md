---
title: "Ukrainian tokenization costs up to 121% more than English on major LLMs"
summary: "A study of nine production tokenizers finds Ukrainian requires 68, 121% more tokens than English, rising to 220% on older models. Romanization cuts tokens only 2, 19%."
lang: en
story: ukrainian-tokenization-costs-up-to-121-more
publishedAt: 2026-08-25T07:27:46.693Z
sourceUrl: "https://arxiv.org/abs/2608.21384"
sourceName: "arXiv cs.CL"
priority: flash
tags: [tokenization, ukrainian, llm, compression]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Modern multilingual tokenizers fragment Ukrainian and other underrepresented Cyrillic-script languages more heavily than English, creating cost and context-capacity disparities. A new study quantifies this overhead across nine production tokenizers and five languages with standardized Cyrillic and Latin representations, covering 8.37 million word forms.

On a corpus benchmark using BrUK and Brown corpora, Ukrainian shows 68, 121% token overhead on modern tokenizers and 220% on the older cl100k tokenizer, measured via full-text fertility. The overhead is negatively associated with Cyrillic vocabulary allocation in the subset with independently verified English baselines (Spearman rho = , 0.536, p = 0.215, n = 7), though the correlation is not statistically significant. Across the five languages studied, tokenization efficiency favors the script more prevalent in web data.

Romanization increases Ukrainian token counts by 2, 19% on most tokenizers, confirming that script choice alone does not close the gap. The authors demonstrate two mitigation paths. At inference, LLMLingua-2 reduces Ukrainian input length by 47, 49% on an e-commerce RAG benchmark (1,536 products, 145 queries) with no compression-induced value losses among 80 retrievable cases. At tokenizer design, a balanced byte-level BPE tokenizer trained with a 200K vocabulary cap (converging at 158,184 actual entries) reduces the held-out UK/EN token ratio from 2.22x to 1.30x.

## What is not known

The paper does not name the nine production tokenizers evaluated or identify the four non-Ukrainian languages beyond English. Details of the BrUK corpus composition and size are absent. Specific token overhead percentages for the other four languages are not reported. Architecture and training details of the balanced byte-level BPE tokenizer beyond vocabulary size are missing. Latency and compute overhead of applying LLMLingua-2 compression at inference time are not measured. Whether the RAG benchmark results generalize to domains beyond e-commerce is untested. The statistical power of the correlation test (n = 7) and whether a larger sample would reach significance are not discussed. The exact definition of "compression-induced value losses" and how retrievability was measured are not provided. Computational cost of training the proposed balanced byte-level BPE tokenizer is not given.
