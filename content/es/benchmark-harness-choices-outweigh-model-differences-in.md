---
title: "Los leaderboards de LLM cambian radicalmente al variar el harness de evaluación"
summary: "Un estudio en arXiv muestra que la puntuación de un mismo modelo puede oscilar decenas de puntos porcentuales solo cambiando detalles del harness: orden de opciones, redacción del prompt o método de scoring. Gemma-4-31b varía del 31 % al 89 % de accuracy."
lang: es
story: benchmark-harness-choices-outweigh-model-differences-in
publishedAt: 2026-08-25T07:32:28.428Z
sourceUrl: "https://arxiv.org/abs/2608.21382"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [llm, benchmark, evaluación, ruido]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Los leaderboards de modelos de lenguaje presentan un orden definitivo que, en la práctica, no existe. Un artículo en arXiv demuestra que la puntuación de un modelo puede oscilar decenas de puntos porcentuales solo cambiando detalles del harness de evaluación: el orden de las opciones, la redacción del prompt o el método para extraer la respuesta. Los autores construyen una "fragility grid" y evalúan 12 modelos open-weight instruction-tuned de cuatro familias distintas sobre 3.679 ítems de ARC, HellaSwag, MMLU y TruthfulQA. Mantienen fijo el decoding greedy y los pesos; solo varían 26 configuraciones de harness que califican como "igualmente defensables".

El resultado más llamativo lo protagoniza Gemma-4-31b: su accuracy oscila entre el 31 % y el 89 % según la configuración elegida. Cuatro de los doce modelos alcanzan el puesto número uno en al menos una de esas configuraciones. Cuando dos modelos adyacentes en la tabla responden de forma estable en un ítem, sus puntuaciones están empatadas. Los ítems "config-fragiles" , aquellos cuya respuesta cambia al variar el harness, explican de media el 95,7 % de la brecha entre modelos vecinos. Eso significa que casi toda la separación aparente en la clasificación procede de ruido de evaluación, no de capacidad real.

El eje principal de variabilidad no es el orden de las opciones, sino el método de scoring: comparar el texto generado frente a calcular la verosimilitud por opción (per-option likelihoods). Además, la discriminación del ítem , la propiedad que maximizan los métodos de compresión de benchmarks, correlaciona positivamente con la fragilidad (0,28, IC 95 %: 0,25-0,30). Comprimir el benchmark retiene los ítems frágiles en lugar de eliminarlos, amplificando el problema.

Los autores liberan los registros por ítem y el script de análisis; la regeneración completa corre en CPU en segundos. La fragility grid se propone como un chequeo previo que任何 leaderboard debería ejecutar antes de publicar un orden único.

## Lo que no se sabe

- Cuáles son exactamente las 26 configuraciones de harness probadas (detalle de cada una).
- Cuáles son los 12 modelos específicos y sus 4 familias.
- Detalles metodológicos de cómo se define "config-fragile item" y " respuesta estable".
- Resultados desglosados por benchmark individual (ARC, HellaSwag, MMLU, TruthfulQA).
- Cuáles son los 4 modelos que alcanzan rank 1 y bajo qué configuraciones.
- Detalles del script de análisis liberado y requisitos de ejecución.
- Si la correlación 0,28 es Pearson, Spearman u otra.
- Cómo se compara esta variabilidad con la variabilidad entre seeds de entrenamiento o entre checkpoints.
