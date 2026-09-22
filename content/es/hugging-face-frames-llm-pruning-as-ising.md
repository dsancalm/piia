---
title: "Hugging Face plantea la poda de LLMs como un problema de optimización Ising"
summary: "Cada bloque del transformador actúa como un espín binario que se queda o se elimina. El método usa annealing para encontrar el subconjunto óptimo y logra reducir LLaMA-7B y LLaMA-13B un 30 % con menos del 1 % de caída en MMLU."
lang: es
story: hugging-face-frames-llm-pruning-as-ising
publishedAt: 2026-09-22T12:15:47.168Z
sourceUrl: "https://huggingface.co/blog/MultiverseComputingCAI/pruning-llms-like-a-physicist-block-removal-as-an"
sourceName: "Hugging Face"
priority: routine
tags: [poda, ising, llama, huggingface]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Investigadores de Hugging Face han publicado un artículo que plantea la poda de modelos de lenguaje como un problema de optimización Ising. La formulación trata cada bloque del transformador como un espín binario: el bloque se queda o se elimina. La función de energía penaliza la pérdida de rendimiento en tareas de evaluación y recompensa la reducción de parámetros, de modo que el estado fundamental del sistema corresponde al subconjunto óptimo de capas.

El método resuelve el problema mediante *annealing*, probando tanto simuladores clásicos como hardware cuántico real. Aplicado a LLaMA-7B y LLaMA-13B, el enfoque produce checkpoints un 30 % más pequeños manteniendo la degradación en MMLU por debajo del 1 %. Los pesos resultantes están disponibles en el Hub de Hugging Face para descarga y benchmark inmediato.

```bash
# Ejemplo de carga desde el Hub (nombres de repositorio provisionales)
# huggingface-cli download hf-internal-testing/llama-7b-pruned-ising --local-dir ./llama-7b-pruned
```

El artículo no especifica qué variante de *annealing* cuántico se ha empleado (D-Wave, simulador de *quantum Monte Carlo*, *simulated annealing* clásico) ni el tiempo de cómputo necesario para converger en modelos de 13 000 millones de parámetros. Tampoco se detallan las métricas de perplejidad en conjuntos de validación estándar ni la comparación frontal con Wanda, SparseGPT o LLM-Pruner bajo idénticos presupuestos de FLOPs. No hay repositorio público con el código de la formulación Ising ni *scripts* de reproducción.
