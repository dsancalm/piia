---
title: "Google releases Gemini 3.8 Live and Extended Thinking with top speech benchmarks"
summary: "Extended Thinking tops the Artificial Analysis Speech Quality Index at 82.6 and hits 97.7 percent on Big Bench Audio reasoning. Both models run tools silently mid-dialogue, but pricing, latency, and enterprise rollout dates remain undisclosed."
lang: en
story: google-releases-gemini-3-8-live-and
publishedAt: 2026-09-16T11:57:25.950Z
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [google, gemini, speech, api]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google released Gemini 3.8 Live and Gemini 3.8 Live Extended Thinking on September 15, 2026. Both models are available now through the Gemini API and Google AI Studio.

The standard Live model targets scale and cost efficiency with fluid dialogue and visual grounding. The Extended Thinking variant targets high-complexity tasks with multi-step reasoning.

Extended Thinking leads the Artificial Analysis Speech to Speech Quality Index at 82.6, placing it first overall. It scores 68.6 percent on the τ-Voice agentic task completion benchmark and 35.1 percent on the τ-Voice-banking subset from Sierra. On Big Bench Audio reasoning it reaches 97.7 percent. The standard Live model ranks second in the Speech Agent Arena. In ServiceNow's EVA-Bench, which evaluates the Live API on the Gemini Enterprise Agent Platform, both models advance the Pareto frontier for complex workflows.

The standard Live model processes visual input in near real time and detects or switches among 97 supported languages mid-conversation. Both models execute tools and API calls in the background without interrupting the dialogue. Extended Thinking reasons and speaks simultaneously, emitting early verbal cues such as "Let me check that…" and narrating progress live.

Developer platforms already integrated include Agora, Fishjam, LangChain, LiveKit, Pipecat, Vercel, and Vision Agents via the Gemini Live API. Enterprise partners cited are Salesforce, Genspark, and Lumeris.

Availability differs by tier. The standard Live model is open to developers via Gemini API and AI Studio, to enterprises in private preview for Gemini Enterprise with Gemini Enterprise for Customer Experience coming soon, and to all users in Search Live. Extended Thinking is open to developers via the same channels, to enterprises in private preview for Gemini Enterprise with Customer Experience and Google Workspace business customers coming soon, and to all users in Gemini Live. Google AI Pro and Ultra subscribers get it in Workspace Docs, and all Google AI subscribers get it in Gmail and Keep.

All generated audio carries an imperceptible SynthID watermark. A model card with safety and responsibility details exists.

What is not known
- Concrete end-to-end latency in milliseconds under real conditions.
- Per-minute or per-token pricing for the Gemini API; the announcement only describes the price point as "highly competitive" and "cost-effective."
- When Gemini Enterprise for Customer Experience and Workspace business customers exit private preview.
- Quotas, rate limits, and SLA terms for the Live API.
- Model architecture details such as parameter count or mixture-of-experts composition.
- Voice quality metrics beyond the Artificial Analysis index, such as MOS, WER, or naturalness scores.
- The exact list of the 97 languages and per-language quality for low-resource languages.
- Whether SynthID can be toggled or verified via API.
- Internal benchmarks Google used beyond the public ones cited.
- Regional availability and account requirements such as age or billing.
