---
title: "AutoFyn mejora modelos de lenguaje sin reentrenarlos, usando memoria externa"
summary: "AutoFyn propone un método donde el modelo no se reentrena, sino que lee un estado persistente cada ronda. Un orquestador explora alternativas, un verificador mide el progreso y actualiza ese estado."
lang: es
story: autofyn-improves-long-horizon-agents-by-updating
publishedAt: 2026-09-09T12:21:13.671Z
sourceUrl: "https://arxiv.org/abs/2609.05446"
sourceName: "arXiv cs.AI"
priority: routine
tags: [auto-fyn, agentes-llm, aprendizaje-por-verificació, memoria-persistente]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
AutoFyn propone una vía distinta para que un modelo de lenguaje mejore en tareas de horizonte largo: no toca los pesos, actualiza un estado persistente que el modelo lee al empezar cada ronda. El artículo, publicado en arXiv, describe un arnés de agente basado en Expert Iteration donde la política efectiva vive fuera de la red, en archivos de memoria, reportes y el estado de un repositorio. Cada ronda arranca desde una sesión fresca del modelo base congelado; la única información que persiste entre rondas es la que se reintroduce explícitamente a través de esas interfaces.

Dentro de una ronda un orquestador explora, planifica y construye muchas alternativas con agentes especializados. Un verificador anclado a la tarea revisa el trabajo y emite una recompensa objetiva que mide el progreso real. Esa recompensa se destila de vuelta al estado persistente, de modo que la siguiente ronda parte de una política efectiva distinta sin haber reentrenado nada. El bucle es: sesión fresca lectura de estado exploración guiada por orquestador verificación actualización de estado.

Los autores validan el enfoque en tres dominios. En los seis problemas frescos de la Olimpiada Matemática Internacional 2026, cada modelo base que tenía margen de mejora supera la puntuación del agente de codificación oficial de su proveedor cuando corre bajo AutoFyn. En el benchmark Spider 2.0 dbt, AutoFyn construyó el agente que ocupa el primer puesto. En ciberseguridad, el sistema ha generado 16 avisos de vulnerabilidad confirmados por los mantenedores de MetaMask, pnpm, Warp, LiteLLM, Langflow y Open WebUI.

El patrón es replicable: separar la capacidad de razonamiento del modelo de la acumulación de conocimiento específico de la tarea, y usar verificación externa como señal de aprendizaje. Eso evita el coste y la rigidez del fine-tuning y permite que un mismo modelo base sirva a tareas muy distintas con estados persistentes distintos.

Lo que no se sabe: qué modelos base exactos se evaluaron en la IMO 2026 ni sus puntuaciones absolutas; detalles de la arquitectura del orquestador y los agentes especializados; cómo se define y computa la recompensa objetiva en cada dominio; estructura concreta del estado persistente (memoria, reportes, repo); número típico de rondas por tarea y criterio de parada; puntuación exacta en Spider 2.0 dbt y distancia al segundo puesto; tipos de vulnerabilidades halladas (CWE, severidad CVSS); si el código de AutoFyn está público y bajo qué licencia; coste computacional y tiempo por ronda; cómo se maneja la verificación en dominios sin ground truth automático.
