---
title: "Google's HEIR compiler runs AI models on encrypted data"
summary: "Google released HEIR, an open source compiler that turns pre-trained AI models into versions that compute directly on encrypted inputs. It demonstrated the approach on four private inference tasks, and is pairing the compiler with hardware accelerators from four partners to..."
lang: en
story: google-s-heir-compiler-runs-ai-models
publishedAt: 2026-08-15T07:10:06.821Z
sourceUrl: "https://blog.google/security/how-google-is-making-private-ai-practical-with-homomorphic-encryption/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [homomorphic-encryption, compiler, privacy, ai]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Google presented HEIR, an open source compiler for homomorphic encryption, at its Private Computing Toolkit. HEIR takes pre-trained AI models that work on plaintext data and converts them so they can operate directly on encrypted inputs. The compiler was first announced in 2023, and the current article from August 14, 2026, shows it moving into practical territory.

Homomorphic encryption lets you compute on encrypted data without ever decrypting it. The problem has always been performance: encrypted operations are orders of magnitude slower than plaintext ones, and writing code that works under that constraint requires deep cryptographic expertise. HEIR attacks the second problem. If you already have a trained model, you feed it to the compiler and get a version that runs on ciphertexts. You do not need to redesign your model or learn the underlying encryption scheme.

Google demonstrated four private inference applications: content recommendation, credit card fraud detection, intrusion detection, and hotword detection. The intrusion detection demo uses Kitsune, a known network intrusion model. The other demos do not specify their models.

To make this practical, Google is partnering with Belfort, Niobium, Cornami, and Optalysys to build hardware accelerators for homomorphic encryption. Software alone will not get you there; the computational overhead is too large. The accelerators are meant to close that gap.

For a developer building privacy-sensitive applications, the appeal is clear. You keep your model, you keep your training pipeline, and you get a deployment path where the server never sees raw user data. The user sends encrypted input, the server runs the compiled model on it, and returns an encrypted result. The server learns nothing about the input.

The compiler is open source and part of Google's Private Computing Toolkit. That means you can inspect it, modify it, and build on it. The hardware partners are separate commercial efforts, so the software is the portable piece.

What the article does not tell you is how much slower these encrypted inferences actually are. There are no latency numbers, no cost figures, no benchmark comparisons against plaintext inference. You do not know whether the credit card fraud detection runs in 10 milliseconds or 10 seconds. The exact AI models behind three of the four demos are not named. The hardware requirements for running HEIR are not specified. And beyond the announcement, there is no public availability date for the compiler.

You can try the toolkit when it ships, but you will be measuring the performance yourself.
