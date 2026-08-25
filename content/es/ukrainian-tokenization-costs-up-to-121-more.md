---
title: "Los tokenizadores penalizan al ucraniano: hasta un 121 % más de tokens que en inglés"
summary: "El desequilibrio en los datos de entrenamiento asigna menos vocabulario al cirílico, encareciendo cada petición y reduciendo el contexto útil. Un BPE equilibrado a 200.000 entradas baja la ratio UK/EN de 2,22x a 1,30x; LLMLingua-2 comprime un 47-49 % en un benchmark RAG sin..."
lang: es
story: ukrainian-tokenization-costs-up-to-121-more
publishedAt: 2026-08-25T07:27:46.692Z
sourceUrl: "https://arxiv.org/abs/2608.21384"
sourceName: "arXiv cs.CL"
priority: flash
tags: [tokenizacion, ucraniano, cirilico, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Los tokenizadores multilingües actuales penalizan al ucraniano y a otras lenguas que usan escritura cirílica. El estudio evalúa nueve tokenizadores de producción sobre 8,37 millones de formas léxicas en cinco idiomas con representaciones estandarizadas en cirílico y latino. En el corpus BrUK, el ucraniano genera entre un 68 % y un 121 % más de tokens que el inglés con tokenizadores modernos, y un 220 % más con el antiguo cl100k. Eso significa que cada petición cuesta más y cabe menos contexto útil.

La causa principal es el desequilibrio en los datos de entrenamiento: los vocabularios asignan menos piezas al cirílico porque la web tiene menos texto en ese script. La correlación negativa entre asignación de vocabulario cirílico y overhead (Spearman ρ = -0,536, p = 0,215, n = 7) apunta en esa dirección, aunque la muestra es demasiado pequeña para alcanzar significación estadística.

Dos vías de mitigación funcionan en experimentos controlados. En inferencia, LLMLingua-2 comprime la entrada ucraniana un 47-49 % en un benchmark RAG de comercio electrónico (1.536 productos, 145 consultas) sin pérdidas de recuperabilidad en 80 casos evaluados. En diseño de tokenizador, un byte-level BPE equilibrado con tope de 200.000 entradas (converge en 158.184) reduce la ratio de tokens UK/EN en test hold-out de 2,22x a 1,30x.

La romanización no ayuda: aumenta los conteos de tokens un 2-19 % en la mayoría de tokenizadores. La eficiencia sigue al script predominante en los datos de entrenamiento.

## Lo que no se sabe

- Cuáles son exactamente los nueve tokenizadores evaluados ni los otros cuatro idiomas estudiados.
- Composición y tamaño del corpus BrUK.
- Overhead concreto para cada uno de los otros cuatro idiomas.
- Arquitectura y detalles de entrenamiento del byte-level BPE propuesto más allá del tamaño de vocabulario.
- Coste de latencia y compute de aplicar LLMLingua-2 en inferencia real.
- Si los resultados del benchmark RAG se mantienen fuera del comercio electrónico.
- Potencia estadística de la prueba de correlación con n=7.
- Definición exacta de "pérdidas de valor inducidas por compresión" y métrica de recuperabilidad.
- Coste computacional de entrenar el tokenizador equilibrado propuesto.
