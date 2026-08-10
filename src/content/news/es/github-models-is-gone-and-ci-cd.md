---
title: "GitHub Models desaparece y deja sin API a quien la usaba en Actions"
summary: "El servicio de playground y API unificada de LLM se ha retirado por completo. Quienes lo usaban en GitHub Actions para generar texto con la clave de GitHub ya no pueden hacerlo."
lang: es
story: github-models-is-gone-and-ci-cd
publishedAt: 2026-08-10T08:16:54.809Z
sourceUrl: "https://simonwillison.net/2026/Aug/9/github-models-is-now-retired/#atom-everything"
sourceName: "Simon Willison"
priority: flash
tags: [github, llm, api, retirada]
generatedBy: deepseek/deepseek-v4-flash-0731
---
GitHub Models ya no existe. El servicio ofrecía un playground para probar modelos y una API unificada para distintos proveedores de LLM. Se ha retirado por completo. El mensaje de "brownout" programado que aparecía en la página ya no es relevante: la retirada está completa.

El servicio tenía un uso práctico para quien programa. El código que corría en GitHub Actions podía usar la clave de API de GitHub ya presente en ese entorno para ejecutar prompts. Eso evitaba gestionar credenciales adicionales y costes propios. Simon Willison usaba GitHub Models para generar resúmenes de sus artículos. Ha tenido que cambiar de método. Ahora usa una clave de API de OpenAI con un límite de gasto mensual y genera sus resúmenes con GPT-5.6 Luna.

Un detalle: GitHub no ha explicado el motivo del cierre. Tampoco se sabe si los usuarios recibieron una notificación oficial antes de la retirada ni la fecha exacta en que se completó.

```text
GitHub Models is temporarily unavailable as part of a scheduled retirement brownout.
```

Si dependías de GitHub Models para llamadas a LLM en GitHub Actions, el cambio es directo. Necesitas tu propia clave de API de un proveedor, configurar un límite de gasto y ajustar el flujo en tus workflows. El código que usaba la clave de GitHub ya no funciona.

Willison ha documentado sus cifras: 193 artículos sobre GitHub, 2.179 sobre IA, 69 sobre GitHub Actions, 1.930 sobre IA generativa, 1.897 sobre LLM y 89 sobre precios de LLM. Son los números de su blog, no del servicio retirado, pero dan una idea del volumen de contenido que genera con esta automatización.

Lo que no se sabe

Los motivos exactos de la retirada, la fecha de finalización y si hubo aviso previo a los usuarios. Tampoco el coste o los límites de uso de la clave de OpenAI que usa Willison ahora.
