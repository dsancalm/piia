---
title: "Parody post shows 25-line local LLM email classifier"
summary: "A NobodyWho project post demonstrates a minimal Python script that runs Qwen3-0.6B locally via llama-cpp-python to classify emails as Legitimate, Spam, or Phishing. The example flags a credential-harvesting email with 88.5% phishing probability."
lang: en
story: parody-post-shows-25-line-local-llm
publishedAt: 2026-09-23T12:02:54.932Z
sourceUrl: "https://www.nobodywho.ai/posts/jev-in-25-lines/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [python, llm, privacy, classification]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A parody post published on September 22, 2026, by Duarte O.Carmo under the NobodyWho project presents a 25-line Python implementation of "Jev," a fictional RAG-style model. The code runs locally using llama-cpp-python and loads the Qwen/Qwen3-0.6B-GGUF model in its Q8_0 quantized form. It classifies an email into one of three categories: Legitimate, Spam, or Phishing. The prompt is constructed with a system message, the email text, and numbered options, then tokenized and fed to the model. The model outputs logits for the first token of each label, which are converted into log probabilities and final probabilities using numpy's logaddexp and exp functions.

The example email, "Payroll asks for your password on a non-company sign-in page," yields probabilities of 0.031 for Legitimate, 0.084 for Spam, and 0.885 for Phishing. The corresponding logits are 26.254, 27.262, and 29.614, with log probabilities of -3.482, -2.474, and -0.122. The code requires Python 3.12 or later and depends on huggingface-hub, llama-cpp-python, and numpy. The model context size is set to 512 tokens, and logits_all is enabled to capture per-token outputs. The authors explicitly state they did not use an API, synthetic data, or RLCD training. The post emphasizes local execution to avoid sending data to external servers.

Links to OpenJev, openjev-sglang, and DiffusionGemma implementations are provided as references, but the post does not explain the origin of the term "Jev" or its connection to dual-process theory. It also does not clarify whether the model weights are modified or used as-is from Hugging Face. The classification approach is demonstrated only on a single email example, and no benchmarks, accuracy metrics, or generalization tests are included. The post functions as a minimal, copy-pasteable example of local LLM inference for classification tasks, prioritizing privacy and simplicity over performance validation.

What is not known: the definition or origin of "Jev," the model's training or fine-tuning details, the meaning of "System One," the generalizability of the classification method, the model's performance or accuracy, and whether the weights are modified.
