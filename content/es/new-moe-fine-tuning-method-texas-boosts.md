---
title: "TEXAS ajusta modelos MoE sin congelar ni descontrolar el enrutamiento"
summary: "Un método intermedio para el fine-tuning de modelos de mezcla de expertos que usa las activaciones correctas del modelo base para guiar el aprendizaje en los fallos."
lang: es
story: new-moe-fine-tuning-method-texas-boosts
publishedAt: 2026-08-10T08:19:12.988Z
sourceUrl: "https://arxiv.org/abs/2608.06396"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [moe, fine-tuning, enrutamiento, ia]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Cuando se ajusta un modelo de mezcla de expertos (MoE) para una tarea concreta, el comportamiento de enrutamiento (que decide qué expertos activa cada token) suele ser un problema: o se deja fijo durante el fine-tuning, perdiendo flexibilidad, o se entrena libremente, arriesgando inestabilidad. TEXAS es un método que encuentra un punto intermedio.

El truco está en identificar qué expertos son realmente relevantes para una tarea, y hacerlo mirando al propio modelo. TEXAS compara las activaciones de los expertos en dos grupos de ejemplos: los que el modelo base resuelve correctamente y los que falla. De las instancias correctas extrae una señal de qué patrones de enrutamiento hay que conservar. Luego, durante el ajuste fino, incrementa artificialmente el peso de los tokens de respuesta en las instancias fallidas cuando esos tokens activan a los expertos "buenos".

La clave es que no congela un subconjunto fijo de expertos ni fuerza una distribución de enrutamiento fija. Deja que el enrutamiento natural del modelo base guíe la adaptación, pero atendiendo a la corrección de las predicciones. Es un mecanismo de supervisión a nivel de token condicionado por si el modelo acierta o no.

Los resultados se presentan en tres modelos MoE distintos y seis benchmarks. En 17 de 18 combinaciones de modelo y tarea, TEXAS obtiene el mejor resultado o empata con el mejor. La mejora media sobre el baseline más competitivo es de 1,3 a 1,5 puntos. Son diferencias pequeñas pero consistentes para cualquier método de adaptación.

No se publica código en la fuente. No se detalla qué modelos MoE concretos se usaron ni qué benchmarks ni qué métricas exactas se reportan. Tampoco se especifica el coste computacional extra que impone el mecanismo de emparejamiento entre expertos y corrección de errores. Sin esos datos, el resultado se queda en una promesa sugestiva para quien ajuste modelos MoE, pero sin suficiente base para valorar si es práctico.
