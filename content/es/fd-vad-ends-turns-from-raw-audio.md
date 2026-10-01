---
title: "FD-VAD decide fin de turno desde audio sin transcribir"
summary: "Modelo semántico que detecta cuándo termina una conversación directamente en streaming, usando codificador congelado, adaptador ligero y LM adaptado. Alcanza 0.853 de recall en TurnBench con FP ≤ 0.10 en zero-shot, sin ASR ni estado de diálogo."
lang: es
story: fd-vad-ends-turns-from-raw-audio
publishedAt: 2026-10-01T13:48:56.488Z
sourceUrl: "https://arxiv.org/abs/2609.35791"
sourceName: "arXiv cs.CL"
priority: routine
tags: [endpointing, streaming, voice-agent, semantics]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
FD-VAD propone un endpointer semántico que decide cuándo termina un turno de conversación directamente desde el audio en streaming, sin transcribir primero. El sistema combina un codificador de voz congelado, un adaptador de modalidad ligero y un modelo de lenguaje adaptado con técnicas eficientes en parámetros. Entrena con un objetivo last-chunk que simula la inferencia incremental y añade dos mecanismos prácticos: un gating de confianza que regula cuándo comprometer el fin de turno y un muestreo de negativos duros enfocado en límites ambiguos.

En el conjunto de desarrollo de TurnBench, alcanza un recall de fin de turno (EOT) de 0.853 bajo la restricción de falsos positivos ≤ 0.10 en configuración zero-shot, superando a clasificadores semánticos de turno tanto en streaming como off-line. El resultado sugiere que el endpointing semántico no requiere ASR intermedio ni seguimiento de estado de diálogo, lo que simplifica la arquitectura de agentes de voz full-duplex y reduce la latencia acumulada de una cascada tradicional.

Lo que no se sabe: arquitectura exacta del codificador de voz congelado, detalles del adaptador de modalidad, qué modelo de lenguaje y método de adaptación eficiente (LoRA, adapters, prefix-tuning), configuración de la ventana causal de audio, definición precisa de la pérdida last-chunk, hiperparámetros del gating de confianza, procedimiento del hard-negative sampling, dataset de entrenamiento, métricas completas en TurnBench (precision, F1, latencia, FP rate exacto), comparación cuantitativa frente a baselines con nombre y números, latencia de inferencia en hardware real y disponibilidad de código, pesos o demo.
