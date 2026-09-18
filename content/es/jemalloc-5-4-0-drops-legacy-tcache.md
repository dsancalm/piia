---
title: "Jemalloc 5.4.0 elimina siete controles de tcache y añade extents anclados"
summary: "La versión sustituye ajustes manuales de caché por hilos con una política adaptativa por bin. Introduce la bandera EXTENT_ALLOC_FLAG_PINNED para excluir mapeos no reclamables del decay y purge, con cinco mallctl nuevos de observabilidad."
lang: es
story: jemalloc-5-4-0-drops-legacy-tcache
publishedAt: 2026-09-18T11:45:37.318Z
sourceUrl: "https://github.com/jemalloc/jemalloc/releases/tag/5.4.0"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [jemalloc, allocador, memoria, c99]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Jemalloc 5.4.0 se publicó el 17 de septiembre con más de 160 commits que priorizan la limpieza interna frente a funciones nuevas visibles. La versión elimina siete controles *legacy* de tcache , `lg_tcache_nslots_mul`, `tcache_nslots_small_min`, `tcache_nslots_small_max`, `tcache_nslots_large`, `tcache_gc_delay_bytes`, `lg_tcache_flush_small_div` y `lg_tcache_flush_large_div`, y los sustituye por una política adaptativa por bin que ajusta objetivos de llenado y retención según la demanda observada entre eventos GC. Cualquier ajuste previo en `malloc_conf` para esos símbolos se ignora en silencio; los `mallctl` correspondientes devuelven `ENOENT`. `tcache_ncached_max` sigue disponible.

Para cargas que usan mapeos no reclamables , páginas HugeTLB, memoria persistente o regiones reservadas por el kernel, aparece la bandera `EXTENT_ALLOC_FLAG_PINNED`. Los hooks personalizados de asignación de extents pueden marcar esos mapeos para que queden fuera del *pipeline* de *decay* y *purge* y se reutilicen preferentemente. La observabilidad llega con cinco `mallctl` nuevos:

```c
stats.pinned
stats.arenas.<i>.pinned
stats.arenas.<i>.extents.<j>.npinned
stats.arenas.<i>.extents.<j>.pinned_bytes
stats.arenas.<i>.mutexes.extents_pinned.{counter}
```

En el lado de C++ se reemplaza la opción experimental en tiempo de ejecución `experimental_infallible_new` por la opción de compilación `--enable-cxx-infallible-new`. Esto habilita optimizaciones a nivel de compilador y en constructores de movimiento, y corrige el contrato de `new(std::nothrow)`.

La refactorización interna es extensa: modularización del *front-end* extrayendo gestión de arenas, inicialización, orquestación de *fork* y despacho de asignación; consolidación del grafo de cabeceras internas para eliminar dependencias circulares; simplificación del despacho `ctl` organizando `ctl.c` por subsistema; separación de la recopilación y renderizado de estadísticas en etapas *gather*/emisión con tablas guiadas por descriptores; y una nueva capa de abstracción de OS que saca E/S, tiempo, sincronización, CPU, memoria virtual, *atfork*, *profiling*, *thread-yield* y acceso a configuración del núcleo del allocador.

Correcciones concretas: se preserva `errno` en `free`, `free_sized`, `free_aligned_sized` y purga basada en `process_madvise`; se acepta `NULL` en `free_sized` y `free_aligned_sized` (C23); se corrigen desbordamientos numéricos en clases de tamaño; se arreglan casos frontera del ciclo de vida TSD; se usa `O_CLOEXEC` al abrir el *sysfs* de THP; se elimina un posible *deadlock* en `arena_reset`; se corrige la interacción *prof-sampling*/guard-page en el sanitizer; se limita la heurística de crecimiento de *base-block* para evitar agotamiento de memoria virtual; se usa `CLOCK_MONOTONIC` en el *background-thread* para prevenir *stalls* por retroceso de reloj.

Portabilidad: `arena_s` usa *flexible array member* (`bin_t all_bins[]`) requiriendo C99; se corrige `malloc_getcpu` en macOS; se arreglan *warnings* en macOS, MinGW y GCC 16 (incluyendo `-Wpedantic` y `-Wstringop-truncation`); se parsean *symlinks* de *PID-namespace* sin `strtok`/`atol` dependientes de glibc, devolviendo identificadores como `uint64_t`.

## Lo que no se sabe

- Versión anterior exacta desde la que se compara (no se menciona en la nota de release).
- Benchmarks o cifras de latencia/throughput que cuantifiquen el impacto de la política tcache adaptativa.
- Lista completa de los 13 contribuyentes (solo se nombran dos).
- Fecha planificada de la siguiente release.
- Qué plataformas concretas se benefician ya de la nueva capa de abstracción OS.
