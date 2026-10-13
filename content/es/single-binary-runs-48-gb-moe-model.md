---
title: "Janas-LLM ejecuta MoE de 80B en 32 GB de RAM transmitiendo expertos desde el SSD"
summary: "El motor carga solo los expertos activos y cachea los reutilizados, alcanzando 37 tok/s con Qwen3-Next-80B-A3B frente a 2,8 tok/s de llama.cpp en el mismo portátil."
lang: es
story: single-binary-runs-48-gb-moe-model
publishedAt: 2026-10-13T14:32:43.665Z
sourceUrl: "https://github.com/prabanta-dev/janas"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [moe, inferencia, ssd, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Janas-LLM permite ejecutar modelos Mixture of Experts que superan la RAM física transmitiendo solo los expertos necesarios desde un SSD NVMe y cacheando en memoria los que se reutilizan. El proyecto está en fase temprana: la API y la CLI cambian sin aviso, el motor llena la memoria libre con caché de expertos y lee disco con `O_DIRECT`, lo que puede forzar swap y bloquear el escritorio si el margen de memoria es escaso.

En un portátil con 32 GB de RAM DDR5, Intel Core Ultra 9 185H (6 P-cores, 8 E-cores, 2 LP-cores, iGPU Arc) y un SSD NVMe de 1 TB con 5.7 GB/s de lectura secuencial, Janas-LLM alcanzó 37 tok/s generando con Qwen3-Next-80B-A3B (48.4 GB en disco) frente a 2.8 tok/s de llama.cpp. En lectura de prompt de 1024 tokens, la diferencia fue de 62 tok/s contra 16 tok/s. El motor auto-ajusta hilos y uso de GPU midiendo en la primera ejecución; en este hardware usó 12 P-cores para prompt y token único, y todos los cores disponibles (P+E) para pocos tokens simultáneos.

```
curl -LO https://github.com/prabanta-dev/janas/releases/latest/download/janas-linux-x86_64.tar.gz
tar xf janas-linux-x86_64.tar.gz && cd janas
./janas-chat
```

Los modelos vienen preconvertidos desde Hugging Face en formato `.jns` versión 2, compatible hacia adelante. Solo se escribe en `~/.cache/janas` y en la ruta que el usuario indique para modelos convertidos; los archivos originales no se modifican. En Windows 11 (mismo portátil) Janas-LLM igualó velocidades de generación en Linux y fue 1.8x más rápido en lectura de prompt con modelos densos (Qwen3-4B: 346 vs 193 tok/s) gracias al driver gráfico de Intel.

Los drafts MPT muestran supervivencia del 74-89% en Qwen3.5/3.6/Next y Gemma 12B/26B, 63-72% en Gemma E2B/E4B y alrededor del 33% en prosa italiana con Qwen3.5-2B. Sin drafts, Qwen3-Next-80B-A3B marcó 24 tok/s en generación.

## Lo que no se sabe

- Rendimiento en CPUs sin AVX-VNNI (AMD Zen 3/4/5, ARM, Intel pre-Alder Lake).
- Comportamiento con GPUs discretas (NVIDIA, AMD, Intel Arc dGPU); solo probado con iGPU Arc integrada.
- Estabilidad con SSDs más lentos (SATA, NVMe gen3/gen4 <5 GB/s) o HDD.
- Riesgo real de swap y freeze del escritorio en máquinas con menos margen de memoria.
- Consumo energético y térmico sostenido bajo carga continua.
- Compatibilidad real con Windows 10 (1903+) más allá del test en Windows 11 build 26300.
- Soporte para cuantizaciones distintas a las publicadas (solo `.jns` v2 de HF).
- Escalabilidad a modelos >80B (p.ej. 400B+ MoE) y multi-GPU.
- Fecha de corte de conocimiento de los modelos convertidos y licencia de redistribución de los `.jns`.
- Mecanismo exacto de "fast prompt" y por qué los pesos Q3_K no lo usan en GPU (mencionado para Qwen3-30B 3-bit).
