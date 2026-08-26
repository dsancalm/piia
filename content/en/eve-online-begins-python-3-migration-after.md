---
title: "EVE Online begins Python 3 migration after 16 years on 2.7"
summary: "CCP Games has started moving its 2.4 million-line codebase off Stackless Python 2.7 with an automated `futurize` pass, then faces 20,000 semantic differences like bytes/str handling and pickle changes."
lang: en
story: eve-online-begins-python-3-migration-after
publishedAt: 2026-08-26T07:27:22.392Z
sourceUrl: "https://simonwillison.net/2026/Aug/25/eve-online-move-to-python-3/"
sourceName: "Simon Willison"
priority: urgent
tags: [python, eve-online, migration, stackless]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
CCP Games has announced that EVE Online, running continuously since 2003 on Stackless Python 2.7, is beginning its migration to Python 3. The codebase sits at 2.4 million lines. The last major runtime upgrade was sixteen years ago.

The first step is automated: they will run `futurize` across the entire tree. That tool rewrites syntax and imports to be compatible with both Python 2 and 3, inserting `from __future__` imports and applying fixers from `lib2to3`. The command they will use is essentially:

```bash
futurize --stage1 --stage2 -w .
```

After the automated pass, engineers face roughly 20,000 locations where runtime behavior diverges between the two versions. These are not syntax errors. They are semantic differences: integer division, `bytes` versus `str`, dictionary iteration order, `range` returning an iterator, `map` and `filter` laziness, exception chaining, and the `pickle` protocol changes that matter for a game that serializes state constantly.

The announcement does not say how they will replace Stackless. That is the harder problem. Stackless provides microthreads (tasklets) and channels that the game server uses for its actor-style concurrency. Standard CPython has no equivalent. At last year's conference, CCP presented "Scheduling in Carbon: Leaving Stackless Python Behind," showing how they replaced Stackless in the Carbon engine for EVE Frontier using their open source `carbonengine/scheduler` library. That scheduler implements cooperative multitasking on top of standard Python generators and `asyncio`. Whether the same library migrates back to the main EVE cluster, or whether they adopt a different strategy, has not been disclosed.

No timeline has been published. No target Python 3 version has been named. The post frames this as the beginning of a multi-year effort.

What is not known:
- How Stackless will be replaced in the production EVE Online cluster
- Estimated completion date for the migration
- Whether `carbonengine/scheduler` from EVE Frontier will be reused or adapted
- Performance impact during the transition period
- Target Python 3 version (3.10, 3.11, 3.12, or later)
