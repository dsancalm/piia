---
title: "Un LLM pequeño clasifica opciones múltiples con salidas forzadas y probabilidades"
summary: "Un LogitsProcessor enmascara el vocabulario para que solo salgan las letras A-E, y temperature scaling con T=3,8 corrige la sobreconfianza extrema del modelo base Qwen3-1.7B."
lang: es
story: constrained-decoding-turns-qwen3-1-7b-into
publishedAt: 2026-10-11T13:19:15.777Z
sourceUrl: "https://nishtahir.com/build-your-own-decision-model/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [llm, clasificacion, calibracion, transformers]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Convierte un LLM pequeño en un clasificador de opciones múltiples con salidas restringidas y probabilidades calibradas. El artículo publica el pipeline completo: dataset, máscara de vocabulario para forzar tokens A, E, fine-tuning ligero y temperature scaling. El código está en GitHub y se ejecuta con `transformers` y `accelerate`.

La idea central es simple: en lugar de dejar que el modelo genere texto libre, construyes un `LogitsProcessor` que pone a menos infinito todos los tokens que no correspondan a las letras de las opciones. Así la salida es siempre una de las cinco etiquetas y obtienes una distribución de probabilidad sobre ellas.

```python
# fragmento representativo del LogitsProcessor
class OptionMaskLogitsProcessor(LogitsProcessor):
    def __init__(self, tokenizer, option_token_ids):
        self.option_token_ids = option_token_ids
        self.mask = torch.full((tokenizer.vocab_size,), -float("inf"))
        self.mask[option_token_ids] = 0

    def __call__(self, input_ids, scores):
        return scores + self.mask.to(scores.device)
```

El modelo base es Qwen/Qwen3-1.7B. Sin fine-tuning alcanza 59,38 % de accuracy (725/1221) y macro F1 0,5844 en el holdout de CommonsenseQA. Tras un fine-tuning rápido sube a 62,41 % (762/1221) y macro F1 0,6234. La matriz de confusión muestra que la clase D ("Purple" en el ejemplo) es la más difícil antes de ajustar; después se equilibran bastante las cinco clases.

## Calibración: el problema real

El modelo sin calibrar es extremadamente sobreconfiado. En el bin de confianza 0,9, 1,0 la accuracy real es solo 70,09 % (809 muestras). En el bin 0,8, 0,9 cae al 47,11 % (121 muestras). Las probabilidades crudas no sirven para tomar decisiones de negocio.

Aplicando temperature scaling con **T = 3,797280788421631** (optimizado en validation) la calibración mejora drásticamente:

| Bin | Muestras | Confianza media | Accuracy antes | Accuracy después |
|-----|----------|-----------------|----------------|------------------|
| 0,9, 1,0 | 109 | 0,9855 | 70,09 % | **95,41 %** |
| 0,8, 0,9 | 169 | 0,8555 | 47,11 % | **79,88 %** |

El repositorio incluye scripts para construir el dataset, evaluar, fine-tunear y buscar la temperatura óptima. El autor sugiere probar modelos mayores (7B, 14B, 72B) y comparar con Platt scaling o regresión isotónica, pero esos experimentos no están en el código publicado.

## Lo que no se sabe

- Hiperparámetros exactos del fine-tuning (learning rate, epochs, batch size, hardware, tiempo).
- Split preciso de train/val/test dentro de CommonsenseQA.
- Métrica y procedimiento usados para optimizar la temperatura.
- Latencia y throughput del constrained decoding frente a generación libre.
- Si el repo contiene ya los datos de evaluación listos para descargar o solo los scripts de preparación.
