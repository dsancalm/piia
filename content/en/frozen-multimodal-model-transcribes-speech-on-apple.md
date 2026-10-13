---
title: "Frozen multimodal model transcribes speech on Apple Neural Engine"
summary: "A lightweight reader layer maps audio chunks to EmbeddingGemma's vocabulary, enabling 288× real-time transcription on an M3 MacBook Air without cloud calls. The 715 MB macOS app runs entirely on-device and achieves roughly 5% word error rate."
lang: en
story: frozen-multimodal-model-transcribes-speech-on-apple
publishedAt: 2026-10-13T14:35:37.786Z
sourceUrl: "https://eg2.haku.sh/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [speech, apple, neural-engine, embedding]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A small reader module turns a frozen multimodal embedding model into a speech-to-text engine that runs entirely on Apple Neural Engine. The authors took Google's EmbeddingGemma 2, which already maps text, images, audio, and video into a shared vector space, and trained only a projection layer that maps short audio chunks to the nearest token in the model's ~229,000-word English vocabulary. A second tiny model adds punctuation and capitalization. Total reader training: under two hours on 8×H100 using open-licensed English speech. The base encoder never saw a speech-to-text objective.

The macOS app (v1.6, free download) pulls 715 MB of weights on first launch and requires macOS 14 or later on Apple Silicon. You can drag an audio file onto the window or hold Right Option, speak, and release to dictate directly into any text field. Audio never leaves the machine.

On a base-model MacBook Air M3 with 8 GB RAM, one hour of audio transcribes in 12.6 seconds (288× real time). For comparison, IBM Granite Speech 5.0 TurboCTC running via MLX on the same machine takes 25.7 seconds (150×). NVIDIA's Parakeet TDT 0.6B v3 via FluidAudio hits 156× on M4 Pro and 335× on M5 Pro; a fine-tuned variant called Phonon-2 reaches 480× on M5 Pro. Current word error rate sits around 5 percent versus 2, 3 percent for the best cloud models. The authors expect a better-trained reader to close most of that gap.

What is not known
- Cold-start latency (model load time before first inference).
- Sustained RAM and battery draw during long sessions.
- Support for languages other than English or multilingual roadmap.
- Exact license for the reader weights and the combined artifact.
- Accuracy on noisy audio, strong accents, overlapping speech, or technical domains.
- Whether the app exports SRT, VTT, or JSON with word-level or segment-level timestamps.
- Minimum macOS version beyond "14+" and Intel Mac compatibility.
- Concrete plans to reduce WER: data scaling, reader architecture changes, or encoder fine-tuning.
