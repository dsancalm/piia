---
title: "Google releases Gemini 3.8 Flash text-to-speech models with 2,000-plus voices"
summary: "A new playground from Simon Willison demonstrates multi-character conversations, custom voice cloning from a 30-second sample, and shareable URLs that encode the full compose state."
lang: en
story: google-releases-gemini-3-8-flash-text
publishedAt: 2026-09-24T12:05:05.485Z
sourceUrl: "https://simonwillison.net/2026/Sep/23/gemini-tts-playground/"
sourceName: "Simon Willison"
priority: flash
tags: [google, gemini, tts, audio]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google released two new Gemini text-to-speech models: gemini-3.8-flash-tts and gemini-3.8-flash-lite-tts. The models ship with a library of over 2,000 voices and support custom voice creation from a 30-second audio sample, provided you hold the rights to that voice. Simon Willison built a bring-your-own-key playground to demonstrate the API. The interface was "vibe coded" with GPT-6 Astra and relies on the open CORS policy of the underlying Gemini endpoint, so the key never leaves the browser.

The playground exposes the API's multi-character conversation feature. You define a script with distinct speakers, assign a different voice to each, and add style instructions such as "whispering" or "excited." A demo clip renders a conversation between two pelicans debating a move to Pacifica Pier. The script was written by Claude 4.5 Opus, which also generated a shareable URL that encodes the entire compose state. Generating one minute and eighteen seconds of audio took roughly twenty seconds and cost 2.74 cents using the Flash model.

```python
gemini-3.8-flash-tts
gemini-3.8-flash-lite-tts
```

The tool lets you preview the generated audio and inspect the raw request and response payloads. Bookmarkable URLs make it trivial to share a specific voice configuration or conversation prototype with a colleague.

What is not known: pricing for the Flash-Lite variant versus the standard Flash model; rate limits or quotas; audio format specifications such as sample rate, bitrate, or codec; maximum input text length per request; whether the 2,000-plus voices are pre-trained or dynamically generated; licensing terms for commercial use of the output; regional availability; latency benchmarks for streaming versus batch generation; whether style instructions accept SSML or a proprietary format; and authentication details beyond the bring-your-own-key flow.
