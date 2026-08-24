---
title: "Un framework reduce a la mitad el error de atribuir consumo energético por request"
summary: "El reparto proporcional a tokens, el método habitual, se desvía del justo hasta 0.458 de error L1 con batching continuo. JouleShare, que combina un harness offline y un modelo de calibración ligero, baja ese error a 0.116 en batching estático y 0.177 en continuo."
lang: es
story: token-based-cost-attribution-is-wrong-a
publishedAt: 2026-08-04T12:15:04.399Z
sourceUrl: "https://arxiv.org/abs/2608.00026"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [energía, llm, atribución, batching]
generatedBy: deepseek/deepseek-v4-flash-0731
---
La atribución de consumo energético por request en un servidor LLM con batching no tiene solución trivial. El reparto proporcional a tokens, el método más común, se desvía del reparto justo hasta 0.458 de error L1 normalizado bajo batching continuo. Un artículo reciente en arXiv propone JouleShare, un framework que combina un harness offline con un modelo de calibración ligero llamado JCalib, y reduce ese error a 0.116 en batching estático y 0.177 en continuo.

El harness offline establece el ground truth reejecutando subconjuntos de requests bajo vLLM con telemetría de potencia de GPU. Con eso calcula el valor exacto de Shapley para cada request. Ese cálculo no se puede hacer en tiempo de servicio, así que JCalib aprende a predecir las cuotas de Shapley a partir de características baratas de los requests, que sí están disponibles online.

Los números vienen de 16 ejecuciones de modelo/workload en tres GPUs de centro de datos. La brecha entre la atribución proporcional a tokens y el Shapley exacto se reproduce en las tres, así que no es un artefacto de un hardware concreto. El artículo también extiende la referencia medida a grupos más grandes con Shapley muestreado, y ahí la brecha persiste: una única calibración offline sigue siendo la regla desplegable más precisa.

## Qué implica para producción

Si tu sistema factura energía por request o haces optimización de costes por cliente, el método de atribución que elijas cambia el resultado. La atribución por tokens asume que el coste de procesar un request es proporcional a su longitud, pero el batching rompe esa proporcionalidad: los requests cortos se benefician de la compañía de los largos en el mismo batch, y viceversa. El Shapley exacto reparte ese beneficio de forma justa, pero no es computable online.

La propuesta es clara: mides offline con el harness, entrenas JCalib con esos datos, y despliegas el modelo calibrado para la atribución en tiempo de servicio. El error que consigue es menos de la mitad que el de la línea base de medición independiente que no está disponible online.

## Lo que no se sabe

El artículo no detalla qué modelos de lenguaje ni qué workloads concretos forman las 16 ejecuciones, así que no sabes si los resultados se mantienen con tu modelo y tu tráfico. Tampoco especifica qué características de los requests usa JCalib como entrada, ni el coste computacional del harness offline ni el tiempo necesario para calcular el Shapley exacto. Y no se menciona el consumo energético absoluto de los GPUs ni las unidades de energía de las mediciones, solo errores relativos normalizados.
