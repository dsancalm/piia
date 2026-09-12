---
title: "OpenRouter reparte el modelo y cada proveedor cambia su comportamiento"
summary: "OpenRouter elige el proveedor más barato y salta al siguiente si falla, lo que hace que la misma llamada al mismo modelo se ejecute en infraestructuras distintas."
lang: es
story: openrouter-automatic-routing-can-change-model-behavior
publishedAt: 2026-09-12T11:13:53.260Z
sourceUrl: "https://simonwillison.net/2026/Sep/11/so-you-want-to-use-openrouter/"
sourceName: "Simon Willison"
priority: urgent
tags: [openrouter, api, proveedores, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
OpenRouter vende la idea de una API unificada que elige el proveedor más barato y salta al siguiente si uno falla. En la práctica, eso significa que una misma llamada al mismo modelo puede ejecutarse sobre infraestructuras distintas sin que tú lo decidas. Mohamed Moustafa señala que cada proveedor aplica sus propias optimizaciones, cuantizaciones y límites de contexto, de modo que la latencia, la calidad de la respuesta y hasta la disponibilidad de funciones como visión o "reasoning effort" cambian entre una petición y la siguiente.

El endpoint `/endpoints` devuelve la lista de proveedores que sirven un ID de modelo concreto. Con esa información puedes forzar uno solo añadiendo `provider.only` en el cuerpo de la petición. La sintaxis documentada es:

```json
{
  "model": "meta-llama/llama-3.1-70b-instruct",
  "provider": {
    "only": ["Together", "Fireworks"]
  },
  "messages": [
    {"role": "user", "content": "Hola"}
  ]
}
```

Si omites ese bloque, OpenRouter reparte el tráfico según su criterio de coste y disponibilidad. Eso está bien para prototipos, pero en producción introduce variabilidad no controlada: un proveedor puede truncar el contexto a 8k tokens mientras otro admite 128k, o ignorar el parámetro `reasoning_effort` que tú enviaste.

La opción `provider.only` acepta un array de nombres de proveedor tal como aparecen en `/endpoints`. También existe `provider.allow` para una lista blanca y `provider.deny` para una lista negra, aunque la documentación pública no detalla sus límites de tasa ni cómo interactúan con los fallbacks automáticos.

Lo que no se sabe: cuáles son exactamente los "conjuntos de formas" problemáticos que describe Moustafa, qué proveedores concretos carecen de visión o difieren en `reasoning effort`, la especificación completa de `/endpoints` (paginación, campos de respuesta, autenticación) y si OpenRouter ha respondido o planea cambios tras estas críticas.
