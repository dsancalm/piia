---
title: "Frontier models drive Blender headless from the command line"
summary: "Simon Willison used ChatGPT Codex on macOS to generate and iterate Blender Python scripts, rendering a pelican on a bicycle without opening the application UI. The only setup required was the standard .app download."
lang: en
story: frontier-models-drive-blender-headless-from-the
publishedAt: 2026-09-06T11:12:15.429Z
sourceUrl: "https://simonwillison.net/2026/Sep/5/blender-coding-agents-macos/"
sourceName: "Simon Willison"
priority: urgent
tags: [blender, llm, codex, 3d]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Modern frontier models handle Blender well. They output .blend files you can open and edit in the application, and they render image sequences that ffmpeg stitches into movies. Simon Willison drove Blender from ChatGPT Codex on macOS and found the setup straightforward.

The only installation step is downloading the full macOS application from blender.org and placing it in /Applications. No CLI tools, no custom Python environment, no extra configuration. Once the .app exists, the agent calls Blender’s Python API directly.

Willison’s first prompt was literal:

```
Use the already install /Applications/Blender to render a scene of a pelican riding a bicycle
```

The agent generated a Python script that Blender executed headless, producing a render. Two follow‑up prompts refined the result:

```
OK add a background and a lot of flair
```

```
OK make it a whole lot better
```

Each iteration rewrote the script, re‑ran Blender, and returned a new image. The workflow stays inside the agent conversation; you never touch Blender’s UI unless you want to inspect or tweak the resulting .blend file.

## What this changes for you

If you write code that generates 3D assets , procedural geometry, data visualizations, animation pipelines , you can hand the heavy lifting to a model that already speaks Blender’s API. The feedback loop is prompt, render, critique, repeat. No boilerplate, no context switching.

## What we don’t know

- Which specific frontier models were tested beyond ChatGPT Codex.
- The exact Blender and macOS versions used.
- Render times for the example scene.
- The final image quality beyond the textual description.
- Whether other coding agents (Claude Code, Cursor, etc.) work the same way.
- The precise Blender Python API calls the model generated.
- Cross‑version compatibility of the produced .blend files.
