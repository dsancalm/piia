---
title: "VB6 IDE runs in the browser via WebAssembly"
summary: "A client-side port by GitHub user wieslawsoltes loads the classic VB6 environment , project explorer, form designer, code editor , with no VM, Wine, or Windows license. It reached the Hacker News front page with 326 points."
lang: en
story: vb6-ide-runs-in-the-browser-via
publishedAt: 2026-10-05T15:16:27.689Z
sourceUrl: "https://wieslawsoltes.github.io/VB6/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [vb6, webassembly, legacy, ide]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A browser-hosted Visual Basic 6 IDE now exists at a static URL. The project, published by GitHub user wieslawsoltes, runs entirely client-side and reached the front page of Hacker News with 326 points and 104 comments. No installation, virtual machine, or Wine layer is required. The page loads, presents a familiar VB6 surface, and lets you interact with forms and code modules immediately.

The significance is practical. Organizations still running VB6 applications , estimated in the millions of lines of active code , typically maintain a Windows XP or Windows 7 virtual machine solely for the IDE. That VM chain breaks on modern hypervisors, requires license management, and cannot run on non-Windows hardware. A WebAssembly port removes the entire stack. You open a browser on Linux, macOS, ChromeOS, or a tablet and have a working development environment. For contractors who need to inspect a legacy codebase for a few hours, the friction drops from hours of VM setup to seconds of page load.

The implementation appears to compile the original VB6 tooling, or a compatible reimplementation, to WebAssembly. The UI renders the classic project explorer, property grid, form designer, and code editor with syntax highlighting. Files can be created and edited in the browser. Persistence uses the File System Access API where available, falling back to download/upload cycles. The project structure matches VB6 conventions: `.vbp` project files, `.frm` forms, `.bas` modules, `.cls` class modules, and `.ctl` user controls.

## What is not known

- Which VB6 language features and standard library functions are implemented.
- Whether the IDE can compile to a runnable executable or only interprets code in the browser.
- Support for ActiveX/OCX controls, COM references, or late-bound automation.
- Debugging capabilities: breakpoints, watch windows, step-through execution.
- The exact WebAssembly toolchain used (Emscripten, wasm32-wasi, custom).
- License terms and whether the source repository is public.
- Performance benchmarks against native VB6 on equivalent hardware.
- Project maturity: proof-of-concept, alpha, beta, or production-ready.
