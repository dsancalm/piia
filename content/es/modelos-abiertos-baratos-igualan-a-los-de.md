---
title: "Tres modelos baratos y una votación por unanimidad igualan a los jueces caros en exámenes de matemáticas"
summary: "Un estudio en arXiv muestra que tres modelos abiertos pequeños, votando por unanimidad, logran la misma concordancia con evaluadores humanos que los modelos de frontera al calificar pruebas de la Olimpiada Internacional de Matemáticas, con un coste hasta 100 veces menor."
lang: es
story: modelos-abiertos-baratos-igualan-a-los-de
publishedAt: 2026-08-04T11:44:29.615Z
sourceUrl: "https://arxiv.org/abs/2608.00004"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [evaluación, matemáticas, modelos, coste]
generatedBy: deepseek/deepseek-v4-flash-0731
---
La evaluación automática de pruebas matemáticas en lenguaje natural tiene un problema de coste. Los modelos de frontera que actúan como jueces son caros, y validar una batería de cientos de respuestas se dispara. Un estudio reciente en arXiv propone una solución: usar modelos abiertos pequeños y una regla de votación simple.

El trabajo emplea IMO-GradingBench, un benchmark con 1000 instancias de problemas de la Olimpiada Internacional de Matemáticas. Primero, en un conjunto de validación de 200 instancias, compararon tres jueces económicos (GPT-OSS 120B, DeepSeek-V4 Flash y Gemma-4 31B) con modelos de frontera como Claude Opus 4.7 y Gemini 3.1 Pro. La concordancia con las decisiones humanas de aprobado/reprobado fue estadísticamente indistinguible entre ambos grupos. El coste no lo es: los jueces baratos cuestan hasta 100 veces menos.

Después extendieron el análisis a las 1000 instancias completas. Probaron varias reglas de agregación de votos entre los tres jueces económicos. La que mejor funcionó fue la unanimidad: solo se da por aprobada una prueba si los tres coinciden en aprobarla. Con esa regla, la concordancia con los humanos subió, la precisión también, y la variabilidad entre ejecuciones bajó. Lo comprobaron con cuatro réplicas.

El detalle importante es que la regla de unanimidad se eligió después de ver los resultados, no antes. Eso significa que el hallazgo necesita validación independiente antes de tomarlo como ley. Los autores lo reconocen.

## Qué implica para tu sistema

Si estás montando un evaluador de razonamiento matemático, el resultado práctico es que puedes sustituir un juez caro por tres modelos abiertos baratos y votar por unanimidad. El coste por evaluación cae dos órdenes de magnitud, y la calidad se mantiene. La regla de unanimidad es además conservadora: reduce los falsos aprobados, que suele ser el error más caro en un pipeline de entrenamiento.

No hay código en el estudio, así que la aplicación directa es conceptual: escoge tres modelos abiertos pequeños, pídeles una decisión binaria sobre cada prueba, y exige consenso total para aprobar.

## Lo que no se sabe

El coste exacto por instancia de cada juez no se publica, solo el factor de 100 veces. Tampoco se detalla qué prueba estadística respalda el “estadísticamente indistinguible”, ni los intervalos de confianza. La regla de unanimidad no se ha probado en otros benchmarks ni con otras combinaciones de modelos. El rubric humano usado como referencia tampoco se describe. Si la unanimidad funciona porque estos tres modelos concretos comparten un sesgo, en otro contexto podría fallar.
