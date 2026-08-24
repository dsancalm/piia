---
title: "Tailscale traced 19 database corruptions to a 16-year-old SQLite bug"
summary: "The company's backup pipeline made the diagnosis possible, but the fix came through a paid support contract with the SQLite developers. The bug lurked in WAL mode and evaded integrity checks. The exact mechanism and patch details remain undisclosed."
lang: en
story: tailscale-traced-19-database-corruptions-to-a
publishedAt: 2026-08-13T08:07:10.920Z
sourceUrl: "https://tailscale.com/blog/sqlite-wal-reset-bug"
sourceName: "Hacker News (portada)"
priority: flash
tags: [sqlite, tailscale, database, corruption]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Tailscale passed 19 database corruption incidents in six months before it found the cause: a 16-year-old bug in SQLite's WAL mode. The company has been running SQLite as its primary database since 2022, with a backup pipeline that snapshots the entire database every few minutes and uploads it to S3.

The first corruption hit in August last year. Recovery took over an hour initially, later dropping to under an hour. There was a six-week gap between October and December with no incidents, which made the bug harder to pin down. It wasn't tied to a single shard, client, tailnet feature, time of day, or load level.

Tailscale's forensic work showed something odd: in two incidents, transaction logs failed to replay cleanly, revealing that a compromised write was invisible to subsequent transactions. That pointed to a WAL-specific issue, not a hardware or filesystem problem.

The fix came through a professional support contract with the SQLite developers. They found the bug, which had been in the codebase for 16 years, and built a new debugging tool to help trace it. The source doesn't name the tool or describe the exact mechanism of the bug.

For anyone running SQLite in production, the lesson is concrete: `PRAGMA integrity_check` is not enough to catch every failure mode.

```sql
PRAGMA integrity_check;
```

That command verifies the database structure, but it won't expose a WAL corruption where a write is silently dropped from the transaction log. The corruption only shows up when you try to replay those logs.

Tailscale's backup pipeline is what made the diagnosis possible. Because they had a complete snapshot every few minutes, they could compare states and isolate when the corruption occurred. Without that instrumentation, they'd still be chasing ghosts.

What is not known: the exact date of the first incident (the source only says "August last year"), the precise mechanism of the SQLite bug, how it was patched, whether the fix was released to the public SQLite community, and the name of the debugging tool the SQLite developers created. The source also doesn't say how many shards or tailnets were affected in total.
