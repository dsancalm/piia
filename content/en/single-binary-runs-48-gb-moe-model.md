---
title: "Single binary runs 48 GB MoE model on 32 GB laptop at 37 tokens per second"
summary: "Janas-LLM streams only the experts needed for each token from an NVMe drive, caching hot experts in RAM and using the integrated Arc GPU for dense layers."
lang: en
story: single-binary-runs-48-gb-moe-model
publishedAt: 2026-10-13T14:32:43.665Z
sourceUrl: "https://github.com/prabanta-dev/janas"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [moe, llm, inference, laptop]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A single binary now lets you run a 48 GB mixture-of-experts model on a laptop with 32 GB of RAM and an NVMe drive. Janas-LLM streams only the experts required for each token from disk, caches the hot ones in memory, and uses the integrated Arc GPU for the dense layers. On a Core Ultra 9 185H (6 P-cores, 8 E-cores, 2 LP-cores, 32 GB DDR5, Debian 13, Mesa 26.1 Vulkan) the result is 37 tokens per second generating with Qwen3-Next-80B-A3B, versus 2.8 tok/s for llama.cpp with the same model quantized to fit. Prompt processing at 1024 tokens hits 62 tok/s against llama.cpp's 16 tok/s. Every MoE model tested , Qwen3-Coder-Next, Qwen3.6-35B-A3B, Gemma-4-26B-A4B , showed the same pattern: Janas-LLM is 8 to 13 times faster on generation and roughly four times faster on prompt ingestion.

The engine is written in C with zero external dependencies. Download, extract, run:

```
curl -LO https://github.com/prabanta-dev/janas/releases/latest/download/janas-linux-x86_64.tar.gz
tar xf janas-linux-x86_64.tar.gz && cd janas
./janas-chat
```

The interactive picker downloads a pre-converted `.jns` v2 model from Hugging Face, verifies the checksum, and starts chatting. Models are read-only; the only writes go to `~/.cache/janas` and to the user-specified directory for converted weights. The cache size is controllable with `--cache <GiB>`. On first run the binary benchmarks the CPU (AVX2, FMA, F16C, AVX-VNNI) and iGPU, then locks in thread counts: 12 P-cores for prompt and single-token steps, all usable cores (P+E) when a few tokens run in parallel. Draft-token speculation (MTP) survives at 74, 89 percent on Qwen and Gemma 12B/26B variants, dropping to roughly one third on Italian prose with Qwen3.5-2B.

Windows 11 on the same hardware matches Linux generation speed and beats it 1.8× on dense-model prompt throughput (Qwen3-4B: 346 vs 193 tok/s), attributed to Intel's proprietary graphics driver. The benchmark harness runs three rounds per configuration (`janas-bench --prompt 1024 --gen 16`).

## What is not known

Performance on CPUs lacking AVX-VNNI (AMD Zen 3/4/5, ARM, pre-Alder Lake Intel). Behavior with discrete GPUs , only the integrated Arc iGPU has been tested. Scaling to slower SSDs (SATA, PCIe Gen3/4 below 5 GB/s) or HDDs. Stability on systems with less memory headroom where the aggressive expert cache can force swap and freeze the desktop. Sustained power draw and thermals. Windows 10 compatibility beyond the single Win11 26300 test. Support for quantization formats other than the published `.jns` v2 artifacts. Scaling beyond 80B parameters or to multi-GPU setups. License terms for redistribution of the converted `.jns` files. The exact mechanism behind "fast prompt" and why Q3_K weights do not use it on GPU (noted for Qwen3-30B 3-bit).
