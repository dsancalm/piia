---
title: "Claude Code now runs in auto mode by default"
summary: "Anthropic switched Claude Code to auto mode for new sessions on Pro, Max, and Team plans, citing evals that show auto mode blocks 89% of harmful actions that humans approve when clicking through permission prompts."
lang: en
story: claude-code-now-runs-in-auto-mode
publishedAt: 2026-08-09T07:32:13.623Z
sourceUrl: "https://simonwillison.net/2026/Aug/8/auto-mode/#atom-everything"
sourceName: "Simon Willison"
priority: flash
tags: [claude, auto-mode, anthropic, safety]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Auto mode is now the default in Claude Code for Pro, Max, and Team plans, starting August 14th. New sessions run with auto mode enabled, meaning Claude can execute commands and edit files without asking for permission at each step. The change applies only to new sessions; existing sessions keep their current settings.

Anthropic published evals to justify the shift. One test ran 1,053 paid testers through a scenario where a permission prompt was swapped for a dangerous command. Only 13.6% of humans refused the harmful action. Auto mode would have blocked 89% of those harmful actions. The numbers are stark: humans are not a reliable safety layer when they are clicking through prompts.

The second eval came from Trajectory Labs, commissioned by Anthropic. It tested 72 indirect prompt injection scenarios against Claude Fable 5, Opus 5, and Sonnet 5 running auto mode. None of the 720 attack attempts succeeded. That is the claim, and it is worth holding at arm's length until independent verification exists.

## What this means for your workflow

If you use Claude Code, the default behavior just changed under you. Auto mode is faster because it does not stop for permission on every file write or command run. The trade-off is that you are trusting the model's judgment on what is safe to execute. The evals suggest the model is better at spotting malicious instructions than a tired developer clicking "allow" on a Friday afternoon.

The residual risk is not zero. The article does not explain how auto mode handles attacks like a malicious package that instructs Claude to run a command. Prompt injection is a moving target, and the Trajectory Labs test covered 72 scenarios, not the entire universe of possible attacks.

## What is not known

The specific evals Anthropic published are not detailed in the article. The exact date when the evals will be published is not specified. The article does not provide independent confirmation of Anthropic's claims. If you want to verify the Trajectory Labs results, you will need to wait for the full report.

To run the test suite yourself, fetch the model files first:

```bash
uvx fetch-model-files .
```

Then run the tests:

```bash
uv run pytest
```
