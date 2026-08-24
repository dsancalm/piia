---
title: "Qwen publica un MoE de 2.4 billones de parámetros con pesos abiertos"
summary: "El modelo Qwen3.8-2.4T-A95B activa solo 95 mil millones de parámetros por token, lo que reduce el coste de inferencia y permite auto-hospedarlo sin API externa."
lang: en
story: qwen-publica-un-moe-de-2-4
publishedAt: 2026-08-13T08:05:20.657Z
sourceUrl: "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B"
sourceName: "Hacker News (portada)"
priority: flash
tags: [qwen, modelos, ia, código-abierto]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Qwen ha publicado un modelo de mezcla de expertos (MoE) con pesos abiertos en Hugging Face. El nombre, Qwen3.8-2.4T-A95B, sugiere 2.4 billones de parámetros totales con 95 mil millones activos, aunque la documentación no lo confirma explícitamente. El modelo se puede ejecutar con transformers, vLLM, SGLang o Docker, y permite ajustar el esfuerzo de razonamiento con un parámetro llamado `reasoning_effort`.

Para un programador, lo relevante es que puede auto-hospedar un modelo de gran tamaño sin depender de una API externa. El coste de inferencia se reduce porque solo se activan 95 mil millones de parámetros por token, no los 2.4 billones completos.

## Cómo ejecutarlo

La vía más rápida es con la librería `transformers`:

```python
# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text-generation", model="Qwen/Qwen3.8-2.4T-A95B")
messages = [
    {"role": "user", "content": "Who are you?"},
]
pipe(messages)
```

También se puede cargar el modelo directamente:

```python
# Load model directly
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen3.8-2.4T-A95B")
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen3.8-2.4T-A95B", device_map="auto")
messages = [
    {"role": "user", "content": "Who are you?"},
]
inputs = tokenizer.apply_chat_template(
    messages,
    add_generation_prompt=True,
    tokenize=True,
    return_dict=True,
    return_tensors="pt",
).to(model.device)

outputs = model.generate(**inputs, max_new_tokens=40)
print(tokenizer.decode(outputs[0][inputs["input_ids"].shape[-1]:]))
```

Para servidores de producción, vLLM ofrece una API compatible con OpenAI:

```bash
# Install vLLM from pip:
pip install vllm

# Start the vLLM server:
vllm serve "Qwen/Qwen3.8-2.4T-A95B"

# Call the server using curl (OpenAI-compatible API):
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Content-Type: application/json" \
  --data '{
    "model": "Qwen/Qwen3.8-2.4T-A95B",
    "messages": [
      {"role": "user", "content": "What is the capital of France?"}
    ]
  }'
```

SGLang es la alternativa, con un comando de instalación y arranque similar:

```bash
# Install SGLang from pip:
pip install sglang

# Start the SGLang server:
python3 -m sglang.launch_server \
  --model-path "Qwen/Qwen3.8-2.4T-A95B" \
  --host 0.0.0.0 \
  --port 30000

# Call the server using curl (OpenAI-compatible API):
curl -X POST "http://localhost:30000/v1/chat/completions" \
  -H "Content-Type: application/json" \
  --data '{
    "model": "Qwen/Qwen3.8-2.4T-A95B",
    "messages": [
      {"role": "user", "content": "What is the capital of France?"}
    ]
  }'
```

Y para desplegarlo con Docker directamente:

```
docker model run hf.co/Qwen/Qwen3.8-2.4T-A95B
```

O con SGLang en Docker, pasando las GPU y el token de Hugging Face:

```bash
docker run --gpus all \
  --shm-size 32g \
  -p 30000:30000 \
  -v ~/.cache/huggingface:/root/.cache/huggingface \
  --env "HF_TOKEN=<secret>" \
  --ipc=host \
  lmsysorg/sglang:latest \
  python3 -m sglang.launch_server \
  --model-path "Qwen/Qwen3.8-2.4T-A95B" \
  --host 0.0.0.0 \
  --port 30000

# Call the server using curl (OpenAI-compatible API):
curl -X POST "http://localhost:30000/v1/chat/completions" \
  -H "Content-Type: application/json" \
  --data '{
    "model": "Qwen/Qwen3.8-2.4T-A95B",
    "messages": [
      {"role": "user", "content": "What is the capital of France?"}
    ]
  }'
```

El parámetro `reasoning_effort` acepta los valores `xhigh`, `medium` y `low`. Esto permite intercambiar calidad de razonamiento por latencia según la tarea: un nivel bajo para respuestas rápidas, un nivel alto para problemas que requieren más pasos de pensamiento. El token especial de fin de secuencia es `<|im_end|>` y el de padding es `<|endoftext|>`.

## Lo que no se sabe

La publicación no especifica el número exacto de parámetros totales ni activos. Tampoco hay métricas de rendimiento, benchmarks, fecha de lanzamiento, requisitos mínimos de hardware ni licencia. Sin esos datos, es difícil saber qué hardware se necesita para ejecutarlo con una latencia aceptable, o si puede competir con otros modelos abiertos en tareas específicas.
