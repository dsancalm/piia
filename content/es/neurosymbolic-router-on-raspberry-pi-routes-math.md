---
title: "Un enrutador neurosimbólico aprende como autómata finito a delegar cálculo en"
summary: "El sistema decide sin pesos neuronales si una consulta va a un solver exacto o a un modelo pequeño, logrando 100 % de acierto en enrutamiento y 98,3 % de precisión global en una Raspberry Pi 4B. Los baselines se quedan en 72 % y 58,7 %."
lang: es
story: neurosymbolic-router-on-raspberry-pi-routes-math
publishedAt: 2026-09-30T12:58:43.583Z
sourceUrl: "https://arxiv.org/abs/2609.35833"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [neurosimbólico, autómata, edge, razonamiento]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un artículo en arXiv presenta un enrutador neurosimbólico que decide, antes de generar nada, si una consulta debe resolverse con un solver determinista (aritmética, álgebra, lógica formal) o con un modelo de lenguaje pequeño (SLM). El router se aprende como un autómata finito determinista (DFA) mediante el algoritmo L* de inferencia gramatical: el SLM actúa como oráculo de membresía y un conjunto de datos etiquetados sirve de oráculo de equivalencia. El resultado es un clasificador que no necesita pesos neuronales en tiempo de inferencia y que, en una Raspberry Pi 4B de 8 GB sin GPU, alcanza el 100 % de acierto en la decisión de enrutamiento y el 98,3 % de precisión global con un presupuesto de 512 tokens (93,3 % en problemas verbales). Los baselines Program-of-Thought y un agente tool-calling con los mismos solvers se quedan en 72,0 % y 58,7 % respectivamente.

Las consultas que el router reconoce como formateadas , expresiones aritméticas, ecuaciones, fórmulas lógicas, nunca llegan al modelo: se resuelven en 1-11 ms. En una configuración agresiva de 30 tokens, el sistema completo corre 8,8 veces más rápido y consume 2,8 veces menos energía que Program-of-Thought en el mismo hardware. La evaluación usa 100 prompts no vistos tomados de DeepMind Mathematics, GSM8K y RuleTaker.

El enfoque cambia la economía del razonamiento en edge: en lugar de pedirle al SLM que razone todo, se aprende a detectar la estructura formal y se delega la parte determinista a código que no alucina, no consume tokens y es órdenes de magnitud más barato. El DFA aprendido es inspeccionable, auditable y no deriva con el tiempo.

## Lo que no se sabe

- Qué SLM concreto se usa (arquitectura, parámetros, checkpoint).
- Detalles de los solvers deterministas (motores, forma de invocación).
- Consumo energético absoluto en julios o vatios-hora y metodología de medición.
- Tamaño del DFA aprendido (número de estados y transiciones).
- Número de consultas de membresía y equivalencia necesarias para que L* converja.
- Distribución exacta de los 100 prompts entre los tres benchmarks.
- Latencia y energía del SLM solo (sin router) en el mismo hardware.
- Si el router generaliza a dominios fuera de matemáticas y lógica formal.
- Disponibilidad y licencia de código, datos y pesos.
- Detalles de la configuración de 30 tokens (truncamiento, prompt distinto, etc.).
