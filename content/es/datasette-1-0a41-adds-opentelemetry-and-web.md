---
title: "Datasette 1.0a41 integra OpenTelemetry y unifica modales en un Web Component"
summary: "La alpha añade exportación nativa de trazas, métricas y logs sin middleware extra y sustituye todos los diálogos modales por un componente estándar `<datasette-modal>` con API documentada para plugins."
lang: es
story: datasette-1-0a41-adds-opentelemetry-and-web
publishedAt: 2026-09-25T12:05:53.545Z
sourceUrl: "https://simonwillison.net/2026/Sep/24/datasette/"
sourceName: "Simon Willison"
priority: routine
tags: [datasette, opentelemetry, webcomponents, plugins]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Datasette 1.0a41 salió el 24 de septiembre de 2026 con dos cambios que afectan a quien opera o extiende la herramienta.

El primero es la integración nativa de OpenTelemetry, obra de Alec Garcia. A partir de esta alpha, cualquier instancia puede exportar trazas, métricas y logs a un colector compatible sin añadir middleware externo ni envolver la aplicación. Eso elimina una capa de configuración frágil y permite correlacionar peticiones HTTP con consultas SQL internas desde el primer despliegue.

El segundo cambio es estructural. Todos los diálogos modales del núcleo se han reescrito como un único Web Component estándar. El componente se registra bajo la etiqueta `<datasette-modal>` y expone una API pública documentada: métodos `open()` y `close()`, eventos `datasette-modal-open` y `datasette-modal-close`, y una ranura (`slot`) para inyectar contenido arbitrario. Los plugins que antes inyectaban su propio HTML y JavaScript para mostrar modales pueden ahora delegar en este componente compartido, reduciendo duplicación y asegurando comportamiento consistente: foco, accesibilidad, cierre con Escape, backdrop.

Para adoptar el componente en un plugin propio basta con importar el archivo JavaScript que Datasette sirve en `/-/static/datasette-modal.js` y usar la etiqueta en la plantilla del plugin. No hay paso de compilación obligatorio; el componente funciona en cualquier navegador moderno sin polyfills.

Lo que no se sabe: qué métricas, trazas o logs concretos emite la instrumentación OpenTelemetry por defecto; si hay *breaking changes* en la API de plugins respecto a alphas anteriores; lista completa de correcciones de errores; fecha estimada para la 1.0 estable; ni guía de migración paso a paso para plugins que usen los antiguos diálogos modales.
