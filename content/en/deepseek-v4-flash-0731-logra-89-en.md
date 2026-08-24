---
title: "DeepSeek V4 Flash 0731 logra 89% en ARC-AGI-1 a 2 centavos por tarea"
summary: "La página de resultados del modelo en ARC Prize muestra tres variantes con costos lo bastante bajos para integrarlas en pipelines reales. La caída de 27.6 puntos entre ARC-AGI-1 y ARC-AGI-2 es el dato que mide el avance real, aunque la fuente no detalla hardware, parámetros..."
lang: en
story: deepseek-v4-flash-0731-logra-89-en
publishedAt: 2026-08-08T07:30:15.434Z
sourceUrl: "https://arcprize.org/results/deepseek-v4-flash-0731"
sourceName: "Hacker News (portada)"
priority: flash
tags: [deepseek, benchmarks, modelos, costo]
generatedBy: deepseek/deepseek-v4-flash-0731
---
DeepSeek V4 Flash 0731 salió el 31 de julio, y su página de resultados en ARC Prize es de las más legibles que ha publicado el proyecto en meses. Tres variantes de razonamiento, seis cifras en dos benchmarks, y un costo por tarea lo bastante bajo como para que las comparaciones dejen de ser académicas.

La variante Max obtiene 89.0% en ARC-AGI-1 Semi-Private a $0.02 por tarea, y 61.4% en ARC-AGI-2 Semi-Private a $0.04. Las variantes High y Low bajan en ambas pruebas: 87.0% y 84.0% en ARC-AGI-1, 56.0% y 46.0% en ARC-AGI-2. Los números importan porque ARC-AGI-2 fue diseñado para ser más difícil y resistente al memorizado, así que la caída de 27.6 puntos entre generaciones de tests es el dato real del avance.

Para quien programa, lo relevante es el costo por tarea. A $0.02, ejecutar un pipeline de evaluación o un agente que resuelva tareas de razonamiento abstracto entra en el rango de lo descartable. No es una cifra de laboratorio: es la que permite integrar el modelo sin revisar el presupuesto. La variante Low, con 84.0% en ARC-AGI-1, probablemente baste para muchas tareas repetitivas, y saber que existe es una ventaja que no tenías hace dos semanas.

La página reporta tamaños de eval: 400 tareas en ARC-AGI-1 Public Eval y 120 en ARC-AGI-2. Eso da una idea de la significancia estadística de cada porcentaje, aunque la fuente no la comenta.

Lo que no se sabe

La página no define qué es ARC-AGI-3 ni por qué no hay resultados para ninguna variante en esa prueba. Tampoco explica qué diferencia a Max, High y Low más allá del rendimiento observado. No hay datos de hardware ni tiempo de inferencia por tarea, y no se menciona el tamaño del modelo ni el número de parámetros. La diferencia entre "Semi-Private" y "Public Eval" queda sin aclarar en el texto. Con lo publicado se puede decidir si probar el modelo, pero no se puede evaluar qué hay detrás de esas cifras.
