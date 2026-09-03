---
title: "llm-gemini 0.34 añade soporte nativo a Gemini 3.8 Flash con tres niveles de"
summary: "El plugin de Simon Willison permite ajustar la profundidad del pensamiento del nuevo modelo de Google (low, medium, high) desde la terminal. En pruebas, generó una página HTML animada en 13 segundos por 1,8 céntimos y resolvió una tarea completa de desarrollo con..."
lang: es
story: llm-gemini-0-34-adds-gemini-3
publishedAt: 2026-09-03T11:53:57.735Z
sourceUrl: "https://simonwillison.net/2026/Sep/2/llm-gemini/"
sourceName: "Simon Willison"
priority: urgent
tags: [llm, gemini, cli, ia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison ha publicado la versión 0.34 de `llm-gemini`, el plugin que conecta su herramienta de línea de comandos `llm` con los modelos de Google. La novedad principal es el soporte nativo para `gemini-3.8-flash`, el modelo que Google acaba de lanzar y que expone tres niveles de razonamiento configurables: `low`, `medium` y `high`. Esto permite ajustar la profundidad del "pensamiento" del modelo directamente desde la terminal sin escribir código de integración.

El modelo responde rápido y es barato. Willison pidió "make me a cool thing in html" y la generación tardó 13 segundos con un coste de 1,8 céntimos. El resultado fue una página funcional con animaciones CSS y JavaScript vanilla. También ha usado el modelo junto con su plugin `llm-coding-agent` para añadir renderizado HTML mediante `iframe` sandboxed a su herramienta `markdown-svg-renderer`, resolviendo la tarea de principio a fin sin intervención manual.

La versión corrige además el issue #146, aportado por Charlie Tonneslan: las respuestas asíncronas no registraban la versión exacta del modelo resuelta, lo que dificultaba la trazabilidad y la depuración. El parche asegura que los metadatos incluyan esa información en todas las llamadas.

Google ha presentado también una variante "Cyber" de Gemini 3.8 Flash, pero su acceso está restringido a "trusted defenders" y no hay fecha pública de disponibilidad general.

## Lo que no se sabe

- Cuándo ni bajo qué condiciones se abrirá el acceso a Gemini 3.8 Flash Cyber.
- Diferencias cuantitativas de rendimiento entre los niveles `low`, `medium` y `high` más allá de las demostraciones visuales.
- Changelog completo de la versión 0.34 más allá de los issues #146 y #137.
- Detalles de implementación interna de `llm-coding-agent` usado en el ejemplo del `markdown-svg-renderer`.
