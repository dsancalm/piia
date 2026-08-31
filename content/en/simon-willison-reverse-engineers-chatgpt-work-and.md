---
title: "Simon Willison reverse-engineers ChatGPT Work and finds two products under one name"
summary: "Work splits into Work Cloud, a browser agent with full internet and code execution, and Work Local, a desktop app with filesystem access. Both require a $20/month plan."
lang: en
story: simon-willison-reverse-engineers-chatgpt-work-and
publishedAt: 2026-08-31T14:33:54.533Z
sourceUrl: "https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [openai, agents, reverse-engineering, chatgpt]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison spent a weekend reverse-engineering ChatGPT Work, the agent product OpenAI announced on July 9, 2026, and has been updating rapidly since. The result is a detailed map of what the product actually does, as opposed to how OpenAI markets it.

Work is not a single thing. It is two distinct products sharing a brand: Work Cloud, which runs in the browser and mobile apps, and Work Local, which runs in the desktop app (formerly the Codex app) with direct filesystem access and local code execution. A dropdown in the desktop app labeled "Where should this chat run?" lets you switch between them.

Access requires a $20/month subscription or higher. The $8/month Go plan and free users are locked out. The UI presents Work as a tab alongside Chat. OpenAI says to use Chat for answers, explanations, brainstorming, or short drafts, and Work for tasks with a concrete deliverable: briefs, decks, analyses, recurring updates, workflows, and reviewable files.

Work Cloud includes capabilities Chat lacks. You can select GPT-5.6 Sol, Luna, or Terra, each with reasoning levels Light, Medium, High, Extra High, Max, and Ultra. GPT-5.5 is also available at Light through Extra High. These match the model names exposed via the OpenAI API. Chat offers a different menu: 5.6 Instant, Medium, High, Extra High, and Pro. Extra High and Pro require the $100/month tier; the $20 tier tops out at High. OpenAI does not say whether Chat's models are Sol, Luna, or Terra, though Willison assumes Sol. The 5.6 Pro variant appears exclusive to Chat. Ultra, based on Codex experience, likely delegates more aggressively to sub-agents.

Work sessions bill against the Codex quota. Chat has a separate quota. This structural difference likely explains the model availability gap.

The code execution environment in Work Cloud has full internet access. It can install packages, clone GitHub repositories, call APIs, and browse the web. Chat blocks this at the container proxy level. Claude has offered restricted internet access (a short allowlist) since September 2025. Work defaults to open access and can be configured with an allowlist.

Work also ships a browser tool. It launches headless Chrome, loads pages, fills forms, takes screenshots, and runs JavaScript in the DOM. A notable security touch: the user can enter passwords and 2FA codes directly in the browser window so credentials never reach the model.

Each Work session gets a persistent scratch folder under `/workspace/scratch`, for example `/workspace/scratch/e00a0a017944`. At the time of writing there were 171 such folders. Edits in one session appear instantly in others, though processes and localhost ports are not shared.

ChatGPT Sites lets you build and deploy full web applications to Cloudflare Workers with HTML, JavaScript, server-side features, and state backed by Cloudflare D1 and R2. Sites are private by default, can be made public, and are shareable on team plans.

Sub-agents run in parallel using Sol, Luna, or Terra. Chat does not support this.

Scheduled automations let you write prompts like "run a search to see if Waymo have announced a launch date for Half Moon Bay every day at 8am". They can notify on changes or decide nothing happened. These also exist in Chat, but in Work they combine with exclusive features such as hourly Site updates.

Willison demonstrates the browser tool with a Playwright snippet extracted from a session:

```javascript
await tab.playwright.evaluate(() => {
  return Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6"), heading => ({
    level: heading.tagName.toLowerCase(),
    text: heading.innerText.trim().replace(/\s+/g, " "),
    id: heading.id || null
  }));
});
```

He also shows a typical prompt that exercises the full stack:

```
Figure out all of the places in London with a pelican in her piety, then turn that into a JSON file and build a ChatGPT sites site about them
```

The security model concerns Willison. Work combines private data access, exposure to untrusted content (web pages, cloned repos), and the ability to exfiltrate data , a "lethal trifecta" for prompt injection. OpenAI has not published defenses. Willison expects a self-review mechanism similar to Codex but there are no public details.

His core criticism: OpenAI documents Work by intent, not by mechanism. The system prompt and tool descriptions are hidden. If they were public, this reverse-engineering post would not be necessary.

What is not known
- Whether Chat's models (5.6 Instant, Medium, High, Extra High, Pro) map to Sol, Luna, or Terra.
- The exact system prompt and complete tool descriptions for Work Cloud.
- Concrete prompt-injection defenses beyond the presumed Codex-style self-review.
- Precise Codex quota consumption rates for Work sessions versus Chat's separate quota.
- Whether the code environment's default internet access is truly open or uses a hidden allowlist.
- Whether sub-agents have the same browser, code, and filesystem capabilities as the primary agent.
- Pricing and limits for ChatGPT Sites (bandwidth, D1/R2 storage, custom domains, SSL).
- Whether scheduled automations in Chat have identical functionality to Work.
- Data retention for the persistent filesystem after subscription cancellation or extended inactivity.
- Whether Work Local shares the same model architecture, quotas, and tools as Work Cloud.
