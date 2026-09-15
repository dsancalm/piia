---
title: "Russell shares Tokio checklist after RustConf"
summary: "The guide targets schedule-latency histograms as the key health signal, aiming for 10, 100 µs polls. It shows how pipelined reads starve workers, how yield_now cuts tail latency 10x, why blocking pools and fine-grained tasks backfire, and why holding locks across await..."
lang: en
story: russell-shares-tokio-checklist-after-rustconf
publishedAt: 2026-09-15T12:25:23.089Z
sourceUrl: "https://dial9-rs.github.io/blog/principles-for-fast-tokio-applications/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [tokio, rust, performance, async]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Russell published a working checklist for fast Tokio services after RustConf. The core observation is that performance lives in the interaction between components, not in any single knob. The most actionable signal is the schedule-latency histogram: the time between a task becoming ready and a worker actually polling it. Alice Ryhl suggests healthy polls sit between 10 and 100 microseconds. When that number climbs, the runtime is spending cycles on overhead instead of your logic.

A common pattern that inflates this metric is reading pipelined frames from an in-memory buffer. Because `read_frame` returns `Poll::Ready` repeatedly, the current task monopolizes the worker and starves other connections.

```rust
async fn handle_conn(&mut self) -> crate::Result<()> {
    while !self.shutdown.is_shutdown() {
        let frame = tokio::select! {
            res = self.connection.read_frame() => res?,
            _ = self.shutdown.recv() => { return Ok(()); }
        };
        execute_command(&self.db, &mut self.connection, frame).await?;
        // To improve fairness:
        // tokio::task::yield_now().await;
    }
}
```

Uncommenting `yield_now()` after each command drops tail latency roughly 10× in the Redis-style example. A lighter compromise is yielding only after four consecutive ready reads, preserving most of the batching benefit while bounding unfairness.

Blocking work has its own tax. `tokio::fs` without `io_uring` pushes every operation onto the global blocking pool. Each `spawn_blocking` call carries allocation and synchronization cost; at roughly 50,000 blocking tasks per second on a 32-core host the pool becomes a bottleneck. The fix is to coalesce filesystem calls into larger chunks or, for sustained heavy I/O, dedicate a separate OS thread pool instead of leaning on the shared one.

Spawning fine-grained tasks backfires similarly. A 10 µs unit of work wrapped in its own task adds scheduling delay, extra polls, and queue pressure. Benchmarks consistently show that merging such work into the parent task wins.

The global task queue is another pressure indicator. It fills when local queues overflow (rare) or when work is scheduled from outside a Tokio worker, such as a channel sender living on a non-Tokio thread. A consistently deep global queue means the runtime cannot keep up with the arrival rate.

Locks inside async code are the sharpest edge. Holding a `Mutex` or `RWLock` across an `.await`, a flush, or any I/O can stall every worker that needs that lock. Metrics registries are frequent offenders: a slow `flush()` under a lock freezes all workers trying to record a counter, and work-stealing stops because no worker can make progress. Critical sections must be tiny , a single `HashMap` update, for example. `RWLock` is almost never the right primitive; it adds atomic contention even on the read path. `tokio::sync::Mutex` is more expensive to acquire than the std variant and is only justified when the critical section genuinely lasts milliseconds.

What is not known
- The exact schedule-latency threshold the author treats as pathological.
- Implementation details of the `dial9` tracing integration and the promised demo application.
- Concrete costs of `spawn_blocking` in nanoseconds across architectures.
- Programmatic heuristics to distinguish a healthy global queue from a saturated one.
- Which specific `tokio-metrics` or `dial9` counters to track beyond schedule latency.
