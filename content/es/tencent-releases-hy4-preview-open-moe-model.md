---
title: "Tencent publica Hy4 Preview: 770.000 millones de parámetros y un millón de tokens de"
summary: "El nuevo modelo de pesos abiertos duplica la escala de Hy3 con arquitectura MoE, 49.000 millones de parámetros activos y ventana de contexto ampliada, aunque solo acepta texto y ofrece dos únicos niveles de razonamiento."
lang: es
story: tencent-releases-hy4-preview-open-moe-model
publishedAt: 2026-08-30T12:12:00.295Z
sourceUrl: "https://simonwillison.net/2026/Aug/29/hy4/"
sourceName: "Simon Willison"
priority: flash
tags: [tencent, modelo, moe, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Tencent ha publicado Hy4 Preview, un modelo de lenguaje de pesos abiertos que más que duplica la escala de su predecesor. La arquitectura Mixture of Experts suma 770 000 millones de parámetros totales, de los que 49 000 millones están activos en cada paso de inferencia, y extiende la ventana de contexto a un millón de tokens. El repositorio en Hugging Face ocupa 1,56 TB frente a los 598 GB de Hy3, que se quedó en 295 000 millones de parámetros totales, 21 000 millones activos y 256 000 tokens de contexto.

El modelo solo acepta texto; no tiene capacidades de visión. La plantilla de chat incluida en el repositorio expone dos únicos niveles de esfuerzo de razonamiento: `high`, que viene activado por defecto, y `no_think`, que lo desactiva por completo. No hay un nivel intermedio ni un parámetro numérico para dosificar la longitud de la cadena de pensamiento.

```jinja
{% - if not reasoning_effort is defined %} {% - set reasoning_effort = 'high' %} {% - elif reasoning_effort not in [ 'high' , 'no_think' ] %} {% - if reasoning_effort is none %} {{- raise_exception('reasoning_effort error : None, should be no_think/high') }} {% - else %} {{- raise_exception('reasoning_effort error : ' + reasoning_effort + ', should be no_think/high') }} {% - endif %} {% - endif %}
```

Simon Willison probó el modelo a través de OpenRouter con el prompt "Generate an SVG of a pelican riding a bicycle" y el modo `high`. La respuesta mostró una traza de razonamiento en inglés que quedó truncada, lo que sugiere que el presupuesto de tokens de pensamiento puede consumir buena parte de la ventana disponible si no se controla.

## Qué no se sabe

- Licencia concreta del modelo (el anuncio dice "open weight" sin especificar cuál).
- Benchmarks o evaluaciones comparativas de Hy4.
- Requisitos de hardware , VRAM, cuantización necesaria, para inferencia local.
- Disponibilidad, latencia y coste en OpenRouter u otros proveedores de API.
- Detalles de la arquitectura MoE: número de expertos, estrategia de enrutado, etc.
