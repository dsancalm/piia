---
title: "commit-rewriter 0.2 adds branch targeting for history rewrites"
summary: "Simon Willison released version 0.2 of the Python tool, which now accepts a --branch flag to rewrite commit messages on any branch without checking it out first. The update addresses issue #3 and runs via uvx in an isolated environment."
lang: en
story: commit-rewriter-0-2-adds-branch-targeting
publishedAt: 2026-09-25T12:04:53.570Z
sourceUrl: "https://simonwillison.net/2026/Sep/24/commit-rewriter/"
sourceName: "Simon Willison"
priority: urgent
tags: [python, git, cli, tooling]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison released commit-rewriter 0.2 on September 24, 2026 at 8:06 pm. The Python web application rewrites commit messages, and this version adds support for branches other than the default branch. The change addresses issue #3.

You can now target a specific branch directly:

```bash
uvx commit-rewriter --branch other
```

Previously the tool operated only on the default branch. The new flag lets you clean up commit messages on feature or hotfix branches before merging without checking them out first or reaching for `git filter-branch`.

The tool runs through `uvx`, so it executes in an isolated environment without a permanent install. It rewrites history on the branch you specify. Because it rewrites history, you will need to force-push if the branch already exists on a remote. Coordinate with anyone else working on that branch.

## What is not known

- What version 0.1 contained.
- Whether the rewriting uses an LLM, deterministic rules, or an interactive prompt.
- Whether the tool modifies only local history or also pushes changes.
- How conflicts are handled on shared branches.
- If any configuration is required beyond the command-line flag.
- The project license and source repository location.
