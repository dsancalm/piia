---
title: "Jeff permite clasificar sin generar texto en 22 ms con modelos de 0,8B"
summary: "Dos modelos ligeros fine-tuneados de Qwen y Gemma devuelven probabilidades calibradas en un solo forward pass, sin nube ni modelos cerrados, y se sirven en GPU, CPU o Apple Silicon con una API compatible con Jev."
lang: es
story: jeff-decision-models-return-calibrated-probabilities-in
publishedAt: 2026-09-29T13:19:45.182Z
sourceUrl: "https://github.com/firelex/jeff"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [clasificacion, modelos-ligeros, inferencia-local, zero-shot]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Jeff es una familia de modelos de decisión de 0,8B y 2B parámetros que funcionan como clasificadores zero-shot calibrados. Devuelven probabilidades por opción en un único *forward pass* sin generar texto, lo que los convierte en una alternativa *embeddable* a LLMs pesados para *routing*, triaje o *feature flags* en dispositivo. Los pesos son *fine-tunes* de Qwen3.5 y Gemma 4, entrenados con la receta open-source AutoJev y datos sintéticos generados por Qwen3.8-Flash-Next en dos DGX Sparks. No hubo GPUs en la nube ni salidas de modelos cerrados en el entrenamiento.

La latencia del modelo 0,8B (Qwen) es de 22 ms en una RTX PRO 6000 y 28 ms en Apple M4 Max vía MLX. El de 2B sube a 24 ms y 60 ms respectivamente. En CPU a 32 hilos se dispara a 463 ms. En *benchmarks* generales (5 *benchmarks*, 4.599 preguntas) Jeff-Qwen3.5-0.8B alcanza 79,1 % frente al 45,3 % del base y al 83,0 % del Jev publicado; la versión 2B llega al 83,1 %. En tareas de razonamiento complejo (BBH, JudgeBench, JevBench hard) quedan muy por debajo de Jev y AutoJev-27B, como era de esperar por su tamaño.

El formato de petición clona la API de Jev aunque no hay afiliación con TypeSafe. Soporta tres tipos de pregunta: `choice` (hasta 26 opciones codificadas A-Z), `noul` (sí/no como probabilidad) y `score` (punto en escala descrita). Varias preguntas independientes caben en una misma petición. El límite actual de 26 opciones es duro: el servidor rechaza listas más largas y las opciones en posición 27+ no se eligen efectivamente.

```bash
uv sync
uv run hf download mstrasser/Jeff-Qwen3.5-0.8B --local-dir checkpoints/jeff-0.8b
# NVIDIA GPU o CPU (PyTorch)
JEFF_CHECKPOINT=checkpoints/jeff-0.8b PORT=8765 uv run jeff-serve
# Apple silicon (MLX, mucho más rápido en Mac; solo modelos Qwen)
uv sync --extra mac
JEFF_BACKEND=mlx JEFF_CHECKPOINT=checkpoints/jeff-0.8b PORT=8765 uv run jeff-serve
```

```bash
curl -s localhost:8765/v1/systemone \
  -H 'content-type: application/json' \
  -d '{
    "model": "jeff-latest",
    "state": "Refund request: the customer says the parcel arrived crushed and wants their money back.",
    "questions": {
      "route": {
        "type": "choice",
        "instructions": "Which team should handle this?",
        "criteria": {
          "1": "Refunds and payments",
          "2": "Damaged or lost parcels",
          "3": "Account and login problems"
        }
      },
      "angry": {
        "type": "noul",
        "instructions": "Is the customer angry?"
      }
    }
  }'
```

Un *fine-tune* de navegación por voz con ~11 000 ejemplos subió *accuracy* *held-out* del 31,7 % al 95,8 % en media hora sobre una GPU, manteniendo ~40 ms/decisión en M4 Max. Los pesos 16-bit ocupan 1,7 GB (0,8B), 4,2 GB (2B Qwen) y 9,3 GB (Gemma 4 E2B efectivo 2B / 4,6B almacenados). En juegos zero-shot Jeff-0,8B supera al *bot* con reglas en Frogger (10,3 vs 10,25 cruces) y empata en Doom (6,55 *kills*); en Pac-Man se queda en 57 *pellets* frente a 94 del *rule bot*.

## Qué no se sabe

- Latencia exacta de Jeff-Gemma4-E2B en Apple M4 Max (MLX solo corre Qwen según la tabla).
- Resultados de Jev y AutoJev-27B en los mismos *splits* exactos de *benchmarks* (se midieron en muestra distinta).
- Detalles de la receta de *fine-tune*: *learning rate* exacto, *batch size*, *scheduler*, número de épocas óptimo por tarea.
- Rendimiento en idiomas no ingleses y dominios no cubiertos por los 5 *benchmarks* públicos + JevBench.
- Calibración de probabilidades en distribución real de producción vs *benchmarks*.
- Coste real de generar datos sintéticos con Qwen3.8-Flash-Next en DGX Sparks (tiempo, energía).
- Si el límite de 26 opciones se levantará en futuras versiones y cómo afectaría al rendimiento.
- Comparativa de latencia y *throughput* bajo carga concurrente real (*batch* >1, peticiones simultáneas).
