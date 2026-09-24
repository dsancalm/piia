---
title: "Google lanza Gemini 3.8 Flash TTS con 2.000 voces y personalización"
summary: "Dos nuevos modelos de texto a voz, Flash y Flash-Lite, permiten crear voces custom con 30 segundos de audio. Un playground de Simon Willison permite probar la API en navegador y compartir conversaciones generadas."
lang: es
story: google-releases-gemini-3-8-flash-text
publishedAt: 2026-09-24T12:05:05.484Z
sourceUrl: "https://simonwillison.net/2026/Sep/23/gemini-tts-playground/"
sourceName: "Simon Willison"
priority: flash
tags: [gemini, tts, voz, ia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google ha publicado dos modelos de texto a voz bajo la familia Gemini 3.8: `gemini-3.8-flash-tts` y `gemini-3.8-flash-lite-tts`. La biblioteca incluye más de 2.000 voces predefinidas y permite crear voces personalizadas a partir de una muestra de 30 segundos de audio del que el usuario tenga los derechos. Simon Willison ha publicado un *playground* "trae tu propia clave" que expone la API directamente en el navegador, aprovechando la política CORS abierta del endpoint de Gemini. La interfaz fue escrita con asistencia de GPT-6 Astra y permite definir conversaciones multipersonaje asignando una voz y unas instrucciones de estilo a cada interlocutor.

El *playground* genera una URL con los parámetros de la composición, de modo que se puede guardar y compartir el enlace para reproducir exactamente la misma petición. En la demo, dos pelícanos discuten si mudarse al muelle de Pacifica; el guion lo escribió Claude 4.5 Opus, que también generó el enlace directo para renderizarlo. La generación de 1 minuto y 18 segundos de audio con el modelo Flash tardó unos 20 segundos y costó 2,74 céntimos de dólar. El Flash-Lite no tiene precio público todavía.

```text
gemini-3.8-flash-tts
gemini-3.8-flash-lite-tts
```

### Lo que no se sabe
- Precio del modelo Flash-Lite ni cuotas de tasa (rate limits) de la API.
- Formato de salida (codec, frecuencia de muestreo, bitrate).
- Longitud máxima de texto por petición.
- Si las 2.000+ voces son modelos preentrenados o se sintetizan bajo demanda.
- Términos de licencia para uso comercial del audio generado.
- Regiones donde están disponibles los modelos.
- Latencia en streaming frente a generación por lotes.
- Si las instrucciones de estilo usan SSML o un formato propietario.
- Detalles de autenticación más allá de "trae tu propia clave".
