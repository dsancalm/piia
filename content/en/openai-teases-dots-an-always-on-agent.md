---
title: "OpenAI teases Dots, an always-on agent primitive"
summary: "A Hacker News thread with 658 points discusses an OpenAI blog post introducing Dots, described as persistent agents that run continuously without a human in the loop."
lang: en
story: openai-teases-dots-an-always-on-agent
publishedAt: 2026-09-30T12:54:40.349Z
sourceUrl: "https://openai.com/index/introducing-dots/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [openai, agents, api, hackernews]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
OpenAI has published a post titled "Introducing Dots" on its official blog. The link currently sits on the Hacker News front page with 658 points and 521 comments (thread ID 49896604). The announcement signals a new primitive for building software that acts autonomously and continuously, rather than responding to discrete requests.

The framing suggests Dots are "always-on agents." Existing OpenAI primitives , the Assistants API, the Operator research preview, and Deep Research , operate on a trigger-response loop. You send a prompt, the model plans, uses tools, and returns a result. Dots appear designed to persist beyond a single turn, maintaining state and taking action over extended periods without a human in the loop for every step.

This distinction matters for programmers because it shifts the integration pattern. Current agent workflows require the developer to manage the orchestration layer: polling for status, handling timeouts, persisting context, and re-injecting it. An always-on primitive moves that burden to the platform. You would define a goal, constraints, and available tools once. The agent then runs as a background process, surfacing results, asking for clarification, or escalating only when necessary.

The Hacker News discussion reflects immediate skepticism and curiosity. Commenters are comparing Dots to existing frameworks like LangGraph, AutoGen, and custom cron-job wrappers around the Assistants API. Several threads debate whether this is a genuine architectural shift or a managed wrapper around the same stateless models. Others raise the practical concerns that always-on systems amplify: cost predictability when an agent loops for hours, debugging non-deterministic long-running traces, and authorization scopes for agents that act on behalf of a user continuously.

No code samples, API signatures, or SDK references appear in the source article. The blog post itself is not accessible in the provided facts, so the exact programming model , whether Dots are configured via dashboard, API, or a new SDK , remains unclear.

What is not known:
- The technical definition of a Dot, its capabilities, and underlying architecture.
- Launch date, availability tier (beta, general, research), and supported subscription levels.
- Relationship to previous OpenAI agent products (Operator, Deep Research, Assistants API).
- Underlying model(s) powering Dots.
- Pricing, usage limits, or rate limits.
- Concrete use cases demonstrated in the article.
- Privacy, data retention, or local vs. cloud execution details.
