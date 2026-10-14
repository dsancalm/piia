---
title: "Anthropic replaces Git with Scion to handle 30,000 daily merges"
summary: "Git could not scale past 2,500 merges a day without hundreds of mirrors moving 600 petabytes of data. Scion uses server-side changesets and Spanner-backed refs so merges cost only the size of the change, not the 100 GB history."
lang: en
story: anthropic-replaces-git-with-scion-to-handle
publishedAt: 2026-10-14T12:15:27.339Z
sourceUrl: "https://www.anthropic.com/engineering/redesigning-source-control"
sourceName: "Hacker News (portada)"
priority: flash
tags: [anthropic, scion, version-control, git]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Anthropic hit 2,500 merges per day on its main branch in May 2026. By September that number passed 30,000. The Git history for that branch sits at roughly 100 GB and a compressed working copy exceeds 25 GB. Continuous integration alone performs about 25 million checkouts every day. A naïve Git fetch would have moved more than 600 petabytes of data daily. The team ran several hundred internal Git mirrors at peak just to keep the pipes from bursting.

They replaced Git with Scion, a custom version-control system built in five months. Scion centers on changesets: append-only log entries that store the list of modified files relative to their first parent and content-addressed pointers to compressed blobs in object storage. Changesets are created on the server and become visible everywhere instantly. There are no packfiles, no locking, no cross-server coordination, and no ref movement when a changeset lands. Moving a ref is a compare-and-swap on a single Spanner row.

The client holds a bounded local cache, lays out the working copy on disk, watches the filesystem for changes, and exposes an ergonomic UX. It computes very little itself. Every version-control query the client needs is exposed through an API, so many workloads never need a local repository at all. Each component scales horizontally and independently. No fully materialized copy of the repository exists, not even on the server. Commits, rebases, and merges execute on the server and their cost scales with the size of the change, not the size of the repository.

The development model discourages refs beyond main and release branches because global state that every server must agree on is a latent scalability problem. The protocol revolves around sparse checkouts (only the directories you asked for) and virtualized checkouts (files materialized on demand). Auxiliary data structures such as blame and file history are built from the changeset log to answer questions like who edited a line or which commits touched a file.

Scion also ships with Antique, a code-review surface, plus code search, version-control IAM, and new workflows for landing large volumes of reviewed code.

## What is not known

- Total number of engineers and agents producing the 30,000-plus daily changes.
- Breakdown of human-authored versus model-generated changes.
- Typical latency for changeset creation, merge, and rebase operations.
- Spanner cluster size and operational cost of Scion in production.
- Migration cutover strategy, Git/Scion coexistence details, and rollback plan.
- How Scion handles large-scale merge conflicts and rebasing of deep stacks.
- Exact schema of blame and file-history indexes and their consistency guarantees.
- Retention and garbage-collection policies for old blobs and changesets.
- CI/CD integration specifics: runners used and how they request diffs or virtualized checkouts.
- Future availability of Scion or Antique as a product or open-source release.
