---
title: "Simon Willison builds browser FFmpeg tool with Claude to compress video"
summary: "An LLM wrote the JavaScript glue to run FFmpeg WebAssembly in the browser, turning a CLI workflow into a zero-install web utility without a backend or separate build pipeline."
lang: en
story: simon-willison-builds-browser-ffmpeg-tool-with
publishedAt: 2026-09-08T11:34:14.355Z
sourceUrl: "https://simonwillison.net/2026/Sep/7/video-compressor/"
sourceName: "Simon Willison"
priority: routine
tags: [webassembly, ffmpeg, llm, tooling]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison recorded a demo of his Equal Earth animation on a phone and wanted to publish an optimized version on his blog. Instead of installing FFmpeg locally, he used Claude Fable 5.1 inside Claude Code for web to build a browser-based compression tool powered by the FFmpeg WebAssembly build. The article describing the result was published on September 7, 2026 at 18:29.

The workflow illustrates how a large language model can generate a complete utility that runs heavy native multimedia code in the browser via WebAssembly. FFmpeg compiled to WASM has existed for years, but wiring it into a usable interface , handling file input, progress reporting, parameter selection, and output download , still requires non-trivial glue code. An LLM can produce that glue in minutes, turning a command-line workflow into a zero-install web tool.

For programmers, the takeaway is not that FFmpeg-in-WASM is new. It is that the marginal cost of wrapping existing native libraries for browser use has dropped sharply. If you have a CLI tool written in C, C++, or Rust that solves a problem, you can now ship a web version without maintaining a backend, a build pipeline for WASM, or a separate frontend project. The model writes the JavaScript bindings, the HTML UI, and the WASM module loading logic in one pass.

The pattern extends beyond video. Image processing, audio transcoding, document conversion, and scientific computing libraries that already compile to WASM become candidates for instant web front ends. The bottleneck shifts from "how do I compile this?" to "what parameters do I expose?" and "how do I stream data without blocking the main thread?"

What is not known: the original video's duration, resolution, or codec; the exact compression parameters the tool applies (bitrate, preset, CRF); the file sizes before and after optimization; a direct link to the tool or its source code; and further details about the Equal Earth animation itself.
