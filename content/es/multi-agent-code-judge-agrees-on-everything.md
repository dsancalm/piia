---
title: "Los jueces multi-agente declaran empate masivo por falta de evidencia"
summary: "Un estudio en NeurIPS 2026 revela que MARCH iguala soluciones de código en hasta el 95 % de los casos; su precisión se hunde al 4,4 %. Dos métricas sin etiquetas detectan cuándo el juez no tiene fundamento y, al filtrar esos empates, la acierto sube al 36,9 % resolviendo la..."
lang: es
story: multi-agent-code-judge-agrees-on-everything
publishedAt: 2026-09-28T14:25:36.947Z
sourceUrl: "https://arxiv.org/abs/2609.30328"
sourceName: "arXiv cs.AI"
priority: routine
tags: [neurips, code-judging, multi-agente, evaluacion]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Los jueces multi-agente que evalúan código tienden a declarar empate cuando les falta evidencia para distinguir entre dos soluciones. El paper aceptado en el taller WiML de NeurIPS 2026 muestra que MARCH, un framework publicado sin modificaciones, resuelve 80 mediciones condición-por-celda en dos benchmarks de code judging y declara ambas soluciones igualmente buenas en el 78-95 % de las comparaciones. Su precisión cae al 4.4 % frente al 43.7 % que alcanza el mismo modelo juzgando directamente. Ni simplificar los problemas ni usar un juez más grande revierte el resultado.

La contribución central no es un juez más preciso, sino dos mediciones label-free que detectan cuándo el juez carece de fundamento. Aplicando una compuerta sobre una de ellas, el pipeline rechaza las comparaciones que no puede resolver y sube la precisión del 20.7 % al 36.9 % respondiendo aún la mitad de los casos. Eso permite abstenerse o escalar a revisión humana sin necesidad de ground truth.

## Lo que no se sabe

- Cuáles son exactamente las dos mediciones label-free: el abstract no las nombra ni describe.
- Cuáles son los dos benchmarks de code judging utilizados.
- Qué es MARCH en detalle: arquitectura, agentes, prompts, más allá de "framework publicado".
- Por qué la evidencia deja de diferir entre candidatos en code judging; el abstract lo afirma pero no lo explica.
- Detalles de los experimentos con problemas más fáciles y juez más grande.
- Código, datos o repositorio asociado: el texto menciona enlaces pero no da nombres.
