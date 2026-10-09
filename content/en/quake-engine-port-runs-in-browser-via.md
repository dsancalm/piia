---
title: "Quake engine port runs in browser via safe Rust and WebAssembly"
summary: "A full rewrite of the 1996 engine loads the shareware episode instantly with no unsafe blocks in core systems. The toolchain, exact version target, and performance data remain undisclosed."
lang: en
story: quake-engine-port-runs-in-browser-via
publishedAt: 2026-10-09T13:40:00.211Z
sourceUrl: "https://quake-srp.pages.dev/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [rust, webassembly, quake, gamedev]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A working port of the original Quake engine now runs entirely in safe Rust and loads in a browser through WebAssembly. The project, hosted at https://quake-srp.pages.dev/, reached the front page of Hacker News with 192 points and 153 comments. It demonstrates that a commercial-grade 3D engine from 1996 , complete with software rendering, BSP traversal, and the original game logic , can be translated to a memory-safe language without sprinkling `unsafe` blocks throughout the core systems.

The rewrite targets the shareware episode data (PAK0.PAK), which the page loads automatically. No installation step is required; the WASM module instantiates, compiles the shaders, and drops you into the start map within seconds on a modern desktop browser. Input, audio, and timing all run inside the sandbox. The repository has not been linked in the discussion thread, so the exact crate structure and build pipeline remain opaque. Commenters have asked whether the port uses `wasm-bindgen`, `wasm-pack`, or a custom `wasm32-unknown-unknown` workflow, but the author has not replied.

What is not known:
- Which exact Quake version the codebase mirrors (shareware, registered, or QuakeWorld).
- The proportion of safe Rust versus `unsafe` needed for FFI, WASM imports, or platform glue.
- Measured frame rates and minimum hardware requirements in the browser.
- The toolchain used to compile to WebAssembly.
- The license of the ported engine code and whether the PAK assets are redistributed or fetched separately.
- Whether multiplayer networking has been implemented or is planned.
