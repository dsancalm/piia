---
title: "Un modelo abierto de 14.000 millones de parámetros acierta el 67 % del histórico"
summary: "Qwen2.5-14B cuantizado a 4 bits ocupa 9 GB y responde sin base de datos externa. En categorías de factoides supera el 85 % y mantiene el 65 % en pistas posteriores a su corte de entrenamiento, frente al 0 % de Watson."
lang: es
story: 9-gb-model-answers-67-percent-of
publishedAt: 2026-09-01T12:29:57.704Z
sourceUrl: "https://arxiv.org/abs/2608.27459"
sourceName: "arXiv cs.AI"
priority: routine
tags: [llm, jeopardy, benchmark, watson]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un modelo abierto de 14.000 millones de parámetros cuantizado a 4 bits ocupa 9 gigabytes y acierta el 67 % de las 529.939 pistas que forman el histórico completo de *Jeopardy!* (41 temporadas, 1984-2025). El experimento, publicado en arXiv, usa Qwen2.5-14B bajo un protocolo de respuesta forzada con coincidencia exacta y difusa. En categorías de factoides la precisión supera el 85 %.

La comparación con Watson, el sistema que ganó el torneo televisado en 2011, resulta reveladora. Watson necesitaba un clúster de servidores POWER7 y un corpus curado de mil millones de documentos ensamblado expresamente para contener respuestas del concurso y afinado con pistas pasadas. El modelo actual cabe en un solo archivo, corre en local sin conexión y no dispone de base de datos externa. Los autores tratan la exposición a datos de entrenamiento como condición compartida por ambos sistemas, no como defecto exclusivo de los LLM.

## Generalización más allá del corte de entrenamiento

La prueba más interesante mide el rendimiento sobre pistas emitidas después del corte de entrenamiento del modelo. Qwen2.5-14B mantiene un 65 % de acierto. Claude Opus 4.8 alcanza el 95 %. Watson, por construcción, obtiene cero: su corpus se congeló antes de la emisión. El resultado sugiere que la compresión de conocimiento en los pesos del modelo permite razonar sobre información que no vio literalmente durante el entrenamiento, siempre que exista continuidad semántica con lo aprendido.

## Qué no se sabe

- Fecha exacta del corte de entrenamiento de Qwen2.5-14B.
- Detalles del protocolo "forced-response" y criterios de coincidencia difusa.
- Desglose de rendimiento por categoría, década o dificultad de la pista.
- Hardware y tiempo de inferencia para evaluar las ~530.000 pistas en local.
- Disponibilidad y licencia del dataset de *Jeopardy!* utilizado.
- Comparativa con otros modelos abiertos (Llama, Mistral, etc.) en el mismo benchmark.
- Métricas de calibración o confianza: si el modelo detecta cuándo no sabe la respuesta.
