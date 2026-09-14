---
title: "Occamy-1.0: un modelo de 35.000 millones de parámetros optimizado para agentes de"
summary: "Investigadores liderados por Wenhui Chen publican en arXiv un modelo entrenado sobre Qwen3.6-35B-A3B con datos \"execution-grounded\" y post-entrenado por etapas."
lang: es
story: occamy-1-0-releases-35b-open-agent
publishedAt: 2026-09-14T13:16:34.442Z
sourceUrl: "https://arxiv.org/abs/2609.11977"
sourceName: "arXiv cs.AI"
priority: flash
tags: [modelo, agentes, arxiv, qwen]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Occamy-1.0 es un modelo de 35.000 millones de parámetros entrenado sobre el checkpoint post-entrenado Qwen3.6-35B-A3B. El equipo, liderado por Wenhui Chen y 42 coautores, lo ha optimizado específicamente para agentes de co-work: flujos de trabajo de larga duración que combinan búsqueda de información, uso de herramientas, generación de código y manipulación de archivos. El artículo se envió a arXiv el 4 de septiembre de 2026.

El entrenamiento se apoya en datos y entornos "execution-grounded". Esto significa que el modelo aprende a partir de trayectorias completas y rejugables capturadas en múltiples arneses de evaluación, no solo de pares instrucción-respuesta estáticos. A continuación, se aplica un proceso de post-entrenado por etapas para consolidar esas capacidades. El resultado es un modelo que, en una amplia suite de benchmarks de co-work, se sitúa consistentemente entre los más fuertes de su clase de tamaño y compite con sistemas fronterizos sustancialmente mayores en varias tareas.

La contribución práctica más relevante para quien construye pipelines multi-paso es la posición del modelo en la frontera de Pareto coste-rendimiento. Bajo el protocolo de evaluación y precios declarado por los autores, el rendimiento agregado en cuatro benchmarks representativos coloca a Occamy-1.0 en la "rodilla de bajo coste" de esa curva. En términos sencillos: obtienes una utilidad de agente comparable a la de modelos cerrados y mucho más grandes por una fracción del coste de inferencia, permitiendo desplegar flujos de trabajo con tool use y coding en infraestructura propia sin depender de APIs caras.

Las evaluaciones de soporte confirman que la especialización no ha erosionado la capacidad general: el modelo mantiene un desempeño sólido en function calling, coding e instruction following.

## Qué no se sabe

- Cuáles son exactamente los cuatro benchmarks representativos y sus métricas individuales.
- En qué consiste el protocolo de precios declarado (coste por token, assumptions de hardware, infraestructura de referencia).
- Qué arquitectura y variante MoE denota "Qwen3.6-35B-A3B" y cuál es el checkpoint base exacto.
- Detalles de los datos "execution-grounded": tamaño total, fuentes, proporción entre datos sintéticos y reales.
- Qué arneses concretos se usaron para capturar las trayectorias de largo horizonte.
- Estructura del post-entrenado por etapas: número de fases, objetivos de cada una y compute empleado.
- Resultados numéricos concretos en tool calling, coding e instruction following frente a baselines específicos.
- Dónde y bajo qué licencia se liberan los pesos y el subconjunto de datos (Hugging Face, GitHub u otra plataforma).
- Requisitos de hardware para inferencia práctica: VRAM necesaria, cuantizaciones soportadas y rendimiento esperado.
- Qué "sistemas fronterizos sustancialmente mayores" se usan como referencia y cuáles son las cifras comparativas exactas.
