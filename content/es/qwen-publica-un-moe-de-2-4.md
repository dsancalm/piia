---
title: "Qwen publica un modelo de mezcla de expertos con pesos abiertos y ajuste de"
summary: "Qwen ha lanzado en Hugging Face Qwen3.8-2.4T-A95B, un modelo de mezcla de expertos con pesos abiertos que se puede ejecutar en local o servir con vLLM y SGLang."
lang: es
story: qwen-publica-un-moe-de-2-4
publishedAt: 2026-08-13T08:05:20.656Z
sourceUrl: "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B"
sourceName: "Hacker News (portada)"
priority: flash
tags: [modelo, lanzamiento, código, hardware]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Qwen ha publicado en Hugging Face un modelo de mezcla de expertos con pesos abiertos, Qwen3.8-2.4T-A95B. El nombre sugiere una arquitectura con 2.4 billones de parámetros totales y 95 mil millones activos por token, aunque la ficha técnica no lo confirma explícitamente. Los pesos están disponibles para descargar y ejecutar en local, sin pasar por una API de pago.

Lo primero que llama la atención es el parámetro `reasoning_effort`, que acepta tres valores: `xhigh`, `medium` y `low`. Eso permite ajustar cuánto tiempo "piensa" el modelo antes de responder. Para una aplicación de chat en producción, `low` recorta la latencia. Para una tarea de resolución de problemas, `xhigh` gasta más cómputo pero mejora la respuesta. Es un dial, no un interruptor.

La integración con transformers funciona como con cualquier otro modelo de Qwen. Dos líneas para cargarlo y a generar:

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen3.8-2.4T-A95B")
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen3.8-2.4T-A95B", device_map="auto")

messages = [{"role": "user", "content": "Who are you?"}]

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

Para servir el modelo como API, vLLM y SGLang lo soportan de forma directa. Arrancas el servidor y llamas con curl:

```bash
pip install vllm
vllm serve "Qwen/Qwen3.8-2.4T-A95B"
```

```bash
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Content-Type: application/json" \
  --data '{
    "model": "Qwen/Qwen3.8-2.4T-A95B",
    "messages": [{"role": "user", "content": "What is the capital of France?"}]
  }'
```

También hay una imagen Docker oficial para SGLang, con la configuración de memoria compartida que esos servidores necesitan:

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
```

Para un programador, la novedad es que un modelo de ese tamaño con pesos abiertos se puede auto-alojar con herramientas estándar. No hace falta un framework propietario ni una cuenta en un servicio externo. El coste de ejecución depende del hardware que tengas, y ahí está el límite.

## Lo que no se sabe

La ficha no especifica el número exacto de parámetros totales ni activos, ni la fecha de lanzamiento. Tampoco hay benchmarks públicos que comparen este modelo con otros de su rango. No se detallan los requisitos mínimos de hardware, así que no sabes si una GPU de 24 GB basta o necesitas varias. Y la licencia no está indicada en el texto de la fuente, solo en la página del modelo en Hugging Face.
