---
title: "Jeff decision models return calibrated probabilities in single forward pass"
summary: "The 0.8B and 2B models fine-tuned from Qwen3.5 and Gemma 4 answer routing and classification tasks in 22 to 60 milliseconds on GPU, replacing heavy LLM calls with calibrated probabilities instead of tokens."
lang: en
story: jeff-decision-models-return-calibrated-probabilities-in
publishedAt: 2026-09-29T13:19:45.183Z
sourceUrl: "https://github.com/firelex/jeff"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [models, inference, classification, routing]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Jeff is a family of decision models with 0.8B and 2B parameters, fine-tuned from Qwen3.5 and Gemma 4. They implement the Jev request format but are not affiliated with TypeSafe. Instead of generating tokens, they return calibrated probabilities for each option in a single forward pass. That makes them a drop-in replacement for heavy LLM calls when the task is routing, classification, or scoring.

Latency is the headline. On an RTX PRO 6000 the 0.8B model answers in 22 ms; on an Apple M4 Max via MLX it takes 28 ms. The 2B variants run at 24 ms and 60 ms respectively. CPU inference with 32 threads sits at 463 ms for the 0.8B Qwen model, 708 ms for the 2B Qwen, and 1.0 s for Gemma. Model weights are 1.7 GB, 4.2 GB, and 9.3 GB on disk.

```
uv sync uv run hf download mstrasser/Jeff-Qwen3.5-0.8B --local-dir checkpoints/jeff-0.8b
# NVIDIA GPU or CPU (PyTorch)
JEFF_CHECKPOINT=checkpoints/jeff-0.8b PORT=8765 uv run jeff-serve
# Apple silicon (MLX, much faster on a Mac; Qwen models only)
uv sync --extra mac
JEFF_BACKEND=mlx JEFF_CHECKPOINT=checkpoints/jeff-0.8b PORT=8765 uv run jeff-serve
```

The server accepts a JSON payload with a state string and a questions object. Each question has a type , `choice` (up to 26 options encoded A, Z), `noul` (yes/no as a probability), or `score` (point on a described scale) , plus instructions and criteria. Multiple independent questions can be batched in one request.

```
curl -s localhost:8765/v1/systemone -H ' content-type: application/json ' -d ' { "model": "jeff-latest", "state": "Refund request: the customer says the parcel arrived crushed and wants their money back.", "questions": { "route": {"type": "choice", "instructions": "Which team should handle this?", "criteria": {"1": "Refunds and payments", "2": "Damaged or lost parcels", "3": "Account and login problems"}}, "angry": {"type": "noul", "instructions": "Is the customer angry?"} } } '
```

On five general benchmarks covering 4,599 questions, Jeff-Qwen3.5-0.8B scores 79.1% versus 45.3% for the base model. The 2B Qwen variant reaches 83.1% versus 46.5%. Jev's published number on the same suite is 83.0%. On reasoning-heavy splits (BBH, JudgeBench, JevBench hard) both Jeff models trail Jev and AutoJev-27B by a wide margin, as expected for their size.

The practical lever is fast fine-tuning. A voice-navigation task with roughly 11,000 synthetic examples lifted held-out accuracy from 31.7% to 95.8% in about 30 minutes on a single GPU. Inference on an M4 Max stayed near 40 ms per decision. Training the base 0.8B model took two hours on one RTX PRO 6000; the 2B model took 3.5 hours. Synthetic data came from Qwen3.8-Flash-Next running on two DGX Spark units. No cloud GPUs or closed-model outputs were used.

```
uv sync --extra games uv run python -m jeff.games --game doom --player jeff --criteria situation --url http://127.0.0.1:8765 --video --out runs/games/doom.json
uv run python -m jeff.games --game frogger --player jeff --criteria outcomes --url http://127.0.0.1:8765 --out runs/games/frogger.json
uv run python -m jeff.games --game pacman --player rule --out runs/games/pacman-rule.json
```

In zero-shot game tests Jeff-0.8B edges out a rule bot in Frogger (10.3 vs 10.25 crossings) and matches it in Doom (6.55 kills). Pac-Man is weaker at 57 pellets versus 94 for the rule bot. Jev on Doom scores 6.55 with an aiming rule and -0.60 without it.

Current hard limit: 26 options per question. Options beyond position 27 are effectively never chosen and the server rejects longer lists.

### What is not known
- Exact latency of Jeff-Gemma4-E2B on Apple M4 Max (MLX backend currently supports Qwen only).
- Jev and AutoJev-27B results on the exact same benchmark splits (they were measured on different samples).
- Fine-tune recipe details: precise learning rate, batch size, scheduler, optimal epoch count per task.
- Performance on non-English languages and domains outside the five public benchmarks plus JevBench.
- Probability calibration on real production distributions versus benchmark sets.
- Actual cost of generating synthetic data with Qwen3.8-Flash-Next on DGX Sparks (time, energy).
- Whether the 26-option limit will be lifted and how that would affect performance.
- Latency and throughput under real concurrent load (batch >1, simultaneous requests).
