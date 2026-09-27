---
title: "Un mini‑libro condensa patrones de concurrencia en Go con ejemplos interactivos"
summary: "Go Concurrency Distilled recopila goroutines, canales, select, WaitGroup, Context, mutexes y atomics en una referencia densa sin contenido generado por IA."
lang: es
story: go-concurrency-distilled-releases-compact-reference-for
publishedAt: 2026-09-27T12:20:24.824Z
sourceUrl: "https://antonz.org/go-concurrency-distilled/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [go, concurrencia, patrones, referencia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El mini‑libro *Go Concurrency Distilled* reúne los patrones de concurrencia que se usan a diario en producción: goroutines, canales, `select`, `WaitGroup`, `Context`, mutexes, atomics y pipelines. No es una introducción; es una referencia densa, sin contenido generado por IA, con ejemplos interactivos y versión PDF para consultar sin conexión. Abarca desde la creación ligera de goroutines hasta el diagnóstico de *data races* y *testing* concurrente, pasando por *object pools*, *run‑once* y semáforos.

La base sigue siendo `sync.WaitGroup`. El método clásico necesita tres líneas: `Add`, `go func(){ defer wg.Done(); … }()` y `Wait`. Desde Go 1.21 existe `WaitGroup.Go`, que encapsula el contador y el lanzamiento en una sola llamada:

```go
func main() {
	var wg sync.WaitGroup
	wg.Go(func() { fmt.Println("worker 1") })
	wg.Go(func() { fmt.Println("worker 2") })
	wg.Wait()
}
```

El código queda más corto y elimina el olvido habitual de `Add` o `Done`.

Los canales siguen siendo el mecanismo preferido para pasar datos entre goroutines. Un canal sin buffer bloquea al emisor y al receptor hasta que ambos están listos; uno con buffer desacopla la producción del consumo hasta `cap` elementos. La regla de oro: **solo el escritor cierra el canal**. Cerrar dos veces o escribir en un canal cerrado provoca *panic*. La lectura idiomática usa `range`, que itera hasta el cierre y devuelve un solo valor:

```go
func producer() <-chan string {
	ch := make(chan string)
	go func() {
		defer close(ch)
		ch <- "ping"
		ch <- "pong"
	}()
	return ch
}

func main() {
	for msg := range producer() {
		fmt.Println(msg)
	}
}
```

El parámetro de retorno `<-chan string` documenta en la firma que el canal es solo de lectura para el llamante; Go convierte automáticamente el canal bidireccional interno.

`select` permite combinar varias operaciones de canal sin bloqueo indefinido. Casos típicos: *merge* de varios productores, cancelación mediante un canal de señal (`chan struct{}`) y lecturas no bloqueantes con `default`. El *merge* básico:

```go
func merge(cs ...<-chan int) <-chan int {
	out := make(chan int)
	var wg sync.WaitGroup
	wg.Add(len(cs))
	for _, c := range cs {
		go func(c <-chan int) {
			defer wg.Done()
			for v := range c {
				out <- v
			}
		}(c)
	}
	go func() {
		wg.Wait()
		close(out)
	}()
	return out
}
```

Los pipelines encadenan etapas (`Reader → Processor → Writer`) conectadas por canales. Cada etapa recibe un canal de entrada, procesa y escribe en uno de salida; el cierre en cascada propaga la terminación sin lógica extra.

El libro también repasa *mutexes* (`sync.Mutex`, `RWMutex`), *atomics* (`sync/atomic`), *Context* para cancelación y *timeouts*, y patrones como *run once* (`sync.Once`) y *object pool* (`sync.Pool`). Incluye una sección de diagnóstico con `go test -race` y `pprof` para detectar *data races* y cuellos de botella.

Lo que no se sabe
- Fecha exacta de publicación o última actualización del mini‑libro.
- Detalles del otro título mencionado, *Gist of Go: Concurrency* (precio, extensión, ejercicios).
- Si los ejemplos interactivos corren en WebAssembly o son enlaces al Go Playground.
- Cobertura de `errgroup`, semáforos ponderados o patrones *fan‑out/fan‑in* avanzados más allá del *merge* básico.
