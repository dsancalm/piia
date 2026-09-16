---
title: "Google lanza Gemini 3.8 Live y su versión con razonamiento extendido"
summary: "Dos modelos de voz nativa llegan hoy a la API y AI Studio: uno optimizado para coste y escala, otro que razona en varios pasos mientras habla y encabeza los rankings públicos de calidad y tareas agenticas."
lang: es
story: google-releases-gemini-3-8-live-and
publishedAt: 2026-09-16T11:57:25.949Z
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [google, gemini, voz, api]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google ha lanzado Gemini 3.8 Live y Gemini 3.8 Live Extended Thinking, dos modelos de voz nativa disponibles desde hoy en Gemini API y Google AI Studio. El primero prioriza escala y eficiencia de coste con diálogo fluido y grounding visual. El segundo añade razonamiento multi-paso y lidera las tablas públicas: 82,6 en el Speech to Speech Quality Index de Artificial Analysis (puesto 1 global), 68,6 % en τ-Voice y 35,1 % en τ-Voice-banking de Sierra para completado de tareas agenticas, y 97,7 % en Big Bench Audio.

Ambos modelos procesan entradas visuales en near real-time, detectan y cambian entre 97 idiomas a mitad de conversación, y ejecutan herramientas o llamadas a API en background sin cortar el audio. Extended Thinking razona y habla a la vez: emite cues verbales tempranas ("Let me check that…") y narra el progreso mientras piensa. En EVA-Bench de ServiceNow, los dos avanzan la frontera de Pareto en workflows complejos sobre la plataforma Enterprise Agent Platform.

La disponibilidad es inmediata para desarrolladores (Gemini API, AI Studio) y en private preview para empresas (Gemini Enterprise, con Gemini Enterprise for Customer Experience y clientes Workspace business próximamente). Para usuarios finales: 3.8 Live en Search Live; Extended Thinking en Gemini Live, Google AI Pro/Ultra en Workspace Docs, y todos los suscriptores Google AI en Gmail y Keep. Las plataformas integradas para desarrolladores son Agora, Fishjam, LangChain, LiveKit, Pipecat, Vercel y Vision Agents. Socios empresariales citados: Salesforce, Genspark, Lumeris. Todo el audio generado lleva marca de agua SynthID imperceptible y existe model card con detalles de safety.

## Lo que no se sabe

- Latencia end-to-end en milisegundos bajo condiciones reales.
- Precios por minuto o token en Gemini API (solo se menciona "highly competitive price point").
- Fecha de salida de private preview para Gemini Enterprise for Customer Experience y Workspace business.
- Cuotas, rate limits y SLA de la Live API.
- Arquitectura interna (parámetros, mezcla de expertos, etc.).
- Métricas de voz tipo MOS, WER o naturalness más allá del índice de Artificial Analysis.
- Lista exacta de los 97 idiomas y calidad en lenguas de bajo recurso.
- Cómo activar/desactivar SynthID o verificarlo vía API.
- Benchmarks internos de Google no publicados.
- Disponibilidad por región, país y requisitos de cuenta (edad, facturación).
