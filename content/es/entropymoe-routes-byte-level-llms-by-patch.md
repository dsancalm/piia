---
title: "EntropyMoE usa la entropía de los bytes para enrutar expertos en modelos sin"
summary: "Un artículo en arXiv propone que los parches de bytes con más información se dirijan a expertos más especializados, mientras que los redundantes se resuelven con menos recursos."
lang: es
story: entropymoe-routes-byte-level-llms-by-patch
publishedAt: 2026-08-10T08:18:32.537Z
sourceUrl: "https://arxiv.org/abs/2608.06398"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [entropía, moe, tokenización, eficiencia]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Los modelos sin tokenizador procesan texto a nivel de bytes, lo que elimina el problema de los vocabularios cerrados pero dispara el costo computacional: hay que atender a secuencias mucho más largas. EntropyMoE, un artículo enviado a arXiv el 31 de julio de 2026, propone usar la entropía de los parches dinámicos de bytes como señal de enrutamiento en una arquitectura Mixture-of-Experts (MoE). La idea es que no todos los parches requieren la misma capacidad de cómputo: los de alta entropía, que contienen más información, pueden dirigirse a expertos más especializados, mientras que los redundantes se resuelven con menos recursos.

La arquitectura sustituye los módulos feed-forward densos del Transformer de parches global por capas de expertos Top-K. Cada parche dinámico actúa como unidad básica de enrutamiento, y su cobertura de bytes determina su contribución al cálculo de carga de trabajo. El enrutador selecciona expertos usando directamente la entropía del parche, sin separar la señal de granularidad que se usa para construir los parches. La entropía y la longitud del parche definen conjuntamente el espacio de características que regula la especialización de los expertos.

Sin código en la fuente, no hay bloque que copiar. Lo que sí se puede evaluar es la propuesta: usar una sola señal, la entropía, para dos decisiones que normalmente se toman por separado, la segmentación del texto y el enrutamiento de expertos. Si la construcción de parches ya usa la entropía para decidir dónde cortar, reutilizarla para el enrutador elimina la necesidad de un embedding adicional o de una cabeza de clasificación para cada parche.

Los experimentos del artículo reportan el bits-por-byte retenido más bajo entre los baselines densos y dispersos comparados, con una precisión descendente similar. Esto quiere decir que la perplejidad por byte es menor que en los modelos con los que se compara, sin que baje la calidad en las tareas de downstream. La dirección es prometedora para quien programa inferencia de LLMs: si el enrutamiento por entropía reduce el número de expertos activos en parches simples, el costo por token baja sin tocar la arquitectura de atención.

## Lo que no se sabe

El resumen no da el número de expertos en las capas Top-K, ni el tamaño total del modelo, ni el conjunto de datos de los experimentos. Tampoco aparecen cifras concretas de bits-por-byte ni de precisión descendente. Sin esos números, la comparación con otros MoE queda en lo cualitativo.
