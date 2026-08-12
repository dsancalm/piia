---
title: "El efecto de CoT depende de la tarea y del tamaño del modelo"
summary: "Un estudio pre-registrado mide cuándo el razonamiento encadenado ayuda, sobra o perjudica. En código, el modelo más pequeño pierde 28,7 puntos al usarlo."
lang: es
story: chain-of-thought-prompting-helps-or-hurts
publishedAt: 2026-08-12T08:09:39.959Z
sourceUrl: "https://arxiv.org/abs/2608.09942"
sourceName: "arXiv cs.CL"
priority: routine
tags: [llm, razonamiento, evaluación, iagenerativa]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Chain-of-thought prompting no es un multiplicador universal del rendimiento en razonamiento. Bajo ciertas condiciones, ni ayuda ni perjudica. En una clase concreta de tareas, puede hundir los resultados. Un estudio empírico pre-registrado en OSF y publicado en arXiv (cs.CL) mide por primera vez con precisión dónde está cada caso.

El marco conceptual parte del límite de ancho de banda H_dp definido por Chen et al. (2024). La hipótesis es que CoT no "enseña" a razonar al modelo, sino que le da un canal extra para compensar un cuello de botella entre la profundidad serial de la tarea y la capacidad de procesamiento en una sola pasada. Para comprobarlo, los autores evaluaron Qwen-2.5-7B/32B y Llama-3.1-8B en cinco benchmarks que cubren tres clases de complejidad computacional.

Los resultados separan tres comportamientos distintos:

- En tareas P-completas de alta profundidad (GSM8K, MATH), CoT recupera entre +54 y +68 puntos porcentuales de precisión en todos los modelos. Sin CoT, la precisión cae de forma monótona con la profundidad serial por ítem.
- En tareas superficiales de la clase TC^0 (MMLU, ARC), CoT es redundante. El delta va de 0.0 a +4.6 puntos porcentuales. No hay efecto negativo medible, pero tampoco hay ganancia que justifique el coste de inferencia.
- En la clase intermedia (HumanEval), el efecto depende del tamaño del modelo: +23.2 puntos con el de 32B, +9.1 con el de 8B, y -28.7 puntos con el de 7B. El modelo más pequeño empeora de forma notable al usar CoT.

La correlación entre profundidad de la tarea y recuperación es Spearman rho = 0.661 (p = 0.007, n = 15). De las 15 pruebas McNemar a nivel de benchmark, 9 son significativas tras corrección de Bonferroni. La precisión máxima sin CoT en ARC alcanza el 95%, lo que sugiere que el techo de esa tarea ya está cerca y no hay margen para que CoT aporte.

Para quien integra LLMs en un pipeline, la decisión de usar CoT debería depender de dos variables que ahora tienen datos: la profundidad serial de la tarea (cuántos pasos de razonamiento encadenado requiere) y el tamaño del modelo. En tareas aritméticas o de razonamiento matemático encadenado, CoT es claramente beneficioso. En clasificación o respuesta a preguntas de conocimiento general, es gasto de tokens sin retorno. En generación de código, aplicar CoT sin medir el tamaño del modelo es una apuesta: puede ganar 23 puntos o perder 28.

El documento tiene 15 páginas, 3 figuras y 5 tablas. No incluye código ejecutable, así que no hay comandos que reproducir.

## Lo que no se sabe

La fuente no detalla los tamaños de contexto exactos usados en los experimentos. Tampoco especifica qué variante de Llama-3.1-8B se usó (base, instruct u otra). No hay evidencia de que los resultados se mantengan con modelos fuera de los tres evaluados. Y aunque se menciona que la contaminación en ARC podría ser alta, no se cuantifica su efecto sobre el techo del 95%.
