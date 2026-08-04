---
title: "Cloudflare's post on running Kimi and GLM at scale hits HN front page"
summary: "The infrastructure vendor's engineering blog drew 226 points and 58 comments on Hacker News. The post covers serving open-weight models across its edge network, where the real cost difference often comes from quantization, batching, and routing rather than the model itself."
lang: en
story: cloudflare-s-post-on-running-kimi-and
publishedAt: 2026-08-04T11:37:18.281Z
sourceUrl: "https://blog.cloudflare.com/smaller-faster-safer-models/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [cloudflare, models, serving, hn]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Cloudflare published a blog post this week titled "Smaller, faster, safer: running Kimi and GLM at scale." It hit the front page of Hacker News with 226 points and 58 comments. For an infrastructure vendor's engineering blog, that is a decent signal that working programmers found something worth reading.

The post lives at https://blog.cloudflare.com/smaller-faster-safer-models/. The HN discussion is at https://news.ycombinator.com/item?id=49158581 if you want to skip the article and go straight to the comments, which is often the better move for this kind of content.

Here is what the title tells you. Kimi and GLM are open-weight models, and Cloudflare runs them on its own network. The "at scale" part is the operative phrase. Cloudflare has a Workers AI product that serves models close to users, so the engineering problem is not "can we run a model" but "can we run thousands of concurrent inferences across a distributed edge network without burning money."

The practical angle for you, if you deploy open models anywhere: the difference between a model that costs $0.02 per request and one that costs $0.002 is often not the model itself, but how you serve it. Quantization, batching, request routing, and hardware selection do more for your unit economics than switching from one 7B model to another 8B model. Cloudflare's post is presumably a case study in exactly those choices.

The "smaller" and "faster" parts are likely about model distillation or pruning, or about serving tricks like prefix caching. The "safer" part is interesting. It might mean filtering outputs, or it might mean running models in a sandboxed environment so untrusted prompts cannot escape the worker.

## What the HN thread adds

The comment section is the real value. People who actually run these models at work tend to push back on vendor claims. Expect discussion of whether Cloudflare's benchmarks are reproducible, whether the cost figures include the hidden overhead of network transfer, and whether the same optimizations work outside Cloudflare's specific hardware stack.

## What is not known

The article's full content is not in the source material I have. I cannot tell you which specific optimizations Cloudflare uses, what hardware they run on, or what "safer" means in their context. The HN thread might answer those questions, or it might not. Go read the comments first.
