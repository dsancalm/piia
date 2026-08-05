---
title: "Mistral releases Shieldstral, a 3B open-weights content moderator"
summary: "The Apache 2.0 model takes moderation policies as natural-language inputs at inference time, so you can change rules without retraining. It runs on a single 16GB GPU, but benchmark details and download links are not yet public."
lang: en
story: mistral-releases-shieldstral-a-3b-open-weights
publishedAt: 2026-08-05T09:21:29.845Z
sourceUrl: "https://mistral.ai/news/shieldstral/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [moderation, open-weights, mistral, ai]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Mistral released Shieldstral, a 3B parameter open-weights classifier for multimodal content moderation. It runs on a single 16GB NVIDIA GPU and is licensed under Apache 2.0. The model outperforms classifiers up to seven times its size on text safety benchmarks.

Shieldstral treats moderation as a question-answering task. Instead of training a model for each policy, you pass the policy in natural language at inference time. The request has three parts: `<Instruct>`, `<Query>`, and `<Document>`. The model reads only the logits for "yes" and "no", normalizes them with softmax, and outputs a continuous safety score.

The policy is an input, not a fixed label set. You can change the rules for what counts as harmful without retraining. For a product with evolving moderation needs, that cuts the loop between policy change and deployment from weeks to seconds.

The model was built with LoRA and SLERP fusion of three checkpoints: one calibrated on public data, one trained on fine-grained policy discrimination from generated data, and the base instruct model. The whole pipeline ran on Mistral's Forge platform. Shieldstral is also a founding member of the Open Secure AI Alliance alongside NVIDIA.

Here is the structure the model expects:

```
<Instruct>
You are a content moderator. Decide if the content is allowed under the policy.

<Query>
[text or image content to moderate]

<Document>
[policy text in natural language]
</Document>
</Instruct>
```

You send the policy and the content in the same request. The model answers "yes" or "no" based on whether the content violates the policy.

For programmers, the practical implication is cost and latency. A 3B model on a 16GB GPU is small enough to run in production without a cluster. Since the policy is a runtime parameter, you can A/B test different moderation rules without deploying new model weights.

What is not known: the exact benchmark numbers are not in the announcement, so the "7x larger" claim has no published table behind it. The specific public datasets used for calibration are not listed. The announcement dates availability to August 4, 2026, but does not say where to download the weights. Supported input formats beyond "text and images" are not detailed.
