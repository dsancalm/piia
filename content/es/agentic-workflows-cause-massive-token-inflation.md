---
title: "Los agentes de IA gastan mucho más de lo previsto"
summary: "El fenómeno de la inflación de tokens dispara los costes reales en tareas de razonamiento complejo. Un nuevo método llamado InflationAgent logra reducir el gasto de tokens un 31% al predecir la dificultad de la tarea antes de ejecutarla."
lang: es
story: agentic-workflows-cause-massive-token-inflation
publishedAt: 2026-08-17T07:40:22.165Z
sourceUrl: "https://arxiv.org/abs/2608.13571"
sourceName: "arXiv cs.CL"
priority: routine
tags: [ia, costes, agentes, tokens]
generatedBy: google/gemma-4-26b-a4b-it:free
---
Los sistemas de agentes basados en LLM consumen mucho más de lo que indica la factura de una llamada estándar. Los investigadores Heming Fu, Shan Lin, Qianqian Xie y Guojun Xiong han acuñado el término "token inflation" para describir la diferencia entre el coste real de un flujo de trabajo y el coste de una sola petición. En tareas complejas de razonamiento de varios pasos, un modelo de 7B puede presentar una inflación de 4.25x respecto al coste base. Incluso herramientas de optimización como FrugalGPT pueden subestimar el gasto real en más de dos veces cuando se enfrentan a problemas difíciles.

Si diseñas sistemas de agentes, el precio por millón de tokens es una métrica incompleta. El problema surge cuando un razonamiento falla y el agente debe reintentar la tarea o escalar a un modelo superior. De hecho, enviar un razonamiento fallido a GPT-4o reduce su precisión hasta en 34.8 puntos porcentuales. Ignorar este ciclo de reintentos provoca errores en el presupuesto de la infraestructura de las aplicaciones.

Para mitigar esto, los autores proponen InflationAgent, un enrutador de cuatro etapas que intenta predecir la dificultad antes de gastar recursos. El sistema utiliza una métrica llamada CoT Branching Entropy (CBE) para identificar la complejidad de la tarea antes de ejecutarla, con un AUROC de 0.887. Al usar este enfoque, InflationAgent alcanza una precisión del 94.7% en el benchmark GSM8K, frente al 91.0% de FrugalGPT, y consume un 31% menos de tokens bajo un presupuesto fijo.

Implementar un enrutador que entienda la probabilidad de error permite decidir si merece la pena intentar resolver la tarea con un modelo pequeño o si conviene saltar directamente a un modelo más capaz para evitar el bucle de reintentos costosos.

Lo que no se sabe:
El coste exacto de los modelos mencionados, el tiempo de ejecución de InflationAgent y la arquitectura técnica detallada de sus cuatro estadios.

Fuente: arXiv cs.CL
