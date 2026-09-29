---
title: "Anthropic lanza Sonnet 5.5: más rápido, más barato y ya gratis en claude.ai"
summary: "El modelo recorta latencia y coste un 30 % frente a su predecesor sin cambiar la API. Iguala a Opus 5.5 en código creativo y 3D, pero arrastra el mismo fallo al forzar el razonamiento al máximo. Ya disponible en el tier gratuito, adelanta a la Luna 5.6 de OpenAI."
lang: es
story: anthropic-launches-claude-sonnet-5-5-with
publishedAt: 2026-09-29T13:12:03.667Z
sourceUrl: "https://simonwillison.net/2026/Sep/28/claude-sonnet-5-5/"
sourceName: "Simon Willison"
priority: flash
tags: [anthropic, sonnet, ia, webgl]
generatedBy: dots-studio/dots-3-note-preview:free
---
Anthropic lanzó el 28 de septiembre de 2026 el modelo Claude Sonnet 5.5. Según el anuncio oficial, la nueva versión es más de un 30% más rápida y cuesta hasta un 30% menos que Sonnet 5 para la mayoría de las tareas, manteniendo el mismo precio de lista. En la práctica, cualquier pipeline que invoque al modelo por API verá reducida la latencia y la factura sin tocar una línea de configuración.

El modelo hereda la capacidad de "pensamiento extendido" que estrenó Opus 5.5, pero arrastra el mismo fallo: al forzar el esfuerzo `max`, el modelo consumió 128.000 tokens de razonamiento (1,28 dólares) y terminó fallando al generar el SVG solicitado. Con el nivel `xhigh` la cosa cambia: un pelícano 3D montado en bicicleta renderizado con WebGL salió en 41 segundos por 5,74 céntimos.

```html
build me an HTML page that renders a three-dimensional pelican riding a bicycle using WebGL
```

Ese prompt, usado por Simon Willison como prueba de estrés, demuestra que Sonnet 5.5 roza el nivel de Opus 5.5 en tareas de codificación creativa y generación de gráficos 3D. El modelo ya está activo en el nivel gratuito de `claude.ai`, lo que pone a disposición de cualquier desarrollador una alternativa más capaz que la Luna 5.6 que OpenAI sirve en el tier gratuito de ChatGPT.

### Qué no se sabe

- Qué benchmarks concretos respaldan la afirmación "supera en todos los benchmarks" y bajo qué metodología.
- Si el bug del esfuerzo `max` se corregirá en una revisión menor o requiere cambio de arquitectura.
- Disponibilidad geográfica del tier gratuito y condiciones de rate limiting.
- Fecha exacta y precio del futuro Haiku 5.5, ni confirmación de su competitividad real frente a GPT-6 Luna.
- Detalles de acceso vía API: cuotas, SLA o regiones habilitadas.
