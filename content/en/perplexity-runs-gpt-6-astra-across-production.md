---
title: "Perplexity runs GPT-6 Astra across production with minimal human checks"
summary: "Engineers assign tasks like service updates and release notes to Astra, which executes the full sequence. The company has not revealed what Astra is, which models it replaces, or any performance data since deployment began."
lang: en
story: perplexity-runs-gpt-6-astra-across-production
publishedAt: 2026-09-12T11:03:37.521Z
sourceUrl: "https://openai.com/index/perplexity-improving-accuracy-with-astra"
sourceName: "OpenAI"
priority: flash
tags: [perplexity, automation, ai, deployment]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Perplexity has deployed a system called GPT-6 Astra across its production environment to write internal communications, modify software, and monitor running systems. The company reports that engineers check in on Astra far less often than they did with previous models, indicating a shift toward autonomous, end-to-end operation rather than assisted coding or supervised generation.

The workflow change is structural. Instead of prompting a model for a snippet, reviewing the output, and pasting it into a repository, engineers assign Astra a task , such as updating a service, drafting the corresponding release note, and watching the deployment metrics , and the system executes the sequence. Human involvement drops to a final verification step, if that.

Perplexity has not disclosed what Astra is. The name suggests a connection to OpenAI, but no public model card, API documentation, or version history exists for "GPT-6 Astra." It is unclear whether this is a fine-tuned variant, an agent framework wrapping a base model, or an internal research artifact. The term "checks in" is also undefined: it could mean code review, manual approval gates, or simply engineers looking at dashboards less often.

No metrics have been released for defect rates, deployment frequency, or mean time to recovery since Astra took over these duties. The previous generation of models used for comparison is not named. The start date of the deployment is unknown.

What is not known
- The exact nature of Astra (model, agent system, or composite).
- The precise meaning of "checks in" , whether it refers to code review, manual intervention, or observability habits.
- Which earlier models served as the baseline.
- Quantitative changes in accuracy, latency, or incident count.
- When Perplexity began using Astra in production.
- Whether Astra originates from OpenAI or another provider.
