---
title: "Dual-Flow Transformer separates prefill and decode to cut inference cost"
summary: "A new arXiv paper proposes splitting prompt processing from token generation within one model. The auxiliary decode flow needs only a limited context window and no full KV cache, which could reduce generation cost."
lang: en
story: dual-flow-transformer-separates-prefill-and-decode
publishedAt: 2026-08-15T07:09:19.831Z
sourceUrl: "https://arxiv.org/abs/2608.12385"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [transformers, inference, arxiv]
generatedBy: deepseek/deepseek-v4-flash-0731
---
## Dual-Flow Transformers: Separando Prefill de Decode para Optimizar Inferencia

Un nuevo artículo en arXiv propone una arquitectura que separa el procesamiento del prompt (prefill) de la generación de tokens (decode) dentro de un mismo modelo. El Dual-Flow Transformer usa dos flujos de datos con roles distintos: un flujo primario que procesa el prompt completo y escribe la caché KV, y un flujo auxiliar que solo se activa durante la generación autoregresiva.

La separación permite que el flujo auxiliar tenga una ventana de contexto limitada y no necesite mantener la caché KV completa del prompt. El flujo primario, por otro lado, se encarga de la mayor parte del cómputo durante el prefill. Ambos flujos comparten las matrices principales de atención, MLP y salida, pero usan embeddings de token separados y un acoplamiento ligero entre ellos.

### Resultados reportados

El artículo reporta que, en comparaciones con igual número de tokens de entrenamiento, el Dual-Flow Transformer logra menor pérdida de validación que un Transformer estándar en diversas arquitecturas y configuraciones de datos. En modelos de mezcla de expertos (MoE), la separación de flujos permite que los fan-outs de expertos primarios y auxiliares sean independientes, lo que reduce el costo combinado de prefill y decode sin sacrificar calidad predictiva.

### Limitaciones no cubiertas

El artículo no especifica las arquitecturas exactas ni los tamaños de los modelos evaluados. Tampoco detalla las configuraciones de datos utilizadas en los experimentos, más allá de mencionar "diversas arquitecturas y configuraciones". No se reportan cifras concretas de pérdida de validación, ni se cuantifica el ahorro computacional en FLOPs o latencia que produce la separación de flujos. Finalmente, no se indica si el código o los pesos de los modelos estarán disponibles públicamente.

### Implicaciones prácticas

Para quienes trabajan en inferencia de modelos de lenguaje en producción, la propuesta sugiere una vía para reducir el costo de decode sin rediseñar por completo la arquitectura. Si los resultados se replican en modelos de mayor escala, la separación de flujos podría permitir servir modelos con menor latencia por token generado, especialmente en escenarios con prompts largos. La ausencia de métricas concretas, sin embargo, impide evaluar si la ganancia es relevante frente a técnicas existentes como la atención dispersa o la cuantización de caché KV.

El artículo está disponible en arXiv con 18 páginas y un tamaño de PDF de 117 KB.
