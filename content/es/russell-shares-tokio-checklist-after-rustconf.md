---
title: "Buenas prácticas de Tokio para reducir la latencia de planificación"
summary: "Russell recopila patrones con síntomas y contadores tras RustConf. La métrica clave es el histograma de latencia de planificación: objetivo sano entre 10 y 100 µs."
lang: es
story: russell-shares-tokio-checklist-after-rustconf
publishedAt: 2026-09-15T12:25:23.089Z
sourceUrl: "https://dial9-rs.github.io/blog/principles-for-fast-tokio-applications/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [tokio, rust, async, rendimiento]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El artículo de Russell recoge buenas prácticas para Tokio tras RustConf. No propone una arquitectura nueva, sino una lista de patrones con sus síntomas y contadores. La métrica central es el histograma de latencia de planificación: el tiempo que una tarea lista espera a que un worker la poll-ee. Alice Ryhl sitúa el objetivo sano entre 10 y 100 microsegundos. Si tu P99 se dispara, mira ahí primero.

El ejemplo canónico es un bucle de lectura con *request pipelining*. `read_frame` devuelve `Poll::Ready` repetidamente mientras haya datos en el buffer, así que una sola conexión puede monopolizar el worker y dejar a las demás sin CPU. La solución mínima es un `yield_now` explícito tras procesar cada frame:

```rust
async fn handle_conn(&mut self) -> crate::Result<()> {
    while !self.shutdown.is_shutdown() {
        let frame = tokio::select! {
            res = self.connection.read_frame() => res?,
            _ = self.shutdown.recv() => { return Ok(()); }
        };
        execute_command(&self.db, &mut self.connection, frame).await?;
        // To improve fairness:
        tokio::task::yield_now().await;
    }
}
```

Ese `yield` reduce la latencia de planificación aproximadamente 10x en el caso Redis. Un compromiso intermedio: hacer `yield` solo tras 4 lecturas consecutivas inmediatamente listas. Mantienes parte del *batching* y recuperas equidad.

El *blocking pool* global es el segundo foco. `tokio::fs` sin `io_uring` usa `spawn_blocking` por debajo. Cada envío al pool cuesta; a ~50.000 tareas bloqueantes por segundo en un host de 32 núcleos ya se ven efectos negativos en flamegraphs. La regla: agrupa operaciones de sistema de archivos o bloqueantes en segmentos grandes para amortizar el *overhead*. A veces un hilo de SO dedicado supera al pool compartido.

Spawnear tareas tampoco es gratis. Cientos o miles de tareas aumentan el *scheduling delay* y el número de polls. Una tarea que dura 10 µs spawneada por separado suele ser contraproducente: el coste de gestión supera al trabajo útil.

La cola global de tareas de Tokio se llena cuando las colas locales se desbordan (raro) o cuando se agenda trabajo desde fuera de un worker (común: *sender* de un canal en hilo no Tokio). Si la cola global crece de forma sostenida, tienes un cuello de botella de ingreso.

Los mutex son el tercer vector. Bloquear un worker en un `Mutex` contendido paraliza el runtime entero. Los registros de métricas detrás de un `Mutex` o `RWLock` son el caso típico: si un *flush* mantiene el lock haciendo I/O, todos los workers pueden quedar atrapados intentando loguear y el *work-stealing* deja de funcionar. Las secciones críticas en código *async* deben ser extremadamente cortas , una actualización de `HashMap`, . `RWLock` casi nunca es el primitivo correcto: genera contención en atómicos incluso en ruta de lectura. No mantengas el lock mientras haces *flush*, I/O o `await` a otro future. `tokio::sync::Mutex` es más caro de lockear, sensible a problemas como *FutureLock*, y solo tiene sentido si la sección crítica dura varios milisegundos.

---

### Lo que no se sabe

- Umbral exacto de *schedule latency* que el autor considera problemático.
- Detalles de la implementación de *dial9 trace* y su integración.
- Cuándo "blocking the executor can be fine" (mencionado en el índice, no desarrollado).
- Contenido de "Use multiple runtimes to isolate workloads by priority" y "Spin to keep control" (en índice, no desarrollados).
- La app de ejemplo prometida para demostrar los *issues* con *dial9 trace*.
- Qué métricas concretas de `tokio-metrics` o *dial9* recomienda trackear más allá de *schedule latency*.
- Coste exacto de `spawn_blocking` en nanosegundos/ciclos en distintas arquitecturas.
- Cómo detectar programáticamente "global queue consistently deep" frente a aplicación sana.
