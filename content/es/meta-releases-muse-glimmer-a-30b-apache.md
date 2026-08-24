---
title: "Meta lanza Muse Glimmer, un modelo de 30B con licencia Apache 2.0"
summary: "Muse Glimmer encadena razonamiento agéntico y visión en una sola pasada, y puedes ejecutarlo en tu máquina con 32 GB de RAM. Simon Willison ya lo ha probado en local y lo ha usado para responder preguntas sobre código y describir imágenes."
lang: es
story: meta-releases-muse-glimmer-a-30b-apache
publishedAt: 2026-08-11T07:47:08.963Z
sourceUrl: "https://simonwillison.net/2026/Aug/10/introducing-muse-glimmer/#atom-everything"
sourceName: "Simon Willison"
priority: flash
tags: [meta, modelo, visión, licencia]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Meta ha publicado Muse Glimmer, un modelo de 30B parámetros con licencia Apache 2.0. Está pensado para tareas agénticas de extremo a extremo: encadena razonamiento en horizontes largos, mantiene planes coherentes en flujos de trabajo complejos y maneja llamadas a funciones con esquemas precisos. En benchmarks como DeepSearch QA, MCP-Atlas, τ-Bench y SWE-Bench consigue buenas tasas de éxito, aunque la fuente no detalla cifras exactas.

Simon Willison lo ha probado en local con LM Studio. La versión que descargó pesa 18.16 GB y su máquina tiene 128 GB de RAM, pero el requisito recomendado es de 32 GB o más. También lo ha usado con su plugin `llm-coding-agent` contra un checkout fresco de Datasette, con el prompt `how does auth work?`. Para ello aplicó un parche en `llm-lmstudio` para compatibilidad con LLM 0.32.

Muse Glimmer es además un modelo de visión. Willison le pidió que describiera una imagen de pelícanos y obtuvo una descripción detallada. También generó una imagen de un pelícano con el modelo, lo que indica que no solo entiende imágenes, sino que puede producirlas.

El comando que usó para la descripción de la imagen fue este:

```bash
llm -m lmstudio/meta/muse-glimmer -a https://static.inaturalist.org/photos/714731804/large.jpg 'describe image'
```

Para quien programa con LLMs locales, lo relevante es que tienes un modelo de 30B con licencia permisiva que hace razonamiento agéntico y visión en una sola pasada. No necesitas encadenar llamadas a APIs externas ni gestionar tokens de un servicio remoto. Con 32 GB de RAM puedes ejecutarlo en tu propia máquina, y al ser Apache 2.0 puedes usarlo en proyectos comerciales sin pagar licencia.

El hecho de que Meta lo haya publicado bajo Apache 2.0 no es menor. La mayoría de modelos abiertos de este tamaño usan licencias con restricciones de uso comercial o de despliegue. Aquí no hay esa barrera.

## Lo que no se sabe

La fuente no especifica la fecha exacta de lanzamiento más allá del 10 de agosto de 2026. Tampoco detalla el rendimiento concreto en cada benchmark, solo dice que logra "fuertes tasas de éxito". No hay información sobre el coste de entrenamiento ni los datos utilizados. Y aunque funciona en LM Studio y con `llm-lmstudio`, no se indica si estará disponible en otras plataformas de despliegue.
