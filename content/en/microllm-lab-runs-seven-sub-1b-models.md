---
title: "MicroLLM Lab runs seven sub-1B models in the browser"
summary: "A no-server page lets you prompt tiny LLMs locally via WebGPU or WASM, drawing 261 points on Hacker News. Model identities, quantization details, and the author stay hidden, and the UI offers no benchmarks or comparison tools."
lang: en
story: microllm-lab-runs-seven-sub-1b-models
publishedAt: 2026-09-29T13:23:56.044Z
sourceUrl: "https://stateofutopia.com/experiments/microllmlab/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [llm, browser, webgpu, local]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
MicroLLM Lab is a web page that lets you run seven small language models directly in your browser. No server, no account, no installation. You type a prompt, you get a response, and the whole thing happens on your machine.

The page appeared on Hacker News and collected 261 points with 91 comments. That signals real developer interest in running LLMs locally, even tiny ones. The thread ID is 49882781 if you want to read the discussion.

All models sit under 1 billion parameters. That is the constraint. They are small enough to fit in browser memory and run via WebGPU or WebAssembly, yet large enough to be useful. The landing page does not list model names or parameter counts. You must open each one to see what it is.

The implementation is opaque. It could use WebLLM, Transformers.js, or a custom WASM build. The code is not visible from the front end, and no GitHub link appears on the page. The author of stateofutopia.com is not named anywhere. The models might be quantized, pruned, or distilled versions of larger ones, but the page does not say.

You run one model at a time. No side-by-side comparison. No tokens-per-second or memory-usage readouts. The UI is minimal: a text box, a button, and a response area. No benchmarks, no settings, no model info panel.

If you are testing how far client-side inference can go, this is a good place to start. It shows what a modern browser can handle without a backend. It does not tell you how it works, who built it, or what models are inside. That remains unknown.
