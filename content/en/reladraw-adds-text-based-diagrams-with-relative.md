---
title: "Reladraw adds text-based diagrams with relative positioning"
summary: "Version 0.8.0 of the Apache-licensed tool lets you place nodes using keywords like \"below\" and \"right of\" instead of absolute coordinates, bridging automatic layout engines and manual canvas editors. The TypeScript parser and SVG renderer have zero runtime dependencies."
lang: en
story: reladraw-adds-text-based-diagrams-with-relative
publishedAt: 2026-09-27T12:21:51.750Z
sourceUrl: "https://github.com/reladraw/reladraw"
sourceName: "Hacker News (portada)"
priority: routine
tags: [diagrams, typescript, svg, cli]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Reladraw introduces a text-based diagram language that gives you explicit control over element placement without forcing you to manage absolute coordinates. It sits between automatic layout engines like Mermaid, Graphviz, and D2, where the algorithm decides positions, and manual canvas tools like draw.io or Excalidraw, where you drag every box by hand. The project is at version 0.8.0, licensed Apache-2.0, and the author notes the syntax is not yet stable.

The language uses relative positioning keywords , `below`, `right of`, `level with` , to describe spatial relationships. You declare nodes with a type, an identifier, and a label, then place other nodes relative to existing ones. Edges connect identifiers with optional labels and port specifications such as `from: right to: left`. The parser, layout engine, and SVG renderer are written in TypeScript with zero runtime dependencies.

A minimal architecture diagram looks like this:

```reladraw
node app "Web app"
node app.ui "Interface"
node app.api "API" below app.ui
node store "Database" right of app level with app
edge app.api -> store "queries" from: right to: left
```

Running the CLI produces an SVG file:

```bash
npm install -g reladraw
reladraw diagram.reladraw -o diagram.svg
```

You can also build from source:

```bash
npm install && npm run build
node dist/cli.js examples/arch.reladraw -o out.svg
```

The project distributes "skills" for AI coding agents (Claude Code, Codex, Cursor, Copilot) so the model can generate or edit `.reladraw` files directly:

```bash
npx skills add reladraw/reladraw -g
npx skills add reladraw/reladraw -g -a claude-code
```

Because the source is plain text, diagrams live naturally in version control and render in any browser or Markdown viewer that supports SVG. The zero-dependency runtime keeps the tool lightweight in CI pipelines.

## What is not known

- Release date for version 0.8.0.
- Layout engine performance on large or complex diagrams.
- Full syntax specification beyond the shown examples.
- Support for output formats other than SVG (PNG, PDF).
- Visual editor, IDE integrations, or live preview capabilities.
- Exact compatibility matrix for the `npx skills` command and supported agents.
- Roadmap or milestones for a stable 1.0 release.
