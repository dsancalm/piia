---
title: "Proxy Confidence detecta errores en llamadas a herramienta sin acceder al modelo"
summary: "Un modelo sustituto de pesos abiertos corre en paralelo a la API cerrada y, usando sus propias log-probabilidades, genera cuatro señales que identifican argumentos mal formados, llamadas holísticamente erróneas o la herramienta equivocada."
lang: es
story: proxy-confidence-catches-agent-tool-call-errors
publishedAt: 2026-10-06T13:40:07.251Z
sourceUrl: "https://arxiv.org/abs/2610.03894"
sourceName: "arXiv cs.AI"
priority: routine
tags: [agentes, llm, herramientas, evaluacion]
generatedBy: dots-studio/dots-3-note-preview:free
---
Las APIs de modelos frontera no exponen las probabilidades de token, por lo que los agentes que las usan no pueden determinar con fiabilidad si una llamada a herramienta está bien formada. El artículo presenta Proxy Confidence: un modelo sustituto de pesos abiertos que corre en paralelo, recibe el mismo contexto, esquema y acción propuesta, y devuelve cuatro lecturas basadas en sus propias log-probabilidades. Teacher forcing y request-PMI miden la verosimilitud de cada valor de argumento; un veredicto discriminativo juzga la llamada completa; y una competición de elección de herramienta enfrenta la función candidata contra sus hermanas. El principio de decisión es sencillo: las lecturas generativas localizan valores de argumento erróneos, el veredicto detecta llamadas holísticamente equivocadas, y cuando no se sabe el tipo de error, un ensamble es la opción de bajo arrepentimiento.

En tareas de codificación difíciles, el método alcanza AUROC 0.825 frente al 0.598 de la confianza declarada por el agente (casi azar). Las lecturas generativas superan a esa confianza entre +0.07 y +0.28 en tres agentes adicionales. Frente a la auto-consistencia, gana +0.14 a +0.19 en agentes casi deterministas a una fracción 1/K del coste. La señal alimenta dos modos de despliegue: una compuerta en tiempo real que escala las llamadas menos fiables a revisión, y retroalimentación de confianza que devuelve el resultado de la herramienta acompañado de la puntuación. La compuerta mejora la precisión de las acciones aceptadas entre +0.05 y +0.30 con cobertura del 50%. La retroalimentación eleva el éxito de tarea en benchmarks de ejecución real en +0.119 y +0.137 (p ≤ 1e-4). Supera un control de valor aleatorio, donde los errores de paso son silenciosos, en +0.078 (p = 0.003). Todo esto cuesta un solo prefill junto a la llamada de herramienta y no requiere acceso a los internos del agente.

## Lo que no se sabe

El artículo no revela qué modelo sustituto de pesos abiertos se usa, ni su arquitectura ni detalles de entrenamiento. Tampoco especifica la implementación exacta del ensamble cuando el tipo de error es desconocido, ni la naturaleza concreta de las tareas de codificación difíciles y los benchmarks empleados. No se detalla el coste computacional ni la latencia de ejecutar el sustituto en paralelo, ni se discuten modos de fallo donde el sustituto también se equivoque. Queda sin aclarar cómo maneja el sustituto distintos esquemas de herramientas o firmas de función, si funciona en arquitecturas LLM distintas, cómo gestiona conjuntos de herramientas dinámicos o en evolución, y si la generalización se extiende más allá de codificación a razonamiento o planificación.
