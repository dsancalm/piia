---
title: "ttok 1.0 estrena tokenizador GPT-5/6 y evita desfases de costes"
summary: "La primera versión estable de ttok cambia el tokenizador por defecto al de la familia GPT-5/GPT-6, tras un experimento de William Liu donde siete modelos devolvieron exactamente 44.794 tokens en 31 fixtures."
lang: es
story: simon-willison-releases-ttok-1-0-with
publishedAt: 2026-10-09T13:42:10.755Z
sourceUrl: "https://simonwillison.net/2026/Oct/9/ttok/"
sourceName: "Simon Willison"
priority: routine
tags: [tokens, openai, gpt-6, ttok]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison ha publicado ttok 1.0, la primera versión estable de su utilidad de línea de comandos para contar y truncar tokens. El cambio principal respecto a la 0.4 es el tokenizador por defecto: ahora usa la familia GPT-5/GPT-6 en lugar del de GPT-4. Para quien estima costes o recorta contexto antes de llamar a la API de OpenAI, esto elimina el riesgo de trabajar con conteos desfasados.

La actualización se instala con el gestor de herramientas de uv:

```bash
uv tool upgrade ttok
```

Detrás del cambio hay un experimento de William Liu que probó siete modelos de la familia GPT-5/6 (5.5, 5.6 Sol/Terra/Luna, 6 Astra/Sol/Luna) contra 31 fixtures de prueba. Los siete devolvieron exactamente 44.794 tokens y coincidieron en todos los fixtures. Eso sugiere que GPT-6 no introduce variaciones en el conteo de entrada sobre ese corpus, pero OpenAI no ha confirmado oficialmente que GPT-6 comparta tokenizador con GPT-5. Existe un issue abierto, descrito como "angry issue", discutiendo esa confirmación.

Lo que no se sabe
- Confirmación oficial de OpenAI sobre la identidad del tokenizador entre GPT-5 y GPT-6.
- Detalles técnicos del commit de William Liu (hash, repositorio, fecha exacta).
- Qué modelos concretos son "5.6 Sol/Terra/Luna" y "6 Astra/Sol/Luna" (nombres de código internos vs públicos).
- Cuál era exactamente el tokenizador por defecto en ttok 0.4 (se menciona GPT-4 pero no se confirma explícitamente).
- Fecha de lanzamiento de ttok 0.4.
- Qué corpus de prueba se usó para los 31 fixtures.
