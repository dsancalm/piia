---
title: "OpenAI anuncia Dots, una primitiva para agentes persistentes"
summary: "La entrada aparece en el blog oficial y alcanza la portada de Hacker News con 658 puntos. Promete infraestructura nativa para procesos que mantienen estado y ejecutan tareas largas sin sesión de chat abierta, pero OpenAI no ha publicado código, precios, fecha de lanzamiento..."
lang: es
story: openai-teases-dots-an-always-on-agent
publishedAt: 2026-09-30T12:54:40.349Z
sourceUrl: "https://openai.com/index/introducing-dots/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [openai, agentes, api, hn]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
OpenAI ha publicado en su blog oficial un artículo titulado "Introducing Dots". La entrada ha llegado a la portada de Hacker News, donde acumula 658 puntos y 521 comentarios en el hilo con ID 49896604. El título y la repercusión sugieren una nueva primitiva para construir software que actúa de forma autónoma y continua, más allá del patrón clásico de petición y respuesta.

La discusión en Hacker News gira en torno a la idea de "agentes always-on": procesos que persisten en segundo plano, mantienen estado y ejecutan tareas largas sin necesidad de que un usuario mantenga abierta una sesión de chat. Hasta ahora, los desarrolladores han tenido que montar esa capa ellos mismos combinando la API de Assistants, colas de trabajo, bases de datos vectoriales y lógica de reintentos. Si Dots resuelve esa infraestructura de forma nativa, elimina una cantidad considerable de código pegamento.

El artículo de OpenAI no incluye fragmentos de código ni ejemplos de llamada a API en el extracto visible. Tampoco especifica si Dots es un producto independiente, una extensión de la Assistants API o una capacidad del modelo subyacente. Los comentarios en HN especulan con que pueda tratarse de una capa de orquestación gestionada que expone eventos en streaming, *webhooks* o una interfaz de *long-running operations*, pero no hay confirmación oficial.

Lo que no se sabe:
- Qué son exactamente Dots: definición técnica, capacidades, arquitectura.
- Cuál es la fecha de lanzamiento o disponibilidad (beta, general, solo investigación).
- Cómo se relacionan con los agentes previos de OpenAI (Operator, Deep Research, Assistants API).
- Qué modelo o modelos subyacen a Dots.
- Precios, límites de uso o requisitos de suscripción (Plus, Pro, Enterprise, API).
- Casos de uso concretos mostrados en el artículo.
- Detalles de privacidad, retención de datos o ejecución local frente a cloud.
