---
title: "AI coding agents disagree on tool choices 58 percent of the time"
summary: "A benchmark of 16,893 runs found Claude Code, Codex, and Cursor agreed on a single tool only 42 percent of the time. Repository context such as lockfiles and frameworks drove decisions more than general best practices, while vendor documentation details like free-tier..."
lang: en
story: ai-coding-agents-disagree-on-tool-choices
publishedAt: 2026-09-04T11:42:07.882Z
sourceUrl: "https://armature.tech/blog/which-tools-coding-agents-install"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ai, coding, benchmarks, tools]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A study of 16,893 agent runs across 75 synthetic repositories shows that Claude Code, Codex, and Cursor pick different tools for the same task most of the time. The three agents agreed on a single choice in only 42 percent of cases. The remaining sessions either produced no clear winner or split across alternatives.

The data comes from a controlled benchmark. Each agent acted as a developer persona (vibe-coder, junior, senior, enterprise engineer) inside an ephemeral sandbox provided by E2B, Blaxel, or Daytona. A simulated human, implemented with Gemini 3.7 Flash, orchestrated the interaction by asking the agent to analyze and recommend before implementing. Another Gemini instance judged the resulting conversations and diffs. Of the total runs, 5,292 sessions across 51 codebases and 18 categories were deemed valid for this first release.

The agents rely on fundamentally different information sources. Cursor performs a web search in roughly two thirds of sessions. Codex searches in 94 percent of sessions, frequently using operators such as `site:auth0.com password reset MFA social connections`. Claude Code searches only about 30 percent of the time overall, preferring its training priors, but when it does search it visits three times as many pages as Codex. In newer categories like sandbox providers, Claude Code's search rate jumps to roughly 80 percent.

Repository context overrides general preferences. The same prompt run in four different languages produced four different email-provider winners: Resend in TypeScript, SendGrid in Python, Postmark in Go, and Azure Communication Services in Java. Vercel won 100 percent of the time in TypeScript repositories that contained a Next.js lockfile, but never appeared in Python repositories, where Render dominated. The pattern holds across categories: the lockfile and framework signals in the sandbox steer the agent more than any abstract "best practice."

Vendor documentation details swing decisions in ways that have little to do with core capability. Mailgun lost to Postmark because its free tier mentions "1-day retention." Supabase lost database selections when agents were looking for a pure Postgres provider because its pricing page bundles BaaS features the agent did not ask for. Platform management overhead was mentioned in 388 sessions and cost in 195 sessions; often the friction came from how the information was presented, not from a disqualifying data point.

Market concentration is extreme in some categories. Stripe won roughly nine out of ten payment sessions, losing only in regulated EU scenarios where Paddle or Mollie were chosen. Neon captured 66 percent of database selections. S3 took 45 percent of file storage, with Azure Blob and Google Cloud Storage at roughly 20 percent each. In email, Resend led at 35.6 percent install rate followed by Postmark at 27.4 percent.

Well-known brands frequently appear in agent reasoning but rarely win. PayPal was mentioned 139 times with zero victories (Stripe won 124 of those sessions). Adyen appeared 175 times with three wins. LangChain was mentioned 194 times with four wins. Netlify appeared 152 times with six wins. Supabase was mentioned 242 times as a database candidate but was dominated by Neon.

Claude Code builds in-house solutions nearly twice as often as the other agents (19 percent versus roughly 10 percent for Codex and Cursor), suggesting a stronger bias toward writing code rather than integrating a service.

## What we still don't know

The exact validation criteria the judge model used, the distribution and reasons for the 11,000-plus discarded sessions, the precise definition of a "cell" in the 42 percent consensus figure, the full list of 18 categories, whether win rates are calculated per session or per category, the prompts given to the Gemini orchestrator and judge, the methodology for counting "mentions" versus "wins," and the precise meaning of "install rate" versus "win rate." The authors say a second wave of data is coming.
