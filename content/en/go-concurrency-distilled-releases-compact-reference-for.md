---
title: "Go Concurrency Distilled releases compact reference for production patterns"
summary: "The mini-book covers pipelines, cancellation, pooling, and synchronization primitives with interactive examples. It highlights directional channels for ownership, sync.WaitGroup.Go for reduced boilerplate, and select-based multiplexing using struct{} signals for..."
lang: en
story: go-concurrency-distilled-releases-compact-reference-for
publishedAt: 2026-09-27T12:20:24.824Z
sourceUrl: "https://antonz.org/go-concurrency-distilled/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [go, concurrency, patterns, reference]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Go Concurrency Distilled is a compact, AI-free reference that distills idiomatic concurrency patterns into a format you can keep open while coding. It assumes you already know the basics and focuses on the combinations that appear in production: pipelines, cancellation, pooling, and the synchronization primitives that hold them together.

The book covers the full surface area: goroutine lifecycle, channels (buffered, unbuffered, directional, nil), `select` semantics, `sync.WaitGroup` and its newer `Go` method, `sync.Once`, mutexes, semaphores, atomics, context propagation, race detection, and testing strategies. Each section includes interactive examples alongside a static PDF fallback.

A recurring pattern is the output-channel factory. The producer spins up a goroutine, writes to a channel it owns, and returns the receive-only end to the caller:

```go
func producer() <-chan string {
    ch := make(chan string)
    go func() {
        defer close(ch)
        for i := 0; i < 3; i++ {
            ch <- fmt.Sprintf("msg %d", i)
        }
    }()
    return ch
}
```

The caller ranges over the channel until it closes. Directional types (`chan<-` for send, `<-chan` for receive) make ownership explicit at compile time; Go converts bidirectional channels automatically when passed as arguments.

`sync.WaitGroup.Go` (introduced in Go 1.21) eliminates the boilerplate of `Add`, `defer Done`, and the anonymous function wrapper:

```go
func main() {
    var wg sync.WaitGroup
    wg.Go(func() { fmt.Println("worker 1") })
    wg.Go(func() { fmt.Println("worker 2") })
    wg.Wait()
}
```

The method increments the counter, starts the goroutine, and decrements on return , even if the function panics.

`select` remains the control plane for multiplexing. A cancellation pattern using a signal channel of `struct{}` (zero allocation) looks like:

```go
func worker(ctx context.Context, in <-chan int, out chan<- int) {
    for {
        select {
        case <-ctx.Done():
            return
        case v, ok := <-in:
            if !ok {
                return
            }
            out <- v * 2
        }
    }
}
```

Pipelines chain stages through channels: a reader feeds processors, processors feed a writer. Each stage closes its output channel when its input is exhausted, propagating termination downstream without explicit coordination.

What is not known
- Exact publication date or update cadence for the mini-book.
- Whether the interactive examples run via WASM in the browser or redirect to the Go playground.
- Depth of coverage for `errgroup`, weighted semaphores, or advanced fan-out/fan-in topologies beyond the basic merge example.
