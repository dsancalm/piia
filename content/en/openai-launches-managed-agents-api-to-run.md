---
title: "OpenAI launches managed Agents API to run autonomous agents in the cloud"
summary: "The service runs on the Codex harness, handling orchestration, long-running sessions, and tool execution so developers do not manage infrastructure. It competes with LangGraph Cloud and AutoGen but offers no visibility into intermediate steps, versioned orchestration code..."
lang: en
story: openai-launches-managed-agents-api-to-run
publishedAt: 2026-09-11T11:52:32.070Z
sourceUrl: "https://openai.com/index/introducing-the-agents-api"
sourceName: "OpenAI"
priority: urgent
tags: [openai, agents, api, cloud]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
OpenAI has released the Agents API, a managed service for building and deploying autonomous agents in the cloud. The service runs on the Codex harness, which handles orchestration, long-running sessions, and tool use. This moves the operational burden of state persistence, session management, and infrastructure scaling off the developer and onto OpenAI's platform.

The launch positions OpenAI as a direct competitor to frameworks like LangGraph Cloud, AutoGen, and crewAI. Those tools give you full control over the orchestration logic and state machine, but they require you to provision and monitor the underlying compute. The Agents API abstracts that layer away. You send a goal and a toolset; the harness manages the loop, the context window across extended timelines, and the execution sandbox.

The trade-off is opacity and lock-in. With a self-hosted framework, you inspect every intermediate step, you version the orchestration code alongside your application, and you can run the whole stack in a VPC with your own data residency guarantees. The Agents API offers none of that visibility today. You are trusting a black-box orchestrator to make the right tool calls, manage token budgets across hours or days of activity, and handle failure recovery without a clear contract.

There is no code to show because OpenAI has not published a quickstart, SDK methods, or API reference for this specific product. The announcement describes the capability, not the interface.

### What is not known

- General availability date or access phases (beta, waitlist, invite-only).
- Pricing model: cost per session, per token, per compute second, or a flat fee.
- Technical specifications of the Codex harness: context limits, supported native tools, sandbox environment details.
- Functional overlap or migration path from the existing Assistants API and Responses API.
- SLA, uptime guarantees, regional deployment options, and compliance certifications.
