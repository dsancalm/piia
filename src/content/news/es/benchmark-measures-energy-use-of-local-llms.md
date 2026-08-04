---
title: "Un estudio mide el consumo energético de LLMs locales y encuentra diferencias de hasta 4,4 veces"
summary: "Un análisis en arXiv con muestreo de hardware en una RTX 4060Ti revela que los modelos de 1B gastan mucho menos por token que los de 7B, pero la eficiencia no depende solo del tamaño. La elección del modelo afecta al coste operativo, no solo a la calidad."
lang: es
story: benchmark-measures-energy-use-of-local-llms
publishedAt: 2026-08-04T11:47:51.299Z
sourceUrl: "https://arxiv.org/abs/2608.00008"
sourceName: "arXiv cs.AI"
priority: routine
tags: [energía, llm, hardware, eficiencia]
generatedBy: deepseek/deepseek-v4-flash-0731
---
El estudio que circula por arXiv mide con muestreo a nivel de hardware el consumo de nueve LLMs de código abierto, de 1B a 7B de parámetros, en una única RTX 4060Ti de 16GB. El muestreo de potencia se hizo a 2Hz mediante `nvidia-smi` sobre un conjunto fijo de prompts. La referencia es útil porque fija un orden de magnitud: elegir bien el modelo local no solo afecta a la latencia, también al coste energético por token.

Los datos más llamativos son los de los modelos pequeños. `gemma3:1b` consume 0,56 julios por token y `llama3.2:1b` 0,65 J/token, ambos por encima de 170 tokens por segundo. En el extremo contrario, un Mistral de 7B gasta hasta 4,4 veces más energía por token que el modelo más eficiente. La diferencia no es lineal con el tamaño: el salto de 1B a 7B multiplica el coste por token más de cuatro veces, lo que invita a revisar si un modelo grande es necesario para la tarea concreta.

El comando usado para la medición es el estándar:

```bash
nvidia-smi --query-gpu=power.draw --format=csv -l 2
```

El muestreo a 2Hz tiene una limitación evidente: no captura picos de consumo cortos, pero para una comparativa relativa entre modelos sirve. El dato anómalo del estudio es `qwen3.5:2b`, que dispara la energía por prompt por un razonamiento interno extendido. Eso avisa de que la eficiencia no se puede inferir solo del número de parámetros: la arquitectura y el comportamiento en inferencia pesan más.

Para quien despliegue LLMs en una GPU de consumo, la implicación práctica es directa. Si la tarea admite un modelo de 1B, el coste energético por token se divide por cuatro comparado con un 7B. La elección de cuantización y el tamaño del modelo son decisiones de coste operativo, no solo de calidad de respuesta.

## Lo que no se sabe

El estudio no publica la lista exacta de los nueve modelos evaluados, ni el conjunto de prompts usado. Tampoco da el consumo total por prompt en julios, ni la potencia punta de cada modelo. La metodología exacta para calcular julios por token y el throughput no está descrita en el abstract, así que la comparativa entre modelos solo es fiable dentro del propio estudio.
