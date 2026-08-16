---
title: "CORS Chat: chatea con APIs de OpenAI desde el navegador sin código"
summary: "Simon Willison lanzó CORS Chat, una herramienta web que conecta con cualquier endpoint compatible con OpenAI Responses desde el navegador. La usó para probar modelos locales como Qwen 3.8 27B en LM Studio y OpenRouter, sin necesidad de escribir cliente HTTP."
lang: es
story: cors-chat-lets-you-test-llm-apis
publishedAt: 2026-08-16T07:08:53.938Z
sourceUrl: "https://simonwillison.net/2026/Aug/15/cors-chat/"
sourceName: "Simon Willison"
priority: flash
tags: [herramienta, api, llm]
generatedBy: deepseek/deepseek-v4-flash-0731
---
CORS Chat es una herramienta web que permite chatear con cualquier endpoint de API compatible con OpenAI Responses directamente desde el navegador, siempre que el endpoint soporte cabeceras CORS. La construyó Simon Willison el 15 de agosto de 2026, usando GPT-5.6-Sol xhigh, y la usó para probar Qwen 3.8 27B ejecutándose en LM Studio en un M5 MacBook Pro y en un NVIDIA DGX Spark.

La interfaz es una página web que apunta a un endpoint de chat y le envía mensajes. No hay que escribir código de cliente. La prueba de fuego fue contra LM Studio con la opción `--cors`:

```
--cors
```

Con esa bandera, LM Studio habilita las cabeceras necesarias y CORS Chat funciona. También lo probó contra OpenRouter y funciona igual.

Dos detalles útiles para el trabajo diario. Las conversaciones se guardan en el navegador y se pueden exportar como JSON copiado y pegado. Y la herramienta detecta imágenes SVG que se están generando y las renderiza progresivamente en el chat mientras los tokens siguen llegando. Eso permite ver el resultado de un modelo de imagen sin esperar a que termine la generación completa.

Para quien programa con LLMs locales, esto quita un paso intermedio. Normalmente, probar un endpoint de chat implica montar un cliente HTTP, gestionar la autenticación y parsear la respuesta. Aquí abres la página, pegas la URL del endpoint y ya puedes conversar. Si el modelo falla, el fallo está en el endpoint o en la configuración de CORS, no en tu código.

## Lo que no se sabe

La fuente no especifica la URL pública ni el repositorio donde se puede acceder o descargar CORS Chat. Tampoco detalla cómo se configuran cabeceras personalizadas en la interfaz, ni si la herramienta soporta autenticación o claves API para endpoints que lo requieran. No se menciona si hay límites en el tamaño de las conversaciones guardadas localmente.
