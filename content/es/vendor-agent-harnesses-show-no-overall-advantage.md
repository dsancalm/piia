---
title: "El harness nativo no supera al neutro con el mismo modelo base"
summary: "Un estudio controlado con 792 ejecuciones sobre 256 tareas privadas muestra que el SDK de Anthropic resuelve el 48,8 % frente al 50,0 % de deepagents en Opus 4.8, y el SDK de OpenAI Codex alcanza el 55,6 % frente al 54,4 % en GPT-5.5."
lang: es
story: vendor-agent-harnesses-show-no-overall-advantage
publishedAt: 2026-09-14T13:28:47.204Z
sourceUrl: "https://arxiv.org/abs/2609.11987"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [benchmark, llm, evaluacion, estadistica]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El harness nativo del proveedor no da una ventaja real frente a uno neutro cuando se usa el mismo modelo base. El estudio ejecuta 792 de las 800 ejecuciones planificadas sobre una suite privada de 256 tareas , repositorios y concursos posteriores al corte de entrenamiento, controlada por contaminación, calificadas por un oráculo aislado. Con claude-opus-4-8, el SDK nativo de Anthropic resuelve el 48,8 % frente al 50,0 % de deepagents; con gpt-5.5, el SDK de OpenAI Codex alcanza el 55,6 % frente al 54,4 % del harness neutro. En ambos casos la diferencia cae dentro del intervalo de confianza bootstrap del 95 % y no es estadísticamente significativa.

## Rendimiento por tipo de tarea

La media oculta una asimetría fuerte en Opus 4.8. En 61 tareas de repositorio el harness nativo pierde 9,0 puntos porcentuales frente a deepagents, mientras que en 19 tareas de concurso gana 23,7 pp (p = 0,003, test de permutación de etiquetas). La partición repositorio/concurso se eligió tras ver los datos; los autores advierten que hace falta una replicación diseñada a priori para confirmar el patrón. En GPT-5.5 no se reporta una división análoga con significación equivalente.

## Coste por tarea resuelta

Re-preciando el uso bruto por turno a precios de lista congelados, deepagents cuesta entre 1,3 y 1,6 veces más por tarea resuelta en Opus 4.8 y 1,2 veces más en GPT-5.5. Sin embargo, 58 ejecuciones en la cuenta Anthropic no dejaron registro de uso; asignando ese gasto desconocido a cualquiera de las celdas, el ratio de coste de Opus se mueve entre 0,7 y 2,3. El ordenamiento por coste facturado queda sin resolver. La revisión del 8 de septiembre de 2026 corrige un manuscrito de agosto cuyas cifras de coste se basaban en un defecto de semántica de uso en la telemetría propia (sección 5.1).

## Ejecuciones canceladas con parche válido

Veintidós de las 81 ejecuciones canceladas por límite de wall-clock habían producido ya un parche que pasaba los tests. El límite exacto de tiempo no se especifica en la fuente.

## Qué no se sabe

- Cuáles son exactamente las 256 tareas; la suite permanece privada.
- Por qué se eligió la partición repositorio/concurso tras ver los datos y cuál sería el resultado en una replicación diseñada a priori.
- El coste real facturado en la cuenta Anthropic; las 58 ejecuciones sin registro impiden resolver el ordenamiento.
- Si los hallazgos se generalizan a otros modelos, harnesses o suites públicas.
- Detalles del defecto de semántica de uso en la telemetría propia más allá de que corrigió las cifras de coste.
- Por qué gemini-3.5-flash y deepseek-v3.2 fueron solo celdas laterales y no parte de los contrastes principales pareados.
- Cuál fue el límite exacto de wall-clock que causó las 81 cancelaciones.
