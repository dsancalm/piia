---
title: "alchemy-utils brings sqlite-utils API to PostgreSQL, SQLite, and DuckDB"
summary: "Simon Willison released an alpha Python library that reimplements sqlite-utils on SQLAlchemy, so the same insert, upsert, and table introspection code runs on multiple engines."
lang: en
story: alchemy-utils-brings-sqlite-utils-api-to
publishedAt: 2026-08-13T08:12:11.311Z
sourceUrl: "https://simonwillison.net/2026/Aug/12/alchemy-utils/"
sourceName: "Simon Willison"
priority: routine
tags: [python, sqlalchemy, database, ai]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Simon Willison published alchemy-utils 0.1a0 on August 12, 2026. It is an alpha Python library and CLI tool that reimplements the sqlite-utils API on top of SQLAlchemy. The project came out of a "shower project" built with Codex and GPT-5.6 Sol Ultra, and it works against PostgreSQL, SQLite, and DuckDB.

The goal was straightforward: take the core API of sqlite-utils (insert, upsert, insert_all, upsert_all, create, update, and table introspection) and back it with SQLAlchemy so the same code runs on multiple database engines. Willison used `~/dev/sqlite-utils` as a reference, started with `uv init`, and followed red/green TDD with pytest. The prompt that kicked it off is in the repo:

```
Do a research spike to see what it would take to build a library with the same core API as SQLite-utils - in particular the insert and upsert and insert_all and upsert_all and create and update methods, and the table introspection stuff - but backed by SQLalchemy so it works for multiple database engines
```

The payoff came when he optimized the code with Codex. Inserting a CSV of San Francisco trees into DuckDB went from nearly an hour to about 35 seconds.

You can run it directly with `uvx`, which is the fastest way to see if it fits your workflow:

```
uvx --with 'alchemy-utils[postgresql]' alchemy-utils rows 'postgresql+psycopg://simon@localhost:5432/simonwillisonblog' redirects_redirect
```

That command pulls rows from a PostgreSQL table and prints them as JSON, like this:

```json
[
  { "id": 2328, "domain": "simonwillison.net", "path": "2020/May/21/apple-photos-sqlite/", "target": "/2020/May/21/dogsheep-photos/", "created": "2020-05-21T13:03:46.591692-07:00" },
  { "id": 3, "domain": "feeds.simonwillison.net", "path": "swn-links", "target": "https://simonwillison.net/atom/links/", "created": "2017-10-01T14:12:54.820729-07:00" }
]
```

## Why it matters

If you already know sqlite-utils, alchemy-utils is the same muscle memory without the SQLite lock-in. The API is meant to be identical, so you can point the same insert or upsert calls at PostgreSQL or DuckDB and get the same behavior. That is useful for anyone who prototyped on SQLite and needs to move to a server database without rewriting data access code.

The alpha status matters more than the feature list. This is version 0.1a0, published the same day the project was built. Expect rough edges, missing methods, and breaking changes. The fact that it is a demonstration of a reproducible AI-assisted workflow is as much the point as the library itself. Willison published the prompt, the reference code, and the test strategy, so you can see exactly how the project was assembled.

## What is not known

The source does not say which sqlite-utils methods are fully implemented beyond the ones listed in the prompt. It does not say whether engines beyond PostgreSQL, SQLite, and DuckDB work, and it gives no commit count or version history. There is no mention of official documentation beyond the repo itself. The performance number (35 seconds) is for one specific CSV import on one machine, so treat it as indicative, not a benchmark.
