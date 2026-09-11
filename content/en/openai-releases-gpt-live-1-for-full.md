---
title: "OpenAI releases GPT-Live-1 for full-duplex voice agents"
summary: "The API bundles ASR, reasoning, TTS, turn management, and direct SIP/PSTN connectivity in one call, adding custom voices and stronger instruction following so teams can deploy phone-ready agents without stitching together separate models and media servers."
lang: en
story: openai-releases-gpt-live-1-for-full
publishedAt: 2026-09-11T11:46:49.237Z
sourceUrl: "https://openai.com/index/introducing-gpt-live-1-in-the-api"
sourceName: "OpenAI"
priority: flash
tags: [openai, voice, api, telephony]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
OpenAI has released GPT‑Live‑1 in the API, a model built for natural, full‑duplex voice conversations. It handles simultaneous speaking and listening, follows system instructions more reliably than previous voice modes, and adds two capabilities that matter for production workloads: custom voices and direct telephony integration.

Full‑duplex means the model can process incoming audio while generating its own response, allowing interruptions and back‑channel cues without the awkward pauses of half‑duplex pipelines. The stronger instruction following lets you define conversation flow, tool use, and guardrails in the same system prompt you would use for text, and the model respects those constraints mid‑stream.

Custom voices let you move beyond the stock catalog. The API accepts a voice identifier you create, so agents can sound consistent with a brand or a specific persona. Telephony support means the same model can terminate a SIP or PSTN call directly; you no longer need a media server, WebRTC gateway, or a separate TTS/ASR stack to put a voice agent on a phone number.

For teams evaluating vendors, the comparison shifts. Cartesia and ElevenLabs offer high‑quality TTS and, in Cartesia's case, low‑latency streaming, but they still require you to orchestrate ASR, turn‑taking logic, and telephony yourself. Open‑source stacks such as Whisper + Llama + Piper give full control but demand GPU ops, VAD tuning, and media‑server maintenance. GPT‑Live‑1 bundles the whole loop , ASR, reasoning, TTS, turn management, and phone connectivity , behind a single API call.

What remains unknown: general availability date, the underlying base model, per‑minute pricing for input and output audio, rate limits and default quotas, supported audio codecs and sample rates, measured end‑to‑end latency under load, the custom‑voice creation flow and consent model, telephony provisioning details (SIP trunking, number management, carrier partnerships), voice‑control parameters such as speed, pitch, interruption sensitivity, and VAD thresholds, bidirectional streaming semantics and backpressure handling, regional availability and compliance certifications (HIPAA, GDPR, SOC 2), SDKs and quickstart samples, audio data retention policies and zero‑retention options, and any uptime SLA or enterprise support tier.
