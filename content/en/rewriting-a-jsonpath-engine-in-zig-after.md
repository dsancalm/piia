---
title: "Rewriting a JSONPath engine in Zig after seven years of Rust"
summary: "A developer compares the structural differences when porting a RFC 9535 JSONPath implementation from Rust to Zig. The Rust version uses traits, algebraic data types, and immutable state chaining across a deep module hierarchy."
lang: en
story: rewriting-a-jsonpath-engine-in-zig-after
publishedAt: 2026-09-20T11:48:01.965Z
sourceUrl: "https://besok.github.io/posts/what-zig-felt-like-coming-from-rust/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [rust, zig, jsonpath, compiler]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Seven years of Rust production work sets a high bar: algebraic data types, lazy iterators, trait-based polymorphism, and a compiler that catches design errors before they reach CI. Rewriting a JSONPath implementation (RFC 9535) in Zig forces a confrontation with what happens when those abstractions disappear.

The Rust codebase spreads across a deep hierarchy: `src/parser/grammar/`, `src/query/segment.rs`, `src/query/selector.rs`. Each file is small and focused. Traits like `Query` and `Queryable` encode the visitor pattern at the type level, and `process` returns a new `State` at every step, chaining combinators.

```rust
pub trait Query {
    fn process<'a, T: Queryable>(&self, state: State<'a, T>) -> State<'a, T>;
}
impl Query for Segment {
    fn process<'a, T: Queryable>(&self, step: State<'a, T>) -> State<'a, T> {
        match self {
            Segment::Descendant(segment) => segment.process(step.flat_map(process_descendant)),
            Segment::Selector(selector) => selector.process(step),
            Segment::Selectors(selectors) => process_selectors(step, selectors),
        }
    }
}
```

Zig collapses the same logic into five flat files under `src/`. No traits exist at compile time. Instead, the query function inspects the concrete type of its argument and checks for a `query` method with `@hasDecl`, a form of structural typing resolved during compilation.

```zig
pub fn query(node: anytype, iteration: *JsonPathIter) !void {
    const T = switch (@typeInfo(@TypeOf(node))) {
        .pointer => |p| p.child,
        else => @TypeOf(node),
    };
    if (!@hasDecl(T, "query")) {
        return; // no compile-time trait; just checks the method exists
    }
    try node.query(iteration);
}
```

Mutability replaces the functional pipeline. Where Rust threads immutable state through `flat_map` and `map`, Zig passes a mutable `*JsonPathIter` pointer and writes into it. The parser, the model, and the query engine all share this imperative style. Recursion works the same way in both languages, but the surrounding machinery differs: Zig has no pattern matching on enums, no closures, no declarative macros. Control flow is explicit `if` and `switch`.

Tests live inline next to the code they exercise. The build script registers them explicitly:

```bash
zig build test # run all tests
zig build test -Dfilter="filter match function basic" # run one test
zig build test -Ddebug-query=true # all tests with debug
zig build compliance # compliance suite
zig build check # unit tests + compliance
```

IDE support is effectively absent. Syntax highlighting and basic autocomplete are the ceiling. The author migrated to Helix, Alacritty, and Zellij, treating the editor as a text buffer and the terminal as the IDE. The Zig compiler itself becomes the primary feedback loop: `zig build check` runs in milliseconds and catches type errors that a language server would otherwise surface.

Memory management stays manual but visible. Arena allocators appear where Rust would drop `Box` or `Rc`. There is no borrow checker to argue with, but there is also no safety net. The trade-off is deliberate: a simpler mental model, full control, and a build graph that fits in one `build.zig` file.

What is not known: the Zig version used, whether the compliance suite passes in full, exact line counts, or comparative benchmark numbers. The article reports structure and feel, not performance.
