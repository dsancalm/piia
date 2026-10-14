---
title: "Liquid AI releases 24B MoE model with 2B active params for on-device agents"
summary: "The Apache 2.0-licensed LFM2.5-24B-A2B activates only 2 billion parameters per token, fitting in 4 GB VRAM and hitting 35 tokens per second on an M3 Max."
lang: en
story: liquid-ai-releases-24b-moe-model-with
publishedAt: 2026-10-14T12:19:23.274Z
sourceUrl: "https://huggingface.co/blog/LiquidAI/lfm25-24b-a2b"
sourceName: "Hugging Face"
priority: urgent
tags: [moe, llm, agents, apache2]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Liquid AI has released LFM2.5-24B-A2B, a mixture-of-experts model with 24 billion total parameters and 2 billion active parameters per forward pass. The weights are available on Hugging Face under an Apache 2.0 license. The architecture targets agent workloads on consumer hardware with a memory footprint under 4 GB VRAM.

The model follows Liquid's "Liquid Foundation Model" line, which replaces standard transformer attention with adaptive linear operators. In this 2.5 generation, MoE routing activates only a small fraction of the network for each token. This keeps latency low enough for interactive tool-use loops on a laptop or phone. The Apache 2.0 license permits commercial use, modification, and redistribution without copyleft obligations.

On the Hugging Face Hub, the repository provides safetensors weights and a tokenizer compatible with the `transformers` library. Loading the model in 4-bit quantization fits comfortably on an 8 GB GPU or unified-memory Mac:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_id = "LiquidAI/LFM2.5-24B-A2B"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    device_map="auto",
    torch_dtype=torch.float16,
    load_in_4bit=True,
)
```

The tokenizer uses a byte-level BPE vocabulary. The model expects a chat template with `system`, `user`, and `assistant` roles. Function calling follows the same format used in earlier LFM releases. Tool definitions go in the system prompt, and the model emits JSON arguments inside a designated `tool_calls` block.

Early community benchmarks on the OpenFunctions and BFCL leaderboards show the 2B-active model outperforming Gemma-2B and Qwen2-1.5B on multi-step tool use, though it trails the 7B and 8B dense baselines. Latency measurements on an M3 Max (4-bit, 128k context) show roughly 35 tokens per second for single-stream generation.

## What is not known
- Full context window length and whether the 128k figure applies to all quantization levels.
- Exact expert count, top-k routing value, and whether auxiliary loss is used during training.
- Performance on long-context retrieval tasks (Needle-in-a-Haystack, RULER).
- Power draw and thermal behavior during sustained agent loops on battery-powered devices.
- Whether Liquid AI provides official ONNX, Core ML, or GGUF exports for non-PyTorch runtimes.
