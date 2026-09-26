---
title: "Ollaya trae los modelos de decisión Jev a local con la misma API que TypeSafe"
summary: "El servidor expone endpoints idénticos a la nube y el SDK Python 0.7.1 funciona sin cambios; los pesos se descargan de Hugging Face verificados por sha256 y corren en CPU, MLX o CUDA 13 según hardware."
lang: es
story: ollaya-runs-jev-decision-models-locally-via
publishedAt: 2026-09-26T11:40:12.269Z
sourceUrl: "https://ollaya.dev/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [ollaya, jev, local, typesafe]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Ollaya trae a tu máquina local la pila de modelos de decisión Jev que hasta ahora solo estaban disponibles a través de la API alojada de TypeSafe. El servidor expone los mismos endpoints `/v1/systemone` y `/v1/models` que la nube, por lo que el SDK oficial de Python 0.7.1 funciona sin tocar una línea de código. Los pesos se descargan directamente de repositorios de Hugging Face fijados por commit y verificados con sha256; Ollaya no los re-alberga. El runtime se distribuye bajo Apache-2.0 y escucha por defecto en `127.0.0.1:11435`.

El catálogo cubre clasificación multilingüe (laya, 322M/421M), decisiones tipadas (decider 0.75B y 1.9B), inferencia de lenguaje natural (nli 396M/435M), clasificación general (gliclass 439M), guardrails (qwen3guard 0.6B, 119 idiomas), modelos de decisión puros (decision 0.75B, kev 0.76B/4.2B/7.9B) y von (395M, contexto 8192 tokens). En macOS con Apple Silicon, laya y nli corren en GPU vía MLX; el resto usa CPU salvo que tengas una NVIDIA con driver R580+ y CUDA 13, donde los scripts instalan solo las librerías necesarias.

La latencia marca la diferencia frente a la nube. En una RTX 4090 con fp16, laya responde en 8, 10 ms de mediana extremo a extremo vía HTTP. decider:0.8b baja a 155 ms y decider:2b a 190 ms, frente a 236, 276 ms de la API alojada (red incluida). Un ejemplo real con decider:2b en 4090 dio 178 ms wall-clock, puntuación 0.591 en decisiones tipadas y confidence 0.9547 clasificando una intención "invoice" con 43 tokens de entrada y 0 de salida.

Apuntas el SDK al servidor local con dos variables de entorno:

```bash
export TYPESAFE_BASE_URL=http://localhost:11435
export TYPESAFE_API_KEY=local
export TYPESAFE_DEFAULT_MODEL=laya
```

O llamas al endpoint compatible directamente:

```bash
curl http://localhost:11435/v1/systemone -d '{
  "model": "laya",
  "state": "Can I get an invoice for last month?",
  "questions": {
    "intent": {
      "type": "choice",
      "instructions": "What does the customer want?",
      "criteria": {
        "invoice": "Needs an invoice or receipt",
        "refund": "Wants money back",
        "other": "Anything else"
      }
    }
  }
}'
```

La respuesta llega estructurada y tipada:

```json
{
  "model": "laya:en",
  "answers": {
    "intent": {
      "type": "choice",
      "choice": "invoice",
      "confidence": 0.9547,
      "probabilities": {
        "invoice": 0.9698,
        "refund": 0.0172,
        "other": 0.013
      }
    }
  },
  "usage": {
    "input_tokens": 43,
    "output_tokens": 0
  }
}
```

Para flujos de agente, la CLI permite presets como `ollaya run decider --preset agent '{ "request": "Fix the typo in README.md", "command": "git push --force origin main" }'`. Hay instaladores de escritorio para macOS, Windows y Linux, más imagen Docker para servidores.

## Lo que no se sabe

No hay precisiones publicadas por modelo más allá del 0.591 de decider:2b. Se desconoce el formato Modelfile para recalibrar con datos propios, los requisitos mínimos de RAM/VRAM por modelo, si el binario incluye telemetría, el rendimiento en CPU pura, la política de actualización de pesos, soporte para GPU AMD/Intel en Linux/Windows, compatibilidad con Windows ARM64 o si el escritorio en Linux ARM64 está planeado.
