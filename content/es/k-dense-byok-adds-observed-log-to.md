---
title: "K-Dense BYOK ejecuta investigación local sin enviar datos fuera"
summary: "Un benchmark de 20 prompts muestra que esta herramienta de código abierto supera a dos plataformas gestionadas en calidad científica y reproducibilidad, al registrar el software ejecutado y comandos de regeneración."
lang: es
story: k-dense-byok-adds-observed-log-to
publishedAt: 2026-10-02T13:10:55.515Z
sourceUrl: "https://arxiv.org/abs/2610.00074"
sourceName: "arXiv cs.AI"
priority: routine
tags: [investigacion, reproducibilidad, llm, codigo-abierto]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
K-Dense BYOK es un asistente de investigación de código abierto bajo licencia MIT que se ejecuta completamente en tu máquina. No envía datos a servidores de terceros: tú aportas las claves de API o los modelos locales (BYOK, *Bring Your Own Keys*) y la aplicación aporta el andamiaje científico: plantillas de flujo de trabajo, catálogos de datos y roles diferenciados para revisor y escritor.

Cada proyecto es una carpeta ordinaria con datos, código, resultados y el registro. Esa estructura permite leer el trabajo años después sin necesidad de la aplicación. La pieza central es un *Living Lab Notebook* cuyas entradas se encadenan por hash; se añaden, nunca se borran. El registro de lo ocurrido no se fía de lo que dice el modelo, sino que observa las acciones del agente y las escribe en un log observado al que el propio agente no puede acceder. Ese diseño combate el *overclaiming*: la tendencia de los modelos frontera a afirmar que han ejecutado código, buscado literatura o analizado datos cuando solo han generado texto plausible.

En un benchmark de 20 prompts interdisciplinarios con rúbrica fijada de antemano, K-Dense BYOK superó a dos plataformas gestionadas en calidad científica y ejecución de la investigación. Sus entregables fueron los únicos que registraron el software ejecutado y los que habitualmente incluyeron un comando para regenerar resultados. Una de las plataformas comparadas usaba el mismo modelo frontera y no suministró ni registro de entorno ni comando de regeneración. El artículo previo de los mismos autores evaluó 9 modelos frontera en un benchmark de *overclaiming* y documenta el problema con detalle.

Los registros de entorno actuales son archivos que escribió el agente, no parte del log observado, y aún no capturan el entorno de software completo. El artículo tiene 38 páginas, 8 figuras más un abstracto gráfico, e incluye los prompts de benchmark, la rúbrica y las puntuaciones por prompt.

## Qué no se sabe

- URL concreta del repositorio (el texto remite a "this https URL" sin mostrarla).
- Qué modelos frontera exactos se usaron en el benchmark de 20 prompts.
- Detalles de la rúbrica de puntuación y pesos de cada criterio.
- Puntuaciones numéricas exactas por prompt y plataforma.
- Nombres de las dos plataformas gestionadas comparadas.
- Requisitos de hardware mínimos o recomendados para ejecutar K-Dense BYOK localmente.
- Formatos de archivo del *Living Lab Notebook* y del log observado.
- Si el log observado captura llamadas a sistema, contenedores o solo acciones de alto nivel del agente.
- Fecha de registro del DOI de DataCite (el texto indica que está pendiente).
- Dependencias clave del proyecto y gestor de paquetes usado.
