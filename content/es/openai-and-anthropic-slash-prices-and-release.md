---
title: "OpenAI y Anthropic lanzan modelos y desatan una guerra de precios que deja obsoletos"
summary: "GPT-6 Luna cuesta 0,10 dólares por millón de tokens de entrada y 0,50 de salida, diez veces menos que Haiku 4.5. GPT-6 Sol y Opus 5.5 recortan precios un 50 % y un 20 % respectivamente."
lang: es
story: openai-and-anthropic-slash-prices-and-release
publishedAt: 2026-09-23T11:55:46.623Z
sourceUrl: "https://simonwillison.net/2026/Sep/22/opus-and-sol-and-luna/"
sourceName: "Simon Willison"
priority: flash
tags: [ia, precios, openai, anthropic]
generatedBy: dots-studio/dots-3-note-preview:free
---
Anthropic lanzó Claude Opus 5.5 el 22 de septiembre de 2026. Una hora después, OpenAI presentó GPT-6 Sol y GPT-6 Luna. Los tres modelos llegan con una guerra de precios que reordena la tabla de decisiones para quien programa.

GPT-6 Luna cuesta 0,10 dólares por millón de tokens de entrada, 0,01 dólares por millón en caché y 0,50 dólares por millón de salida. Su predecesor, GPT-5.6 Luna, costaba el doble en entrada y caché y 1,20 dólares en salida. GPT-6 Sol baja a 2 dólares entrada, 0,20 caché y 10 salida frente a los 4, 0,40 y 20 de GPT-5.6 Sol. Claude Opus 5.5 se queda en 4 dólares entrada, 0,20 caché y 20 salida, lo que supone un 20 % menos que el Opus anterior (5 y 25) y un 60 % menos en lectura de caché.

El efecto inmediato: GPT-5.6 Terra, que costaba 2, 0,20 y 12, queda obsoleto al coincidir en precio de entrada y caché con GPT-6 Sol pero ser más caro en salida. GPT-6 Astra y Claude Fable 5.1 comparten la banda alta a 10 y 50. Grok 4.7 se sitúa en 2 y 6. Haiku 4.5, el modelo barato actual de Anthropic, cuesta 1 y 5; GPT-6 Luna es diez veces más barato en entrada y diez veces en salida. Solo GPT-4.1 Nano (0,10 y 0,40) y GPT-5 Nano (0,05 y 0,40) baten a Luna en precio puro.

OpenAI ha anunciado una subida del 25 % para GPT-5.6 en noviembre de 2026. Eso amplía la brecha con los nuevos modelos y presiona a migrar.

En la práctica, el autor usa GPT-6 Sol y Opus 5.5 como modelos por defecto en Codex y Claude Code, y ha pasado el demo de Datasette Agent a GPT-6 Luna. Opus 5.5 falló al generar un SVG de un pelícano en bicicleta en nivel de razonamiento "max": 2,56 dólares y casi veinte minutos sin respuesta. El límite de salida de Opus 5.5 es de 128 000 tokens.

Anthropic ha confirmado que Sonnet 5.5 y Haiku 5.5 llegarán pronto. Haiku 5.5 tendrá que competir con los 0,10 / 0,50 de GPT-6 Luna.

## Lo que no se sabe

No hay benchmarks publicados que comparen calidad real entre Opus 5.5, GPT-6 Sol y GPT-6 Luna. No se conocen los detalles técnicos del fallo de Opus 5.5 en "max". Las capacidades concretas de Sonnet 5.5 y Haiku 5.5 no se han descrito. Tampoco está claro cómo responderá Anthropic en precios ni si la guerra de precios se mantendrá o derivará en otro tipo de diferenciación.
