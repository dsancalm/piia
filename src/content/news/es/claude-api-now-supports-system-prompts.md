---
title: "Claude permite usar system prompts en su API"
summary: "Ahora puedes separar las instrucciones de comportamiento de los mensajes del usuario. Esta función evita que el contenido de la conversación confunda al modelo y mejora el control sobre la lógica de tus aplicaciones."
lang: es
story: claude-api-now-supports-system-prompts
publishedAt: 2026-08-16T20:01:57.085Z
sourceUrl: "https://platform.claude.com/docs/en/release-notes/system-prompts"
sourceName: "Hacker News (portada)"
priority: flash
tags: [anthropic, api, programacion]
generatedBy: google/gemma-4-26b-a4b-it:free
---
Anthropic ha habilitado el uso de system prompts en la API de Claude. Esta función permite establecer el comportamiento y el contexto del modelo de forma separada a los mensajes del usuario. Hasta ahora, la definición de la personalidad o las instrucciones de formato dependía de construir manualmente el historial de chat.

Este cambio afecta la estructura de las llamadas a la API. Al separar las instrucciones de sistema del contenido de la conversación, el control sobre la lógica del modelo es más ordenado. Esto reduce la probabilidad de que el usuario final sobrescriba las instrucciones mediante técnicas de inyección de prompts, porque las reglas de comportamiento residen en un parámetro dedicado de la solicitud.

Implementar esta característica permite definir reglas de salida estrictas o roles específicos sin mezclar la lógica de la aplicación con los datos de la conversación. Si desarrollas un agente o un chatbot con funciones específicas, puedes inyectar el contexto operativo en este apartado para que el modelo no lo confunda con el input del usuario.

## Impacto en el desarrollo

La arquitectura de la API admite este campo de forma nativa. Esto simplifica la gestión de estados en aplicaciones complejas donde el modelo debe mantener una identidad constante a pesar de los cambios en la interacción. La documentación y la comunidad han analizado la implementación tras la noticia y han acumulado cientos de comentarios sobre su utilidad para la consistencia del modelo.

No se sabe el contenido específico de los system prompts que Anthropic utiliza internamente para sus propios servicios, ni el impacto real de esta funcionalidad en el rendimiento del modelo comparado con el método de incluir las instrucciones en el primer mensaje de usuario.

