---
title: "Mistral Large 4 alcanza el 82 % en parcheo de vulnerabilidades reales"
summary: "El modelo multimodal de un billón de parámetros, entrenado en 3 800 GPUs propias en Europa, lidera entre los abiertos en ciberseguridad, finanzas y derecho. La vista previa ya funciona en Mistral Studio y los pesos saldrán en octubre de 2026."
lang: es
story: mistral-large-4-debuts-with-1-trillion
publishedAt: 2026-10-07T13:42:00.996Z
sourceUrl: "https://mistral.ai/news/mistral-large-4/\\"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ia, ciberseguridad, europa, mistral]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Mistral ha publicado la vista previa pública de Mistral Large 4, un modelo nativamente multimodal de un billón de parámetros totales con 49 000 millones activos bajo arquitectura de mezcla de expertos. El entrenamiento desde cero se ha realizado en 3 800 GPUs NVIDIA Grace Blackwell alojadas en centros de datos propios en Europa, y la inferencia de la vista previa corre sobre esa misma infraestructura, accesible a través de Mistral Studio. Los pesos se liberarán a finales de octubre de 2026.

Los resultados de evaluación sitúan al modelo a la cabeza entre los abiertos en cargas de trabajo empresariales de ciberseguridad, finanzas y derecho. En reproducción y parcheo de vulnerabilidades reales alcanza un 82 %, la puntuación más alta registrada. Resuelve el 93 % de los 40 retos de Cybench, supera a modelos cerrados en *grounding* visual (42 % frente al 41 % de GPT‑6‑Astra en Dense 200) y obtiene 61,7 % en DeepSWE v1.1, 59,4 % en SWE‑Atlas‑QnA y 28,3 % en Terminal‑Bench 4.0. Su índice combinado de agente de código es del 49,8 %, por delante de DeepSeek V4 Pro y Qwen3.8 Max. En evaluación humana a ciegas (Surge AI) queda segundo de cinco con 3,74 sobre 5. En flujos de trabajo empresariales (AutomationBench) marca 59,9 % y en AA‑Briefcase alcanza 1 393 Elo.

El modelo incluye más de 160 idiomas, cubriendo todas las lenguas oficiales de la UE, y está diseñado como base para una nueva generación de modelos especializados. Mistral destaca la capacidad de autodespliegue en nube privada o *on‑premise*, lo que permite operación soberana y auditable bajo legislación europea, con despliegue *end‑to‑end* en región UE. El *red‑teaming* se ha realizado con socios de ciberseguridad y autoridades estatales antes de la liberación completa.

## Lo que no se sabe

No se ha publicado la arquitectura detallada ni la metodología de *post‑training*; ambas se detallarán antes de la liberación de pesos. Tampoco se conocen la composición exacta del corpus multilingüe, el calendario de los modelos derivados, los términos de licencia y precios para acceso no preliminar, ni resultados en *benchmarks* estándar como MMLU o HellaSwag. La mejora cuantitativa respecto a Mistral Large 3 no se ha especificado.
