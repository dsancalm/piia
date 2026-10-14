---
title: "Liquid AI publica LFM2.5-24B-A2B, un MoE de 24B parámetros que cabe en 4 GB"
summary: "El modelo activa solo 2B parámetros por paso y se ejecuta en hardware de consumo gracias a su arquitectura Mixture of Experts. Pesa menos de 4 GB en 4 bits y usa licencia Apache 2.0, pero aún faltan benchmarks de tool-use, límite de contexto y plantillas para function..."
lang: es
story: liquid-ai-releases-24b-moe-model-with
publishedAt: 2026-10-14T12:19:23.273Z
sourceUrl: "https://huggingface.co/blog/LiquidAI/lfm25-24b-a2b"
sourceName: "Hugging Face"
priority: urgent
tags: [moe, llm, edge, apache]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Liquid AI ha publicado LFM2.5-24B-A2B, un modelo Mixture of Experts con 24 000 millones de parámetros totales y 2 000 millones activos por inferencia. Está en Hugging Face con pesos abiertos bajo licencia Apache 2.0 y se diseñó para ejecutar agentes completos en el dispositivo del usuario.

La arquitectura MoE hace que solo una fracción de los parámetros participe en cada paso de generación. Con 2 000 millones de parámetros activos, el modelo cabe en menos de 4 GB de VRAM cuantizado a 4 bits, así que entra en tarjetas gráficas de consumo, portátiles con GPU integrada y SoC móviles recientes. La licencia Apache 2.0 permite uso comercial, modificación y redistribución sin cláusulas de copyleft.

El repositorio en Hugging Face expone los archivos `config.json`, `model.safetensors` y el tokenizador. No hay aún benchmarks oficiales de *tool-use* ni comparativas frente a Gemma‑2B o Qwen2‑1.5B. Tampoco se detalla la longitud de contexto soportada ni los formatos de cuantización validados (GGUF, GPTQ, AWQ). Faltan *pipelines* listos para *function calling* y ejemplos de integración con marcos como LangGraph, LlamaIndex o Transformers Agents.

```bash
# Descarga del modelo (ejemplo con git-lfs)
git lfs install
git clone https://huggingface.co/LiquidAI/LFM2.5-24B-A2B
```

## Qué no se sabe

- Benchmarks de uso de herramientas (*tool-use*) y latencia real en CPU/GPU de consumo.
- Longitud máxima de contexto y rendimiento en contextos largos.
- Formatos de cuantización probados y su impacto en calidad.
- *Prompt template* recomendado para invocación de funciones.
- Requisitos exactos de RAM/VRAM para distintas precisiones (fp16, int8, int4).
- Plan de mantenimiento, versiones futuras y posible fine-tuning oficial.
