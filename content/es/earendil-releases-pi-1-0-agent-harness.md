---
title: "Earendil lanza Pi 1.0 con Codemode y soporte MCP bajo licencia MIT"
summary: "El arnés minimalista estrena versión estable con un instalador de un comando y cientos de miles de usuarios semanales. Añade selección dinámica de modelos, coste por uso y Pi Durable para tareas de larga duración, todo sin vendor lock-in."
lang: es
story: earendil-releases-pi-1-0-agent-harness
publishedAt: 2026-10-02T12:57:33.582Z
sourceUrl: "https://earendil.com/posts/pi-1-0/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [agentes, cli, mit, mcp]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Pi 1.0 ya está aquí y llega con suficientes cambios como para justificar una mirada atenta. Earendil ha estabilizado su arnés de agente minimalista y lo lanza bajo licencia MIT, con un instalador de un solo comando que reduce la barrera de entrada a casi nada. Cientos de miles de usuarios lo usan ya cada semana, lo que significa que el proyecto no es un experimento vacío sino una herramienta con tracción real.

Lo nuevo en esta versión 1.0 no es solo un salto de versión. Pi introduce Codemode, un soporte nativo para MCP y para modelos no-LLM como Jev, que permite que el agente decida dinámicamente qué modelo usar para cada paso de una tarea. Por ejemplo, puede planificar con Claude Opus, implementar con GPT y mostrar el coste por modelo y uso de caché. También añade soporte para extensiones de modelos virtuales, carga diferenciada de herramientas, calentamiento de caché para modelos Anthropic, mensajes de sistema mid-conversación, un nuevo tema TUI y modo pantalla completa por defecto. Todo esto sin perder el minimalismo que define a Pi: no es un framework, es un arnés.

Paralelamente, Earendil lanza Pi Durable, un paquete experimental para aplicaciones agenticas de larga duración. Comparte el mismo ADN: minimalismo, extensibilidad y MIT. Se distribuye como tres paquetes npm: @earendil-works/pi-durable, @earendil-works/pi-ai y @earendil-works/chord. No hay benchmarks públicos ni roadmap detallado, y la documentación admite que es experimental. Pero el hecho de que esté disponible desde el día uno con un comando de npm es ya una señal.

Para quien programa, lo interesante es que Pi 1.0 no te fuerza a usar su ecosistema. Puedes instalarlo, personalizarlo, extenderlo o usarlo como base para algo propio. No hay vendor lock-in, no hay dependencia de una plataforma cerrada, y el código está en github.com/earendil-works/pi. Si estás cansado de agentes que te atan a proveedores específicos o que vienen con diez capas de abstracción innecesarias, Pi 1.0 es una alternativa directa que no pide disculpas por ser minimalista.

Lo que no se sabe: la fecha exacta de la versión previa, el número total de contribuyentes, benchmarks de rendimiento, detalles técnicos de Pi Durable más allá de sus principios, compatibilidad con versiones anteriores, modelos de imagen y Jev soportados específicamente, y métricas de adopción de Pi Durable tras su lanzamiento. La documentación es clara sobre qué es, pero no sobre qué tan maduro es.
