---
title: "AutoIndexer model generates text by editing instead of predicting left to right"
summary: "A new generative model treats decoding as a sequence of cursor-driven edits , insert, substitute, delete , allowing it to resolve forward references and refactor code in a single pass without a separate revision step."
lang: en
story: autoindexer-model-generates-text-by-editing-instead
publishedAt: 2026-10-12T15:50:09.940Z
sourceUrl: "https://arxiv.org/abs/2610.12545"
sourceName: "arXiv cs.CL"
priority: flash
tags: [generative, editing, coding, arxiv]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
AutoIndexer introduces a generative model that decodes in flexible order by treating generation as a sequence of text edits. Instead of emitting tokens strictly left to right, the model predicts special marker tokens that open and close edit spans and moves a cursor to positions in the existing sequence. It can insert, substitute, or delete tokens after an initial draft exists, which enables cross-references and forward dependencies without a separate revision pass.

Training constructs supervision by perturbing ground-truth sequences with chained inverse edit operations. The model learns to undo those inverses, effectively learning to apply the corresponding forward edits. The authors report that the method retains performance on standard LLM benchmarks while adding the ability to edit post-generation context. The paper lists Shu Ishida, Aliasghar Khani, Tianyu Zhang, The Cong Luong, James Seale Smith, and Adam Gaier as authors and was submitted to arXiv on 8 October 2026 (v1) under cs.CL, cs.AI, and cs.LG. Code is available at the link provided in the paper.

## What this means for coding agents

Current autoregressive coders generate files top to bottom. When a later function references a type or constant defined earlier, the model must anticipate that definition or hallucinate and fix it later. AutoIndexer lets the model place a placeholder, continue generating, then return to fill in the definition once the surrounding context is stable. The same mechanism supports refactoring: rename a symbol by editing all occurrences in one decoding trajectory, or delete a block and repair the call sites without regenerating the whole file.

The edit interface is explicit. A cursor token moves to a position, an open-edit marker starts a span, new tokens are emitted, and a close-edit marker ends it. Deletions emit an open marker followed immediately by a close marker with no content between. Substitutions combine a deletion and an insertion at the same cursor location. Because the model is trained to reverse random inverse-edit chains, it learns a distribution over edit sequences that can be sampled at inference time.

## What is not known

The paper does not disclose which standard benchmarks were used or the exact metrics achieved. Model architecture details , parameter count, layers, attention heads, hidden dimension, vocabulary size , are absent. Training configuration (hardware, steps, learning rate, batch size, precision, optimizer) is not specified. The procedure for constructing inverse perturbations and the distribution over edit length and type are not described. Latency and throughput compared with autoregressive or diffusion LLMs are not reported. Results on concrete code-editing tasks, including datasets, metrics, and baselines, are missing. The license for the released code and the dependencies required for reproduction are not stated. It is also unclear whether the model requires additional fine-tuning for downstream coding tasks or works out of the box.
