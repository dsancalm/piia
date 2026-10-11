---
title: "Talorys runs a personal AI agent on Cloudflare free tier with one command"
summary: "The installer deploys a private Worker, Pages frontend, and Durable Object SQLite database entirely inside your account. No external backend, no developer API keys, and all data stays in your Cloudflare project."
lang: en
story: talorys-runs-a-personal-ai-agent-on
publishedAt: 2026-10-11T13:14:23.149Z
sourceUrl: "https://github.com/rociiu/talorys"
sourceName: "Hacker News (portada)"
priority: flash
tags: [cloudflare, ai-agent, durable-objects, self-hosted]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Talorys is a personal AI agent that runs entirely inside your own Cloudflare account on the free tier. You install it with a single command and get a chat interface with streaming responses, durable memory, task and project management, and scheduled automations like daily digests or recurring reminders. There is no external backend, no database to provision, and no account with the Talorys developers. The installer creates a private Worker, a Pages frontend, and a Durable Object backed by SQLite, all wired together with service bindings so the Worker never receives a public URL.

The architecture is deliberately minimal. Your browser talks to a Pages Function at `/api`, which uses a service binding to reach a private Hono Worker. That Worker instantiates a single Durable Object named `personal-agent`. Inside the object, SQLite stores conversations, memories, tasks, notes, projects, automations, sessions, settings, and usage counters. Workers AI runs the model `@cf/zai-org/glm-4.7-flash` for chat and tool calling. Alarms on the Durable Object drive reminders and recurring schedules. If the AI quota runs out, the chat warns you and resumes after the daily reset; everything else keeps working.

```
Browser ──HTTPS──▶ Cloudflare Pages (React app + /api Pages Function)
│ service binding (no public URL)
▼ Private Worker (Hono router)
│ getAgentByName("personal-agent")
▼ TalorysAgent — Cloudflare Agents SDK Durable Object
├─ SQLite: conversations, memories, tasks, notes, projects,
│ automations, sessions, settings, usage
├─ Workers AI: @cf/zai-org/glm-4.7-flash (streaming + tool calling)
└─ Alarms: reminders and recurring schedules
```

Authentication happens in the Worker, not the frontend. The installer hashes your owner password with PBKDF2-SHA256 and stores it as a secret. A 256-bit session secret signs cookies. Chat uses end-to-end Server-Sent Events. The private Worker is deployed with `workers_dev: false` and `preview_urls: false`, so it has no public hostname.

```
npx create-talorys@latest
```

The installer checks for Node.js 22+, handles OAuth login, picks an account and agent name, asks for the password, generates the session secret and unique resource names, deploys the Worker and Pages project, runs a health check that does not invoke AI, and prints the `*.pages.dev` URL. It creates a `talorys/` directory with `talorys.json` (metadata only, no secrets) and deployable artifacts for future updates. Re-running the command resumes without duplicating resources or re-prompting for the password. A non-interactive mode exists for CI:

```
TALORYS_OWNER_PASSWORD=... npx create-talorys@latest --yes --account-id <id>
```

This requires a `CLOUDFLARE_API_TOKEN` with permissions for Workers Scripts (Edit), Cloudflare Pages (Edit), Workers AI (Read), Account Settings (Read), and optionally User Details (Read).

All data lives in one Durable Object SQLite database in your account. No telemetry, analytics, or tracking is sent to the developers. Cloudflare processes data for its own services, including Workers AI inference on your messages and relevant memories. The security model and mitigations are documented in `docs/security.md`.

Guardrails are configurable in Settings > AI: max output tokens, max context tokens (old history is summarized), max tool calls and reasoning steps, max AI requests per day, and max scheduled AI runs per day. Simple reminders and digests never use AI. A Usage panel shows local estimates and links to the Cloudflare dashboard for exact Neuron counts.

Local development needs Node.js 22+. Clone the repo, run `npm install`, then `npm run dev` starts the Worker on port 8787, the Pages Function proxy on 8788, and the Vite UI on 5173 in one terminal. A `.dev.vars` file is created with a default password `talorys-dev-password` (or `TALORYS_DEV_PASSWORD`). A deterministic mock AI provider runs without a Cloudflare login. State persists in `.wrangler/state`.

```
npm run build
npm test
npm run test:e2e
npm run test:pack
npm run typecheck
npm run lint
```

Backups export `talorys-backup.json` with conversations, memories, tasks, notes, projects, settings, and automations. Sessions and credentials are never included. Import validates and merges in a single transaction; re-importing is harmless. If the timezone changes, retained automations are rescheduled.

Updates run from the `talorys/` directory:

```
npx create-talorys@latest update
```

This redeploys the Worker and frontend to the same resources. The Durable Object namespace is not recreated; migrations are append-only and run automatically and transactionally on the first request. Password and sessions are preserved. Extra commands include `status` and `doctor`.

Troubleshooting: re-run the installer if it was interrupted. New `pages.dev` hostnames can take minutes to pass health checks. Permission errors mean the account lacks Workers/Pages edit rights or the token misses the required scopes. Exhausted AI quota: wait for the daily reset or enable Demo mode in Settings > AI. Failed login lockout lasts 15 minutes; reset the password with `npx create-talorys@latest reset-password` from the `talorys/` directory. The `doctor` command runs automated checks.

The repository layout separates concerns: `apps/agent` (private Worker, Hono, TalorysAgent, tools, SQLite repos), `apps/web` (React + Vite, Pages Function), `packages/shared` (Zod schemas, types, recurrence/DST logic, password hashing), `packages/create-talorys` (npm installer), `tests/e2e` (Playwright), `tests/smoke` (optional real deployment test), and `docs/` (architecture, deployment, development, security, semantic recall, troubleshooting).

What is not known: the exact daily Neuron quota on the current Cloudflare Workers AI free plan; concrete numeric limits for requests per day, Durable Objects usage, and SQLite storage on the free tier; typical propagation time for health checks on new `*.pages.dev` hostnames; details of Cloudflare's Workers AI privacy policy and terms (link not provided); the exact schema of append-only database migrations; typical end-to-end latency of streaming SSE chat; maximum capacity of memories, tasks, notes, projects, and automations before performance degrades; support for AI models other than `@cf/zai-org/glm-4.7-flash`; the procedure for migrating data between Cloudflare accounts; and compatibility with Cloudflare Access or Zero Trust for private exposure.
