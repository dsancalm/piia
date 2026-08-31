---
title: "Paper reframes LLM output projection as vector search to cut CPU latency"
summary: "The method replaces the dense vocabulary matrix multiply with an HNSW index lookup, retrieving only the top few hundred logits per token. On a CPU at batch size one, Gemma 3 270M sees an 82 percent throughput gain with reported quality parity on AlpacaEval, though exact win..."
lang: en
story: paper-reframes-llm-output-projection-as-vector
publishedAt: 2026-08-31T14:50:37.351Z
sourceUrl: "https://arxiv.org/abs/2608.27460"
sourceName: "arXiv cs.CL"
priority: routine
tags: [llm, inference, cpu, mips]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
The output projection in a large language model is a dense matrix multiply against the full vocabulary. At batch size one on a CPU, that operation is bound by memory bandwidth: every token generated forces a read of the entire embedding table. The paper reframes that step as a maximum inner product search (MIPS) problem. Instead of computing logits for every token, the model queries a vector index built on the output embeddings, retrieves a small candidate set, and scatters only those logits into a sparse vocabulary tensor.

The authors construct the index with HNSW, a graph-based approximate nearest neighbor structure. During decoding, the final hidden state becomes the query vector. The index returns the top k tokens by inner product, typically a few hundred out of a vocabulary of 100k or more. Those logits are written into a sparse tensor; the rest remain implicit zeros. The sampler then operates on this reduced support.

They evaluate on CPU with Gemma 3 270M, Llama 3.2, and Qwen 3. The headline number is an 82 percent throughput improvement for Gemma 3 270M at batch size one. Quality is measured on AlpacaEval and reported as preserved, though no win rates or length controls are disclosed.

What is not known:
- Exact sizes of the Llama 3.2 and Qwen 3 checkpoints tested
- Raw latency of the output projection before and after in milliseconds per token
- Memory footprint of the HNSW index versus the dense embedding matrix
- HNSW hyperparameters: M, efConstruction, efSearch
- Candidate set size k and its effect on recall@k
- Implementation framework, scatter kernel details, quantization scheme
- Results on GPU or with batch sizes greater than one
- Concrete AlpacaEval metrics: win rate, length-controlled win rate, average length
- Impact on perplexity or reasoning benchmarks such as MMLU or GSM8K
- Availability of code and prebuilt indices
