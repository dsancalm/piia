---
title: "Retrieve-for-Train swaps LLM reasoning for diffusion retrieval"
summary: "A 54M-parameter diffusion model replaces autoregressive chain-of-thought at inference, mapping query embeddings directly to diverse, grounded sub-query sets in one step."
lang: en
story: retrieve-for-train-swaps-llm-reasoning-for
publishedAt: 2026-09-16T12:05:06.737Z
sourceUrl: "https://research.google/blog/bypassing-inference-bottlenecks-accelerating-complex-ai-search-with-retrieve-for-train/"
sourceName: "Google Research"
priority: urgent
tags: [retrieval, diffusion, rl, latency]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Retrieve-for-Train moves the expensive reasoning step out of inference and into a one-time offline reinforcement-learning run. The framework targets query fan-out, the pattern where a single user request must be expanded into a coherent, complementary set of sub-queries or results. Today that expansion is usually done by a large language model at inference time, emitting hundreds of chain-of-thought tokens before the retriever ever sees a vector. Retrieve-for-Train replaces that autoregressive pass with a 53.9-million-parameter diffusion model that maps a query embedding directly to a set embedding in a single non-autoregressive step.

The pipeline has three stages. First, a fan-out language model (FOLM) , initialized from open 4B-parameter checkpoints such as Gemma3-4B or Qwen3-4B , is trained with a soft variant of GRPO. The reward combines three terms that act as mutual counterweights: Groundedness penalizes distance to the database manifold, Diversity uses Vendi Score over the generated sub-queries, and Alignment anchors those sub-queries to the original prompt. Used alone, Groundedness produces degenerate strings; adding Alignment triggers paraphrastic collapse; the Vendi Score forces semantic variety.

Second, the frozen FOLM synthesizes (query target-set) pairs offline without any human labels. Third, a lightweight diffusion retriever learns to predict the set embedding from the query embedding. At serving time the retriever runs once, delivering a diverse, grounded slate in sub-second latency.

The method is evaluated in two regimes: open-ended abstractive retrieval, where no single ground-truth set exists and quality is measured by set-level properties, and weakly supervised compositional retrieval, where weak query, reference-set pairs are available. Zero-shot LLMs in the same tasks suffer from paraphrastic collapse and the autoregressive latency bottleneck.

What remains unknown: the exact reward weights balancing Groundedness, Diversity and Alignment; the RL hyperparameters such as learning rate, batch size, training steps and KL coefficient; the diffusion architecture details including denoising steps, scheduler and embedding dimensionality; the datasets and frozen multimodal embedding backbones used in experiments; and concrete metrics , Vendi Score, recall, latency in milliseconds, throughput , alongside the baselines compared. The source cites a publication date of 15 September 2026 and ICML 2026, both in the future relative to 2025.
