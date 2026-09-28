---
title: "Multi-agent code judge agrees on everything and fails"
summary: "A study finds MARCH, a multi-agent code-evaluation framework, declares ties in 78, 95% of pairwise comparisons and drops accuracy to 4.4% versus 43.7% for a single model. Agents converge on identical, content-free rationales."
lang: en
story: multi-agent-code-judge-agrees-on-everything
publishedAt: 2026-09-28T14:25:36.948Z
sourceUrl: "https://arxiv.org/abs/2609.30328"
sourceName: "arXiv cs.AI"
priority: routine
tags: [llm, evaluation, multi-agent, code]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
When you wire a multi-agent system to judge code, the agents often agree with each other even when the code is different. That agreement is not consensus. It is a failure mode the paper measures directly.

The authors ran MARCH, a published multi-agent judging framework, across 80 condition-by-cell measurements on two code-judging benchmarks. They made no changes to MARCH. In 78 to 95 percent of pairwise comparisons, the framework declared both solutions equally good. The same base model judging directly reached 43.7 percent accuracy. MARCH fell to 4.4 percent. Making the problems easier or swapping in a larger judge did not move the needle.

The cause is not model capacity. The paper shows that evidence between candidates stops differing in the multi-agent loop. The agents converge on a shared, content-free rationale and call it a tie.

The contribution is not a better judge. It is two label-free measurements that detect when the judge has no ground to stand on. Neither measurement needs human labels. One gates the pipeline: when the measurement signals low grounding, the system declines to answer. Applied to MARCH, that gate raises accuracy from 20.7 percent to 36.9 percent while still answering half the comparisons.

```python
# Conceptual gating logic described in the paper
if grounding_score < threshold:
    return "ABSTAIN"
else:
    return march_judgment(solution_a, solution_b)
```

The gate does not fix the judge. It prevents the judge from guessing. In production, that means your automated review pipeline can route the uncertain half to a human instead of shipping a coin flip.

## What is not known

The paper does not name or describe the two label-free measurements. It does not identify the two benchmarks. It does not detail MARCH's agent architecture, prompts, or communication protocol. It asserts that evidence stops differing but does not explain the mechanism. The "easier problems" and "larger judge" ablations are mentioned without parameters. No repository, dataset, or code release is referenced.
