---
title: "MERIT mide si la memoria cambia decisiones de agentes y hallan brechas de hasta 60"
summary: "El benchmark evalúa 23.440 episodios por 42,57 dólares y muestra que la memoria eleva el éxito del 0 al 100 % en tareas dependientes, pero la recuperación por embeddings falla en hechos actualizados con variaciones de 45 puntos entre semillas del mismo modelo."
lang: es
story: merit-benchmark-shows-memory-design-shifts-agent
publishedAt: 2026-09-09T12:01:40.887Z
sourceUrl: "https://arxiv.org/abs/2609.05441"
sourceName: "arXiv cs.AI"
priority: routine
tags: [benchmark, memoria, agentes, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
MERIT es el primer benchmark que mide si la memoria a largo plazo cambia realmente las decisiones de uso de herramientas en agentes LLM, no solo si recupera fragmentos de conversación. El paper presenta un harness con tareas episódicas en tres dominios, una escalera de dificultad que llega a recuerdo de hechos actualizados y corrupción controlada, y contabilidad completa de tokens y dólares por operación de memoria. Los experimentos principales suman 23.440 episodios puntuados a un coste total de 42,57 dólares. Se ejecutó un piloto en GPT-4.1-mini y una cuadrícula preregistrada de tres modelos por tres semillas (GPT-4.1, Claude Haiku 4.5) con el lado de memoria fijo. Un spot-check final con Claude Sonnet 5, condicionado a un control de replay completo limpio, reproduce el patrón.

La memoria eleva el éxito en tareas dependientes desde un suelo verificado sin fugas de 0,00 a un rango de 0,55-1,00. Sin embargo, la recuperación por embeddings colapsa de forma impredecible en hechos actualizados: 0,30-0,95 entre modelos y una brecha máxima de 0,45 entre semillas del mismo modelo. Incluso cuando el valor se recupera correctamente, los agentes actúan sobre él solo el 55 % de las veces. Las tiendas de actualización al escribir , structured fact store y resumido por LLM, se mantienen en 0,70-1,00; el enfoque híbrido rinde peor que la fact store sola. Cambiar la implementación de la memoria mueve el éxito de la tarea hasta 60 puntos. El replay completo nunca es económico: la mejor condición por dominio entrega entre 2,7 y 3,9 veces más utilidad marginal por dólar. Los autores liberan el benchmark, el harness y todas las trazas.

## Lo que no se sabe

No se publican los tres dominios concretos de las tareas episódicas. Tampoco se detallan la arquitectura exacta del structured fact store ni el método de resumido por LLM. La definición y el cálculo preciso de la "utilidad marginal por dólar" quedan sin especificar. Las versiones exactas y fechas de corte de GPT-4.1 y Claude Haiku 4.5 no aparecen en el texto. No se describe el leak check automatizado ni sus tasas de falsos positivos y negativos. La configuración del spot-check con Claude Sonnet 5 (tamaño de muestra, semillas) no se da. Se desconoce por qué el enfoque híbrido rinde peor que la fact store sola. No se aclara qué significa "gated on a clean full-replay control" en ese spot-check. Finalmente, no se indica la licencia ni el repositorio donde están disponibles el código, los datos y las trazas.
