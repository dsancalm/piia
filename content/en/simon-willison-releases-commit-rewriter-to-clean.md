---
title: "Simon Willison releases commit-rewriter to clean AI noise from Git history"
summary: "The new Python tool launches a local web UI so you can edit commit messages in bulk, stripping out references to private issues and the verbose markers AI coding assistants leave behind."
lang: en
story: simon-willison-releases-commit-rewriter-to-clean
publishedAt: 2026-09-14T13:53:54.869Z
sourceUrl: "https://simonwillison.net/2026/Sep/14/commit-rewriter/"
sourceName: "Simon Willison"
priority: routine
tags: [git, ai, python, tooling]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison released commit-rewriter 0.1 on September 14, 2026. It is a Python web application that rewrites commit messages in bulk. Willison built it to clean up Datasette security commits that contained references to private issues and what he calls "coding agent cruft" , the verbose, repetitive, or internal markers that AI coding assistants often leave in commit messages.

You run it with `uvx`:

```bash
uvx commit-rewriter path/to/repo
```

The command launches a local web interface. You edit the messages you want to change, then submit. Before rewriting, the tool creates a timestamped branch at the current repository state so you can revert if something goes wrong. It then rewrites every commit from the first edited one through the most recent commit.

The rewrite changes commit hashes, since Git commits are immutable and altering a message produces a new object. The timestamped branch preserves the original history.

What is not known:
- Where the source code or repository for commit-rewriter lives.
- Whether the package is published on PyPI or only runnable via `uvx` from a GitHub reference.
- The exact definition of "coding agent cruft" in this context.
- What configuration options or flags the tool accepts beyond the repository path.
- Whether it works with any Git repository or has specific requirements.
