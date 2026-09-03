---
title: "Polars 2.0 RC1 switches defaults to streaming engine"
summary: "The release candidate changes the default engine to streaming for faster aggregation and lower memory use. Row order is no longer guaranteed in joins and group_by operations. Stricter type checking and removed implicit casts are now enforced to prevent silent errors."
lang: en
story: polars-2-0-rc1-switches-defaults-to
publishedAt: 2026-09-03T11:38:27.711Z
sourceUrl: "https://pola.rs/posts/announcing-polars-2/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [polars, streaming, performance, api-change]
generatedBy: dots-studio/dots-3-note-preview:free
---
Polars 2.0 RC1 landed on September 2, 2026. The final release is expected within weeks. The major version bump removes past design decisions and changes defaults instead of adding big new features.

The most immediate change is the default engine switch. `LazyFrame.collect()` now resolves `engine="auto"` to the streaming engine. The team expects a 5x aggregate speedup and lower memory use. The trade-off is that row order is no longer guaranteed for joins, `group_by`, `unpivot`, and similar operations.

```python
lf = pl.LazyFrame({"k": [2, 1, 0], "v": ["a", "b", "c"]})
other = pl.LazyFrame({"k": [0, 1, 2], "r": ["x", "y", "z"]})
# 2.0: engine="auto" now resolves to the streaming engine.
# Row order is no longer guaranteed for joins, group_by, unpivot, ...
(lf.join(other, on="k", how="left").collect())
# ┌─────┬─────┬─────┐
# │ k ┆ v ┆ r │ <- order may not match `lf`'s original row order
# └─────┴─────┴─────┘
```

You can opt in to observable order per query with `maintain_order="left"` or keep the old in-memory engine as the process-wide default:

```python
pl.Config.set_engine_affinity("in-memory")
# ...or per query:
(lf.join(other, on="k", how="left").collect(engine="in-memory"))
```

Stricter behavior is the other pillar. Polars 2.0 enforces a fail-fast philosophy. Implicit data-mismatch behavior is now opt-in. `collect_schema()` resolves types and catches schema-level mismatches without materializing data. `is_in` requires lossless type coercion. An `Int64` value inside a `List(Float64)` raises `InvalidOperationError` because floats beyond `2^53` (9007199254740992) cannot represent every integer exactly.

```python
flagged_ids = pl.Series([9007199254740992.0])
user_id = pl.Series([9007199254740993])  # Int64 -> a different ID, off by 1
user_id.is_in(flagged_ids)
# InvalidOperationError: 'is_in' cannot check for Int64 values in List(Float64) data.
```

Horizontal concatenation now checks lengths in strict mode. A `ShapeError` is raised when heights differ, preventing silent misalignment. Explicit padding requires `how="horizontal_extend"`.

```python
transactions = pl.DataFrame({"day": [1, 2, 3, 4, 5], "count": [120, 98, 143, 87, 156]})
fraud_flags = pl.DataFrame({"flagged": [2, 0, 5, 1]})  # only 4 rows
pl.concat([transactions, fraud_flags], how="horizontal")
# ShapeError
```

Several casts are removed. Integer to `Enum` and string to `Date`/`Datetime` now require explicit paths: `.cat.to(dtype)` or `.cat.physical()` for enums, and `.str.to_date()` or `.str.to_datetime()` for temporal types. New typed exceptions `AttributeRemovedError` and `ArgumentRemovedError` include migration hints. `melt` is removed in favor of `unpivot` with `index`/`on` instead of `id_vars`/`value_vars`. The `join_nulls` argument is renamed to `nulls_equal`.

Install the release candidate with `pip install polars==2.0rc1`.

Future work includes out-of-core streaming, a new IO plugin design, a faster S3 reader, SQL coverage, a cost-based planner, join reordering, and removal of `mmap` for fully async pipelines.

## What is not known

- Exact release date of final Polars 2.0
- Full list of strictness improvements beyond those shown
- Performance benchmarks for the 5x claim across workloads
- Timeline for out-of-core streaming, new IO plugins, S3 reader, cost-based planner, join reordering, mmap removal
- Whether any deprecated functionality was kept due to user feedback
- Compatibility details for `maintain_order` parameter values ("left" vs `True`)
