---
title: "FD-VAD ends turns from raw audio without ASR"
summary: "A frozen encoder and lightweight adapter feed a parameter-efficient language model that decides turn completion on the last audio chunk. Confidence gating and hard-negative sampling push recall to 0.853 at a 0.10 false-positive rate on TurnBench, the best zero-shot result..."
lang: en
story: fd-vad-ends-turns-from-raw-audio
publishedAt: 2026-10-01T13:48:56.489Z
sourceUrl: "https://arxiv.org/abs/2609.35791"
sourceName: "arXiv cs.CL"
priority: routine
tags: [speech, streaming, turn-taking, language-model]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
FD-VAD is a semantic endpointer for full-duplex streaming speech. It operates without automatic speech recognition. A frozen speech encoder feeds audio into a lightweight modality adapter. The adapter conditions a parameter-efficient language model. Training uses a last-chunk objective built for streaming. The model decides whether the most recent audio segment completes a turn. It does not wait for a full utterance.

Two mechanisms manage the trade-off between interruption and latency. Confidence-gated endpoint commitment triggers a turn-end signal only when the model's confidence exceeds a learned threshold. Boundary-focused hard-negative sampling creates training examples that sit on ambiguous turn boundaries. These include backchannels, hesitations, and mid-sentence pauses. This forces the model to distinguish true completions from lookalikes.

On the TurnBench dev set, FD-VAD achieves an end-of-turn recall of 0.853 at a false-positive rate capped at 0.10. This is evaluated zero-shot. The result is the highest recall among qualified systems on the benchmark. It shows that semantic endpointing can run directly on streaming audio. No intermediate ASR step is needed. No separate dialogue-state tracker is required. This collapses a cascade that traditionally adds latency and error propagation.

The paper does not specify which speech encoder is frozen. The adapter architecture is not described. The base language model and its adaptation method are not named. LoRA, adapters, and prefix-tuning are not mentioned. Causal window duration, stride, and overlap are not given. The exact last-chunk loss formulation is absent. Confidence-gating thresholds are not disclosed. The hard-negative generation procedure is not explained. Training data , name, size, languages, and licenses , is not disclosed. Full TurnBench metrics are missing. These include precision, F1, latency, and exact false-positive rate. Baseline names and numbers are not provided. Real-hardware inference latency and real-time factor are not reported. The authors reference external links for code and weights. They do not confirm a public release.
