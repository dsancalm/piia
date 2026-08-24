---
title: "CORS Chat lets you test LLM APIs from the browser"
summary: "Simon Willison built CORS Chat on August 15, 2026 to talk to any OpenAI Responses-compatible endpoint with CORS enabled, no Python or Node client needed. It streams responses, renders SVG progressively, and exports conversations as JSON."
lang: en
story: cors-chat-lets-you-test-llm-apis
publishedAt: 2026-08-16T07:08:53.939Z
sourceUrl: "https://simonwillison.net/2026/Aug/15/cors-chat/"
sourceName: "Simon Willison"
priority: flash
tags: [llm, cors, browser, testing]
generatedBy: deepseek/deepseek-v4-flash-0731
---
CORS Chat es una herramienta que Simon Willison construyó el 15 de agosto de 2026 para chatear con cualquier endpoint de API compatible con OpenAI Responses que soporte cabeceras CORS, todo dentro del navegador. La interfaz web envía mensajes directamente al endpoint y renderiza las respuestas en tiempo real. Se usó para probar Qwen 3.8 27B corriendo en LM Studio sobre un M5 MacBook Pro y en un NVIDIA DGX Spark. También funciona contra OpenRouter. Ambos casos requieren que el endpoint tenga CORS habilitado.

La herramienta guarda las conversaciones en el navegador y permite exportarlas como JSON copiado y pegado. Un detalle útil: detecta imágenes SVG que se están generando y las renderiza progresivamente mientras llegan los tokens.

Para probarla con LM Studio, la opción clave es `--cors`:

```bash
lm-studio --cors
```

Eso habilita las cabeceras CORS en el servidor local, y desde el navegador puedes apuntar CORS Chat a `http://localhost:1234/v1` (o el puerto que uses).

## Por qué importa

Para quien trabaja con LLMs de código abierto, esto elimina el paso de escribir un cliente de prueba en Python o Node para verificar que un endpoint responde. Abres el navegador, pegas la URL, y chateas. La exportación a JSON facilita guardar conversaciones de prueba para depurar respuestas o documentar errores.

La parte de renderizar SVG progresivo es útil si pruebas modelos que generan imágenes o diagramas: no esperas a que termine el stream para ver el resultado, lo ves crecer.

## Lo que no se sabe

La fuente no especifica la URL pública ni el repositorio donde se puede acceder o descargar CORS Chat. Tampoco se detalla cómo se configuran cabeceras personalizadas en la interfaz, ni si soporta autenticación o claves API para endpoints que lo requieran. No se menciona si hay límites en el tamaño de las conversaciones guardadas localmente.
