---
title: "Strata ejecuta Qwen 3.8 Flash Next de 125B en una GPU de 12 GB"
summary: "El instalador descarga 70 GB cuantizados, reserva hasta 55 GB en RAM y levanta un servidor local con API OpenAI y Anthropic. Usa MoE con 24.576 expertos, offloading a CPU y SSD, y speculative decoding que acelera 1,6-1,8x."
lang: es
story: strata-runs-125b-moe-model-on-a
publishedAt: 2026-10-05T15:06:32.396Z
sourceUrl: "https://github.com/Niko1221/Strata"
sourceName: "Hacker News (portada)"
priority: flash
tags: [llm, local, moe, quantization]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Strata permite ejecutar Qwen 3.8 Flash Next (125B) en una sola GPU de consumo con 12 GB de VRAM. El instalador detecta el hardware, descarga unos 70 GB del modelo cuantizado y levanta un servidor local en `http://127.0.0.1:8080` con API compatible con OpenAI (`/v1`) y Anthropic (`/v1/messages`). Funciona en Windows 10/11 y Linux con drivers actuales.

```bash
# Linux
./setup.sh --setup
# Windows
START-HERE.bat
```

La primera carga tarda entre 1 y 3 minutos mientras reserva entre 35 y 55 GB en RAM y prepara la GPU. El modelo usa una arquitectura Mixture-of-Experts con 24.576 expertos totales; cada token activa unos 10. La GPU guarda los expertos más frecuentes, la RAM el resto y la CPU procesa los que no caben, con una tabla de lookup en SSD. El *speculative decoding* añade un modelo pequeño que propone tokens y el grande los verifica en paralelo, dando un *speedup* de 1.6 a 1.8x. Los prompts largos se leen en bloques de hasta 8.192 tokens.

## Rendimiento medido

| GPU | Cuantización | Escritura (tok/s) | Lectura (tok/s) |
|-----|--------------|-------------------|-----------------|
| RTX 5070 12GB | Q2_0 | 94 | 2.650 |
| RTX 5070 12GB | IQ3_S | 53 | 1.620 |
| RTX 5070 12GB | Coder | 55 | 2.180 |
| RX 9070 XT 16GB | Q2_0 | 60 | 1.160 |
| RX 9070 XT 16GB | IQ2_XS | 52 | 1.110 |
| RX 9070 XT 16GB | Coder | 44 | 1.420 |
| RTX 3090 24GB | estimado | 100-140 | , |

La variante **Coder** recorta a la mitad los expertos, cabe en 32 GB de RAM y alcanza un 91 % en SWE-bench Verified. **Swift 1.5** es un *fine-tune* que reduce los pasos de razonamiento. También están disponibles Unsloth UD-IQ4_XS (unos 4-bit, 94 GB) y UD-Q4_K_XL (experimental, 7-8,5 tok/s en 64 GB RAM).

Requisitos mínimos: 12 GB VRAM (NVIDIA o AMD), 32 GB RAM (64 GB recomendados), unos 80 GB libres en SSD. La ventana de contexto llega a 128K tokens (ejemplo con IQ3_S); los benchmarks usan prompts de 32K. Soporta cuatro niveles de razonamiento (off/low/medium/high) e imágenes (sí en el *setup*, aunque AMD en Windows aún no).

## Qué no se sabe

- Licencia exacta del código (solo se dice "free and open source").
- Requisitos mínimos de CPU más allá de AVX2.
- Rendimiento real en RTX 4090 (solo hay estimación para 3090).
- Consumo energético en distintas GPUs.
- Benchmarks independientes de calidad frente al modelo original sin cuantizar.
- Estabilidad del modo multi-GPU (marcado como experimental).
- Tamaño exacto en disco de cada cuantización.
- Si hay telemetría o salida de datos del PC.
- Compatibilidad concreta con Cursor, Copilot, Claude Code más allá de "OpenAI-compatible".
- Roadmap y frecuencia de actualizaciones.
