---
title: "Gemini 3.7 Flash llega a la API con la mitad de precio y mejoras en código"
summary: "Google lanza Gemini 3.7 Flash en su API y en la app Gemini Spark en más de 160 países. El modelo sube notablemente en benchmarks de código y tareas de agente, y cuesta la mitad que Gemini 3.6 Flash, aunque el precio introductorio solo está garantizado hasta fin de año."
lang: es
story: gemini-3-7-flash-llega-a-mitad
publishedAt: 2026-08-14T07:57:56.446Z
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [google, gemini, ia, modelo]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Gemini 3.7 Flash ya está disponible en la API y en Gemini Spark, la aplicación de Google que hoy empieza a usar este modelo en más de 160 países. Llega tres semanas después de Gemini 3.6 Flash, y las cifras que ha publicado Google justifican la prisa.

Las mejoras se concentran en código y en tareas de agente. En FrontierCode 1.1 Main pasa de 34.4% a 43.6%, y en DeepSWE v1.1, un benchmark de resolución de issues reales en repositorios, sube de 49.0% a 65.3%. En WebDev Arena, donde los humanos votan webs generadas por modelos, sube de 1538 a 1588 Elo. También mejora en extracción de datos de PDF (GDP.pdf: de 22.0% a 34.0%) y en automatización de tareas de escritorio (AutomationBench: de 17.0% a 30.4%).

El precio introductorio es de $0.75 por millón de tokens de entrada y $3.75 por millón de tokens de salida. Eso es la mitad de lo que cuesta Gemini 3.6 Flash, según las tarifas públicas de Google. Si las mejoras de precisión se mantienen en tu carga de trabajo, el costo efectivo baja más todavía: menos retries, menos llamadas fallidas, menos depuración.

Google también anuncia salvaguardas actualizadas contra el mal uso en dominios CBRN y ciberofensivos. No dan detalles de qué cambia exactamente respecto a la versión anterior.

## Qué implica para producción

Si tienes flujos con agentes que encadenan muchas llamadas, el salto en DeepSWE y AutomationBench es el dato que más pesa. Son benchmarks de tareas largas donde el modelo tiene que tomar decisiones intermedias; ahí es donde los fallos se acumulan y encarecen cada ejecución. Un modelo que acierta más en cada paso reduce drásticamente el número de llamadas totales.

La subida en GDP.pdf también es relevante si procesas documentos: pasar de 22.0% a 34.0% en extracción estructurada es un cambio de categoría, no un ajuste fino.

No hay código en el anuncio original, así que no hay nada que copiar y ejecutar. Lo que sí puedes hacer es probar el modelo directamente en la API de Gemini con el parámetro `model: "gemini-3.7-flash"` y comparar con tu tráfico real antes de migrar.

## Lo que no se sabe

Google no ha especificado cuándo termina el precio introductorio, solo dice que se mantiene hasta fin de año. Tampoco detalla los cambios algorítmicos que producen estas mejoras, ni el tamaño del contexto del modelo. No hay información sobre límites de tasa o cuotas específicas para la API, así que si tu uso es intensivo, tendrás que comprobarlo con tu plan actual.
