---
title: "Tokka-Bench evalúa siete tokenizadores en 120 lenguas y revela que la distribución"
summary: "El marco compara GPT-2, GPT-4, gpt-oss, Llama 3.1, Gemma 3, Qwen3 y Kimi K2 bajo cinco métricas. En código la eficiencia se ha igualado, pero en lenguas naturales persisten diferencias marcadas según cómo se asignan los tokens entre idiomas, algo crítico en lenguas de bajo..."
lang: es
story: new-benchmark-ranks-tokenizers-across-100-languages
publishedAt: 2026-10-08T13:58:16.488Z
sourceUrl: "https://arxiv.org/abs/2610.08794"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [tokenizadores, multilinge, benchmark, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Tokka-Bench es un marco de código abierto y estandarizado para evaluar tokenizadores subword en 100 lenguas naturales y 20 de programación. Sirve para comparar tokenizadores BPE bajo cinco métricas complementarias: bytes por token, cobertura de tokens únicos, fertilidad subword, tasa de división de palabras y composición del vocabulario. Se evaluaron siete tokenizadores: GPT-2, GPT-4, gpt-oss, Llama 3.1, Gemma 3, Qwen3 y Kimi K2.

El estudio muestra que la estrategia de asignación de vocabulario importa más que el tamaño bruto del vocabulario. En lenguajes de programación, la eficiencia ha convergido entre tokenizadores recientes, aunque con perfiles divergentes en lenguas naturales. El marco, los datos y un panel interactivo están disponibles públicamente, aunque no se especifican las URLs concretas.

Para quien entrena o finetunea modelos multilingües u optimiza vocabularios, Tokka-Bench proporciona una base objetiva para decidir. La diferencia entre tokenizadores no está en el número total de tokens, sino en cómo se distribuyen entre lenguas. En lenguas de bajo recurso, la asignación puede marcar la diferencia entre un modelo capaz de entender y uno que se queda corto.

Lo que no se sabe: URLs exactas del repositorio, valores numéricos de las métricas por tokenizador y lenguaje, detalles de la segmentación language-aware, definición precisa de las cinco métricas, qué tokenizadores son considerados recientes o antiguos, y la licencia del código y datos.
