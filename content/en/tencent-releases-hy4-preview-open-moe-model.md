---
title: "Tencent releases Hy4 Preview open MoE model with 770B total parameters"
summary: "The new model quadruples the total parameter count of its predecessor Hy3 and expands the context window to one million tokens, but the 1.56 TB weight file demands roughly 2 TB of fast storage."
lang: en
story: tencent-releases-hy4-preview-open-moe-model
publishedAt: 2026-08-30T12:12:00.296Z
sourceUrl: "https://simonwillison.net/2026/Aug/29/hy4/"
sourceName: "Simon Willison"
priority: flash
tags: [tencent, moe, llm, open-weight]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Tencent has released Hy4 Preview, an open-weight text-only language model that pushes the open MoE frontier to 770 billion total parameters with 49 billion active. The context window sits at one million tokens, and the Hugging Face repository weighs 1.56 TB. The previous Hy3 model, released in July, topped out at 295 billion total parameters, 21 billion active, a 256,000 token context, and 598 GB on disk.

The jump in scale is significant for anyone planning to serve or fine-tune large models on their own infrastructure. A 49B active parameter count places Hy4 in the same inference budget tier as models like Nemotron 3 Ultra or Qwen2.5-72B when quantized, while the total parameter count suggests a very large expert pool. The 1.56 TB footprint means you need roughly 2 TB of fast storage just for the weights, plus overhead for KV cache at 1M context. Quantization to 4-bit brings the active weights down to roughly 25 GB, but the full MoE structure still requires loading the full expert set or an efficient offloading strategy.

The chat template shipped with the model exposes a hard constraint on reasoning control. The Jinja template defines only two modes: `high` (the default) and `no_think`. There is no `low` or `medium` setting, and the template raises an exception if you pass any other value.

```jinja
{% - if not reasoning_effort is defined %} {% - set reasoning_effort = 'high' %} {% - elif reasoning_effort not in [ 'high' , 'no_think' ] %} {% - if reasoning_effort is none %} {{- raise_exception('reasoning_effort error : None, should be no_think/high') }} {% - else %} {{- raise_exception('reasoning_effort error : ' + reasoning_effort + ', should be no_think/high') }} {% - endif %} {% - endif %}
```

Simon Willison tested the model via OpenRouter with the prompt "Generate an SVG of a pelican riding a bicycle" using the default `high` reasoning mode. The output included a truncated English reasoning trace before the SVG code. That trace consumes token budget and latency. If you want to disable it entirely you must explicitly set `reasoning_effort: "no_think"` in your request payload; there is no middle ground to cap thinking tokens at, say, 512 or 1024.

## What is not known

The exact license has not been published beyond the "open weight" label. No benchmarks or eval results for Hy4 have been released. Hardware requirements for local inference (VRAM at various quantization levels, offloading performance) are untested publicly. The MoE architecture details , number of experts, top-k routing, expert size , have not been disclosed. Pricing and availability on OpenRouter or other API providers are unconfirmed.
