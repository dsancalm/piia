---
title: "Anthropic sustituye Git por Scion, su sistema en Rust sobre Cassandra y Spanner"
summary: "El monorepo superó los 30.000 merges diarios y 100 GB de historial, haciendo inviable Git. Scion usa changesets atómicos, índices auxiliares y checkouts virtualizados; todo se resuelve en el servidor y escala por tamaño del cambio, no del repo."
lang: es
story: anthropic-replaces-git-with-scion-to-handle
publishedAt: 2026-10-14T12:15:27.338Z
sourceUrl: "https://www.anthropic.com/engineering/redesigning-source-control"
sourceName: "Hacker News (portada)"
priority: flash
tags: [anthropic, scion, control-versiones, rust]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Anthropic ha sustituido Git por Scion, un sistema de control de versiones propio escrito en Rust y respaldado por Cassandra y Spanner. El cambio llegó después de que el monorepo principal superara los 2.500 merges diarios en mayo de 2026 y rompiera la barrera de los 30.000 en septiembre. El historial de la rama principal ocupa cerca de 100 GB y una copia de trabajo comprimida supera los 25 GB. La infraestructura de integración continua ejecuta unos 25 millones de checkouts al día; un `git fetch` ingenuo habría generado más de 600 PB de tráfico diario, lo que obligó a mantener varios cientos de espejos internos para absorber la carga. La migración completa desde Git llevó cinco meses.

## Arquitectura orientada a changesets

La unidad atómica en Scion no es el commit sino el *changeset*: una entrada en un log de escritura anticipada que registra la lista de archivos modificados respecto a su primer padre y punteros direccionados por contenido a blobs comprimidos en almacenamiento de objetos. Los changesets se crean en el servidor y quedan disponibles al instante en todas las réplicas. No existen packfiles, locking distribuido ni coordinación entre servidores al crear un changeset; mover una referencia es una operación *compare-and-swap* sobre una fila de Spanner.

A partir del log de changesets se construyen índices auxiliares (blame, historial por archivo) que responden consultas como qué commits tocaron un archivo o quién editó una línea concreta. El cliente mantiene una caché local acotada, materializa la copia de trabajo en disco, vigila el sistema de archivos y expone una UX similar a la de Git, pero computa muy poco por sí mismo. Todas las consultas de control de versiones se exponen vía API, de modo que muchos flujos (CI, análisis estático, agentes) no necesitan un repositorio local.

Cada componente escala horizontalmente de forma independiente. No existe una réplica totalmente materializada del repositorio ni siquiera en el servidor. Commits, rebases y merges ocurren en el servidor y su coste escala con el tamaño del cambio, no con el tamaño total del repo. El ciclo de desarrollo desaconseja referencias de larga vida salvo `main` o ramas de release, porque el estado global que todos los servidores deben acordar es un problema de escalabilidad latente. El protocolo gira en torno a checkouts dispersos (solo los directorios pedidos) y checkouts virtualizados (archivos materializados bajo demanda).

## Lo que no se sabe

- Número total de ingenieros y agentes que generan los 30.000+ cambios diarios.
- Desglose entre cambios escritos por humanos y generados por Claude.
- Latencia típica de crear un changeset y de operaciones de merge o rebase en Scion.
- Tamaño del clúster Spanner y coste operativo en producción.
