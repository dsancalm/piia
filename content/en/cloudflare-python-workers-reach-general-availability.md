---
title: "Cloudflare Python Workers reach general availability"
summary: "CPython 3.11 runs via Pyodide on the edge with native KV, D1, and R2 bindings. Cold starts hit ~50 ms, but threading and C extensions are unsupported."
lang: en
story: cloudflare-python-workers-reach-general-availability
publishedAt: 2026-09-22T12:10:06.390Z
sourceUrl: "https://simonwillison.net/2026/Sep/21/cloudflare-python-worker/"
sourceName: "Simon Willison"
priority: urgent
tags: [cloudflare, python, wasm, serverless]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cloudflare Python Workers are now generally available after a two-year preview. The platform runs CPython 3.11 compiled to WebAssembly through Pyodide inside Cloudflare's workerd runtime, which is built on V8. This is not a wrapper or a limited emulation. It is a real Python environment executing in a sandboxed WASM module, deployed on Cloudflare's global edge network.

You get access to KV, D1, and R2 bindings directly from Python code. These are not HTTP calls to separate services. They are native integrations that behave like local APIs. Cold starts are reported around 50 milliseconds, which is competitive with JavaScript Workers and faster than most traditional serverless Python options like AWS Lambda or Google Cloud Run, especially when you factor in the edge distribution.

The local development tool is called pywrangler, available on PyPI as workers-py. It simulates the production environment by running Pyodide in WebAssembly inside V8, all bundled into a 123MB workerd binary. On the author's machine, that binary lives at node_modules/@cloudflare/workerd-darwin-arm64/bin/workerd. You can run your Python Workers locally with near-identical behavior to production.

Multiprocessing and threading are non-functional. The WebAssembly VM does not support these concurrency models. If your code relies on threads or subprocesses, it will fail. This is a hard limitation, not a temporary one. You must design around it. Use async I/O, batch operations, or offload heavy work to external services if you need parallelism.

The release was announced by Gyeongjae Choi, Dominik Picheta, and Hood Chatham. Choi and Chatham are core Pyodide maintainers. This is not a side project. It is backed by the people who built the Python-in-the-browser infrastructure that makes this possible.

What is not known: exact pricing for Python Workers compared to standard Workers, full list of supported standard library modules, third-party package compatibility beyond what Pyodide supports, precise cold start benchmarks across regions, and whether the 123MB binary size holds on Linux or Windows. The docs do not clarify if Pyodide's limitations (like no C extensions) apply here, though it is likely they do.

Python developers now have a concrete alternative to Lambda and Cloud Run for stateless, edge-deployed workloads. The tradeoff is clear: you lose threading and multiprocessing, but you gain global deployment, low latency, and first-class integration with Cloudflare's data stores. If your workload fits the async, I/O-bound model, this is a viable option. If it needs threads or C extensions, it does not.
