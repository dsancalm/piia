---
title: "SciJEPA trains scientific embeddings without citation graphs"
summary: "A new framework predicts a paper's method section from its title and abstract, then predicts the conclusion from the method section. This creates training data from single PDFs without external metadata."
lang: en
story: scijepa-trains-scientific-embeddings-without-citation-graphs
publishedAt: 2026-09-01T12:40:23.462Z
sourceUrl: "https://arxiv.org/abs/2608.28625"
sourceName: "arXiv cs.CL"
priority: routine
tags: [scientificembeddings, pretraining, citation-free, contrastivelearning]
generatedBy: dots-studio/dots-3-note-preview:free
---
SciJEPA introduces a citation-free pretraining framework for scientific document embeddings. Instead of relying on citation graphs, it exploits the internal logical structure of a paper: the title and abstract predict the method section, and the method section predicts the conclusion. This asymmetric within-document prediction creates training pairs from a single PDF without external metadata.

The authors evaluate on RELISH, high-influence citation prediction, SciDocs, and general citation prediction. A pure predictive objective is viable but underperforms a controlled contrastive baseline built from the same section pairs. Adding Sliced Isotropic Gaussian Regularization (SIGReg) closes much of that gap. The regularization strength interacts with the retrieval regime: moderate SIGReg improves fine-grained ranking, while strong regularization can weaken local alignment. Different encoder branches end up supporting different retrieval behaviors, suggesting the architecture learns distinct representation subspaces for different tasks.

The paper appears at ARTS@TALN 2026 in Nantes this June. The authors are You Zuo, Éric de la Clergerie, and Benoît Sagot from ALMAnaCH.

What is not known: the exact encoder architecture (BERT, SciBERT, Longformer, or variant), final embedding dimensionality, SIGReg hyperparameters (sigma values, loss weight, number of slices), pretraining corpus size and source, contrastive baseline details (temperature, negative count, loss formulation), exact per-task metrics (MAP, NDCG, Recall@k), compute budget and training time, whether code and weights will be released, ablations on prediction order (e.g., abstractmethodconclusion versus other chains), and generalization to non-scientific domains or other languages.
