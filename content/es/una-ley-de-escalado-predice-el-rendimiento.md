---
title: "Una ley de escalado predice el rendimiento de un VLM sin entrenarlo"
summary: "Un artículo en arXiv presenta la Capability-Driven Multimodal Scaling Law, que usa métricas textuales del backbone para predecir la precisión de un VLM en benchmarks."
lang: es
story: una-ley-de-escalado-predice-el-rendimiento
publishedAt: 2026-08-04T11:45:51.181Z
sourceUrl: "https://arxiv.org/abs/2608.00013"
sourceName: "arXiv cs.CL"
priority: routine
tags: [vlm, escalado, backbone, arxiv]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Elegir el backbone de un modelo multimodal sigue siendo un acto de fe. Se prueban dos o tres LLMs, se entrena el adaptador visual y se compara. Un artículo en arXiv propone ahora una forma de predecir ese resultado sin entrenar nada, usando solo métricas textuales observables.

La Capability-Driven Multimodal Scaling Law es el primer marco que predice la precisión de un VLM en benchmarks a partir de la capacidad textual de su backbone. Para construirlo, los autores entrenaron más de 150 VLMs sobre 34 LLMs de 7 familias de modelos, con una receta estrictamente controlada. Evaluaron después en más de 200 benchmarks textuales y 50 multimodales. La ley extrapola la tasa de transferencia de modelos de hasta 8B parámetros a backbones de escala 72B.

El hallazgo más útil para quien decide qué modelo usar: los LLMs base superan a sus versiones ajustadas por instrucciones como backbones de VLM. La razón es doble. Tienen mayores tasas de absorción, es decir, aprovechan mejor los datos visuales nuevos, y su decaimiento de escalado de datos es menor. Si estabas usando un instruct model por costumbre, los datos dicen que estás dejando rendimiento sobre la mesa.

Hay una advertencia incómoda. Ciertos benchmarks textuales correlacionan negativamente con el rendimiento multimodal. Los autores lo interpretan como comportamiento de benchmark-gaming: un modelo puede estar sobreoptimizado para un test textual concreto sin que eso transfiera a la comprensión visual. Eso invalida la práctica de elegir backbone mirando solo el leaderboard de texto.

Lo que no se sabe: el artículo no detalla qué benchmarks textuales concretos son los que correlacionan negativamente, así que no puedes evitar esa trampa con una lista cerrada. Tampoco especifica qué familias de modelos se usaron ni cuáles quedaron como held-out para validar la extrapolación. No hay cifra del coste computacional total de entrenar los 150 VLMs, y la fórmula exacta de la ley de escalado no se publica, solo sus conclusiones cualitativas.

El código y los datos están disponibles en una URL indicada en el artículo, así que puedes replicar el pipeline con tus propios modelos. La decisión de backbone sigue teniendo componente empírico, pero ahora hay una métrica textual que predice el resultado antes de gastar GPUs.
