---
title: "Un paquete guarda el estado KV de un LLM en disco NVMe cifrado y lo recarga sin"
summary: "galahad-kv escribe la caché clave-valor de Gemma 4 en bloques de 16 000 tokens y los vuelve a cargar bajo demanda. En una H100, la carga es 2,8-4,3 veces más rápida y gasta 8,8-12,3 veces menos energía de GPU que recomputar, manteniendo la VRAM plana en 50 millones de..."
lang: es
story: open-source-package-reloads-50m-token-kv
publishedAt: 2026-10-09T13:37:31.913Z
sourceUrl: "https://arxiv.org/abs/2610.10845"
sourceName: "arXiv cs.CL"
priority: flash
tags: [llm, kv-cache, nvme, vllm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El paquete galahad-kv permite guardar el estado clave-valor (KV) de un modelo de lenguaje en disco NVMe local cifrado y recargarlo byte a byte sin volver a ejecutar la capa de atención. La prueba, publicada en arXiv, alimentó 50 millones de tokens de texto público real a Gemma 4 12B y Gemma 4 31B servidos con vLLM sobre una única NVIDIA H100. El contexto se troceó en bloques de unos 16 000 tokens; cada bloque se escribió una vez y después se recargó bajo demanda. Los 100 bloques evaluados (profundidades de 0 a 50 millones de tokens) se recuperaron sin recomputar en ambos modelos.

La carga de un bloque resultó entre 2,8 y 4,3 veces más rápida que recomputarlo y consumió entre 8,8 y 12,3 veces menos energía de GPU. La memoria gráfica permaneció plana durante todo el flujo de 50 millones de tokens. En la prueba de recuperación de hechos plantados a millones de tokens de distancia, Gemma 4 12B acertó 82 de 100 preguntas y Gemma 4 31B acertó 98; ninguno de los dos alucinó respuestas.

## Cómo funciona el almacén

El método no amplía la ventana de atención nativa del modelo. Cada petición carga un único bloque KV desde el NVMe, lo inserta en la caché del motor de inferencia y ejecuta la generación. La escritura de la memoria es un coste único al ingestar los datos; a partir de ahí, el almacén ocupa terabytes en el disco local y se reutiliza indefinidamente. El protocolo de evaluación está diseñado para evitar los trucos habituales en benchmarks de contexto largo y la reproducción completa corre en una sola GPU con software público; el paquete galahad-kv se distribuye bajo una licencia libre.

## Lo que no se sabe

- Latencia absoluta de carga de un bloque (ms/s) y throughput sostenido.
- Overhead de CPU y RAM durante la escritura y lectura del almacén cifrado.
- Tamaño exacto en terabytes del almacén para 50 millones de tokens con Gemma 4 12B y 31B.
- Detalles de la licencia "libre" de galahad-kv (tipo, restricciones comerciales).
- Resultados en otros modelos (Llama, Qwen, etc.) y en GPUs que no sean H100.
- Impacto en la latencia de la primera inferencia tras una carga en frío.
- Métricas de integridad y consistencia del estado KV tras muchas escrituras y lecturas.
- Coste económico estimado del almacenamiento NVMe necesario.
