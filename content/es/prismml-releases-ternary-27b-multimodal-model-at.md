---
title: "PrismML lanza Ternary Bonsai 2 27B, un modelo multimodal ternario que ocupa 5,9 GB y"
summary: "La compresión a 1,76 bits por peso reduce el modelo nueve veces frente a Qwen3.8 27B sin apenas perder precisión: 83,9 puntos agregados frente a 85,4 del original. Alcanza 143 tokens/s en una RTX 5090 y gasta un 40 % menos energía por token que un modelo de 8B en FP16."
lang: es
story: prismml-releases-ternary-27b-multimodal-model-at
publishedAt: 2026-09-18T11:35:03.199Z
sourceUrl: "https://prismml.com/news/bonsai-2-27b"
sourceName: "Hacker News (portada)"
priority: flash
tags: [modelos, compresion, multimodal, hardware]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
PrismML ha publicado Ternary Bonsai 2 27B, un modelo multimodal de 27.000 millones de parámetros que ocupa 5,9 GB y mantiene el 98,2 % del rendimiento de su versión de precisión completa, Qwen3.8 27B. La compresión alcanza 1,76 bits efectivos por peso mediante ternarización , pesos restringidos a -1, 0 y +1, con escalado FP16 por grupos. El resultado es un modelo nueve veces más pequeño que el original, capaz de procesar 262.000 tokens de contexto y entradas de texto e imagen, liberado bajo licencia Apache 2.0.

En benchmarks agregados el modelo suma 83,9 puntos frente a 85,4 de Qwen3.8 27B y 83,6 de Qwen3.6 27B. La velocidad de inferencia llega a 143 tokens por segundo en una RTX 5090 y a 46,8 tokens por segundo en un Mac M5 Max. En una RTX 4090 el consumo se sitúa en 0,714 mWh por token, un 40 % por debajo de lo que gasta un modelo de 8.000 millones de parámetros en precisión completa. Los kernels personalizados de bajo bit funcionan tanto en CUDA como en MLX, por lo que el mismo artefacto corre en GPU NVIDIA y en silicio de Apple sin conversiones intermedias.

Los pesos están ya en Hugging Face y GitHub listos para descargar y ejecutar. La técnica combina poda y destilación, pero el artículo no incluye el código de compresión ni los hiperparámetros exactos; PrismML remite a un *whitepaper* pendiente para la metodología completa.

## Lo que no se sabe

- Detalles exactos de la metodología de compresión y entrenamiento (remite al *whitepaper*).
- Resultados por benchmark individual (remite al *whitepaper*).
- Requisitos exactos de VRAM/RAM para inferencia en distintas configuraciones (kv-cache, cuantización de activaciones, etc.).
- Fecha de corte de conocimiento del modelo base Qwen3.8 27B.
- Soporte para *fine-tuning* o LoRA sobre los pesos ternarios liberados.
- Rendimiento en hardware AMD (ROCm) o Intel (Arc/Xe).
- Latencia *time-to-first-token* en contextos largos (ej. 100K+ tokens).
- Disponibilidad de versiones 1-bit (3,9 GB) mencionadas en el anuncio previo de julio.
