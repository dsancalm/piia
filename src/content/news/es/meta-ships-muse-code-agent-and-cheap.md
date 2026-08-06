---
title: "Meta lanza Muse Code y Muse Spark 1.2 con una versión barata a cambio de tus datos"
summary: "Meta presentó Muse Code, su agente de código, junto a Muse Spark 1.2, un modelo entrenado conjuntamente. La versión contributor cuesta 0,10 dólares por millón de tokens de entrada, pero cedes tus datos a Meta. El precio normal es 1,25 dólares."
lang: es
story: meta-ships-muse-code-agent-and-cheap
publishedAt: 2026-08-06T09:23:00.369Z
sourceUrl: "https://simonwillison.net/2026/Aug/5/muse-code-and-muse-spark-12/#atom-everything"
sourceName: "Simon Willison"
priority: flash
tags: [meta, muse, código, precios]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Meta ha presentado dos productos a la vez: Muse Code, su agente de código, y Muse Spark 1.2, una actualización del modelo centrada en tareas de programación. La novedad está en cómo se han entrenado juntos. Muse Spark 1.2 se co-entrenó con Muse Code para que el modelo rinda mejor cuando el agente lo usa. El entrenamiento incluyó trayectorias de harness con rejection sampling y ajustes de recetas para objetivos, compactación y subagentes, además de integrar el conjunto de herramientas de Muse Code.

El modelo llega en dos versiones con precios muy distintos. La normal, `muse-spark-1.2`, cuesta 1,25 dólares por millón de tokens de entrada y 4,25 por millón de salida. La versión `muse-spark-1.2-contributor` cuesta 0,10 y 0,20 dólares respectivamente, pero a cambio de ceder a Meta el uso de tus datos para mejorar sus productos. Simon Willison ha añadido ambos precios a su comparador llm-prices.com. Para situar esas cifras, Gemini 3.6 Flash está a 1,50/7,50 dólares, GPT-5.6 Luna a 0,20/1,20 y Gemini 3.1 Flash-Lite a 0,25/1,50.

Meta dice que Muse Spark 1.2 mejora la generación de código, la depuración compleja, la comprensión de codebases y los flujos de trabajo integrales de desarrollo. También afirma que ampliaron significativamente el cómputo de entrenamiento dedicado a tareas de código y diversificaron los entornos de entrenamiento. El modelo se entrenó extensamente en tareas de largo recorrido, como generación de repositorios completos, proyectos grandes de principio a fin y auto-investigación.

El ángulo práctico está en el precio de la opción contributor. Un programador que quiera probar el modelo en serio puede hacerlo por una fracción del coste habitual. El requisito es aceptar que Meta use sus datos para mejorar productos. Eso convierte la decisión en algo más que una comparación de rendimiento: es una decisión sobre privacidad y sobre si el ahorro compensa ceder datos de tus proyectos.

El identificador del modelo en código es sencillo:

```bash
muse-spark-1.2
muse-spark-1.2-contributor
```

## Lo que no se sabe

Meta no ha detallado las mejoras concretas en generación de código, depuración o comprensión de codebases. Tampoco cuantifica el aumento de cómputo de entrenamiento ni la expansión de entornos. No hay comparativas públicas de Muse Spark 1.2 contra otros modelos en benchmarks de código, y los términos exactos del uso de datos en la versión contributor no están especificados. Tampoco se menciona la fecha de lanzamiento de Muse Code.
