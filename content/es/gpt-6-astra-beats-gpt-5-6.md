---
title: "GPT-6 Astra supera a la familia GPT-5.6 en prueba visual de SVG"
summary: "Simon Willison comparó los cinco niveles de razonamiento de Astra con Sol, Terra y Luna pidiendo un pelícano en bicicleta. Todos los Astra, incluso el más barato a 9,55 centavos, ganan al mejor Sol."
lang: es
story: gpt-6-astra-beats-gpt-5-6
publishedAt: 2026-09-06T11:15:25.556Z
sourceUrl: "https://simonwillison.net/2026/Sep/4/astra-pelicans/"
sourceName: "Simon Willison"
priority: routine
tags: [openai, gpt6, benchmark, svg]
generatedBy: dots-studio/dots-3-note-preview:free
---
Simon Willison probó GPT-6 Astra el 4 de septiembre de 2026. La prueba consistía en pedir un SVG de un pelícano montando en bicicleta. En Astra usó los cinco niveles de razonamiento disponibles: low, medium, high, xhigh y max (no existe reasoning=none). En la familia GPT-5.6 comparó Sol, Terra y Luna.

El resultado es una cuadrícula donde todos los pelícanos de Astra, desde low hasta xhigh, superan al mejor de Sol en xhigh. El nivel max de Astra produce un dibujo "realmente bueno".

La diferencia más visible está en las patas. Astra por debajo de max no logra colocar de forma fiable las dos patas a ambos lados del cuadro de la bicicleta; max sí lo consigue. Aun así, Astra low ya entrega un SVG mejor que cualquier variante de Sol a cualquier nivel, y lo hace por 9,55 centavos.

Los precios publicados sitúan a Astra a 10 dólares por millón de tokens de entrada y 50 por millón de salida, frente a 5 y 30 de Sol. Willison estima que Astra puede costar alrededor del doble que Sol en uso real. En la prueba, Astra y Luna consumieron 16 tokens de entrada cada uno, mientras que Sol y Terra necesitaron 26. La coincidencia en el consumo de entrada y la calidad del resultado llevan a Willison a especular si Astra y Luna comparten más arquitectura de la que OpenAI ha contado.

Quedan sin responder:
- Costes por nivel de razonamiento (low, medium, high, xhigh, max) para Astra y GPT-5.6.
- Tokens de salida usados en cada generación.
- Latencia o tiempo de respuesta por nivel.
- Si la estimación "alrededor del doble" se confirma en la tarifa oficial.
- Detalles técnicos de la relación entre Astra y Luna.
- Disponibilidad general y lanzamiento de GPT-6 Astra.
- Rendimiento en otras tareas de código o razonamiento.
