---
title: "BITCOS comprime pesos ternarios por debajo del límite teórico aprovechando la"
summary: "Investigadores de Intel proponen un formato que usa un bitmap de presencia y un vector de signos, logrando 1,485 bits por peso en el modelo más disperso, frente a los 1,585 bits del límite de equiprobabilidad."
lang: es
story: intel-packs-ternary-weights-below-the-information
publishedAt: 2026-09-17T12:00:06.180Z
sourceUrl: "https://arxiv.org/abs/2609.16338"
sourceName: "Hacker News (portada)"
priority: flash
tags: [compresion, ternario, intel, inferencia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Los modelos ternarios almacenan los pesos como -1, 0 o +1. El límite teórico de la teoría de la información es log2(3) ≈ 1,585 bits por peso, pero el empaquetado estándar de cinco tritos por byte redondea hacia arriba a 1,625 bits porque obliga a grupos de tamaño potencia de dos. Ese formato trata los tres símbolos como equiprobables. Los autores midieron la distribución real en 29 modelos ternarios y encontraron que los ceros llegan al 51,5 % de los pesos.

BITCOS es un layout adaptativo a la distribución: un bitmap denso de presencia más un vector compacto de signos. Su coste es 2 - z bits por peso, donde z es la densidad de ceros. En 26 de los 29 modelos probados, BITCOS ocupa menos que el empaquetado de cinco tritos. En el modelo más disperso alcanza 1,485 bits por peso, por debajo de la barrera de 1,585.

El diseño permite desempaquetado eficiente en procesadores modernos y GPUs. El artículo presenta secuencias optimizadas para AVX-512, AVX2 y GPUs Intel Xe2. Medido contra kernels de producción de multiplicación matriz-vector ternaria, la ganancia real llega a 1,28x a densidades de cero reales. En inferencia completa en cinco plataformas (CPUs de cliente y servidor, GPUs Xe2 integradas y discretas), el throughput de decodificación mejora hasta 1,18x en CPUs y 1,27x en GPUs.

El trabajo está firmado por Evangelos Georganas, Alexander Heinecke y Pradeep Dubey, y se envió a arXiv el 14 de septiembre de 2026 (arXiv:2609.16338).

## Lo que no se sabe

No se publican los nombres, tamaños ni procedencia de los 29 modelos medidos, ni la distribución exacta de densidad de ceros en cada uno (solo el máximo del 51,5 %). Tampoco se detallan las secuencias de instrucciones de desempaquetado para AVX-512, AVX2 y Xe2, ni qué kernels de referencia se usaron como baseline. Faltan los modelos concretos de CPU y GPU de las cinco plataformas, los tamaños y configuraciones de los modelos en los benchmarks de inferencia completa, y si BITCOS requiere reentrenamiento o funciona sobre checkpoints ternarios ya existentes. No hay desglose de ancho de banda de memoria frente a cómputo en el 1,28x del kernel, ni comparación con codificación Huffman o aritmética, ni coste del bitmap en modelos con poca dispersión. Tampoco se aclara el impacto en pipelines de cuantización consciente o post-entrenamiento, ni si habrá implementación open source o integración con llama.cpp, vLLM u otros frameworks.
