---
title: "Shopify moves inventory reservations from Redis to MySQL, survives Black Friday"
summary: "Shopify replaced Redis-based inventory reservations with a MySQL design using row-level locking and SKIP LOCKED. The system handled $5.1 million in sales per minute at peak, up 11% year over year, but the real bottleneck turned out to be database connections, not CPU or..."
lang: en
story: shopify-moves-inventory-reservations-from-redis-to
publishedAt: 2026-08-09T07:32:55.282Z
sourceUrl: "https://shopify.engineering/scaling-inventory-reservations"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [mysql, redis, inventory]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Shopify moved its inventory reservations off Redis and onto MySQL, and the redesign survived Black Friday 2025 at $5.1 million in sales per minute at peak. The company now handles more than 14% of US e-commerce, and peak sales per minute were up 11% year over year.

The old system kept quantity keys in Redis and used `DECR`/`INCR` operations to reserve stock during checkout. The new system stores one row per sellable unit in MySQL, with a pool capped at 1,000 rows per item/location combination. For scale, think of an item with 50,000 units across 10 locations: that is 500,000 rows if you store every unit, or up to 10,000 rows with the pool limit.

The key change is the locking strategy. The primary key became composite: `(shop_id, inventory_item_id, inventory_group_id, id)`. This distributes lock contention across more rows so one reservation locks one row instead of a whole quantity key. Queries use `SELECT ... FOR UPDATE SKIP LOCKED` from MySQL 8, which skips rows already locked instead of waiting on them. The isolation level dropped from `REPEATABLE READ` to `READ COMMITTED` to eliminate gap locks. Lock ordering is standardized to avoid deadlocks: `DELETE` on `reservation_units` first, then `INSERT` on `reserved_quantities`. Batch queries use `UNION ALL` to cut database round trips.

The surprise in production was that the bottleneck was neither CPU nor query latency. It was database connections. The system tuned for lock contention and query speed, but the real ceiling was how many connections the cluster could hold. That is the kind of thing you only find under load.

One well-known diagnostic tool appears in the source: `SHOW ENGINE INNODB STATUS` was used to inspect deadlocks and lock waits during tuning.

## What is not known

The write-up does not give the exact reservations-per-second figure the system handles, nor the operational cost of the Redis cluster it replaced. There is no specific acceptable latency number like a P90 target, no detail on how consistency between the pool and the inventory ledger is maintained during restock, and no final production row count for the reservation units table.
