---
title: "Magnitude inference engine launches with on-device kernel tuning"
summary: "The YC S25 project compiles kernels on your hardware before first inference, claiming up to 2x throughput over llama.cpp on Apple Silicon, NVIDIA, and AMD. It ships as a single binary with an OpenAI-compatible API, runs fully offline, and releases memory when agents stop."
lang: en
story: magnitude-inference-engine-launches-with-on-device
publishedAt: 2026-10-01T13:43:07.165Z
sourceUrl: "https://github.com/magnitudedev/magnitude"
sourceName: "Hacker News (portada)"
priority: flash
tags: [inference, llm, local, ycombinator]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Magnitude is an open-source inference engine that compiles and tunes its kernels on your device before a model runs. The project launched as part of YC S25 and claims up to 2x throughput over llama.cpp on the same hardware. It ships as a single binary for macOS, Windows, and Linux. The desktop app bundles the `magnitude` CLI, so there is no separate installation step.

The engine targets Apple Silicon, NVIDIA, AMD, and plain CPU backends. Benchmarks cited in the launch show a 92% faster decode on Metal and a 19% gain on CUDA compared to llama.cpp. Memory use per agent drops roughly 27%, and that memory is released when an agent stops. Sessions share prefix caches to keep concurrent workloads from slowing each other down.

Agents connect through an OpenAI-compatible API. The launch page lists Pi, OpenCode, Hermes, and Codex as already integrated, with a one-click connection flow. Because everything runs locally, prompts, files, and model weights never leave the machine. No internet connection is required after the initial model download, and there are no token costs. The code is Apache 2.0.

Hand-optimized kernels exist for popular open-weight families, though the full supported model list lives at an external URL. The self-optimization pass runs on your hardware before the first inference, but the launch materials do not detail how long that pass takes or what heuristics drive the kernel selection.

## What is not known

Exact benchmarks for specific model and hardware combinations are not published. Installation time, disk footprint, and typical model download sizes are not provided. No technical description of the on-device tuning process is available. There is no comparison data against Ollama or LM Studio beyond the general claim of precompiled versus on-device tuning. Community support channels, issue tracking, and contribution guidelines have not been announced.
