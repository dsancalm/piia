---
title: "Claude Code escribe el 90% de su propio código y reduce reverts un 40%"
summary: "El equipo de Claude Code fusiona más del 90% de los PR con asistencia del modelo. La revisión ya no es un gate final, sino continua: Claude corrige su propio código antes de que lo vea un humano."
lang: es
story: anthropic-replaces-human-code-review-with-layered
publishedAt: 2026-10-17T11:03:05.729Z
sourceUrl: "https://claude.dev/blog/solving-code-review-at-anthropic/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ia, desarrollo, automatización, revisión]
generatedBy: dots-studio/dots-3-note-preview:free
---
El equipo de Claude Code escribe aproximadamente el 90% de su propio código con el asistente. Entre junio y septiembre los pull requests fusionados en su repositorio más que duplicaron su volumen, mientras que la tasa de reverts cayó más de un 40%. En el monorepo de Anthropic los cambios diarios pasaron de 2.500 en mayo a más de 30.000 en septiembre. El objetivo declarado es que la mayoría de los PR fusionen con como máximo un humano en el bucle.

La revisión ya no es un gate al final del proceso, sino continua, comparable a un corrector ortográfico. La mayoría de los cambios son revisados y corregidos por Claude al menos una vez antes de que una persona los vea. El equipo optimiza para el mínimo tiempo de revisión humana que no aumente reverts ni incidentes, usando estos últimos como guardarraíl.

## Flujo automatizado por capas

Antes de abrir el PR, Claude ejecuta pruebas, build y linter. Un segundo agente revisa el diff en contexto fresco. En cada PR la integración continua es obligatoria: lint, comprobación de tipos, pruebas, build y empaquetado. A continuación, Claude revisa el código, se lanza una revisión de seguridad y se aplica una aprobación basada en riesgo.

El clasificador de riesgo establece el tier: cero personas, una o dos. Algunos paths siempre requieren una persona independientemente del tier. Tras la fusión, el cambio pasa por feature flag, release gradual, observación y rollback automático si se decide.

La verificación automática se considera el factor más importante para obtener buenos resultados, con una mejora estimada de 2 a 3 veces frente a la revisión puramente humana.

## Archivos de convención y comandos

`CLAUDE.md` contiene la convención del proyecto y se carga en cada revisión. `REVIEW.md`, escrita por los dueños del código, indica lo que importa en su área. El comando `/security-review` forma parte del flujo de revisión de seguridad y se invoca explícitamente en el proceso.

Se miden aprobaciones humanas por PR (mediana y percentil 95), comentarios humanos y tiempo de espera. Estas métricas permiten ajustar el sistema sin perder de vista la calidad real, que se valida con reverts e incidentes.

## Lo que no se sabe

No se especifica el nombre exacto del clasificador de riesgo ni cómo funciona internamente. No se detalla el porcentaje exacto de PR que caen en cada tier de riesgo. No se explica cómo se decide el umbral de riesgo para cada path o archivo. No se menciona si hay métricas históricas de precisión de la revisión automática. No se describe cómo se manejan los falsos positivos de la revisión de Claude. No se especifica el tiempo promedio de revisión humana antes y después del cambio de proceso. No se detalla cómo se mide la calidad de la revisión más allá de reverts e incidentes. No se explica cómo se entrena o actualiza el modelo de revisión de Claude. No se menciona si hay límites de uso o costos asociados al uso de agentes de revisión.
