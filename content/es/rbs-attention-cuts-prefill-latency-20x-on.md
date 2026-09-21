---
title: "RBS-Attention acelera 20 veces el prefill en modelos de 128K tokens sin reentrenar"
summary: "El método combina una rama de centroide y otra de rescate por radio máximo para seleccionar tokens clave y evitar la dilución de la media. En un Qwen3-30B MoE en H100 logra 20,6x de speedup en atención standalone y 6x en time-to-first-token manteniendo 88,65 de precisión en..."
lang: es
story: rbs-attention-cuts-prefill-latency-20x-on
publishedAt: 2026-09-21T13:14:43.230Z
sourceUrl: "https://arxiv.org/abs/2609.20971"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [atención, prefill, llm, optimización]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
RBS-Attention es un método de prefill disperso que reduce el coste de la atención densa en modelos de lenguaje de contexto largo, sin necesidad de entrenamiento. Funciona como un selector de tokens clave que evita la dilución de la media, un problema donde un centroide de bloque puede ocultar un token relevante entre muchos irrelevantes.

El método combina dos ramas de selección: una base basada en centroide, que captura la relevancia promedio, y una rama de rescate, que utiliza el radio máximo del bloque de claves y su distribución dependiente de prompt, capa y cabeza. Ambas ramas se combinan mediante umbralado independiente, preservando la ejecución regular de FlashAttention dispersa por bloques.

Se evaluó en GPUs H100 con los modelos Qwen3-30B-A3B-Instruct-2507-FP8 (MoE) y Qwen3-32B (denso). En Qwen3-32B denso, RBS-Attention alcanza 88.65 de precisión general en RULER frente a 89.52 de atención densa. Además, se evaluó en LongBench-v2, InfiniteBench y Video-MME.

Los resultados muestran un speedup de 20.65x en prefill-attention standalone (H100, 128K, Qwen3-30B-A3B-Instruct-2507-FP8), 11.92x en prefill-attention vLLM (H100, 128K, Qwen3-30B-A3B-Instruct-2507-FP8) y 5.97x en time-to-first-token end-to-end (H100, 128K, Qwen3-30B-A3B-Instruct-2507-FP8). El contexto de evaluación fue de 128K tokens.

Los experimentos de soporte miden retención real, comparan selectores a densidad igualada y caracterizan comportamiento de tamaño de bloque, umbral y memoria. Los valores exactos de los umbrales utilizados para cada rama y cómo se determinan (fijos vs adaptativos) no se especifican. Tampoco se conoce el tamaño de bloque óptimo o utilizado en los experimentos principales, ni el overhead de memoria y latencia de la rama de rescate. Los resultados numéricos detallados en LongBench-v2, InfiniteBench y Video-MME no se proporcionan, solo se menciona que proporcionan evaluación adicional. No se evalúa si el método funciona en longitudes de contexto superiores a 128K (ej. 1M, 2M). La disponibilidad de código abierto y licencia no se detalla, aunque se mencionan enlaces a Code/Data/Media. El impacto en la fase de decoding (generación) no se evalúa, ya que el foco es prefill. Tampoco se compara con otros métodos sparse prefill recientes (ej. Quest, InfLLM, MInference) en las mismas métricas. Los detalles de la distribución del radio máximo 'prompt-, layer-, and head-dependent' no se proporcionan.
