---
title: "Small models fail to signal uncertainty through token entropy"
summary: "In 91 percent of tested combinations, token entropy stayed near zero regardless of correctness, making standard confidence signals useless. Semantic entropy, which clusters multiple outputs by meaning, was the only method that reliably detected errors."
lang: en
story: small-models-fail-to-signal-uncertainty-through
publishedAt: 2026-09-21T13:17:42.670Z
sourceUrl: "https://arxiv.org/abs/2609.20824"
sourceName: "arXiv cs.CL"
priority: routine
tags: [uncertainty, routing, slm, semantic-entropy]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Small language models under three billion parameters, running on consumer hardware, often fail to express uncertainty through token-level entropy. In 91 percent of dataset-model combinations tested, average token entropy stayed near zero regardless of whether the output was correct. This makes standard confidence signals useless for detecting errors or hallucinations in these models.

Researchers evaluated seven uncertainty estimation methods across seven model pairs and five standard NLU benchmarks. Only semantic entropy produced a reliable signal. The method works by sampling multiple outputs, clustering them by meaning, and measuring distributional uncertainty.

Routing uncertain queries to a larger expert model via semantic entropy improved accuracy by up to 50 percentage points. Cross-family routing, such as sending queries from SmolLM 360M to Phi-3.5-mini, averaged a 22.0 percent gain. Same-family routing averaged only 6.8 percent. The expert model's quality mattered more than architectural compatibility.

The practical takeaway is not computational savings but smart compute allocation. Spending extra tokens on sampling and routing only when uncertainty is high yields disproportionate accuracy gains. This matters for local deployments where you control the pipeline and can afford a larger model for hard cases.

The five NLU benchmarks and seven exact model pairs are not named. Details on the remaining four methods beyond token entropy, semantic entropy, and uncertainty-aware routing are missing. The semantic clustering algorithm, sample count per query, latency overhead, hardware specs, and generalization to generative tasks are all unreported. Code and data links point to CatalyzeX, DagsHub, and Hugging Face, but repository availability is not confirmed.
