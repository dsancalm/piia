---
title: "Whistle is a 16.9 MB speech-to-text model that runs on CPU without a GPU or external"
summary: "It transcribes up to 30 seconds of audio in seven languages, producing word-level timestamps and audio embeddings entirely on device. The model loads on first microphone press and never sends audio off the device."
lang: en
story: whistle-is-a-16-9-mb-speech
publishedAt: 2026-10-09T13:35:13.408Z
sourceUrl: "https://cactuscompute.com/blog/whistle"
sourceName: "Hacker News (portada)"
priority: flash
tags: [speech-to-text, on-device, cpu, whisper]
generatedBy: dots-studio/dots-3-note-preview:free
---
Whistle is a 16.9 MB speech-to-text model that runs on CPU without a GPU or external dependencies. It transcribes up to 30 seconds of audio in seven languages , English, German, French, Spanish, Italian, Dutch, and Polish , and produces word-level timestamps and audio embeddings entirely on device. The model loads on first microphone press and never sends audio off the device.

The engine is the same C++ runtime used by Needle, with identical container format and 4-bit quantization. It supports 17 prebuilt targets including macOS, Linux, Android, iOS, browser (WASM), WASI, RISC-V, MIPS, and Windows on ARM. Configuration is compile-time defaults or explicit flags; no environment variables are read.

Whistle processes 16 kHz mono audio through an 80-bin log-mel frontend (25 ms window, 10 ms hop) and a stem convolution of 128 channels, kernel 9, with three halvings to produce 375 frames. The encoder uses eight Simple Attention blocks with four Monarch-Hadamard lanes and a Monarch Hadamard MLP. The decoder uses eight Laddered Simple Attention blocks with grouped-query attention (8 query heads, 2 KV heads), a 3-tap causal convolution, and an engram memory in layers 3 and 7. Each decoder layer applies gated cross attention:

```text
x ← x + σ(g) · softmax(q̂ K̂ᵀ/√d) V
```

Encoder K and V projections are computed once per clip (375 frames × 8 layers) and reused. Decoding runs beam search with width 5, length normalization, and keyword biasing via an Aho-Corasick automaton. The vocabulary is 8,192 text pieces plus seven language tokens. Language detection emits a token; silence is detected by loudness range and skips beam search entirely.

Benchmarks on an Apple M4 Pro CPU show Whistle beating Whisper base (145.3 MB) and Moonshine tiny v2 (41.9 MB) in word error rate on LibriSpeech, SPGISpeech, Earnings-22, and FLEURS. Whisper base still leads on TED-LIUM, AMI, and MLS average. Whistle reaches time-to-first-token in 11.1 ms versus 73.2 ms for Whisper base and 22.8 ms for Moonshine tiny v2, and decodes at 1,319 tokens/s versus 266/s and 262/s respectively.

The full C API is three functions: `needle_load`, `needle_transcribe`, `needle_embed`. A Python wrapper exposes `needle.Whistle()` for embeddings and a `.cact` file loader. CLI tools include `needle whistle playground` for live microphone transcription and `needle whistle compare` for side-by-side benchmarks. Function calling is supported: the engine can transcribe and return JSON with `function_calls` and `audio_text` to trigger actions like turning off lights.

```bash
needle --model whistle.cact --audio clip.wav
needle --model needle3.cact --tools tools.json --prompt "turn off the kitchen lights"
needle --model needle3.cact --model whistle.cact --tools tools.json --audio clip.wav
```

Weights are on Hugging Face; code is in Cactus-Compute/needle3 and on GitHub. The base install handles 16 kHz WAV; the `[mic]` extra adds soxr and sounddevice for resampling and microphone capture.

## What is not known

- The exact architecture of the Monarch Hadamard MLP.
- The silence threshold value or how loudness range is computed.
- How the gate σ(g) in gated cross attention is updated during training.
- How the Aho-Corasick automaton for keyword biasing is constructed.
- Training dataset size, epoch count, or quantization procedure details.
- Distribution of the 18,432 engram slots.
- Per-channel log-mel normalization method.
- Inference latency on mobile or embedded hardware.
- Behavior on corrupted or extremely noisy audio.
- Word timestamp accuracy under fast or overlapping speech.
- How the 0.94 confidence in the function-call example is calibrated.
- Support for fine-tuning or adding new languages.
- Memory management for long clips on low-RAM devices.
- Communication protocol between engine and frontends (web, app).
- End-to-end pipeline latency under background load.
- Robustness to accents, dialects, or non-native speakers.
- Handling of mixed-language audio for language detection.
- Criterion for selecting the best beam during search.
