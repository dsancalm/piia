---
title: "Anthropic replaces human code review with layered AI system"
summary: "From June to September, merged pull requests more than doubled while reverts dropped over 40 percent. Daily changes in the monorepo rose from 2,500 to over 30,000. Claude writes 90 percent of its own code and reviews most changes before humans see them."
lang: en
story: anthropic-replaces-human-code-review-with-layered
publishedAt: 2026-10-17T11:03:05.730Z
sourceUrl: "https://claude.dev/blog/solving-code-review-at-anthropic/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ai, code-review, anthropic, automation]
generatedBy: dots-studio/dots-3-note-preview:free
---
The Claude Code team at Anthropic has replaced traditional human code review with a layered automated system, and the results are measurable. From June to September, merged pull requests in their repository more than doubled in volume. Reverts dropped by over 40 percent in the same period. In the broader Anthropic monorepo, daily changes rose from 2,500 in May to over 30,000 by September. These numbers come from a process where Claude writes roughly 90 percent of its own code and reviews most changes at least once before a human ever sees them.

The goal is not to eliminate human reviewers. It is to minimize human time spent on review without increasing reverts or incidents. Review is no longer a gate at the end of a pipeline. It is continuous, like a spellcheck. Every pull request triggers a mandatory CI pipeline: linting, type checking, tests, build, and packaging. Then Claude reviews the diff. Then a security review runs. Approval is risk-based.

A risk classifier assigns each change to a tier. Tier zero requires no human. Tier one or two requires one or two humans. Some paths always require a human, regardless of tier. The classifier itself is not named in the available documentation, nor is its internal logic described. The thresholds that determine which files or paths fall into which tier are also unspecified.

After merge, changes are guarded by feature flags, released gradually, and monitored. Automated rollback triggers if metrics deviate. The team estimates that automated verification is two to three times more effective than manual review at catching issues. They measure human approvals per PR, using median and 95th percentile, along with human comment count and wait time. Reverts and incidents are the guardrails.

Supporting documents shape how Claude reviews. CLAUDE.md holds project conventions and is loaded into every review session. REVIEW.md, written by code owners, specifies what matters in their domain. The command /security-review is part of the security review flow. It is invoked directly in the pull request workflow.

This system scales because it decouples review from human attention. Humans are reserved for risk. Everything else is handled by agents with fresh context, consistent rules, and no fatigue. The process works because it is boring, repetitive, and measurable. It does not depend on individual memory or seniority. It depends on thresholds, metrics, and automation that runs on every change, every time.

What is not known: the exact name and mechanics of the risk classifier, the percentage of PRs in each tier, how risk thresholds are decided per file, historical accuracy of automated review, how false positives are handled, average human review time before and after the change, how review quality is measured beyond reverts and incidents, how the review model is trained or updated, and whether there are usage limits or costs for review agents.
