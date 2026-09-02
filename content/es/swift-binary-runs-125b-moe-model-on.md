---
title: "Slotstream ejecuta un modelo de 125 000 millones de parámetros en un Mac de 48 GB a"
summary: "El motor carga solo el tronco denso y una caché variable en RAM; los 68 GB de experts restantes y la tabla n-gram se leen del SSD bajo demanda. Arranca en 2 segundos, pico de 32 GB y expone API compatible con Ollama y OpenAI en el puerto 11434."
lang: es
story: swift-binary-runs-125b-moe-model-on
publishedAt: 2026-09-02T12:00:40.027Z
sourceUrl: "https://github.com/carloslfu/slotstream"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [mac, llm, inferencia, slotstream]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Slotstream ejecuta un modelo de 125 000 millones de parámetros (Qwen3.8-Flash-Next, mezcla de expertos a 4-bit, 104 GB en disco) en un Mac de 48 GB a unos 12 tokens por segundo sin tocar swap. El truco no es cuantizar más, sino dejar en RAM solo lo indispensable: el tronco denso de 3,8 GB y una caché de experts de tamaño variable. El resto , 68 GB de experts enrutados y 32 GB de tabla n-gram, se leen del SSD a medida que el enrutador los pide. En un M5 Pro de 48 GB el arranque del motor tarda 2 segundos, la memoria pico se queda en 32 GB y la decodificación en caliente entrega 12 tok/s.

El binario único en Swift expone en el puerto 11434 las mismas APIs de chat que Ollama y OpenAI, así que cualquier cliente compatible funciona sin cambios.

```bash
curl -fsSL https://raw.githubusercontent.com/carloslfu/slotstream/main/install.sh | sh
```

El instalador deja el ejecutable en `~/.slotstream/bin` y lo añade al PATH. La primera ejecución descarga 103,8 GB en 24 archivos (8 conexiones TCP, reanudación y SHA-256 integrados): a 1 Gbit/s tarda 16 minutos; a 100 Mbps, unas 2 horas y media. Después:

```bash
slotstream run --prompt "..."   # prueba rápida
slotstream serve                # servidor API
```

La tabla de rendimientos por RAM (8/16/24/32/48 GB) sale de `slotstream doctor --sim-ram N`; solo la fila de 48 GB es medición real, el resto son puntos de una curva estimada. El gestor de memoria elige automáticamente el mínimo entre 33 GB, el 70 % de la RAM y el límite del working-set de Metal menos 2 GB, y reevalúa cada 15 segundos redimensionando la caché entre peticiones con salida byte-identical.

El prefill inicial es lento: unos 25 segundos para 8k tokens en 16 GB y más de 3 minutos en 48 GB. Los turnos siguientes reutilizan la caché de prefijo (hasta 32 768 tokens, ~1,2 GB en 4 conversaciones) y mantienen el tiempo a primer token plano: 6 segundos en el octavo turno frente a 25,8 segundos sin caché en 16 GB. La opción `--no-prefix-cache` desactiva la reutilización para reproducibilidad exacta.

MTP (Multi-Token Prediction) opcional con `--mtp` añade una cabeza draft de 1,6 GB que acierta el siguiente token el 86 % de las veces. En 48 GB sube de 10,1 a 11,8 tok/s (×1,17); el techo teórico con todos los experts residentes sería ×1,4. Requiere una conversión única que baja 4,9 GB y genera `mtp.safetensors` de 1,5 GB.

Por qué no mmap: MLX no puede materializar parte de un tensor mapeado; un gather top-10 evaluaría los 512 experts de la capa y cargaría ~100 GB. `mlx_lm.load()` llevó la máquina de 48 GB a 48 GB de swap sin emitir un token.

## Lo que no se sabe

- Rendimiento real en Macs de 8, 16, 24 y 32 GB (solo estimaciones de curva).
- Comportamiento en macOS 15 (el instalador se probó, el motor no).
- Fecha de corte de conocimiento del modelo, licencia de los pesos y estabilidad a largo plazo del mirror de descarga.
- Soporte futuro para otros modelos o cuantizaciones (v0 solo conoce `qwen3.8-flash-next:4bit`).
- Reproducibilidad bit-a-bit con MTP activado (el draft introduce variabilidad).
- Compatibilidad con Ollama CLI (explícitamente no soportada aún).
