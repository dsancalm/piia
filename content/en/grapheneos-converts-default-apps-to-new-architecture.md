---
title: "GrapheneOS converts default apps to new architecture"
summary: "The project is rewriting its reference apps to demonstrate hardened platform adoption, including a redesigned clipboard service that would restrict read access to explicit user interaction."
lang: en
story: grapheneos-converts-default-apps-to-new-architecture
publishedAt: 2026-09-07T13:02:46.117Z
sourceUrl: "https://grapheneos.social/@GrapheneOS/117225539756835649"
sourceName: "Hacker News (portada)"
priority: routine
tags: [grapheneos, android, security, architecture]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
GrapheneOS posted on Mastodon that it is well into converting its default apps to a new architecture. The post, ID 117225539756835649 on grapheneos.social, appeared on the Hacker News front page. The visible text cuts off mid-sentence. The specific apps, the details of the new architecture, and the implementation of the "Secure Clipboard" feature are not confirmed.

GrapheneOS has historically used its default apps, Camera, Gallery, PDF Viewer, Auditor, and others, as reference implementations for platform hardening features. These include hardened malloc, memory tagging (MTE) enforcement on supported Pixel hardware, strict SELinux policies, and a heavily restricted IPC surface. When GrapheneOS rewrites these components, it shows how to adopt scoped storage correctly, how to structure processes to minimize the trusted computing base, and how to use the OS-provided hardware-backed keystore and attestation APIs without falling back to weaker compat paths.

A secure clipboard implementation would address a long-standing Android weakness where any app with clipboard access can read sensitive data copied by the user. GrapheneOS has previously mitigated this with a user-facing toggle to clear the clipboard on boot and restrictions on background clipboard reads. A redesigned clipboard service would likely enforce stricter label-based access control, possibly tying read permission to explicit user interaction or focus state, and could integrate with the OS's existing per-app network and sensor toggles.

## What is not known

The full text of the Mastodon announcement is truncated. The specific list of converted apps, the technical details of the new architecture, the threat model addressed by the secure clipboard, and whether these changes ship in the current release or an upcoming beta are not available from the provided source.
