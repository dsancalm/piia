---
title: "DeepSeek publica V4 Flash 0731 con tres variantes de razonamiento"
summary: "La variante Max logra un 89% en ARC-AGI-1 por dos céntimos por tarea, pero la elección entre Max, High y Low cambia el acierto hasta 15 puntos en ARC-AGI-2, lo que obliga a decidir entre presupuesto y precisión."
lang: es
story: deepseek-v4-flash-0731-logra-89-en
publishedAt: 2026-08-08T07:30:15.433Z
sourceUrl: "https://arcprize.org/results/deepseek-v4-flash-0731"
sourceName: "Hacker News (portada)"
priority: flash
tags: [deepseek, modelos, razonamiento, arc]
generatedBy: deepseek/deepseek-v4-flash-0731
---
DeepSeek ha publicado la versión Flash 0731 de su modelo V4, con tres variantes de razonamiento (Max, High y Low) y resultados públicos en las pruebas ARC. La variante Max alcanza un 89.0% en ARC-AGI-1 Semi-Private a un costo de $0.02 por tarea, y un 61.4% en ARC-AGI-2 Semi-Private a $0.04 por tarea. Las variantes High y Low quedan por debajo: 87.0% y 84.0% en ARC-AGI-1, y 56.0% y 46.0% en ARC-AGI-2. La página incluye enlaces al paper y al modelo, pero no reporta puntuaciones para ARC-AGI-3 en ninguna variante.

Para quien programa, lo relevante es el costo por tarea. A $0.02, la variante Max resuelve cada tarea de ARC-AGI-1 por dos céntimos. Eso convierte a este modelo en un candidato para pipelines de automatización o agentes donde el razonamiento abstracto sea un paso dentro de un flujo mayor. La diferencia entre variantes no es decorativa: pasar de Max a Low baja el acierto en ARC-AGI-2 de 61.4% a 46.0%, así que la elección de variante es una decisión de equilibrio entre presupuesto y precisión, no un detalle de configuración.

Los conjuntos de evaluación tienen tamaños distintos: ARC-AGI-1 Public Eval contiene 400 tareas, y ARC-AGI-2 Public Eval contiene 120. Eso significa que un punto porcentual en ARC-AGI-2 representa menos de una tarea y media, así que las diferencias entre variantes en esa prueba se basan en pocos casos. No hay código en la fuente, así que no hay nada que ejecutar directamente.

## Lo que no se sabe

La fuente no especifica qué es ARC-AGI-3 ni por qué no se reportan resultados en esa prueba. Tampoco define qué criterios separan las variantes Max, High y Low, ni qué significa "Semi-Private" frente a "Public Eval". No se detalla el hardware ni el tiempo de inferencia por tarea, y no se menciona el tamaño del modelo ni el número de parámetros.
