---
title: "Redis creator Salvatore Sanfilippo launches ds4 for local LLMs"
summary: "The Hacker News submission reached 260 points and 68 comments. Sanfilippo's history of minimal, single-threaded C systems suggests ds4 could simplify local inference, but the site dwarfstar.sh reveals no license, supported formats, hardware needs, API shape, or benchmarks."
lang: en
story: redis-creator-salvatore-sanfilippo-launches-ds4-for
publishedAt: 2026-10-03T11:52:43.012Z
sourceUrl: "https://dwarfstar.sh/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [redis, llm, local, sanfilippo]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Salvatore Sanfilippo, the creator of Redis, has published a new project called ds4. The site is dwarfstar.sh. The submission reached 260 points and 68 comments on Hacker News. The tool is described as a way to run large language models locally.

Sanfilippo has a track record of writing small, fast systems software in C. Redis began as a side project to solve a specific caching problem and grew into a piece of infrastructure used by millions of applications. A new project from him draws attention because his design choices , single-threaded event loops, simple protocols, minimal dependencies , have influenced how many developers think about performance and operability.

Running models locally matters for latency, data privacy, cost control, and the ability to operate without an internet connection. The existing landscape includes llama.cpp, Ollama, vLLM, and kobold.cpp. Each makes different trade-offs between ease of use, hardware support, and serving throughput. A new entrant from a developer known for stripping complexity down to the essentials could shift those trade-offs.

What is not known:
- What "ds4" stands for.
- The license under which ds4 is distributed.
- Which model formats it supports (GGUF, safetensors, others).
- Hardware requirements (RAM, VRAM, CPU, GPU, Apple Silicon).
- Whether it exposes an OpenAI-compatible API, an HTTP server, a CLI, or a library.
- The implementation language.
- Performance compared with llama.cpp, Ollama, vLLM, or kobold.cpp.
- Support for quantization, GPU offloading, or long context windows.
- Release date, current version, or roadmap.
- Installation method (binary, cargo, go install, Docker, Homebrew).
- Whether it includes model management such as download, verification, or updates.
