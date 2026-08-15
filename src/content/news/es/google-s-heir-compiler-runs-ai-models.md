---
title: "Google lanza HEIR, un compilador open source para cifrado homomórfico"
summary: "Google ha publicado HEIR, un compilador open source que convierte modelos de IA entrenados para operar sobre datos cifrados sin desencriptarlos. La herramienta, dentro de su Private Computing Toolkit, busca simplificar la implementación del cifrado homomórfico, que hasta..."
lang: es
story: google-s-heir-compiler-runs-ai-models
publishedAt: 2026-08-15T07:10:06.821Z
sourceUrl: "https://blog.google/security/how-google-is-making-private-ai-practical-with-homomorphic-encryption/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [cifrado, compilador, google, privacidad]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Google ha publicado HEIR, un compilador open source para cifrado homomórfico, dentro de su Private Computing Toolkit. La herramienta convierte modelos de IA ya entrenados para que operen sobre datos cifrados, sin necesidad de desencriptarlos en ningún momento del proceso. El anuncio original es del 14 de agosto de 2026, aunque HEIR se presentó por primera vez en 2023.

El cifrado homomórfico permite hacer cálculos sobre datos cifrados y obtener un resultado cifrado que, al desencriptarse, coincide con el resultado que se habría obtenido operando sobre los datos en claro. Hasta ahora, su uso práctico ha sido limitado por el coste computacional y por la dificultad de implementarlo. HEIR ataca el segundo problema: en lugar de escribir circuitos criptográficos a mano, compilas un modelo de IA normal y obtienes la versión que trabaja sobre datos cifrados.

Google muestra cuatro aplicaciones de inferencia privada: recomendación de contenido, detección de fraude con tarjetas de crédito, detección de intrusiones y detección de hotwords. En la detección de intrusiones usan Kitsune, un modelo de detección de anomalías en redes. La idea es que el servidor procesa datos cifrados sin saber qué contiene, y devuelve el resultado cifrado al cliente, que es el único que puede desencriptarlo.

Para acompañar el compilador, Google se ha asociado con Belfort, Niobium, Cornami y Optalysys para desarrollar aceleradores de hardware específicos para cifrado homomórfico. Sin ese hardware, el coste de las operaciones sigue siendo alto para muchos casos de uso reales.

El artículo no da cifras de latencia, coste ni rendimiento de HEIR en las aplicaciones demostradas. No se detallan los modelos exactos usados en cada demo, aparte de Kitsune. Tampoco se especifican los requisitos de hardware para ejecutar HEIR, ni la fecha de disponibilidad pública más allá del anuncio.
