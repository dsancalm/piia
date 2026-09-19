---
title: "Claude Code 2.1.277 adds AGENTS.md fallback for project instructions"
summary: "The tool now reads AGENTS.md if CLAUDE.md is missing, letting developers reuse the same instruction file across multiple AI coding agents without renaming or symlinks. CLAUDE.md still takes precedence when both exist."
lang: en
story: claude-code-2-1-277-adds-agents
publishedAt: 2026-09-19T11:26:11.022Z
sourceUrl: "https://simonwillison.net/2026/Sep/18/thariq-shihipar/"
sourceName: "Simon Willison"
priority: routine
tags: [claude, agents, configuration, tooling]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Claude Code 2.1.277 adds AGENTS.md as a fallback configuration file. If the tool does not find CLAUDE.md in the working directory, it now checks for AGENTS.md and applies the same project-instruction logic. The feature ships as a built-in mod on top of a new "Claude Code mods" extensibility layer that is not yet publicly documented for custom development.

Thariq Shihipar announced the change on September 18, 2026. Simon Willison captured the announcement the same day. The mod source code is described as publicly available, though the announcement links to a generic "here" without a permanent URL in the excerpt.

The practical effect is immediate compatibility for developers who already standardize on AGENTS.md across different AI coding agents. You can drop an AGENTS.md file into a repository and Claude Code will honor it without renaming or symlinking. CLAUDE.md retains priority when both files exist.

What is not known:
- The required structure or schema for AGENTS.md content.
- The release timeline for the custom "Claude Code mods" API.
- The exact repository location of the built-in mod source code.
- Whether AGENTS.md represents an Anthropic-led standard or a community convention adopted by the tool.
