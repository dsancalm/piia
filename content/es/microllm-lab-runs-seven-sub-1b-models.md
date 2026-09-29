---
title: "MicroLLM Lab ejecuta siete modelos diminutos en el navegador sin instalar nada"
summary: "La web stateofutopia.com permite probar inferencia local sin registro ni claves; interesa a desarrolladores que evalúan modelos por debajo de 1.000 millones de parámetros para apps offline o de privacidad estricta."
lang: es
story: microllm-lab-runs-seven-sub-1b-models
publishedAt: 2026-09-29T13:23:56.044Z
sourceUrl: "https://stateofutopia.com/experiments/microllmlab/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [llm, navegador, privacidad, webgpu]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
MicroLLM Lab permite ejecutar siete modelos de lenguaje diminutos directamente en el navegador. La página, alojada en stateofutopia.com, ha alcanzado 261 puntos y 91 comentarios en Hacker News, lo que indica un interés real entre desarrolladores por probar inferencia local sin montar infraestructura.

La propuesta es sencilla: entras, eliges un modelo y generas texto. No hay registro, no hay clave de API y, si la implementación es puramente client-side, los datos no salen de tu máquina. Eso la convierte en una herramienta útil para evaluar rápidamente la calidad de modelos por debajo de 1.000 millones de parámetros, comprobar latencia en tu hardware y decidir si merece la pena integrarlos en una aplicación offline o de privacidad estricta.

Lo que no se sabe

No se conoce la lista exacta de los siete modelos, sus tamaños en parámetros ni sus licencias. Tampoco está confirmado si la inferencia corre 100 % en local mediante WebGPU o WebAssembly, o si hay un servidor de respaldo. Se desconoce el consumo de memoria mínimo, si la interfaz muestra métricas de velocidad (tokens por segundo), si permite comparar salidas de varios modelos a la vez, quién mantiene stateofutopia.com y si el código fuente está publicado.
