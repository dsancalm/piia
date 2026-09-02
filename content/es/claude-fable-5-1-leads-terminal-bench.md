---
title: "Claude Fable 5.1 supera al 52 % en Terminal-Bench y multiplica su coste en niveles"
summary: "El nuevo modelo de Anthropic duplica la puntuación de su predecesor en tareas de terminal y ciencia. Willison muestra que el nivel max genera SVG complejos a 3,30 $ y 14 minutos, mientras low y medium ocultan su razonamiento pese a ser obligatorio."
lang: es
story: claude-fable-5-1-leads-terminal-bench
publishedAt: 2026-09-02T12:19:59.893Z
sourceUrl: "https://simonwillison.net/2026/Sep/1/claude-fable-5-1/"
sourceName: "Simon Willison"
priority: routine
tags: [anthropic, benchmark, terminal, coste]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Anthropic lanzó Claude Fable 5.1 el 1 de septiembre de 2026 con un resultado que llama la atención: 52,6 % en Terminal-Bench-Science 0.1. El modelo anterior, Fable 5, se quedó en 24,7 %; Opus 5 marcó 29,0 % y GPT-5.6 Sol, 22,4 %. La diferencia no es marginal y sitúa a Fable 5.1 como referencia inmediata para tareas que exigen uso de terminal y razonamiento científico.

El modelo expone cinco niveles de razonamiento (low, medium, high, xhigh, max) y no permite desactivarlo. Simon Willison probó el mismo prompt , “Generate an SVG of a pelican riding a bicycle”, en cada nivel y midió tokens, latencia y coste.

En low y medium no apareció razonamiento visible en la traza. Low consumió 1.998 tokens de salida en 23,8 s por 10,017 céntimos; medium, 1.977 tokens en 23 s por 9,912 céntimos. En high el modelo mostró un resumen de razonamiento: 2.612 tokens, 29,6 s, 13,087 céntimos. El salto llega con xhigh: 36.767 tokens, 7 min 51 s, 1,83 $. En max la salida sube a 65.927 tokens, 13 min 54 s y 3,30 $. Según Willison, el pelícano de max es el mejor: incluye fondo, patas a ambos lados del cuadro, pies en los pedales, ala apoyada en el manillar, gorro azul y una cesta con un pez.

Willison encadenó la salida: tomó el SVG de max y se lo pasó al mismo modelo en nivel high con el prompt “animate this”. La animación costó 6.121 tokens de entrada, 26.201 de salida y 1,37 $. En el MP4 resultante las ruedas giran al revés por un artefacto de la conversión a vídeo; en el SVG original giran correctamente.

Durante las pruebas detectó un bug en `llm-anthropic` que impedía registrar correctamente las trazas de razonamiento y lo corrigió. El comando que usó para animar a partir del log:

```bash
llm logs -cx | llm -m claude-fable-5.1 -s ' animate this '
```

Lo que no se sabe
- Detalles completos de Terminal-Bench-Science 0.1 ni su representatividad real.
- Por qué low y medium no mostraron razonamiento aunque el modelo no permite desactivarlo.
- Calidad objetiva de la animación más allá de la impresión subjetiva del autor.
- Comparación cuantitativa con Gemini 3.7 Flash en el mismo prompt.
- Si el bug en `llm-anthropic` afecta a otros usuarios o solo al entorno de Willison.
