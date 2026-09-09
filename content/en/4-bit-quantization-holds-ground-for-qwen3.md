---
title: "4-bit quantization holds ground for Qwen3 models while 1-bit collapses on reasoning"
summary: "A $3,000 benchmark across five quantization levels shows Q4_K_M matches BF16 on coding, reasoning, and instruction-following tasks while fitting on a single RTX 4090. The 2-bit variant loses slight accuracy but keeps solve rates."
lang: en
story: 4-bit-quantization-holds-ground-for-qwen3
publishedAt: 2026-09-09T11:44:28.915Z
sourceUrl: "https://quesma.com/blog/qwen38-27b-quantizations-benchmarked/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [quantization, qwen3, benchmark, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A new quantization benchmark for Qwen3-8B 27B confirms that 4-bit is the practical floor for production workloads, while 1-bit variants collapse on reasoning tasks. The author ran Terminal-Bench 2.1, GPQA Diamond, and IFBench across five quantization levels on Modal, spending roughly $3,000 in GPU time to generate reproducible numbers.

The BF16 baseline weighs 55 GB. Q4_K_M at 17 GB fits on a single RTX 4090 with 24 GB of VRAM, leaving room for a 64k token context window using an FP16 KV cache. On Terminal-Bench 2.1 (89 tasks, three-hour timeout, effort level xhigh, 98k reserved context), Q4_K_M matched the full-precision model. On GPQA Diamond and IFBench, Q4_K_M and Q8_0 showed no statistical difference from BF16. The 2-bit UD-Q2_K_XL (10.7 GB) dipped slightly but solved tasks in the same number of turns as BF16 while generating about 25 percent more output tokens.

The 1-bit quantizations (UD-IQ1_S at 6.2 GB and UD-IQ1_M) scored at random-chance levels on GPQA Diamond. The long-reasoning setting (xhigh) made results worse because the models exhausted their token budgets and returned empty responses. Unsloth released v2 quantizations (2/4/8-bit) and v3 (1-bit); the v2 files were replaced on August 19, 2026 and are no longer available.

Costs on Modal illustrate the hardware savings. Terminal-Bench 2.1 cost $1,563 for BF16 (containers plus GPU), $502 for Q4_K_M, $243 for UD-Q2_K_XL, and under $170 for the 1-bit variants. GPQA plus IFBench ranged from $73 (Q8_0) to $120 (Q4_K_M). For comparison, DeepSeek V4 Flash 0731 (284B) runs at roughly $0.10 per million output tokens on OpenRouter, far below the cost of self-hosting on rented GPUs.

## What is not known

Exact percentage scores for each quantization on GPQA Diamond, IFBench, and Terminal-Bench 2.1 (only charts were published). Q8_0 results on Terminal-Bench 2.1 (the author did not run it). Details of quantized KV cache performance (the author plans to test later). The precise configuration of "effort xhigh" (reasoning token budget, temperature, top-p). The exact llama.cpp version (build dated August 16, 2026) and inference flags used. Why Unsloth replaced the v2 files on August 19, 2026 and what changes v3 introduced for 1-bit. Latency and throughput comparisons on consumer hardware (RTX 4090 locally) versus Modal L40S/H100/H200.
