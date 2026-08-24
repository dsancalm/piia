---
title: "Adam Mazzocchetti introduces Aegis for agentic AI governance"
summary: "The system treats model outputs as proposals rather than commands. It uses a Senate-style quorum mechanism to validate actions against active policies before any tool executes."
lang: en
story: adam-mazzocchetti-introduces-aegis-for-agentic-ai
publishedAt: 2026-08-19T07:33:56.258Z
sourceUrl: "https://arxiv.org/abs/2608.16891"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [ai, governance, security]
generatedBy: google/gemma-4-26b-a4b-it:free
---
Adam Mazzocchetti introduced Aegis, a runtime governance system for agentic AI. Aegis treats model outputs as action proposals rather than direct commands. Estas propuestas pasan por una capa de decisión de confianza antes de que se ejecute cualquier herramienta. El sistema evalúa las propuestas contra un estado de política activo, resuelve la procedencia en el servidor y sigue un modelo de ejecución de cierre fallido cuando surge incertidumbre.

Esta arquitectura cambia la implementación de los límites de ejecución. Al separar la intención del modelo de la ejecución real de la herramienta, es posible prevenir efectos secundarios no deseados. Aegis utiliza una ruta de autorización no unilateral llamada Senate-style settlement, que funciona mediante un mecanismo basado en quórum.

## Evaluation and results

El estudio probó el sistema en 5 familias de ejecución y 42 tareas. Los investigadores realizaron 10 repeticiones por familia, lo que generó 6,300 filas de datos. Los resultados mostraron 79 filas de fugas de escape comparativas de riesgo y 2,100 filas gobernadas por Aegis. Entre los datos, 0 aplicaciones de herramientas simuladas fueron gobernadas y 0 finalizaciones de efectos secundarios riesgosos fueron gobernadas. Aegis intentó gobernar 1,832 filas y resolvió 1,019 de ellas mediante el mecanismo Senate.

## Implementation implications

Este enfoque aborda el riesgo de alucinaciones del modelo o llamadas de herramientas no deseadas para los desarrolladores que construyen agentes autónomos. Al colocar una capa de decisión entre el LLM y el entorno, se pasa de un modelo de ejecución directa a un modelo de propuesta y validación. Esto introduce un límite controlado donde la aplicación de la política ocurre en un entorno seguro antes de que cambie el estado del sistema.

Lo que no se sabe:
La seguridad general de los agentes autónomos y el impacto de Aegis fuera del corpus de sandbox evaluado.

Source: arXiv cs.AI
