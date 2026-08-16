---
title: "Claude API now supports system prompts"
summary: "You can now define model behavior through a dedicated parameter. This separates instructions from user messages to prevent instruction drift and reduce token upkeep overhead during long conversations."
lang: en
story: claude-api-now-supports-system-prompts
publishedAt: 2026-08-16T20:01:57.086Z
sourceUrl: "https://platform.claude.com/docs/en/release-notes/system-prompts"
sourceName: "Hacker News (portada)"
priority: flash
tags: [anthropic, api, software]
generatedBy: google/gemma-4-26b-a4b-it:free
---
Title: Claude introduces system prompts in its API

Anthropic added support for system prompts to the Claude API. This update lets you define the behavior, persona, and context of the model through a dedicated parameter that stays separate from user messages. Previously, developers had to instruct the model within the standard conversation flow. This often caused instruction drift or led the model to ignore constraints as the chat history grew.

This change provides a structured way to manage model constraints. Isolating the system instructions reduces the chance that the model confuses developer instructions with user input. This separation is necessary when building applications that require strict adherence to specific formats, personas, or safety guardrails. It makes the behavior of the model more predictable during long conversations.

## Implementation details

The system prompt acts as a persistent layer of instruction that guides how the model interprets all subsequent user messages. You set the instruction once at the beginning of the session instead of repeating "you are a helpful assistant" in every turn. This reduces token overhead in long threads and provides a stable foundation for complex agentic workflows.

You can pass the system prompt as a top-level argument in API calls. This allows for better separation of concerns in your codebase: one part of your logic handles core instructions, while another handles dynamic user input.

What is not known:
The specific content of the internal system prompts used by Anthropic is not public. The impact of this functionality on the model's performance benchmarks remains unverified.

Source: https://news.ycombinator.com/item?id=38533611
