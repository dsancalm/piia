---
title: "Un script de 25 líneas clasifica phishing con un modelo local en Python"
summary: "El blog NobodyWho publica un ejemplo satírico que descarga Qwen3-0.6B, extrae logits del último token y devuelve probabilidades calibradas sin llamar a ninguna API. El correo de prueba obtiene 0,885 de probabilidad para phishing."
lang: es
story: parody-post-shows-25-line-local-llm
publishedAt: 2026-09-23T12:02:54.932Z
sourceUrl: "https://www.nobodywho.ai/posts/jev-in-25-lines/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [python, llm, phishing, clasificacion]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Una entrada satírica en el blog de NobodyWho muestra cómo clasificar un correo como phishing, spam o legítimo en 25 líneas de Python ejecutando un modelo local. El código descarga Qwen3-0.6B-GGUF en su cuantización Q8_0 desde Hugging Face, lo carga con `llama-cpp-python` y extrae los logits del último token para convertirlos en probabilidades calibradas. El ejemplo devuelve 0.885 de probabilidad para "Phishing" frente a 0.084 para "Spam" y 0.031 para "Legitimate". No hay llamada a API, ni datos sintéticos, ni entrenamiento RLCD: todo corre en CPU o GPU local con un contexto de 512 tokens.

```python
# /// script
# requires-python = ">=3.12"
# dependencies = ["huggingface-hub", "llama-cpp-python", "numpy"]
# ///
import numpy
from llama_cpp import Llama

model = Llama.from_pretrained(
    repo_id="Qwen/Qwen3-0.6B-GGUF",
    filename="Qwen3-0.6B-Q8_0.gguf",
    n_ctx=512,
    logits_all=True,
    verbose=False,
)

labels = ["A", "B", "C"]
choices = ["Legitimate", "Spam", "Phishing"]
email = "Payroll asks for your password on a non-company sign-in page."
options = "\n".join(f" {label}. {choice}" for label, choice in zip(labels, choices, strict=True))
prompt = f"""<|im_start|>system
Choose one option.<|im_end|>
<|im_start|>user
Email: {email}

{options}
<|im_end|>
<|im_start|>assistant
"""

model.eval(tokens=model.tokenize(text=prompt.encode(), add_bos=False, special=True))

logits = model.scores[model.n_tokens - 1]
token_ids = [model.tokenize(text=label.encode(), add_bos=False)[0] for label in labels]
choice_logits = numpy.asarray([logits[token_id] for token_id in token_ids])
logprobs = choice_logits - numpy.logaddexp.reduce(choice_logits)
probabilities = numpy.exp(logprobs)

for name, scores in (
    ("Logits", choice_logits),
    ("Log probabilities", logprobs),
    ("Probabilities", probabilities),
):
    values = numpy.round(scores.astype(float), 3).tolist()
    print(f"{name}:", dict(zip(choices, values, strict=True)))
# Logits: {'Legitimate': 26.254, 'Spam': 27.262, 'Phishing': 29.614}
# Log probabilities: {'Legitimate': -3.482, 'Spam': -2.474, 'Phishing': -0.122}
# Probabilities: {'Legitimate': 0.031, 'Spam': 0.084, 'Phishing': 0.885}
```

El patrón es copiable: cualquier tarea de clasificación cerrada cabe en este esquema cambiando `choices` y el `prompt`. El modelo pesa unos 600 MB y no requiere servidor aparte.

### Lo que no se sabe
- Qué es exactamente "Jev" más allá de la broma del título.
- Si los pesos del modelo han sido modificados o se usan tal cual desde Hugging Face.
- Qué precisión tiene este enfoque en un conjunto de evaluación real.
- Cómo escalaría a más categorías o contextos más largos.
