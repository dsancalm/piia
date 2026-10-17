---
title: "FLUX 3 Image Klein: modelo abierto de 5.6B parámetros para imágenes 4K"
summary: "Genera imágenes nativas en 4K, edita con precisión de píxeles y controla bounding boxes. Incluye modelo base para fine-tuning y uno distillado para baja latencia, disponible en FP8, INT8 y NVFP4. Ejecuta en GPUs de consumo con 8 GB de VRAM."
lang: es
story: flux-3-image-klein-5-6b-open
publishedAt: 2026-10-17T11:06:31.304Z
sourceUrl: "https://bfl.ai/blog/flux-3-image-klein"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [generacióndeimágenes, ia, difusión, flux]
generatedBy: dots-studio/dots-3-note-preview:free
---
FLUX 3 Image Klein es un modelo de difusión de 5.6B parámetros para generación de imágenes a partir de texto, edición y creación con hasta 10 imágenes de referencia. Comparte arquitectura con FLUX 3 Image, con generación nativa en 4K, edición pixel-perfect y control de bounding boxes. Se basa en aprendizajes compartidos de FLUX 3 en imágenes, video y audio, lo que mejora el realismo de las salidas.

Incluye un modelo base para fine-tuning y uno distillado para baja latencia. Disponible en FP8, INT8 y NVFP4 con soporte de NVIDIA. Publicado bajo la FLUX Kommunity License, permite uso comercial gratuito para individuos y empresas con ingresos anuales menores de $5M.

En evaluaciones internas de texto-a-imagen, generación multi-referencia y edición, supera modelos abiertos más grandes y cerrados como Ideogram V4.5 y FLUX.2 [pro]. Es el modelo abierto más pequeño en la comparativa, con 5.6B frente a 7B de Qwen-Image 2.1 y 12.9B de Krea 2. Gana 91 Elo en texto-a-imagen y 70 en edición frente a FLUX.2 [klein] 9B, con un 38% menos de parámetros.

Optimizado para GPUs de consumo: ejecuta en GeForce RTX con solo 8GB de VRAM en INT8. Los pesos del generador ocupan 11.2 GB en BF16 y 5.6 GB en FP8. Con el modelo distillado e INT8, genera una imagen de 1MP en ~4 segundos en RTX 5090 y <9 segundos en RTX 4070. En NVIDIA GB300 con NVFP4, el tiempo baja a <0.6 segundos.

El modelo base está optimizado para fine-tuning con LoRA desde el día uno en Diffusers y Ostris AI Toolkit. Soporte day-one en ComfyUI, Hugging Face Diffusers, TensorRT-LLM, SGLang Diffusion y vLLM-Omni. Añadir LoRA añade aproximadamente un 5% al tiempo de generación.

Disponible en BFL API como flux-3-image-klein, con upsampling de prompts y restauración pixel-perfect. Precio desde $0.009 por 1K imágenes. También en Playground y Hugging Face. Implementa safeguards: filtros de dataset y fine-tuning para suprimir comportamientos dañinos. Fue red-teamed internamente y evaluado por Cinder, mostrando menos vulnerabilidades que otros modelos abiertos.

Es la segunda liberación abierta de la familia FLUX 3, tras FLUX 3 Action. Las organizaciones más grandes pueden desplegar mediante licencias autohospedadas o API.

No se sabe el rendimiento en hardware distinto a los mencionados. No se detalla el tiempo de generación del modelo base en otros GPUs. No se explica el methodology exacto de los benchmarks de latencia ni cómo se normalizaron las mediciones. No se proporciona información sobre la calidad de salida en condiciones de baja iluminación, texturas complejas o escenas extremas. No se detalla el impacto del uso de LoRA en la calidad de la imagen, solo en el tiempo. No se especifica el tamaño máximo de imagen que puede generar el modelo. No se explica cómo se midió el 'Elo' ni su escala de referencia. No se detalla el número exacto de imágenes en el dataset de entrenamiento. No se especifica si el modelo soporta generación condicional por máscaras o segmentación semántica. No se menciona la disponibilidad de checkpoints en formatos adicionales como ONNX o TensorRT.
