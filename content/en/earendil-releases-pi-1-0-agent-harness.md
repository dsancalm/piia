---
title: "Earendil releases Pi 1.0 agent harness with MCP support"
summary: "The CLI tool hits 1.0 after reporting hundreds of thousands of weekly users. New features include Model Context Protocol support, Codemode for non-LLM models, lazy tool loading, and mid-conversation system message injection."
lang: en
story: earendil-releases-pi-1-0-agent-harness
publishedAt: 2026-10-02T12:57:33.583Z
sourceUrl: "https://earendil.com/posts/pi-1-0/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [cli, agents, typescript, mcp]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Earendil has released Pi 1.0, a production-ready agent harness built around minimalism and extensibility. The project reports hundreds of thousands of weekly users and an active stream of issues and pull requests. Both Pi and the new companion package Pi Durable are MIT licensed. You can install the CLI with a single command:

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

On Windows:

```powershell
powershell -c "irm https://pi.dev/install.ps1 | iex"
```

## What changed in 1.0

The release adds native Model Context Protocol support and the ability to call non-LLM models such as Jev and image models through a feature called Codemode. Virtual model extensions let you compose routing logic , for example, planning with Claude Opus and implementing with GPT while Jev selects the diff. Tools now load lazily, Anthropic models benefit from cache warming, and you can inject system messages mid-conversation. The TUI ships a new theme and runs full-screen by default.

Documentation and source live at pi.dev and github.com/earendil-works/pi.

## Pi Durable

Alongside the CLI, Earendil published Pi Durable, an experimental package for long-running agentic applications. It shares the same minimal, malleable core. The npm packages are:

```bash
npm install @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord
```

## What is not known

- Exact release date of the pre-1.0 version
- Total contributor count or merged PRs
- Performance or latency benchmarks against alternatives
- Technical architecture details for Pi Durable beyond stated principles
- Stability criteria or roadmap for Pi Durable (marked experimental)
- Backward compatibility guarantees for existing Pi configurations
- Specific image models and Jev variants supported
- Adoption metrics for Pi Durable since launch
