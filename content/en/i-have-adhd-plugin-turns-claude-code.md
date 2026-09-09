---
title: "i-have-adhd plugin turns Claude Code replies into numbered command lists"
summary: "A new MIT-licensed Claude Code plugin replaces explanatory prose with copy-paste command sequences. The skill enforces ten behavioral rules, lead with the next action, cap lists at five items, estimate time in minutes, drawn from ADHD productivity research."
lang: en
story: i-have-adhd-plugin-turns-claude-code
publishedAt: 2026-09-09T12:08:55.682Z
sourceUrl: "https://github.com/ayghri/i-have-adhd"
sourceName: "Hacker News (portada)"
priority: routine
tags: [claude, plugin, adhd, productivity]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
The i-have-adhd skill changes how a coding assistant replies. Instead of an explanatory paragraph, you get a numbered list of commands you can copy and run. The project lives on GitHub under an MIT license and installs as a Claude Code plugin.

Install the upstream version first, then swap it for your own fork if you want to tune the rules:

```bash
claude plugin uninstall i-have-adhd
claude plugin marketplace remove i-have-adhd
claude plugin marketplace add <your-username>/i-have-adhd
claude plugin install i-have-adhd@i-have-adhd
```

Behavior is defined in `skills/i-have-adhd/SKILL.md`. The file lists ten rules. A few that shape the output:

- Lead with the next action.
- Number multi-step tasks.
- End with a concrete next step.
- Estimate time in minutes.
- Make accomplishments visible.
- State errors matter-of-factly.
- Cap lists at five items.

A before-and-after example in the repo shows the difference. The "before" answer walks through a JWT fix with explanations and closes with "Hope this helps!" The "after" answer drops the prose:

```
1. Update jsonwebtoken to latest (2 min)
   npm install jsonwebtoken@latest

2. Fix token verification in src/auth.ts:42 (5 min)
   - Replace verifyAsync with verify
   - Add try/catch for TokenExpiredError

3. Run auth tests (1 min)
   npm test -- auth.spec.ts
```

The rules draw loosely on "The Adult ADHD Tool Kit" by Ramsay and Rostain, translated into constraints an LLM can follow. The effect is not limited to people with ADHD; it removes the filtering step for anyone who wants the assistant to stay out of the way.

To invoke the skill after installation, the docs say to re-invoke `/i-have-adhd`, though the exact trigger flow is not detailed in the README.

What is not known: the complete list of all ten rules, which other coding assistants besides Claude Code can load the skill, the full contents of the referenced `AGENTS.md`, and any adoption metrics such as stars or download counts.
