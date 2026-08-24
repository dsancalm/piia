---
title: "Nuevo paradigma SDAD: la ingeniería se desplaza a la especificación y los gates de"
summary: "Un paper en arXiv formaliza el Spec-Driven Agentic Development como cuarto paradigma histórico tras Waterfall, Agile y AI-code. La disciplina no desaparece con la velocidad agentica: se mueve aguas arriba hacia especificaciones formales legibles por máquina, síntesis..."
lang: es
story: spec-driven-agentic-development-emerges-as-fifth
publishedAt: 2026-08-24T09:39:38.246Z
sourceUrl: "https://arxiv.org/abs/2608.20341"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [ingenieria, agentes, especificacion, verificacion]
generatedBy: dots-studio/dots-3-note-preview:free
---
El paper que firman Vu Hung Nguyen y Thanh Nguyen en arXiv (versión 1, 5 de mayo de 2026) no presenta un framework ni una herramienta. Propone un cambio de paradigma en la forma de organizar el trabajo cuando los agentes escriben código: Spec-Driven Agentic Development (SDAD). La tesis central es que la disciplina de ingeniería no desaparece con la velocidad agentica; se desplaza aguas arriba, hacia la precisión de la especificación y los gates de verificación.

Los autores identifican cuatro paradigmas históricos de producción de software. Waterfall y Agile son los dos primeros. El tercero, al que llaman "AI-code", corresponde a la asistencia de copiloto línea a línea que hemos visto en 2023-2025. El cuarto, Agentic-SDAD, es el que formalizan aquí: captura de intención, especificación legible por máquina, síntesis agentica y verificación multi-agente independiente bajo aprobación humana. La tabla comparativa entre Human-Agile (hacia 2020) y Agentic-SDAD (hacia 2026) resume el giro: los artefactos pasan de historias de usuario y tests a especificaciones formales y evidencia de verificación; la cadencia deja de ser sprints de dos semanas para convertirse en ciclos de especificación-síntesis-verificación; la responsabilidad se separa entre autoridad de síntesis (el agente) y autoridad de release (humano con gates explícitos); la postura de seguridad migra de revisiones puntuales a procedencia auditable continua.

Para gobernar ese cambio proponen métricas cuantitativas: Ambiguity Tax (coste de la especificación imprecisa), Spec Fidelity (adherencia del artefacto generado a la especificación), SER (tasa de éxito de síntesis) y TCI_agentic con un multiplicador de reparación phi que penaliza los bucles de corrección. El paper no da fórmulas ni valores de referencia; deja eso para trabajos posteriores. Tampoco detalla el plan de migración por etapas más allá de mencionar que existe y que combina estimación híbrida para adopción pragmática.

La sección de roles describe una metamorfosis: ingeniería se centra en arquitectura de especificaciones y diseño de pipelines de verificación; QA pasa de ejecutar tests a auditar evidencia de verificación multi-agente; plataforma construye el runtime de especificación-síntesis-verificación; producto afina la captura de intención y la gobernanza de ambigüedad. El texto cita "evidencia industrial y de investigación" sobre testing y verificación aumentados por IA para justificar la separación de autoridades, pero no nombra empresas ni resultados concretos.

Lo que no se sabe
- Fórmulas y valores numéricos para Ambiguity Tax, Spec Fidelity, SER, TCI_agentic y phi.
- Detalles del plan de migración: número de etapas, duración, criterios de entrada y salida.
- Qué empresas y qué resultados conforman la "evidencia industrial" citada.
- Definición precisa del paradigma "AI-code" frente a Agentic-SDAD.
- Implementación técnica de la verificación multi-agente independiente bajo aprobación humana.
- Casos de estudio o experimentos empíricos que validen el marco.
- Herramientas, frameworks o lenguajes de especificación machine-readable recomendados.
