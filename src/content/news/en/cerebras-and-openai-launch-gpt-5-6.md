---
title: "Cerebras and OpenAI launch GPT-5.6 Sol Ultrafast Mode at 750 tokens per second"
summary: "The new tier, powered by Cerebras Wafer-Scale Engine chips, is 11 times faster than Claude Fable 5 in output speed. It cuts a 2,500-question benchmark from 78 hours to 11, with no quality loss. Pricing and general availability remain unannounced."
lang: en
story: cerebras-and-openai-launch-gpt-5-6
publishedAt: 2026-08-14T08:00:04.913Z
sourceUrl: "https://www.cerebras.ai/blog/accelerating-gpt-5-6-sol-ultrafast-with-openai"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ai, inference, cerebras, openai]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Cerebras y OpenAI han presentado Ultrafast Mode, un nuevo nivel de servicio para GPT-5.6 Sol que alcanza hasta 750 tokens de salida por segundo. El modo se lanza primero en la API de OpenAI y está impulsado por los chips Wafer-Scale Engine de Cerebras, que mantienen los pesos del modelo en 44 GB de SRAM por chip.

La comparación con otros modelos es directa. Según las velocidades reportadas por Artificial Analysis, GPT-5.6 Sol en modo Ultrafast es 11 veces más rápido que Claude Fable 5 y 5 veces más rápido que Opus 4.8 en modo Fast. En la evaluación HLE, el modelo completó las 2,500 preguntas en 11 horas y 11 minutos, frente a las 78 horas y 27 minutos de Fable 5. La prueba GDP-Val muestra una aceleración de extremo a extremo de 5.6 veces sin degradación de calidad.

## Qué cambia para el código

La velocidad de salida afecta directamente a cómo diseñas aplicaciones con agentes. Con 750 tokens por segundo, un agente que genera una respuesta de 500 tokens tarda menos de un segundo en completarla. Eso permite integrar el modelo en rutas críticas sin necesidad de paralelizar tareas, gestionar timeouts agresivos o mostrar respuestas parciales mientras el modelo termina.

El coste de inferencia también se ve afectado. Si el precio por token se mantiene igual, una aceleración de 5.6 veces en el tiempo de cómputo reduce el coste por solicitud completada de forma proporcional. No se han publicado los precios de Ultrafast Mode en la API de OpenAI, así que el ahorro real depende de la estructura de tarifas que anuncien.

## Lo que no se sabe

La fuente no especifica qué clientes forman parte del grupo selecto inicial ni cuándo se expandirá el acceso. No se indican los precios del modo Ultrafast. Tampoco se detalla la latencia del primer token, el rendimiento en modelos más pequeños o con contextos largos, ni si el modo estará disponible para otros modelos de OpenAI además de GPT-5.6 Sol. La fecha de lanzamiento general se limita al 13 de agosto de 2026, sin más concreción.
