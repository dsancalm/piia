---
title: "Lemmalog: un motor Datalog para dar memoria de trabajo a los agentes LLM"
summary: "Jordy Zomer ha creado Lemmalog, un motor Datalog que gestiona hechos, reglas y su procedencia con invalidación incremental. Permite al modelo mantener el estado del conocimiento en sesiones largas, retractar conclusiones cuando cambian los datos y consultar por qué se llegó..."
lang: es
story: lemmalog-gives-llm-agents-a-retractable-memory
publishedAt: 2026-08-29T12:51:17.718Z
sourceUrl: "https://pwning.systems/posts/llm-memory-program-analysis/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [datalog, llm, memoria, seguridad]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Jordy Zomer, investigador de vulnerabilidades, se topó con un problema recurrente al usar agentes LLM en sesiones largas: el modelo pierde el hilo, repite enfoques descartados y se apoya en observaciones que ya no valen. Los sistemas de memoria habituales almacenan conversaciones, las embeben y recuperan las más relevantes, pero no mantienen el estado actual del conocimiento ni invalidan conclusiones cuando un hecho cambia.

Zomer modeló el problema como análisis de programas: hechos más reglas producen hechos derivados, con un punto fijo y actualización incremental cuando cambian las entradas. De ahí nació Lemmalog, un motor Datalog diseñado para actuar como memoria de trabajo del LLM. El modelo extrae hechos estructurados de lenguaje natural, código o salida del depurador; Lemmalog gestiona la derivación determinista, la invalidación incremental y la procedencia de cada conclusión.

```datalog
controls ( attacker , object_a ).
points_to ( object_a , object_b ).
kernel_object ( object_b ).
```

```datalog
controls_kernel_object ( Attacker ) :-
    controls ( Attacker , ObjectA ),
    points_to ( ObjectA , ObjectB ),
    kernel_object ( ObjectB ).
```

```datalog
controls_kernel_object ( attacker ).
```

El motor soporta retracciones con seguimiento de dependencias: un hecho derivado puede tener varias justificaciones y solo se invalida cuando desaparecen todas. Permite consultar la procedencia de cualquier conclusión mostrando el árbol de observaciones y reglas que la sustentan. Los hechos pueden llevar intervalos de validez temporales, de modo que se sabe si un primitivo es viable ahora y por qué se creyó viable antes.

## Lo que no se sabe

No hay detalles de implementación del motor Datalog (algoritmo de evaluación incremental, estructuras de datos para procedencia, lenguaje usado). Tampoco se explica cómo se integra Lemmalog con el agente LLM en la práctica: API, formato de intercambio ni frecuencia de sincronización. Faltan métricas de rendimiento: latencia de derivación, tamaño máximo de la base de hechos, overhead de memoria. No hay casos de estudio concretos de vulnerabilidades encontradas con esta herramienta. Desconocemos si el código es open source, dónde está el repositorio y bajo qué licencia. No se describe cómo maneja la extracción inicial de hechos por el LLM (prompts, few-shot, fine-tuning) ni su tasa de error. Tampoco está claro el soporte para negation-as-failure o estratificación en las reglas, ni la escalabilidad a codebases de millones de líneas con miles de hechos simultáneos.
