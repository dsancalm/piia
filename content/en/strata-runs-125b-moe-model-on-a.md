---
title: "Strata runs 125B MoE model on a single 12 GB consumer GPU"
summary: "The project uses a tiered memory strategy to keep active experts in VRAM while offloading the rest to system RAM and SSD, letting Qwen 3.8 Flash Next run locally with an OpenAI-compatible API."
lang: en
story: strata-runs-125b-moe-model-on-a
publishedAt: 2026-10-05T15:06:32.398Z
sourceUrl: "https://github.com/Niko1221/Strata"
sourceName: "Hacker News (portada)"
priority: flash
tags: [llm, local, moe, gpu]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Strata runs Qwen 3.8 Flash Next, a 125 billion parameter mixture-of-experts model, on a single consumer GPU with 12 GB of VRAM. The project targets Windows 10 or 11 and Linux with current drivers. An installer detects your hardware and selects the appropriate inference engine automatically. On first launch it downloads roughly 70 GB of weights, locks a portion of system RAM for GPU offload, and starts a local server at `http://127.0.0.1:8080`.

The server exposes an OpenAI-compatible API at `/v1` and an Anthropic-compatible endpoint at `/v1/messages`. You can point Cursor, Copilot, Claude Code, or any custom agent at `http://127.0.0.1:8080/v1` without changing client code. The model supports a 128K context window and processes long prompts in chunks of up to 8,192 tokens. Four reasoning levels (off, low, medium, high) and image input are configurable in the setup.

## Architecture and quantization

The model contains 24,576 experts. Each forward pass activates roughly 10 of them per token. Strata keeps the most frequently used experts in VRAM, stores the full set in system RAM, and offloads the remainder to CPU or an SSD lookup table. This tiered memory strategy is what lets a 125B model run on 12 GB cards.

Quantization options ship as separate downloads:

- Q2_0 and IQ2_XS: smallest footprint, highest throughput
- IQ3_S and IQ3_XXS: middle ground
- Coder variant: drops half the experts, fits in 32 GB RAM, scores 91 percent on SWE-bench Verified
- Unsloth UD-IQ4_XS (~4-bit, 94 GB) and experimental UD-Q4_K_XL (7, 8.5 tok/s on 64 GB RAM)

Benchmarks posted by the author show write speeds (generation) and read speeds (prompt processing) for several cards:

```
RTX 5070 12GB: Q2_0 94 tok/s write, 2,650 tok/s read
RX 9070 XT 16GB: Q2_0 60 tok/s write, 1,160 tok/s read
RTX 3090 24GB: estimated 100–140 tok/s write
```

Speculative decoding adds a small helper model that proposes the next tokens while the large model verifies them in parallel, yielding a 1.6× to 1.8× speedup on generation.

## Installation

On Windows, run `START-HERE.bat`. On Linux:

```bash
./setup.sh --setup
```

Both scripts pull the selected quantization, configure the backend, and launch the server. The first start takes one to three minutes while weights are memory-mapped and GPU buffers are warmed.

Multi-GPU support exists for two to three cards sharing a single model instance, but it is marked experimental. AMD on Windows cannot yet handle image inputs.

## What is not known

- Exact release date or version of the Strata build tested
- Precise license (described only as "free and open source")
- Minimum CPU model beyond an AVX2 requirement
- Measured performance on an RTX 4090 (only RTX 3090 estimates are published)
- Power draw on different GPUs
- Independent benchmark quality comparisons against the unquantized model
- Whether any telemetry leaves the machine
- Compatibility details with specific IDE extensions beyond "OpenAI-compatible"
- Update cadence or public roadmap
