---
title: "Whistle: un modelo de voz de 16,9 MB que supera a Whisper en CPU"
summary: "Transcribe, marca el tiempo por palabra y genera incrustaciones de audio en siete idiomas sin GPU ni que el audio salga del dispositivo. En Apple M4 Pro alcanza 1.319 tokens por segundo, 4,9 veces más rápido que Whisper base, y ocupa 8,6 veces menos espacio."
lang: es
story: whistle-is-a-16-9-mb-speech
publishedAt: 2026-10-09T13:35:13.407Z
sourceUrl: "https://cactuscompute.com/blog/whistle"
sourceName: "Hacker News (portada)"
priority: flash
tags: [inteligenciaartificial, reconocimientodevoz, softwarelibre, rendimiento]
generatedBy: dots-studio/dots-3-note-preview:free
---
Whistle es un modelo de reconocimiento de voz de 16,9 MB que ejecuta transcripción, marcas de tiempo por palabra e incrustación de audio en CPU, sin GPU y sin que el audio salga del dispositivo. Cubre siete idiomas , inglés, alemán, francés, español, italiano, holandés y polaco, y procesa clips de hasta 30 segundos. El modelo se carga la primera vez que se pulsa el micrófono y el motor mide el rango de loudness del clip; si está por debajo de un umbral, devuelve transcripción y lenguaje vacíos sin entrar en la búsqueda por haz.

La arquitectura combina un encoder de ocho bloques Simple Attention con cuatro carriles mHC y MLP Monarch Hadamard, y un decoder de ocho bloques Laddered Simple Attention con GQA 8q:2kv, convolución causal de tres toques y engram en las capas 3 y 7. Cada capa del decoder aplica atención cruzada con compuerta:

```text
x ← x + σ(g) · softmax(q̂ K̂ᵀ/√d) V
```

Las proyecciones K y V del encoder se calculan una vez por clip (375 frames × 8 capas) y se reutilizan. La búsqueda usa beam search × 5 con normalización de longitud y sesgo de palabras vía Aho-Corasick. El vocabulario tiene 8.192 piezas de texto más siete tokens de idioma. El pipeline de audio entra a 16 kHz mono, genera 80 bins log-mel, pasa por una convolución stem de 128 canales con kernel 9 y tres reducciones, y produce 375 frames.

## Rendimiento y despliegue

En un Apple M4 Pro, Whistle alcanza 11,1 ms hasta el primer token y 1.319 tokens/s. Whisper base (145,3 MB) marca 73,2 ms y 266 tokens/s; Moonshine tiny v2 (41,9 MB) queda en 22,8 ms y 262 tokens/s. Whistle supera a ambos en WER en LibriSpeech, SPGISpeech, Earnings-22 y FLEURS. Whisper base gana en TED-LIUM, AMI y MLS average, pero ocupa 8,6 veces más espacio.

El motor Needle compila para 17 plataformas , macOS, Linux, Android, iOS, navegador, WASI, RISC-V, MIPS, Windows on ARM, sin leer variables de entorno; todo es default de compilación o flag explícito. La API de speech en C se reduce a `needle_load`, `needle_transcribe` y `needle_embed`. Desde línea de comandos:

```bash
needle --model whistle.cact --audio clip.wav
needle --model needle3.cact --tools tools.json --prompt "turn off the kitchen lights"
needle --model needle3.cact --model whistle.cact --tools tools.json --audio clip.wav
```

El modelo se distribuye como un archivo `.cact` cargable por `needle_load`. La instalación base basta para WAV a 16 kHz; para otros sample rates o micrófono hace falta el extra `[mic]` con `soxr` y `sounddevice`. Las marcas de tiempo por palabra incluyen inicio, fin y probabilidad, alineadas por atención del decoder. Forzar idioma con `language="de"` desactiva la detección automática. El motor puede devolver JSON con `function_calls` y `audio_text` para encadenar herramientas tras la transcripción.

## Lo que no se sabe

- Arquitectura exacta del Monarch Hadamard MLP.
- Valor del umbral de silencio y cálculo del loudness range.
- Mecanismo de actualización de la compuerta σ(g) en la atención cruzada.
- Entrenamiento del autómata Aho-Corasick para el sesgo de palabras.
- Tamaño del dataset de entrenamiento y número de epochs.
- Distribución de los 18.432 slots del engram.
- Normalización del log-mel por canal.
- Procedimiento de cuantización para alcanzar 16,9 MB.
- Tiempo de inferencia en dispositivos móviles o embebidos.
- Manejo de audio corrupto o con ruido excesivo.
- Precisión de marcas de tiempo en habla rápida o solapada.
- Criterio de selección del mejor beam en la búsqueda.
- Soporte para fine-tuning o adaptación a nuevos idiomas.
- Gestión de memoria en clips largos con poca RAM.
- Protocolo de comunicación entre motor y frontend.
- Latencia total del pipeline bajo carga de fondo.
- Robustez a acentos, dialectos o hablantes no nativos.
- Comportamiento con mezcla de idiomas en el mismo clip.
