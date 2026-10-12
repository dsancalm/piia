---
title: "SWE-Duel evalúa agentes de código con torneos donde los rivales crean los tests"
summary: "Once pares modelo-harness compitieron en 1.500 turnos sobre 15 repositorios y cinco lenguajes. Cada agente alterna entre proponer features con bugs ocultos y revisar el código ajeno sin saber que falla."
lang: es
story: swe-duel-benchmark-pits-agents-against-each
publishedAt: 2026-10-12T15:52:42.959Z
sourceUrl: "https://arxiv.org/abs/2610.12569"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [benchmark, agentes, codigo, evaluacion]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
SWE-Duel cambia el planteamiento de los benchmarks de agentes de codificación: en lugar de un conjunto fijo de tareas, la dificultad la generan los propios agentes en el momento de la evaluación. El sistema organiza un torneo por turnos espejo entre dos agentes, Red y Blue, que intercambian roles en cada ronda. Red debe proponer e implementar una feature con sus tests, y luego inyectar un bug sutil acompañado de tests sellados que lo disparan. El pull request solo se acepta si pasa los tests de la feature y los del repositorio mientras falla exactamente los tests del bug, y si una sesión fresca del mismo agente es capaz de reparar ese bug a ciegas. Blue revisa el PR sin saber que existe el bug; gana solo si su revisión supera las tres suites de tests.

El torneo reunió a 11 participantes (pares modelo-harness) sobre 15 repositorios en cinco lenguajes durante 1.500 turnos. GPT-5.5 con Codex CLI quedó primero como solver más fuerte, reparando el 98,3 % de los defectos que revisa. Claude Opus 4.8 con mini-swe-agent fue el mejor task author, alcanzando un 27,3 % de Red win rate. Dentro de una misma familia de modelos, las tareas escritas por la versión más reciente derrotan a un solver de referencia fijo el 42,9 % de las veces, frente al 4 % de las versiones antiguas.

## Lo que no se sabe

No se ha publicado la lista completa de los 11 modelos y harnesses participantes más allá de los dos líderes. Tampoco se conocen los 15 repositorios ni los cinco lenguajes concretos. Faltan detalles operativos: cómo se define y valida la "sutileza" del bug, la arquitectura exacta de los harnesses (Codex CLI, mini-swe-agent y los demás), el aislamiento real entre sesiones, el coste computacional total del torneo y si habrá código, datos o artefactos públicos disponibles. El paper no incluye intervalos de confianza ni p-values, ni una comparativa cuantitativa directa con benchmarks estáticos como SWE-bench.
