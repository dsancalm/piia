---
title: "GitHub Models is gone, and CI/CD workflows that used it will fail"
summary: "GitHub retired its Models service, which gave developers a single API for multiple LLMs using the GitHub key already in Actions. Simon Willison switched to an OpenAI key with spending caps. GitHub gave no reason, and the brownout message now confirms the shutdown is final."
lang: en
story: github-models-is-gone-and-ci-cd
publishedAt: 2026-08-10T08:16:54.809Z
sourceUrl: "https://simonwillison.net/2026/Aug/9/github-models-is-now-retired/#atom-everything"
sourceName: "Simon Willison"
priority: flash
tags: [github, llm, ci-cd, api]
generatedBy: deepseek/deepseek-v4-flash-0731
---
GitHub Models has been retired. The service, which provided developers with a unified API for different LLM providers and a playground tool, is gone. A message about a "scheduled retirement brownout" now confirms the shutdown is final.

The loss hits hardest for code running in GitHub Actions. GitHub Models let you use the GitHub API key already present in the Actions environment to call LLMs, with no extra secrets or billing setup. A workflow could send prompts to multiple models through a single endpoint, and GitHub absorbed the cost.

Simon Willison, who tracked the service closely, swapped it for an OpenAI API key with a monthly spending limit. He now generates his summaries using GPT-5.6 Luna. The move took him from a zero-config setup to managing rate limits, spending caps, and keeping a secret key out of his repository.

GitHub did not share the reason for the shutdown. The service had been running since mid-2024 and was used by developers who wanted to test model outputs in CI/CD pipelines without wiring up separate accounts. With it gone, any workflow that called `github-models` endpoints will fail.

The code that triggers the brownout message is a simple HTTP response:

```
GitHub Models is temporarily unavailable as part of a scheduled retirement brownout.
```

That message is now stale. The retirement is complete.

**What is not known.** The exact date the retirement finished. Whether GitHub sent direct notifications to users of the service. The full cost or usage limits of the OpenAI key Willison now uses. And the reason GitHub decided to shut down a service that removed a common friction point for LLM experimentation in CI/CD.
