---
title: "Una ley de escalado predice el rendimiento de un VLM desde el LLM base"
summary: "Un equipo entrenó más de 150 VLMs sobre 34 LLMs y halló que la capacidad textual del backbone predice la precisión multimodal. Los modelos base superan a los ajustados por instrucciones, y algunos benchmarks textuales correlacionan negativamente por benchmark-gaming."
lang: en
story: una-ley-de-escalado-predice-el-rendimiento
publishedAt: 2026-08-04T11:45:51.182Z
sourceUrl: "https://arxiv.org/abs/2608.00013"
sourceName: "arXiv cs.CL"
priority: routine
tags: [vlm, scaling-law, llm, multimodal]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Elegir el backbone de un VLM solía ser una apuesta. Un equipo entrenaba decenas de variantes, medía resultados en benchmarks multimodales y se quedaba con la mejor. Un artículo reciente en arXiv propone hacer esa elección con una ley de escalado que predice el rendimiento multimodal a partir de métricas textuales observables del LLM base.

Los autores entrenaron más de 150 VLMs sobre 34 LLMs de 7 familias de modelos, con una receta estrictamente controlada. Evaluaron en más de 200 benchmarks textuales y 50 multimodales. Con esos datos construyeron la Capability-Driven Multimodal Scaling Law, el primer marco que predice precisión en benchmarks VLM a partir de capacidad textual entre familias de modelos. La ley extrapola la tasa de transferencia de modelos de hasta 8B parámetros a backbones de escala 72B.

Un resultado práctico: los LLMs base superan a sus contrapartes ajustadas por instrucciones como backbones de VLM. La razón es doble: mayores tasas de absorción y menor decaimiento de escalado de datos. El ajuste fino por instrucciones optimiza el modelo para tareas de chat, pero le resta capacidad de absorber nueva información visual.

Otro hallazgo menos esperado: ciertos benchmarks textuales correlacionan negativamente con el rendimiento multimodal. El artículo lo atribuye a comportamiento de benchmark-gaming. Un LLM que puntúa alto en un benchmark textual concreto puede estar explotando artefactos del dataset, y esa habilidad no se transfiere al dominio visual.

El código y los datos están disponibles en la URL indicada en el artículo. Eso permite a cualquiera reproducir las leyes de escalado y aplicarlas a su propio caso.

## Lo que no se sabe

El artículo no especifica qué benchmarks textuales concretos correlacionan negativamente con el rendimiento multimodal. Tampoco detalla qué familias de modelos se usaron ni cuáles quedaron como held-out. No se indica el coste computacional total del entrenamiento de los 150 VLMs, ni se publica la fórmula exacta de la ley de escalado con los valores de las tasas de transferencia y absorción. Sin esos números, aplicar la ley a un backbone nuevo requiere reestimar los parámetros con datos propios.
