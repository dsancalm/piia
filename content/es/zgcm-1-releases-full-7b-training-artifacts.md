---
title: "Liberado ZGCM-1, modelo denso de 7B parámetros con pesos, datos y código completos"
summary: "El modelo abre toda su cadena de entrenamiento: checkpoints, datasets, recetas y logs de Weights & Biases. Usa atención completa y gated sliding-window intercalada, optimizador FP8 Muon y currículo de contexto hasta 256K tokens."
lang: es
story: zgcm-1-releases-full-7b-training-artifacts
publishedAt: 2026-09-15T12:41:57.201Z
sourceUrl: "https://arxiv.org/abs/2609.13356"
sourceName: "arXiv cs.AI"
priority: routine
tags: [llm, open-source, entrenamiento, agentes]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
ZGCM-1 es un modelo denso de 7 000 millones de parámetros entrenado desde cero y liberado íntegramente: pesos de pre-entrenamiento, mid-training y post-entrenamiento, checkpoints intermedios, código de entrenamiento, datasets y recetas por etapa, y los logs de Weights & Biases. La publicación permite reproducir la línea base completa sin depender de APIs cerradas.

La arquitectura combina atención completa con atención de ventana deslizante con compuerta (gated sliding-window) en capas intercaladas. El optimizador es FP8 Muon, elegido por su estabilidad numérica. El currículo de contexto escala progresivamente: 16 K 64 K 256 K tokens. Durante el mid-training, las trazas de interacción se reformulan como Procesos de Decisión de Markov, lo que estructura el aprendizaje de búsqueda agente. Además, los autores describen un flujo de I+D nativo en IA donde enjambres de agentes gestionan operaciones de clúster, curación de datos y evaluación diagnóstica rápida.

En evaluaciones, ZGCM-1-7B es competitivo dentro de la familia de 7 B en benchmarks generales. En razonamiento matemático y suites de búsqueda agente, los resultados se acercan a modelos frontera órdenes de magnitud mayores, citando explícitamente a Qwen3-235B-A22B y GLM-5.1. El diseño de pre-entrenamiento aporta una mejora de eficiencia de ~4,2× en tiempo-para-loss a 16 K. El artículo destila ocho hallazgos empíricos accionables que cubren escalado arquitectónico, poda de calidad en SFT, generalización de contexto largo y dinámicas de co-entrenamiento agente.

## Lo que no se sabe

- Número total de tokens de pre-entrenamiento y composición exacta del dataset.
- Hardware y clúster usados (número y tipo de GPUs, tiempo total en horas-GPU).
- Hiperparámetros clave: learning rate, batch size, weight decay, schedule de LR, detalles de precisión más allá de FP8 Muon.
- Implementación concreta de la atención *gated sliding-window* (tamaño de ventana, patrón de intercalación).
- Scores numéricos en benchmarks estándar (MATH, GSM8K, MMLU, SWE-bench, etc.) y definición precisa de las suites de búsqueda agente.
- Qué significa "competitivo" en cifras: win rate, pass@1, exact match.
- Detalles del flujo de *agent swarms*: modelos implicados, grado de autonomía, métricas de productividad.
- Licencia exacta de pesos y código (Apache 2.0, MIT, personalizada).
- Enlaces directos a Hugging Face o GitHub.
- Coste económico estimado del entrenamiento completo.
- Contenido detallado de los ocho hallazgos empíricos más allá de sus categorías generales.
