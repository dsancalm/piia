---
title: "Strands Decider 2B clasifica opciones y da confianza en 115 ms"
summary: "Un modelo abierto de 2B parámetros basado en Qwen3.5 sustituye la cabeza generativa por un clasificador LoRA de 1M de parámetros. Ocupa el tercer puesto en JevBench y sirve de guardrail local para decidir qué herramienta invocar o a qué equipo derivar un ticket."
lang: es
story: strands-decider-2b-routes-agent-tasks-locally
publishedAt: 2026-10-07T13:47:43.514Z
sourceUrl: "https://strandsagents.com/blog/introducing-strands-decider/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [modelo, clasificador, guardrail, open-source]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Strands Decider 2B es un modelo abierto de dos mil millones de parámetros entrenado para una sola tarea: elegir entre opciones y asignar una puntuación de confianza a cada una. No genera texto libre. Funciona como un clasificador rápido que permite a un agente decidir qué herramienta invocar, a qué equipo derivar un ticket o si una llamada a función está justificada antes de ejecutarla.

La arquitectura parte del torso preentrenado de Qwen3.5-2B. Se elimina la cabeza de modelo de lenguaje y se suelda una "pointer head" de aproximadamente un millón de parámetros, afinada con un adaptador LoRA de rango 16. El resultado es un modelo que ocupa el tercer puesto de 33 en su clase de peso en JevBench, tanto en precisión como en calibración (Brier score), y el primero si se excluyen modelos ligeramente superiores a 2B.

La latencia media en tareas pequeñas es de 115 milisegundos en una RTX 3090 local y 153 milisegundos en un MacBook M3. El tiempo escala de forma aproximadamente lineal con el número de tokens de entrada, lo que permite predecir el coste de inferencia.

## Instalación y uso básico

El paquete se instala desde PyPI y expone una CLI lista para probar:

```bash
pip install strands-decider
strands-decider ask StrandsAgents/strands-decider-2B-hobson-v19 \
  --state "Help! My payouts have been failing for 3 days!" \
  --choice "Which team should handle this?=billing,sales,retail"
```

El comando devuelve la opción ganadora y su puntuación numérica. El repositorio incluye ejemplos de integración con Strands Agents mediante un sistema de intervención: el modelo valida los argumentos de una herramienta y detecta llamadas prematuras antes de que se ejecuten, actuando como guardrail barato y local.

Los pesos, los datos de entrenamiento y los scripts se publican en Hugging Face bajo el identificador `strands-decider-2b` (versión v19/hobson-v19).

## Lo que no se sabe

- Licencia exacta de los pesos y el modelo (no se menciona en la fuente).
- Requisitos mínimos de RAM para inferencia en CPU pura (solo se afirma que es "adecuado para CPU o GPU local").
- Composición, tamaño e idiomas del dataset de entrenamiento más allá de "todos los datos y scripts".
- Métricas de latencia en CPU sin aceleración.
- Fecha de corte de conocimiento del modelo base Qwen3.5-2B.
- Si habrá versiones de 7B u otros tamaños o se mantendrá solo la línea de 2B.
