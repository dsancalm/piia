---
title: "Cognition lanza SWE-2, su modelo de código más avanzado, entrenado sobre Kimi K3"
summary: "SWE-2 alcanza el 50 % en FrontierCode y el 73 % en DeepSWE con un coste declarado un 64 % menor que Fable 5.1. Un único proceso de refuerzo optimiza tres niveles de esfuerzo y reduce los pasos medios un 81 % frente a la versión anterior."
lang: es
story: cognition-releases-swe-2-coding-model-with
publishedAt: 2026-09-11T11:43:05.049Z
sourceUrl: "https://cognition.com/blog/swe-2"
sourceName: "Hacker News (portada)"
priority: flash
tags: [cognition, swe-2, kimi-k3, refuerzo]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cognition ha publicado SWE-2, su modelo de codificación más avanzado hasta la fecha, entrenado sobre la base de Kimi K3 (2,8 billones de parámetros). El resultado principal: 50,0 % en FrontierCode 1.1 Main, a nueve décimas de Fable 5.1 (50,9 %) y con un coste declarado un 64 % inferior. En DeepSWE 1.1 alcanza 73,0 %, por encima de GPT-6 Astra (74,1 %) y Fable 5.1 (67,4 %). Donde falla es en Terminal-Bench 4: 27,3 % frente al 55,8 % de Fable 5.1 y al 57,9 % de GPT-6 Astra.

La arquitectura de entrenamiento es la novedad técnica. Un único proceso de refuerzo (RL) optimiza los tres niveles de esfuerzo , medium, high, max, mediante una penalización lineal de coste λₑ afinada a la pendiente local de la frontera de Pareto del modelo base. En la práctica, SWE-2 medium resuelve tareas de FrontierCode en 53 pasos medios (58 % menos que los 127 de SWE-1.7) y hace su primera edición real a los 18 pasos medianos frente a 48. El coste medio cae un 81 % respecto a la versión anterior.

Los niveles de esfuerzo se comportan de forma distinta: medium ataca tareas simples e intermedias con rapidez; high y max planifican y exploran más en problemas complejos. El RL añade 5-6 puntos sobre Kimi K3 en la mayoría de benchmarks y desplaza toda la curva coste-rendimiento. Para estabilizar el entrenamiento usan un baseline de recompensa ponderado por longitud (heredado de SWE-1.6), kernels NVFP4/FP8 con quantization-aware training que reducen memoria y train-inference mismatch pese a triplicar parámetros, y un modelo draft online que acelera la decodificación. Han triplicado los entornos RL, añadido overlays de seguimiento de instrucciones y construido un flywheel con checkpoints previos que endurece los verificadores iterativamente.

SWE-2 está disponible desde hoy en Devin Desktop y CLI; el despliegue en Devin Web y Fusion está en curso.

## Lo que no se sabe

- Precio absoluto por token o por tarea de SWE-2, Fable 5.1 y GPT-6 Astra (solo ratios relativos).
- Definición exacta de los benchmarks FrontierCode, DeepSWE y Terminal-Bench (diseño, tareas, métricas de coste).
- Naturaleza de GPT-5.6 Sol y GPT-6 Astra: modelos anunciados, nombres internos o proyecciones.
- Arquitectura completa de Kimi K3 más allá de 2,8T parámetros y RL previo.
- Formulación precisa de la función de coste en la recompensa R = S - λₑC (mezcla de USD y tiempo de rollout; pesos).
- Valores numéricos de λₑ para medium, high y max.
- Detalles del baseline ponderado por longitud y su demostración (Apéndice B no incluido).
- Arquitectura del modelo draft online y detalles de kernels NVFP4/FP8 y QAT.
- Qué son exactamente los "instruction-following overlays" y los entornos RL triplicados.
- Mecánica del flywheel con checkpoints previos que endurece verificadores.
- Fecha de disponibilidad general en Devin Web y Fusion.
- Resultados en SWE-bench, HumanEval u otros benchmarks estándar.
- Latencia y throughput reales en producción frente a SWE-1.7.
- Si SWE-2 se ofrecerá vía API propia o solo dentro de productos Devin.
