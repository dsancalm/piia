---
title: "Cerebras y OpenAI lanzan Ultrafast Mode con 750 tokens por segundo"
summary: "El nuevo modo Ultrafast de la API de OpenAI, impulsado por chips de Cerebras, alcanza 750 tokens por segundo y completa el examen HLE en 11 horas frente a las 78 de Claude Fable 5."
lang: es
story: cerebras-and-openai-launch-gpt-5-6
publishedAt: 2026-08-14T08:00:04.913Z
sourceUrl: "https://www.cerebras.ai/blog/accelerating-gpt-5-6-sol-ultrafast-with-openai"
sourceName: "Hacker News (portada)"
priority: flash
tags: [cerebras, openai, velocidad, api]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Cerebras y OpenAI han anunciado Ultrafast Mode, una nueva capa de servicio que se lanza primero en la API de OpenAI y que está impulsada por los chips Wafer-Scale Engine de Cerebras. El modo Ultrafast está disponible desde hoy en vista previa limitada para un grupo selecto de clientes, y el acceso se irá ampliando.

La cifra que importa es la velocidad de salida: hasta 750 tokens por segundo sin degradar la calidad. Según los datos de Artificial Analysis, GPT-5.6 Sol en modo Ultrafast es 11 veces más rápido que Fable 5 y 5 veces más rápido que Opus 4.8 en modo Fast. En la prueba GDP-Val, la aceleración de extremo a extremo fue de 5.6 veces.

El rendimiento no es solo una cifra de banco de pruebas. En Humanity's Last Exam (HLE), GPT-5.6 Sol en modo Ultrafast completó las 2.500 preguntas en 11 horas y 11 minutos. Claude Fable 5 necesitó 78 horas y 27 minutos. Son 7 veces menos tiempo para el mismo trabajo.

La arquitectura de Cerebras explica parte de la ventaja. Cada chip del tamaño de una oblea incluye 44 GB de SRAM, lo que permite mantener los pesos del modelo en el propio chip y evitar el cuello de botella de mover datos a memoria externa. Ahí está la diferencia con las GPUs tradicionales, que tienen que ir a buscar los pesos fuera.

Para quien programa, esto cambia el diseño de aplicaciones en tiempo real. Con una salida a 750 tokens por segundo, un agente de IA puede intervenir en una conversación sin que el usuario note la espera. Se reduce la necesidad de paralelizar tareas para compensar la latencia, y también la de montar capas de caché o timeouts largos para que la respuesta no se corte. Si la generación es casi instantánea, el modelo puede participar en flujos síncronos donde antes solo cabía una llamada asíncrona.

No se sabe qué clientes forman parte del grupo selecto inicial, ni cuándo se abrirá el acceso general. Tampoco hay precios públicos para el modo Ultrafast en la API de OpenAI, ni datos sobre la latencia del primer token o el comportamiento con contextos largos. La fuente no aclara si el modo estará disponible para otros modelos de OpenAI o solo para GPT-5.6 Sol.
