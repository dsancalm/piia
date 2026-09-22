---
title: "Linear cuts CI wait time while test volume quadruples"
summary: "Linear's engineering team published a detailed breakdown of how they reduced PR wait time from over six minutes to just over five despite a nearly fourfold increase in test suites since January."
lang: en
story: linear-cuts-ci-wait-time-while-test
publishedAt: 2026-09-22T12:04:14.122Z
sourceUrl: "https://linear.app/now/ci-bottleneck-reworked"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ci, github-actions, typescript, monorepo]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Linear's CI pipeline fell behind once AI-assisted coding drove up the volume of changes and tests. Test suites nearly quadrupled since January, yet PR wait time dropped from over six minutes to just over five, and runner time per test was cut roughly in half. The team published a breakdown of every change that produced those numbers; the patterns apply to any monorepo running GitHub Actions or a comparable system.

## Runners and native tooling

Moving workloads from GitHub-hosted runners to third-party machines with faster CPUs, NVMe storage, and a local cache layer made jobs run 34 percent faster on average. The TypeScript compile step (`tsc`) dropped 52 percent on the new hardware alone. Switching the compile step to `tsgo`, the native Go implementation of the TypeScript compiler, shaved another 73 percent off the weekly median `tsc` run, moving the bottleneck off type-checking entirely.

Rewriting custom ESLint rules to operate on the static AST instead of requesting full type information cut API lint time by 68 percent and full-repo lint time by 55 percent. That rewrite also unlocked migration to Oxlint, which runs the same rules faster still.

## Git and checkout

The change-detection gate that decides whether a PR needs a full rebuild used to take up to 94 seconds in the worst case. Capping fetch depth and removing unnecessary checkouts brought the slowest run to 20 seconds, the median from 26 seconds to 8 seconds, and the p90 from 31 seconds to 12 seconds.

Network instability between the third-party runners and GitHub caused frequent checkout hangs. Linear replaced `actions/checkout` with a custom composite action that retries with exponential backoff, sets `GIT_HTTP_LOW_SPEED_LIMIT` and `GIT_HTTP_LOW_SPEED_TIME`, and clones from a persistent git mirror cache hosted near the runners. Checkout jobs without a working tree fell from 27 seconds to 7 seconds, and a sparse blobless checkout saved roughly 11 seconds more.

```yaml
- uses: ./actions/checkout-resilient
  with:
    isolate: false
```

## Critical-path trimming

A cache-marker write that ran on every merge-queue entry was moved off the critical path, saving 42 seconds per API PR.

The API workflow's `pnpm install` was restricted to the single package that needs it, dropping from 44-73 seconds to 16-18 seconds. Restoring a cached `node_modules` took about 28 seconds; the filtered install takes roughly 7.5 seconds, so the cache was removed entirely. Combined with a CI base image that preinstalls the Postgres client and native build headers, per-shard setup time fell from 110-140 seconds to 67-73 seconds, a 44 percent reduction.

Database setup per test container went from ~12 seconds to 1-2 seconds by loading a generated schema snapshot instead of replaying the full migration history.

## Concurrency and parallelism

Seven short independent checks were consolidated into two jobs that run their tasks concurrently. Based on June usage, that consolidation saves roughly 87,000 runner-minutes per month, or 11.8 percent of total CI usage. With lower fixed overhead per shard, the team parallelized the API test suite more aggressively.

## What is not known

- Absolute CI cost in dollars before and after the optimizations.
- Total PR volume per day or week to contextualize the wait-time impact.
- Exact runner instance types or cloud provider for the third-party machines.
- Whether `tsgo` is considered fully stable for production or still experimental.
- Details on Oxlint rule parity and any lint coverage gaps after migration.
- How schema snapshots are generated and kept in sync with migrations.
- Breakdown of the 87,000 runner-minutes saved by job type.
- Current total CI runner-minutes per month after all changes.
- Impact on flakiness rates after aggressive parallelization.
- Whether these optimizations apply equally to non-TypeScript parts of the codebase.
