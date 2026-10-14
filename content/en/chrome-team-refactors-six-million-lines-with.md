---
title: "Chrome team refactors six million lines with Argon tool"
summary: "An internal tool named Argon separated core page handling from a six-million-line legacy folder in the Chromium codebase. The change enables live pages to move between tabs and panels without reloading and removes a whole class of browser crashes."
lang: en
story: chrome-team-refactors-six-million-lines-with
publishedAt: 2026-10-14T12:17:27.845Z
sourceUrl: "https://deepmind.google/models/gemini/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [chrome, refactoring, argon, chromium]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A tool called Argon helped the Chrome team separate the central handling of web pages from a legacy folder of roughly six million lines inside the 40-million-line Chromium codebase. The work spanned hundreds of files and produced multiple clean code changes that landed simultaneously. What would have taken months of expert engineering finished in weeks.

For the billions of Chrome users, the payoff is concrete: live pages will be able to move between tabs, side panels, and floating windows without a reload. An entire class of browser crashes disappears as a result.

The Hacker News post frames the announcement under the headline "Gemini 4 Argon" and claims the model is now available via API on a $100-per-month plan with a two-million-token context window, pricing 50 percent below Gemini 2.5 Pro, and benchmarks placing it above GPT-4o on coding and reasoning. None of those product details appear in the sourced facts. The verified material describes an internal refactoring effort, not a public model release.

What is not known:
- What "Argon" actually is , a model, an agent, or an internal tool , and how it relates to any "Gemini 4" branding.
- Technical details of how Argon generates or pipes clean changes across hundreds of files.
- When or whether the resulting Chrome capability will ship to end users.
- Quality metrics for the generated changes, such as acceptance rate or introduced bugs.
- Whether Argon is available outside Google.
- Which specific crash category is eliminated and its historical frequency.
