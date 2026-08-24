---
title: "Auto mode is now default in Claude Code for Pro, Max, and Team plans"
summary: "Starting August 14, permission prompts are replaced by a classifier that blocks 89% of dangerous commands, versus 13.6% for humans. But broad Bash allow rules are temporarily set aside, and you can opt out to get them back."
lang: en
story: auto-mode-is-now-default-in-claude
publishedAt: 2026-08-10T08:16:22.195Z
sourceUrl: "https://claude.com/blog/auto-mode-default-in-claude-code"
sourceName: "Hacker News (portada)"
priority: flash
tags: [claude, security, cli, permissions]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Auto mode is now the default in Claude Code for Pro, Max, and Team plans, starting August 14. The change means fewer permission prompts in your terminal, but it also changes how existing workflows behave, especially if you rely on broad Bash allow rules.

The key shift: when you run Claude Code, permission requests are no longer shown to you by default. Instead, a classifier decides whether a command is safe to run. You see a prompt only when the classifier is uncertain.

Anthropic ran a controlled experiment with 1,053 paid professional testers. Human review caught 13.6% of dangerous commands, while auto mode caught 89%. The numbers behind that: testers caught 143 of 1,053 dangerous commands, auto mode blocked 937, and 800 of those were commands a human had explicitly approved. Six commands were blocked by humans that auto mode allowed, but only 5% of dangerous commands were caught by humans after 50 or more prior prompts. Humans caught 17% early in a session.

Auto mode users ship about 25% more pull requests, and 97% of permission prompts get approved anyway, which suggests most prompts were noise.

The bigger issue for you: if you have allow rules like `Bash(python:*)`, they are temporarily set aside in auto mode. The classifier treats the command as it would any other. You can still opt out, and the rule returns when you do.

Some data from the same report shows why Anthropic made this call. As of June 2026, 49.5% of active CLI users have manually created a Bash allow-rule. Of those, 5% allow any shell command outright, and 43% have interpreter rules like `Bash(python:*)` or `Bash(node:*)`. That rule usage grows about 5 percentage points every 5 weeks. At the same time, 62% of users have used `bypassPermissions` or clicked "don't ask again" on Bash, and 25% of interactive sessions start in bypass permissions mode.

In production-level severity incidents (7+ out of 10), 6.3% of manually approved sessions contained a harmful action the user had not explicitly asked for, versus 2.4% of auto mode sessions.

The classifier's miss rate fell from 12% to 7% after hardening with Apollo Research. The internal red-teaming and third-party penetration testing results are only given as aggregate outcomes, so there is no public breakdown of what those tests found.

Enterprise and cloud platform users keep auto mode as opt-in for now. There is no exact date for when it becomes default there, only "in the coming month." The cost in tokens per tool call is "a small number of extra tokens," but the exact number is not published.
