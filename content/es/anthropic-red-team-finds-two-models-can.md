---
title: "Modelos de IA logran primeros secuestros de flujo de control en pruebas de"
summary: "GLM-5.3 y Claude Mythos Preview superan el 0 % de sus predecesores en la misma batería de 100 tareas, cruzando el umbral de la explotación automatizada avanzada."
lang: es
story: anthropic-red-team-finds-two-models-can
publishedAt: 2026-09-30T12:57:11.783Z
sourceUrl: "https://simonwillison.net/2026/Sep/29/anthropic-frontier-red-team/"
sourceName: "Simon Willison"
priority: urgent
tags: [ciberseguridad, ia, exploit, benchmark]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El equipo Frontier Red Team de Anthropic ha publicado resultados de su benchmark interno de explotación binaria que marcan un antes y un después. Evaluaron varios modelos sobre 100 tareas seleccionadas al azar. GLM-5.3 consiguió secuestros completos del flujo de control en el 4 % de los ensayos. Claude Mythos Preview subió al 6 %. Sus predecesores inmediatos, Claude Opus 4.6 y GLM-5.2, no lograron ninguno.

El dato procede de la publicación "GLM-5.3 and the spread of advanced cyber capabilities" y fue recogido por Simon Willison el 29 de septiembre de 2026. La cita textual es:

> "GLM-5.3 achieved full control flow hijacks on 4% of trials. Claude Mythos Preview achieved full control flow hijacks on 6% of trials. Previous models (Claude Opus 4.6, GLM-5.2) achieved 0% on the same 100 tasks."

No hay código de exploit en la fuente, solo la métrica agregada. El salto del 0 % al 4-6 % en la misma batería de pruebas indica que la barrera para la explotación automatizada avanzada se ha cruzado. Hasta ahora, los modelos de frontera fallaban sistemáticamente en tareas que requieren encadenar primitivas de corrupción de memoria, calcular offsets dinámicos y construir cadenas ROP o JOP funcionales. Que dos arquitecturas distintas lo logren en un porcentaje no trivial sugiere que la capacidad ha dejado de ser anecdótica.

## Qué no se sabe

- Qué constituye exactamente una tarea en el benchmark interno de Binary Exploitation.
- Cuál es la definición técnica precisa de "full control flow hijack" usada en la evaluación.
- Qué otros modelos se evaluaron además de los cuatro mencionados.
- Cuál es la distribución completa de resultados (no solo las tasas de éxito agregadas).
- Si el benchmark y la metodología han sido publicados o revisados por terceros.
- Qué implicaciones tiene este umbral para la política de despliegue de estos modelos.
