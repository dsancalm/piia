---
title: "Subagentes con contratos claros superan a skills en tareas largas"
summary: "El exceso de contexto degrada el razonamiento al encadenar skills; aislar cada paso en subagentes con contratos definidos evita esa contaminación, aunque añade coste de coordinación."
lang: es
story: subagents-beat-skills-for-long-llm-tasks
publishedAt: 2026-09-11T12:04:40.623Z
sourceUrl: "https://arxiv.org/abs/2609.09233"
sourceName: "arXiv cs.AI"
priority: routine
tags: [llm, agentes, contexto, arquitectura]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un artículo en arXiv compara dos formas de reutilizar conocimiento en agentes basados en LLM: cargar instrucciones en la ventana de contexto principal (agent skills) o delegar en subagentes con contextos independientes. La conclusión principal es que la degradación del razonamiento por exceso de contexto hace que los skills fallen en tareas de horizonte largo, mientras que los subagentes funcionan cuando sus contratos de entrada y salida están bien definidos y sus instrucciones codifican el procedimiento para cumplirlos. El coste es un overhead de tokens para coordinar al agente principal con los subagentes.

Los agent skills se empaquetan como conjuntos multi-archivo que incluyen instrucciones, scripts y recursos para una tarea concreta. Funcionan mientras el contexto cabe sin ruido, pero a medida que crece la cadena de habilidades la calidad del razonamiento cae. Los subagentes evitan esa contaminación: cada uno recibe una ventana fresca, ejecuta su parte y devuelve solo lo que el contrato exige. El paper no revela qué benchmarks se usaron (ALFWorld, WebShop, SWE-bench u otros), qué modelos base se probaron (GPT-4, Claude, Llama, etc.) ni cifras absolutas de overhead, latencia, coste o tasas de éxito. Tampoco aclara si hay repositorio público ni criterios formales para decidir cuándo mezclar ambos enfoques.

## Qué no se sabe

- Benchmarks y tareas concretas de evaluación.
- Modelos base, temperatura y límites de tokens.
- Overhead de coordinación en tokens absolutos o porcentuales.
- Definición formal y métrica de "clear input-output contracts".
- Disponibilidad de código abierto (GitHub, pip, etc.).
- Resultados numéricos: accuracy, success rate, latencia, coste por tarea.
- Existencia de arquitectura híbrida o regla de decisión entre skills y subagentes.
