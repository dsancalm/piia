---
title: "AMD buys Taalas to etch model weights into silicon"
summary: "The startup's chips run Llama 3.1 8B at 16,960 tokens per second, 48x faster than Nvidia GPUs. AMD will pair the tech with its Instinct-based Helios racks, betting on a cost curve where inference gets drastically cheaper for fixed models, at the price of hardware rigidity."
lang: en
story: amd-buys-taalas-to-etch-model-weights
publishedAt: 2026-08-07T07:53:51.153Z
sourceUrl: "https://www.theregister.com/systems/2026/08/06/amd-acquires-ai-chip-startup-taalas-to-boost-inference-performance-by-etching-models-into-silicon/5284344"
sourceName: "Hacker News (portada)"
priority: flash
tags: [amd, acquisition, inference, silicon]
generatedBy: deepseek/deepseek-v4-flash-0731
---
AMD has acquired Taalas, a Toronto startup that bakes model weights directly into silicon. The deal is expected to close in the fourth quarter, pending regulatory approval.

Taalas was founded in 2023. Its first test chip, HC1, was fabbed on TSMC's 6nm process and served Meta's Llama 3.1 8B at 16,960 tokens per second. When announced in February, that was 48x faster than Nvidia's GPUs and 8.5x faster than Cerebras' accelerators. The chips use mask-ROM recall fabric and SRAM recall fabric to store weights. That is what makes the speed possible: the model is not fetched from memory, it is the hardware.

AMD plans to pair its Instinct-based Helios racks with chips based on Taalas's tech. The second-gen HC2 chip targets 20 billion parameters per chip. The company claims 50 accelerators could support a trillion-parameter model, versus 2,000 Groq LPUs for the same job, and that serving such a model would cost 100x less than training a frontier model.

## What this changes for you

If you deploy LLMs, this is a bet on a different cost curve. Right now, inference cost scales with the number of tokens you generate and the hardware you rent. With weights etched into silicon, the marginal cost per token drops dramatically for a fixed model. That makes test-time scaling more attractive: you can afford to run many more inference passes per query, which is what techniques like chain-of-thought and self-consistency rely on.

The trade-off is rigidity. You cannot swap a model without swapping silicon. A re-spin of a chip takes months and costs millions, so Taalas-based hardware will only make sense for models stable enough to justify the fab run. For developers, that means planning around model versions in a way that is new. You will not be able to hot-swap from Llama 3.1 to Llama 4 on the same hardware.

The acquisition also signals where AMD thinks the bottleneck is. Nvidia sells general-purpose GPUs that run any model. Taalas sells a single model, extremely fast. If this works, it pressures the assumption that one hardware platform serves all inference workloads.

## What is not known

The terms of the acquisition were not disclosed. The exact details of how Taalas's chips work are not fully public. The specific models that will be deployed on Taalas-based accelerators are not specified. The cost and time for a re-spin are not quantified. The performance of the HC2 chip is not yet known.
