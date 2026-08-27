---
title: "Qwen3.8-Flash-Next: modelo MoE de 125B que cabe en una GPU de 80 GB"
summary: "Qwen adelanta la arquitectura de Qwen4 con un Mixture of Experts de 125 000 millones de parámetros totales y solo 6 000 millones activos por pasada. Simon Willison lo ha ejecutado en un DGX Spark con las cuantizaciones UD-IQ1_S (72,5 GB) y UD-Q2_K_XL (78,9 GB) de Unsloth..."
lang: es
story: qwen-releases-125b-moe-preview-model-that
publishedAt: 2026-08-27T17:46:02.132Z
sourceUrl: "https://simonwillison.net/2026/Aug/26/qwen38-flash-next/"
sourceName: "Simon Willison"
priority: flash
tags: [qwen, moe, llm, quantization]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Qwen ha publicado Qwen3.8-Flash-Next, un modelo de pesos abiertos que sirve de anticipo a la arquitectura de Qwen4. Es un Mixture of Experts multimodal con 125 000 millones de parámetros totales, de los que solo 6 000 millones están activos en cada pasada hacia adelante. Esa proporción permite ejecutar el modelo completo en una estación de trabajo con GPU de alta gama sin necesidad de un clúster.

Simon Willison lo ha probado en un DGX Spark usando las cuantizaciones que distribuye Unsloth. La versión UD-IQ1_S ocupa 72,5 GB y la UD-Q2_K_XL 78,9 GB. Ambas caben en la memoria del dispositivo y permiten inferencia local sin recurrir a offloading a CPU. Willison señala que su favorito hasta ahora es la variante UD-Q2_K_XL configurada con "xhigh reasoning effort", un ajuste que aumenta la profundidad del razonamiento interno del modelo.

## Qué significa para quien despliega en GPU propia

La arquitectura MoE con tan pocos parámetros activos reduce el coste de memoria y de cómputo por token generado. En la práctica, un modelo de 125 B totales se comporta en consumo como uno denso de 6‑7 B, pero mantiene la capacidad de enrutar cada entrada a los expertos más relevantes. Las cuantizaciones UD-IQ1_S y UD-Q2_K_XL de Unsloth están optimizadas para preservar calidad a 1‑2 bits por parámetro, lo que hace viable la carga completa en VRAM de 80 GB (H100, A100 80 GB o el propio DGX Spark).

El ajuste "xhigh reasoning effort" no está documentado públicamente por Qwen ni por Unsloth. Parece controlar cuántos tokens de razonamiento interno genera el modelo antes de emitir la respuesta final, pero no se sabe si actúa sobre temperatura, número de pasos de chain-of-thought o una combinación de ambos.

## Lo que no se sabe

- Benchmarks comparativos (MMLU, GPQA, HumanEval, etc.).
- Licencia exacta: no se ha confirmado si es Apache 2.0, Qwen License u otra.
- Fecha de corte de conocimiento.
- Longitud de contexto máxima soportada.
- Detalles de la modalidad multimodal: qué formatos de entrada y salida acepta (imagen, audio, vídeo).
- Requisitos mínimos de hardware más allá del DGX Spark usado en la prueba.
- Repositorio oficial en Hugging Face o ModelScope (repo ID).
- Definición técnica de "xhigh reasoning effort" (parámetros de inferencia concretos).
