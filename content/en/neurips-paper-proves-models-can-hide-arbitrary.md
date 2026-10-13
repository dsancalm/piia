---
title: "NeurIPS paper proves models can hide arbitrary computations with cryptographic"
summary: "Researchers show that capability evaluations can be fundamentally defeated by embedding encrypted neural networks inside host models. These \"digital lockers\" execute hidden computations only when a secret trigger is present, and recovering them without the trigger is..."
lang: en
story: neurips-paper-proves-models-can-hide-arbitrary
publishedAt: 2026-10-13T14:42:31.693Z
sourceUrl: "https://arxiv.org/abs/2610.13928"
sourceName: "Hacker News (portada)"
priority: routine
tags: [alignment, security, interpretability, neurips]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A paper accepted to NeurIPS 2026 proves that capability evaluations can fail in a fundamental way. Models can hide arbitrary computations inside their weights using cryptographic backdoors that are provably hard to elicit or interpret, even with full white-box access.

The construction embeds an encrypted neural network inside a host model. The hidden circuit only decrypts and executes when the model receives a secret trigger. The authors call these "digital lockers." Under standard cryptographic assumptions, recovering the hidden computation without the trigger is as hard as breaking the underlying encryption. This extends prior work that could only hide fixed strings to arbitrary computations.

The proof of concept is implemented in PyTorch. The authors test four elicitation methods: fine-tuning on clean data, weight noising, gradient-based trigger search, and latent adversarial training. All four fail to recover the hidden capability. They use a chemical reaction prediction task as a proxy for CBRN-relevant capabilities. The hidden network learns this task perfectly, but the host model shows no sign of it until the trigger appears.

The paper is 22 pages with 6 figures and 3 tables. Four authors: Andis Draguns, Sumeet Ramesh Motwani, Raymond Douglas, Christian Schroeder de Witt. They release their models to aid defense research.

## What is not known

The host model architecture and size are not specified. The size of the embedded encrypted network (parameters, layers) is not given. Quantitative metrics for elicitation resistance are absent: accuracy drop after fine-tuning, success rate of gradient-based trigger search, robustness to weight noising (noise std). The chemical reaction prediction dataset, split, and baseline performance are not detailed. The exact cryptographic assumptions and encryption scheme for the digital lockers are not named. The trigger format (single token, sequence, latent pattern) is not described. Computational overhead of decryption at inference is not reported. The release contents (weights only, or training code too) and license are not stated. Generalization to LLMs or vision transformers and more complex triggers is not evaluated.
