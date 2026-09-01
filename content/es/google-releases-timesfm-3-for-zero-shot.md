---
title: "Google lanza TimesFM-3 y resuelve forecasting multivariante sin fine-tuning"
summary: "El modelo de 330 millones de parámetros predice series multivariantes en zero-shot tras entrenarse con más de un billón de puntos temporales. Su arquitectura alterna atención causal temporal y atención completa entre variables, y genera 9 cuantiles en un solo forward pass..."
lang: es
story: google-releases-timesfm-3-for-zero-shot
publishedAt: 2026-09-01T12:00:44.642Z
sourceUrl: "https://research.google/blog/timesfm-3-a-zero-shot-foundation-model-for-multivariate-forecasting/"
sourceName: "Google Research"
priority: flash
tags: [forecasting, transformer, zero-shot, google]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google ha publicado TimesFM-3, un modelo fundacional de 330 millones de parámetros entrenado con más de un billón de puntos temporales que resuelve el forecasting multivariante en modo zero-shot. A diferencia de sus predecesores, no requiere fine-tuning ni datos de entrenamiento propios: se descarga, se le pasa el historial y devuelve la predicción.

La arquitectura es un decoder-only transformer que alterna dos tipos de atención. La horizontal es causal y temporal: cada parche de 32 pasos solo ve su pasado. La vertical es completa entre variables: todas las series objetivo y covariables se comunican en cada capa. Esa estructura permite modelar dependencias cruzadas , ventas de producto A influyendo en producto B, o temperatura afectando a demanda energética, sin recurrir a modelos separados ni a ingeniería de features ad hoc.

El truco para evitar la decodificación autoregresiva es Contiguous Patch Masking. En un único forward pass el modelo genera todo el horizonte: las series objetivo y las covariables pasadas quedan enmascaradas en la zona de predicción, mientras que las covariables pasado-futuro (festivos, promociones planificadas, previsiones meteorológicas) permanecen visibles. El resultado son 9 cuantiles (del percentil 10 al 90) por serie y por paso, lo que da intervalos de confianza calibrados sin muestreo repetido.

En benchmarks públicos , Gift-Eval, FEV-Bench y Time, el modelo univariante ya iguala o supera a los fundacionales replicables actuales. En multivariante consigue el mejor rango promedio tanto en métricas puntuales como probabilísticas frente a Chronos-2, Toto 2.0 y TimesFM-2.5.

El código y los pesos están en GitHub y Hugging Face. La integración nativa en BigQuery mediante `AI.FORECAST` se activará en las próximas semanas.

## Lo que no se sabe

- Métricas numéricas exactas (MAE, MSE, CRPS) por benchmark
- Longitud máxima de contexto y horizonte de predicción soportados
- Requisitos de hardware y VRAM para inferencia
- Licencia del modelo y los pesos
- Fecha exacta de disponibilidad de `AI.FORECAST` en BigQuery
- Comparativa de latencia y throughput frente a TimesFM-2.5 y competidores
- Proporción de datos sintéticos en el corpus de pre-entrenamiento
