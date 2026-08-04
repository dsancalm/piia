---
title: "Modelos abiertos baratos igualan a los de frontera al calificar pruebas de matemáticas"
summary: "Un estudio en arXiv comparó tres modelos abiertos económicos contra Claude Opus y Gemini como jueces de exámenes de la Olimpiada Internacional de Matemáticas. Su concordancia con calificaciones humanas fue estadísticamente indistinguible, con un costo hasta 100 veces menor."
lang: en
story: modelos-abiertos-baratos-igualan-a-los-de
publishedAt: 2026-08-04T11:44:29.616Z
sourceUrl: "https://arxiv.org/abs/2608.00004"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [arxiv, evaluación, modelos, matemáticas]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Calificar pruebas matemáticas en lenguaje natural con modelos grandes cuesta caro. Un estudio reciente en arXiv sugiere que tres modelos abiertos baratos rinden igual que los de frontera cuando actúan como jueces, y que una regla de unanimidad mejora la estabilidad de la decisión.

El trabajo usa IMO-GradingBench, un benchmark de 1000 instancias. Primero validaron con 200 de ellas. Compararon tres jueces económicos (GPT-OSS 120B, DeepSeek-V4 Flash y Gemma-4 31B) contra Claude Opus 4.7 y Gemini 3.1 Pro. La concordancia con las decisiones humanas de aprobado/reprobado fue estadísticamente indistinguible entre ambos grupos. El costo de los baratos es hasta 100 veces menor.

Luego extendieron el análisis a las 1000 instancias completas. Ahí probaron varias reglas de agregación. La de unanimidad, donde el problema se aprueba solo si todos los jueces lo aprueban, dio la mayor concordancia con el criterio humano y la menor variabilidad entre ejecuciones, medida en cuatro réplicas.

No hay código en el paper que puedas ejecutar directamente. La contribución es metodológica: puedes montar un pipeline de evaluación con estos modelos abiertos y una regla de votación simple, y esperar resultados comparables a los de usar modelos de pago por API, a una fracción del coste.

Lo que no se sabe:

- El coste exacto por instancia de cada juez económico y de los modelos de frontera. El factor de 100 veces es una estimación agregada, no un desglose por llamada.
- La definición precisa de "estadísticamente indistinguible". El paper no detalla los intervalos de confianza ni las pruebas estadísticas usadas para esa afirmación.
- Si estos jueces rinden igual en otros conjuntos de datos o en otras áreas de la matemática. IMO-GradingBench es un dominio concreto.
- La regla de unanimidad se identificó después de ver los resultados (post-hoc). Requiere replicación independiente en otros benchmarks y con otros modelos antes de tomarla como una ley general.
- Los detalles del rubric humano usado para la calificación de referencia. Sin eso, es difícil saber qué tipo de errores castiga la regla de unanimidad.
