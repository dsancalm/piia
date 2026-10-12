---
title: "AutoIndexer rompe la causalidad en LLM con decodificación de orden flexible"
summary: "El modelo simula un editor de texto: predice marcadores de edición y mueve un cursor para insertar, borrar o sustituir tokens en salidas ya generadas, permitiendo referencias cruzadas y dependencias futuras sin regenerar desde cero."
lang: es
story: autoindexer-model-generates-text-by-editing-instead
publishedAt: 2026-10-12T15:50:09.939Z
sourceUrl: "https://arxiv.org/abs/2610.12545"
sourceName: "arXiv cs.CL"
priority: flash
tags: [llm, generativo, codigo, edicion]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
AutoIndexer propone un modelo generativo que rompe la restricción causal de los LLM actuales mediante decodificación de orden flexible. El sistema simula un editor de texto: predice tokens marcadores que abren y cierran ediciones y mueve un cursor a posiciones arbitrarias de la secuencia ya generada. Así puede insertar, sustituir o eliminar tokens sobre salidas previas sin necesidad de regenerar desde cero. El entrenamiento se realiza perturbando etiquetas ground-truth con operaciones de edición inversas encadenadas; el modelo aprende deshaciendo esas inversas.

El paradigma permite generar código con referencias cruzadas y dependencias futuras , por ejemplo, declarar una función después de usarla o añadir imports tras escribir el cuerpo, algo que los modelos autoregresivos solo resuelven con pasos de revisión posteriores. Los autores afirman que el método mantiene el rendimiento en benchmarks estándar de LLM mientras añade capacidad de edición de contexto posterior a la generación. El código está disponible públicamente en el repositorio indicado en el paper.

## Lo que no se sabe

- Qué benchmarks estándar se usaron y qué métricas exactas se obtuvieron.
- Detalles de arquitectura: tamaño del modelo, número de capas, heads, dimensión oculta, vocabulario.
- Configuración de entrenamiento: hardware, pasos, learning rate, batch size, mixed precision, optimizador.
- Cómo se construyen exactamente las perturbaciones inversas y qué distribución de longitud y tipo de ediciones se usa.
- Latencia y throughput de decodificación comparados con modelos autoregresivos y diffusion LLMs.
- Resultados en tareas concretas de edición de código: datasets, métricas, baselines.
- Licencia del código publicado y dependencias necesarias para reproducir.
- Si el modelo requiere fine-tuning adicional para tareas downstream o sirve out-of-the-box.
