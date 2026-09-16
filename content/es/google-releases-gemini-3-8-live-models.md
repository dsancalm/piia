---
title: "Google lanza Gemini 3.8 Live con API WebSocket nativa para voz bidireccional"
summary: "La nueva familia de modelos speech-to-speech expone un socket WebSocket sin SDK obligatorio, permitiendo a los desarrolladores gestionar streaming de audio, interrupciones y VAD a bajo nivel."
lang: es
story: google-releases-gemini-3-8-live-models
publishedAt: 2026-09-16T11:53:37.111Z
sourceUrl: "https://simonwillison.net/2026/Sep/15/gemini-live/"
sourceName: "Simon Willison"
priority: flash
tags: [google, gemini, voz, api]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google ha publicado Gemini 3.8 Live y Gemini 3.8 Live Extended Thinking, sus nuevos modelos speech-to-speech equivalentes a la familia GPT-Live de OpenAI. La novedad práctica para quien programa es que el acceso se hace mediante una API WebSocket nativa, sin SDKs obligatorios, lo que permite controlar el streaming de audio y la interrupción a bajo nivel.

Simon Willison ha publicado una interfaz web de prueba que conecta directamente con el endpoint `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=...`. El código no usa librerías externas: captura y reproduce audio con la Web Audio API (`AudioContext`) y permite elegir modelo, preset de voz, prompt de sistema y mantener una conversación con capacidad de interrupción en el navegador.

La arquitectura es simétrica: el cliente envía frames de audio codificados y recibe frames de audio generados por el modelo en el mismo socket bidireccional. Esto simplifica la latencia respecto a arquitecturas que encadenan STT, LLM y TTS por separado, y deja en manos del desarrollador la gestión de VAD, eco y búferes.

## Lo que no se sabe

- Precio y límites de cuota de los modelos Gemini 3.8 Live.
- Diferencias concretas entre la versión base y Extended Thinking.
- Idiomas y presets de voz soportados por la API.
- Benchmarks de latencia frente a GPT-Live de OpenAI.
- Detalles de autenticación para el parámetro `key` del WebSocket.
- Soporte de function calling o tool use durante la sesión de voz.
- Regiones de disponibilidad y calendario de despliegue.
