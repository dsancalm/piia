---
title: "WavePrune elimina periodos redundantes de RoPE y mejora contextos largos"
summary: "WavePrune modifica RoPE para que cada canal use solo su primer periodo, eliminando aliasing posicional. En Qwen3-8B sube la puntuación HELMET y no requiere reentrenamiento."
lang: es
story: waveprune-masks-repeated-rope-rotations-for-faster
publishedAt: 2026-10-07T13:53:32.846Z
sourceUrl: "https://arxiv.org/abs/2610.06963"
sourceName: "arXiv cs.CL"
priority: routine
tags: [rope, waveprune, llm, contexto]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
WavePrune propone una modificación directa al cálculo de RoPE: cada canal rotatorio usa solo su primer periodo y descarta el resto. La idea central es que la estructura periódica de RoPE introduce aliasing posicional más allá de esa primera vuelta, y eliminarla no degrada el modelo, sino que mejora su comportamiento en contextos largos sin necesidad de reentrenar ni ajustar hiperparámetros.

En los experimentos reportados, el método eleva la puntuación HELMET en cuatro de cinco modelos probados. En Qwen3-8B el salto es
