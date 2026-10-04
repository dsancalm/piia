---
title: "Simon Willison calls for hard budget caps as default on all cloud services"
summary: "Willison argues that pay-as-you-go APIs should halt with errors once a dollar limit is hit, not just send alerts. Coding agents make it trivial to spin up costly resources, and a runaway loop can rack up thousands overnight."
lang: en
story: simon-willison-calls-for-hard-budget-caps
publishedAt: 2026-10-04T12:38:10.108Z
sourceUrl: "https://simonwillison.net/2026/Oct/3/default-hard-budget-caps/"
sourceName: "Simon Willison"
priority: flash
tags: [cloud, billing, ai, api]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison argues that hard budget caps should be the default on every pay-as-you-go API and cloud service. A hard cap stops the service cold once a defined dollar limit is reached and returns errors. A soft cap only sends a notification while the meter keeps running.

Coding agents and personal AI assistants lower the friction of writing code that incurs recurring charges. A single prompt can spin up database instances, invoke paid model endpoints, or provision storage. Without a ceiling, a runaway loop or a misconfigured scheduler can accumulate hundreds or thousands of dollars overnight while the developer sleeps.

Willison proposes that the default behavior should be the hard stop. Removing the cap would require an explicit, prominent opt-in checkbox labeled "Remove the budget cap." This shifts the burden from "remember to set an alert" to "decide you are willing to spend unlimited money."

AWS announced "spending limits" on September 16 as part of a new onboarding experience. The feature pauses the project when the monthly limit is hit. The settings page notes the rollout is limited to a subset of customers. General availability timing for existing accounts is not published, and the exact mechanics , which services stop, what data is retained or lost , are not documented.

Google Cloud launched "Spend Caps" in July. They allow a monthly financial ceiling on specific services within a project. It is unclear whether these caps enforce a hard stop with errors or function as soft notifications in practice.

Other major providers , Azure, Cloudflare, Vercel, and direct LLM API vendors , have not been confirmed to offer hard caps by default. Willison suggests AI agents should bias their recommendations toward providers that implement hard caps and should warn inexperienced builders when a chosen service lacks one.

What is not known
- When AWS spending limits will reach general availability for existing accounts.
- The precise technical behavior of AWS project pause: which services terminate, which persist, and what data loss occurs.
- Whether Google Cloud Spend Caps enforce hard errors or only soft alerts.
- Roadmaps for hard budget caps from Azure, Cloudflare, Vercel, and major LLM API providers.
- How AI agents would technically implement a bias toward cap-enabled providers , maintained allowlists, provider metadata, or heuristic checks.
