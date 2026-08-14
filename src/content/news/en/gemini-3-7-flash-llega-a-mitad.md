---
title: "Gemini 3.7 Flash llega a mitad de precio y con mejoras en benchmarks"
summary: "Google lanzó Gemini 3.7 Flash el 13 de agosto de 2026, tres semanas después de 3.6 Flash, con subidas en casi todos los benchmarks de código y agentes. El precio baja a $0.75 por millón de tokens de entrada y $3.75 por salida, la mitad que 3.6 Flash, lo que reduce el costo..."
lang: en
story: gemini-3-7-flash-llega-a-mitad
publishedAt: 2026-08-14T07:57:56.446Z
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [google, gemini, modelo, precio]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Gemini 3.7 Flash llegó el 13 de agosto de 2026, tres semanas después de 3.6 Flash, y sube las puntuaciones en casi todos los benchmarks de código y agentes. En FrontierCode 1.1 Main pasa de 34.4% a 43.6%, y en DeepSWE v1.1 de 49.0% a 65.3%. En WebDev Arena sube de 1538 a 1588 Elo. GDP.pdf pasa de 22.0% a 34.0%, y AutomationBench de 17.0% a 30.4%.

El precio introductorio es de $0.75 por millón de tokens de entrada y $3.75 por millón de tokens de salida. Eso es la mitad del costo por token de 3.6 Flash, que cuesta $1.50 y $7.50. Si tus flujos de producción dependen de muchos retries por fallos de formato o lógica, la mejora en precisión se traduce directamente en menos llamadas y menos gasto.

Gemini Spark, el asistente gratuito, ya usa 3.7 Flash desde hoy en más de 160 países. Para quien programa contra la API, el cambio relevante es que el modelo que antes era la opción barata y mediocre ahora rinde cerca de lo que pedías hace dos versiones. No hace falta esperar al modelo "premium" para tareas de agente; este Flash ya carga con agentes de nivel decente.

## Salvaguardas y acceso

Google incluye salvaguardas actualizadas contra mal uso en dominios CBRN y ciberofensivos. No detallan qué cambió respecto a 3.6 Flash, pero si trabajas en seguridad ofensiva o con material sensible, conviene asumir que hay filtros nuevos y probarlos antes de desplegar.

El acceso API ya está disponible. No hay código en el anuncio original, así que no hay nada que copiar y pegar: solo cambias el nombre del modelo en tu llamada y listo.

## Lo que no se sabe

La fuente no especifica la fecha exacta de disponibilidad general más allá de "hasta fin de año" para el precio introductorio. No detalla los cambios algorítmicos concretos que produjeron las mejoras. No indica el tamaño del contexto de 3.7 Flash, ni menciona límites de tasa o cuotas específicas para la API. Si tu decisión de migrar depende de alguna de esas cifras, tendrás que esperar a la documentación técnica o medirlas tú mismo.
