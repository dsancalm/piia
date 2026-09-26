---
title: "Ollaya runs Jev decision models locally via Ollama-compatible API"
summary: "The Apache-2.0 runtime serves TypeSafe endpoints on port 11435, pulling verified weights from Hugging Face. On an RTX 4090, the 2B decider model answers in 190 ms versus 276 ms for the hosted API, while keeping data on-device."
lang: en
story: ollaya-runs-jev-decision-models-locally-via
publishedAt: 2026-09-26T11:40:12.270Z
sourceUrl: "https://ollaya.dev/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [ollama, onnx, local-llm, decision-making]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Ollaya brings Jev-style decision models to a local, Ollama-compatible API. You embed structured reasoning into agents without sending data to a closed provider. The server runs on CPU or NVIDIA GPU via ONNX Runtime, exposes the TypeSafe `/v1/systemone` and `/v1/models` endpoints, and works with the official Python SDK 0.7.1 unchanged. Model weights are pulled from pinned Hugging Face commits with sha256 verification; Ollaya does not re-host them. The runtime is Apache-2.0 licensed and listens on `127.0.0.1:11435` by default. Desktop apps and a CLI ship for macOS, Windows, and Linux, plus a Docker image for servers.

## Models and hardware

Available models cover multilingual classification, typed decisions, natural language inference, guardrails, and a long-context variant:

- **laya** (322M/421M) , multilingual classifier
- **decider** (0.75B/1.9B) , typed decision engine
- **nli** (396M/435M) , natural language inference
- **gliclass** (439M) , zero-shot classification
- **qwen3guard** (0.6B) , 119-language guardrail
- **decision** (0.75B) , decision variant
- **kev** (0.76B/4.2B/7.9B) , larger decision models
- **von** (395M, 8k context) , extended context

On Apple Silicon, `laya` and `nli` run on GPU via MLX. Everything else uses CPU unless an NVIDIA GPU with CUDA 13 is present. Linux installs require driver R580 or newer; the install scripts fetch CUDA libraries only when that driver is detected.

## Latency benchmarks

Median end-to-end latency over HTTP on an RTX 4090 (fp16 for laya, fp32 for decider, five questions):

```
laya:            8–10 ms
decider:0.8b:    155 ms
decider:2b:      190 ms
```

For comparison, the hosted TypeSafe Jev API returns a median of 236, 276 ms for the same workload, including network overhead. A single `decider:2b` request on the same GPU measured 178 ms wall time. The model scores 0.591 on typed-decision accuracy.

## Integration example

Start the server and point the TypeSafe SDK at it:

```bash
ollaya run decider --preset agent
export TYPESAFE_BASE_URL=http://localhost:11435
export TYPESAFE_API_KEY=local
export TYPESAFE_DEFAULT_MODEL=laya
```

Call the compatible endpoint directly:

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

Response:

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

The same contract works inside LangGraph or any framework that speaks the TypeSafe SDK.

## What is not known

- Per-model accuracy beyond the single 0.591 figure for `decider:2b`.
- Modelfile format for fine-tuning with custom data.
- Minimum RAM/VRAM requirements per model.
- Whether the binary collects telemetry.
- Pure-CPU performance numbers for each model.
- Weight update policy and release cadence.
- AMD or Intel GPU support on Linux/Windows beyond CPU fallback.
- Windows ARM64 compatibility.
- Linux ARM64 desktop app status.
