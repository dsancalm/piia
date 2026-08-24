---
title: "Modular libera el compilador y el toolchain de Mojo"
summary: "La লোপación de la licencia Apache 2 permite el uso DPI gratuito y la auditoría del tritiuma de Mojo. El lenguaje ya no busca ser unSku de Python, sino una alternativa de bajo nivel optimizada para la programación en GPU."
lang: es
story: the-company-announces-a-new-policy-for
publishedAt: 2026-08-19T07:18:13.420Z
sourceUrl: "https://simonwillison.net/2026/Aug/18/mojo-is-now-open-source/"
sourceName: "Simon Willison"
priority: flash
tags: [mojo, modular, sku, gpu]
generatedBy: google/gemma-4-26b-a4b-it:free
---
Modular ha liberado el compilador y el toolchain de Mojo bajo la licencia Apache 2. Este movimiento cumple la promesa realizada en mayo de 2023. Aunque el plan original de Mojo era actuar como un superset de Python, la estrategia cambió en agosto de 2025. Ahora, el lenguaje es propio y está optimizado para la programación en GPU.

El lanzamiento de la versión 1.0 ocurrió el 18 de agosto de 2026. Con esto, cualquier desarrollador puede usar y contribuir al lenguaje de forma abierta. La medida elimina la suscripción de 10 dólares al mes que limitaba el acceso previo. Al adoptar la licencia Apache 2, la comunidad puede desarrollar y auditar la infraestructura de Mojo.

## El cambio de arquitectura y su impacto

La decisión de no ser un simple superset de Python afecta la integración del lenguaje en proyectos. Al ser un lenguaje independiente orientado a la GPU, la gestión de la memoria y la ejecución de tareas paralelas funcionan de forma distinta a la de Python estándar. El objetivo de alto rendimiento se mantiene, pero la integración con bibliotecas existentes ya no es el eje central del diseño.

Mojo deja de ser una capa sobre Python para convertirse en una alternativa de bajo nivel. La liberación del toolchain permite que las herramientas de desarrollo se adapten a este enfoque. Esto facilita la creación de software que utiliza el hardware de forma directa, sin depender de la estructura de objetos de Python.

Lo que no se sabe:
* Los detalles técnicos de la implementación del compilador.
* Las especificaciones exactas de la compatibilidad con código Python.
* El proceso de migración de Python a Mojo.
