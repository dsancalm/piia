---
title: "Refactoring pattern moves branches out of hot loops to enable vectorization"
summary: "The \"push ifs up and fors down\" idiom restructures code so a top-level function handles all branching once, then calls branch-free batch helpers over contiguous data."
lang: en
story: refactoring-pattern-moves-branches-out-of-hot
publishedAt: 2026-10-08T14:00:55.279Z
sourceUrl: "https://debasishg.github.io/blog/push-ifs-up-fors-down/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [refactoring, performance, compilers, databases]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
The idiom "push ifs up and fors down" describes a structural refactoring that moves branching logic toward the edges of a system and batch processing toward the center. The goal is to eliminate conditionals inside hot loops so the inner path becomes a straight-line, branch-free sequence that the CPU can predict and the compiler can vectorize.

TigerBeetle formalizes this as a rule: centralize control flow in a top-level function that decides what to do, then delegate how to do it to helpers that contain no branches. Matklad illustrates the mechanics with a concrete type change. A function `frobnicate(walrus: Option<Walrus>)` forces every call site to handle the `None` case inside the loop. Changing the signature to `frobnicate(walrus: Walrus)` pushes the `if` to the caller, which can filter the `Vec<Option<Walrus>>` once and pass a clean `Vec<Walrus>` to a new `frobnicate_batch(walruses)`:

```rust
let maybe_walruses: Vec<Option<Walrus>> = ...;
let walruses: Vec<Walrus> = maybe_walruses.into_iter().filter_map(|w| w).collect();
frobnicate_batch(&walruses); // never sees a None
```

The batch version iterates over a contiguous slice with no branches, enabling auto-vectorization and better instruction-cache utilization.

The same principle appears in database execution engines under the name "predicate pushdown." A query planner pushes `SELECT` and `WHERE` clauses (filters) down the tree toward the table scans, before expensive `JOIN` operators. This reduces the cardinality flowing through the join, exactly as filtering a `Vec` before mapping avoids calling the mapping function on discarded elements. The algebraic law `filter p . map f == map f . filter (p . f)` justifies this reordering when the composed predicate `p . f` simplifies to a cheap check `q` on the original input.

Category theory gives the "push if up" move a precise meaning: replacing a coproduct type `1 + Walrus` (i.e., `Option<Walrus>`) with the object `Walrus` restricts the domain to a subobject via a monomorphism. The branch disappears because the input type guarantees the condition holds. The trade-off is that the caller must now prove the precondition, which may require its own branching logic , but that logic runs once, outside the loop.

The principle has hard limits. A condition that depends on the loop element cannot be hoisted out of the loop unless the dependency is encoded in the type system. A join predicate referencing columns from both tables cannot be pushed below the join. Vectorization requires memory layout and loop structure the compiler recognizes; the idiom creates the opportunity but does not guarantee the optimization.

## What is not known

The source does not provide absolute performance numbers or memory benchmarks for the refactored code. It does not specify which compiler versions or language editions reliably auto-vectorize the resulting batch loops. It does not give a mechanical procedure for identifying loop-invariant predicates in arbitrary codebases. It does not analyze the long-term maintenance cost of pushing preconditions onto callers, such as increased coupling or duplicated validation logic. Finally, it does not extend the categorical interpretation beyond sets and monomorphisms, leaving open how the algebra behaves in other categories relevant to programming.
