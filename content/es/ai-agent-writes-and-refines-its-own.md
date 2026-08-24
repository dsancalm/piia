---
title: "AutoFOAM genera y refina simulaciones de OpenFOAM desde texto"
summary: "Un agente autónomo basado en Qwen-coder 2.5-14B crea, ejecuta y mejora casos de OpenFOAM a partir de instrucciones en lenguaje natural. El sistema itera sobre sus propias simulaciones para ajustar la configuración, pero el artículo no publica cifras de rendimiento..."
lang: es
story: ai-agent-writes-and-refines-its-own
publishedAt: 2026-08-05T09:26:33.129Z
sourceUrl: "https://arxiv.org/abs/2608.00003"
sourceName: "arXiv cs.AI"
priority: routine
tags: [simulación, openfoam, agente, cfd]
generatedBy: deepseek/deepseek-v4-flash-0731
---
AutoFOAM es un agente autónomo basado en modelos de lenguaje que genera, ejecuta y refina simulaciones de OpenFOAM a partir de instrucciones en lenguaje natural. Lo ha publicado un equipo de investigación en arXiv y está pensado para bajar la barrera de entrada a la dinámica de fluidos computacional (CFD), un campo donde la configuración de un caso suele ser más trabajo que la propia simulación.

El agente parte de Qwen-coder 2.5-14B y se ajusta con 252 indicaciones de texto que cubren 7 solucionadores de OpenFOAM, 13 plantillas de malla parametrizadas y una política numérica que tiene en cuenta el valor de y plus. Con eso, el sistema crea el caso inicial, lo evalúa, lo ejecuta y lo vuelve a generar en un bucle de evolución de 7 etapas. El agente aprende de sus propios resultados y modifica su estrategia para la siguiente iteración.

El problema de ese enfoque es conocido: un modelo que se entrena con sus propias salidas tiende a degenerar, a repetir errores y a perder diversidad. AutoFOAM lo ataca con tres mecanismos complementarios. El primero es un contexto de reintento aumentado por RAG, que recupera información relevante de intentos anteriores. El segundo es un parcheo quirúrgico a nivel de diccionario, que corrige entradas concretas sin reentrenar todo el modelo. El tercero es una paráfrasis de diversidad de indicaciones, que reformula las instrucciones para evitar que el modelo se atasque en una única forma de resolver el problema.

Para un programador sin experiencia en CFD, la utilidad es directa: en lugar de aprender a montar un caso de OpenFOAM (mallado, condiciones de contorno, solucionadores, esquemas numéricos), escribes una frase y el agente se encarga del resto. Para quien ya trabaja con OpenFOAM, lo interesante es el bucle de evolución: el agente no se limita a traducir texto a configuración, sino que itera sobre sus propias simulaciones y ajusta el enfoque según los resultados.

Lo que no se sabe es bastante. El artículo no publica cifras de rendimiento comparadas con métodos tradicionales, ni en precisión ni en tiempo de simulación. Tampoco detalla el contenido exacto de las 252 indicaciones, ni los solucionadores y plantillas concretos. No se menciona si el agente se ha probado en casos de flujo reales o solo en simulaciones sintéticas. Tampoco hay tasa de éxito o fracaso en la generación de simulaciones válidas. Sin esos datos, el trabajo demuestra que el enfoque funciona en un entorno controlado, pero no cuánto mejora el flujo de trabajo real de un ingeniero.
