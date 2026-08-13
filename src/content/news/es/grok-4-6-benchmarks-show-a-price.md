---
title: "Grok 4.6 llega con precios bajos y resultados discretos en programación"
summary: "xAI lanzó Grok 4.6 el 12 de agosto, orientado a agentes de larga duración y disponible en Cursor y Grok Build. Su API arranca en 2 dólares por millón de tokens de entrada, pero en benchmarks de código queda por detrás de GPT-5.6 Sol Max y Fable 5 Max en varias pruebas."
lang: es
story: grok-4-6-benchmarks-show-a-price
publishedAt: 2026-08-13T08:10:36.583Z
sourceUrl: "https://x.ai/news/grok-4-6"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [xai, grok, api, benchmarks]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Grok 4.6 está disponible desde el 12 de agosto. El modelo de xAI llega con orientación a agentes de larga duración y trabajo interactivo con el escritorio, y ya se puede usar en Cursor y en Grok Build. La API arranca en 2 dólares por millón de tokens de entrada y 6 por millón de salida, con el doble de uso incluido en esas dos herramientas durante la primera semana.

En el Índice de Inteligencia de Artificial Analysis, Grok 4.6 marca 61 puntos. Eso lo deja por debajo de Fable 5 Max, que llega a 62, y por encima de GPT-5.6 Sol Max, que se queda en 61 según la misma tabla. El salto desde Grok 4.5 es de cinco puntos, que no es poco si miramos los 56 del modelo anterior.

Donde las cifras se vuelven más matizadas es en los benchmarks de programación. En CursorBench v3.2, Grok 4.6 logra 69.9%, frente al 70.5% de Fable 5 Max y el 67.2% de GPT-5.6 Sol Max. En DeepSWE v1.1, el modelo de xAI se queda en 65.9%, lejos del 73% de GPT-5.6 Sol Max. En FrontierCode v1.1 (Extended) marca 61.3%, unos puntos por detrás de Fable 5 Max (63.6%) y GPT-5.6 Sol Max (60.6%). En tareas de terminal, Terminal-Bench v3.0 lo deja con 26%, mientras GPT-5.6 Sol Max llega a 34.6% y Fable 5 Max a 34.1%.

Para evaluar alternativas de API, el dato de precio importa más que un punto arriba o abajo en un benchmark. A 2 dólares por millón de tokens de entrada, Grok 4.6 está en la gama baja de los modelos de frontera. GPT-5.6 Sol Max y Fable 5 Max no han publicado precios comparables en esta tanda, así que la comparación directa de coste por tarea queda abierta.

La instalación del cliente de xAI para usar el modelo desde terminal está disponible con este comando:

```bash
$ curl -fsSL https://x.ai/cli/install.sh | bash
```

No hay datos públicos sobre el coste real de una sesión de agente de larga duración, que es el uso para el que está pensado este modelo. El precio por token no incluye el gasto de las llamadas intermedias que hace un agente autónomo. Tampoco se han publicado arquitectura ni tamaño del modelo, así que no hay forma de saber qué hay detrás de estos números desde fuera.
