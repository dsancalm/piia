---
title: "Open-source 4B model matches GPT-5.6 Sol on retrieval at 100x lower cost"
summary: "Neon's Castform post-trains small open-weight models using Lakebase Search, turning proprietary data into training tasks. A 4B model hit GPT-5.6 Sol's retrieval accuracy for roughly $0.0003 per request versus $0.03, splitting the work between database context and model..."
lang: en
story: open-source-4b-model-matches-gpt-5
publishedAt: 2026-08-06T09:24:18.603Z
sourceUrl: "https://neon.com/blog/how-castform-neon-beats-frontier-models-on-price-and-efficiency"
sourceName: "Hacker News (portada)"
priority: flash
tags: [retrieval, post-training, open-source, cost]
generatedBy: deepseek/deepseek-v4-flash-0731
---
A 4B open-source model post-trained with Castform matched GPT-5.6 Sol on retrieval accuracy at 100x lower cost. A typical multi-turn search request with gpt-5.6-sol takes over 10 seconds and costs about $0.03 end to end. The small model does the same job for two orders of magnitude less.

The stack splits the problem in two. Neon (Lakebase Postgres) and its new search extensions handle context; Castform handles the model. Castform converts an existing corpus into training tasks and runs the RL loop that teaches an open-weight model to use that data effectively. The pipeline runs against Neon via Lakebase Search in four stages: corpus storage, synthetic data generation, RL training, and production inference.

The training loop is concrete. During training, the agent repeatedly calls Lakebase Search until it has enough context to answer. Neon branching gives each rollout an isolated database state, and time-travel queries let you reconstruct and inspect the exact state an agent encountered. The reward function grades a trace against ground truth:

```python
def run_tool(tool, tool_args):
    """Single tool: hybrid search over Lakebase."""
    if tool == "search":
        query = tool_args["query"]
        bm25 = neon.lakebase_text(query, k)
        vector = neon.lakebase_vector(query, k)
        return rrf_merge(bm25, vector, k)

def reward(trace, ground_truth):
    """Grade a trace against the ground-truth answer."""
    answer = parse_trace(trace)
    retrieval = ...    # did it retrieve the right source
    citation = ...     # did it cite the right chunk
    correctness = ...  # did it land on the right answer
    return retrieval + citation + correctness
```

Most companies do not have a clean set of tasks and reward functions ready for post-training. What they do have is large proprietary datasets: internal documentation, product logs, support articles, customer interactions, wikis, and operational databases. Castform turns that raw material into a training signal.

## Why this matters now

Around 2022 the industry was betting on embedding search; pgvector was Neon's most downloaded extension. Around 2025, agents gained traction and retrieval shifted from one-shot search to agentic retrieval. The gap between frontier and open models on this kind of task has narrowed enough that a 4B model with the right post-training beats a frontier model on cost while matching it on accuracy.

## What is not known

The source does not specify the exact per-request cost of the post-trained 4B model, only that it is 100x cheaper than GPT-5.6 Sol. It does not detail the corpus size used in the training example, the number of parallel rollouts during RL training, the total training time to reach parity, or which precision metrics were used to compare retrieval between the two models.
