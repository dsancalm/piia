---
title: "Former Fly.io engineer joins project to build a phone that generates apps on demand"
summary: "The author argues that current phone OSes were designed for fixed-function apps from unknown vendors, a model that no longer fits when most code is generated locally by the user."
lang: en
story: former-fly-io-engineer-joins-project-to
publishedAt: 2026-09-26T11:41:30.760Z
sourceUrl: "https://sockpuppet.org/blog/2026/09/25/what-even-is-an-os-now/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [phone, ai, os, apps]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
The operating system used to be a jailer. Its job was to keep applications from strangers away from each other and from the hardware. That model made sense when every binary on your machine arrived from an unknown vendor. It makes less sense when most of the code running on your device was written by you, or generated for you, five minutes ago.

The author has spent the last several months writing native macOS applications with AI assistance. The boundaries between backend and frontend, web and native, system and application have dissolved in that workflow. He is now leaving Fly.io to join Kurt on a new project: building a phone. The premise is that mainstream phones shipping in 2026 were all planned in 2023, when the industry still assumed computers existed to run deterministic, fixed-function apps authored by professional programmers. That assumption is the target.

The proposed phone does not run prefabricated apps from a store. Instead, you describe what you want in natural language and the device constructs the application on demand. The author estimates there are thousands of times more of these personal, ephemeral apps than there are traditional packages, and each one might only exercise one-seventh of the code paths a conventional word processor touches.

This shifts the OS role from isolation to composition. If the software supply chain collapses to "user intent plus local generation," the heavy sandboxing, code-signing pipelines, and app-review processes become overhead rather than protection. The new primitives are not applications but building blocks , capabilities the system exposes so the generated code can assemble them safely. What those building blocks are, how they are versioned, and how permission boundaries work when the code did not exist yesterday remains unspecified.

The project has no public name, spec sheet, architecture diagram, or launch date. Kurt's full identity and the funding structure are also unknown. The article offers a direction, not a blueprint.

What is not known: the technical architecture of the phone, the runtime that executes generated code, the security model for ad-hoc capabilities, the distribution mechanism for building blocks, or any business model behind the venture.
