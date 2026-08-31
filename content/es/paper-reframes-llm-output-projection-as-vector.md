---
title: "VIBE acelera un 82 % la inferencia CPU en Gemma 3 270M al sustituir la capa lineal"
summary: "El método recupera solo los k tokens más probables con búsqueda de vecino aproximado, calcula sus logits exactos y rellena el resto con menos infinito antes del softmax."
lang: es
story: paper-reframes-llm-output-projection-as-vector
publishedAt: 2026-08-31T14:50:37.350Z
sourceUrl: "https://arxiv.org/abs/2608.27460"
sourceName: "arXiv cs.CL"
priority: routine
tags: [inferencia, mips, hnsw, cpu]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Reformular la proyección de salida de un modelo de lenguaje como una búsqueda de máximo producto interno (MIPS) permite evitar la multiplicación de matrices densa que domina el coste de memoria en el decodificado autoregresivo. El paper presenta Vector Index Based Output Embeddings (VIBE), una técnica que sustituye la capa lineal final por un índice vectorial HNSW construido sobre los embeddings de salida. En cada paso, el head recupera solo los *k* tokens con mayor similitud, calcula sus logits exactos y los dispersa (*scatter*) en un tensor disperso del tamaño del vocabulario completo. El resto de entradas quedan a menos infinito antes del *softmax*.

La evaluación se centra en inferencia CPU con *batch size* 1, escenario donde el ancho de banda de memoria es el cuello de botella principal. En Gemma 3 270M se observa una mejora de hasta el 82 % en *throughput* *end-to-end*. Los autores afirman que la calidad de generación se mantiene según AlpacaEval, aunque no publican *win rate*, longitud media ni resultados en *perplexity*, MMLU o GSM8K. También se probaron Llama 3.2 y Qwen 3, pero el abstract no especifica qué tamaños.

## Qué no se sabe

- Tamaños exactos de los modelos Llama 3.2 y Qwen 3 evaluados.
- Latencia bruta de la proyección de salida antes y después (ms/token).
- Uso de memoria (VRAM/RAM) del índice HNSW frente a la matriz densa original.
- Parámetros HNSW usados (*M*, *efConstruction*, *efSearch*).
- Tamaño del conjunto de candidatos recuperado (*k* en MIPS) y su efecto en *recall@k*.
- Detalles de implementación: framework (PyTorch, JAX, llama.cpp, etc.), *kernel* de *scatter*, cuantización.
- Resultados en GPU o *batch* > 1.
- Métricas AlpacaEval concretas (*win rate*, LC *win rate*, longitud media).
- Impacto en *perplexity* o benchmarks de razonamiento (MMLU, GSM8K, etc.).
- Disponibilidad de código y pesos del índice.
