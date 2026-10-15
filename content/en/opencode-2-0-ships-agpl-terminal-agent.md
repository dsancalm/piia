---
title: "OpenCode 2.0 ships AGPL terminal agent with rewritten client API"
summary: "The release splits the codebase into three npm packages so developers can embed the runtime or build custom UIs without the full CLI. A new Service helper resolves endpoints and headers before handing them to OpenCode.make, and sessions now bind to the working directory..."
lang: en
story: opencode-2-0-ships-agpl-terminal-agent
publishedAt: 2026-10-15T11:52:48.484Z
sourceUrl: "https://anoma.ly/notes/opencode-2-0/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [opencode, terminal, agent, agpl]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
OpenCode 2.0 ships as an AGPL-3.0 terminal agent that drives any LLM through its API while handling files, git, tests and shells directly. The release rewrites the client surface. Initialization now goes through a `Service` helper that resolves an endpoint and headers, then hands those to `OpenCode.make`. A session is created against the current working directory and prompts are sent with the new `session.prompt` call.

```typescript
import { OpenCode } from "@opencode/client"
import { Service } from "@opencode/client/service"

const endpoint = await Service.ensure()
const client = OpenCode.make({
  baseUrl: endpoint.url,
  headers: Service.headers(endpoint),
})

const session = await client.session.create({
  location: { directory: process.cwd() },
})

await client.session.prompt({
  sessionID: session.id,
  text: "Review the current changes",
})
```

The package now publishes `@opencode/client`, `@opencode/codemode` and `@opencode/sdk` as separate entry points. The split lets you embed the agent runtime or drive it from a custom UI without pulling in the full CLI. Because the transport is plain HTTP with explicit headers, you can point the client at a local gateway, a self-hosted model server or a third-party provider without changing application code.

The AGPL-3.0 license means any network-exposed derivative must also offer its source. If you wrap OpenCode in a SaaS layer, the copyleft triggers. The project does not publish a commercial license alternative, so factor that into distribution plans.

## What is not known

- Exact daily-user count behind "millions."
- Full changelist: which features are new, which bugs were fixed, and what performance numbers changed.
- Benchmarks comparing 2.0 against 1.x or against Cursor and Claude Code.
- Whether the SDK surfaces streaming, tool-call cancellation or multi-turn rollback.
- Migration guide for existing `@opencode/client` consumers.
