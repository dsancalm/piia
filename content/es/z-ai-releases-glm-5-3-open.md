---
title: "Z.ai libera los pesos de GLM-5.3 en Hugging Face"
summary: "La compañía china publica el modelo bajo la organización zai-org permitiendo descarga directa, cuantización y fine-tuning. Llega como alternativa a Llama, Qwen o DeepSeek para equipos que requieren inferencia local sin APIs cerradas."
lang: es
story: z-ai-releases-glm-5-3-open
publishedAt: 2026-08-29T12:47:04.188Z
sourceUrl: "https://huggingface.co/zai-org/GLM-5.3"
sourceName: "Hacker News (portada)"
priority: flash
tags: [modelos, open-source, ia, china]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Z.ai ha publicado los pesos de GLM-5.3 en Hugging Face bajo la organización zai-org. El anuncio oficial salió ayer en el blog de la compañía y en su cuenta de X, y en pocas horas alcanzó la portada de Hacker News con 721 puntos y 241 comentarios. El repositorio ya permite la descarga directa para quien quiera alojar el modelo en su propia infraestructura o afinarlo con datos propios.

La liberación responde a una demanda creciente de alternativas que no dependan de APIs cerradas. Hasta ahora, los equipos que necesitaban ejecutar inferencia en entornos aislados, con requisitos estrictos de privacidad o simplemente sin factura mensual por token, tenían que conformarse con familias como Llama, Qwen o DeepSeek. GLM-5.3 añade una opción más a ese catálogo y, al llegar con pesos abiertos, permite cuantizar, compilar con llama.cpp o vLLM y ajustar el formato a la GPU disponible.

Lo que no se sabe

- Número total de parámetros y, en caso de ser MoE, cuántos están activos por inferencia.
- Licencia exacta (Apache-2.0, MIT, licencia propia u otra) y si permite uso comercial sin restricciones.
- Arquitectura detallada: longitud de contexto, tipo de atención, cabeza de grupo, etc.
- Composición y corte del dataset de entrenamiento.
- Resultados en benchmarks estándar (MMLU, HumanEval, GSM8K, MT-Bench, LiveCodeBench).
- Requisitos mínimos de VRAM para inferencia en FP16, INT8, INT4 o formatos GGUF, safetensors, AWQ o GPTQ.
- Si el repositorio incluye solo el checkpoint base o también una versión chat/instruct alineada (RLHF, DPO).
