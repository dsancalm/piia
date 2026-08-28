---
title: "TreeGraft acelera la inferencia un 15 % combinando varios modelos drafter en un árbol"
summary: "Un marco de decodificación especulativa usa drafters de distinto coste para construir un borrador compartido; un planificador destilado invoca al modelo fuerte solo cuando compensa."
lang: es
story: treegraft-merges-multiple-drafters-to-speed-up
publishedAt: 2026-08-28T18:59:00.382Z
sourceUrl: "https://arxiv.org/abs/2608.26112"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [llm, inferencia, especulativa, optimizacion]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
TreeGraft propone un marco de decodificación especulativa en el que varios modelos *drafter* de distinto coste construyen un mismo árbol de borrador. El más fuerte re-puntúa candidatos, elige posiciones de injerto y recupera ramas prometedoras sin descartar lo que ya generaron los drafters más ligeros. Un planificador destilado decide cuándo merece la pena invocar al modelo fuerte, de modo que el sobrecoste computacional solo se paga cuando aporta ganancia real.

En la evaluación, el sistema se prueba sobre 10 pares de modelos y 6 benchmarks. La mejora media en velocidad de inferencia frente al mejor *single-drafter* fijo es del 15,1 %, con picos del 26,6 %. El código está publicado, aunque no se detallan los pares concretos ni los benchmarks usados, ni la latencia absoluta en tokens por segundo.

La arquitectura mantiene en memoria varios drafters a la vez. No se especifica el *overhead* que esto supone ni el tamaño del planificador. Tampoco se aclara si la liberación incluye los scripts de destilación del *scheduler* o solo la inferencia, ni bajo qué licencia se distribuye.

Para quien sirve modelos en producción o en dispositivos con presupuesto de cómputo ajustado, TreeGraft ofrece una vía práctica: combinar un drafter pequeño y rápido con otro mayor y preciso sin asumir el coste completo del segundo. La implementación abierta permite integrar la técnica y medir su impacto real en la pila propia.

**Lo que no se sabe**
- Qué pares *target/drafter* exactos se evaluaron.
- Cuáles son los 6 benchmarks.
- Latencia absoluta o *throughput* en tokens/segundo.
- Arquitectura y tamaño del planificador ligero.
- Detalles del sistema de valor *offline* del que se destila.
- Coste de memoria de mantener varios drafters simultáneos.
- Si el código incluye entrenamiento del *scheduler* o solo inferencia.
- Licencia del repositorio publicado.
