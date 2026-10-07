---
title: "Chrome 155 adds native JPEG XL decoding"
summary: "The browser now reads .jxl files using a pure-Rust decoder built with stabilized SIMD intrinsics, replacing a C++ codec to remove memory-safety risk in the renderer process."
lang: en
story: chrome-155-adds-native-jpeg-xl-decoding
publishedAt: 2026-10-07T13:49:51.873Z
sourceUrl: "https://developer.chrome.com/blog/jpeg-xl-in-chrome"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [chrome, jpegxl, rust, security]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Chrome 155 ships JPEG XL decoding support. The browser now reads `.jxl` files natively, bringing a format that compresses 30 to 50 percent better than legacy JPEG while adding lossless compression, built-in HDR, and lossless JPEG transcoding. For anyone shipping images on the web, this means a single format can replace the current stack of JPEG, PNG, WebP, and AVIF variants without quality trade-offs.

The decoder is not a binding to the reference C++ library. Google rewrote it in pure Rust as `jxl-rs`. The goal was to eliminate the memory-safety surface that comes with a large C++ codec running in the renderer process. That rewrite leaned on `target_feature_11`, a Rust feature stabilized specifically to expose SIMD intrinsics without requiring `unsafe` blocks. On top of that, the team built `jxl_simd`, a portable abstraction layer modeled after the C++ Highway library, so the same high-performance kernels compile to SSE, AVX2, NEON, or WASM SIMD depending on the target.

```rust
#![feature(target_feature_11)]

#[target_feature(enable = "avx2")]
unsafe fn decode_avx2() { /* ... */ }
```

Performance is tracked on a public dashboard. The codebase undergoes continuous fuzzing and an automated AI review pipeline; neither has produced a memory-safety finding to date. Interoperability was validated through the Interop 2026 JPEG XL Investigation, which expanded the web-platform test suite to cover edge cases across browsers. The decision to ship followed years of consistent developer demand recorded in the Interop Project, where JPEG XL remained a top-voted proposal.

## What is not known

- The exact stable release date for Chrome 155.
- Market share or device coverage at launch.
- Concrete decode speed, CPU, or memory numbers versus `libjxl` C++ or AVIF on representative hardware.
- Whether Chrome will expose JPEG XL encoding APIs.
- Implementation status in Firefox, Safari, or Edge.
- Details of the AI review tooling, scope, or non-memory findings.
