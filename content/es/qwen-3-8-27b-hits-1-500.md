---
title: "Cerebras sirve Qwen 3.8 27B a 1500 tokens por segundo sin recortar el modelo"
summary: "La API pública ejecuta los pesos originales de Alibaba con cuantización selectiva solo en almacenamiento, manteniendo activaciones y atención en precisión completa."
lang: es
story: qwen-3-8-27b-hits-1-500
publishedAt: 2026-09-04T11:47:30.500Z
sourceUrl: "https://inference-docs.cerebras.ai/models/overview"
sourceName: "Hacker News (portada)"
priority: flash
tags: [cerebras, qwen, inferencia, api]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cerebras ha puesto Qwen 3.8 27B en sus endpoints públicos con una velocidad de inferencia declarada de 1500 tokens por segundo. El modelo tiene 27 mil millones de parámetros y ofrece una ventana de contexto de 64 000 tokens en el tier gratuito y 128 000 en el de pago. No es una versión podada: Cerebras sirve los pesos originales sin modificar la arquitectura y se compromete a no hacerlo sin previo aviso. Los modelos recortados con la técnica REAP solo están en Hugging Face para investigación, no en la API de producción.

La cuantización es selectiva y afecta solo a los pesos durante el almacenamiento, usando una mezcla de 16, 8 y 4 bits según la capa. Las activaciones, la atención y la caché KV se mantienen en precisión completa sin cuantizar. Eso evita la degradación de calidad típica de los modelos comprimidos agresivamente y permite que el modelo conserve el comportamiento del original de Alibaba.

A 1500 tokens/s, un modelo de 27B entra en el rango de velocidad que hasta ahora solo veían modelos mucho más pequeños o instancias dedicadas con GPUs caras. Para cargas de trabajo con agentes, RAG o generación de código largo, la latencia por token deja de ser el cuello de botella principal. El tier gratuito con 64k de contexto ya permite prototipar flujos completos sin coste; el de pago duplica la ventana a 128k.

Lo que no se sabe

- Precio por millón de tokens en el tier pay-as-you-go para qwen-3.8-27b.
- Límites de tasa (rate limits) concretos para el tier gratuito y el de pago.
- Fecha de disponibilidad general o versión de la API.
- Benchmarks de calidad (MMLU, HumanEval, etc.) de este modelo servido en Cerebras frente a otras plataformas.
- Detalle exacto de qué capas van a 4, 8 o 16 bits en la cuantización selectiva de pesos.
- Latencia de primer token (TTFT) y rendimiento real con contexto largo de 128k.
