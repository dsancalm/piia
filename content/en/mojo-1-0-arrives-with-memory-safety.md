---
title: "Mojo 1.0 arrives with memory safety checks and open source compiler due this year"
summary: "Modular released Mojo 1.0 on August 11, 2026, three years after the first preview. The compiler now flags invalidated references, and Python-style lambdas are supported. Nearly 200 contributors shaped the standard library."
lang: en
story: mojo-1-0-arrives-with-memory-safety
publishedAt: 2026-08-12T08:02:30.298Z
sourceUrl: "https://www.modular.com/blog/modular-26-5-mojo-1-0-is-here"
sourceName: "Hacker News (portada)"
priority: flash
tags: [mojo, programming, modular, compiler]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Mojo 1.0 is out. Modular announced it on August 11, 2026, three years after the language's first preview. The compiler and toolchain will be open sourced later this year, but the language itself now carries a stable version number.

The release is the result of a public standard library. Since Modular opened it, nearly 200 contributors have submitted over 1,100 pull requests, touching more than 200,000 lines of code. That process shaped what 1.0 includes.

Two changes matter directly to how you write Mojo. First, the language now supports Python-style lambda syntax for inline closures. Second, the compiler diagnoses memory safety issues related to reference invalidation. If you hold a reference and call `List.append`, which can reallocate the backing array, Mojo flags the invalidated reference instead of letting you read freed memory.

The `where` clauses, used for compile-time constraints, are now applied more consistently across the standard library and produce descriptive error messages. The LSP server is also more stable, which means fewer editor freezes and more reliable hover and completion.

## What ships with it

Mojo 1.0 is the base of Modular's commercial stack, MAX and Modular Cloud. MAX adds support for two new model families: GLM-5.2 and Nemotron-H, both hybrid Mamba-2 architectures. Kimi 2.5 now runs on Module V3. The open source agent skills have passed 7,200 downloads via skills.sh.

The upgrade path is straightforward:

```bash
uv pip install --upgrade mojo
uv pip install max[all]
```

One removal to plan for: the `modular` package is retired in version 26.6. The current release is 26.5, so you have one cycle to migrate anything that depends on it.

## What is not known

The announcement does not say when exactly the first 2023 preview shipped, so the gap between preview and 1.0 is approximate. Breaking changes during the 1.x phase are not detailed. No user count is given, and there is no benchmark comparing Mojo's runtime against C or Rust in this release. The open source scope is confirmed only for the compiler and toolchain; which MAX components beyond that will open is unspecified. The full changelogs for Mojo and MAX are not published in the announcement.
