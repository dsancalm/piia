---
title: "Hugging Face releases WebGPU kernel loader with 207 optimized ops"
summary: "The @huggingface/kernels package loads versioned WGSL kernels from individual repos, handling dispatch and output allocation automatically. On an Apple M4 GPU it beats ORT WebGPU by a geometric mean of 2.57x across 809 comparable cases, with extreme wins on Einsum and..."
lang: en
story: hugging-face-releases-webgpu-kernel-loader-with
publishedAt: 2026-09-02T12:12:15.407Z
sourceUrl: "https://huggingface.co/blog/webgpu-kernels"
sourceName: "Hugging Face"
priority: urgent
tags: [webgpu, kernels, huggingface, performance]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Hugging Face has released @huggingface/kernels, a minimal loader that fetches and runs versioned WebGPU kernels published as individual repositories under the webgpu-kernels organization. The initial collection contains 207 kernels covering matrix multiplications, normalizations, convolutions, attention primitives, quantization, and layout transforms. Each kernel ships with a manifest.json contract, metadata.json for provenance, test.json for correctness, bench.json for tuning, and parametrized WGSL templates written in Jinja. The package installs with `npm install @huggingface/kernels@preview` and requires a browser where `"gpu" in navigator` returns true.

The API centers on `getKernel(repoID, {version})`, which returns an invokable function that accepts typed tensors and shapes. The loader derives the output shape and dtype from the manifest and allocates the output buffer automatically. A bias-add example demonstrates broadcasting a `[3]` tensor over a `[2,3]` input to produce a `[2,3]` output. Kernels expose multiple implementation variants , equal shapes, vectorized broadcasting, scalar fallback, general broadcasting , and the runtime selects the appropriate one per call and device without changing the JavaScript surface. The contract version (currently 1) is decoupled from ONNX opsets or model revisions, so the JS interface stays stable while shader implementations evolve.

## Performance versus ORT WebGPU

Benchmarks on an Apple M4 GPU (ONNX Runtime Web 1.30.0-dev.20260826-b1f76d586a) show 809 comparable cases out of 1,756 total. The geometric mean speedup is 2.57x and the median is 1.90x, with 629 wins, 176 losses, and 4 ties. Per-operation geometric means: Add 3.52x across 5 cases (0.064 ms vs 0.227 ms), MatMul 1.14x across 29 cases (0.115 ms vs 0.131 ms), Softmax 2.11x across 12 cases (0.114 ms vs 0.240 ms), LayerNormalization 2.22x across 6 cases (0.061 ms vs 0.135 ms). Extreme outliers include a bilinear Einsum (i,ij,j at size 4096) running >10,000x faster (0.136 ms vs 1.396 ms) and a row-wise CumSum on [256,4096] running 301x faster (0.016 ms vs 4.784 ms). All timings measure GPU work only, excluding kernel load, session creation, input upload, shader compilation, and output readback.

## Fleet and the kernel card

Fleet is a browser-based benchmarking and testing suite that executes kernels on the user's hardware and, with consent, contributes private performance and correctness evidence back to the Hub. Every kernel repository includes a kernel card documenting semantics, inputs, outputs, attributes, supported dtypes, source files, and a runnable example using @huggingface/kernels. The license is Apache-2.0.

## What is not known

- Exact browser and OS matrix for WebGPU support today.
- Details of the consent and privacy model in Fleet.
- When @huggingface/kernels will leave preview and what the stable version will be.
- Which of the 207 kernels move the needle most for full-model inference (LLMs, diffusion, etc.).
- How inter-kernel dependencies are managed in complete pipelines.
- Overhead of dynamic kernel loading from the Hub in production.
- Plans for WebGPU support in Node.js or server-side environments.
