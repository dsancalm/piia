---
title: "OpenAI lanza GPT-Live-1 en la API: voz full-duplex, voces propias y red telefónica"
summary: "El modelo permite interrumpir al asistente sin perder el hilo, elimina la necesidad de montar media servers WebRTC y encadenar ASR, LLM y TTS por separado, y promete gestionar la señalización telefónica."
lang: es
story: openai-releases-gpt-live-1-for-full
publishedAt: 2026-09-11T11:46:49.236Z
sourceUrl: "https://openai.com/index/introducing-gpt-live-1-in-the-api"
sourceName: "OpenAI"
priority: flash
tags: [openai, voz, api, telefonia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
OpenAI ha puesto GPT‑Live‑1 a disposición de la API. El modelo mantiene conversaciones de voz en full‑duplex, sigue instrucciones con más fidelidad que sus predecesores, admite voces personalizadas y se conecta directamente a la red telefónica. Para quien programa, significa que ya no hace falta montar un media server WebRTC propio ni encadenar ASR, LLM y TTS por separado: la pieza de audio‑a‑audio llega empaquetada y lista para producción.

El full‑duplex real permite que el usuario interrumpa al modelo sin que se pierda el hilo. Hasta ahora, la mayoría de integraciones caseras forzaban un turno estricto: grababas, enviabas, esperabas la respuesta completa y la reproducías. GPT‑Live‑1 procesa el flujo entrante y genera el saliente en paralelo, así que la latencia percibida depende solo de la red y del tamaño del chunk de audio que envíes. La documentación aún no publica cifras oficiales de latencia end‑to‑end ni los codecs, sample rates o contenedores admitidos; toca probar con `opus` a 24 kHz o `pcm16` a 16 kHz y medir en tu infraestructura.

Las voces personalizadas abren la puerta a agentes con identidad de marca o clonación de locutores autorizados. No se ha detallado el flujo de creación: si basta un archivo de referencia, si hay un proceso de consentimiento explícito o si el modelo genera la voz *on‑the‑fly* sin almacenar el embedding. Tampoco está claro si se puede ajustar velocidad, tono o estilo por parámetro de API o si todo se controla mediante instrucciones en lenguaje natural.

La integración telefónica es el punto que más fricción quita a los equipos de producto. En lugar de contratar un proveedor SIP, exponer un WebRTC gateway y gestionar números PSTN, la API promete manejar la señalización y el media. Falta saber qué protocolos usa bajo el capó (SIP, WebRTC, una mezcla propietaria), si OpenAI provee los números o hay que traer los propios, y qué SLA de uptime ofrece para tráfico de voz crítico.

El seguimiento de instrucciones mejorado debería reducir las "alucinaciones de voz" donde el modelo ignora el sistema de prompt y se sale del guion. Eso es crítico en soporte, ventas o sanidad, donde un error de tono o una promesa inventada tiene coste legal. Aun así, no hay benchmarks públicos que comparen GPT‑Live‑1 frente a Cartesia Sonic, ElevenLabs Conversational AI o soluciones *open‑source* tipo Moshi + Whisper + LLM local en métricas de WER, latencia P50/P99 o coste por minuto.

El precio por minuto de audio de entrada y salida no se ha publicado. Tampoco los límites de tasa (RPM, TPM), cuotas por defecto, políticas de retención de audio, opciones *zero‑retention* ni cobertura regulatoria (HIPAA, GDPR, SOC 2). Sin esos datos, cualquier cálculo de coste unitario o evaluación de cumplimiento es especulación.

### Qué no se sabe
- Fecha de disponibilidad general.
- Modelo base subyacente (GPT‑4o, GPT‑4o‑mini u otro).
- Precios por minuto de audio entrante y saliente.
- Límites de tasa y cuotas por defecto.
- Codecs, sample rates y contenedores admitidos.
- Latencia típica end‑to‑end en condiciones reales.
- Proceso de creación y gestión de voces personalizadas (consentimiento, clonación, TTS).
- Detalles de la integración telefónica (SIP, WebRTC, PSTN, números, proveedores).
- Parámetros de control de voz (velocidad, tono, estilo, interrupciones, VAD).
- Soporte de streaming bidireccional y manejo de *backpressure*.
- Disponibilidad por región y cumplimiento normativo (HIPAA, GDPR, SOC 2).
- SDKs, ejemplos de código y guías de inicio rápido.
- Políticas de retención de datos de audio y opciones *zero‑retention*.
- SLA de uptime y soporte empresarial.
