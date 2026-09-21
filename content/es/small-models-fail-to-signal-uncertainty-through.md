---
title: "Los modelos locales pequeños ocultan sus fallos y la entropía semántica los detecta"
summary: "La entropía de token se colapsa a cero en el 91 % de los casos y no distingue aciertos de alucinaciones. Generar varias respuestas, agruparlas por significado y medir su dispersión sí permite saber cuándo el modelo adivina."
lang: es
story: small-models-fail-to-signal-uncertainty-through
publishedAt: 2026-09-21T13:17:42.669Z
sourceUrl: "https://arxiv.org/abs/2609.20824"
sourceName: "arXiv cs.CL"
priority: routine
tags: [llm, calibracion, entropia-semantica, enrutamiento]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Los modelos pequeños que ejecutas en local no te avisan cuando fallan. La entropía a nivel de token, la señal habitual para medir incertidumbre en modelos grandes, se colapsa cerca de cero en el 91 % de las combinaciones dataset-modelo evaluadas, independientemente de si la respuesta es correcta o alucinada. El estudio, enviado a arXiv el 21 de julio de 2026, prueba siete enfoques de calibración sobre siete pares de modelos por debajo de 3B parámetros y cinco benchmarks de NLU, todo en hardware de consumo.

La entropía semántica rompe ese silencio. El método genera varias muestras por consulta, agrupa las respuestas por significado y mide la dispersión de esa distribución. Cuando la entropía semántica es alta, el modelo está adivinando; cuando es baja, suele acertar. Usar esa señal para enrutar solo los casos inciertos a un modelo experto mayor , por ejemplo, de SmolLM 360M a Phi-3.5-mini, mejora la precisión hasta 50 puntos porcentuales. El enrutamiento cross-family promedia +22,0 % frente a +6,8 % del same-family, lo que indica que la calidad del experto pesa más que la afinidad arquitectónica.

La propuesta no es ahorrar cómputo, sino gastarlo donde importa. El muestreo múltiple añade latencia, pero concentra el gasto en las consultas difíciles. El artículo (9 páginas, 8 figuras, arXiv:2609.20824v1) incluye enlaces a CatalyzeX, DagsHub y Hugging Face para replicar los experimentos.

## Lo que no se sabe

- Cuáles son los cinco benchmarks NLU exactos ni los siete pares de modelos evaluados.
- Detalles completos de los siete enfoques más allá de los tres descritos.
- Definición precisa y algoritmo del clustering semántico para la entropía semántica.
- Número de muestras generadas por consulta.
- Latencia y coste real del muestreo múltiple frente a inferencia única.
- Si los resultados se mantienen en tareas generativas abiertas más allá de NLU.
- Especificaciones del hardware de consumo usado (GPU, RAM, tiempos).
- Disponibilidad real y licencia del código y datos en los repositorios enlazados.
