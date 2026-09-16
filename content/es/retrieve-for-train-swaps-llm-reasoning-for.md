---
title: "Google entrena un modelo de difusión que descompone consultas en un solo paso"
summary: "El método Retrieve-for-Train usa aprendizaje por refuerzo offline para enseñar a un modelo ligero de 54 millones de parámetros a mapear embeddings de consulta a conjuntos de sub-consultas diversas y fundamentadas, eliminando la latencia de la generación autoregresiva."
lang: es
story: retrieve-for-train-swaps-llm-reasoning-for
publishedAt: 2026-09-16T12:05:06.737Z
sourceUrl: "https://research.google/blog/bypassing-inference-bottlenecks-accelerating-complex-ai-search-with-retrieve-for-train/"
sourceName: "Google Research"
priority: urgent
tags: [google, difusion, recuperacion, rl]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El cuello de botella de la descomposición de consultas en sistemas de búsqueda y recomendación no es solo de calidad, sino de latencia. Cuando un modelo de lenguaje grande tiene que emitir cientos de tokens de *chain-of-thought* para descomponer una consulta compleja en sub-consultas coherentes, diversas y fundamentadas en la base de datos, el coste en inferencia se vuelve prohibitivo para producción. Google Research presenta Retrieve-for-Train, un marco que mueve ese razonamiento costoso al entrenamiento mediante aprendizaje por refuerzo *offline* una sola vez, y lo destila en un modelo de difusión ligero de 53,9 millones de parámetros que mapea embeddings de consulta a embeddings de conjunto objetivo en un único paso no autoregresivo.

El pipeline tiene tres fases. Primero, se entrena un modelo de lenguaje de *fan-out* (FOLM) de 4.000 millones de parámetros , Gemma3-4B y Qwen3-4B en los experimentos, usando *soft-GRPO* con una recompensa compuesta a nivel de conjunto. Esa recompensa combina tres pilares que actúan como contrapesos mutuos: *Groundedness* penaliza la distancia al manifold de la base de datos para evitar alucinaciones; *Diversity* usa el Vendi Score sobre el conjunto de sub-consultas para forzar variedad semántica; *Alignment* ancla las sub-consultas al prompt original. Solo *Groundedness* genera strings degenerados; añadir *Alignment* causa colapso parafrasístico; el Vendi Score rompe ese colapso. En la segunda fase, el FOLM congelado sintetiza pares consulta conjunto objetivo *offline* sin etiquetas humanas. En la tercera, el recuperador basado en difusión aprende esa distribución de conjuntos.

La evaluación cubre dos regímenes. En recuperación abstracta abierta no hay *ground truth* único y la calidad se mide por propiedades de conjunto. En recuperación composicional débilmente supervisada existen pares consulta, conjunto de referencia débiles. Los LLMs *zero-shot* sufren colapso parafrasístico y cuellos de botella de latencia autoregresiva al intentar descomposición de consultas consciente de la base de datos; el recuperador de difusión resuelve ambos generando *slates* de resultados diversos, fundamentados y alineados en sub-segundo.

## Lo que no se saben

- Pesos exactos de la recompensa compuesta (balance entre Groundedness, Diversity y Alignment).
- Hiperparámetros de RL: *learning rate*, *batch size*, pasos de entrenamiento, *kl-coef* de GRPO/PPO.
- Arquitectura precisa del modelo de difusión: número de pasos de *denoising*, *scheduler*, dimensionalidad de embeddings.
- Datasets y *backbones* de embeddings multimodales congelados usados en los experimentos.
- Métricas numéricas de resultados (Vendi Score, recall, latencia en ms, *throughput*) y *baselines* comparados.
- Fecha real de publicación: el texto cita 15 septiembre 2026 e ICML 2026, fechas futuras respecto a 2025.
