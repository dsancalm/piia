---
title: "OpenRouter automatic routing can change model behavior across providers"
summary: "Mohamed Moustafa warns that OpenRouter's default failover sends identical model IDs to backends with different quantization, feature support, and parameter handling, causing inconsistent vision, reasoning, and tool-calling results."
lang: en
story: openrouter-automatic-routing-can-change-model-behavior
publishedAt: 2026-09-12T11:13:53.260Z
sourceUrl: "https://simonwillison.net/2026/Sep/11/so-you-want-to-use-openrouter/"
sourceName: "Simon Willison"
priority: urgent
tags: [openrouter, llm, routing, providers]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
OpenRouter sells itself as a single endpoint that routes requests to the cheapest available provider and fails over when one goes down. That convenience has a catch: different providers run different serving stacks, with distinct optimizations, quantization choices, and feature support. A request sent to the same model ID can behave differently depending on which backend actually serves it.

Mohamed Moustafa points out that this variability shows up in concrete ways. Some providers lack vision capability for models that advertise it. The handling of the `reasoning_effort` parameter differs across backends. If you rely on automatic routing, you cannot guarantee consistent output formatting, tool-calling behavior, or latency characteristics.

You can pin a specific provider by passing the `provider.only` parameter in your request. The exact key is `provider` with a nested `only` field set to the provider slug, for example:

```json
{
  "model": "meta-llama/llama-3.1-70b-instruct",
  "provider": {
    "only": "together"
  },
  "messages": [
    {"role": "user", "content": "Hello"}
  ]
}
```

This forces the request to Together AI and returns an error if that provider is unavailable, rather than silently falling back to another.

To discover which providers are available for a given model, call the `/models/endpoints` endpoint (note: the API path is `/api/v1/models/{model_id}/endpoints`). The response lists each provider with its slug, pricing, and context length. Example request:

```bash
curl -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  "https://openrouter.ai/api/v1/models/meta-llama/llama-3.1-70b-instruct/endpoints"
```

The payload returns an array of objects containing `provider_name`, `provider_slug`, `context_length`, and pricing per million tokens. Use the slug value in the `provider.only` field to lock routing.

If you prefer automatic routing but want visibility, log the `provider` field returned in the response metadata. It tells you which backend actually served the request.

What is not known:
- The full list of behavioral differences Moustafa categorizes as "whole set of ways" providers diverge.
- Which specific providers lack vision support or handle `reasoning_effort` differently.
- The exact parameter schema for `provider.only` beyond the slug field (for example, whether `allow_fallbacks` or `order` options exist).
- Whether OpenRouter has acknowledged the critique or plans to surface provider differences in the UI or API docs.
