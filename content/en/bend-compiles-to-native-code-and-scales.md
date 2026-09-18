---
title: "Bend compiles to native code and scales to GPU without threads"
summary: "The language uses an affine dependent type theory to split work automatically across CPU and GPU, reaching 100× single‑core speed. AI‑assisted workflows declare invariants in LAWS.bend and verify them with PROOF.bend on every commit."
lang: en
story: bend-compiles-to-native-code-and-scales
publishedAt: 2026-09-18T11:37:56.358Z
sourceUrl: "https://bend-lang.com/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [language, parallelism, verification, gpu]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Bend compiles to native code. On a single core it runs nearly as fast as C. The same binary scales to 16 CPU cores and to GPUs, reaching up to 100× the single‑core speed. Parallelism is implicit: the runtime splits work in two and distributes it across all available cores without threads, locks, or manual kernels. The theoretical core is BendTT, an affine dependent type theory. The parallel runtime is BendRT for CPU and GPU.

Installation is a single command:

```bash
curl -fsSL https://bend-lang.com/install.sh | sh
```

The recommended workflow for AI‑assisted development is to run `bend guide` to learn the language, declare invariants in `LAWS.bend`, execute `bend PROOF.bend` before every commit, and parallelize wherever possible. The type checker finishes in at most one second on a medium codebase (measured on an Apple M4 Max).

`LAWS.bend` lets you state properties that no code change can break. Verification is mathematical, not test‑based. For example, a law can assert that no move sequence leads to victory:

```bend
# LAW: no move sequence leads to victory.
law you_cant_win : for moves: List<Move>
  board = replay(start(), moves) # replayed from the start
  is_won(board) == False {} # never leads to victory
```

`PROOF.bend` contains the proofs of those laws, written by the AI and checked on each commit:

```bend
# PROOF: you_cant_win holds.
def Laws.you_cant_win (moves):
  # ... written by the AI
```

The demo `pow2.bend` shows a 4,096‑core GPU run.

## What is not known

Reproducible benchmarks and the exact methodology behind the C comparison, the 100× GPU figure, and the one‑second type‑check claim are not published. Real‑world coverage of the standard library, FFI, package manager, LSP tooling, and debugger is unclear. GPU backend maturity , supported architectures, CUDA, Metal, or ROCm paths, and memory limits , has not been documented. The ergonomics of writing proofs in `PROOF.bend`, including the balance between automation and manual effort, is unspecified. Stability policy, versioning scheme, and licensing/governance model are also absent. Performance on non‑trivial workloads such as web services or data pipelines has not been demonstrated.
