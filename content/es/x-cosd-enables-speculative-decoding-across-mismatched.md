---
title: "X-CoSD elimina el cuello de botella de vocabulario en la decodificación especulativa"
summary: "El marco divide el remuestreo residual en dos zonas para evitar enviar distribuciones completas de tokens cuando el modelo del dispositivo y el del servidor no comparten vocabulario."
lang: es
story: x-cosd-enables-speculative-decoding-across-mismatched
publishedAt: 2026-09-10T11:36:45.747Z
sourceUrl: "https://arxiv.org/abs/2609.09166"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [llm, inferencia, redes, optimizacion]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
X-CoSD resuelve un cuello de botella real en la decodificación especulativa colaborativa: los métodos actuales exigen que el modelo pequeño del dispositivo y el modelo grande del servidor compartan vocabulario. Cuando no es así, hay que enviar distribuciones completas de tokens para el remuestreo residual, lo que satura el enlace de red y anula la ganancia de latencia.

El marco divide ese remuestreo en dos zonas. En la región de vocabulario común, el dispositivo recalcula la distribución residual con sus propios logits y la del servidor, sin tráfico adicional. En la región exclusiva del modelo grande, el servidor hace el remuestreo y manda solo el token elegido. A esta estrategia la llaman remuestreo híbrido (HR) y demuestran que preserva exactamente la distribución del modelo servidor, sin pérdida de calidad.

La variante X-CoSD-E va un paso más allá con remuestreo en servidor y verificación en dispositivo (SR-DV). El servidor envía únicamente candidatos de reemplazo y sus probabilidades para la región común; el dispositivo verifica localmente si los acepta. Así se elimina el envío de distribuciones enteras incluso en la zona compartida.

Los autores confirman que ambas variantes son *lossless* respecto al LLM servidor y reportan mejoras significativas en velocidad de generación manteniendo la calidad. No se publican, sin embargo, las arquitecturas y tamaños concretos de SLM y LLM, los datasets y métricas de evaluación, la reducción exacta de bytes por token frente a CoSD estándar, el speedup numérico en hardware específico, el tamaño de la región común ni el overhead de verificación. Tampoco se sabe si habrá código público y bajo qué licencia.
