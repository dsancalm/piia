---
title: "EntropyMoE routes byte-level LLMs by patch entropy"
summary: "A new architecture replaces dense feed-forward layers with Top-K experts selected by the entropy of dynamic patches. This cuts compute on predictable text and avoids costly token-expert similarity calculations, achieving the lowest bits-per-byte among compared baselines."
lang: en
story: entropymoe-routes-byte-level-llms-by-patch
publishedAt: 2026-08-10T08:18:32.538Z
sourceUrl: "https://arxiv.org/abs/2608.06398"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [llm, mixture-of-experts, byte-level, entropy]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Los LLMs sin tokenizador procesan bytes directamente, pero pagan un precio: las secuencias son más largas y los feed-forward densos se convierten en un cuello de botella. EntropyMoE, enviado a arXiv el 31 de julio de 2026, ataca ese problema con una capa Mixture-of-Experts que enruta por parches dinámicos en lugar de tokens fijos.

La arquitectura reemplaza los módulos feed-forward densos del Transformer de parches global con capas de expertos Top-K. Cada parche dinámico actúa como unidad básica de enrutamiento, y su cobertura de bytes determina cuánto contribuye al cálculo de carga de trabajo. El enrutador selecciona expertos directamente de la entropía del parche, usando la misma señal de granularidad que ya se emplea para construir los parches dinámicos. La entropía y la longitud del parche definen juntas el espacio de características que regula la especialización de los expertos.

La ventaja es doble. Por un lado, los parches de alta entropía (contenido impredecible) reciben más recursos de cómputo, mientras que los de baja entropía (texto repetitivo o predecible) se procesan con menos. Por otro, el enrutamiento por entropía evita el coste de calcular similitudes entre tokens y expertos, que en modelos byte-level puede ser prohibitivo.

Los experimentos reportan el bits-por-byte retenido más bajo entre los baselines densos y dispersos comparados, manteniendo una precisión descendente comparable. Eso significa que el modelo comprime mejor el texto con la misma o mejor calidad, y lo hace gastando menos cómputo en los parches que no lo necesitan.

Para quien trabaja con arquitecturas byte-level, esto sugiere que la entropía del parche es una coordenada de enrutamiento viable. No hace falta un módulo separado que calcule relevancia: la misma señal que decide cómo segmentar el texto puede decidir qué expertos activar. Es una forma de acoplar la capacidad del modelo a la semántica del parche sin añadir parámetros ni pasos de preprocesado.

No se sabe el número exacto de expertos en las capas Top-K, ni el tamaño del modelo, ni el conjunto de datos usado en los experimentos. Tampoco hay cifras concretas de bits-por-byte o precisión en el resumen. Esos detalles están en el cuerpo del artículo, que aún no se ha publicado completo.
