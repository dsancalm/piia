---
title: "Whiteboard open-source tool reviews AI code changes locally"
summary: "The MIT-licensed desktop app runs on macOS and Fedora, using a Rust AST-aware diff engine that collapses tests and summarizes functions as pseudocode. It vendors Code OSS for LSP navigation but does not yet support file editing or real-time shared reviews."
lang: en
story: whiteboard-open-source-tool-reviews-ai-code
publishedAt: 2026-09-25T12:07:12.201Z
sourceUrl: "https://github.com/devdotfast/whiteboard"
sourceName: "Hacker News (portada)"
priority: routine
tags: [opensource, code-review, ai, rust]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Whiteboard is an open-source desktop application (MIT licensed) that gives you a local canvas for reviewing and diagramming code changes proposed by AI agents. It runs on macOS and Fedora, and you can download the latest build from the `devdotfast/whiteboard` repository on GitHub. The welcome screen lets you connect agents such as Claude Code and Codex; once connected, you can ask the agent to compare the current branch against `main` and open the resulting review directly inside Whiteboard.

The review viewer is a semantic, AST-aware diff engine written in Rust. It summarizes large functions as pseudocode and collapses tests and documentation by default so you can focus on logic changes. A WebAssembly plugin system lets you customize how the diff viewer renders specific node types without forking the application. Agents can also write to a decision log, linking their own reasoning traces onto the canvas so you can trace requirements, implementation steps, and autonomous choices in one view.

Code navigation uses the same LSP implementation that ships with VS Code. The team vendors Code OSS rather than maintaining a patch set, noting that roughly 45 percent of the upstream VS Code codebase is Copilot-related code they do not need. Keybindings and language server support carry over, but editing files is not supported yet , a known limitation. Multi-repository reviews in a single session are limited, and shared reviews do not update in real time; you must re-share after new changes land.

Anonymous telemetry is opt-in and explicitly excludes code, diffs, text, prompts, and model outputs. A hosted team product is on the roadmap, but the developers say the core will remain self-hostable.

## What is not known
- Exact release date or current version number
- Minimum hardware or RAM requirements
- Full list of supported agents beyond Claude Code and Codex
- Pricing or launch timeline for the hosted team product
- Precise LSP language coverage
- Adoption metrics or active user counts
- Performance characteristics of the Rust diff viewer on very large repositories
- Update cadence or automation for the vendored Code OSS base
