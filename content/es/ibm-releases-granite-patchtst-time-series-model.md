---
title: "IBM libera su modelo Granite Time Series PatchTST para uso comercial"
summary: "El modelo PatchTST-FM-r2 llega a Hugging Face con licencia permisiva que permite fine-tuning e inferencia en producción sin restricciones legales, algo inusual en series temporales de referencia."
lang: es
story: ibm-releases-granite-patchtst-time-series-model
publishedAt: 2026-09-10T11:39:26.022Z
sourceUrl: "https://huggingface.co/blog/ibm-research/ibm-releases-sota-granite-time-series"
sourceName: "Hugging Face"
priority: routine
tags: [ibm, series-temporales, patchtst, huggingface]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
IBM ha publicado el modelo Granite Time Series PatchTST-FM-r2 bajo una licencia que permite uso comercial. Se presenta como un modelo de vanguardia para tareas de series temporales, basado en la arquitectura PatchTST, y está disponible en Hugging Face Hub para integrarse directamente en pipelines de forecasting o detección de anomalías.

La liberación cierra un hueco práctico: hasta ahora, muchos modelos de referencia en series temporales eran de investigación o tenían licencias restrictivas. Este modelo permite fine-tuning e inferencia en producción sin fricción legal. La arquitectura PatchTST trata la serie temporal como una secuencia de parches, similar a cómo los transformers de visión procesan imágenes, lo que captura dependencias temporales a múltiples escalas sin recurrir a ventanas deslizantes manuales.

El repositorio en Hugging Face expone la tarjeta del modelo con la licencia adjunta y los archivos de pesos listos para `transformers`. No hay benchmarks públicos detallados en la ficha más allá de la afirmación SOTA, ni comparativas frente a la versión r1 ni frente a baselines clásicos (ARIMA, ETS, DeepAR, N-BEATS). Tampoco se especifican el número de parámetros, la longitud de contexto máxima, los datos de preentrenamiento ni los requisitos de VRAM para inferencia batch.

```python
from transformers import PatchTSTForPrediction, PatchTSTConfig
import torch

model_id = "ibm/granite-timeseries-patchtst-fm-r2"
config = PatchTSTConfig.from_pretrained(model_id)
model = PatchTSTForPrediction.from_pretrained(model_id)

# past_values: [batch, seq_len, num_channels]
# future_values: [batch, prediction_length, num_channels]
with torch.no_grad():
    outputs = model(past_values=past_values, future_values=future_values)
    predictions = outputs.prediction_outputs  # [batch, prediction_length, num_channels]
```

El bloque anterior refleja la interfaz estándar de `transformers` para la clase `PatchTSTForPrediction`; los nombres de argumentos y la forma de los tensores siguen la convención de la librería.

Lo que no se sabe: métricas concretas en benchmarks estándar (M4, M5, ETTh, Electricity), tamaño exacto del modelo, longitud de contexto y horizonte de predicción soportados, datos de preentrenamiento, diferencias funcionales respecto a PatchTST-FM-r1, requisitos de hardware y limitaciones declaradas por IBM.
