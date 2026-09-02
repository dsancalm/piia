---
title: "Paint.NET adds AI-written Direct2D layer for Linux via Wine"
summary: "A new 180,000-line C# reimplementation of Direct2D lets Paint.NET run on Linux through Wine without the native Windows graphics stack. Maintainer Rick Brewster called the Claude-generated code \"vibe coded\" and had to fix COM reference-counting bugs and architectural..."
lang: en
story: paint-net-adds-ai-written-direct2d-layer
publishedAt: 2026-09-02T11:42:18.173Z
sourceUrl: "https://simonwillison.net/2026/Sep/2/rick-brewster/"
sourceName: "Simon Willison"
priority: flash
tags: [paintnet, linux, wine, direct2d]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Paint.NET now ships a clean-room reimplementation of Direct2D that activates when you launch the program with the `/wine` flag. The component lives in `PaintDotNet.Windows.Direct2D1.Managed.dll` and totals roughly 180,000 lines of code, all produced by Anthropic's Claude assistant. The remainder of the codebase is about 700,000 lines accumulated over more than twenty years.

Maintainer Rick Brewster described the AI-generated portion as "vibe coded," meaning it was not exhaustively reviewed before integration. He had to intervene repeatedly to fix resource-management bugs, particularly missing `AddRef()` calls on COM objects, and to steer architectural decisions that the model got wrong. Claude also reverse-engineered the mathematical formulas behind Direct2D's built-in effect library so the reimplementation could reproduce them without referencing Microsoft's headers.

```bash
paint.net /wine
```

The DLL is a managed wrapper that forwards calls to the new implementation instead of the system `d2d1.dll`. Because it is written in C#, it runs on Wine's .NET runtime without requiring the native Windows graphics stack. That closes a compatibility gap that has kept Paint.NET off Linux for years.

What is not known: the exact Paint.NET version that will include this build, its release date, what percentage of the Direct2D surface area is covered, performance compared with native Direct2D on Windows, which Claude model was used, whether the DLL ships on Windows as well, and the licensing or contribution policy for the AI-generated code.
