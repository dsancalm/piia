---
title: "Una arquitectura separa el procesamiento del prompt y la generación de tokens"
summary: "El Dual-Flow Transformer, propuesto en arXiv, divide el trabajo del modelo en dos flujos: uno procesa el prompt y otro genera tokens. Esto permite ajustar por separado el coste de prefill y el de continuación, especialmente en modelos de mezcla de expertos."
lang: es
story: dual-flow-transformer-separates-prefill-and-decode
publishedAt: 2026-08-15T07:09:19.830Z
sourceUrl: "https://arxiv.org/abs/2608.12385"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [arquitectura, transformers, investigación, arxiv]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Un equipo de investigación propone en arXiv una arquitectura que separa el procesamiento del prompt del de generación de tokens. El Dual-Flow Transformer parte de una observación: durante el prefill y el decode ocurren operaciones distintas que hoy comparten los mismos parámetros.

El flujo primario es un modelo de lenguaje causal completo. Procesa el prompt y escribe la caché KV. El flujo auxiliar permanece inactivo hasta que el prompt termina, y solo entonces empieza a computar desde la posición final. Ambos flujos comparten las matrices principales de atención, MLP y salida, pero usan embeddings de token separados con acoplamiento ligero.

La utilidad práctica aparece en los modelos de mezcla de expertos (MoE). Al separar los flujos, los fan-outs de expertos primarios y auxiliares se convierten en controles independientes. Se puede ajustar el coste de prefill, el de continuación y la calidad predictiva por separado, en lugar de mover una única palanca que lo afecta todo a la vez.

El artículo reporta menor pérdida de validación en comparaciones de tokens igualados frente a arquitecturas estándar. Los autores probaron el enfoque en varias configuraciones y arquitecturas, aunque el documento no detalla ni los tamaños de los modelos evaluados ni las configuraciones de datos usadas.

## Lo que no se sabe

El artículo no aporta números concretos de pérdida de validación, así que no hay forma de cuantificar la mejora real. Tampoco se especifica el coste computacional del flujo auxiliar en términos de FLOPs o latencia, ni se menciona si el código estará disponible públicamente.
