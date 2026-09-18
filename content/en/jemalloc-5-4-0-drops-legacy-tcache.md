---
title: "Jemalloc 5.4.0 drops legacy tcache knobs, adds pinned extent stats"
summary: "The release removes seven malloc_conf options without warning and replaces them with an adaptive per-bin policy. New mallctls expose HugeTLB and pinned extent usage, while a compile-time flag replaces the experimental infallible new option."
lang: en
story: jemalloc-5-4-0-drops-legacy-tcache
publishedAt: 2026-09-18T11:45:37.319Z
sourceUrl: "https://github.com/jemalloc/jemalloc/releases/tag/5.4.0"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [jemalloc, allocator, c, rust]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Jemalloc 5.4.0 landed on September 17 with over 160 commits focused on technical debt cleanup, refactoring, and bug fixes. The release removes seven legacy tcache controls, introduces observability for pinned memory mappings, and restructures core internals around an OS abstraction layer. For services written in Rust, Go, or C++ that allocate heavily, this is a drop-in upgrade that changes how thread caches adapt to load and how you inspect huge-page usage.

## Adaptive tcache policy replaces fixed knobs

The most visible breaking change removes seven non-experimental malloc_conf options: `lg_tcache_nslots_mul`, `tcache_nslots_small_min`, `tcache_nslots_small_max`, `tcache_nslots_large`, `tcache_gc_delay_bytes`, `lg_tcache_flush_small_div`, and `lg_tcache_flush_large_div`. Settings for these are now silently ignored; their corresponding `opt.*` mallctls return `ENOENT`. The replacement is a per-bin adaptive policy that adjusts fill and retention targets based on observed demand between GC events, instead of the previous fixed refill/flush logic. `tcache_ncached_max` remains supported. If you currently tune these knobs, your configuration will stop having effect without warning.

## Pinned extent tracking for HugeTLB and custom allocators

A new `EXTENT_ALLOC_FLAG_PINNED` allows custom extent allocation hooks to mark mappings as non-reclaimable , for example, HugeTLB pages , so they are preferentially reused outside the normal decay and purge pipeline. Five new mallctl interfaces expose the resulting state:

```
stats.pinned
stats.arenas.<i>.pinned
stats.arenas.<i>.extents.<j>.npinned
stats.arenas.<i>.extents.<j>.pinned_bytes
stats.arenas.<i>.mutexes.extents_pinned.{counter}
```

These report pinned memory usage and mutex contention on the pinned extent pool. If you manage huge pages manually or run on kernels with THP, this gives you direct visibility into a class of allocations that previously bypassed standard stats.

## C++ infallible new becomes a build-time option

The experimental runtime option `experimental_infallible_new` is replaced by the compile-time flag `--enable-cxx-infallible-new`. This enables compiler-level optimizations and move-constructor improvements while fixing the `new(std::nothrow)` contract. The change moves the feature out of the runtime configuration surface and into the build system.

## Core refactoring reduces future risk

The release extracts arena management, initialization, fork orchestration, and allocation dispatch from `jemalloc.c` into separate modules. The internal header graph is consolidated to eliminate circular dependencies. The ctl dispatch system is reorganized by subsystem with typed helpers replacing flow-control macros. A new OS abstraction layer moves platform-dependent operations , file I/O, time, synchronization, CPU topology, virtual memory, atfork handling, error handling, profiling, thread yield, and config access , out of the allocator core. The background thread lifecycle moves to its own module, clarifying ownership independent of PAC/HPA callers. Page allocation simplifies by replacing the PAI vtable dispatch with direct PAC/HPA calls, removing the obsolete `pai_t` abstraction. Statistics collection splits into separate gather and emit phases with descriptor-driven tables.

## Bug fixes and portability

`errno` is now preserved in `free`, `free_sized`, `free_aligned_sized`, and process_madvise-based page purging. `free_sized()` and `free_aligned_sized()` accept `NULL` per C23. Numeric overflow checks in size classes are fixed. TSD lifecycle edge cases are resolved: thread-cache bins initialize before the cache is marked enabled, and late deallocations after thread teardown no longer recreate TSD on generic-TSD platforms. `O_CLOEXEC` is used when opening the THP sysfs file. A potential deadlock in `arena_reset` is fixed. A prof-sampling and guard-page interaction bug in the sanitizer build is resolved. The base-block growth heuristic is capped to avoid virtual memory exhaustion under rare races. `malloc_getcpu` on macOS now reads the current CPU number correctly. `CLOCK_MONOTONIC` is used for background-thread sleep to prevent stalls from clock skew, with configure-time detection of monotonic condvar support. MinGW TSD cleanup on thread exit is fixed. GCC 16 warnings are resolved, including `-Wpedantic` macro and function syntax violations and `-Wstringop-truncation` from profiling thread name copies. PID-namespace symlinks are parsed without glibc-dependent `strtok`/`atol`, returning identifiers as `uint64_t`.

## What is not known

No benchmarks or comparative latency/throughput data for the adaptive tcache policy are published. The exact previous version used as baseline is not stated. The specific platforms that benefit most from the new OS abstraction layer are not enumerated. The required C/C++ standard versions for building are not documented in the release notes. The date of the next planned release is unknown.
