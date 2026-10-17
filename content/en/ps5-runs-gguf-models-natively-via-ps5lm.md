---
title: "PS5 runs GGUF models natively via PS5LM and llama.cpp"
summary: "PS5LM enables native GGUF model execution on jailbroken PS5 firmware 7.00 to 13.60 using Vulkan-backed llama.cpp. It supports models from 0.8B to 27B parameters with speeds up to 207 tokens/sec, exposes OpenAI and Anthropic-compatible APIs, and integrates with Hugging Face."
lang: en
story: ps5-runs-gguf-models-natively-via-ps5lm
publishedAt: 2026-10-17T11:08:13.698Z
sourceUrl: "https://github.com/cobanov/PS5LM"
sourceName: "Hacker News (portada)"
priority: routine
tags: [ps5, jailbreak, gguf, llamacpp]
generatedBy: dots-studio/dots-3-note-preview:free
---
You can run GGUF models natively on a jailbroken PS5 using llama.cpp with a Vulkan backend. The application, called PS5LM, works on firmware versions 7.00 through 13.60 and uses up to 11.4 GB of shared memory for the model and context on the RDNA 2 GPU.

It supports models of varying sizes and quantization levels. For example, Qwen 3.5 0.8B Q4_K_M uses 0.5 GB and achieves 207 tokens per second. The 9B variant uses 5.3 GB and runs at 55 tokens per second. The 27B UD-Q2_K_XL model consumes 9.2 GB, delivers around 20 tokens per second, and supports a 64k context. Decision models like d1 Omni 600M use 1.1 GB and answer three questions in 0.3 seconds, or handle 720p images with seven questions in 2.9 seconds.

The system exposes OpenAI-compatible APIs at /v1/chat/completions and Anthropic-compatible endpoints at /v1/messages. It also includes /v1/systemone for decision models, which accepts structured JSON payloads. You can interact with it via curl, sending requests like:

```
curl http://<console>:8081/v1/systemone -H 'Content-Type: application/json' -d '{
  "state": "I was charged twice this month. Refund me or I cancel.",
  "questions": {
    "intent": {
      "type": "choice",
      "instructions": "What does the customer want?",
      "criteria": {
        "refund": null,
        "information": null,
        "cancel": null
      }
    },
    "angry": {
      "type": "noul",
      "instructions": "Is the customer angry?"
    }
  }
}'
```

The interface displays real-time requests on the TV: who asked, what they asked, and the response as it generates. You can trigger demo mode with the Square button or open a keyboard with Triangle. The DualSense L1 and R1 buttons navigate through Home, Models, API, Console, and Settings.

The Console tab graphs temperature, power draw, GPU load, and CPU load in real time. It can show the last 2 minutes or 1 hour of metrics. The scheduler automatically selects the best context and cache configuration based on available memory.

Models can be downloaded directly from Hugging Face to internal storage, M.2 drives, or USB. They are stored in /data/PS5LM/models or on a USB drive mounted as PS5LM/models. Image-capable models like Gemma 4, MiniCPM-V, and d1 support image inputs for chat and decision tasks.

Installation requires specific payloads: kstuff-lite, etaHEN, ShadowMountPlus, elfldr (port 9021), ps5-exporter (optional), and ftpsrv (port 2121). You copy the PPSA99575 folder to /data/homebrew via FTP and use ShadowMountPlus to add it to the main menu. The model server runs on port 8081.

The source code is licensed under GPL-3.0-or-later, while llama.cpp retains its MIT license. The project does not include Sony SDK files, keys, firmware, or model weights. It is not affiliated with Sony Interactive Entertainment.

What is not known: exact token rates for models beyond those tested, average network latency for remote clients, memory management behavior under large model loads, maximum simultaneous API connections, actual power consumption in watts during heavy loads, GPU compatibility variations within PS5 Slim units, handling of Vulkan driver updates or Mesa patches, startup time before the model is ready to serve, support for multimodal models beyond the listed ones (e.g., LLaVA, BLIP), and the refresh rate of the Console metrics graphs.
