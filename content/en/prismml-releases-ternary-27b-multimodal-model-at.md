---
title: "PrismML releases ternary 27B multimodal model at 5.9 GB"
summary: "Ternary Bonsai 2 27B keeps 98.2% of base performance while fitting on a 16 GB MacBook or single 24 GB GPU. Apache 2.0 license enables commercial use and local agent workflows."
lang: en
story: prismml-releases-ternary-27b-multimodal-model-at
publishedAt: 2026-09-18T11:35:03.200Z
sourceUrl: "https://prismml.com/news/bonsai-2-27b"
sourceName: "Hacker News (portada)"
priority: flash
tags: [model, compression, local, multimodal]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
PrismML has released Ternary Bonsai 2 27B, a multimodal model compressed to 5.9 GB. It uses ternary weights {-1, 0, +1} with FP16 group scaling. The effective precision is 1.76 bits per parameter. This is a 9x reduction compared to the full-precision Qwen3.8 27B base.

The model retains 98.2% of the aggregate benchmark score. It posts 83.9 against the original 85.4. It edges out Qwen3.6 27B, which scores 83.6. It supports a 262K token context window. It accepts both text and image inputs. It is released under an Apache 2.0 license.

The compression pipeline combines structured pruning with knowledge distillation. PrismML has not published the exact recipe. The result is a checkpoint that runs on consumer hardware. On an NVIDIA RTX 5090, the model hits 143 tokens per second. On an Apple M5 Max, it sustains 46.8 tokens per second via custom MLX kernels. On an RTX 4090, it draws 0.714 mWh per token. This is roughly 40% less energy than a full-precision 8B model on the same GPU.

Weights are available on Hugging Face and GitHub. CUDA and MLX inference are supported.

## What this changes for local inference

A 27B parameter model that fits in 5.9 GB VRAM or unified memory shifts the economics of local agents. You can run a model with strong reasoning, coding, vision, and tool-use capabilities on a single 24 GB GPU. There is ample headroom for KV cache at long contexts. You can also run it on a 16 GB MacBook Pro without quantization hacks.

The ternary weight format is natively supported by the provided kernels. You do not need to quantize further at inference time.

```bash
# Example MLX usage on Apple Silicon
from mlx_lm import load, generate
model, tokenizer = load("prismml/bonsai-2-27b-mlx")
generate(model, tokenizer, prompt="Write a Python function to parse JSONL", max_tokens=512)
```

The Apache 2.0 license permits commercial use and modification. The speed and efficiency numbers make hybrid local-cloud routing practical. Route simple tasks to the local 27B. Escalate only when the local model flags low confidence.

## What remains unknown

PrismML points to a forthcoming whitepaper for the exact pruning schedule, distillation loss, and per-benchmark breakdown. VRAM requirements for KV cache at 262K context with FP16 activations are not specified. There is no public guidance on fine-tuning or LoRA adaptation of the ternary weights. ROCm and Intel GPU support have not been tested. Time-to-first-token latency at 100K+ context lengths is unpublished. A 1-bit variant mentioned in a July announcement has not been released.
