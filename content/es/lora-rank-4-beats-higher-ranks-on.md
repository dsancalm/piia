---
title: "Rank 4 en LoRA supera a rangos mayores en fine-tuning de modelos de difusión"
summary: "Un estudio en CIFAR-10 muestra que rank 4 alcanza el mejor FID (124.13) frente a rank 8 (124.21); rangos 16 y 32 solo aumentan parámetros, tiempo y memoria sin mejorar calidad. La tendencia se repite en DDPM a 20 épocas y Tiny DiT a 10 épocas."
lang: es
story: lora-rank-4-beats-higher-ranks-on
publishedAt: 2026-09-12T11:18:13.775Z
sourceUrl: "https://arxiv.org/abs/2609.10656"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [lora, difusion, fine-tuning, cifar10]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un estudio controlado en CIFAR-10 con un DDPM U-Net confirma que los rangos bajos de LoRA son la opción más eficiente para fine-tuning en modelos de difusión. Los autores evalúan rangos {2, 4, 8, 16, 32} manteniendo fija la configuración de optimización y usando un protocolo reproducible basado en `pytorch-fid` con carpeta local. El rank 4 alcanza el mejor FID (124.1380), seguido de cerca por el rank 8 (124.2136). Los rangos superiores no aportan mejoras significativas de calidad pese a multiplicar los parámetros entrenables, el tiempo de ejecución y la memoria GPU.

La validación se extiende a dos escenarios adicionales: runs de DDPM a 20 épocas (rangos 4, 8, 16) y un backbone Tiny DiT a 10 épocas (rangos 4, 8, 16). En ambos casos la tendencia se mantiene: los rangos 4 y 8 saturan el rendimiento mientras que el 16 solo añade coste. El trabajo, aceptado en CSCE 2026, aporta 13 páginas con 5 figuras y 3 tablas que detallan FID, parámetros, tiempo y memoria por configuración.

## Qué no se sabe

- Valores exactos de FID para rangos 2, 16 y 32 en el estudio principal.
- Cifras concretas de parámetros entrenables, tiempo de ejecución y memoria GPU por rango.
- Configuración de optimización (learning rate, batch size, scheduler).
- Arquitectura exacta del U-Net y del Tiny DiT (capas, canales, cabezas de atención).
- Semillas aleatorias y número de runs por configuración.
- Detalles del protocolo `local-folder pytorch-fid` (número de muestras generadas, splits de evaluación).
- Resultados numéricos de FID en los runs de validación extendida (20 épocas) y Tiny DiT (10 épocas).
