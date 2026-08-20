---
title: "Unsloth releases Dynamic 3.0 for better GGUF quantization"
summary: "You can now use high-quality imatrix calibration to improve model accuracy and reduce disk space without extra training. This version works with llama.cpp and Unsloth Desktop for tasks like chat and multilingual coding."
lang: en
story: unsloth-releases-dynamic-3-0-for-better
publishedAt: 2026-08-20T07:18:33.696Z
sourceUrl: "https://unsloth.ai/docs/basics/dynamic-3.0-ggufs"
sourceName: "Hacker News (portada)"
priority: flash
tags: [unsloth, quantization, gguf, ai]
generatedBy: google/gemma-4-26b-a4b-it:free
---
Unsloth lanzó Dynamic 3.0, una versión de su método de cuantización dinámica que mejora la versión 2.0. Estos archivos GGUF son compatibles con la mayoría de los motores de inferencia, como llama.cpp y Unsloth Desktop. El método utiliza un conjunto de datos de calibración imatrix de alta calidad, refinado para mejorar el rendimiento en codificación de agentes, chat y multilingüismo. Este proceso no requiere entrenamiento con el conjunto de datos de calibración imatrix y evita tanto la cuantización consciente del entrenamiento (QAT) como la cuantización consciente de la destilación (QAD).

Esto permite obtener mayor precisión y un menor uso de espacio en disco mediante la cuantización post-entrenamiento sin la carga de un entrenamiento adicional. Por ejemplo, la cuantización UD-Q2_K_XL alcanza los 9.83 GB, mientras que la versión UD-IQ1_S ocupa 6.2 GB. En la variante UD-Q2_K_XL, se eliminó el módulo MTP para ahorrar 500 MB de espacio en disco.

## Rendimiento técnico y benchmarks

El nuevo método de cuantización presenta mejoras medibles en la precisión. El modelo DeepSeek V3.1 de 3 bits alcanzó una puntuación de precisión top-1% del 75.6%. Otros benchmarks muestran un aumento del 8% en la precisión top-1% y una mejora superior al 10% en la precisión top-1.

Para probar estos modelos con llama.cpp, use esta estructura de comando:

```bash
./llama.cpp/llama-cli \
--model unsloth/Llama-4-Scout-17B-16E-Instruct-GGUF/Llama-4-Scout-17B-16E-Instruct-UD-IQ2_XXS.gguf \
--threads 32 \
--ctx-size 16384 \
--n-gpu-layers 99 \
-ot ".ffn_.*_exps.=CPU" \
--seed 3407 \
--prio 3 \
--temp 0.6 \
--min-p 0.01 \
--top-p 0.9 \
-no-cnv \
--prompt "<|header_start|>user<|header_end|>\n\nCreate a Flappy Bird game.<|eot|><|header_start|>assistant<|header_end|>\n\n"
```

Para descargar patrones específicos desde Hugging Face usando el método de transferencia optimizado, use este fragmento:

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

Los detalles arquitectónicos específicos de los modelos mencionados no se conocen. No se han revelado los contenidos exactos de los conjuntos de datos Calibration_v3 y Calibration_v5. La fecha de lanzamiento de las versiones de Gemma 4 no se conoce.
