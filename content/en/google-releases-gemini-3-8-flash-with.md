---
title: "Google releases Gemini 3.8 Flash with stronger coding and reasoning"
summary: "The new model matches 3.7 Flash pricing while beating larger rivals on software engineering and multi-step reasoning benchmarks. A companion Cyber variant targets vulnerability discovery and patching, showing 2.6x more correct Chrome patches than leading commercial models."
lang: en
story: google-releases-gemini-3-8-flash-with
publishedAt: 2026-09-03T11:46:12.975Z
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [google, gemini, ai, cybersecurity]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google released Gemini 3.8 Flash and 3.8 Flash Cyber on September 2, 2026. The standard 3.8 Flash matches the speed and price of 3.7 Flash , $0.75 per million input tokens, $3.75 per million output tokens , while surpassing most larger frontier models on DeepSWE v1.1, a long-horizon software engineering benchmark. It scores 54.9% on HLE-Verified for multi-step reasoning across STEM, humanities, and professional domains. On Vals Finance Agent V2 and Harvey's Legal Agent Benchmark, it beats 3.7 Flash and other frontier models. The model runs longer reasoning chains and iterative tool calls on complex tasks, consuming more tokens at high effort levels to maximize accuracy. Developers who prefer lower overhead can select low effort or stay on 3.7 Flash, which remains fully supported.

The gains in coding and reasoning trace back to rigorous training on cybersecurity tasks. 3.8 Flash Cyber, the companion model, targets vulnerability discovery and automated patching. On CyberGym it outperforms 3.5 Flash Cyber and significantly larger models. An internal benchmark across 20 languages and complex codebases shows a success rate above 70%. On CWE-Bench, run by Collinear, it hits 47.2% pass@1 versus 47.8% for a leading frontier model at a fraction of the cost. Chrome Security reports 2.6x more correct patches for Chrome vulnerabilities than the best larger commercial models. Wiz measured 7.5, 9.7% higher recall in penetration testing at 2.3, 5.2x lower cost. Google Cloud's vulnerability research team found a critical foundational vulnerability in under two hours, work that typically takes months.

Both models share a base intelligence accelerated by long-horizon agentic loops that recursively evaluate and refine outputs. 3.8 Flash Cyber carries more permissive mitigations for cybersecurity use, so access is restricted to trusted defenders through the new Fairwind Program: government authorities, critical infrastructure operators, and software maintainers. Standard 3.8 Flash includes safeguards against CBRN and cyber-offense misuse per the Frontier Safety Framework, and both models show a significant jump in prompt-injection robustness per Gray Swan.

Availability: developers can build with 3.8 Flash in Google Antigravity, the Gemini API via Google AI Studio and Android Studio, or generate UIs in Stitch. Enterprises get it through Gemini Enterprise. Consumers on Google AI Pro and Ultra see it in the Gemini app, AI Mode in Search, and Gemini in Sheets. Fairwind Program members get priority access to 3.8 Flash Cyber.

Example builds on Antigravity include an immersive 3D puzzle game with environmental storytelling, a functional DOS version of Google Maps with Street View, an interactive topographic map using USGS datasets, and a 3D hardware anatomy viewer with physically proportioned Three.js renderings.

### What is not known
- Exact general-availability dates for each channel (API, Enterprise, consumer, Fairwind).
- Technical details of the long-horizon agentic loops and their recursive evaluation mechanism.
- Definition and API configuration of effort levels (low/medium/high).
- Fairwind Program eligibility criteria and application process.
- Model architecture: parameter count, context window, supported modalities.
- Detailed results on standard coding benchmarks (SWE-bench, HumanEval, MBPP) beyond DeepSWE.
- Production latency (TTFT, tokens/sec) versus 3.7 Flash.
- Fine-tuning or distillation support for 3.8 Flash.
- Deprecation policy and support timeline for 3.7 Flash.
- Specifics of the more permissive mitigations in 3.8 Flash Cyber.
- Exact USGS datasets used in the topographic map example.
- Regional or geographic availability for the models and Fairwind Program.
