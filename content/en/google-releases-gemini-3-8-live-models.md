---
title: "Google releases Gemini 3.8 Live models with browser voice demo"
summary: "Simon Willison built a browser UI that connects directly to Google's new speech-to-speech WebSocket API. The demo supports interruption and voice presets without an SDK."
lang: en
story: google-releases-gemini-3-8-live-models
publishedAt: 2026-09-16T11:53:37.112Z
sourceUrl: "https://simonwillison.net/2026/Sep/15/gemini-live/"
sourceName: "Simon Willison"
priority: flash
tags: [gemini, voice, websocket, demo]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google released Gemini 3.8 Live and Gemini 3.8 Live Extended Thinking on September 15, 2026. Both are speech-to-speech models built for real-time voice conversation, matching the shape of OpenAI's GPT-Live family. Simon Willison published a browser-based UI that lets you select a model, choose a voice preset, add an optional system prompt, and start a voice session with interruption support. The demo runs entirely in the browser with no external dependencies.

The client opens a WebSocket to Google's Generative Language API:

```
wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=...
```

Audio capture and playback use the native Web Audio API `AudioContext`. The implementation handles the bidirectional stream directly, giving you full control over the audio pipeline without an SDK layer. A tutorial for the WebSocket protocol is linked from the demo page.

The Extended Thinking variant suggests a reasoning layer on top of the base Live model, but Google has not published the architectural differences. Pricing, rate limits, supported languages, voice preset catalog, and regional availability are also undocumented. It is unclear whether function calling or tool use is available inside the voice session, and no latency benchmarks against GPT-Live have been released.

What is not known: pricing and rate limits for the new Gemini 3.8 Live models; specific differences between Gemini 3.8 Live and 3.8 Live Extended Thinking; supported languages and voice preset options available via the API; latency benchmarks compared to OpenAI's GPT-Live; authentication details required for the WebSocket key parameter; whether the models support function calling or tool use during the voice session; availability regions or rollout schedule for the API.
