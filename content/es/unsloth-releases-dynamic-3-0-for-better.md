---
title: "Unsloth Dynamic 3.0 aumenta la precisión de los modelos GGUF"
summary: "Esta actualización mejora el rendimiento en tareas de chat y programación sin necesidad de reentrenar los modelos. Gracias al uso de un nuevo conjunto de datos de calibración, la precisión top-1% sube más de un 10%."
lang: es
story: unsloth-releases-dynamic-3-0-for-better
publishedAt: 2026-08-20T07:18:33.695Z
sourceUrl: "https://unsloth.ai/docs/basics/dynamic-3.0-ggufs"
sourceName: "Hacker News (portada)"
priority: flash
tags: [unsloth, gguf, inteligencia, modelos]
generatedBy: google/gemma-4-26b-a4b-it:free
---
**Unsloth Dynamic 3.0 mejora la precisión de los modelos GGUF**

Unsloth lanzó la versión 3.0 de su método de cuantización dinámica. Esta actualización de la versión 2.0 busca optimizar el rendimiento de los modelos en local. Los nuevos archivos GGUF son compatibles con la mayoría de los motores de inferencia actuales, como llama.cpp y Unsloth Desktop. El proceso utiliza un conjunto de datos de calibración imatrix refinado para mejorar el desempeño en tareas de chat, rendimiento multilingüe y codificación agentica.

A diferencia de otros métodos, este proceso no requiere entrenamiento adicional con el conjunto de datos de calibración ni utiliza técnicas como QAT o QAD. La precisión top-1% mejora más de un 10%. Por ejemplo, el modelo Dynamic 3-bit DeepSeek V3.1 alcanzó una puntuación de 75.6%.

La nueva versión optimiza el espacio en disco para quienes gestionan recursos limitados. En los quants más pequeños, como el UD-Q2_K_XL, se eliminó el módulo MTP para ahorrar 500MB. Esto permite que el modelo UD-IQ2_XXS ocupe 6.2GB, mientras que el UD-Q2_K_XL se mantiene en un límite de 8.37GB o menos.

## Implementación en local

Para probar estos modelos con llama.cpp, puede seguir este flujo de trabajo para la instalación y ejecución:

```bash
apt-get update apt-get install pciutils build-essential cmake curl libcurl4-openssl-dev -y
git clone https://github.com/ggml-org/llama.cpp
cmake llama.cpp -B llama.cpp/build -DBUILD_SHARED_LIBS=OFF -DGGML_CUDA=ON -DLLAMA_CURL=ON
cmake --build llama.cpp/build --config Release -j --clean-first --target llama-cli llama-gguf-split
cp llama.cpp/build/bin/llama-* llama.cpp
```

Para descargar modelos específicos de forma rápida mediante la librería de Hugging Face, use este comando:

```python
#!pip install huggingface_hub hf_transfer
import os
os.environ["HF_HUB_ENABLE_HF_TRANSFER"] = "1"
from huggingface_hub import snapshot_download
snapshot_download(
 repo_id = "unsloth/Llama-4-Scout-17B-16E-Instruct-GGUF",
 local_dir = "unsloth/Llama-4-Scout-17B-16E-Instruct-GGUF",
 allow_patterns = ["*IQ2_XXS*"],
)
```

Esta tecnología permite obtener modelos cuantizados con mayor precisión y menor tamaño de disco mediante post-training quantization sin necesidad de entrenar el modelo de nuevo.

**Lo que no se sabe**

No se conocen los detalles específicos de la arquitectura de los modelos mencionados, el contenido exacto de los datasets de calibración Calibration_v3 y Calibration_v5, ni la fecha de lanzamiento de las versiones de Gemma 4.
