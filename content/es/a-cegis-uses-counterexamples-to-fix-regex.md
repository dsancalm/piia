---
title: "A-CEGIS resuelve el 90 % de tareas regex con contraejemplos en cuatro turnos"
summary: "Un bucle agente-oráculo usa solo falsos positivos y negativos como feedback para corregir expresiones regulares sin reentrenamiento. La autocorrección genérica apenas alcanza el 27 % frente al 90 % del método diagnóstico."
lang: es
story: a-cegis-uses-counterexamples-to-fix-regex
publishedAt: 2026-09-04T12:04:07.837Z
sourceUrl: "https://arxiv.org/abs/2609.02892"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [regex, verificacion, agentes, benchmark]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A-CEGIS propone un bucle cerrado y verificable para convertir lenguaje natural en expresiones regulares. Un agente propone una regex. Un oráculo determinista la evalúa bajo semántica de coincidencia completa. Si falla, devuelve testigos compactos: cadenas que la regex acepta pero no debería (falsos positivos) o que rechaza pero debería aceptar (falsos negativos). Esos contraejemplos son el único feedback que recibe el agente para el siguiente turno. No hay reentrenamiento, no hay prompts genéricos de "inténtalo de nuevo", no hay mensajes de error crudos. Solo evidencia concreta de qué falla.

En el benchmark NL-RX-Turk (30 tareas) la generación zero-shot resuelve el 17 %. La autocorrección genérica sube al 27 % y el feedback solo de error al 23 %. Con contraejemplos diagnósticos se llega al 90 % dentro de un presupuesto de cuatro turnos. El tiempo medio hasta el éxito es de 2,7 turnos. En una corrida completa que incluye hardening y sondeo dirigido, todas las tareas se resuelven en el conjunto oculto para el turno final y el éxito robusto se sitúa en el 77 %.

El framework mide qué tan eficientemente un agente mejora a través de turnos y añade una comprobación de robustez práctica más allá de los casos held-out originales. Al no requerir reentrenamiento, es integrable en pipelines CI/CD donde exista un oráculo determinista: tests unitarios, validadores de esquema, linters, comprobadores de tipos.

## Lo que no se sabe

- Qué modelo(s) de agente se usaron exactamente (arquitectura, tamaño, checkpoint).
- Detalles del oráculo determinista: implementación, tiempo de ejecución, cómo genera testigos compactos.
- Definición precisa de "hardening" y "targeted probing" en la corrida diagnóstica completa.
- Composición del hidden set: tamaño, origen, si hay solapamiento con NL-RX-Turk.
- Métricas de latencia o coste por turno (tokens, llamadas a API, tiempo real).
- Resultados por tarea individual (variabilidad, casos difíciles).
- Si el framework se probó en dominios fuera de regex (generación de código general, SQL, etc.).
- Disponibilidad de código, datos y prompts (el texto menciona enlaces a Code/Data/Media pero no da detalles).
