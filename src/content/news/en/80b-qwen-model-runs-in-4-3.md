---
title: "80B Qwen model runs in 4.3 GB RAM on a Mac, claims Swiftlet project"
summary: "Swiftlet claims to run an 80B parameter Qwen model in 4.3 GB of RAM on a Mac and a 35B model on an iPhone. The HN post doesn't specify the Qwen version, quantization scheme, or inference speed, so the practicality is unclear. For programmers, the memory figure is notable."
lang: en
story: 80b-qwen-model-runs-in-4-3
publishedAt: 2026-08-04T11:34:28.317Z
sourceUrl: "https://github.com/leonickson1/Swiftlet"
sourceName: "Hacker News (portada)"
priority: flash
tags: [llm, quantization, swiftlet, memory]
generatedBy: deepseek/deepseek-v4-flash-0731
---
The Swiftlet project landed on the front page of Hacker News with a claim that sounds like a typo: run an 80B parameter Qwen model in 4.3 GB of RAM on a Mac, and a 35B model on an iPhone. The post has 204 points and 90 comments, and the code is on GitHub at https://github.com/leonickson1/Swiftlet.

For context, an 80B model in fp16 would need about 160 GB of weights alone. Getting it under 5 GB means aggressive quantization, likely down to 4-bit or lower, plus possibly some form of layer-wise offloading or sparse execution. The project page does not say which Qwen version it targets, nor the quantization scheme. That matters, because Qwen3 and Qwen2.5 have different architectures and different tolerances for low-bit weights.

What is reproducible from the public post is the headline number. You can clone the repo and try it yourself. What is not clear is the inference speed. Running an 80B model at 0.5 tokens per second is technically "running", but it is not useful for most applications. The post does not mention tokens per second on either device.

For you as a programmer, the practical takeaway is about memory budgets, not magic. If Swiftlet genuinely runs an 80B in 4.3 GB, then local deployment on a MacBook Air becomes a real option for demos, internal tools, or privacy-sensitive workloads. The iPhone claim is the harder one to evaluate: phones have tight thermal limits, and sustained inference on a 35B model will drain battery and throttle. A single query might work; a chat session probably will not.

The unknown details are significant. No exact Qwen version, no quantization method, no hardware requirements. The repo might document all of this, but the HN post does not. If you are evaluating this for a project, clone it and check the README for the actual model configuration and the device specs used in the benchmarks.

The speed numbers are also missing. Without tokens per second, you cannot compare Swiftlet against llama.cpp or MLX, which are the usual baselines for Mac and iPhone inference. The memory figure is impressive, but latency is what decides whether the model is usable in your product.

The project is early, and the HN thread will tell you whether other people have reproduced the numbers. That is where the real signal is.
