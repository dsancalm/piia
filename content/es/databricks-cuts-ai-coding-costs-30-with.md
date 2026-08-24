---
title: "El router de Databricks recorta más de un 30% el coste de la IA en código"
summary: "Databricks analiza con Stripe, Coinbase y Uber cómo reducir el gasto en asistentes de codificación. Un router que elige el modelo según la tarea ahorra un tercio del coste sin bajar calidad. Las empresas ya no asumen que el modelo más nuevo es el más rentable."
lang: es
story: databricks-cuts-ai-coding-costs-30-with
publishedAt: 2026-08-08T07:35:24.208Z
sourceUrl: "https://www.databricks.com/blog/managing-ai-coding-costs-scale"
sourceName: "Hacker News (portada)"
priority: routine
tags: [ia, costes, desarrollo, router]
generatedBy: deepseek/deepseek-v4-flash-0731
---
El coste real de los asistentes de IA en código no es el precio por token, es el coste por tarea completada. Y ese coste se puede reducir por encima del 30% sin perder calidad, según la experiencia compartida por Databricks, que ha hablado con Stripe, Coinbase, Uber y Ramp para el análisis.

En Databricks, el uso de agentes de codificación ha mejorado todas las métricas de velocidad que miden, y en algunos equipos la producción se ha multiplicado por diez. El problema es que esa ganancia no sale gratis. Los modelos más caros no siempre son los mejores para cada tarea, y las empresas están aprendiendo a no pagar de más.

Stripe lo comprobó con Opus 4.7: no mejoraba la calidad respecto a Opus 4.6, pero costaba más. Decidieron no ponerlo a disposición internamente. Databricks vio regresiones de coste parecidas al comparar Opus 5.0 con 4.8. La conclusión es que el modelo más nuevo no es automáticamente el más rentable.

La pieza central es el Smart Router del AI Gateway de Databricks, que reduce el coste medio por tarea en más de un 30% manteniendo una calidad parecida a la del modelo más caro del conjunto. En lugar de enviar cada petición al modelo más potente, el router decide qué modelo usar según la tarea. Es una pieza que Databricks ha liberado, junto con su meta-harness Omnigent, para que cualquiera pueda montar su propia capa de orquestación sin quedarse atado a un proveedor.

Los presupuestos duros, esos que cortan el uso al llegar a un umbral de gasto, se usan solo como último recurso en todas las empresas consultadas. Cortar por lo sano perjudica la productividad, así que prefieren la gestión fina: elegir modelo, ajustar prompts y medir resultados.

Lo que no se sabe es bastante. El artículo no da el desglose de ahorro por técnica concreta, ni detalla las evaluaciones automáticas que las empresas construyen para probar modelos nuevos. Tampoco dice cuántas empresas participaron en la encuesta ni qué presupuesto por usuario manejan. Y las meta-harnesses de otras compañías, como las de Stripe o Uber, no están descritas, probablemente porque son internas y no se comparten.

La lección práctica es que el ahorro no viene de negociar con el proveedor, sino de no usar el modelo más caro para todo. Un router que decida por ti, con reglas de calidad comprobadas, es la diferencia entre pagar por capacidad y pagar por resultado.
