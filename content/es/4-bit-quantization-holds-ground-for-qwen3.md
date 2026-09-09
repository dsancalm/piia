---
title: "Qwen3 27B en 4 bits iguala al modelo completo y cabe en una RTX 4090"
summary: "La cuantización Q4_K_M reduce el modelo a 17 GB y mantiene el rendimiento en Terminal-Bench, GPQA Diamond e IFBench. Los niveles de 1 bit colapsan en razonamiento complejo."
lang: es
story: 4-bit-quantization-holds-ground-for-qwen3
publishedAt: 2026-09-09T11:44:28.914Z
sourceUrl: "https://quesma.com/blog/qwen38-27b-quantizations-benchmarked/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [cuantizacion, llm, benchmark, hardware]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El modelo Qwen3-8B 27B en precisión completa BF16 ocupa 55 GB y requiere al menos dos GPUs de 24 GB o una H100. La cuantización Q4_K_M reduce su tamaño a 17 GB, lo que permite ejecutarlo en una sola RTX 4090 con espacio para unos 64 000 tokens de contexto usando caché KV en FP16. El autor ha publicado un benchmark reproducible en Modal que compara cinco niveles de cuantización con Terminal-Bench 2.1 (89 tareas, timeout de tres horas, esfuerzo xhigh, 98 k de contexto reservado), GPQA Diamond e IFBench.

En Terminal-Bench 2.1, Q4_K_M alcanza el mismo rendimiento que el modelo BF16 completo. En GPQA Diamond e IFBench, Q4_K_M y Q8_0 (29 GB) no presentan diferencias estadísticas significativas frente a BF16. La cuantización de 2 bits UD-Q2_K_XL (10,7 GB) muestra un ligero descenso en ambos benchmarks, pero en las tareas que resuelve utiliza el mismo número de turnos que BF16 y genera aproximadamente un 25 % más de tokens de salida. Las versiones de 1 bit (UD-IQ1_S 6,2 GB y UD-IQ1_M) colapsan al nivel del azar en GPQA Diamond; el razonamiento prolongado (esfuerzo xhigh) empeora el resultado porque el modelo agota el presupuesto de tokens y devuelve una respuesta vacía.

El coste total en Modal ascendió a 2 308 dólares para Terminal-Bench y a 663 dólares para GPQA e IFBench. Ejutar Q4_K_M en contenedores L40S, H100 o H200 cuesta entre 3 y 10 dólares por millón de tokens de salida, mientras que DeepSeek V4 Flash 0731 (284 B) en OpenRouter cuesta 0,10 dólares por millón, muy por debajo del coste del autoalojamiento en GPUs alquiladas.

## Lo que no se sabe

- Puntuaciones numéricas exactas (porcentaje) de cada cuantización en los tres benchmarks; solo se muestran gráficas.
- Resultados de Q8_0 en Terminal-Bench 2.1 (no se ejecutó).
- Detalles de la caché KV cuantizada (el autor indica que la probará después).
- Configuración exacta de "esfuerzo xhigh" (tokens de razonamiento, temperatura, top-p).
- Versión exacta de llama.cpp usada (build 16 de agosto de 2026) e flags de inferencia.
- Motivo por el que Unsloth reemplazó los archivos v2 el 19 de agosto de 2026 y qué cambios trajo la v3 en 1-bit.
- Comparativa de latencia y throughput en hardware de consumo (RTX 4090 local) frente a Modal L40S, H100 o H200.
