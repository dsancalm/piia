---
title: "New open-weight search agents lead multi-hop browsing benchmarks"
summary: "Iris-mini and Iris-pro top BrowseComp, DeepSearchQA and HLE using a reproducible pipeline that converts raw hyperlink structure into retrieval-dependent training tasks."
lang: en
story: new-open-weight-search-agents-lead-multi
publishedAt: 2026-09-07T12:58:15.467Z
sourceUrl: "https://arxiv.org/abs/2609.04304"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [search, agents, benchmarks, open-weight]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Two new open-weight search agents, Iris-mini and Iris-pro, top the multi-hop browsing benchmarks with a reproducible pipeline that turns raw web hyperlink structure into training tasks. The models contain 35 billion and 397 billion total parameters, with 3 billion and 17 billion active parameters respectively, a pattern that points to a mixture-of-experts design. The authors plan to release weights, data-construction recipes, training code, and evaluation harnesses.

The pipeline starts from a web corpus and extracts hyperlink paths. Non-answer entities along those paths are rewritten as descriptive references, so the model cannot solve tasks through string matching alone. A question enters the dataset only if a reference model fails to answer it in closed-book mode but succeeds when given the supporting evidence. This filter guarantees that every training instance genuinely requires retrieval.

Training follows a procedure called SFT-RL climbing. The team alternates filtered supervised fine-tuning , applied at both trajectory and turn level , with reinforcement learning against a live search engine. A reward judge and an observation summarizer run inside the training cluster. Rollouts that exceed a length budget are interrupted at the request level and resumed from their committed prefix in the next step, keeping optimization stable without discarding partial progress.

Evaluation uses a single ReAct agent with no sub-agents and no test-time verification. Each benchmark is measured twice: once with context management enabled and once without, while tools, context limits, and the judge stay fixed. With context management on, Iris-mini scores 82.2 on BrowseComp, 84.8 on BrowseComp-ZH, 86.9 on DeepSearchQA, and 52.3 on HLE. Iris-pro scores 88.6, 85.1, 92.9, and 56.4 on the same sets. The gap between the two models is modest on the Chinese browsing benchmark but widens on DeepSearchQA, where the larger model gains nearly six points.

The paper spans twelve pages with two figures and was submitted on 3 September 2026 (arXiv:2609.04304v1).

## What is not known

The exact architecture , MoE variant, layer count, attention heads, hidden dimension , beyond the total-active parameter notation. The seed web corpus and the filtering criteria for entities and hyperlinks. The reference model used for the closed-book versus evidence filter. Hyperparameters for SFT (learning rate, batch size, epochs, context length) and for RL (algorithm such as PPO or GRPO, KL coefficient, reward shaping, step count). The rollout interruption threshold in tokens or time and the mechanics of the committed prefix resume. The concrete inference-time context management policy (pruning, summarization, sliding window). The precise train/val/test splits and whether any benchmark contamination exists. The release date and license for the promised weights and code.
