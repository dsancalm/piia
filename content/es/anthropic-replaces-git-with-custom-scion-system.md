---
title: "Anthropic sustituye Git por Scion, su control de versiones centralizado sin conexión"
summary: "La migración de cinco meses la ejecutaron siete personas sobre un repositorio de casi 100 GB. El sistema evita 600 PB diarios de tráfico en CI y soporta más de 30.000 fusiones diarias."
lang: es
story: anthropic-replaces-git-with-custom-scion-system
publishedAt: 2026-10-14T12:21:07.173Z
sourceUrl: "https://simonwillison.net/2026/Oct/13/redesigning-source-control-at-anthropic/"
sourceName: "Simon Willison"
priority: routine
tags: [anthropic, scion, control-versiones, monorrepo]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Anthropic ha reemplazado Git por un sistema propio llamado Scion y ha desarrollado una herramienta de revisión de código denominada Antique. La migración duró cinco meses y la ejecutó un equipo de siete personas. El repositorio principal acumula casi 100 GB de historial y una copia de trabajo comprimida supera los 25 GB. La infraestructura de integración continua realiza unos 25 millones de checkouts al día; con Git eso habría generado más de 600 PB de tráfico diario. En mayo de 2026 se fusionaban unas 2.500 modificaciones diarias y en septiembre ya eran más de 30.000.

Scion se describe como una reinvención del control de versiones centralizado, similar a Subversion. No ofrece soporte sin conexión; Nick G, ingeniero del proyecto, argumenta que no es necesario porque el usuario más intensivo, el modelo Claude, siempre está en línea. La revisión adversarial se usa de forma extensiva, aunque puede ser miope y requiere ingenieros expertos que guíen a los modelos para evitar sobreingeniería.

## Lo que no se sabe

- Arquitectura y protocolo exactos de Scion más allá de la analogía con Subversion.
- Si Scion se publicará como código abierto.
- Cronología precisa de disponibilidad interna de los modelos Fable y Mythos frente a sus lanzamientos públicos.
- Detalles de la integración entre Antique, Scion y el sistema de CI.
- Flujo concreto de revisión adversarial y qué modelos se enfrentan entre sí.
- Comparativas de rendimiento formales entre Scion y Git para la carga de trabajo de Anthropic.
- Gestión de activos binarios grandes y escalado del monorrepo más allá de las cifras publicadas.
